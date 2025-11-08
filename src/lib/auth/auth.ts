import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { recordLoginAttempt } from "@/lib/auth/login-history-utils"
import { sendLoginAlert } from "@/lib/security/security-utils"
import { isAccountLocked, getAccountLockoutTimeRemaining, clearFailedLoginAttempts } from "@/lib/auth/account-lockout"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            roles: {
              include: {
                role: true
              }
            }
          }
        })

        if (!user || !user.password) {
          // Record failed login attempt if user exists
          if (user) {
            await recordLoginAttempt({
              userId: user.id,
              status: "failed",
              ip: request?.headers?.get?.('x-forwarded-for')?.split(',')[0] || 
                  request?.headers?.get?.('x-real-ip') || 
                  'Unknown IP',
              userAgent: request?.headers?.get?.('user-agent') || 'Unknown'
            })
          }
          throw new Error("Invalid credentials")
        }

        // Check if user account is active
        if (!user.isActive) {
          await recordLoginAttempt({
            userId: user.id,
            status: "failed",
            ip: request?.headers?.get?.('x-forwarded-for')?.split(',')[0] || 
                request?.headers?.get?.('x-real-ip') || 
                'Unknown IP',
            userAgent: request?.headers?.get?.('user-agent') || 'Unknown'
          })
          // Use a specific error that can be caught on the client side
          const error = new Error("AccountDisabled") as any
          error.type = "AccountDisabled"
          throw error
        }

        // Check if email verification is required and user hasn't verified
        const emailVerificationSetting = await prisma.systemSettings.findUnique({
          where: { key: 'security.requireEmailVerification' }
        })
        
        const requireEmailVerification = emailVerificationSetting?.value !== false && emailVerificationSetting?.value !== 'false'

        if (requireEmailVerification && !user.emailVerified) {
          await recordLoginAttempt({
            userId: user.id,
            status: "failed",
            ip: request?.headers?.get?.('x-forwarded-for')?.split(',')[0] || 
                request?.headers?.get?.('x-real-ip') || 
                'Unknown IP',
            userAgent: request?.headers?.get?.('user-agent') || 'Unknown'
          })
          const error = new Error("EmailNotVerified") as any
          error.type = "EmailNotVerified"
          throw error
        }

        // Check if account is locked due to failed login attempts
        const locked = await isAccountLocked(user.id)
        if (locked) {
          const timeRemaining = await getAccountLockoutTimeRemaining(user.id)
          const error = new Error(`AccountLocked:${timeRemaining}`) as any
          error.type = "AccountLocked"
          throw error
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValidPassword) {
          // Record failed login attempt
          await recordLoginAttempt({
            userId: user.id,
            status: "failed",
            ip: request?.headers?.get?.('x-forwarded-for')?.split(',')[0] || 
                request?.headers?.get?.('x-real-ip') || 
                'Unknown IP',
            userAgent: request?.headers?.get?.('user-agent') || 'Unknown'
          })
          throw new Error("Invalid credentials")
        }

        // Record successful login attempt
        const ip = request?.headers?.get?.('x-forwarded-for')?.split(',')[0] || 
                   request?.headers?.get?.('x-real-ip') || 
                   'Unknown IP'
        const userAgent = request?.headers?.get?.('user-agent') || 'Unknown'
        
        await recordLoginAttempt({
          userId: user.id,
          status: "success",
          ip,
          userAgent
        })

        // Update lastLoginAt timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            lastLoginAt: new Date(),
            lastActivityAt: new Date()
          }
        })

        // Clear failed login attempts after successful login
        await clearFailedLoginAttempts(user.id)

        // Send login alert notification (don't await - fire and forget to avoid blocking login)
        const deviceInfo = userAgent.includes('Mobile') ? 'جهاز محمول' : 'متصفح ويب'
        sendLoginAlert(user.id, deviceInfo, ip).catch((err: any) => {
          console.error('Login alert failed:', err)
        })

        // Send login email notification (dynamic import to avoid edge runtime issues)
        import('@/lib/services/email').then(({ sendNewLoginEmail }) => {
          sendNewLoginEmail(user.email, user.name || undefined, deviceInfo, undefined).catch((err: any) => {
            console.error('Login email failed:', err)
          })
        }).catch((err: any) => {
          console.error('Failed to load email service:', err)
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // This callback runs after authorize succeeds
      // If we reach here, the user is authorized
      return true
    },
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id
        token.email = user.email || ""
        token.name = user.name || ""
        token.image = user.image || ""
        
        // Store initial roles - will be updated via API when needed
        token.roles = []
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
        session.user.roles = token.roles as string[]
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === "development",
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

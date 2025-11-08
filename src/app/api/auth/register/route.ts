import { NextRequest } from "next/server"
import prisma from "@/lib/db/prisma"
import { hashPassword } from "@/lib/auth/auth-utils"
import { registerSchema } from "@/lib/validations/schemas"
import { validationErrorResponse, errorResponse, successResponse } from "@/lib/api/api-utils"
import { ZodError } from "zod"
import { notifyAdminsNewUser } from "@/lib/services/notification"
import { validatePassword, savePasswordToHistory } from "@/lib/security/password-policy"
import { createVerificationCode, sendEmailVerification } from "@/lib/auth/verification"

export async function POST(request: NextRequest) {
  try {
    // Check if registration is enabled
    const registrationSetting = await prisma.systemSettings.findUnique({
      where: { key: 'general.registrationEnabled' }
    })
    
    if (registrationSetting?.value === 'false') {
      return errorResponse("التسجيل غير متاح حالياً", 403)
    }

    const body = await request.json()

    // Validate input with Zod
    const validatedData = registerSchema.parse(body)

    // Validate password against security policy
    const passwordValidation = await validatePassword(validatedData.password)
    if (!passwordValidation.valid) {
      return errorResponse(
        passwordValidation.errors.join('. '),
        400
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return errorResponse("مستخدم بهذا البريد الإلكتروني موجود بالفعل", 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Get default storage quota from system settings
    const defaultQuotaSetting = await prisma.systemSettings.findUnique({
      where: { key: 'storage.defaultQuotaGB' }
    })
    const defaultQuotaGB = defaultQuotaSetting?.value 
      ? (typeof defaultQuotaSetting.value === 'number' ? defaultQuotaSetting.value : parseInt(String(defaultQuotaSetting.value)))
      : 10
    const storageQuotaBytes = BigInt(defaultQuotaGB * 1024 * 1024 * 1024)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        passwordChangedAt: new Date(),
        name: validatedData.name || null,
        storageQuotaBytes: storageQuotaBytes,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    // Save password to history
    await savePasswordToHistory(user.id, hashedPassword)

    // Assign default role
    const defaultRole = await prisma.role.findUnique({
      where: { name: "user" },
    })

    if (defaultRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: defaultRole.id,
        },
      })
    }

    // Check if email verification is required
    const emailVerificationSetting = await prisma.systemSettings.findUnique({
      where: { key: 'security.requireEmailVerification' }
    })
    
    const requireEmailVerification = emailVerificationSetting?.value !== false && emailVerificationSetting?.value !== 'false'

    // Send verification code if required
    if (requireEmailVerification) {
      const verificationCode = await createVerificationCode(user.id, 'email_verification', 15)
      await sendEmailVerification(user.email, user.name || undefined, verificationCode.code)
    } else {
      // Send welcome email if verification not required (async, don't wait)
      import('@/lib/services/email').then(({ sendWelcomeEmail }) => {
        sendWelcomeEmail(user.email, user.name || undefined).catch((error: Error) => {
          console.error('Failed to send welcome email:', error)
        })
      })
    }

    // Notify admins about new user
    notifyAdminsNewUser(user.email, user.name || undefined).catch((error: Error) => {
      console.error('Failed to notify admins:', error)
    })

    return successResponse(
      {
        message: requireEmailVerification 
          ? "تم إنشاء المستخدم بنجاح. يرجى التحقق من بريدك الإلكتروني لإكمال التسجيل."
          : "تم إنشاء المستخدم بنجاح",
        user,
        requiresVerification: requireEmailVerification
      },
      201
    )
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return validationErrorResponse(error)
    }

    console.error("Registration error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

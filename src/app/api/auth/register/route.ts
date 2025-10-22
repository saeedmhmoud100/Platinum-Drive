import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { hashPassword } from "@/lib/auth-utils"
import { registerSchema } from "@/lib/validations/schemas"
import { validationErrorResponse, errorResponse, successResponse } from "@/lib/api-utils"
import { ZodError } from "zod"
import { notifyAdminsNewUser } from "@/lib/notification-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input with Zod
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return errorResponse("مستخدم بهذا البريد الإلكتروني موجود بالفعل", 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

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

    // Send welcome email (async, don't wait)
    import('@/lib/email-service').then(({ sendWelcomeEmail }) => {
      sendWelcomeEmail(user.email, user.name || undefined).catch((error: Error) => {
        console.error('Failed to send welcome email:', error)
      })
    })

    // Notify admins about new user
    notifyAdminsNewUser(user.email, user.name || undefined).catch((error: Error) => {
      console.error('Failed to notify admins:', error)
    })

    return successResponse(
      {
        message: "تم إنشاء المستخدم بنجاح",
        user,
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

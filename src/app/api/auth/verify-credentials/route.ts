import { NextRequest } from "next/server"
import prisma from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { errorResponse, successResponse } from "@/lib/api/api-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return errorResponse("البريد الإلكتروني وكلمة المرور مطلوبان", 400)
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return errorResponse("البريد الإلكتروني أو كلمة المرور غير صحيحة", 401)
    }

    // Check if user account is active
    if (!user.isActive) {
      return errorResponse("هذا الحساب معطل. يرجى التواصل مع الإدارة.", 403)
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return errorResponse("البريد الإلكتروني أو كلمة المرور غير صحيحة", 401)
    }

    // Credentials are valid
    return successResponse({
      valid: true,
      userId: user.id,
      email: user.email,
      name: user.name
    })

  } catch (error) {
    console.error("Verify credentials error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

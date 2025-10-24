import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { errorResponse, successResponse } from "@/lib/api-utils"
import { verifyCode } from "@/lib/verification"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return errorResponse("البريد الإلكتروني ورمز التحقق مطلوبان", 400)
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, emailVerified: true }
    })

    if (!user) {
      return errorResponse("المستخدم غير موجود", 404)
    }

    if (user.emailVerified) {
      return errorResponse("البريد الإلكتروني موثق بالفعل", 400)
    }

    // Verify code
    const result = await verifyCode(user.id, code, 'email_verification')

    if (!result.ok) {
      return errorResponse("رمز التحقق غير صحيح أو منتهي الصلاحية", 400)
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() }
    })

    return successResponse({
      message: "تم التحقق من البريد الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.",
      verified: true
    })

  } catch (error) {
    console.error("Verification error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

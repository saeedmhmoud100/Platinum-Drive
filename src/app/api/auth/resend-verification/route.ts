import { NextRequest } from "next/server"
import prisma from "@/lib/db/prisma"
import { errorResponse, successResponse } from "@/lib/api/api-utils"
import { createVerificationCode, sendEmailVerification } from "@/lib/auth/verification"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return errorResponse("البريد الإلكتروني مطلوب", 400)
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, emailVerified: true }
    })

    if (!user) {
      return errorResponse("المستخدم غير موجود", 404)
    }

    if (user.emailVerified) {
      return errorResponse("البريد الإلكتروني موثق بالفعل", 400)
    }

    // Delete old verification codes for this user
    await prisma.verificationCode.deleteMany({
      where: { userId: user.id, type: 'email_verification' }
    })

    // Create new verification code
    const verificationCode = await createVerificationCode(user.id, 'email_verification', 15)
    
    // Send email
    await sendEmailVerification(user.email, user.name || undefined, verificationCode.code)

    return successResponse({
      message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
      sent: true
    })

  } catch (error) {
    console.error("Resend verification error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

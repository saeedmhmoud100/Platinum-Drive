import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { errorResponse, successResponse } from "@/lib/api-utils"
import { createTwoFactorCode, sendTwoFactorCode } from "@/lib/verification"

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
      select: { id: true, email: true, name: true }
    })

    if (!user) {
      return errorResponse("المستخدم غير موجود", 404)
    }

    // Create 2FA code
    const twoFactorCode = await createTwoFactorCode(user.id, 10)
    
    // Send email
    await sendTwoFactorCode(user.email, user.name || undefined, twoFactorCode.code)

    return successResponse({
      message: "تم إرسال رمز المصادقة الثنائية إلى بريدك الإلكتروني",
      sent: true
    })

  } catch (error) {
    console.error("Request 2FA error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

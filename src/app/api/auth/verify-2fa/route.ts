import { NextRequest } from "next/server"
import prisma from "@/lib/db/prisma"
import { errorResponse, successResponse } from "@/lib/api/api-utils"
import { verifyTwoFactorCode } from "@/lib/auth/verification"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return errorResponse("البريد الإلكتروني ورمز المصادقة مطلوبان", 400)
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    })

    if (!user) {
      return errorResponse("المستخدم غير موجود", 404)
    }

    // Verify 2FA code
    const result = await verifyTwoFactorCode(user.id, code)

    if (!result.ok) {
      return errorResponse("رمز المصادقة غير صحيح أو منتهي الصلاحية", 400)
    }

    return successResponse({
      message: "تم التحقق بنجاح",
      verified: true
    })

  } catch (error) {
    console.error("Verify 2FA error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

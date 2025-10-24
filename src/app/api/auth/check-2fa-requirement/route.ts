import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { errorResponse, successResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    // Check if 2FA is enabled globally
    const twoFASetting = await prisma.systemSettings.findUnique({
      where: { key: 'security.enable2FA' }
    })
    
    // 2FA is required only if explicitly enabled (value is true or 'true')
    const require2FA = twoFASetting?.value === true || twoFASetting?.value === 'true'

    return successResponse({
      require2FA
    })

  } catch (error) {
    console.error("Check 2FA requirement error:", error)
    return errorResponse("خطأ في الخادم الداخلي", 500)
  }
}

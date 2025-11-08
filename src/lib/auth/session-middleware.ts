import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { shouldSessionTimeout } from '@/lib/security/security-utils'

/**
 * Check session timeout and update last activity
 * Should be called at the start of API routes that require authentication
 * @param userId - The authenticated user's ID
 * @returns NextResponse with error if session timed out, null if OK
 */
export async function checkSessionTimeout(userId: string): Promise<NextResponse | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastActivityAt: true,
        settings: {
          select: {
            sessionTimeout: true
          }
        }
      }
    })

    // Check if session has timed out
    if (user?.settings?.sessionTimeout && user.lastActivityAt) {
      const isTimedOut = shouldSessionTimeout(user.lastActivityAt, user.settings.sessionTimeout)
      
      if (isTimedOut) {
        return NextResponse.json(
          { error: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.', code: 'SESSION_TIMEOUT' },
          { status: 401 }
        )
      }
    }

    // Update last activity timestamp
    await prisma.user.update({
      where: { id: userId },
      data: { lastActivityAt: new Date() }
    })

    return null // No error, continue
  } catch (error) {
    console.error('Session timeout check error:', error)
    // Don't block request on error, just log it
    return null
  }
}

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

/**
 * DELETE /api/notifications/clear-all
 * Delete all read notifications for the current user
 */
export async function DELETE() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const result = await prisma.notification.deleteMany({
      where: {
        userId: session.user.id,
        isRead: true,
      },
    })

    return NextResponse.json({ 
      success: true,
      deletedCount: result.count,
    })
  } catch (error) {
    console.error('Failed to clear notifications:', error)
    return NextResponse.json(
      { error: 'فشل مسح الإشعارات' },
      { status: 500 }
    )
  }
}

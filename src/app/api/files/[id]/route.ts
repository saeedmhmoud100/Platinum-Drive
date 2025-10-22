import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const { id } = await params
    const fileId = id

    // Get file record
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      select: {
        id: true,
        name: true,
        ownerId: true,
        size: true,
      },
    })

    if (!file) {
      return NextResponse.json(
        { error: 'الملف غير موجود' },
        { status: 404 }
      )
    }

    // Check ownership
    if (file.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: 'غير مصرح بحذف هذا الملف' },
        { status: 403 }
      )
    }

    // Soft delete - mark as deleted (move to trash)
    await prisma.file.update({
      where: { id: fileId },
      data: {
        deletedAt: new Date(),
      },
    })

    // Update user's storage usage
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        usedStorageBytes: {
          decrement: BigInt(file.size),
        },
      },
    })

    // Send file deleted notification
    const { notifyFileDeleted } = await import('@/lib/notification-utils')
    await notifyFileDeleted(session.user.id, file.name).catch(err =>
      console.error('Failed to send delete notification:', err)
    )

    return NextResponse.json({
      success: true,
      message: 'تم نقل الملف إلى سلة المحذوفات',
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'فشل حذف الملف' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'

// POST - Restore file from trash
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const fileId = params.id

    // Find the file
    const file = await prisma.file.findUnique({
      where: { id: fileId },
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
        { error: 'غير مصرح' },
        { status: 403 }
      )
    }

    // Check if file is in trash
    if (!file.deletedAt) {
      return NextResponse.json(
        { error: 'الملف ليس في سلة المحذوفات' },
        { status: 400 }
      )
    }

    // Restore file (set deletedAt to null)
    const restoredFile = await prisma.file.update({
      where: { id: fileId },
      data: {
        deletedAt: null,
      },
      include: {
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: 'تم استعادة الملف بنجاح',
      file: restoredFile,
    })
  } catch (error) {
    console.error('Error restoring file:', error)
    return NextResponse.json(
      { error: 'فشل استعادة الملف' },
      { status: 500 }
    )
  }
}

// DELETE - Permanently delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const fileId = params.id

    // Find the file
    const file = await prisma.file.findUnique({
      where: { id: fileId },
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
        { error: 'غير مصرح' },
        { status: 403 }
      )
    }

    // Check if file is in trash
    if (!file.deletedAt) {
      return NextResponse.json(
        { error: 'يمكن حذف الملفات الموجودة في سلة المحذوفات فقط بشكل نهائي' },
        { status: 400 }
      )
    }

    // Delete file from disk
    const filePath = join(process.cwd(), 'public', file.storageKey)
    try {
      await unlink(filePath)
    } catch (error) {
      console.warn('File not found on disk, continuing with database deletion:', error)
    }

    // Delete from database
    await prisma.file.delete({
      where: { id: fileId },
    })

    // Update user's used storage
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        usedStorageBytes: {
          decrement: BigInt(file.size),
        },
      },
    })

    return NextResponse.json({
      message: 'تم حذف الملف نهائياً',
    })
  } catch (error) {
    console.error('Error permanently deleting file:', error)
    return NextResponse.json(
      { error: 'فشل حذف الملف' },
      { status: 500 }
    )
  }
}

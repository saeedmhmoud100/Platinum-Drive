import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const body = await request.json()
    const { password } = body

    // Find shared link
    const sharedLink = await prisma.sharedLink.findUnique({
      where: { token },
      include: {
        file: {
          select: {
            id: true,
            name: true,
            size: true,
            mimeType: true,
            createdAt: true,
            owner: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!sharedLink || !sharedLink.isActive) {
      return NextResponse.json({ error: 'الرابط غير صالح أو منتهي' }, { status: 404 })
    }

    // Check expiration
    if (sharedLink.expiresAt && new Date(sharedLink.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'انتهت صلاحية رابط المشاركة' }, { status: 410 })
    }

    // Check password if protected
    if (sharedLink.passwordHash) {
      if (!password) {
        return NextResponse.json({ 
          error: 'هذا الرابط محمي بكلمة مرور',
          requiresPassword: true 
        }, { status: 401 })
      }

      const passwordValid = await bcrypt.compare(password, sharedLink.passwordHash)
      if (!passwordValid) {
        return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
      }
    }

    // Increment views
    await prisma.sharedLink.update({
      where: { id: sharedLink.id },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({
      file: sharedLink.file,
      sharedLink: {
        id: sharedLink.id,
        expiresAt: sharedLink.expiresAt,
        permission: sharedLink.permission,
        createdAt: sharedLink.createdAt,
        requiresPassword: !!sharedLink.passwordHash,
      },
      canDownload: sharedLink.permission === 'download' || sharedLink.permission === 'write',
    })
  } catch (error) {
    console.error('Public share access error:', error)
    return NextResponse.json(
      { error: 'فشل الوصول إلى الملف المشارك' },
      { status: 500 }
    )
  }
}

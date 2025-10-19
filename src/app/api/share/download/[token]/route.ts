import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

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
        file: true,
      },
    })

    if (!sharedLink || !sharedLink.isActive) {
      return NextResponse.json({ error: 'الرابط غير صالح' }, { status: 404 })
    }

    // Check expiration
    if (sharedLink.expiresAt && new Date(sharedLink.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'انتهت صلاحية الرابط' }, { status: 410 })
    }

    // Check download permission
    if (sharedLink.permission === 'read') {
      return NextResponse.json({ error: 'هذا الرابط للعرض فقط' }, { status: 403 })
    }

    // Check password if protected
    if (sharedLink.passwordHash) {
      if (!password) {
        return NextResponse.json({ 
          error: 'كلمة مرور مطلوبة',
          requiresPassword: true 
        }, { status: 401 })
      }

      const passwordValid = await bcrypt.compare(password, sharedLink.passwordHash)
      if (!passwordValid) {
        return NextResponse.json({ error: 'كلمة مرور خاطئة' }, { status: 401 })
      }
    }

    // Check max downloads limit
    if (sharedLink.maxDownloads && sharedLink.downloads >= sharedLink.maxDownloads) {
      return NextResponse.json({ error: 'تم الوصول إلى الحد الأقصى للتحميلات' }, { status: 429 })
    }

    const file = sharedLink.file
    const filePath = path.join(process.cwd(), 'public', file.storageKey)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'الملف غير موجود' }, { status: 404 })
    }

    // Increment downloads
    await prisma.sharedLink.update({
      where: { id: sharedLink.id },
      data: {
        downloads: {
          increment: 1,
        },
      },
    })

    // Read file
    const fileBuffer = fs.readFileSync(filePath)

    // Return file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(file.name)}"`,
        'Content-Length': file.size.toString(),
      },
    })
  } catch (error) {
    console.error('Shared file download error:', error)
    return NextResponse.json(
      { error: 'فشل تحميل الملف' },
      { status: 500 }
    )
  }
}

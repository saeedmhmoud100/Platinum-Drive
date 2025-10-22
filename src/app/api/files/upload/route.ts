import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import {
  isValidFileType,
  isValidFileSize,
  generateUniqueFilename,
  sanitizeFilename,
  FILE_SIZE_LIMITS,
} from '@/lib/file-utils'
import { checkStorageWarning, notifyStorageWarning, notifyStorageFull } from '@/lib/notification-utils'
import { compressImage, generateThumbnail, isProcessableImage } from '@/lib/image-utils'

// Configure route segment for large file uploads
export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds timeout
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      )
    }

    // Get user with storage info and settings
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        usedStorageBytes: true,
        storageQuotaBytes: true,
        settings: {
          select: {
            defaultUploadFolder: true,
            autoGenerateThumbnails: true,
            compressImages: true,
            deduplicateFiles: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folderId = formData.get('folderId') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'لم يتم تحديد ملف' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!isValidFileType(file.type)) {
      return NextResponse.json(
        { error: `نوع الملف غير مدعوم: ${file.type}` },
        { status: 400 }
      )
    }

    // Validate file size
    if (!isValidFileSize(file.size)) {
      return NextResponse.json(
        { error: `حجم الملف يجب أن يكون أقل من ${FILE_SIZE_LIMITS.MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Check storage quota
    const newUsedStorage = Number(user.usedStorageBytes) + file.size
    if (newUsedStorage > Number(user.storageQuotaBytes)) {
      return NextResponse.json(
        { error: 'تجاوزت المساحة التخزينية المتاحة' },
        { status: 400 }
      )
    }

    // Check for duplicate files if deduplication is enabled
    if (user.settings?.deduplicateFiles) {
      const existingFile = await prisma.file.findFirst({
        where: {
          ownerId: user.id,
          name: file.name,
          size: file.size,
          deletedAt: null,
        },
        select: { id: true, name: true },
      })

      if (existingFile) {
        return NextResponse.json(
          { error: `الملف "${file.name}" موجود بالفعل` },
          { status: 409 }
        )
      }
    }

    // Use default folder from settings if no folder is specified
    let targetFolderId = folderId
    if (!targetFolderId && user.settings?.defaultUploadFolder && user.settings.defaultUploadFolder !== '/') {
      // Try to find or create the default folder
      const defaultFolder = await prisma.folder.findFirst({
        where: {
          ownerId: user.id,
          path: user.settings.defaultUploadFolder,
        },
        select: { id: true },
      })
      if (defaultFolder) {
        targetFolderId = defaultFolder.id
      }
    }

    // Verify folder ownership if folderId is provided
    if (targetFolderId) {
      const folder = await prisma.folder.findUnique({
        where: { id: targetFolderId },
        select: { ownerId: true },
      })

      if (!folder || folder.ownerId !== user.id) {
        return NextResponse.json(
          { error: 'المجلد غير موجود أو غير مصرح به' },
          { status: 403 }
        )
      }
    }

    // Prepare file data
    const bytes = await file.arrayBuffer()
    let buffer: Buffer = Buffer.from(bytes)
    let finalFileSize = file.size

    // Image compression if enabled
    if (user.settings?.compressImages && isProcessableImage(file.type)) {
      try {
        const compressedBuffer = await compressImage(buffer, file.type)
        // Only use compressed version if it's actually smaller
        if (compressedBuffer.length < buffer.length) {
          buffer = Buffer.from(compressedBuffer)
          finalFileSize = compressedBuffer.length
          console.log(`Image compressed: ${file.size} -> ${finalFileSize} bytes`)
        }
      } catch (error) {
        console.error('Image compression failed, using original:', error)
      }
    }

    // Generate unique filename
    const sanitizedName = sanitizeFilename(file.name)
    const uniqueFilename = generateUniqueFilename(sanitizedName)

    // Create user directory if not exists
    const userDir = join(process.cwd(), 'public', 'uploads', 'files', user.id)
    if (!existsSync(userDir)) {
      await mkdir(userDir, { recursive: true })
    }

    // Save file to disk
    const filePath = join(userDir, uniqueFilename)
    const relativePath = `/uploads/files/${user.id}/${uniqueFilename}`
    
    await writeFile(filePath, buffer)

    // Generate thumbnails if enabled
    let thumbnailPath: string | null = null
    if (user.settings?.autoGenerateThumbnails) {
      try {
        thumbnailPath = await generateThumbnail(filePath, file.type)
        if (thumbnailPath) {
          console.log(`Thumbnail generated: ${thumbnailPath}`)
        }
      } catch (error) {
        console.error('Thumbnail generation failed:', error)
      }
    }

    // Create file record in database
    const fileRecord = await prisma.file.create({
      data: {
        name: file.name,
        ownerId: user.id,
        folderId: targetFolderId || null,
        size: finalFileSize, // Use the actual saved file size
        mimeType: file.type,
        storageKey: relativePath,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
          compressed: user.settings?.compressImages && isProcessableImage(file.type),
          originalSize: file.size,
          thumbnail: thumbnailPath ? thumbnailPath.replace(process.cwd() + '/public', '') : null,
        },
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

    // Update user's used storage (use finalFileSize after compression)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        usedStorageBytes: {
          increment: BigInt(finalFileSize),
        },
      },
    })

    // Check storage usage and send notification if needed
    const warningLevel = await checkStorageWarning(user.id)
    if (warningLevel) {
      if (warningLevel >= 100) {
        await notifyStorageFull(user.id)
      } else {
        await notifyStorageWarning(user.id, warningLevel)
      }
    }

    // Send file uploaded notification
    const { notifyFileUploaded } = await import('@/lib/notification-utils')
    await notifyFileUploaded(user.id, file.name, file.size).catch(err =>
      console.error('Failed to send upload notification:', err)
    )

    // Return success response
    return NextResponse.json({
      success: true,
      file: {
        id: fileRecord.id,
        name: fileRecord.name,
        size: fileRecord.size,
        mimeType: fileRecord.mimeType,
        createdAt: fileRecord.createdAt,
        folder: fileRecord.folder,
        url: relativePath,
      },
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { error: 'فشل رفع الملف' },
      { status: 500 }
    )
  }
}

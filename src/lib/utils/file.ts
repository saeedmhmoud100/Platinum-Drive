import mime from 'mime-types'
import prisma from '@/lib/db/prisma'

// Default file size limits (in bytes) - used as fallback
export const FILE_SIZE_LIMITS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB per file (default)
  MAX_TOTAL_SIZE: 500 * 1024 * 1024, // 500MB total per upload
}

// Get max file size from system settings
export async function getMaxFileSize(): Promise<number> {
  try {
    const setting = await prisma.systemSettings.findUnique({
      where: { key: 'upload.maxFileSize' }
    })
    
    if (setting && typeof setting.value === 'number') {
      // Convert MB to bytes
      return setting.value * 1024 * 1024
    }
    
    return FILE_SIZE_LIMITS.MAX_FILE_SIZE // Fallback to default
  } catch (error) {
    console.error('Error fetching max file size:', error)
    return FILE_SIZE_LIMITS.MAX_FILE_SIZE // Fallback to default
  }
}

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
  ],
  videos: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
  archives: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'],
}

export const ALL_ALLOWED_TYPES = [
  ...ALLOWED_FILE_TYPES.images,
  ...ALLOWED_FILE_TYPES.documents,
  ...ALLOWED_FILE_TYPES.videos,
  ...ALLOWED_FILE_TYPES.audio,
  ...ALLOWED_FILE_TYPES.archives,
]

// Format file size to human readable
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Validate file type (legacy - for backward compatibility)
export function isValidFileType(mimeType: string): boolean {
  return ALL_ALLOWED_TYPES.includes(mimeType)
}

// Validate file type against database policy
export async function isValidFileTypeFromPolicy(mimeType: string): Promise<{
  allowed: boolean
  policy?: any
  message?: string
}> {
  const policy = await prisma.fileTypePolicy.findUnique({
    where: { mimeType }
  })

  // If no policy exists, check against default allowed types
  if (!policy) {
    const isAllowed = ALL_ALLOWED_TYPES.includes(mimeType)
    return {
      allowed: isAllowed,
      message: isAllowed ? undefined : `نوع الملف غير مدعوم: ${mimeType}`
    }
  }

  // Check if file type is allowed
  if (!policy.isAllowed) {
    return {
      allowed: false,
      policy,
      message: `نوع الملف ${mimeType} غير مسموح به`
    }
  }

  return {
    allowed: true,
    policy
  }
}

// Validate file size against a specific limit
export function isValidFileSize(size: number, maxSize: number = FILE_SIZE_LIMITS.MAX_FILE_SIZE): boolean {
  return size > 0 && size <= maxSize
}

// Validate file size against system settings
export async function isValidFileSizeFromSettings(size: number): Promise<boolean> {
  const maxSize = await getMaxFileSize()
  return isValidFileSize(size, maxSize)
}

// Get file extension from filename
export function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop()
  return ext ? `.${ext.toLowerCase()}` : ''
}

// Get file category from mime type
export function getFileCategory(mimeType: string): 'image' | 'document' | 'video' | 'audio' | 'archive' | 'other' {
  if (ALLOWED_FILE_TYPES.images.includes(mimeType)) return 'image'
  if (ALLOWED_FILE_TYPES.documents.includes(mimeType)) return 'document'
  if (ALLOWED_FILE_TYPES.videos.includes(mimeType)) return 'video'
  if (ALLOWED_FILE_TYPES.audio.includes(mimeType)) return 'audio'
  if (ALLOWED_FILE_TYPES.archives.includes(mimeType)) return 'archive'
  return 'other'
}

// Generate unique filename
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = getFileExtension(originalFilename)
  const nameWithoutExt = originalFilename.replace(extension, '')
  
  return `${nameWithoutExt}_${timestamp}_${randomString}${extension}`
}

// Sanitize filename (remove special characters)
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '')
}

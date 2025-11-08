import sharp from 'sharp'
import { join } from 'path'
import { writeFile } from 'fs/promises'

/**
 * Compress an image buffer
 * @param buffer - Original image buffer
 * @param mimeType - Image MIME type
 * @returns Compressed image buffer
 */
export async function compressImage(
  buffer: Buffer,
  mimeType: string
): Promise<Buffer> {
  try {
    const image = sharp(buffer)
    const metadata = await image.metadata()

    // Get image format
    const format = mimeType.split('/')[1] as keyof sharp.FormatEnum

    // Compression settings based on format
    let compressed: sharp.Sharp = image

    // Resize if image is too large (max 2048px on longest side)
    if (metadata.width && metadata.height) {
      const maxDimension = 2048
      if (metadata.width > maxDimension || metadata.height > maxDimension) {
        compressed = compressed.resize(maxDimension, maxDimension, {
          fit: 'inside',
          withoutEnlargement: true,
        })
      }
    }

    // Apply format-specific compression
    switch (format) {
      case 'jpeg':
      case 'jpg':
        compressed = compressed.jpeg({ quality: 85, progressive: true })
        break
      case 'png':
        compressed = compressed.png({ compressionLevel: 8, progressive: true })
        break
      case 'webp':
        compressed = compressed.webp({ quality: 85 })
        break
      case 'avif':
        compressed = compressed.avif({ quality: 85 })
        break
      default:
        // For unsupported formats, convert to JPEG
        compressed = compressed.jpeg({ quality: 85, progressive: true })
    }

    return await compressed.toBuffer()
  } catch (error) {
    console.error('Image compression error:', error)
    // Return original buffer if compression fails
    return buffer
  }
}

/**
 * Generate a thumbnail for an image
 * @param filePath - Path to the original image
 * @param mimeType - Image MIME type
 * @returns Path to the generated thumbnail
 */
export async function generateImageThumbnail(
  filePath: string,
  mimeType: string
): Promise<string | null> {
  try {
    const thumbnailPath = filePath.replace(/(\.[^.]+)$/, '_thumb$1')

    // Generate thumbnail (300x300 max, maintain aspect ratio)
    await sharp(filePath)
      .resize(300, 300, {
        fit: 'inside',
        withoutEnlargement: false,
      })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath)

    return thumbnailPath
  } catch (error) {
    console.error('Thumbnail generation error:', error)
    return null
  }
}

/**
 * Check if a file is an image that can be processed
 * @param mimeType - File MIME type
 * @returns True if the file is a processable image
 */
export function isProcessableImage(mimeType: string): boolean {
  const processableTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/tiff',
    'image/gif',
  ]
  return processableTypes.includes(mimeType)
}

/**
 * Check if a file is a video
 * @param mimeType - File MIME type
 * @returns True if the file is a video
 */
export function isVideo(mimeType: string): boolean {
  return mimeType.startsWith('video/')
}

/**
 * Extract video thumbnail using sharp (first frame extraction)
 * Note: This is a basic implementation. For better video thumbnail generation,
 * consider using ffmpeg or a specialized video processing library.
 * @param filePath - Path to the video file
 * @returns Path to the generated thumbnail or null
 */
export async function generateVideoThumbnail(
  filePath: string
): Promise<string | null> {
  // TODO: Implement video thumbnail generation with ffmpeg
  // For now, return null as this requires additional dependencies
  console.log('Video thumbnail generation not implemented yet:', filePath)
  return null
}

/**
 * Generate appropriate thumbnail based on file type
 * @param filePath - Path to the file
 * @param mimeType - File MIME type
 * @returns Path to the generated thumbnail or null
 */
export async function generateThumbnail(
  filePath: string,
  mimeType: string
): Promise<string | null> {
  if (isProcessableImage(mimeType)) {
    return await generateImageThumbnail(filePath, mimeType)
  } else if (isVideo(mimeType)) {
    return await generateVideoThumbnail(filePath)
  }
  return null
}

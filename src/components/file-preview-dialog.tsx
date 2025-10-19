'use client'

import { useState, useEffect } from 'react'
import ImagePreview from './image-preview'
import PDFViewer from './pdf-viewer'
import VideoPlayer from './video-player'
import AudioPlayer from './audio-player'
import TextCodeViewer from './text-code-viewer'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { FileQuestion, Download } from 'lucide-react'
import { toast } from 'sonner'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface FilePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileId: string
  fileName: string
  mimeType: string
  fileSize?: number
}

// Determine file category and if it's previewable
function getFilePreviewType(mimeType: string, fileName: string): string {
  // Image types
  if (mimeType.startsWith('image/')) {
    return 'image'
  }

  // PDF
  if (mimeType === 'application/pdf') {
    return 'pdf'
  }

  // Video types
  if (mimeType.startsWith('video/')) {
    return 'video'
  }

  // Audio types
  if (mimeType.startsWith('audio/')) {
    return 'audio'
  }

  // Text and code types
  const textTypes = [
    'text/plain',
    'text/html',
    'text/css',
    'text/javascript',
    'text/markdown',
    'application/json',
    'application/xml',
    'text/xml',
  ]

  const codeExtensions = [
    '.js', '.jsx', '.ts', '.tsx', '.py', '.rb', '.java', '.c', '.cpp',
    '.cs', '.php', '.go', '.rs', '.swift', '.kt', '.scala', '.sh',
    '.bash', '.html', '.css', '.scss', '.sass', '.less', '.json',
    '.yaml', '.yml', '.md', '.sql', '.graphql', '.txt', '.log',
  ]

  if (textTypes.includes(mimeType) || codeExtensions.some(ext => fileName.toLowerCase().endsWith(ext))) {
    return 'text'
  }

  return 'unsupported'
}

export default function FilePreviewDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
  mimeType,
  fileSize,
}: FilePreviewDialogProps) {
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const previewType = getFilePreviewType(mimeType, fileName)

  useEffect(() => {
    if (open && fileId) {
      // Use the preview API endpoint
      const url = `/api/files/${fileId}/preview`
      setFileUrl(url)
      setLoading(false)
    }
  }, [open, fileId])

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('تم تحميل الملف')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('فشل تحميل الملف')
    }
  }

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent dir="rtl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">جاري التحميل...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Route to appropriate viewer
  switch (previewType) {
    case 'image':
      return (
        <ImagePreview
          open={open}
          onOpenChange={onOpenChange}
          imageUrl={fileUrl}
          fileName={fileName}
        />
      )

    case 'pdf':
      return (
        <PDFViewer
          open={open}
          onOpenChange={onOpenChange}
          pdfUrl={fileUrl}
          fileName={fileName}
        />
      )

    case 'video':
      return (
        <VideoPlayer
          open={open}
          onOpenChange={onOpenChange}
          videoUrl={fileUrl}
          fileName={fileName}
          mimeType={mimeType}
        />
      )

    case 'audio':
      return (
        <AudioPlayer
          open={open}
          onOpenChange={onOpenChange}
          audioUrl={fileUrl}
          fileName={fileName}
          mimeType={mimeType}
        />
      )

    case 'text':
      return (
        <TextCodeViewer
          open={open}
          onOpenChange={onOpenChange}
          fileUrl={fileUrl}
          fileName={fileName}
          mimeType={mimeType}
        />
      )

    default:
      // Unsupported file type
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent dir="rtl">
            <VisuallyHidden>
              <DialogTitle>ملف غير مدعوم - {fileName}</DialogTitle>
            </VisuallyHidden>
            
            <div className="text-center py-8">
              <FileQuestion className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="font-semibold text-lg mb-1">{fileName}</p>
              <p className="text-base font-medium mb-2 mt-4">
                معاينة هذا النوع من الملفات غير مدعومة
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                يمكنك تحميل الملف لعرضه على جهازك
              </p>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 ml-2" />
                تحميل الملف
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )
  }
}

'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface VideoPlayerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  videoUrl: string
  fileName: string
  mimeType: string
}

export default function VideoPlayer({
  open,
  onOpenChange,
  videoUrl,
  fileName,
  mimeType,
}: VideoPlayerProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('تم تحميل الفيديو')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('فشل تحميل الفيديو')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 gap-0 flex flex-col" dir="rtl">
        <VisuallyHidden>
          <DialogTitle>تشغيل الفيديو - {fileName}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header - Single Unified Section */}
        <div className="shrink-0 flex items-center justify-between px-4 py-4 border-b bg-background">
          <p className="font-semibold truncate flex-1">{fileName}</p>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
        </div>

        {/* Video Player */}
        <div className="bg-black">
          <video
            controls
            className="w-full h-auto max-h-[70vh]"
            controlsList="nodownload"
            autoPlay
          >
            <source src={videoUrl} type={mimeType} />
            متصفحك لا يدعم تشغيل الفيديو
          </video>
        </div>
      </DialogContent>
    </Dialog>
  )
}

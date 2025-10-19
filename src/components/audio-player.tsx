'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Music } from 'lucide-react'
import { toast } from 'sonner'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface AudioPlayerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  audioUrl: string
  fileName: string
  mimeType: string
}

export default function AudioPlayer({
  open,
  onOpenChange,
  audioUrl,
  fileName,
  mimeType,
}: AudioPlayerProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(audioUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('تم تحميل الملف الصوتي')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('فشل تحميل الملف الصوتي')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <VisuallyHidden>
          <DialogTitle>تشغيل الملف الصوتي - {fileName}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header - Single Section */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-semibold truncate flex-1">{fileName}</p>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
        </div>

        {/* Audio Player */}
        <div className="space-y-4">
          <div className="flex items-center justify-center p-12 bg-muted rounded-lg">
            <Music className="h-20 w-20 text-muted-foreground" />
          </div>
          <audio controls className="w-full" autoPlay>
            <source src={audioUrl} type={mimeType} />
            متصفحك لا يدعم تشغيل الملفات الصوتية
          </audio>
        </div>
      </DialogContent>
    </Dialog>
  )
}

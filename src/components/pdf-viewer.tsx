'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react'
import { toast } from 'sonner'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface PDFViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pdfUrl: string
  fileName: string
}

export default function PDFViewer({
  open,
  onOpenChange,
  pdfUrl,
  fileName,
}: PDFViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl)
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0 flex flex-col" dir="rtl">
        <VisuallyHidden>
          <DialogTitle>معاينة ملف PDF - {fileName}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header with Title and Controls - Combined Section */}
        <div className="shrink-0 border-b bg-background">
          {/* Title Row */}
          <div className="px-4 pt-4 pb-3">
            <p className="font-semibold truncate">{fileName}</p>
          </div>
          
          {/* Toolbar Row */}
          <div className="flex items-center justify-center gap-2 px-4 pb-3">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-3 min-w-[60px] text-center">
                {zoom}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-6 w-px bg-border" />

            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4 ml-2" />
                  خروج من ملء الشاشة
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4 ml-2" />
                  ملء الشاشة
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 ml-2" />
              تحميل
            </Button>
          </div>
        </div>

        {/* PDF Container */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
            title={fileName}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

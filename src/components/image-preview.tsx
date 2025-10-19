'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface ImagePreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string
  fileName: string
  images?: Array<{ id: string; url: string; name: string }>
  currentIndex?: number
  onNavigate?: (index: number) => void
}

export default function ImagePreview({
  open,
  onOpenChange,
  imageUrl,
  fileName,
  images,
  currentIndex = 0,
  onNavigate,
}: ImagePreviewProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loading, setLoading] = useState(true)

  const hasMultipleImages = images && images.length > 1
  const canGoPrevious = hasMultipleImages && currentIndex > 0
  const canGoNext = hasMultipleImages && currentIndex < images.length - 1

  // Reset states when image changes
  useEffect(() => {
    if (open) {
      setZoom(100)
      setRotation(0)
      setLoading(true)
    }
  }, [imageUrl, open])

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      } else if (e.key === 'ArrowLeft' && canGoPrevious && onNavigate) {
        onNavigate(currentIndex - 1)
      } else if (e.key === 'ArrowRight' && canGoNext && onNavigate) {
        onNavigate(currentIndex + 1)
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn()
      } else if (e.key === '-') {
        handleZoomOut()
      } else if (e.key === 'r' || e.key === 'R') {
        handleRotate()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, currentIndex, canGoPrevious, canGoNext, zoom, rotation])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleReset = () => {
    setZoom(100)
    setRotation(0)
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('تم تحميل الصورة')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('فشل تحميل الصورة')
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

  const handlePrevious = () => {
    if (canGoPrevious && onNavigate) {
      onNavigate(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext && onNavigate) {
      onNavigate(currentIndex + 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0 flex flex-col" dir="rtl">
        <VisuallyHidden>
          <DialogTitle>معاينة الصورة - {fileName}</DialogTitle>
        </VisuallyHidden>
        
        {/* Header with Title and Controls - Combined Section */}
        <div className="shrink-0 border-b bg-background">
          {/* Title Row */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <p className="font-semibold truncate">{fileName}</p>
              {hasMultipleImages && (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ({currentIndex + 1} من {images.length})
                </span>
              )}
            </div>
          </div>
          
          {/* Toolbar Row */}
          <div className="flex items-center justify-center gap-2 px-4 pb-3">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 25}
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
                disabled={zoom >= 300}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-6 w-px bg-border" />

            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4 ml-2" />
              تدوير
            </Button>

            <Button variant="outline" size="sm" onClick={handleReset}>
              إعادة تعيين
            </Button>

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

        {/* Image Container */}
        <div className="flex-1 relative overflow-hidden bg-black/5 dark:bg-black/50">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">جاري التحميل...</p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={imageUrl}
              alt={fileName}
              className={cn(
                'max-w-full max-h-full object-contain transition-all duration-300',
                loading && 'opacity-0'
              )}
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false)
                toast.error('فشل تحميل الصورة')
              }}
            />
          </div>

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              {canGoPrevious && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}
              {canGoNext && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}
            </>
          )}
        </div>

        {/* Footer with thumbnails */}
        {hasMultipleImages && images && images.length > 1 && (
          <div className="border-t p-3 bg-muted/30">
            <div className="flex items-center gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => onNavigate && onNavigate(index)}
                  className={cn(
                    'shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                    index === currentIndex
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-transparent hover:border-muted-foreground/50'
                  )}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

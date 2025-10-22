'use client'

import { useState } from 'react'
import { 
  File, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music, 
  Archive,
  Download,
  Trash2,
  MoreVertical,
  Eye,
  Share2,
  Star
} from 'lucide-react'
import { useDateFormatter } from '@/hooks/use-date-formatter'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatFileSize, getFileCategory } from '@/lib/file-utils'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface FileCardProps {
  file: {
    id: string
    name: string
    size: number
    mimeType: string
    createdAt: Date | string
    storageKey: string
    isFavorite?: boolean
  }
  onDelete?: (fileId: string, fileName: string) => void
  onDownload?: (fileId: string, fileName: string) => void
  onShare?: (fileId: string, fileName: string) => void
  onPreview?: (fileId: string, fileName: string, mimeType: string) => void
  onToggleFavorite?: (fileId: string) => void
  viewMode?: 'grid' | 'list'
}

// Get file icon based on category
function getFileIcon(mimeType: string) {
  const category = getFileCategory(mimeType)
  
  switch (category) {
    case 'image':
      return ImageIcon
    case 'document':
      return FileText
    case 'video':
      return Video
    case 'audio':
      return Music
    case 'archive':
      return Archive
    default:
      return File
  }
}

// Get file icon color
function getFileIconColor(mimeType: string) {
  const category = getFileCategory(mimeType)
  
  switch (category) {
    case 'image':
      return 'text-blue-500'
    case 'document':
      return 'text-red-500'
    case 'video':
      return 'text-purple-500'
    case 'audio':
      return 'text-green-500'
    case 'archive':
      return 'text-orange-500'
    default:
      return 'text-gray-500'
  }
}

export function FileCard({ file, onDelete, onDownload, onShare, onPreview, onToggleFavorite, viewMode = 'grid' }: FileCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { formatDate } = useDateFormatter()

  const FileIcon = getFileIcon(file.mimeType)
  const iconColor = getFileIconColor(file.mimeType)

  const handlePreview = () => {
    onPreview?.(file.id, file.name, file.mimeType)
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const response = await fetch(`/api/files/${file.id}/download`)
      
      if (!response.ok) {
        throw new Error('فشل تحميل الملف')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('تم تحميل الملف بنجاح')
      onDownload?.(file.id, file.name)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('فشل تحميل الملف')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDelete = () => {
    onDelete?.(file.id, file.name)
  }

  const handleShare = () => {
    onShare?.(file.id, file.name)
  }

  const handleToggleFavorite = () => {
    onToggleFavorite?.(file.id)
  }

  const formattedDate = formatDate(file.createdAt)

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors" dir="rtl">
        {/* File Icon */}
        <div className="shrink-0">
          <FileIcon className={cn('h-8 w-8', iconColor)} />
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handlePreview}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {onToggleFavorite && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleFavorite}
              title={file.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <Star className={cn("h-4 w-4", file.isFavorite && "fill-yellow-500 text-yellow-500")} />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="group relative border rounded-lg p-4 hover:shadow-md transition-all bg-card" dir="rtl">
      {/* Favorite Star - Top Right */}
      {onToggleFavorite && (
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-muted transition-colors"
          title={file.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
          <Star className={cn(
            "h-5 w-5 transition-colors",
            file.isFavorite 
              ? "fill-yellow-500 text-yellow-500" 
              : "text-muted-foreground hover:text-yellow-500"
          )} />
        </button>
      )}

      {/* File Icon */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
          <FileIcon className={cn('h-8 w-8', iconColor)} />
        </div>

        {/* File Name */}
        <div className="w-full text-center">
          <p className="font-medium text-sm truncate px-2" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>

      {/* Actions Menu */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handlePreview}>
              <Eye className="h-4 w-4 ml-2" />
              معاينة
            </DropdownMenuItem>
            {onToggleFavorite && (
              <DropdownMenuItem onClick={handleToggleFavorite}>
                <Star className={cn("h-4 w-4 ml-2", file.isFavorite && "fill-yellow-500 text-yellow-500")} />
                {file.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleDownload} disabled={isDownloading}>
              <Download className="h-4 w-4 ml-2" />
              تحميل
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="h-4 w-4 ml-2" />
              مشاركة
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="h-4 w-4 ml-2" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Date Footer */}
      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground text-center">
        {formattedDate}
      </div>
    </div>
  )
}

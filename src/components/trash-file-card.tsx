'use client'

import { File, FileText, Image, Video, Music, Archive, MoreVertical, RotateCcw, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDateFormatter } from '@/hooks/use-date-formatter'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { formatFileSize } from '@/lib/file-utils'
import { cn } from '@/lib/utils'

interface TrashFileCardProps {
  file: {
    id: string
    name: string
    size: number
    mimeType: string
    deletedAt: string | Date
    daysRemaining: number
    folder: {
      id: string
      name: string
    } | null
  }
  viewMode: 'grid' | 'list'
  onRestore: (fileId: string, fileName: string) => void
  onPermanentDelete: (fileId: string, fileName: string) => void
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) {
    return <Image className="h-6 w-6 text-blue-500" />
  } else if (mimeType.startsWith('video/')) {
    return <Video className="h-6 w-6 text-purple-500" />
  } else if (mimeType.startsWith('audio/')) {
    return <Music className="h-6 w-6 text-green-500" />
  } else if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) {
    return <FileText className="h-6 w-6 text-red-500" />
  } else if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive')) {
    return <Archive className="h-6 w-6 text-orange-500" />
  }
  return <File className="h-6 w-6 text-gray-500" />
}

const getFileIconColor = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return 'bg-blue-500/10'
  if (mimeType.startsWith('video/')) return 'bg-purple-500/10'
  if (mimeType.startsWith('audio/')) return 'bg-green-500/10'
  if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'bg-red-500/10'
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive')) return 'bg-orange-500/10'
  return 'bg-gray-500/10'
}

export function TrashFileCard({ file, viewMode, onRestore, onPermanentDelete }: TrashFileCardProps) {
  const { formatDate } = useDateFormatter()
  const deletedDate = formatDate(file.deletedAt)

  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRestore(file.id, file.name)
  }

  const handlePermanentDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onPermanentDelete(file.id, file.name)
  }

  if (viewMode === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors" dir="rtl">
        {/* File Icon */}
        <div className={cn('p-2 rounded-lg', getFileIconColor(file.mimeType))}>
          {getFileIcon(file.mimeType)}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>حُذف في {deletedDate}</span>
            {file.folder && (
              <>
                <span>•</span>
                <span>{file.folder.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Days Remaining Badge */}
        <Badge variant={file.daysRemaining <= 7 ? 'destructive' : 'secondary'}>
          {file.daysRemaining === 0 ? 'سيُحذف اليوم' : `${file.daysRemaining} يوم متبقي`}
        </Badge>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRestore}
          >
            <RotateCcw className="h-4 w-4 ml-2" />
            استعادة
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleRestore}>
                <RotateCcw className="h-4 w-4 ml-2" />
                استعادة
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePermanentDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 ml-2" />
                حذف نهائياً
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <Card className="transition-all hover:shadow-md group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={cn('p-2 rounded-lg', getFileIconColor(file.mimeType))}>
            {getFileIcon(file.mimeType)}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleRestore}>
                <RotateCcw className="h-4 w-4 ml-2" />
                استعادة
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePermanentDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 ml-2" />
                حذف نهائياً
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium truncate text-sm" title={file.name}>
            {file.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
          {file.folder && (
            <p className="text-xs text-muted-foreground truncate">
              📁 {file.folder.name}
            </p>
          )}
          <Badge 
            variant={file.daysRemaining <= 7 ? 'destructive' : 'secondary'}
            className="w-full justify-center text-xs"
          >
            {file.daysRemaining === 0 ? 'سيُحذف اليوم' : `${file.daysRemaining} يوم`}
          </Badge>
        </div>

        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          حُذف في {deletedDate}
        </div>
      </CardContent>
    </Card>
  )
}

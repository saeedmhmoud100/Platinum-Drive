'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import FilePreviewDialog from '@/components/file-preview-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  File,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
  Share2,
  Copy,
  Trash2,
  Eye,
  Download,
  Loader2,
  Grid3x3,
  List,
  Lock,
  Calendar,
  Clock,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import { formatFileSize, getFileCategory } from '@/lib/file-utils'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface SharedLinksClientProps {
  userId: string
}

interface SharedLinkData {
  id: string
  token: string
  shareUrl: string
  file: {
    id: string
    name: string
    size: number
    mimeType: string
    createdAt: string
  }
  createdAt: string
  expiresAt: string | null
  permission: string
  maxDownloads: number | null
  downloads: number
  views: number
  isProtected: boolean
  notes: string | null
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

// Format date in Arabic
function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'اليوم'
  if (diffDays === 1) return 'أمس'
  if (diffDays < 7) return `منذ ${diffDays} أيام`
  if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`
  
  return date.toLocaleDateString('ar-EG', {
    month: 'short',
    day: 'numeric',
  })
}

export default function SharedLinksClient({ userId }: SharedLinksClientProps) {
  const [sharedLinks, setSharedLinks] = useState<SharedLinkData[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [refreshKey, setRefreshKey] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<{ id: string; name: string } | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [fileToPreview, setFileToPreview] = useState<{ id: string; name: string; mimeType: string } | null>(null)

  const fetchSharedLinks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/shared')
      
      if (!response.ok) {
        throw new Error('فشل تحميل الروابط المشتركة')
      }

      const data = await response.json()
      setSharedLinks(data.sharedLinks || [])
    } catch (error) {
      console.error('Error fetching shared links:', error)
      toast.error('فشل تحميل الروابط المشتركة')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSharedLinks()
  }, [refreshKey])

  const handleCopyLink = (shareUrl: string, fileName: string) => {
    navigator.clipboard.writeText(shareUrl)
    toast.success(`تم نسخ رابط "${fileName}"`)
  }

  const handleRevokeLink = async () => {
    if (!linkToDelete) return

    try {
      const response = await fetch(`/api/share/${linkToDelete.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('فشل إلغاء المشاركة')
      }

      toast.success(`تم إلغاء مشاركة "${linkToDelete.name}"`)
      setRefreshKey(prev => prev + 1)
      setDeleteDialogOpen(false)
      setLinkToDelete(null)
    } catch (error) {
      console.error('Error revoking link:', error)
      toast.error('فشل إلغاء المشاركة')
    }
  }

  const openDeleteDialog = (linkId: string, fileName: string) => {
    setLinkToDelete({ id: linkId, name: fileName })
    setDeleteDialogOpen(true)
  }

  const handlePreview = (fileId: string, fileName: string, mimeType: string) => {
    setFileToPreview({ id: fileId, name: fileName, mimeType })
    setPreviewOpen(true)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">جاري تحميل الروابط المشتركة...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Share2 className="h-6 w-6" />
              الملفات المشاركة
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              إدارة جميع الروابط التي شاركتها ({sharedLinks.length})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {sharedLinks.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <Share2 className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium text-muted-foreground mb-2">لا توجد ملفات مشاركة</p>
            <p className="text-sm text-muted-foreground">
              ابدأ بمشاركة ملفاتك مع الآخرين
            </p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-2">
            {sharedLinks.map((link) => {
              const FileIcon = getFileIcon(link.file.mimeType)
              const iconColor = getFileIconColor(link.file.mimeType)
              const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date()
              const expiryDate = link.expiresAt
                ? new Date(link.expiresAt).toLocaleDateString('ar-EG', {
                    month: 'short',
                    day: 'numeric',
                  })
                : null

              return (
                <div
                  key={link.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors group"
                >
                  {/* File Icon */}
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileIcon className={cn('h-5 w-5', iconColor)} />
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{link.file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{formatFileSize(link.file.size)}</span>
                      <span>•</span>
                      <span>{formatDate(link.createdAt)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-3.5 w-3.5" />
                      <span className="font-medium">{link.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="h-3.5 w-3.5" />
                      <span className="font-medium">{link.downloads}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {link.isProtected && (
                      <Badge variant="secondary" className="text-xs h-6 px-2">
                        <Lock className="h-3 w-3 ml-1" />
                        محمي
                      </Badge>
                    )}
                    {isExpired ? (
                      <Badge variant="destructive" className="text-xs h-6 px-2">
                        منتهي
                      </Badge>
                    ) : expiryDate ? (
                      <Badge variant="outline" className="text-xs h-6 px-2">
                        <Clock className="h-3 w-3 ml-1" />
                        {expiryDate}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs h-6 px-2">
                        دائم
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handlePreview(link.file.id, link.file.name, link.file.mimeType)}
                      className="h-8 px-2"
                      title="معاينة"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyLink(link.shareUrl, link.file.name)}
                      className="h-8 px-2"
                      title="نسخ الرابط"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDeleteDialog(link.id, link.file.name)}
                      className="h-8 px-2 text-destructive hover:text-destructive"
                      title="حذف"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sharedLinks.map((link) => {
              const FileIcon = getFileIcon(link.file.mimeType)
              const iconColor = getFileIconColor(link.file.mimeType)
              const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date()
              const expiryDate = link.expiresAt
                ? new Date(link.expiresAt).toLocaleDateString('ar-EG', {
                    month: 'short',
                    day: 'numeric',
                  })
                : null

              return (
                <div
                  key={link.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors group space-y-3"
                >
                  {/* File Icon and Name */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <FileIcon className={cn('h-6 w-6', iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate leading-tight" title={link.file.name}>
                        {link.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatFileSize(link.file.size)}
                      </p>
                    </div>
                  </div>

                  {/* Stats - Better Layout */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Eye className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs font-medium">{link.views}</p>
                      <p className="text-[10px] text-muted-foreground">مشاهدة</p>
                    </div>
                    <div className="text-center border-x">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Download className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs font-medium">{link.downloads}</p>
                      <p className="text-[10px] text-muted-foreground">تحميل</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs font-medium truncate px-1">{formatDate(link.createdAt)}</p>
                      <p className="text-[10px] text-muted-foreground">أنشئ</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap min-h-[20px]">
                    {link.isProtected && (
                      <Badge variant="secondary" className="text-xs h-5 px-1.5">
                        <Lock className="h-3 w-3 ml-0.5" />
                        محمي
                      </Badge>
                    )}
                    {isExpired ? (
                      <Badge variant="destructive" className="text-xs h-5 px-1.5">
                        منتهي
                      </Badge>
                    ) : expiryDate ? (
                      <Badge variant="outline" className="text-xs h-5 px-1.5">
                        {expiryDate}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs h-5 px-1.5">
                        دائم
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs h-5 px-1.5">
                      {link.permission === 'read' ? 'عرض' : 'تحميل'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreview(link.file.id, link.file.name, link.file.mimeType)}
                      className="h-8 px-3"
                      title="معاينة"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyLink(link.shareUrl, link.file.name)}
                      className="flex-1 h-8 text-xs"
                    >
                      <Copy className="h-3.5 w-3.5 ml-1" />
                      نسخ الرابط
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDeleteDialog(link.id, link.file.name)}
                      className="h-8 px-3 text-destructive hover:text-destructive"
                      title="حذف"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>إلغاء المشاركة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من إلغاء مشاركة "{linkToDelete?.name}"؟ سيتم إلغاء تفعيل الرابط ولن يتمكن أحد من الوصول إلى الملف من خلاله.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokeLink} className="bg-destructive hover:bg-destructive/90">
              إلغاء المشاركة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* File Preview Dialog */}
      {fileToPreview && (
        <FilePreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          fileId={fileToPreview.id}
          fileName={fileToPreview.name}
          mimeType={fileToPreview.mimeType}
        />
      )}
    </>
  )
}

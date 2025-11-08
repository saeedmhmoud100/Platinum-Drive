'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrashFileCard } from '@/components/cards/trash-file-card'
import { RestoreFileDialog } from '@/components/dialogs/restore-file-dialog'
import { PermanentDeleteDialog } from '@/components/dialogs/permanent-delete-dialog'
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
import { Button } from '@/components/ui/button'
import { RefreshCw, Grid3x3, List, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize } from '@/lib/utils/file'

interface TrashPageClientProps {
  userId: string
}

interface TrashFile {
  id: string
  name: string
  size: number
  mimeType: string
  deletedAt: string
  daysRemaining: number
  permanentDeleteDate: string
  folder: {
    id: string
    name: string
  } | null
}

export default function TrashPageClient({ userId }: TrashPageClientProps) {
  const [files, setFiles] = useState<TrashFile[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [refreshKey, setRefreshKey] = useState(0)
  
  // Dialog states
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [emptyTrashDialogOpen, setEmptyTrashDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null)
  const [isEmptying, setIsEmptying] = useState(false)

  // Fetch trash files
  const fetchTrash = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/trash')
      
      if (!response.ok) {
        throw new Error('فشل تحميل سلة المحذوفات')
      }

      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error('Error fetching trash:', error)
      toast.error('فشل تحميل سلة المحذوفات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrash()
  }, [refreshKey])

  const handleRestore = (fileId: string, fileName: string) => {
    setSelectedFile({ id: fileId, name: fileName })
    setRestoreDialogOpen(true)
  }

  const handlePermanentDelete = (fileId: string, fileName: string) => {
    setSelectedFile({ id: fileId, name: fileName })
    setDeleteDialogOpen(true)
  }

  const handleEmptyTrash = () => {
    setEmptyTrashDialogOpen(true)
  }

  const handleEmptyTrashConfirm = async () => {
    try {
      setIsEmptying(true)
      const response = await fetch('/api/trash/empty', {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'فشل إفراغ سلة المحذوفات')
      }

      const data = await response.json()
      toast.success(`تم حذف ${data.deletedCount} ملف نهائياً`)
      setEmptyTrashDialogOpen(false)
      setRefreshKey(prev => prev + 1)
    } catch (error: any) {
      console.error('Error emptying trash:', error)
      toast.error(error.message || 'فشل إفراغ سلة المحذوفات')
    } finally {
      setIsEmptying(false)
    }
  }

  const handleDialogSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0)

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">سلة المحذوفات</h1>
          <p className="text-muted-foreground">
            الملفات المحذوفة يتم حذفها نهائياً بعد 30 يوماً
          </p>
        </div>
        <div className="flex gap-2">
          {/* Empty Trash Button */}
          {files.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEmptyTrash}
            >
              <Trash2 className="h-4 w-4 ml-2" />
              إفراغ سلة المحذوفات
            </Button>
          )}

          {/* View Mode Toggle */}
          <div className="flex gap-1 border rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </div>
      </div>

      {/* Trash Files List */}
      <Card>
        <CardHeader>
          <CardTitle>الملفات المحذوفة ({files.length})</CardTitle>
          <CardDescription>
            {files.length > 0 
              ? `إجمالي الحجم: ${formatFileSize(totalSize)}`
              : 'سلة المحذوفات فارغة'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trash2 className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>سلة المحذوفات فارغة</p>
              <p className="text-sm mt-2">الملفات المحذوفة ستظهر هنا</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                : 'space-y-2'
            }>
              {files.map((file) => (
                <TrashFileCard
                  key={file.id}
                  file={file}
                  viewMode={viewMode}
                  onRestore={handleRestore}
                  onPermanentDelete={handlePermanentDelete}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <RestoreFileDialog
        open={restoreDialogOpen}
        onOpenChange={setRestoreDialogOpen}
        fileId={selectedFile?.id || null}
        fileName={selectedFile?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      <PermanentDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        fileId={selectedFile?.id || null}
        fileName={selectedFile?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      {/* Empty Trash Confirmation */}
      <AlertDialog open={emptyTrashDialogOpen} onOpenChange={setEmptyTrashDialogOpen}>
        <AlertDialogContent>
          <div dir="rtl" className="space-y-4">
            <AlertDialogHeader className="text-right">
              <AlertDialogTitle className="text-right">إفراغ سلة المحذوفات</AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                هل أنت متأكد من حذف جميع الملفات ({files.length} ملف) نهائياً؟
                <br />
                <span className="text-destructive font-semibold">لا يمكن التراجع عن هذا الإجراء.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
              <AlertDialogAction
                onClick={handleEmptyTrashConfirm}
                disabled={isEmptying}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isEmptying && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                حذف الكل نهائياً
              </AlertDialogAction>
              <AlertDialogCancel disabled={isEmptying}>إلغاء</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

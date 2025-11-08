'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FileCard } from '@/components/cards/file-card'
import { FolderCard } from '@/components/cards/folder-card'
import FilePreviewDialog from '@/components/dialogs/file-preview-dialog'
import { ShareFileDialog } from '@/components/dialogs/share-file-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Star, Grid3x3, List } from 'lucide-react'
import { toast } from 'sonner'

type ViewMode = 'grid' | 'list'

interface FolderData {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  isFavorite: boolean
}

interface FileData {
  id: string
  name: string
  size: number
  mimeType: string
  createdAt: string
  updatedAt: string
  isFavorite: boolean
  storageKey: string
  folder: {
    id: string
    name: string
  } | null
}

export default function FavoritesClient() {
  const router = useRouter()
  const [files, setFiles] = useState<FileData[]>([])
  const [folders, setFolders] = useState<FolderData[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  
  // Preview state
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string; mimeType?: string } | null>(null)
  
  // Share state
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [fileToShare, setFileToShare] = useState<{ id: string; name: string } | null>(null)

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/files/favorites')
      
      if (!response.ok) {
        throw new Error('فشل تحميل الملفات المفضلة')
      }

      const data = await response.json()
      setFiles(data.files)
      setFolders(data.folders || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
      toast.error('فشل تحميل الملفات المفضلة')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const handleFilePreview = (fileId: string, fileName: string, mimeType?: string) => {
    setSelectedFile({ id: fileId, name: fileName, mimeType })
    setPreviewOpen(true)
  }

  const handleShare = (fileId: string, fileName: string) => {
    setFileToShare({ id: fileId, name: fileName })
    setShareDialogOpen(true)
  }

  const handleToggleFavorite = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}/favorite`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('فشل تحديث المفضلة')
      }

      const data = await response.json()
      toast.success(data.message)

      // Remove from list since it's no longer a favorite
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId))
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('فشل تحديث المفضلة')
    }
  }

  const handleOpenFolder = (folderId: string) => {
    router.push(`/files?folder=${folderId}`)
  }

  const handleToggleFolderFavorite = async (folderId: string) => {
    try {
      const response = await fetch(`/api/folders/${folderId}/favorite`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('فشل تحديث المفضلة')
      }

      const data = await response.json()
      toast.success(data.message)

      // Remove from list since it's no longer a favorite
      setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId))
    } catch (error) {
      console.error('Error toggling folder favorite:', error)
      toast.error('فشل تحديث المفضلة')
    }
  }

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}/download`)
      
      if (!response.ok) {
        throw new Error('فشل تحميل الملف')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('تم تحميل الملف بنجاح')
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error('فشل تحميل الملف')
    }
  }

  const handleDelete = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('فشل حذف الملف')
      }

      toast.success('تم نقل الملف إلى سلة المحذوفات')
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId))
    } catch (error) {
      console.error('Error deleting file:', error)
      toast.error('فشل حذف الملف')
    }
  }

  return (
    <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              الملفات المفضلة
            </h1>
            <p className="text-muted-foreground mt-2">
              {files.length + folders.length > 0 
                ? `${folders.length} مجلد • ${files.length} ملف` 
                : 'لا توجد عناصر مفضلة'}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-9 px-3"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-9 px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : files.length === 0 && folders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Star className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد عناصر مفضلة</h3>
              <p className="text-sm text-muted-foreground">
                قم بإضافة ملفات أو مجلدات إلى المفضلة لتظهر هنا
              </p>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onOpen={handleOpenFolder}
                onToggleFavorite={handleToggleFolderFavorite}
              />
            ))}
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onPreview={handleFilePreview}
                onShare={handleShare}
                onToggleFavorite={handleToggleFavorite}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <FolderCard
                      folder={folder}
                      onOpen={handleOpenFolder}
                      onToggleFavorite={handleToggleFolderFavorite}
                      viewMode="list"
                    />
                  </div>
                ))}
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <FileCard
                      file={file}
                      onPreview={handleFilePreview}
                      onShare={handleShare}
                      onToggleFavorite={handleToggleFavorite}
                      onDownload={handleDownload}
                      onDelete={handleDelete}
                      viewMode="list"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Dialog */}
        {selectedFile && (
          <FilePreviewDialog
            open={previewOpen}
            onOpenChange={setPreviewOpen}
            fileId={selectedFile.id}
            fileName={selectedFile.name}
            mimeType={selectedFile.mimeType || 'application/octet-stream'}
          />
        )}

        {/* Share Dialog */}
        {fileToShare && (
          <ShareFileDialog
            open={shareDialogOpen}
            onOpenChange={setShareDialogOpen}
            fileId={fileToShare.id}
            fileName={fileToShare.name}
          />
        )}
      </div>
  )
}

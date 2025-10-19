'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileCard } from '@/components/file-card'
import { DeleteFileDialog } from '@/components/delete-file-dialog'
import { ShareFileDialog } from '@/components/share-file-dialog'
import FilePreviewDialog from '@/components/file-preview-dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Clock, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface FileData {
  id: string
  name: string
  size: number
  mimeType: string
  createdAt: string
  storageKey: string
  folder: {
    id: string
    name: string
  } | null
}

export function RecentFilesCard() {
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteFileOpen, setDeleteFileOpen] = useState(false)
  const [shareFileOpen, setShareFileOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string; mimeType?: string } | null>(null)

  const fetchRecentFiles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/files/recent?days=7&limit=6')
      
      if (!response.ok) {
        throw new Error('فشل تحميل الملفات الأخيرة')
      }

      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error('Error fetching recent files:', error)
      toast.error('فشل تحميل الملفات الأخيرة')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentFiles()
  }, [])

  const handleFileDelete = (fileId: string, fileName: string) => {
    setSelectedFile({ id: fileId, name: fileName })
    setDeleteFileOpen(true)
  }

  const handleFileShare = (fileId: string, fileName: string) => {
    setSelectedFile({ id: fileId, name: fileName })
    setShareFileOpen(true)
  }

  const handleFilePreview = (fileId: string, fileName: string, mimeType: string) => {
    setSelectedFile({ id: fileId, name: fileName, mimeType })
    setPreviewOpen(true)
  }

  const handleDialogSuccess = () => {
    fetchRecentFiles()
  }

  return (
    <>
      <Card dir="rtl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                الملفات الأخيرة
              </CardTitle>
              <CardDescription>
                آخر الملفات التي تم رفعها (7 أيام)
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/files">
                <ArrowLeft className="h-4 w-4 ml-2" />
                عرض الكل
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>لا توجد ملفات حديثة</p>
              <p className="text-sm mt-2">ابدأ برفع ملفاتك</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  viewMode="grid"
                  onDelete={handleFileDelete}
                  onShare={handleFileShare}
                  onPreview={handleFilePreview}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <DeleteFileDialog
        open={deleteFileOpen}
        onOpenChange={setDeleteFileOpen}
        fileId={selectedFile?.id || null}
        fileName={selectedFile?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      <ShareFileDialog
        open={shareFileOpen}
        onOpenChange={setShareFileOpen}
        fileId={selectedFile?.id || null}
        fileName={selectedFile?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      {selectedFile && (
        <FilePreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          fileId={selectedFile.id}
          fileName={selectedFile.name}
          mimeType={selectedFile.mimeType || ''}
        />
      )}
    </>
  )
}

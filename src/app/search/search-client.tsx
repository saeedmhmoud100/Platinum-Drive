'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileCard } from '@/components/cards/file-card'
import { FolderCard } from '@/components/cards/folder-card'
import { DeleteFileDialog } from '@/components/dialogs/delete-file-dialog'
import { ShareFileDialog } from '@/components/dialogs/share-file-dialog'
import FilePreviewDialog from '@/components/dialogs/file-preview-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Grid3x3, List, Loader2, Search, X } from 'lucide-react'
import { toast } from 'sonner'

interface SearchPageClientProps {
  userId: string
}

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

interface FolderData {
  id: string
  name: string
  createdAt: string
  _count: {
    files: number
    children: number
  }
}

export default function SearchPageClient({ userId }: SearchPageClientProps) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [files, setFiles] = useState<FileData[]>([])
  const [folders, setFolders] = useState<FolderData[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Search state
  const [query, setQuery] = useState(initialQuery)
  const [fileType, setFileType] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('date-desc')
  
  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalFiles, setTotalFiles] = useState(0)
  const [totalFolders, setTotalFolders] = useState(0)
  
  // Dialog states
  const [deleteFileOpen, setDeleteFileOpen] = useState(false)
  const [shareFileOpen, setShareFileOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string; mimeType?: string } | null>(null)

  // Fetch search results
  const fetchResults = async () => {
    if (!query.trim() && !fileType) {
      setFiles([])
      setFolders([])
      return
    }

    try {
      setLoading(true)
      
      const params = new URLSearchParams()
      if (query.trim()) params.append('q', query.trim())
      if (fileType) params.append('fileType', fileType)
      params.append('page', page.toString())
      params.append('limit', '20')

      const response = await fetch(`/api/search?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('فشل البحث')
      }

      const data = await response.json()
      setFiles(data.files || [])
      setFolders(data.folders || [])
      setTotalFiles(data.totalFiles || 0)
      setTotalFolders(data.totalFolders || 0)
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error('Search error:', error)
      toast.error('فشل البحث')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [query, fileType, page])

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchResults()
  }

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
    fetchResults()
  }

  const handleClearFilters = () => {
    setQuery('')
    setFileType('')
    setPage(1)
  }

  const hasActiveFilters = query.trim() || fileType
  const totalResults = totalFiles + totalFolders
  const hasResults = files.length > 0 || folders.length > 0

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">البحث</h1>
          <p className="text-muted-foreground">
            {hasActiveFilters
              ? `${totalResults} نتيجة`
              : 'ابحث عن ملفاتك ومجلداتك'}
          </p>
        </div>
        <div className="flex gap-2">
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
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch}>
            {/* Main Search Row */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1 max-w-xl" dir="rtl">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="ابحث عن ملفات ومجلدات..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pr-10 h-10"
                  dir="rtl"
                />
              </div>

              {/* File Type Filter */}
              <Select value={fileType || "all"} onValueChange={(value) => setFileType(value === "all" ? "" : value)}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                  <SelectValue placeholder="نوع الملف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="image">صور</SelectItem>
                  <SelectItem value="document">مستندات</SelectItem>
                  <SelectItem value="video">فيديوهات</SelectItem>
                  <SelectItem value="audio">صوتيات</SelectItem>
                  <SelectItem value="archive">مضغوطات</SelectItem>
                </SelectContent>
              </Select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="h-10">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearFilters}
                    size="icon"
                    className="h-10 w-10"
                    title="مسح الفلاتر"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : hasResults ? (
        <div className="space-y-6">
          {/* Folders */}
          {folders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>المجلدات ({folders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                    : 'space-y-2'
                }>
                  {folders.map((folder) => (
                    <FolderCard
                      key={folder.id}
                      folder={folder}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Files */}
          {files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>الملفات ({files.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                    : 'space-y-2'
                }>
                  {files.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      viewMode={viewMode}
                      onDelete={handleFileDelete}
                      onShare={handleFileShare}
                      onPreview={handleFilePreview}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                السابق
              </Button>
              <span className="text-sm text-muted-foreground">
                صفحة {page} من {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                التالي
              </Button>
            </div>
          )}
        </div>
      ) : hasActiveFilters ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>لا توجد نتائج</p>
              <p className="text-sm mt-2">جرب تغيير معايير البحث</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>ابدأ البحث عن ملفاتك ومجلداتك</p>
              <p className="text-sm mt-2">استخدم الحقول أعلاه للبحث</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Dialog */}
      <DeleteFileDialog
        open={deleteFileOpen}
        onOpenChange={setDeleteFileOpen}
        fileId={selectedFile?.id || null}
        fileName={selectedFile?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      {/* Share Dialog */}
      <ShareFileDialog
        open={shareFileOpen}
        onOpenChange={setShareFileOpen}
        fileId={selectedFile?.id || null}
        fileName={selectedFile?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      {/* Preview Dialog */}
      {selectedFile && (
        <FilePreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          fileId={selectedFile.id}
          fileName={selectedFile.name}
          mimeType={selectedFile.mimeType || ''}
        />
      )}
    </div>
  )
}

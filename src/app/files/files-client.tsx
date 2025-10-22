'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUploadZone } from '@/components/file-upload-zone'
import { FileCard } from '@/components/file-card'
import { FolderCard } from '@/components/folder-card'
import { FolderBreadcrumb } from '@/components/folder-breadcrumb'
import { CreateFolderDialog } from '@/components/create-folder-dialog'
import { RenameFolderDialog } from '@/components/rename-folder-dialog'
import { DeleteFolderDialog } from '@/components/delete-folder-dialog'
import { DeleteFileDialog } from '@/components/delete-file-dialog'
import { ShareFileDialog } from '@/components/share-file-dialog'
import FilePreviewDialog from '@/components/file-preview-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RefreshCw, Grid3x3, List, Loader2, FolderPlus, Upload } from 'lucide-react'
import { toast } from 'sonner'

interface FilesPageClientProps {
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

interface BreadcrumbItem {
  id: string | null
  name: string
}

export default function FilesPageClient({ userId }: FilesPageClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [files, setFiles] = useState<FileData[]>([])
  const [folders, setFolders] = useState<FolderData[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('name')
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [breadcrumbPath, setBreadcrumbPath] = useState<BreadcrumbItem[]>([
    { id: null, name: 'الرئيسية' }
  ])
  const [refreshKey, setRefreshKey] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const isProcessingUrlChange = useRef(false)
  
  // Dialog states
  const [createFolderOpen, setCreateFolderOpen] = useState(false)
  const [renameFolderOpen, setRenameFolderOpen] = useState(false)
  const [deleteFolderOpen, setDeleteFolderOpen] = useState(false)
  const [deleteFileOpen, setDeleteFileOpen] = useState(false)
  const [shareFileOpen, setShareFileOpen] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null)
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string; mimeType?: string } | null>(null)

  // Load user settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/user/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.settings) {
            // Map compact to list since components only support grid/list
            const userViewMode = data.settings.defaultViewMode || 'grid'
            setViewMode(userViewMode === 'compact' ? 'list' : userViewMode as 'grid' | 'list')
            setSortBy(data.settings.defaultSortBy || 'name')
          }
        }
      } catch (error) {
        console.error('Error loading user settings:', error)
      }
    }
    loadSettings()
  }, [])

  // Fetch files and folders
  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch folders
      const foldersResponse = await fetch(`/api/folders${currentFolderId ? `?parentId=${currentFolderId}` : ''}`)
      if (!foldersResponse.ok) throw new Error('فشل تحميل المجلدات')
      const foldersData = await foldersResponse.json()
      setFolders(foldersData.folders || [])

      // Fetch files
      const filesResponse = await fetch(`/api/files${currentFolderId ? `?folderId=${currentFolderId}` : ''}`)
      if (!filesResponse.ok) throw new Error('فشل تحميل الملفات')
      const filesData = await filesResponse.json()
      setFiles(filesData.files || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('فشل تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }

  // Read folder from URL on mount
  useEffect(() => {
    const folderParam = searchParams.get('folder')
    
    // Prevent concurrent processing
    if (isProcessingUrlChange.current) {
      return
    }
    
    // Only proceed if the URL folder is different from current state
    if (folderParam && folderParam !== currentFolderId) {
      isProcessingUrlChange.current = true
      
      // Clear current data and show loading immediately
      setLoading(true)
      setFiles([])
      setFolders([])
      
      // Fetch folder details and build breadcrumb path
      const buildBreadcrumbPath = async (folderId: string) => {
        try {
          const response = await fetch(`/api/folders/${folderId}`)
          if (!response.ok) throw new Error('فشل تحميل المجلد')
          
          const data = await response.json()
          const folder = data.folder
          
          // Build path from root to current folder
          const path: BreadcrumbItem[] = [{ id: null, name: 'الرئيسية' }]
          
          // If folder has parent, we need to fetch parent chain
          if (folder.parent) {
            // For now, just add parent (could be extended to fetch full chain)
            path.push({ id: folder.parent.id, name: folder.parent.name })
          }
          
          // Add current folder
          path.push({ id: folder.id, name: folder.name })
          
          // Update both breadcrumb and folderId together
          setBreadcrumbPath(path)
          setCurrentFolderId(folderId)
        } catch (error) {
          console.error('Error building breadcrumb:', error)
          // Fallback to simple breadcrumb
          setBreadcrumbPath([
            { id: null, name: 'الرئيسية' },
            { id: folderId, name: 'مجلد' }
          ])
          setCurrentFolderId(folderId)
        } finally {
          isProcessingUrlChange.current = false
        }
      }
      
      buildBreadcrumbPath(folderParam)
    } else if (!folderParam && currentFolderId !== null) {
      isProcessingUrlChange.current = true
      
      // Clear data when navigating back to root
      setLoading(true)
      setFiles([])
      setFolders([])
      setBreadcrumbPath([{ id: null, name: 'الرئيسية' }])
      setCurrentFolderId(null)
      
      isProcessingUrlChange.current = false
    }
  }, [searchParams, currentFolderId])

  useEffect(() => {
    fetchData()
  }, [refreshKey, currentFolderId])

  const handleCreateFolder = () => {
    setCreateFolderOpen(true)
  }

  const handleRenameFolder = (folderId: string, currentName: string) => {
    setSelectedFolder({ id: folderId, name: currentName })
    setRenameFolderOpen(true)
  }

  const handleDeleteFolder = (folderId: string, folderName: string) => {
    setSelectedFolder({ id: folderId, name: folderName })
    setDeleteFolderOpen(true)
  }

  const handleOpenFolder = async (folderId: string) => {
    // Prevent navigation if already navigating or already in this folder
    if (isNavigating || currentFolderId === folderId) {
      return
    }

    // Navigate using URL - this will trigger the useEffect that reads searchParams
    router.push(`/files?folder=${folderId}`)
  }

  const handleNavigateTo = (folderId: string | null) => {
    // Navigate using URL - if null (root), go to /files, otherwise go to /files?folder=id
    if (folderId === null) {
      router.push('/files')
    } else {
      router.push(`/files?folder=${folderId}`)
    }
  }

  const handleUploadComplete = (fileId: string) => {
    setRefreshKey(prev => prev + 1)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
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

  const handleToggleFileFavorite = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}/favorite`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('فشل تحديث المفضلة')
      }

      const data = await response.json()
      toast.success(data.message)
      
      // Refresh the file list to show updated favorite status
      handleRefresh()
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('فشل تحديث المفضلة')
    }
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
      
      // Refresh the folder list to show updated favorite status
      handleRefresh()
    } catch (error) {
      console.error('Error toggling folder favorite:', error)
      toast.error('فشل تحديث المفضلة')
    }
  }

  const handleDialogSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  const totalItems = files.length + folders.length

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ملفاتي</h1>
          <p className="text-muted-foreground">
            قم برفع وإدارة ملفاتك ومجلداتك
          </p>
        </div>
        <div className="flex gap-2">
          {/* Create Folder Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateFolder}
          >
            <FolderPlus className="h-4 w-4 ml-2" />
            مجلد جديد
          </Button>

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

      {/* Breadcrumb Navigation */}
      {breadcrumbPath.length > 1 && (
        <Card>
          <CardContent className="py-3">
            <FolderBreadcrumb 
              path={breadcrumbPath}
              onNavigate={handleNavigateTo}
            />
          </CardContent>
        </Card>
      )}

      {/* Files and Folders List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                المحتويات ({totalItems})
              </CardTitle>
              <CardDescription>
                {folders.length > 0 && `${folders.length} مجلد`}
                {folders.length > 0 && files.length > 0 && ' • '}
                {files.length > 0 && `${files.length} ملف`}
                {totalItems === 0 && 'لا توجد محتويات بعد'}
              </CardDescription>
            </div>
            <Button
              onClick={() => setUploadDialogOpen(true)}
              size="sm"
            >
              <Upload className="h-4 w-4 ml-2" />
              رفع ملفات
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : totalItems === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>لا توجد ملفات أو مجلدات</p>
              <p className="text-sm mt-2">قم بإنشاء مجلد أو رفع ملف للبدء</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                : 'space-y-2'
            }>
              {/* Folders First */}
              {folders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  viewMode={viewMode}
                  onOpen={handleOpenFolder}
                  onDelete={handleDeleteFolder}
                  onRename={handleRenameFolder}
                  onToggleFavorite={handleToggleFolderFavorite}
                />
              ))}

              {/* Then Files */}
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  viewMode={viewMode}
                  onDelete={handleFileDelete}
                  onShare={handleFileShare}
                  onPreview={handleFilePreview}
                  onToggleFavorite={handleToggleFileFavorite}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateFolderDialog
        open={createFolderOpen}
        onOpenChange={setCreateFolderOpen}
        parentFolderId={currentFolderId}
        onSuccess={handleDialogSuccess}
      />

      <RenameFolderDialog
        open={renameFolderOpen}
        onOpenChange={setRenameFolderOpen}
        folderId={selectedFolder?.id || null}
        currentName={selectedFolder?.name || ''}
        onSuccess={handleDialogSuccess}
      />

      <DeleteFolderDialog
        open={deleteFolderOpen}
        onOpenChange={setDeleteFolderOpen}
        folderId={selectedFolder?.id || null}
        folderName={selectedFolder?.name || ''}
        onSuccess={handleDialogSuccess}
      />

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

      {/* File Preview Dialog */}
      {selectedFile && (
        <FilePreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          fileId={selectedFile.id}
          fileName={selectedFile.name}
          mimeType={selectedFile.mimeType || ''}
        />
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div dir="rtl" className="space-y-4">
            <DialogHeader className="text-right">
              <DialogTitle className="text-right">رفع الملفات</DialogTitle>
              <DialogDescription className="text-right">
                اسحب وأفلت الملفات أو انقر لتحديدها
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FileUploadZone
                folderId={currentFolderId}
                onUploadComplete={handleUploadComplete}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

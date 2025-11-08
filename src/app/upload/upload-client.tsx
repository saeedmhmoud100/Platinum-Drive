'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Upload,
  FileIcon,
  FolderIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CloudUpload,
} from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize } from '@/lib/utils/file'

interface FolderOption {
  id: string
  name: string
  depth: number
  parentId: string | null
}

interface UploadFile {
  file: File
  id: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export default function UploadPageClient() {
  const [folders, setFolders] = useState<FolderOption[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [loadingFolders, setLoadingFolders] = useState(true)

  // Fetch all folders
  useEffect(() => {
    fetchAllFolders()
  }, [])

  const fetchAllFolders = async () => {
    try {
      setLoadingFolders(true)
      const response = await fetch('/api/folders/all')
      if (!response.ok) throw new Error('فشل تحميل المجلدات')
      
      const data = await response.json()
      setFolders(data.folders)
    } catch (error) {
      console.error('Error fetching folders:', error)
      toast.error('فشل تحميل المجلدات')
      setFolders([])
    } finally {
      setLoadingFolders(false)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'pending',
    }))
    setUploadFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const uploadFile = async (uploadFile: UploadFile) => {
    const formData = new FormData()
    formData.append('file', uploadFile.file)
    if (selectedFolder) {
      formData.append('folderId', selectedFolder)
    }

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, progress, status: 'uploading' }
                : f
            )
          )
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, progress: 100, status: 'success' }
                : f
            )
          )
          resolve()
        } else {
          // Try to parse error message from server
          let errorMessage = 'فشل رفع الملف'
          try {
            const response = JSON.parse(xhr.responseText)
            errorMessage = response.error || errorMessage
          } catch (e) {
            // Use default error message
          }
          
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, status: 'error', error: errorMessage } : f
            )
          )
          reject(new Error(errorMessage))
        }
      })

      xhr.addEventListener('error', () => {
        const error = 'حدث خطأ في الاتصال بالخادم'
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: 'error', error } : f
          )
        )
        reject(new Error(error))
      })

      xhr.open('POST', '/api/files/upload')
      xhr.send(formData)
    })
  }

  const handleUploadAll = async () => {
    const pendingFiles = uploadFiles.filter((f) => f.status === 'pending')
    if (pendingFiles.length === 0) {
      toast.info('لا توجد ملفات للرفع')
      return
    }

    setIsUploading(true)
    let successCount = 0
    let errorCount = 0

    try {
      // Upload files sequentially to avoid overwhelming the server
      for (const file of pendingFiles) {
        try {
          await uploadFile(file)
          successCount++
        } catch (error) {
          console.error('Error uploading file:', error)
          errorCount++
        }
      }

      // Show toast notifications based on results
      if (successCount > 0 && errorCount === 0) {
        toast.success(`تم رفع ${successCount} ملف بنجاح ✓`)
      } else if (successCount > 0 && errorCount > 0) {
        toast.warning(`تم رفع ${successCount} ملف بنجاح، فشل رفع ${errorCount} ملف`)
      } else if (errorCount > 0) {
        toast.error(`فشل رفع ${errorCount} ملف`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('حدث خطأ أثناء الرفع')
    } finally {
      setIsUploading(false)
    }
  }

  const clearCompleted = () => {
    setUploadFiles((prev) => prev.filter((f) => f.status !== 'success'))
  }

  const clearAll = () => {
    setUploadFiles([])
  }

  const totalSize = uploadFiles.reduce((acc, f) => acc + f.file.size, 0)
  const completedCount = uploadFiles.filter((f) => f.status === 'success').length
  const errorCount = uploadFiles.filter((f) => f.status === 'error').length
  const pendingCount = uploadFiles.filter((f) => f.status === 'pending').length

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CloudUpload className="h-8 w-8" />
          رفع الملفات
        </h1>
        <p className="text-muted-foreground mt-2">
          قم برفع ملفاتك واختر المجلد المناسب لحفظها
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Folder Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderIcon className="h-5 w-5" />
                اختر المجلد الوجهة
              </CardTitle>
              <CardDescription>
                حدد المجلد الذي تريد رفع الملفات إليه
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedFolder || 'root'}
                onValueChange={(value) =>
                  setSelectedFolder(value === 'root' ? null : value)
                }
                disabled={loadingFolders}
                dir="rtl"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر مجلد" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {/* Root folder option */}
                  <SelectItem value="root">
                    <div className="flex items-center gap-2">
                      <FolderIcon className="h-4 w-4" />
                      <span>الرئيسية</span>
                    </div>
                  </SelectItem>
                  
                  {/* Nested folders with indentation */}
                  {folders.map((folder) => (
                    <SelectItem
                      key={folder.id}
                      value={folder.id}
                    >
                      <div className="flex items-center gap-2" style={{ paddingRight: `${folder.depth * 20}px` }}>
                        <FolderIcon className="h-4 w-4 flex-shrink-0" />
                        <span>{folder.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Drop Zone */}
          <Card>
            <CardContent className="p-0">
              <div
                {...getRootProps()}
                className={`
                  min-h-[300px] flex flex-col items-center justify-center
                  border-2 border-dashed rounded-lg m-6 p-12 cursor-pointer
                  transition-colors
                  ${
                    isDragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <Upload
                  className={`h-16 w-16 mb-4 ${
                    isDragActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                {isDragActive ? (
                  <p className="text-lg font-medium text-primary">
                    أفلت الملفات هنا...
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-medium mb-2">
                      اسحب الملفات وأفلتها هنا
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      أو انقر لاختيار الملفات
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 ml-2" />
                      اختر ملفات
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Actions - 1/3 width */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الإحصائيات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">إجمالي الملفات</span>
                <Badge variant="secondary">{uploadFiles.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">قيد الانتظار</span>
                <Badge variant="outline">{pendingCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">مكتمل</span>
                <Badge variant="default" className="bg-green-500">
                  {completedCount}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">فشل</span>
                <Badge variant="destructive">{errorCount}</Badge>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">الحجم الإجمالي</span>
                  <span className="text-sm font-bold">{formatFileSize(totalSize)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الإجراءات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleUploadAll}
                disabled={isUploading || pendingCount === 0}
                className="w-full"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    جاري الرفع...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 ml-2" />
                    رفع الكل ({pendingCount})
                  </>
                )}
              </Button>
              <Button
                onClick={clearCompleted}
                disabled={completedCount === 0}
                variant="outline"
                className="w-full"
              >
                <CheckCircle2 className="h-4 w-4 ml-2" />
                مسح المكتملة
              </Button>
              <Button
                onClick={clearAll}
                disabled={uploadFiles.length === 0}
                variant="outline"
                className="w-full"
              >
                <X className="h-4 w-4 ml-2" />
                مسح الكل
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Files List */}
      {uploadFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">قائمة الملفات</CardTitle>
            <CardDescription>
              {uploadFiles.length} ملف • {formatFileSize(totalSize)}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y" dir="rtl">
                {uploadFiles.map((uploadFile) => (
                  <div
                    key={uploadFile.id}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {uploadFile.status === 'success' ? (
                          <CheckCircle2 className="h-10 w-10 text-green-500" />
                        ) : uploadFile.status === 'error' ? (
                          <AlertCircle className="h-10 w-10 text-destructive" />
                        ) : uploadFile.status === 'uploading' ? (
                          <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        ) : (
                          <FileIcon className="h-10 w-10 text-muted-foreground" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate" dir="rtl">
                              {uploadFile.file.name}
                            </p>
                            <p className="text-sm text-muted-foreground" dir="ltr">
                              {formatFileSize(uploadFile.file.size)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(uploadFile.id)}
                            disabled={uploadFile.status === 'uploading'}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Progress */}
                        {uploadFile.status === 'uploading' && (
                          <div className="mt-2">
                            <Progress value={uploadFile.progress} />
                            <p className="text-xs text-muted-foreground mt-1">
                              {uploadFile.progress}%
                            </p>
                          </div>
                        )}

                        {/* Error */}
                        {uploadFile.status === 'error' && uploadFile.error && (
                          <p className="text-sm text-destructive mt-2">
                            {uploadFile.error}
                          </p>
                        )}

                        {/* Status Badge */}
                        <div className="mt-2">
                          {uploadFile.status === 'pending' && (
                            <Badge variant="outline">قيد الانتظار</Badge>
                          )}
                          {uploadFile.status === 'success' && (
                            <Badge variant="default" className="bg-green-500">
                              تم الرفع
                            </Badge>
                          )}
                          {uploadFile.status === 'error' && (
                            <Badge variant="destructive">فشل</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

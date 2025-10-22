'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDateFormatter } from '@/hooks/use-date-formatter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  File,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
  Download,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  Calendar,
  User,
  Clock,
} from 'lucide-react'
import { formatFileSize, getFileCategory } from '@/lib/file-utils'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ShareAccessClientProps {
  token: string
}

interface SharedFileData {
  file: {
    id: string
    name: string
    size: number
    mimeType: string
    createdAt: string
    owner: {
      name: string | null
      email: string
    }
  }
  sharedLink: {
    id: string
    expiresAt: string | null
    permission: string
    createdAt: string
    requiresPassword: boolean
  }
  canDownload: boolean
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

export default function ShareAccessClient({ token }: ShareAccessClientProps) {
  const { formatDate } = useDateFormatter()
  const [fileData, setFileData] = useState<SharedFileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [validatedPassword, setValidatedPassword] = useState<string | null>(() => {
    // Try to restore password from sessionStorage
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(`share_pwd_${token}`)
    }
    return null
  })
  const [isDownloading, setIsDownloading] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const fetchSharedFile = async (pwd?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/share/public/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      })

      if (response.status === 401) {
        // Password required or incorrect
        setPasswordDialogOpen(true)
        setLoading(false)
        return false // Indicate failure
      }

      if (response.status === 410) {
        setError('انتهت صلاحية هذا الرابط')
        setLoading(false)
        return false
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'فشل الوصول إلى الملف')
      }

      const data = await response.json()
      setFileData(data)
      setPasswordDialogOpen(false)
      // Save the validated password for future use (like downloads)
      if (pwd) {
        setValidatedPassword(pwd)
        // Persist to sessionStorage for page refreshes
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(`share_pwd_${token}`, pwd)
        }
      }
      return true // Indicate success
    } catch (error: any) {
      console.error('Error fetching shared file:', error)
      setError(error.message || 'حدث خطأ أثناء تحميل الملف')
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // If we have a validated password from sessionStorage, use it
    fetchSharedFile(validatedPassword || undefined)
  }, [token])

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      toast.error('الرجاء إدخال كلمة المرور')
      return
    }
    setIsValidating(true)
    const success = await fetchSharedFile(password)
    setIsValidating(false)
    
    if (!success) {
      toast.error('كلمة المرور غير صحيحة')
      setPassword('')
    } else {
      toast.success('تم فتح الملف بنجاح')
    }
  }

  const handleDownload = async () => {
    if (!fileData || !fileData.canDownload) {
      toast.error('التحميل غير مسموح لهذا الملف')
      return
    }

    try {
      setIsDownloading(true)
      const response = await fetch(`/api/share/download/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: validatedPassword || undefined }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'فشل تحميل الملف')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileData.file.name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('تم تحميل الملف بنجاح')
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(error.message || 'فشل تحميل الملف')
    } finally {
      setIsDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-20" dir="rtl">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">جاري تحميل الملف...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-20" dir="rtl">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
              <h2 className="text-xl font-semibold mb-2">خطأ في الوصول</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show password prompt card if file data is not loaded
  if (!fileData) {
    return (
      <>
        <div className="container mx-auto py-20" dir="rtl">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">ملف محمي بكلمة مرور</h2>
                <p className="text-muted-foreground">
                  هذا الملف محمي. الرجاء إدخال كلمة المرور للوصول إليه.
                </p>
                <Button 
                  onClick={() => setPasswordDialogOpen(true)}
                  className="mt-4"
                  size="lg"
                >
                  <Lock className="ml-2 h-5 w-5" />
                  إدخال كلمة المرور
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Password Dialog */}
        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <div dir="rtl" className="space-y-4">
              <DialogHeader className="text-right">
                <DialogTitle className="text-right flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  ملف محمي
                </DialogTitle>
                <DialogDescription className="text-right">
                  هذا الملف محمي بكلمة مرور. الرجاء إدخال كلمة المرور للوصول إليه.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    dir="rtl"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isValidating || !password.trim()}
                    className="flex-1"
                  >
                    {isValidating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    فتح
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPasswordDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  const FileIcon = fileData ? getFileIcon(fileData.file.mimeType) : File
  const iconColor = fileData ? getFileIconColor(fileData.file.mimeType) : 'text-gray-500'
  const formattedDate = fileData ? formatDate(fileData.file.createdAt) : ''
  const expiryDate = fileData?.sharedLink.expiresAt
    ? formatDate(fileData.sharedLink.expiresAt, true)
    : null

  return (
    <>
      {fileData && (
        <div className="container mx-auto py-10 px-4" dir="rtl">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                ملف مشارك
              </CardTitle>
              <CardDescription>
                تمت مشاركة هذا الملف معك
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-6">
            {/* File Icon and Name */}
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                <FileIcon className={cn('h-12 w-12', iconColor)} />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-1">{fileData.file.name}</h2>
                <p className="text-muted-foreground">{formatFileSize(fileData.file.size)}</p>
              </div>
            </div>

            {/* File Info */}
            <div className="space-y-3 bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  المالك:
                </span>
                <span className="font-medium">
                  {fileData.file.owner.name || fileData.file.owner.email}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  تاريخ الإنشاء:
                </span>
                <span className="font-medium">{formattedDate}</span>
              </div>
              {expiryDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    تنتهي الصلاحية:
                  </span>
                  <span className="font-medium">{expiryDate}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  {fileData.sharedLink.requiresPassword ? (
                    <>
                      <Lock className="h-4 w-4" />
                      محمي بكلمة مرور
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      عام
                    </>
                  )}
                </span>
                <span className="font-medium">
                  {fileData.sharedLink.permission === 'read' ? 'عرض فقط' : 'عرض وتحميل'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                disabled={!fileData.canDownload || isDownloading}
                className="flex-1"
                size="lg"
              >
                {isDownloading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                <Download className="ml-2 h-5 w-5" />
                {fileData.canDownload ? 'تحميل الملف' : 'العرض فقط'}
              </Button>
            </div>

            {!fileData.canDownload && (
              <div className="text-center text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 inline ml-1" />
                هذا الملف للعرض فقط ولا يمكن تحميله
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      )}
    </>
  )
}

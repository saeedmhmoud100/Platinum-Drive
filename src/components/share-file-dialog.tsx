'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2, Copy, Check, Link as LinkIcon, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface ShareFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileId: string | null
  fileName: string
  onSuccess?: () => void
}

export function ShareFileDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
  onSuccess,
}: ShareFileDialogProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  
  // Form state
  const [expiresIn, setExpiresIn] = useState('7d')
  const [password, setPassword] = useState('')
  const [permission, setPermission] = useState('download')
  const [usePassword, setUsePassword] = useState(false)

  const handleCreateLink = async () => {
    if (!fileId) return

    try {
      setIsCreating(true)
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId,
          expiresIn,
          password: usePassword ? password : null,
          permission,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'فشل إنشاء رابط المشاركة')
      }

      const data = await response.json()
      setShareUrl(data.sharedLink.shareUrl)
      toast.success('تم إنشاء رابط المشاركة بنجاح')
      onSuccess?.()
    } catch (error: any) {
      console.error('Error creating share link:', error)
      toast.error(error.message || 'فشل إنشاء رابط المشاركة')
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('تم نسخ الرابط')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setShareUrl('')
    setPassword('')
    setUsePassword(false)
    setExpiresIn('7d')
    setPermission('download')
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <div dir="rtl" className="space-y-6">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              مشاركة الملف
            </DialogTitle>
            <DialogDescription className="text-right">
              أنشئ رابط مشاركة لـ &quot;<span className="font-semibold">{fileName}</span>&quot;
            </DialogDescription>
          </DialogHeader>

          {!shareUrl ? (
            <div className="space-y-4">
              {/* Expiration */}
              <div className="space-y-2">
                <Label htmlFor="expiration">صلاحية الرابط</Label>
                <Select value={expiresIn} onValueChange={setExpiresIn}>
                  <SelectTrigger id="expiration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">ساعة واحدة</SelectItem>
                    <SelectItem value="1d">يوم واحد</SelectItem>
                    <SelectItem value="7d">7 أيام</SelectItem>
                    <SelectItem value="30d">30 يوماً</SelectItem>
                    <SelectItem value="never">بدون صلاحية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Permission */}
              <div className="space-y-2">
                <Label>الصلاحيات</Label>
                <RadioGroup value={permission} onValueChange={setPermission}>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="read" id="read" />
                    <Label htmlFor="read" className="font-normal cursor-pointer">
                      العرض فقط (لا يمكن التحميل)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="download" id="download" />
                    <Label htmlFor="download" className="font-normal cursor-pointer">
                      العرض والتحميل
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Password Protection */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="usePassword"
                    checked={usePassword}
                    onChange={(e) => setUsePassword(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="usePassword" className="flex items-center gap-2 cursor-pointer">
                    <Lock className="h-4 w-4" />
                    حماية بكلمة مرور
                  </Label>
                </div>
                {usePassword && (
                  <Input
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="rtl"
                  />
                )}
              </div>

              {/* Create Button */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleCreateLink}
                  disabled={isCreating || (usePassword && !password.trim())}
                  className="flex-1"
                >
                  {isCreating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  <LinkIcon className="h-4 w-4 ml-2" />
                  إنشاء رابط المشاركة
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isCreating}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Share URL */}
              <div className="space-y-2">
                <Label>رابط المشاركة</Label>
                <div className="flex gap-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    dir="ltr"
                    className="font-mono text-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">الصلاحية:</span>
                  <span className="font-medium">
                    {expiresIn === 'never' ? 'بلا نهاية' : 
                     expiresIn === '1h' ? 'ساعة واحدة' :
                     expiresIn === '1d' ? 'يوم واحد' :
                     expiresIn === '7d' ? '7 أيام' : '30 يوماً'}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">الصلاحيات:</span>
                  <span className="font-medium">
                    {permission === 'read' ? 'عرض فقط' : 'عرض وتحميل'}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">كلمة المرور:</span>
                  <span className="font-medium">
                    {usePassword ? '✓ محمي' : '✗ غير محمي'}
                  </span>
                </p>
              </div>

              <Button onClick={handleClose} className="w-full">
                تم
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

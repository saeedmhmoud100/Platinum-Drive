'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface RenameFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  folderId: string | null
  currentName: string
  onSuccess: () => void
}

export function RenameFolderDialog({
  open,
  onOpenChange,
  folderId,
  currentName,
  onSuccess,
}: RenameFolderDialogProps) {
  const [folderName, setFolderName] = useState(currentName)
  const [isRenaming, setIsRenaming] = useState(false)

  useEffect(() => {
    setFolderName(currentName)
  }, [currentName, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!folderName.trim()) {
      toast.error('يرجى إدخال اسم المجلد')
      return
    }

    if (folderName.trim() === currentName) {
      onOpenChange(false)
      return
    }

    if (!folderId) return

    try {
      setIsRenaming(true)
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: folderName.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('فشل إعادة تسمية المجلد')
      }

      toast.success('تم إعادة تسمية المجلد بنجاح')
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      console.error('Error renaming folder:', error)
      toast.error('فشل إعادة تسمية المجلد')
    } finally {
      setIsRenaming(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div dir="rtl" className="space-y-4">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right">إعادة تسمية المجلد</DialogTitle>
            <DialogDescription className="text-right">
              أدخل الاسم الجديد للمجلد
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="folder-name" className="text-right">اسم المجلد</Label>
                <Input
                  id="folder-name"
                  placeholder="أدخل اسم المجلد"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  disabled={isRenaming}
                  autoFocus
                  dir="rtl"
                  className="text-right"
                />
              </div>
            </div>
            <DialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
              <Button type="submit" disabled={isRenaming}>
                {isRenaming && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                حفظ
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isRenaming}
              >
                إلغاء
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

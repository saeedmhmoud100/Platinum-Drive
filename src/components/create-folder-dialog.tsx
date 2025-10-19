'use client'

import { useState } from 'react'
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

interface CreateFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parentFolderId: string | null
  onSuccess: () => void
}

export function CreateFolderDialog({
  open,
  onOpenChange,
  parentFolderId,
  onSuccess,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!folderName.trim()) {
      toast.error('يرجى إدخال اسم المجلد')
      return
    }

    try {
      setIsCreating(true)
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: folderName.trim(),
          parentId: parentFolderId,
        }),
      })

      if (!response.ok) {
        throw new Error('فشل إنشاء المجلد')
      }

      toast.success('تم إنشاء المجلد بنجاح')
      setFolderName('')
      onOpenChange(false)
      onSuccess()
    } catch (error) {
      console.error('Error creating folder:', error)
      toast.error('فشل إنشاء المجلد')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div dir="rtl" className="space-y-4">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right">إنشاء مجلد جديد</DialogTitle>
            <DialogDescription className="text-right">
              أدخل اسم المجلد الجديد الذي تريد إنشاءه
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="folder-name" className="text-right">اسم المجلد</Label>
                <Input
                  id="folder-name"
                  placeholder="مثال: مستندات، صور، ملفات العمل"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  disabled={isCreating}
                  autoFocus
                  dir="rtl"
                  className="text-right"
                />
              </div>
            </div>
            <DialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
              <Button type="submit" disabled={isCreating}>
                {isCreating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                إنشاء المجلد
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating}
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

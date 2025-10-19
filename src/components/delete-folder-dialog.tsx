'use client'

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
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  folderId: string | null
  folderName: string
  onSuccess: () => void
}

export function DeleteFolderDialog({
  open,
  onOpenChange,
  folderId,
  folderName,
  onSuccess,
}: DeleteFolderDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!folderId) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'فشل حذف المجلد')
      }

      toast.success('تم حذف المجلد بنجاح')
      onOpenChange(false)
      onSuccess()
    } catch (error: any) {
      console.error('Error deleting folder:', error)
      toast.error(error.message || 'فشل حذف المجلد')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div dir="rtl" className="space-y-4">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle className="text-right">هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              سيتم حذف المجلد <span className="font-semibold">"{folderName}"</span> نهائياً.
              هذا الإجراء لا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

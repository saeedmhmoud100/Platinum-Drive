'use client'

import { useState } from 'react'
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
import { toast } from 'sonner'

interface DeleteFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileId: string | null
  fileName: string
  onSuccess?: () => void
}

export function DeleteFileDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
  onSuccess,
}: DeleteFileDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!fileId) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'فشل حذف الملف')
      }

      toast.success('تم نقل الملف إلى سلة المحذوفات')
      onOpenChange(false)
      onSuccess?.()
    } catch (error: any) {
      console.error('Error deleting file:', error)
      toast.error(error.message || 'فشل حذف الملف')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div dir="rtl" className="space-y-4">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle className="text-right">حذف الملف</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              هل أنت متأكد من حذف الملف &quot;<span className="font-semibold">{fileName}</span>&quot;؟
              <br />
              سيتم نقله إلى سلة المحذوفات ويمكنك استعادته خلال 30 يوماً.
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

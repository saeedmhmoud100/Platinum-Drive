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

interface PermanentDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileId: string | null
  fileName: string
  onSuccess: () => void
}

export function PermanentDeleteDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
  onSuccess,
}: PermanentDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!fileId) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/trash/${fileId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'فشل حذف الملف')
      }

      toast.success('تم حذف الملف نهائياً')
      onOpenChange(false)
      onSuccess()
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
            <AlertDialogTitle className="text-right">حذف نهائي</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              هل أنت متأكد من حذف الملف <span className="font-semibold">"{fileName}"</span> نهائياً؟
              <br />
              <span className="text-destructive font-semibold">لا يمكن التراجع عن هذا الإجراء.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف نهائياً
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

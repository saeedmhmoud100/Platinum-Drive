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

interface RestoreFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fileId: string | null
  fileName: string
  onSuccess: () => void
}

export function RestoreFileDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
  onSuccess,
}: RestoreFileDialogProps) {
  const [isRestoring, setIsRestoring] = useState(false)

  const handleRestore = async () => {
    if (!fileId) return

    try {
      setIsRestoring(true)
      const response = await fetch(`/api/trash/${fileId}`, {
        method: 'POST',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'فشل استعادة الملف')
      }

      toast.success('تم استعادة الملف بنجاح')
      onOpenChange(false)
      onSuccess()
    } catch (error: any) {
      console.error('Error restoring file:', error)
      toast.error(error.message || 'فشل استعادة الملف')
    } finally {
      setIsRestoring(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div dir="rtl" className="space-y-4">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle className="text-right">استعادة الملف</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              هل تريد استعادة الملف <span className="font-semibold">"{fileName}"</span> إلى موقعه الأصلي؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2 sm:flex-row-reverse">
            <AlertDialogAction
              onClick={handleRestore}
              disabled={isRestoring}
            >
              {isRestoring && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              استعادة
            </AlertDialogAction>
            <AlertDialogCancel disabled={isRestoring}>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HardDrive, Loader2, TrendingUp } from 'lucide-react'
import { formatFileSize } from '@/lib/file-utils'
import { toast } from 'sonner'

interface StorageStats {
  used: number
  total: number
  percentage: number
}

export function StorageStatsCard() {
  const [stats, setStats] = useState<StorageStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStorageStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/me')
      
      if (!response.ok) {
        throw new Error('فشل تحميل إحصائيات التخزين')
      }

      const data = await response.json()
      const used = Number(data.usedStorageBytes || 0)
      const total = Number(data.storageQuotaBytes || 10737418240) // 10GB default
      const percentage = total > 0 ? (used / total) * 100 : 0

      setStats({
        used,
        total,
        percentage: Math.min(percentage, 100),
      })
    } catch (error) {
      console.error('Error fetching storage stats:', error)
      toast.error('فشل تحميل إحصائيات التخزين')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStorageStats()
  }, [])

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500'
    if (percentage >= 75) return 'text-orange-500'
    if (percentage >= 50) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getCircleColor = (percentage: number) => {
    if (percentage >= 90) return 'stroke-red-500'
    if (percentage >= 75) return 'stroke-orange-500'
    if (percentage >= 50) return 'stroke-yellow-500'
    return 'stroke-green-500'
  }

  // SVG circle calculations
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (stats?.percentage || 0) / 100 * circumference

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          مساحة التخزين
        </CardTitle>
        <CardDescription>
          استخدام مساحة التخزين الخاصة بك
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Circular Progress Chart */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="transform -rotate-90" width="180" height="180">
                  {/* Background circle */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted/20"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ease-out ${getCircleColor(stats.percentage)}`}
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={`text-3xl font-bold ${getProgressColor(stats.percentage)}`}>
                    {stats.percentage.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">مستخدم</p>
                </div>
              </div>
            </div>

            {/* Storage Details */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">المستخدم</p>
                <p className="text-lg font-semibold">{formatFileSize(stats.used)}</p>
              </div>
              <div className="text-center border-x">
                <p className="text-sm text-muted-foreground mb-1">المتاح</p>
                <p className="text-lg font-semibold">{formatFileSize(stats.total - stats.used)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">الإجمالي</p>
                <p className="text-lg font-semibold">{formatFileSize(stats.total)}</p>
              </div>
            </div>

            {/* Warning Alert */}
            {stats.percentage >= 90 && (
              <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-500/20">
                <p className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  مساحة التخزين ممتلئة تقريباً
                </p>
                <p className="text-xs mt-1 opacity-80">قم بحذف بعض الملفات لتوفير مساحة</p>
              </div>
            )}
            {stats.percentage >= 75 && stats.percentage < 90 && (
              <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm rounded-lg border border-orange-500/20">
                <p className="font-medium">مساحة التخزين تقترب من الامتلاء</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>لا توجد معلومات متاحة</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

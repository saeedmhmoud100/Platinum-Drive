"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface GeneralSettings {
  theme: string
  language: string
  calendarType: string
  dateFormat: string
  timeFormat: string
  timezone: string
}

export default function GeneralSettingsForm() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [settings, setSettings] = useState<GeneralSettings>({
    theme: "system",
    language: "ar",
    calendarType: "gregorian",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    timezone: "Asia/Riyadh",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setFetching(true)
      const response = await fetch("/api/user/settings")
      if (!response.ok) throw new Error("فشل تحميل الإعدادات")
      
      const data = await response.json()
      console.log('Loaded settings:', data) // Debug log
      
      if (data.settings) {
        setSettings({
          theme: data.settings.theme || "system",
          language: data.settings.language || "ar",
          calendarType: data.settings.calendarType || "gregorian",
          dateFormat: data.settings.dateFormat || "DD/MM/YYYY",
          timeFormat: data.settings.timeFormat || "24h",
          timezone: data.settings.timezone || "Asia/Riyadh",
        })
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
      toast.error("فشل تحميل الإعدادات")
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!response.ok) throw new Error("فشل حفظ الإعدادات")

      toast.success("تم حفظ الإعدادات بنجاح", {
        description: "سيتم تطبيق التغييرات بعد إعادة تحميل الصفحة"
      })

      // Apply theme immediately
      if (settings.theme) {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        
        if (settings.theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          root.classList.add(systemTheme)
        } else {
          root.classList.add(settings.theme)
        }
      }

      // Reload page after a short delay to apply all settings
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toast.error("فشل حفظ الإعدادات")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="theme" className="text-sm font-medium">المظهر</Label>
          <Select
            value={settings.theme}
            onValueChange={(value) => setSettings({ ...settings, theme: value })}
          >
            <SelectTrigger id="theme" className="text-right h-10">
              <SelectValue placeholder="اختر المظهر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">فاتح</SelectItem>
              <SelectItem value="dark">داكن</SelectItem>
              <SelectItem value="system">تلقائي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm font-medium">اللغة</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => setSettings({ ...settings, language: value })}
          >
            <SelectTrigger id="language" className="text-right h-10">
              <SelectValue placeholder="اختر اللغة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en" disabled>
                <div className="flex items-center gap-2">
                  <span>English</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded">قريباً</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendarType" className="text-sm font-medium">نوع التقويم</Label>
          <Select
            value={settings.calendarType}
            onValueChange={(value) => setSettings({ ...settings, calendarType: value })}
          >
            <SelectTrigger id="calendarType" className="text-right h-10">
              <SelectValue placeholder="اختر نوع التقويم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gregorian">ميلادي</SelectItem>
              <SelectItem value="hijri">هجري</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFormat" className="text-sm font-medium">تنسيق التاريخ</Label>
          <Select
            value={settings.dateFormat}
            onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
          >
            <SelectTrigger id="dateFormat" className="text-right h-10">
              <SelectValue placeholder="اختر تنسيق التاريخ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeFormat" className="text-sm font-medium">تنسيق الوقت</Label>
          <Select
            value={settings.timeFormat}
            onValueChange={(value) => setSettings({ ...settings, timeFormat: value })}
          >
            <SelectTrigger id="timeFormat" className="text-right h-10">
              <SelectValue placeholder="اختر تنسيق الوقت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12h">12 ساعة</SelectItem>
              <SelectItem value="24h">24 ساعة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone" className="text-sm font-medium">المنطقة الزمنية</Label>
          <Select
            value={settings.timezone}
            onValueChange={(value) => setSettings({ ...settings, timezone: value })}
          >
            <SelectTrigger id="timezone" className="text-right h-10">
              <SelectValue placeholder="اختر المنطقة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
              <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
              <SelectItem value="Africa/Cairo">القاهرة (GMT+2)</SelectItem>
              <SelectItem value="Europe/London">لندن (GMT+0)</SelectItem>
              <SelectItem value="America/New_York">نيويورك (GMT-5)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-start">
        <Button type="submit" disabled={loading} className="px-8">
          {loading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            "حفظ التغييرات"
          )}
        </Button>
      </div>
    </form>
  )
}

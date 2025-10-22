"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface NotificationSettings {
  notifyOnUpload: boolean
  notifyOnStorageLimit: boolean
  notifyOnSharedLink: boolean
  notifyOnFileActivity: boolean
}

export default function NotificationSettingsForm() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [settings, setSettings] = useState<NotificationSettings>({
    notifyOnUpload: true,
    notifyOnStorageLimit: true,
    notifyOnSharedLink: true,
    notifyOnFileActivity: true,
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
      if (data.settings) {
        setSettings({
          notifyOnUpload: data.settings.notifyOnUpload ?? true,
          notifyOnStorageLimit: data.settings.notifyOnStorageLimit ?? true,
          notifyOnSharedLink: data.settings.notifyOnSharedLink ?? true,
          notifyOnFileActivity: data.settings.notifyOnFileActivity ?? true,
        })
      }
    } catch (error) {
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

      toast.success("تم حفظ الإعدادات بنجاح")
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
      {/* أنواع الإشعارات */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold">إعدادات الإشعارات</h3>
          <p className="text-sm text-muted-foreground">اختر الأحداث التي تريد تلقي إشعارات عنها</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3.5">
            <div className="space-y-0.5 text-right flex-1">
              <Label htmlFor="notifyOnUpload" className="text-sm font-medium">رفع الملفات</Label>
              <p className="text-xs text-muted-foreground">إشعارات عند اكتمال رفع الملفات</p>
            </div>
            <Switch
              id="notifyOnUpload"
              checked={settings.notifyOnUpload}
              onCheckedChange={(checked) => setSettings({ ...settings, notifyOnUpload: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border p-3.5">
            <div className="space-y-0.5 text-right flex-1">
              <Label htmlFor="notifyOnStorageLimit" className="text-sm font-medium">حد المساحة</Label>
              <p className="text-xs text-muted-foreground">إشعارات عند الاقتراب من حد المساحة</p>
            </div>
            <Switch
              id="notifyOnStorageLimit"
              checked={settings.notifyOnStorageLimit}
              onCheckedChange={(checked) => setSettings({ ...settings, notifyOnStorageLimit: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border p-3.5">
            <div className="space-y-0.5 text-right flex-1">
              <Label htmlFor="notifyOnSharedLink" className="text-sm font-medium">الروابط المشتركة</Label>
              <p className="text-xs text-muted-foreground">إشعارات عند وصول شخص لرابط مشاركتك</p>
            </div>
            <Switch
              id="notifyOnSharedLink"
              checked={settings.notifyOnSharedLink}
              onCheckedChange={(checked) => setSettings({ ...settings, notifyOnSharedLink: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border p-3.5">
            <div className="space-y-0.5 text-right flex-1">
              <Label htmlFor="notifyOnFileActivity" className="text-sm font-medium">أنشطة الملفات</Label>
              <p className="text-xs text-muted-foreground">إشعارات عند حذف أو استعادة الملفات</p>
            </div>
            <Switch
              id="notifyOnFileActivity"
              checked={settings.notifyOnFileActivity}
              onCheckedChange={(checked) => setSettings({ ...settings, notifyOnFileActivity: checked })}
            />
          </div>
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

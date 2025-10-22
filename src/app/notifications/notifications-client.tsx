"use client"

import { useEffect, useState } from "react"
import { Bell, Check, CheckCheck, Trash2, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useDateFormatter } from "@/hooks/use-date-formatter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  userId: string
  type: string
  data: {
    title: string
    message: string
    icon?: string
    link?: string
    metadata?: Record<string, any>
  }
  isRead: boolean
  createdAt: string
  delivered: boolean
  deliveredAt: string | null
}

// Helper to format time ago
function getTimeAgo(date: string, formatDate: (date: string | Date) => string): string {
  const now = new Date()
  const notifDate = new Date(date)
  const seconds = Math.floor((now.getTime() - notifDate.getTime()) / 1000)

  if (seconds < 60) return "الآن"
  if (seconds < 3600) return `منذ ${Math.floor(seconds / 60)} دقيقة`
  if (seconds < 86400) return `منذ ${Math.floor(seconds / 3600)} ساعة`
  if (seconds < 604800) return `منذ ${Math.floor(seconds / 86400)} يوم`
  return formatDate(notifDate)
}

export function NotificationsClient() {
  const router = useRouter()
  const { formatDate, formatDateTime } = useDateFormatter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const url = activeTab === "unread" 
        ? "/api/notifications?unreadOnly=true&limit=100"
        : "/api/notifications?limit=100"
      
      const response = await fetch(url)
      if (!response.ok) throw new Error("فشل تحميل الإشعارات")
      
      const data = await response.json()
      setNotifications(data.notifications)
      setTotalCount(data.totalCount)
      setUnreadCount(data.unreadCount)
    } catch (error) {
      toast.error("فشل تحميل الإشعارات")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [activeTab])

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
      })
      if (!response.ok) throw new Error("فشل تحديث الإشعار")
      
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      toast.error("فشل تحديث الإشعار")
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "POST",
      })
      if (!response.ok) throw new Error("فشل تحديث الإشعارات")
      
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      setUnreadCount(0)
      toast.success("تم تعليم جميع الإشعارات كمقروءة")
    } catch (error) {
      toast.error("فشل تحديث الإشعارات")
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("فشل حذف الإشعار")
      
      const deletedNotif = notifications.find((n) => n.id === id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      setTotalCount((prev) => prev - 1)
      
      if (deletedNotif && !deletedNotif.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
      
      toast.success("تم حذف الإشعار")
    } catch (error) {
      toast.error("فشل حذف الإشعار")
    }
  }

  const clearAllRead = async () => {
    try {
      const response = await fetch("/api/notifications/clear-all", {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("فشل مسح الإشعارات")
      
      const result = await response.json()
      setNotifications((prev) => prev.filter((n) => !n.isRead))
      setTotalCount((prev) => prev - result.deletedCount)
      
      toast.success(`تم حذف ${result.deletedCount} إشعار`)
    } catch (error) {
      toast.error("فشل مسح الإشعارات")
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    
    if (notification.data.link) {
      router.push(notification.data.link)
    }
  }

  const filteredNotifications = notifications

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Bell className="h-6 w-6" />
                الإشعارات
              </CardTitle>
              <CardDescription className="text-right mt-2">
                {unreadCount > 0 
                  ? `لديك ${unreadCount} إشعار غير مقروء`
                  : "لا توجد إشعارات غير مقروءة"
                }
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="gap-2"
                >
                  <CheckCheck className="h-4 w-4" />
                  تعليم الكل كمقروء
                </Button>
              )}
              {notifications.some(n => n.isRead) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllRead}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  مسح المقروءة
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "unread")} dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="all" className="gap-2">
                الكل
                <Badge variant="secondary">{totalCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="gap-2">
                غير المقروءة
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">جاري التحميل...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    {activeTab === "unread" ? "لا توجد إشعارات غير مقروءة" : "لا توجد إشعارات"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeTab === "unread" ? "جميع إشعاراتك مقروءة" : "ستظهر إشعاراتك هنا"}
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`group cursor-pointer transition-colors hover:bg-accent/50 ${
                          !notification.isRead ? "border-primary/30 bg-accent/30" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4" dir="rtl">
                            {notification.data.icon && (
                              <div className="text-3xl">{notification.data.icon}</div>
                            )}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-base">
                                      {notification.data.title}
                                    </h3>
                                    {!notification.isRead && (
                                      <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {notification.data.message}
                                  </p>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{getTimeAgo(notification.createdAt, formatDate)}</span>
                                <span>•</span>
                                <span>{formatDateTime(notification.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationsClient

"use client"

import * as React from "react"
import { Bell, Check, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useDateFormatter } from "@/hooks/use-date-formatter"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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

export function NotificationMenu() {
  const router = useRouter()
  const { formatDate } = useDateFormatter()
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [loading, setLoading] = React.useState(true)
  const [unreadCount, setUnreadCount] = React.useState(0)

  const fetchNotifications = React.useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true)
      const response = await fetch("/api/notifications?limit=20")
      if (!response.ok) throw new Error("فشل تحميل الإشعارات")
      
      const data = await response.json()
      setNotifications(data.notifications)
      setUnreadCount(data.unreadCount)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      if (showLoading) setLoading(false)
    }
  }, [])

  // Initial load
  React.useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Poll for new notifications every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications(false) // Don't show loading on background polls
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [fetchNotifications])

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

  const removeNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("فشل حذف الإشعار")
      
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      // Decrease unread count if the deleted notification was unread
      const deletedNotif = notifications.find((n) => n.id === id)
      if (deletedNotif && !deletedNotif.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      toast.error("فشل حذف الإشعار")
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    
    // Navigate to link if exists
    if (notification.data.link) {
      router.push(notification.data.link)
    }
  }

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] text-white"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">الإشعارات</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>الإشعارات</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-0 text-xs text-primary hover:text-primary/80"
            >
              تعليم الكل كمقروء
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">جاري التحميل...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group relative rounded-md p-3 hover:bg-accent transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-accent/50" : ""
                  }`}
                  dir="rtl"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      {notification.data.icon && (
                        <span className="text-2xl">{notification.data.icon}</span>
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-none">
                            {notification.data.title}
                          </p>
                          {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-primary mr-auto" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.data.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center justify-between">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {getTimeAgo(notification.createdAt, formatDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer justify-center text-primary"
              onClick={() => router.push("/notifications")}
            >
              <span>عرض جميع الإشعارات</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

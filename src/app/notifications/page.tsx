import { Metadata } from "next"
import MainLayout from "@/components/main-layout"
import NotificationsClient from "./notifications-client"

export const metadata: Metadata = {
  title: "الإشعارات | Platinum Drive",
  description: "عرض وإدارة جميع الإشعارات",
}

export default function NotificationsPage() {
  return (
    <MainLayout>
      <NotificationsClient />
    </MainLayout>
  )
}

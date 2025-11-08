import MainLayout from "@/components/layout/main-layout"
import { RecentFilesCard } from "@/components/cards/recent-files-card"
import { StorageStatsCard } from "@/components/cards/storage-stats-card"
import { StatsOverviewCard } from "@/components/cards/stats-overview-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FolderPlus, Search, Trash2 } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <MainLayout>
      <div className="space-y-6" dir="rtl">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold">مرحباً بك في Platinum Drive</h1>
          <p className="text-muted-foreground mt-2">
            قم بإدارة ملفاتك ومجلداتك بسهولة
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-24 flex-col gap-2">
            <Link href="/files">
              <Upload className="h-6 w-6" />
              <span>رفع ملفات</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 flex-col gap-2">
            <Link href="/files">
              <FolderPlus className="h-6 w-6" />
              <span>إنشاء مجلد</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 flex-col gap-2">
            <Link href="/search">
              <Search className="h-6 w-6" />
              <span>بحث</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 flex-col gap-2">
            <Link href="/trash">
              <Trash2 className="h-6 w-6" />
              <span>سلة المحذوفات</span>
            </Link>
          </Button>
        </div>

        {/* Storage Stats - 3:1 ratio grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <StorageStatsCard />
          </div>
          <div className="lg:col-span-1">
            <StatsOverviewCard />
          </div>
        </div>

        {/* Recent Files */}
        <RecentFilesCard />
      </div>
    </MainLayout>
  )
}


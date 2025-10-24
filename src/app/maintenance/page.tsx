import { Construction, Home, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-8 shadow-2xl">
              <Construction className="h-24 w-24 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" dir="rtl">
            الموقع قيد الصيانة
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl mx-auto" dir="rtl">
            نعمل حالياً على تحسين وتطوير الموقع لتقديم تجربة أفضل لك
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6">
            <Link href="/">
              <Button size="lg" className="gap-2 min-w-[200px]">
                <Home className="h-5 w-5" />
                <span>العودة للصفحة الرئيسية</span>
              </Button>
            </Link>
            
            <Link href="mailto:support@platinumdrive.com">
              <Button variant="outline" size="lg" className="gap-2 min-w-[200px]">
                <Mail className="h-5 w-5" />
                <span>اتصل بنا</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-muted-foreground" dir="rtl">
            نقدر صبرك وتفهمك. سنعود قريباً بخدمات محسنة! 🚀
          </p>
          <p className="text-xs text-muted-foreground mt-2" dir="rtl">
            للاستفسارات العاجلة، يرجى التواصل معنا عبر البريد الإلكتروني
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  )
}

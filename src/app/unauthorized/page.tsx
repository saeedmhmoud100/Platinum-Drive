import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      dir="rtl"
    >
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <ShieldAlert className="h-24 w-24 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">403</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            غير مصرح لك بالدخول
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            عذرا ليس لديك صلاحية للوصول إلى هذه الصفحة
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button>العودة للرئيسية</Button>
          </Link>
          <Link href="/files">
            <Button variant="outline">صفحة الملفات</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

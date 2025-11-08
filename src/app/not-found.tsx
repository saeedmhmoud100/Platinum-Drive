import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      dir="rtl"
    >
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <FileQuestion className="h-24 w-24 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            الصفحة غير موجودة
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            عذرا الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر
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

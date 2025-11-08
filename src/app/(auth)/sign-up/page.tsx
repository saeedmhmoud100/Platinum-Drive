import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserX } from "lucide-react";
import CredentialsSignUpForm from "./credentials-signup-form";
import prisma from "@/lib/db/prisma";

async function isRegistrationEnabled() {
  try {
    const setting = await prisma.systemSettings.findUnique({
      where: { key: 'general.registrationEnabled' }
    })
    // Value is now a proper boolean
    if (!setting) return true // Default to enabled if setting doesn't exist
    return setting.value === true || setting.value === 'true' // Support both for backwards compatibility
  } catch (error) {
    console.error('Error checking registration status:', error)
    return true // Default to enabled on error
  }
}

export default async function SignUpPage() {
  const registrationEnabled = await isRegistrationEnabled()

  return (
    <div className="w-full flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            أدخل بياناتك لإنشاء حساب جديد
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!registrationEnabled ? (
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20" dir="rtl">
              <UserX className="h-5 w-5 text-orange-600" />
              <AlertDescription className="text-right">
                <p className="font-medium text-orange-900 dark:text-orange-100 mb-1">
                  التسجيل غير متاح حالياً
                </p>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  عذراً، تم تعطيل التسجيل للمستخدمين الجدد مؤقتاً. يرجى المحاولة لاحقاً أو التواصل مع الإدارة.
                </p>
              </AlertDescription>
            </Alert>
          ) : (
            <CredentialsSignUpForm />
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link href="/sign-in" className="text-primary hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

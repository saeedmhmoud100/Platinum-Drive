import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Metadata } from "next";
import CredentialsSignInForm from "./credentials-signin-form";
import Link from "next/link";
import prisma from "@/lib/db/prisma";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "تسجيل الدخول",
    description: "صفحة تسجيل الدخول",
};

// Check if registration is enabled
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

const SignInPage = async () => {
    const registrationEnabled = await isRegistrationEnabled()
    
    return (
        <div className="w-full flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
                <CardDescription>
                    قم بتسجيل الدخول إلى حسابك
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<div className="text-center py-4">جاري التحميل...</div>}>
                  <CredentialsSignInForm />
                </Suspense>
            </CardContent>
            {registrationEnabled && (
              <CardFooter className="flex flex-col gap-4">
                  <div className="text-center text-sm text-muted-foreground">
                      ليس لديك حساب؟{" "}
                      <Link href="/sign-up" className="text-primary hover:underline font-medium">
                          إنشاء حساب جديد
                      </Link>
                  </div>
              </CardFooter>
            )}
        </Card>
        </div>
    );
}

export default SignInPage;
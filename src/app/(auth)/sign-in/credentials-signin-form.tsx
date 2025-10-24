'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";


const CredentialsSignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [requires2FA, setRequires2FA] = useState(false);
    const [show2FAInput, setShow2FAInput] = useState(false);
    const [twoFAVerified, setTwoFAVerified] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes = 120 seconds
    const [canResend, setCanResend] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check for error in URL params
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            if (errorParam === 'CredentialsSignin') {
                setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
            } else if (errorParam === 'AccountDisabled') {
                setError("هذا الحساب معطل. يرجى التواصل مع الإدارة.");
            } else {
                setError("حدث خطأ أثناء تسجيل الدخول");
            }
        }
    }, [searchParams]);

    // Check if 2FA is globally required
    useEffect(() => {
        fetch('/api/auth/check-2fa-requirement')
            .then(res => res.json())
            .then(data => {
                console.log('2FA requirement check:', data); // Debug log
                if (data.require2FA) {
                    setRequires2FA(true);
                }
            })
            .catch(err => console.error('Failed to check 2FA requirement:', err));
    }, []);

    // Timer countdown for 2FA code expiration
    useEffect(() => {
        if (show2FAInput && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [show2FAInput, timeRemaining]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const twoFAResponse = await fetch('/api/auth/request-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (twoFAResponse.ok) {
                setTimeRemaining(120); // Reset timer to 2 minutes
                setCanResend(false);
                setTwoFactorCode(""); // Clear the input
                toast.success("تم إرسال رمز جديد إلى بريدك الإلكتروني");
            } else {
                toast.error("فشل إرسال رمز المصادقة");
            }
        } catch (err) {
            console.error("Resend code error:", err);
            toast.error("حدث خطأ أثناء إرسال الرمز");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            // If 2FA is required, handle the 2FA flow BEFORE attempting login
            if (requires2FA) {
                // Step 1: If 2FA input not shown yet, verify credentials and request code
                if (!show2FAInput) {
                    // First verify credentials are correct
                    const verifyResponse = await fetch('/api/auth/verify-credentials', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });

                    if (!verifyResponse.ok) {
                        const errorData = await verifyResponse.json();
                        setError(errorData.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
                        setIsLoading(false);
                        return;
                    }

                    // Credentials are valid, now request 2FA code
                    const twoFAResponse = await fetch('/api/auth/request-2fa', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });

                    if (twoFAResponse.ok) {
                        setShow2FAInput(true);
                        setTimeRemaining(120); // Start 2-minute timer
                        setCanResend(false);
                        setSuccessMessage("تم إرسال رمز المصادقة الثنائية إلى بريدك الإلكتروني");
                    } else {
                        setError("فشل إرسال رمز المصادقة");
                    }
                    setIsLoading(false);
                    return; // Stop here, wait for user to enter code
                }

                // Step 2: If 2FA input is shown but not verified yet, verify the code
                if (show2FAInput && !twoFAVerified) {
                    if (!twoFactorCode || twoFactorCode.length !== 6) {
                        setError("يرجى إدخال رمز المصادقة الثنائية المكون من 6 أرقام");
                        setIsLoading(false);
                        return;
                    }

                    const verify2FAResponse = await fetch('/api/auth/verify-2fa', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, code: twoFactorCode })
                    });

                    if (!verify2FAResponse.ok) {
                        setError("رمز المصادقة غير صحيح أو منتهي الصلاحية");
                        setIsLoading(false);
                        return;
                    }

                    // 2FA verified successfully, mark it and CONTINUE to login below
                    setTwoFAVerified(true);
                    // Don't return here - fall through to signIn() below
                }

                // Step 3: Final safety check - if 2FA required but not yet shown or verified, stop
                if (!show2FAInput || (show2FAInput && !twoFAVerified && twoFactorCode.length !== 6)) {
                    // This shouldn't happen, but safety check
                    if (!twoFAVerified && twoFactorCode.length !== 6) {
                        setError("يرجى إكمال المصادقة الثنائية");
                        setIsLoading(false);
                        return;
                    }
                }
            }

            // Now proceed with actual login (either 2FA not required OR 2FA was verified)
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                console.log("Login error:", result.error);
                
                // Check for email not verified error
                if (result.error.includes("EmailNotVerified")) {
                    router.push(`/verify?email=${encodeURIComponent(email)}`)
                    return
                }
                
                // Check for account locked error
                if (result.error.includes("AccountLocked")) {
                    const parts = result.error.split(':')
                    const minutes = parts[1] || '30'
                    setError(`حسابك مقفل مؤقتاً بسبب عدة محاولات فاشلة. يرجى المحاولة مرة أخرى بعد ${minutes} دقيقة.`)
                } else {
                    setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                }
            } else if (result?.ok) {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("حدث خطأ أثناء تسجيل الدخول");
        } finally {
            setIsLoading(false);
        }
    };

    return <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 text-sm text-blue-500 bg-blue-50 dark:bg-blue-900/10 rounded-md">
          {successMessage}
        </div>
      )}
      <div className="space-y-4">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input 
          id="email" 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || show2FAInput}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="password">كلمة المرور</Label>
        <Input 
          id="password" 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading || show2FAInput}
        />
      </div>
      {show2FAInput && (
        <div className="space-y-4">
          <Label htmlFor="twoFactorCode" className="text-center block">رمز المصادقة الثنائية (2FA)</Label>
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              maxLength={6}
              value={twoFactorCode}
              onChange={(value) => setTwoFactorCode(value)}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              الوقت المتبقي: <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </p>
            {canResend ? (
              <Button
                type="button"
                variant="link"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm"
              >
                إعادة إرسال الرمز
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground">
                يمكنك طلب رمز جديد بعد انتهاء الوقت
              </p>
            )}
          </div>
        </div>
      )}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "جاري تسجيل الدخول..." : show2FAInput ? "تحقق وتسجيل الدخول" : "تسجيل الدخول"}
      </Button>
    </div>
  </form>;
}

export default CredentialsSignInForm;
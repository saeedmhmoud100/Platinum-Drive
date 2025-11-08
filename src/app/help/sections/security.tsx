import { Separator } from '@/components/ui/separator'
import { Shield, Lock, Key, Clock, AlertTriangle, History, Eye, LogOut, CheckCircle2, XCircle } from 'lucide-react'

export function SecuritySection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">الأمان والخصوصية</h3>
        <p className="text-muted-foreground leading-relaxed">
          حماية حسابك وملفاتك أولويتنا - تعرف على الميزات الأمنية المتاحة لك.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">كلمة المرور</h3>
        <div className="space-y-3">
          <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">تغيير كلمة المرور</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  يمكنك تغيير كلمة المرور من صفحة الملف الشخصي
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">1.</span>
                    <span className="text-sm">اذهب إلى الملف الشخصي</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">2.</span>
                    <span className="text-sm">انتقل لقسم "تغيير كلمة المرور"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">3.</span>
                    <span className="text-sm">أدخل كلمة المرور الحالية والجديدة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">4.</span>
                    <span className="text-sm">احفظ التغييرات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-amber-500/30 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
            <div className="flex items-start gap-3">
              <Key className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">متطلبات كلمة المرور القوية</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  يجب أن تحتوي كلمة المرور على:
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">8 أحرف على الأقل</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">حرف كبير واحد على الأقل (A-Z)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">حرف صغير واحد على الأقل (a-z)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">رقم واحد على الأقل (0-9)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">رمز خاص واحد على الأقل (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <History className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">سجل كلمات المرور</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  النظام يحفظ سجل كلمات المرور السابقة لمنع إعادة استخدام كلمات ضعيفة
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                     لا يمكنك استخدام كلمة مرور سبق لك استخدامها مؤخرا
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">سجل تسجيل الدخول</h3>
        <div className="border-2 border-indigo-500/30 rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
          <div className="flex items-start gap-3">
            <Eye className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">مراقبة النشاط</h4>
              <p className="text-sm text-muted-foreground mb-3">
                يمكنك مراجعة جميع محاولات تسجيل الدخول لحسابك من صفحة الملف الشخصي
              </p>
              <div className="bg-background/80 p-3 rounded border space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">المعلومات المتاحة:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>تاريخ ووقت المحاولة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>عنوان IP المستخدم</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>الجهاز والمتصفح</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>حالة المحاولة (نجحت أو فشلت)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-700 dark:text-red-400">
                   <strong>تنبيه:</strong> إذا لاحظت محاولات دخول مريبة غير كلمة المرور فورا
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إعدادات الجلسة</h3>
        <div className="space-y-3">
          <div className="border-2 border-green-500/30 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">مهلة الجلسة</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  يمكنك تحديد المدة التي يبقى فيها حسابك مسجل دخول بدون نشاط
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2"><strong>الإعداد الافتراضي:</strong></p>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                    <p className="text-sm"> 30 دقيقة من عدم النشاط</p>
                  </div>
                  <p className="text-xs mt-2 text-muted-foreground">
                    يمكن تعديل هذا من: الإعدادات  الأمان  مهلة الجلسة
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-orange-500/30 rounded-lg p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <div className="flex items-start gap-3">
              <LogOut className="w-6 h-6 text-orange-600 dark:text-orange-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">تسجيل الخروج التلقائي</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  عند انتهاء مهلة الجلسة سيتم تسجيل خروجك تلقائيا للحفاظ على أمان حسابك
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                     ستتلقى تنبيه قبل دقيقتين من انتهاء الجلسة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">التنبيهات الأمنية</h3>
        <div className="border-2 border-red-500/30 rounded-lg p-4 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">إشعارات تسجيل الدخول</h4>
              <p className="text-sm text-muted-foreground mb-3">
                تلق تنبيهات عند تسجيل الدخول لحسابك من أجهزة أو مواقع جديدة
              </p>
              <div className="bg-background/80 p-3 rounded border space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm"><strong>الإعداد الافتراضي:</strong> مفعل </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm"><strong>التحكم:</strong> من الإعدادات  الأمان  تنبيهات تسجيل الدخول</span>
                </div>
              </div>
              <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                   ننصح بإبقاء هذه الميزة مفعلة لحماية حسابك
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح أمنية</h3>
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 p-5 rounded-lg border">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>استخدم كلمة مرور قوية وفريدة:</strong> لا تستخدم نفس كلمة المرور في مواقع أخرى
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>غير كلمة المرور بانتظام:</strong> ننصح بتغييرها كل 3-6 أشهر
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>راجع سجل تسجيل الدخول:</strong> تحقق بانتظام من عدم وجود نشاط مريب
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>لا تشارك بيانات دخولك:</strong> معلومات حسابك شخصية ولا يجب مشاركتها
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>سجل الخروج من الأجهزة المشتركة:</strong> لا تنس تسجيل الخروج عند استخدام جهاز عام
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يدعم النظام المصادقة الثنائية (2FA)</h4>
            <p className="text-sm text-muted-foreground">
              البنية التحتية موجودة (TwoFactorCode model) لكن الميزة غير مفعلة في الواجهة حاليا.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">ماذا أفعل إذا نسيت كلمة المرور</h4>
            <p className="text-sm text-muted-foreground">
              استخدم خيار "نسيت كلمة المرور" في صفحة تسجيل الدخول لإعادة تعيينها عبر البريد الإلكتروني.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكنني تسجيل الخروج من جميع الأجهزة</h4>
            <p className="text-sm text-muted-foreground">
              حاليا تحتاج لتسجيل الخروج من كل جهاز على حدة. أو يمكنك تغيير كلمة المرور لإنهاء جميع الجلسات.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">كيف أحمي ملفاتي من الوصول غير المصرح</h4>
            <p className="text-sm text-muted-foreground">
              استخدم صلاحيات المشاركة بحذر راجع روابط المشاركة بانتظام واستخدم كلمة مرور قوية لحسابك.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

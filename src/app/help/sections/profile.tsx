import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Globe,
  Camera,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export function ProfileSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">الملف الشخصي</h3>
        <p className="text-muted-foreground leading-relaxed">
          من صفحة الملف الشخصي يمكنك تعديل معلوماتك الأساسية تغيير الصورة
          الشخصية ومراجعة نشاط حسابك.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الوصول إلى الملف الشخصي</h3>
        <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <div className="flex items-start gap-3">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                كيف تصل
              </h4>
              <div className="bg-background/80 p-3 rounded border space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">1.</span>
                  <span className="text-sm">
                    اضغط على صورتك الشخصية في الشريط العلوي
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">2.</span>
                  <span className="text-sm">
                    اختر "الملف الشخصي" من القائمة المنسدلة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">تعديل المعلومات الأساسية</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                  الاسم
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  الاسم الذي سيظهر في الملف الشخصي وفي المشاركات
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>كيفية التعديل:</strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li> اضغط على زر "تعديل" بجانب اسمك</li>
                    <li> أدخل الاسم الجديد</li>
                    <li> اضغط "حفظ"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-blue-500 pr-4 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  البريد الإلكتروني
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  عنوان البريد الإلكتروني المستخدم لتسجيل الدخول واستقبال
                  الإشعارات
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>ملاحظات مهمة:</strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li> يمكنك تغيير البريد الإلكتروني من نفس صفحة التعديل</li>
                    <li> تأكد أن البريد الجديد غير مستخدم من حساب آخر</li>
                    <li>
                      {" "}
                      ستحتاج لاستخدام البريد الجديد عند تسجيل الدخول المقبل
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-purple-500 pr-4 bg-purple-50 dark:bg-purple-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  اللغة
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  لغة واجهة النظام والإشعارات
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>اللغات المتاحة:</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded"> العربية</div>
                    <div className="bg-muted p-2 rounded"> English</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الصورة الشخصية</h3>
        <div className="border-2 border-indigo-500/30 rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
          <div className="flex items-start gap-3">
            <Camera className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
                تحميل أو تغيير الصورة
              </h4>
              <div className="bg-background/80 p-3 rounded border space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 text-sm">1.</span>
                  <span className="text-sm">
                    من صفحة الملف الشخصي اضغط على أيقونة الكاميرا فوق صورتك
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 text-sm">2.</span>
                  <span className="text-sm">
                    اختر صورة من جهازك (JPG, PNG, أو GIF)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 text-sm">3.</span>
                  <span className="text-sm">
                    سيتم رفع الصورة وتحديث ملفك الشخصي تلقائيا
                  </span>
                </div>
              </div>
              <div className="bg-background p-3 rounded border">
                <p className="text-sm mb-2">
                  <strong>متطلبات الصورة:</strong>
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li> الحد الأقصى للحجم: 5 ميجابايت</li>
                  <li> الأنواع المدعومة: JPG, PNG, GIF, WebP</li>
                  <li> يفضل صورة مربعة للحصول على أفضل نتيجة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">تغيير كلمة المرور</h3>
        <div className="border-2 border-red-500/30 rounded-lg p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-red-700 dark:text-red-300">
                تحديث كلمة المرور
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                من المهم تحديث كلمة المرور بشكل دوري للحفاظ على أمان حسابك
              </p>
              <div className="bg-background/80 p-3 rounded border space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-600 text-sm">1.</span>
                  <span className="text-sm">
                    من صفحة الملف الشخصي اذهب إلى تبويب "كلمة المرور"
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-600 text-sm">2.</span>
                  <span className="text-sm">أدخل كلمة المرور الحالية</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-600 text-sm">3.</span>
                  <span className="text-sm">
                    أدخل كلمة المرور الجديدة مرتين
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-red-600 text-sm">4.</span>
                  <span className="text-sm">اضغط "تغيير كلمة المرور"</span>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                <p className="text-sm mb-2">
                  <strong className="text-amber-700 dark:text-amber-400">
                    {" "}
                    متطلبات كلمة المرور:
                  </strong>
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li> على الأقل 8 أحرف</li>
                  <li> تحتوي على أحرف كبيرة وصغيرة</li>
                  <li> تحتوي على أرقام</li>
                  <li> يفضل استخدام رموز خاصة (@#$%!)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">سجل تسجيل الدخول</h3>
        <div className="border-2 border-slate-500/30 rounded-lg p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-slate-600 dark:text-slate-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">
                مراجعة نشاط الحساب
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                يعرض جميع محاولات تسجيل الدخول إلى حسابك مع معلومات مفصلة
              </p>
              <div className="bg-background p-3 rounded border mb-3">
                <p className="text-sm mb-2">
                  <strong>المعلومات المعروضة:</strong>
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="bg-muted p-2 rounded text-sm">
                    {" "}
                    التاريخ والوقت
                  </div>
                  <div className="bg-muted p-2 rounded text-sm"> عنوان IP</div>
                  <div className="bg-muted p-2 rounded text-sm">
                    {" "}
                    نوع الجهاز والمتصفح
                  </div>
                  <div className="bg-muted p-2 rounded text-sm">
                    / نجح أو فشل
                  </div>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
                      {" "}
                      تنبيه أمني
                    </p>
                    <p className="text-xs text-muted-foreground">
                      إذا رأيت عمليات دخول مشبوهة أو من أجهزة لا تعرفها غير كلمة
                      مرورك فورا
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكنني تغيير اسم المستخدم</h4>
            <p className="text-sm text-muted-foreground">
              لا يوجد "اسم مستخدم" منفصل - يمكنك تعديل "الاسم" فقط الذي سيظهر في
              الملف الشخصي. البريد الإلكتروني هو معرف الحساب الفريد.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              ماذا يحدث عند تغيير البريد الإلكتروني
            </h4>
            <p className="text-sm text-muted-foreground">
              عند تغيير البريد ستحتاج لاستخدام البريد الجديد في تسجيل الدخول
              المقبل. جميع الإشعارات سترسل للبريد الجديد.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل تحفظ الصورة الشخصية بأمان</h4>
            <p className="text-sm text-muted-foreground">
              نعم الصور الشخصية ترفع في مجلد آمن ومنفصل عن ملفاتك العادية ولا
              يمكن لأحد الوصول إليها إلا عبر حسابك.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              كم مرة يجب أن أغير كلمة المرور
            </h4>
            <p className="text-sm text-muted-foreground">
              ينصح بتغيير كلمة المرور كل 3-6 أشهر أو فورا إذا شككت في اختراق
              حسابك أو رأيت نشاطا غير معتاد في سجل الدخول.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

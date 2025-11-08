import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  AlertTriangle,
} from "lucide-react";

export function LoginSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">تسجيل الدخول إلى حسابك</h3>
        <p className="text-muted-foreground leading-relaxed">
          بعد إنشاء حسابك، يمكنك تسجيل الدخول للوصول إلى ملفاتك من أي مكان وفي
          أي وقت. احتفظ ببيانات دخولك في مكان آمن.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">كيفية تسجيل الدخول</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold mb-1">افتح صفحة تسجيل الدخول</h4>
              <p className="text-sm text-muted-foreground">
                انقر على زر "تسجيل الدخول" في الصفحة الرئيسية أو اذهب مباشرة إلى
                /sign-in
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold mb-1">أدخل بيانات الدخول</h4>
              <div className="space-y-3 mt-2">
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">
                      البريد الإلكتروني
                    </div>
                    <div className="text-xs text-muted-foreground">
                      البريد الذي استخدمته عند التسجيل
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">كلمة المرور</div>
                    <div className="text-xs text-muted-foreground">
                      كلمة المرور السرية الخاصة بك
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold mb-1">اختر "تذكرني" (اختياري)</h4>
              <p className="text-sm text-muted-foreground">
                إذا كنت تستخدم جهازك الشخصي، يمكنك تفعيل خيار "تذكرني" للبقاء
                مسجلاً لفترة أطول
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              4
            </div>
            <div>
              <h4 className="font-semibold mb-1">اضغط على "تسجيل الدخول"</h4>
              <p className="text-sm text-muted-foreground">
                سيتم توجيهك مباشرة إلى لوحة التحكم حيث يمكنك الوصول إلى جميع
                ملفاتك
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نسيت كلمة المرور؟</h3>
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="font-semibold mb-3 text-amber-900 dark:text-amber-100">
            لا تقلق! يمكنك استعادة حسابك بسهولة:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="font-bold text-amber-700 dark:text-amber-400">
                1.
              </div>
              <p className="text-sm">
                اضغط على رابط "نسيت كلمة المرور؟" في صفحة تسجيل الدخول
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-bold text-amber-700 dark:text-amber-400">
                2.
              </div>
              <p className="text-sm">أدخل بريدك الإلكتروني المسجل</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-bold text-amber-700 dark:text-amber-400">
                3.
              </div>
              <p className="text-sm">
                افتح الرسالة التي سنرسلها لك واضغط على رابط إعادة تعيين كلمة
                المرور
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-bold text-amber-700 dark:text-amber-400">
                4.
              </div>
              <p className="text-sm">أدخل كلمة مرور جديدة قوية وقم بتأكيدها</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="font-bold text-amber-700 dark:text-amber-400">
                5.
              </div>
              <p className="text-sm">
                يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">المصادقة الثنائية (2FA)</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">ما هي المصادقة الثنائية؟</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                المصادقة الثنائية هي طبقة أمان إضافية تحمي حسابك. حتى لو حصل شخص
                ما على كلمة مرورك، لن يستطيع الدخول بدون رمز التحقق الذي يُرسل
                إلى هاتفك أو تطبيق المصادقة.
              </p>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              كيفية تفعيل المصادقة الثنائية
            </h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-semibold">1.</span>
                <span>بعد تسجيل الدخول، اذهب إلى الإعدادات → الأمان</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">2.</span>
                <span>اضغط على "تفعيل المصادقة الثنائية"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">3.</span>
                <span>اختر طريقة التحقق (تطبيق المصادقة أو رسالة نصية)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">4.</span>
                <span>اتبع التعليمات لإكمال الإعداد</span>
              </li>
            </ol>
          </div>

          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              💡 نوصي بشدة بتفعيل المصادقة الثنائية لحماية حسابك وملفاتك من
              الوصول غير المصرح به
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">تسجيل الدخول من أجهزة مختلفة</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">💻 الكمبيوتر</h4>
            <p className="text-sm text-muted-foreground">
              افتح المتصفح (Chrome, Firefox, Edge) واذهب إلى الموقع. تجربة كاملة
              مع جميع المزايا.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">📱 الهاتف المحمول</h4>
            <p className="text-sm text-muted-foreground">
              استخدم متصفح الهاتف للوصول إلى حسابك. الموقع متجاوب ويعمل بشكل
              مثالي على الشاشات الصغيرة.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">💼 جهاز العمل</h4>
            <p className="text-sm text-muted-foreground">
              يمكنك تسجيل الدخول من أي جهاز. تذكر تسجيل الخروج عند الانتهاء
              للحفاظ على أمان حسابك.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🌐 الأجهزة العامة</h4>
            <p className="text-sm text-muted-foreground">
              تجنب خيار "تذكرني" على الأجهزة العامة، وتأكد من تسجيل الخروج
              دائماً.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">مشاكل تسجيل الدخول الشائعة</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
              ❌ "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong>الحل:</strong> تأكد من كتابة البريد الإلكتروني بشكل صحيح
              بدون مسافات. تحقق من أن Caps Lock غير مفعل. إذا نسيت كلمة المرور،
              استخدم خيار "نسيت كلمة المرور".
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
              ❌ "حسابك غير مفعّل"
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong>الحل:</strong> تحقق من بريدك الإلكتروني وافتح رسالة
              التأكيد التي أرسلناها عند التسجيل. إذا لم تجدها، يمكنك طلب إرسال
              رسالة جديدة.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
              ❌ "تم تعليق حسابك مؤقتاً"
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong>الحل:</strong> هذا يحدث بعد عدة محاولات فاشلة لتسجيل
              الدخول لحماية حسابك. انتظر 15 دقيقة ثم حاول مرة أخرى، أو استخدم
              خيار "نسيت كلمة المرور".
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
              ❌ "خطأ في رمز المصادقة الثنائية"
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong>الحل:</strong> تأكد من أن وقت هاتفك صحيح ومضبوط تلقائياً.
              استخدم الرمز الحالي من تطبيق المصادقة وليس القديم. إذا فقدت الوصول
              لتطبيق المصادقة، استخدم رموز النسخ الاحتياطي.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-primary/5 p-5 rounded-lg">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          نصائح أمان مهمة
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <p>لا تشارك كلمة مرورك مع أي شخص، حتى موظفي الدعم الفني</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <p>استخدم كلمة مرور قوية وفريدة لا تستخدمها في مواقع أخرى</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <p>فعّل المصادقة الثنائية لحماية إضافية</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <p>سجّل الخروج دائماً عند استخدام أجهزة عامة أو مشتركة</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <p>راجع الأجهزة المتصلة بحسابك بانتظام من صفحة الأمان</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <p>
              احذر من رسائل البريد الإلكتروني المشبوهة التي تطلب معلومات دخولك
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              كم مرة يجب علي تغيير كلمة المرور؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نوصي بتغيير كلمة المرور كل 3-6 أشهر، أو فوراً إذا شككت في أن شخصاً
              ما قد يعرفها.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني تسجيل الدخول من أكثر من جهاز في نفس الوقت؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، يمكنك تسجيل الدخول من عدة أجهزة في وقت واحد. يمكنك مراجعة
              وإدارة الأجهزة المتصلة من صفحة الأمان.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              ماذا يحدث إذا نسيت بريدي الإلكتروني المسجل؟
            </h4>
            <p className="text-sm text-muted-foreground">
              تواصل مع فريق الدعم الفني مع تقديم معلومات إثبات الهوية لمساعدتك
              في استعادة حسابك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

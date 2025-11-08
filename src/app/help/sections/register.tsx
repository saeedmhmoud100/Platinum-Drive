import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Mail, Lock, User, Eye } from "lucide-react";

export function RegisterSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">إنشاء حساب جديد</h3>
        <p className="text-muted-foreground leading-relaxed">
          للبدء في استخدام بلاتينيوم درايف، تحتاج أولاً إلى إنشاء حساب مجاني.
          العملية بسيطة وتستغرق دقائق معدودة فقط.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">خطوات التسجيل</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold mb-1">انتقل إلى صفحة التسجيل</h4>
              <p className="text-sm text-muted-foreground">
                اضغط على زر "إنشاء حساب" في الصفحة الرئيسية أو من قائمة التنقل
                العلوية
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold mb-1">املأ نموذج التسجيل</h4>
              <p className="text-sm text-muted-foreground mb-2">
                أدخل المعلومات المطلوبة في الحقول التالية:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">الاسم الكامل</div>
                    <div className="text-xs text-muted-foreground">
                      اسمك الحقيقي (مثال: أحمد محمد علي)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">
                      البريد الإلكتروني
                    </div>
                    <div className="text-xs text-muted-foreground">
                      عنوان بريد إلكتروني صالح (مثال: ahmed@example.com)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-muted p-3 rounded-lg">
                  <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">كلمة المرور</div>
                    <div className="text-xs text-muted-foreground">
                      يجب أن تكون قوية وآمنة (8 أحرف على الأقل)
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
              <h4 className="font-semibold mb-1">تأكيد البريد الإلكتروني</h4>
              <p className="text-sm text-muted-foreground">
                بعد إرسال النموذج، سنرسل لك رسالة تأكيد على بريدك الإلكتروني.
                افتح البريد واضغط على رابط التأكيد لتفعيل حسابك.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
              4
            </div>
            <div>
              <h4 className="font-semibold mb-1">ابدأ الاستخدام</h4>
              <p className="text-sm text-muted-foreground">
                بمجرد تأكيد بريدك الإلكتروني، يمكنك تسجيل الدخول والبدء في
                استخدام جميع مزايا بلاتينيوم درايف
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">متطلبات كلمة المرور</h3>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
            لحماية حسابك، يجب أن تحتوي كلمة المرور على:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>8 أحرف على الأقل</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>حرف كبير واحد على الأقل (A-Z)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>حرف صغير واحد على الأقل (a-z)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>رقم واحد على الأقل (0-9)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>رمز خاص واحد على الأقل (!@#$%)</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح لكلمة مرور قوية</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              افعل
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• استخدم مزيجاً من الأحرف والأرقام والرموز</li>
              <li>• اجعلها طويلة (12 حرف أو أكثر)</li>
              <li>• استخدم كلمة مرور فريدة لكل موقع</li>
              <li>• استخدم مدير كلمات المرور</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              تجنب
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• كلمات المرور الشائعة (123456, password)</li>
              <li>• معلومات شخصية (اسمك، تاريخ ميلادك)</li>
              <li>• تكرار نفس كلمة المرور في مواقع مختلفة</li>
              <li>• مشاركة كلمة مرورك مع الآخرين</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل التسجيل مجاني؟</h4>
            <p className="text-sm text-muted-foreground">
              نعم، التسجيل مجاني تماماً. تحصل على 5 جيجابايت من المساحة
              التخزينية مجاناً عند إنشاء حسابك.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              لم أستلم رسالة التأكيد، ماذا أفعل؟
            </h4>
            <p className="text-sm text-muted-foreground">
              تحقق من مجلد الرسائل غير المرغوب فيها (Spam). إذا لم تجدها، يمكنك
              طلب إرسال رسالة تأكيد جديدة من صفحة تسجيل الدخول.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني تغيير بريدي الإلكتروني لاحقاً؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، يمكنك تغيير بريدك الإلكتروني من صفحة الإعدادات بعد تسجيل
              الدخول. ستحتاج إلى تأكيد البريد الجديد.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل بياناتي آمنة؟</h4>
            <p className="text-sm text-muted-foreground">
              نعم، نستخدم أحدث معايير التشفير لحماية بياناتك. جميع المعلومات
              الشخصية وكلمات المرور مشفرة بالكامل.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-primary/5 p-5 rounded-lg">
        <h3 className="text-xl font-bold mb-3">مشاكل شائعة وحلولها</h3>
        <div className="space-y-3">
          <div className="bg-background p-3 rounded border">
            <h4 className="font-semibold text-sm mb-1 text-red-600 dark:text-red-400">
              ❌ "البريد الإلكتروني مستخدم بالفعل"
            </h4>
            <p className="text-xs text-muted-foreground">
              <strong>الحل:</strong> هذا البريد مسجل مسبقاً. حاول تسجيل الدخول
              أو استخدام خيار "نسيت كلمة المرور" لاستعادة حسابك.
            </p>
          </div>
          <div className="bg-background p-3 rounded border">
            <h4 className="font-semibold text-sm mb-1 text-red-600 dark:text-red-400">
              ❌ "كلمة المرور ضعيفة جداً"
            </h4>
            <p className="text-xs text-muted-foreground">
              <strong>الحل:</strong> تأكد من استيفاء جميع متطلبات كلمة المرور
              المذكورة أعلاه. استخدم أحرف كبيرة وصغيرة وأرقام ورموز.
            </p>
          </div>
          <div className="bg-background p-3 rounded border">
            <h4 className="font-semibold text-sm mb-1 text-red-600 dark:text-red-400">
              ❌ "البريد الإلكتروني غير صالح"
            </h4>
            <p className="text-xs text-muted-foreground">
              <strong>الحل:</strong> تأكد من كتابة البريد الإلكتروني بالصيغة
              الصحيحة (مثال: name@domain.com) بدون مسافات أو أخطاء إملائية.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

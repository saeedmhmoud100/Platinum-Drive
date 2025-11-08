import { Separator } from "@/components/ui/separator";
import { Cloud, Shield, Zap, Users, Lock, Globe } from "lucide-react";

export function IntroSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-2xl font-bold mb-4">مرحبا بك في بلاتينيوم درايف</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          بلاتينيوم درايف هو منتج برمجي متقدم لإدارة وتخزين الملفات، مصمم خصيصاً
          لتلبية احتياجات الأفراد والشركات في العصر الرقمي. نظام متكامل يجمع بين
          القوة والبساطة والأمان.
        </p>
      </section>

      <Separator />

      <section>
        <h4 className="text-xl font-semibold mb-3">ما هو بلاتينيوم درايف؟</h4>
        <p className="text-muted-foreground leading-relaxed mb-4">
          بلاتينيوم درايف هو منتج برمجي متكامل (Software as a Product - SaaP)
          مصمم خصيصاً لإدارة وتخزين الملفات بشكل احترافي. تم تطوير النظام
          باستخدام أحدث التقنيات والمعايير البرمجية لضمان أداء عالي، استقرار
          تام، وتجربة مستخدم استثنائية.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          من خلال بلاتينيوم درايف، يمكنك تخزين ملفاتك بأمان، تنظيمها بكفاءة،
          الوصول إليها من أي مكان وفي أي وقت، ومشاركتها مع فريق عملك أو أصدقائك
          بكل سهولة. النظام مصمم ليكون حلاً شاملاً لجميع احتياجات إدارة الملفات
          للأفراد والمؤسسات.
        </p>
      </section>

      <Separator />

      <section>
        <h4 className="text-xl font-semibold mb-4">المزايا الأساسية</h4>
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg mt-1">
              <Cloud className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">تخزين سحابي غير محدود</h5>
              <p className="text-sm text-muted-foreground">
                احتفظ بجميع ملفاتك في مكان واحد آمن مع مساحة تخزين مرنة تنمو مع
                احتياجاتك
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg mt-1">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">أمان وحماية متقدمة</h5>
              <p className="text-sm text-muted-foreground">
                نستخدم تشفير من الدرجة العسكرية لحماية بياناتك مع نسخ احتياطي
                تلقائي لضمان عدم فقدان أي ملف
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg mt-1">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">سرعة ودقة عالية</h5>
              <p className="text-sm text-muted-foreground">
                رفع وتنزيل سريع للملفات مع معاينة فورية لأنواع الملفات المختلفة
                دون الحاجة لتحميلها
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg mt-1">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">مشاركة وتعاون سلس</h5>
              <p className="text-sm text-muted-foreground">
                شارك ملفاتك ومجلداتك مع أي شخص بسهولة، مع التحكم الكامل في
                صلاحيات الوصول والتعديل
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg mt-1">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">خصوصية تامة</h5>
              <p className="text-sm text-muted-foreground">
                ملفاتك ملكك الخاص، نحن لا نشارك أو نبيع بياناتك لأي طرف ثالث، مع
                التزام تام بمعايير الخصوصية العالمية
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="bg-primary/10 p-2 rounded-lg mt-1">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold mb-1">وصول من أي مكان</h5>
              <p className="text-sm text-muted-foreground">
                استخدم المنصة من أي جهاز متصل بالإنترنت - سواء كان حاسوباً،
                تابلت، أو هاتف ذكي
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h4 className="text-xl font-semibold mb-3">
          لماذا تختار بلاتينيوم درايف؟
        </h4>
        <div className="space-y-3">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                واجهة عربية متكاملة:
              </span>{" "}
              تجربة مستخدم مصممة خصيصاً للمستخدم العربي مع دعم كامل للغة العربية
              واتجاه النص من اليمين لليسار
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                سهولة الاستخدام:
              </span>{" "}
              واجهة بسيطة وبديهية لا تحتاج إلى خبرة تقنية، يمكن لأي شخص
              استخدامها بسهولة
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                دعم فني متواصل:
              </span>{" "}
              فريق الدعم الفني متواجد على مدار الساعة لمساعدتك في حل أي مشكلة
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                تحديثات مستمرة:
              </span>{" "}
              نعمل باستمرار على تحسين المنصة وإضافة ميزات جديدة بناءً على
              احتياجات مستخدمينا
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h4 className="text-xl font-semibold mb-3">ابدأ الآن</h4>
        <p className="text-muted-foreground leading-relaxed mb-3">
          هل أنت جاهز للبدء؟ استكشف الأقسام المختلفة في هذا الدليل لتتعرف على
          كيفية استخدام جميع ميزات بلاتينيوم درايف:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-4">
          <li>إنشاء حساب جديد وتسجيل الدخول</li>
          <li>رفع الملفات وتنظيمها في مجلدات</li>
          <li>مشاركة الملفات مع الآخرين</li>
          <li>إدارة حسابك وإعداداتك الشخصية</li>
          <li>نصائح وإرشادات لأفضل استخدام</li>
        </ul>
      </section>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">ملاحظة:</span> إذا كنت بحاجة إلى
          مساعدة إضافية أو لديك استفسار معين، لا تتردد في التواصل مع فريق الدعم
          الفني من خلال صفحة الإعدادات.
        </p>
      </div>
    </div>
  );
}

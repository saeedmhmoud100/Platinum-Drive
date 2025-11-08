import { Separator } from "@/components/ui/separator";
import {
  FolderPlus,
  File,
  MoreVertical,
  Download,
  Share2,
  Star,
  Trash2,
  Copy,
  Move,
  FileEdit,
  Grid3x3,
  List,
} from "lucide-react";

export function FilesSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">إدارة الملفات والمجلدات</h3>
        <p className="text-muted-foreground leading-relaxed">
          صفحة "ملفاتي" هي المكان الذي تدير فيه جميع ملفاتك ومجلداتك. يمكنك
          إنشاء مجلدات جديدة، نقل ونسخ الملفات، وتنظيم محتوياتك بالطريقة التي
          تناسبك.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إنشاء مجلد جديد</h3>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <FolderPlus className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">خطوات إنشاء مجلد</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <span>اضغط على زر "مجلد جديد" أو "+" في شريط الأدوات</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <span>
                      اكتب اسماً واضحاً للمجلد (مثل: مستندات العمل، صور العائلة،
                      مشاريع 2025)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <span>اضغط "إنشاء" - سيظهر المجلد الجديد فوراً</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background p-3 rounded border">
              <p className="text-xs text-muted-foreground">
                💡 <strong>نصيحة:</strong> استخدم أسماء واضحة ومنظمة للمجلدات.
                يمكنك إنشاء مجلدات داخل مجلدات لتنظيم أفضل (مثل: العمل →
                المشاريع → مشروع 2025)
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">التنقل بين المجلدات</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <File className="w-4 h-4" />
              فتح المجلدات
            </h4>
            <p className="text-sm text-muted-foreground">
              انقر مرتين (Double Click) على أي مجلد لفتحه ورؤية محتوياته
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">مسار التنقل (Breadcrumb)</h4>
            <p className="text-sm text-muted-foreground">
              في أعلى الصفحة، ستجد مسار المجلدات الحالي (الرئيسية › العمل ›
              المشاريع). اضغط على أي مجلد للرجوع إليه
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">
          العمليات على الملفات والمجلدات
        </h3>
        <div className="space-y-3">
          <div className="border-r-4 border-blue-500 pr-4 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <MoreVertical className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  قائمة الخيارات
                </h4>
                <p className="text-sm text-muted-foreground">
                  اضغط على النقاط الثلاث (⋮) بجانب أي ملف أو مجلد لرؤية جميع
                  الخيارات المتاحة
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Download className="w-4 h-4 text-green-600" />
                تحميل
              </h4>
              <p className="text-xs text-muted-foreground">
                تحميل الملف أو المجلد إلى جهازك. المجلدات يتم ضغطها في ملف ZIP
                تلقائياً
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                مشاركة
              </h4>
              <p className="text-xs text-muted-foreground">
                إنشاء رابط مشاركة لإرساله للآخرين أو تحديد أشخاص محددين للمشاركة
                معهم
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                إضافة للمفضلة
              </h4>
              <p className="text-xs text-muted-foreground">
                ضع علامة نجمة على الملفات المهمة للوصول السريع إليها من قسم
                المفضلة
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-purple-600" />
                إعادة تسمية
              </h4>
              <p className="text-xs text-muted-foreground">
                تغيير اسم الملف أو المجلد. امتداد الملف (.pdf, .jpg) سيبقى كما
                هو
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Copy className="w-4 h-4 text-indigo-600" />
                نسخ
              </h4>
              <p className="text-xs text-muted-foreground">
                إنشاء نسخة من الملف أو المجلد في موقع آخر
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Move className="w-4 h-4 text-orange-600" />
                نقل
              </h4>
              <p className="text-xs text-muted-foreground">
                نقل الملف أو المجلد إلى موقع آخر (سيُزال من الموقع الحالي)
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-600" />
                حذف
              </h4>
              <p className="text-xs text-muted-foreground">
                نقل الملف أو المجلد إلى سلة المهملات. يمكن استرجاعه خلال 30
                يوماً
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">معلومات الملف</h4>
              <p className="text-xs text-muted-foreground">
                عرض تفاصيل الملف: الحجم، تاريخ الإنشاء، آخر تعديل، النوع
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">طرق العرض المختلفة</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5">
            <div className="flex items-start gap-3">
              <Grid3x3 className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">عرض الشبكة (Grid View)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  يعرض الملفات والمجلدات كبطاقات كبيرة مع معاينة صغيرة
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    ✅ <strong>مناسب لـ:</strong> الصور والملفات المرئية، التصفح
                    السريع
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5">
            <div className="flex items-start gap-3">
              <List className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">عرض القائمة (List View)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  يعرض الملفات في قائمة مع تفاصيل كاملة (الحجم، التاريخ، النوع)
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    ✅ <strong>مناسب لـ:</strong> المستندات، رؤية التفاصيل،
                    الترتيب والتصفية
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted p-3 rounded">
          <p className="text-sm">
            💡 يمكنك التبديل بين طريقتي العرض من الأزرار في أعلى صفحة الملفات
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الترتيب والتصفية</h3>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border">
          <h4 className="font-semibold mb-3">خيارات الترتيب:</h4>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="bg-background/80 p-3 rounded border">
              <h5 className="font-semibold text-sm mb-1">حسب الاسم</h5>
              <p className="text-xs text-muted-foreground">
                ترتيب أبجدي (أ-ي أو A-Z)
              </p>
            </div>
            <div className="bg-background/80 p-3 rounded border">
              <h5 className="font-semibold text-sm mb-1">حسب التاريخ</h5>
              <p className="text-xs text-muted-foreground">
                الأحدث أولاً أو الأقدم أولاً
              </p>
            </div>
            <div className="bg-background/80 p-3 rounded border">
              <h5 className="font-semibold text-sm mb-1">حسب الحجم</h5>
              <p className="text-xs text-muted-foreground">
                من الأكبر للأصغر أو العكس
              </p>
            </div>
            <div className="bg-background/80 p-3 rounded border">
              <h5 className="font-semibold text-sm mb-1">حسب النوع</h5>
              <p className="text-xs text-muted-foreground">
                تجميع الملفات حسب نوعها (صور، مستندات...)
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">التحديد المتعدد</h3>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            يمكنك تحديد أكثر من ملف أو مجلد في نفس الوقت لتطبيق عمليات جماعية:
          </p>
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <span className="font-bold text-primary">1.</span>
              <div>
                <p className="text-sm font-semibold">على الكمبيوتر</p>
                <p className="text-sm text-muted-foreground">
                  اضغط Ctrl (أو Cmd على Mac) واضغط على الملفات التي تريد تحديدها
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold text-primary">2.</span>
              <div>
                <p className="text-sm font-semibold">على الهاتف المحمول</p>
                <p className="text-sm text-muted-foreground">
                  اضغط مطولاً على ملف، ثم اضغط على الملفات الأخرى لتحديدها
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold text-primary">3.</span>
              <div>
                <p className="text-sm font-semibold">تحديد الكل</p>
                <p className="text-sm text-muted-foreground">
                  استخدم خيار "تحديد الكل" لتحديد جميع الملفات في المجلد الحالي
                </p>
              </div>
            </div>
          </div>
          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
              العمليات المتاحة على الملفات المحددة:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• تحميل الكل (سيتم ضغطها في ملف واحد)</li>
              <li>• نقل أو نسخ جميع الملفات المحددة</li>
              <li>• حذف جميع الملفات المحددة دفعة واحدة</li>
              <li>• مشاركة عدة ملفات مع شخص واحد</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح لإدارة فعّالة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">📁</span>
              <p className="text-sm">
                <strong>استخدم هيكلية واضحة:</strong> أنشئ مجلدات رئيسية (العمل،
                الشخصي، الدراسة) ثم مجلدات فرعية داخلها
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🏷️</span>
              <p className="text-sm">
                <strong>أسماء واضحة:</strong> استخدم أسماء وصفية للملفات
                والمجلدات تساعدك على إيجادها بسرعة
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">⭐</span>
              <p className="text-sm">
                <strong>استخدم المفضلة:</strong> ضع علامة نجمة على الملفات
                والمجلدات التي تستخدمها كثيراً
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🗑️</span>
              <p className="text-sm">
                <strong>نظّف بانتظام:</strong> احذف الملفات القديمة أو غير
                المهمة لتوفير المساحة والحفاظ على التنظيم
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📅</span>
              <p className="text-sm">
                <strong>ضع تواريخ في الأسماء:</strong> للمستندات المهمة، أضف
                التاريخ في الاسم (مثل: تقرير_2025_01_15.pdf)
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
            <h4 className="font-semibold mb-2">
              كم عدد المجلدات التي يمكنني إنشاؤها؟
            </h4>
            <p className="text-sm text-muted-foreground">
              لا يوجد حد لعدد المجلدات. يمكنك إنشاء مجلدات غير محدودة ضمن حدود
              مساحة التخزين المتاحة.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني نقل عدة ملفات مرة واحدة؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، حدد الملفات التي تريدها باستخدام Ctrl+Click، ثم اختر "نقل" من
              القائمة واختر المجلد الوجهة.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              ماذا يحدث عند حذف مجلد يحتوي على ملفات؟
            </h4>
            <p className="text-sm text-muted-foreground">
              المجلد وجميع محتوياته ينتقلون إلى سلة المهملات. يمكنك استرجاعهم
              جميعاً خلال 30 يوماً.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكنني تحميل مجلد كامل؟</h4>
            <p className="text-sm text-muted-foreground">
              نعم، عند تحميل مجلد، سيتم ضغط جميع محتوياته في ملف ZIP واحد يمكنك
              تحميله.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Code,
  FileQuestion,
} from "lucide-react";

export function PreviewSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">معاينة الملفات</h3>
        <p className="text-muted-foreground leading-relaxed">
          اعرض ملفاتك بسرعة دون الحاجة لتحميلها. المعاينة الذكية تدعم أنواع
          ملفات متعددة مع أدوات تحكم مفيدة.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">فتح المعاينة</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <div className="flex items-start gap-3">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  النقر المباشر
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  الطريقة الأسرع لمعاينة ملف
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm">
                    انقر مرة واحدة على الملف في عرض القائمة، أو انقر نقراً
                    مزدوجاً في عرض الشبكة
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-purple-500/30 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="flex items-start gap-3">
              <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  من قائمة الخيارات
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  للتحكم الكامل في خيارات المعاينة
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm">
                    اضغط على (⋮) بجانب الملف ← اختر "معاينة" أو "فتح"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">أنواع الملفات المدعومة</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-blue-500 pr-4 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  الصور
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  معاينة كاملة مع أدوات تكبير وتصغير
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الأنواع المدعومة:</strong> JPG, PNG, GIF, WebP, SVG
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background p-2 rounded">✓ تكبير/تصغير</div>
                  <div className="bg-background p-2 rounded">✓ ملء الشاشة</div>
                  <div className="bg-background p-2 rounded">✓ تحميل مباشر</div>
                  <div className="bg-background p-2 rounded">✓ مشاركة</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-red-500 pr-4 bg-red-50 dark:bg-red-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                  المستندات
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  عرض ملفات PDF والنصوص في المتصفح
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الأنواع المدعومة:</strong> PDF, TXT
                  </p>
                </div>
                <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    ⓘ <strong>ملاحظة:</strong> ملفات Word, Excel, PowerPoint يجب
                    تحميلها لفتحها - لا يمكن معاينتها مباشرة
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                  الفيديوهات
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  مشغل فيديو مع تحكم أساسي
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الأنواع المدعومة:</strong> MP4, WebM, MPEG,
                    QuickTime
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background p-2 rounded">✓ تشغيل/إيقاف</div>
                  <div className="bg-background p-2 rounded">
                    ✓ التحكم في الصوت
                  </div>
                  <div className="bg-background p-2 rounded">✓ ملء الشاشة</div>
                  <div className="bg-background p-2 rounded">✓ شريط التقدم</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-purple-500 pr-4 bg-purple-50 dark:bg-purple-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Music className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  الملفات الصوتية
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  مشغل صوت بسيط
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الأنواع المدعومة:</strong> MP3, WAV, OGG, WebM
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background p-2 rounded">✓ تشغيل/إيقاف</div>
                  <div className="bg-background p-2 rounded">
                    ✓ التحكم في الصوت
                  </div>
                  <div className="bg-background p-2 rounded">✓ شريط التقدم</div>
                  <div className="bg-background p-2 rounded">✓ عرض المدة</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-indigo-500 pr-4 bg-indigo-50 dark:bg-indigo-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                  ملفات البرمجة والنصوص
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  عرض الكود مع تلوين بناء الجملة
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الأنواع المدعومة:</strong> JS, JSX, TS, TSX, Python,
                    Java, C, C++, HTML, CSS, JSON, XML, YAML, Markdown, وأكثر
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background p-2 rounded">✓ تلوين الكود</div>
                  <div className="bg-background p-2 rounded">
                    ✓ أرقام الأسطر
                  </div>
                  <div className="bg-background p-2 rounded">✓ نسخ النص</div>
                  <div className="bg-background p-2 rounded">
                    ✓ اكتشاف اللغة تلقائياً
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">أدوات التحكم في المعاينة</h3>
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 p-4 rounded-lg border">
          <h4 className="font-semibold mb-3">شريط الأدوات العلوي</h4>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-4 h-4 text-green-600" />
                <h5 className="font-semibold text-sm">تحميل</h5>
              </div>
              <p className="text-xs text-muted-foreground">
                تحميل الملف إلى جهازك مباشرة
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <h5 className="font-semibold text-sm">مشاركة</h5>
              </div>
              <p className="text-xs text-muted-foreground">
                إنشاء رابط مشاركة للملف
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <Maximize2 className="w-4 h-4 text-purple-600" />
                <h5 className="font-semibold text-sm">ملء الشاشة</h5>
              </div>
              <p className="text-xs text-muted-foreground">
                عرض الملف بحجم الشاشة الكامل
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <ZoomIn className="w-4 h-4 text-amber-600" />
                <h5 className="font-semibold text-sm">تكبير</h5>
              </div>
              <p className="text-xs text-muted-foreground">
                تكبير الصورة أو المستند (Ctrl + +)
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <ZoomOut className="w-4 h-4 text-amber-600" />
                <h5 className="font-semibold text-sm">تصغير</h5>
              </div>
              <p className="text-xs text-muted-foreground">
                تصغير الصورة أو المستند (Ctrl + -)
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <RotateCw className="w-4 h-4 text-indigo-600" />
                <h5 className="font-semibold text-sm">تدوير</h5>
              </div>
              <p className="text-xs text-muted-foreground">
                تدوير الصور 90 درجة (للصور فقط)
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">التنقل بين الملفات</h3>
        <div className="border-2 border-green-500/30 rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <div className="flex items-start gap-3">
            <ChevronRight className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                المعاينة المتتابعة
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                عندما تفتح معاينة ملف، يمكنك التنقل للملفات التالية أو السابقة
                دون إغلاق المعاينة
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="bg-background p-3 rounded border">
                  <div className="flex items-center gap-2 mb-1">
                    <ChevronRight className="w-4 h-4" />
                    <p className="font-semibold text-sm">الملف التالي</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    اضغط السهم الأيمن أو زر "التالي" ← (مفتاح السهم الأيمن)
                  </p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <div className="flex items-center gap-2 mb-1">
                    <ChevronLeft className="w-4 h-4" />
                    <p className="font-semibold text-sm">الملف السابق</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    اضغط السهم الأيسر أو زر "السابق" ← (مفتاح السهم الأيسر)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الملفات غير المدعومة</h3>
        <div className="border-2 border-amber-500 bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <FileQuestion className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">
                ماذا يحدث مع الأنواع غير المدعومة؟
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                بعض أنواع الملفات لا يمكن معاينتها مباشرة في المتصفح (مثل: ملفات
                ZIP، EXE، RAR)
              </p>
              <div className="bg-background p-3 rounded border space-y-2">
                <p className="text-sm">
                  ✓ ستظهر معلومات الملف: الاسم، الحجم، تاريخ الإنشاء، النوع
                </p>
                <p className="text-sm">✓ زر تحميل مباشر للحصول على الملف</p>
                <p className="text-sm">✓ اقتراحات لبرامج فتح الملف</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">اختصارات لوحة المفاتيح</h3>
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-3">اختصارات سريعة للمعاينة</h4>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="bg-background p-2 rounded border text-sm">
              <strong>Space:</strong> تشغيل/إيقاف الفيديو أو الصوت
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>Esc:</strong> إغلاق المعاينة
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>← →:</strong> التنقل بين الملفات
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>Ctrl + +/-:</strong> تكبير/تصغير
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>F:</strong> ملء الشاشة
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>D:</strong> تحميل الملف
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>R:</strong> تدوير الصورة (للصور فقط)
            </div>
            <div className="bg-background p-2 rounded border text-sm">
              <strong>I:</strong> عرض/إخفاء معلومات الملف
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح للمعاينة الفعّالة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚡</span>
              <p className="text-sm">
                <strong>معاينة سريعة:</strong> اضغط مسافة (Space) على ملف محدد
                للمعاينة السريعة
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🎬</span>
              <p className="text-sm">
                <strong>للفيديوهات الطويلة:</strong> استخدم مفاتيح الأسهم
                للتقديم/التأخير 5 ثوانٍ
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📄</span>
              <p className="text-sm">
                <strong>للمستندات الطويلة:</strong> استخدم عجلة الماوس أو شريط
                التمرير للتنقل بين الصفحات
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🖼️</span>
              <p className="text-sm">
                <strong>للصور:</strong> انقر نقراً مزدوجاً للتكبير 100%، انقر
                مرة أخرى للملاءمة التلقائية
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📱</span>
              <p className="text-sm">
                <strong>على الهاتف:</strong> استخدم إيماءات القرص (Pinch)
                للتكبير/التصغير
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">💾</span>
              <p className="text-sm">
                <strong>توفير البيانات:</strong> المعاينة تحمل نسخة مضغوطة -
                حمّل الملف الأصلي فقط عند الحاجة
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
              هل المعاينة تستهلك من حجم الملف المتاح للتحميل؟
            </h4>
            <p className="text-sm text-muted-foreground">
              لا، المعاينة لا تحتسب كتحميل. يمكنك معاينة الملفات بحرية دون
              استهلاك حد التحميل.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              لماذا بعض الملفات تستغرق وقتاً للتحميل؟
            </h4>
            <p className="text-sm text-muted-foreground">
              الملفات الكبيرة جداً (فيديوهات +100MB) قد تحتاج ثوانٍ للتحميل.
              المعاينة تبدأ تدريجياً أثناء التحميل.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني تعديل الملف من المعاينة؟
            </h4>
            <p className="text-sm text-muted-foreground">
              المعاينة للعرض فقط. لتعديل ملف، حمّله ثم افتحه في البرنامج المناسب
              على جهازك.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل المعاينة متاحة على الهاتف المحمول؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، جميع مزايا المعاينة متاحة على الهاتف مع واجهة محسّنة للشاشات
              الصغيرة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

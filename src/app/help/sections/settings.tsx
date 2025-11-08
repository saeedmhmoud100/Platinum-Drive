import { Separator } from '@/components/ui/separator'
import { Settings, Palette, Globe, Calendar, Clock, Bell, Upload, HardDrive, Zap } from 'lucide-react'

export function SettingsSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">الإعدادات</h3>
        <p className="text-muted-foreground leading-relaxed">
          خصص تجربتك في بلاتينيوم درايف من خلال إعدادات الواجهة اللغة الإشعارات والرفع.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الوصول إلى الإعدادات</h3>
        <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <div className="flex items-start gap-3">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">كيف تصل</h4>
              <div className="bg-background/80 p-3 rounded border space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">1.</span>
                  <span className="text-sm">اضغط على صورتك الشخصية في الشريط العلوي</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">2.</span>
                  <span className="text-sm">اختر "الإعدادات" من القائمة المنسدلة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إعدادات الواجهة</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-purple-500 pr-4 bg-purple-50 dark:bg-purple-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">المظهر (Theme)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  اختر المظهر المناسب لعينيك ووقت استخدامك
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2"><strong>الخيارات المتاحة:</strong></p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded text-center"> فاتح</div>
                    <div className="bg-muted p-2 rounded text-center"> داكن</div>
                    <div className="bg-muted p-2 rounded text-center"> تلقائي</div>
                  </div>
                </div>
                <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                  <p className="text-xs">
                    ℹ <strong>تلقائي:</strong> يتغير المظهر حسب توقيت نظام التشغيل (فاتح نهارا داكن ليلا)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">اللغة</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  لغة واجهة المستخدم والإشعارات
                </p>
                <div className="bg-background p-3 rounded border">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded"> العربية (ar)</div>
                    <div className="bg-muted p-2 rounded"> English (en)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إعدادات التاريخ والوقت</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-amber-500 pr-4 bg-amber-50 dark:bg-amber-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">نوع التقويم</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  اختر نظام التقويم المستخدم في عرض التواريخ
                </p>
                <div className="bg-background p-3 rounded border">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded"> ميلادي (Gregorian)</div>
                    <div className="bg-muted p-2 rounded"> هجري (Hijri)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-blue-500 pr-4 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">صيغة التاريخ</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  كيف تريد عرض التواريخ في النظام
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2"><strong>أمثلة:</strong></p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="bg-muted p-2 rounded">DD/MM/YYYY  26/10/2025</div>
                    <div className="bg-muted p-2 rounded">MM/DD/YYYY  10/26/2025</div>
                    <div className="bg-muted p-2 rounded">YYYY-MM-DD  2025-10-26</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-indigo-500 pr-4 bg-indigo-50 dark:bg-indigo-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">صيغة الوقت</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  نظام عرض الساعات
                </p>
                <div className="bg-background p-3 rounded border">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded"> 12 ساعة (AM/PM)</div>
                    <div className="bg-muted p-2 rounded"> 24 ساعة</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-cyan-500 pr-4 bg-cyan-50 dark:bg-cyan-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-cyan-700 dark:text-cyan-300">المنطقة الزمنية</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  حدد منطقتك الزمنية لعرض الأوقات بدقة
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2"><strong>أمثلة:</strong></p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="bg-muted p-2 rounded"> Africa/Cairo</div>
                    <div className="bg-muted p-2 rounded"> Asia/Riyadh</div>
                    <div className="bg-muted p-2 rounded"> Asia/Dubai</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إعدادات الإشعارات</h3>
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3 mb-3">
            <Bell className="w-6 h-6 text-primary shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">تحكم في الإشعارات</h4>
              <p className="text-sm text-muted-foreground mb-3">
                فعل أو أوقف الإشعارات حسب نوع النشاط
              </p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="bg-background p-3 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-sm">رفع ملفات</h5>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">مفعل افتراضيا</span>
              </div>
              <p className="text-xs text-muted-foreground">
                إشعار عند اكتمال رفع الملفات
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-sm">حد التخزين</h5>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">مفعل افتراضيا</span>
              </div>
              <p className="text-xs text-muted-foreground">
                تنبيه عند اقتراب نفاد المساحة
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-sm">روابط المشاركة</h5>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">مفعل افتراضيا</span>
              </div>
              <p className="text-xs text-muted-foreground">
                إشعار عند دخول شخص لرابط مشاركة
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-sm">نشاط الملفات</h5>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">مفعل افتراضيا</span>
              </div>
              <p className="text-xs text-muted-foreground">
                تحديثات على الملفات المشتركة معك
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إعدادات الرفع</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-orange-500 pr-4 bg-orange-50 dark:bg-orange-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">المجلد الافتراضي للرفع</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  المجلد الذي سيتم رفع الملفات إليه تلقائيا
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm">
                    <strong>القيمة الافتراضية:</strong> المجلد الرئيسي (/)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    يمكنك تغييره لأي مجلد تريده
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-pink-500 pr-4 bg-pink-50 dark:bg-pink-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-pink-700 dark:text-pink-300">إنشاء الصور المصغرة تلقائيا</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  توليد معاينات صغيرة للصور لتحميل أسرع
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm">
                    <strong>مفعل افتراضيا</strong> - ينصح بإبقائه مفعلا لتحسين الأداء
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-violet-500 pr-4 bg-violet-50 dark:bg-violet-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-violet-700 dark:text-violet-300">ضغط الصور</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  تقليل حجم الصور تلقائيا عند الرفع لتوفير المساحة
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>معطل افتراضيا</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                     تفعيل الضغط قد يقلل جودة الصور قليلا مقابل توفير المساحة
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-teal-500 pr-4 bg-teal-50 dark:bg-teal-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-teal-700 dark:text-teal-300">منع الملفات المكررة</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  كشف ومنع رفع نفس الملف أكثر من مرة
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>مفعل افتراضيا</strong> - يوفر مساحة التخزين
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ℹ يتم الكشف بناء على محتوى الملف (hash) وليس الاسم فقط
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">حفظ التغييرات</h3>
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground mb-3">
            بعد تعديل أي إعداد اضغط زر <strong>"حفظ التغييرات"</strong> في أسفل الصفحة لتطبيق الإعدادات الجديدة.
          </p>
          <div className="bg-background p-3 rounded border">
            <p className="text-xs">
               <strong>نصيحة:</strong> بعض الإعدادات (مثل اللغة والمظهر) قد تحتاج لإعادة تحميل الصفحة لتطبيقها بالكامل
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">ماذا يحدث إذا غيرت اللغة</h4>
            <p className="text-sm text-muted-foreground">
              ستتغير جميع النصوص في الواجهة القوائم والإشعارات إلى اللغة الجديدة. قد تحتاج لإعادة تحميل الصفحة.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكن استرجاع الإعدادات الافتراضية</h4>
            <p className="text-sm text-muted-foreground">
              يمكنك تغيير كل إعداد يدويا للقيم الافتراضية الموضحة بجانب كل خيار. لا يوجد زر "استعادة للإعدادات الافتراضية" حاليا.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل تؤثر إعدادات الضغط على الملفات الموجودة</h4>
            <p className="text-sm text-muted-foreground">
              لا إعدادات الضغط تؤثر فقط على الملفات الجديدة التي سترفعها. الملفات القديمة تبقى كما هي.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">لماذا أحتاج لتحديد المنطقة الزمنية</h4>
            <p className="text-sm text-muted-foreground">
              لعرض أوقات رفع الملفات آخر تعديل وتواريخ الإشعارات بشكل صحيح حسب منطقتك. بدونها قد ترى أوقات غير دقيقة.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

import {
  Search,
  Filter,
  FileType,
  Calendar,
  HardDrive,
  Folder,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SearchSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-2xl font-bold mb-3">البحث عن الملفات</h3>
        <p className="text-muted-foreground leading-relaxed">
          ابحث عن ملفاتك بسرعة باستخدام البحث النصي والفلاتر. حدد نوع الملف
          التاريخ الحجم والمجلد للعثور على ما تريد.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">البحث النصي</h3>
        <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <div className="flex items-start gap-3">
            <Search className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">
                كيفية البحث
              </h4>
              <div className="space-y-3">
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">1.</span>
                    <span className="text-sm">
                      اذهب إلى صفحة "البحث" من القائمة الجانبية
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">2.</span>
                    <span className="text-sm">
                      اكتب اسم الملف أو جزء منه في خانة البحث
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">3.</span>
                    <span className="text-sm">
                      استخدم الفلاتر إذا أردت تضييق النتائج
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">4.</span>
                    <span className="text-sm">
                      اضغط Enter أو انتظر قليلا - النتائج ستظهر تلقائيا
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded border border-blue-300 dark:border-blue-700">
                  <p className="text-sm">
                    <strong>نصيحة:</strong> البحث يعمل على أسماء الملفات فقط -
                    اكتب أي جزء من اسم الملف وستجده
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الفلاتر المتاحة</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-purple-500 pr-4 bg-purple-50 dark:bg-purple-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <FileType className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  فلتر نوع الملف
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  ابحث حسب نوع الملف: صور مستندات فيديو صوت أرشيف أو أي نوع آخر
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs mb-1">
                    <strong>الأنواع المتاحة:</strong>
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>
                      {" "}
                      <strong>صور:</strong> JPG, PNG, GIF, SVG, WebP, BMP...
                    </li>
                    <li>
                      {" "}
                      <strong>مستندات:</strong> PDF, DOCX, TXT, XLSX, PPTX...
                    </li>
                    <li>
                      {" "}
                      <strong>فيديو:</strong> MP4, AVI, MKV, MOV, WebM...
                    </li>
                    <li>
                      {" "}
                      <strong>صوت:</strong> MP3, WAV, OGG, FLAC, AAC...
                    </li>
                    <li>
                      {" "}
                      <strong>أرشيف:</strong> ZIP, RAR, 7Z, TAR, GZ...
                    </li>
                    <li>
                      {" "}
                      <strong>كود:</strong> JS, TS, PY, JAVA, HTML, CSS...
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                  فلتر التاريخ
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  ابحث عن الملفات المرفوعة في فترة زمنية معينة
                </p>
                <div className="bg-background p-2 rounded border space-y-1">
                  <p className="text-xs">
                    <strong>من تاريخ:</strong> حدد تاريخ البداية
                  </p>
                  <p className="text-xs">
                    <strong>إلى تاريخ:</strong> حدد تاريخ النهاية
                  </p>
                  <p className="text-xs mt-2">
                    <strong>مثال:</strong> للبحث عن ملفات آخر 7 أيام اختر من
                    (اليوم - 7 أيام) إلى (اليوم)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-orange-500 pr-4 bg-orange-50 dark:bg-orange-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-300">
                  فلتر الحجم
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  ابحث عن الملفات حسب حجمها (بالبايت كيلوبايت ميجابايت أو
                  جيجابايت)
                </p>
                <div className="bg-background p-2 rounded border space-y-1">
                  <p className="text-xs">
                    <strong>الحد الأدنى:</strong> أصغر حجم للبحث عنه
                  </p>
                  <p className="text-xs">
                    <strong>الحد الأقصى:</strong> أكبر حجم للبحث عنه
                  </p>
                  <p className="text-xs mt-2">
                    <strong>مثال:</strong> للبحث عن ملفات بين 1 MB و 10 MB ضع
                    الحد الأدنى = 1048576 بايت والحد الأقصى = 10485760 بايت
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-cyan-500 pr-4 bg-cyan-50 dark:bg-cyan-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Folder className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-cyan-700 dark:text-cyan-300">
                  البحث داخل مجلد معين
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  حصر البحث في مجلد محدد بدلا من البحث في جميع ملفاتك
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>كيف:</strong> اختر المجلد من القائمة ثم ابحث - ستظهر
                    فقط النتائج داخل هذا المجلد والمجلدات الفرعية
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">دمج الفلاتر للبحث الدقيق</h3>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <Filter className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                استخدم فلاتر متعددة معا
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                يمكنك دمج عدة فلاتر للوصول بدقة إلى الملفات التي تبحث عنها
              </p>
              <div className="bg-background/80 p-3 rounded border space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">
                    مثال 1: صور كبيرة من آخر شهر
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li> نوع الملف: صور</li>
                    <li> الحجم: أكبر من 5 MB</li>
                    <li> التاريخ: آخر 30 يوم</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">
                    مثال 2: مستندات PDF في مجلد العمل
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li> نوع الملف: مستندات (PDF)</li>
                    <li> المجلد: Work/Projects</li>
                    <li> البحث النصي: "تقرير"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">
                    مثال 3: فيديوهات صغيرة من اليوم
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li> نوع الملف: فيديو</li>
                    <li> الحجم: أقل من 50 MB</li>
                    <li> التاريخ: اليوم</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">مسح الفلاتر</h3>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <X className="w-6 h-6 text-primary shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">إعادة تعيين البحث</h4>
              <p className="text-sm text-muted-foreground mb-3">
                إذا أردت البحث من جديد بدون فلاتر اضغط على زر "مسح الفلاتر" أو
                "إعادة تعيين" الموجود في صفحة البحث.
              </p>
              <div className="bg-background p-2 rounded border">
                <p className="text-xs">
                  <strong>متى تستخدمه:</strong> عندما تحصل على نتائج قليلة جدا
                  أو لا تجد ما تبحث عنه قد تكون الفلاتر ضيقة جدا - امسحها وجرب
                  من جديد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح للبحث الفعال</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>كن محددا:</strong> استخدم كلمات مفتاحية واضحة. بدلا من
                "صورة" ابحث عن "رحلة البحر" أو "2024"
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>استخدم الفلاتر:</strong> إذا كنت تعرف نوع الملف أو
                تاريخه التقريبي استخدم الفلاتر لتضييق النتائج
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>ابحث في مجلد معين:</strong> إذا كنت تعرف أن الملف في
                مجلد محدد حدده لتسريع البحث
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>جرب كلمات مختلفة:</strong> إذا لم تجد ما تبحث عنه جرب
                كلمات بديلة أو أجزاء من اسم الملف
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>انتبه للحجم:</strong> إذا كنت تبحث عن ملف كبير (فيديو
                مثلا) استخدم فلتر الحجم لاستبعاد الملفات الصغيرة
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>استخدم المفضلة:</strong> للملفات المهمة التي تبحث عنها
                كثيرا أضفها للمفضلة لتجدها بسهولة دائما
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني البحث داخل محتوى الملفات (النص الموجود بداخلها)
            </h4>
            <p className="text-sm text-muted-foreground">
              لا البحث حاليا يعمل فقط على أسماء الملفات. لذلك تأكد من تسمية
              ملفاتك بأسماء واضحة ووصفية.
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">
              لماذا لا تظهر بعض الملفات في نتائج البحث
            </h4>
            <p className="text-sm text-muted-foreground">
              تأكد من أن الملف لم يحذف (تحقق من سلة المهملات) وأنك لا تستخدم
              فلاتر ضيقة جدا. جرب مسح الفلاتر والبحث مرة أخرى.
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">
              هل البحث يعمل على الملفات في جميع المجلدات
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم البحث الافتراضي يبحث في جميع ملفاتك بغض النظر عن المجلد. إذا
              أردت البحث في مجلد معين فقط استخدم فلتر "المجلد".
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني البحث عن ملفات بدون اسم واضح
            </h4>
            <p className="text-sm text-muted-foreground">
              استخدم فلاتر التاريخ النوع أو الحجم للتضييق. إذا كنت تتذكر متى
              رفعت الملف أو نوعه يمكنك إيجاده بهذه الطريقة.
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">
              كيف أبحث عن الملفات الكبيرة التي تستهلك مساحة تخزين
            </h4>
            <p className="text-sm text-muted-foreground">
              استخدم فلتر الحجم واختر "الحد الأدنى" كبير (مثلا 100 MB أو 1 GB).
              سترى قائمة بأكبر الملفات لديك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Separator } from '@/components/ui/separator'
import { Star, StarOff, Clock, TrendingUp, Filter } from 'lucide-react'

export function FavoritesSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">المفضلة</h3>
        <p className="text-muted-foreground leading-relaxed">
          المفضلة هي طريقتك للوصول السريع للملفات والمجلدات المهمة. ضع علامة نجمة على أي ملف أو مجلد تحتاج الوصول إليه بسرعة.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إضافة ملف أو مجلد للمفضلة</h3>
        <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">طريقة الإضافة</h4>
              <div className="space-y-3">
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">1.</span>
                    <span className="text-sm">اضغط على النقاط الثلاث () بجانب الملف أو المجلد</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">2.</span>
                    <span className="text-sm">اختر "إضافة للمفضلة" من القائمة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">3.</span>
                    <span className="text-sm">ستظهر علامة نجمة مضيئة  بجانب الملف</span>
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded border border-blue-300 dark:border-blue-700">
                  <p className="text-sm">
                     <strong>نصيحة سريعة:</strong> يمكنك أيضا الضغط مباشرة على أيقونة النجمة  بجانب الملف لإضافته للمفضلة بنقرة واحدة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إزالة من المفضلة</h3>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <StarOff className="w-6 h-6 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">إلغاء المفضلة</h4>
              <p className="text-sm text-muted-foreground mb-3">
                لإزالة ملف أو مجلد من المفضلة اضغط على النجمة المضيئة  مرة أخرى أو اختر "إزالة من المفضلة" من القائمة ().
              </p>
              <div className="bg-background p-2 rounded border">
                <p className="text-xs">
                  <strong>ملاحظة:</strong> إزالة الملف من المفضلة لا تحذف الملف - الملف يبقى في مكانه الأصلي فقط يزال من قائمة المفضلة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">عرض المفضلة</h3>
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <Filter className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">صفحة المفضلة</h4>
              <p className="text-sm text-muted-foreground mb-3">
                للوصول إلى جميع ملفاتك المفضلة في مكان واحد اذهب إلى قسم "المفضلة" من القائمة الجانبية.
              </p>
              <div className="bg-background/80 p-3 rounded border">
                <p className="text-sm mb-2"><strong>في صفحة المفضلة تجد:</strong></p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li> جميع الملفات والمجلدات المفضلة في مكان واحد</li>
                  <li> يمكنك فتح تحميل أو مشاركة أي ملف مباشرة</li>
                  <li> يمكنك إزالة ملفات من المفضلة بسهولة</li>
                  <li> الملفات مرتبة حسب تاريخ الإضافة (الأحدث أولا)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الفرق بين المفضلة والملفات الأخيرة</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-2 border-amber-500/30 rounded-lg p-4 bg-amber-50 dark:bg-amber-950">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h4 className="font-semibold text-amber-700 dark:text-amber-300">المفضلة</h4>
            </div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li> أنت من يضيفها يدويا</li>
              <li> تبقى في المفضلة حتى تزيلها</li>
              <li> للملفات المهمة التي تحتاجها دائما</li>
              <li> مثل: عقود العمل ملفات المشاريع الحالية</li>
            </ul>
          </div>

          <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">الملفات الأخيرة</h4>
            </div>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li> تظهر تلقائيا عند فتح ملف</li>
              <li> تتغير باستمرار (آخر 20 ملف)</li>
              <li> للملفات التي عملت عليها مؤخرا</li>
              <li> مثل: ملف عدلته اليوم صورة شاهدتها أمس</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">استخدامات ذكية للمفضلة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>المجلدات المهمة:</strong> أضف مجلدات مشاريعك النشطة للمفضلة للوصول السريع
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>المستندات المتكررة:</strong> العقود النماذج القوالب التي تستخدمها كثيرا
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>المشاريع الحالية:</strong> ملفات المشروع الذي تعمل عليه حاليا
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>التقارير الشهرية:</strong> التقارير أو الملفات التي تحتاج مراجعتها بانتظام
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>الملفات المشتركة:</strong> الملفات التي تشاركها مع الفريق باستمرار
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح للاستفادة القصوى</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">أفضل الممارسات</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p> <strong>لا تبالغ:</strong> أضف فقط الملفات التي تحتاجها فعلا - إذا أضفت كل شيء المفضلة تفقد هدفها</p>
                <p> <strong>نظف بانتظام:</strong> كل فترة راجع المفضلة وأزل الملفات التي لم تعد مهمة</p>
                <p> <strong>استخدمها للمؤقت:</strong> أضف ملفات مشروع معين وبعد انتهاء المشروع أزلها</p>
                <p> <strong>للمجلدات أيضا:</strong> لا تنسى أن المجلدات أيضا يمكن إضافتها للمفضلة</p>
                <p> <strong>تسمية واضحة:</strong> تأكد أن أسماء الملفات المفضلة واضحة لتعرفها مباشرة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الأسئلة الشائعة</h3>
        <div className="space-y-4">
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">كم عدد الملفات التي يمكنني إضافتها للمفضلة</h4>
            <p className="text-sm text-muted-foreground">
              لا يوجد حد! يمكنك إضافة عدد غير محدود من الملفات والمجلدات للمفضلة لكن يفضل الاحتفاظ بالأهم فقط للاستفادة القصوى.
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">هل المفضلة تأخذ مساحة إضافية من التخزين</h4>
            <p className="text-sm text-muted-foreground">
              لا المفضلة مجرد علامة على الملف. الملف يبقى في مكانه الأصلي ولا ينسخ فلا تقلق من المساحة.
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">ماذا يحدث إذا حذفت ملف من المفضلة</h4>
            <p className="text-sm text-muted-foreground">
              إذا حذفت الملف نفسه (نقلته لسلة المهملات) سيختفي من المفضلة أيضا. أما إذا أزلته من المفضلة فقط الملف يبقى في مكانه الأصلي.
            </p>
          </div>
          <div className="border-r-4 border-primary pr-4">
            <h4 className="font-semibold mb-2">هل يمكن ترتيب الملفات في المفضلة</h4>
            <p className="text-sm text-muted-foreground">
              حاليا الملفات في المفضلة مرتبة حسب تاريخ الإضافة (الأحدث أولا). يمكنك استخدام خاصية البحث والفلترة داخل صفحة المفضلة.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FolderOpen,
  Star,
  Share2,
  Clock,
  HardDrive,
  TrendingUp,
  Filter,
} from "lucide-react";

export function HomeSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">
          الصفحة الرئيسية - لوحة التحكم
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          الصفحة الرئيسية هي أول ما تراه بعد تسجيل الدخول. تعرض لك نظرة شاملة
          على ملفاتك ونشاطك الأخير ومساحة التخزين المتاحة.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">مكونات لوحة التحكم</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <HardDrive className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">مساحة التخزين</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  في أعلى الصفحة، ستجد شريط تقدم يوضح مساحة التخزين المستخدمة
                  والمتبقية
                </p>
                <div className="bg-background p-3 rounded border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">المساحة المستخدمة</span>
                    <span className="text-muted-foreground">
                      2.5 جيجا من 5 جيجا
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 عند اقتراب المساحة من الامتلاء، يمكنك ترقية حسابك للحصول
                    على مساحة أكبر
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">الملفات الأخيرة</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  قسم يعرض آخر الملفات التي تم رفعها أو تعديلها، لتسهيل الوصول
                  السريع
                </p>
                <div className="bg-background p-3 rounded border space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                      📄
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">تقرير المشروع.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        منذ 5 دقائق
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                      🖼️
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">صورة الشعار.png</div>
                      <div className="text-xs text-muted-foreground">
                        منذ ساعة
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2 border-t">
                    يعرض هذا القسم آخر 10 ملفات قمت بالعمل عليها
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <FolderOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">المجلدات الرئيسية</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  الوصول السريع إلى مجلداتك الأكثر استخداماً
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-background p-3 rounded border flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">المستندات</span>
                  </div>
                  <div className="bg-background p-3 rounded border flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">الصور</span>
                  </div>
                  <div className="bg-background p-3 rounded border flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">الفيديوهات</span>
                  </div>
                  <div className="bg-background p-3 rounded border flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">العمل</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">المفضلة السريعة</h4>
                <p className="text-sm text-muted-foreground">
                  الملفات التي وضعت عليها علامة نجمة تظهر هنا للوصول السريع
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Share2 className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">الملفات المشتركة معك</h4>
                <p className="text-sm text-muted-foreground">
                  عرض سريع للملفات التي شاركها الآخرون معك
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">شريط التنقل العلوي</h3>
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <div className="font-bold text-primary">1.</div>
            <div>
              <h4 className="font-semibold text-sm mb-1">شريط البحث</h4>
              <p className="text-sm text-muted-foreground">
                يمكنك البحث عن أي ملف أو مجلد بكتابة اسمه في شريط البحث في
                الأعلى
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="font-bold text-primary">2.</div>
            <div>
              <h4 className="font-semibold text-sm mb-1">زر الرفع السريع</h4>
              <p className="text-sm text-muted-foreground">
                زر "رفع ملف" يسمح لك برفع ملفات جديدة من أي صفحة في الموقع
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="font-bold text-primary">3.</div>
            <div>
              <h4 className="font-semibold text-sm mb-1">الإشعارات</h4>
              <p className="text-sm text-muted-foreground">
                أيقونة الجرس تعرض آخر الإشعارات والتحديثات
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="font-bold text-primary">4.</div>
            <div>
              <h4 className="font-semibold text-sm mb-1">قائمة المستخدم</h4>
              <p className="text-sm text-muted-foreground">
                صورتك الشخصية توفر وصول سريع للإعدادات والملف الشخصي وتسجيل
                الخروج
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">القائمة الجانبية</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              الرئيسية
            </h4>
            <p className="text-xs text-muted-foreground">
              الصفحة الحالية - نظرة عامة على كل شيء
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              ملفاتي
            </h4>
            <p className="text-xs text-muted-foreground">
              جميع ملفاتك ومجلداتك في مكان واحد
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              المفضلة
            </h4>
            <p className="text-xs text-muted-foreground">
              الملفات المهمة التي وضعت عليها علامة
            </p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              مشترك معي
            </h4>
            <p className="text-xs text-muted-foreground">
              الملفات التي شاركها الآخرون معك
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الإحصائيات والرسوم البيانية</h3>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">نشاط التخزين</h4>
              <p className="text-sm text-muted-foreground mb-3">
                تعرض لك بعض الحسابات المميزة رسوم بيانية توضح:
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>كمية البيانات المرفوعة خلال الأسبوع/الشهر</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>أنواع الملفات الأكثر استخداماً</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>معدل نمو البيانات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>نشاط المشاركة مع الآخرين</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">تخصيص لوحة التحكم</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-muted p-4 rounded-lg">
            <Filter className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">خيارات العرض</h4>
              <p className="text-sm text-muted-foreground mb-3">
                يمكنك تخصيص كيفية عرض ملفاتك في الصفحة الرئيسية:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>عرض الشبكة (Grid View) - لرؤية الملفات كبطاقات</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>عرض القائمة (List View) - لرؤية تفاصيل أكثر</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>الترتيب حسب: الاسم، التاريخ، الحجم، النوع</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح للاستفادة القصوى</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">💡</span>
              <p className="text-sm">
                <strong>ثبّت الملفات المهمة:</strong> اضغط على النجمة بجانب أي
                ملف لإضافته إلى المفضلة وسيظهر في الصفحة الرئيسية
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📌</span>
              <p className="text-sm">
                <strong>نظّم مجلداتك:</strong> استخدم المجلدات لتنظيم ملفاتك،
                ستظهر المجلدات الأكثر استخداماً في القسم السريع
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔔</span>
              <p className="text-sm">
                <strong>تابع الإشعارات:</strong> راجع الإشعارات بانتظام لمعرفة
                من شارك ملفات معك أو علّق على ملفاتك
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📊</span>
              <p className="text-sm">
                <strong>راقب المساحة:</strong> تحقق من مساحة التخزين بانتظام
                واحذف الملفات غير المهمة أو انقلها إلى سلة المهملات
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
              كيف أخفي أو أظهر أقسام معينة في لوحة التحكم؟
            </h4>
            <p className="text-sm text-muted-foreground">
              حالياً، تخطيط لوحة التحكم ثابت، لكن يمكنك استخدام القائمة الجانبية
              للانتقال مباشرة للقسم الذي تريده.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              لماذا لا تظهر بعض ملفاتي في "الملفات الأخيرة"؟
            </h4>
            <p className="text-sm text-muted-foreground">
              يعرض هذا القسم فقط آخر 10 ملفات تم رفعها أو تعديلها. الملفات
              الأقدم يمكن الوصول إليها من صفحة "ملفاتي".
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني تغيير الصفحة التي تفتح بعد تسجيل الدخول؟
            </h4>
            <p className="text-sm text-muted-foreground">
              حالياً، الصفحة الرئيسية هي الصفحة الافتراضية بعد تسجيل الدخول،
              وهذا يوفر نظرة شاملة على كل أنشطتك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

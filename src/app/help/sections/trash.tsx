import { Separator } from "@/components/ui/separator";
import {
  Trash2,
  RotateCcw,
  XCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  HardDrive,
  Filter,
  Calendar,
} from "lucide-react";

export function TrashSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">سلة المهملات</h3>
        <p className="text-muted-foreground leading-relaxed">
          الملفات المحذوفة لا تختفي فوراً - تُحفظ في سلة المهملات لمدة 30 يوماً.
          يمكنك استرجاعها أو حذفها نهائياً.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نقل الملفات لسلة المهملات</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-2 border-red-500/30 rounded-lg p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <div className="flex items-start gap-3">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                  حذف ملف أو مجلد
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-red-600">1.</span>
                    <span>اضغط على النقاط الثلاث (⋮) بجانب الملف</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-red-600">2.</span>
                    <span>اختر "حذف" من القائمة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-red-600">3.</span>
                    <span>أكّد الحذف في النافذة المنبثقة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-amber-500/30 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">
                  ملاحظة مهمة
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>⚠️ الملفات المحذوفة تبقى في سلة المهملات لمدة 30 يوماً</p>
                  <p>⚠️ بعد 30 يوماً، يتم حذفها نهائياً وتلقائياً</p>
                  <p>⚠️ حذف مجلد يحذف جميع محتوياته</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الوصول لسلة المهملات</h3>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Trash2 className="w-6 h-6 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3">عرض الملفات المحذوفة</h4>
              <div className="bg-background p-3 rounded border mb-3">
                <p className="text-sm">
                  اضغط على "سلة المهملات" من القائمة الجانبية لرؤية جميع الملفات
                  والمجلدات المحذوفة
                </p>
              </div>
              <div className="grid gap-2 md:grid-cols-3 text-sm">
                <div className="bg-background p-2 rounded border">
                  <p className="font-semibold text-xs mb-1">اسم الملف</p>
                  <p className="text-xs text-muted-foreground">
                    الاسم الأصلي قبل الحذف
                  </p>
                </div>
                <div className="bg-background p-2 rounded border">
                  <p className="font-semibold text-xs mb-1">تاريخ الحذف</p>
                  <p className="text-xs text-muted-foreground">
                    متى تم نقله للسلة
                  </p>
                </div>
                <div className="bg-background p-2 rounded border">
                  <p className="font-semibold text-xs mb-1">الحذف النهائي</p>
                  <p className="text-xs text-muted-foreground">
                    متى سيُحذف تلقائياً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">استرجاع الملفات</h3>
        <div className="border-2 border-green-500/30 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <div className="flex items-start gap-3">
            <RotateCcw className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">
                استعادة ملف محذوف
              </h4>
              <div className="space-y-3">
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>الطريقة 1: استرجاع ملف واحد</strong>
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>1. افتح سلة المهملات</p>
                    <p>2. اضغط (⋮) بجانب الملف</p>
                    <p>3. اختر "استرجاع"</p>
                    <p>4. الملف يعود لموقعه الأصلي فوراً</p>
                  </div>
                </div>

                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>الطريقة 2: استرجاع عدة ملفات</strong>
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>1. حدد الملفات التي تريد استرجاعها (Ctrl+Click)</p>
                    <p>2. اضغط زر "استرجاع المحدد" في الأعلى</p>
                    <p>3. جميع الملفات تعود لمواقعها الأصلية</p>
                  </div>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded border border-green-300 dark:border-green-700">
                  <p className="text-sm">
                    ✅ <strong>ملاحظة:</strong> الملف المسترجع يعود لنفس المجلد
                    الذي كان فيه قبل الحذف
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الحذف النهائي</h3>
        <div className="space-y-3">
          <div className="border-2 border-red-500 bg-red-50 dark:bg-red-950 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                  ⚠️ حذف نهائي - لا يمكن التراجع
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  الحذف النهائي يزيل الملف تماماً ولا يمكن استرجاعه بأي طريقة
                </p>
                <div className="bg-background p-3 rounded border space-y-2">
                  <p className="text-sm">
                    <strong>لحذف ملف نهائياً:</strong>
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>1. افتح سلة المهملات</p>
                    <p>2. اضغط (⋮) بجانب الملف</p>
                    <p>3. اختر "حذف نهائياً"</p>
                    <p>4. أكّد الحذف في رسالة التحذير</p>
                  </div>
                </div>
                <div className="mt-3 bg-red-100 dark:bg-red-900/30 p-2 rounded border border-red-300 dark:border-red-700">
                  <p className="text-sm font-semibold">
                    🚨 تحذير: هذه العملية لا يمكن التراجع عنها. تأكد قبل الحذف
                    النهائي!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-purple-500/30 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="flex items-start gap-3">
              <Trash2 className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  إفراغ سلة المهملات
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  حذف جميع الملفات من السلة دفعة واحدة
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    اضغط زر "إفراغ سلة المهملات" في أعلى الصفحة
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                    ⚠️ سيتم حذف جميع الملفات نهائياً وفوراً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">مدة الاحتفاظ والحذف التلقائي</h3>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">
                نظام الـ 30 يوماً
              </h4>
              <div className="space-y-3">
                <div className="bg-background/80 p-3 rounded border">
                  <h5 className="font-semibold text-sm mb-2">كيف يعمل؟</h5>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• عند حذف ملف، يُنقل لسلة المهملات</p>
                    <p>• يبقى في السلة لمدة 30 يوماً بالضبط</p>
                    <p>• بعد 30 يوماً، يُحذف تلقائياً ونهائياً</p>
                    <p>• يمكنك استرجاعه في أي وقت خلال الـ 30 يوماً</p>
                  </div>
                </div>

                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  <div className="bg-background p-2 rounded border border-green-500">
                    <p className="font-semibold text-xs text-green-700 dark:text-green-300 mb-1">
                      يوم 1-10
                    </p>
                    <p className="text-xs text-muted-foreground">
                      آمن - وقت كافٍ للاسترجاع
                    </p>
                  </div>
                  <div className="bg-background p-2 rounded border border-amber-500">
                    <p className="font-semibold text-xs text-amber-700 dark:text-amber-300 mb-1">
                      يوم 11-25
                    </p>
                    <p className="text-xs text-muted-foreground">
                      جيد - لا يزال وقت متاح
                    </p>
                  </div>
                  <div className="bg-background p-2 rounded border border-red-500">
                    <p className="font-semibold text-xs text-red-700 dark:text-red-300 mb-1">
                      يوم 26-30
                    </p>
                    <p className="text-xs text-muted-foreground">
                      تحذير - قرب الحذف النهائي
                    </p>
                  </div>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded border border-blue-300 dark:border-blue-700">
                  <p className="text-sm">
                    💡 <strong>نصيحة:</strong> راجع سلة المهملات دورياً لاسترجاع
                    ما تحتاجه أو حذف ما لا تحتاجه نهائياً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">المساحة التخزينية</h3>
        <div className="border rounded-lg p-4 bg-muted">
          <div className="flex items-start gap-3">
            <HardDrive className="w-6 h-6 text-primary shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3">
                هل تستهلك سلة المهملات من مساحتي؟
              </h4>
              <div className="space-y-3">
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>نعم</strong> - الملفات في سلة المهملات لا تزال
                    تستهلك من مساحة التخزين المتاحة
                  </p>
                  <p className="text-sm text-muted-foreground">
                    إذا كانت مساحتك ممتلئة، أفرغ سلة المهملات لتحرير المساحة
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 p-3 rounded border border-green-500">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    كيف تحرر مساحة بسرعة؟
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>1. افتح سلة المهملات</p>
                    <p>2. رتّب الملفات حسب الحجم (الأكبر أولاً)</p>
                    <p>3. احذف الملفات الكبيرة التي لا تحتاجها نهائياً</p>
                    <p>4. أو اضغط "إفراغ السلة" لحذف كل شيء</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">تصفية وترتيب سلة المهملات</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                  فلاتر البحث
                </h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• حسب نوع الملف (صور، مستندات، فيديوهات)</p>
                  <p>• حسب الحجم (كبيرة، صغيرة)</p>
                  <p>• حسب قرب الحذف (آخر 5 أيام)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                  خيارات الترتيب
                </h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• حسب تاريخ الحذف (الأحدث/الأقدم)</p>
                  <p>• حسب الاسم (أبجدياً)</p>
                  <p>• حسب الحجم (الأكبر/الأصغر)</p>
                  <p>• حسب قرب الحذف النهائي</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح مهمة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">🔍</span>
              <p className="text-sm">
                <strong>راجع السلة دورياً:</strong> مرة كل أسبوع، راجع سلة
                المهملات لاسترجاع ما نسيته أو حذف ما لا تحتاجه
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">💾</span>
              <p className="text-sm">
                <strong>حرر المساحة:</strong> إذا كانت مساحتك ممتلئة، أول خطوة:
                أفرغ سلة المهملات
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <p className="text-sm">
                <strong>انتبه للملفات القريبة من الحذف:</strong> السلة تُظهر
                تحذيراً للملفات التي ستُحذف خلال 5 أيام
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📁</span>
              <p className="text-sm">
                <strong>المجلدات المحذوفة:</strong> عند حذف مجلد، جميع محتوياته
                تُحذف أيضاً. استرجاع المجلد يسترجع كل شيء
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔐</span>
              <p className="text-sm">
                <strong>الخصوصية:</strong> الملفات في سلة المهملات خاصة بك فقط -
                لا يمكن لأحد الوصول إليها حتى لو كانت مشتركة سابقاً
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔄</span>
              <p className="text-sm">
                <strong>استرجاع متعدد:</strong> يمكنك تحديد عدة ملفات واسترجاعها
                دفعة واحدة لتوفير الوقت
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
              هل يمكنني تعطيل الحذف التلقائي بعد 30 يوماً؟
            </h4>
            <p className="text-sm text-muted-foreground">
              لا، فترة الـ 30 يوماً ثابتة. لكن يمكنك استرجاع الملفات في أي وقت
              خلال هذه المدة، أو حذفها نهائياً قبل ذلك.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              ماذا يحدث إذا حذف شخص ملف مشترك؟
            </h4>
            <p className="text-sm text-muted-foreground">
              إذا كنت مالك الملف وحذفته، ينتقل لسلة مهملاتك ويختفي عن جميع
              الأشخاص المشتركين. إذا استرجعته، يعود للجميع.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكنني رؤية من حذف الملف؟</h4>
            <p className="text-sm text-muted-foreground">
              نعم، في تفاصيل الملف داخل سلة المهملات، يمكنك رؤية من قام بحذفه
              ومتى.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل الحذف النهائي يحرر المساحة فوراً؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، بمجرد الحذف النهائي للملف (أو الحذف التلقائي بعد 30 يوم)،
              المساحة تُحرر فوراً وتظهر في حسابك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

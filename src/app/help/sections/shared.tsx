import { Separator } from "@/components/ui/separator";
import {
  Share2,
  Link2,
  Lock,
  Copy,
  Clock,
  Eye,
  Download,
  AlertTriangle,
} from "lucide-react";

export function SharedSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">مشاركة الملفات</h3>
        <p className="text-muted-foreground leading-relaxed">
          شارك ملفاتك مع الآخرين عبر روابط آمنة. تحكم في مدة الصلاحية، كلمة
          المرور، وعدد مرات التحميل.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إنشاء رابط مشاركة</h3>
        <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <div className="flex items-start gap-3">
            <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">
                كيفية مشاركة ملف
              </h4>
              <div className="space-y-3">
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">1.</span>
                    <span className="text-sm">
                      اضغط على (⋮) بجانب الملف الذي تريد مشاركته
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">2.</span>
                    <span className="text-sm">اختر "مشاركة" من القائمة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">3.</span>
                    <span className="text-sm">
                      اضبط إعدادات المشاركة (تاريخ الانتهاء، كلمة المرور، عدد
                      التحميلات)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">4.</span>
                    <span className="text-sm">
                      اضغط "إنشاء رابط" - سيتم نسخ الرابط تلقائياً
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 text-sm">5.</span>
                    <span className="text-sm">
                      أرسل الرابط لمن تريد عبر البريد، واتساب، أو أي وسيلة
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded border border-blue-300 dark:border-blue-700">
                  <p className="text-sm">
                    ✅ <strong>ملاحظة:</strong> أي شخص لديه الرابط يمكنه الوصول
                    للملف (إذا لم تضع كلمة مرور)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">خيارات الأمان والتحكم</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-red-500 pr-4 bg-red-50 dark:bg-red-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                  حماية بكلمة مرور
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  أضف كلمة مرور على الرابط لحماية إضافية
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>كيف يعمل:</strong> أي شخص يحاول فتح الرابط سيُطلب
                    منه إدخال كلمة المرور أولاً. بدون كلمة المرور الصحيحة، لن
                    يتمكن من رؤية أو تحميل الملف.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-amber-500 pr-4 bg-amber-50 dark:bg-amber-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">
                  تاريخ انتهاء الصلاحية
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  حدد متى يتوقف الرابط عن العمل تلقائياً
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>مثال:</strong> إذا حددت تاريخ انتهاء بعد 7 أيام،
                    الرابط سيعمل فقط لمدة 7 أيام. بعدها، سيظهر للمستخدمين رسالة
                    "الرابط منتهي الصلاحية".
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                  حد التحميلات
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  حدد العدد الأقصى لمرات تحميل الملف
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>مثال:</strong> إذا حددت 10 تحميلات، بعد أن يحمل 10
                    أشخاص الملف، سيتوقف الرابط عن العمل تلقائياً. مفيد لتوزيع
                    محدود.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إحصائيات المشاركة</h3>
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Eye className="w-6 h-6 text-primary shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-3">تتبع نشاط الرابط</h4>
              <p className="text-sm text-muted-foreground mb-3">
                لكل رابط مشاركة، يمكنك رؤية الإحصائيات التالية:
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold text-sm mb-1">👁️ عدد المشاهدات</p>
                  <p className="text-xs text-muted-foreground">
                    كم شخص فتح الرابط (حتى لو لم يحمّل الملف)
                  </p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold text-sm mb-1">📥 عدد التحميلات</p>
                  <p className="text-xs text-muted-foreground">
                    كم مرة تم تحميل الملف من خلال هذا الرابط
                  </p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold text-sm mb-1">📅 تاريخ الإنشاء</p>
                  <p className="text-xs text-muted-foreground">
                    متى تم إنشاء رابط المشاركة
                  </p>
                </div>
                <div className="bg-background p-3 rounded border">
                  <p className="font-semibold text-sm mb-1">
                    ⏰ تاريخ الانتهاء
                  </p>
                  <p className="text-xs text-muted-foreground">
                    متى سينتهي الرابط (إن وُجد)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إدارة الروابط المشتركة</h3>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <Share2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                  صفحة "المشاركات"
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  اذهب إلى قسم "المشاركات" من القائمة الجانبية لرؤية جميع
                  الروابط النشطة
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2">
                    <strong>ماذا يمكنك فعله:</strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• رؤية قائمة جميع الملفات المشاركة</li>
                    <li>• نسخ الرابط مرة أخرى</li>
                    <li>• رؤية الإحصائيات (المشاهدات والتحميلات)</li>
                    <li>• تعطيل أو حذف الرابط</li>
                    <li>• تعديل إعدادات الرابط</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-red-500/30 rounded-lg p-4 bg-red-50 dark:bg-red-950">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                  تعطيل أو حذف رابط
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  إذا لم تعد تريد أن يعمل الرابط، يمكنك تعطيله أو حذفه نهائياً
                </p>
                <div className="bg-background p-3 rounded border space-y-2">
                  <p className="text-sm">
                    <strong>تعطيل:</strong> الرابط يتوقف عن العمل لكن يبقى في
                    قائمتك (يمكن إعادة تفعيله)
                  </p>
                  <p className="text-sm">
                    <strong>حذف:</strong> الرابط يُحذف نهائياً ولا يمكن استرجاعه
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح للمشاركة الآمنة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">🔒</span>
              <p className="text-sm">
                <strong>استخدم كلمة مرور:</strong> للملفات الحساسة، دائماً ضع
                كلمة مرور على الرابط
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">⏰</span>
              <p className="text-sm">
                <strong>حدد تاريخ انتهاء:</strong> لا تترك الروابط مفتوحة للأبد
                - ضع تاريخ انتهاء معقول
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📊</span>
              <p className="text-sm">
                <strong>راقب الإحصائيات:</strong> تابع عدد المشاهدات والتحميلات
                - إذا رأيت نشاط غريب، عطّل الرابط
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🗑️</span>
              <p className="text-sm">
                <strong>نظف الروابط القديمة:</strong> احذف الروابط التي لم تعد
                تحتاجها لتقليل مخاطر الوصول غير المصرح
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔢</span>
              <p className="text-sm">
                <strong>حد التحميلات:</strong> للتوزيع المحدود، حدد عدد تحميلات
                معين (مثل 5 أو 10)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📧</span>
              <p className="text-sm">
                <strong>شارك بحذر:</strong> لا ترسل روابط الملفات الحساسة في
                رسائل غير مشفرة أو على وسائل التواصل العامة
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
              كم عدد الروابط التي يمكنني إنشاؤها؟
            </h4>
            <p className="text-sm text-muted-foreground">
              لا يوجد حد لعدد روابط المشاركة. يمكنك إنشاء رابط لكل ملف تملكه.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني تغيير إعدادات الرابط بعد إنشائه؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، يمكنك تعديل تاريخ الانتهاء، كلمة المرور، وحد التحميلات في أي
              وقت من صفحة "المشاركات".
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              ماذا يحدث إذا حذفت الملف الأصلي؟
            </h4>
            <p className="text-sm text-muted-foreground">
              عند حذف الملف الأصلي (نقله لسلة المهملات)، جميع روابط المشاركة
              الخاصة به تتوقف عن العمل تلقائياً.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني معرفة من حمّل الملف؟
            </h4>
            <p className="text-sm text-muted-foreground">
              حالياً، يمكنك فقط رؤية عدد التحميلات الإجمالي، لا يمكن معرفة هوية
              من حمّل الملف (لحماية الخصوصية).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

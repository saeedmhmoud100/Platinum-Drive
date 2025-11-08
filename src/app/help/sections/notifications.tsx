import { Separator } from '@/components/ui/separator'
import { Bell, CheckCheck, Trash2, Filter, Eye, EyeOff, Upload, HardDrive, Share2, AlertCircle } from 'lucide-react'

export function NotificationsSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">الإشعارات</h3>
        <p className="text-muted-foreground leading-relaxed">
          ابق على اطلاع بكل ما يحدث في حسابك من خلال نظام الإشعارات - رفع ملفات مشاركات تنبيهات المساحة وأكثر.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الوصول إلى الإشعارات</h3>
        <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <div className="flex items-start gap-3">
            <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">كيف تصل</h4>
              <div className="bg-background/80 p-3 rounded border space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">1.</span>
                  <span className="text-sm">اضغط على أيقونة الجرس  في الشريط العلوي</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">2.</span>
                  <span className="text-sm">ستظهر قائمة منسدلة بآخر الإشعارات</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 text-sm">3.</span>
                  <span className="text-sm">اضغط "عرض الكل" لرؤية جميع الإشعارات</span>
                </div>
              </div>
              <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-xs">
                   سترى رقما أحمر على أيقونة الجرس يشير لعدد الإشعارات غير المقروءة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">أنواع الإشعارات</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Upload className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">رفع الملفات</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  إشعار عند اكتمال رفع ملفاتك بنجاح
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>مثال:</strong> "تم رفع 3 ملفات بنجاح إلى مجلد المستندات"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-red-500 pr-4 bg-red-50 dark:bg-red-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">حد المساحة</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  تنبيه عند اقتراب نفاد مساحة التخزين
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>مثال:</strong> " استخدمت 90% من مساحة التخزين - 1 GB متبقي فقط"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-blue-500 pr-4 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">روابط المشاركة</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  إشعار عند دخول شخص لرابط مشاركة أنشأته
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>مثال:</strong> "تم فتح رابط المشاركة لملف التقرير.pdf - 3 مشاهدات حتى الآن"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-purple-500 pr-4 bg-purple-50 dark:bg-purple-950 p-3 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">نشاط الملفات</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  تحديثات على الملفات والمجلدات
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>أمثلة:</strong> تعديل ملف حذف ملف نقل ملف وغيرها
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إدارة الإشعارات</h3>
        <div className="space-y-3">
          <div className="border-2 border-green-500/30 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-start gap-3">
              <CheckCheck className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">تعليم كمقروء</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  إزالة الإشعار من قائمة غير المقروءة
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm"><strong>إشعار واحد:</strong> اضغط على الإشعار لتعليمه كمقروء تلقائيا</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm"><strong>جميع الإشعارات:</strong> اضغط زر "تعليم الكل كمقروء" في أعلى القائمة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-red-500/30 rounded-lg p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <div className="flex items-start gap-3">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">حذف الإشعارات</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  إزالة الإشعارات نهائيا من القائمة
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2"><strong>كيفية الحذف:</strong></p>
                  <p className="text-sm">
                    اضغط زر "مسح الكل" لحذف جميع الإشعارات (المقروءة وغير المقروءة)
                  </p>
                </div>
                <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                     <strong>تنبيه:</strong> الحذف نهائي - لا يمكن استرجاع الإشعارات المحذوفة
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-indigo-500/30 rounded-lg p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
            <div className="flex items-start gap-3">
              <Filter className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">تصفية الإشعارات</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  عرض إشعارات محددة فقط
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm mb-2"><strong>خيارات التصفية:</strong></p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded"> الكل</div>
                    <div className="bg-muted p-2 rounded"> غير المقروءة فقط</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">التحكم في الإشعارات</h3>
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3 mb-3">
            <Bell className="w-6 h-6 text-primary shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">تفعيل أو إيقاف أنواع الإشعارات</h4>
              <p className="text-sm text-muted-foreground mb-3">
                يمكنك التحكم في أنواع الإشعارات التي تريد استقبالها من صفحة <strong>الإعدادات</strong>
              </p>
            </div>
          </div>
          <div className="bg-background/80 p-3 rounded border space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary text-sm">1.</span>
              <span className="text-sm">اذهب إلى الإعدادات  قسم "إعدادات الإشعارات"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary text-sm">2.</span>
              <span className="text-sm">فعل أو أوقف كل نوع من الإشعارات حسب رغبتك</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-primary text-sm">3.</span>
              <span className="text-sm">احفظ التغييرات</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح مفيدة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>راجع الإشعارات بانتظام:</strong> لا تفوت أي تحديث مهم على ملفاتك أو مساحة التخزين
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>علم المقروء:</strong> حافظ على قائمة الإشعارات منظمة بتعليم المقروء أو حذف القديم
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>خصص الإشعارات:</strong> أوقف الأنواع التي لا تحتاجها لتقليل الإزعاج
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg"></span>
              <p className="text-sm">
                <strong>انتبه للتنبيهات الهامة:</strong> خصوصا إشعارات حد المساحة والأمان
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
            <h4 className="font-semibold mb-2">كم مدة بقاء الإشعارات</h4>
            <p className="text-sm text-muted-foreground">
              الإشعارات تبقى إلى أن تحذفها يدويا. لا يوجد حذف تلقائي للإشعارات القديمة حاليا.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكنني استرجاع إشعار بعد حذفه</h4>
            <p className="text-sm text-muted-foreground">
              لا الحذف نهائي. لذلك تأكد قبل الضغط على "مسح الكل".
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">لماذا لا أستقبل إشعارات</h4>
            <p className="text-sm text-muted-foreground">
              تحقق من إعدادات الإشعارات - ربما قمت بإيقاف نوع معين من الإشعارات. اذهب للإعدادات وتأكد من تفعيل الأنواع التي تريدها.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">ما الفرق بين "تعليم كمقروء" و"حذف"</h4>
            <p className="text-sm text-muted-foreground">
              "تعليم كمقروء" يبقي الإشعار في القائمة لكن يزيل العلامة الحمراء. "حذف" يزيل الإشعار نهائيا من القائمة.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

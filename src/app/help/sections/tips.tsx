import { Separator } from '@/components/ui/separator'
import { Lightbulb, Star, Zap, Target, TrendingUp, Shield, FolderTree, Search, Share2, Clock, HardDrive, FileText } from 'lucide-react'

export function TipsSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">نصائح وحيل لاستخدام أفضل</h3>
        <p className="text-muted-foreground leading-relaxed">
          اكتشف طرقا ذكية للاستفادة القصوى من Platinum Drive وتنظيم ملفاتك بكفاءة.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">تنظيم الملفات</h3>
        <div className="space-y-3">
          <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <div className="flex items-start gap-3">
              <FolderTree className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">استخدم هيكل مجلدات منطقي</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  أنشئ مجلدات رئيسية حسب نوع المحتوى أو المشروع ثم مجلدات فرعية للتفاصيل
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm font-semibold mb-2">مثال:</p>
                  <div className="text-xs space-y-1 font-mono">
                    <div> العمل</div>
                    <div className="mr-4"> المشاريع</div>
                    <div className="mr-8"> مشروع 2024</div>
                    <div className="mr-4"> التقارير</div>
                    <div> شخصي</div>
                    <div className="mr-4"> الصور</div>
                    <div className="mr-4"> المستندات</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-amber-500/30 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">استخدم أسماء ملفات واضحة</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  أسماء الملفات الجيدة تسهل البحث والفهم السريع
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded border border-red-200">
                      <p className="font-semibold text-red-700 dark:text-red-400 mb-1"> سيء</p>
                      <p className="text-xs">doc1.pdf</p>
                      <p className="text-xs">صورة.jpg</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded border border-green-200">
                      <p className="font-semibold text-green-700 dark:text-green-400 mb-1"> جيد</p>
                      <p className="text-xs">تقرير_ديسمبر_2024.pdf</p>
                      <p className="text-xs">شعار_الشركة_نهائي.jpg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إدارة المساحة</h3>
        <div className="space-y-3">
          <div className="border-2 border-green-500/30 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-start gap-3">
              <HardDrive className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">راقب استهلاك المساحة بانتظام</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  تحقق من مساحة التخزين المستخدمة من صفحة الملف الشخصي
                </p>
                <div className="bg-background p-3 rounded border">
                  <div className="space-y-2 text-sm">
                    <p> فعل إشعارات حد المساحة من الإعدادات</p>
                    <p> احذف الملفات الكبيرة غير الضرورية</p>
                    <p> استخدم ضغط الصور من إعدادات الرفع</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-red-500/30 rounded-lg p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">نظف سلة المهملات</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  الملفات المحذوفة تظل تشغل مساحة حتى تحذف نهائيا من السلة
                </p>
                <div className="bg-background p-3 rounded border">
                  <p className="text-sm">
                     الملفات تحذف تلقائيا بعد 30 يوم لكن يمكنك حذفها يدويا قبل ذلك لتوفير المساحة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">البحث الفعال</h3>
        <div className="border-2 border-indigo-500/30 rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
          <div className="flex items-start gap-3">
            <Search className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">استخدم ميزات البحث المتقدمة</h4>
              <p className="text-sm text-muted-foreground mb-3">
                البحث يدعم أسماء الملفات والمجلدات بالعربية والإنجليزية
              </p>
              <div className="bg-background/80 p-3 rounded border space-y-2">
                <div className="space-y-2">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded">
                    <p className="text-sm"><strong> نصيحة:</strong> ابحث عن نوع الملف (PDF, JPG, إلخ)</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded">
                    <p className="text-sm"><strong> نصيحة:</strong> استخدم فلاتر البحث لتضييق النتائج</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded">
                    <p className="text-sm"><strong> نصيحة:</strong> البحث يعمل بشكل فوري أثناء الكتابة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">المشاركة الآمنة</h3>
        <div className="space-y-3">
          <div className="border-2 border-purple-500/30 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="flex items-start gap-3">
              <Share2 className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">شارك بحكمة</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  روابط المشاركة قوية - استخدمها بحذر
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-sm">استخدم صلاحية "عرض فقط" للملفات الحساسة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-sm">راجع روابط المشاركة القديمة واحذف غير المستخدمة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-sm">تحقق من عدد المشاهدات للروابط المشتركة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">المفضلة والوصول السريع</h3>
        <div className="border-2 border-yellow-500/30 rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950">
          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-300">استخدم المفضلة للملفات المهمة</h4>
              <p className="text-sm text-muted-foreground mb-3">
                أضف الملفات والمجلدات التي تستخدمها كثيرا للمفضلة
              </p>
              <div className="bg-background p-3 rounded border">
                <div className="space-y-2 text-sm">
                  <p> اضغط على النجمة لإضافة ملف للمفضلة</p>
                  <p> الوصول للمفضلة من القائمة الجانبية</p>
                  <p> إزالة من المفضلة بنقرة واحدة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح الأمان</h3>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 p-5 rounded-lg border border-red-200 dark:border-red-800">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>غير كلمة المرور بانتظام:</strong> مرة كل 3-6 أشهر على الأقل
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>راجع سجل تسجيل الدخول:</strong> للتأكد من عدم وجود دخول مريب
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>فعل تنبيهات تسجيل الدخول:</strong> لتلقي إشعارات عند دخول جديد
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>لا تشارك بيانات دخولك:</strong> مع أي شخص أو موقع آخر
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح سريعة</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="bg-primary/5 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">الرفع السريع</h4>
                <p className="text-sm text-muted-foreground">
                  اسحب الملفات وأفلتها مباشرة في صفحة الملفات
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">اختصارات لوحة المفاتيح</h4>
                <p className="text-sm text-muted-foreground">
                  استخدم Tab للتنقل Enter للفتح Delete للحذف
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">تحسين الأداء</h4>
                <p className="text-sm text-muted-foreground">
                  فعل ضغط الصور من الإعدادات لتسريع الرفع
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">النسخ الاحتياطي</h4>
                <p className="text-sm text-muted-foreground">
                  حمل نسخ من الملفات المهمة على جهازك أيضا
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">أفضل الممارسات</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <h4 className="font-semibold mb-2">للأفراد</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li> نظم ملفاتك حسب المشاريع أو التواريخ</li>
              <li> استخدم المفضلة للملفات التي تعمل عليها حاليا</li>
              <li> احذف الملفات المكررة بانتظام</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <h4 className="font-semibold mb-2">للفرق</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li> اتفق على نظام تسمية موحد للملفات</li>
              <li> استخدم المجلدات المشتركة للمشاريع الجماعية</li>
              <li> راجع صلاحيات المشاركة بانتظام</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 dark:bg-purple-950 p-3 rounded">
            <h4 className="font-semibold mb-2">للشركات</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li> استخدم هيكل مجلدات منظم حسب الأقسام</li>
              <li> راقب استهلاك المساحة لكل قسم</li>
              <li> فعل جميع ميزات الأمان المتاحة</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

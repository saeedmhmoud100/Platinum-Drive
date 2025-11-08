import { Separator } from '@/components/ui/separator'
import { Shield, Users, Settings, BarChart3, HardDrive, FileType, Eye, UserX, UserCheck, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function AdminSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">لوحة تحكم المسؤول</h3>
        <p className="text-muted-foreground leading-relaxed">
          إدارة النظام والمستخدمين والإعدادات - متاحة فقط للمستخدمين بصلاحية Admin.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الوصول للوحة التحكم</h3>
        <div className="border-2 border-purple-500/30 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">متطلبات الوصول</h4>
              <p className="text-sm text-muted-foreground mb-3">
                لوحة التحكم متاحة فقط للمستخدمين الذين لديهم دور "admin" في النظام
              </p>
              <div className="bg-background/80 p-3 rounded border">
                <p className="text-sm mb-2"><strong>كيفية التحقق من الصلاحيات:</strong></p>
                <p className="text-sm text-muted-foreground">
                  يتم التحقق تلقائيا من دور المستخدم عند محاولة الوصول لأي صفحة إدارية. إذا لم تكن مسؤولا ستظهر رسالة "صلاحيات غير كافية".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">الميزات الإدارية المتاحة</h3>
        <div className="space-y-3">
          <div className="border-2 border-blue-500/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">لوحة الإحصائيات</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  عرض إحصائيات شاملة عن النظام والمستخدمين
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <p className="text-sm font-semibold mb-2">البيانات المتاحة:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>إجمالي عدد المستخدمين والمستخدمين النشطين</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>إجمالي عدد الملفات ومساحة التخزين المستخدمة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>المستخدمون الجدد وآخر عمليات تسجيل الدخول</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>أكثر المستخدمين استخداما للمساحة</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                  <p className="text-xs">
                     <strong>API:</strong> GET /api/admin/dashboard/stats
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-green-500/30 rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">إدارة المستخدمين</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  عرض وتعديل حسابات المستخدمين وصلاحياتهم
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">الإمكانيات المتاحة:</p>
                    <div className="grid gap-2">
                      <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded border">
                        <p className="text-sm"><strong> عرض قائمة المستخدمين:</strong> مع البحث والتصفية حسب الحالة والدور</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded border">
                        <p className="text-sm"><strong> تعديل بيانات المستخدم:</strong> الاسم البريد الدور الحالة</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded border">
                        <p className="text-sm"><strong> تعليق/تفعيل الحسابات:</strong> تغيير حالة accountStatus</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded border">
                        <p className="text-sm"><strong> إدارة حصة التخزين:</strong> تعديل مساحة التخزين المتاحة للمستخدم</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                  <p className="text-xs">
                     <strong>APIs:</strong> GET/POST /api/admin/users, PATCH /api/admin/users/[id], PATCH /api/admin/users/[id]/status, PATCH /api/admin/users/[id]/quota
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-amber-500/30 rounded-lg p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
            <div className="flex items-start gap-3">
              <FileType className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">إدارة أنواع الملفات</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  التحكم في أنواع الملفات المسموح برفعها
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2"><strong>الإمكانيات:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>عرض قائمة أنواع الملفات المسموح بها</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>إضافة أو حذف أنواع ملفات جديدة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>تعديل إعدادات الأنواع الحالية</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
                  <p className="text-xs">
                     <strong>APIs:</strong> GET/POST /api/admin/file-types, PATCH/DELETE /api/admin/file-types/[id]
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-indigo-500/30 rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
            <div className="flex items-start gap-3">
              <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">إعدادات النظام</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  إدارة إعدادات النظام العامة
                </p>
                <div className="bg-background/80 p-3 rounded border">
                  <p className="text-sm mb-2"><strong>الوظائف المتاحة:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>عرض جميع إعدادات النظام</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>تعديل قيمة إعداد معين</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary"></span>
                      <span>إضافة إعدادات جديدة للنظام</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-2 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded border border-indigo-200 dark:border-indigo-800">
                  <p className="text-xs">
                     <strong>APIs:</strong> GET/POST /api/admin/settings, PATCH /api/admin/settings/[key]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">إدارة حالة المستخدمين</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="border-2 border-green-500/30 rounded-lg p-4 bg-green-50 dark:bg-green-950">
            <div className="flex items-start gap-3">
              <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">تفعيل الحساب</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  إعادة تفعيل حساب معلق أو موقوف
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الحالة:</strong> accountStatus = "active"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-red-500/30 rounded-lg p-4 bg-red-50 dark:bg-red-950">
            <div className="flex items-start gap-3">
              <UserX className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">تعليق الحساب</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  إيقاف حساب مؤقتا مع إمكانية تسجيل السبب
                </p>
                <div className="bg-background p-2 rounded border">
                  <p className="text-xs">
                    <strong>الحالات:</strong> "suspended", "disabled"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح للمسؤولين</h3>
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 p-5 rounded-lg border">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>تحقق من الصلاحيات بانتظام:</strong> راجع قائمة المستخدمين ذوي صلاحية admin بشكل دوري
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>راقب مساحة التخزين:</strong> تابع المستخدمين الذين يستهلكون مساحة كبيرة
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>وثق التغييرات:</strong> عند تعليق حساب سجل السبب في حقل suspendedReason
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>استخدم البحث والفلترة:</strong> لتسهيل العثور على مستخدمين محددين في القوائم الكبيرة
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
            <h4 className="font-semibold mb-2">كيف أحصل على صلاحيات المسؤول</h4>
            <p className="text-sm text-muted-foreground">
              يجب أن يمنحك مسؤول آخر دور "admin" من خلال إدارة المستخدمين. لا يمكن للمستخدمين منح أنفسهم صلاحيات المسؤول.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">ماذا يحدث عند تعليق حساب مستخدم</h4>
            <p className="text-sm text-muted-foreground">
              يتم تسجيل خروج المستخدم فورا ولن يتمكن من الدخول حتى يعيد مسؤول تفعيل الحساب. ملفاته تبقى سليمة.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">هل يمكنني حذف مستخدم نهائيا</h4>
            <p className="text-sm text-muted-foreground">
              حاليا الواجهة تدعم التعليق فقط. الحذف النهائي قد يتطلب إجراءات يدوية من قاعدة البيانات.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">كم عدد المسؤولين المسموح به</h4>
            <p className="text-sm text-muted-foreground">
              لا يوجد حد محدد - يمكن أن يكون هناك عدة مستخدمين بدور admin لكن ينصح بالحد الأدنى لأسباب أمنية.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

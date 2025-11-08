import { Separator } from "@/components/ui/separator";
import {
  Upload,
  FileUp,
  FolderUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Image,
  FileText,
  Video,
  Music,
  Archive,
  FileCode,
} from "lucide-react";

export function UploadSection() {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <section>
        <h3 className="text-xl font-bold mb-3">رفع الملفات</h3>
        <p className="text-muted-foreground leading-relaxed">
          تعرف على كيفية رفع ملفاتك إلى بلاتينيوم درايف بطرق مختلفة، مع معرفة
          حدود الحجم والأنواع المدعومة.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">طرق رفع الملفات</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-2 border-primary/30 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <div className="flex items-start gap-3">
              <Upload className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">زر الرفع</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  الطريقة التقليدية والأكثر شيوعاً
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">1.</span>
                    <span className="text-sm">
                      اضغط على زر "رفع" في الشريط العلوي
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">2.</span>
                    <span className="text-sm">
                      اختر "رفع ملفات" أو "رفع مجلد"
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">3.</span>
                    <span className="text-sm">حدد الملفات من جهازك</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">4.</span>
                    <span className="text-sm">سيبدأ الرفع تلقائياً</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-primary/30 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="flex items-start gap-3">
              <FileUp className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">
                  السحب والإفلات (Drag & Drop)
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  الطريقة الأسرع والأسهل
                </p>
                <div className="bg-background/80 p-3 rounded border space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">1.</span>
                    <span className="text-sm">افتح مجلد الملفات على جهازك</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">2.</span>
                    <span className="text-sm">حدد الملفات أو المجلدات</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">3.</span>
                    <span className="text-sm">
                      اسحبها إلى نافذة المتصفح وأفلتها
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary text-sm">4.</span>
                    <span className="text-sm">سيبدأ الرفع فوراً</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-muted p-3 rounded">
          <p className="text-sm">
            💡 <strong>نصيحة:</strong> السحب والإفلات يعمل مع الملفات والمجلدات
            الكاملة، ويحافظ على التنظيم الأصلي
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">رفع مجلد كامل</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            <FolderUp className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                كيفية رفع مجلد بكل محتوياته
              </h4>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  يمكنك رفع مجلد كامل مع الحفاظ على هيكلية الملفات والمجلدات
                  الفرعية:
                </p>
                <div className="bg-background p-3 rounded border space-y-2">
                  <p className="text-sm">
                    <strong>الطريقة 1:</strong> اضغط زر "رفع" ← اختر "رفع مجلد"
                    ← حدد المجلد
                  </p>
                  <p className="text-sm">
                    <strong>الطريقة 2:</strong> اسحب المجلد مباشرة إلى نافذة
                    المتصفح
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded border border-green-300 dark:border-green-700">
                  <p className="text-xs">
                    ✅ <strong>ميزة مهمة:</strong> جميع المجلدات الفرعية
                    والملفات ستُرفع بنفس التنظيم الأصلي
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
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border rounded-lg p-3 bg-blue-50 dark:bg-blue-950">
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-sm">الصور</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, GIF, BMP, WebP, SVG
            </p>
          </div>

          <div className="border rounded-lg p-3 bg-purple-50 dark:bg-purple-950">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-sm">المستندات</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT
            </p>
          </div>

          <div className="border rounded-lg p-3 bg-red-50 dark:bg-red-950">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-sm">الفيديو</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              MP4, AVI, MKV, MOV, WMV, FLV
            </p>
          </div>

          <div className="border rounded-lg p-3 bg-green-50 dark:bg-green-950">
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-sm">الصوت</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              MP3, WAV, AAC, FLAC, OGG
            </p>
          </div>

          <div className="border rounded-lg p-3 bg-amber-50 dark:bg-amber-950">
            <div className="flex items-center gap-2 mb-2">
              <Archive className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-sm">الملفات المضغوطة</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              ZIP, RAR, 7Z, TAR, GZ
            </p>
          </div>

          <div className="border rounded-lg p-3 bg-indigo-50 dark:bg-indigo-950">
            <div className="flex items-center gap-2 mb-2">
              <FileCode className="w-5 h-5 text-indigo-600" />
              <h4 className="font-semibold text-sm">البرمجة</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              JS, TS, PY, JAVA, CPP, HTML, CSS
            </p>
          </div>
        </div>
        <div className="mt-3 border-r-4 border-primary pr-4 bg-primary/5 p-3 rounded">
          <p className="text-sm">
            <strong>ملاحظة:</strong> يمكنك رفع أي نوع ملف تقريباً. الأنواع
            المذكورة أعلاه هي الأكثر شيوعاً ولديها معاينة مدمجة في المنصة.
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">حدود الحجم والسرعة</h3>
        <div className="space-y-3">
          <div className="border-2 border-amber-500 bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-amber-700 dark:text-amber-300">
                  حدود الرفع
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>
                      <strong>حجم الملف الواحد:</strong> حتى 5 جيجابايت
                      (المستخدمون المجانيون) / 20 جيجابايت (Premium)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>
                      <strong>عدد الملفات في مرة واحدة:</strong> حتى 100 ملف
                      (المجاني) / غير محدود (Premium)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>
                      <strong>السرعة:</strong> تعتمد على سرعة الإنترنت لديك وحجم
                      الملف
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border">
            <h4 className="font-semibold mb-3">نصائح لرفع أسرع:</h4>
            <div className="space-y-2 text-sm">
              <p>
                🚀 <strong>اضغط الملفات الكبيرة:</strong> قبل رفع ملفات كثيرة،
                اضغطها في ملف ZIP واحد
              </p>
              <p>
                📶 <strong>اتصال قوي:</strong> استخدم Wi-Fi بدلاً من بيانات
                الجوال للملفات الكبيرة
              </p>
              <p>
                ⏰ <strong>رفع تدريجي:</strong> للملفات الكبيرة جداً، ارفعها على
                دفعات بدلاً من مرة واحدة
              </p>
              <p>
                🔄 <strong>الاستكمال التلقائي:</strong> إذا انقطع الاتصال،
                سيستكمل الرفع تلقائياً عند عودة الاتصال
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">متابعة تقدم الرفع</h3>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            عند رفع الملفات، ستظهر لك نافذة تقدم الرفع مع المعلومات التالية:
          </p>
          <div className="grid gap-3">
            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-sm">شريط التقدم</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                يظهر نسبة إتمام رفع كل ملف (0% - 100%)
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-sm">السرعة الحالية</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                تعرض سرعة الرفع بالميجابايت في الثانية (MB/s)
              </p>
            </div>

            <div className="bg-background p-3 rounded border">
              <div className="flex items-center gap-2 mb-2">
                <FileUp className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-sm">الوقت المتبقي</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                تقدير للوقت المتبقي حتى اكتمال الرفع
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">حالات الرفع والرسائل</h3>
        <div className="space-y-3">
          <div className="border-r-4 border-green-500 pr-4 bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-green-700 dark:text-green-300">
                  تم الرفع بنجاح
                </h4>
                <p className="text-xs text-muted-foreground">
                  سيظهر إشعار أخضر يؤكد رفع الملف، ويمكنك رؤيته مباشرة في
                  القائمة
                </p>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-amber-500 pr-4 bg-amber-50 dark:bg-amber-950 p-3 rounded">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-amber-700 dark:text-amber-300">
                  جاري الرفع...
                </h4>
                <p className="text-xs text-muted-foreground">
                  الملف قيد الرفع. لا تغلق الصفحة حتى يكتمل الرفع
                </p>
              </div>
            </div>
          </div>

          <div className="border-r-4 border-red-500 pr-4 bg-red-50 dark:bg-red-950 p-3 rounded">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-red-700 dark:text-red-300">
                  فشل الرفع
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  قد يحدث خطأ في الرفع للأسباب التالية:
                </p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• انقطاع الاتصال بالإنترنت</li>
                  <li>• حجم الملف أكبر من الحد المسموح</li>
                  <li>• المساحة التخزينية ممتلئة</li>
                  <li>• اسم ملف غير صالح (يحتوي على رموز خاصة)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">المشاكل الشائعة وحلولها</h3>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">❌ الرفع بطيء جداً</h4>
            <p className="text-sm text-muted-foreground mb-2">الحلول:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• تحقق من سرعة الإنترنت (استخدم موقع speedtest.net)</li>
              <li>• أغلق التطبيقات الأخرى التي تستهلك الإنترنت</li>
              <li>• جرب الرفع في وقت آخر (ساعات الذروة قد تكون أبطأ)</li>
              <li>• اضغط الملفات في ZIP قبل الرفع</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">❌ "حجم الملف كبير جداً"</h4>
            <p className="text-sm text-muted-foreground mb-2">الحلول:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• قسّم الملف إلى أجزاء أصغر</li>
              <li>• اضغط الملف باستخدام برامج الضغط</li>
              <li>• قلّل جودة الفيديو/الصور إذا كانت للاستخدام الشخصي</li>
              <li>• ترقّي إلى حساب Premium لحد رفع أعلى (20GB)</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">❌ "مساحة تخزين غير كافية"</h4>
            <p className="text-sm text-muted-foreground mb-2">الحلول:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• احذف الملفات القديمة أو غير المهمة</li>
              <li>
                • أفرغ سلة المهملات (الملفات المحذوفة تستهلك مساحة لمدة 30 يوم)
              </li>
              <li>• ترقّي إلى حساب Premium لمساحة تخزين أكبر</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">❌ الرفع يتوقف في المنتصف</h4>
            <p className="text-sm text-muted-foreground mb-2">الحلول:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• لا تغلق الصفحة أو المتصفح حتى اكتمال الرفع</li>
              <li>• إذا انقطع الاتصال، سيستكمل تلقائياً عند العودة</li>
              <li>• جرب استخدام متصفح آخر (Chrome, Firefox, Edge)</li>
              <li>• تأكد من عدم وجود برامج حظر إعلانات تعطّل الرفع</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-bold mb-3">نصائح مهمة</h3>
        <div className="bg-primary/5 p-5 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚡</span>
              <p className="text-sm">
                <strong>لا تغلق الصفحة:</strong> حافظ على نافذة المتصفح مفتوحة
                حتى اكتمال الرفع، خاصة للملفات الكبيرة
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔐</span>
              <p className="text-sm">
                <strong>الخصوصية:</strong> جميع الملفات يتم تشفيرها أثناء الرفع
                لحماية خصوصيتك
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📱</span>
              <p className="text-sm">
                <strong>من الهاتف:</strong> يمكنك رفع الصور ومقاطع الفيديو
                مباشرة من معرض الصور
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🔄</span>
              <p className="text-sm">
                <strong>الاستكمال التلقائي:</strong> إذا انقطع الاتصال، ستستكمل
                عملية الرفع تلقائياً عند عودة الإنترنت
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📊</span>
              <p className="text-sm">
                <strong>مراقبة المساحة:</strong> راقب شريط المساحة التخزينية في
                لوحة التحكم لتعرف المساحة المتبقية
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
              هل يمكنني رفع ملفات أثناء تصفح المنصة؟
            </h4>
            <p className="text-sm text-muted-foreground">
              نعم، يمكنك الاستمرار في التصفح واستخدام المنصة أثناء رفع الملفات.
              ستعمل عملية الرفع في الخلفية.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              ماذا يحدث إذا رفعت ملف بنفس الاسم مرتين؟
            </h4>
            <p className="text-sm text-muted-foreground">
              سيتم إضافة رقم للاسم الجديد تلقائياً (مثل: ملف.pdf، ملف (1).pdf،
              ملف (2).pdf) لتجنب الاستبدال.
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل هناك حد لعدد الملفات التي يمكنني رفعها يومياً؟
            </h4>
            <p className="text-sm text-muted-foreground">
              لا يوجد حد يومي. الحد الوحيد هو إجمالي مساحة التخزين المتاحة في
              حسابك (5GB مجاناً).
            </p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold mb-2">
              هل يمكنني رفع ملفات من Google Drive أو Dropbox مباشرة؟
            </h4>
            <p className="text-sm text-muted-foreground">
              حالياً، يجب تحميل الملفات إلى جهازك أولاً ثم رفعها. ميزة الربط
              المباشر قادمة قريباً!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

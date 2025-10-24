"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Loader2,
  Save,
  RotateCcw,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { toast } from "sonner"

interface SystemSettings {
  // Security Settings - Login Attempts
  'security.maxLoginAttempts': number
  'security.accountLockoutDuration': number // minutes
  
  // Security Settings - Password Policy
  'security.enforceStrongPasswords': boolean
  'security.passwordExpiryDays': number // 0 = never expire
  'security.passwordHistoryCount': number // prevent reusing last X passwords
  
  // Security Settings - Authentication
  'security.requireEmailVerification': boolean
  'security.allowPasswordReset': boolean
  'security.enable2FA': boolean
  
  // Security Settings - Alerts
  'security.suspiciousLoginAlerts': boolean
  
  // Upload Settings  
  'upload.maxFileSize': number
  'upload.allowedFileTypes': string[]
  'upload.virusScanEnabled': boolean
  'upload.autoGenerateThumbnails': boolean
  
  // Email Settings
  'email.smtpHost': string
  'email.smtpPort': number
  'email.smtpUser': string
  'email.smtpPassword': string
  'email.smtpSecure': boolean
  'email.fromAddress': string
  'email.fromName': string
  
  // Storage Settings
  'storage.defaultQuotaGB': number
  'storage.maxQuotaGB': number
  'storage.autoCleanupDays': number
  
  // General Settings
  'general.siteName': string
  'general.siteDescription': string
  'general.maintenanceMode': boolean
  'general.registrationEnabled': boolean
  'general.defaultLanguage': string
  'general.defaultTimezone': string
  'general.defaultCalendarType': string
  'general.dateFormat': string
  'general.timeFormat': string
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<Partial<SystemSettings>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Load settings
  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/settings')
      if (!response.ok) throw new Error('فشل تحميل الإعدادات')
      
      const data = await response.json()
      setSettings(data.settings || {})
    } catch (error) {
      toast.error('فشل تحميل إعدادات النظام')
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  // Save settings
  const saveSettings = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      })

      if (!response.ok) throw new Error('فشل حفظ الإعدادات')
      
      toast.success('تم حفظ الإعدادات بنجاح')
    } catch (error) {
      toast.error('فشل حفظ الإعدادات')
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  // Update setting
  const updateSetting = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Byte'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  useEffect(() => {
    loadSettings()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="mr-2">جاري تحميل الإعدادات...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-xl font-semibold">إعدادات النظام</h2>
          <p className="text-sm text-muted-foreground">
            إدارة الإعدادات العامة للنظام والحماية
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={saveSettings} disabled={saving} className="gap-2">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                حفظ التغييرات
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={loadSettings} disabled={loading} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            إعادة تحميل
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
        <TabsList className="grid w-full grid-cols-4" dir="rtl">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="storage">التخزين</TabsTrigger>
          <TabsTrigger value="email">البريد</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Settings className="h-5 w-5" />
                الإعدادات العامة
              </CardTitle>
              <CardDescription className="text-right">
                إعدادات الموقع الأساسية على مستوى النظام
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Site Name */}
              <div className="text-right">
                <Label htmlFor="siteName" className="text-right pb-2">اسم الموقع</Label>
                <Input
                  id="siteName"
                  value={settings['general.siteName'] || ''}
                  onChange={(e) => updateSetting('general.siteName', e.target.value)}
                  placeholder="Platinum Drive"
                  className="text-right"
                />
              </div>

              {/* Site Description */}
              <div className="text-right">
                <Label htmlFor="siteDescription" className="text-right pb-2">وصف الموقع</Label>
                <Textarea
                  id="siteDescription"
                  value={settings['general.siteDescription'] || ''}
                  onChange={(e) => updateSetting('general.siteDescription', e.target.value)}
                  placeholder="منصة تخزين ومشاركة الملفات السحابية"
                  className="text-right min-h-[80px]"
                />
              </div>

              {/* Maintenance Mode */}
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['general.maintenanceMode'] === true}
                    onCheckedChange={(checked) => updateSetting('general.maintenanceMode', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <Label>وضع الصيانة</Label>
                    <p className="text-sm text-muted-foreground">
                      تفعيل وضع الصيانة يمنع الوصول للموقع مؤقتاً
                    </p>
                  </div>
                </div>
                
                {/* Warning when maintenance mode is active */}
                {settings['general.maintenanceMode'] === true && (
                  <div className="flex items-start gap-3 rounded-lg bg-orange-500/10 border border-orange-500/20 p-4">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium text-orange-500">
                        وضع الصيانة مفعّل حالياً
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        المستخدمون العاديون لا يمكنهم الوصول للموقع. فقط المسؤولون يمكنهم تسجيل الدخول.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Enabled */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Switch
                  checked={settings['general.registrationEnabled'] === true}
                  onCheckedChange={(checked) => updateSetting('general.registrationEnabled', checked)}
                />
                <div className="space-y-0.5 text-right flex-1 mr-4">
                  <div className="flex items-center gap-2">
                    <Label>السماح للمستخدمين الجدد بإنشاء حسابات جديدة في النظام</Label>
                    {settings['general.registrationEnabled'] === true && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    عند التعطيل، لن يتمكن المستخدمون الجدد من التسجيل
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Shield className="h-5 w-5" />
                إعدادات الأمان
              </CardTitle>
              <CardDescription className="text-right">
                إعدادات الحماية وكلمات المرور والمصادقة على مستوى النظام
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Login Attempts Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-right">محاولات تسجيل الدخول</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-right">
                    <Label htmlFor="maxLoginAttempts" className="text-right pb-2">عدد المحاولات المسموحة</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      max="10"
                      value={settings['security.maxLoginAttempts'] || 5}
                      onChange={(e) => updateSetting('security.maxLoginAttempts', parseInt(e.target.value))}
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      عدد محاولات تسجيل الدخول الخاطئة قبل قفل الحساب
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <Label htmlFor="lockoutDuration" className="text-right pb-2">مدة القفل (بالدقائق)</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      min="15"
                      max="1440"
                      value={settings['security.accountLockoutDuration'] || 30}
                      onChange={(e) => updateSetting('security.accountLockoutDuration', parseInt(e.target.value))}
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      مدة قفل الحساب بعد تجاوز عدد المحاولات
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Password Policy Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-right">سياسة كلمات المرور</h3>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['security.enforceStrongPasswords'] !== false}
                    onCheckedChange={(checked) => updateSetting('security.enforceStrongPasswords', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <Label>إجبار كلمات مرور قوية</Label>
                    <p className="text-sm text-muted-foreground">
                      يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، أحرف كبيرة وصغيرة، أرقام ورموز
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="passwordExpiry" className="text-right">صلاحية كلمة المرور (بالأيام)</Label>
                      <Badge variant="secondary" className="text-xs">قريباً</Badge>
                    </div>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      min="0"
                      max="365"
                      value={settings['security.passwordExpiryDays'] || 0}
                      onChange={(e) => updateSetting('security.passwordExpiryDays', parseInt(e.target.value))}
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      0 = بدون انتهاء صلاحية
                    </p>
                  </div>

                  <div className="text-right">
                    <Label htmlFor="passwordHistory" className="text-right pb-2">منع إعادة استخدام كلمات المرور</Label>
                    <Input
                      id="passwordHistory"
                      type="number"
                      min="0"
                      max="10"
                      value={settings['security.passwordHistoryCount'] || 3}
                      onChange={(e) => updateSetting('security.passwordHistoryCount', parseInt(e.target.value))}
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      عدد كلمات المرور السابقة التي لا يمكن إعادة استخدامها
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Authentication & Verification Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-right">المصادقة والتحقق</h3>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['security.requireEmailVerification'] !== false}
                    onCheckedChange={(checked) => updateSetting('security.requireEmailVerification', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <Label>إجبار التحقق من البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">
                      المستخدمون الجدد يجب أن يؤكدوا بريدهم الإلكتروني قبل تسجيل الدخول
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['security.allowPasswordReset'] !== false}
                    onCheckedChange={(checked) => updateSetting('security.allowPasswordReset', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <Label>السماح بإعادة تعيين كلمة المرور</Label>
                    <p className="text-sm text-muted-foreground">
                      المستخدمون يمكنهم إعادة تعيين كلمة المرور عبر البريد الإلكتروني
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['security.enable2FA'] !== false}
                    onCheckedChange={(checked) => updateSetting('security.enable2FA', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <div className="flex items-center gap-2">
                      <Label>تفعيل المصادقة الثنائية (2FA)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      السماح للمستخدمين بتفعيل المصادقة الثنائية لحساباتهم (يمكن إجباريًا من قبل الإدارة)
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Security Alerts Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-right">تنبيهات الأمان</h3>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['security.suspiciousLoginAlerts'] !== false}
                    onCheckedChange={(checked) => updateSetting('security.suspiciousLoginAlerts', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <Label>تنبيهات تسجيل الدخول المشبوهة</Label>
                    <p className="text-sm text-muted-foreground">
                      إرسال تنبيه للمستخدمين عند اكتشاف محاولات تسجيل دخول من أجهزة أو مواقع غير معتادة
                    </p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Settings */}
        <TabsContent value="storage" className="space-y-4">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Database className="h-5 w-5" />
                إعدادات التخزين
              </CardTitle>
              <CardDescription className="text-right">
                إدارة مساحة التخزين والحصص وأنواع الملفات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-right">
                  <Label htmlFor="defaultQuota" className="text-right pb-2">الحصة الافتراضية (جيجابايت)</Label>
                  <Input
                    id="defaultQuota"
                    type="number"
                    min="1"
                    max="1000"
                    value={settings['storage.defaultQuotaGB'] || 10}
                    onChange={(e) => updateSetting('storage.defaultQuotaGB', parseInt(e.target.value))}
                    className="text-right"
                  />
                </div>
                
                <div className="text-right">
                  <Label htmlFor="maxQuota" className="text-right pb-2">الحد الأقصى للحصة (جيجابايت)</Label>
                  <Input
                    id="maxQuota"
                    type="number"
                    min="10"
                    max="10000"
                    value={settings['storage.maxQuotaGB'] || 100}
                    onChange={(e) => updateSetting('storage.maxQuotaGB', parseInt(e.target.value))}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="text-right">
                <Label htmlFor="maxFileSize" className="text-right pb-2">حجم الملف الأقصى (ميجابايت)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  min="1"
                  max="5000"
                  value={settings['upload.maxFileSize'] || 100}
                  onChange={(e) => updateSetting('upload.maxFileSize', parseInt(e.target.value))}
                  className="text-right"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  الحجم الحالي: {formatFileSize((settings['upload.maxFileSize'] || 100) * 1024 * 1024)}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                {/* Auto Generate Thumbnails */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Switch
                    checked={settings['upload.autoGenerateThumbnails'] === true}
                    onCheckedChange={(checked) => updateSetting('upload.autoGenerateThumbnails', checked)}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <Label>فرض إنشاء الصور المصغرة</Label>
                    <p className="text-sm text-muted-foreground">
                      إنشاء صور مصغرة تلقائياً للصور والفيديوهات المرفوعة على مستوى النظام
                    </p>
                  </div>
                </div>

                {/* Virus Scan - Disabled */}
                <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 p-4 opacity-60">
                  <Switch
                    checked={false}
                    disabled={true}
                  />
                  <div className="space-y-0.5 text-right flex-1 mr-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300">
                        معطل
                      </Badge>
                      <Label className="text-orange-900 dark:text-orange-100 font-medium">فحص الفيروسات</Label>
                    </div>
                    <p className="text-xs text-orange-800 dark:text-orange-200">
                      🔒 تواصل مع المطور لتفعيل هذه الميزة نظراً لحساسيتها
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                      هذه الميزة تتطلب تكامل مع خدمة فحص خارجية (ClamAV)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Mail className="h-5 w-5" />
                إعدادات البريد الإلكتروني
              </CardTitle>
              <CardDescription className="text-right">
                إعدادات SMTP وإرسال البريد الإلكتروني
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-right">
                  <Label htmlFor="smtpHost" className="text-right mb-2">خادم SMTP</Label>
                  <Input
                    id="smtpHost"
                    value={settings['email.smtpHost'] || ''}
                    onChange={(e) => updateSetting('email.smtpHost', e.target.value)}
                    placeholder="smtp.gmail.com"
                    className="text-right"
                  />
                </div>
                
                <div className="text-right">
                  <Label htmlFor="smtpPort" className="text-right mb-2">منفذ SMTP</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings['email.smtpPort'] || 587}
                    onChange={(e) => updateSetting('email.smtpPort', parseInt(e.target.value))}
                    className="text-right"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-right">
                  <Label htmlFor="smtpUser" className="text-right mb-2">اسم المستخدم SMTP</Label>
                  <Input
                    id="smtpUser"
                    type="email"
                    value={settings['email.smtpUser'] || ''}
                    onChange={(e) => updateSetting('email.smtpUser', e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="text-right"
                  />
                </div>

                <div className="text-right">
                  <Label htmlFor="smtpPassword" className="text-right mb-2">كلمة مرور SMTP</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings['email.smtpPassword'] || ''}
                    onChange={(e) => updateSetting('email.smtpPassword', e.target.value)}
                    placeholder="••••••••••••••••"
                    className="text-right"
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    استخدم كلمة مرور التطبيق من إعدادات أمان حسابك
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-right">
                  <Label htmlFor="fromAddress" className="text-right mb-2">عنوان المرسل</Label>
                  <Input
                    id="fromAddress"
                    type="email"
                    value={settings['email.fromAddress'] || ''}
                    onChange={(e) => updateSetting('email.fromAddress', e.target.value)}
                    placeholder="noreply@platinumdrive.com"
                    className="text-right"
                  />
                </div>
                
                <div className="text-right">
                  <Label htmlFor="fromName" className="text-right mb-2">اسم المرسل</Label>
                  <Input
                    id="fromName"
                    value={settings['email.fromName'] || ''}
                    onChange={(e) => updateSetting('email.fromName', e.target.value)}
                    placeholder="Platinum Drive"
                    className="text-right"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <Switch
                  checked={settings['email.smtpSecure'] !== false}
                  onCheckedChange={(checked) => updateSetting('email.smtpSecure', checked)}
                />
                <div className="space-y-0.5 text-right flex-1 mr-4">
                  <Label>اتصال آمن (TLS/SSL)</Label>
                  <p className="text-sm text-muted-foreground">
                    استخدام اتصال مشفر مع خادم البريد
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
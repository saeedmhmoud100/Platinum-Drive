import nodemailer from 'nodemailer'
import prisma from '@/lib/db/prisma'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Get SMTP settings from database
 */
async function getSMTPSettings() {
  const settings = await prisma.systemSettings.findMany({
    where: {
      key: {
        in: [
          'email.smtpHost',
          'email.smtpPort',
          'email.smtpUser',
          'email.smtpPassword',
          'email.smtpSecure',
          'email.fromAddress',
          'email.fromName',
        ],
      },
    },
  })

  const settingsMap: Record<string, any> = {}
  settings.forEach((setting: any) => {
    settingsMap[setting.key] = setting.value
  })

  return {
    host: settingsMap['email.smtpHost'] || 'smtp.gmail.com',
    port: parseInt(settingsMap['email.smtpPort']) || 587,
    secure: settingsMap['email.smtpSecure'] !== false, // true for 465, false for other ports
    auth: {
      user: settingsMap['email.smtpUser'] || '',
      pass: settingsMap['email.smtpPassword'] || '',
    },
    from: {
      name: settingsMap['email.fromName'] || 'Platinum Drive',
      address: settingsMap['email.fromAddress'] || settingsMap['email.smtpUser'] || '',
    },
  }
}

/**
 * Create email transporter
 */
async function createTransporter() {
  const config = await getSMTPSettings()
  
  if (!config.auth.user || !config.auth.pass) {
    throw new Error('SMTP credentials not configured')
  }

  // Port 587 uses STARTTLS (secure: false, requireTLS: true)
  // Port 465 uses SSL/TLS (secure: true)
  const useStartTLS = config.port === 587
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: useStartTLS ? false : config.secure, // false for port 587, true for 465
    requireTLS: useStartTLS, // force STARTTLS for port 587
    auth: config.auth,
    tls: {
      // Don't fail on invalid certs in development
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  })
}

/**
 * Send email
 */
export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
  try {
    const transporter = await createTransporter()
    const config = await getSMTPSettings()

    await transporter.sendMail({
      from: `"${config.from.name}" <${config.from.address}>`,
      to,
      subject,
      html,
      text: text || stripHtml(html),
    })

    console.log(`Email sent successfully to ${to}`)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

/**
 * Strip HTML tags for plain text version
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * Email Templates
 */

const EMAIL_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 40px 30px;
    text-align: center;
    color: white;
  }
  .header h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
  }
  .content {
    padding: 40px 30px;
  }
  .icon {
    font-size: 48px;
    margin-bottom: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #1a1a1a;
  }
  .message {
    font-size: 16px;
    color: #666;
    margin: 0 0 24px 0;
  }
  .button {
    display: inline-block;
    padding: 14px 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white !important;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    transition: transform 0.2s;
  }
  .button:hover {
    transform: translateY(-2px);
  }
  .info-box {
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    padding: 16px 20px;
    margin: 24px 0;
    border-radius: 4px;
  }
  .info-box p {
    margin: 0;
    color: #555;
  }
  .footer {
    background: #f8f9fa;
    padding: 24px 30px;
    text-align: center;
    color: #888;
    font-size: 14px;
  }
  .footer a {
    color: #667eea;
    text-decoration: none;
  }
  .divider {
    height: 1px;
    background: #e0e0e0;
    margin: 24px 0;
  }
`

/**
 * Password Changed Email
 */
export async function sendPasswordChangedEmail(userEmail: string, userName?: string) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Platinum Drive</h1>
        </div>
        <div class="content" style="text-align: right;">
          <div class="icon" style="text-align: center;">🔑</div>
          <h2 class="title">تم تغيير كلمة المرور بنجاح</h2>
          <p class="message">
            مرحباً ${userName || 'عزيزي المستخدم'},
          </p>
          <p class="message">
            نود إعلامك بأنه تم تغيير كلمة المرور الخاصة بحسابك في Platinum Drive بنجاح.
          </p>
          <div class="info-box">
            <p><strong>التاريخ والوقت:</strong> ${new Date().toLocaleString('ar-EG')}</p>
          </div>
          <p class="message">
            إذا لم تقم بهذا التغيير، يرجى الاتصال بنا فوراً لحماية حسابك.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile" class="button">
              عرض إعدادات الحساب
            </a>
          </div>
        </div>
        <div class="footer">
          <p>هذه رسالة آلية من Platinum Drive</p>
          <p>لا تقم بالرد على هذا البريد الإلكتروني</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: '🔑 تم تغيير كلمة المرور - Platinum Drive',
    html,
  })
}

/**
 * New Login Alert Email
 */
export async function sendNewLoginEmail(
  userEmail: string,
  userName: string | undefined,
  device: string,
  location?: string
) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Platinum Drive</h1>
        </div>
        <div class="content" style="text-align: right;">
          <div class="icon" style="text-align: center;">🔐</div>
          <h2 class="title">تسجيل دخول جديد إلى حسابك</h2>
          <p class="message">
            مرحباً ${userName || 'عزيزي المستخدم'},
          </p>
          <p class="message">
            تم تسجيل دخول جديد إلى حسابك في Platinum Drive. إليك التفاصيل:
          </p>
          <div class="info-box">
            <p><strong>الجهاز:</strong> ${device}</p>
            ${location ? `<p><strong>الموقع:</strong> ${location}</p>` : ''}
            <p><strong>التاريخ والوقت:</strong> ${new Date().toLocaleString('ar-EG')}</p>
          </div>
          <p class="message">
            إذا لم تكن أنت من قام بتسجيل الدخول، يرجى تغيير كلمة المرور فوراً.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile" class="button">
              تأمين حسابي
            </a>
          </div>
        </div>
        <div class="footer">
          <p>هذه رسالة آلية من Platinum Drive</p>
          <p>لا تقم بالرد على هذا البريد الإلكتروني</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: '🔐 تسجيل دخول جديد - Platinum Drive',
    html,
  })
}

/**
 * Storage Warning Email
 */
export async function sendStorageWarningEmail(
  userEmail: string,
  userName: string | undefined,
  percentage: number
) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📦 Platinum Drive</h1>
        </div>
        <div class="content" style="text-align: right;">
          <div class="icon" style="text-align: center;">⚠️</div>
          <h2 class="title">تحذير: مساحة التخزين تقترب من الامتلاء</h2>
          <p class="message">
            مرحباً ${userName || 'عزيزي المستخدم'},
          </p>
          <p class="message">
            نود إعلامك بأن مساحة التخزين الخاصة بك قد وصلت إلى <strong>${percentage}%</strong>.
          </p>
          <div class="info-box">
            <p><strong>الحالة:</strong> ${percentage >= 95 ? 'حرجة 🔴' : percentage >= 90 ? 'تحذير 🟡' : 'تنبيه 🟢'}</p>
            <p><strong>النسبة المستخدمة:</strong> ${percentage}%</p>
          </div>
          <p class="message">
            ${percentage >= 95 
              ? 'يرجى حذف بعض الملفات أو ترقية حسابك للحصول على مساحة إضافية.' 
              : 'فكر في تنظيف الملفات غير الضرورية أو ترقية حسابك.'}
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/files" class="button">
              إدارة الملفات
            </a>
          </div>
        </div>
        <div class="footer">
          <p>هذه رسالة آلية من Platinum Drive</p>
          <p>لا تقم بالرد على هذا البريد الإلكتروني</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: `⚠️ تحذير التخزين ${percentage}% - Platinum Drive`,
    html,
  })
}

/**
 * Storage Full Email
 */
export async function sendStorageFullEmail(
  userEmail: string,
  userName: string | undefined
) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📦 Platinum Drive</h1>
        </div>
        <div class="content" style="text-align: right;">
          <div class="icon" style="text-align: center;">🚨</div>
          <h2 class="title">مساحة التخزين ممتلئة</h2>
          <p class="message">
            مرحباً ${userName || 'عزيزي المستخدم'},
          </p>
          <p class="message">
            لقد استنفذت مساحة التخزين المتاحة لك. لن تتمكن من رفع ملفات جديدة حتى تقوم بتحرير بعض المساحة.
          </p>
          <div class="info-box" style="border-left-color: #dc2626;">
            <p><strong>الحالة:</strong> ممتلئة 100% 🔴</p>
            <p><strong>الإجراء المطلوب:</strong> حذف ملفات أو ترقية الحساب</p>
          </div>
          <p class="message">
            يمكنك حذف الملفات غير الضرورية أو ترقية حسابك للحصول على مساحة تخزين إضافية.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/trash" class="button" style="background: #dc2626;">
              مسح الملفات المحذوفة
            </a>
          </div>
        </div>
        <div class="footer">
          <p>هذه رسالة آلية من Platinum Drive</p>
          <p>لا تقم بالرد على هذا البريد الإلكتروني</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: '🚨 مساحة التخزين ممتلئة - Platinum Drive',
    html,
  })
}

/**
 * Welcome Email
 */
export async function sendWelcomeEmail(userEmail: string, userName?: string) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Platinum Drive</h1>
        </div>
        <div class="content" style="text-align: right;">
          <div class="icon" style="text-align: center;">👋</div>
          <h2 class="title">مرحباً بك في Platinum Drive!</h2>
          <p class="message">
            عزيزي ${userName || 'المستخدم'},
          </p>
          <p class="message">
            شكراً لانضمامك إلى Platinum Drive - منصة التخزين السحابي الحديثة والآمنة.
          </p>
          <div class="info-box">
            <p><strong>✨ ما يمكنك فعله:</strong></p>
            <p>• رفع وإدارة ملفاتك بأمان</p>
            <p>• مشاركة الملفات مع الآخرين</p>
            <p>• الوصول إلى ملفاتك من أي مكان</p>
            <p>• تنظيم ملفاتك في مجلدات</p>
          </div>
          <p class="message">
            ابدأ الآن برفع ملفاتك الأولى!
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/upload" class="button">
              ابدأ الآن
            </a>
          </div>
        </div>
        <div class="footer">
          <p>هذه رسالة آلية من Platinum Drive</p>
          <p>إذا كان لديك أي استفسار، تواصل معنا</p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: userEmail,
    subject: '🎉 مرحباً بك في Platinum Drive',
    html,
  })
}

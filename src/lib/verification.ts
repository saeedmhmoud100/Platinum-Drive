import prisma from '@/lib/prisma'
import { sendEmail } from './email-service'
import crypto from 'crypto'

export function generateNumericCode(length = 6) {
  const max = 10 ** length
  const num = Math.floor(Math.random() * max)
  return String(num).padStart(length, '0')
}

export async function createVerificationCode(userId: string, type: 'email_verification' | 'two_factor' = 'email_verification', expiresMinutes = 15) {
  const code = generateNumericCode(6)
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresMinutes)

  const record = await prisma.verificationCode.create({
    data: {
      userId,
      code,
      type,
      expiresAt,
    }
  })

  return record
}

export async function sendEmailVerification(userEmail: string, userName: string | undefined, code: string) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;direction:rtl;text-align:right}</style>
    </head>
    <body>
      <h2>تحقق من بريدك الإلكتروني</h2>
      <p>مرحباً ${userName || 'عزيزي المستخدم'},</p>
      <p>رمز التحقق الخاص بك هو:</p>
      <div style="font-size:28px; font-weight:700; margin:16px 0">${code}</div>
      <p>سيكون هذا الرمز صالحًا لمدة 15 دقيقة.</p>
      <p>إذا لم تطلب هذا، يمكنك تجاهل هذه الرسالة.</p>
    </body>
    </html>
  `

  return sendEmail({ to: userEmail, subject: 'رمز التحقق - Platinum Drive', html })
}

export async function sendTwoFactorCode(userEmail: string, userName: string | undefined, code: string) {
  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;direction:rtl;text-align:right; padding: 20px;}</style>
    </head>
    <body>
      <h2>رمز المصادقة الثنائية (2FA)</h2>
      <p>مرحباً ${userName || 'عزيزي المستخدم'},</p>
      <p>رمز المصادقة الثنائية الخاص بك هو:</p>
      <div style="font-size:32px; font-weight:700; margin:20px 0; padding: 15px; background: #f3f4f6; border-radius: 8px; text-align: center;">${code}</div>
      <p>سيكون هذا الرمز صالحًا لمدة 10 دقائق.</p>
      <p>إذا لم تحاول تسجيل الدخول، يرجى تأمين حسابك فوراً.</p>
    </body>
    </html>
  `

  return sendEmail({ to: userEmail, subject: '🔐 رمز المصادقة الثنائية - Platinum Drive', html })
}

export async function createTwoFactorCode(userId: string, expiresMinutes = 10) {
  const code = generateNumericCode(6)
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresMinutes)

  // Delete old 2FA codes for this user
  await prisma.twoFactorCode.deleteMany({
    where: { userId }
  })

  const record = await prisma.twoFactorCode.create({
    data: {
      userId,
      code,
      expiresAt,
    }
  })

  return record
}

export async function verifyTwoFactorCode(userId: string, code: string) {
  const now = new Date()
  const record = await prisma.twoFactorCode.findFirst({
    where: { userId, code, expiresAt: { gt: now }, used: false }
  })

  if (!record) return { ok: false, reason: 'invalid_or_expired' }

  // Mark as used
  await prisma.twoFactorCode.update({
    where: { id: record.id },
    data: { used: true }
  })

  return { ok: true }
}

export async function verifyCode(userId: string, code: string, type: 'email_verification' | 'two_factor' = 'email_verification') {
  const now = new Date()
  const record = await prisma.verificationCode.findFirst({
    where: { userId, code, type, expiresAt: { gt: now } }
  })

  if (!record) return { ok: false, reason: 'invalid_or_expired' }

  // mark used by deleting or incrementing attempts then deleting
  await prisma.verificationCode.delete({ where: { id: record.id } })

  return { ok: true }
}

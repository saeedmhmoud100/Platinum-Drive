import prisma from '@/lib/prisma'

export type NotificationType = 
  // User notifications
  | 'FILE_UPLOADED'            // File upload completed
  | 'FILE_DELETED'             // File deleted (moved to trash)
  | 'FILE_RESTORED'            // File restored from trash
  | 'STORAGE_WARNING'          // Storage at 80%, 90%, 95%
  | 'STORAGE_FULL'             // Storage 100% full
  | 'TRASH_AUTO_DELETE_SOON'   // Files will be deleted soon
  | 'TRASH_AUTO_DELETE_FAILED' // Auto-delete failed
  | 'SHARE_ACCESSED'           // Someone accessed shared file
  | 'SHARE_LINK_EXPIRING'      // Share link expires soon
  | 'NEW_LOGIN'                // New login from device
  | 'PASSWORD_CHANGED'         // Password changed
  | 'EMAIL_CHANGED'            // Email changed
  // Admin notifications
  | 'NEW_USER_REGISTERED'      // New user signed up
  | 'SYSTEM_STORAGE_CRITICAL'  // System storage critical
  | 'USER_QUOTA_EXCEEDED'      // User exceeded quota
  | 'BACKUP_COMPLETED'         // Backup task completed
  | 'BACKUP_FAILED'            // Backup task failed

export interface NotificationData {
  title: string
  message: string
  icon?: string
  link?: string
  metadata?: Record<string, any>
}

/**
 * Create a notification for a user
 */
export async function createNotification(
  userId: string,
  type: NotificationType,
  data: NotificationData
) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        data: data as any,
        isRead: false,
        delivered: true,
        deliveredAt: new Date(),
      },
    })
    return notification
  } catch (error) {
    console.error('Failed to create notification:', error)
    return null
  }
}

/**
 * Create notifications for multiple users (e.g., all admins)
 */
export async function createBulkNotifications(
  userIds: string[],
  type: NotificationType,
  data: NotificationData
) {
  try {
    const notifications = await prisma.notification.createMany({
      data: userIds.map(userId => ({
        userId,
        type,
        data: data as any,
        isRead: false,
        delivered: true,
        deliveredAt: new Date(),
      })),
    })
    return notifications
  } catch (error) {
    console.error('Failed to create bulk notifications:', error)
    return null
  }
}

/**
 * Get all admins for system notifications
 */
export async function getAdminUserIds(): Promise<string[]> {
  const adminRoles = await prisma.userRole.findMany({
    where: {
      role: {
        name: 'admin',
      },
    },
    select: {
      userId: true,
    },
  })
  return adminRoles.map(role => role.userId)
}

// File operation notifications
export async function notifyFileUploaded(userId: string, fileName: string, fileSize: number) {
  // Check if user has this notification enabled
  const settings = await prisma.userSettings.findUnique({
    where: { userId },
    select: { notifyOnUpload: true },
  })

  if (!settings?.notifyOnUpload) return null

  const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2)
  
  return createNotification(userId, 'FILE_UPLOADED', {
    title: 'تم رفع الملف بنجاح',
    message: `تم رفع "${fileName}" (${fileSizeMB} MB)`,
    icon: '📤',
    link: '/',
    metadata: { fileName, fileSize },
  })
}

export async function notifyFileDeleted(userId: string, fileName: string) {
  // Check if user has this notification enabled
  const settings = await prisma.userSettings.findUnique({
    where: { userId },
    select: { notifyOnFileActivity: true },
  })

  if (!settings?.notifyOnFileActivity) return null

  return createNotification(userId, 'FILE_DELETED', {
    title: 'تم نقل الملف إلى سلة المهملات',
    message: `تم نقل "${fileName}" إلى سلة المهملات`,
    icon: '🗑️',
    link: '/trash',
    metadata: { fileName },
  })
}

export async function notifyFileRestored(userId: string, fileName: string) {
  // Check if user has this notification enabled
  const settings = await prisma.userSettings.findUnique({
    where: { userId },
    select: { notifyOnFileActivity: true },
  })

  if (!settings?.notifyOnFileActivity) return null

  return createNotification(userId, 'FILE_RESTORED', {
    title: 'تم استعادة الملف',
    message: `تم استعادة "${fileName}" من سلة المهملات`,
    icon: '♻️',
    link: '/',
    metadata: { fileName },
  })
}

/**
 * Check if user storage is at warning level
 */
export async function checkStorageWarning(userId: string): Promise<number | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      usedStorageBytes: true,
      storageQuotaBytes: true,
    },
  })

  if (!user) return null

  const usagePercent = Number((user.usedStorageBytes * BigInt(100)) / user.storageQuotaBytes)
  
  // Return percentage if at warning levels
  if (usagePercent >= 95) return 95
  if (usagePercent >= 90) return 90
  if (usagePercent >= 80) return 80
  
  return null
}

/**
 * Helper functions for common notification types
 */

export async function notifyStorageWarning(userId: string, percentage: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  })

  if (!user) return null

  let message = ''
  if (percentage >= 95) {
    message = 'مساحة التخزين ممتلئة تقريباً! يرجى حذف بعض الملفات.'
  } else if (percentage >= 90) {
    message = `استخدمت ${percentage}٪ من مساحة التخزين. فكر في تفريغ بعض المساحة.`
  } else {
    message = `استخدمت ${percentage}٪ من مساحة التخزين.`
  }

  // Send email for critical storage warnings (90%+)
  if (percentage >= 90) {
    const { sendStorageWarningEmail } = await import('@/lib/email-service')
    await sendStorageWarningEmail(user.email, user.name || undefined, percentage).catch(err => 
      console.error('Failed to send storage warning email:', err)
    )
  }

  return createNotification(userId, 'STORAGE_WARNING', {
    title: 'تحذير مساحة التخزين',
    message,
    icon: '⚠️',
    link: '/profile',
    metadata: { percentage },
  })
}

export async function notifyStorageFull(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  })

  if (!user) return null

  // Send email notification
  const { sendStorageFullEmail } = await import('@/lib/email-service')
  await sendStorageFullEmail(user.email, user.name || undefined).catch(err =>
    console.error('Failed to send storage full email:', err)
  )

  return createNotification(userId, 'STORAGE_FULL', {
    title: 'مساحة التخزين ممتلئة',
    message: 'لا يمكنك رفع ملفات جديدة. يرجى حذف بعض الملفات أولاً.',
    icon: '🚨',
    link: '/profile',
  })
}

export async function notifyTrashAutoDeleteSoon(userId: string, fileCount: number, daysLeft: number) {
  return createNotification(userId, 'TRASH_AUTO_DELETE_SOON', {
    title: 'تنبيه حذف تلقائي',
    message: `سيتم حذف ${fileCount} ملف نهائياً خلال ${daysLeft} يوم.`,
    icon: '🗑️',
    link: '/trash',
    metadata: { fileCount, daysLeft },
  })
}

export async function notifyShareAccessed(userId: string, fileName: string, accessorInfo: string) {
  return createNotification(userId, 'SHARE_ACCESSED', {
    title: 'تم الوصول إلى ملف مشارك',
    message: `${accessorInfo} قام بالوصول إلى "${fileName}"`,
    icon: '🔗',
    link: '/shared',
    metadata: { fileName, accessorInfo },
  })
}

export async function notifyNewLogin(userId: string, device: string, location?: string) {
  console.log('🔔 notifyNewLogin called:', { userId, device, location })
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  })

  if (!user) {
    console.log('❌ User not found for notification:', userId)
    return null
  }

  // Send email notification
  const { sendNewLoginEmail } = await import('@/lib/email-service')
  await sendNewLoginEmail(user.email, user.name || undefined, device, location).catch(err =>
    console.error('Failed to send new login email:', err)
  )

  const locationText = location ? ` من ${location}` : ''
  const notification = await createNotification(userId, 'NEW_LOGIN', {
    title: 'تسجيل دخول جديد',
    message: `تم تسجيل دخول جديد على ${device}${locationText}`,
    icon: '🔐',
    link: '/profile',
    metadata: { device, location },
  })
  
  console.log('✅ Login notification created:', notification?.id)
  return notification
}

export async function notifyPasswordChanged(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  })

  if (!user) return null

  // Send email notification
  const { sendPasswordChangedEmail } = await import('@/lib/email-service')
  await sendPasswordChangedEmail(user.email, user.name || undefined).catch(err =>
    console.error('Failed to send password changed email:', err)
  )

  return createNotification(userId, 'PASSWORD_CHANGED', {
    title: 'تم تغيير كلمة المرور',
    message: 'تم تغيير كلمة المرور الخاصة بك بنجاح.',
    icon: '🔑',
    link: '/profile',
  })
}

// Admin notifications
export async function notifyAdminsNewUser(newUserEmail: string, newUserName?: string) {
  const adminIds = await getAdminUserIds()
  const userName = newUserName || newUserEmail
  
  return createBulkNotifications(adminIds, 'NEW_USER_REGISTERED', {
    title: 'مستخدم جديد',
    message: `انضم مستخدم جديد: ${userName}`,
    icon: '👤',
    link: '/admin/users',
    metadata: { email: newUserEmail, name: newUserName },
  })
}

export async function notifyAdminsSystemStorage(usagePercent: number) {
  const adminIds = await getAdminUserIds()
  
  return createBulkNotifications(adminIds, 'SYSTEM_STORAGE_CRITICAL', {
    title: 'تحذير مساحة النظام',
    message: `مساحة التخزين في النظام بلغت ${usagePercent}٪`,
    icon: '📊',
    link: '/admin/system',
    metadata: { usagePercent },
  })
}

export async function notifyAdminsQuotaExceeded(userId: string, userName: string) {
  const adminIds = await getAdminUserIds()
  
  return createBulkNotifications(adminIds, 'USER_QUOTA_EXCEEDED', {
    title: 'تجاوز حد التخزين',
    message: `المستخدم ${userName} تجاوز حد التخزين المسموح`,
    icon: '⚠️',
    link: `/admin/users/${userId}`,
    metadata: { userId, userName },
  })
}

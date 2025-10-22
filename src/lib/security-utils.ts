import prisma from './prisma'

/**
 * Check if user session should timeout based on last activity
 * @param lastActivity - Last activity timestamp
 * @param sessionTimeout - Timeout duration in minutes (0 = never)
 * @returns true if session should timeout
 */
export function shouldSessionTimeout(
  lastActivity: Date,
  sessionTimeout: number
): boolean {
  if (sessionTimeout === 0) return false // Never timeout
  
  const now = new Date()
  const diffMinutes = (now.getTime() - lastActivity.getTime()) / (1000 * 60)
  
  return diffMinutes >= sessionTimeout
}

/**
 * Send login alert notification to user
 * @param userId - User ID
 * @param device - Device information
 * @param ip - IP address
 * @param location - Location (optional)
 */
export async function sendLoginAlert(
  userId: string,
  device: string,
  ip: string,
  location?: string
): Promise<void> {
  try {
    // Get user info and check if login alerts are enabled
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        email: true,
        name: true,
        settings: {
          select: { loginAlerts: true }
        }
      },
    })

    if (!user?.settings?.loginAlerts) return

    // Create notification with proper title and message
    await prisma.notification.create({
      data: {
        userId,
        type: 'LOGIN_ALERT',
        data: {
          title: 'تسجيل دخول جديد',
          message: `تم تسجيل الدخول من ${device} - IP: ${ip}`,
          icon: '🔐',
          device,
          ip,
          location: location || 'Unknown',
          timestamp: new Date().toISOString(),
          // Include user email for email sending in auth.ts
          userEmail: user.email,
          userName: user.name || undefined,
        },
      },
    })
  } catch (error) {
    console.error('Failed to send login alert:', error)
  }
}

/**
 * Calculate expiry date for shared link
 * @param defaultLinkExpiry - Default expiry in days (null = never)
 * @returns Expiry date or null
 */
export function calculateLinkExpiry(
  defaultLinkExpiry: number | null
): Date | null {
  if (defaultLinkExpiry === null || defaultLinkExpiry === 0) return null
  
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + defaultLinkExpiry)
  
  return expiryDate
}

/**
 * Get default share permission from user settings
 * @param userId - User ID
 * @returns Default permission ('view', 'download')
 */
export async function getDefaultSharePermission(
  userId: string
): Promise<string> {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
      select: { defaultSharePermission: true },
    })

    return settings?.defaultSharePermission || 'view'
  } catch (error) {
    console.error('Failed to get default share permission:', error)
    return 'view'
  }
}

/**
 * Get default link expiry from user settings
 * @param userId - User ID
 * @returns Default expiry in days (null = never)
 */
export async function getDefaultLinkExpiry(
  userId: string
): Promise<number | null> {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
      select: { defaultLinkExpiry: true },
    })

    return settings?.defaultLinkExpiry ?? 7
  } catch (error) {
    console.error('Failed to get default link expiry:', error)
    return 7
  }
}

/**
 * Check if user requires reauth for sensitive operations
 * @param userId - User ID
 * @returns true if reauth is required
 */
export async function requiresReauth(userId: string): Promise<boolean> {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
      select: { requireReauth: true },
    })

    return settings?.requireReauth ?? false
  } catch (error) {
    console.error('Failed to check reauth requirement:', error)
    return false
  }
}

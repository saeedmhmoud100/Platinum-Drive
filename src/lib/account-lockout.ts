import prisma from "@/lib/prisma"

/**
 * Check if account is locked due to too many failed login attempts
 */
export async function isAccountLocked(userId: string): Promise<boolean> {
  // Get security settings
  const [maxAttemptsSetting, lockoutDurationSetting] = await Promise.all([
    prisma.systemSettings.findUnique({
      where: { key: 'security.maxLoginAttempts' }
    }),
    prisma.systemSettings.findUnique({
      where: { key: 'security.accountLockoutDuration' }
    })
  ])

  const maxAttempts = parseInt(maxAttemptsSetting?.value as string || '5')
  const lockoutDurationMinutes = parseInt(lockoutDurationSetting?.value as string || '30')

  // Get failed login attempts within the lockout duration
  const lockoutStart = new Date(Date.now() - lockoutDurationMinutes * 60 * 1000)

  const failedAttempts = await prisma.loginHistory.count({
    where: {
      userId,
      status: 'failed',
      createdAt: {
        gte: lockoutStart
      }
    }
  })

  return failedAttempts >= maxAttempts
}

/**
 * Get time remaining until account unlock
 */
export async function getAccountLockoutTimeRemaining(userId: string): Promise<number> {
  const lockoutDurationSetting = await prisma.systemSettings.findUnique({
    where: { key: 'security.accountLockoutDuration' }
  })

  const lockoutDurationMinutes = parseInt(lockoutDurationSetting?.value as string || '30')
  const lockoutStart = new Date(Date.now() - lockoutDurationMinutes * 60 * 1000)

  // Get the most recent failed attempt
  const lastFailedAttempt = await prisma.loginHistory.findFirst({
    where: {
      userId,
      status: 'failed',
      createdAt: {
        gte: lockoutStart
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!lastFailedAttempt) {
    return 0
  }

  const unlockTime = new Date(lastFailedAttempt.createdAt.getTime() + lockoutDurationMinutes * 60 * 1000)
  const timeRemaining = unlockTime.getTime() - Date.now()

  return Math.max(0, Math.ceil(timeRemaining / 60 / 1000)) // Return minutes
}

/**
 * Clear failed login attempts for a user (after successful login)
 */
export async function clearFailedLoginAttempts(userId: string): Promise<void> {
  const lockoutDurationSetting = await prisma.systemSettings.findUnique({
    where: { key: 'security.accountLockoutDuration' }
  })

  const lockoutDurationMinutes = parseInt(lockoutDurationSetting?.value as string || '30')
  const lockoutStart = new Date(Date.now() - lockoutDurationMinutes * 60 * 1000)

  await prisma.loginHistory.deleteMany({
    where: {
      userId,
      status: 'failed',
      createdAt: {
        gte: lockoutStart
      }
    }
  })
}

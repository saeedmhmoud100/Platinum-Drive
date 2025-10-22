/**
 * Date utilities with Hijri calendar support
 */

import prisma from './prisma'

// Cache for system settings
let settingsCache: {
  calendarType?: string
  dateFormat?: string
  timeFormat?: string
  lastFetch?: number
} = {}

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Get user date/time settings from database
 * @param userId - Optional user ID. If not provided, returns system defaults
 */
async function getUserSettings(userId?: string) {
  const now = Date.now()
  
  // Return cached settings if still valid
  if (settingsCache.lastFetch && now - settingsCache.lastFetch < CACHE_TTL) {
    return settingsCache
  }

  try {
    // If no userId provided, return defaults
    if (!userId) {
      return {
        calendarType: 'gregorian',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24'
      }
    }

    const settings = await prisma.userSettings.findUnique({
      where: { userId },
      select: {
        calendarType: true,
        dateFormat: true,
        timeFormat: true
      }
    })

    if (!settings) {
      return {
        calendarType: 'gregorian',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24'
      }
    }

    settingsCache = {
      calendarType: settings.calendarType || 'gregorian',
      dateFormat: settings.dateFormat || 'DD/MM/YYYY',
      timeFormat: settings.timeFormat || '24',
      lastFetch: now
    }

    return settingsCache
  } catch (error) {
    console.error('Failed to fetch date settings:', error)
    // Return defaults on error
    return {
      calendarType: 'gregorian',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24'
    }
  }
}

/**
 * Convert Gregorian date to Hijri (Islamic calendar)
 * Using Umm al-Qura calendar calculation
 */
function gregorianToHijri(date: Date): { year: number; month: number; day: number; monthName: string } {
  // Simplified conversion algorithm (accurate for most dates)
  const gYear = date.getFullYear()
  const gMonth = date.getMonth() + 1
  const gDay = date.getDate()

  // Calculate Julian Day Number
  let a = Math.floor((14 - gMonth) / 12)
  let y = gYear + 4800 - a
  let m = gMonth + (12 * a) - 3
  let jd = gDay + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045

  // Convert to Hijri
  let l = jd - 1948440 + 10632
  let n = Math.floor((l - 1) / 10631)
  l = l - 10631 * n + 354
  let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238))
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29
  
  const hMonth = Math.floor((24 * l) / 709)
  const hDay = l - Math.floor((709 * hMonth) / 24)
  const hYear = 30 * n + j - 30

  const hijriMonthNames = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ]

  return {
    year: hYear,
    month: hMonth,
    day: hDay,
    monthName: hijriMonthNames[hMonth - 1]
  }
}

/**
 * Format date according to user settings
 * @param date - The date to format
 * @param includeTime - Whether to include time
 * @param userId - Optional user ID for personalized formatting
 */
export async function formatDate(date: Date | string | null | undefined, includeTime = false, userId?: string): Promise<string> {
  if (!date) return '-'
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return '-'

  const settings = await getUserSettings(userId)
  const calendarType = settings.calendarType || 'gregorian'
  const dateFormat = settings.dateFormat || 'DD/MM/YYYY'
  const timeFormat = settings.timeFormat || '24'

  let formattedDate = ''

  if (calendarType === 'hijri') {
    // Hijri calendar
    const hijri = gregorianToHijri(dateObj)
    
    // Format based on dateFormat setting
    if (dateFormat === 'DD/MM/YYYY') {
      formattedDate = `${hijri.day}/${hijri.month}/${hijri.year} هـ`
    } else if (dateFormat === 'MM/DD/YYYY') {
      formattedDate = `${hijri.month}/${hijri.day}/${hijri.year} هـ`
    } else {
      formattedDate = `${hijri.year}/${hijri.month}/${hijri.day} هـ`
    }
  } else {
    // Gregorian calendar
    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear()

    if (dateFormat === 'DD/MM/YYYY') {
      formattedDate = `${day}/${month}/${year}`
    } else if (dateFormat === 'MM/DD/YYYY') {
      formattedDate = `${month}/${day}/${year}`
    } else {
      formattedDate = `${year}/${month}/${day}`
    }
  }

  if (includeTime) {
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')

    if (timeFormat === '12') {
      // 12-hour format with AM/PM
      const period = hours >= 12 ? 'م' : 'ص' // مساءً / صباحاً
      const hour12 = hours % 12 || 12
      formattedDate += ` ${hour12}:${minutes} ${period}`
    } else {
      // 24-hour format
      const hours24 = hours.toString().padStart(2, '0')
      formattedDate += ` ${hours24}:${minutes}`
    }
  }

  return formattedDate
}

/**
 * Format date with time (shortcut)
 * @param date - The date to format
 * @param userId - Optional user ID for personalized formatting
 */
export async function formatDateTime(date: Date | string | null | undefined, userId?: string): Promise<string> {
  return formatDate(date, true, userId)
}

/**
 * Format relative time (e.g., "منذ 5 دقائق")
 * This is calendar-agnostic
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return '-'

  const now = new Date()
  const diff = now.getTime() - dateObj.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'الآن'
  if (minutes < 60) return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : minutes === 2 ? 'دقيقتين' : 'دقائق'}`
  if (hours < 24) return `منذ ${hours} ${hours === 1 ? 'ساعة' : hours === 2 ? 'ساعتين' : 'ساعات'}`
  if (days < 30) return `منذ ${days} ${days === 1 ? 'يوم' : days === 2 ? 'يومين' : 'أيام'}`
  if (months < 12) return `منذ ${months} ${months === 1 ? 'شهر' : months === 2 ? 'شهرين' : 'أشهر'}`
  return `منذ ${years} ${years === 1 ? 'سنة' : years === 2 ? 'سنتين' : 'سنوات'}`
}

/**
 * Get current date in Hijri or Gregorian
 */
export async function getCurrentDate(): Promise<string> {
  return formatDate(new Date(), false)
}

/**
 * Get current date and time
 */
export async function getCurrentDateTime(): Promise<string> {
  return formatDate(new Date(), true)
}

/**
 * Clear settings cache (call this after updating system settings)
 */
export function clearDateSettingsCache() {
  settingsCache = {}
}

/**
 * Get Hijri month name
 */
export function getHijriMonthName(monthNumber: number): string {
  const months = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ]
  return months[monthNumber - 1] || ''
}

/**
 * Get Gregorian month name in Arabic
 */
export function getGregorianMonthName(monthNumber: number): string {
  const months = [
    'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]
  return months[monthNumber - 1] || ''
}

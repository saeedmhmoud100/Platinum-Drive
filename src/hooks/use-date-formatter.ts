/**
 * Client-side date formatting hook
 */

'use client'

import { useState, useEffect } from 'react'

interface DateSettings {
  calendarType: 'gregorian' | 'hijri'
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD'
  timeFormat: '12' | '24'
}

// Convert Gregorian to Hijri (same algorithm as server)
function gregorianToHijri(date: Date): { year: number; month: number; day: number } {
  const gYear = date.getFullYear()
  const gMonth = date.getMonth() + 1
  const gDay = date.getDate()

  let a = Math.floor((14 - gMonth) / 12)
  let y = gYear + 4800 - a
  let m = gMonth + (12 * a) - 3
  let jd = gDay + Math.floor((153 * m + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045

  let l = jd - 1948440 + 10632
  let n = Math.floor((l - 1) / 10631)
  l = l - 10631 * n + 354
  let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238))
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29
  
  const hMonth = Math.floor((24 * l) / 709)
  const hDay = l - Math.floor((709 * hMonth) / 24)
  const hYear = 30 * n + j - 30

  return { year: hYear, month: hMonth, day: hDay }
}

export function useDateFormatter() {
  const [settings, setSettings] = useState<DateSettings>({
    calendarType: 'gregorian',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24'
  })

  useEffect(() => {
    // Fetch settings from user settings API
    fetch('/api/user/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          setSettings({
            calendarType: data.settings.calendarType || 'gregorian',
            dateFormat: data.settings.dateFormat || 'DD/MM/YYYY',
            timeFormat: data.settings.timeFormat?.replace('h', '') || '24'
          })
        }
      })
      .catch(err => console.error('Failed to load date settings:', err))
  }, [])

  const formatDate = (date: Date | string | null | undefined, includeTime = false): string => {
    if (!date) return '-'
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (isNaN(dateObj.getTime())) return '-'

    let formattedDate = ''

    if (settings.calendarType === 'hijri') {
      const hijri = gregorianToHijri(dateObj)
      
      if (settings.dateFormat === 'DD/MM/YYYY') {
        formattedDate = `${hijri.day}/${hijri.month}/${hijri.year} هـ`
      } else if (settings.dateFormat === 'MM/DD/YYYY') {
        formattedDate = `${hijri.month}/${hijri.day}/${hijri.year} هـ`
      } else {
        formattedDate = `${hijri.year}/${hijri.month}/${hijri.day} هـ`
      }
    } else {
      const day = dateObj.getDate().toString().padStart(2, '0')
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
      const year = dateObj.getFullYear()

      if (settings.dateFormat === 'DD/MM/YYYY') {
        formattedDate = `${day}/${month}/${year}`
      } else if (settings.dateFormat === 'MM/DD/YYYY') {
        formattedDate = `${month}/${day}/${year}`
      } else {
        formattedDate = `${year}/${month}/${day}`
      }
    }

    if (includeTime) {
      const hours = dateObj.getHours()
      const minutes = dateObj.getMinutes().toString().padStart(2, '0')

      if (settings.timeFormat === '12') {
        const period = hours >= 12 ? 'م' : 'ص'
        const hour12 = hours % 12 || 12
        formattedDate += ` ${hour12}:${minutes} ${period}`
      } else {
        const hours24 = hours.toString().padStart(2, '0')
        formattedDate += ` ${hours24}:${minutes}`
      }
    }

    return formattedDate
  }

  const formatDateTime = (date: Date | string | null | undefined): string => {
    return formatDate(date, true)
  }

  const formatRelativeTime = (date: Date | string): string => {
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

  return {
    formatDate,
    formatDateTime,
    formatRelativeTime,
    settings
  }
}

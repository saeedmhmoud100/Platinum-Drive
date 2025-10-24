'use client'

import { usePathname } from "next/navigation"
import { ReactNode, useEffect } from "react"

export function MaintenanceChecker({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Don't check on maintenance page itself
    if (pathname === '/maintenance') {
      return
    }

    // Check maintenance mode
    const checkMaintenance = async () => {
      try {
        const response = await fetch('/api/maintenance/check')
        const data = await response.json()
        
        if (data.maintenanceMode && !data.isAdmin) {
          window.location.href = '/maintenance'
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error)
      }
    }

    checkMaintenance()
  }, [pathname])

  return <>{children}</>
}

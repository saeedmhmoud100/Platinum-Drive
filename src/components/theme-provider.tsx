"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { useEffect } from "react"

function ThemeSync() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Load theme from user settings on mount
    fetch('/api/user/settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings?.theme) {
          setTheme(data.settings.theme)
        }
      })
      .catch(err => console.error('Failed to load theme:', err))
  }, [setTheme])

  return null
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}

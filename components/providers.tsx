"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeTransitionOverlay } from "@/components/theme-transition-overlay"
import { InteractiveCompanion } from "@/components/blog/interactive-companion"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ThemeTransitionOverlay />
      {children}
      <InteractiveCompanion />
    </ThemeProvider>
  )
}

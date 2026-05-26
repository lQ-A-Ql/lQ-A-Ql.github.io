"use client"

import { ReactNode } from "react"
import { TransitionContextProvider } from "@/components/blog/transition-context"
import { TransitionProvider } from "@/components/blog/transition-provider"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <TransitionContextProvider>
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </TransitionContextProvider>
    </ThemeProvider>
  )
}

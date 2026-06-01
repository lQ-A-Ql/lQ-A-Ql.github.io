"use client"

import dynamic from "next/dynamic"
import { ReactNode, useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeTransitionOverlay } from "@/components/theme-transition-overlay"
import { RoutePerformanceGuard } from "@/components/route-performance-guard"

const InteractiveCompanion = dynamic(
  () => import("@/components/blog/interactive-companion").then((module) => module.InteractiveCompanion),
  { ssr: false },
)

type IdleHandle =
  | { kind: "idle"; id: number }
  | { kind: "timeout"; id: ReturnType<typeof setTimeout> }
  | { kind: "none" }

const runAfterInitialIdle = (callback: () => void): IdleHandle => {
  if (typeof window === "undefined") return { kind: "none" }

  if (typeof window.requestIdleCallback === "function") {
    return { kind: "idle", id: window.requestIdleCallback(callback, { timeout: 1800 }) }
  }

  return { kind: "timeout", id: setTimeout(callback, 900) }
}

const cancelInitialIdleRun = (handle: IdleHandle) => {
  if (typeof window === "undefined") return

  if (handle.kind === "idle" && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(handle.id)
    return
  }

  if (handle.kind === "timeout") {
    clearTimeout(handle.id)
  }
}

function IdleInteractiveCompanion() {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const handle = runAfterInitialIdle(() => setShouldMount(true))
    return () => cancelInitialIdleRun(handle)
  }, [])

  return shouldMount ? <InteractiveCompanion /> : null
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RoutePerformanceGuard />
      <ThemeTransitionOverlay />
      {children}
      <IdleInteractiveCompanion />
    </ThemeProvider>
  )
}

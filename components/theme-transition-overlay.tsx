"use client"

import { useEffect, useState } from "react"

type ThemeDirection = "light" | "dark"

interface ThemeTransitionEventDetail {
  theme?: ThemeDirection
}

const transitionDuration = 950

export function ThemeTransitionOverlay() {
  const [direction, setDirection] = useState<ThemeDirection | null>(null)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const handleThemeTransition = (event: Event) => {
      const nextTheme = (event as CustomEvent<ThemeTransitionEventDetail>).detail?.theme
      const safeTheme = nextTheme === "dark" ? "dark" : "light"

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      setDirection(null)
      requestAnimationFrame(() => {
        setDirection(safeTheme)
        timeoutId = setTimeout(() => setDirection(null), transitionDuration)
      })
    }

    window.addEventListener("qaq-theme-transition", handleThemeTransition)

    return () => {
      window.removeEventListener("qaq-theme-transition", handleThemeTransition)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`theme-transition-overlay${direction ? " is-active" : ""}${
        direction ? ` theme-transition-overlay--${direction}` : ""
      }`}
    >
      <div className="theme-transition-sweep" />
      <div className="theme-transition-spark theme-transition-spark--one" />
      <div className="theme-transition-spark theme-transition-spark--two" />
      <div className="theme-transition-spark theme-transition-spark--three" />
    </div>
  )
}

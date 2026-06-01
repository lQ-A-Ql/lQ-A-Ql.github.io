"use client"

import { useEffect, useState } from "react"
import { themeTransitionEvent } from "@/lib/client-events"

type ThemeDirection = "light" | "dark"

interface ThemeTransitionEventDetail {
  theme?: ThemeDirection
}

const transitionDuration = 950

export function ThemeTransitionOverlay() {
  const [direction, setDirection] = useState<ThemeDirection | null>(null)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let frameId: number | undefined

    const handleThemeTransition = (event: Event) => {
      const nextTheme = (event as CustomEvent<ThemeTransitionEventDetail>).detail?.theme
      const safeTheme = nextTheme === "dark" ? "dark" : "light"

      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      setDirection(null)
      frameId = requestAnimationFrame(() => {
        setDirection(safeTheme)
        timeoutId = setTimeout(() => setDirection(null), transitionDuration)
      })
    }

    window.addEventListener(themeTransitionEvent, handleThemeTransition)

    return () => {
      window.removeEventListener(themeTransitionEvent, handleThemeTransition)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (frameId) {
        cancelAnimationFrame(frameId)
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
      {direction ? (
        <>
          <div className="theme-transition-curtain" />
          <div className="theme-transition-ribbon" />
          <div className="theme-transition-sticker theme-transition-sticker--moon" data-label="MOON" />
          <div className="theme-transition-sticker theme-transition-sticker--heart" data-label="LOVE" />
          <div className="theme-transition-sticker theme-transition-sticker--star" data-label="STAR" />
        </>
      ) : null}
    </div>
  )
}

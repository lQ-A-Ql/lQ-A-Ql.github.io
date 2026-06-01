"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { routeTransitionClassName, routeTransitionEndEvent, routeTransitionStartEvent } from "@/lib/client-events"

const transitionBudget = 700

export function RoutePerformanceGuard() {
  const pathname = usePathname()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const clearTransitionState = () => {
      document.documentElement.classList.remove(routeTransitionClassName)
      window.dispatchEvent(new CustomEvent(routeTransitionEndEvent))
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    const markTransitionState = () => {
      document.documentElement.classList.add(routeTransitionClassName)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(clearTransitionState, transitionBudget)
    }

    const getInternalNavigationAnchor = (event: MouseEvent | PointerEvent) => {
      if (
        event.defaultPrevented ||
        ("button" in event && event.button !== 0) ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return null
      }

      const target = event.target
      if (!(target instanceof Element)) return null

      const anchor = target.closest<HTMLAnchorElement>("a[href]")
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return null

      let url: URL
      try {
        url = new URL(anchor.href)
      } catch {
        return null
      }

      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return null

      return anchor
    }

    const handleNavigationIntent = (event: MouseEvent | PointerEvent) => {
      if (getInternalNavigationAnchor(event)) {
        document.documentElement.classList.add(routeTransitionClassName)
        markTransitionState()
      }
    }

    window.addEventListener(routeTransitionStartEvent, markTransitionState)
    document.addEventListener("pointerdown", handleNavigationIntent, true)
    document.addEventListener("click", handleNavigationIntent, true)

    return () => {
      window.removeEventListener(routeTransitionStartEvent, markTransitionState)
      document.removeEventListener("pointerdown", handleNavigationIntent, true)
      document.removeEventListener("click", handleNavigationIntent, true)
      clearTransitionState()
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.documentElement.classList.remove(routeTransitionClassName)
    }, 120)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}

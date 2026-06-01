"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useMemo, useState } from "react"
import { siteConfig } from "@/lib/blog-data"

const heroBg = siteConfig.heroBackground
const lightBg = "/light-theme-bg.webp"

interface BackgroundConfig {
  gradient: string
  opacity: number
  radial: string
  vignette: string
}

const pageBackgrounds: Record<string, BackgroundConfig> = {
  "/search/": {
    gradient: "linear-gradient(rgba(10,8,18,0.68), rgba(7,7,14,0.9))",
    opacity: 0.65,
    radial: "radial-gradient(circle_at_50%_8%,rgba(255,146,214,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(176,118,255,0.14),transparent_21%),radial-gradient(circle_at_18%_72%,rgba(255,96,170,0.1),transparent_19%),radial-gradient(circle_at_58%_42%,rgba(255,210,240,0.05),transparent_26%)",
    vignette: "radial-gradient(circle_at_center,transparent_42%,rgba(5,5,10,0.14)_72%,rgba(4,4,8,0.38)_100%)",
  },
  "/archive/": {
    gradient: "linear-gradient(rgba(10,8,18,0.68), rgba(7,7,14,0.9))",
    opacity: 0.65,
    radial: "radial-gradient(circle_at_50%_8%,rgba(255,146,214,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(176,118,255,0.14),transparent_21%),radial-gradient(circle_at_18%_72%,rgba(255,96,170,0.1),transparent_19%),radial-gradient(circle_at_58%_42%,rgba(255,210,240,0.05),transparent_26%)",
    vignette: "radial-gradient(circle_at_center,transparent_42%,rgba(5,5,10,0.14)_72%,rgba(4,4,8,0.38)_100%)",
  },
  "/friends/": {
    gradient: "linear-gradient(rgba(10,8,18,0.68), rgba(7,7,14,0.9))",
    opacity: 0.65,
    radial: "radial-gradient(circle_at_50%_8%,rgba(255,146,214,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(176,118,255,0.14),transparent_21%),radial-gradient(circle_at_18%_72%,rgba(255,96,170,0.1),transparent_19%),radial-gradient(circle_at_58%_42%,rgba(255,210,240,0.05),transparent_26%)",
    vignette: "radial-gradient(circle_at_center,transparent_42%,rgba(5,5,10,0.14)_72%,rgba(4,4,8,0.38)_100%)",
  },
}

interface ResolvedBackground {
  config: BackgroundConfig
  kind: "search" | "archive" | "friends" | "post"
  pathname: string
}

function getPostConfig(): BackgroundConfig {
  return {
    gradient: "linear-gradient(rgba(10,8,18,0.64), rgba(7,7,14,0.88))",
    opacity: 0.65,
    radial: "radial-gradient(circle_at_50%_8%,rgba(255,146,214,0.22),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(176,118,255,0.16),transparent_21%),radial-gradient(circle_at_18%_72%,rgba(255,96,170,0.12),transparent_19%),radial-gradient(circle_at_58%_42%,rgba(255,210,240,0.06),transparent_26%)",
    vignette: "radial-gradient(circle_at_center,transparent_42%,rgba(5,5,10,0.18)_72%,rgba(4,4,8,0.44)_100%)",
  }
}

function normalizePathname(pathname: string) {
  return pathname.endsWith("/") ? pathname : `${pathname}/`
}

function resolveBackground(pathname: string): ResolvedBackground | null {
  const normalizedPathname = normalizePathname(pathname)
  const config = pageBackgrounds[normalizedPathname]
  if (config) {
    return {
      config,
      kind: normalizedPathname.startsWith("/archive/")
        ? "archive"
        : normalizedPathname.startsWith("/friends/")
          ? "friends"
          : "search",
      pathname: normalizedPathname,
    }
  }

  if (normalizedPathname.startsWith("/post/")) {
    return {
      config: getPostConfig(),
      kind: "post",
      pathname: normalizedPathname,
    }
  }

  return null
}

export function PageBackground() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [renderedBackground, setRenderedBackground] = useState<ResolvedBackground>(
    () => resolveBackground("/search/")!
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentBackground = useMemo(() => resolveBackground(pathname), [pathname])
  const activeBackground = currentBackground
  const config = (activeBackground ?? renderedBackground).config

  useEffect(() => {
    if (activeBackground) {
      setRenderedBackground(activeBackground)
    }
  }, [activeBackground])

  const isLightTheme = isMounted && resolvedTheme === "light"
  const isVisible = Boolean(activeBackground)
  const darkBackgroundImage = `${config.gradient}, url('${heroBg}')`
  const lightBackgroundImage = `linear-gradient(90deg, rgba(255,245,250,0.78), rgba(255,236,247,0.34) 46%, rgba(255,245,250,0.7)), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,239,248,0.56) 74%, rgba(255,244,250,0.9)), url('${lightBg}')`
  const lightRadial =
    "radial-gradient(circle_at_14%_16%,rgba(255,142,199,0.16),transparent_18%),radial-gradient(circle_at_72%_20%,rgba(216,180,254,0.14),transparent_22%),radial-gradient(circle_at_58%_62%,rgba(255,255,255,0.18),transparent_26%)"
  const lightVignette = "linear-gradient(180deg,rgba(255,246,251,0.12),rgba(255,236,247,0.5))"

  return (
    <div
      className={`page-bg-root pointer-events-none fixed inset-0 z-[1] page-bg-root--${activeBackground?.kind ?? renderedBackground.kind}${isVisible ? " is-visible" : ""}`}
    >
      <div
        className={`page-bg-layer page-bg-layer--dark${isVisible && !isLightTheme ? " is-active" : ""}`}
        style={{
          opacity: isVisible && !isLightTheme ? config.opacity : 0,
          backgroundImage: darkBackgroundImage,
        }}
      />
      <div
        className={`page-bg-layer page-bg-layer--light${isVisible && isLightTheme ? " is-active" : ""}`}
        style={{
          backgroundImage: lightBackgroundImage,
        }}
      />
      <div
        className={`page-bg-radial page-bg-radial--dark${isVisible && !isLightTheme ? " is-active" : ""}`}
        style={{ backgroundImage: config.radial }}
      />
      <div
        className={`page-bg-radial page-bg-radial--light${isVisible && isLightTheme ? " is-active" : ""}`}
        style={{ backgroundImage: lightRadial }}
      />
      <div
        className={`page-bg-vignette page-bg-vignette--dark${isVisible && !isLightTheme ? " is-active" : ""}`}
        style={{ backgroundImage: config.vignette }}
      />
      <div
        className={`page-bg-vignette page-bg-vignette--light${isVisible && isLightTheme ? " is-active" : ""}`}
        style={{ backgroundImage: lightVignette }}
      />
    </div>
  )
}

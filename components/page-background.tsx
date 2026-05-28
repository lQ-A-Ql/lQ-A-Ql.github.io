"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/blog-data"

const heroBg = siteConfig.heroBackground

const pageBackgrounds: Record<string, { gradient: string; opacity: number }> = {
  "/search": {
    gradient: "linear-gradient(rgba(10,8,18,0.68), rgba(7,7,14,0.9))",
    opacity: 0.65,
  },
  "/archive": {
    gradient: "linear-gradient(rgba(10,8,18,0.68), rgba(7,7,14,0.9))",
    opacity: 0.65,
  },
}

function getPostBackground() {
  return {
    gradient: "linear-gradient(rgba(10,8,18,0.64), rgba(7,7,14,0.88))",
    opacity: 0.65,
  }
}

export function PageBackground() {
  const pathname = usePathname()

  let config = pageBackgrounds[pathname]
  if (!config && pathname.startsWith("/post/")) {
    config = getPostBackground()
  }
  if (!config) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: config.opacity,
        backgroundImage: `${config.gradient}, url('${heroBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    />
  )
}

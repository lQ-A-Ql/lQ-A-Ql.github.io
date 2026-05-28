"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/blog-data"

const heroBg = siteConfig.heroBackground

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
}

function getPostConfig(): BackgroundConfig {
  return {
    gradient: "linear-gradient(rgba(10,8,18,0.64), rgba(7,7,14,0.88))",
    opacity: 0.65,
    radial: "radial-gradient(circle_at_50%_8%,rgba(255,146,214,0.22),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(176,118,255,0.16),transparent_21%),radial-gradient(circle_at_18%_72%,rgba(255,96,170,0.12),transparent_19%),radial-gradient(circle_at_58%_42%,rgba(255,210,240,0.06),transparent_26%)",
    vignette: "radial-gradient(circle_at_center,transparent_42%,rgba(5,5,10,0.18)_72%,rgba(4,4,8,0.44)_100%)",
  }
}

export function PageBackground() {
  const pathname = usePathname()

  let config = pageBackgrounds[pathname]
  if (!config && pathname.startsWith("/post/")) {
    config = getPostConfig()
  }
  if (!config) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      <div
        className="absolute inset-0"
        style={{
          opacity: config.opacity,
          backgroundImage: `${config.gradient}, url('${heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: config.radial }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: config.vignette }}
      />
    </div>
  )
}

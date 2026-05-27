"use client"

import { type CSSProperties, type PropsWithChildren, useId } from "react"
import { cn } from "@/lib/utils"

type LiquidGlassProps = PropsWithChildren<{
  className?: string
  contentClassName?: string
  style?: CSSProperties
  variant?: "soft" | "strong"
}>

export function LiquidGlass({
  children,
  className,
  contentClassName,
  style,
  variant = "soft",
}: LiquidGlassProps) {
  const filterId = `liquid-glass-${useId().replace(/:/g, "")}`
  const isStrong = variant === "strong"

  return (
    <div className={cn("relative isolate overflow-hidden", className)} style={style}>
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter
            id={filterId}
            x="-35%"
            y="-35%"
            width="170%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={isStrong ? "0.018 0.05" : "0.014 0.04"}
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur={isStrong ? "14s" : "18s"}
                values={
                  isStrong
                    ? "0.018 0.05;0.024 0.062;0.018 0.05"
                    : "0.014 0.04;0.019 0.052;0.014 0.04"
                }
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feGaussianBlur in="noise" stdDeviation={isStrong ? "0.95" : "0.7"} result="softNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softNoise"
              scale={isStrong ? "38" : "28"}
              xChannelSelector="R"
              yChannelSelector="G"
              result="warp"
            />
            <feGaussianBlur in="warp" stdDeviation="0.24" />
          </filter>
        </defs>
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius: "inherit",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05) 24%, rgba(255,255,255,0.015) 54%, rgba(255,255,255,0.11) 82%, rgba(255,255,255,0.03))," +
            "linear-gradient(180deg, rgba(48,24,60,0.10), rgba(16,10,24,0.04))",
          border: "1px solid rgba(255,255,255,0.16)",
          backdropFilter: `blur(${isStrong ? 18 : 14}px) saturate(${isStrong ? 180 : 165}%) brightness(${isStrong ? 1.1 : 1.08}) contrast(${isStrong ? 1.18 : 1.14})`,
          WebkitBackdropFilter: `blur(${isStrong ? 18 : 14}px) saturate(${isStrong ? 180 : 165}%) brightness(${isStrong ? 1.1 : 1.08}) contrast(${isStrong ? 1.18 : 1.14})`,
          filter: `url(#${filterId})`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.26), inset 0 -1px 0 rgba(255,255,255,0.05), 0 12px 28px rgba(0,0,0,0.14), 0 0 28px rgba(235,99,197,0.06)",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] z-[1] animate-liquid-sheen"
        style={{
          borderRadius: "inherit",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.08) 16%, rgba(255,255,255,0.015) 44%, rgba(255,255,255,0) 72%)," +
            "radial-gradient(ellipse at top, rgba(255,255,255,0.16), transparent 58%)," +
            "radial-gradient(ellipse at bottom, rgba(255,255,255,0.06), transparent 50%)",
          mixBlendMode: "screen",
          opacity: isStrong ? 0.92 : 0.8,
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] animate-liquid-drift"
        style={{
          borderRadius: "inherit",
          background:
            "radial-gradient(circle at 14% 20%, rgba(255,255,255,0.14), transparent 14%)," +
            "radial-gradient(circle at 78% 18%, rgba(255,255,255,0.1), transparent 12%)," +
            "radial-gradient(circle at 50% 110%, rgba(255,255,255,0.08), transparent 22%)",
          mixBlendMode: "screen",
          opacity: 0.75,
        }}
      />

      <div className={cn("relative z-[2]", contentClassName)}>{children}</div>
    </div>
  )
}

"use client"

import { type CSSProperties, type PropsWithChildren } from "react"
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
  const isStrong = variant === "strong"

  return (
    <div
      className={cn(
        "liquid-shell relative isolate overflow-hidden",
        isStrong ? "liquid-shell-strong" : "liquid-shell-soft",
        className,
      )}
      style={style}
    >
      <span aria-hidden="true" className="liquid-backdrop absolute inset-0 z-0" />
      <span aria-hidden="true" className="liquid-distortion absolute inset-0 z-[1]" />
      <span aria-hidden="true" className="liquid-highlight absolute inset-[1px] z-[2]" />
      <span aria-hidden="true" className="liquid-caustic absolute inset-0 z-[2]" />
      <div className={cn("relative z-[3]", contentClassName)}>{children}</div>
    </div>
  )
}

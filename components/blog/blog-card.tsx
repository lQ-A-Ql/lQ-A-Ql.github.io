"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface BlogCardProps {
  id?: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  imageUrl?: string
  index: number
}

export function BlogCard({
  id,
  title,
  excerpt,
  date,
  readTime,
  category,
  imageUrl,
  index,
}: BlogCardProps) {
  const entryCode = `ENTRY ${String(index + 1).padStart(2, "0")}`

  const content = (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
      style={{ cursor: id ? "pointer" : "default" }}
    >
      <Card className="group relative h-full cursor-pointer overflow-hidden rounded-[1.9rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06)_16%,rgba(22,14,34,0.34)_46%,rgba(12,9,20,0.46)_100%)] py-0 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-[18px] transition-all duration-500 hover:border-primary/24 hover:shadow-[0_0_40px_rgba(235,99,197,0.12),0_18px_48px_rgba(0,0,0,0.26)]">
        <div className="pointer-events-none absolute inset-[-1px] rounded-[1.95rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.48),rgba(255,255,255,0.1)_14%,rgba(255,255,255,0)_34%)] opacity-90" />
        <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.16),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.12),transparent_35%)] opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-[12%] top-0 h-[42%] rounded-b-[50%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.3),rgba(255,255,255,0.08)_46%,transparent_76%)] opacity-95" />
        <div className="pointer-events-none absolute inset-x-[16%] bottom-[-10%] h-[32%] rounded-t-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_72%)] opacity-76" />
        <div className="pointer-events-none absolute -inset-[140%] z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute left-1/2 top-1/2 h-[150%] w-16 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(193,106,243,0.58)_42%,rgba(193,106,243,0.58)_58%,rgba(255,255,255,0)_100%)] blur-[14px] animate-spin-slow" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.018)_62%,transparent)] opacity-100" />
        <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-10px_28px_rgba(0,0,0,0.04)]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[1.85rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.024)_42%,transparent_70%)] opacity-82" />

        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,18,0.04)_0%,rgba(10,8,18,0.16)_28%,rgba(10,8,18,0.84)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />

            <div className="absolute top-4 left-4">
              <span className="rounded-full border border-primary/24 bg-background/30 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-primary backdrop-blur-md">
                {category}
              </span>
            </div>
            <span className="absolute top-4 right-4 text-[11px] uppercase tracking-[0.24em] text-white/46">{entryCode}</span>
          </div>
        )}

        <div className="relative flex h-full flex-col p-6">
          {!imageUrl && (
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="inline-flex rounded-full border border-primary/22 bg-primary/8 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-primary shadow-[0_0_18px_rgba(235,99,197,0.08)] backdrop-blur-md">
                {category}
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/42">{entryCode}</span>
            </div>
          )}

          <h3 className="mb-4 line-clamp-2 text-[1.35rem] font-bold leading-[1.35] text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          <p className="mb-6 line-clamp-4 text-sm leading-7 text-white/72">{excerpt}</p>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/8 pt-4">
            <div className="space-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-primary/62" />
                {date}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 text-primary/62" />
                {readTime} 阅读
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="opacity-80 transition-opacity duration-300 group-hover:opacity-100">继续查看</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-6 right-6 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </Card>
    </motion.div>
  )

  if (!id) {
    return content
  }

  return (
    <Link href={`/post/${id}/`} className="block h-full">
      {content}
    </Link>
  )
}

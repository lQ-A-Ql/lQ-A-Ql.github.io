"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react"

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
    <motion.article
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.9rem] border border-white/6 bg-transparent backdrop-blur-[26px] transition-all duration-500 hover:-translate-y-2 hover:border-primary/10 hover:shadow-[0_0_12px_rgba(235,99,197,0.04)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.1,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.002)_62%,transparent)] opacity-40" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-28 transition-opacity duration-500 group-hover:opacity-56" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.01),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.01),transparent_28%)] opacity-18 transition-opacity duration-500 group-hover:opacity-30" />
      <div className="pointer-events-none absolute -inset-[140%] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-1/2 top-1/2 h-[150%] w-14 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(193,106,243,0.48)_42%,rgba(193,106,243,0.48)_58%,rgba(255,255,255,0)_100%)] blur-[14px] animate-spin-slow" />
      </div>

      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,18,0.02)_0%,rgba(10,8,18,0.1)_28%,rgba(10,8,18,0.72)_100%)]" />

          <div className="absolute top-4 left-4">
            <span className="rounded-full border border-primary/24 bg-transparent px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-primary backdrop-blur-sm">
              {category}
            </span>
          </div>
          <span className="absolute top-4 right-4 text-[11px] uppercase tracking-[0.24em] text-white/42">{entryCode}</span>
        </div>
      )}

      <div className="relative flex h-full flex-col p-6">
        {!imageUrl && (
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/[0.05] pb-4">
            <span className="inline-flex rounded-full border border-primary/22 bg-transparent px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-primary backdrop-blur-sm">
              {category}
            </span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/38">{entryCode}</span>
          </div>
        )}

        <h3 className="mb-4 line-clamp-2 text-[1.35rem] font-bold leading-[1.35] text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        <p className="mb-6 line-clamp-4 text-sm leading-7 text-white/78 [text-shadow:0_1px_10px_rgba(0,0,0,0.12)]">
          {excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/[0.02] pt-4">
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

      <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-[1px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
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

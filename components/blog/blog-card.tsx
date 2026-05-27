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
      whileHover={{ y: -6 }}
      style={{ cursor: id ? "pointer" : "default" }}
    >
      <Card className="group relative h-full cursor-pointer overflow-hidden rounded-[1.75rem] border-white/10 bg-[linear-gradient(180deg,rgba(26,16,36,0.88),rgba(18,11,28,0.72))] py-0 shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-all duration-500 hover:border-primary/32 hover:shadow-[0_0_34px_rgba(235,99,197,0.12),0_16px_48px_rgba(0,0,0,0.32)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.14),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.12),transparent_32%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,18,0.08)_0%,rgba(10,8,18,0.2)_32%,rgba(10,8,18,0.78)_100%)]" />

            <div className="absolute top-4 left-4">
              <span className="rounded-full border border-primary/24 bg-background/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                {category}
              </span>
            </div>
            <span className="absolute top-4 right-4 text-[11px] uppercase tracking-[0.24em] text-white/42">{entryCode}</span>
          </div>
        )}

        <div className="relative flex h-full flex-col p-6">
          {!imageUrl && (
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-primary/22 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                {category}
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/42">{entryCode}</span>
            </div>
          )}

          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          <p className="mb-6 line-clamp-3 text-sm leading-7 text-white/62">{excerpt}</p>

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
              <span className="opacity-75 transition-opacity duration-300 group-hover:opacity-100">继续查看</span>
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

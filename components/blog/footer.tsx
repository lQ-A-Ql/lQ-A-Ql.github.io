"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Link2 } from "lucide-react"
import { staggerContainer, fadeUpVariant } from "./page-transition"
import { categories, siteConfig } from "@/lib/blog-data"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[linear-gradient(180deg,rgba(16,10,24,0.96),rgba(10,8,18,1))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,132,190,0.08),transparent_34%)]" />
      <motion.div
        className="relative mx-auto max-w-6xl px-6 py-10 md:py-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div variants={fadeUpVariant} className="max-w-md">
            <h3 className="mb-3 text-xl font-bold tracking-[0.18em] text-white">
              <span className="text-primary" style={{ textShadow: "0 0 12px rgba(235,99,197,0.25)" }}>
                {siteConfig.title.slice(0, 1)}
              </span>
              {siteConfig.title.slice(1)}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              记录实战中的流量、取证、逆向与赛题分析，尽量把每篇内容压缩成可直接复用的经验片段。
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex flex-col gap-3 md:items-center">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">Quick Links</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/archive" className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                所有文章
              </Link>
              {categories.filter((item) => item !== "全部").map((category) => (
                <Link
                  key={category}
                  href={`/search?category=${encodeURIComponent(category)}`}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="md:text-right">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/40">Reach Out</p>
            <div className="flex gap-3 md:justify-end">
              <motion.a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-muted-foreground transition-all hover:border-primary/24 hover:bg-primary/10 hover:text-primary"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="/search"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-muted-foreground transition-all hover:border-primary/24 hover:bg-primary/10 hover:text-primary"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link2 className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex flex-col gap-2 border-t border-white/8 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© 2026 {siteConfig.title}. Security notes, traffic traces, and incident writeups.</p>
          <p className="text-white/42">Built for readable evidence, not ornamental noise.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

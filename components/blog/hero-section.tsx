"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Search } from "lucide-react"
import { siteConfig, categories } from "@/lib/blog-data"

const floatingParticles = [
  { id: 1, left: "8%", top: "22%", size: 7, duration: 15, delay: 0.3, opacity: 0.32 },
  { id: 2, left: "16%", top: "64%", size: 4, duration: 18, delay: 1.2, opacity: 0.24 },
  { id: 3, left: "28%", top: "14%", size: 5, duration: 16, delay: 0.8, opacity: 0.28 },
  { id: 4, left: "35%", top: "52%", size: 6, duration: 20, delay: 1.6, opacity: 0.22 },
  { id: 5, left: "42%", top: "28%", size: 4, duration: 17, delay: 0.4, opacity: 0.26 },
  { id: 6, left: "55%", top: "18%", size: 7, duration: 21, delay: 0.9, opacity: 0.2 },
  { id: 7, left: "62%", top: "46%", size: 5, duration: 19, delay: 1.4, opacity: 0.3 },
  { id: 8, left: "74%", top: "24%", size: 6, duration: 22, delay: 0.2, opacity: 0.25 },
  { id: 9, left: "84%", top: "56%", size: 5, duration: 18, delay: 1.1, opacity: 0.27 },
  { id: 10, left: "92%", top: "18%", size: 4, duration: 16, delay: 0.6, opacity: 0.24 },
] as const

export function HeroSection() {
  return (
    <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden pt-24 pb-14 md:min-h-[88vh] md:pt-28 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,136,191,0.14),transparent_32%),linear-gradient(180deg,rgba(12,8,18,0.02)_0%,rgba(12,8,18,0.14)_38%,rgba(12,8,18,0.46)_76%,rgba(12,8,18,0.8)_100%)]" />

      {floatingParticles.map((particle) => (
        <motion.span
          key={particle.id}
          className="pointer-events-none absolute rounded-full bg-primary"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: "0 0 18px rgba(235,99,197,0.45)",
          }}
          animate={{ y: [0, -16, 0], opacity: [particle.opacity, particle.opacity + 0.12, particle.opacity] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-[14%] left-[14%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-primary/14 to-transparent blur-[100px] animate-pulse" />
        <div className="absolute right-[10%] bottom-[18%] h-[340px] w-[340px] rounded-full bg-gradient-to-tl from-accent/12 to-transparent blur-[90px] animate-pulse delay-1000" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="pointer-events-none absolute inset-x-[18%] top-[20%] h-[260px] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,145,205,0.12),rgba(255,145,205,0.02)_42%,transparent_72%)] blur-[42px]" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative text-center">
          <motion.div
            className="liquid-glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/68"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(235,99,197,0.55)]" />
            Security Notes / Traffic Traces
          </motion.div>

          <div className="mb-5 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-55 blur-sm" />
              <div
                className="absolute inset-0 -m-5 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 animate-spin-slow opacity-35 blur-md"
                style={{ animationDirection: "reverse", animationDuration: "12s" }}
              />
              <div className="liquid-glass relative rounded-[2.1rem] p-3 md:p-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-[1.55rem] border border-white/10 shadow-[0_0_60px_rgba(235,99,197,0.25),0_0_110px_rgba(235,99,197,0.08)] transition-shadow duration-500 hover:shadow-[0_0_86px_rgba(235,99,197,0.46),0_0_160px_rgba(235,99,197,0.16)] md:h-28 md:w-28">
                  <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="h-full w-full object-cover" />
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                className="text-center text-5xl font-bold tracking-[0.12em] md:text-left md:text-7xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ textShadow: "0 0 22px rgba(235,99,197,0.18), 0 0 72px rgba(235,99,197,0.06)" }}
              >
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  {siteConfig.title}
                </span>
              </motion.h1>
              <motion.p
                className="liquid-glass mx-auto inline-flex max-w-md rounded-full px-4 py-2 text-sm leading-relaxed text-white/68 md:mx-0 md:text-left"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42, duration: 0.75 }}
              >
                威胁流量 / 入侵检测 / 应急取证 / 赛题复盘
              </motion.p>
            </div>
          </div>

          <motion.div
            className="relative mx-auto max-w-2xl space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="liquid-glass mx-auto inline-flex max-w-fit rounded-[1.6rem] px-5 py-3">
              <p className="text-base leading-relaxed text-white/90 md:text-lg">{siteConfig.description}</p>
            </div>
            <p className="text-sm text-white/72 md:text-[15px]">{siteConfig.shortDescription}</p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {categories.filter((item) => item !== "全部").map((category, index) => (
              <motion.span
                key={category}
                className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-primary/82 transition-all hover:border-primary/45 hover:bg-primary/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.65 }}
          >
            <a
              href="#posts"
              className="liquid-glass liquid-glass-strong inline-flex items-center gap-2 rounded-full border-primary/30 px-5 py-3 text-sm text-white transition-all hover:border-primary/55"
            >
              查看文章
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/search"
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white/82 transition-all hover:border-primary/28 hover:text-primary"
            >
              <Search className="h-4 w-4" />
              进入搜索
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <ChevronDown className="h-4 w-4 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

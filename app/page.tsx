"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Archive, Github, Search } from "lucide-react"
import { Header } from "@/components/blog/header"
import { HeroSection } from "@/components/blog/hero-section"
import { BlogCard } from "@/components/blog/blog-card"
import { Footer } from "@/components/blog/footer"
import {
  PageTransition,
  staggerContainer,
  fadeUpVariant,
  scaleUpVariant,
} from "@/components/blog/page-transition"
import { blogPosts, siteConfig } from "@/lib/blog-data"

const postsParticles = [
  { id: 1, left: "6%", top: "10%", size: 6, duration: 11, delay: 0.4, opacity: 0.56 },
  { id: 2, left: "14%", top: "18%", size: 4, duration: 9, delay: 1.3, opacity: 0.46 },
  { id: 3, left: "21%", top: "12%", size: 7, duration: 13, delay: 0.8, opacity: 0.54 },
  { id: 4, left: "29%", top: "28%", size: 5, duration: 10, delay: 1.7, opacity: 0.4 },
  { id: 5, left: "37%", top: "9%", size: 6, duration: 12, delay: 0.2, opacity: 0.48 },
  { id: 6, left: "44%", top: "22%", size: 4, duration: 8, delay: 1.1, opacity: 0.44 },
  { id: 7, left: "53%", top: "13%", size: 7, duration: 14, delay: 0.9, opacity: 0.4 },
  { id: 8, left: "61%", top: "26%", size: 5, duration: 10, delay: 0.6, opacity: 0.46 },
  { id: 9, left: "70%", top: "16%", size: 6, duration: 12, delay: 1.5, opacity: 0.54 },
  { id: 10, left: "79%", top: "24%", size: 4, duration: 9, delay: 0.7, opacity: 0.42 },
  { id: 11, left: "88%", top: "14%", size: 6, duration: 11, delay: 1.8, opacity: 0.5 },
  { id: 12, left: "11%", top: "46%", size: 5, duration: 13, delay: 0.5, opacity: 0.38 },
  { id: 13, left: "24%", top: "58%", size: 7, duration: 10, delay: 1.2, opacity: 0.42 },
  { id: 14, left: "39%", top: "64%", size: 5, duration: 12, delay: 0.3, opacity: 0.36 },
  { id: 15, left: "56%", top: "52%", size: 6, duration: 11, delay: 1.6, opacity: 0.4 },
  { id: 16, left: "72%", top: "60%", size: 5, duration: 13, delay: 0.9, opacity: 0.38 },
  { id: 17, left: "84%", top: "54%", size: 6, duration: 10, delay: 1.4, opacity: 0.42 },
  { id: 18, left: "93%", top: "68%", size: 4, duration: 9, delay: 0.6, opacity: 0.34 },
] as const

const postsSparkles = [
  { id: 1, left: "10%", top: "14%", size: 18, duration: 8, delay: 0.3, rotate: 8, opacity: 0.62 },
  { id: 2, left: "22%", top: "48%", size: 14, duration: 7, delay: 1.1, rotate: -6, opacity: 0.5 },
  { id: 3, left: "36%", top: "18%", size: 20, duration: 9, delay: 0.7, rotate: 14, opacity: 0.58 },
  { id: 4, left: "53%", top: "58%", size: 16, duration: 8, delay: 1.5, rotate: -10, opacity: 0.46 },
  { id: 5, left: "68%", top: "26%", size: 18, duration: 10, delay: 0.2, rotate: 6, opacity: 0.56 },
  { id: 6, left: "82%", top: "16%", size: 15, duration: 7, delay: 1.3, rotate: -12, opacity: 0.5 },
  { id: 7, left: "88%", top: "52%", size: 20, duration: 9, delay: 0.8, rotate: 10, opacity: 0.48 },
] as const

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[88vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${siteConfig.heroBackground}')`,
              backgroundPosition: "center 18%",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.01)_0%,rgba(8,8,16,0.08)_24%,rgba(8,8,16,0.2)_52%,rgba(8,8,16,0.76)_86%,rgba(8,8,16,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,132,190,0.12),transparent_28%)]" />
        </div>

        <Header />
        <HeroSection />

        <section id="posts" className="relative z-10 overflow-hidden px-6 pt-24 pb-20 md:pt-28 md:pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-4 left-0 right-0 h-16 bg-gradient-to-b from-background/82 to-transparent" />
            <div
              className="absolute inset-0 opacity-100"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 4% 12%, rgba(255,255,255,0.98) 0 1.1px, transparent 1.9px),
                  radial-gradient(circle at 9% 24%, rgba(255,215,245,0.82) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 14% 7%, rgba(214,226,255,0.74) 0 1.4px, transparent 2.2px),
                  radial-gradient(circle at 18% 20%, rgba(255,255,255,0.86) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 23% 12%, rgba(255,204,241,0.76) 0 1.6px, transparent 2.3px),
                  radial-gradient(circle at 28% 28%, rgba(255,255,255,0.8) 0 1.1px, transparent 2px),
                  radial-gradient(circle at 34% 10%, rgba(201,228,255,0.72) 0 1.6px, transparent 2.3px),
                  radial-gradient(circle at 39% 22%, rgba(255,255,255,0.94) 0 1.1px, transparent 1.9px),
                  radial-gradient(circle at 45% 8%, rgba(255,188,232,0.72) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 50% 18%, rgba(255,255,255,0.84) 0 1px, transparent 1.9px),
                  radial-gradient(circle at 56% 10%, rgba(220,214,255,0.68) 0 1.4px, transparent 2.1px),
                  radial-gradient(circle at 62% 24%, rgba(255,255,255,0.78) 0 1.1px, transparent 2px),
                  radial-gradient(circle at 68% 12%, rgba(255,204,241,0.82) 0 1.5px, transparent 2.3px),
                  radial-gradient(circle at 74% 21%, rgba(255,255,255,0.88) 0 1px, transparent 1.9px),
                  radial-gradient(circle at 81% 9%, rgba(201,228,255,0.66) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 87% 18%, rgba(255,255,255,0.8) 0 1px, transparent 2px),
                  radial-gradient(circle at 93% 26%, rgba(255,188,232,0.7) 0 1.4px, transparent 2.1px),
                  radial-gradient(circle at 10% 46%, rgba(255,255,255,0.78) 0 1.1px, transparent 1.9px),
                  radial-gradient(circle at 19% 54%, rgba(220,214,255,0.62) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 27% 42%, rgba(255,255,255,0.7) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 36% 58%, rgba(255,204,241,0.62) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 44% 48%, rgba(255,255,255,0.72) 0 1.1px, transparent 1.9px),
                  radial-gradient(circle at 52% 64%, rgba(201,228,255,0.56) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 61% 50%, rgba(255,255,255,0.7) 0 1.1px, transparent 1.9px),
                  radial-gradient(circle at 69% 60%, rgba(255,188,232,0.56) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 78% 48%, rgba(255,255,255,0.72) 0 1.1px, transparent 1.9px),
                  radial-gradient(circle at 86% 62%, rgba(220,214,255,0.56) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 94% 54%, rgba(255,255,255,0.68) 0 1px, transparent 1.8px)
                `,
              }}
            />
            <div className="absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/8 via-accent/4 to-transparent blur-[100px]" />
            <div className="absolute top-[12%] left-[6%] h-[220px] w-[220px] rounded-full bg-primary/8 blur-[85px]" />
            <div className="absolute top-[22%] right-[4%] h-[260px] w-[260px] rounded-full bg-accent/6 blur-[105px]" />
            <div className="absolute bottom-[14%] left-[20%] h-[180px] w-[180px] rounded-full bg-white/4 blur-[80px]" />
            <div className="absolute bottom-[18%] right-[24%] h-[160px] w-[160px] rounded-full bg-primary/5 blur-[72px]" />
            <div className="absolute bottom-0 left-0 h-[320px] w-[620px] rounded-full bg-gradient-to-tr from-accent/7 to-transparent blur-[90px]" />
            <div className="absolute inset-x-0 top-[22%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-70" />
            <div className="absolute inset-x-[12%] top-[56%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,204,241,0.16),transparent)] opacity-60" />
            <div className="absolute left-[16%] top-[24%] h-24 w-24 rounded-full border border-white/8 opacity-40" />
            <div className="absolute right-[14%] top-[42%] h-20 w-20 rounded-full border border-primary/10 opacity-30" />
            <motion.div
              className="absolute left-[-4%] top-[28%] h-40 w-72 rounded-full border border-dashed border-white/10"
              animate={{ x: [0, 12, 0], rotate: [0, 4, 0], opacity: [0.18, 0.3, 0.18] }}
              transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-6%] top-[48%] h-52 w-80 rounded-full border border-dashed border-primary/10"
              animate={{ x: [0, -10, 0], rotate: [0, -5, 0], opacity: [0.14, 0.24, 0.14] }}
              transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-[36%] bottom-[8%] h-28 w-56 rounded-full border border-white/8"
              animate={{ y: [0, -8, 0], opacity: [0.14, 0.24, 0.14] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {postsParticles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute rounded-full bg-white animate-twinkle-soft"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  boxShadow: "0 0 14px rgba(255, 188, 232, 0.6), 0 0 34px rgba(123, 153, 255, 0.28)",
                }}
                animate={{
                  y: [0, -18, 0],
                  x: [0, 7, 0],
                  opacity: [particle.opacity, particle.opacity + 0.24, particle.opacity],
                  scale: [1, 1.22, 1],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}

            {postsSparkles.map((sparkle) => (
              <motion.span
                key={sparkle.id}
                className="posts-sparkle absolute"
                style={{
                  left: sparkle.left,
                  top: sparkle.top,
                  width: sparkle.size,
                  height: sparkle.size,
                  opacity: sparkle.opacity,
                  rotate: `${sparkle.rotate}deg`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [sparkle.opacity, sparkle.opacity + 0.22, sparkle.opacity],
                  scale: [1, 1.14, 1],
                  rotate: [`${sparkle.rotate}deg`, `${sparkle.rotate + 16}deg`, `${sparkle.rotate}deg`],
                }}
                transition={{
                  duration: sparkle.duration,
                  delay: sparkle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="mx-auto max-w-6xl">
            <motion.div
              className="relative z-10 mb-12 text-center md:mb-14"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                className="mb-4 text-4xl font-bold text-foreground md:text-5xl"
                variants={fadeUpVariant}
                style={{ textShadow: "0 0 30px rgba(235,99,197,0.15)" }}
              >
                最新文章
              </motion.h2>
              <motion.p className="mx-auto max-w-2xl text-lg text-muted-foreground" variants={fadeUpVariant}>
                围绕威胁流量、入侵检测、应急取证与赛题复盘，持续整理实战里真正有用的方法和过程。
              </motion.p>
            </motion.div>

            <motion.div
              className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {blogPosts.slice(0, 6).map((post, index) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  index={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  imageUrl={post.imageUrl}
                />
              ))}
            </motion.div>

            <motion.div
              className="relative z-10 mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/archive">
                <motion.div
                  className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/12 to-accent/10 px-8 py-3.5 text-primary transition-all duration-300 hover:from-primary/20 hover:to-accent/20"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236, 72, 153, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>查看全部文章</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden px-6 py-20 md:py-24">
          <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,169,0.05),transparent_50%)]" />

          <motion.div
            className="relative mx-auto max-w-6xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
              <motion.div
                className="group relative overflow-hidden rounded-[2rem] border border-white/[0.03] bg-transparent p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/[0.08] md:p-9"
                variants={fadeUpVariant}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/[0.02]" />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-24 transition-opacity duration-500 group-hover:opacity-44" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.008),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.008),transparent_28%)] opacity-12 transition-opacity duration-500 group-hover:opacity-22" />
                <div className="pointer-events-none absolute -inset-[140%] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-[150%] w-12 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(193,106,243,0.36)_42%,rgba(193,106,243,0.36)_58%,rgba(255,255,255,0)_100%)] blur-[12px] animate-spin-slow" />
                </div>

                <div className="relative z-10">
                  <h2
                    className="mb-4 text-3xl font-bold text-foreground md:text-4xl"
                    style={{ textShadow: "0 0 20px rgba(235,99,197,0.12)" }}
                  >
                    关于这个角落
                  </h2>
                  <p className="max-w-2xl leading-8 text-muted-foreground">
                    流量分析、入侵排查、CTF 复盘、安全工具开发——只记关键路径，不写废话。
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <motion.div
                      className="group/sub relative overflow-hidden rounded-[1.4rem] border border-white/[0.03] bg-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/[0.08]"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] border border-white/[0.02]" />
                      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 transition-opacity duration-300 group-hover/sub:opacity-40" />
                      <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/50">Write Style</p>
                      <p className="text-sm leading-7 text-white/74">
                        保留关键证据和可复现步骤，不堆背景废话。
                      </p>
                      <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover/sub:scale-x-100" />
                    </motion.div>
                    <motion.div
                      className="group/sub relative overflow-hidden rounded-[1.4rem] border border-white/[0.03] bg-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/[0.08]"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] border border-white/[0.02]" />
                      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 transition-opacity duration-300 group-hover/sub:opacity-40" />
                      <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/50">Focus Area</p>
                      <p className="text-sm leading-7 text-white/74">
                        威胁流量 · 入侵排查 · 取证 · CTF · 工具开发
                      </p>
                      <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover/sub:scale-x-100" />
                    </motion.div>
                  </div>
                </div>

                <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>

              <motion.aside
                className="group relative overflow-hidden rounded-[2rem] border border-white/[0.03] bg-transparent p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/[0.08]"
                variants={scaleUpVariant}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/[0.02]" />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-24 transition-opacity duration-500 group-hover:opacity-44" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.008),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.008),transparent_28%)] opacity-12 transition-opacity duration-500 group-hover:opacity-22" />
                <div className="pointer-events-none absolute -inset-[140%] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-[150%] w-12 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(193,106,243,0.36)_42%,rgba(193,106,243,0.36)_58%,rgba(255,255,255,0)_100%)] blur-[12px] animate-spin-slow" />
                </div>

                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-sm" />
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/12 shadow-[0_0_36px_rgba(235,99,197,0.2)]">
                      <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Author</p>
                    <p className="mt-1 text-xl font-semibold text-white">{siteConfig.author}</p>
                  </div>
                </div>

                <div className="relative z-10 space-y-3">
                  <Link
                    href="/archive"
                    className="group flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:border-primary/18 hover:bg-white/[0.06] hover:text-primary hover:shadow-[0_4px_20px_rgba(235,99,197,0.06)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Archive className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      进入归档
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/search"
                    className="group flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:border-primary/18 hover:bg-white/[0.06] hover:text-primary hover:shadow-[0_4px_20px_rgba(235,99,197,0.06)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      搜索文章
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:border-primary/18 hover:bg-white/[0.06] hover:text-primary hover:shadow-[0_4px_20px_rgba(235,99,197,0.06)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      GitHub
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}

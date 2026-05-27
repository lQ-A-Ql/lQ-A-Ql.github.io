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
  { id: 1, left: "8%", top: "12%", size: 5, duration: 11, delay: 0.4, opacity: 0.38 },
  { id: 2, left: "18%", top: "24%", size: 3, duration: 9, delay: 1.3, opacity: 0.28 },
  { id: 3, left: "27%", top: "16%", size: 6, duration: 13, delay: 0.8, opacity: 0.34 },
  { id: 4, left: "35%", top: "34%", size: 4, duration: 10, delay: 1.7, opacity: 0.24 },
  { id: 5, left: "46%", top: "10%", size: 5, duration: 12, delay: 0.2, opacity: 0.32 },
  { id: 6, left: "58%", top: "22%", size: 3, duration: 8, delay: 1.1, opacity: 0.3 },
  { id: 7, left: "66%", top: "14%", size: 6, duration: 14, delay: 0.9, opacity: 0.26 },
  { id: 8, left: "76%", top: "28%", size: 4, duration: 10, delay: 0.6, opacity: 0.3 },
  { id: 9, left: "86%", top: "18%", size: 5, duration: 12, delay: 1.5, opacity: 0.34 },
  { id: 10, left: "92%", top: "32%", size: 3, duration: 9, delay: 0.7, opacity: 0.26 },
  { id: 11, left: "12%", top: "48%", size: 4, duration: 11, delay: 1.8, opacity: 0.22 },
  { id: 12, left: "24%", top: "58%", size: 6, duration: 13, delay: 0.5, opacity: 0.28 },
  { id: 13, left: "41%", top: "66%", size: 4, duration: 10, delay: 1.2, opacity: 0.22 },
  { id: 14, left: "63%", top: "54%", size: 5, duration: 12, delay: 0.3, opacity: 0.3 },
  { id: 15, left: "82%", top: "62%", size: 4, duration: 11, delay: 1.6, opacity: 0.24 },
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
              className="absolute inset-0 opacity-95"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 8% 18%, rgba(255,255,255,0.95) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 16% 8%, rgba(255,204,241,0.72) 0 1.3px, transparent 2px),
                  radial-gradient(circle at 22% 30%, rgba(255,255,255,0.75) 0 1px, transparent 1.7px),
                  radial-gradient(circle at 31% 14%, rgba(215,199,255,0.64) 0 1.2px, transparent 2px),
                  radial-gradient(circle at 39% 24%, rgba(255,255,255,0.9) 0 1px, transparent 1.9px),
                  radial-gradient(circle at 48% 8%, rgba(255,188,232,0.68) 0 1.3px, transparent 2px),
                  radial-gradient(circle at 57% 19%, rgba(255,255,255,0.78) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 64% 10%, rgba(201,228,255,0.56) 0 1.5px, transparent 2.2px),
                  radial-gradient(circle at 72% 22%, rgba(255,255,255,0.85) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 82% 12%, rgba(255,204,241,0.72) 0 1.3px, transparent 2px),
                  radial-gradient(circle at 90% 28%, rgba(255,255,255,0.75) 0 1px, transparent 1.9px),
                  radial-gradient(circle at 12% 48%, rgba(255,255,255,0.74) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 24% 58%, rgba(220,214,255,0.56) 0 1.4px, transparent 2.1px),
                  radial-gradient(circle at 37% 46%, rgba(255,255,255,0.65) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 52% 62%, rgba(255,204,241,0.52) 0 1.4px, transparent 2.2px),
                  radial-gradient(circle at 68% 52%, rgba(255,255,255,0.68) 0 1px, transparent 1.8px),
                  radial-gradient(circle at 78% 66%, rgba(201,228,255,0.5) 0 1.4px, transparent 2.2px),
                  radial-gradient(circle at 90% 56%, rgba(255,255,255,0.62) 0 1px, transparent 1.8px)
                `,
              }}
            />
            <div className="absolute top-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/8 to-transparent blur-[100px]" />
            <div className="absolute top-[18%] left-[8%] h-[220px] w-[220px] rounded-full bg-primary/8 blur-[90px]" />
            <div className="absolute top-[28%] right-[6%] h-[260px] w-[260px] rounded-full bg-accent/6 blur-[110px]" />
            <div className="absolute bottom-[14%] left-[22%] h-[180px] w-[180px] rounded-full bg-white/4 blur-[80px]" />
            <div className="absolute bottom-0 left-0 h-[320px] w-[620px] rounded-full bg-gradient-to-tr from-accent/7 to-transparent blur-[90px]" />

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
                  boxShadow: "0 0 12px rgba(255, 188, 232, 0.45), 0 0 28px rgba(123, 153, 255, 0.18)",
                }}
                animate={{
                  y: [0, -14, 0],
                  x: [0, 5, 0],
                  opacity: [particle.opacity, particle.opacity + 0.18, particle.opacity],
                  scale: [1, 1.16, 1],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
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
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(22,14,34,0.84),rgba(16,10,25,0.72))] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-9"
                variants={fadeUpVariant}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/18 bg-background/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(235,99,197,0.55)]" />
                  About This Corner
                </div>
                <h2
                  className="mb-4 text-3xl font-bold text-foreground md:text-4xl"
                  style={{ textShadow: "0 0 20px rgba(235,99,197,0.12)" }}
                >
                  关于这个角落
                </h2>
                <p className="max-w-2xl leading-8 text-muted-foreground">
                  {siteConfig.title} 主要记录流量分析、Windows 与 Linux 入侵排查、CTF 复盘，以及做安全工具时踩过的坑。
                  不追求铺陈完整背景，更偏向保留关键证据、解题路径和能复现结果的操作细节。
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Write Style</p>
                    <p className="mt-2 text-sm leading-7 text-white/74">
                      尽量保留关键证据、核心思路和可复现步骤，不把有效信息埋进长篇背景里。
                    </p>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Focus Area</p>
                    <p className="mt-2 text-sm leading-7 text-white/74">
                      威胁流量、Windows / Linux 入侵排查、取证片段、赛题复盘，以及安全工具开发记录。
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.aside
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,12,30,0.82),rgba(12,9,20,0.72))] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl"
                variants={scaleUpVariant}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/12 shadow-[0_0_36px_rgba(235,99,197,0.2)]">
                    <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Author</p>
                    <p className="mt-1 text-xl font-semibold text-white">{siteConfig.author}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/archive"
                    className="flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-primary/18 hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Archive className="h-4 w-4" />
                      进入归档
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/search"
                    className="flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-primary/18 hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      搜索文章
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-primary/18 hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </span>
                    <ArrowRight className="h-4 w-4" />
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

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Archive, Github, Search, ShieldCheck } from "lucide-react"
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

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[92vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${siteConfig.heroBackground}')`,
              backgroundPosition: "center 24%",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.04)_0%,rgba(8,8,16,0.14)_18%,rgba(8,8,16,0.32)_46%,rgba(8,8,16,0.82)_84%,rgba(8,8,16,1)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,132,190,0.18),transparent_26%)]" />
        </div>

        <Header />
        <HeroSection />

        <section id="posts" className="relative z-10 overflow-hidden px-6 pt-12 pb-20 md:pt-16 md:pb-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
            <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/6 to-transparent blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[600px] rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-[80px]" />
          </div>

          <div className="mx-auto max-w-6xl">
            <motion.div
              className="relative z-10 mb-12 text-center md:mb-14"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/18 bg-background/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/50"
                variants={fadeUpVariant}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                Latest Notes
              </motion.div>
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

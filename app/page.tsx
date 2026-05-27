"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { HeroSection } from "@/components/blog/hero-section"
import { BlogCard } from "@/components/blog/blog-card"
import { Footer } from "@/components/blog/footer"
import { 
  PageTransition, 
  staggerContainer, 
  fadeUpVariant,
  scaleUpVariant
} from "@/components/blog/page-transition"
import { blogPosts, siteConfig } from "@/lib/blog-data"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background overflow-hidden">
        {/* Hero Background Image - only in hero area */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${siteConfig.heroBackground}')`,
              backgroundPosition: "center 30%",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.02)_0%,rgba(8,8,16,0.08)_30%,rgba(8,8,16,0.3)_60%,rgba(8,8,16,0.7)_85%,rgba(8,8,16,1)_100%)]" />
        </div>
        <Header />
        <HeroSection />
        
        {/* Blog Posts Section */}
        <section id="posts" className="relative z-10 overflow-hidden px-6 pt-16 pb-16 md:pt-20 md:pb-20">
          {/* Background decorations - smooth transition from hero */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-[80px]" />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              className="relative z-10 text-center mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                variants={fadeUpVariant}
                style={{ textShadow: "0 0 30px rgba(235,99,197,0.15)" }}
              >
                最新文章
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-2xl mx-auto text-lg"
                variants={fadeUpVariant}
              >
                围绕威胁流量、入侵检测、应急取证与赛题复盘，持续整理实战里真正有用的方法和过程。
              </motion.p>
            </motion.div>
            
            {/* Posts Grid */}
            <motion.div 
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            
            {/* Load More */}
            <motion.div 
              className="relative z-10 text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/archive">
                <motion.div 
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 text-primary hover:from-primary/20 hover:to-accent/20 transition-all duration-300 group"
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
        
        {/* About Section */}
        <section id="about" className="relative py-16 px-6 overflow-hidden">
          {/* Background - smooth transition */}
          <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,169,0.05),transparent_50%)]" />

          <motion.div 
            className="relative max-w-3xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="relative w-24 h-24 mx-auto mb-6"
              variants={scaleUpVariant}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-50 blur-sm" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-[0_0_40px_rgba(235,99,197,0.25)]">
                <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-foreground mb-4"
              variants={fadeUpVariant}
              style={{ textShadow: "0 0 20px rgba(235,99,197,0.12)" }}
            >
              关于这个角落
            </motion.h2>
            <motion.p 
              className="text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              variants={fadeUpVariant}
            >
              {siteConfig.title} 主要记录流量分析、Windows 与 Linux 入侵排查、CTF 复盘，以及做安全工具时踩过的坑。
              不追求铺陈完整背景，更偏向保留关键证据、解题路径和能复现结果的操作细节。
            </motion.p>
          </motion.div>
        </section>
        
        <Footer />
      </main>
    </PageTransition>
  )
}

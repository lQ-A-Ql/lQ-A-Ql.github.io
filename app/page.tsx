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
import { Sparkles, Shield, Code, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const skills = [
  { icon: Shield, label: "安全研究", description: "流量分析与入侵检测" },
  { icon: Search, label: "应急取证", description: "数字取证与事件响应" },
  { icon: Code, label: "CTF竞赛", description: "解题思路与工具开发" },
]

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background overflow-hidden">
        {/* Hero Background Image */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1120px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${siteConfig.heroBackground}')`,
              backgroundPosition: "center top",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.05)_0%,rgba(8,8,16,0.08)_38%,rgba(8,8,16,0.18)_62%,rgba(8,8,16,0.42)_82%,rgba(8,8,16,0.72)_100%)]" />
          <div
            className="absolute inset-x-0 bottom-0 h-[220px] scale-110 bg-cover bg-center bg-no-repeat blur-3xl opacity-95"
            style={{
              backgroundImage: `url('${siteConfig.heroBackground}')`,
              backgroundPosition: "center bottom",
              maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.3) 42%, rgba(0,0,0,0.68) 72%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.3) 42%, rgba(0,0,0,0.68) 72%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>
        <Header />
        <HeroSection />
        
        {/* Blog Posts Section */}
        <section id="posts" className="relative z-10 overflow-hidden px-6 pt-24 pb-20 md:pt-28">
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-[80px]" />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              className="relative z-10 text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
                variants={fadeUpVariant}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">精选文章</span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                variants={fadeUpVariant}
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
        <section id="about" className="relative py-24 px-6 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,169,0.05),transparent_50%)]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <motion.div 
            className="relative max-w-5xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Avatar and intro */}
              <motion.div variants={fadeUpVariant}>
                <motion.div 
                  className="relative w-40 h-40 mx-auto md:mx-0 mb-8"
                  variants={scaleUpVariant}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent rotate-6 opacity-20 blur-sm" />
                  <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/10">
                    <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="w-full h-full object-cover" />
                  </div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    博主
                  </motion.div>
                </motion.div>

                <motion.h2 
                  className="text-3xl font-bold text-foreground mb-4 text-center md:text-left"
                  variants={fadeUpVariant}
                >
                  关于这个角落
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground leading-relaxed text-center md:text-left"
                  variants={fadeUpVariant}
                >
                  {siteConfig.title} 主要记录流量分析、Windows 与 Linux 入侵排查、CTF 复盘，以及做安全工具时踩过的坑。
                  不追求铺陈完整背景，更偏向保留关键证据、解题路径和能复现结果的操作细节。
                </motion.p>
              </motion.div>

              {/* Right: Skills */}
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    className="group relative p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    variants={fadeUpVariant}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <skill.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{skill.label}</h3>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                    {/* Hover accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-accent rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        <Footer />
      </main>
    </PageTransition>
  )
}

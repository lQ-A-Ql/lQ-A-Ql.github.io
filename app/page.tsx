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

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1200px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.96]"
            style={{
              backgroundImage: `url('${siteConfig.heroBackground}')`,
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 42%, rgba(0,0,0,0.82) 62%, rgba(0,0,0,0.46) 82%, rgba(0,0,0,0.12) 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 42%, rgba(0,0,0,0.82) 62%, rgba(0,0,0,0.46) 82%, rgba(0,0,0,0.12) 94%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,14,0.08),rgba(7,7,14,0.14)_38%,rgba(7,7,14,0.34)_66%,rgba(7,7,14,0.72)_100%)]" />
        </div>
        <Header />
        <HeroSection />
        
        {/* Blog Posts Section */}
        <section id="posts" className="relative z-10 -mt-28 overflow-hidden px-6 pt-32 pb-20 md:-mt-32 md:pt-36">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(255,140,210,0.04),transparent_16%),radial-gradient(circle_at_82%_22%,rgba(151,115,255,0.035),transparent_18%),radial-gradient(circle_at_16%_74%,rgba(255,108,181,0.03),transparent_15%)]" />
            <div className="absolute left-[-6%] top-24 h-64 w-64 rounded-full bg-[rgba(255,127,196,0.03)] blur-[120px]" />
            <div className="absolute right-[-8%] top-20 h-72 w-72 rounded-full bg-[rgba(138,112,255,0.03)] blur-[140px]" />
            <div className="absolute inset-y-16 left-1/2 w-[50%] -translate-x-1/2 rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.02),rgba(255,210,234,0.018)_44%,rgba(152,214,255,0.015)_66%,transparent)] blur-3xl opacity-40" />
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
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                variants={fadeUpVariant}
              >
                最新文章
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-2xl mx-auto"
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
              className="relative z-10 text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.a 
                href="/archive"
                className="inline-block px-8 py-3 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                进入归档
              </motion.a>
            </motion.div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-card/30 backdrop-blur-sm border-y border-border/50">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-secondary border-2 border-primary/50 mx-auto mb-6 overflow-hidden"
              variants={scaleUpVariant}
              whileHover={{ scale: 1.1, borderColor: "rgba(236, 72, 153, 0.8)" }}
            >
              <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="w-full h-full object-cover" />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-foreground mb-4"
              variants={fadeUpVariant}
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

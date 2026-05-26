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
      <main className="min-h-screen bg-background overflow-hidden">
        <Header />
        <HeroSection />
        
        {/* Blog Posts Section */}
        <section id="posts" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16"
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              className="text-center mt-12"
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

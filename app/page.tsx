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

const postBackdropParticles = [
  { left: "7%", top: "54%", size: 7, color: "rgba(255, 223, 241, 0.38)", blur: "blur-sm", duration: 7.2, delay: 0.2 },
  { left: "12%", top: "66%", size: 14, color: "rgba(255, 146, 210, 0.34)", blur: "blur-md", duration: 8.6, delay: 1.1 },
  { left: "18%", top: "82%", size: 6, color: "rgba(186, 157, 255, 0.36)", blur: "blur-sm", duration: 6.8, delay: 0.8 },
  { left: "28%", top: "72%", size: 10, color: "rgba(255, 228, 242, 0.3)", blur: "blur-md", duration: 8.8, delay: 1.6 },
  { left: "39%", top: "58%", size: 8, color: "rgba(255, 175, 228, 0.26)", blur: "blur-sm", duration: 7.4, delay: 0.3 },
  { left: "49%", top: "84%", size: 9, color: "rgba(153, 214, 255, 0.26)", blur: "blur-sm", duration: 7.8, delay: 0.5 },
  { left: "58%", top: "68%", size: 16, color: "rgba(255, 164, 220, 0.28)", blur: "blur-lg", duration: 9.4, delay: 1.2 },
  { left: "67%", top: "56%", size: 7, color: "rgba(255, 238, 245, 0.34)", blur: "blur-sm", duration: 7.4, delay: 0.4 },
  { left: "76%", top: "80%", size: 11, color: "rgba(170, 136, 255, 0.28)", blur: "blur-md", duration: 8.2, delay: 1.8 },
  { left: "84%", top: "64%", size: 13, color: "rgba(255, 192, 232, 0.24)", blur: "blur-md", duration: 8.6, delay: 0.9 },
  { left: "92%", top: "78%", size: 8, color: "rgba(210, 180, 255, 0.26)", blur: "blur-sm", duration: 7.1, delay: 1.5 },
]

export default function BlogPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background overflow-hidden">
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
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(68,32,58,0)_0%,rgba(68,32,58,0.18)_12%,rgba(60,28,52,0.52)_22%,rgba(48,22,42,0.92)_34%,rgba(22,12,24,0.98)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,140,210,0.08),transparent_16%),radial-gradient(circle_at_82%_20%,rgba(151,115,255,0.07),transparent_18%),radial-gradient(circle_at_18%_78%,rgba(255,108,181,0.05),transparent_15%)]" />
            <div className="absolute left-[-4%] top-18 h-72 w-72 rounded-full bg-[rgba(255,127,196,0.06)] blur-[120px]" />
            <div className="absolute right-[-6%] top-16 h-80 w-80 rounded-full bg-[rgba(138,112,255,0.06)] blur-[140px]" />
            <div className="absolute inset-y-10 left-1/2 w-[54%] -translate-x-1/2 rotate-[12deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.03),rgba(255,210,234,0.025)_44%,rgba(152,214,255,0.02)_66%,transparent)] blur-3xl opacity-55" />
            {postBackdropParticles.map((particle, index) => (
              <motion.span
                key={index}
                className={`absolute rounded-full ${particle.blur} mix-blend-screen`}
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                }}
                initial={{ opacity: 0.28, scale: 0.82 }}
                animate={{
                  opacity: [0.28, 0.95, 0.34],
                  scale: [0.82, 1.22, 0.9],
                  y: [0, -12, 0],
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
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

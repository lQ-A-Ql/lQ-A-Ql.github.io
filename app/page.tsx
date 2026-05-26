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
import { blogPosts } from "@/lib/blog-data"

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
                旧博客文章已经迁入这个新模板，保留原来的正文、配图、头像和字体。
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
                查看全部文章
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
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%80%90%E5%93%B2%E9%A3%8E%E5%A3%81%E7%BA%B8%E3%80%91%E5%8A%A8%E6%BC%AB-%E5%8A%A8%E6%BC%AB%E5%B0%91%E5%A5%B3-SeYuvIewkyhMqBGqQyNGXNxAI3jIuh.png')`
                }}
              />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-foreground mb-4"
              variants={fadeUpVariant}
            >
              关于作者
            </motion.h2>
            <motion.p 
              className="text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              variants={fadeUpVariant}
            >
              一个热爱代码与文字的深夜创作者。白天是程序员，夜晚是思考者。
              在键盘与咖啡之间，记录着生活的点滴与技术的探索。
              相信每一行代码都有灵魂，每一篇文章都是与世界的对话。
            </motion.p>
          </motion.div>
        </section>
        
        <Footer />
      </main>
    </PageTransition>
  )
}

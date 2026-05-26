"use client"

import { motion } from "framer-motion"
import { Github, Link2 } from "lucide-react"
import { staggerContainer, fadeUpVariant } from "./page-transition"
import { categories, siteConfig } from "@/lib/blog-data"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div variants={fadeUpVariant}>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>{siteConfig.title.slice(1)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              记录实战中的流量、取证、逆向与赛题分析，尽量把每篇内容压缩成可直接复用的经验片段。
            </p>
          </motion.div>
          
          {/* Links */}
          <motion.div variants={fadeUpVariant}>
            <h4 className="font-semibold mb-4 text-foreground">快速链接</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/archive" className="hover:text-primary transition-colors">所有文章</a></li>
              {categories.filter((item) => item !== "全部").slice(0, 3).map((category) => (
                <li key={category}><a href={`/search?category=${encodeURIComponent(category)}`} className="hover:text-primary transition-colors">{category}</a></li>
              ))}
            </ul>
          </motion.div>
          
          {/* Social */}
          <motion.div variants={fadeUpVariant}>
            <h4 className="font-semibold mb-4 text-foreground">联系方式</h4>
            <div className="flex gap-4">
              <motion.a 
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href="/search" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link2 className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© 2026 {siteConfig.title}. Security notes, traffic traces, and incident writeups.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

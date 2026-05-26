"use client"

import { motion } from "framer-motion"
import { siteConfig, categories } from "@/lib/blog-data"

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${siteConfig.heroBackground}')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border border-primary/40 shadow-[0_0_40px_rgba(255,122,169,0.25)]">
            <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="h-full w-full object-cover" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-[0.1em]">
            <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>{siteConfig.title.slice(1)}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            {categories.filter((item) => item !== "全部").slice(0, 3).map((category, index, array) => (
              <div key={category} className="contents">
                <span>{category}</span>
                {index < array.length - 1 && <span className="w-1 h-1 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  )
}

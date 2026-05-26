"use client"

import { motion } from "framer-motion"
import { siteConfig, categories } from "@/lib/blog-data"

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/58 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/84 via-transparent to-background/76" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,150,214,0.22),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(173,122,255,0.16),transparent_20%),radial-gradient(circle_at_18%_78%,rgba(255,96,170,0.1),transparent_18%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(5,5,10,0.18)_72%,rgba(3,3,8,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[8%] w-1/2 rotate-[14deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,225,241,0.08)_24%,rgba(153,209,255,0.07)_54%,transparent_82%)] opacity-60 blur-3xl" />
      
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

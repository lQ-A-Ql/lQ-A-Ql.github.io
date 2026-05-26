"use client"

import { motion } from "framer-motion"
import { siteConfig, categories } from "@/lib/blog-data"

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_12%,rgba(255,165,222,0.1),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(173,122,255,0.06),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[14%] w-[36%] rotate-[15deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.07),rgba(255,227,242,0.03)_28%,rgba(153,209,255,0.025)_58%,transparent_84%)] opacity-40 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,16,0.08)_0%,rgba(8,8,16,0.02)_24%,rgba(8,8,16,0.06)_62%,rgba(8,8,16,0.1)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,6,12,0.32)] via-transparent to-[rgba(6,6,12,0.28)]" />
      
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-[0.1em] [text-shadow:0_10px_26px_rgba(0,0,0,0.32)]">
            <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>{siteConfig.title.slice(1)}
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed [text-shadow:0_6px_18px_rgba(0,0,0,0.22)]">
            {siteConfig.description}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-6 text-sm text-white/88 [text-shadow:0_4px_14px_rgba(0,0,0,0.2)]">
            {categories.filter((item) => item !== "全部").slice(0, 3).map((category, index, array) => (
              <div key={category} className="contents">
                <span>{category}</span>
                {index < array.length - 1 && <span className="w-1 h-1 rounded-full bg-white/70" />}
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
        <div className="relative h-10 w-11 flex items-center justify-center">
          <div className="absolute left-[7px] top-[3px] h-4 w-4 rotate-[-18deg] rounded-tl-[3px] rounded-tr-[12px] rounded-br-[3px] border-t-2 border-l-2 border-primary/60" />
          <div className="absolute right-[7px] top-[3px] h-4 w-4 rotate-[18deg] rounded-tl-[12px] rounded-tr-[3px] rounded-bl-[3px] border-t-2 border-r-2 border-primary/60" />
          <div className="relative h-7 w-8 rounded-[999px] border-2 border-primary/55 bg-[rgba(255,122,169,0.05)]">
            <div className="absolute left-[8px] top-[8px] h-[3px] w-[3px] rounded-full bg-primary/80" />
            <div className="absolute right-[8px] top-[8px] h-[3px] w-[3px] rounded-full bg-primary/80" />
            <div className="absolute left-1/2 top-[14px] h-[5px] w-[7px] -translate-x-1/2 rounded-b-[10px] rounded-t-[5px] border border-primary/70 bg-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

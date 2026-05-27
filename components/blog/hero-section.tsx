"use client"

import { motion } from "framer-motion"
import { siteConfig, categories } from "@/lib/blog-data"
import { ChevronDown } from "lucide-react"

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.5 + 0.2,
}))

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-accent/15 to-transparent blur-[80px] animate-pulse delay-1000" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title with Avatar */}
          <div className="flex items-center justify-center gap-6 mb-4">
            {/* Avatar */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-50 blur-sm" />
              <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-[0_0_50px_rgba(255,122,169,0.3)] hover:shadow-[0_0_80px_rgba(255,122,169,0.5)] transition-shadow duration-300">
                <img src={siteConfig.avatarUrl} alt={siteConfig.author} className="h-full w-full object-cover" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-[0.15em] text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                {siteConfig.title}
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed mb-1">
              {siteConfig.description}
            </p>
            <p className="text-sm text-white/70 max-w-xl mx-auto">
              {siteConfig.shortDescription}
            </p>
          </motion.div>

          {/* Category tags */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {categories.filter((item) => item !== "全部").map((category, index) => (
              <motion.span
                key={category}
                className="px-3 py-1 text-xs rounded-full border border-primary/30 bg-primary/5 text-primary/80 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

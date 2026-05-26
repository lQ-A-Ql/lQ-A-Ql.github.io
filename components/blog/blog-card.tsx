"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface BlogCardProps {
  id?: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  imageUrl?: string
  index: number
}

export function BlogCard({ 
  id,
  title, 
  excerpt, 
  date, 
  readTime, 
  category,
  imageUrl,
  index 
}: BlogCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.08
      }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      style={{ cursor: id ? "pointer" : "default" }}
    >
      <Card className="group relative overflow-hidden bg-[rgba(116,96,145,0.11)] backdrop-blur-xl backdrop-saturate-150 border-white/16 hover:border-primary/42 transition-all duration-500 cursor-pointer shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,18,34,0.58)] via-[rgba(22,18,34,0.04)] to-transparent" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 -left-1/3 w-2/3 rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.24),rgba(255,255,255,0.12)_18%,rgba(255,196,234,0.14)_42%,rgba(146,211,255,0.12)_62%,transparent_82%)] opacity-70 blur-2xl transition-transform duration-700 group-hover:translate-x-8" />
          <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-[rgba(255,196,237,0.12)] blur-3xl transition-transform duration-700 group-hover:-translate-y-2" />
          <div className="absolute left-6 top-5 h-px w-[42%] bg-[linear-gradient(90deg,rgba(255,255,255,0.68),rgba(255,255,255,0.18),transparent)] opacity-70" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] opacity-60" />
        </div>
        
        <div className="p-6 relative">
          {/* Category Tag */}
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            {category}
          </span>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime}
            </span>
          </div>
          
          {/* Read More */}
          <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>阅读更多</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,143,203,0.12),transparent_40%,rgba(161,121,255,0.12)_72%,transparent)]" />
        </div>
      </Card>
    </motion.div>
  )

  if (!id) {
    return content
  }

  return (
    <Link href={`/post/${id}/`} className="block">
      {content}
    </Link>
  )
}

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
      <Card className="group relative overflow-hidden bg-[rgba(52,41,68,0.22)] backdrop-blur-md border-white/12 hover:border-primary/40 transition-all duration-500 cursor-pointer shadow-[0_18px_46px_rgba(0,0,0,0.14)]">
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,14,28,0.72)] via-[rgba(18,14,28,0.08)] to-transparent" />
          </div>
        )}
        
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
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/8 via-transparent to-accent/7" />
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

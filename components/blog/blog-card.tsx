"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Eye } from "lucide-react"
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.1
      }}
      whileHover={{ y: -8 }}
      style={{ cursor: id ? "pointer" : "default" }}
    >
      <Card className="group relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-white/10 hover:border-primary/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/10">
        {/* Image section */}
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Category badge on image */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm text-primary border border-primary/20">
                {category}
              </span>
            </div>

            {/* Quick view button */}
            <motion.div
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              <div className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Eye className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top shine */}
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Corner accent */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-transform duration-700 group-hover:translate-x-10 group-hover:-translate-y-10" />
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-transform duration-700 group-hover:-translate-x-5 group-hover:translate-y-5" />
        </div>
        
        {/* Content */}
        <div className="p-6 relative">
          {!imageUrl && (
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              {category}
            </span>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">
            {excerpt}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary/60" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary/60" />
                {readTime}
              </span>
            </div>
            
            {/* Read More arrow */}
            <motion.div 
              className="flex items-center gap-1 text-primary text-sm font-medium"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">阅读</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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

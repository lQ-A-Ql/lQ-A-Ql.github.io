"use client"

import DOMPurify from "isomorphic-dompurify"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/blog/page-transition"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog-data"

interface PostPageClientProps {
  post: BlogPost
  previous?: BlogPost
  next?: BlogPost
}

export function PostPageClient({ post, previous, next }: PostPageClientProps) {
  const router = useRouter()

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Header />

        <motion.div
          className="relative pt-24 pb-16 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {post.imageUrl && (
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
            </motion.div>
          )}

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            >
              <Button
                variant="ghost"
                className="mb-8 text-muted-foreground hover:text-primary"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            </motion.div>

            <motion.span
              className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
            >
              {post.category}
            </motion.span>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.25 }}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <motion.button
                className="flex items-center gap-2 hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                分享
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.article
          className="max-w-4xl mx-auto px-6 pb-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            className="prose prose-invert prose-pink prose-pre:bg-card/80 prose-code:text-foreground prose-headings:text-foreground max-w-none"
            variants={fadeUpVariant}
          >
            <div
              className="text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contentHtml) }}
            />
          </motion.div>

          <motion.div className="mt-12 pt-8 border-t border-border/50" variants={fadeUpVariant}>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.length > 0 ? (
                post.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">暂无标签</span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {previous && (
              <motion.button
                className="p-4 rounded-lg border border-border/50 bg-card/30 text-left hover:border-primary/50 transition-colors"
                onClick={() => router.push(`/post/${previous.slug}`)}
                whileHover={{ x: -5 }}
              >
                <span className="text-xs text-muted-foreground">上一篇</span>
                <p className="text-sm font-medium text-foreground mt-1 line-clamp-1">{previous.title}</p>
              </motion.button>
            )}
            {next && (
              <motion.button
                className="p-4 rounded-lg border border-border/50 bg-card/30 text-right hover:border-primary/50 transition-colors md:col-start-2"
                onClick={() => router.push(`/post/${next.slug}`)}
                whileHover={{ x: 5 }}
              >
                <span className="text-xs text-muted-foreground">下一篇</span>
                <p className="text-sm font-medium text-foreground mt-1 line-clamp-1">{next.title}</p>
              </motion.button>
            )}
          </motion.div>
        </motion.article>

        <Footer />
      </main>
    </PageTransition>
  )
}

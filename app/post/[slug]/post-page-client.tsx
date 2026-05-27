"use client"

import DOMPurify from "isomorphic-dompurify"
import hljs from "highlight.js/lib/core"
import bash from "highlight.js/lib/languages/bash"
import c from "highlight.js/lib/languages/c"
import cpp from "highlight.js/lib/languages/cpp"
import javascript from "highlight.js/lib/languages/javascript"
import json from "highlight.js/lib/languages/json"
import plaintext from "highlight.js/lib/languages/plaintext"
import powershell from "highlight.js/lib/languages/powershell"
import python from "highlight.js/lib/languages/python"
import typescript from "highlight.js/lib/languages/typescript"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/blog/page-transition"
import { Button } from "@/components/ui/button"
import { siteConfig, type BlogPost } from "@/lib/blog-data"

interface PostPageClientProps {
  post: BlogPost
  previous?: BlogPost
  next?: BlogPost
}

hljs.registerLanguage("bash", bash)
hljs.registerLanguage("sh", bash)
hljs.registerLanguage("shell", bash)
hljs.registerLanguage("c", c)
hljs.registerLanguage("cpp", cpp)
hljs.registerLanguage("c++", cpp)
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("js", javascript)
hljs.registerLanguage("json", json)
hljs.registerLanguage("plaintext", plaintext)
hljs.registerLanguage("text", plaintext)
hljs.registerLanguage("powershell", powershell)
hljs.registerLanguage("ps1", powershell)
hljs.registerLanguage("python", python)
hljs.registerLanguage("py", python)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("ts", typescript)

export function PostPageClient({ post, previous, next }: PostPageClientProps) {
  const router = useRouter()
  const sanitizedContentHtml = useMemo(() => {
    const highlighted = post.contentHtml.replace(
      /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/gi,
      (_match, language, code) => {
        const normalizedLanguage = String(language).toLowerCase()
        const decodedCode = code
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")

        const validLanguage = hljs.getLanguage(normalizedLanguage)
          ? normalizedLanguage
          : "plaintext"

        const highlightedCode = hljs.highlight(decodedCode, { language: validLanguage }).value

        return `<pre class="hljs-wrapper"><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`
      },
    )

    return DOMPurify.sanitize(highlighted)
  }, [post.contentHtml])

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background overflow-hidden">
        <Header />

        <div
          className="pointer-events-none absolute inset-0 opacity-65"
          style={{
            backgroundImage: `linear-gradient(rgba(10,8,18,0.64), rgba(7,7,14,0.88)), url('${siteConfig.heroBackground}')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,146,214,0.22),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(176,118,255,0.16),transparent_21%),radial-gradient(circle_at_18%_72%,rgba(255,96,170,0.12),transparent_19%),radial-gradient(circle_at_58%_42%,rgba(255,210,240,0.06),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(5,5,10,0.18)_72%,rgba(4,4,8,0.44)_100%)]" />

        <motion.div
          className="relative z-10 px-4 pt-24 pb-12 sm:px-6 sm:pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            >
              <Button
                variant="ghost"
                className="mb-6 px-0 text-muted-foreground hover:text-primary sm:mb-8"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            </motion.div>

            <motion.span
              className="mb-5 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
            >
              {post.category}
            </motion.span>

            <motion.h1
              className="mb-5 text-2xl leading-tight font-bold text-foreground sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground"
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
          className="relative z-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            className="group relative max-w-none overflow-hidden rounded-[1.4rem] bg-[rgba(94,74,122,0.12)] px-4 py-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-[22px] backdrop-saturate-150 prose prose-invert prose-pink prose-headings:text-foreground sm:rounded-[1.75rem] sm:px-6 sm:py-8 md:px-10 md:py-10"
            variants={fadeUpVariant}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-y-0 -left-1/4 w-1/2 rotate-[16deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08)_22%,rgba(255,194,230,0.1)_44%,rgba(150,210,255,0.08)_62%,transparent_84%)] opacity-80 blur-2xl" />
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[rgba(255,202,233,0.09)] blur-3xl" />
              <div className="absolute left-10 top-0 h-px w-[38%] bg-[linear-gradient(90deg,rgba(255,255,255,0.72),rgba(255,255,255,0.18),transparent)] opacity-80" />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%,rgba(255,255,255,0.02)_64%,rgba(0,0,0,0.08))]" />
            </div>
            <div
              className="relative z-10 text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedContentHtml }}
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

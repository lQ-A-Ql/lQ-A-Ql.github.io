"use client"

import DOMPurify from "isomorphic-dompurify"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/blog/page-transition"
import { Button } from "@/components/ui/button"
import { type BlogPost } from "@/lib/blog-data"
import { routeTransitionClassName, routeTransitionStartEvent } from "@/lib/client-events"

interface PostPageClientProps {
  post: BlogPost
  previous?: BlogPost
  next?: BlogPost
}

async function enhancePostHtml(html: string) {
  const [
    hljsModule,
    bashModule,
    cModule,
    cppModule,
    javascriptModule,
    jsonModule,
    plaintextModule,
    powershellModule,
    pythonModule,
    typescriptModule,
  ] = await Promise.all([
    import("highlight.js/lib/core"),
    import("highlight.js/lib/languages/bash"),
    import("highlight.js/lib/languages/c"),
    import("highlight.js/lib/languages/cpp"),
    import("highlight.js/lib/languages/javascript"),
    import("highlight.js/lib/languages/json"),
    import("highlight.js/lib/languages/plaintext"),
    import("highlight.js/lib/languages/powershell"),
    import("highlight.js/lib/languages/python"),
    import("highlight.js/lib/languages/typescript"),
  ])
  const hljs = hljsModule.default
  const languageLoaders = {
    bash: bashModule.default,
    sh: bashModule.default,
    shell: bashModule.default,
    c: cModule.default,
    cpp: cppModule.default,
    "c++": cppModule.default,
    javascript: javascriptModule.default,
    js: javascriptModule.default,
    json: jsonModule.default,
    plaintext: plaintextModule.default,
    text: plaintextModule.default,
    powershell: powershellModule.default,
    ps1: powershellModule.default,
    python: pythonModule.default,
    py: pythonModule.default,
    typescript: typescriptModule.default,
    ts: typescriptModule.default,
  }

  Object.entries(languageLoaders).forEach(([language, loader]) => {
    if (!hljs.getLanguage(language)) {
      hljs.registerLanguage(language, loader)
    }
  })

  return html.replace(
    /<pre><code(?: class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (_match, language = "plaintext", code) => {
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
}

const compilePostMarkdown = async (markdown: string) => {
  const { compileMarkdown } = await import("@/lib/markdown")
  return compileMarkdown(markdown)
}

type IdleHandle =
  | { kind: "idle"; id: number }
  | { kind: "timeout"; id: ReturnType<typeof setTimeout> }
  | { kind: "none" }

const normalizeLegacyCodeBlocks = (html: string) =>
  html.replace(
    /<pre><code(?: class="language-([^"]+)")?>/gi,
    (_match, language = "plaintext") => {
      const normalizedLanguage = String(language).toLowerCase()
      return `<pre class="hljs-wrapper"><code class="language-${normalizedLanguage}">`
    },
  )

const runWhenIdle = (callback: () => void): IdleHandle => {
  if (typeof window === "undefined") {
    callback()
    return { kind: "none" }
  }

  if (typeof window.requestIdleCallback === "function") {
    return { kind: "idle", id: window.requestIdleCallback(callback, { timeout: 1200 }) }
  }

  return { kind: "timeout", id: setTimeout(callback, 220) }
}

const cancelIdleRun = (handle: IdleHandle) => {
  if (typeof window === "undefined") return

  if (handle.kind === "idle" && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(handle.id)
    return
  }

  if (handle.kind === "timeout") {
    clearTimeout(handle.id)
  }
}

export function PostPageClient({ post, previous, next }: PostPageClientProps) {
  const router = useRouter()
  const [sanitizedContentHtml, setSanitizedContentHtml] = useState(() =>
    DOMPurify.sanitize(normalizeLegacyCodeBlocks(post.contentHtml)),
  )

  useEffect(() => {
    let cancelled = false
    setSanitizedContentHtml(DOMPurify.sanitize(normalizeLegacyCodeBlocks(post.contentHtml)))

    const idleHandle = runWhenIdle(async () => {
      if (!post.contentMarkdown) {
        if (!cancelled) {
          const highlightedHtml = await enhancePostHtml(post.contentHtml)
          if (!cancelled) setSanitizedContentHtml(DOMPurify.sanitize(highlightedHtml))
        }
        return
      }

      const parsedHtml = await compilePostMarkdown(post.contentMarkdown)
      if (cancelled) {
        return
      }

      const highlightedHtml = await enhancePostHtml(parsedHtml)
      if (!cancelled) setSanitizedContentHtml(DOMPurify.sanitize(highlightedHtml))
    })

    return () => {
      cancelled = true
      cancelIdleRun(idleHandle)
    }
  }, [post.contentHtml, post.contentMarkdown])

  const openPost = (slug: string) => {
    document.documentElement.classList.add(routeTransitionClassName)
    window.dispatchEvent(new CustomEvent(routeTransitionStartEvent))
    router.push(`/post/${slug}`)
  }

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background overflow-hidden">
        <Header />


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
            className="post-content-panel group relative max-w-none overflow-hidden rounded-[1.4rem] bg-[rgba(94,74,122,0.12)] px-4 py-6 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-[22px] backdrop-saturate-150 prose prose-invert prose-pink prose-headings:text-foreground sm:rounded-[1.75rem] sm:px-6 sm:py-8 md:px-10 md:py-10"
            variants={fadeUpVariant}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="post-panel-sheen absolute inset-y-0 -left-1/4 w-1/2 rotate-[16deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08)_22%,rgba(255,194,230,0.1)_44%,rgba(150,210,255,0.08)_62%,transparent_84%)] opacity-80 blur-2xl" />
              <div className="post-panel-orb absolute right-0 top-0 h-40 w-40 rounded-full bg-[rgba(255,202,233,0.09)] blur-3xl" />
              <div className="post-panel-topline absolute left-10 top-0 h-px w-[38%] bg-[linear-gradient(90deg,rgba(255,255,255,0.72),rgba(255,255,255,0.18),transparent)] opacity-80" />
              <div className="post-panel-edge absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] opacity-70" />
              <div className="post-panel-wash absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%,rgba(255,255,255,0.02)_64%,rgba(0,0,0,0.08))]" />
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
                onClick={() => openPost(previous.slug)}
                whileHover={{ x: -5 }}
              >
                <span className="text-xs text-muted-foreground">上一篇</span>
                <p className="text-sm font-medium text-foreground mt-1 line-clamp-1">{previous.title}</p>
              </motion.button>
            )}
            {next && (
              <motion.button
                className="p-4 rounded-lg border border-border/50 bg-card/30 text-right hover:border-primary/50 transition-colors md:col-start-2"
                onClick={() => openPost(next.slug)}
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

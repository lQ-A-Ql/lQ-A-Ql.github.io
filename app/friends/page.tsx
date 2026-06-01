"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Heart, Link2, Mail, Sparkles } from "lucide-react"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/blog/page-transition"
import { siteConfig } from "@/lib/blog-data"

interface FriendLink {
  name: string
  href: string
  description: string
  category: string
  status: string
  initials: string
  tags: string[]
  avatarUrl?: string
  actionLabel?: string
}

const friendLinks: FriendLink[] = [
  {
    name: "PaperPlane",
    href: "http://blog.paperplane.codes/",
    description: "RE神！",
    category: "REVERSE",
    status: "ONLINE",
    initials: "PP",
    tags: ["Reverse", "RE", "Security"],
    avatarUrl: "/friends/paperplane.jpg",
    actionLabel: "去串门",
  },
  {
    name: "Fa1lSnow",
    href: "https://blog.fa1lsnow.com/",
    description: "PWN神！",
    category: "PWN",
    status: "ONLINE",
    initials: "FS",
    tags: ["Pwn", "Binary", "Security"],
    avatarUrl: "/friends/fa1lsnow.jpg",
    actionLabel: "去串门",
  },
  {
    name: "DUSK",
    href: "https://fallingdusky.github.io/",
    description: "Fa1lSnow 亲传大弟子",
    category: "SECURITY",
    status: "ONLINE",
    initials: "DK",
    tags: ["Security", "Pwn", "Writeup"],
    avatarUrl: "https://fallingdusky.github.io/avatar/avatar.webp",
    actionLabel: "去串门",
  },
]

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}

function FriendAvatar({ friend }: { friend: FriendLink }) {
  return (
    <div className="friend-avatar-shell relative">
      <div className="friend-avatar-halo absolute inset-0 rounded-[1.45rem]" />
      <div className="friend-avatar-frame relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.45rem] border border-white/12 bg-white/[0.04] shadow-[0_0_34px_rgba(235,99,197,0.18)] md:h-28 md:w-28">
        {friend.avatarUrl ? (
          <img src={friend.avatarUrl} alt={`${friend.name} avatar`} className="h-full w-full object-cover" />
        ) : (
          <span className="friend-avatar-initials px-3 text-center text-lg font-black tracking-[0.16em] text-white md:text-xl">
            {friend.initials}
          </span>
        )}
      </div>
      <span className="friend-avatar-pixel friend-avatar-pixel--one" />
      <span className="friend-avatar-pixel friend-avatar-pixel--two" />
      <span className="friend-avatar-pixel friend-avatar-pixel--three" />
    </div>
  )
}

function FriendCard({ friend, index }: { friend: FriendLink; index: number }) {
  const entryCode = `LINK ${String(index + 1).padStart(2, "0")}`
  const external = isExternalHref(friend.href)

  const card = (
    <motion.article
      className="friend-card blog-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.9rem] border border-white/[0.03] bg-transparent transition-all duration-500 hover:-translate-y-2 hover:border-primary/[0.08]"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 210,
        damping: 25,
        delay: index * 0.08,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] border border-white/[0.02]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-24 transition-opacity duration-500 group-hover:opacity-44" />
      <div className="card-soft-glow pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.008),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.008),transparent_28%)] opacity-12 transition-opacity duration-500 group-hover:opacity-22" />
      <div className="card-sweep-wrap pointer-events-none absolute -inset-[140%] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="card-sweep absolute left-1/2 top-1/2 h-[150%] w-12 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(193,106,243,0.36)_42%,rgba(193,106,243,0.36)_58%,rgba(255,255,255,0)_100%)] blur-[12px] animate-spin-slow" />
      </div>

      <div className="friend-avatar-zone relative flex min-h-[178px] items-center justify-center overflow-hidden">
        <div className="friend-avatar-zone-grid pointer-events-none absolute inset-0" />
        <div className="friend-avatar-zone-orb pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <span className="blog-card-category absolute left-4 top-4 rounded-full border border-primary/20 bg-transparent px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-primary">
          {friend.category}
        </span>
        <span className="blog-card-entry absolute right-4 top-4 text-[11px] uppercase tracking-[0.24em] text-white/38">
          {entryCode}
        </span>
        <FriendAvatar friend={friend} />
        <span className="friend-status-badge absolute bottom-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/64 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(235,99,197,0.7)]" />
          {friend.status}
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-col p-6">
        <h3 className="mb-3 line-clamp-2 text-[1.35rem] font-bold leading-[1.35] text-foreground transition-colors duration-300 group-hover:text-primary">
          {friend.name}
        </h3>
        <p className="blog-card-excerpt mb-5 line-clamp-4 text-sm leading-7 text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.08)]">
          {friend.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="friend-card-tag rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.12em] text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-4">
          <span className="friend-url flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
            <Link2 className="blog-card-meta-icon h-3.5 w-3.5 shrink-0 text-primary/62" />
            <span className="truncate">{external ? friend.href.replace(/^https?:\/\//, "") : "本页锚点"}</span>
          </span>

          <span className="blog-card-cta inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary">
            {friend.actionLabel ?? "去串门"}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  )

  return (
    <Link
      href={friend.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="block h-full"
    >
      {card}
    </Link>
  )
}

export default function FriendsPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <Header />

        <section className="relative z-10 px-6 pb-12 pt-32">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10"
              variants={fadeUpVariant}
            >
              <Heart className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary"
              variants={fadeUpVariant}
            >
              FRIEND LINKS
            </motion.p>
            <motion.h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl" variants={fadeUpVariant}>
              友链小窗
            </motion.h1>
            <motion.p className="mx-auto max-w-2xl text-muted-foreground" variants={fadeUpVariant}>
              把同频的小站收在这里：安全研究、流量分析、取证笔记，或者只是很可爱的技术角落。
            </motion.p>
          </motion.div>
        </section>

        <section className="relative z-10 px-6 pb-10">
          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {friendLinks.map((friend, index) => (
              <motion.div key={friend.name} variants={fadeUpVariant}>
                <FriendCard friend={friend} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="friend-request" className="relative z-10 px-6 pb-24 pt-4">
          <motion.div
            className="friend-request-panel blog-card group relative mx-auto overflow-hidden rounded-[1.9rem] border border-white/[0.03] bg-transparent p-6 md:max-w-4xl md:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="card-soft-glow pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[radial-gradient(circle_at_top_right,rgba(255,132,190,0.008),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,88,255,0.008),transparent_28%)] opacity-20" />
            <div className="relative z-10 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Exchange Card
                </div>
                <h2 className="mb-3 text-2xl font-bold text-foreground">想交换友链的话</h2>
                <p className="blog-card-excerpt max-w-xl text-sm leading-7 text-white/80">
                  可以带上站点名称、地址、头像、简介和你常写的方向。只要是正常维护的小站，都欢迎来贴贴。
                </p>
              </div>

              <div className="friend-request-card rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="space-y-3 text-sm">
                  <p className="friend-request-line">
                    <span>站点名称</span>
                    <strong>{siteConfig.title}</strong>
                  </p>
                  <p className="friend-request-line">
                    <span>站点地址</span>
                    <strong>https://lq-a-ql.github.io</strong>
                  </p>
                  <p className="friend-request-line">
                    <span>头像地址</span>
                    <strong>/legacy/avatar.png</strong>
                  </p>
                </div>
                <Link
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="friend-contact-chip mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  去 GitHub 留言
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}

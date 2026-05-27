"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LiquidGlass } from "@/components/ui/liquid-glass"
import { siteConfig } from "@/lib/blog-data"

const navItems = [
  { label: "首页", href: "/" },
  { label: "搜索", href: "/search" },
  { label: "归档", href: "/archive" },
  { label: "关于", href: "/#about" },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "")
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
      return
    }

    setIsMobileMenuOpen(false)
  }

  const isActive = (href: string) => pathname === href

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 transition-all duration-300 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <LiquidGlass
          variant={isScrolled || isMobileMenuOpen ? "strong" : "soft"}
          className="rounded-[2rem] transition-all duration-300"
          contentClassName="flex h-16 items-center justify-between gap-4 px-4 md:px-6"
        >
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(235,99,197,0.6)]" />
            <span className="text-lg font-bold tracking-[0.22em] text-white md:text-xl">
              <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>
              {siteConfig.title.slice(1)}
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center md:flex">
            <div className="relative flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#") && pathname === "/") {
                      e.preventDefault()
                    }
                    handleNavClick(item.href)
                  }}
                  className={`group relative rounded-full px-5 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {isActive(item.href) && (
                    <span className="absolute inset-0 rounded-full border border-white/14 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_18px_rgba(235,99,197,0.08)]" />
                  )}
                  <span className="relative z-[1]">{item.label}</span>
                  <motion.span
                    className="absolute inset-x-4 -bottom-[1px] h-px bg-primary"
                    initial={false}
                    animate={{ width: isActive(item.href) ? "calc(100% - 32px)" : "0%" }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/search"
                aria-label="搜索文章"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:text-primary"
              >
                <Search className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:text-primary"
              >
                GitHub
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </LiquidGlass>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="liquid-glass mt-2 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[rgba(11,8,18,0.08)] md:hidden"
            >
              <motion.div
                className="space-y-4 p-5"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("/#") && pathname === "/") {
                          e.preventDefault()
                        }
                        handleNavClick(item.href)
                      }}
                      className={`block rounded-[1.2rem] border px-4 py-3 text-base transition-colors ${
                        isActive(item.href)
                          ? "border-primary/24 bg-primary/10 text-primary"
                          : "border-white/10 bg-white/[0.04] text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                  className="flex items-center gap-3"
                >
                  <Link
                    href="/search"
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/84"
                  >
                    搜索文章
                  </Link>
                  <Link
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/84"
                  >
                    GitHub
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

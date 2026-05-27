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
      <LiquidGlass
        variant={isScrolled || isMobileMenuOpen ? "strong" : "soft"}
        className="mx-auto max-w-6xl rounded-[1.9rem] transition-all duration-300"
        contentClassName="flex h-16 items-center justify-between px-4 md:px-6"
      >
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(235,99,197,0.6)]" />
            <span className="text-lg font-bold tracking-[0.22em] text-white md:text-xl">
              <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>
              {siteConfig.title.slice(1)}
            </span>
          </Link>

          <LiquidGlass className="hidden rounded-full md:block" contentClassName="flex items-center gap-2 px-3 py-2">
            <nav className="flex items-center gap-2">
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
                  className={`group relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  <motion.span
                    className="absolute inset-x-3 -bottom-[2px] h-px bg-primary"
                    initial={false}
                    animate={{ width: isActive(item.href) ? "calc(100% - 24px)" : "0%" }}
                    transition={{ duration: 0.2 }}
                  />
                  <span
                    className="absolute inset-0 rounded-full border border-primary/0 transition-all group-hover:border-primary/15"
                    style={{ boxShadow: isActive(item.href) ? "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 18px rgba(235,99,197,0.1)" : undefined }}
                  />
                </Link>
              ))}
            </nav>
          </LiquidGlass>

          <div className="flex items-center gap-2 md:gap-3">
            <LiquidGlass className="rounded-full" contentClassName="flex">
              <Link
                href="/search"
                aria-label="搜索文章"
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <Search className="w-4 h-4" />
              </Link>
            </LiquidGlass>
            <LiquidGlass className="hidden rounded-full md:block" contentClassName="flex">
              <Link
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub
              </Link>
            </LiquidGlass>

            <Button
              variant="ghost"
              size="icon"
              className="liquid-outline rounded-full text-muted-foreground md:hidden"
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
              className="liquid-glass overflow-hidden rounded-b-[1.9rem] border-t border-white/10 bg-[rgba(11,8,18,0.08)] md:hidden"
            >
              <motion.div
                className="space-y-6 p-5"
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
                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                  className="liquid-glass rounded-[1.4rem] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-white/45">Quick Access</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{siteConfig.description}</p>
                </motion.div>

                <motion.nav className="flex flex-col gap-3">
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
                        className={`block rounded-[1.2rem] px-4 py-3 text-base transition-colors ${
                          isActive(item.href)
                            ? "liquid-glass border-primary/24 text-primary"
                            : "liquid-outline text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <motion.div
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                  className="flex items-center gap-3"
                >
                  <Link
                    href="/search"
                    className="liquid-glass flex-1 rounded-full border-primary/24 px-4 py-3 text-center text-sm text-primary"
                  >
                    搜索文章
                  </Link>
                  <Link
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-outline flex-1 rounded-full px-4 py-3 text-center text-sm text-white/80"
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

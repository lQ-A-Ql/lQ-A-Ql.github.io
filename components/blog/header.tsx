"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/10 bg-[rgba(12,9,20,0.9)] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-md"
          : "border-white/8 bg-[linear-gradient(180deg,rgba(24,18,38,0.34),rgba(12,9,20,0.2))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[10px]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(235,99,197,0.6)]" />
          <span className="text-lg font-bold tracking-[0.22em] text-white md:text-xl">
            <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>
            {siteConfig.title.slice(1)}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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
              className={`group relative text-sm transition-colors ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-[18px] left-0 h-px bg-primary"
                initial={false}
                animate={{ width: isActive(item.href) ? "100%" : "0%" }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/search"
            aria-label="搜索文章"
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-primary md:inline-block"
          >
            GitHub
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="border-t border-white/8 bg-[rgba(12,9,20,0.96)] md:hidden"
          >
            <div className="space-y-3 px-4 py-4">
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
                  className={`block rounded-xl px-3 py-3 text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/search"
                  className="flex-1 rounded-full border border-white/10 px-4 py-3 text-center text-sm text-white/84"
                >
                  搜索文章
                </Link>
                <Link
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-full border border-white/10 px-4 py-3 text-center text-sm text-white/84"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

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
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 关闭移动菜单当路径变化
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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(8,9,16,0.86)] backdrop-blur-xl border-b border-white/8 shadow-[0_10px_36px_rgba(0,0,0,0.18)]"
          : "bg-transparent backdrop-blur-none border-b border-transparent shadow-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-bold tracking-[0.18em]">
              <span className="text-primary">{siteConfig.title.slice(0, 1)}</span>{siteConfig.title.slice(1)}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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
                className={`text-sm transition-colors relative group ${
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={false}
                  animate={{ 
                    width: pathname === item.href ? "100%" : "0%"
                  }}
                  transition={{ duration: 0.2 }}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Link href="/search" aria-label="搜索文章">
                <Search className="w-4 h-4" />
              </Link>
            </Button>
            <Link
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </Link>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <motion.nav 
              className="flex flex-col p-6 gap-4"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
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
                    className={`text-lg transition-colors block ${
                      pathname === item.href 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

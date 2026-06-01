"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronDown, ChevronRight, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/blog/page-transition"
import { blogPosts, siteConfig } from "@/lib/blog-data"
import { routeTransitionClassName, routeTransitionStartEvent } from "@/lib/client-events"

// Group posts by year and month
function groupPostsByDate(posts: typeof blogPosts) {
  const grouped: Record<string, Record<string, typeof blogPosts>> = {}
  
  posts.forEach(post => {
      const match = post.date.match(/(\d+)年(\d+)月/)
    if (match) {
      const year = match[1]
      const month = match[2] + "月"
      
      if (!grouped[year]) grouped[year] = {}
      if (!grouped[year][month]) grouped[year][month] = []
      grouped[year][month].push(post)
    }
  })
  
  return grouped
}

export default function ArchivePage() {
  const router = useRouter()
  const groupedPosts = groupPostsByDate(blogPosts)
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))
  
  const [expandedYears, setExpandedYears] = useState<string[]>(years)
  const [expandedMonths, setExpandedMonths] = useState<string[]>(
    years.flatMap(year => Object.keys(groupedPosts[year]).map(month => `${year}-${month}`))
  )

  const toggleYear = (year: string) => {
    setExpandedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    )
  }

  const toggleMonth = (yearMonth: string) => {
    setExpandedMonths(prev =>
      prev.includes(yearMonth) ? prev.filter(ym => ym !== yearMonth) : [...prev, yearMonth]
    )
  }

  const totalPosts = blogPosts.length

  const openPost = (postId: string) => {
    document.documentElement.classList.add(routeTransitionClassName)
    window.dispatchEvent(new CustomEvent(routeTransitionStartEvent))
    router.push(`/post/${postId}`)
  }

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <Header />


        {/* Archive Header */}
        <section className="relative z-10 pt-32 pb-12 px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
              variants={fadeUpVariant}
            >
              <Calendar className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              variants={fadeUpVariant}
            >
              文章归档
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              variants={fadeUpVariant}
            >
              共 <span className="text-primary font-medium">{totalPosts}</span> 篇文章，按时间线浏览
            </motion.p>
          </motion.div>
        </section>
        
        {/* Timeline */}
        <section className="relative z-10 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="relative"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border/50" />
              
              {years.map((year, yearIndex) => {
                const months = Object.keys(groupedPosts[year]).sort((a, b) => {
                  const monthA = parseInt(a)
                  const monthB = parseInt(b)
                  return monthB - monthA
                })
                const isYearExpanded = expandedYears.includes(year)
                const yearPostCount = months.reduce((acc, month) => acc + groupedPosts[year][month].length, 0)
                
                return (
                  <motion.div 
                    key={year} 
                    className="relative mb-8"
                    variants={fadeUpVariant}
                  >
                    {/* Year Header */}
                    <motion.button
                      className="flex items-center gap-4 mb-6 group"
                      onClick={() => toggleYear(year)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="relative z-10 w-8 h-8 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <span className="text-xs md:text-lg font-bold text-primary">{year.slice(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {year}年
                        </h2>
                        <span className="text-sm text-muted-foreground">({yearPostCount}篇)</span>
                        <motion.div
                          animate={{ rotate: isYearExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </motion.button>
                    
                    {/* Months */}
                    <AnimatePresence>
                      {isYearExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 md:ml-8 pl-8 md:pl-12 space-y-6"
                        >
                          {months.map((month) => {
                            const yearMonth = `${year}-${month}`
                            const isMonthExpanded = expandedMonths.includes(yearMonth)
                            const monthPosts = groupedPosts[year][month]
                            
                            return (
                              <div key={month}>
                                {/* Month Header */}
                                <motion.button
                                  className="flex items-center gap-3 mb-4 group"
                                  onClick={() => toggleMonth(yearMonth)}
                                  whileHover={{ x: 3 }}
                                >
                                  <div className="w-3 h-3 rounded-full bg-primary/50 border border-primary" />
                                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {month}
                                  </h3>
                                  <span className="text-sm text-muted-foreground">({monthPosts.length}篇)</span>
                                  <motion.div
                                    animate={{ rotate: isMonthExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  </motion.div>
                                </motion.button>
                                
                                {/* Posts */}
                                <AnimatePresence>
                                  {isMonthExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="space-y-3 ml-6"
                                    >
                                      {monthPosts.map((post, postIndex) => (
                                        <div
                                          key={post.id}
                                          className="group"
                                        >
                                          <button
                                            onClick={() => openPost(post.id)}
                                            className="w-full text-left p-4 rounded-lg bg-card/30 border border-border/30 hover:border-primary/50 hover:bg-card/50 transition-all"
                                          >
                                            <div className="flex items-start gap-3">
                                              <FileText className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                              <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                  {post.title}
                                                </h4>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                  <span className="px-2 py-0.5 rounded bg-secondary">
                                                    {post.category}
                                                  </span>
                                                  <span>{post.readTime}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </button>
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </main>
    </PageTransition>
  )
}

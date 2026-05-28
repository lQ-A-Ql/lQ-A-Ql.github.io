"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search as SearchIcon, X, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/blog/page-transition"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { blogPosts, categories, siteConfig } from "@/lib/blog-data"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get("category")
    if (category && categories.includes(category)) {
      setSelectedCategory(category)
    }
  }, [])

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.contentHtml.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.contentMarkdown || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "全部" || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <Header />


        {/* Search Header */}
        <section className="relative z-10 pt-32 pb-12 px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              variants={fadeUpVariant}
            >
              搜索文章
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mb-8"
              variants={fadeUpVariant}
            >
              在所有文章中查找你感兴趣的内容
            </motion.p>
            
            {/* Search Input */}
            <motion.div 
              className="relative max-w-xl mx-auto"
              variants={fadeUpVariant}
            >
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索文章标题、内容或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg bg-card/50 border-border/50 focus:border-primary/50 rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </motion.div>
            
            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mt-8"
              variants={fadeUpVariant}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </section>
        
        {/* Search Results */}
        <section className="relative z-10 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Count */}
            <motion.div 
              className="mb-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              找到 <span className="text-primary font-medium">{filteredPosts.length}</span> 篇相关文章
            </motion.div>
            
            {filteredPosts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={fadeUpVariant}
                  >
                    <BlogCard
                      id={post.id}
                      index={index}
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.date}
                      readTime={post.readTime}
                      category={post.category}
                      imageUrl={post.imageUrl}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FileText className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">没有找到相关文章</h3>
                <p className="text-muted-foreground mb-6">尝试使用不同的关键词或分类筛选</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("全部")
                  }}
                >
                  清除筛选条件
                </Button>
              </motion.div>
            )}
          </div>
        </section>
        
        <Footer />
      </main>
    </PageTransition>
  )
}


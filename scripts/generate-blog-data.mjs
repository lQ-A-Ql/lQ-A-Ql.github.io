import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const feedPath = path.join(root, "content", "legacy-feed.json")
const outputPath = path.join(root, "lib", "blog-data.ts")

const feed = JSON.parse(fs.readFileSync(feedPath, "utf8"))

const stripTags = (value) =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()

const extractImage = (html) => {
  const match = html.match(/<img[^>]+src="([^"]+)"/i)
  return match ? match[1] : undefined
}

const countReadMinutes = (html) => {
  const text = stripTags(html)
  const cjkChars = (text.match(/[\u3400-\u9fff]/g) || []).length
  const latinWords = text
    .replace(/[\u3400-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  const estimatedUnits = cjkChars + latinWords
  return `${Math.max(1, Math.ceil(estimatedUnits / 320))}分钟`
}

const formatDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}年${month}月${day}日`
}

const inferCategory = (item) => {
  const corpus = `${item.title} ${stripTags(item.summary || "")} ${stripTags(item.content_html || "")}`
  if (/(应急|取证|流量|入侵|ntlm|smb|ctf|攻击|后门|威胁|linux|windows|wireshark|hash|证书|pyrdp)/i.test(corpus)) {
    return "安全研究"
  }
  if (/(随笔|日常|生活|旅行|黄昏|创作|思考)/i.test(corpus)) {
    return "随笔"
  }
  return "技术"
}

const normalizeId = (item) =>
  item.url
    .split("/")
    .pop()
    .replace(/\.html?$/i, "")

const posts = feed.items
  .map((item) => {
    const content = item.content_html || ""
    const imageUrl = extractImage(content)
    const tags = Array.isArray(item.tags)
      ? item.tags.map((tag) => (typeof tag === "string" ? tag : tag?.name)).filter(Boolean)
      : []

    return {
      id: normalizeId(item),
      slug: normalizeId(item),
      title: item.title.trim(),
      excerpt: stripTags(item.summary || content).slice(0, 180),
      contentHtml: content,
      date: formatDate(item.date_published || item.date_modified || ""),
      isoDate: item.date_published || item.date_modified || "",
      readTime: countReadMinutes(content),
      category: inferCategory(item),
      imageUrl,
      tags,
    }
  })
  .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())

const categories = ["全部", ...new Set(posts.map((post) => post.category))]

const grouped = new Map()
for (const post of posts) {
  const date = new Date(post.isoDate)
  const year = `${date.getFullYear()}`
  const month = `${date.getMonth() + 1}月`
  if (!grouped.has(year)) {
    grouped.set(year, new Map())
  }
  const monthMap = grouped.get(year)
  monthMap.set(month, (monthMap.get(month) || 0) + 1)
}

const archives = Array.from(grouped.entries())
  .sort((a, b) => Number(b[0]) - Number(a[0]))
  .map(([year, months]) => ({
    year: Number(year),
    months: Array.from(months.entries())
      .sort((a, b) => Number(b[0].replace("月", "")) - Number(a[0].replace("月", "")))
      .map(([month, count]) => ({ month, count })),
  }))

const siteConfig = {
  title: feed.title || "QAQ",
  description: "偶尔发点应急取证的小WP喵",
  shortDescription: "一个奇怪的小角落OVO",
  author: feed.author?.name || "QAQ",
  githubUrl: "https://github.com/lQ-A-Ql",
  avatarUrl: "/legacy/avatar.png",
  ogImage: "/legacy/site-image.png",
  heroBackground: "/hero-bg.png",
}

const file = `export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  date: string
  isoDate: string
  readTime: string
  category: string
  imageUrl?: string
  tags: string[]
}

export interface SiteConfig {
  title: string
  description: string
  shortDescription: string
  author: string
  githubUrl: string
  avatarUrl: string
  ogImage: string
  heroBackground: string
}

export const siteConfig: SiteConfig = ${JSON.stringify(siteConfig, null, 2)} as const

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)} as BlogPost[]

export const categories = ${JSON.stringify(categories, null, 2)} as string[]

export const archives = ${JSON.stringify(archives, null, 2)} as const
`

fs.writeFileSync(outputPath, file, "utf8")
console.log(`generated ${posts.length} posts -> ${path.relative(root, outputPath)}`)

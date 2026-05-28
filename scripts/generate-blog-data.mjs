import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const feedPath = path.join(root, "content", "legacy-feed.json")
const mdDir = path.join(root, "content", "markdown")
const outputPath = path.join(root, "lib", "blog-data.ts")

const feed = fs.existsSync(feedPath) ? JSON.parse(fs.readFileSync(feedPath, "utf8")) : { items: [] }
const siteUrl = (feed.home_page_url || "https://lq-a-ql.github.io").replace(/\/$/, "")

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

const countReadMinutesFromText = (text) => {
  const clean = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#*_~>\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const cjkChars = (clean.match(/[\u3400-\u9fff]/g) || []).length
  const latinWords = clean
    .replace(/[\u3400-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  const estimatedUnits = cjkChars + latinWords
  return `${Math.max(1, Math.ceil(estimatedUnits / 320))}分钟`
}

const countReadMinutesFromHtml = (html) => countReadMinutesFromText(stripTags(html))

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

const inferCategoryFromText = (text) => {
  if (/(应急|取证|流量|入侵|ntlm|smb|ctf|攻击|后门|威胁|linux|windows|wireshark|hash|证书|pyrdp)/i.test(text)) {
    return "安全研究"
  }
  if (/(随笔|日常|生活|旅行|黄昏|创作|思考)/i.test(text)) {
    return "随笔"
  }
  return "技术"
}

const inferCategory = (item) => {
  const corpus = `${item.title || ""} ${stripTags(item.summary || "")} ${stripTags(item.content_html || "")}`
  return inferCategoryFromText(corpus)
}

const normalizeId = (item) =>
  (item.url || item.id || "")
    .split("/")
    .pop()
    .replace(/\.html?$/i, "")

const readMarkdownFile = (slug) => {
  const candidates = [
    path.join(mdDir, `${slug}.md`),
    path.join(root, `${slug}.md`),
  ]
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return fs.readFileSync(file, "utf8")
    }
  }
  return undefined
}

const parseFrontMatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) {
    return { attributes: {}, body: raw }
  }
  const block = match[1]
  const body = raw.slice(match[0].length)
  const attributes = {}
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (m) {
      const key = m[1].trim()
      let value = m[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      attributes[key] = value
    }
  }
  return { attributes, body }
}

const deriveMarkdownTitle = (attributes, body, fallbackTitle) => {
  if (attributes.title && attributes.title.trim()) {
    return attributes.title.trim()
  }
  const heading = body.match(/^\s*#\s+(.+)\s*$/m)
  if (heading) {
    return heading[1].replace(/[`#*~>]/g, "").trim()
  }
  return fallbackTitle
}

const normalizeMarkdownBody = (body) => {
  let md = body.replace(/\r\n/g, "\n")
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
    const safeAlt = String(alt || "").replace(/"/g, "&quot;")
    return `<figure class="post__image"><img loading="lazy" src="${src}" alt="${safeAlt}" data-is-external-image="true"></figure>`
  })
  return md.trim()
}

const inferIsoDate = (item, attributes, filePath) => {
  if (attributes.date && !Number.isNaN(new Date(attributes.date).getTime())) {
    return new Date(attributes.date).toISOString()
  }
  if (item.date_published && !Number.isNaN(new Date(item.date_published).getTime())) {
    return new Date(item.date_published).toISOString()
  }
  if (item.date_modified && !Number.isNaN(new Date(item.date_modified).getTime())) {
    return new Date(item.date_modified).toISOString()
  }
  if (filePath && fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath)
    return stat.mtime.toISOString()
  }
  return ""
}

const collectMarkdownArticles = () => {
  if (!fs.existsSync(mdDir)) {
    return []
  }
  return fs
    .readdirSync(mdDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      const filePath = path.join(mdDir, file)
      const raw = fs.readFileSync(filePath, "utf8")
      const { attributes, body } = parseFrontMatter(raw)
      const contentMarkdown = normalizeMarkdownBody(body)
      const title = deriveMarkdownTitle(attributes, body, slug)
      const isoDate = inferIsoDate({}, attributes, filePath)
      const category = inferCategoryFromText(`${title} ${contentMarkdown}`)
      const imageUrl = (contentMarkdown.match(/src="([^"]+)"/i) || [])[1]

      return {
        id: slug,
        slug,
        title,
        excerpt: stripTags(contentMarkdown).slice(0, 180),
        contentHtml: "",
        contentMarkdown,
        date: formatDate(isoDate),
        isoDate,
        readTime: countReadMinutesFromText(contentMarkdown),
        category,
        imageUrl,
        tags: attributes.tags
          ? String(attributes.tags)
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
        url: `${siteUrl}/${slug}.html`,
      }
    })
}

const feedItems = feed.items || []
const markdownArticles = collectMarkdownArticles()
const markdownBySlug = new Map(markdownArticles.map((item) => [item.slug, item]))
const feedBySlug = new Map(feedItems.map((item) => [normalizeId(item), item]))

const orderedSlugs = [
  ...feedItems.map((item) => normalizeId(item)),
  ...markdownArticles.map((item) => item.slug).filter((slug) => !feedBySlug.has(slug)),
]

const seen = new Set()
const uniqueSlugs = orderedSlugs.filter((slug) => {
  if (!slug || seen.has(slug)) {
    return false
  }
  seen.add(slug)
  return true
})

const posts = uniqueSlugs
  .map((slug) => {
    const feedItem = feedBySlug.get(slug) || {}
    const mdArticle = markdownBySlug.get(slug)
    const rawMarkdown = mdArticle?.contentMarkdown ? mdArticle : undefined
    const legacyContent = feedItem.content_html || ""
    const tags = Array.isArray(feedItem.tags)
      ? feedItem.tags.map((tag) => (typeof tag === "string" ? tag : tag?.name)).filter(Boolean)
      : mdArticle?.tags || []

    let contentMarkdown = rawMarkdown?.contentMarkdown
    let contentHtml = legacyContent
    let title = (feedItem.title || rawMarkdown?.title || slug).toString().trim()
    let excerptSource = feedItem.summary || legacyContent || contentMarkdown || ""
    let isoDate = inferIsoDate(feedItem, {}, undefined)
    let readTimeSourceHtml = legacyContent

    if (!isoDate && rawMarkdown) {
      const filePath = path.join(mdDir, `${slug}.md`)
      isoDate = inferIsoDate(feedItem, {}, filePath)
    }

    if (contentMarkdown && !rawMarkdown) {
      const filePath = path.join(mdDir, `${slug}.md`)
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf8")
        const { attributes, body } = parseFrontMatter(raw)
        contentMarkdown = normalizeMarkdownBody(body)
        title = deriveMarkdownTitle(attributes, body, title)
        excerptSource = stripTags(contentMarkdown)
        isoDate = isoDate || inferIsoDate(feedItem, attributes, filePath)
        readTimeSourceHtml = ""
      }
    }

    if (contentMarkdown && rawMarkdown) {
      title = rawMarkdown.title || title
      excerptSource = stripTags(contentMarkdown)
      readTimeSourceHtml = ""
    }

    const imageUrl =
      extractImage(legacyContent) ||
      rawMarkdown?.imageUrl ||
      (contentMarkdown ? (contentMarkdown.match(/src="([^"]+)"/i) || [])[1] : undefined)
    const readTime = readTimeSourceHtml
      ? countReadMinutesFromHtml(readTimeSourceHtml)
      : countReadMinutesFromText(contentMarkdown || stripTags(legacyContent))

    return {
      id: slug,
      slug,
      title,
      excerpt: stripTags(excerptSource).slice(0, 180),
      contentHtml: legacyContent,
      contentMarkdown,
      date: formatDate(isoDate),
      isoDate,
      readTime,
      category: contentMarkdown ? inferCategoryFromText(`${title} ${contentMarkdown}`) : inferCategory(feedItem),
      imageUrl,
      tags,
    }
  })
  .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())

const categories = ["全部", ...new Set(posts.map((post) => post.category))]

const grouped = new Map()
for (const post of posts) {
  const date = new Date(post.isoDate)
  if (Number.isNaN(date.getTime())) {
    continue
  }
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
  contentMarkdown?: string
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


import Link from "next/link"
import {
  Archive,
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  Github,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { blogPosts, categories, siteConfig } from "@/lib/blog-data"

const previewPosts = blogPosts.slice(0, 3)

const sampleCode = `tcp.port == 445 || http.request
frame contains "NTLMSSP"
ip.addr == 10.0.0.5`

const lightParticles = [
  { id: 1, left: "7%", top: "18%", size: 7, delay: 0.2 },
  { id: 2, left: "18%", top: "72%", size: 5, delay: 1.1 },
  { id: 3, left: "34%", top: "28%", size: 6, delay: 0.7 },
  { id: 4, left: "62%", top: "16%", size: 8, delay: 1.6 },
  { id: 5, left: "78%", top: "64%", size: 5, delay: 0.4 },
  { id: 6, left: "91%", top: "35%", size: 7, delay: 1.3 },
] as const

function LightPreviewCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  index,
}: {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  index: number
}) {
  return (
    <article
      className="light-preview-card group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] p-6"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative z-10 mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full border border-[#efc7dc]/70 bg-white/76 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#8a5976]">
          {category}
        </span>
        <span className="text-[11px] uppercase tracking-[0.24em] text-[#a87895]">
          ENTRY {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative z-10 mb-4 line-clamp-2 text-[1.32rem] font-bold leading-[1.35] text-[#342333] transition-colors group-hover:text-[#b83280]">
        {title}
      </h3>
      <p className="relative z-10 mb-7 line-clamp-4 text-sm leading-7 text-[#79586d]">
        {excerpt}
      </p>

      <div className="relative z-10 mt-auto flex items-end justify-between gap-4 border-t border-[#efcbd3]/70 pt-4">
        <div className="space-y-2 text-xs text-[#70848e]">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-[#f472b6] drop-shadow-[0_0_6px_rgba(244,114,182,0.22)]" />
            {date}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5 text-[#f472b6] drop-shadow-[0_0_6px_rgba(244,114,182,0.22)]" />
            {readTime} 阅读
          </span>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#f472b6] [text-shadow:0_1px_8px_rgba(244,114,182,0.18)]">
          继续查看
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}

export default function LightThemePreviewPage() {
  return (
    <main className="light-preview relative min-h-screen overflow-hidden">
      <div className="light-preview-bg" />
      <div className="light-preview-wash" />

      {lightParticles.map((particle) => (
        <span
          key={particle.id}
          className="light-preview-pixel"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/45 bg-white/42 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#ff8ec7] shadow-[0_0_14px_rgba(255,182,213,0.72)]" />
            <span className="text-lg font-black tracking-[0.22em] md:text-xl">
              <span className="text-[#f472b6] [text-shadow:0_2px_12px_rgba(244,114,182,0.24)]">
                {siteConfig.title.slice(0, 1)}
              </span>
              <span className="text-white [text-shadow:0_1px_0_rgba(34,49,58,0.2),0_6px_18px_rgba(47,134,162,0.18)]">
                {siteConfig.title.slice(1)}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 rounded-full border border-white/55 bg-white/34 px-5 py-2 text-sm text-[#435663] shadow-[0_12px_34px_rgba(64,93,118,0.08)] md:flex">
            <a href="#hero" className="font-semibold text-[#f472b6] [text-shadow:0_1px_8px_rgba(244,114,182,0.18)]">预览</a>
            <a href="#cards" className="text-[#f472b6] transition hover:text-[#e34fa3] [text-shadow:0_1px_8px_rgba(244,114,182,0.14)]">卡片</a>
            <a href="#markdown" className="text-[#f472b6] transition hover:text-[#e34fa3] [text-shadow:0_1px_8px_rgba(244,114,182,0.14)]">正文</a>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffc4e1]/80 bg-white/62 px-4 py-2 text-sm font-semibold text-[#f472b6] shadow-[0_12px_30px_rgba(244,114,182,0.12)] [text-shadow:0_1px_8px_rgba(244,114,182,0.18)]"
          >
            返回暗色站
          </Link>
        </div>
      </header>

      <section id="hero" className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl items-center px-5 pt-28 pb-16 md:px-6">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)]">
          <div
            className="light-preview-hero-panel relative overflow-hidden rounded-[2.25rem] p-7 md:p-10"
          >
            <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-[#bde8ff]/70 bg-white/54 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#356d88]">
              <Sparkles className="h-3.5 w-3.5 text-[#ff8ec7]" />
              Light Theme Preview
            </div>
            <h1 className="relative z-10 max-w-3xl text-5xl font-black leading-none tracking-[0.08em] text-[#26343f] md:text-7xl">
              <span className="text-[#f472b6] [text-shadow:0_4px_20px_rgba(244,114,182,0.28)]">Q</span>
              <span className="text-white [text-shadow:0_2px_0_rgba(34,49,58,0.18),0_10px_28px_rgba(47,134,162,0.2)]">AQ</span>
              <span className="ml-3 align-middle text-2xl text-[#4bb5df]">daylight</span>
            </h1>
            <p className="relative z-10 mt-6 max-w-xl text-balance text-lg leading-8 text-[#6b4a62] md:text-xl">
              用新背景做一版浅色博客氛围：干净但不空，保留一点街头感、像素可爱感和安全笔记的工具气。
            </p>
            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              {categories.filter((item) => item !== "全部").slice(0, 4).map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[#cfe0e7]/80 bg-white/62 px-4 py-2 text-sm font-semibold text-[#506a75] shadow-[0_10px_30px_rgba(60,95,120,0.06)]"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="relative z-10 mt-9 flex flex-wrap gap-3">
              <a
                href="#cards"
                className="inline-flex items-center gap-2 rounded-full bg-[#24323b] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(38,52,63,0.18)]"
              >
                看卡片
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#markdown"
                className="inline-flex items-center gap-2 rounded-full border border-[#b8dce9]/80 bg-white/64 px-5 py-3 text-sm font-bold text-[#2f6f89]"
              >
                看 Markdown
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside
            className="light-preview-side-card relative overflow-hidden rounded-[2rem] p-6"
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 -m-2 rounded-full bg-[#f472b6]/42 blur-md" />
                <div className="absolute inset-0 -m-4 rounded-full bg-[#8fe7ff]/22 blur-xl" />
                <img
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.author}
                  className="relative h-16 w-16 rounded-full border border-white/80 object-cover shadow-[0_14px_34px_rgba(62,91,105,0.16)]"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#70848e]">Author</p>
                <p className="mt-1 text-2xl font-black text-[#342333]">{siteConfig.author}</p>
              </div>
            </div>

            <div className="relative z-10 mt-7 grid gap-3">
              {[
                { icon: Archive, label: "归档", text: `${blogPosts.length} 篇文章` },
                { icon: Search, label: "搜索", text: "标题 / 内容 / 标签" },
                { icon: Github, label: "GitHub", text: "工具与复盘仓库" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-[1.2rem] border border-[#d7e4e9]/78 bg-white/58 px-4 py-3 text-[#435963] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]"
                >
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <item.icon className="h-4 w-4 text-[#2f86a2]" />
                    {item.label}
                  </span>
                  <span className="text-xs text-[#728690]">{item.text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="cards" className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-[#2f86a2]">Blog Cards</p>
            <h2 className="text-3xl font-black text-[#342333] md:text-5xl">浅色文章卡片</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#526873]">
            用偏白的半透明卡片压住复杂背景，边缘保留粉橘光和像素星点，读起来比暗色更轻。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {previewPosts.map((post, index) => (
            <LightPreviewCard
              key={post.id}
              index={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              category={post.category}
            />
          ))}
        </div>
      </section>

      <section id="markdown" className="relative z-10 mx-auto max-w-5xl px-5 py-16 md:px-6">
        <article className="light-preview-article prose max-w-none rounded-[2rem] px-5 py-7 sm:px-8 md:px-10 md:py-10">
          <div className="not-prose mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#eec9d2]/70 pb-6">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#2f86a2]">
                <ShieldCheck className="h-4 w-4" />
                Markdown Body
              </p>
              <h2 className="text-3xl font-black text-[#342333]">正文组件预览</h2>
            </div>
            <span className="rounded-full border border-[#83d8ff]/70 bg-[#ecfaff]/70 px-4 py-2 text-xs font-bold text-[#2f6f89]">
              code / quote / table
            </span>
          </div>

          <h2>一、浅色正文节奏</h2>
          <p>
            这版正文适合放威胁流量、入侵排查和 CTF 复盘。背景图本身信息量比较高，所以正文容器会更像一张半透明白纸，
            让文字、命令和结论先稳住。
          </p>

          <blockquote>
            <p>
              先保留证据，再做判断。浅色主题下引用块更像便签，用来放关键结论、注意事项和复盘提示。
            </p>
          </blockquote>

          <h3>代码块</h3>
          <p>
            行内代码例如 <code>NTLMSSP_AUTH</code>、<code>tcp.port == 445</code> 需要保持足够清楚，但不能太刺眼。
          </p>
          <pre className="hljs-wrapper">
            <code>{sampleCode}</code>
          </pre>

          <h3>表格与列表</h3>
          <ul>
            <li>卡片使用奶油白和柔和描边。</li>
            <li>引用块保留猫爪装饰，但透明度更低。</li>
            <li>代码块的小猫继续放在右下角，作为轻量彩蛋。</li>
          </ul>

          <table>
            <thead>
              <tr>
                <th>组件</th>
                <th>浅色策略</th>
                <th>重点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>代码块</td>
                <td>暖白底 + 像素猫</td>
                <td>可读性</td>
              </tr>
              <tr>
                <td>引用段</td>
                <td>淡粉便签 + 猫爪</td>
                <td>可爱但克制</td>
              </tr>
              <tr>
                <td>文章卡片</td>
                <td>半透明玻璃纸片</td>
                <td>压住复杂背景</td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>
    </main>
  )
}

import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { PageBackground } from "@/components/page-background"
import { siteConfig } from "@/lib/blog-data"
import "./globals.css"

const displayFont = localFont({
  src: "../public/legacy/fonts/AaNiHaoKeAi-ZaoDianXiangAi-2.ttf",
  variable: "--font-display",
})

const monoFont = localFont({
  src: "../public/legacy/fonts/code.ttf",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: `${siteConfig.title} | 博客`,
  description: siteConfig.description,
  generator: "Next.js",
  metadataBase: new URL("https://lq-a-ql.github.io"),
  icons: {
    icon: "/legacy/avatar.png",
    apple: "/legacy/avatar.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${displayFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body className="font-serif antialiased bg-background text-foreground">
        <Providers>
          <PageBackground />
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

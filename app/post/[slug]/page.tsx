import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import { getAdjacentPosts, getPostBySlug } from "@/lib/blog-utils"
import { PostPageClient } from "./post-page-client"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { previous, next } = getAdjacentPosts(post.slug)

  return <PostPageClient post={post} previous={previous} next={next} />
}

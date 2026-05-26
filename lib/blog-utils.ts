import { blogPosts } from "@/lib/blog-data"

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAdjacentPosts(slug: string) {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug)
  if (currentIndex === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous: blogPosts[currentIndex + 1],
    next: blogPosts[currentIndex - 1],
  }
}

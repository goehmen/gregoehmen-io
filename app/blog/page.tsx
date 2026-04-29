import type { JSX } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Blog',
  description: "Greg Oehmen's writing on AI-native product building, fractional CPO leadership, and building software with AI.",
  openGraph: {
    title: 'Greg Oehmen — Blog',
    description: 'Writing on AI-native product building, fractional CPO leadership, and building software with AI.',
    images: [{ url: 'https://gregoehmen.io/og-image.png' }],
  },
}

type PostMeta = {
  title: string
  date: string
  description: string
  slug: string
}

const postsDir = path.join(process.cwd(), 'content/blog')

function parseFrontmatter(content: string): Omit<PostMeta, 'slug'> {
  const get = (key: string) =>
    content.match(new RegExp(`${key}:\\s*["']([^"']+)["']`))?.[1] ?? ''
  return {
    title: get('title'),
    date: get('date'),
    description: get('description'),
  }
}

export default async function BlogIndex(): Promise<JSX.Element> {
  const posts: PostMeta[] = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace('.mdx', '')
      const content = fs.readFileSync(path.join(postsDir, f), 'utf-8')
      return { ...parseFrontmatter(content), slug }
    })
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0
      const bTime = b.date ? new Date(b.date).getTime() : 0
      return bTime - aTime
    })

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Blog</h1>
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-card rounded-lg p-6 hover:bg-card/80 transition-colors">
                  <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-accent-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-foreground-secondary text-sm mb-3">
                    {post.date
                      ? new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Unknown date'}
                  </p>
                  <p className="text-foreground-secondary leading-relaxed">{post.description}</p>
                  <span className="inline-block mt-4 text-sm text-accent-teal">Read more &rarr;</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

import type { JSX } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import EmailCapture from '@/app/components/EmailCapture'

export const runtime = 'nodejs'

const postsDir = path.join(process.cwd(), 'content/blog')

type Frontmatter = {
  title: string
  date: string
  description: string
  slug: string
  heroImage?: string
  heroImageAlt?: string
  heroImageCaption?: string
  canonicalUrl?: string
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { frontmatter }: { frontmatter: Frontmatter } = await import(`@/content/blog/${slug}.mdx`)
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.canonicalUrl && {
        alternates: { canonical: frontmatter.canonicalUrl },
      }),
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        url: `https://gregoehmen.io/blog/${frontmatter.slug}`,
        images: [{ url: 'https://gregoehmen.io/og-image.png' }],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPost({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params

  try {
    const { default: Post, frontmatter }: { default: () => JSX.Element; frontmatter: Frontmatter } =
      await import(`@/content/blog/${slug}.mdx`)

    return (
      <>
      <Header />
      <main className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <nav className="mb-8">
            <Link
              href="/blog"
              className="text-foreground-secondary hover:text-foreground text-sm transition-colors"
            >
              &larr; Back to blog
            </Link>
          </nav>
          <article className="max-w-3xl">
            {frontmatter.heroImage && (
              <figure className="mb-8">
                <Image
                  src={frontmatter.heroImage}
                  alt={frontmatter.heroImageAlt ?? frontmatter.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-lg"
                />
                {frontmatter.heroImageCaption && (
                  <figcaption className="text-center text-foreground-secondary text-sm mt-2 italic">
                    {frontmatter.heroImageCaption}
                  </figcaption>
                )}
              </figure>
            )}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                {frontmatter.title}
              </h1>
              <p className="text-foreground-secondary text-sm">
                {new Date(`${frontmatter.date}T00:00:00`).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                &middot; Greg Oehmen
              </p>
            </header>
            <Post />
            <EmailCapture />
          </article>
        </div>
      </main>
      <Footer />
      </>
    )
  } catch {
    notFound()
  }
}

import type { MDXComponents } from 'mdx/types'
import type { JSX } from 'react'
import Image from 'next/image'

function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}): JSX.Element {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-lg"
      />
      {caption && (
        <figcaption className="text-center text-foreground-secondary text-sm mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-foreground mt-8 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-foreground-secondary leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-foreground-secondary mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-foreground-secondary mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic text-foreground-secondary">{children}</em>,
    a: ({ href, children }) => (
      <a href={href} className="text-accent-teal underline hover:opacity-80" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-teal pl-4 italic text-foreground-secondary my-4">
        {children}
      </blockquote>
    ),
    Figure,
    ...components,
  }
}

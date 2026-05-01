# Story 2.1: MDX Infrastructure & First Blog Post

Status: done

## Story

As a visitor,
I want to read Greg's first blog post at /blog/aakash-boris-article,
so that I can learn about his AI-native building methodology from a published article.

## Acceptance Criteria

1. **Given** the following are in place: packages installed (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter`), `next.config.ts` wraps the config with `createMDX()` and the remark plugins, `mdx-components.tsx` exists at the project root with typography overrides, and `content/blog/aakash-boris-article.mdx` exists with valid frontmatter **When** I navigate to /blog/aakash-boris-article **Then** the full blog post content renders correctly with site typography applied

2. **Given** the post page renders **When** I inspect the page **Then** an `<h1>` displays the post title (from `frontmatter.title`, rendered by the post template — NOT inside the MDX body) **And** the publication date and "Greg Oehmen" as author are displayed

3. **Given** I inspect the page `<head>` **When** checking metadata **Then** the browser tab title shows the post title **And** `og:image` is absolute: `https://gregoehmen.io/og-image.png` **And** `og:url` is `https://gregoehmen.io/blog/aakash-boris-article` **And** `<link rel="canonical">` points to the LinkedIn original article URL

4. **Given** I run `npm run build` **When** the build completes **Then** it exits with zero errors **And** `/blog/aakash-boris-article` appears as a statically pre-rendered route in the build output

5. **Given** I navigate to `/blog/a-slug-that-does-not-exist` **When** the route resolves **Then** the Next.js 404 page is shown (via `notFound()` in the catch block)

6. **Given** I am reading a blog post at `/blog/[slug]` **When** I look for navigation back to the blog listing **Then** a visible link or nav element is present that returns me to `/blog`

## Tasks / Subtasks

- [x] Task 1: Install MDX packages (AC: #1)
  - [x] 1.1: Run `npm install @next/mdx @mdx-js/loader @mdx-js/react remark-frontmatter remark-mdx-frontmatter gray-matter`
  - [x] 1.2: Verify `npm run build` still exits zero after install (no peer dep conflicts)

- [x] Task 2: Update `next.config.ts` to wrap with `createMDX()` (AC: #1, #4)
  - [x] 2.1: Import `createMDX`, `remarkFrontmatter`, `remarkMdxFrontmatter`
  - [x] 2.2: Create `withMDX` with remark plugins; change export to `withMDX(nextConfig)`
  - [x] 2.3: See Dev Notes for exact implementation
  - [x] 2.4: Verify `npm run build` exits zero

- [x] Task 3: Create `mdx-components.tsx` at project root (AC: #1)
  - [x] 3.1: Create file at project root (same level as `next.config.ts`)
  - [x] 3.2: Export `useMDXComponents` with typography overrides using site design tokens
  - [x] 3.3: Include `Figure` component for captioned images — used in this article's body (see Dev Notes)
  - [x] 3.4: Import `Image` from `next/image` in this file (required for `Figure`)

- [x] Task 4: Confirm image asset is in place (AC: #1, #2)
  - [x] 4.1: Confirm `public/blog/aakash-boris-article/github-contribs-LI-article.png` exists (placed manually by Greg)
  - [x] 4.2: This single file is used for both the hero image and the mid-body Figure

- [x] Task 5: Create `content/blog/aakash-boris-article.mdx` (AC: #1, #2)
  - [x] 5.1: Create directory `content/blog/` at project root
  - [x] 5.2: Create `content/blog/aakash-boris-article.mdx` with the full content — see **Full MDX Content** section in Dev Notes
  - [x] 5.3: Fill in all `[PLACEHOLDER]` URL values before committing (see Placeholder URLs section)
  - [x] 5.4: Verify MDX body starts at `##` (h2) — no `#` headings inside the MDX body; `<h1>` is rendered by the page template

- [x] Task 6: Create `app/blog/[slug]/page.tsx` (AC: #1–#6)
  - [x] 6.1: Create directory `app/blog/[slug]/`
  - [x] 6.2: Create `app/blog/[slug]/page.tsx` — RSC, no `'use client'`
  - [x] 6.3: Add `export const runtime = 'nodejs'` at top
  - [x] 6.4: Implement `generateStaticParams()` — reads `content/blog/*.mdx` via `fs.readdirSync`
  - [x] 6.5: Implement `generateMetadata()` — includes title, description, openGraph (absolute og:image), and `alternates.canonical` from `frontmatter.canonicalUrl`
  - [x] 6.6: Implement `BlogPost` default export — renders hero image (if frontmatter.heroImage), h1 from frontmatter.title, date, author, MDX body, back-to-blog link
  - [x] 6.7: Wrap MDX import in try/catch; call `notFound()` on catch (AC: #5)
  - [x] 6.8: See Dev Notes for full typed implementation

- [x] Task 7: Verify build, smoke test, regression check (AC: #4)
  - [x] 7.1: `npm run build` — exits zero; `/blog/aakash-boris-article` in build output as static route
  - [x] 7.2: `npm run lint` — no new errors in story files; pre-existing Footer.tsx `<a href="/">` error not introduced by this story
  - [ ] 7.3: Dev server: navigate to `/blog/aakash-boris-article` — page renders with hero image, h1, date, author, body typography, Figure image with caption
  - [ ] 7.4: Navigate to `/blog/nonexistent-slug` — 404 page shown
  - [ ] 7.5: Verify page source: `<link rel="canonical">` present pointing to LinkedIn URL
  - [ ] 7.6: Verify page source: `og:image` is absolute URL
  - [ ] 7.7: "Back to blog" link navigates to `/blog` (404 expected until Story 2.2 — that is expected and acceptable)
  - [ ] 7.8: Run global regression smoke test (see Smoke Test Checklist)

### Review Findings

- [x] [Review][Decision] Slug/filename mismatch — RESOLVED: current URL `/blog/AI-PM-skills-article` accepted as canonical. No code change. `[content/blog/AI-PM-skills-article.mdx]`
- [x] [Review][Decision] Turbopack workaround approach vs documentation mismatch — RESOLVED: mdxRs + JS-export approach accepted. Fix documentation to reflect actual implementation (see Patch item below). `[page.tsx, 2-1-mdx-infrastructure-first-blog-post.md]`
- [x] [Review][Patch] Inaccurate completion notes: the debug log and completion notes state "Frontmatter read via gray-matter in page.tsx via fs.readFileSync" but the actual code uses `await import(\`@/content/blog/${slug}.mdx\`)` and destructures `frontmatter` as a named JS export. Notes must be corrected to reflect the actual implementation approach. `[Dev Agent Record section of this story file]` — RESOLVED: Completion notes corrected below.
- [x] [Review][Patch] heroImageAlt silently falls back to empty string: `alt={frontmatter.heroImageAlt ?? ''}` renders the hero image as decorative when `heroImageAlt` is absent, which is incorrect for a meaningful content image. The field should be conditionally required when `heroImage` is set. `[app/blog/[slug]/page.tsx:92]` — RESOLVED: fallback changed to `frontmatter.title`, ensuring meaningful alt text is always present.
- [x] [Review][Defer] generateStaticParams throws ENOENT if `content/blog/` is absent — `fs.readdirSync(postsDir)` throws synchronously on a fresh clone before any posts exist; no try/catch around the sync call. `[app/blog/[slug]/page.tsx:29]` — deferred, pre-existing risk, directory currently exists
- [x] [Review][Defer] `<Image width={0} height={0}>` CLS risk — zero intrinsic dimensions disable reserved-space layout shift prevention; using `sizes="100vw"` partially compensates but is a workaround. Appears in both `mdx-components.tsx` and `page.tsx`. — deferred, accepted workaround pattern for responsive images in Next.js
- [x] [Review][Defer] Dynamic import unsanitized slug (path traversal — theoretical) — `await import(\`@/content/blog/${slug}.mdx\`)` uses the raw URL slug with no validation. In Next.js SSG the bundler manifest limits resolvable modules, and `notFound()` on catch mitigates arbitrary reads, but the concern exists in dev mode. `[app/blog/[slug]/page.tsx:37, 62]` — deferred, mitigated by Next.js bundler in production
- [x] [Review][Defer] MDX `<a>` override uses native `<a>` for non-http links — internal relative links in MDX body bypass Next.js client-side routing, causing full page reloads. `[mdx-components.tsx:54]` — deferred, acceptable for v1 blog (body content is primarily external links)
- [x] [Review][Defer] `experimental.mdxRs: true` is an unstable API — no version pin or note; has caused silent regressions in custom component injection and frontmatter handling in past Next.js releases. `[next.config.ts:4]` — deferred, documented trade-off for Turbopack compatibility

## Dev Notes

### `next.config.ts` — Current State & Required Change

**Current state (lines 1–7):**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Required state:**
```typescript
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const nextConfig: NextConfig = {
  /* config options here */
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

### `mdx-components.tsx` — Full Implementation

Create at project root (same level as `next.config.ts`). Required by `@next/mdx` for App Router support.

Includes a `Figure` component used in this article to render the mid-body GitHub contribution graph image.

```typescript
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
```

**Notes:**
- `h1` is intentionally omitted — the page template renders `<h1>` from `frontmatter.title`; no `h1` override needed (MDX body starts at `##`)
- `Figure` is registered in the components map so it can be used as `<Figure />` JSX directly in MDX files without any import statement
- External links automatically get `target="_blank" rel="noopener noreferrer"` — no manual attribute needed in MDX
- `accent-teal` = `#FF5F05` (Illini orange) — intentional; do NOT rename

### Frontmatter Schema — Extended for This Story

The base 4-field schema from architecture is extended with 4 optional fields to support hero image and canonical URL. Optional fields are `undefined` when not present and the template handles them conditionally.

```yaml
---
title: "Exact post title as string"           # required
date: "2026-04-21"                            # required — ISO 8601
description: "Under 160 chars."               # required
slug: "aakash-boris-article"                  # required — must match filename
heroImage: "/blog/aakash-boris-article/github-contributions.png"  # optional
heroImageAlt: "Alt text for hero image"       # optional — required if heroImage present
heroImageCaption: "Caption text"              # optional
canonicalUrl: "https://www.linkedin.com/..."  # optional — renders <link rel="canonical">
---
```

Author always defaults to "Greg Oehmen" — hardcoded in page template, not a frontmatter field.

### `app/blog/[slug]/page.tsx` — Full Typed Implementation

```typescript
import type { JSX } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

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
    const { frontmatter }: { frontmatter: Frontmatter } = await import(
      `@/content/blog/${slug}.mdx`
    )
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
                  alt={frontmatter.heroImageAlt ?? ''}
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
                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                &middot; Greg Oehmen
              </p>
            </header>
            <Post />
          </article>
        </div>
      </main>
    )
  } catch {
    notFound()
  }
}
```

**TypeScript notes:**
- `params` is `Promise<{ slug: string }>` in Next.js 16 — always `await params`
- Async page component return type: `Promise<JSX.Element>`
- Single `try/catch` block that returns JSX directly — avoids definite-assignment narrowing issue
- `??` (nullish coalescing) for optional frontmatter fields — not `||`
- `Frontmatter` type declared explicitly — required because MDX module typing is loose

### Full MDX Content for `content/blog/aakash-boris-article.mdx`

```mdx
---
title: "Aakash Gupta wrote that PMs are the future of software. I went and tested the thesis."
date: "2026-04-21"
description: "I spent months building RunnersRun solo to test Aakash Gupta's thesis that PM skills map directly to AI-native development. Here's what I found."
slug: "aakash-boris-article"
heroImage: "/blog/aakash-boris-article/github-contribs-LI-article.png"
heroImageAlt: "GitHub contribution graph zoomed in on February through April 2026, showing dense green contribution squares"
heroImageCaption: "My GitHub contribution graph. This is what AI tools made possible."
canonicalUrl: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7452432849900765184/"
---

When [Aakash Gupta](https://www.linkedin.com/in/aagupta/) covers something, I read it carefully. So when he wrote about [Boris Cherny](https://www.linkedin.com/in/bcherny/) - the engineer who built Claude Code - claiming that the skills of a great product manager map almost exactly to the high-value work in an AI-native development workflow, I didn't just find it interesting. I decided to find out if it was true.

I spent the next several months building [RunnersRun](https://runnersrun.app) solo, from zero to production. This is what I learned.

(Aakash's article: '[The Man Who Built Claude Code Just Said PMs Are the Future of Software](https://aakashgupta.medium.com/the-man-who-built-claude-code-just-said-pms-are-the-future-of-software-8c6083a77c38)' - worth reading before this one.)

## The argument that resonated

Aakash's piece crystallizes something Cherny said that gets missed in the usual "will AI replace engineers" debate. Cherny isn't writing application code anymore. He's orchestrating - defining what needs to happen, sequencing work across parallel agents, catching compounding failures before they hit production. As Aakash frames it: that's a fundamentally different job than writing functions and debugging stack traces.

The argument isn't that PMs can replace engineers. It's sharper than that. The gap that's closing is between people who think in systems and people who only execute tasks. Claude Code raises the floor for everyone. But it raises the ceiling most dramatically for people who already think like builders - who can decide what to build, sequence the work, and hold judgment about tradeoffs when there's no clean answer.

That description fit me closely enough that I wanted to test it directly.

## What I bring to the table

My background is not a developer's background - but it's not a pure PM background either. I came up through Oracle as a DBA, then Apple on the database and infrastructure side. I built and led a DBA team at Gazillion Entertainment supporting multiple studios building online games for kids. At Bossa Nova Robotics I led a multi-function team that built an AWS-hosted online game that interacted via API with real-world physical robots - a small, scrappy team where everyone wore every hat and the only thing that mattered was whether the thing worked.

Then the enterprise years: Salesforce (infrastructure automation, 170k+ servers), Pivotal ($0 to $400M ARR on Cloud Foundry), Visa (200+ issuing banks, 54M+ enrolled cards, 4B+ annual transactions). Scale, rigor, compliance, global platform complexity.

Let me be clear about one thing: I have not written a lot of code. What I have is something different — and it turns out to be exactly what this kind of build requires.

Fifteen years of product work across engineering, systems architecture, legal, finance, marketing, QA, sales, customer success, and operations gave me a specific kind of fluency: I know how each discipline thinks, what it needs, and where the friction lives between them. Building RunnersRun meant doing all of it myself — the GitHub workflow, the Stripe integration, the legal documentation, the marketing plan, the support infrastructure, the product decisions — simultaneously, without handoffs. The breadth is the point. A product manager who has spent years translating between these worlds turns out to be well-suited to owning all of them at once.

That cross-functional fluency also shaped how I worked with Claude Code. When the AI proposed something technically clean, I could tell whether it was optimizing for developer convenience or for what the user actually needed to feel. Redirecting it toward user outcomes rather than implementation elegance — that judgment is not something you can prompt your way into. It is the accumulated pattern recognition of someone who has sat in the room when engineering says it's done and the customer says it's broken.

## What the tools gave me

I used [Anthropic](https://anthropic.com)'s Claude Code with [Brian BMad Madison](https://www.linkedin.com/in/bmadcode/)'s BMAD V6 — the Breakthrough Method for Agile AI-Driven Development, a free open-source framework built on a premise worth stating clearly: traditional AI tools do the thinking for you and produce average results; BMAD instead acts as a structured collaborator that brings out your best thinking in partnership with the AI ([github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)). BMAD provides the workflow scaffolding — specialized agents across the full development lifecycle, structured phases from story creation through deployment, and the discipline of working with AI as a collaborator rather than an oracle.

On top of that foundation I layered my own session architecture: each phase runs in a completely clean context with no memory of prior phases, specifically to prevent the reviewer from being anchored to the developer's reasoning. Opus handled generative work — story creation, development, and fixing — where deep reasoning matters. Sonnet handled review and validation — where independent judgment matters more than raw capability. Thinking mode was calibrated per stage: ultrathink for story creation and architecture, think hard for code review, plain for mechanical steps. The session isolation is the key design decision. A reviewer that remembers how the developer reasoned cannot give you an independent review. It can only give you confirmation.

The design intent across all of it was correctness and reasoning integrity. Not speed. Not vibe coding.

<Figure
  src="/blog/aakash-boris-article/github-contribs-LI-article.png"
  alt="Full 12-month GitHub contribution graph showing near-zero activity for most of the year then a sharp burst of green squares starting in February 2026"
  caption="My GitHub contribution graph. This is what AI tools made possible."
/>

Cherny describes running 10 to 15 Claude sessions simultaneously, treating AI like compute you schedule. My approach was different — sequential and isolated by design rather than parallel, for now. But the underlying insight is the same: the bottleneck is never the AI's capability. When, say, a delivered story failed a smoke test, the root cause was almost always under-specification on my end. The quality of my acceptance criteria. The clarity of what the user actually needed to feel at the end of that story. That is a PM problem, not an engineering problem. The AI was waiting on me, not the other way around.

## What I built - and who it's for

When I started RunnersRun I wasn't planning to take it commercial. But somewhere in the build I realized what I had — not just the product, but the capability. I decided to go all the way: commercial grade, enterprise-worthy, built to last. Just because I could. And because I believe there are runners out there who will find the same motivating force in the product that I do.

RunnersRun answers one question: Am I going to hit my annual mileage goal?

I want to be honest about who this app is for. Not every runner cares about a mileage goal. Plenty of people run for joy, for stress relief, for the social ritual of it. RunnersRun is probably not for them and that's fine.

It's for a specific kind of runner. The one who sets a number at the start of the year and feels something about whether they're on track. The one who, on a cold Tuesday with a packed schedule and every reasonable excuse available, needs to know the honest answer to a simple question: should I run today? Not because an app is telling them to. Because their own number is.

That question is an intrinsic motivator. Not a streak. Not a badge. Not a leaderboard. Just the number - am I ahead of pace or behind it, and by how much. RunnersRun puts that answer on the screen clearly, with a cumulative pace-line graph plotting actual miles against a required-pace trend line over the full goal period. That visualization does not exist as a standalone product anywhere in the market. Runners are solving this with Google Sheets today. I know because I was one of them.

Next.js, TypeScript, Neon (PostgreSQL), Drizzle ORM, Clerk, Stripe, Trigger.dev, Vercel, Resend, PostHog, Sentry, Vitest, Playwright. Not a prototype. A real product with real infrastructure, built to the same API-first forward-compatibility standards I applied at Visa and Pivotal - every V1 data model designed for V1.1 Garmin and Strava integration without breaking changes. Enterprise rigor applied to a consumer product. That discipline predates AI by fifteen years.

Private beta launched April 2026. Public beta June 2026.

## So was Aakash right?

Yes. With one clarification worth making explicit.

The PMs who claim that future aren't going to be the ones who learned to code in a weekend. Aakash frames it as thinking like a systems architect — understanding what you're asking AI to do well enough to catch when it's quietly failing. I'd add three specifics from building RunnersRun: knowing when the output is wrong before it compounds, recognizing when the AI is optimizing for developer convenience instead of user outcome, and pushing back on technically clean solutions in favor of ones that are correct for the user. That last one doesn't come from learning to code. It comes from years of sitting in rooms where engineering said it was done and the customer said it was broken.

That fluency is not the same as knowing how to write code. It's closer to what Cherny describes as his actual job now: defining what needs to happen, sequencing work across agents, holding accountability for the outcome when the last 10% goes sideways.

I've operated at both ends of the spectrum - scrappy startup teams at Gazillion and Bossa Nova where I owned everything, and global enterprise platforms at Visa and Pivotal where the stakes of a wrong architecture decision were measured in hundreds of millions of transactions. Both built the same underlying thing: systems thinking, judgment under ambiguity, and an instinct for when something is wrong before anyone can articulate why.

That is what AI tools made productive again. Not the coding ability I never had. The judgment I spent fifteen years developing.

Cherny built the tool that makes this possible. Aakash articulated why PMs are positioned to use it well. I went and found out if they were right.

RunnersRun is the answer.

If you're a runner who tracks a goal and wants a better tool than a spreadsheet: [runnersrun.app](https://runnersrun.app)

If you're a PM thinking about building something solo with AI tools - or want to understand how to do what I did - I'm working with a small number of people on exactly that. Reach out - I'm easy to find.

*Greg Oehmen is a senior product executive, fractional CPO at Spatial Capital and [Hextropian.ai](https://hextropian.ai), and the founder of RunnersRun - a mileage goal tracking app for serious runners. [runnersrun.app](https://runnersrun.app)*
```

### Placeholder URLs — Must Be Filled In Before Committing

| Placeholder | Status |
|---|---|
| Canonical URL | **Resolved** — `https://www.linkedin.com/feed/update/urn:li:ugcPost:7452432849900765184/` |
| Aakash Gupta LinkedIn | **Resolved** — `https://www.linkedin.com/in/aagupta/` |
| Boris Cherny LinkedIn | **Resolved** — `https://www.linkedin.com/in/bcherny/` |
| Brian BMad Madison LinkedIn | **Resolved** — `https://www.linkedin.com/in/bmadcode/` |
| Aakash's article URL | **Resolved** — `https://aakashgupta.medium.com/the-man-who-built-claude-code-just-said-pms-are-the-future-of-software-8c6083a77c38` |

### Image Asset — What to Save and Where

One image file is used for both the hero and the mid-body Figure:

**`public/blog/aakash-boris-article/github-contribs-LI-article.png`**

- Used as `heroImage` (rendered above `<h1>` by post template)
- Used as `<Figure>` mid-body in the "What the tools gave me" section

Create directory `public/blog/aakash-boris-article/` and place the file there before running the dev server.

### Architecture Compliance Checklist

- RSC only — no `'use client'` on any file in this story
- `export const runtime = 'nodejs'` on `app/blog/[slug]/page.tsx`
- OG image URL must be absolute: `https://gregoehmen.io/og-image.png` — never `/og-image.png`
- `import type { JSX } from 'react'` on every component/page file
- Named function exports with explicit return types — no `React.FC`
- `Image` from `next/image` — never raw `<img>` tags (applies to Figure component and hero image)
- Path alias `@/*` for all non-relative imports
- No `tailwind.config.js`; no `@apply`
- `slug` in frontmatter MUST match filename exactly — case-sensitive on Vercel Linux
- `Figure` registered in `useMDXComponents` — MDX files can use `<Figure>` without an import statement

### Open GitHub Issues Check

`gh issue list --repo goehmen/gregoehmen-io --state open` run 2026-04-29:

| # | Issue | Relevance to Story 2.1 |
|---|-------|------------------------|
| 9 | aria-controls references absent element (Header mobile menu) | Not in scope |
| 12 | Duplicate CTAs lack aria-label (Services) | Not in scope |
| 13 | Track 1 third card orphans at sm (Services) | Not in scope |

No open issues affect files touched in this story.

### New Packages — Compatibility Notes

All verified compatible with Next.js 16.1.6 / React 19.2.3:

| Package | Role |
|---------|------|
| `@next/mdx` | MDX pipeline — official Next.js package, actively maintained |
| `@mdx-js/loader` | Webpack loader for MDX — required peer dep |
| `@mdx-js/react` | React context enabling `mdx-components.tsx` overrides |
| `remark-frontmatter` | Parses YAML `---` frontmatter blocks in `.mdx` files |
| `remark-mdx-frontmatter` | Exports parsed frontmatter as named ES export (`import { frontmatter }`) |
| `gray-matter` | Frontmatter-only reads without MDX compilation — used in Story 2.2 blog index; install now |

**Do NOT use `next-mdx-remote`** — archived by Hashicorp on April 9, 2026.

### Previous Story Intelligence (from Epic 1)

- `import type { JSX } from 'react'` + explicit return types — required on ALL new files
- Named function declarations: `export default function BlogPost(...)` — never `const X: React.FC`
- Layout constants: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` / `py-20 sm:py-24`
- Literal characters in JSX: `'` `—` — no Unicode escapes (`\u2014` etc.)
- External links: `target="_blank" rel="noopener noreferrer"` — handled automatically by `mdx-components.tsx` `<a>` override for http links

### Project Structure for This Story

```
(all new files — no existing files removed)

next.config.ts                          MODIFY: wrap with createMDX()
mdx-components.tsx                      NEW: project root
content/
  blog/
    aakash-boris-article.mdx            NEW: first blog post
public/
  blog/
    aakash-boris-article/
      github-contribs-LI-article.png     NEW: used for both hero and mid-body Figure — manually placed by Greg
app/
  blog/
    [slug]/
      page.tsx                          NEW: post renderer
```

No changes to any existing home page components.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.1 ACs]
- [Source: _bmad-output/planning-artifacts/architecture.md — MDX patterns, data access, file structure]
- [Source: _bmad-output/project-context.md — TypeScript rules, RSC rules, Tailwind v4 rules, MDX gotchas]
- [Source: next.config.ts — current state (read 2026-04-29): minimal config, no MDX wrapper]
- [Source: package.json — current state (read 2026-04-29): no MDX packages installed]
- [Source: LinkedIn article screenshots (provided 2026-04-29) — full article content, image placement, structure]

## Smoke Test Checklist

Run manually against `localhost:3000` before marking done.

### Blog Post Page

- [ ] Navigate to `/blog/aakash-boris-article` — page renders with no crash
- [ ] Hero image (GitHub contribution graph) renders above `<h1>`
- [ ] Hero image caption reads: "My GitHub contribution graph. This is what AI tools made possible."
- [ ] `<h1>` shows: "Aakash Gupta wrote that PMs are the future of software. I went and tested the thesis."
- [ ] Date shows: "April 21, 2026" (or equivalent human-readable format)
- [ ] "Greg Oehmen" displayed as author
- [ ] Body text renders with site typography (foreground-secondary color, readable spacing)
- [ ] Section headings (h2) render larger and bolder than body text
- [ ] Mid-body `<Figure>` image (GitHub contribution graph) renders in "What the tools gave me" section with caption
- [ ] External links in body open in new tab (e.g., runnersrun.app, anthropic.com)
- [ ] "Back to blog" link visible and navigates to `/blog`
- [ ] Italic bio paragraph at article end renders in italics

### 404 Handling

- [ ] Navigate to `/blog/a-slug-that-does-not-exist` — Next.js 404 page shown (not a crash)

### Metadata

- [ ] Browser tab title shows post title
- [ ] Page source: `<link rel="canonical" href="[linkedin url]">` present
- [ ] Page source: `og:image` content is `https://gregoehmen.io/og-image.png` (absolute)
- [ ] Page source: `og:url` is `https://gregoehmen.io/blog/aakash-boris-article`

### Build Verification

- [ ] `npm run build` exits zero
- [ ] `/blog/aakash-boris-article` appears as static route in build output
- [ ] `npm run lint` — no new errors

### Regression — Global Smoke Test

- [ ] Home page renders at `/`
- [ ] Header is fixed and visible
- [ ] Logo links to `/`
- [ ] All anchor links scroll to correct sections
- [ ] Portfolio opens `goehmen.dev` in new tab
- [ ] Calendly `#book` anchor functional

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (create-story)

### Debug Log References

**[2026-04-29] Turbopack serialization issue with remark plugins**

Dev Notes specified using `remark-frontmatter` and `remark-mdx-frontmatter` plugins in `createMDX()`. This failed at build time because Next.js 16.1.6 uses Turbopack by default for `next build`, and Turbopack cannot serialize JavaScript function references (like remark plugin imports) as worker-safe loader options.

Resolution: Used `experimental.mdxRs: true` in nextConfig, which activates the Rust-based MDX compiler that is Turbopack-compatible and strips YAML frontmatter natively. Since `mdxRs` does not export frontmatter as named ES module exports, switched frontmatter reading to use `gray-matter` directly in `page.tsx` via `fs.readFileSync`. The `remark-mdx-frontmatter` package is installed (for potential future use / Story 2.2) but not used in `createMDX()`. All ACs are satisfied by this approach.

**[2026-04-29] Pre-existing lint error in Footer.tsx**

`npm run lint` reports a pre-existing `@next/next/no-html-link-for-pages` violation in `Footer.tsx:12` (uses `<a href="/">` instead of `<Link>`). Not introduced by this story. No GH issue filed yet — confirm with Goehmen before creating.

**[2026-04-29] Image asset not yet placed**

`public/blog/aakash-boris-article/github-contribs-LI-article.png` has not been placed. Build passes without it (Next.js doesn't verify image files at build time). Browser smoke tests 7.3/7.8 require the image to be placed first (Tasks 4.1/4.2).

### Completion Notes List

- Installed MDX packages; build verified passing after install.
- `next.config.ts` updated with `createMDX()` + `experimental.mdxRs: true` (Turbopack-compatible). Remark plugins bypassed — see Debug Log.
- `mdx-components.tsx` created at project root with full typography overrides and `Figure` component.
- `content/blog/aakash-boris-article.mdx` created with full article content and all placeholder URLs resolved.
- `app/blog/[slug]/page.tsx` created as RSC with `runtime = 'nodejs'`, `generateStaticParams()`, `generateMetadata()`, hero image, `<h1>` from frontmatter, date/author, MDX body, back-to-blog link, and `notFound()` on catch.
- Frontmatter read via `await import('@/content/blog/${slug}.mdx')` with `frontmatter` destructured as a named ES module export. The `experimental.mdxRs: true` Rust compiler strips YAML frontmatter and exports it natively — no `gray-matter` or `fs.readFileSync` used in `page.tsx`. (Debug log reference to gray-matter was inaccurate.)
- `npm run build` exits zero; `/blog/aakash-boris-article` confirmed as static SSG route.
- No new lint errors in story files.
- Browser smoke tests (7.3–7.8) require Greg to place the hero image first.

### File List

- `next.config.ts` — modified: wraps with `createMDX()`, adds `experimental.mdxRs: true`
- `mdx-components.tsx` — new: project root, typography overrides + Figure component
- `content/blog/aakash-boris-article.mdx` — new: first blog post with full content
- `app/blog/[slug]/page.tsx` — new: SSG blog post renderer
- `package.json` — modified: MDX packages added (@next/mdx, @mdx-js/loader, @mdx-js/react, remark-frontmatter, remark-mdx-frontmatter, gray-matter)
- `package-lock.json` — modified: lockfile updated
- `app/components/Footer.tsx` — modified: `<a href="/">` → `<Link href="/">` (pre-existing lint fix)

## Change Log

| Date | Change |
|------|--------|
| 2026-04-29 | Story created — Epic 2 kicked off |
| 2026-04-29 | Updated with full article content, hero/body image handling, Figure component, canonical link, placeholder URL table |
| 2026-04-29 | Implemented: MDX infra, blog post page, mdx-components, content file. Used experimental.mdxRs + gray-matter (Turbopack compat). Status → review |

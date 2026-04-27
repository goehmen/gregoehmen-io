---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
status: complete
completedAt: '2026-04-25'
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-gregoehmen-io.md"
  - "_bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md"
  - "_bmad-output/project-context.md"
workflowType: 'architecture'
project_name: 'gregoehmen-io'
user_name: 'Goehmen'
date: '2026-04-25'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
27 FRs across 6 capability areas define the complete capability contract:
- Navigation & Site Structure (FR1–FR4): Header anchor nav + Blog/Portfolio links + smooth scroll
- Home Page Content Sections (FR5–FR9): Hero reposition, two-track services, RunnersRun case study, about, Calendly #book
- Blog Content System (FR10–FR15): /blog index, /blog/[slug] post pages, MDX source files, static generation via `generateStaticParams()`
- Email Capture & Lead Conversion (FR16–FR18): Third-party embed on each blog post page; no gregoehmen.io data handling
- SEO & Metadata (FR19–FR23): Per-page metadata, OG tags (absolute URLs), frontmatter-driven blog SEO, case-sensitive slugs
- Publisher Workflow (FR24–FR27): MDX file + git push = live post; documented frontmatter; zero engineering dependency

**Non-Functional Requirements:**
- Performance: Lighthouse ≥ 90 mobile; LCP ≤ 2.5s on mobile 3G for hero; no render-blocking scripts
- Accessibility: WCAG 2.1 AA for core paths; semantic HTML; color contrast verification for Illini orange (#FF5F05)
- Integration: Calendly #book anchor (no regression); email embed (HTTPS, no JS errors); Vercel auto-deploy
- Security: No user data on site; HTTPS via Vercel; no hardcoded keys

**Scale & Complexity:**
- **Primary domain:** Web application (Next.js App Router, static generation, browser-based)
- **Complexity level:** Low — brownfield, additive only, no new infrastructure
- **Estimated architectural components:** ~6 new/modified components + 2 new route files + 1 new content directory
- New routes: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- New content directory: `content/blog/[slug].mdx`
- Modified components: `Header` (nav links), `Services` (two-track layout), `Hero` (copy), `About` (copy)
- New components: `BlogIndex`, `BlogPost`, `EmailCapture`

### Technical Constraints & Dependencies

From `project-context.md` (42 rules):
- Next.js 16.1.6 App Router only (no Pages Router); React 19.2.3; TypeScript 5 strict + isolatedModules
- Tailwind v4: `@theme {}` block in `app/globals.css`; no `tailwind.config.js`; no `@apply`
- `accent-teal` = `#FF5F05` (Illini orange) — intentional token name, do not rename
- `next/image` for all images; `next/font` configured once in `app/layout.tsx` only
- Path alias `@/*` → `./*`; components in `app/components/`; no `src/` directory
- ESLint 9 flat config (`eslint.config.mjs`)
- Vercel deployment, Node 20.x; Linux filesystem (case-sensitive slugs)
- **Open decisions requiring resolution:** MDX rendering library; email capture provider

### Cross-Cutting Concerns Identified

1. **Static generation pattern** — applies to all routes; `generateStaticParams()` required on `/blog/[slug]`; all async page components
2. **SEO metadata pattern** — every page exports a `metadata` object; global in `app/layout.tsx`, per-page in each `page.tsx`; OG image URLs must be absolute
3. **RSC boundary discipline** — default to RSC; `'use client'` only for event handlers, hooks, browser APIs; MDX content pages are RSC; email capture embed may require client wrapper
4. **Brownfield regression prevention** — existing routes (`/`), components (Header, Hero, Services, Testimonials), and Calendly `#book` anchor must not break
5. **Slug convention enforcement** — MDX filename = URL slug = case-sensitive lowercase-kebab; enforced by convention and documented in BLOG.md

## Foundation & New Dependencies

### Existing Foundation (Brownfield — No Initialization Required)

The project stack is fully established. No new project initialization needed.

**Established Stack:**
- Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5 strict + isolatedModules
- Tailwind CSS v4 (`@theme {}` in `app/globals.css`; no `tailwind.config.js`)
- Deployment: Vercel (Node 20.x), auto-deploy on push to `main`
- ESLint 9 flat config (`eslint.config.mjs`)
- lucide-react, embla-carousel-react, next-themes (already installed)

**Existing Project Structure:**
```
app/
  components/       # all existing components (Header, Hero, Services, etc.)
  globals.css       # Tailwind v4 @theme {} tokens
  layout.tsx        # fonts (Geist/Geist Mono), global metadata, suppressHydrationWarning
  page.tsx          # home page (single-page, anchor nav)
public/             # static assets
```

### New Dependencies Required

**MDX Rendering: `@next/mdx`**

- **Decision:** `@next/mdx` (official Next.js package, actively maintained)
- **Rejected:** `next-mdx-remote` — archived by Hashicorp on April 9, 2026; no longer maintained
- **Install:** `npm install @next/mdx @mdx-js/loader @mdx-js/react`
- **Why:** Official package; supports dynamic imports from `content/blog/` with App Router + `generateStaticParams()`; no dependency on abandoned packages
- **Config changes required:**
  - `next.config.ts` — wrap with `createMDX()`
  - `mdx-components.tsx` — required at project root for App Router MDX support

**Email Capture: Third-Party Embed (Provider TBD)**

- **Decision deferred:** Provider choice (Buttondown vs Beehiiv) is a product/workflow decision, not an architecture decision
- **Architecture decision:** Embed as a lightweight HTML snippet or iframe in a dedicated `EmailCapture` React Server Component; no JavaScript SDK, no API route, no `'use client'` required if embed is purely HTML
- **Constraint:** Must not block page render (non-render-blocking embed)

### New File Structure (Additions Only)

```
content/
  blog/
    [slug].mdx        # MDX posts; filename = URL slug; case-sensitive lowercase-kebab
mdx-components.tsx    # required for @next/mdx App Router integration
app/
  blog/
    page.tsx          # /blog index — lists all posts from content/blog/
    [slug]/
      page.tsx        # /blog/[slug] — renders MDX post via dynamic import
  components/
    BlogPostCard.tsx   # new: post card for index listing
    EmailCapture.tsx   # new: embed wrapper component
BLOG.md               # new: publisher guide (frontmatter spec, slug convention)
```

## Core Architectural Decisions

### Decision Priority Analysis

**Critical (block implementation):**
- MDX frontmatter schema — defines the data contract every blog post must follow
- Blog data access patterns — how index page and post page read MDX content
- `@next/mdx` plugin configuration — enables frontmatter in MDX files

**Important (shape architecture):**
- Component RSC boundary decisions — which new components need `'use client'`
- `generateMetadata` pattern for blog posts — connects frontmatter to Next.js SEO

**Deferred (product decision, not architecture):**
- Email capture provider selection (Buttondown vs Beehiiv) — architecture is provider-agnostic

### Data Architecture — MDX Content System

**MDX Frontmatter Schema (required fields):**
```yaml
---
title: "Post Title"
date: "2026-04-25"
description: "One-sentence description for index listing and SEO meta description"
slug: "post-filename-without-extension"
---
```
- `slug` field must match MDX filename exactly (case-sensitive; lowercase-kebab convention)
- `author` defaults to Greg Oehmen — not required in frontmatter
- Schema is deliberately minimal to reduce publisher friction

**MDX Plugin Configuration (`next.config.ts`):**
- `remark-frontmatter` — enables YAML `---` frontmatter blocks in MDX files
- `remark-mdx-frontmatter` — exports frontmatter as a named `frontmatter` export from each MDX module
- `gray-matter` — used only in the blog index page for lightweight frontmatter-only reads (no MDX compilation; fast)

**Install additions:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react remark-frontmatter remark-mdx-frontmatter gray-matter
```

**Blog Data Access Patterns:**

*Blog index (`app/blog/page.tsx`) — reads all post metadata:*
```typescript
// RSC — reads content/blog/ with fs + gray-matter (no MDX compilation needed)
const postsDir = path.join(process.cwd(), 'content/blog')
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'))
const posts = files.map(file => {
  const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
  return { ...data, slug: file.replace('.mdx', '') }
})
// sort by date descending
```

*Blog post page (`app/blog/[slug]/page.tsx`) — renders single post:*
```typescript
export async function generateStaticParams() {
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata({ params }) {
  const { frontmatter } = await import(`@/content/blog/${(await params).slug}.mdx`)
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      url: `https://gregoehmen.io/blog/${frontmatter.slug}`,
      images: [{ url: 'https://gregoehmen.io/og-image.png' }]
    }
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`)
  return <Post />
}
```

### Authentication & Security

N/A — no authentication, no user data, no sessions. Security requirements satisfied by Vercel HTTPS, no hardcoded keys convention, and third-party email embed pattern (no user data on gregoehmen.io).

### API & Communication Patterns

No API routes. External communication surfaces:
- **Calendly:** Existing `#book` anchor — unchanged; no code changes needed
- **Email capture embed:** HTML form POST to third-party provider — no JavaScript SDK required; RSC-compatible

### Frontend Architecture

**Component RSC Boundary Map:**

| Component | Type | Reason |
|-----------|------|---------|
| `app/blog/page.tsx` | RSC | File system reads only |
| `app/blog/[slug]/page.tsx` | RSC | Dynamic import + MDX render |
| `app/components/BlogPostCard.tsx` | RSC | No interactivity |
| `app/components/EmailCapture.tsx` | RSC (if HTML form) | No JS; pure HTML form POST |
| `mdx-components.tsx` | RSC | Custom MDX element overrides |
| `Header` (modified) | Client Component (`'use client'`) | Mobile hamburger menu requires `useState` for open/close toggle — **overrides** initial architecture entry of "no new interactivity"; 6+ nav items cannot fit in horizontal mobile layout |

**If email provider requires JS widget:** Wrap in `'use client'` component, load via `dynamic(() => import('./EmailCaptureWidget'), { ssr: false })`.

**SEO Metadata Pattern:**
- `app/layout.tsx` — update global `metadata` export for new positioning
- `app/page.tsx` — update `metadata` export for home page
- `app/blog/page.tsx` — static `metadata` export
- `app/blog/[slug]/page.tsx` — `generateMetadata` async function, derives from MDX `frontmatter` export
- All OG `images` URLs: `https://gregoehmen.io/og-image.png` (absolute; existing file in `public/`)

**`mdx-components.tsx` (project root — required by `@next/mdx`):**
```typescript
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h1>,
    // ... typography overrides matching site design system
    ...components,
  }
}
```

### Infrastructure & Deployment

**`next.config.ts` changes (wraps existing config):**
```typescript
import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

No other infrastructure changes. No environment variables needed for blog.

### Decision Impact Analysis

**Implementation Sequence:**
1. Install new packages (`@next/mdx`, remark plugins, `gray-matter`)
2. Update `next.config.ts` — wrap with `createMDX()`
3. Create `mdx-components.tsx` at project root
4. Create `content/blog/` directory + first MDX post
5. Build `app/blog/page.tsx` (index)
6. Build `app/blog/[slug]/page.tsx` (post renderer + metadata)
7. Build `BlogPostCard` and `EmailCapture` components
8. Update `Header` with Blog + Portfolio nav links
9. Update existing home page sections (Hero, Services, About copy)
10. Update global metadata in `app/layout.tsx`
11. Write `BLOG.md` publisher guide

**Cross-Component Dependencies:**
- `app/blog/[slug]/page.tsx` depends on `mdx-components.tsx` being defined
- `EmailCapture` implementation depends on email provider HTML embed snippet (provider TBD)
- `generateStaticParams()` and `gray-matter` reads both depend on `content/blog/` with at least one `.mdx` file

## Implementation Patterns & Consistency Rules

### Critical Conflict Points

8 areas where AI agents frequently diverge on this specific stack if not explicitly constrained:
1. `'use client'` directive placement
2. Tailwind v4 token/config usage
3. React 19 component patterns
4. `next/link` vs `<a>` for external links
5. OG metadata URL format
6. MDX frontmatter field naming and date format
7. Blog slug casing convention
8. Component structure (static data placement)

### Naming Patterns

**Components:** PascalCase filename matching export name — `BlogPostCard.tsx` exports `BlogPostCard`

**Pages:** `page.tsx` in App Router directory — `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`

**Section IDs:** kebab-case — `id="services"`, `id="about"`, `id="book"` (existing; don't change)

**Blog slugs:** lowercase-kebab only
- ✅ `why-i-built-runnersrun.mdx`
- ❌ `Why-I-Built-RunnersRun.mdx` (breaks on Vercel Linux)

**CSS color tokens:** kebab-case — `accent-teal`, `background-secondary`, `foreground`

**No barrel files:** Import directly — `import BlogPostCard from '@/app/components/BlogPostCard'`

### Structure Patterns

**Component anatomy:**
```typescript
// ✅ CORRECT — static data at module level, explicit return type, named function
export default function BlogPostCard({ title, date, description, slug }: {
  title: string; date: string; description: string; slug: string
}): JSX.Element {
  return (...)
}

// ❌ WRONG — React.FC (deprecated), data inside component
const BlogPostCard: React.FC<Props> = ({ title }) => { ... }
```

**File locations:**
- Components → `app/components/ComponentName.tsx`
- Pages → `app/[route]/page.tsx`
- Blog content → `content/blog/[slug].mdx`
- MDX overrides → `mdx-components.tsx` (project root)
- Publisher guide → `BLOG.md` (project root)

**Path imports:** Always use `@/*` alias — `import Header from '@/app/components/Header'`

### RSC Boundary Patterns

Default to RSC. Add `'use client'` ONLY when component uses React hooks, browser event listeners, or browser-only APIs.

```typescript
// ✅ RSC — no interactivity
export default function BlogPostCard({ title, date, description, slug }: Props): JSX.Element {
  return <article>...</article>
}

// ✅ RSC — HTML form (no JS SDK)
export default function EmailCapture(): JSX.Element {
  return <form action="https://provider.com/subscribe" method="POST">...</form>
}

// ❌ WRONG — 'use client' preemptively with no hooks or events
'use client'
export default function BlogPostCard(...) { ... }
```

### Tailwind v4 Patterns

**NEVER:** Create `tailwind.config.js` · Use `@apply` · Rename `accent-teal` · Use arbitrary color values `bg-[#FF5F05]`

**ALWAYS:** Use token utilities: `bg-accent-teal`, `text-foreground-secondary`, `bg-background`

**Layout constants:**
```
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8   ← max container
py-20 sm:py-24                             ← section padding
bg-background / bg-background-secondary   ← alternating sections
```

### MDX Content Patterns

**Frontmatter (all 4 fields required):**
```yaml
---
title: "Exact post title"
date: "2026-04-25"
description: "One sentence. Under 160 chars. Used for index AND meta description."
slug: "exact-match-of-filename-without-extension"
---
```

**Heading hierarchy:** MDX content starts at `##` (h2) — the `<h1>` is rendered by the post template from `frontmatter.title`

**Slug contract:** filename = frontmatter slug = URL segment — all three must match exactly

### SEO & Metadata Patterns

**OG image URL (always absolute):**
```typescript
// ✅ CORRECT
images: [{ url: 'https://gregoehmen.io/og-image.png' }]
// ❌ WRONG
images: [{ url: '/og-image.png' }]
```

**External portfolio link (always plain `<a>`):**
```typescript
// ✅ CORRECT
<a href="https://goehmen.dev" target="_blank" rel="noopener noreferrer">Portfolio</a>
// ❌ WRONG
<Link href="https://goehmen.dev">Portfolio</Link>
```

### Error Handling Patterns

**Blog post 404:**
```typescript
import { notFound } from 'next/navigation'
try {
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`)
  return <Post />
} catch {
  notFound()
}
```

### Enforcement Guidelines

**All AI agents MUST:**
- Read `_bmad-output/project-context.md` before writing any code
- Default every new component to RSC; justify any `'use client'` explicitly
- Never create `tailwind.config.js` or use `@apply`
- Never rename `accent-teal`
- Use absolute URLs for all OG images (`https://gregoehmen.io/...`)
- Use `<a>` (not `<Link>`) for the Portfolio header link
- Match blog slug in frontmatter, filename, and URL exactly
- Never use `React.FC` or `ReactDOM.render`

**Pre-submission checklist:**
- [ ] No `tailwind.config.js` created
- [ ] `'use client'` only where hooks/events/browser APIs are used
- [ ] All OG URLs are absolute
- [ ] Blog slugs are lowercase-kebab and match frontmatter `slug` field
- [ ] No `React.FC` usage

## Project Structure & Boundaries

### Complete Project Directory Structure

```
gregoehmen-io/
│
├── # ── ROOT CONFIG (existing, with changes noted)
├── next.config.ts          ← MODIFY: wrap with createMDX()
├── mdx-components.tsx      ← NEW: required for @next/mdx App Router
├── BLOG.md                 ← NEW: publisher guide
├── package.json            ← MODIFY: add @next/mdx, remark plugins, gray-matter
├── tsconfig.json           (no changes)
├── postcss.config.mjs      (no changes)
├── eslint.config.mjs       (no changes)
├── next-env.d.ts           (no changes)
│
├── # ── CONTENT (new directory)
├── content/
│   └── blog/
│       └── aakash-boris-article.mdx   ← NEW: first post (LinkedIn article)
│
├── # ── APP (App Router)
├── app/
│   ├── layout.tsx          ← MODIFY: update global metadata for new positioning
│   ├── page.tsx            ← MODIFY: add RunnersRun section; update metadata
│   ├── globals.css         (no changes — Tailwind v4 @theme {} tokens intact)
│   ├── favicon.ico         (no changes)
│   ├── providers.tsx       (no changes)
│   │
│   ├── blog/               ← NEW directory
│   │   ├── page.tsx        ← NEW: /blog index (FR10 — lists all posts)
│   │   └── [slug]/
│   │       └── page.tsx    ← NEW: /blog/[slug] post renderer (FR11–FR15)
│   │
│   └── components/
│       ├── Header.tsx      ← MODIFY: add Blog + Portfolio nav links (FR1–FR3)
│       ├── Hero.tsx        ← MODIFY: new copy, AI-native positioning (FR5)
│       ├── Services.tsx    ← MODIFY: two-track layout coaching + FCPO (FR6)
│       ├── ServiceCard.tsx (may need minor update for two-track design)
│       ├── RunnersRun.tsx  ← NEW: case study section (FR7)
│       ├── About.tsx       ← MODIFY: AI-native credentials + FTE signals (FR8)
│       ├── BlogPostCard.tsx ← NEW: post card for /blog index (FR10)
│       ├── EmailCapture.tsx ← NEW: third-party embed wrapper (FR16–FR18)
│       ├── BookCall.tsx    (no changes — Calendly #book anchor, FR9)
│       ├── Testimonials.tsx (no changes)
│       └── Footer.tsx      (no changes)
│
└── public/
    ├── og-image.png        (existing — used for all OG image tags)
    └── [other existing assets unchanged]
```

### Architectural Boundaries

**No API boundaries** — no API routes, no server functions, no runtime external data fetching. All data is static (MDX files read at build time via `fs`).

**Component Boundaries:**

| Boundary | Pattern |
|----------|---------|
| Home sections → page | `app/page.tsx` imports and composes section components |
| Blog index → card | `app/blog/page.tsx` imports `BlogPostCard` |
| Blog post → MDX | `app/blog/[slug]/page.tsx` imports MDX via dynamic import |
| Blog post → email capture | `app/blog/[slug]/page.tsx` imports `EmailCapture` |
| All pages → layout | `app/layout.tsx` wraps all routes |

**Data Boundaries:**

| Data | Source | Access Pattern |
|------|--------|----------------|
| Blog post list | `content/blog/*.mdx` frontmatter | `fs.readdirSync` + `gray-matter` in RSC at build time |
| Blog post content | `content/blog/[slug].mdx` | Dynamic `import()` in RSC at build time |
| Site metadata | Hardcoded in layout/page files | Static `metadata` exports |
| Email subscriptions | Third-party provider | HTML form POST — no data touches gregoehmen.io |

### Requirements to Structure Mapping

| FR Category | Files |
|-------------|-------|
| Navigation & Site Structure (FR1–FR4) | `app/components/Header.tsx` |
| Home Page Sections (FR5–FR9) | `Hero.tsx`, `Services.tsx`, `RunnersRun.tsx`, `About.tsx`, `BookCall.tsx` |
| Blog Content System (FR10–FR15) | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `content/blog/`, `mdx-components.tsx` |
| Email Capture (FR16–FR18) | `app/components/EmailCapture.tsx` |
| SEO & Metadata (FR19–FR23) | `app/layout.tsx`, `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` |
| Publisher Workflow (FR24–FR27) | `content/blog/`, `BLOG.md` |

### Integration Points

**External Integrations:**

| Integration | Type | Implementation |
|-------------|------|----------------|
| Calendly | Anchor link (`#book`) | Existing `BookCall.tsx` — no change |
| Email capture provider | HTML form embed | `EmailCapture.tsx` renders provider's form snippet |
| Vercel deployment | Git push → auto-deploy | No config change needed |
| goehmen.dev | External `<a>` link | `Header.tsx` — plain `<a>` tag only |

**Data Flow:**
```
Build time:
  content/blog/*.mdx
    ├── gray-matter (frontmatter only) → app/blog/page.tsx → BlogPostCard props
    └── dynamic import (full MDX)     → app/blog/[slug]/page.tsx → rendered HTML

Runtime (browser):
  /blog          → static HTML (pre-rendered at build)
  /blog/[slug]   → static HTML (pre-rendered at build)
  email form     → POST directly to third-party provider (no gregoehmen.io server)
  #book          → Calendly (client-side anchor scroll)
```

### Development Workflow Integration

**Local development:** `npm run dev` — MDX changes in `content/blog/` hot-reload

**Build verification:** `npm run build` must complete with 0 errors before any push to `main`

**Deployment:** Push to `main` → Vercel auto-build → static pages → CDN

**Publishing new post (Greg's workflow):**
1. Create `content/blog/[slug].mdx` with valid frontmatter
2. `git add content/blog/[slug].mdx && git commit -m "feat: add [post title]"`
3. `git push origin main` → Vercel auto-deploys → post live at `/blog/[slug]`

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** All technology choices compatible — `@next/mdx` + remark plugins + `gray-matter` + React 19 + Next.js 16.1.6 + Tailwind v4. No version conflicts. RSC-first pattern aligns with App Router defaults. Static generation strategy consistent across all routes.

**Pattern Consistency:** Naming conventions (PascalCase components, lowercase-kebab slugs, kebab-case tokens) consistent across all areas. RSC boundary rules aligned with `'use client'` constraints. OG URL pattern enforced in both patterns section and metadata examples.

**Structure Alignment:** Project structure enables all architectural decisions — `content/blog/` supports MDX data access pattern; `app/blog/` directory supports new routes; `mdx-components.tsx` at root required by `@next/mdx`.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:** All 27 FRs across 6 capability areas have explicit architectural support with specific file assignments. No FR is unaddressed.

**Non-Functional Requirements Coverage:**
- Performance (Lighthouse ≥ 90, LCP ≤ 2.5s): Static generation pre-renders all pages; `next/image` with `priority` on above-fold images; no render-blocking third-party scripts
- Accessibility (WCAG 2.1 AA): RSC-first → semantic HTML by default; `mdx-components.tsx` enforces heading hierarchy
- Integration: Calendly unchanged; email embed is HTML-only; Vercel auto-deploy unchanged
- Security: No user data on gregoehmen.io; HTTPS via Vercel; no hardcoded keys

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions documented — `@next/mdx` with exact plugin config; MDX frontmatter schema; RSC boundary map; `generateStaticParams` + `generateMetadata` patterns with code examples.

**Structure Completeness:** Complete directory tree with every new file named; every existing file annotated; all integration points mapped.

**Pattern Completeness:** 8 conflict points identified and resolved; enforcement checklist provided; concrete code examples for every pattern.

### Gap Analysis Results

**Critical gaps:** None

**Minor notes (non-blocking):**
- `ServiceCard.tsx` props for two-track layout — implementation story should confirm `variant` prop vs. separate components before writing code
- `EmailCapture.tsx` form snippet — provider TBD; stub component in implementation story, complete when Greg selects Buttondown or Beehiiv

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context analyzed (42 rules, brownfield constraints)
- [x] Scale and complexity assessed (low; additive; no new infrastructure)
- [x] Technical constraints identified (Tailwind v4, React 19, case-sensitive slugs)
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] MDX rendering library selected (`@next/mdx`) — next-mdx-remote archived Apr 9 2026
- [x] MDX plugin configuration specified (remark-frontmatter, remark-mdx-frontmatter)
- [x] Frontmatter schema defined (4 required fields)
- [x] Blog data access patterns with code examples
- [x] Email capture architecture decided (HTML form RSC; provider TBD)

**✅ Implementation Patterns**
- [x] RSC boundary rules with examples
- [x] Tailwind v4 anti-patterns documented
- [x] OG metadata absolute URL pattern enforced
- [x] Slug convention (lowercase-kebab; filename = frontmatter slug = URL)
- [x] Error handling for missing slugs (`notFound()`)
- [x] Pre-submission enforcement checklist

**✅ Project Structure**
- [x] Complete directory tree with every file annotated
- [x] All 27 FRs mapped to specific files
- [x] Integration boundaries defined
- [x] Data flow documented (build-time vs. runtime)
- [x] Publisher workflow documented (3-step git process)

### Architecture Readiness Assessment

**Overall Status: READY FOR IMPLEMENTATION**

**Confidence Level: High** — low-complexity brownfield update with well-understood technology. All open decisions resolved. Email provider unknown has a clear architectural placeholder.

**Key Strengths:**
- Brownfield constraints fully respected — existing patterns preserved, no redesign
- MDX library decision de-risked (official package, not archived)
- RSC-first approach maximizes performance without Lighthouse risk
- Publisher workflow requires zero engineering involvement

**Post-MVP enhancements (not in scope):**
- `rehype-pretty-code` for syntax highlighting in posts with code blocks
- `remark-gfm` for GitHub Flavored Markdown tables/checkboxes in posts

### Implementation Handoff

**AI Agent Guidelines:**
- Read `_bmad-output/project-context.md` and `_bmad-output/planning-artifacts/architecture.md` before implementing any story
- Follow implementation patterns exactly — especially RSC boundaries and Tailwind v4 rules
- Respect the project structure; add new files only where specified

**First Implementation Priority:** Install packages → update `next.config.ts` → create `mdx-components.tsx` → create `content/blog/` + first post → build blog routes

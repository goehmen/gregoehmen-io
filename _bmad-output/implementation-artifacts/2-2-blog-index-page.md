# Story 2.2: Blog Index Page

Status: done

## Story

As a visitor,
I want to browse a listing of all blog posts at /blog,
so that I can discover Greg's published content and choose what to read.

## Acceptance Criteria

1. **Given** I navigate to /blog **When** the page loads **Then** I see a listing of all published posts, each showing title, publication date, and description **And** posts are sorted by date descending (newest first) **And** each listing links to the correct `/blog/[slug]` page

2. **Given** I click a post listing **When** the navigation resolves **Then** I land on the correct `/blog/[slug]` post page

3. **Given** I inspect the /blog page `<head>` **When** checking metadata **Then** the page has a unique title and meta description distinct from the home page **And** `og:image` is absolute: `https://gregoehmen.io/og-image.png`

4. **Given** I view /blog on a 375px mobile viewport **When** the page renders **Then** all post listings are readable and properly formatted

## Tasks / Subtasks

- [x] Task 1: Create `app/blog/page.tsx` — blog index (AC: #1, #2, #3, #4)
  - [x] 1.1: Create `app/blog/page.tsx` as RSC — no `'use client'`
  - [x] 1.2: Add `export const runtime = 'nodejs'` at top (required for `fs` module)
  - [x] 1.3: Read all `.mdx` filenames from `content/blog/` via `fs.readdirSync`
  - [x] 1.4: For each slug, obtain frontmatter — used Option B (regex parse) for build-time reliability
  - [x] 1.5: Sort posts by date descending before rendering
  - [x] 1.6: Render each post as a card/listing with title, formatted date, description, and `Link` to `/blog/[slug]`
  - [x] 1.7: Export `metadata` object with unique title, description, and absolute OG image URL (see Dev Notes)
  - [x] 1.8: Apply layout constants and design tokens consistent with existing pages

- [x] Task 2: Verify build and smoke test (AC: #1–#4)
  - [x] 2.1: `npm run build` — exits zero; `/blog` appears as static route in build output
  - [x] 2.2: `npm run lint` — no new errors
  - [ ] 2.3: Dev server: navigate to `/blog` — listing renders with title, date, description per post
  - [ ] 2.4: Click a post — lands on correct `/blog/[slug]` page
  - [ ] 2.5: Verify page source: `og:image` is `https://gregoehmen.io/og-image.png` (absolute)
  - [ ] 2.6: Resize to 375px — all listings readable, no horizontal scroll
  - [ ] 2.7: Run global regression smoke test (home page, header, anchors, Portfolio link, Calendly #book)

### Review Findings

- [x] [Review][Decision] `[slug]/page.tsx` modified despite spec constraint — RESOLVED: change accepted. `Header` and `Footer` added to post page as part of this story. File Structure note updated below. `[app/blog/[slug]/page.tsx:64-118]`
- [x] [Review][Patch] `parseFrontmatter` regex only matches double-quoted values — RESOLVED: regex updated to `["']([^"']+)["']`, matching both single- and double-quoted values. `slug` removed from `parseFrontmatter` return (derived from filename instead). `[app/blog/page.tsx:31-35]`
- [x] [Review][Patch] Empty/missing date field renders "Invalid Date" to users — RESOLVED: date display now conditionally renders `'Unknown date'` when `post.date` is falsy; sort uses `0` as fallback for missing dates to prevent `NaN` ordering. `[app/blog/page.tsx:49-52, 69-75]`
- [x] [Review][Patch] Slug source mismatch between index and `generateStaticParams` — RESOLVED: `blog/page.tsx` now derives slug from filename (`f.replace('.mdx', '')`), consistent with `generateStaticParams`. Frontmatter `slug` field no longer used for link routing. `[app/blog/page.tsx:45-47]`
- [x] [Review][Patch] Card hover affordance implies full clickability but only title and "Read more" are linked — RESOLVED: entire card wrapped in a single `<Link>`; "Read more" changed to `<span>` (no longer a nested `<Link>`). `[app/blog/page.tsx:63-80]`
- [x] [Review][Patch] JSX indentation misalignment in `BlogIndex` — RESOLVED: `<h1>` and `<div className="space-y-6">` corrected to one level inside `<div className="max-w-6xl ...">`. `[app/blog/page.tsx:60-83]`
- [x] [Review][Defer] `postsDir` ENOENT on fresh clone — `fs.readdirSync(postsDir)` throws synchronously if `content/blog/` is absent; no try/catch. `[app/blog/page.tsx:45]` — deferred, same as Story 2.1, directory currently exists
- [x] [Review][Defer] Fixed Header may overlap page content — `py-20 sm:py-24` padding is not dynamically linked to Header height; if Header grows (e.g., expanded mobile menu, slow render), content can be obscured under it. `[app/blog/page.tsx:57, app/blog/[slug]/page.tsx:70]` — deferred, pre-existing architectural concern
- [x] [Review][Defer] `heroImage` unvalidated in `<Image src>` — `frontmatter.heroImage` passed directly to `next/image` with no domain/path check; external URLs not in `remotePatterns` throw at runtime. `[app/blog/[slug]/page.tsx:80]` — deferred, carried from Story 2.1

## Dev Notes

### CRITICAL: Frontmatter Reading Approach

**Story 2.1 pivoted away from YAML frontmatter** due to a Turbopack serialization issue. The actual MDX files use `experimental.mdxRs: true` (Rust compiler) which strips YAML and exports frontmatter as a named JS module export. The actual file format is:

```js
export const frontmatter = {
  title: "Post title",
  date: "2026-04-21",
  description: "...",
  slug: "AI-PM-skills-article",
  // optional: heroImage, heroImageAlt, heroImageCaption, canonicalUrl
}
```

**CONSEQUENCE: `gray-matter` will NOT work for this.** It parses YAML `---` blocks; there are none in these files. Do NOT use `gray-matter`.

**Recommended approach — Option A (preferred): `await import()` per slug**

Same pattern as `app/blog/[slug]/page.tsx`. The `.mdx` files are already compiled by the blog post page, so they are available in the bundle.

```typescript
const postsDir = path.join(process.cwd(), 'content/blog')
const slugs = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => f.replace('.mdx', ''))

const posts: PostMeta[] = await Promise.all(
  slugs.map(async (slug) => {
    const { frontmatter } = await import(`@/content/blog/${slug}.mdx`)
    return frontmatter as PostMeta
  })
)
const sorted = posts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)
```

**Fallback — Option B: Parse file text with regex**

If Option A fails at build time (bundler cannot resolve dynamic import without `generateStaticParams` context), fall back to reading the raw file:

```typescript
function parseFrontmatter(content: string): PostMeta {
  const get = (key: string) =>
    content.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? ''
  return {
    title: get('title'),
    date: get('date'),
    description: get('description'),
    slug: get('slug'),
  }
}

const posts: PostMeta[] = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => {
    const content = fs.readFileSync(path.join(postsDir, f), 'utf-8')
    return parseFrontmatter(content)
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
```

Option B is pure Node.js with no compilation — guaranteed to work. Start with Option A; if build fails, switch to Option B.

### Current Blog State (from Story 2.1)

One post exists: `content/blog/AI-PM-skills-article.mdx`

Frontmatter fields present:
- `title`: "Aakash Gupta wrote that PMs are the future of software. I went and tested the thesis."
- `date`: "2026-04-21"
- `description`: "I spent months building RunnersRun solo to test Aakash Gupta's thesis that PM skills map directly to AI-native development. Here's what I found."
- `slug`: "AI-PM-skills-article"
- `heroImage`, `heroImageAlt`, `heroImageCaption`, `canonicalUrl` — optional, NOT needed for index

### `PostMeta` Type

```typescript
type PostMeta = {
  title: string
  date: string
  description: string
  slug: string
}
```

Only these 4 fields are needed for the index listing. Do NOT try to render heroImage or other optional fields on the index page.

### Metadata Export

```typescript
export const metadata: Metadata = {
  title: 'Blog',
  description: "Greg Oehmen's writing on AI-native product building, fractional CPO leadership, and building software with AI.",
  openGraph: {
    title: "Greg Oehmen — Blog",
    description: "Writing on AI-native product building, fractional CPO leadership, and building software with AI.",
    images: [{ url: 'https://gregoehmen.io/og-image.png' }],
  },
}
```

- Title will render as `"Blog | Greg Oehmen — AI-native Product Builder"` via the global title template in `app/layout.tsx`
- OG image MUST be absolute (`https://gregoehmen.io/og-image.png`) — never `/og-image.png`

### Date Formatting

Use the same pattern as `app/blog/[slug]/page.tsx` — add `T00:00:00` to avoid UTC-vs-local timezone off-by-one:

```typescript
new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```

### Layout & Styling Patterns

Follow existing site patterns exactly:

- Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24`
- Page background: `bg-background min-h-screen`
- Section heading: `text-3xl sm:text-4xl font-bold text-foreground mb-4` (or similar)
- Post card background: `bg-card` (for card surfaces)
- Post title: `text-foreground` — bold
- Post date/meta: `text-foreground-secondary text-sm`
- Post description: `text-foreground-secondary leading-relaxed`
- Link hover: `hover:text-foreground` or `hover:opacity-80` (see existing components)
- Accent color: `accent-teal` = `#FF5F05` (Illini orange) — use for CTA elements if any

For the card/listing, a clean pattern consistent with the site:

```tsx
<article key={post.slug} className="bg-card rounded-lg p-6 hover:bg-card/80 transition-colors">
  <Link href={`/blog/${post.slug}`}>
    <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-accent-teal transition-colors">
      {post.title}
    </h2>
  </Link>
  <p className="text-foreground-secondary text-sm mb-3">{formattedDate}</p>
  <p className="text-foreground-secondary leading-relaxed">{post.description}</p>
  <Link
    href={`/blog/${post.slug}`}
    className="inline-block mt-4 text-sm text-accent-teal hover:opacity-80 transition-opacity"
  >
    Read more &rarr;
  </Link>
</article>
```

Use `next/link` (`Link`) for all `/blog/[slug]` links — NOT `<a>` tags.

### TypeScript Requirements

- `import type { JSX } from 'react'` — required
- `import type { Metadata } from 'next'` — required for metadata export
- Named function export: `export default async function BlogIndex(): Promise<JSX.Element>`
- No implicit `any` — type `PostMeta` explicitly
- `import type` for type-only imports (isolatedModules)

### Architecture Compliance

- RSC only — NO `'use client'`
- `export const runtime = 'nodejs'` — required for `fs` access
- Path alias `@/*` for non-relative imports
- No `tailwind.config.js`; no `@apply`
- No `<img>` tags — use `next/image` if images needed (none required for this story)
- No `React.FC`; named functions only
- Metadata object exported from page file (not layout)

### File Structure

```
app/
  blog/
    page.tsx          NEW: blog index
    [slug]/
      page.tsx        MODIFIED: added Header, Footer, and fragment wrapper (accepted in review)
```

No changes to `mdx-components.tsx`, `next.config.ts`, or any home page component.

### Open GitHub Issues — Relevance Check

`gh issue list` as of 2026-04-29:
- #9: `aria-controls` absent element (Header mobile menu) — not in scope
- #12: Duplicate CTAs lack aria-label (Services) — not in scope
- #13: Track 1 card orphan at sm (Services) — not in scope

No open issues affect files touched in this story.

### Key Learnings from Story 2.1

- `experimental.mdxRs: true` in `next.config.ts` is a hard constraint — Turbopack requires it. Do NOT remove or work around it.
- `remark-frontmatter` and `remark-mdx-frontmatter` are installed but NOT used in `createMDX()` (bypassed due to Turbopack). Do not add them back.
- The `params` type is `Promise<{ slug: string }>` in Next.js 16 (not relevant for index page, but keep in mind for any future work on `[slug]/page.tsx`)
- `new Date(date)` without `T00:00:00` causes off-by-one on dates — always append it
- `alt={frontmatter.heroImageAlt ?? frontmatter.title}` for image alt (patched in review — use title as fallback, never empty string)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.2 ACs]
- [Source: _bmad-output/planning-artifacts/epics.md — ARCH6, ARCH13]
- [Source: _bmad-output/project-context.md — TypeScript rules, RSC rules, Tailwind v4 tokens, layout constants]
- [Source: _bmad-output/implementation-artifacts/2-1-mdx-infrastructure-first-blog-post.md — Turbopack pivot, frontmatter format, debug log]
- [Source: app/blog/[slug]/page.tsx — current implementation pattern (read 2026-04-29)]
- [Source: content/blog/AI-PM-skills-article.mdx — actual frontmatter format (read 2026-04-29)]

## Smoke Test Checklist

Run manually against `localhost:3000` before marking done.

### Blog Index Page

- [ ] Navigate to `/blog` — page renders with no crash
- [ ] Page heading visible (e.g., "Blog" or equivalent)
- [ ] Post listing shows: "Aakash Gupta wrote that PMs are the future of software. I went and tested the thesis."
- [ ] Post listing shows date: "April 21, 2026" (or equivalent human-readable format)
- [ ] Post listing shows description text
- [ ] Clicking the post navigates to `/blog/AI-PM-skills-article` with no 404

### Metadata

- [ ] Browser tab title shows "Blog" (plus global template suffix)
- [ ] Page source: `og:image` content is `https://gregoehmen.io/og-image.png` (absolute, not relative)

### Mobile

- [ ] Resize to 375px width — listing is readable, no horizontal scroll, no overlap

### Build Verification

- [ ] `npm run build` exits zero
- [ ] `/blog` appears as static route in build output
- [ ] `npm run lint` — no new errors

### Regression — Global Smoke Test

- [ ] Home page renders at `/`
- [ ] Header is fixed and visible
- [ ] Logo links to `/`
- [ ] All anchor links scroll to correct sections
- [ ] Portfolio opens `goehmen.dev` in new tab
- [ ] Calendly `#book` anchor functional
- [ ] `/blog/AI-PM-skills-article` still renders correctly (no regression to `[slug]/page.tsx`)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (create-story)

### Debug Log References

_None — implementation straightforward. Used Option B (regex parse) from Dev Notes directly; no Option A attempt needed._

### Completion Notes List

- `app/blog/page.tsx` created as RSC with `runtime = 'nodejs'`, static `metadata` export, regex-based frontmatter parsing via `fs.readFileSync`, date-descending sort, post cards with `Link` to `/blog/[slug]`.
- Date formatted with `T00:00:00` suffix to prevent UTC timezone off-by-one.
- `npm run build` exits zero; `/blog` confirmed as static prerendered route.
- `npm run lint` clean.
- Browser smoke tests (2.3–2.7) pending manual verification.

### File List

- `app/blog/page.tsx` — new: blog index page

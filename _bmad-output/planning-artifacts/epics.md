---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
status: complete
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/project-context.md"
---

# gregoehmen.io Revamp - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for gregoehmen.io Revamp, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Visitor can navigate to any home page section (hero, services, RunnersRun case study, about, book) via header anchor links
FR2: Visitor can navigate to the blog index (/blog) via a header nav link
FR3: Visitor can navigate to the external portfolio site (goehmen.dev) via a header nav link that opens externally
FR4: Site smooth-scrolls to anchor targets when navigating within the home page
FR5: Visitor can read a hero section that leads with AI-native product building coaching/advisory as the primary offer and Fractional CPO as the secondary offer
FR6: Visitor can distinguish two visually and narratively separate services tracks — AI-native coaching/advisory and Fractional CPO — without confusion between them
FR7: Visitor can read a RunnersRun case study section that communicates Greg's solo-build capability and production-grade output using the structured AI-native methodology (private beta framing; no customer/revenue metrics)
FR8: Visitor can read an about section that includes specific enterprise-scale metrics (Visa, Salesforce/Pivotal) and language that signals senior product strategy leadership to FTE hiring managers and recruiters
FR9: Visitor can initiate a discovery call booking via a Calendly anchor link (#book) reachable from hero and services sections
FR10: Visitor can browse a blog index page (/blog) listing all published posts with title, date, and description
FR11: Visitor can read a full blog post at /blog/[slug] with complete article content
FR12: Each blog post page displays the post title, publication date, and author
FR13: Visitor can navigate from a blog post back to the blog index
FR14: Blog post pages are rendered from MDX source files stored in content/blog/
FR15: Blog post pages are statically generated at build time from MDX files via generateStaticParams()
FR16: Blog post reader can subscribe to email update notifications via an embedded capture form present on each blog post page
FR17: Email subscriptions are processed entirely by a third-party provider — no form handling or data storage on gregoehmen.io
FR18: Email capture form requires only an email address (low-commitment conversion — "get notified when I publish")
FR19: Each page (home, /blog, /blog/[slug]) exposes a unique page title and meta description
FR20: Each page exposes Open Graph metadata (title, description, image URL) for social sharing previews
FR21: All OG image URLs are absolute (https://gregoehmen.io/...) — no relative paths
FR22: Blog post pages derive SEO metadata (title, description) from MDX frontmatter fields
FR23: Blog post slug in URL matches MDX filename exactly (case-sensitive)
FR24: Publisher (Greg) can create a new blog post by adding a single MDX file to content/blog/ with required frontmatter fields
FR25: Publisher can publish a new post without modifying any application code, configuration files, or deployment settings
FR26: A new post becomes live automatically after git push triggers Vercel auto-deploy
FR27: Publisher has access to documented frontmatter field specifications (BLOG.md or equivalent in the repo)

### NonFunctional Requirements

NFR1: Lighthouse performance score >= 90 on mobile — measured before launch as a go/no-go criterion
NFR2: Largest Contentful Paint (LCP) <= 2.5s on mobile (3G simulated) for the home page hero section
NFR3: Above-the-fold images use next/image with priority prop to avoid LCP penalties
NFR4: No render-blocking third-party scripts — Calendly is anchor-based (no inline script); email capture embed must not block page render
NFR5: All images served via next/image with optimized formats (WebP/AVIF via Vercel Image Optimization)
NFR6: WCAG 2.1 AA compliance for all core user paths: hero, header nav, services section, blog post content, and Calendly #book anchor
NFR7: Semantic HTML landmark elements used throughout (header, main, section, footer, nav)
NFR8: All non-decorative images include descriptive alt text
NFR9: Color contrast ratio >= 4.5:1 for normal text; >= 3:1 for large text — Illini orange (#FF5F05) on dark background must be verified
NFR10: Full keyboard navigation support for header nav and primary CTAs
NFR11: Blog post MDX content uses correct heading hierarchy (h1 -> h2 -> h3) — no skipped levels
NFR12: Calendly #book anchor must remain functional after all nav and layout changes — no regression acceptable
NFR13: Email capture embed must load without JavaScript errors in Chrome, Firefox, and Safari; form submission must succeed without gregoehmen.io server involvement; HTTPS required for embed source
NFR14: Vercel build must complete with zero errors on first deploy of revamped site; auto-deploy on push to main must remain active
NFR15: No user-submitted data stored or processed on gregoehmen.io — email addresses handled exclusively by third-party provider
NFR16: All pages served over HTTPS (enforced by Vercel)
NFR17: No environment variables or API keys hardcoded in source — use process.env.NEXT_PUBLIC_* or process.env.* patterns
NFR18: No third-party scripts loaded from untrusted CDN sources without integrity checking

### Additional Requirements

- ARCH1: Install new packages before any implementation: @next/mdx, @mdx-js/loader, @mdx-js/react, remark-frontmatter, remark-mdx-frontmatter, gray-matter
- ARCH2: next.config.ts must be updated to wrap the config with createMDX(), passing remark-frontmatter and remark-mdx-frontmatter as remarkPlugins
- ARCH3: mdx-components.tsx must be created at the project root — required by @next/mdx for App Router MDX support; provides custom MDX element overrides (typography matching site design system)
- ARCH4: content/blog/ directory must be created; MDX filenames must be lowercase-kebab (case-sensitive on Vercel Linux); filename = frontmatter slug = URL segment
- ARCH5: MDX frontmatter schema has 4 required fields: title (string), date (ISO 8601 string), description (string, under 160 chars), slug (must match filename without extension)
- ARCH6: Blog index page reads content/blog/ using fs.readdirSync + gray-matter (frontmatter-only, no MDX compilation); blog post page renders full MDX via dynamic import()
- ARCH7: generateStaticParams() required on app/blog/[slug]/page.tsx for static pre-rendering at build time
- ARCH8: generateMetadata() async function required on app/blog/[slug]/page.tsx — derives title, description, and OG tags from MDX frontmatter export
- ARCH9: EmailCapture.tsx — implement as RSC with plain HTML form POST if provider uses HTML embed; if provider requires JS widget, use dynamic(() => import(...), { ssr: false }) pattern
- ARCH10: All OG image URLs must be absolute — https://gregoehmen.io/og-image.png — never relative paths (/og-image.png)
- ARCH11: Portfolio link in Header.tsx must be a plain <a> tag with target="_blank" rel="noopener noreferrer" — NOT a Next.js Link component
- ARCH12: BLOG.md publisher guide must be created at project root documenting frontmatter schema, slug convention, and the 3-step git publish workflow
- ARCH13: Brownfield project — no starter template or initialization; all changes are additive to the existing codebase; existing routes, components, and Calendly #book anchor must not regress

### UX Design Requirements

No UX Design document exists for this project. Visual design is unchanged (Illini orange branding retained). All UX decisions are expressed through copy and content structure, not new visual patterns.

### FR Coverage Map

FR1: Epic 1 - Header anchor nav links to home sections
FR2: Epic 1 - Blog nav link added to header
FR3: Epic 1 - Portfolio external link added to header (plain <a> tag)
FR4: Epic 1 - Smooth scroll to anchor targets (verify no regression)
FR5: Epic 1 - Hero section repositioned (AI-native primary, FCPO secondary)
FR6: Epic 1 - Two-track services section (coaching + FCPO visually distinct)
FR7: Epic 1 - RunnersRun case study section (new, private beta framing)
FR8: Epic 1 - About section with enterprise-scale metrics and FTE-coded language
FR9: Epic 1 - Calendly #book anchor reachable from hero and services (verify no regression)
FR10: Epic 2 - Blog index page (/blog) listing all posts
FR11: Epic 2 - Blog post page (/blog/[slug]) with full article content
FR12: Epic 2 - Post title, publication date, and author displayed on post page
FR13: Epic 2 - Back navigation from blog post to blog index
FR14: Epic 2 - MDX source files in content/blog/
FR15: Epic 2 - Static generation via generateStaticParams()
FR16: Epic 2 - Email capture form on each blog post page
FR17: Epic 2 - Third-party provider handles subscriptions; no gregoehmen.io backend
FR18: Epic 2 - Email-only capture form (low-commitment)
FR19: Epic 1 + Epic 2 - Per-page metadata (home/layout in E1; blog pages in E2)
FR20: Epic 1 + Epic 2 - OG metadata (home in E1; blog pages in E2)
FR21: Epic 1 + Epic 2 - Absolute OG image URLs enforced across all pages
FR22: Epic 2 - Blog post SEO metadata derived from MDX frontmatter
FR23: Epic 2 - Case-sensitive slug: filename = frontmatter slug = URL segment
FR24: Epic 2 - Publisher creates new post by adding single MDX file
FR25: Epic 2 - Publishing requires no code, config, or deployment changes
FR26: Epic 2 - Post goes live automatically after git push triggers Vercel deploy
FR27: Epic 2 - BLOG.md publisher guide at project root

## Epic List

### Epic 1: Home Page Repositioning
Coaching/FCPO prospects and FTE recruiters land on a repositioned site that clearly communicates Greg's AI-native building offer, enterprise pedigree, and both service tracks. All existing functionality (smooth scroll, Calendly #book, Testimonials) is preserved with no regression.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR19 (home/layout), FR20 (home), FR21

### Epic 2: Blog System, Email Capture & Publisher Workflow
Blog readers can browse and read posts; email capture converts readers to subscribers; Greg can publish new posts with zero engineering dependency; all blog pages are SEO-optimized with correct absolute-URL metadata.
**FRs covered:** FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19 (blog pages), FR20 (blog pages), FR21, FR22, FR23, FR24, FR25, FR26, FR27

## Epic 2: Blog System, Email Capture & Publisher Workflow

Blog readers can browse and read posts; email capture converts readers to subscribers; Greg can publish new posts with zero engineering dependency; all blog pages are SEO-optimized with correct absolute-URL metadata.

### Story 2.1: MDX Infrastructure & First Blog Post

As a visitor,
I want to read Greg's first blog post at /blog/aakash-boris-article,
So that I can learn about his AI-native building methodology from a published article.

**Acceptance Criteria:**

**Given** the following are in place: packages installed (`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `gray-matter`), `next.config.ts` wraps the config with `createMDX()` and the remark plugins, `mdx-components.tsx` exists at the project root with typography overrides, and `content/blog/aakash-boris-article.mdx` exists with valid frontmatter
**When** I navigate to /blog/aakash-boris-article
**Then** the full blog post content renders correctly with site typography applied

**Given** the post page renders
**When** I inspect the page
**Then** an `<h1>` displays the post title (from `frontmatter.title`, rendered by the post template — not inside the MDX body)
**And** the publication date and "Greg Oehmen" as author are displayed

**Given** I inspect the page `<head>`
**When** checking metadata
**Then** the browser tab title shows the post title
**And** `og:image` is absolute: `https://gregoehmen.io/og-image.png`
**And** `og:url` is `https://gregoehmen.io/blog/aakash-boris-article`

**Given** I run `npm run build`
**When** the build completes
**Then** it exits with zero errors
**And** `/blog/aakash-boris-article` appears as a statically pre-rendered route in the build output

**Given** I navigate to `/blog/a-slug-that-does-not-exist`
**When** the route resolves
**Then** the Next.js 404 page is shown (via `notFound()` in the catch block)

**Given** I am reading a blog post at `/blog/[slug]`
**When** I look for navigation back to the blog listing
**Then** a visible link or nav element is present that returns me to `/blog`

### Story 2.2: Blog Index Page

As a visitor,
I want to browse a listing of all blog posts at /blog,
So that I can discover Greg's published content and choose what to read.

**Acceptance Criteria:**

**Given** I navigate to /blog
**When** the page loads
**Then** I see a listing of all published posts, each showing title, publication date, and description
**And** posts are sorted by date descending (newest first)
**And** each listing links to the correct `/blog/[slug]` page

**Given** I click a post listing
**When** the navigation resolves
**Then** I land on the correct `/blog/[slug]` post page

**Given** I inspect the /blog page `<head>`
**When** checking metadata
**Then** the page has a unique title and meta description distinct from the home page
**And** `og:image` is absolute: `https://gregoehmen.io/og-image.png`

**Given** I view /blog on a 375px mobile viewport
**When** the page renders
**Then** all post listings are readable and properly formatted

### Story 2.3: Email Capture on Blog Posts

As a blog reader who isn't ready to book a call,
I want to subscribe to email notifications at the bottom of any blog post,
So that I can re-engage with Greg's content over time and eventually book a call.

**Acceptance Criteria:**

**Given** I am on any `/blog/[slug]` page
**When** I scroll to the bottom of the post content
**Then** an email capture form is visible with low-commitment copy (e.g., "Get notified when I publish")
**And** the form requires only an email address — no other fields

**Given** I submit a valid email address
**When** the form submits
**Then** the request goes directly to the third-party email provider (Buttondown or Beehiiv) via HTML form POST
**And** no data is sent to or stored on gregoehmen.io
**And** no backend API route is invoked

**Given** the email capture embed loads
**When** the page renders
**Then** the embed does not block page render (non-render-blocking)
**And** the embed is served over HTTPS
**And** no JavaScript errors appear in Chrome, Firefox, or Safari devtools console

**Given** I inspect the `EmailCapture` component
**When** checking its implementation
**Then** it is a React Server Component with no `'use client'` directive (unless the provider requires a JS widget, in which case `dynamic()` with `ssr: false` is used and the RSC boundary is documented in a comment)

### Story 2.4: Publisher Documentation & Workflow Verification

As Greg (publisher),
I want clear documentation for creating new blog posts and a verified end-to-end publish workflow,
So that I can add new content to the blog using only a text editor and git — no engineering involvement.

**Acceptance Criteria:**

**Given** `BLOG.md` exists at the project root
**When** I read it
**Then** it documents all 4 required frontmatter fields: `title`, `date` (ISO 8601 format), `description` (under 160 chars), `slug` (must match filename without extension)
**And** it explains the slug convention: filename = frontmatter slug = URL segment, lowercase-kebab, case-sensitive on Vercel Linux
**And** it includes the 3-step publish workflow: create `.mdx` file → `git commit` → `git push`
**And** it includes a complete example frontmatter block

**Given** I follow only the `BLOG.md` instructions to create a new post (a `.mdx` file with valid frontmatter in `content/blog/`)
**When** I push to main and Vercel auto-deploys
**Then** the new post is live at `/blog/[slug]`
**And** the post appears on the `/blog` index page
**And** no application code, configuration files, or deployment settings were modified

**Given** a new post has a slug of `my-second-post` (file: `my-second-post.mdx`)
**When** the post is deployed
**Then** the URL is exactly `/blog/my-second-post` — matching the filename exactly, case-sensitive

## Epic 1: Home Page Repositioning

Coaching/FCPO prospects and FTE recruiters land on a repositioned site that clearly communicates Greg's AI-native building offer, enterprise pedigree, and both service tracks. All existing functionality (smooth scroll, Calendly #book, Testimonials) is preserved with no regression.

### Story 1.1: Header Navigation Update

As a visitor,
I want to see Blog and Portfolio links in the site header,
So that I can navigate to the blog and Greg's portfolio from any page.

**Acceptance Criteria:**

**Given** I am on any page of the site
**When** I look at the header navigation
**Then** I see the existing anchor links plus two new links: "Blog" and "Portfolio"

**Given** I click the "Blog" link
**When** the navigation resolves
**Then** I am taken to /blog via Next.js internal navigation *(note: `/blog` will render a Next.js 404 until Story 2.1 is implemented — this is expected; the testable behavior is that the Link component navigates to the route correctly)*

**Given** I click the "Portfolio" link
**When** the link is activated
**Then** a new browser tab opens to https://goehmen.dev
**And** the link is a plain `<a href="https://goehmen.dev" target="_blank" rel="noopener noreferrer">` — NOT a Next.js Link component

**Given** I click any existing anchor nav link (Services, About, Testimonials, Book a Call)
**When** the click is handled
**Then** the page smooth-scrolls to the correct home page section with no regression

### Story 1.2: Hero Section Repositioning

As a coaching/advisory prospect,
I want the hero section to lead with AI-native product building as the primary offer,
So that I immediately understand Greg is the right resource for structured AI-native building.

**Acceptance Criteria:**

**Given** I land on the home page
**When** I see the hero section
**Then** the primary headline communicates AI-native product building coaching/advisory as the core offer
**And** Fractional CPO is positioned as a second pillar (visible, not buried, but not the headline)
**And** a primary CTA is visible that links to #book

**Given** I view the hero on a 375px mobile viewport
**When** the hero renders
**Then** all copy and the CTA are fully readable with no horizontal scroll

**Given** the hero contains any above-the-fold image
**When** next/image renders it
**Then** the `priority` prop is set to avoid LCP regression

### Story 1.3: Two-Track Services Section

As a visitor evaluating Greg's services,
I want to clearly see two distinct offerings — AI-native coaching and Fractional CPO,
So that I can quickly identify which applies to my situation without confusion.

**Acceptance Criteria:**

**Given** I scroll to the Services section on the home page
**When** I view the section
**Then** I can visually and narratively distinguish two separate tracks: AI-native coaching/advisory and Fractional CPO
**And** the coaching/advisory track uses language that resonates with Sr. Director/VP+ leaders (time-boxed, hands-on, outcome-defined, methodology transfer)
**And** the Fractional CPO track uses language for startup CEOs/founders (embedded strategic product leadership, post-seed to Series A)

**Given** I view either service track
**When** I look for a booking CTA
**Then** each track has a CTA that links to #book

**Given** I view on a 375px mobile viewport
**When** the two-track layout renders
**Then** both tracks are fully readable and distinct (not collapsed or hidden)

### Story 1.4: RunnersRun Case Study Section

As a coaching/advisory prospect,
I want to read a case study about Greg's RunnersRun project on the home page,
So that I can verify in under 30 seconds that he has actually shipped a production-grade product using the methodology he teaches.

**Acceptance Criteria:**

**Given** I am on the home page
**When** I scroll through the sections
**Then** a RunnersRun case study section appears (after Services, before About)

**Given** I read the RunnersRun section
**When** I review the content
**Then** it communicates: (1) what the app is and who it's for, (2) that Greg built it solo using a structured AI-native methodology, (3) that it is production-grade with enterprise-standard architecture, (4) that it is in private beta
**And** it does NOT include customer counts, revenue numbers, or growth metrics
**And** it includes a link to runnersrun.app

**Given** the RunnersRun component is added
**When** I view app/page.tsx
**Then** the RunnersRun component is imported and rendered in the correct position between Services and About

**Given** the RunnersRun section contains any images
**When** they are rendered
**Then** all images use `next/image` with descriptive `alt` text on all non-decorative images

### Story 1.5: About Section Update

As an FTE recruiter or hiring manager,
I want to read an about section that signals senior product strategy leadership,
So that I can assess Greg's enterprise-scale experience without an explicit "available for hire" statement.

**Acceptance Criteria:**

**Given** I scroll to the About section
**When** I read the content
**Then** I see specific enterprise-scale metrics: Visa (54M+ enrolled cards, 4B+ annual transactions), Salesforce/Pivotal ($0 to $400M ARR)
**And** AI-native credentials appear alongside the enterprise pedigree
**And** the language uses signals for senior product leadership (strategic product leadership, cross-functional fluency, systems thinking, platform scale)
**And** there is NO explicit "available for FTE" CTA or announcement

### Story 1.6: Global Metadata & OG Tags Update

As a visitor sharing the site on social media or finding it via search,
I want page titles, meta descriptions, and OG previews to reflect Greg's new positioning,
So that the first impression — before visiting the site — is accurate and compelling.

**Acceptance Criteria:**

**Given** app/layout.tsx is updated
**When** any page is rendered
**Then** the global title template and default description reflect AI-native product building as Greg's primary positioning

**Given** I inspect the home page `<head>`
**When** checking OG metadata
**Then** `og:title`, `og:description`, `og:image`, and `og:url` are all present
**And** `og:image` value is absolute: `https://gregoehmen.io/og-image.png` — NOT `/og-image.png`

**Given** I validate with a social card preview tool before deploy
**When** I enter the home page URL
**Then** the social card renders with the new positioning copy

**Given** the home page is deployed to a Vercel preview URL
**When** I run a Lighthouse mobile audit
**Then** the performance score is ≥ 90 and LCP ≤ 2.5s on simulated 3G

**Given** the updated home page renders
**When** I verify color contrast for `accent-teal` (#FF5F05) on dark backgrounds
**Then** the contrast ratio meets ≥ 4.5:1 for normal text (WCAG 2.1 AA)
**And** the header nav is fully keyboard-navigable (tab order correct, visible focus states present)

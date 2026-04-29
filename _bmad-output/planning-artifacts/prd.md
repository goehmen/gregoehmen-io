---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain-skipped', 'step-06-innovation-skipped', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
status: complete
releaseMode: phased
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: brownfield
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-gregoehmen-io.md"
  - "_bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md"
  - "_bmad-output/project-context.md"
workflowType: 'prd'
briefCount: 2
researchCount: 0
projectDocsCount: 1
---

# Product Requirements Document - gregoehmen.io Revamp

**Author:** Greg Oehmen
**Date:** 2026-04-25

## Executive Summary

gregoehmen.io is the professional platform of Greg Oehmen — senior product executive (Visa, Salesforce/Pivotal, Apple) and solo builder of RunnersRun, a production-grade consumer SaaS application shipped using an AI-native, spec-driven development methodology. The current site presents a single Fractional CPO offer. The revamp repositions it as a three-pillar platform: AI-native product building coaching and advisory (primary), Fractional CPO services (established second pillar), and implicit FTE positioning for senior product strategy roles (tertiary, no explicit CTA).

The market for this positioning is already arriving. The LinkedIn article documenting the RunnersRun build generated inbound from senior engineering and product leaders — including one paid engagement (10-hour AI-native development coaching, Sr. Director of Engineering, healthcare SaaS) and additional warm prospects. The site's job is not to attract; it is to convert what is already showing up.

The revamp is a brownfield content and routing update to an existing Next.js 16 / React 19 / Tailwind v4 / Vercel codebase. No redesign, no new infrastructure — new copy, new sections, and two new route families (/blog, /blog/[slug]).

### What Makes This Special

No competitor in the fractional CPO or AI consulting market currently combines: (1) proof-of-work — a shipped, production-grade product built solo using the exact methodology being taught; (2) enterprise-scale product pedigree — Visa (54M+ enrolled cards, 4B+ annual transactions), Salesforce, Pivotal ($0 to $400M ARR); and (3) structured AI-native methodology fluency — spec-driven development, disciplined AI-native workflow, not vibe coding.

The coaching and advisory offer is intentionally non-scalable near-term: time-boxed, hands-on, outcome-defined engagements. This is market validation, not a growth play. The site must make that offer legible and credible to a Sr. Director/VP+ audience in under one scroll.

## Project Classification

- **Type:** Web application (Next.js App Router, SSR/static, browser-based)
- **Domain:** General — personal brand and marketing site; no regulated industry, no compliance requirements
- **Complexity:** Low — static content updates, MDX blog, third-party embeds; no auth, no database, no real-time features in v1 scope
- **Context:** Brownfield — existing codebase with established patterns; additive changes only

## Success Criteria

### User Success

- A coaching/advisory prospect landing on the site identifies the offer and its credibility without scrolling past the hero — validated by testing with 3–5 people matching the Sr. Director/VP+ persona before launch
- A Fractional CPO prospect finds a distinct, unambiguous services track without confusion from the coaching positioning — the two offers do not compete for attention
- The RunnersRun case study answers "has this person actually built something?" in under 30 seconds of reading
- A returning visitor (existing FCPO client) lands on the revamped site and finds their context — the FCPO offer — clearly intact and not buried

### Business Success

- At least 2 coaching/advisory inquiries traceable to site visits within 60 days of launch
- Email capture list begins growing from launch day; 50+ subscribers within 90 days
- Blog infrastructure supports publishing a new post without engineering involvement — copy + MDX file = live post
- FCPO inquiry quality and volume unchanged ±20% within 30 days of launch (existing clients Spatial Capital, Hextropian.ai not destabilized)
- At least 1 FTE recruiter or hiring manager inbound attributable to site within 90 days

### Technical Success

- Vercel build passes with zero errors on first deploy of revamped site
- Blog routes (/blog, /blog/[slug]) render correctly; slug resolution matches MDX filenames exactly (case-sensitive)
- All OG metadata uses absolute URLs (https://gregoehmen.io/...) — validated with social card preview tool before launch
- Email capture form submits to third-party provider without backend changes to gregoehmen.io
- No regressions on existing functionality (hero, services, testimonials, #book Calendly anchor, smooth scroll nav)
- Lighthouse performance score ≥ 90 on mobile

### Measurable Outcomes

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Coaching inquiries from site | 2+ | 60 days post-launch |
| Email list subscribers | 50+ | 90 days post-launch |
| FCPO inquiry volume | ±20% of baseline | 30 days post-launch |
| FTE recruiter inbound | 1+ qualified | 90 days post-launch |
| Blog posts published | 1 at launch, cadence TBD | Launch day |
| Build/deploy errors | 0 | Launch |

## User Journeys

### Journey 1: The Engineering Leader Looking to Build Right
**Persona: Rich** — Sr. Director of Engineering at a regulated SaaS company. Greenfield AI-first project launching in 60 days. His team is assembled but not yet onboarded. He is personally preparing — wants to understand the workflow before he leads others through it.

He reads Greg's LinkedIn article on a Tuesday morning. It resonates: he has been in the "what can AI do for me" phase for months and is frustrated by inconsistent results. He clicks through to gregoehmen.io.

The hero stops him immediately — not "fractional CPO" but something about building with AI and helping others do the same. He scrolls. The RunnersRun section answers his silent question: *has this person actually shipped something?* Yes. Production-grade. Solo. The methodology described matches what he's been trying to construct piecemeal. The services section has a track that describes his exact situation. He clicks Book a Call.

**Requirements revealed:** Hero must convert without explanation. RunnersRun section must answer the credibility question fast. Services section must describe the coaching offer in language that matches how an engineering leader thinks about the problem — not "courses" or "consulting" but hands-on, outcome-defined, time-boxed.

---

### Journey 2: The Startup CEO Needing a Product Partner
**Persona: Maya** — CEO of a Series A B2B SaaS company, 18 months post-raise. Her CTO is strong but product strategy is fragmented. She needs someone embedded, part-time, with startup-speed judgment and enterprise-scale experience. She found Greg through a warm referral from her investor.

She arrives at gregoehmen.io already warm — just doing diligence. The hero leads with AI-native building. She pauses — that's not why she's here, but it's interesting context. She scrolls to the services section. There it is: Fractional CPO. Clear track, distinct from the coaching offer. The pedigree (Visa, Salesforce, Pivotal) confirms scale. The RunnersRun section shows he's a builder, not just an advisor. She books a call.

**Requirements revealed:** Services section must have two visually and narratively distinct tracks — coaching and FCPO — that don't compete for attention. FCPO track must surface enterprise pedigree and startup-specific language without burying it under AI positioning.

---

### Journey 3: The Blog Reader Converting to a Lead
**Persona: Scott** — former manager, senior leader at a mid-size company. Built a side project ("what can AI do?") and is now taking it seriously. Saw Greg's LinkedIn article, engaged in comments. Clicks through to gregoehmen.io from the article link.

He arrives at /blog/[slug] — the article page, not the home page. He reads the full post. At the bottom he sees an email capture: "Get notified when I publish." He signs up — not ready to book a call, but wants to stay in the orbit. Two weeks later a new post arrives. He reads it. On the third post, he books a call.

**Requirements revealed:** Blog post pages must stand alone with full article content and SEO metadata. Email capture must be present on each blog post page (not just the index). The capture is low-commitment — "get notified" not "book a call." The path from reader → subscriber → booker must work passively over multiple visits.

---

### Journey 4: The FTE Recruiter Running a Passive Screen
**Persona: Laura** — Executive recruiter at a search firm placing VP Product and CPO roles. A client asked her to find "someone who understands AI-native product development, not just theory." She finds Greg's LinkedIn profile, notes the RunnersRun article, and visits gregoehmen.io.

She is not looking to book a call. She is screening. She reads the hero, scans the about section. She sees: Visa (scale), Pivotal (enterprise transformation), RunnersRun (actually shipped something with AI). The about section language signals strategic product leadership, cross-functional fluency, systems thinking. She adds Greg to her longlist. She may reach out directly via LinkedIn, not via the site.

**Requirements revealed:** About section must carry the FTE signal implicitly — specific scale numbers (54M+ enrolled cards, 4B+ annual transactions, $0 to $400M ARR), enterprise pedigree sequence, and methodology language that reads as "CPO-caliber" to a recruiter. No explicit "available for FTE" CTA needed. Profile makes the case.

---

### Journey 5: Greg Publishing a New Blog Post
**Persona: Greg** — site owner, not a developer.

He finishes writing a new post about his coaching experience with Modio Health. It lives in a Google Doc. He copies the content, creates a new file at `content/blog/modio-engagement.mdx`, adds frontmatter (title, date, description, slug), and pushes to main. Vercel auto-deploys. The post is live at /blog/modio-engagement. The email list provider automatically notifies subscribers.

**Requirements revealed:** Blog publishing must require zero engineering involvement beyond a text editor and git. MDX frontmatter must be documented so Greg knows exactly what fields to populate. The email notification must be handled by the third-party provider (no trigger logic needed on gregoehmen.io). A brief publishing guide should be included in the repo (BLOG.md or similar).

---

### Journey Requirements Summary

| Journey | Key Capabilities Required |
|---------|--------------------------|
| Rich (coaching prospect) | Hero legibility, RunnersRun case study, coaching services track, Calendly #book anchor |
| Maya (FCPO prospect) | Distinct FCPO services track, enterprise pedigree visibility, Calendly #book anchor |
| Scott (blog reader → lead) | Blog index + post pages, email capture on posts, SEO metadata per post |
| Laura (FTE recruiter) | About section with scale signals and FTE-coded language |
| Greg (publisher) | MDX blog publishing workflow, documented frontmatter, no engineering dependency |

## Web Application Specific Requirements

### Project-Type Overview

gregoehmen.io is a multi-page web application (MPA) built on Next.js App Router with static and server-rendered pages. The site is browser-based with no native device features required. It is a marketing and conversion surface — not a web application in the interactive-product sense — so the primary concerns are SEO, performance, and content rendering accuracy.

### Technical Architecture Considerations

**Rendering Strategy**
- Home page (`/`): Static generation (no dynamic data)
- Blog index (`/blog`): Static generation from MDX file system
- Blog post pages (`/blog/[slug]`): Static generation via `generateStaticParams()` — each MDX file produces one pre-rendered page at build time
- All routes: App Router RSC-first; `'use client'` only for interactive components (Calendly embed, any carousel)

**Multi-Page Architecture**
- Single-page home with anchor section nav (`#services`, `#about`, `#book`)
- New routes: `/blog` (index), `/blog/[slug]` (individual posts)
- External portfolio link (`https://goehmen.dev`) via plain `<a>` tag — not a Next.js route

**Browser Support**
- Modern evergreen browsers: Chrome, Firefox, Safari, Edge (current and n-1)
- No IE11 or legacy browser support required
- Mobile Safari (iOS) and Chrome Android covered by Tailwind responsive design

### SEO Strategy

SEO is a first-class requirement — blog posts must be indexable and shareable.

- **Global metadata**: Defined in `app/layout.tsx` via Next.js Metadata API; updated for new positioning
- **Per-page metadata**: Each page exports its own `metadata` object — home page, `/blog`, `/blog/[slug]` all require distinct titles, descriptions, and canonical URLs
- **Open Graph**: OG metadata with absolute URLs (`https://gregoehmen.io/...`) — relative paths are a known past issue and must not recur
- **Blog post SEO**: Each MDX post frontmatter drives the page's `<title>`, `<meta description>`, and OG tags; slug resolution is case-sensitive on Vercel (Linux filesystem)
- **Structured data**: Not required for v1

### Responsive Design

- Standard Tailwind v4 breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px) — no custom breakpoints
- Max container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-20 sm:py-24`
- Mobile-first composition; hero and services sections must read clearly at 375px viewport width

### Implementation Considerations

- No real-time features, no WebSockets, no polling — site is fully static post-build
- No auth, no database, no API routes — consistent with project constraint
- MDX rendering: `@next/mdx` or `next-mdx-remote` for blog post pages; decision deferred to architecture phase
- Email capture: third-party embed only — no Vercel KV, no API route, no form handling on gregoehmen.io itself

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Conversion-focused brownfield update — the minimum changes required to align the site's messaging with Greg's current positioning and convert the inbound already arriving. Not a new product launch; a catch-up to reality.

**Delivery Constraint:** Solo developer (Greg), additive changes only — no redesign, no new infrastructure, no new backend. Every MVP item is executable without new system dependencies.

**Resource Requirements:** One developer, existing Next.js/Vercel/GitHub stack. No design resources needed (branding retained). No devops changes.

### MVP Feature Set (v1 — All Journeys Served)

**Core User Journeys Supported:**
- Rich (coaching prospect): Hero → RunnersRun case study → Coaching services track → Calendly #book
- Maya (FCPO prospect): Services section (FCPO track, distinct from coaching) → Calendly #book
- Scott (blog reader → lead): /blog/[slug] post → Email capture → Return visits
- Laura (FTE recruiter): About section with enterprise pedigree + scale signals
- Greg (publisher): MDX file + git push = live post

**Must-Have Capabilities:**
- Repositioned hero section (new copy; Illini orange branding retained)
- Two-track services section: AI-native coaching/advisory + Fractional CPO — visually and narratively distinct
- RunnersRun case study section on home page (blended build + product story; private beta framing)
- Updated about section (AI-native credentials + enterprise pedigree + FTE-coded language)
- Header nav update: Blog link (internal `/blog`) + Portfolio link (external `https://goehmen.dev`, plain `<a>` tag)
- MDX blog: `/blog` index page + `/blog/[slug]` dynamic route
- First blog post: LinkedIn article ("Aakash-Boris") published at launch
- Email capture on blog post pages (third-party embed — Buttondown or Beehiiv; zero backend)
- Updated OG metadata and page titles for new positioning (absolute URLs, known past issue)

**Nice-to-Have for v1 (ship if time allows, not blocking):**
- BLOG.md publishing guide in repo
- Social card validation with preview tool before deploy (manual QA step)

### Growth Features (Post-MVP)

Contingent on first cohort of paid coaching engagements validating the offer:

- Dedicated `/work-with-me` page with structured coaching intake form replacing generic Calendly link
- Case studies from completed engagements (named, with client permission — Modio Health TBD)
- Named, searchable coaching offer (methodology-branded)
- Regular blog publishing cadence (frequency TBD post-launch)
- goehmen.dev revamp if Portfolio link drives meaningful traffic

### Vision (If Coaching/Advisory Scales)

- Blog as primary owned distribution channel
- Productized methodology offer — specific enough for Sr. Engineering leaders to find via search
- Tiered engagement options (assessment, workshop, full advisory)
- Speaking/keynote positioning for AI-native product development

### Risk Mitigation Strategy

**Technical Risks:**
- MDX rendering library choice (`@next/mdx` vs `next-mdx-remote`) is unresolved — deferred to architecture phase; either works for v1, risk is low
- Case-sensitive slug handling on Vercel Linux — mitigated by documented convention (filenames = URL slugs, all lowercase-kebab)
- Email capture embed compatibility — mitigated by third-party embed requiring no backend changes; Buttondown/Beehiiv both have Next.js-compatible embed patterns

**Market Risks:**
- Coaching offer doesn't convert from site visits: mitigated by clear Calendly anchor (#book), distinct services copy, and RunnersRun credibility section; conversion validation with 3–5 target-persona testers before launch
- FCPO clients (Spatial Capital, Hextropian.ai) feel de-prioritized: mitigated by distinct FCPO track in services section; returning visitors find their context intact

**Resource Risks:**
- Solo developer velocity: mitigated by brownfield constraint (additive only, no redesign), static MDX (no CMS integration), and no new backend dependencies — scope is intentionally executable by one person

## Functional Requirements

### Navigation & Site Structure

- **FR1:** Visitor can navigate to any home page section (hero, services, RunnersRun case study, about, book) via header anchor links
- **FR2:** Visitor can navigate to the blog index (`/blog`) via a header nav link
- **FR3:** Visitor can navigate to the external portfolio site (`goehmen.dev`) via a header nav link that opens externally
- **FR4:** Site smooth-scrolls to anchor targets when navigating within the home page

### Home Page Content Sections

- **FR5:** Visitor can read a hero section that leads with AI-native product building coaching/advisory as the primary offer and Fractional CPO as the secondary offer
- **FR6:** Visitor can distinguish two visually and narratively separate services tracks — AI-native coaching/advisory and Fractional CPO — without confusion between them
- **FR7:** Visitor can read a RunnersRun case study section that communicates Greg's solo-build capability and production-grade output using the structured AI-native methodology (private beta framing; no customer/revenue metrics)
- **FR8:** Visitor can read an about section that includes specific enterprise-scale metrics (Visa, Salesforce/Pivotal) and language that signals senior product strategy leadership to FTE hiring managers and recruiters
- **FR9:** Visitor can initiate a discovery call booking via a Calendly anchor link (`#book`) reachable from hero and services sections

### Blog Content System

- **FR10:** Visitor can browse a blog index page (`/blog`) listing all published posts with title, date, and description
- **FR11:** Visitor can read a full blog post at `/blog/[slug]` with complete article content
- **FR12:** Each blog post page displays the post title, publication date, and author
- **FR13:** Visitor can navigate from a blog post back to the blog index
- **FR14:** Blog post pages are rendered from MDX source files stored in `content/blog/`
- **FR15:** Blog post pages are statically generated at build time from MDX files via `generateStaticParams()`

### Email Capture & Lead Conversion

- **FR16:** Blog post reader can subscribe to email update notifications via an embedded capture form present on each blog post page
- **FR17:** Email subscriptions are processed entirely by a third-party provider — no form handling or data storage on gregoehmen.io
- **FR18:** Email capture form requires only an email address (low-commitment conversion — "get notified when I publish")

### SEO & Metadata

- **FR19:** Each page (home, `/blog`, `/blog/[slug]`) exposes a unique page title and meta description
- **FR20:** Each page exposes Open Graph metadata (title, description, image URL) for social sharing previews
- **FR21:** All OG image URLs are absolute (`https://gregoehmen.io/...`) — no relative paths
- **FR22:** Blog post pages derive SEO metadata (title, description) from MDX frontmatter fields
- **FR23:** Blog post slug in URL matches MDX filename exactly (case-sensitive)

### Publisher Workflow

- **FR24:** Publisher (Greg) can create a new blog post by adding a single MDX file to `content/blog/` with required frontmatter fields
- **FR25:** Publisher can publish a new post without modifying any application code, configuration files, or deployment settings
- **FR26:** A new post becomes live automatically after git push triggers Vercel auto-deploy
- **FR27:** Publisher has access to documented frontmatter field specifications (BLOG.md or equivalent in the repo)

## Non-Functional Requirements

### Performance

- Lighthouse performance score ≥ 90 on mobile — measured before launch as a go/no-go criterion
- Largest Contentful Paint (LCP) ≤ 2.5s on mobile (3G simulated) for the home page hero section
- Above-the-fold images use `next/image` with `priority` to avoid LCP penalties
- No render-blocking third-party scripts — Calendly is anchor-based (no inline script); email capture embed must not block page render
- All images served via `next/image` with optimized formats (WebP/AVIF via Vercel Image Optimization)

### Accessibility

- WCAG 2.1 AA compliance for all core user paths: hero, header nav, services section, blog post content, and Calendly `#book` anchor
- Semantic HTML landmark elements used throughout (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- All non-decorative images include descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for normal text; ≥ 3:1 for large text — Illini orange (#FF5F05) on dark background must be verified
- Full keyboard navigation support for header nav and primary CTAs
- Blog post MDX content uses correct heading hierarchy (`h1` → `h2` → `h3`) — no skipped levels

### Integration

- **Calendly:** Existing `#book` anchor must remain functional after all nav and layout changes; no regression acceptable
- **Email capture (third-party embed):** Embed must load without JavaScript errors in Chrome, Firefox, and Safari; form submission must succeed without any gregoehmen.io server involvement; HTTPS required for embed source
- **Vercel deployment:** Build must complete with zero errors on first deploy of revamped site; auto-deploy on push to `main` must remain active

### Security

- No user-submitted data stored or processed on gregoehmen.io — email addresses are handled exclusively by the third-party email provider
- All pages served over HTTPS (enforced by Vercel)
- No environment variables or API keys hardcoded in source — any required keys use `process.env.NEXT_PUBLIC_*` or `process.env.*` patterns
- No third-party scripts loaded from untrusted CDN sources without integrity checking

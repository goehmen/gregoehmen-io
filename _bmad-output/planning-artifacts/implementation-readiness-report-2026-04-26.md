---
stepsCompleted: ['step-01-document-discovery', 'step-02-prd-analysis', 'step-03-epic-coverage-validation', 'step-04-ux-alignment', 'step-05-epic-quality-review', 'step-06-final-assessment']
status: complete
date: '2026-04-26'
project: gregoehmen-io
documents:
  prd: '_bmad-output/planning-artifacts/prd.md'
  architecture: '_bmad-output/planning-artifacts/architecture.md'
  epics: '_bmad-output/planning-artifacts/epics.md'
  ux: none
---

# Implementation Readiness Assessment Report

**Date:** 2026-04-26
**Project:** gregoehmen-io

## PRD Analysis

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

**Total FRs: 27**

### Non-Functional Requirements

NFR1: Lighthouse performance score >= 90 on mobile — measured before launch as go/no-go criterion
NFR2: Largest Contentful Paint (LCP) <= 2.5s on mobile (3G simulated) for home page hero section
NFR3: Above-the-fold images use next/image with priority prop to avoid LCP penalties
NFR4: No render-blocking third-party scripts — Calendly anchor-based; email capture must not block page render
NFR5: All images served via next/image with optimized formats (WebP/AVIF via Vercel Image Optimization)
NFR6: WCAG 2.1 AA compliance for core user paths: hero, header nav, services, blog post content, Calendly #book anchor
NFR7: Semantic HTML landmark elements used throughout (header, main, section, footer, nav)
NFR8: All non-decorative images include descriptive alt text
NFR9: Color contrast ratio >= 4.5:1 for normal text; >= 3:1 for large text — Illini orange (#FF5F05) on dark background must be verified
NFR10: Full keyboard navigation support for header nav and primary CTAs
NFR11: Blog post MDX content uses correct heading hierarchy (h1 → h2 → h3) — no skipped levels
NFR12: Calendly #book anchor must remain functional after all nav and layout changes — no regression acceptable
NFR13: Email capture embed must load without JavaScript errors in Chrome, Firefox, and Safari; HTTPS required for embed source
NFR14: Vercel build must complete with zero errors on first deploy; auto-deploy on push to main must remain active
NFR15: No user-submitted data stored or processed on gregoehmen.io — email addresses handled exclusively by third-party provider
NFR16: All pages served over HTTPS (enforced by Vercel)
NFR17: No environment variables or API keys hardcoded in source
NFR18: No third-party scripts loaded from untrusted CDN sources without integrity checking

**Total NFRs: 18**

### Additional Requirements (Constraints)

- Brownfield project — additive changes only; no redesign, no new infrastructure
- No auth, no database, no API routes
- Third-party email embed only (no backend form handling)
- Static generation for all routes; no runtime data fetching
- `accent-teal` token = #FF5F05 (Illini orange) — intentional name, must not be renamed

### PRD Completeness Assessment

PRD is complete and well-structured. All 27 FRs are clearly numbered and testable. All 18 NFRs are specific with measurable thresholds. Constraints are explicit. No ambiguous or overlapping requirements found.

## Epic Coverage Validation

### Coverage Matrix

| FR | PRD Requirement (summary) | Epic / Story | Status |
|----|---------------------------|--------------|--------|
| FR1 | Header anchor nav to home sections | Epic 1 / Story 1.1 | ✅ Covered |
| FR2 | Blog nav link in header | Epic 1 / Story 1.1 | ✅ Covered |
| FR3 | Portfolio external link in header | Epic 1 / Story 1.1 | ✅ Covered |
| FR4 | Smooth scroll to anchor targets | Epic 1 / Story 1.1 | ✅ Covered |
| FR5 | Hero section — AI-native primary, FCPO secondary | Epic 1 / Story 1.2 | ✅ Covered |
| FR6 | Two visually distinct service tracks | Epic 1 / Story 1.3 | ✅ Covered |
| FR7 | RunnersRun case study section | Epic 1 / Story 1.4 | ✅ Covered |
| FR8 | About section — enterprise metrics + FTE signals | Epic 1 / Story 1.5 | ✅ Covered |
| FR9 | Calendly #book reachable from hero and services | Epic 1 / Stories 1.2 + 1.3 | ✅ Covered |
| FR10 | Blog index page (/blog) with post listing | Epic 2 / Story 2.2 | ✅ Covered |
| FR11 | Full blog post at /blog/[slug] | Epic 2 / Story 2.1 | ✅ Covered |
| FR12 | Post title, date, author displayed | Epic 2 / Story 2.1 | ✅ Covered |
| FR13 | Navigate from blog post back to index | Epic 2 / Story 2.1 | ✅ Covered |
| FR14 | MDX source files in content/blog/ | Epic 2 / Story 2.1 | ✅ Covered |
| FR15 | Static generation via generateStaticParams() | Epic 2 / Story 2.1 | ✅ Covered |
| FR16 | Email capture form on each blog post page | Epic 2 / Story 2.3 | ✅ Covered |
| FR17 | Third-party provider handles subscriptions | Epic 2 / Story 2.3 | ✅ Covered |
| FR18 | Email-only form (low-commitment) | Epic 2 / Story 2.3 | ✅ Covered |
| FR19 | Unique page title + meta description per page | Epic 1 / Story 1.6 + Epic 2 / Stories 2.1, 2.2 | ✅ Covered |
| FR20 | OG metadata (title, description, image) per page | Epic 1 / Story 1.6 + Epic 2 / Stories 2.1, 2.2 | ✅ Covered |
| FR21 | Absolute OG image URLs | Epic 1 / Story 1.6 + Epic 2 / Stories 2.1, 2.2 | ✅ Covered |
| FR22 | Blog post SEO from MDX frontmatter | Epic 2 / Story 2.1 | ✅ Covered |
| FR23 | Case-sensitive slug: filename = frontmatter slug = URL | Epic 2 / Story 2.4 | ✅ Covered |
| FR24 | Create post by adding single MDX file | Epic 2 / Story 2.4 | ✅ Covered |
| FR25 | Publish without code/config changes | Epic 2 / Story 2.4 | ✅ Covered |
| FR26 | Post live after git push → Vercel auto-deploy | Epic 2 / Story 2.4 | ✅ Covered |
| FR27 | BLOG.md frontmatter documentation | Epic 2 / Story 2.4 | ✅ Covered |

### Missing Requirements

None.

### Coverage Statistics

- Total PRD FRs: 27
- FRs covered in epics: 27
- **Coverage: 100%**

## UX Alignment Assessment

### UX Document Status

Not found — intentional. PRD explicitly scopes out new visual design: "Explicitly out for v1: New visual design or rebrand." Existing Illini orange branding retained. No new UI patterns introduced.

### Alignment Issues

None. This is a brownfield content and copy update. The user interface is unchanged; only section content and two new route pages are added. Architecture addresses all responsive design requirements (Tailwind v4 standard breakpoints, mobile-first, 375px minimum viewport).

### Warnings

None. The absence of a UX document is a deliberate, documented scope decision — not an oversight.

## Epic Quality Review

### Best Practices Compliance

| Check | Result |
|-------|--------|
| Epics deliver user value (not technical layers) | ✅ Pass |
| Epic 1 stands alone independently | ✅ Pass |
| Epic 2 functions using only Epic 1 output | ✅ Pass |
| No circular epic dependencies | ✅ Pass |
| All stories completable by single dev agent | ✅ Pass |
| No forward story dependencies | ✅ Pass |
| All stories have Given/When/Then ACs | ✅ Pass |
| Brownfield pattern (no starter template) | ✅ Pass |
| Package install bundled with first story needing it | ✅ Pass |

### Violations Found

#### 🟠 Major Issue: NFR1/NFR2 (Lighthouse / LCP) Not in Any Story AC

The PRD designates Lighthouse performance ≥ 90 (mobile) and LCP ≤ 2.5s as an explicit go/no-go criterion before launch. No story acceptance criteria capture this validation gate.

**Affected stories:** Story 1.6 (Global Metadata & OG Tags Update) is the natural home for a pre-launch performance check.
**Recommendation:** Add AC to Story 1.6:
> Given the home page is deployed to a Vercel preview
> When I run a Lighthouse mobile audit
> Then the performance score is ≥ 90 and LCP ≤ 2.5s on simulated 3G

#### 🟡 Minor Concern: Accessibility (NFR6 + NFR9) Not Verified in Story ACs

WCAG 2.1 AA compliance and Illini orange (#FF5F05) color contrast verification (NFR9) are PRD requirements with no explicit acceptance criteria in any story. project-context.md rules enforce semantic HTML patterns, but no story asks the dev agent to confirm compliance.

**Recommendation:** Add to Story 1.6:
> Given the updated home page renders
> When I verify color contrast for accent-teal (#FF5F05) on dark backgrounds
> Then contrast ratio meets ≥ 4.5:1 for normal text (WCAG 2.1 AA)
> And header nav is fully keyboard-navigable (tab order, visible focus states)

#### 🟡 Minor Concern: NFR8 (Alt Text) Not Explicitly Required in Story 1.4

Story 1.4 creates the RunnersRun section which may include images. No AC requires `next/image` usage or descriptive `alt` text.

**Recommendation:** Add to Story 1.4:
> And any images in the RunnersRun section use next/image with descriptive alt text on all non-decorative images

## Summary and Recommendations

### Overall Readiness Status

**IMPLEMENTATION IN PROGRESS** *(updated 2026-04-26)*

Planning phase complete. All 3 recommended AC additions have been applied to `epics.md`. Story 1.1 implementation artifact has been created and adversarially validated. Implementation is cleared to begin.

### Issues Requiring Action

**1. 🟠 Add Lighthouse/LCP performance validation AC to Story 1.6** — ✅ RESOLVED
Applied to `epics.md` Story 1.6. AC present at the "Given the home page is deployed to a Vercel preview URL / When I run a Lighthouse mobile audit" criterion.

**2. 🟡 Add color contrast + keyboard nav AC to Story 1.6** — ✅ RESOLVED
Applied to `epics.md` Story 1.6. AC present at the "Given the updated home page renders / When I verify color contrast for accent-teal" criterion.

**3. 🟡 Add next/image + alt text AC to Story 1.4** — ✅ RESOLVED
Applied to `epics.md` Story 1.4. AC present at the "Given the RunnersRun section contains any images" criterion.

### Additional Amendments (post-readiness)

Story 1.1 adversarial validation (2026-04-26) identified 8 additional findings, all resolved:
- Architecture.md RSC boundary map updated: Header is now `'use client'` (hamburger menu requires `useState`)
- Story 1.1 AC #2 clarified: `/blog` 404 is expected until Story 2.1
- Story 1.1 AC #4 corrected: Testimonials added to regression anchor list
- Story 1.1 Task 1.1: `<nav>` semantic wrapper explicitly tasked (NFR7)
- Story 1.1 Task 1.5 added: logo alt text update
- Story 1.1 Task 2.2: `aria-label` and `aria-expanded` formally tasked
- Story 1.1 Task 3.2: "verify" changed to "verify and update if needed" for scroll-padding-top
- Story 1.1 Layout Pattern note corrected: padding is on outer `<header>`, not inner div (prevents duplication)

### Recommended Next Steps

1. ~~Apply the 3 AC additions to `epics.md` (Stories 1.4 and 1.6)~~ ✅ Done
2. ~~Create Story 1.1 implementation artifact~~ ✅ Done (validated 2026-04-26)
3. Run `/bmad-sprint-planning` to generate the ordered sprint plan
4. Implement Story 1.1 (`_bmad-output/implementation-artifacts/1-1-header-navigation-update.md`)

### Final Note

Planning artifacts are production-ready. Story 1.1 is the current implementation target — status: `ready-for-dev`.

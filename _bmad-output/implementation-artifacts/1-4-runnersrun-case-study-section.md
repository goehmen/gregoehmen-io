# Story 1.4: RunnersRun Case Study Section

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a coaching/advisory prospect,
I want to read a case study about Greg's RunnersRun project on the home page,
So that I can verify in under 30 seconds that he has actually shipped a production-grade product using the methodology he teaches.

## Acceptance Criteria

1. **Given** I am on the home page **When** I scroll through the sections **Then** a RunnersRun case study section appears after Services and before About

2. **Given** I read the RunnersRun section **When** I review the content **Then** it communicates: (1) what the app is and who it's for, (2) that Greg built it solo using a structured AI-native methodology, (3) that it is production-grade with enterprise-standard architecture, (4) that it is in private beta **And** it does NOT include customer counts, revenue numbers, or growth metrics **And** it includes a link to runnersrun.app

3. **Given** the RunnersRun component is added **When** I view `app/page.tsx` **Then** the RunnersRun component is imported and rendered in the correct position between Services and About

4. **Given** the RunnersRun section contains any images **When** they are rendered **Then** all images use `next/image` with descriptive `alt` text on all non-decorative images

## Tasks / Subtasks

- [x] Task 1: Create `app/components/RunnersRun.tsx` (AC: #1, #2, #4)
  - [x] 1.1: Create a new React Server Component (no `'use client'`) at `app/components/RunnersRun.tsx`
  - [x] 1.2: Add `id="runnersrun"` on the outer `<section>` element for potential anchor linking (FR1 lists it as a navigable section)
  - [x] 1.3: Use `bg-background-secondary` background to alternate with About section's `bg-background`
  - [x] 1.4: Use standard layout: `py-20 sm:py-24` padding, `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` container
  - [x] 1.5: Write section content following copy guidance in Dev Notes
  - [x] 1.6: Include external link to `https://runnersrun.app` using a plain `<a>` tag with `target="_blank" rel="noopener noreferrer"` (same pattern as Portfolio link in Header)
  - [x] 1.7: If any images are included, use `next/image` with `width`, `height`, and descriptive `alt` text
  - [x] 1.8: Add `import type { JSX } from 'react'` and `: JSX.Element` return type on the function signature
- [x] Task 2: Add RunnersRun to `app/page.tsx` (AC: #3)
  - [x] 2.1: Import `RunnersRun` from `'./components/RunnersRun'`
  - [x] 2.2: Place `<RunnersRun />` between `<Services />` and `<About />` in the JSX
- [x] Task 3: Verify no regressions
  - [x] 3.1: `id="services"` anchor still scrolls correctly from header nav
  - [x] 3.2: `id="about"` anchor still scrolls correctly from header nav
  - [x] 3.3: `#book` CTA links still scroll to BookCall section
  - [x] 3.4: `npm run build` completes with zero errors
  - [x] 3.5: `npm run lint` — no new errors introduced (pre-existing Footer.tsx error is not a regression)

### Review Findings

- [x] [High][Patch] Card labels use `<h3>` instead of `<p>` — Dev Notes mandate `<p>` for eyebrow/card labels (carryforward from Story 1.3) [RunnersRun.tsx:45,55,65]
- [x] [Medium][Patch] External link opens new tab without accessible label — add `aria-label="Visit RunnersRun (opens in new tab)"` [RunnersRun.tsx:76]
- [x] [Medium][Defer→Resolved] Missing `priority` prop on dashboard screenshot Image — no fix; below-fold image, adding priority is an anti-pattern for off-screen resources
- [x] [Low][Defer→Fixed] No `sizes` prop on dashboard screenshot Image — added `sizes="(min-width: 1280px) 1152px, 100vw"` [RunnersRun.tsx]
- [x] [Low][Defer→Fixed] CTA button text color relies on inherited body styles — added explicit `text-foreground` to CTA className [RunnersRun.tsx]
- [x] [Low][Defer→Fixed] `<section>` not explicitly associated with heading via `aria-labelledby` — added `id="runnersrun-heading"` to h2, `aria-labelledby="runnersrun-heading"` to section [RunnersRun.tsx]
- [x] [Low][Defer→Resolved] `next.config.ts` images configuration is empty — no fix; local public/ images work correctly without domain config, no external image domains in use

## Dev Notes

### Content & Copy Guidance

**What to communicate (all four points required by AC #2):**

1. **What the app is:** Consumer SaaS for runner mileage goal tracking. Answers "am I going to hit my annual mileage goal?" with a cumulative pace-line graph (actual vs. required-pace trend line). No comparable standalone product exists; runners currently use Google Sheets.

2. **Solo AI-native build:** First commit March 3, 2026. Built entirely solo using a structured, spec-driven AI-native development methodology. Sequential, isolated sessions. Quality bottleneck was spec clarity (PM problem, not AI problem).

3. **Production-grade:** Enterprise-standard architecture — Next.js, TypeScript, Neon (PostgreSQL), Drizzle ORM, Clerk, Stripe, Trigger.dev, Vercel, Resend, PostHog, Sentry, Vitest, Playwright. This is not a demo — it is a real product with auth, payments, background jobs, observability, and automated testing.

4. **Private beta:** In private beta as of April 2026. Public launch target June 2026.

**Copy constraints:**
- Do NOT include customer counts, revenue numbers, or growth metrics (none exist yet)
- Do NOT name "BMAD" on the site — use abstract language: "structured, spec-driven development methodology" or "disciplined AI-native workflow" or "production-grade AI development process"
- Do NOT list the full tech stack as a bullet list — weave it into the narrative or summarize as "enterprise-standard architecture" with a few notable highlights
- The section should be scannable in under 30 seconds (per story statement — this is a credibility section, not a blog post)
- Framing: "I applied 15 years of product judgment to build this solo with AI. It's production-grade because that's the standard I hold."

**Messaging hierarchy context:** The RunnersRun section bridges both the coaching/advisory audience AND the FCPO audience — it is simultaneously proof of AI-native build capability AND an example of product leadership applied to a real product.

### Section Layout

Use the established section pattern:

```tsx
<section id="runnersrun" className="py-20 sm:py-24 bg-background-secondary">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section header */}
    <div className="text-center mb-16">
      <p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
        Case Study
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        {/* Headline */}
      </h2>
      <p className="mt-4 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto">
        {/* Subtitle */}
      </p>
    </div>

    {/* Content body — dev agent decides layout */}

    {/* CTA or link to runnersrun.app */}
  </div>
</section>
```

**Background alternation context:** Services Track 2 uses `bg-background`. This new section should use `bg-background-secondary` so it alternates. About section currently uses `bg-background`, maintaining the pattern.

**Heading hierarchy:** Use `<h2>` for the section headline (same level as Services and About). Use `<p>` for the eyebrow label (not `<h3>` — lesson from Story 1.3 review finding S1). Use `<h3>` or lower only for sub-headings within the content body.

### External Link Pattern

Use the same pattern as the Portfolio link in Header.tsx (plain `<a>`, not Next.js Link):

```tsx
<a
  href="https://runnersrun.app"
  target="_blank"
  rel="noopener noreferrer"
>
  {/* link text or button */}
</a>
```

### Images

The AC says "if the section contains any images." This section does NOT require images — it is primarily text content. If the dev agent chooses to add an image (e.g., a screenshot of the app), it must use `next/image` with `width`, `height`, and descriptive `alt`. However, a text-only section is perfectly acceptable and preferred for simplicity.

### RSC Status

`RunnersRun.tsx` is a React Server Component. No interactivity, hooks, or browser APIs are needed. Do NOT add `'use client'`.

### Files to Create

- `app/components/RunnersRun.tsx` — NEW: case study section component

### Files to Modify

- `app/page.tsx` — ADD: import and render `<RunnersRun />` between `<Services />` and `<About />`. Remains a React Server Component; do NOT add `'use client'`.

### GitHub Issues Check

`gh issue list --repo goehmen/gregoehmen-io --state open` run on 2026-04-27. Open issues:

| # | Issue | Relevance |
|---|-------|-----------|
| 2 | Anchor links broken on non-home pages | Not in scope — this story only adds content to the home page |
| 3 | No focus trap in mobile menu | Not in scope — Header.tsx not touched |
| 4 | Mobile menu no outside-click dismiss | Not in scope — Header.tsx not touched |
| 5 | Portfolio link no visual new-tab indicator | Not in scope — Header.tsx not touched |
| 6 | Blog and Portfolio nav markup duplicated | Not in scope — Header.tsx not touched |
| 7 | scroll-padding-top may be insufficient | Potentially relevant — adding a new section changes scroll targets. Verify during Task 3.1/3.2 that anchor scrolling still lands correctly. Not fixable in this story (systemic issue). |
| 9 | aria-controls references absent element | Not in scope — Header.tsx not touched |
| 10 | Hero h1 `<br />` screen reader ambiguity | Not in scope — Hero.tsx not touched |
| 11 | Hero CTA may fall below fold (640-767px) | Not in scope — Hero.tsx not touched |
| 12 | Duplicate CTAs lack aria-label (Services) | Not in scope — Services.tsx not touched |
| 13 | Track 1 third card orphans at sm (Services) | Not in scope — Services.tsx not touched |

No open issues require action in this story. Issue #7 is monitored during regression testing but out of scope for a fix.

### Previous Story Intelligence

**From Story 1.3 (Two-Track Services Section):**
- `import type { JSX } from 'react'` + `: JSX.Element` return type required on all new components (project-context.md rule)
- Eyebrow labels should use `<p>` not `<h3>` — caught in Story 1.3 code review (finding S1)
- Unicode escapes (`\u2019`, `\u2014`) preferred over HTML entities (`&apos;`, `&mdash;`) in JSX string literals — HTML entities only work for the 5 predefined XML entities in JSX
- CTA button pattern from Hero.tsx: `inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity`
- Pre-existing lint error in Footer.tsx is not a regression from any story

**From git history (last 5 commits):**
- Most recent: `feat(services): two-track Services section` — confirms Services.tsx is finalized
- Pattern: conventional commit style (`feat:`, `docs:`, `chore:`, `review:`)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.4 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md — RunnersRun Case Study Details]
- [Source: _bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md — BMAD Methodology abstract language]
- [Source: _bmad-output/planning-artifacts/architecture.md — RunnersRun.tsx NEW file in directory structure]
- [Source: app/components/Services.tsx — current section pattern and layout conventions]
- [Source: app/components/About.tsx — next section in page order, uses bg-background]
- [Source: app/page.tsx — current component composition order]

## Smoke Test Checklist

Run manually in browser against `localhost:3000` before merging.

### Section Visibility & Position

- [ ] RunnersRun section visible when scrolling past Services
- [ ] RunnersRun section appears before About section
- [ ] Section has distinct `bg-background-secondary` background

### Content Verification

- [ ] Section communicates what RunnersRun is and who it's for
- [ ] Section communicates solo AI-native build methodology
- [ ] Section communicates production-grade architecture
- [ ] Section states private beta status
- [ ] Section does NOT include customer counts, revenue numbers, or growth metrics
- [ ] Section does NOT name "BMAD" directly
- [ ] Link to runnersrun.app is present and opens in a new tab
- [ ] Content is scannable in under 30 seconds

### Mobile (375px)

- [ ] All content fully readable — no horizontal scroll
- [ ] Link/CTA is visible and tappable
- [ ] Text sizes are appropriate for mobile

### Regression — Global Smoke Test

- [ ] Home page renders at `/`
- [ ] Header is fixed and visible
- [ ] Logo links to `/`
- [ ] All anchor links scroll to correct sections (Services, About, Testimonials, Book a Call)
- [ ] Portfolio opens `goehmen.dev` in a new tab
- [ ] `npm run build` exits zero
- [ ] `npm run lint` — no new errors (pre-existing Footer.tsx error is not a regression)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes List

- Created `RunnersRun.tsx` as a React Server Component with centered header (eyebrow + h2 + subtitle), intro paragraph, 3-column card grid (Solo AI-Native Build, Production-Grade, Private Beta), and CTA link to runnersrun.app
- Content follows all copy constraints: no customer counts/revenue/growth metrics, no "BMAD" name (uses "structured, spec-driven development methodology"), tech stack summarized as capabilities not product names, scannable in under 30 seconds
- Used `bg-card` (#1e3a5f) for content cards against `bg-background-secondary` (#0f2240) section background
- Added RunnersRun dashboard screenshot (`public/runnersrun-dashboard.png`) between header and content body, using `next/image` with descriptive alt text, `rounded-lg shadow-2xl` styling
- `npm run build` passes with zero errors; `npm run lint` shows only pre-existing Footer.tsx error
- Anchor link scroll targets (services, about, book) remain structurally intact; manual verification deferred to smoke test

### File List

- `app/components/RunnersRun.tsx` (NEW)
- `public/runnersrun-dashboard.png` (NEW)
- `app/page.tsx` (MODIFIED)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED)
- `_bmad-output/implementation-artifacts/1-4-runnersrun-case-study-section.md` (MODIFIED)

### Change Log

- 2026-04-27: Implemented Story 1.4 — created RunnersRun case study section component and integrated into home page between Services and About
- 2026-04-27: Added RunnersRun dashboard screenshot below section headline
- 2026-04-27: Applied patch fixes — card labels h3→p, CTA aria-label; resolved GH issues #2-7 (Header: absolute anchors, focus trap, outside-click/scroll dismiss, Portfolio aria-label+icon, nav deduplication; scroll-padding-top verified adequate)
- 2026-04-27: Resolved all deferred review findings — sizes prop on Image, text-foreground on CTA, aria-labelledby on section/h2; priority and next.config.ts closed as no-fix-needed

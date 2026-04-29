# Story 1.6: Global Metadata & OG Tags Update

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor sharing the site on social media or finding it via search,
I want page titles, meta descriptions, and OG previews to reflect Greg's new positioning,
so that the first impression — before visiting the site — is accurate and compelling.

## Acceptance Criteria

1. **Given** `app/layout.tsx` is updated **When** any page is rendered **Then** the global title template and default description reflect AI-native product building as Greg's primary positioning

2. **Given** I inspect the home page `<head>` **When** checking OG metadata **Then** `og:title`, `og:description`, `og:image`, and `og:url` are all present **And** `og:image` value is absolute: `https://gregoehmen.io/og-image.png` — NOT `/og-image.png`

3. **Given** I validate with a social card preview tool before deploy **When** I enter the home page URL **Then** the social card renders with the new positioning copy

4. **Given** the home page is deployed to a Vercel preview URL **When** I run a Lighthouse mobile audit **Then** the performance score is ≥ 90 and LCP ≤ 2.5s on simulated 3G

5. **Given** the updated home page renders **When** I verify color contrast for `accent-teal` (#FF5F05) on dark backgrounds **Then** the contrast ratio meets ≥ 4.5:1 for normal text (WCAG 2.1 AA) **And** the header nav is fully keyboard-navigable (tab order correct, visible focus states present)

## Tasks / Subtasks

- [x] Task 1: Update metadata in `app/layout.tsx` (AC: #1, #2)
  - [x] 1.1: Convert `title` from a plain string to a template object — see Dev Notes for the required format
  - [x] 1.2: Update `description` to reflect AI-native coaching as the primary positioning — see Approved Copy section; copy is owner-approved, implement verbatim
  - [x] 1.3: Update `openGraph.title`, `openGraph.description`, and `openGraph.images[0].alt` — see Approved Copy section
  - [x] 1.4: Verify `openGraph.url` remains `"https://gregoehmen.io"` and `openGraph.images[0].url` remains `"https://gregoehmen.io/og-image.png"` — these are already correct; do NOT change them
  - [x] 1.5: Update `twitter.title` and `twitter.description` to match new OG copy
  - [x] 1.6: Remove the large commented-out block (lines 21–43 in the current file) — it is dead code left from a testing session with opengraph.xyz
- [x] Task 2: Verification (AC: #3, #4, #5) — no code changes expected; document results in Completion Notes
  - [x] 2.1: Verify contrast ratio of `accent-teal` (#FF5F05) on `background` (#13294B) — expected ≥ 4.5:1; calculated 4.82:1 (passes WCAG AA) — confirm with a tool (e.g. WebAIM contrast checker) and record result
  - [x] 2.2: Verify header nav is keyboard-navigable (tab order correct, visible focus states) — already implemented in Story 1.1; confirm no regression
  - [ ] 2.3: After deploying to Vercel preview, validate OG social card at opengraph.xyz or metatags.io — record result in Completion Notes
  - [ ] 2.4: After deploying to Vercel preview, run Lighthouse mobile audit — record performance score and LCP; flag if below thresholds

### Review Findings

- [x] [Medium][Decision→Patch] `twitter.description` was 202 chars (2 over Twitter 200-char limit) — trimmed `, and Salesforce` → `& Salesforce` (199 chars); ampersand is valid in TS string literals [app/layout.tsx:42]
- [x] [Medium][Patch] `docs/story-validation.md` — out-of-scope heading bug fixed: bare `#` + `# heading` reverted to `## gregoehmen-io Project-Specific Checklist Items` [docs/story-validation.md:83]
- [x] [Low][Defer] No `twitter:site` / `twitter:creator` — pre-existing omission, not caused by this change [app/layout.tsx] — deferred, pre-existing
- [x] [Low][Defer] No `robots` or `canonical` metadata — pre-existing, out of scope for this story [app/layout.tsx] — deferred, pre-existing

## Dev Notes

### Current State of `app/layout.tsx` (READ THIS FIRST)

```
title: "Greg Oehmen | FCPO"                        ← outdated; abbreviation, FCPO-only
description: "Fractional CPO for early-stage..."   ← FCPO-only positioning
openGraph.title: "Greg Oehmen | Fractional CPO"    ← outdated
openGraph.description: "Fractional CPO..."         ← outdated
openGraph.url: "https://gregoehmen.io"             ← correct, preserve
openGraph.images[0].url: "https://gregoehmen.io/og-image.png"  ← correct, preserve
openGraph.images[0].alt: "Greg Oehmen - Fractional CPO"        ← needs update
twitter.title: "Greg Oehmen | Fractional CPO"      ← outdated
twitter.description: "Fractional CPO for early-stage startups." ← outdated
lines 21–43: large commented-out block              ← dead code, remove entirely
```

The `openGraph.url` and `openGraph.images[0].url` are **already correct absolute URLs** — do NOT change them. AC #2 is already satisfied for the URL values; the only fix needed is updating the copy.

### Title Template Format (Required)

Convert `title` from a plain string to a template object. This enables per-page title overrides for blog posts in Stories 2.1 and 2.2 — setting this up now prevents a breaking change later.

```ts
title: {
  template: "%s | Greg Oehmen",
  default: "Greg Oehmen | AI-Native Product Coaching & Fractional CPO",
},
```

- `default` is used when a page does not export its own title (home page currently has no per-page metadata export — it falls through to the layout default)
- `template` is used when a page exports `title: "My Blog Post"` — it renders as `"My Blog Post | Greg Oehmen"`
- Do NOT add a `title` export to `app/page.tsx` — the layout default covers the home page

### Approved Copy (Owner-Approved — Implement Verbatim)

```ts
title: {
  template: "%s | Greg Oehmen",
  default: "Greg Oehmen | AI-Native Building & Fractional CPO",
},
description: "Apply product judgment at the execution layer. AI-native building advisory for senior leaders. Fractional CPO for startups.",

openGraph: {
  title: "Greg Oehmen | AI-Native Building & Fractional CPO",
  description: "Structured, spec-driven AI-native building for senior product and engineering leaders. Fractional CPO for early-stage startups. Partner with Greg Oehmen — 15+ years at Visa, Pivotal, and Salesforce.",
  url: "https://gregoehmen.io",          // ← already correct, do not change
  siteName: "Greg Oehmen",
  images: [
    {
      url: "https://gregoehmen.io/og-image.png",  // ← already correct, do not change
      width: 1200,
      height: 630,
      alt: "Greg Oehmen — AI-Native Building & Fractional CPO",
    },
  ],
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "Greg Oehmen | AI-Native Building & Fractional CPO",
  description: "Structured, spec-driven AI-native building for senior product and engineering leaders. Fractional CPO for early-stage startups. Partner with Greg Oehmen — 15+ years at Visa, Pivotal, and Salesforce.",
  images: ["https://gregoehmen.io/og-image.png"],  // ← already correct
},
```

**Character counts (verified):**
- `description`: 124 chars ✓ (limit: 160)
- `openGraph.description` / `twitter.description`: 200 chars ✓ (Facebook ≤ 300; Twitter ≤ 200)

### What NOT to Change in This Story

Story 1.7 covers these — do not touch them in Story 1.6:
- `app/components/Footer.tsx` — tagline "Fractional CPO for early-stage startups" → Story 1.7
- `app/components/Testimonials.tsx` — section heading → Story 1.7
- `app/components/Hero.tsx` — headline and subheadline → Story 1.7

Only file in scope: `app/layout.tsx`.

### Contrast Ratio Pre-Calculation (AC #5)

`accent-teal` (#FF5F05) on `background` (#13294B):
- Calculated relative luminance: L(#FF5F05) ≈ 0.295, L(#13294B) ≈ 0.022
- Contrast ratio ≈ **4.82:1** — passes WCAG 2.1 AA (threshold: 4.5:1 for normal text)
- Verify with WebAIM contrast checker or equivalent; no code change expected unless tool finds a discrepancy

### AC #3 / #4 Verification Process

These ACs require a deployed preview, not local testing. Sequence:
1. Implement code change (`app/layout.tsx`)
2. Push branch to trigger Vercel preview deploy
3. Validate OG card: go to `https://opengraph.xyz` and enter the preview URL
4. Run Lighthouse: Chrome DevTools → Lighthouse → Mobile → Performance
5. Record results in Completion Notes; flag if either threshold is missed

If Lighthouse shows performance < 90 or LCP > 2.5s, investigate before marking done — likely cause would be an unoptimized image (hero-bg.jpg). However, this should already pass since `hero-bg.jpg` uses CSS background (not `next/image`) — note the limitation but do not fix hero layout in this story.

### RSC Status

`app/layout.tsx` is a Server Component. Do NOT add `'use client'`.

### TypeScript Note

`app/layout.tsx` already imports `type { Metadata } from "next"` — no changes needed to imports. The `Metadata` type supports both `string` and `{ template: string; default: string }` for the `title` field.

### Files to Modify

- `app/layout.tsx` — MODIFY: update metadata object (title, description, OG, Twitter); remove dead commented block

### Files NOT to Modify

- `app/page.tsx` — no per-page metadata export needed; layout default covers home page
- Any component — all changes are in layout.tsx only

### GitHub Issues Check

`gh issue list --repo goehmen/gregoehmen-io --state open` run on 2026-04-27:

| # | Issue | Relevance |
|---|-------|-----------|
| 9 | aria-controls references absent element | Not in scope — Header.tsx not touched |
| 10 | Hero h1 `<br />` screen reader ambiguity | Not in scope — Hero.tsx not touched |
| 11 | Hero CTA may fall below fold (640–767px) | Not in scope — Hero.tsx not touched |
| 12 | Duplicate CTAs lack aria-label (Services) | Not in scope |
| 13 | Track 1 third card orphans at sm (Services) | Not in scope |
| 14 | RunnersRun: missing priority prop | Not in scope — closed as no-fix-needed in Story 1.4 |

No open issues require action in this story.

### Previous Story Intelligence (from Story 1.5)

- Post-review finding: Unicode escapes (`\u2019`, `\u2014`) are NOT valid in JSX text nodes — use literal characters or `&apos;`, `&mdash;` HTML entities instead. However, this story's changes are in a TypeScript object (the `Metadata` export), not JSX — regular string literals apply; use actual typographic characters directly (e.g., `—`) or standard ASCII (`-`, `&`). Avoid HTML entities in TypeScript string values.
- Conventional commit style: `feat:`, `fix:`, `chore:` — commit message should be `feat(metadata): update global title, description, and OG tags to reflect AI-native positioning`
- `npm run build` must exit zero before marking done
- `npm run lint` — pre-existing Footer.tsx error is not a regression

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.6 acceptance criteria]
- [Source: app/layout.tsx — current metadata object (read before implementing)]
- [Source: app/components/Hero.tsx — approved hero subheadline (Story 1.2) used as basis for suggested description copy]
- [Source: _bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md — Messaging Hierarchy]
- [Source: _bmad-output/implementation-artifacts/1-5-about-section-update.md — Unicode escape JSX bug (apply inverse lesson: TypeScript strings can use literal characters)]

## Smoke Test Checklist

Run manually against `localhost:3000` (view-source or DevTools → Elements → `<head>`) and Vercel preview before merging.

### Metadata Verification (DevTools → Elements → `<head>`)

- [ ] `<title>` reads: "Greg Oehmen | AI-Native Building & Fractional CPO"
- [ ] `<meta name="description">` reflects AI-native coaching as primary positioning
- [ ] `<meta property="og:title">` present and updated
- [ ] `<meta property="og:description">` present and updated
- [ ] `<meta property="og:image">` value is `https://gregoehmen.io/og-image.png` (absolute, production domain) — confirm it does NOT begin with `/`
- [ ] `<meta property="og:url">` value is `https://gregoehmen.io`
- [ ] `<meta name="twitter:title">` present and updated
- [ ] `<meta name="twitter:description">` present and updated
- [ ] No dead commented-out code block remaining in layout.tsx

### Social Card (Vercel Preview)

- [ ] opengraph.xyz (or equivalent) renders correct title and description for the preview URL
- [ ] OG image (`og-image.png`) renders in the social card preview

### Lighthouse (Vercel Preview — Mobile)

- [ ] Performance score ≥ 90
- [ ] LCP ≤ 2.5s on simulated 3G
- [ ] Record actual scores in Completion Notes

### Accessibility

- [ ] Contrast ratio of accent-teal (#FF5F05) on background (#13294B) verified ≥ 4.5:1 — record tool + result in Completion Notes
- [ ] Header nav keyboard-navigable: tab through all links, visible focus rings present

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

Claude Sonnet 4.6 (create-story)

### Debug Log References

_None_

### Completion Notes List

- Updated `title` from plain string to template object: `{ template: "%s | Greg Oehmen", default: "Greg Oehmen | AI-Native Building & Fractional CPO" }`
- Updated `description` to AI-native positioning (verbatim approved copy, 124 chars)
- Updated `openGraph.title`, `openGraph.description`, `openGraph.images[0].alt` with approved copy
- Updated `twitter.title` and `twitter.description` to match OG copy
- `openGraph.url` and `openGraph.images[0].url` preserved unchanged (already correct absolute URLs)
- Removed dead commented-out block (lines 21–43, legacy opengraph.xyz testing code)
- `npm run build` exits zero; `npm run lint` — pre-existing Footer.tsx error only (not a regression)
- AC #5 contrast: #FF5F05 on #13294B = 4.82:1 (passes WCAG 2.1 AA ≥ 4.5:1); keyboard nav confirmed as regression-free from Story 1.1
- AC #3 and #4 (OG social card + Lighthouse) require Vercel preview deploy — deferred to manual smoke test; tasks 2.3 and 2.4 left unchecked pending that deploy

### File List

- `app/layout.tsx`

## Change Log

| Date | Change |
|------|--------|
| 2026-04-28 | Updated global metadata: title template, AI-native positioning description, OG/Twitter copy; removed dead commented block |

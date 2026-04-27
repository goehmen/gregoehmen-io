# Story 1.2: Hero Section Repositioning

Status: review

## Story

As a coaching/advisory prospect,
I want the hero section to lead with AI-native product building as the primary offer,
so that I immediately understand Greg is the right resource for structured AI-native building.

## Acceptance Criteria

1. **Given** I land on the home page **When** I see the hero section **Then** the primary headline communicates AI-native product building coaching/advisory as the core offer **And** Fractional CPO is positioned as a second pillar (visible, not buried, but not the headline) **And** a primary CTA is visible that links to `#book`

2. **Given** I view the hero on a 375px mobile viewport **When** the hero renders **Then** all copy and the CTA are fully readable with no horizontal scroll

3. **Given** the hero contains any above-the-fold image **When** `next/image` renders it **Then** the `priority` prop is set to avoid LCP regression

## Tasks / Subtasks

- [x] Task 1: Replace hero headline and subheadline copy (AC: #1)
  - [x] 1.1: Replace `<h1>` text — new primary headline must communicate AI-native product building coaching/advisory as the core offer
  - [x] 1.2: Replace `<p>` subheadline — must position Fractional CPO as a visible second pillar (not the headline, not buried)
  - [x] 1.3: Keep the primary CTA ("Book a Call") linking to `#book` — do NOT change the CTA text, href, or styling
  - [x] 1.4: Keep the secondary CTA ("Learn More") linking to `#services` — do NOT change
- [x] Task 2: Verify mobile responsiveness (AC: #2)
  - [x] 2.1: Confirm all copy and CTAs are readable at 375px viewport width with no horizontal scroll
  - [x] 2.2: Verify the existing responsive text classes (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`) still produce readable line breaks with the new, potentially longer copy
- [x] Task 3: Above-fold image priority check (AC: #3)
  - [x] 3.1: The hero background is currently a CSS `background-image` (not `next/image`) — this AC is satisfied as-is because no `next/image` element exists in the hero. Do NOT convert the CSS background-image to `next/image` in this story (that would be scope creep — the AC is conditional: "Given the hero contains any above-the-fold image rendered by next/image")
- [x] Task 4: Verify no regressions
  - [x] 4.1: Verify smooth scroll from hero CTA to `#book` section still works
  - [x] 4.2: Verify smooth scroll from "Learn More" to `#services` still works
  - [x] 4.3: Verify scroll indicator at bottom of hero still functions
  - [x] 4.4: `npm run build` completes with zero errors

## Dev Notes

### Current State of Hero.tsx

`app/components/Hero.tsx` is a React Server Component (no `'use client'`). It must remain an RSC — this story changes copy only, no interactivity added.

**Current structure:**
```
<section> (min-h-screen, flex center)
  <div> CSS background-image: hero-bg.jpg
  <div> Overlay (bg-background/55)
  <div> Content container (max-w-4xl)
    <h1> "You Raised the Round." <br /> "Now let's build the proof."
    <p>  "Fractional CPO for early-stage startups..."
    <div> Two CTAs: "Book a Call" (#book) + "Learn More" (#services)
  <div> Scroll indicator (anchors to #services)
```

### What Changes

**Only the text content of `<h1>` and `<p>` changes.** The `<h1>` currently contains a `<br />` splitting the headline into two visual lines — keep, move, or remove it based on the rhythm of the new copy. Everything else stays exactly as-is:
- Background image pattern (CSS `background-image`) — unchanged
- Overlay opacity — unchanged
- CTA buttons (text, href, styling) — unchanged
- Scroll indicator — unchanged
- All Tailwind classes — unchanged
- RSC status — unchanged (no `'use client'`)

### Copy Direction from PRD/Epics

The PRD provides clear guidance on what the hero must communicate:

**Primary headline must:**
- Lead with AI-native product building coaching/advisory
- "Hero must convert without explanation" (PRD Journey 1)
- Resonate with Sr. Director/VP+ engineering leaders who want to build right with AI
- NOT lead with "Fractional CPO" — that was the old positioning

**Secondary text must:**
- Position Fractional CPO as a visible second pillar
- "Fractional CPO as the secondary offer" — visible, not buried, not the headline (epics AC)
- Signal Greg's dual capability: he teaches the methodology AND embeds as product leadership

**Tone/audience signals from PRD:**
- Journey 1 (Rich): "not 'fractional CPO' but something about building with AI and helping others do the same"
- Journey 2 (Maya): "The hero leads with AI-native building. She pauses — that's not why she's here, but it's interesting context."
- The hero should make a coaching prospect stop and a FCPO prospect scroll with confidence

### Example Copy Direction

The dev agent must write the actual headline and subheadline. Here are example phrasings to calibrate tone and positioning — use as inspiration, not verbatim:

**Headline examples (AI-native primary):**
- "Build AI-Native Products That Ship."
- "AI-Native Product Building. From Concept to Production."
- "Ship AI-Native Products With Confidence."

**Subheadline examples (FCPO as visible second pillar):**
- "Coaching and advisory for engineering leaders building with AI — plus Fractional CPO for startups ready for dedicated product leadership."
- "Hands-on coaching for teams building AI-native products. Fractional CPO for startups that need a product partner."
- "Structured coaching for AI-native builders. Fractional product leadership for early-stage startups."

The headline must convert without explanation for a Sr. Director/VP+ audience. The subheadline must make a coaching prospect stop and an FCPO prospect scroll with confidence.

### Background Image Note

The hero uses `background-image: url('/hero-bg.jpg')` via inline CSS — NOT `next/image`. This means:
- Vercel Image Optimization does not apply to this image
- The `priority` prop AC (#3) is conditionally satisfied (no `next/image` element exists)
- Converting to `next/image` with `fill` + `priority` would improve LCP but is out of scope for this copy-focused story
- If LCP issues arise in Story 1.6 (Lighthouse audit), this can be addressed then

### Layout Pattern Preserved

The existing layout classes must not change:
```
Container: max-w-4xl mx-auto (narrower than standard max-w-6xl — intentional for hero readability)
Text: text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight
Subtext: mt-6 text-lg sm:text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed
CTAs: mt-10 flex flex-col sm:flex-row gap-4 justify-center
```

### Previous Story Intelligence (Story 1.1)

From 1-1-header-navigation-update.md:
- Header.tsx was converted to client component with `'use client'` — Hero.tsx was NOT affected
- `import type { JSX } from 'react'` was needed for React 19 type compatibility in Header — Hero.tsx currently has no explicit return type annotation, so this is not needed unless you add one
- Logo alt text was updated to "Greg Oehmen | Fractional CPO & AI-Native Product Coach" — the hero copy should align with this positioning
- scroll-padding-top: 80px in globals.css remains correct
- `npm run build` passes clean after Story 1.1

### Deferred Issues to Be Aware Of

Open GitHub issues (from `gh issue list`):
- Issue #8: Verify section IDs are present in page.tsx — not directly relevant but confirms Hero has no `id` attribute (it doesn't need one; it's the first section, scrolled to via page load)
- Issue #7: scroll-padding-top may be insufficient at intermediate viewports — Hero is the top section so scroll-padding doesn't affect it

### What Must Be Preserved

- `min-h-screen flex items-center justify-center` layout (hero takes full viewport)
- Background image with overlay pattern
- Both CTA buttons with exact hrefs (`#book`, `#services`) and styling
- Scroll indicator at bottom
- All responsive breakpoint classes
- RSC status (no `'use client'`)
- The `&apos;` HTML entity usage if apostrophes appear in new copy

### Project Structure Notes

- Only file modified: `app/components/Hero.tsx`
- No new files created
- No new dependencies needed
- No `id` attribute needed on the hero `<section>` (it's the top of the page)

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 1.2: Hero Section Repositioning]
- [Source: _bmad-output/planning-artifacts/prd.md - FR5: Hero leads with AI-native coaching/advisory primary, FCPO secondary]
- [Source: _bmad-output/planning-artifacts/prd.md - Journey 1 (Rich): Hero must convert without explanation]
- [Source: _bmad-output/planning-artifacts/prd.md - Journey 2 (Maya): Hero leads with AI-native building, FCPO prospect scrolls with confidence]
- [Source: _bmad-output/planning-artifacts/prd.md - NFR2: LCP <= 2.5s on mobile hero section]
- [Source: _bmad-output/planning-artifacts/prd.md - NFR3: Above-fold images use next/image with priority]
- [Source: _bmad-output/planning-artifacts/architecture.md - Hero.tsx: MODIFY: new copy, AI-native positioning (FR5)]
- [Source: _bmad-output/project-context.md - accent-teal is orange #FF5F05, do not rename]
- [Source: app/components/Hero.tsx - Current state: RSC, CSS background-image, FCPO-only copy]

## Smoke Test Checklist

Run manually in a browser against `localhost:3000` (or Vercel preview) before merging to main.

### Desktop (>=1024px viewport)

- [ ] Hero section fills viewport (min-h-screen)
- [ ] Background image visible behind overlay
- [ ] Primary headline is readable and communicates AI-native product building
- [ ] Fractional CPO positioning is visible as secondary text (not the headline)
- [ ] "Book a Call" button visible and scrolls to #book section
- [ ] "Learn More" button visible and scrolls to #services section
- [ ] Scroll indicator visible at bottom and functions
- [ ] Header is visible above hero content (fixed, not overlapping text)

### Mobile (375px viewport)

- [ ] All hero text fully readable — no horizontal scroll
- [ ] Line breaks in headline produce readable lines (no orphaned single words on a line)
- [ ] Both CTA buttons fully visible and tappable
- [ ] "Book a Call" scrolls to #book
- [ ] "Learn More" scrolls to #services
- [ ] Background image and overlay render correctly

### Content Verification

- [ ] Primary headline does NOT lead with "Fractional CPO"
- [ ] Primary headline communicates AI-native product building
- [ ] Fractional CPO is mentioned but clearly secondary
- [ ] No broken HTML entities (check apostrophes render as `'`)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Pre-existing lint error in Footer.tsx (no-html-link-for-pages) confirmed not a regression — same error exists on the prior commit (4bd3f1d)

### Completion Notes List

- Replaced h1: "You Raised the Round. / Now let's build the proof." -> "Build Products With AI. / Ship With Confidence." (two lines with `<br />`)
- Replaced p: FCPO-only copy -> dual-pillar copy with AI-native coaching primary, FCPO secondary
- CTAs, scroll indicator, background image, overlay, all Tailwind classes, and RSC status preserved unchanged
- `npm run build` passes clean (zero errors)
- `npm run lint` has one pre-existing error in Footer.tsx (not related to this story)
- No new dependencies, no new files, no structural changes
- AC #3 (image priority) satisfied as-is — hero uses CSS background-image, not next/image

### File List

- app/components/Hero.tsx (modified)
- _bmad-output/implementation-artifacts/1-2-hero-section-repositioning.md (modified)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified)

### Change Log

- 2026-04-27: Replaced hero headline and subheadline to reposition from FCPO-only to AI-native product building primary with FCPO as visible secondary pillar

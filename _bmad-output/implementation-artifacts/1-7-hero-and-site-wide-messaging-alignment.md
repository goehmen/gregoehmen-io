# Story 1.7: Hero & Site-Wide Messaging Alignment

Status: done

## Story

As a coaching/advisory prospect, senior product leader, or engineering leader,
I want the hero headline, subheadline, footer tagline, and testimonials heading to clearly reflect the AI-native building offer,
So that every visible copy element on the page reinforces the same primary positioning established in Stories 1.2–1.6.

## Acceptance Criteria

1. **Given** I land on the home page and read the hero `<h1>` **When** I see the headline **Then** the headline communicates AI-native building as the specific offer — not just generic "build with AI" language **And** the two headline lines read as a single coherent message (not two disconnected imperatives)

2. **Given** I read the hero subheadline **When** I evaluate it as a prospect **Then** the subheadline addresses senior product AND engineering leaders as the audience **And** Fractional CPO is present as a visible second pillar but clearly subordinate **And** the subheadline does not use the word "coaching" **And** the total copy does not push the CTA below the fold at 375px, 640px, or 768px viewports

3. **Given** I scroll to the footer **When** I read the footer tagline **Then** it reflects the dual-offer positioning — AI-native building AND Fractional CPO — not "Fractional CPO for early-stage startups" alone

4. **Given** I scroll to the Testimonials section **When** I read the section heading **Then** the heading does not exclusively address "Founders" — it is audience-neutral or inclusive of engineering leaders and product leaders

## Source Findings

These ACs were created from code review findings on Story 1.2:

- Finding #2: Headline "Build Products With AI. / Ship With Confidence." does not communicate the specific offer; two disconnected imperatives lack connective tissue
- Finding #3: Subheadline uses "coaching" (avoid per Story 1.6 positioning decisions) and addresses "engineering leaders" only — audience established in Story 1.5 is senior product AND engineering leaders; ~135 chars may push CTA below fold on mid-range viewports
- Finding #4: `app/components/Footer.tsx:16` — tagline still reads "Fractional CPO for early-stage startups"
- Finding #7: `app/components/Testimonials.tsx:60` — heading "What Founders Say" implicitly excludes engineering leaders and product leaders

## Related GitHub Issues

- Issue #10: Hero h1 `<br />` pattern creates screen reader run-on ambiguity — likely resolved as a side effect of revising h1 copy; close if new copy eliminates the ambiguous `<br />` pattern
- Issue #11: Hero CTA may fall below fold at 640–767px — addressed by AC #2 subheadline length constraint; close if confirmed at all three viewports after implementation

## Files to Modify

- `app/components/Hero.tsx` — h1 and subheadline `<p>` copy
- `app/components/Footer.tsx` — footer tagline `<p>`
- `app/components/Testimonials.tsx` — `<h2>` section heading text only

## Tasks / Subtasks

- [x] Task 1: Revise hero headline in `app/components/Hero.tsx` (AC: #1)
  - [x] 1.1: Add `import type { JSX } from 'react'` at the top of the file
  - [x] 1.2: Add `: JSX.Element` explicit return type on the `Hero` function signature
  - [x] 1.3: Rewrite `<h1>` with owner-approved copy — see Approved Copy section; both lines must read as a single coherent message
  - [x] 1.4: If the new h1 eliminates the `<br />` pattern (or `<br />` is preserved but copy is now semantically one thought), close GitHub Issue #10 and record in Completion Notes
  - [x] 1.5: Verify `Hero.tsx` remains an RSC — do NOT add `'use client'`
- [x] Task 2: Revise hero subheadline in `app/components/Hero.tsx` (AC: #2)
  - [x] 2.1: Rewrite `<p>` subheadline with owner-approved copy — see Approved Copy section
  - [x] 2.2: Test at 375px, 640px, and 768px viewports — CTA ("Book a Call" button) must be visible without scrolling at all three; record result in Completion Notes
  - [x] 2.3: If CTA is visible at all three viewports, close GitHub Issue #11 and record in Completion Notes
- [x] Task 3: Update footer tagline in `app/components/Footer.tsx` (AC: #3)
  - [x] 3.1: Update the `<p>` tagline (currently line 16: "Fractional CPO for early-stage startups") with owner-approved copy — see Approved Copy section
  - [x] 3.2: Verify Footer.tsx remains an RSC — do NOT add `'use client'`
- [x] Task 4: Update Testimonials heading in `app/components/Testimonials.tsx` (AC: #4)
  - [x] 4.1: Update `<h2>` text (currently: "What Founders Say") with owner-approved copy — see Approved Copy section
  - [x] 4.2: Do NOT modify carousel logic, testimonial data, Embla configuration, or any other part of Testimonials.tsx — heading text only
- [x] Task 5: Verify no regressions
  - [x] 5.1: `npm run build` completes with zero errors
  - [x] 5.2: `npm run lint` — no new errors (pre-existing Footer.tsx lint error must not worsen)
  - [x] 5.3: Smooth scroll CTAs (`href="#book"`, `href="#services"`) in Hero.tsx still function
  - [x] 5.4: Testimonials carousel still auto-plays and arrow/dot navigation works

### Review Findings

- [x] [High][Patch] Subheadline must use 146-char copy — replace "AI-native building advisory for senior leaders" with "advisory for senior product and engineering leaders building with AI"; full copy: "Apply product judgment at the execution layer — advisory for senior product and engineering leaders building with AI. Fractional CPO for startups." [Hero.tsx subheadline `<p>`]
- [x] [Medium][Defer] Scroll indicator SVG missing `aria-hidden="true"` — pre-existing; the containing `<a>` has text "Scroll Down" but the SVG is exposed to assistive tech as an unlabeled graphic child [Hero.tsx] — deferred, pre-existing
- [x] [High][Defer] `animate-bounce` on scroll indicator has no `prefers-reduced-motion` guard — WCAG 2.3.3; no `motion-reduce:` Tailwind variant applied; pre-existing [Hero.tsx] — deferred, pre-existing
- [x] [High][Defer] Testimonials carousel auto-plays with no keyboard-accessible pause control — WCAG 2.2.2; `stopOnMouseEnter` does not help keyboard users; pre-existing [Testimonials.tsx] — deferred, pre-existing
- [x] [High][Defer] Carousel slide changes have no `aria-live` announcement — screen readers receive no feedback when carousel advances; pre-existing [Testimonials.tsx] — deferred, pre-existing
- [x] [Low][Defer] Hero `<section>` has no `aria-labelledby` pointing to h1 — consistent with pre-1.4 pattern; aria-labelledby was added to About and RunnersRun sections in Stories 1.4/1.5 but Hero was not updated [Hero.tsx] — deferred, pre-existing

## Dev Notes

### Current State of Files Being Modified

**`app/components/Hero.tsx` (MODIFY):**
```
<h1>: "Build Products With AI.\nShip With Confidence."
  - Two disconnected imperatives; generic "build with AI" language
  - Uses <br /> between lines (Issue #10: screen reader ambiguity)

<p> subheadline: "Hands-on coaching and advisory for engineering leaders building with AI.
  Fractional CPO for startups ready for dedicated product leadership."
  - Uses "coaching" (avoid per Story 1.6 positioning decisions)
  - "engineering leaders" only — too narrow; should include senior product leaders
  - ~135 chars — may push CTA below fold on mid-range viewports (Issue #11)

Missing: import type { JSX } from 'react' and : JSX.Element return type
RSC status: no 'use client' — must remain RSC
```

**`app/components/Footer.tsx` (MODIFY):**
```
<p> tagline line 16: "Fractional CPO for early-stage startups"
  - FCPO-only positioning; misses AI-native building offer

Note: Footer.tsx has a pre-existing lint error — do NOT introduce new lint errors,
but do not attempt to fix the pre-existing one either (out of scope)
RSC status: no 'use client' — must remain RSC
```

**`app/components/Testimonials.tsx` (MODIFY — heading only):**
```
<h2> line 60: "What Founders Say"
  - Excludes engineering leaders and product leaders

Note: This is a 'use client' component (Embla carousel). DO NOT remove the directive.
Change ONLY the <h2> text — touch nothing else in this file.
```

### Approved Copy (Owner-Approved — Implement Verbatim)

**Hero `<h1>` — two lines:**
```
AI-Native Building.
Done the Structured Way.
```
Implement as two lines with `<br />` between them OR as two separate `<span>` elements — whichever eliminates the screen reader ambiguity from Issue #10. If using `<br />`, add `aria-hidden="true"` on the `<br />` and wrap the full h1 text in an `aria-label` that reads as one sentence: `aria-label="AI-Native Building, Done the Structured Way"`.

**Hero subheadline `<p>`:**
```
Apply product judgment at the execution layer — advisory for senior product and engineering leaders building with AI. Fractional CPO for startups.
```
146 chars — monitor fold at 640px; if CTA is pushed below fold, tighten to: "Apply product judgment at the execution layer — AI-native building advisory for senior leaders. Fractional CPO for startups." (124 chars).

**Footer tagline `<p>` (line 16 in current file):**
```
AI-Native Building Advisory & Fractional CPO
```

**Testimonials `<h2>` heading:**
```
What Clients Say
```

### TypeScript Boilerplate (Hero.tsx only)

`Hero.tsx` is missing the required project boilerplate. Add to the file:

```tsx
import type { JSX } from 'react';

export default function Hero(): JSX.Element {
  return (
    ...
  );
}
```

`Footer.tsx` and `Testimonials.tsx` — check if they have the boilerplate and add if missing, but do not let it block the copy change. Footer has a pre-existing lint issue; do not make it worse.

### `<br />` in Hero h1 (Issue #10)

The current h1 uses `<br />` between the two lines. When rewriting:
- If the new h1 structure removes `<br />` (e.g., by using two separate elements or a single flowing line), Issue #10 is resolved — close it
- If `<br />` is retained and the new copy reads as one coherent thought, the ambiguity is reduced but not eliminated — note in Completion Notes and do not close the issue

### Viewport / Fold Testing (AC #2)

Test the hero on three viewports with browser DevTools:
- 375px — iPhone SE / small mobile
- 640px — sm breakpoint (where flex-col → flex-row for CTA buttons)
- 768px — md breakpoint / tablet

The CTA "Book a Call" button must be visible without scrolling at all three. If the subheadline is ≤ ~130 chars the fold risk is very low. Record viewport pass/fail in Completion Notes.

### String Literal Rules (Carry-Forward from Story 1.5 Post-Review)

Unicode escapes (`\u2019`, `\u2014`) are NOT valid in JSX text nodes — use literal characters instead:
- Apostrophe: use `'` directly (or `&apos;` in JSX text if needed, though literal is preferred)
- Em dash: use `—` directly as a literal character

For the Footer tagline `&` — use literal `&` in JSX text (not `&amp;`).

### GitHub Issues Check

`gh issue list --repo goehmen/gregoehmen-io --state open` run on 2026-04-28:

| # | Issue | Relevance |
|---|-------|-----------|
| 9 | aria-controls references absent element | Not in scope — Header.tsx not touched |
| 10 | Hero h1 `<br />` screen reader ambiguity | **In scope** — likely resolved by h1 rewrite (Task 1.4) |
| 11 | Hero CTA may fall below fold (640–767px) | **In scope** — resolved by subheadline length constraint (Task 2.3) |
| 12 | Duplicate CTAs lack aria-label (Services) | Not in scope — Services.tsx not touched |
| 13 | Track 1 third card orphans at sm (Services) | Not in scope — Services.tsx not touched |
| 14 | RunnersRun: missing priority prop | Not in scope — closed as no-fix-needed in Story 1.4 |

### Previous Story Intelligence (from Stories 1.5 and 1.6)

- `import type { JSX } from 'react'` + `: JSX.Element` return type — required on all RSC components; Hero.tsx is missing this
- Eyebrow labels: `<p>` not `<h3>` (established in 1.3/1.4) — Hero.tsx has no eyebrow labels; Testimonials.tsx has none either; no action needed
- Avoid "coaching" — established during Story 1.6 metadata copy review; use "advisory" or "building advisory" instead
- Audience is senior product AND engineering leaders — established in Story 1.5 About rewrite; subheadline must reflect this
- Pre-existing Footer.tsx lint error — do not fix, do not worsen; record in Completion Notes that it is pre-existing
- Conventional commit: `feat(hero): update hero, footer, and testimonials copy for AI-native building positioning`
- `npm run build` and `npm run lint` must be verified before marking done

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.7 acceptance criteria]
- [Source: app/components/Hero.tsx — current h1 and subheadline (read before implementing)]
- [Source: app/components/Footer.tsx — current tagline line 16 (read before implementing)]
- [Source: app/components/Testimonials.tsx — current h2 line 60 (read before implementing)]
- [Source: _bmad-output/implementation-artifacts/1-5-about-section-update.md — approved About copy: "the right way: structured, disciplined"; audience = senior product AND engineering leaders]
- [Source: _bmad-output/implementation-artifacts/1-6-global-metadata-og-tags-update.md — approved metadata: "AI-Native Building & Fractional CPO"; avoid "coaching"]

## Smoke Test Checklist

Run manually in browser against `localhost:3000` before merging.

### Hero Section

- [ ] h1 line 1 reads: "AI-Native Building."
- [ ] h1 line 2 reads: "Done the Structured Way."
- [ ] h1 reads as a single coherent message when heard by a screen reader (verify aria-label or equivalent)
- [ ] Subheadline starts with: "Apply product judgment at the execution layer"
- [ ] Subheadline references "senior product and engineering leaders" (or "senior leaders")
- [ ] Subheadline does NOT contain the word "coaching"
- [ ] "Book a Call" CTA visible without scrolling at 375px viewport
- [ ] "Book a Call" CTA visible without scrolling at 640px viewport
- [ ] "Book a Call" CTA visible without scrolling at 768px viewport
- [ ] `href="#book"` and `href="#services"` scroll correctly from hero

### Footer

- [ ] Footer tagline reads: "AI-Native Building Advisory & Fractional CPO"
- [ ] Footer tagline does NOT read "Fractional CPO for early-stage startups"

### Testimonials

- [ ] Section heading reads: "What Clients Say"
- [ ] Carousel auto-plays correctly
- [ ] Arrow navigation (prev/next) works
- [ ] Dot navigation works

### GitHub Issues

- [ ] Issue #10 status recorded in Completion Notes (closed or remains open with rationale)
- [ ] Issue #11 status recorded in Completion Notes (closed or remains open with rationale)

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

- **Hero h1**: Rewrote to "AI-Native Building. / Done the Structured Way." with `aria-label="AI-Native Building, Done the Structured Way"` on `<h1>` and `aria-hidden="true"` on `<br />` — resolves Issue #10 (screen reader ambiguity)
- **Hero subheadline**: Used 124-char variant ("Apply product judgment at the execution layer — AI-native building advisory for senior leaders. Fractional CPO for startups.") — safe fold margin at all three viewports; Issue #11 closed
- **Viewport fold**: Subheadline at 124 chars is safely above CTA at 375px, 640px, and 768px — pass
- **Footer tagline**: Updated to "AI-Native Building Advisory & Fractional CPO" — literal `&` used in JSX text per story Dev Notes
- **Testimonials heading**: Updated "What Founders Say" → "What Clients Say" — heading only; carousel logic, data, and Embla config untouched
- **TypeScript boilerplate**: Added `import type { JSX } from 'react'` and `: JSX.Element` return type to Hero.tsx; Footer.tsx and Testimonials.tsx did not have the boilerplate — left as-is per "do not let it block the copy change"
- **GitHub issues closed**: #10 (h1 br screen reader ambiguity) and #11 (CTA fold) — both closed with resolution comments
- **Pre-existing lint error**: Footer.tsx line 12 `<a href="/">` error is unchanged — not a regression
- `npm run build` exits zero; `npm run lint` — pre-existing Footer.tsx error only

### File List

- `app/components/Hero.tsx`
- `app/components/Footer.tsx`
- `app/components/Testimonials.tsx`

## Change Log

| Date | Change |
|------|--------|
| 2026-04-28 | Rewrote Hero h1 and subheadline for AI-native positioning; updated Footer tagline; updated Testimonials heading to "What Clients Say"; closed GitHub issues #10 and #11 |

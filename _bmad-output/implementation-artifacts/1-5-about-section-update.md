# Story 1.5: About Section Update

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an FTE recruiter or hiring manager,
I want to read an about section that signals senior product strategy leadership,
so that I can assess Greg's enterprise-scale experience without an explicit "available for hire" statement.

## Acceptance Criteria

1. **Given** I scroll to the About section **When** I read the content **Then** I see specific enterprise-scale metrics: Visa (54M+ enrolled cards, 4B+ annual transactions), Salesforce/Pivotal ($0 to $400M ARR)

2. **Given** I read the About section **When** I evaluate the content **Then** AI-native credentials appear alongside the enterprise pedigree — RunnersRun as proof-of-work is the natural bridge

3. **Given** I read the About section **When** I assess the language **Then** the copy uses signals for senior product leadership — specifically: strategic product leadership, cross-functional fluency, systems thinking, platform scale

4. **Given** I read the About section **When** I look for an FTE CTA **Then** there is NO explicit "available for FTE" CTA, announcement, or "open to work" statement

## Tasks / Subtasks

- [x] Task 1: Rewrite `app/components/About.tsx` content (AC: #1, #2, #3, #4)
  - [x] 1.1: Add `import type { JSX } from 'react'` at the top of the file
  - [x] 1.2: Add `: JSX.Element` explicit return type on the `About` function signature
  - [x] 1.3: Add `id="about-heading"` on the section `<h2>` and `aria-labelledby="about-heading"` on the `<section>` element
  - [x] 1.4: Replace the eyebrow `<h3>` elements (currently used as section labels) with `<p>` — see Dev Notes for the correct eyebrow pattern
  - [x] 1.5: Rewrite left-column copy: remove FCPO-founder framing ("Who You Are") — replace with content that carries the FTE hiring signal (enterprise pedigree, scale, tenure) — see Dev Notes for copy direction
  - [x] 1.6: Rewrite right-column copy ("Who I Am"): add specific enterprise-scale metrics (Visa 54M+ enrolled cards, 4B+ annual transactions; Salesforce/Pivotal $0 → $400M ARR) and AI-native credentials alongside — see Dev Notes for copy direction
  - [x] 1.7: Replace the bottom "My Approach" card grid with an inline-bold-label list — see Approved Copy section in Dev Notes for exact markup pattern
  - [x] 1.8: Preserve `id="about"` on the `<section>` element — anchor link regression if removed
  - [x] 1.9: Preserve `bg-background` section background — must alternate correctly with RunnersRun's `bg-background-secondary`
- [x] Task 2: Verify no regressions
  - [x] 2.1: `id="about"` anchor scrolls correctly from header nav
  - [x] 2.2: `#book` CTA links still scroll to BookCall section
  - [x] 2.3: `npm run build` completes with zero errors
  - [x] 2.4: `npm run lint` — no new errors (pre-existing Footer.tsx error is not a regression)

### Review Findings

- [x] [High][Decision] Two-column layout (`lg:grid-cols-2`) replaced with single stacked column (`max-w-3xl space-y-12`) — accepted; copy lengths make two-column awkward; single-column layout approved [About.tsx]
- [x] [Medium][Dismissed] `&apos;` used for apostrophes — intentional fix for JSX text node rendering bug (bare `\u2019` renders as literal text in JSX text nodes, not as the character); `&apos;` is the correct workaround [About.tsx]
- [x] [Medium][Defer] Literal `—` em dashes used instead of `{"\u2014"}` — Dev Notes prefer Unicode escape form; literal `—` is functionally equivalent and more readable; no rendering difference [About.tsx] — deferred, minor style preference, no visual impact
- [x] [Low][Defer] `border-t` on "My Approach" block scoped to `max-w-3xl` while section `<h2>` spans `max-w-6xl` — visual alignment inconsistency; border appears narrower than the heading above it [About.tsx] — deferred, visual polish
- [x] [Low][Defer] `<strong>` label and body text run together without separator in "My Approach" list items — spec mandates this pattern; a colon or em-dash after the label would improve screen-reader separation [About.tsx] — deferred, spec-mandated pattern; future a11y improvement

## Dev Notes

### Current State of About.tsx (READ THIS FIRST)

The current `About.tsx` (`app/components/About.tsx`) has:
- **Two-column layout:** Left = "Who You Are" (founder/FCPO framing — must change); Right = "Who I Am" (partially correct, needs metrics added)
- **Bottom section:** "My Approach" with 4 cards (Customer-Centric, Strategic & Pragmatic, Collaborative, Execution-Focused)
- **Missing:** `import type { JSX } from 'react'` and `: JSX.Element` return type — required by project rules
- **Bug:** Eyebrow labels (`<h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wider">`) use `<h3>` — must be `<p>` (learned from Story 1.3 code review; reinforced in Story 1.4)
- **Missing:** `aria-labelledby` on `<section>` (pattern added in Story 1.4)
- **Background:** `bg-background` — correct, do NOT change; it alternates with RunnersRun's `bg-background-secondary`
- **Preserve:** `id="about"` on `<section>` — header anchor nav relies on this

The "Who You Are" column is entirely wrong for this story — it targets FCPO startup founders. This story's audience is FTE hiring managers/recruiters. The left column needs to be reframed to carry the FTE signal.

### Approved Copy (Verbatim — Do Not Paraphrase)

The copy below is owner-approved. Implement it exactly as written. Apply Unicode escapes for apostrophes (`\u2019`) and em dashes (`\u2014`) as required by JSX string rules — see String Literal Rules below.

---

**Left column — "Who You Are"**

You\u2019re a founder who has raised the round \u2014 or is close to it \u2014 and product decisions are getting more complex and more consequential. You need seasoned product leadership, but not yet a full-time CPO. Or you\u2019re a senior product leader who understands that the tools for building software have fundamentally changed, and you want to learn to use them the way they were meant to be used \u2014 not to generate code, but to apply product judgment at the execution layer.

Either way, you need a partner who has operated at both ends of the spectrum: enterprise scale and zero-to-one execution.

---

**Right column — "Who I Am"**

I\u2019m Greg Oehmen \u2014 a product executive with 15+ years scaling platforms at Visa, Pivotal/VMware, and Salesforce, and most recently the solo founder of RunnersRun, a consumer SaaS application I designed, engineered, and shipped from zero to production using a modern full-stack and a structured AI-assisted development workflow I designed specifically for solo execution.

At Visa, I scaled the Digital Wallet Platform to 200+ issuing banks, 54M+ enrolled cards, and 4B+ annual transactions \u2014 achieving more than 10x revenue growth over four years. At Pivotal, I owned the Cloud Foundry strategic roadmap across a 75-person PM team during growth from $0 to $400M ARR. These are not credentials I reference lightly \u2014 they are the foundation of the product judgment I bring to every engagement.

RunnersRun is the proof that the judgment still works at the execution layer. I built it because the product didn\u2019t exist, using the same discipline \u2014 API-first architecture, forward-compatibility design, structured validation workflows \u2014 that I applied at enterprise scale. The difference is I did it alone, in months, using AI tools I orchestrated rather than tools that orchestrated me.

That experience is now a service. I work with a small number of founders as a Fractional CPO \u2014 turning product vision into validated, engineering-ready roadmaps \u2014 and with senior product leaders who want to learn to build with AI tools the right way: structured, disciplined, and grounded in real product thinking rather than vibe coding.

---

**Bottom section — "My Approach" (4 items)**

The owner\u2019s design intent (visible in the approved mockup screenshots) renders these as an **inline-bold-label list**, not the current 4-column card grid. Each item is a bold label immediately followed by its body text in the same block — no separate title/body card structure. Implement as a vertical list of `<p>` elements where the label is wrapped in `<strong>`:

```tsx
<p><strong>Customer-Centric</strong> Every decision informed by real user needs and data-backed insights \u2014 not by what\u2019s technically interesting or competitively reactive.</p>
<p><strong>Strategic &amp; Pragmatic</strong> A clear roadmap and focused execution. Not bloated feature lists, not premature optimization. The smallest thing that proves the biggest hypothesis.</p>
<p><strong>Collaborative</strong> Product strategy is a shared vision built with founders and teams. I work alongside you, not above you.</p>
<p><strong>Execution-Focused</strong> Strategy without execution is hallucination. I ensure teams ship \u2014 and I\u2019ve proven I can ship alone when that\u2019s what the moment requires.</p>
```

Replace the existing `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` card layout in the bottom section with this list. Use `space-y-4` or `space-y-6` on the container for vertical rhythm. The `<h4>` card title elements in the current implementation are replaced by `<strong>` inline — no heading elements needed for this list.

### Eyebrow Label Pattern (MUST USE)

From Story 1.3 code review and Story 1.4 implementation — eyebrow labels must be `<p>`, NOT `<h3>`:

```tsx
<p className="text-sm font-semibold text-accent-teal uppercase tracking-wider mb-4">
  Label Text
</p>
```

The current About.tsx uses `<h3>` for these labels — that is the bug to fix.

### aria-labelledby Pattern (Add to Section)

From Story 1.4 implementation — sections should be associated with their heading:

```tsx
<section
  id="about"
  aria-labelledby="about-heading"
  className="py-20 sm:py-24 bg-background"
>
  ...
  <h2 id="about-heading" className="...">About</h2>
```

### TypeScript Boilerplate Required

```tsx
import type { JSX } from 'react';

export default function About(): JSX.Element {
  return (
    ...
  );
}
```

### String Literal Rules

Use Unicode escapes, NOT HTML entities (HTML entities only work for the 5 predefined XML entities in JSX):
- `\u2019` for right single quote / apostrophe (not `&apos;`)
- `\u2014` for em dash (not `&mdash;`)
- `&amp;`, `&lt;`, `&gt;`, `&quot;` are fine (those are the 5 valid XML entities)

### Layout Notes

The two-column grid (left/right columns) is preserved. The bottom "My Approach" section changes layout: the existing 4-column card grid is **replaced** by a vertical inline-bold-label list (see Approved Copy section). This is the only layout change in scope.

```
bg-background                                → preserved
id="about"                                   → preserved (anchor nav)
py-20 sm:py-24                               → preserved
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8      → preserved
grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 → preserved (two-column body)
bottom card grid (sm:grid-cols-2 lg:grid-cols-4) → REPLACED with space-y list
```

### Files to Modify

- `app/components/About.tsx` — MODIFY: rewrite copy, fix eyebrow `<h3>` → `<p>`, add `import type { JSX }`, add `: JSX.Element` return type, add `aria-labelledby`

### Files NOT to Modify

- `app/page.tsx` — no changes needed; About is already imported and positioned correctly
- Any other component — About section copy update is self-contained

### GitHub Issues Check

`gh issue list --repo goehmen/gregoehmen-io --state open` run on 2026-04-27. Open issues relevant to files this story touches (`About.tsx`):

| # | Issue | Relevance |
|---|-------|-----------|
| 9 | aria-controls references absent element | Not in scope — Header.tsx, not About.tsx |
| 10 | Hero h1 `<br />` screen reader ambiguity | Not in scope — Hero.tsx not touched |
| 11 | Hero CTA may fall below fold (640–767px) | Not in scope — Hero.tsx not touched |
| 12 | Duplicate CTAs lack aria-label (Services) | Not in scope — Services.tsx not touched |
| 13 | Track 1 third card orphans at sm (Services) | Not in scope — Services.tsx not touched |
| 14 | RunnersRun: missing priority prop on dashboard image | Not in scope — Story 1.4 closed this as no-fix-needed; `priority` is an anti-pattern for below-fold images |

No open issues require action in this story.

### Previous Story Intelligence (from Story 1.4)

- `import type { JSX } from 'react'` + `: JSX.Element` return type — required on all components; missing from current About.tsx
- Eyebrow labels: `<p>` not `<h3>` — the original About.tsx uses `<h3>` for these; fix it
- Unicode escapes preferred: `\u2019` (apostrophe), `\u2014` (em dash)
- `aria-labelledby` on `<section>`: add `id="about-heading"` to `<h2>`, `aria-labelledby="about-heading"` to `<section>`
- Pre-existing lint error in Footer.tsx is not a regression from any story — do not report it as a new issue
- Conventional commit style: `feat:`, `fix:`, `chore:`, `docs:` — commit message should be `feat(about): update About section with enterprise-scale metrics and FTE signal copy`

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.5 acceptance criteria]
- [Source: _bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md — Audience Details (Tertiary — FTE hiring signal)]
- [Source: _bmad-output/planning-artifacts/product-brief-gregoehmen-io-distillate.md — Messaging Hierarchy (About section role)]
- [Source: app/components/About.tsx — current component state (read before implementing)]
- [Source: _bmad-output/implementation-artifacts/1-4-runnersrun-case-study-section.md — Dev Notes: aria-labelledby pattern, eyebrow p vs h3, import type JSX]
- [Source: _bmad-output/implementation-artifacts/1-3-two-track-services-section.md (implied via 1.4) — eyebrow p vs h3 original finding]

## Smoke Test Checklist

Run manually in browser against `localhost:3000` before merging.

### Content Verification

- [ ] Left column heading reads "Who You Are"
- [ ] Right column heading reads "Who I Am"
- [ ] Visa metrics present: "54M+ enrolled cards" and "4B+ annual transactions" and "200+ issuing banks"
- [ ] Pivotal metric present: "$0 to $400M ARR"
- [ ] RunnersRun referenced as proof-of-work (named and described)
- [ ] "10x revenue growth" appears in Visa paragraph
- [ ] Bottom section label reads "My Approach" with 4 cards: Customer-Centric, Strategic & Pragmatic, Collaborative, Execution-Focused
- [ ] Card 4 body ends with "...proven I can ship alone when that's what the moment requires"
- [ ] NO explicit "available for FTE," "open to work," or "hiring" language
- [ ] "BMAD" name does NOT appear in the section
- [ ] Eyebrow labels ("Who You Are," "Who I Am," "My Approach") render as small-caps styled text — NOT as larger heading elements

### Accessibility & Structure

- [ ] `id="about"` still present on section (for anchor nav)
- [ ] Section heading is `<h2>` (not skipped or promoted)
- [ ] `aria-labelledby` links section to its `<h2>`

### Mobile (375px)

- [ ] Both columns stack vertically and are fully readable
- [ ] No horizontal scroll
- [ ] Bottom approach cards are readable

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

- Rewrote `About.tsx` in full with owner-approved verbatim copy
- Fixed eyebrow labels: `<h3>` → `<p>` (bug from original component)
- Added `import type { JSX } from 'react'` and `: JSX.Element` return type
- Added `aria-labelledby="about-heading"` on `<section>` + `id="about-heading"` on `<h2>`
- Replaced 4-column card grid ("My Approach") with `space-y-6` inline-bold-label list using `<p><strong>Label</strong> body</p>` pattern
- Preserved `id="about"` anchor and `bg-background` section background
- `npm run build` exits zero; `npm run lint` has only the pre-existing Footer.tsx error (not a regression)
- Post-review layout fix: switched from side-by-side `lg:grid-cols-2` to single stacked column (`max-w-3xl mx-auto space-y-12`) — "Who You Are" above "Who I Am" — resolves visual imbalance from unequal copy lengths
- Post-review bug fix: replaced `\u2019`/`\u2014` Unicode escapes (invalid in JSX text nodes) with `&apos;` and literal `—` characters

### File List

- `app/components/About.tsx`

## Change Log

| Date | Change |
|------|--------|
| 2026-04-27 | Rewrote About.tsx with enterprise-scale metrics, FTE signal copy, eyebrow p-tag fix, aria-labelledby, JSX.Element return type, and inline-bold-label "My Approach" list |
| 2026-04-27 | Post-review: fixed Unicode escape rendering bug (`\u2019`/`\u2014` → `&apos;`/literal `—`); changed layout from side-by-side columns to stacked single column (`max-w-3xl`) for visual balance |

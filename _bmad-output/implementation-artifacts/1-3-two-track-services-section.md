# Story 1.3: Two-Track Services Section

Status: ready-for-dev

## Story

As a visitor evaluating Greg's services,
I want to clearly see two distinct offerings — AI-native coaching/advisory and Fractional CPO,
So that I can quickly identify which applies to my situation without confusion.

## Acceptance Criteria

1. **Given** I scroll to the Services section on the home page **When** I view the section **Then** I can visually and narratively distinguish two separate tracks: AI-native coaching/advisory and Fractional CPO **And** the coaching/advisory track uses language that resonates with tech professionals who want to acquire AI-native building skills (time-boxed, hands-on, outcome-defined, methodology transfer) **And** the Fractional CPO track uses language for startup CEOs/founders (embedded strategic product leadership, post-seed to Series A)

2. **Given** I view either service track **When** I look for a booking CTA **Then** each track has a visible CTA that links to `#book`

3. **Given** I view on a 375px mobile viewport **When** the two-track layout renders **Then** both tracks are fully readable and distinct (not collapsed or hidden)

## Tasks / Subtasks

- [ ] Task 1: Restructure Services.tsx into two stacked full-width tracks (AC: #1, #3)
  - [ ] 1.1: Replace current "Product Strategy" / "Product Execution" grouping with Track 1 (AI-Native Coaching) and Track 2 (Fractional CPO)
  - [ ] 1.2: Each track is a full-width block — stacked vertically, NOT side-by-side columns
  - [ ] 1.3: Track 1 background: `bg-background-secondary`; Track 2 background: `bg-background` — see Dev Notes for layout pattern
  - [ ] 1.4: Write Track 1 service data (new — see copy guidance in Dev Notes)
  - [ ] 1.5: Update Track 2 service data (largely preserve existing cards — see Dev Notes)
  - [ ] 1.6: Keep `id="services"` on the outer `<section>` element — do NOT move it (closes GitHub Issue #8 as a verification side effect)
- [ ] Task 2: Add per-track CTAs linking to `#book` (AC: #2)
  - [ ] 2.1: Add "Book a Call" CTA at the bottom of Track 1 (use primary button pattern — see Dev Notes)
  - [ ] 2.2: Add "Book a Call" CTA at the bottom of Track 2
- [ ] Task 3: Verify ServiceCard.tsx is sufficient as-is (AC: #1)
  - [ ] 3.1: Confirm `ServiceCard` renders correctly in both tracks — NO variant prop needed; visual differentiation is at the track level, not the card level
  - [ ] 3.2: If ServiceCard.tsx needs any change, document what and why in Dev Agent Record
- [ ] Task 4: Verify no regressions
  - [ ] 4.1: `id="services"` anchor scrolls correctly from header nav and hero CTA — close GitHub Issue #8 after confirming
  - [ ] 4.2: `#book` CTA links scroll to BookCall section
  - [ ] 4.3: `npm run build` completes with zero errors
  - [ ] 4.4: `npm run lint` — no new errors introduced (pre-existing Footer.tsx error is not a regression)

## Dev Notes

### Current State of Services.tsx

`app/components/Services.tsx` is a React Server Component (no `'use client'`). It must remain an RSC — no interactivity is added in this story.

**Current structure:**
```
<section id="services" className="py-20 sm:py-24 bg-background-secondary">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    Section header: <h2>How I Help</h2>
    Subtitle: "From strategy to shipped product. I partner with founders..."

    "Product Strategy" sub-label (text-accent-teal)
      4 cards: North Star Alignment, Problem Validation, Persona & Positioning, GTM & Pricing Strategy

    "Product Execution" sub-label (text-accent-blue)
      3 cards: Prototype & Concept Testing, MVP Scoping & Prioritization, Engineering-Ready Roadmap
```

Both track labels and all 7 cards are FCPO-oriented. The section currently has a single `id="services"` anchor on the outer `<section>`.

### What Changes

The entire internal structure is replaced with two stacked full-width tracks. The outer `<section>` element stays (preserving `id="services"`). The section-level `py-20 sm:py-24` padding and `bg-background-secondary` come off the outer section and move into each track's own wrapper div (see Layout Pattern below).

**Track 1 — AI-Native Building Coaching/Advisory** (entirely new content)
**Track 2 — Fractional CPO** (existing cards largely preserved, framing updated)

### Layout Pattern

Remove `py-20 sm:py-24` and `bg-background-secondary` from the outer `<section>`. Instead:

```tsx
<section id="services">

  {/* Track 1: AI-Native Coaching */}
  <div className="py-20 sm:py-24 bg-background-secondary">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Track 1 header, cards, CTA */}
    </div>
  </div>

  {/* Track 2: Fractional CPO */}
  <div className="py-20 sm:py-24 bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Track 2 header, cards, CTA */}
    </div>
  </div>

</section>
```

This gives each track distinct backgrounds, full-width visual separation, and consistent padding — without any new components.

### Track 1 — AI-Native Building Coaching/Advisory

**Who it's for:** Tech professionals of any discipline (engineers, PMs, marketers, designers) who want to acquire AI-native building skills and bring enterprise-grade capability back to their corporate job. NOT limited to engineering leaders. The "couch to 5k" framing: structured methodology for people who want to learn to build with AI but don't know where to start or how to make their work credible in a corporate setting.

**Track label suggestion:** `AI-NATIVE BUILDING` (styled like current sub-labels: `text-sm font-semibold text-accent-teal uppercase tracking-wider`)

**Section headline suggestion:** "Build AI-Native Products That Matter" or "Learn to Build With AI. Ship Something Real."

**Subtitle suggestion:** "Structured coaching and advisory for tech professionals who want to build AI-native products — and bring enterprise-grade skills back to work."

**Service cards (3 new cards — dev agent writes final copy):**

| Title (suggested) | Direction |
|---|---|
| Methodology Foundations | Spec-first workflow, the right architecture decisions, and the enterprise-grade patterns that make your work credible in a corporate setting. Time-boxed. Outcome-defined. |
| Guided Project Build | Apply the methodology to a real project with hands-on coaching. Build something you'll actually ship — not a toy — with Greg reviewing every stage. |
| Enterprise Readiness | Take your AI-built product from "it works" to "it belongs in production." Architecture review, security considerations, and the patterns that meet corporate-grade standards. |

**Copy constraints for Track 1:**
- Use language like: hands-on, structured, time-boxed, outcome-defined, methodology transfer, enterprise-grade, ship
- Do NOT use: "courses", "curriculum", "student", "bootcamp", "lessons"
- Audience signal: someone who already has technical fluency and wants to level up, not a complete beginner
- The offer is coaching/advisory, not training product — it is personalized and hands-on

**CTA:** Primary orange button, centered, below the cards:
```tsx
<div className="mt-12 text-center">
  <a href="#book" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity">
    Book a Discovery Call
  </a>
</div>
```

### Track 2 — Fractional CPO

**Who it's for:** Startup CEOs and founders, post-seed to Series A, ready for embedded strategic product leadership.

**Track label:** `FRACTIONAL CPO` (styled like current: `text-sm font-semibold text-accent-teal uppercase tracking-wider` — or use `text-accent-blue` to visually differentiate from Track 1's label)

**Section headline:** Keep `<h2>` pattern but scoped to Track 2. Suggestion: "Fractional CPO for Early-Stage Startups"

**Subtitle:** Update from current "From strategy to shipped product. I partner with founders to turn vision into validated, engineering-ready roadmaps." to something like: "Embedded strategic product leadership for post-seed startups. I partner with founders to build validated roadmaps and ship."

**Service cards:** Preserve the existing 7 cards with minimal copy edits. The "Product Strategy" and "Product Execution" sub-labels can be kept as internal structure within Track 2, or collapsed into a flat grid. The cards themselves are solid for founders — only the framing at the section level changes.

Suggested card grouping within Track 2:
- Product Strategy (4 cards): North Star Alignment, Problem Validation, Persona & Positioning, GTM & Pricing Strategy — keep copy with light edits
- Product Execution (3 cards): Prototype & Concept Testing, MVP Scoping & Prioritization, Engineering-Ready Roadmap — keep copy with light edits

**CTA:** Same primary button pattern as Track 1, below the cards.

### ServiceCard.tsx — No Changes Needed

`ServiceCard.tsx` accepts `{ title, description, icon }` and renders a card with `bg-card` background, hover border animation, and optional icon. This works identically for both tracks. **Do NOT add a `variant` prop** — the architecture deferred this decision to this story, and a variant prop is unnecessary here because track differentiation happens at the section/container level, not the card level.

### CTA Button Pattern (from Hero.tsx)

Primary (filled orange):
```tsx
<a href="#book" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent-teal rounded-lg hover:opacity-90 transition-opacity">
  Book a Call
</a>
```

### GitHub Issues to Address in This Story

- **Issue #8 — Verify section IDs are present in page.tsx**: `id="services"` exists on `Services.tsx` outer `<section>` and is preserved by this story. Verify during Task 4.1 and close the issue with a reference to this story's commit.

### Open Issues Not In Scope for This Story

- Issue #7: scroll-padding-top — not affected by Services section changes
- Issues #2, #3, #4, #5, #6, #9, #10, #11 — unrelated to Services.tsx

### Previous Story Intelligence

From Story 1.1 (Header):
- `import type { JSX } from 'react'` needed for React 19 type compatibility — Services.tsx currently has no explicit return type; add `: JSX.Element` return type to the function signature (required by project-context.md rule: "explicit return types required on components")
- Pre-existing lint error in Footer.tsx is NOT a regression from this story

From Story 1.2 (Hero):
- `app/components/Services.tsx:55-56` — subtitle "I partner with founders..." is the exact text identified as stale in the Story 1.2 code review. This story fully resolves that finding.
- Hero now surfaces two audiences (coaching + FCPO). The Services section must echo this two-track positioning — not create a contradiction.

### What Must Be Preserved

- `id="services"` on the outer `<section>` — header nav and hero "Learn More" CTA both anchor to this ID
- All 7 existing FCPO service cards (content may be lightly edited, not removed)
- RSC status (no `'use client'`)
- `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` container pattern
- `py-20 sm:py-24` vertical padding (moves to track-level divs)
- Lucide icon imports — tree-shake pattern: named imports only
- `ServiceCard` component — use as-is, no structural changes

### File List

- `app/components/Services.tsx` (modified — primary change)
- `app/components/ServiceCard.tsx` (verify only — expected no changes)

## Smoke Test Checklist

Run manually in browser against `localhost:3000` before merging.

### Desktop (≥1024px)

- [ ] Services section visible when scrolling from hero
- [ ] Two visually distinct tracks clearly separated (different backgrounds)
- [ ] Track 1 has a track label, headline, subtitle, 3 service cards, and "Book a Call" CTA
- [ ] Track 2 has a track label, headline, subtitle, 7 service cards, and "Book a Call" CTA
- [ ] Both "Book a Call" CTAs scroll to the #book section
- [ ] Header "Services" nav link scrolls to the top of the Services section (Track 1 header visible)
- [ ] Hero "Learn More" button scrolls to the Services section correctly

### Mobile (375px)

- [ ] Both tracks fully readable — no horizontal scroll
- [ ] Cards stack to single column
- [ ] Both CTAs visible and tappable
- [ ] Track labels and headlines readable at mobile font sizes

### Content Verification

- [ ] Track 1 does NOT use language like "courses", "curriculum", or "bootcamp"
- [ ] Track 1 copy resonates with a tech professional audience (not just engineering leaders)
- [ ] Track 2 retains Fractional CPO framing for startup founders
- [ ] Track 2 subtitle no longer reads "From strategy to shipped product. I partner with founders..."
- [ ] No broken HTML entities (apostrophes render as `'`)

### Regression

- [ ] `npm run build` exits zero
- [ ] Header nav anchor links all still work (Services, About, Testimonials, Book a Call)
- [ ] GitHub Issue #8 confirmed resolved — close it with commit reference

## Dev Agent Record

### Agent Model Used

_(to be filled in)_

### Completion Notes List

_(to be filled in)_

### File List

_(to be filled in)_

### Change Log

_(to be filled in)_

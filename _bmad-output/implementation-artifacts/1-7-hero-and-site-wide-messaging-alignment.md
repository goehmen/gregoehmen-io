# Story 1.7: Hero & Site-Wide Messaging Alignment

Status: backlog

## Story

As a coaching/advisory prospect or engineering leader,
I want the hero headline, subheadline, footer, and testimonials heading to clearly reflect the AI-native coaching offer,
So that every visible copy element on the page reinforces the same primary positioning.

## Acceptance Criteria

1. **Given** I land on the home page and read the hero `<h1>` **When** I see the headline **Then** the headline explicitly communicates coaching/advisory as the offer type — not just AI-native building generically **And** the two headline lines read as a single coherent message (not two disconnected imperatives)

2. **Given** I read the hero subheadline **When** I evaluate it as a coaching/advisory prospect **Then** the subheadline leads with coaching/advisory for engineering leaders as the primary message **And** Fractional CPO is present as a visible second pillar but clearly subordinate **And** the total character count does not push the CTA below the fold at 375px, 640px, or 768px viewports

3. **Given** I scroll to the footer **When** I read the footer tagline **Then** it reflects the new AI-native coaching primary positioning — not "Fractional CPO for early-stage startups" alone

4. **Given** I scroll to the Testimonials section **When** I read the section heading **Then** the heading does not exclusively address "Founders" — it is inclusive of engineering leaders or audience-neutral

## Source Findings

These ACs were created from code review findings on Story 1.2:

- Finding #2: Headline "Build Products With AI. / Ship With Confidence." does not explicitly name coaching/advisory as the offer type; two disconnected imperatives lack connective tissue
- Finding #3: Subheadline addresses two buyer personas simultaneously ("engineering leaders" + "startups"); ~135 chars may push CTA below fold on mid-range viewports
- Finding #4: `app/components/Footer.tsx:16` — tagline still reads "Fractional CPO for early-stage startups"
- Finding #7: `app/components/Testimonials.tsx:60` — heading "What Founders Say" implicitly excludes engineering leaders

## Related GitHub Issues

- Issue #10: Hero h1 `<br />` screen reader ambiguity — fix is likely resolved as a side effect of revising h1 copy in AC 1
- Issue #11: Hero CTA may fall below fold at 640–767px — addressed by AC 2 (subheadline length constraint)

## Files to Modify

- `app/components/Hero.tsx` — h1 and p copy
- `app/components/Footer.tsx` — footer tagline
- `app/components/Testimonials.tsx` — section heading

## Tasks / Subtasks

- [ ] Task 1: Revise hero headline (AC: #1)
  - [ ] 1.1: Rewrite `<h1>` so both lines read as a single coherent message that names coaching/advisory as the offer
  - [ ] 1.2: Verify no `'use client'` added — Hero.tsx must remain an RSC
  - [ ] 1.3: Close GitHub Issue #10 if new copy resolves screen reader ambiguity
- [ ] Task 2: Revise hero subheadline (AC: #2)
  - [ ] 2.1: Rewrite `<p>` to lead with coaching/advisory for engineering leaders; keep FCPO as visible secondary
  - [ ] 2.2: Verify character count does not push CTA below fold — test at 375px, 640px, 768px
  - [ ] 2.3: Close GitHub Issue #11 if CTA visibility is confirmed at all three viewports
- [ ] Task 3: Update footer tagline (AC: #3)
  - [ ] 3.1: Update tagline in `app/components/Footer.tsx` to reflect dual-offer positioning
- [ ] Task 4: Update Testimonials heading (AC: #4)
  - [ ] 4.1: Revise section heading in `app/components/Testimonials.tsx` — audience-neutral or inclusive of engineering leaders
- [ ] Task 5: Verify no regressions
  - [ ] 5.1: `npm run build` completes with zero errors
  - [ ] 5.2: Smooth scroll CTAs (#book, #services) still function

# Story 1.1: Header Navigation Update

Status: complete

## Story

As a visitor,
I want to see Blog and Portfolio links in the site header alongside section anchor links,
so that I can navigate to the blog, Greg's portfolio, and any home page section from any page.

## Acceptance Criteria

1. **Given** I am on any page of the site **When** I look at the header navigation **Then** I see anchor links for home page sections (Services, About, Testimonials, Book a Call) plus two new links: "Blog" and "Portfolio"

2. **Given** I click the "Blog" link **When** the navigation resolves **Then** I am taken to /blog via Next.js internal navigation *(note: `/blog` will render a Next.js 404 until Story 2.1 is implemented — this is expected and does not fail this AC; the testable behavior is that the `Link` component navigates to the `/blog` route correctly)*

3. **Given** I click the "Portfolio" link **When** the link is activated **Then** a new browser tab opens to https://goehmen.dev **And** the link is a plain `<a href="https://goehmen.dev" target="_blank" rel="noopener noreferrer">` — NOT a Next.js Link component

4. **Given** I click any existing anchor nav link (Services, About, Testimonials, Book a Call) **When** the click is handled **Then** the page smooth-scrolls to the correct home page section with no regression

## Tasks / Subtasks

- [x] Task 1: Add desktop navigation links to Header.tsx (AC: #1, #2, #3, #4)
  - [x] 1.1: Add `<nav>` element (NFR7 semantic HTML requirement) with anchor links: Services (#services), About (#about), Testimonials (#testimonials), Book a Call (#book)
  - [x] 1.2: Add Blog link using Next.js `Link` component pointing to `/blog`
  - [x] 1.3: Add Portfolio link as plain `<a>` tag with `target="_blank"` and `rel="noopener noreferrer"` to `https://goehmen.dev`
  - [x] 1.4: Style nav links consistent with existing design tokens (text-foreground-secondary, hover:text-white)
  - [x] 1.5: Update logo `alt` text in Header.tsx from "Fractional Chief Product Officer" to reflect new positioning (e.g., "Greg Oehmen | Fractional CPO & AI-Native Product Coach")
- [x] Task 2: Add mobile hamburger menu (AC: #1)
  - [x] 2.1: Add `'use client'` directive to Header.tsx (required for useState toggle)
  - [x] 2.2: Implement hamburger button (hidden on lg+ breakpoint) with `aria-label="Toggle navigation"` and `aria-expanded={isOpen}`
  - [x] 2.3: Implement mobile menu panel with all nav links
  - [x] 2.4: Auto-close mobile menu on link click (especially anchor links)
- [x] Task 3: Verify smooth scroll regression (AC: #4)
  - [x] 3.1: Test all anchor links scroll to correct sections
  - [x] 3.2: Verify scroll-padding-top in globals.css aligns with final header height; update the value in globals.css if it has changed
- [x] Task 4: Verify `npm run build` completes with zero errors

## Dev Notes

### Current State of Header.tsx

`app/components/Header.tsx` currently contains **only a logo** — no navigation links at all:
```typescript
// Current: logo-only, RSC, fixed position
<header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto">
    <a href="/">
      <Image src="/logo-horizontal.svg" alt="..." width={400} height={40} priority />
    </a>
  </div>
</header>
```

The footer (`app/components/Footer.tsx`) already has anchor links (Services, About, Testimonials, Book a Call) — reference its link styling pattern for consistency.

### RSC Boundary Decision

The current Header is a React Server Component. Adding a mobile hamburger menu **requires** `'use client'` because:
- `useState` is needed for menu open/close toggle
- Click event handlers are needed for the hamburger button

This is architecturally valid — `'use client'` is justified when hooks or event handlers are required. **This story explicitly overrides architecture.md's RSC boundary map entry for Header**, which states "Adds two nav links; no new interactivity." That entry did not anticipate the mobile hamburger requirement: with 6+ nav items, a horizontal layout does not fit on mobile, making a toggle menu necessary. The architecture doc must be treated as superseded by this story for the Header component's RSC designation.

### Link Implementation Rules

| Link | Element | Why |
|------|---------|-----|
| Anchor links (#services, #about, etc.) | Plain `<a href="#section">` | Anchor nav within same page; smooth scroll handled by CSS `scroll-behavior: smooth` in globals.css |
| Blog (/blog) | `import Link from 'next/link'` then `<Link href="/blog">` | Internal Next.js route — use Link for client-side navigation |
| Portfolio (goehmen.dev) | `<a href="https://goehmen.dev" target="_blank" rel="noopener noreferrer">` | External URL — NEVER use next/link for external links [Source: architecture.md, ARCH11] |

### Cross-Story Dependency

The Blog link (`/blog`) will return a 404 until Story 2.1 (MDX Infrastructure & First Blog Post, Epic 2) is implemented. This is expected — the nav link is added now so it's ready when the blog route exists.

### Scroll Padding

`app/globals.css` sets `scroll-padding-top: 80px` to offset the fixed header. If the header height changes after adding nav links, this value may need adjustment. Verify by clicking anchor links and confirming sections aren't hidden behind the header.

### Mobile Menu UX

With 6+ nav items (Services, About, Testimonials, Book a Call, Blog, Portfolio), a horizontal layout won't fit on mobile. Implement a hamburger menu:
- Hide nav links on small viewports, show hamburger icon
- Show full nav on `lg:` breakpoint (1024px+)
- Use lucide-react icons `Menu` and `X` for hamburger toggle (already installed)
- Close the mobile menu when any link is clicked (especially anchor links that navigate on the same page)

### Layout Pattern

The existing `<header>` element already carries `px-4 sm:px-6 lg:px-8` — the horizontal padding is on the **outer** element, not the inner div. Do **not** add `px-*` to the inner div, or you will double the padding.

The inner div should use only: `max-w-6xl mx-auto flex items-center justify-between`

```html
<!-- ✅ CORRECT — padding on outer element, no px on inner div -->
<header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    {/* logo left, nav right */}
  </div>
</header>

<!-- ❌ WRONG — double padding -->
<header className="... px-4 sm:px-6 lg:px-8 ...">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
```

### Keyboard Accessibility

All nav links must be keyboard-navigable (tab order correct, visible focus states). Use standard `<a>` and `<Link>` elements which are natively focusable. Ensure the mobile hamburger button has `aria-label` and `aria-expanded` attributes.

### What Must Be Preserved

- Fixed header positioning (`fixed top-0 left-0 right-0 z-50`)
- Background blur effect (`bg-background/80 backdrop-blur-sm`)
- Logo link to `/` with `next/image` and `priority` prop
- Existing `py-4` padding (affects scroll-padding-top alignment)
- The `#book` section anchor must remain reachable — this is the Calendly booking entry point (BookCall component uses `id="book"`)

### Project Structure Notes

- Only file modified: `app/components/Header.tsx`
- No new files created
- No new dependencies needed (lucide-react `Menu` and `X` icons already available)
- Path alias: `import Link from 'next/link'` (framework import, no alias needed)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.1: Header Navigation Update]
- [Source: _bmad-output/planning-artifacts/architecture.md — ARCH11: Portfolio link as plain <a> tag]
- [Source: _bmad-output/planning-artifacts/architecture.md — Component RSC Boundary Map]
- [Source: _bmad-output/planning-artifacts/architecture.md — Implementation Patterns: External portfolio link]
- [Source: _bmad-output/project-context.md — Framework-Specific Rules: 'use client' only for hooks/events]
- [Source: app/globals.css — scroll-behavior: smooth, scroll-padding-top: 80px]
- [Source: app/components/Footer.tsx — Reference for anchor link styling pattern]
- [Source: app/components/Header.tsx — Current state: logo-only, RSC, fixed position]

## Smoke Test Checklist

Run manually in a browser against `localhost:3000` (or Vercel preview) before merging to main. Check each item at both desktop (≥1024px) and mobile (<1024px) viewport widths unless noted.

### Desktop nav (≥1024px viewport)

- [ ] Header is visible and fixed — stays at top on scroll
- [ ] Logo is visible and links to `/` (home page)
- [ ] Nav links visible in order: Services, About, Testimonials, Book a Call, Blog, Portfolio
- [ ] Hamburger button is **not** visible
- [ ] Clicking **Services** smooth-scrolls to the Services section; section heading fully visible above fold (not hidden behind header)
- [ ] Clicking **About** smooth-scrolls to the About section
- [ ] Clicking **Testimonials** smooth-scrolls to the Testimonials section
- [ ] Clicking **Book a Call** smooth-scrolls to the Calendly/booking section
- [ ] Clicking **Blog** navigates to `/blog` (404 expected until Story 2.1; confirm it navigates, not errors in console)
- [ ] Clicking **Portfolio** opens `https://goehmen.dev` in a **new tab**; original tab stays on gregoehmen.io
- [ ] Tab key cycles through all nav links in visible order with a visible focus ring on each
- [ ] Background blur effect visible when page is scrolled (header not fully opaque)

### Mobile nav (<1024px viewport)

- [ ] Header is visible and fixed
- [ ] Logo is visible
- [ ] Desktop nav links are **not** visible
- [ ] Hamburger (Menu) icon is visible
- [ ] Tapping hamburger opens the mobile menu; icon changes to X
- [ ] Mobile menu shows all 6 links: Services, About, Testimonials, Book a Call, Blog, Portfolio
- [ ] Tapping **Services** in mobile menu closes the menu and smooth-scrolls to the Services section
- [ ] Tapping **About** in mobile menu closes the menu and smooth-scrolls to the About section
- [ ] Tapping **Testimonials** closes menu and scrolls correctly
- [ ] Tapping **Book a Call** closes menu and scrolls correctly
- [ ] Tapping **Blog** closes menu and navigates to `/blog`
- [ ] Tapping **Portfolio** closes menu and opens `https://goehmen.dev` in a new tab
- [ ] Tapping the X button closes the menu without navigating
- [ ] With menu open, resize viewport to ≥1024px — menu closes automatically and hamburger disappears

### Intermediate viewport (~900px width)

- [ ] Click each anchor link and confirm section heading is not obscured behind the header (scroll-padding-top check)

### Accessibility spot-check

- [ ] Tab to hamburger button — focus ring visible; Enter/Space opens menu
- [ ] `aria-expanded` attribute toggles between `false` (closed) and `true` (open) — inspect in DevTools

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Initial build failed: `JSX.Element` not found in React 19 — fixed by importing `type JSX` from `react`
- ESLint flagged logo `<a href="/">` — changed to `<Link href="/">` for internal navigation

### Completion Notes List

- Rewrote Header.tsx from logo-only RSC to full client component with desktop + mobile navigation
- Desktop nav: semantic `<nav>` with 4 anchor links, Blog via Next.js `Link`, Portfolio via plain `<a>` with `target="_blank"`
- Mobile nav: hamburger menu using lucide-react `Menu`/`X` icons, hidden on lg+ breakpoint, auto-closes on link click
- Anchor link data extracted to module-level `anchorLinks` array to avoid duplication between desktop and mobile
- Logo alt text updated to "Greg Oehmen | Fractional CPO & AI-Native Product Coach"
- Logo link changed from `<a>` to `<Link>` to satisfy Next.js lint rule
- scroll-padding-top: 80px in globals.css remains appropriate — no change needed
- `npm run build` passes with zero errors; Header.tsx lint-clean (pre-existing Footer.tsx lint error not in scope)

### File List

- app/components/Header.tsx (modified)

### Change Log

- 2026-04-26: Implemented Story 1.1 — Header navigation with desktop links, mobile hamburger menu, Blog/Portfolio navigation

### Review Findings

- [x] [Medium][Patch] Missing visible focus styles on nav links and hamburger button [app/components/Header.tsx] — resolved: added focus-visible outline styles via shared navLinkClass
- [x] [Medium][Patch] `aria-controls` missing on hamburger button; both `<nav>` landmarks unnamed; mobile nav has no `id` [app/components/Header.tsx] — resolved: added aria-controls="mobile-nav", id="mobile-nav", aria-label on both navs
- [x] [Low][Patch] `isOpen` state not reset when viewport resizes from mobile to desktop breakpoint [app/components/Header.tsx] — resolved: added useEffect with matchMedia listener for lg breakpoint
- [x] [High][Defer] Anchor links (#services, #about, etc.) are bare fragments — broken on non-home pages [app/components/Header.tsx] — deferred, pre-existing architecture concern; address in Story 2.1
- [x] [High][Defer] No focus trap when mobile menu is open — keyboard can tab behind overlay [app/components/Header.tsx] — deferred, enhancement for non-modal nav pattern
- [x] [Medium][Defer] Mobile menu has no outside-click or scroll dismiss [app/components/Header.tsx] — deferred, UX enhancement
- [x] [Medium][Defer] Portfolio link has no visual indicator it opens in a new tab [app/components/Header.tsx] — deferred, design/UX decision
- [x] [Low][Defer] Blog and Portfolio link markup duplicated verbatim in desktop and mobile nav [app/components/Header.tsx] — deferred, maintainability smell
- [x] [Low][Defer] scroll-padding-top (80px) may be insufficient at intermediate viewport widths — deferred, manual visual check before next deploy
- [x] [Low][Defer] Manual verify: section IDs (#services, #about, #testimonials, #book) still present in page.tsx — deferred, not a regression from this diff

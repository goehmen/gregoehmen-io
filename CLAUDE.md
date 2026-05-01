# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

When compacting, always preserve:
- Full list of modified files
- Current task progress and tasks remaining
- Any implementation decisions or deviations from the story
/- Test commands and current test status


## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

Single-page marketing site for Greg Oehmen (Fractional CPO) built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

**Page structure** (`app/page.tsx`): One route that composes all sections in order — `Header → Hero → Services → About → Testimonials → BookCall → Footer`. Navigation uses anchor links (`#services`, `#book`, etc.).

**All components** live in `app/components/`. They are server components by default; only `Testimonials.tsx` uses `'use client'` (for Embla carousel state).

**Styling** uses Tailwind v4 with custom design tokens defined in `app/globals.css` via `@theme` — there is no `tailwind.config.js`. Reference these tokens by name in classes:

| Token | Value | Usage |
|---|---|---|
| `background` | `#13294B` (navy) | Page background |
| `background-secondary` | `#0f2240` | Darker navy |
| `card` | `#1e3a5f` | Card surfaces |
| `foreground` | `#ffffff` | Primary text |
| `foreground-secondary` | `#9C9A9D` | Muted text |
| `accent-teal` | `#FF5F05` | Primary CTA color (orange, not teal) |
| `accent-blue` | `#ffffff` | Secondary accent |

**Testimonials carousel** uses `embla-carousel-react` with `embla-carousel-autoplay`. The `Providers` component (`app/providers.tsx`) wraps `next-themes` ThemeProvider but is not currently used in `app/layout.tsx`.

**Static assets** are in `public/`: `hero-bg.jpg`, `logo-horizontal.svg`, `logo-stacked.svg`, `favicon.svg`, `og-image.png`.

**Deployment**: gregoehmen.io via Vercel. OpenGraph metadata is configured in `app/layout.tsx`.

## Commit Policy

Never create a git commit unless the user explicitly requests it in that message. Story completion, smoke test passing, and code review do NOT imply permission to commit. Wait for an explicit instruction such as "commit" or "commit this."

## Deferred Work

Deferred findings from code reviews are tracked as GitHub Issues: https://github.com/goehmen/gregoehmen-io/issues

`_bmad-output/implementation-artifacts/deferred-work.md` is a pointer only — do not write findings there. At the start of any story, run `gh issue list --repo goehmen/gregoehmen-io --state open` to surface deferred items relevant to files you will be touching. Close issues when resolved as a side effect of story work.

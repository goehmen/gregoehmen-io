---
project_name: 'gregoehmen-io'
user_name: 'Goehmen'
date: '2026-04-25'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 42
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Next.js 16.1.6 (App Router — no Pages Router)
- React 19.2.3 / React DOM 19.2.3
- TypeScript 5 (strict, isolatedModules, moduleResolution: bundler)
- Tailwind CSS v4 (@tailwindcss/postcss ^4)
- lucide-react ^0.575.0 (named imports only — tree-shaking)
- embla-carousel-react ^8.6.0 + embla-carousel-autoplay ^8.6.0
- next-themes ^0.4.6
- ESLint 9 with eslint-config-next 16.1.6 (flat config: eslint.config.mjs)
- Deployment: Vercel (Node 20.x default) | Domain: gregoehmen.io

**Version constraints:**
- React 19: verify peer deps before adding packages; refs pass as plain props (forwardRef not required); React.FC deprecated — use named functions with explicit return types
- Tailwind v4: no tailwind.config.js; no @apply; uses @theme {} block in globals.css for custom tokens
- ESLint 9: flat config only — legacy .eslintrc patterns are silently ignored
- TypeScript moduleResolution: bundler — some legacy CJS packages may need shimming
- MDX blog routes: if any import requires Node APIs, add `export const runtime = 'nodejs'` to that route

**Config files to verify before PRs:** tsconfig.json, postcss.config.mjs, eslint.config.mjs, next.config.ts

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

- strict mode + isolatedModules enabled — every file must be independently compilable; no type-only imports without `import type`
- Path alias `@/*` maps to `./*` (project root) — use for all non-relative imports (e.g. `import Header from '@/app/components/Header'`)
- Named function declarations preferred over React.FC — explicit return types required on components (e.g. `export default function Hero(): JSX.Element`)
- `import type` required for type-only imports (isolatedModules enforcement)
- Async/await preferred over raw Promise chains
- No `any` — strict mode enforces this; use `unknown` + type narrowing

### Framework-Specific Rules (Next.js + React)

**Server vs. Client Components:**
- All components are React Server Components (RSC) by default
- Add `'use client'` only when component uses hooks, browser APIs, or event listeners — do not add it preemptively
- Interactive components (carousel, theme toggle) live in app/components/ with `'use client'` at the top of the file

**Next.js Specifics:**
- Use `next/image` for all images — always include `width`, `height`, and `alt`; add `priority` on above-the-fold images
- Use `next/font` for fonts — already configured in app/layout.tsx (Geist, Geist_Mono); do not add new font imports in child components
- Metadata exported from app/layout.tsx — update there for global SEO; per-page metadata exported from each page file
- suppressHydrationWarning required on `<html>` element when next-themes is active (add to app/layout.tsx if not present)

**Routing & Navigation:**
- Single-page home (/) uses section anchor links (#services, #book, etc.) with smooth scroll — scroll-padding-top: 80px already set in globals.css
- Blog: /blog (index) and /blog/[slug] (individual posts) — new App Router pages, not modifications to the home page
- Portfolio link in header: plain external `<a href="https://goehmen.dev">` — NOT a Next.js Link or internal route

**Tailwind CSS v4:**
- Custom color tokens defined in app/globals.css @theme {} block — do not add a tailwind.config.js
- Color token names: background, background-secondary, foreground, foreground-secondary, card, accent-teal (#FF5F05 — Illini orange), accent-blue (#ffffff — white)
- CRITICAL: accent-teal is orange (#FF5F05), NOT teal — do not rename or "fix" this; it is intentional branding
- No @apply — write utility classes directly in JSX className

### Testing Rules

- No testing framework currently installed
- If adding tests for the MDX blog (e.g. slug resolution, metadata), use Vitest — integrates cleanly with Next.js tooling and is consistent with RunnersRun stack
- No coverage requirements — this is a personal marketing site, not a production SaaS
- Manual smoke test required before every deploy to main — story-level checklists live in each story file; run the checklist for any story whose files were touched
- Global smoke test (all deploys): home page renders at `/`, header fixed and visible, logo links to `/`, all anchor links scroll to correct sections, Portfolio opens goehmen.dev in new tab, blog index loads at `/blog` (404 acceptable until Story 2.1), `npm run build` exits zero
- Story-specific smoke tests: see `## Smoke Test Checklist` section in each story file under `_bmad-output/implementation-artifacts/`

### Code Quality & Style Rules

**File & Folder Structure:**
- Components live in app/components/ — PascalCase filenames matching the component name (e.g. ServiceCard.tsx exports ServiceCard)
- No src/ directory — project root is the source root
- New pages go in app/ as page.tsx (e.g. app/blog/page.tsx, app/blog/[slug]/page.tsx)
- MDX blog content: store posts in content/blog/ as [slug].mdx

**Naming Conventions:**
- Components: PascalCase (Header, ServiceCard, BookCall)
- Section IDs: kebab-case (id="book", id="services")
- CSS custom properties / color tokens: kebab-case (accent-teal, background-secondary)
- No index.ts barrel files — import directly from the component file

**Component Structure:**
- Static data arrays (services, testimonials, etc.) defined at module level outside the component function — not inside
- One default export per file — no named component exports
- Props typed inline as function parameter type, not separate interface unless reused across files

**Layout Pattern:**
- Max container: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
- Section vertical padding: py-20 sm:py-24
- Alternate section backgrounds: bg-background / bg-background-secondary

### Development Workflow Rules

**Git:**
- Branch from main; no long-lived feature branches needed for a solo personal site
- Commit messages: conventional style (feat:, fix:, chore:) preferred but not enforced

**Deployment:**
- Vercel auto-deploys on push to main — every merge is a production deploy
- Preview deployments available on PRs/branches for visual review
- OG images must use absolute URLs (https://gregoehmen.io/...) — relative paths break social card previews

**BMAD Workflow:**
- All implementation work follows BMAD framework phases — no ad-hoc code changes outside of stories
- Planning artifacts: _bmad-output/planning-artifacts/
- Implementation artifacts: _bmad-output/implementation-artifacts/
- Deferred findings: tracked as GitHub Issues at https://github.com/goehmen/gregoehmen-io/issues (NOT in deferred-work.md, which is now a pointer only)
- At the start of each story, run `gh issue list --repo goehmen/gregoehmen-io --state open` to check for deferred items relevant to files you will touch
- When a deferred item is resolved as a side effect of story work, close the corresponding GitHub issue with a reference to the commit or PR

### Critical Don't-Miss Rules

**Tailwind v4 gotchas:**
- NEVER create tailwind.config.js — breaks v4 setup
- Avoid @apply — deprecated in v4; write utility classes directly in className
- NEVER rename accent-teal — it is orange by design (#FF5F05 Illini brand color)
- Color tokens work as Tailwind utilities only (bg-accent-teal, text-foreground-secondary) — not as CSS arbitrary values
- Only standard breakpoints configured (sm, md, lg, xl, 2xl) — no custom breakpoints

**React / Next.js gotchas:**
- NEVER add 'use client' preemptively — only for hooks, browser APIs, event handlers
- NEVER use ReactDOM.render (removed in React 19) or React.FC (deprecated)
- NEVER import fonts in child components — Geist/Geist_Mono configured once in app/layout.tsx
- NEVER use raw `<img>` — always next/image with width, height, alt

**MDX Blog gotchas:**
- NEVER import client-only components into MDX without dynamic() + ssr:false
- Blog slugs: filename in content/blog/ AND URL path segment must match exactly — case-sensitive on Vercel (Linux)
- If using generateStaticParams(), page component must be async or static params will silently fail
- Each blog post page.tsx must export its own metadata object for SEO

**TypeScript gotchas:**
- No implicit any — all params and return types explicit; no @ts-ignore without inline comment explaining why
- Use `import type { ReactNode } from 'react'` for React type utilities in strict mode

**Routing:**
- Portfolio link (goehmen.dev) is a plain external `<a>` tag — NOT next/link

**SEO / Metadata:**
- OG image URLs must be absolute (https://gregoehmen.io/og-image.png) — relative paths break social card previews (known past issue)

**Environment variables:**
- NEVER hardcode URLs or keys — use process.env.NEXT_PUBLIC_* for client-side, process.env.* for server-side

**Site scope:**
- Personal marketing site — no auth, no database, no API routes, no ISR, no edge functions, no perf optimizations unless explicitly requested

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code in this project
- Follow ALL rules exactly as documented — especially the NEVER rules
- When in doubt, prefer the more restrictive option
- The accent-teal / orange distinction is not a typo — do not "fix" it

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack or patterns change
- Remove rules that become obvious over time

Last Updated: 2026-04-25

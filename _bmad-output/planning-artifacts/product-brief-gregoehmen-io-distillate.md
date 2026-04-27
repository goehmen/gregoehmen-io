---
title: "Product Brief Distillate: gregoehmen.io Revamp"
type: llm-distillate
source: "product-brief-gregoehmen-io.md"
created: "2026-04-25"
purpose: "Token-efficient context for downstream PRD and architecture work"
---

# Product Brief Distillate: gregoehmen.io Revamp

_Dense reference context for PRD creation and architecture planning. Each bullet is self-contained._

---

## Owner & Context

- **Owner:** Greg Oehmen — senior product executive, 15 years (Visa, Salesforce/Pivotal, Apple DBA roots, Bossa Nova Robotics, Oracle, Gazillion Entertainment)
- **Current roles:** Fractional CPO at Spatial Capital and Hextropian.ai; founder of RunnersRun
- **Site:** gregoehmen.io — Next.js 16.1.6 App Router, React 19, TypeScript 5 strict, Tailwind v4, Vercel deployment
- **Domain:** gregoehmen.io (production); goehmen.dev (separate portfolio site — external link only, no work in scope)
- **Calendly booking:** already embedded at site anchor `#book` — no new infrastructure needed

---

## Confirmed Scope Decisions

- **In v1:** Repositioned hero + services + about copy; RunnersRun case study section (home page); MDX blog (`/blog`, `/blog/[slug]`); header nav update (Blog + Portfolio links); email capture; updated OG/metadata
- **Out v1:** New visual design; goehmen.dev revamp; CMS/tagging/search/comments; auth/database/API routes; dedicated coaching intake page; scalable coaching formats (cohorts, courses)
- **Branding:** Illini orange (#FF5F05) retained; color token `accent-teal` is orange by design — do NOT rename
- **Blog architecture:** Static MDX files in `content/blog/[slug].mdx`; no CMS; case-sensitive slugs on Vercel Linux
- **Email capture:** In v1 scope; implementation to be decided in architecture phase; strong preference for third-party embed (Buttondown, Beehiiv) requiring zero backend — consistent with "no database, no API routes" project constraint

---

## Rejected Ideas (Do Not Re-Propose)

- **Named BMAD reference on site** — rejected; abstract the methodology instead ("structured, spec-driven AI-native workflow") to avoid jargon for non-practitioners
- **Separate pages for each section** — rejected; single-page home with anchor nav is retained; only new routes are /blog and /blog/[slug]
- **CMS for blog** — rejected for v1; static MDX sufficient
- **Redis/KV backend for email capture** — deferred to architecture decision; third-party embed likely preferred
- **Explicit "open to FTE" statement** — rejected; FTE signal is subtle copy and implicit credibility, not a direct announcement
- **Dedicated coaching/intake page** — deferred until paid engagement pattern is validated
- **Scalable coaching formats (cohorts, courses, workshops)** — roadmap item only; not v1

---

## Active Clients & Revenue Context

- **Fractional CPO clients (current):** Spatial Capital, Hextropian.ai
- **AI coaching clients (current/pipeline):**
  - Rich Rupp, Sr. Director of Engineering, Modio Health — first paid engagement; 10-hour hands-on AI-first development coaching; greenfield healthcare SaaS project; confidentiality status TBD (keep generic for now: "Sr. Director of Engineering at a healthcare SaaS company")
  - Scott Thompson (previous manager) — reached out after LinkedIn article; building Streamfinder.co (streaming service tracker); more conversational than commercial currently; confirms corporate mid/upper management demand for AI-native building skills
- **No coaching revenue or case study metrics yet** — RunnersRun in private beta as of April 2026; no customers, no revenue; case study framing is build capability + product quality, not business traction

---

## RunnersRun Case Study Details

- **URL:** runnersrun.app
- **What it is:** Consumer SaaS for runner mileage goal tracking — answers "am I going to hit my annual mileage goal?" with a cumulative pace-line graph (actual vs. required-pace trend line). No comparable standalone product exists; runners currently use Google Sheets.
- **Who it's for:** Runners who set a numeric annual mileage goal and care whether they're on track — intrinsic motivation (the number), not gamification
- **Stack:** Next.js, TypeScript, Neon (PostgreSQL), Drizzle ORM, Clerk, Stripe, Trigger.dev, Vercel, Resend, PostHog, Sentry, Vitest, Playwright
- **Build story:** First commit March 3, 2026. Built solo using Claude Code + BMAD V6. Sequential, isolated sessions (not parallel). Opus for generative work; Sonnet for review/validation. Quality bottleneck was spec clarity (PM problem, not AI problem).
- **Status:** Private beta April 2026; public launch target June 2026
- **Case study angle for site:** Blended build + product story. Lead with what the methodology made possible (solo, production-grade, enterprise-standard architecture), not revenue/user metrics (not yet available). Frame: "I applied 15 years of product judgment to build this solo with AI. It's production-grade because that's the standard I hold."

---

## BMAD Methodology (Abstract Language to Use on Site)

- **Do not name "BMAD" on the site**
- **Abstract description approved by Greg:** "A free, open-source framework that structures AI-assisted software development into discrete phases with specialized agents — replacing the ad-hoc 'just prompt it' approach with a disciplined, agile-grounded workflow designed to produce production-quality output"
- **Approved site language alternatives:** "structured, spec-driven development methodology"; "disciplined AI-native workflow"; "agile-grounded approach to AI-assisted building"; "production-grade AI development process"
- **BMAD context (for internal reference only):** 43k+ GitHub stars; V6 released 2026; no named individual consultant authority in the ecosystem yet; first-mover window is open

---

## Audience Details

**Primary — AI-native coaching/advisory:**
- Title: Sr. Director to VP level (Engineering, Product, or General Management)
- Trigger: "I'm building/leading an AI-native project and doing it unsystematically; I want to do it right"
- Fear: "Is this person actually hands-on or just theoretical?"
- Buying behavior: Time-boxed, outcome-defined engagements (10 hours with specific deliverables); wants to drive the keyboard; wants to leave with reusable artifacts; NOT looking for a course
- Does not scale well — Greg's intentional near-term; market validation is the goal

**Secondary — Fractional CPO:**
- Title: Startup CEO / Co-founder, post-seed to Series A
- Trigger: "I need senior product leadership but can't afford full-time CPO"
- Existing clients: Spatial Capital, Hextropian.ai
- Must retain positioning clarity; cannot feel de-prioritized by the rebrand

**Tertiary — FTE hiring signal:**
- Audience: Hiring managers and recruiters for VP Product / CPO / SVP Product Strategy roles
- Approach: Implicit credibility signals only — enterprise scale pedigree, shipped product, systems thinking in copy
- No explicit CTA or "available for FTE" statement
- Key phrasing signals: "strategic product leadership," "platform scale," "cross-functional fluency," "systems architect mindset"

---

## Messaging Hierarchy (Structural Decision)

- **Hero converts the primary audience** (coaching/advisory) — one clear identity statement, proof point visible above fold
- **Services section** serves both coaching and FCPO with separate tracks; neither buried
- **RunnersRun section** bridges both audiences — it is simultaneously proof of AI-native build capability AND an example of product leadership applied to a real product
- **About section** carries the FTE signal — enterprise pedigree, scale numbers, methodology language
- **Do not try to serve all three audiences from the hero** — confused visitor bounces; sequencing is the solution

---

## Technical Requirements (from project-context.md)

- App Router only; no Pages Router; no src/ directory
- `'use client'` only for components with hooks/browser APIs/event handlers — not preemptively
- Tailwind v4: `@theme {}` block in globals.css; no tailwind.config.js; no @apply
- Color tokens: `accent-teal` = #FF5F05 (Illini orange), `accent-blue` = #ffffff — names are intentional, do not rename
- `next/image` for all images; `next/font` configured once in app/layout.tsx only
- OG image URLs must be absolute (https://gregoehmen.io/...) — known past issue with relative paths
- Blog slugs: filename in content/blog/ AND URL path segment must match exactly — case-sensitive on Vercel
- Portfolio link (goehmen.dev): plain `<a>` tag — NOT next/link

---

## Competitive Context (From Web Research)

- Fractional CPO personal brand sites are almost universally generic — "I help startups scale product" with no proof-of-work
- Fractional CPO market less commoditized than fractional CTO; less supply, less noise
- "AI consultant" label is low-trust in 2026 — must lead with proof-of-work, not the label
- No named individual consultant currently positioned in BMAD-based coaching
- 80%+ of fractional roles come through referrals — site's job is conversion and trust validation, not SEO acquisition
- Spec-driven development tools roundups being actively published in 2026 — category maturing, coaching demand arriving

---

## Open Questions (Unresolved at Brief Completion)

- **Modio Health confidentiality:** Can Rich Rupp / Modio Health be named on the site? Greg following up. Default: keep generic until confirmed.
- **Email capture implementation:** Third-party embed (Buttondown/Beehiiv) vs. Vercel KV + API route — defer to architecture phase. Preference: no backend.
- **Publishing cadence:** How often will new blog posts ship? Not defined. Should be defined before launch to set realistic expectations.
- **Services pricing:** Not on the site currently; no decision made. Coaching engagements are time-boxed (10-hour model confirmed). Pricing display TBD.
- **goehmen.dev state:** Is the portfolio site currently live and in good shape to receive traffic? Greg has not confirmed. Worth checking before the Portfolio header link goes live.

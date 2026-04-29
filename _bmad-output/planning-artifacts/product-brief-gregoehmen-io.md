---
title: "Product Brief: gregoehmen.io Revamp"
status: "complete"
created: "2026-04-25"
updated: "2026-04-25"
inputs:
  - "_bmad-output/project-context.md"
  - "Aakash-Boris Article final draft.docx (LinkedIn article / first blog post)"
  - "ai-consultant-brief.docx (Modio Health engagement brief)"
  - "Web research: fractional CPO market, AI consulting landscape, BMAD ecosystem"
---

# Product Brief: gregoehmen.io Revamp

## Executive Summary

Greg Oehmen spent fifteen years building product at scale — Visa, Salesforce, Pivotal — and then proved something most senior leaders are currently wondering about: that a non-engineer with deep product judgment can ship production-grade software solo, using AI-native tools and a disciplined, structured methodology. He built RunnersRun from zero to private beta launch. He wrote about it on LinkedIn. Senior leaders in product and engineering circles read it and started reaching out — asking how he did it and how they can do it too.

The current gregoehmen.io was built for a different version of this career. It presents Greg as a Fractional CPO, which he still is — but that is no longer the full story. The site needs to catch up to who Greg actually is now and, more importantly, to the market showing up at his door: senior technical and business leaders who want to learn how to build with AI the right way — structured, spec-driven, production-grade — and need someone who has actually shipped something to show them how.

This revamp transforms gregoehmen.io from a single-service fractional CPO site into a three-pillar professional platform: AI-native product building coaching and advisory as the primary offer, Fractional CPO services as the established second pillar, and positioning that signals genuine attractiveness to senior FTE hiring teams evaluating product strategy leadership.

## The Problem (Three Surfaces)

**The site is behind the person.** The current site leads with a Fractional CPO pitch to an audience increasingly arriving via a LinkedIn article about AI-native building. The gap between the site's messaging and Greg's actual positioning creates friction for every inbound lead.

**Senior leaders are stuck between exploration and production.** Director/VP-level leaders in engineering, product, and general management have moved past "what can I do with AI" but are hitting a ceiling. They're experimenting without structure, getting inconsistent results, and lack a repeatable methodology. Courses teach tools in isolation. Agencies deliver outputs without transferring capability. What they need is someone to build alongside them — hands-on, from first principles — using a methodology they can own and repeat.

**The FCPO and FTE audiences still exist and need to be served.** Early-stage startup CEOs still need strategic product leadership without the full-time CPO cost. Hiring managers evaluating senior product hires are increasingly looking for demonstrated capability, not just credentials. Neither audience is displaced by the revamp — both need their own clear lane in the experience.

## The Solution

A revamped gregoehmen.io structured around four content zones and a new content engine:

**Repositioned hero.** Lead with the AI-native building angle — the new capability, the proof, the offer. Fractional CPO is the second line, not the headline. One breath establishes Greg's identity: someone who builds products with AI and helps others do the same.

**RunnersRun case study section.** A dedicated home page section featuring RunnersRun (runnersrun.app) as the central proof point. The case study blends the build story and the product story: Greg applied fifteen years of product judgment — spec-driven development, enterprise-grade architecture standards, disciplined AI-native workflow — to build a production-ready consumer SaaS application solo. The result is currently in private beta. The story is not about traction; it is about what the methodology makes possible. This is the trust-building centerpiece for coaching and advisory clients.

**Updated services section.** Two clear tracks with distinct language for each audience: AI-native product building coaching and advisory (hands-on, time-boxed, outcome-defined engagements for senior leaders who want to build right), and Fractional CPO (embedded strategic product leadership for post-seed and Series A startups).

**About section.** Updated to include AI-native credentials alongside enterprise pedigree, with language that signals genuine attractiveness to FTE hiring teams evaluating senior product strategy and PM leadership — present but not announced.

**MDX static blog at /blog.** The LinkedIn article ("Aakash Gupta wrote that PMs are the future of software — I went and tested the thesis") becomes the first post. The blog is the content marketing engine — converting warm LinkedIn and search traffic to site visits to booked discovery calls. Email capture (implementation approach TBD in architecture phase — likely third-party embed requiring no backend) converts readers to an owned list.

**Header nav update.** Blog link (internal) and Portfolio link to goehmen.dev (external plain anchor) added alongside existing section anchor nav.

## What Makes This Different

The market for AI consulting is crowded and low-trust. The fractional CPO market defaults to generic positioning. Greg's position sits at the intersection — differentiated by something neither category currently offers: **proof-of-work at the right level**.

RunnersRun is not a case study written about someone else's project. It is a shipped production application, built solo, using the same structured AI-native methodology Greg now teaches — disciplined phases, specialized agents, spec-driven development from story to deployed feature. The discipline that made it production-grade is what Greg brought from fifteen years at Visa, Salesforce, and Pivotal. The methodology is what made it possible solo.

No named individual consultant currently claims authority in this specific intersection: hands-on AI-native product building methodology, enterprise product rigor, and fractional CPO depth. The LinkedIn article generating senior-leader inbound is evidence the positioning already resonates — the site needs to catch up to it.

## Who This Serves

**Primary — AI-native building clients.**
Senior Director/VP+ leaders personally building or leading AI-native development projects. Past the exploration phase, wanting to do it right. Two current personas: Rich Rupp (Sr. Director of Engineering, Modio Health — preparing a greenfield AI-first healthcare SaaS project, engaged for a 10-hour hands-on methodology transfer); and Scott Thompson (former manager, independently building Streamfinder.co, wants to compare approach and accelerate). The pattern: experienced, capable, already in motion — not looking for a course.

**Secondary — Fractional CPO clients.**
Startup CEOs and founding teams, post-seed to Series A, needing strategic product leadership embedded part-time. Two current engagements (Spatial Capital, Hextropian.ai). This audience is retained, not displaced.

**Tertiary (subtle signal) — FTE hiring teams.**
Hiring managers and recruiters evaluating senior product strategy and PM leadership. The site uses implicit credibility signals — enterprise scale, systems thinking, AI-native execution, shipped product — without an explicit statement. The profile makes the case; the site does not need to announce it.

## Success Criteria

- Coaching and advisory inquiries traceable to site visits within 60 days of launch
- A coaching prospect landing on the site immediately understands the offer and its credibility without needing to scroll far (test with 3–5 real people in the target audience)
- Blog published with the LinkedIn article as the first post at launch; infrastructure supports adding subsequent posts without engineering work
- FCPO positioning not diluted — current clients (Spatial Capital, Hextropian.ai) and inbound FCPO prospects find a clear, compelling pitch in the services section
- Email capture in place; list begins growing from launch day
- At least one FTE recruiter or hiring manager inbound attributable to the site within 90 days

## Scope

**In for v1:**
- Repositioned hero, services, and about sections (new copy; existing Illini orange branding retained)
- RunnersRun case study section on home page (blended build + product story; private beta framing)
- Header nav: Blog link (internal) and Portfolio link to goehmen.dev (external) added
- MDX blog: /blog index and /blog/[slug] routes; LinkedIn article published as first post at launch
- Email capture on blog (implementation TBD in architecture phase — third-party embed preferred to maintain no-backend constraint)
- Updated metadata and OG image tags for new positioning

**Explicitly out for v1:**
- New visual design or rebrand
- goehmen.dev build or revamp (portfolio link only — outbound external)
- CMS, tagging, search, or comments on blog
- Auth, database, or API routes
- Dedicated coaching intake page (evaluate after first cohort of paid engagements)
- Scalable coaching formats (cohorts, courses, workshops) — roadmap item

## Roadmap Thinking

If the coaching and advisory offer gains traction — several paid engagements in the first six months — the site evolves: a dedicated /work-with-me page, a structured intake form replacing the generic Calendly link, and case studies from completed engagements with named outcomes. The blog grows from one post at launch to a regular publishing cadence as Greg documents his methodology and builds in public.

The AI-native building methodology angle is worth developing into a named, specific offer over time — something precise enough that a senior engineering leader searching for structured AI-native development coaching finds Greg by name. The first-mover window in this specific niche is open. The LinkedIn article and the Modio engagement are the proof that demand is real. The site is the conversion surface.

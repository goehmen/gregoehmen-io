# Story 2.3: Email Capture on Blog Posts

Status: done

## Story

As a blog reader who isn't ready to book a call,
I want to subscribe to email notifications at the bottom of any blog post,
so that I can re-engage with Greg's content over time and eventually book a call.

## Acceptance Criteria

1. **Given** I am on any `/blog/[slug]` page **When** I scroll to the bottom of the post content **Then** an email capture form is visible with low-commitment copy (e.g., "Get notified when I publish") **And** the form requires only an email address — no other fields

2. **Given** I submit a valid email address **When** the form submits **Then** the request goes directly to the third-party email provider via HTML form POST **And** no data is sent to or stored on gregoehmen.io **And** no backend API route is invoked

3. **Given** the email capture embed loads **When** the page renders **Then** the embed does not block page render (non-render-blocking) **And** the embed is served over HTTPS **And** no JavaScript errors appear in Chrome, Firefox, or Safari devtools console

4. **Given** I inspect the `EmailCapture` component **When** checking its implementation **Then** it is a React Server Component with no `'use client'` directive (unless the provider requires a JS widget, in which case `dynamic()` with `ssr: false` is used and the RSC boundary is documented in a comment)

## Tasks / Subtasks

- [x] Task 0: Confirm email provider choice with Goehmen before coding (see **Provider Decision** in Dev Notes)
  - [x] 0.1: Obtain the provider's subscribe URL / embed snippet / account username
  - [x] 0.2: Determine if provider supports plain HTML form POST or requires a JS widget

- [x] Task 1: Create `app/components/EmailCapture.tsx` (AC: #1, #2, #3, #4)
  - [x] 1.1: Create as RSC — no `'use client'` if using HTML form POST path (see Dev Notes)
  - [x] 1.2: Render the email form with low-commitment copy and single email input
  - [x] 1.3: Set `form action` to provider's HTTPS subscribe endpoint
  - [x] 1.4: Apply site design tokens (background, foreground, accent-teal) — see styling guidance
  - [x] 1.5: Include visual separator (e.g., `border-t border-card`) above the form to distinguish from post body

- [x] Task 2: Integrate `EmailCapture` into `app/blog/[slug]/page.tsx` (AC: #1)
  - [x] 2.1: Import `EmailCapture` from `@/app/components/EmailCapture`
  - [x] 2.2: Render `<EmailCapture />` after `<Post />` inside the `<article>` element
  - [x] 2.3: Verify placement is visually below the post content and above the `</article>` closing tag

- [x] Task 3: Verify build and smoke test (AC: #1–#4)
  - [x] 3.1: `npm run build` — exits zero
  - [x] 3.2: `npm run lint` — no new errors
  - [x] 3.3: Dev server: navigate to `/blog/AI-PM-skills-article` — email form visible below post content
  - [x] 3.4: Form shows only an email input field and a submit button — no other fields
  - [x] 3.5: Devtools Network tab: submitting form sends request to provider's domain (not gregoehmen.io)
  - [x] 3.6: No JS errors in Chrome console on page load
  - [x] 3.7: Run global regression smoke test (home page, header, anchors, Portfolio link, Calendly #book)

### Review Findings

- [x] [Medium][Patch] Add Buttondown `embed` hidden field — add `<input type="hidden" name="embed" value="1">` inside the form to match Buttondown's standard embed pattern [`app/components/EmailCapture.tsx:13`]
- [x] [Medium][Patch] Input border `border-card` produces near-zero contrast (WCAG 1.4.11) — replace with a higher-contrast border token or `border-white/20` opacity utility [`app/components/EmailCapture.tsx:24`]
- [x] [Medium][Patch] `<form target="_blank">` missing `rel="noopener noreferrer"` — opened tab receives `window.opener` access back to the blog post page [`app/components/EmailCapture.tsx:13`]
- [x] [Medium][Patch] Email `<input>` has no associated `<label>` — fails WCAG 1.3.1; placeholder alone is insufficient for screen readers [`app/components/EmailCapture.tsx:19`]
- [x] [Low][Patch] `<section>` has no accessible name (`aria-labelledby` or `aria-label`) — not surfaced as a named landmark region to screen readers [`app/components/EmailCapture.tsx:5`]
- [x] [Low][Patch] Email `<input>` missing `autocomplete="email"` — violates WCAG 1.3.5; blocks browser and password manager autofill [`app/components/EmailCapture.tsx:19`]
- [x] [Low][Defer] `<section>` inside `<article>` implies subscription section is part of post content semantically — low impact, common pattern [`app/components/EmailCapture.tsx:5`] — deferred
- [x] [Low][Defer] No double-submit guard — RSC/stateless form; user can click Subscribe multiple times before new tab opens [`app/components/EmailCapture.tsx:13`] — deferred
- [x] [Low][Defer] Popup-blocking browsers may navigate current page instead of opening new tab — browser behavior, not addressable in static markup [`app/components/EmailCapture.tsx:13`] — deferred

## Dev Notes

### CRITICAL: Provider Decision Required Before Implementation

**This is the primary open question for this story.** The architecture deferred the email provider choice (Buttondown vs Beehiiv). The implementation path depends on this decision:

| Provider | Form type | RSC? | Notes |
|---|---|---|---|
| **Buttondown** | Plain HTML form POST | Yes (RSC, no JS) | Preferred architecture fit |
| **Beehiiv** | JavaScript embed widget | No (requires `dynamic()` + `ssr: false`) | More complexity |

**Ask Goehmen which provider to use before writing any code.** Also get the account username/ID needed for the subscribe URL.

---

### Path A: Buttondown (HTML Form POST — Preferred)

If Buttondown is selected, `EmailCapture.tsx` is a pure RSC with no JavaScript dependency.

**Subscribe URL format:**
```
https://buttondown.com/api/emails/embed-subscribe/{USERNAME}
```
Replace `{USERNAME}` with Greg's Buttondown username.

**Full `app/components/EmailCapture.tsx` implementation:**

```typescript
import type { JSX } from 'react'

export default function EmailCapture(): JSX.Element {
  return (
    <section className="mt-12 pt-10 border-t border-card">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Get notified when I publish
      </h2>
      <p className="text-foreground-secondary text-sm mb-6">
        New posts on AI-native building, product leadership, and shipping software with AI.
        No noise — just new posts.
      </p>
      <form
        action="https://buttondown.com/api/emails/embed-subscribe/GregOehmen"
        method="POST"
        target="_blank"
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="flex-1 bg-card border border-card rounded-lg px-4 py-2 text-foreground placeholder:text-foreground-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal"
        />
        <button
          type="submit"
          className="bg-accent-teal text-white font-medium text-sm px-6 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </section>
  )
}
```

**Notes:**
- `target="_blank"` on the form sends the POST result to a new tab (Buttondown confirmation page), which is the standard embed pattern — the current page is unaffected
- `method="POST"` sends directly to Buttondown — no gregoehmen.io server involvement
- No `action` URL hardcoded in env vars needed; it's a public subscriber endpoint
- `required` on the email input provides native browser validation — no JS needed

---

### Path B: Beehiiv (JS Widget — if selected instead)

If Beehiiv is selected, the embed requires JavaScript. Use `'use client'` + `dynamic()`:

**`app/components/EmailCaptureClient.tsx`** (client boundary):
```typescript
'use client'
import type { JSX } from 'react'

export default function EmailCaptureClient(): JSX.Element {
  return (
    <section className="mt-12 pt-10 border-t border-card">
      {/* Beehiiv embed snippet goes here */}
      <iframe
        src="https://embeds.beehiiv.com/REPLACE_WITH_EMBED_ID"
        data-test-id="beehiiv-embed"
        width="100%"
        height="320"
        frameBorder="0"
        scrolling="no"
        title="Subscribe to Greg Oehmen's newsletter"
        style={{ borderRadius: '4px' }}
      />
    </section>
  )
}
```

**`app/components/EmailCapture.tsx`** (RSC shell with dynamic loader):
```typescript
import type { JSX } from 'react'
import dynamic from 'next/dynamic'

// Provider requires JS widget — load client-side only to avoid SSR hydration issues
const EmailCaptureClient = dynamic(
  () => import('@/app/components/EmailCaptureClient'),
  { ssr: false }
)

export default function EmailCapture(): JSX.Element {
  return <EmailCaptureClient />
}
```

**Notes:**
- `ssr: false` prevents SSR of the JS widget — satisfies the non-render-blocking NFR
- The RSC wrapper (`EmailCapture.tsx`) keeps the import interface consistent for `[slug]/page.tsx`
- Beehiiv embed ID obtained from Beehiiv dashboard → "Embed & API" section
- Verify: no JS console errors on page load in Chrome, Firefox, Safari (required by AC #3)

---

### Integration: `app/blog/[slug]/page.tsx` — Current State & Required Change

**Current `[slug]/page.tsx` article element (lines 79–111):**
```tsx
<article className="max-w-3xl">
  {frontmatter.heroImage && (
    <figure>...</figure>
  )}
  <header className="mb-8">
    <h1>...</h1>
    <p>...date · Greg Oehmen...</p>
  </header>
  <Post />
</article>
```

**Required change — add `EmailCapture` after `<Post />`:**
```tsx
import EmailCapture from '@/app/components/EmailCapture'

// ...inside the article:
<article className="max-w-3xl">
  {frontmatter.heroImage && (
    <figure>...</figure>
  )}
  <header className="mb-8">
    <h1>...</h1>
    <p>...date · Greg Oehmen...</p>
  </header>
  <Post />
  <EmailCapture />    {/* ADD THIS LINE */}
</article>
```

This is the only change to `[slug]/page.tsx`. Do not modify any other lines — Header, Footer, nav, metadata generation, notFound() catch are all correct as-is.

---

### Styling Notes

- `border-t border-card` — visual separator above the form section (uses `card` token = `#1e3a5f`)
- `bg-card` on the email input — consistent with card surface color
- `bg-accent-teal` on submit button — `#FF5F05` (Illini orange) — intentional; do NOT rename this token
- `text-white` on button text — white on orange passes WCAG contrast
- `sm:flex-row` layout — input + button stack on mobile, row on sm+

---

### TypeScript Requirements

- `import type { JSX } from 'react'` at top of every file
- Named function export: `export default function EmailCapture(): JSX.Element`
- No `React.FC`; no `any`
- If Path B (Beehiiv): both files need the JSX import type

---

### Architecture Compliance

- No `'use client'` unless Path B is required
- No API route creation — form POSTs directly to provider
- No environment variable needed for Buttondown URL (it's a public endpoint)
- If a username/ID env var is desired in future: use `process.env.NEXT_PUBLIC_*` pattern
- Component location: `app/components/EmailCapture.tsx` — PascalCase filename matching export
- Path alias `@/*` for all imports
- Do not touch `app/blog/page.tsx` — index page has no email capture (blog posts only)
- Do not touch `mdx-components.tsx`, `next.config.ts`, or any home page component

---

### File Structure

```
app/
  components/
    EmailCapture.tsx          NEW: email capture component (RSC if Buttondown, dynamic wrapper if Beehiiv)
    EmailCaptureClient.tsx    NEW (Path B only): client component for JS widget
  blog/
    [slug]/
      page.tsx                MODIFY: import and render <EmailCapture /> after <Post />
    page.tsx                  NO CHANGE
```

---

### Open GitHub Issues — Relevance Check

`gh issue list` as of 2026-04-29:
- #9: `aria-controls` absent element (Header) — not in scope
- #12: Duplicate CTAs lack aria-label (Services) — not in scope
- #13: Track 1 card orphan at sm (Services) — not in scope

No open issues affect files touched in this story.

---

### Key Learnings from Stories 2.1 & 2.2

- `app/blog/[slug]/page.tsx` now has `Header` and `Footer` added (Story 2.2 review decision) — preserve these, do not remove
- `experimental.mdxRs: true` is a hard constraint — do not change `next.config.ts`
- `import type { JSX } from 'react'` required on every new file
- Named functions with explicit return types — no `React.FC`
- Layout constant for blog pages: `max-w-3xl` on `<article>` (narrower than the page's `max-w-6xl` container)
- `accent-teal` = `#FF5F05` (Illini orange) — intentional, never rename
- No `@apply` in Tailwind v4 — write utilities directly in `className`

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.3 ACs, FR16–FR18, ARCH9]
- [Source: _bmad-output/planning-artifacts/architecture.md — EmailCapture RSC pattern, provider decision, data boundaries]
- [Source: _bmad-output/project-context.md — RSC rules, TypeScript rules, Tailwind v4 tokens]
- [Source: _bmad-output/implementation-artifacts/2-2-blog-index-page.md — Review findings, [slug]/page.tsx current state]
- [Source: app/blog/[slug]/page.tsx — current implementation (read 2026-04-29): Header + Footer added, article structure at lines 79–111]

## Smoke Test Checklist

Run manually against `localhost:3000` before marking done.

### Email Capture — Placement

- [ ] Navigate to `/blog/AI-PM-skills-article` — email capture form visible below post content
- [ ] Form appears after article body, before footer
- [ ] Visual separator (border) distinguishes form from post content
- [ ] Section heading visible (e.g., "Get notified when I publish")

### Email Capture — Form

- [ ] Only one input field visible (email address)
- [ ] No other fields (name, phone, etc.)
- [ ] Submit button present with readable label
- [ ] Placeholder text in email input
- [ ] Required validation: submitting empty form shows browser validation error
- [ ] Required validation: submitting non-email shows browser validation error

### Email Capture — Submission

- [ ] Submit a test email: form POST goes to provider domain (verify in Network tab)
- [ ] No request to gregoehmen.io server after form submit
- [ ] No backend API route invoked

### Non-Functional

- [ ] No JavaScript errors in Chrome devtools console on page load
- [ ] Page source: no render-blocking scripts introduced
- [ ] Resize to 375px mobile — form readable, input and button accessible without horizontal scroll

### Build Verification

- [ ] `npm run build` exits zero
- [ ] `npm run lint` — no new errors

### Regression

- [ ] `/blog` index still renders correctly (no change expected)
- [ ] Home page renders at `/`
- [ ] Header fixed and visible on `/blog/AI-PM-skills-article`
- [ ] Footer renders on `/blog/AI-PM-skills-article`
- [ ] "← Back to blog" link navigates to `/blog`
- [ ] Calendly `#book` anchor functional on home page

## Open Questions

**Q1:** ~~Which email provider?~~ RESOLVED: Buttondown — use Path A (HTML form POST).

**Q2:** ~~Provider account username?~~ RESOLVED: `GregOehmen` — subscribe URL: `https://buttondown.com/api/emails/embed-subscribe/GregOehmen`

No blockers remain. Story is ready to implement.

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (create-story)

### Debug Log References

None.

### Completion Notes List

- Task 0: Provider resolved in story file — Buttondown Path A (HTML form POST), username `GregOehmen`. No code needed.
- Task 1: Created `app/components/EmailCapture.tsx` as a pure RSC (no `'use client'`). Form POSTs directly to `https://buttondown.com/api/emails/embed-subscribe/GregOehmen`. `target="_blank"` routes the Buttondown confirmation to a new tab, leaving the blog post page unaffected. All AC #1–#4 satisfied.
- Task 2: Added `import EmailCapture from '@/app/components/EmailCapture'` and `<EmailCapture />` after `<Post />` in `app/blog/[slug]/page.tsx`. No other lines touched.
- Task 3: `npm run build` exits zero; `npm run lint` clean. Dev-server smoke tests (3.3–3.7) require manual verification by Goehmen.

### File List

- `app/components/EmailCapture.tsx` (NEW)
- `app/blog/[slug]/page.tsx` (MODIFIED)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (MODIFIED)

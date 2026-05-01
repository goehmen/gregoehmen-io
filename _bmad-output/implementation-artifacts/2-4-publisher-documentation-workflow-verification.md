# Story 2.4: Publisher Documentation & Workflow Verification

Status: done

## Story

As Greg (publisher),
I want clear documentation for creating new blog posts and a verified end-to-end publish workflow,
so that I can add new content to the blog using only a text editor and git — no engineering involvement.

## Acceptance Criteria

1. **Given** `BLOG.md` exists at the project root **When** I read it **Then** it documents all 4 required frontmatter fields: `title`, `date` (ISO 8601 format), `description` (under 160 chars), `slug` (must match filename without extension) **And** it explains the slug convention: filename = frontmatter slug = URL segment, lowercase-kebab, case-sensitive on Vercel Linux **And** it includes the 3-step publish workflow: create `.mdx` file → `git commit` → `git push` **And** it includes a complete example frontmatter block

2. **Given** I follow only the `BLOG.md` instructions to create a new post (a `.mdx` file with valid frontmatter in `content/blog/`) **When** I push to main and Vercel auto-deploys **Then** the new post is live at `/blog/[slug]` **And** the post appears on the `/blog` index page **And** no application code, configuration files, or deployment settings were modified

3. **Given** a new post has a slug of `my-second-post` (file: `my-second-post.mdx`) **When** the post is deployed **Then** the URL is exactly `/blog/my-second-post` — matching the filename exactly, case-sensitive

## Tasks / Subtasks

- [x] Task 1: Create `BLOG.md` at project root (AC: #1)
  - [x] 1.1: Document the frontmatter format — `export const frontmatter = {...}` JS object syntax (NOT YAML `---...---`; this is how `@next/mdx` + `remark-mdx-frontmatter` works in this repo)
  - [x] 1.2: Document all 4 required fields with types and constraints (title, date, description, slug)
  - [x] 1.3: Document 4 optional fields (heroImage, heroImageAlt, heroImageCaption, canonicalUrl)
  - [x] 1.4: Explain slug convention: lowercase-kebab, matches filename exactly, case-sensitive on Vercel Linux
  - [x] 1.5: Include the 3-step publish workflow: create `.mdx` → `git add` → `git commit` → `git push`
  - [x] 1.6: Include a complete example post (frontmatter block + opening paragraph)
  - [x] 1.7: Include a warning about optional fields `heroImageAlt` (required if `heroImage` set) and case-sensitivity

- [x] Task 2: Create test post `content/blog/my-second-post.mdx` to verify workflow (AC: #2, #3)
  - [x] 2.1: Create `content/blog/my-second-post.mdx` with valid frontmatter and minimal body content
  - [x] 2.2: Confirm `slug` field equals `my-second-post` (matches filename exactly)
  - [x] 2.3: Run `npm run build` — `/blog/my-second-post` appears as a statically pre-rendered route in build output
  - [x] 2.4: Run dev server — navigate to `/blog/my-second-post` to confirm post renders correctly
  - [x] 2.5: Navigate to `/blog` — confirm `my-second-post` appears in index listing with title, date, description
  - [x] 2.6: After verification, **delete** `content/blog/my-second-post.mdx` (it is a test file — not a real post)
  - [x] 2.7: Run `npm run build` again to confirm clean build after deletion

- [x] Task 3: Build verification and final lint (AC: #1, #2, #3)
  - [x] 3.1: `npm run build` — exits zero (with only the real post in content/blog/)
  - [x] 3.2: `npm run lint` — no new errors
  - [x] 3.3: Verify `BLOG.md` at project root is the only new file committed (no app code touched)

## Dev Notes

### Critical: Frontmatter Format in This Repo

This is the most important thing to get right in `BLOG.md`. The repo does NOT use standard YAML frontmatter (`---...---`). It uses **JS object export syntax** via `remark-mdx-frontmatter`:

```mdx
export const frontmatter = {
  title: "Your Post Title Here",
  date: "2026-05-01",
  description: "Under 160 chars. Shown on /blog index and used for SEO meta description.",
  slug: "your-post-title-here",
}

Your post content starts here...
```

Why this matters:
- The blog index (`app/blog/page.tsx:30-38`) parses frontmatter with a custom regex that matches `key: "value"` or `key: 'value'` patterns — it works on the JS export syntax
- The post page (`app/blog/[slug]/page.tsx:64`) imports frontmatter as an ES module: `const { default: Post, frontmatter } = await import('@/content/blog/${slug}.mdx')`
- YAML `---...---` will NOT be recognized — the post will render without metadata

### Files to Create

| File | Status | Notes |
|---|---|---|
| `BLOG.md` | NEW | Publisher guide at project root |
| `content/blog/my-second-post.mdx` | NEW (temporary) | Workflow verification test post — delete after confirming build output |

No application code files are touched in this story. `BLOG.md` and the temporary test post are the only changes.

### BLOG.md Content Requirements

BLOG.md must include (in human-friendly language, not technical jargon):

1. **Overview**: one sentence explaining that new posts require only adding an MDX file and pushing to git
2. **Frontmatter format**: the JS export syntax with complete example
3. **Required fields table**:
   - `title`: string — the post title displayed as `<h1>` and in browser tab
   - `date`: ISO 8601 date string (`"YYYY-MM-DD"`) — shown on post page and used for sort order on /blog index
   - `description`: string under 160 characters — shown on /blog index and used for SEO meta description
   - `slug`: string — must match the filename exactly (without `.mdx`) — case-sensitive on Vercel
4. **Optional fields table**:
   - `heroImage`: path string (e.g. `"/blog/my-image.png"`) — hero image displayed above post header; place the image file in `public/blog/`
   - `heroImageAlt`: string — required if `heroImage` is set; descriptive alt text for accessibility
   - `heroImageCaption`: string — optional caption shown below the hero image
   - `canonicalUrl`: string — full absolute URL if the post was originally published elsewhere (LinkedIn, Medium, etc.)
5. **Slug convention**: lowercase-kebab-case, no spaces, no uppercase, matches filename without `.mdx`, is case-sensitive on Vercel Linux servers — e.g. filename `ai-native-building.mdx` → slug `ai-native-building` → URL `/blog/ai-native-building`
6. **3-step publish workflow**:
   ```
   Step 1: Create content/blog/your-slug.mdx with valid frontmatter
   Step 2: git add content/blog/your-slug.mdx && git commit -m "feat(blog): add [post title]"
   Step 3: git push
   ```
   Vercel auto-deploys on push to main — the post is live in ~1-2 minutes.
7. **Complete example post** showing all required + most optional fields
8. **"What NOT to touch"** section: a short list confirming no app code changes are needed

### Test Post for Verification

The test post `content/blog/my-second-post.mdx` should use this structure:

```mdx
export const frontmatter = {
  title: "Test Post — Workflow Verification",
  date: "2026-04-30",
  description: "A temporary test post to verify the publisher workflow works end-to-end. Will be deleted before commit.",
  slug: "my-second-post",
}

This is a test post for verifying the blog publisher workflow described in BLOG.md.
```

**Delete this file after build verification passes.** It is not a real post and should not be in the final commit.

### What to Verify in Build Output

When running `npm run build` with `my-second-post.mdx` present, look for:
```
Route (app)                  Size    First Load JS
├ ● /blog/[slug]             ...
│   ├ /blog/AI-PM-skills-article
│   └ /blog/my-second-post    ← this must appear
```

The `●` symbol confirms static pre-rendering via `generateStaticParams()`.

### Slug URL Mapping (for BLOG.md accuracy)

Current live example from the repo:
- File: `content/blog/AI-PM-skills-article.mdx`
- Frontmatter slug: `"AI-PM-skills-article"`
- URL: `/blog/AI-PM-skills-article`

Note: This slug is not lowercase-kebab (it uses uppercase `AI`). BLOG.md should recommend lowercase-kebab as the standard going forward, but note that the system is case-preserving — the filename and `slug` field in frontmatter must match exactly.

### Open GitHub Issues — Relevance Check

As of 2026-04-29 (`gh issue list --repo goehmen/gregoehmen-io --state open`):
- #13: Track 1 card orphans at sm breakpoint (Services) — not in scope
- #12: Duplicate CTAs lack aria-label (Services) — not in scope
- #9: aria-controls absent from DOM when mobile menu closed (Header) — not in scope

No open issues affect files touched in this story.

### Architecture Compliance

- ARCH12: BLOG.md at project root — this story delivers it
- FR24–FR27: All covered by BLOG.md + verified workflow
- No `tailwind.config.js` created (not needed — this is a docs story)
- No app code modified — pure documentation + workflow verification
- The test post uses the same frontmatter format as the existing `AI-PM-skills-article.mdx`

### Key Learnings from Stories 2.1–2.3

- MDX frontmatter is JS export syntax (`export const frontmatter = {...}`), not YAML — this is the most common mistake a publisher could make; BLOG.md must be explicit
- Slug and filename are case-sensitive on Vercel (Linux file system) — a lowercase-kebab recommendation prevents future surprises
- `generateStaticParams()` in `app/blog/[slug]/page.tsx` reads all `.mdx` files in `content/blog/` at build time — no code change needed to add new posts
- `app/blog/page.tsx` reads the same directory at runtime for the index listing — sorted by `date` field descending
- Optional `heroImage` paths are relative to `public/` directory (e.g., `"/blog/image.png"` maps to `public/blog/image.png`)

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 2.4 ACs, FR24–FR27, ARCH12]
- [Source: _bmad-output/planning-artifacts/epics.md — ARCH5 (frontmatter schema), ARCH6 (index reads), ARCH7 (generateStaticParams)]
- [Source: app/blog/page.tsx:30-38 — parseFrontmatter() uses regex on JS export syntax, not gray-matter]
- [Source: app/blog/[slug]/page.tsx:64 — frontmatter imported as ES module export from .mdx file]
- [Source: content/blog/AI-PM-skills-article.mdx:1-10 — live example of current frontmatter format]
- [Source: _bmad-output/project-context.md — MDX blog gotchas, slug case-sensitivity, TypeScript rules]

## Smoke Test Checklist

Run manually against `localhost:3000` before marking done.

### BLOG.md Content

- [ ] `BLOG.md` exists at project root (not inside a subdirectory)
- [ ] BLOG.md documents `title`, `date`, `description`, `slug` as required fields
- [ ] BLOG.md explains date format: ISO 8601 (`"YYYY-MM-DD"`)
- [ ] BLOG.md explains description limit: under 160 characters
- [ ] BLOG.md explains slug must match filename exactly (case-sensitive)
- [ ] BLOG.md includes 3-step workflow: create file → git commit → git push
- [ ] BLOG.md includes a complete example frontmatter block

### Workflow Verification (with test post)

- [ ] Create `content/blog/my-second-post.mdx` with valid frontmatter
- [ ] `npm run build` — exits zero
- [ ] Build output shows `/blog/my-second-post` as a statically pre-rendered route (`●`)
- [ ] Dev server: navigate to `/blog/my-second-post` — post renders with title and content
- [ ] Dev server: navigate to `/blog` — `my-second-post` appears in the listing with title, date, description
- [ ] "← Back to blog" link on test post navigates to `/blog`
- [ ] Email capture form visible on test post page
- [ ] Delete `content/blog/my-second-post.mdx`
- [ ] `npm run build` — exits zero after deletion (only `AI-PM-skills-article` in build output)

### Build Verification

- [ ] `npm run build` exits zero (final, clean state)
- [ ] `npm run lint` — no new errors

### Regression

- [ ] Home page renders at `/`
- [ ] `/blog` index renders correctly (only `AI-PM-skills-article` listed)
- [ ] `/blog/AI-PM-skills-article` renders correctly
- [ ] Header and Footer visible on all blog pages
- [ ] Calendly `#book` anchor functional on home page

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (create-story)

### Debug Log References

None.

### Completion Notes List

- Created `BLOG.md` at project root with all required sections: JS export frontmatter format, required fields table, optional fields table, slug convention, 3-step publish workflow, complete example post, and "What NOT to Touch" section.
- Created test post `content/blog/my-second-post.mdx`; verified it rendered at `/blog/my-second-post` and appeared on `/blog` index with correct title, date, description.
- Deleted test post after verification; clean build confirmed with only `AI-PM-skills-article` in route output.
- `npm run build` exits zero; `npm run lint` no errors. No app code was modified.

### File List

- `BLOG.md` (new)

### Change Log

- 2026-04-29: Created `BLOG.md` — publisher documentation for blog workflow (Story 2.4)

### Review Findings

- [x] [High][Review][Patch] Slug convention contradicts existing post — BLOG.md recommends lowercase-kebab-case but `AI-PM-skills-article.mdx` uses mixed-case; doc should note the existing post is an exception and the convention applies to new posts going forward [BLOG.md:53]
- [x] [Medium][Review][Patch] heroImageAlt warning overstates consequence — "will fail accessibility requirements" is inaccurate; code silently falls back to `frontmatter.title` (`app/blog/[slug]/page.tsx:85`); update warning to describe actual behavior [BLOG.md:45]
- [x] [Medium][Review][Patch] Regex parser silently truncates frontmatter values with apostrophes or double-quotes — `app/blog/page.tsx` uses `[^"']+` regex pattern; a description like `"Greg's reflection..."` truncates at the apostrophe on the index; add a note warning against apostrophes/quotes in frontmatter string values [BLOG.md:32-37]
- [x] [Medium][Review][Patch] `git push` workflow does not clarify that publisher must be on the main branch — Vercel only auto-deploys on push to main; add note to confirm you are on the `main` branch before pushing [BLOG.md:63-73]
- [x] [Low][Review][Patch] mdxRs Rust compiler rejects raw `<` or `>` characters in prose — `next.config.ts` enables `mdxRs: true`; natural prose with comparisons (`x < y`) or bare email addresses (`<email@domain.com>`) will cause build failure; add a brief content authoring note [BLOG.md — "What NOT to Touch" section]
- [x] [Low][Review][Patch] "3-Step Workflow" heading is inconsistent with Step 2 containing two separate git commands (`git add` + `git commit`) — either rename heading to "Publish Workflow" or combine into `git add … && git commit …` [BLOG.md:63]
- [x] [Low][Review][Patch] canonicalUrl example uses an invalid placeholder LinkedIn URL (`urn:li:ugcPost:example/`) — replace with a clearly fake example like `https://www.linkedin.com/pulse/your-article-title/` [BLOG.md:89]
- [x] [Medium][Review][Defer] Blog index derives slug from filename not from slug frontmatter field — `app/blog/page.tsx:45` uses `f.replace('.mdx', '')` ignoring the `slug` field entirely; the guidance ("slug must match filename exactly") remains correct but the mechanism differs from what the doc implies — deferred, pre-existing code behavior [`app/blog/page.tsx:45`]
- [x] [Low][Review][Defer] Malformed date silently corrupts blog index sort order — `new Date(a.date).getTime()` produces `NaN` for non-ISO strings causing unpredictable sort; doc already states ISO 8601 format is required — deferred, pre-existing code behavior [`app/blog/page.tsx:50-51`]

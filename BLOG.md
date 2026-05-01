# Publishing a Blog Post on gregoehmen.io

Adding a new post requires only a text editor and git — no engineering involvement, no configuration changes, no deployments to trigger manually.

---

## Frontmatter Format

**Important:** This blog does NOT use standard YAML frontmatter (`---...---`). Posts use a JavaScript object export at the top of the `.mdx` file:

```mdx
export const frontmatter = {
  title: "Your Post Title Here",
  date: "2026-05-01",
  description: "Under 160 characters. Shown on the /blog index and used for SEO meta description.",
  slug: "your-post-title-here",
}

Your post content starts here...
```

The frontmatter block must come **before** any other content in the file.

---

## Required Fields

| Field | Type | Constraints |
|---|---|---|
| `title` | string | Displayed as the `<h1>` heading and in the browser tab |
| `date` | string | ISO 8601 format: `"YYYY-MM-DD"` (e.g. `"2026-05-01"`). Used for sort order on the /blog index. |
| `description` | string | **Under 160 characters.** Shown on the /blog index and used as the SEO meta description. **Do not use apostrophes or quotation marks** in any frontmatter string value — they will cause the value to be silently truncated on the blog index. |
| `slug` | string | **Must match the filename exactly** (without `.mdx`). Case-sensitive. See slug convention below. |

---

## Optional Fields

| Field | Type | Notes |
|---|---|---|
| `heroImage` | string | Path to a hero image (e.g. `"/blog/my-image.png"`). Place the image file in `public/blog/`. |
| `heroImageAlt` | string | **Required if `heroImage` is set.** Descriptive alt text for accessibility. |
| `heroImageCaption` | string | Optional caption shown below the hero image. |
| `canonicalUrl` | string | Full absolute URL if the post was originally published elsewhere (LinkedIn, Medium, etc.). |

> **Warning:** If you set `heroImage`, you should also set `heroImageAlt`. If omitted, the post title is used as the alt text, which is often a poor description of the image and fails accessibility best practices.

---

## Slug Convention

- Use **lowercase-kebab-case**: all lowercase, words separated by hyphens, no spaces, no uppercase
- The slug must **match the filename exactly** (without `.mdx`)
- Slug is **case-sensitive on Vercel** (Linux file system) — `My-Post` and `my-post` are different URLs
- Example: filename `thinking-in-systems.mdx` → slug `"thinking-in-systems"` → URL `/blog/thinking-in-systems`

> **Note:** The existing post `AI-PM-skills-article.mdx` uses a mixed-case slug and was published before this convention was established. It is the exception. All new posts should use lowercase-kebab-case.

---

## 3-Step Publish Workflow

> **Before you start:** Make sure you are on the `main` branch. Vercel only auto-deploys on push to `main`.

```
Step 1: Create content/blog/your-slug.mdx with valid frontmatter and your content

Step 2: git add content/blog/your-slug.mdx && git commit -m "feat(blog): add [post title]"

Step 3: git push
```

Vercel auto-deploys on push to main. The post is live in approximately 1–2 minutes.

---

## Complete Example Post

```mdx
export const frontmatter = {
  title: "Thinking in Systems",
  date: "2026-06-01",
  description: "A reflection on how systems thinking changed the way I approach product decisions.",
  slug: "thinking-in-systems",
  heroImage: "/blog/thinking-in-systems.jpg",
  heroImageAlt: "A diagram of interconnected feedback loops drawn on a whiteboard",
  heroImageCaption: "Feedback loops — the building blocks of complex systems.",
  canonicalUrl: "https://www.linkedin.com/pulse/your-article-title-greg-oehmen/",
}

When I first encountered Donella Meadows' work on systems thinking, I expected an academic framework...
```

File saved as: `content/blog/thinking-in-systems.mdx`

---

## What NOT to Touch

You do **not** need to modify any of the following — the blog picks up new posts automatically:

- `app/` — no application code changes needed
- `next.config.ts` — no configuration changes needed
- `package.json` — no dependency changes needed
- Any Vercel settings — deployment is automatic on push to main

The only file you create is `content/blog/your-slug.mdx`.

---

## Content Authoring Notes

- **Avoid raw `<` and `>` characters in prose.** The MDX compiler is strict — bare angle brackets (e.g. `x < y`, `<email@example.com>`) will cause a build failure. Use `&lt;` and `&gt;` instead, or rephrase.
- **Avoid apostrophes and quotes in frontmatter values.** The blog index parser will silently truncate any frontmatter string at the first `'` or `"` inside the value. Use curly apostrophes (`'`) or rephrase to avoid them.

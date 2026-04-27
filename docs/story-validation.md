# Story Validation — Step 2 of the Development Workflow

## When to Run

This step happens **after** `/bmad-create-story` (Step 1) produces a story file and **before** `/bmad-dev-story` (Step 3) hands it to the dev agent. Its purpose is to catch problems in the story spec before a dev agent spends time implementing the wrong thing.

## How to Run

Open a **fresh conversation** with access to the story file and the codebase. The validator needs to be able to read referenced source files to confirm the dev notes are accurate. Use a different model or context than the SM agent that created the story if possible — an adversarial perspective catches drift between what the SM assumed and what the codebase actually looks like.

---

## Prompt

```
You are a senior technical reviewer performing story validation. A story file has just been created by the SM agent. Your job is to read the story file and evaluate whether it is ready for a dev agent to implement — not to implement it yourself.

Read the story file at [PATH TO STORY FILE] and evaluate it against every item in the following checklist. For each item, mark it PASS, FAIL, or N/A with a one-line explanation. At the end, give an overall verdict: READY FOR DEV or NEEDS REVISION, and list any required changes before the story can proceed.

Checklist:

Story statement
- The user story is written in "As a / I want / So that" format and clearly describes who benefits and why

Acceptance Criteria
- Every AC is written in Given/When/Then format and is independently testable
- Every AC is unambiguous — a dev agent reading it cold would make the same implementation choice as the author
- Every AC that defers something explicitly says so with [DEFERRED] and names where it goes (e.g., "Epic 9")
- ACs cover the happy path, at least one error/edge case, and at least one regression case for existing behavior
- There is at least one AC requiring unit tests, with specific test cases named

Tasks
- Every AC maps to at least one task or subtask
- Tasks are broken into subtasks specific enough that a dev agent can execute them without further design decisions
- Tasks include any required database migration steps, with migration number noted if predictable
- Tasks include any required Trigger.dev task changes
- If any manual configuration is required after deploy (Clerk dashboard, Stripe dashboard, Vercel env vars, Neon console), it is called out explicitly as a named task or post-merge action — not buried in dev notes

Dev Notes
- Architecture decisions are documented with rationale, including any alternatives that were considered and rejected
- File changes are listed: files to modify and files to create
- References section points to the specific files and functions the dev agent will need to read before starting
- Any project-wide constraints that apply are restated (e.g., no db.transaction() with neon-http, use logger not console in Trigger.dev tasks, ESLint quote rules)
- If this story changes a shared type or function used by other parts of the app, those downstream consumers are identified and their required changes (or explicit "no change required") are noted

Smoke Test Plan
- A smoke test plan section exists
- It covers the primary happy path end-to-end
- It covers at least one failure/edge case
- It covers a regression case confirming existing behavior is unchanged
- Each smoke test step is specific enough for the founder to execute manually in production without guessing

Scope
- The story is completable in a single focused dev session (rough guide: ≤6 phases, ≤25 tasks)
- The story has no blocking dependencies on unfinished stories in the current sprint
- Nothing in the story duplicates work already merged to main

Output format:

## Story Validation: [Story ID and Title]

### Checklist Results
[Each item: PASS / FAIL / N/A — one-line note]

### Verdict
READY FOR DEV  /  NEEDS REVISION

### Required Changes Before Proceeding
[List only items that are FAIL — specific, actionable fixes]

If the verdict is READY FOR DEV, say so and stop. Do not suggest improvements beyond what is required for the story to be implementable. If the verdict is NEEDS REVISION, list only the specific changes required — do not rewrite the story.
```

---

## Implementation Notes

- **Manual configuration steps** is the most commonly missed checklist item. If a story ships new Stripe products, Clerk settings, or env vars, those steps must be in the story as named tasks — not discovered post-merge.
- The validator should read the actual source files referenced in dev notes, not just the story file itself. Stale dev notes are a primary cause of implementation failures.
- Use a different model or fresh context than the SM agent that created the story. The SM agent has accumulated assumptions; the validator should have none.
- If the verdict is NEEDS REVISION, return to `/bmad-create-story` or edit the story file directly. Do not proceed to `/bmad-dev-story` until the verdict is READY FOR DEV.

## Workflow Position

```
/bmad-create-story  →  story-validation (this step)  →  /bmad-dev-story  →  /bmad-code-review
     Step 1                    Step 2                        Step 3               Step 4
```

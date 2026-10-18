# Teach the 10 → 11+ version delta alongside the main material

Ahmed's request, 2026-10-12, after being told Ethaaf runs Laravel 10 rather than 13: *"what if
you teach me the difference along the way?"* Adopted.

**Why this is the right call for this mission.** It is not completionism. Three concrete payoffs:

1. **Ethaaf is past EOL and will eventually be upgraded.** Whoever already understands the delta
   is positioned to lead that work — directly serving the promotion goal in MISSION.md.
2. **Most material he will encounter targets 11+.** Blog posts, Stack Overflow answers and AI
   suggestions written since early 2024 assume the new skeleton. Recognising "that is an 11+
   feature" converts a lost afternoon into a two-second judgement.
3. **It is cheap when scoped correctly** — these are recognition facts, not skills.

**How it is scoped, to protect working memory:**

- **Ethaaf's version is always the default**, taught as the real thing, never as "the old way"
- Deltas are **sidebars** (`assets/version.css`, the `.vshift` component) — visually secondary,
  skippable on first read
- They appear **only where the difference would actually bite**: in his editor, in a search
  result, in a PR review
- **Never in quizzes.** Retrieval practice stays on job-relevant skills; version trivia would
  trade real competence for recognition noise
- A consolidated **delta table lives in Reference 04**, so the lessons stay light and the
  reference carries the weight

## Two corrections this prompted

**1. The skeleton restructure is opt-in, not forced.** I had implied `bootstrap/app.php` was the
main upgrade obstacle. Laravel's own guide says the opposite: *"we do not recommend that Laravel
10 applications upgrading to Laravel 11 attempt to migrate their application structure."*
Estimated upgrade time is **15 minutes**. The real high-impact items are `->change()` dropping
unstated column modifiers, the float/double rewrite, and Sanctum 3 → 4 (Ethaaf is on `^3.2`).

**2. Ethaaf already enables `preventLazyLoading`.** Found in
`app/Providers/AppServiceProvider.php::preventNPlusOneQueries()` — throws locally, logs outside
production, permissive in production. Lesson 4 originally suggested proposing this as a
contribution; that would have been embarrassing and has been corrected to explain the existing
guard instead.

**Standing lesson: grep the repo before suggesting any improvement to it.** Same class of error
as the version assumption — asserting without checking. Both caught, but both were avoidable.

## Implication for future lessons

Every lesson from 4 onward carries a short "version shift" section where one is warranted. When
no meaningful delta exists for a topic, omit it rather than manufacture one.

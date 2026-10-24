# Mission change: from promotion to employability

Ahmed's job is ending — confirmed layoff, reported 2026-10-18. The mission changes from
"promotion into backend work at the current job" to "**hireable as a Laravel developer**."

## What changes

| | Before | After |
|---|---|---|
| Goal | Promotion via Ethaaf PRs | Pass interviews, be productive anywhere |
| Ethaaf's role | The destination | The **worked example** |
| Default version | Laravel 10 (Ethaaf's) | **Laravel 12**, with 13 and 10 as sidebars |
| Bias | Reading existing code | **Reading *and* writing from blank** |
| Success metric | A merged PR at work | Explaining concepts under interview conditions |

## Version decision, and why 12 rather than 13

Ahmed asked for 12/13 as default with "a little bit, not a lot" of 10 — he may well join a team
running an older version, and being able to say *"I've worked in a Laravel 10 codebase, here's
what differs"* is a real asset.

**Chose 12, not 13**, after checking the support policy:

| Version | PHP | Released | Security until |
|---|---|---|---|
| 10 | 8.1–8.3 | Feb 2023 | **Feb 2025 (EOL)** |
| 11 | 8.2–8.4 | Mar 2024 | Mar 2026 |
| 12 | 8.2–8.5 | Feb 2025 | **Feb 2027** |
| 13 | 8.3–8.5 | Mar 2026 | Mar 2028 |

Laravel 13 is only ~7 months old and requires PHP 8.3+. Most postings and production apps will
say 11 or 12. Laravel 12 is the safest interview baseline; 11→12→13 differences are small
compared with the 10→11 skeleton change, so teaching 12 covers 11 and 13 readers well.

**Three-tier version model now:** Laravel 12 default · Laravel 13 additions flagged briefly ·
Laravel 10 differences as light sidebars (Ethaaf is the live example of a 10 codebase).

## The "compress the fundamentals" correction

I offered to "compress the fundamentals" given the time pressure. Ahmed challenged it directly:
*"why would you compress the fundamentals, would that affect my learning understanding?"*

**He was right and I was wrong to phrase it that way.** Compressing understanding is precisely
the wrong trade for interview preparation, because interviews test **storage strength** — durable
understanding under unfamiliar framing — not **fluency**. A memorised fact ("apiResource makes
five routes") fails the follow-up ("why not resource?"); an understood one answers it.

Corrected approach, now written into MISSION.md: **cut topics, never understanding.** Queues,
broadcasting, Octane and the AI SDK are dropped entirely; every surviving topic keeps full
treatment and all its retrieval practice. Added **"explain it out loud" tasks** — retrieval
practice and interview rehearsal in one.

**Teaching note:** Ahmed pushes back on pedagogy when it sounds wrong. This is the second time
(the first was asking for version deltas, LR-0005). Treat these as high-value signals — he is
thinking about *how* he learns, which predicts good outcomes. Answer them substantively rather
than just complying.

## Portfolio: deferred, deliberately

Asked whether to build something public. He chose **lessons only for now** — competence first.
Respect it, but revisit: with no merged Ethaaf PR now likely, a public artifact is the main
evidence a hiring manager can inspect. Raise again around Lesson 8, not before.

## Implications for lessons

- **Writing from blank enters scope.** Reading-only was right for the promotion mission; it is
  insufficient now. Lesson 5 onward should include authoring.
- **Interview framing throughout** — each lesson should surface the question it answers.
- **Multi-tenancy is a differentiator**, not just a hazard. Most junior candidates have never
  seen it; he has read a production implementation. Teach him to *talk about* it.
- **Keep Ethaaf.** Access persists, and a real codebase beats invented examples. Its Laravel 10
  version now makes it a bonus teaching surface rather than a constraint.

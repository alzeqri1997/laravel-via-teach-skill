# Working Notes

## Teaching approach that fits Ahmed

- **Bridge from frontend, always.** He has 4 years of real frontend instinct. Every new backend
  concept should land as "this is the X you already know, but authoritative." The analogy table
  in Reference 01 is the running spine of this — extend it as new concepts arrive.
- **Name where the analogy breaks.** Analogies that are not bounded become misconceptions later.
  Every bridge gets a "where this breaks down" column.
- **Vue is the strongest transfer surface.** If the work codebase uses Inertia + Vue, huge amounts
  of his existing skill transfer directly and the path shortens considerably.
- **Read before write.** The mission is contributing to an existing codebase, so "open this file
  and explain it" beats "build this from blank" as a lesson format.

## Environment (verified 2026-08-09)

- Windows 11 Home, Laragon stack
- PHP 8.3.30 · Composer 2.10.2 · Node 25.2.1
- `laravel` installer and `mysql` are not on PATH — both fine (Laragon bundles its own MySQL;
  `composer create-project` replaces the installer). Only worth fixing if it starts to bite.
- **PHP 8.3.30 satisfies Laravel 13's 8.3+ requirement.** No upgrade needed.

## Open questions blocking precision

Asked at the end of Lesson 1. **Question 3 answered 2026-09-23: API-only, separate SPA**
(see LR-0003) — this was the one that reshaped the path. Still outstanding:

1. Laravel version of the work codebase (`php artisan --version`)
2. Multi-tenancy approach — `stancl/tenancy`, `spatie/laravel-multitenancy`, or hand-rolled
3. ~~Frontend layer~~ — **answered: Laravel serves JSON, frontend is a separate SPA**
4. Does it have a test suite?

Ahmed has **no repo access** as of 2026-09-23, so lessons must stay runnable without it.
Predict-then-verify tasks work well here and are being used deliberately.

## Curriculum sketch (revised 2026-09-23 after LR-0003 — API-only)

1. ✅ Request lifecycle — the spine everything hangs off
2. ✅ Reading an API endpoint — the four files: route → controller → model → resource
3. Eloquent — retrieval, relationships (halaqa → students → progress), and the **N+1 trap**
   (explicitly teased at the end of Lesson 2 — he may ask about it first)
4. Validation — Form Requests, taught through the **422 JSON payload** the SPA receives
5. Migrations — adding a column, then surfacing it through the Resource (ties back to L2)
6. Tenant scoping — global scopes, and how the codebase actually enforces isolation
7. Testing — an endpoint test that lets him open a PR with confidence
8. First real pull request

**Blade is out of scope** — API-only codebase. Mention only for recognition.
Interleave PHP syntax as needed rather than front-loading it. The lifecycle is now on a spaced
schedule: taught L1, re-tested cold in L2, test again around L4.

## Session log

- **2026-08-09** — Workspace created. Mission established (promotion via existing multi-tenant
  halaqa codebase). LR-0001, LR-0002 written. Assets: `course.css`, `quiz.css`, `quiz.js`.
  Lesson 1 + Reference 01 shipped. Awaiting codebase recon answers.
- **2026-09-23** — Codebase confirmed **API-only, separate SPA** (LR-0003); no repo access yet.
  Curriculum revised: Blade dropped, API Resources promoted. Lesson 2 (reading an API endpoint)
  + Reference 02 (endpoint anatomy) shipped. New asset: `trace.css`. Lesson 2 opened with cold
  retrieval of the L1 lifecycle — first spaced-repetition beat. All Laravel claims verified
  against 13.x docs before writing. Task set: predict-the-backend from a known SPA response.

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

## Stated preferences

- **Teach the 10 → 11+ version delta alongside the main material** (asked 2026-10-12, LR-0005).
  Scoped as skippable sidebars via the `.vshift` component; Ethaaf's version is always the
  default; **never in quizzes**. Consolidated delta table lives in Reference 04.
- He asks good meta-questions about the teaching itself ("is 10 different from 13?", "what if you
  teach me the difference"). Treat these as signal that he wants to understand the *shape* of
  what he is learning, not just the content. Answer them properly.

## Teaching discipline (learned from two errors)

**Grep the repo before asserting anything about it.** Two avoidable mistakes so far:
1. Taught two lessons against Laravel 13 docs without checking the version (LR-0004)
2. Suggested proposing `preventLazyLoading` as a contribution — Ethaaf already enables it in
   `AppServiceProvider::preventNPlusOneQueries()` (LR-0005)

Both were caught before reaching him in final form, but the pattern is the same: asserting
without verifying. **Check the codebase, then teach.**

## Environment (verified 2026-08-09)

- Windows 11 Home, Laragon stack
- PHP 8.3.30 · Composer 2.10.2 · Node 25.2.1
- `laravel` installer and `mysql` are not on PATH — both fine (Laragon bundles its own MySQL;
  `composer create-project` replaces the installer). Only worth fixing if it starts to bite.
- **PHP 8.3.30 satisfies Laravel 13's 8.3+ requirement.** No upgrade needed.

## Codebase: RESOLVED 2026-10-11

Repo access granted: **`C:\laragon\www\ethaaf`**. All Lesson 1 questions answered — see LR-0004.

1. **Laravel 10.50.2** — NOT 13. Lessons 1–2 were taught against 13.x docs; corrected openly
   at the top of Lesson 3. **Always read `/docs/10.x/` now.**
2. **Multi-tenancy: `stancl/tenancy` 3.8, single-database**, separated by a `tenant_id` column
3. **Frontend: API-only** + a Filament admin panel at `/admin`
4. **Tests: yes** — Unit, Feature, Architecture. Plus PHPStan, deptrac, Pint.

Extra findings: `nwidart/laravel-modules` (code in **both** `app/` and `Modules/`), Sanctum +
`spatie/laravel-permission`, and a **Service/Repository** architecture with thin controllers.

**`C:\laragon\www\ethaaf\CLAUDE.md` is the best teaching resource available** — a 122-line
team-written architecture guide. Outranks any external tutorial.

### Standing teaching rule learned the hard way
Never pitch a version before the codebase is known. Teach version-general, or ask. Two lessons
were written against the wrong major version.

## Curriculum sketch (revised 2026-10-12)

1. ✅ Request lifecycle
2. ✅ Reading an API endpoint — the four files
3. ✅ First real trace — Ethaaf's association students endpoint + the tenancy hazard
4. ✅ Eloquent — relationships, eager loading, **N+1**, + the first version-delta section
5. Service/Repository pattern — **where his own code goes when he writes it**. The shift from
   reading to writing; last stop before he can safely author something.
6. Validation — Form Requests via the 422 payload (`MeasurementFormRequest` is a real example
   with a `withValidator()` rule: grades must sum to 100)
7. Tenant scoping in depth — `TenantScope`, actor scopes, central-context trap
8. Testing — read an existing Feature test, then write one
9. First real pull request — Pint + PHPStan + tests green

**Candidate first ticket identified:** `performance-risk-report.md` is a backlog of measured,
unassigned N+1 bugs. A documented fix there is close to an ideal first PR — diagnosis already
written, mechanical local fix, improvement measurable in a number. He was asked in Lesson 4 to
pick one and bring his reasoning.

## Session log

- **2026-08-09** — Workspace created. Mission established (promotion via existing multi-tenant
  halaqa codebase). LR-0001, LR-0002 written. Assets: `course.css`, `quiz.css`, `quiz.js`.
  Lesson 1 + Reference 01 shipped. Awaiting codebase recon answers.
- **2026-09-23** — Codebase confirmed **API-only, separate SPA** (LR-0003); no repo access yet.
  Curriculum revised: Blade dropped, API Resources promoted. Lesson 2 (reading an API endpoint)
  + Reference 02 (endpoint anatomy) shipped. New asset: `trace.css`. Lesson 2 opened with cold
  retrieval of the L1 lifecycle — first spaced-repetition beat. All Laravel claims verified
  against 13.x docs before writing. Task set: predict-the-backend from a known SPA response.
- **2026-10-11** — **Repo access granted.** Full recon of Ethaaf (LR-0004). Discovered the
  version error (10.50.2, not 13) and corrected it openly in Lesson 3. Lesson 3 (first real
  trace, through the live association-students endpoint) + Reference 03 (Ethaaf field guide)
  shipped. Tenancy hazard taught from the team's own `CLAUDE.md`: **TenantScope is a no-op in
  central context.** Task set: run `route:list`, trace an endpoint he personally built a screen
  against, read `CLAUDE.md`.
- **2026-10-12** — Asked whether 10 differs from 13, then asked for the delta to be taught
  alongside (LR-0005). New asset: `version.css` (`.vshift` sidebars, impact badges). Lesson 4
  (relationships + N+1, from the real `AssociationStudentRepository` and the 10,000-query
  performance report) + Reference 04 (Eloquent recipes + full version delta) shipped. Corrected
  two of my own errors: the 11 skeleton is **opt-in** (15-min upgrade, not a rewrite), and Ethaaf
  **already enables** `preventLazyLoading`. Task set: count queries in Telescope, pick one N+1
  from the report and bring the reasoning.

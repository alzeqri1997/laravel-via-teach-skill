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

## Curriculum: 10 lessons total (set 2026-10-18, LR-0006)

A finite, committed plan — Ahmed asked how many lessons there would be. The answer is **10**,
with 1–5 done and 5 remaining. Interview-readiness is the bar, not exhaustive coverage.

| # | Lesson | Status | Interview question it answers |
|---|---|---|---|
| 1 | Request lifecycle | ✅ | "What happens when a request hits Laravel?" |
| 2 | Reading an API endpoint | ✅ | "How is a Laravel API structured?" |
| 3 | First real trace (Ethaaf) + tenancy | ✅ | "Tell me about multi-tenancy" |
| 4 | Eloquent, relationships, N+1 | ✅ | "What is the N+1 problem?" (near-guaranteed) |
| 5 | Building an endpoint from blank | ✅ | "Walk me through adding a POST endpoint" |
| 6 | Auth — Sanctum, policies | ✅ | "How does API auth work? 401 vs 403?" |
| 7 | Testing — feature tests, factories | ✅ | "How do you test an endpoint?" **Biggest differentiator** |
| 8 | Eloquent II — queries, scopes, transactions | ✅ | "How would you build this query?" |
| 9 | Architecture — services, DI, container | ✅ | "Where does business logic belong?" |
| 10 | Interview prep — mock Q&A, take-home strategy | ✅ | All of it, out loud |

**ALL 10 LESSONS COMPLETE (2026-10-18).** The course as designed is finished. What remains is
practice, not more lessons — see "After the course" below.

**If time is short, 6 and 7 matter most.** Auth is asked in nearly every interview; tests are
what separate candidates who have shipped from those who have only studied.

## After the course — what to push for now

Lessons are done; these are higher-value than any eleventh lesson:

1. **Mock interview.** Offered at the end of Lesson 10 and the single most useful thing to do
   next. Ten questions, graded. Push for this before his first real interview.
2. **The portfolio piece.** He deferred it 2026-10-18 and I agreed to revisit at Lesson 10 —
   **that point has arrived.** With no merged Ethaaf PR now likely, a small tested API on GitHub
   is the only evidence a hiring manager can inspect. A halaqa-shaped app plays to his domain
   knowledge. Raise it, do not nag.
3. **Real artefacts.** Take-home tests, questions he fumbled, code review. Far more useful than
   synthetic exercises now.
4. **Queues**, if a posting demands them — deliberately cut, worth a weekend later.

### Spaced repetition is now the binding constraint
He has met every core concept once. Retention, not coverage, is what fails in interviews.
Every future session should open with cold retrieval across lessons, not a single lesson's
material — interleaving beats blocking for durability.

**Out of scope, deliberately:** queues, broadcasting, Octane, Pennant, AI SDK, vector search,
deployment. Real Laravel, rarely asked at this level, expensive in time.

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
- **2026-10-18** — **Mission changed: layoff confirmed** (LR-0006). Goal is now employability,
  not promotion. Default version switched to **Laravel 12** (not 13 — 12 is what postings run,
  PHP 8.2+, supported to Feb 2027); Ethaaf's 10 and Laravel 13 become sidebars. He pushed back on
  my phrase "compress the fundamentals" — **he was right**; corrected to "cut topics, never
  understanding," now written into MISSION.md. Portfolio deferred at his request. Lesson 5
  (building an endpoint from blank, first writing lesson, with Ethaaf's `MeasurementFormRequest`
  as the worked example) + Reference 05 (build checklist + interview answers) shipped. **Course
  scoped to 10 lessons** in response to his asking how many.
- **2026-10-18 (later)** — Asked to build the remaining lessons in one go. **Shipped 6–10:**
  auth (Sanctum's two modes, policies, 401/403), testing (feature tests, the four cases,
  factories), Eloquent II (retrieval methods, scopes — **both** `scopeX()` and the Laravel 12
  `#[Scope]` attribute — transactions, chunking), architecture (container, DI, **when not to
  add layers**), and interview prep (ten questions, the honest multi-tenancy story, take-home
  strategy, handling what you don't know). Plus Reference 06 (auth + testing). All claims
  verified against 12.x docs; all internal links checked programmatically. **Course complete.**

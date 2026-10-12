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

## Curriculum sketch (revised 2026-10-11 — grounded in Ethaaf)

1. ✅ Request lifecycle
2. ✅ Reading an API endpoint — the four files
3. ✅ First real trace — Ethaaf's association students endpoint + the tenancy hazard
4. Eloquent in Ethaaf — relationships, eager loading, **N+1** (read from real repository code)
5. The Service/Repository pattern — where logic belongs when he writes his own
6. **Tenant scoping in depth** — `TenantScope`, actor scopes, the central-context trap
7. Validation — Form Requests via the 422 payload (`MeasurementFormRequest` is a real example)
8. Testing — read an existing Feature test, then write one. **Moved earlier**: a real suite
   exists, and it is the mission's final success criterion.
9. First real pull request — Pint + PHPStan + tests green before opening

**Blade out of scope.** Filament exists but is not the mission — mention only as a central
context where the tenant scope is OFF.

### The strongest teaching move available
Ahmed consumed these exact endpoints from the SPA for years. "You have seen this JSON — here is
the file that produced it" works repeatedly and should be reused.

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

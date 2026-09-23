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

Asked at the end of Lesson 1. Until answered, teaching stays version-general:

1. Laravel version of the work codebase (`php artisan --version`)
2. Multi-tenancy approach — `stancl/tenancy`, `spatie/laravel-multitenancy`, or hand-rolled
3. Frontend layer — Blade, Inertia + Vue, or a separate SPA
4. Does it have a test suite?

Answer 3 in particular reshapes the whole path.

## Curriculum sketch (provisional — revise once the codebase is known)

1. ✅ Request lifecycle — the spine everything hangs off
2. Reading a controller; tracing one real feature end-to-end
3. Eloquent basics — models, retrieval, relationships (halaqa → students → progress)
4. Migrations — adding a column to an existing feature safely
5. Validation — Form Requests, why server-side is the real gate
6. Tenant scoping — global scopes, and how the codebase actually enforces isolation
7. Blade or Inertia+Vue, whichever the codebase uses
8. Testing — writing the test that lets him open a PR with confidence
9. First real pull request

Interleave PHP syntax as needed rather than front-loading it. Spaced retrieval of the lifecycle
across lessons 2–4 — it was taught once, it needs re-testing cold.

## Session log

- **2026-08-09** — Workspace created. Mission established (promotion via existing multi-tenant
  halaqa codebase). LR-0001, LR-0002 written. Assets: `course.css`, `quiz.css`, `quiz.js`.
  Lesson 1 + Reference 01 shipped. Awaiting codebase recon answers.

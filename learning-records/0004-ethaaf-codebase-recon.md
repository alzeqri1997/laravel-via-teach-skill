# Ethaaf: the real codebase, and a version correction

Repo access granted 2026-10-11 — `C:\laragon\www\ethaaf`. Every question open since Lesson 1 is
now answered, and one earlier assumption was **wrong**.

## The correction

**Lessons 1 and 2 were taught against Laravel 13 docs. Ethaaf runs Laravel 10.50.2.**

Nothing taught was invalidated — the request lifecycle, the four-file endpoint anatomy, route
model binding and API Resources are materially unchanged between 10 and 13. But the docs links
in Lessons 1–2 and References 01–02 point at 13.x and should be read as 10.x. Corrected openly
at the top of Lesson 3 rather than quietly, because *knowing which docs version applies* is
itself a skill worth teaching, and because the course's credibility rests on citations.

**Teaching rule going forward: never pitch a version before the codebase is known.** Say
"version-general" or ask. This is the cost of having taught two lessons blind.

## What Ethaaf actually is

Multi-tenant SaaS for Quran learning and mosque management. Tenants are mosques/schools (مجمع).

| Dimension | Reality |
|---|---|
| Framework | Laravel 10.50.2 (**EOL** — security support ended 2025-02-04) |
| Tenancy | `stancl/tenancy` ^3.8, **single-database**, `tenant_id` column |
| Structure | `nwidart/laravel-modules` — code in **both** `app/` and `Modules/` |
| Auth | Sanctum + `spatie/laravel-permission` (permission-guarded routes) |
| Architecture | Service/Repository pattern, thin controllers |
| Admin | Filament 3 at `/admin` |
| Tests | Yes — Unit, Feature, **Architecture** |
| Tooling | PHPStan, deptrac, Pint |

## The decisive finding: tenancy is more dangerous than assumed

LR-0002 predicted tenant isolation would be the main hazard. It is, and the mechanism is sharper
than a simple global scope:

> **`TenantScope` is a NO-OP when `tenancy()->initialized` is false.** — Ethaaf `CLAUDE.md`

So in central context (Filament, a plain queue job, a console command) `Teacher::query()` returns
**every tenant's rows**, silently. Also: bare `withoutGlobalScopes()` strips tenancy along with
actor scopes, and bulk `insert()` bypasses the `tenant_id` stamp.

**Implication:** "what context am I in?" must become a reflex before Ahmed writes any query. This
is taught as a hazard in Lesson 3 and gets a full lesson once Eloquent lands.

## The best resource is inside the repo

`C:\laragon\www\ethaaf\CLAUDE.md` (122 lines) is a team-written architecture guide covering
tenancy, modules, and the service/repository pattern. It outranks every external tutorial because
it describes *this* code. Assigned as Lesson 3's primary source — the first time the primary
source has not been external.

## Teaching implications

- **Examples come from real files now.** Lesson 3 traces
  `GET /api/v1/tenant/association/students` through its actual route → controller → service →
  repository → resource. Invented examples retire.
- **The reading order grows to six steps** — Service and Repository sit between controller and
  resource. That is Ethaaf's architecture, not Laravel's, and must be taught as such so Ahmed
  does not mistake house style for framework convention.
- **Ahmed has already consumed these endpoints** from the SPA side. "You have seen this JSON —
  here is the file that produced it" is the strongest available teaching move.
- **A real safety rail exists:** the test suite plus Pint plus PHPStan. Testing moves earlier in
  the curriculum than planned — he can verify a change before a PR, which directly serves the
  mission's final success criterion.
- **Arabic domain vocabulary is live in the code** (مجمع, حلقة, الفرع) — the gap flagged in
  RESOURCES.md is now filled from the codebase itself; glossary added to Reference 03.

# Mission: Laravel (Ethaaf)

## Why

Ahmed is a frontend developer (~4 years) whose workplace runs a multi-tenant Laravel
application for managing Quran memorization circles (halaqas) — **Ethaaf**, at
`C:\laragon\www\ethaaf`. He wants to stop being
frontend-only and start picking up backend tickets in that existing codebase — reading it
confidently, changing it safely, and shipping features end-to-end. The goal is a promotion
into full-stack work at his current job, not a job hunt elsewhere.

## Success looks like

- Can open any file in the work codebase and explain what it does and what calls it
- Can trace a feature end-to-end: URL → route → middleware → controller → model → database → JSON response
- Can add a new field to an existing endpoint (migration, model, validation, API Resource) unaided
- Can build a new API resource endpoint (a new entity in the halaqa domain) from scratch
- Understands how `TenantScope` works, knows when it is inactive, and never writes a query that
  leaks across tenants
- Can write a test that proves a change works before opening a pull request (suite exists:
  `./vendor/bin/phpunit`, plus Pint and PHPStan)
- Ships a real pull request to the work repo that gets merged

## Constraints

- 5–8 hours/week — serious side-project cadence, roughly two solid sessions
- Windows 11 + Laragon: PHP 8.3.30, Composer 2.10.2, Node 25.2.1 (verified 2026-08-09)
- Strong frontend: Vue (primary), React/Next, vanilla JS, jQuery, HTML/CSS
- Backend near-zero: wrote SQL "long ago", basic Composer familiarity, no server-side code written
- Learning against a real production codebase he does not control — cannot break it
- **The codebase is API-only: Laravel serves JSON, the frontend is a separate SPA** (confirmed
  2026-09-23, LR-0003). His years of consuming this API are a direct asset.
- **Ethaaf runs Laravel 10.50.2** — past EOL. Read `/docs/10.x/`, never 13.x (LR-0004)
- **Single-database tenancy** (`stancl/tenancy` 3.8): one DB, a `tenant_id` column, and a global
  scope that is a **no-op outside tenant context**. This is the primary hazard.
- Service/Repository architecture; code lives in both `app/` and `Modules/`
- **Repo access granted 2026-10-11** — lessons now use real files

## Out of scope

- Laravel's AI SDK, vector/semantic search (new in 13, irrelevant to the mission)
- DevOps, server provisioning, Forge/Vapor/Cloud deployment
- Building a multi-tenant system from scratch — he needs to *understand and work in* one that exists
- Blade templating — the codebase is API-only, so there are no server-rendered views to learn
- PHP language trivia beyond what the codebase actually uses

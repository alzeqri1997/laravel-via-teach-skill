# Laravel Resources

> **Version note (2026-10-11):** Ethaaf runs **Laravel 10.50.2**. Read `/docs/10.x/`.
> Links below written as 13.x predate repo access — swap the version segment. See LR-0004.

## The codebase itself — highest trust

- **`C:\laragon\www\ethaaf\CLAUDE.md`**
  Team-written architecture guide: tenancy model, module layout, service/repository pattern,
  domain concepts. **Outranks every external resource** — it describes this exact code.
- **`C:/laragon/www/ethaaf/tests/`**
  Unit, Feature and Architecture suites. Existing tests are worked examples of how the team
  expects code to be exercised — read one before writing one.
- **`C:/laragon/www/ethaaf/performance-risk-report.md`**
  A measured catalogue of real N+1 problems in the codebase — file, line, severity, estimated
  query count. Documents a path costing **10,000+ queries** in one call.
  Use for: **candidate first tickets.** Diagnosis is already written; the fixes are mechanical.
- **`C:/laragon/www/ethaaf/app/Providers/AppServiceProvider.php`**
  `preventNPlusOneQueries()` — throws `LazyLoadingViolationException` locally, logs outside
  production. Use for: understanding the safety net already protecting him.
- **Ethaaf route files** — `routes/api/v1/…`
  Several have long explanatory header comments (see `association/students.php`). Unusually
  well documented; read the comments, not just the code.

## Knowledge

- [Laravel 13.x Official Documentation](https://laravel.com/docs/13.x)
  The primary source. Laravel's docs are unusually good — prose-style, not just API dumps.
  Use for: everything. Always check the version selector matches the codebase version.
- [Laravel 13 Release Notes](https://laravel.com/docs/13.x/releases)
  Released 17 March 2026, requires PHP 8.3+. Contains the support/EOL table.
  Use for: checking whether a feature exists in a given version, and upgrade timing.
- [Eloquent: Getting Started](https://laravel.com/docs/13.x/eloquent)
  Model conventions, retrieval, mass assignment, soft deletes, and query scopes.
  Use for: the ORM, and specifically **global scopes** — the mechanism behind tenant isolation.
- [Controllers — Resource Controllers](https://laravel.com/docs/13.x/controllers#resource-controllers)
  The CRUD action table, `Route::resource` vs `Route::apiResource`, and controller DI.
  Use for: **the API surface of the work codebase.** Verified 2026-09-23.
- [Eloquent: API Resources](https://laravel.com/docs/13.x/eloquent-resources)
  The transformation layer between Eloquent models and JSON. `toArray`, collections, `data`
  wrapping. Use for: **the JSON contract the SPA consumes** — highest-value file type for
  Ahmed's likely first tickets. Verified 2026-09-23.
- [Routing — Route Model Binding](https://laravel.com/docs/13.x/routing#route-model-binding)
  How a type-hinted model parameter is resolved from a URI segment, and the automatic 404.
  Use for: explaining why controller methods receive loaded models. Verified 2026-09-23.
- [Laravel Sanctum](https://laravel.com/docs/13.x/sanctum)
  Token and SPA authentication. The `auth:sanctum` middleware guarding API routes.
  Use for: when auth comes up — relevant because the codebase is API-only (LR-0003).
- [Laracasts: Laravel From Scratch (2026 Edition)](https://laracasts.com/series/laravel-from-scratch-2026)
  The longest-running Laravel intro series, refreshed for Laravel 12+. Video, paid subscription.
  Use for: the guided build-along path when reading docs alone feels too dry.
- [Laracasts: Multitenancy in Practice](https://laracasts.com/series/multitenancy-in-practice)
  Building single-database multi-tenancy, ensuring one tenant's data never leaks into another's.
  Use for: **later** — once fundamentals land, this is the highest-value series for the mission.
- [PHP: The Right Way](https://phptherightway.com/)
  Community-maintained guide to modern PHP practice, no framework assumptions.
  Use for: filling PHP language gaps (namespaces, autoloading, types) without vendor bias.
- [Tenancy for Laravel — Single-database tenancy](https://tenancyforlaravel.com/docs/v3/single-database-tenancy/)
  **CONFIRMED: this is Ethaaf's package and mode** (`stancl/tenancy` ^3.8).
  Use for: the mechanism behind `TenantScope` and `BelongsToTenant`. Highest-priority external
  resource for the mission.
- [Eloquent Relationships — Eager Loading (10.x)](https://laravel.com/docs/10.x/eloquent-relationships#eager-loading)
  `with()`, `withCount()`, nested loads, column pruning, `preventLazyLoading`.
  Use for: the N+1 trap — the most common performance bug he will meet. Verified 2026-10-12.
- [Sanctum (12.x)](https://laravel.com/docs/12.x/sanctum)
  Two modes: API tokens vs cookie-based SPA auth. Token issuing, abilities, revoking.
  Use for: API authentication. **Read "How it Works" first** — the two-modes distinction is
  the most misunderstood part. Verified 2026-10-18.
- [Authorization — Policies (12.x)](https://laravel.com/docs/12.x/authorization)
  Gates vs policies, auto-discovery, `Gate::authorize`, the 403.
  Use for: "may this user do this?" — distinct from authentication. Verified 2026-10-18.
- [HTTP Tests (12.x)](https://laravel.com/docs/12.x/http-tests)
  `postJson`, the assertions, `RefreshDatabase`, `Sanctum::actingAs`.
  Use for: **the biggest interview differentiator.** Verified 2026-10-18.
- [Service Container (12.x)](https://laravel.com/docs/12.x/container)
  DI, binding interfaces to implementations.
  Use for: "where does business logic belong?" Read to "Binding Interfaces" and stop.
- [Laravel 11 Upgrade Guide](https://laravel.com/docs/11.x/upgrade)
  The authoritative 10 → 11 delta with impact ratings. Confirms the skeleton restructure is
  **opt-in** and the upgrade is estimated at 15 minutes.
  Use for: the version-delta sidebars, and the day an Ethaaf upgrade is proposed.
  Verified 2026-10-12.
- [Eloquent — Query Scopes (10.x)](https://laravel.com/docs/10.x/eloquent#query-scopes)
  Global and local scopes — the Laravel feature tenant isolation is built on.
  Use for: understanding how a `WHERE tenant_id = ?` gets appended invisibly.
- [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v5/introduction)
  Roles and permissions. Ethaaf guards routes with `associationPermission:…`.
  Use for: understanding why a logged-in user still gets a 403.
- [spatie/laravel-query-builder](https://spatie.be/docs/laravel-query-builder/v5/introduction)
  Filters, sorts and includes read from the query string. Used in Ethaaf's repositories.
  Use for: when adding a filter to an existing list endpoint.
- [Laravel Modules (nWidart)](https://docs.laravelmodules.com/)
  The module system splitting code between `app/` and `Modules/`.
  Use for: when a file is not where you expect it.

## Wisdom (Communities)

- [Laracasts Discuss](https://laracasts.com/discuss)
  Attached to the main learning platform; unusually civil and high-signal for a dev forum.
  Use for: "is this the idiomatic way to do X" questions.
- [r/laravel](https://reddit.com/r/laravel)
  Active, moderated reasonably well.
  Use for: package recommendations, career/market questions, architecture debate.
- [Laravel Discord](https://discord.gg/laravel)
  Real-time help. Fastest route to unblocking on a specific error.
  Use for: "I'm stuck on this stack trace right now" moments.
- **Ahmed's own team** — the highest-value community available here
  Colleagues who wrote the halaqa codebase already know its conventions and history.
  Use for: why the code is the way it is. No forum can answer that.

## Gaps

- **Frontend layer resolved 2026-09-23: API-only, separate SPA** (LR-0003). Blade and Inertia
  resources are therefore not needed. Still unconfirmed: **Laravel version**, **multi-tenancy
  approach** (package vs. hand-rolled), and **test setup**. Ahmed has no repo access yet.
- **No SPA-side resource listed yet.** The frontend repo is separate; if its framework matters
  later (it is his home turf), note it here.
- **Laravel 10 is EOL** (security fixes ended 2025-02-04). Worth asking the team about upgrade
  plans — it determines how long 10.x docs remain the right reference.
- **No Laracasts series pinned to Laravel 10 yet.** The 2026 series targets 12+; differences are
  mostly structural (skeleton, config) rather than conceptual, but flag this when recommending.
- ~~No Arabic-language Laravel resources vetted~~ — **resolved from the codebase itself.**
  Ethaaf uses Arabic domain terms inline (مجمع = Tenant, حلقة = Section, الفرع = Branch).
  Glossary lives in Reference 03.

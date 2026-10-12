# Laravel Resources

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
  Docs for `stancl/tenancy`, one of the two dominant multi-tenancy packages.
  Use for: reference *if* the work codebase uses this package — check `composer.json` first.
- [spatie/laravel-multitenancy](https://github.com/spatie/laravel-multitenancy)
  The other dominant multi-tenancy package, from Spatie.
  Use for: reference *if* the work codebase uses this one instead.

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
- No Arabic-language Laravel resources vetted yet; may matter for domain vocabulary
  (halaqa, tilawah, sanad, juz) if the codebase names things in transliterated Arabic.

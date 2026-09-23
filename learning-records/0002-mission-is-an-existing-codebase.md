# The mission target is an existing multi-tenant codebase, not a greenfield app

Ahmed's goal is a promotion at his current job by contributing to an existing Laravel
application: a multi-tenant system managing Quran memorization circles (halaqas). He is not
job-hunting and not building his own product.

**Why this matters for teaching:** this inverts the standard curriculum. The usual path builds
a blog from scratch and reaches multi-tenancy in month six, if ever. Here, tenant scoping is a
day-one safety concern — a query that forgets its tenant constraint is a data leak between
organizations, and it is the single most likely way he causes real damage early.

**Implications:**
- Bias every lesson toward *reading and modifying* existing code over *authoring from blank*
- "Trace a feature through the codebase" is a recurring lesson format worth reusing
- Tenant isolation must be taught early as a **hazard to respect**, and later as a mechanism to
  understand — see the global scopes section of the Eloquent docs
- Building a tiny throwaway halaqa-shaped app locally is still valuable, but as a *sandbox to
  break safely*, not as the deliverable
- **Open question blocking precision:** the codebase's Laravel version, multi-tenancy approach
  (`stancl/tenancy` vs `spatie/laravel-multitenancy` vs hand-rolled global scope), frontend
  layer (Blade / Inertia+Vue / separate SPA), and whether it has tests. Lesson 1 ends by asking
  him to run a few commands against the repo to settle this.

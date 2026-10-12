# The work codebase is API-only, with a separate SPA frontend

Confirmed 2026-09-23. Laravel serves JSON; the frontend is a separate repository. This settles
the largest of the four open questions from [LR-0002](0002-mission-is-an-existing-codebase.md)
— the one flagged as reshaping the whole path.

**Why this matters for teaching:** the standard Laravel curriculum spends heavily on Blade, and
the Inertia path assumed Vue components living inside the Laravel repo. Neither applies. What
Ahmed actually needs is the API surface: routing, controllers, Eloquent, API Resources,
validation, and the JSON contract.

**Implications:**

- **Blade is out of scope.** Drop it from the curriculum sketch entirely. Mention it only so he
  recognises `.blade.php` if he meets one in a mail template or error page.
- **API Resources are unusually high-value.** `app/Http/Resources/` is the file where the SPA's
  JSON contract is actually decided. It is the most likely place his first real ticket lands,
  and the thing a frontend developer is best positioned to reason about. Taught in Lesson 2.
- **His frontend experience is now a direct asset, not just an analogy.** He has consumed this
  exact API for years. "Predict the backend from the response you already know" is a teaching
  move available here that would not exist in a greenfield course — used as the Lesson 2 task.
- **`auth:sanctum`, not `auth`.** API auth is token/SPA-based. Teach Sanctum when auth comes up.
- **Validation still matters, but as a JSON 422 response**, not as form error bags redisplayed
  in a template. Teach Form Requests through the 422 payload the SPA receives.
- **No repo access at the time of writing.** Lessons must stay runnable without it: predict-then-
  verify tasks, and realistic illustrative code rather than his real files. The Lesson 1 recon
  commands are still outstanding and still carried forward.

**Revised curriculum after Lesson 2:** Eloquent + relationships + the N+1 trap → validation via
Form Requests (422) → tenant scoping and global scopes → testing an endpoint → first real PR.

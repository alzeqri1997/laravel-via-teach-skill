# Mission: Laravel (employable backend developer)

> **Mission changed 2026-10-18.** The original goal was a promotion into backend work at Ahmed's
> current job via the Ethaaf codebase. That job is ending (confirmed layoff). The goal is now
> employability as a Laravel developer. Ethaaf remains the worked example. See LR-0006.

## Why

Ahmed is a frontend developer (~4 years: Vue primary, React/Next, vanilla JS, jQuery, HTML/CSS)
who has been learning Laravel to move into full-stack work. His job is ending, so the goal is
now to **become hireable as a Laravel developer** — able to pass a technical interview, handle a
take-home test, and be productive in an unfamiliar Laravel codebase from week one.

He has an unusual advantage most career-changers lack: ~4 years consuming a real, sophisticated
multi-tenant Laravel API from the frontend, and ongoing read access to that codebase
(**Ethaaf**, `C:\laragon\www\ethaaf`). It is a genuinely well-engineered production app. It stays
in the course as the **worked example** — the thing that makes abstract concepts concrete — but
it is no longer the destination.

## Success looks like

- **Can explain Laravel's request lifecycle, Eloquent, validation and auth out loud**, under
  interview conditions, with reasoning rather than recitation
- Can build a working CRUD API from blank: migration → model → controller → validation → resource
- Can write a test that proves a feature works, and explain why that test is worth having
- Can open an unfamiliar Laravel codebase and orient quickly — routes, controllers, models
- Understands multi-tenancy well enough to discuss it credibly (a real differentiator; most
  junior candidates have never seen it)
- Can talk about tradeoffs: eager vs lazy loading, service layers, where validation belongs
- Can read a job posting and honestly assess whether he matches it

## Constraints

- **Learning time is now the scarce resource, not calendar time.** Depth is not negotiable
  (see below), so breadth is what gets cut.
- Windows 11 + Laragon: PHP 8.3.30, Composer 2.10.2, Node 25.2.1
- Strong frontend; backend knowledge is now real but young (Lessons 1–4)
- **Laravel 12 is the teaching default** (PHP 8.2+, supported to Feb 2027 — what most postings
  and production apps use). Laravel 13 additions and Laravel 10 differences appear as light
  sidebars. Ahmed explicitly asked for "a little bit, not a lot" of 10.

## Non-negotiable: depth over coverage

Interviews test **storage strength** — durable understanding under unfamiliar framing — not
**fluency**, the ability to produce an answer in the moment. Fluency collapses under follow-up
questions. So:

- **Cut topics, never understanding.** Fewer subjects, each taught properly.
- **Every lesson keeps its retrieval practice.** This is what survives to the interview.
- **Add "explain it out loud" tasks** — simultaneously retrieval practice and interview rehearsal.

The accepted trade: he will know fewer Laravel topics than a leisurely learner, but will know
them solidly. Shallow-and-broad is what interviewers detect and reject.

## Out of scope

- Queues, broadcasting, Octane, Pennant, the AI SDK, vector search — real Laravel, rarely asked
  of a junior/mid candidate, and expensive in time
- DevOps, server provisioning, Forge/Vapor/Cloud deployment
- Building a multi-tenant system from scratch — understanding one is the asset, not building one
- PHP language trivia beyond what real code uses
- **A portfolio project, for now** — Ahmed's explicit choice (2026-10-18): lessons only, build
  competence first. Revisit once fundamentals are solid; it is likely to become important.

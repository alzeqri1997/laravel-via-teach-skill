# Mission: Laravel

## Why

Ahmed is a frontend developer (~4 years) whose workplace runs a multi-tenant Laravel
application for managing Quran memorization circles (halaqas). He wants to stop being
frontend-only and start picking up backend tickets in that existing codebase — reading it
confidently, changing it safely, and shipping features end-to-end. The goal is a promotion
into full-stack work at his current job, not a job hunt elsewhere.

## Success looks like

- Can open any file in the work codebase and explain what it does and what calls it
- Can trace a feature end-to-end: URL → route → middleware → controller → model → database → response
- Can add a new field to an existing feature (migration, model, validation, form, display) unaided
- Can build a new CRUD resource (e.g. a new entity in the halaqa domain) from scratch
- Understands how tenant isolation works in his codebase and never writes a query that leaks across tenants
- Can write a test that proves a change works before opening a pull request
- Ships a real pull request to the work repo that gets merged

## Constraints

- 5–8 hours/week — serious side-project cadence, roughly two solid sessions
- Windows 11 + Laragon: PHP 8.3.30, Composer 2.10.2, Node 25.2.1 (verified 2026-08-09)
- Strong frontend: Vue (primary), React/Next, vanilla JS, jQuery, HTML/CSS
- Backend near-zero: wrote SQL "long ago", basic Composer familiarity, no server-side code written
- Learning against a real production codebase he does not control — cannot break it

## Out of scope

- Laravel's AI SDK, vector/semantic search (new in 13, irrelevant to the mission)
- DevOps, server provisioning, Forge/Vapor/Cloud deployment
- Building a multi-tenant system from scratch — he needs to *understand and work in* one that exists
- PHP language trivia beyond what the codebase actually uses

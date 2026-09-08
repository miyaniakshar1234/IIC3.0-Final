# Roadmap, four-person team plan and Antigravity guide

## 1. Planning assumptions

The plan assumes four student team members, including beginners, using an AI coding assistant. It is an effort allocation proposal, not a guaranteed completion estimate. Exact event duration and available preparation time remain unknown. Confirm them before scheduling. One experienced owner must review security-sensitive generated code and integration changes.

## 2. Dependency-based phases

Phase A — foundations: scaffold application, session handling, migrations, seed data and organization isolation. Exit when student and employer accounts see separate authorized workspaces.

Phase B — evidence loop: challenge display, draft/final submission, reviewer assignment, rubric draft and atomic publication. Exit when reviewed evidence persists and cannot be written by a student.

Phase C — opportunity loop: role requirements, deterministic coverage, application snapshots and stage transitions. Exit when the 61-to-96 demo and employer shortlist work using real data.

Phase D — college view and polish: aggregate gap table, sample labels, privacy controls, error states and responsive QA. Exit when the coordinator can explain the report's denominator.

Phase E — release and story: permissions tests, build, deployed demo check, synthetic reset and recorded backup. Freeze dependencies and feature scope. Only after these phases should AI drafts or uploads begin.

## 3. Suggested 48-hour work window

| Window | Goal | Exit evidence |
|---|---|---|
| Hours 0–4 | Scope and foundations | Shared schema and seeded identities |
| Hours 4–14 | Challenge and review loop | Published review in database |
| Hours 14–24 | Matching and applications | Complete student-to-recruiter flow |
| Hours 24–32 | College report and permissions | Isolation checks and gap view |
| Hours 32–40 | Integration and visual fixes | Reliable full rehearsal |
| Hours 40–48 | Freeze, pitch and contingency | Recording and known limitations |

These windows include overlap between people; they are not 48 uninterrupted coding hours for each member. Reserve rest and handoff time. If only 24 hours are available, seed publications and reviewer assignments, keep a text-only submission, and demonstrate one role/challenge path. Do not remove authorization or human review to save time.

## 4. Four-person responsibilities

| Member | Primary ownership | Suitable bounded tasks |
|---|---|---|
| Akshar / integration lead | Schema, backend, matching, merge review | Atomic transitions, permissions, deployments |
| Member 2 | Student frontend | Passport, challenge form, applications |
| Member 3 | Employer/reviewer frontend | Review rubric, applicant view, empty states |
| Member 4 | College view, fixtures, QA, pitch | Gap table, test journeys, demo script |

Names other than Akshar are placeholders. Adapt assignments to actual ability. Beginners can own a screen and its acceptance checks rather than infrastructure. Each member should explain what their screen reads, writes and shows when an API fails. Keep one person responsible for shared schema/API changes to prevent conflicting generated implementations.

## 5. Repository layout

At the repository root, keep docs/, src/, supabase/, tests/ and public/. Under src/app, group public/auth/student/employer/reviewer/institution routes and api/v1. Under src/modules, keep identity, opportunities, challenges, evidence, reviews, matching, applications and insights. Shared UI belongs in src/components; validated contracts in src/contracts; server-only database/session helpers in src/lib/server. Supabase migrations, seeds and authorization tests belong under supabase/. Do not store real secrets or private evidence in public/.

## 6. How to use the pack with Antigravity

Start with 00_START_HERE, the PRD, architecture, database and API documents. Ask the agent to read them and summarize the P0 dependencies before changing files. Work one vertical slice at a time, keeping the relevant screen/backend contracts in context. After each slice, inspect the actual UI and database behavior. Do not equate a generated screenshot with a working application.

### Prompt 1 — scaffold

“Read docs/00_START_HERE.md, 03_PRD.md, 04_ARCHITECTURE.md and 05_TECH_STACK.md. Implement only the P0 scaffold, authentication shell and environment example. Pin compatible dependencies and create role workspaces using verified memberships. Do not add optional AI, uploads or fake business successes. Report changed files, verification and remaining gaps.”

### Prompt 2 — schema and authorization

“Read 08_DATABASE_DOC.md and 12_SECURITY_PRIVACY.md. Implement migrations, explicit grants, RLS and scoped transaction functions. Seed two institutions and two employers with synthetic accounts. Add meaningful allow/deny tests. Students must not insert reviewed attainments, and Employer B must not read Employer A applications. Do not use a service-role client for ordinary user requests.”

### Prompt 3 — evidence loop

“Implement submission drafts, finalization, assigned review drafts and atomic review publication according to the PRD and API contracts. Keep published revisions immutable. Student coverage must not change when a review is only saved as a draft. Wire real UI forms with pending, validation, conflict and error states.”

### Prompt 4 — matching and applications

“Implement coverage-v1 from 11_SKILL_MAPPING_AND_AI.md and verify the exact 61-to-96 example. Keep eligibility separate. Apply using selected evidence only, create an immutable snapshot and scoped grants, and enforce the application state machine. Withdrawal must revoke grants. Do not use client-provided scores.”

### Prompt 5 — college and release

“Implement the scoped cohort-gap table with denominator, opportunity sample and small-group suppression. Follow 10_DESIGN_DOC.md for responsive/accessibility behavior. Run the P0 acceptance checks from 13_TESTING_AND_ACCEPTANCE.md, fix concrete failures and document limitations. Do not implement P1 features until the full journey is reliable.”

## 7. Agent working rules for the project

Read relevant docs before editing. Inspect existing code before creating duplicate components. Keep changes small and reviewable. Never delete data or disable policies to make a test pass. Never place privileged keys in the browser. If a specification is inconsistent, explain the issue and propose the smallest correction. Record schema/API changes together. Use synthetic fixtures and do not contact employers, publish public data or claim partnerships without explicit team authorization.

## 8. Integration and source-control habits

Use short-lived branches or isolated worktrees when working concurrently. Assign file ownership for schema and shared contracts. Merge and run the complete core flow regularly rather than saving integration for the final hour. Before the demo freeze, record the known-good commit and database seed version. Keep a rollback plan that does not depend on internet access to recover a video or screenshots.

## 9. Pilot roadmap

P1 adds private safe uploads, AI drafting, intervention tracking, sharing/export controls and review calibration after the core passes. P2 explores cross-college collaboration, team skill composition, integrations and richer evidence portability. Graduation to a real pilot requires policy decisions, consent, named reviewers and a support owner. Expansion is conditional on demonstrated utility and review capacity.

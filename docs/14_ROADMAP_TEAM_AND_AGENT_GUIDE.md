# Roadmap, Four-Person Team Plan and Technical Delivery Guide

## 1. Planning assumptions

The plan outlines sprint execution across four engineering workstreams. It provides bounded technical objectives, acceptance criteria, and dependency gates. One experienced lead reviews security-sensitive transactions, database migrations, and integration changes.

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

Keep one person responsible for shared schema/API changes to prevent conflicting implementations.

## 5. Repository layout

At the repository root, keep docs/, src/, supabase/, tests/ and public/. Under src/app, group public/auth/student/employer/reviewer/institution routes and api/v1. Under src/modules, keep identity, opportunities, challenges, evidence, reviews, matching, applications and insights. Shared UI belongs in src/components; validated contracts in src/contracts; server-only database/session helpers in src/lib/server. Supabase migrations, seeds and authorization tests belong under supabase/. Do not store real secrets or private evidence in public/.

## 6. Sprint Implementation Specifications

Each sprint produces a fully tested vertical slice adhering to the PRD, architecture, and API contracts.

### Sprint 1 — Project Scaffold & Authentication Shell
Implement core application scaffold, session management, and role-based workspace routing. Pin compatible dependencies and create role workspaces using verified memberships. Establish environment configurations and baseline health-check endpoints.

### Sprint 2 — Schema Design & Authorization Policies
Implement PostgreSQL schema migrations, Row Level Security (RLS) policies, and atomic transaction functions. Seed institutions and employers with realistic mock fixtures. Ensure students cannot self-insert reviewed attainments, and tenant boundaries prevent cross-employer data exposure.

### Sprint 3 — Challenge & Human Review Loop
Implement challenge submission drafts, finalization, reviewer assignments, and split-screen rubric publication. Enforce immutable review revisions. Ensure student skill coverage updates only upon atomic publication of verified reviews.

### Sprint 4 — Matching Engine & Applications
Implement deterministic `coverage-v1` matching algorithm and verify the standard 61-to-96 coverage scenario. Implement evidence-scoped applications with immutable snapshot generation and application stage transitions.

### Sprint 5 — Institutional Analytics & Production Hardening
Implement aggregated cohort-gap reporting with denominator calculation and small-group suppression. Enforce responsive design, error boundaries, and accessibility standards. Run end-to-end acceptance test suites before release freeze.

## 7. Engineering Standards & Code Quality Rules

Read relevant architecture docs before editing. Inspect existing patterns before creating duplicate components. Keep pull requests bounded and reviewable. Never delete data or disable policies to make a test pass. Never place privileged keys in client-side code. If a specification is inconsistent, document the issue and propose the smallest correction. Maintain unified schema/API documentation alongside code changes.

## 8. Integration and source-control habits

Use short-lived branches or isolated worktrees when working concurrently. Assign file ownership for schema and shared contracts. Merge and run the complete core flow regularly rather than saving integration for the final hour. Before the demo freeze, record the known-good commit and database seed version. Keep a rollback plan that does not depend on internet access to recover a video or screenshots.

## 9. Pilot roadmap

P1 adds private safe uploads, AI drafting, intervention tracking, sharing/export controls and review calibration after the core passes. P2 explores cross-college collaboration, team skill composition, integrations and richer evidence portability. Graduation to a real pilot requires policy decisions, consent, named reviewers and a support owner. Expansion is conditional on demonstrated utility and review capacity.

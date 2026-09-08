# ProofBridge implementation audit and win plan

Status: evidence-based audit of the repository on 8 September 2026. This document distinguishes design intent, working behavior, seeded demonstration data, local-only UI behavior, and missing controls. It is not a claim that the product has passed production or pilot readiness.

Remediation applied after the baseline audit: the public publish/reset shortcuts were removed; reset is now opt-in and POST-only; the health endpoint performs a real database probe without claiming RLS; match query overrides were removed; review publication fails closed; evidence finalization now stores a new revision, contribution, links, assignment, digest event, and outbox event in one transaction; privileged client fallbacks no longer report local success; formula copy was aligned; synthetic/demo limitations are visible; matcher validation and tie-breaking tests were added; and mobile applicant cards replaced the narrow desktop table at small viewports. Authentication, RLS/policies, a persisted application grant, derived cohort metrics, and full acceptance tests remain open.

## 1. Executive verdict

ProofBridge is not fundamentally a generic internship portal. Its strongest product idea is a closed evidence-provenance loop:

`role requirement -> bounded challenge -> frozen student evidence -> named human rubric review -> deterministic role coverage -> consented application snapshot -> recruiter decision -> anonymized institution feedback`

The current build communicates only fragments of that loop. It presents many generic role dashboards and strong trust claims, but most screen data is hardcoded, several important actions are local-only, authentication and row-level authorization are absent, and the database does not enforce the immutability claimed by the UI. A mentor who follows the golden 61% to 96% path may see a polished demonstration; a mentor who probes identity, persistence, failure handling, multi-tenancy, or the origin of cohort metrics can invalidate the trust story quickly.

The project can still become compelling for IIC 3.0 if the team narrows the demonstration to one honest, fully persistent golden loop and makes provenance—not dashboard breadth—the visual and narrative center.

## 2. What is genuinely distinctive

The defensible innovation is not "AI matching," a skill score, another student profile, or four dashboards. It is the connection between evidence creation, accountable verification, an explainable requirement-level calculation, and an institutional feedback loop.

The strongest product primitives are:

- **Evidence Passport / Skill Twin:** a learner-owned map of claims versus reviewed attainments, with inspectable provenance.
- **Role Genome:** a versioned employer requirement set with visible weights and required levels.
- **Industry Mission:** a bounded task attached to a specific unmet role requirement and a published rubric.
- **Evidence chain:** each attained level traces to a frozen revision, rubric criterion, rationale, reviewer, and date.
- **Bridge path:** the shortest concrete action that closes the most valuable verified gap.
- **Curriculum Radar:** anonymized cohort gaps against real role requirements, using visible denominators and time windows.

The current UI uses generic labels such as "workspaces," "stats," "match engine," and "institutional intelligence" more often than these product primitives. That makes the product resemble a themed applicant-tracking system even though the underlying concept is more original.

## 3. Source-of-truth hierarchy and document conflict

The stable documents `00` through `17` are internally consistent on the main trust boundary:

- P0 works without AI or external integrations.
- Only a named human review creates an attainment.
- Matching is deterministic and explainable; it is not a probability of hiring.
- Evidence is private by default and shared through a scoped application grant.
- Sensitive mutations are authenticated, membership-scoped, atomic, and enforced again in PostgreSQL.
- Synthetic data and unimplemented workflows are visibly labeled.
- The demonstration ends by stating what is working, simulated, and still planned.

The later hackathon execution and individual implementation prompts weaken those rules. They encourage hardcoded personas, large fabricated metrics, front-end fallbacks, direct database shortcuts, and language such as "verified partner," "accreditation ready," or "legal defensibility" without evidence. Those prompts should be treated as disposable implementation suggestions, not as authority over the PRD, security, backend, testing, and demo documents.

Recommended precedence:

1. `03_PRD.md`, `11_SKILL_MAPPING_AND_AI.md`, and `12_SECURITY_PRIVACY.md`
2. `04_ARCHITECTURE.md`, `07_BACKEND_DOC.md`, `08_DATABASE_DOC.md`, and `09_API_DOC.md`
3. `06_FRONTEND_DOC.md`, `10_DESIGN_DOC.md`, `13_TESTING_AND_ACCEPTANCE.md`, and `15_DEMO_AND_PITCH.md`
4. Later hackathon prompts only where they do not contradict items 1-3

## 4. Current implementation model

### Runtime and structure

- Next.js 14 App Router, React 18, TypeScript, Tailwind, `pg`, Supabase SDK, and Zod.
- One browser application contains student, reviewer, employer, and institution routes.
- API route handlers connect to PostgreSQL through a server-side `pg` pool.
- Two SQL migrations define 33 tables and five `SECURITY DEFINER` functions.
- Seed data centers on Meera Patel, one Junior Data Analyst role, one SQL challenge, historical attainments, and a pending SQL review.
- A pure TypeScript matcher implements the worked 61% to 96% calculation.

### What is demonstrably working

- TypeScript type-check passes.
- The production build completes.
- Major pages and read APIs respond when the configured database is reachable.
- The isolated matching script produces exactly 61 before SQL and 96 after a level-3 SQL attainment.
- The reviewer page can call a review publication API that attempts a PostgreSQL transaction.
- The UI is visually consistent and the student route is reasonably usable at a 360px viewport.

### What is only partially real

- `GET /api/v1/state` reads a few database rows but supplies missing baseline attainments and institution totals from code.
- Opportunity cards read one database opportunity but attach fabricated applicant counters and display text.
- The reviewer publication endpoint attempts the stored function, then bypasses it with direct writes if it fails, and can return a synthesized success when persistence is incomplete.
- Employer applicant screens are hardcoded snapshots with only Meera's SQL contribution patched from the state endpoint.
- Submission list/detail screens query PostgreSQL but replace IDs, links, review state, or evidence with aliases and fallbacks.

### What is simulated or broken

- There is no sign-in or membership-derived actor in ordinary API requests.
- RLS is not enabled and no policies or grants are defined in the migrations.
- Challenge draft save is a timer and local timestamp, not persistence.
- Finalization ignores the route ID, hashes but does not save the submitted code, and updates a nonexistent `reviewer_assignments.submission_id` column.
- Opportunity application is local React state only.
- The standalone candidate stage form is local React state only.
- The applicant drawer calls the API, but converts API failure into a local success state and success toast.
- Institution metrics, distributions, intervention impact, scheduled bootcamp, and notifications are hardcoded.
- The reset endpoint is unauthenticated, mutates on both GET and POST, and references tables not present in the schema.
- There is no seeded application, outcome, evidence grant, or working end-to-end shortlist path.

## 5. P0 requirements coverage

| Requirement | Current state | Review risk |
|---|---|---|
| Authentication and membership-scoped workspaces | Missing | Critical |
| Approved organization and opportunity publication | Schema/function skeleton; no complete UI/API path | High |
| Student profile and declared skill labels | Seeded/hardcoded display | Medium |
| Versioned role requirements and rubric | Schema/seed only; immutability not enforced | High |
| Private text/link evidence submission | Editor exists; save/finalize is not trustworthy | Critical |
| Assigned human review and publication | UI/API exist; actor and atomicity controls are bypassable | Critical |
| Evidence passport and explainable matching | Strong UI concept; mostly hardcoded; matcher partially correct | Medium |
| Application and valid status transitions | Mostly local-only; transition graph not enforced | Critical |
| Institution cohort gaps and pipeline | Entirely synthetic | High |
| Audit events and correction requests | Tables/partial event writes; no trusted workflow | High |
| Outcome record | Table only | Medium |
| In-app notifications | Table only | Low for the mentor slice |

## 6. Critical correctness and trust defects

### 6.1 Authorization boundary does not exist

Routes accept or hardcode `student_id`, `reviewer_id`, and employer actor IDs. Read endpoints do not verify ownership, assignments, organization membership, or active evidence grants. Raw server-side PostgreSQL access also means Supabase caller identity and RLS do not protect ordinary requests.

This is the single largest mismatch with a product whose value proposition is trusted evidence.

### 6.2 The database claims controls it does not implement

The health endpoint reports `PostgreSQL + RLS`, but it performs no database query. The migrations contain no `ENABLE ROW LEVEL SECURITY`, policies, or explicit function execution grants. `SECURITY DEFINER` functions accept actor IDs from callers instead of deriving `auth.uid()` and do not revoke broad execution.

### 6.3 Review publication can manufacture success

The route first calls `publish_review`, then falls back to direct inserts and updates. If later reads fail, it synthesizes the baseline and SQL attainment set and still calculates 96. The UI therefore cannot distinguish an atomic trusted publication from a partial or fictional result.

### 6.4 The golden evidence submission does not persist the evidence

The challenge screen sends code, contribution, and links. The finalize handler hashes only the code, stores none of the supplied fields, ignores the requested submission ID, and attempts to update a missing column. A mentor can expose this by changing the SQL, finalizing, refreshing, and observing that the original seeded artifact returns.

### 6.5 Application and recruiter decisions are theater

The role's application modal only sets `isApplied` in the browser. The candidate detail page only updates local state after a delay. The applicants drawer uses an API, but on failure it applies the transition locally and reports success. These behaviors directly violate the documented rule not to claim a save or optimistic privileged transition without server confirmation.

### 6.6 Metrics are internally contradictory

The database has six seeded students, three attainments, one role, and no seeded applications. The institution screen shows 120 students, 342/343 attainments, 14 roles, 42 deficient students, eight opportunities, and an estimated 38 placements. Employer pages disagree between six applicants, three displayed candidates, and zero application rows. These figures are neither derived nor prominently marked as synthetic scenarios.

### 6.7 UI formula and engine formula disagree

The canonical coverage formula is `weight * min(reviewed_level / required_level, 1)`. The landing page repeatedly describes `weight * rubric_level / weight * max_level`, while an employer card omits the required-level ratio entirely. The student and role breakdowns use the canonical formula. A mentor comparing screens can challenge which calculation is authoritative.

### 6.8 Matcher is not fully compliant

The matcher validates only that weights total 100. It does not reject duplicate skills, out-of-range levels, or invalid weights. For tied attainments it keeps input order instead of resolving by newest `reviewedAt` and then stable attainment ID. Its returned timestamp also means otherwise identical results are not byte-identical. Eligibility is always `eligible`.

### 6.9 Test and release signals are misleading

`npm test` invokes Vitest, but Vitest is not installed. The only test is a direct Node script for the 61/96 example. `npm run lint` opens an interactive setup prompt because ESLint is not configured. There are no authorization, transaction rollback, API contract, duplicate retry, state-machine, or end-to-end tests required by the testing document. There is also no README that declares demo setup and known limitations.

### 6.10 Responsive behavior is incomplete

Browser QA at 360x800 showed the student dashboard usable, but the employer applicants route collapsed into a narrow left strip with the multi-column table inaccessible. This fails the PRD's explicit 360px no-overflow acceptance target and is likely visible during mobile judging.

## 7. Claims to remove or qualify before mentor review

Until the corresponding controls are proven, do not present these as facts:

- tamper-proof, immutable, or ledger-backed evidence
- PostgreSQL + RLS
- authenticated or verified faculty identity
- approved/verified employer partner
- accredited faculty rubrics
- accreditation ready for NAAC/NBA
- every point traceable
- live cohort feed or notifications dispatched
- zero AI hallucinations
- atomic transaction complete when the API used a fallback
- all workspaces genuinely PostgreSQL-driven

Safer language for the hackathon prototype:

- "content-addressed demo revision" only after the digest is stored with the revision
- "named reviewer in the synthetic demo" until identity is authenticated
- "deterministic role coverage" rather than AI match or employability score
- "synthetic cohort scenario" for non-derived institution figures
- "proposed pilot control" for RLS, accreditation mapping, or institutional governance not yet implemented
- "review publication persisted" only after the server confirms the authoritative transaction

## 8. Winning product direction

### Positioning

Use one sentence consistently:

> ProofBridge turns a role requirement into inspectable proof: a student closes one skill gap through a bounded industry mission, a named human reviews a frozen revision, the deterministic role coverage updates, and the anonymized result feeds curriculum action.

Avoid leading with dashboards, AI, ATS replacement, SHA-256, or the 61/96 number. Those are supporting mechanics, not the product.

### Demonstration object: the Proof Chain

Create one visual component shared across student, reviewer, employer, and institution screens:

1. Role Genome requirement: SQL L3, weight 35
2. Industry Mission: messy monthly sales
3. Evidence revision: digest, timestamp, contribution statement, AI disclosure
4. Human review: Dr. Alok, rubric criterion, level 3, rationale
5. Coverage delta: SQL 0 -> 35 points; total 61 -> 96
6. Application snapshot: selected revision and calculation version
7. Cohort signal: one more reviewed SQL attainment, with an honest denominator

Every node should open its source record. This would make provenance visible and give the project a signature interaction that generic portals do not have.

### Mentor-safe scope

For the immediate review, demonstrate only:

- one synthetic student, one role genome, one industry mission, one assigned reviewer, and one employer;
- a real save and finalize of a changed evidence revision;
- a real review publication that fails closed;
- a deterministic recalculation from stored reviewed attainments;
- a real application snapshot containing selected evidence IDs and score inputs;
- a real shortlist transition with a valid state graph and audit event;
- a small, honestly labeled aggregate derived from seed rows.

Show other screens as concept previews only if they carry a visible `Synthetic scenario` or `P1 concept` label.

## 9. Implementation order

### P0-A: survive mentor probing

1. Remove unauthenticated global publish/reset controls and all GET mutations.
2. Make API failures visible; delete every local-success fallback for privileged writes.
3. Fix the canonical formula copy everywhere.
4. Add a persistent `Demo mode · synthetic identities and data` banner plus a clear limitations panel.
5. Replace fabricated institution/employer figures with database-derived small numbers or label them as synthetic scenario data.
6. Fix the 360px employer applicants layout with mobile candidate cards.
7. Add a README with setup, demo credentials/personas, reset boundary, what is real, what is simulated, and known limitations.

### P0-B: make one vertical slice genuinely real

1. Add demo authentication or a tightly scoped server-owned demo session; never accept actor identity from mutation bodies.
2. Enable RLS and define explicit policies/grants, or clearly constrain the build to a synthetic single-tenant demo until that is complete.
3. Repair `finalize_submission` so it stores a new immutable revision, contribution statement, links, digest, assignment, audit event, and outbox event atomically.
4. Remove the review fallback. Validate assignment, revision, criterion completeness, self-review prohibition, rubric version, idempotency, and immutable publication in the authoritative function.
5. Implement a real application endpoint using selected reviewed evidence and a frozen calculation snapshot.
6. Enforce the documented application transition graph and recruiter scope.
7. Derive institution aggregates from stored rows with denominator, role, and time-window labels.

### P0-C: prove it

1. Install and configure the declared test/lint tools or change scripts to tools that actually exist.
2. Add matcher invariants and tie-break tests.
3. Add negative API and direct-database authorization tests.
4. Add rollback, idempotency, duplicate application, review immutability, and invalid transition tests.
5. Add one browser test for the full student -> reviewer -> employer -> institution journey.
6. Record a verified backup demo and capture honest screenshots only after the path passes.

## 10. Mentor review script

Open with the evidence problem, not the interface:

> A resume says Meera knows SQL. ProofBridge shows exactly which role requirement matters, the bounded work she submitted, who reviewed it, why they awarded level 3, and how that one evidence record changes her role coverage and the college's curriculum signal.

Then show only the proof chain:

1. Open Role Genome and the missing SQL requirement at 61%.
2. Open the linked Industry Mission and edit the evidence visibly.
3. Finalize, refresh, and reopen the stored revision.
4. Switch to the assigned reviewer and publish one anchored rationale.
5. Return to the same role and inspect the exact 35-point delta to 96%.
6. Apply with explicitly selected evidence and show the frozen snapshot.
7. Shortlist as the employer and show the audit event.
8. Show the institution aggregate with a real denominator and label the outcome record as simulated if it is seeded.

Close with honest boundaries:

> The core rule engine and this synthetic end-to-end transaction are working. Production identity federation, larger pilots, advanced uploads, and optional AI drafting are next; AI never grades or rejects.

## 11. Validation performed for this audit

- Read all Markdown documents in `docs`, the master coordination and four member prompts, and structurally inspected the compiled master DOCX.
- Read all application/API/component source files, SQL migrations, seed/reset/migration scripts, contracts, and matcher.
- Confirmed a clean TypeScript type-check and production build.
- Confirmed `npm test` fails because Vitest is missing and `npm run lint` is not non-interactive/configured.
- Ran `node tests/test-math.mjs`; it passes the 61% and 96% worked example with a module-format warning.
- Started the application against the configured database and inspected all major role routes and API responses.
- Performed desktop and 360px browser inspection of the landing, student, reviewer, employer, challenge, and institution journeys.
- The master DOCX was inspected structurally but not page-rendered because the bundled document runtime did not include LibreOffice; page-layout quality is therefore unverified.

## 12. Definition of done for a defensible hackathon build

The build is mentor-safe when the team can change evidence content, persist and reopen the exact revision, publish one assigned review with a real authenticated/scoped actor, reproduce the 61-to-96 calculation from stored records, submit an application with a frozen evidence snapshot, perform a valid shortlist transition, show its audit event, and derive the institution signal—without a hardcoded identity, silent fallback, fabricated success, or unlabeled synthetic metric in that path.

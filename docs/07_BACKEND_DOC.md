# Backend specification

## 1. Request lifecycle

Each /api/v1 request receives a request ID, verifies authentication, resolves current membership, parses a strict schema, loads the target object's scope, checks authorization, executes domain logic and returns a bounded response. Reject unknown privileged fields such as reviewer_id, student_id or approval_status when those values must be derived from the session. Never trust client-calculated scores.

Use same-origin secure session cookies for the web application. Validate Origin on state-changing requests and use a CSRF token where the session integration requires one. Reject unauthorized cross-origin credentialed access. Session verification follows the selected Supabase SSR integration; server authorization must use verified identity rather than trusting unvalidated cookie contents. [S5]

## 2. Service contracts

IdentityService: resolveActor(session), listMemberships(actor), requireMembership(actor, org, role). OpportunityService: createDraft, updateDraft, publish, close. EvidenceService: saveDraftRevision, finalizeSubmission, listAccessibleEvidence. ReviewService: saveReviewDraft, publishReview, voidReview. MatchingService: calculateCoverage(student, opportunity, optionalSharedEvidenceSet). ApplicationService: apply, transition, withdraw. InsightsService: cohortGaps and pipelineCounts with enforced institution scope.

Return domain errors from services rather than HTTP responses; route handlers map them to the standard error envelope. Keep the scoring function pure and deterministic. Database access belongs to repositories or SQL functions, not React components.

## 3. Sensitive database functions

publish_opportunity checks actor membership, employer approval, valid requirements and weight sum, then writes publication and audit event. finalize_submission validates ownership, deadline, audience, rubric version and nonempty work; locks the selected draft and sets submitted_at. publish_review validates assignment and complete criterion scores; publishes review, skill attainments and outbox atomically. submit_application checks audience and evidence sharing; writes snapshot, status and grants. transition_application enforces actor-specific transitions and expected version; withdrawal revokes grants. void_review records reason and removes attainments from live eligibility.

For functions needing elevated execution, set a fixed search_path, schema-qualify references, revoke broad execution, derive auth.uid() inside the function and validate all target relationships. Elevated execution is not a replacement for authorization. Client roles cannot directly insert published reviews or skill attainments. Keep draft writes separately permissioned.

## 4. Concurrency and idempotency

Mutable aggregates carry integer version starting at 1. PATCH and transitions include expected_version. Database updates match id AND version; no match returns VERSION_CONFLICT. Publication/submit endpoints accept Idempotency-Key scoped to actor and operation. Store request hash and response reference for 24 hours as a proposed operational default. Reuse with the same payload returns the previous result; reuse with different content returns 409.

Unique constraints enforce one application per student/opportunity and one published review per submission revision/assignment. Lock the relevant row during publication. Network retries must not create duplicate attainments, notifications or status events. Keep transaction scope short and avoid AI/network calls inside transactions.

## 5. Validation rules

UUID identifiers, allowlisted enums, text length bounds and parameterized database queries are mandatory. Proposed limits: title 160 characters, description 12,000, evidence explanation 20,000, contribution statement 4,000, feedback per criterion 2,000; at most 10 reference links and 20 role skills. Only HTTPS URLs with a hostname are allowed in P0. Reject embedded credentials and javascript/data/file schemes. No backend fetching means link content is neither imported nor validated as trustworthy.

Published rubrics contain one criterion per mapped skill for P0, with four anchored proficiency levels. Weights are positive integer percentages totaling 100. Reject duplicate skill IDs in requirements or rubric mappings. Deadlines use database/server UTC time. Drafts may omit required fields; publication may not.

## 6. Background work

P0 can display in-app notifications directly from outbox-derived records. If a dispatcher is implemented, lease pending events, process with bounded retries and deduplicate by event_id plus recipient. Proposed retry delays are 1, 5 and 30 minutes before a failed state for operator inspection. Core transactions are successful independently of notification delivery.

P1 AI jobs have queued/running/succeeded/failed/cancelled states, a timeout, input digest and prompt/model version. Store only necessary redacted inputs and remove them according to retention. Human approval precedes publication. Do not let a model call privileged database functions.

## 7. Matching and snapshots

Live student matches use all currently active reviewed attainments owned by that student. Application snapshots calculate coverage using only the reviewed evidence the student selected to share. A student may therefore see a lower submitted score if they withhold evidence; show this before confirmation. The employer receives the snapshot, not unrestricted access to future private work.

Store opportunity version, scoring version, selected attainment IDs, contribution breakdown, calculation timestamp and total. Keep history immutable. If a review is voided, flag dependent snapshots and recompute a separately labeled current coverage if access permits. Never rewrite the historical score without explaining the correction.

## 8. Reports

Institution reports filter by active enrolled participants, selected published opportunities and reporting window. For a skill, a gap means the student's active reviewed level is below the role's required level. Count a student once per skill using the maximum requirement among the selected opportunities; disclose that aggregation rule. Show opportunities_count and students_count. Missing data is distinct from a reviewed level below threshold.

Production groups below five are suppressed. Demo mode allows synthetic small-sample display only with synthetic data and a visible banner. Do not expose raw student rows through an aggregate endpoint. CSV exports, if added later, sanitize formula-like cell prefixes and require separate authorization.

## 9. Logging and operations

Log request ID, endpoint, status, duration, scoped actor ID and error code. Do not log passwords, bearer tokens, evidence contents or contact details. Audit events record actor, action, object, time, reason and minimal changed fields. Use structured errors with safe user messages and detailed internal diagnostics. Add health checks that reveal no secrets.

## 10. Backend definition of done

Schema migrations and seed fixtures run from a clean database. All mutation paths enforce their domain rules inside the authoritative server/database boundary. RLS tests deny unauthorized reads and writes through direct database APIs as well as application routes. Review and application transactions roll back on injected failure. Optional integrations cannot block the core workflow.

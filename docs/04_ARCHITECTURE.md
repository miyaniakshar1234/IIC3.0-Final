# System architecture

## 1. Architecture decision

Use a modular monolith: one Next.js application serves the interface and REST API, with Supabase Auth and PostgreSQL as managed dependencies. Keep domain logic in testable server modules. Use PostgreSQL functions for multi-row transitions requiring atomicity. This is a team-size decision; microservices, Kafka, Kubernetes, a dedicated graph database and a separate vector service would add boundaries before the workflow has been validated.

Next.js route handlers provide the HTTP boundary, while Supabase's server-side guidance informs session integration. [S4, S5] The module breakdown below is our proposed design, not a framework requirement.

## 2. Component responsibilities

| Component | Responsibility | Trust level |
|---|---|---|
| Browser UI | Forms, evidence inspection, feedback | Untrusted input |
| Next.js API | Authentication, validation, authorization orchestration | Server |
| Domain services | Matching rules and business checks | Server |
| Postgres functions | Atomic publish, submit, review and transition | Privileged, tightly scoped |
| Postgres tables/RLS | Durable records and row access controls | Data boundary |
| Supabase Auth | Identity/session lifecycle | Managed dependency |
| Optional AI adapter | Draft suggestions, never final decisions | Untrusted output |

P0 has no server-side URL fetch, artifact code execution, document parser or arbitrary web browsing. P1 storage introduces private signed uploads and malware-handling requirements before file preview is enabled.

## 3. Logical topology

Browser requests the Next.js UI and /api/v1 endpoints. The API verifies the session, resolves the user's current organization memberships and validates request schemas. Read services use the caller-scoped database client. Sensitive mutations call narrowly scoped database functions with the caller identity. Optional background tasks consume outbox rows after successful transactions. AI requests, if enabled later, run through a server-only adapter with redacted input.

The browser must never possess a service-role secret. RLS and grants both require explicit configuration; Supabase documentation emphasizes the separate checks. [S6] Ordinary request handling should retain the caller's identity, even when the API has already authorized an action.

## 4. Modules

Identity resolves sessions, memberships and enrollment. Organizations handles approval. Opportunities owns publication and requirements. Challenges owns rubric versions and reviewer assignment. Evidence owns revisions and access grants. Reviews owns criterion scores, published assessments and voiding. Matching computes live role coverage. Applications owns snapshots and hiring transitions. Insights owns scoped aggregates. Audit records security-relevant changes. Notifications reads in-app outbox deliveries.

Modules call shared services through explicit functions rather than importing route handlers. UI code does not import database credentials or server-only modules. Shared contracts contain serializable types and schemas only. Keep generated database types separate from API response types to prevent accidental column exposure.

## 5. Review publication flow

The reviewer submits a complete draft with expected version. The API verifies current assignment and input types. The database function rechecks membership, assignment, self-review prohibition, submission state and rubric version. It locks the submission, inserts the immutable review and criterion scores, creates skill attainments, updates submission status and appends an audit/outbox event in one transaction. If any step fails, nothing is published.

Matching is computed on demand in P0 from active attainments; no cache invalidation is required for correctness. Client query invalidation refreshes relevant views after publication. P1 may add a cache keyed by student evidence version, opportunity version and scoring version. Cached results must not outlive revoked evidence or authorization.

## 6. Application flow

The server verifies opportunity publication/deadline/audience and selected evidence ownership. A transaction freezes the opportunity version, scoring version, selected attainments and calculated score; inserts the application and initial status history; and creates evidence grants for the employer. A unique constraint prevents duplicate applications. An idempotency key turns a network retry into the original result. Withdrawal revokes grants in the same transaction as the status change.

## 7. Data ownership and tenancy

Organization-owned rows carry org_id. Student-owned evidence carries student_id and is not implicitly employer-owned. Institution enrollment connects a student to a college but does not grant universal evidence access. Application grants connect selected evidence to an employer for a defined purpose. A user belonging to multiple organizations must choose an active organization, which the server validates against membership on each request.

Do not rely solely on an org_id submitted by the browser, a hidden UI button or a token role that may be stale. Foreign keys and scoped functions prevent linking a review, submission or opportunity to an unrelated organization.

## 8. Deployment model

Local development uses an isolated Supabase project or local Supabase stack with synthetic fixtures. A staging application uses separate credentials and an isolated database. The hackathon demo runs from staging with synthetic data. Production is a later promotion after pilot readiness, backups, access review and retention configuration. Hosting provider selection can remain flexible; choose a compatible managed Next.js runtime after checking its current deployment requirements and costs.

Browser-facing public configuration: application URL, Supabase project URL and publishable key. Server secrets: optional AI provider key and any tightly controlled administrative credential. Database passwords and privileged keys never belong in NEXT_PUBLIC variables, screenshots or the repository.

## 9. Reliability and scale

Use keyset pagination for opportunities/applications, indexes on ownership and join columns, and bounded reports. Do not load all students into browser memory. Start with live SQL aggregates over a small pilot; materialize large cohort reports only after measuring query plans. A transactional outbox supports retryable notification work. Delivery must not determine whether a review or application exists.

If notifications fail, users can still read status from the source record. If AI fails, manual entry remains available. If the database is unavailable, display a clear retry state and preserve unsent form text locally only where privacy permits. Do not claim a save that is not confirmed.

## 10. Architecture trade-offs

Managed Postgres reduces infrastructure work but creates a provider dependency; SQL migrations and an export plan reduce switching cost. Database functions strengthen atomicity but require careful review and restricted execution grants. A deterministic matcher is easy to explain but does not capture every dimension of job fit. Human review increases credibility but limits throughput. These are intentional trade-offs for a trustworthy prototype.

## 11. Later evolution triggers

Introduce background workers when AI/document processing exceeds request time limits. Add search infrastructure only when indexed Postgres search becomes insufficient under measured load. Separate a service only when scaling, ownership or isolation needs are demonstrated. Add external systems through adapters and explicit consent, not by scraping authenticated portals or assuming an API exists.

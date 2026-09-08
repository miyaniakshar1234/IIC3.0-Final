# Database model and authorization design

## 1. Conventions

Use PostgreSQL UUID primary keys, timestamptz timestamps in UTC and snake_case names. Foreign keys are indexed where used for joins or policies. Mutable rows use version integer NOT NULL DEFAULT 1. Core records include created_at and updated_at. Sensitive history is immutable through ordinary application permissions. This is a logical schema and migration specification, not executable migration code.

Use CHECK constraints for enums and numeric ranges, NOT NULL for required data and unique constraints for business identities. JSONB is reserved for immutable snapshots, rubric anchors and bounded metadata; do not place query-critical ownership or relationships solely inside JSON.

## 2. Identity and organization entities

| Table | Essential fields | Constraints |
|---|---|---|
| profiles | id FK auth.users, display_name, timezone | PK id |
| organizations | id, kind, name, status | kind institution/employer; approval enum |
| memberships | id, org_id, user_id, role, status | unique org/user/role |
| student_profiles | user_id, headline, program, graduation_year | PK/FK user_id |
| enrollments | id, student_id, institution_id, status, consent_at | one active institution/student in P0 |
| platform_admins | user_id, granted_by, granted_at | privileged administration only |

Organization kind and membership role must be compatible: employer recruiters cannot be inserted as institution coordinators. Enforce in controlled membership functions. Student enrollment is not a recruiter membership. Institution consent does not expose evidence bodies by default.

## 3. Skills and publication entities

| Table | Essential fields | Constraints |
|---|---|---|
| skills | id, slug, name, category, active | unique slug |
| skill_aliases | id, skill_id, normalized_alias | unique normalized_alias |
| declared_skills | student_id, skill_id, claimed_level | unique student/skill; level 1–4 |
| opportunities | id, employer_org_id, title, description, status, deadline, work_mode, compensation_kind, amount_minor, currency, duration_text, version | publication constraints |
| opportunity_audiences | opportunity_id, institution_id | unique pair |
| opportunity_skills | opportunity_id, skill_id, required_level, weight | unique pair; level 1–4, weight 1–100 |
| challenges | id, employer_org_id, opportunity_id nullable, title, brief, status, deadline, effort_minutes, ai_policy, rubric_version | positive effort |
| challenge_audiences | challenge_id, institution_id | unique pair |
| rubric_criteria | id, challenge_id, rubric_version, skill_id, title, anchors_json | unique challenge/version/skill |

The opportunity weight sum is a cross-row rule enforced by publish_opportunity; individual CHECKs cannot enforce the sum. Freeze published requirements and referenced rubric versions. A challenge linked to an opportunity must belong to the same employer and have an audience contained within the opportunity's audience for P0.

Compensation kind is paid, unpaid or unspecified. Paid requires nonnegative amount_minor, ISO currency and pay_period; add pay_period as a required paid-record field in the implementation. Unpaid/unspecified do not use a fake zero salary as a substitute for disclosure. Duration is descriptive in P0; structured dates can follow in the pilot.

## 4. Evidence and review entities

| Table | Essential fields | Constraints |
|---|---|---|
| submissions | id, student_id, challenge_id, current_revision, status, version | unique student/challenge in P0 |
| submission_revisions | id, submission_id, revision_no, rubric_version, title, body, contribution, submitted_at | unique submission/revision |
| evidence_links | id, revision_id, url, label | bounded count via service |
| reviewer_assignments | id, revision_id, reviewer_id, assigned_by, status | one active assignment/revision in P0 |
| reviews | id, assignment_id, revision_id, reviewer_id, status, published_at, void_reason | one published review/assignment |
| review_scores | review_id, criterion_id, level, rationale | unique review/criterion; level 0–4 |
| skill_attainments | id, student_id, skill_id, review_id, criterion_id, level, reviewed_at, valid_until nullable | unique review/criterion |
| correction_requests | id, student_id, review_id, reason, status, resolved_by | owner and linked-review validation |
| submission_events | id, submission_id, revision_id, actor_id, action, reason, created_at | append-only feedback/state history |

Level 0 in a review means “not demonstrated by this work,” and is distinct from no review. It contributes zero but remains useful feedback. A published review must contain exactly the criteria for its rubric version. The student's attainments are derived from review_scores; clients cannot insert or raise them. P0 has no automatic expiry; valid_until is reserved for a later explicit revalidation policy. Voiding a review makes linked attainments inactive through the query predicate.

Reviewer assignments and draft reviews also carry version. Request-changes feedback is stored in submission_events and does not create an attainment. Declining an assignment closes its access grant and returns the revision to the unassigned queue. Published-review uniqueness is enforced with an appropriate partial unique index; voided history remains retained.

An evidence artifact in P0 is a finalized submission_revision plus its links. P1 adds evidence_files with revision_id, private object key, size, media type, scan status and hash. A checksum detects identical bytes, not authorship or truth.

## 5. Applications and reporting entities

| Table | Essential fields | Constraints |
|---|---|---|
| applications | id, student_id, opportunity_id, status, snapshot_json, version, applied_at | unique student/opportunity |
| application_evidence | application_id, revision_id | unique pair; must belong to applicant |
| evidence_grants | id, application_id, revision_id, employer_org_id, granted_at, revoked_at | unique application/revision |
| application_events | id, application_id, actor_id, from_status, to_status, reason, created_at | append-only |
| outcomes | id, application_id, kind, status, start_date, end_date, confirmed_by, confirmed_at | one active outcome/application in P0 |
| audit_events | id, actor_id, action, entity_type, entity_id, org_id nullable, reason, metadata_json, created_at | append-only |
| outbox_events | id, type, payload_json, status, attempts, next_attempt_at | unique dedupe_key |
| notifications | id, recipient_id, event_id, read_at | unique recipient/event |
| idempotency_records | actor_id, operation, key, request_hash, result_ref, expires_at | unique actor/operation/key |

P1 intervention tables: interventions(id, institution_id, skill_id, title, owner_id, dates, status), intervention_participants(intervention_id, student_id), and intervention_measurements(intervention_id, window, cohort_count, reviewed_gap_count). Define these only when the feature is scheduled; they are not P0 dependencies.

## 6. Relationships

An employer owns opportunities and challenges. An opportunity has many required skills and applications. A student has submissions, each with immutable finalized revisions. An assignment links a reviewer to a revision; the published review creates skill attainments. An application selects revisions and creates employer grants. An institution relates to students through enrollments and to published content through audience tables. Skill catalog IDs connect requirements and reviewed attainments without a graph database.

## 7. Authorization policy matrix

| Data | Student | Reviewer | Recruiter | Coordinator |
|---|---|---|---|---|
| Own profile | Read/edit own | Own only | Own only | Enrolled basic profiles |
| Published opportunity | Within audience/public summary | Within audience | Own full records | Published audience records |
| Submission body | Own | Assigned revision | Active application grant | No default access |
| Published review | Own evidence | Assigned review | Granted evidence review | Aggregate only |
| Skill attainments | Own | Assignment context | Granted snapshot context | Cohort aggregate |
| Applications | Own | No default | Own employer | Enrolled status summary |
| Audit | Own relevant history via API | Relevant action history | Own-org subset | Own-org subset |

Platform administration is exceptional and audited, not a blanket UI data feed. Every exposed table requires explicit grants and RLS; views and database functions also need an access review. [S6] Test policies using multiple real authenticated identities, not only a service-role connection.

## 8. Index plan

memberships(user_id, status, org_id); enrollments(institution_id, status, student_id); opportunities(employer_org_id, status, deadline); opportunity_audiences(institution_id, opportunity_id); submissions(student_id, challenge_id); reviewer_assignments(reviewer_id, status); skill_attainments(student_id, skill_id, reviewed_at DESC); applications(opportunity_id, status, applied_at DESC, id); evidence_grants(employer_org_id, revision_id) WHERE revoked_at IS NULL; notifications(recipient_id, read_at); outbox_events(status, next_attempt_at). Add indexes only after checking existing PK/unique indexes to avoid duplicates.

## 9. Deletion and retention

Do not cascade-delete review history silently when an organization is suspended. Student deletion is a controlled workflow that revokes grants, removes personal profile/evidence content and retains only justified minimal operational records under the adopted policy. A policy decision must determine retention before a real pilot; no universal legal retention period is asserted here. Test deletion propagation through snapshots, exports and backups. P0 uses synthetic identities and can reset the entire isolated demo dataset.

## 10. Migration order and fixtures

Create identity/organizations, skills, publication tables, evidence/reviews, applications/grants, audit/outbox, functions, grants and RLS in that order. Seed two institutions and two employers to test isolation, then skills, accounts, publications and evidence. Add approved/pending/suspended organization fixtures. Never seed real classmates' personal data without consent. Rebuild the database from migrations before the final demo to catch undocumented console changes.

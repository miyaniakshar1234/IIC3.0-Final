# API specification — /api/v1

## 1. Protocol conventions

REST JSON over HTTPS. Web clients use verified same-origin sessions; privileged operations require current membership checks. IDs are UUID strings, timestamps ISO 8601 UTC, and versions positive integers. Success returns {data, meta}; errors return {error:{code,message,field_errors,request_id}}. List meta contains next_cursor and has_more. Default limit 20, maximum 100. Cursor pagination uses created_at plus id and an opaque cursor encoding; clients must not construct cursors.

POST creation returns 201; ordinary GET/PATCH and action success return 200; accepted asynchronous P1 AI work returns 202. Use 400 for malformed JSON, 401 for no valid session, 403 for a known disallowed action, 404 for missing or inaccessible private objects, 409 for state/version/idempotency conflicts, 422 for field/domain validation, 429 for rate limits and 503 for dependency failure. Include Retry-After on 429 where known. Responses must not expose database errors, SQL or secrets.

## 2. Identity and organization endpoints

| Method and path | Input | Result / permission |
|---|---|---|
| GET /me | None | Profile, memberships, active enrollment |
| PATCH /me | display_name, timezone | Own profile only |
| PATCH /me/student-profile | headline, program, graduation_year | Own student fields |
| PUT /me/declared-skills | skills[{skill_id,claimed_level}] | Replaces own declarations |
| GET /skills | q, limit, cursor | Active canonical catalog |
| GET /admin/organizations | status | Admin approval queue |
| POST /admin/organizations/{id}/decision | decision, reason, expected_version | Admin approve/reject/suspend |

Account sign-in, sign-out and password reset use Supabase Auth rather than parallel custom password endpoints. P0 memberships and reviewer assignments are seeded or admin-managed; general invitation management is P1. End users cannot assign themselves recruiter, coordinator or admin roles.

## 3. Opportunities and challenges

| Method and path | Input | Result / permission |
|---|---|---|
| GET /opportunities | q, skill_id, work_mode, cursor | Scoped summaries |
| POST /opportunities | org_id, draft fields | Employer member creates draft |
| GET /opportunities/{id} | None | Audience or owner detail |
| PATCH /opportunities/{id} | draft fields, expected_version | Owning employer, draft only |
| POST /opportunities/{id}/publish | expected_version | Approved employer, validates all fields |
| POST /opportunities/{id}/close | reason, expected_version | Owning employer |
| GET /opportunities/{id}/match | None | Current student's live breakdown |
| POST /challenges | org_id, opportunity_id, brief, rubric, audience | Employer draft |
| GET /challenges/{id} | None | Audience/owner task and rubric |
| PATCH /challenges/{id} | draft fields, expected_version | Owning employer, draft only |
| POST /challenges/{id}/publish | expected_version | Validates/fixes rubric version |
| GET /challenges | skill_id, opportunity_id, cursor | Published challenges within audience |

Opportunity draft fields: title, description, work_mode(remote/hybrid/onsite), location_text, duration_text, deadline, compensation{kind,amount_minor,currency,pay_period}, audience_institution_ids and requirements[{skill_id,required_level,weight}]. Kind is paid/unpaid/unspecified. Required levels are 1–4; weights total 100 on publication. Public summary responses exclude private employer contact data and all candidate data.

Challenge fields: title, brief, deadline, effort_minutes, ai_policy, audience_institution_ids and rubric[{skill_id,title,anchors:{1,2,3,4}}]. P0 maps each criterion to exactly one unique skill. Publication freezes the rubric and returns rubric_version. New versions require a replacement challenge in P0.

## 4. Evidence and reviews

| Method and path | Input | Result / permission |
|---|---|---|
| POST /submissions | challenge_id | Creates own draft and revision 1 |
| GET /submissions/{id} | None | Owner or specifically authorized context |
| PATCH /submissions/{id}/draft | title, body, contribution, links, expected_version | Own active draft |
| POST /submissions/{id}/finalize | expected_version | Locks revision; requires idempotency key |
| POST /submissions/{id}/revisions | expected_version | Own changes-requested submission |
| GET /reviewer/queue | cursor | Current reviewer's assignments |
| POST /review-assignments | revision_id, reviewer_id | Admin or challenge-owner authorized assignment |
| PUT /review-assignments/{id}/draft | scores[{criterion_id,level,rationale}] | Assigned reviewer draft |
| POST /review-assignments/{id}/publish | expected_version | Assigned reviewer; idempotent atomic publish |
| POST /review-assignments/{id}/request-changes | reason, expected_version | Assigned reviewer; sets changes_requested |
| POST /review-assignments/{id}/decline | reason, expected_version | Assigned reviewer; returns to assignment queue |
| POST /reviews/{id}/corrections | reason | Evidence owner requests correction |
| POST /admin/reviews/{id}/void | reason | Admin; invalidates active attainments |
| GET /me/passport | None | Own reviewed/declared evidence grouping |

For reviewer draft concurrency, reviewer_assignments includes version, incremented whenever the draft changes. Draft reviews are stored with status=draft; publication converts the current draft to published under lock. Review scores allow level 0 as “not demonstrated,” even though requirement levels start at 1.

Requesting changes is distinct from publishing a scored review: it creates feedback and a state event but no attainments. Declining an assignment revokes the reviewer access associated with it and permits reassignment; it does not reject the student. Both actions are transactional and audited.

## 5. Applications, outcomes and insights

| Method and path | Input | Result / permission |
|---|---|---|
| POST /applications | opportunity_id, selected_revision_ids, sharing_confirmed | Current student; idempotent |
| GET /me/applications | status, cursor | Own applications |
| GET /opportunities/{id}/applications | status, cursor, sort | Owning employer |
| GET /applications/{id} | None | Owner or owning employer; coordinator summary variant |
| POST /applications/{id}/transitions | to_status, reason, expected_version | Actor-specific allowed transition |
| POST /applications/{id}/outcome | kind, dates, status, expected_version | Authorized employer/coordinator |
| GET /institutions/{id}/insights/gaps | opportunity_ids, from, to | Institution coordinator; aggregate only |
| GET /institutions/{id}/insights/pipeline | from, to | Scoped status counts |
| GET /notifications | cursor, unread_only | Recipient only |
| PATCH /notifications/{id} | read:true | Recipient only |

sharing_confirmed must be true, but this field alone does not grant arbitrary access: the server validates evidence ownership and creates scoped grants. Applying with no reviewed evidence is allowed; the snapshot reports 0 reviewed coverage and shows declarations separately. selected_revision_ids may therefore be empty.

Outcome writes require application status accepted. kind is internship or placement; status is pending, completed, cancelled or unconfirmed. confirmed_by is derived from the authenticated actor, never accepted as a client field. A new outcome starts pending or unconfirmed; a later update can confirm completion. P0 uses the same upsert endpoint under expected_version, with one active record per application.

## 6. Example — publish review

Request: POST /api/v1/review-assignments/{assignment_uuid}/publish with Idempotency-Key and body {"expected_version":3}. The draft already contains criterion scores and rationale; publication must validate them again. Response 200: {"data":{"review_id":"<uuid>","status":"published","submission_status":"reviewed","attainments_created":1},"meta":{"request_id":"<uuid>"}}. Angle-bracket values in this document are illustrative placeholders, not valid payload UUIDs.

If the assignment is not current, return 409 STATE_CONFLICT. If a criterion is missing, return 422 INCOMPLETE_RUBRIC with field_errors. If a second publish repeats the same idempotency key and payload, return the original result without a second assessment.

## 7. Example — match response

GET /api/v1/opportunities/{opportunity_uuid}/match returns data containing opportunity_id, opportunity_version, scoring_version="coverage-v1", calculated_at, reviewed_coverage=61, and skills. An SQL row contains required_level=3, reviewed_level=null, weight=35, contribution=0, evidence_revision_id=null, status="not_yet_demonstrated". The communication row contains required_level=4, reviewed_level=3, weight=16, contribution=12 and a reviewed evidence reference.

Also return eligibility{status:"eligible"|"ineligible"|"unknown",reasons:[]}; eligibility is separate from coverage. For P0, eligibility primarily checks audience and deadline; do not invent degree/grade exclusions. Gap suggestions return challenge IDs only when a published challenge covers the missing skill within the student's audience.

## 8. Example — application and conflict

POST /api/v1/applications with Idempotency-Key and {"opportunity_id":"<uuid>","selected_revision_ids":["<uuid>"],"sharing_confirmed":true} returns 201 with application_id, status="submitted", version=1 and the frozen snapshot. The server, not the request, supplies student_id and score.

A transition request {"to_status":"shortlisted","expected_version":1,"reason":"Relevant reviewed SQL evidence"} succeeds only for the owning employer. A simultaneous request still using version 1 receives 409 VERSION_CONFLICT with current_version=2. The client must refetch; it must not silently overwrite.

## 9. Limits and error catalog

Proposed initial limits: 60 ordinary requests/minute/user, 10 finalizations/minute/user, 10 review publications/minute/user, and 5 optional AI drafts/hour/user. Enforce through a shared database or host-supported durable limiter, not process memory alone. Tune after observing real usage.

Stable error codes: VALIDATION_ERROR, UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, VERSION_CONFLICT, STATE_CONFLICT, IDEMPOTENCY_MISMATCH, DUPLICATE_APPLICATION, DEADLINE_PASSED, ORGANIZATION_NOT_APPROVED, INCOMPLETE_RUBRIC, EVIDENCE_NOT_OWNED, RATE_LIMITED and DEPENDENCY_UNAVAILABLE.

## 10. P1 endpoints and contract delivery

Reserve P1 /ai/drafts, /ai/jobs/{id}, /evidence/uploads, /evidence/files/{id}/download, /interventions and /shares. They are not part of the P0 acceptance gate and should not return fabricated success. At implementation, derive an OpenAPI specification from shared schemas or write one alongside these contracts; CI should check documented routes, payloads and generated client types for drift. This pack provides the endpoint specification, not a validated executable OpenAPI file.

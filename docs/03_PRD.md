# Product requirements document

## 1. Product objective and assumptions

Deliver a complete, persistent workflow from industry requirement to reviewed student evidence and a human hiring decision. The initial audience is a single department and a small invited employer group. A four-person student team is assumed for planning; exact available hours and final event timing are not known. P0 must work with manually entered data and without an LLM or external job integration.

Product success means users understand what the evidence says and can take the next action. It does not mean maximizing an opaque score or collecting the most personal data. This specification is proposed version 1.0, with no implementation completion implied.

## 2. Personas

Student: creates a profile, chooses a target role, submits work, reads feedback, applies and controls sharing. Reviewer: an assigned faculty or employer member who evaluates an artifact and records evidence-linked feedback. Recruiter: a verified employer member who creates opportunities and manages applications for that employer. Institution coordinator: a member who manages college participation and sees authorized cohort information. Platform admin: manages approvals and exceptional moderation, with reason-logged access.

Users may hold multiple memberships. A role selected in the UI is not an authorization grant. Student enrollment belongs to one institution for P0. Employer access crosses institution boundaries only through publication audiences, reviewer assignments and explicit student application grants.

## 3. Scope and priority

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Authentication and membership-scoped workspaces | P0 |
| FR-02 | Organization approval and opportunity publication | P0 |
| FR-03 | Student profile and self-declared skill labels | P0 |
| FR-04 | Versioned role requirements and challenge rubric | P0 |
| FR-05 | Private text/link evidence submission | P0 |
| FR-06 | Assigned human review and published assessment | P0 |
| FR-07 | Evidence passport and explainable matching | P0 |
| FR-08 | Application and valid status transitions | P0 |
| FR-09 | Institution cohort-gap and pipeline views | P0 |
| FR-10 | Audit events and correction requests | P0 |
| FR-11 | Simple internship/outcome record | P0 |
| FR-12 | In-app notifications | P0 after core loop |
| FR-13 | Private file upload and safe preview | P1 |
| FR-14 | AI requirement/rubric drafting | P1 |
| FR-15 | Faculty intervention records and follow-up | P1 |
| FR-16 | Public share links, calendar, exports | P1 |
| FR-17 | Team formation and cross-college projects | P2 |

Use text and manually entered HTTPS reference links for P0 to reduce upload risk. Links are displayed for a human to open, never fetched by the server. A challenge may require a pasted artifact excerpt, a repo URL and an explanation. GitHub is optional.

## 4. Core user stories and acceptance criteria

### FR-01: Enter the correct workspace

Given an authenticated user with an approved employer membership, when they open the employer workspace, they can manage only that employer's objects. A student changing the path or request body to another role receives no extra privileges. A revoked member loses access on the next authorization check. Anonymous users see only the landing page and explicitly public opportunity summaries.

### FR-02 and FR-04: Publish usable requirements

An approved recruiter drafts an internship with title, description, location mode, expected duration, application deadline, compensation disclosure, audience institution, skills, required levels and weights. Publication fails if weights do not total 100, a level is outside 1–4, the deadline is past or the organization is unapproved. Drafts may be incomplete. Published requirements are immutable in P0; material changes require a new opportunity version or a replacement posting. Existing application snapshots remain unchanged.

### FR-05: Submit evidence

A student joins an open challenge within its audience and submits a title, explanation, contribution statement and permitted HTTPS references. The server captures a final revision and the rubric version. Empty evidence, a closed challenge, a duplicate finalization or unauthorized identity is rejected. Drafts can be edited; a submitted revision cannot. Resubmission creates a new revision after changes are requested. Client clocks cannot override deadlines.

### FR-06: Review fairly

An assigned reviewer who is not the submitter scores every required rubric criterion and supplies a rationale. Saving a draft does not change the student's skill profile. Publishing validates completeness and writes review, attainments and audit event atomically. The student can see reviewer identity, date, criteria and feedback. An unassigned colleague cannot publish a review. A correction request alerts moderation; P0 does not automatically delete a disputed review.

### FR-07: Explain skill coverage

The opportunity detail lists each skill, required level, selected reviewed level, evidence reference and weighted contribution. The same input and scoring version yield the same score. No reviewed evidence yields “Not yet demonstrated,” never “No ability.” A score is not a hiring probability. When a selected review is voided, its attainment stops contributing on the next read. The UI displays when data was calculated.

### FR-08: Apply and progress

A student may apply once per opportunity while it is open and within the permitted audience, even with low coverage unless a separately disclosed eligibility rule is unmet. Application confirms which evidence will be shared. Submission creates a frozen match/evidence snapshot and initial status history in one transaction. Recruiters can move applications only through the defined transitions. Withdrawal removes active employer access to underlying evidence; minimal historical status can remain under the retention policy.

### FR-09: Support the college

Coordinators can see only participating students in their institution. Gap reports show selected open opportunities, sample counts, skill denominator and time window. Production aggregation suppresses groups below five students. Synthetic demo mode can show small groups with an explicit banner. Recruiters cannot query college-wide student records through this view.

### FR-11: Record outcomes honestly

Following an accepted offer, an authorized recruiter or coordinator can record internship dates and a pending/completed outcome. Completion requires an attributed confirmation. “Offer,” “accepted,” “internship completed” and “placement confirmed” are distinct states. A self-report is labeled unconfirmed. Seeded outcomes in the demo are labeled simulated.

## 5. Domain state machines

Organization: pending → approved or rejected; approved → suspended; suspended → approved after admin review. Suspension blocks publication and new reviews but preserves student access to their own history.

Opportunity: draft → published → closed → archived. A published posting may be closed early with a reason. Deadline expiration prevents applications whether or not a scheduled closure job has run.

Submission: draft → submitted → under_review → reviewed OR changes_requested. From changes_requested, a student creates a new draft revision. Published reviews are immutable; an admin can void one with a reason, then request a replacement review.

Application: submitted → shortlisted → interview → offered → accepted. Recruiters can reject from submitted, shortlisted, interview or offered. Students can withdraw before accepted, or decline offered. After accepted, cancellation and completion belong to the outcome record and need a reason. Rejected, withdrawn and declined are terminal for P0; reapplication is P1.

## 6. Permissions and sharing

Student evidence is visible to the owner, the specifically assigned reviewer, and the employer receiving an active application grant for the selected evidence. A college coordinator sees profile and aggregate data for consenting enrolled participants, not every private artifact by default. Moderation access requires an explicit reason and an audit event. No automatic public profiles in P0.

Applying selects an immutable set of evidence revision IDs. Later submissions are private until shared. Review data already included in an application snapshot remains labeled as historical; a voided source receives a warning and no longer contributes to live scores. Downloaded copies cannot be technically recalled, which must be explained at sharing time.

## 7. Product quality targets

Targets for a small pilot, subject to measurement: ordinary server reads p95 below 1 second under 20 concurrent sessions; common pages interactive within 3 seconds on a reasonable mobile connection; match calculation below 500 ms for one role and a 20-skill profile; no horizontal overflow at 360 px; keyboard completion of the entire P0 journey; no unauthorized cross-organization data access in tests. These are acceptance targets, not guarantees or measured results.

Avoid a production uptime promise for a student prototype. Measure errors, slow requests and data integrity before promising service levels. Every mutating form must show pending, success, validation and retry states. Never invent a successful save after a timeout.

## 8. Product analytics

Track challenge_viewed, submission_finalized, review_published, match_viewed, application_submitted and application_status_changed with event ID, timestamp, actor pseudonymous ID, organization scope and entity ID. Do not attach evidence text, names or contact information to analytics. Count unique students and opportunities consistently; remove duplicate retries.

North-star pilot measure: proportion of active participating students who obtain at least one reviewed evidence item and use it in an application within the pilot window. Pair this with review turnaround and student usefulness feedback. Interview and placement measures require longer follow-up and honest denominators.

## 9. Release and change control

P0 releases only when the complete demo path and cross-tenant denial tests pass. Functional gaps are listed visibly in the README. New features need an owner, acceptance criteria, scope label and effect on schema/API. If a feature threatens the review-to-match loop, move it to P1. The PRD governs scope; database and API documents govern implementation contracts; changes affecting multiple documents must be updated together.

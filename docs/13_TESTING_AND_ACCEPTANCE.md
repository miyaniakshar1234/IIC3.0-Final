# Testing and acceptance plan

## 1. Testing strategy

Prioritize failures that invalidate the project: unauthorized data access, fake reviewed skills, broken review-to-match updates, duplicate applications and lost submissions. Unit tests check deterministic rules; database tests check constraints and grants; API tests check contracts; end-to-end tests check the role journeys. Visual/manual checks cover clarity, accessibility and demo readiness. These are planned tests, not claims that an application has passed them.

## 2. Required P0 scenarios

| ID | Scenario | Expected result |
|---|---|---|
| T-01 | Student calls employer publish endpoint | Denied; no record changed |
| T-02 | Employer B requests Employer A applicant | 404/denied; no private fields |
| T-03 | Student inserts skill attainment directly | Database denies |
| T-04 | Submit challenge after deadline | DEADLINE_PASSED |
| T-05 | Finalize same draft twice with same key | Same submission result |
| T-06 | Unassigned reviewer publishes | Denied |
| T-07 | Review has missing criterion | 422; no attainments |
| T-08 | Review transaction fails midway | Entire publish rolled back |
| T-09 | Worked example before/after review | Exactly 61 then 96 |
| T-10 | Save review draft only | Coverage remains 61 |
| T-11 | Apply twice concurrently | Exactly one application |
| T-12 | Student supplies another student's evidence | EVIDENCE_NOT_OWNED |
| T-13 | Withdraw application | Employer evidence grant revoked |
| T-14 | Stale application version transition | 409; original state preserved |
| T-15 | Voided review | Excluded from live score; history flagged |
| T-16 | AI disabled/unavailable | Entire P0 loop still works |
| T-17 | Small real cohort report | Counts suppressed |
| T-18 | Logout then new account | No previous private cache visible |
| T-19 | Suspended employer publishes/reviews | Denied |
| T-20 | Page refresh after every major action | Persistent correct state |

## 3. Unit and property checks

Coverage stays in 0–100 for valid inputs. Empty evidence gives zero reviewed coverage. Weights not totaling 100 are rejected before publication. Exceeding required level does not exceed a skill's weight. Adding unrelated evidence does not alter the score. Tie resolution is deterministic. Self-declared levels never affect reviewed coverage. Review voiding removes only the affected active attainment, allowing another valid attainment to take its place.

Transition tests cover every allowed edge and representative denied edges. Review criteria must belong to the fixed rubric version. Application snapshot calculation includes only shared revisions. Date boundary tests use server UTC just before, at and after deadline; equality with deadline is closed for new submissions/applications.

## 4. Authorization tests

Create Student A and Student B at Institution A, Student C at Institution B, Recruiter A and B at different employers, an assigned reviewer and an unassigned reviewer. Use authenticated tokens and direct database access through the normal client role. Assert both positive and negative access for SELECT, INSERT, UPDATE and DELETE where applicable. A passing UI test does not establish RLS correctness.

Test organization-membership revocation, evidence grant revocation and cross-organization foreign-key combinations. Verify views/functions do not accidentally return protected rows. Test service-role absence in browser bundles and logs. Test that query parameters cannot widen institution report scope.

## 5. End-to-end demo test

Recruiter publishes a valid role/challenge. Student opens the role and sees 61 coverage from seeded prior reviews. Student submits SQL evidence. Assigned reviewer publishes level 3. Student sees 96 after refetch and refresh. Student selects reviewed evidence and applies. Recruiter inspects the submission snapshot and shortlists. Coordinator sees the updated cohort gap. A separate test progresses through offer, acceptance and simulated internship completion.

## 6. Performance checks

Seed a representative synthetic pilot dataset: 100 students, 20 opportunities, 30 challenges and 500 attainments. This is a load fixture, not a product traction claim. Measure p95 response times at 20 concurrent sessions for opportunity list, passport, application list and a cohort report. Record environment and dataset size with results. If a query is slow, inspect its plan and ownership indexes before introducing caching or infrastructure.

## 7. Accessibility and usability

Manually complete login, challenge submission, review and application by keyboard. Check focus, labels, dialog dismissal, announced errors and zoom. Test 360 px mobile width. Ask a beginner to explain a coverage score and locate its evidence without help. Ask a reviewer to publish a complete assessment. Record task success, confusion and time rather than using an ungrounded “intuitive UI” claim.

## 8. Release gate and defect severity

Block release for any cross-tenant leak, score tampering, broken transaction, lost finalized work or inability to complete the core journey. Fix major form errors and confusing sharing behavior before a real pilot. Cosmetic issues can be documented if they do not block understanding. AI drafting, uploads, chat and advanced analytics are not allowed to displace P0 fixes.

Completion evidence: clean migration run, relevant automated test outputs, production build, role journey recording, measured performance notes and an honest known-limitations list. Stop optional testing once the concrete gates pass; use remaining time for the presentation and contingency rehearsal.

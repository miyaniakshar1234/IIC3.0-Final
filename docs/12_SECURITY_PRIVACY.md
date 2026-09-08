# Security and privacy specification

## 1. Protection goals

Protect student work, identity, application status and reviewer decisions. Prevent one employer from browsing another employer's candidates. Prevent a student from changing reviewed skills. Preserve a traceable record of meaningful changes. Give students understandable sharing controls. These are product and engineering safeguards; this document is not a legal compliance certification.

## 2. Threat model

| Threat | Example | Required control |
|---|---|---|
| Object-level access failure | Change an application UUID | Check owner/org/grant at API and DB |
| Privilege escalation | Submit role=admin | Membership controlled by privileged workflow |
| Score tampering | Post reviewed_level=4 | Attainments only from publish-review transaction |
| Stored script injection | Script in evidence text | Escape output; no raw HTML |
| Link abuse | Unsafe protocol or server fetch | HTTPS allowlist; no server fetch in P0 |
| CSRF | External form triggers a stage change | Origin/session safeguards |
| Prompt injection | Evidence tells AI to leak data | No tools/secrets; schema validation |
| Review conflict | Review own submission | Assignment and identity check |
| Oversharing | Export all student records | Minimal scoped fields and consent |
| Duplicate action | Retried offer/application | Idempotency and transaction constraints |

Use the OWASP API Security project as a review checklist for API risks. [S7] The controls here are proposed design requirements; they still need implementation and testing.

## 3. Permission model

Deny access by default. Validate a current approved membership on every privileged operation. Use object-specific evidence grants for employers. Ensure direct Supabase API paths cannot bypass business restrictions. Revoke client writes to published reviews, attainments, audit events and organization approvals. Audit elevated database functions and security-definer behavior carefully.

Suspending an employer blocks new publication, assignments and candidate decisions. Existing students retain their own records. Revoking a reviewer membership prevents future review publication. A platform admin must enter a reason for evidence access or review voiding; log actor, scope and time.

## 4. Evidence sharing UX

Before applying, show the employer, purpose and exact evidence revisions selected. Explain that access persists while the application is active under the adopted policy. Withdrawal revokes future in-app access. Explain that copies already downloaded or viewed cannot be recalled. Public sharing is disabled in P0. Never preselect unrelated private artifacts merely to increase a match score.

Students can inspect their sharing history and request correction of a review. Coordinator access is limited to enrollment and aggregate participation information unless a separate justified grant exists. Employer access to an application never becomes a permission to browse the student's private passport.

## 5. Data minimization and retention

Collect display name, account identity, program, graduation year, optional headline and evidence needed for the workflow. Do not request Aadhaar, bank details, caste, religion, medical information or family income for P0. Do not infer protected attributes for ranking. Avoid collecting dates of birth unless a later eligibility requirement has a legitimate basis.

Before a real pilot, adopt and publish retention windows with institutional review. Proposed operational starting points for discussion: short-lived application logs, deletion of failed AI drafts after troubleshooting, and a defined end-of-pilot cleanup date. Do not label those as legal requirements. Keep data export, deletion and backup treatment in the policy so users understand residual retention.

## 6. File handling — P1 gate

Private uploads require owner-prefixed random object keys, maximum size/type limits, file signature inspection, malware scanning or quarantine, safe content-disposition and short-lived signed download URLs. A failed or pending scan blocks preview. Never execute submitted code in the app server. Browser previews must not render arbitrary HTML or active office content. Text/link-only P0 avoids this subsystem entirely.

## 7. Account and secret handling

Keep secrets in environment management, not source or AI prompts. Use separate dev/demo/prod environments. Restrict administrator access and consider MFA before real production use. Rate-limit auth and sensitive mutation routes. On leaked credentials, revoke/rotate, assess access logs and notify affected parties through the agreed incident process. A demo login should have only its role's privileges and use synthetic records.

## 8. Incident and operational response

Assign an incident owner. For suspected data exposure, disable the affected function or suspend the account, preserve minimal relevant logs, assess scope, fix the authorization flaw and verify with denial tests. Follow the applicable institutional and legal notification process after determining obligations; do not invent a universal notification deadline. Keep a documented contact route for student complaints and review disputes.

## 9. Real-pilot readiness questions

Who controls student data? Who approves employer participation? Who is allowed to review? What happens when a student withdraws? How long are applications retained? Are all participants adults, and what policy applies otherwise? Which model providers, if any, receive personal data? Which agreements cover employer work samples? Resolve these with the institution before collecting real pilot data. Synthetic hackathon demonstration can proceed without representing these agreements as signed.

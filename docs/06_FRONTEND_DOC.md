# Frontend specification

## 1. Frontend principles

Make the next useful action obvious. Every number should lead to its evidence or denominator. Persist business data on the server; never let browser mock state masquerade as a completed application. Keep route access, object authorization and UI affordances consistent. Hide unavailable actions for clarity while still enforcing authorization on the server.

Use server-rendered shells and initial data where appropriate, with client components for forms, filters and interaction. Use TanStack Query for client-owned remote state; do not maintain a second conflicting copy of the same entities in a global store. Local component state holds temporary selections and modal visibility.

## 2. Route map

| Route | Audience | Main purpose |
|---|---|---|
| / | Public | Product explanation and sign-in |
| /login | Public | Authentication |
| /onboarding | Authenticated | Basic profile, membership status |
| /student | Student | Next action and recent feedback |
| /student/passport | Student | Reviewed and declared skills |
| /opportunities | Authorized/public summaries | Search and filters |
| /opportunities/[id] | Eligible audience | Requirements, gaps, apply |
| /challenges/[id] | Challenge audience | Task, rubric, deadline |
| /student/submissions/[id] | Owner | Revision and review history |
| /student/applications | Student | Application timeline |
| /employer/opportunities | Employer member | Drafts and published roles |
| /employer/opportunities/[id]/applicants | Owning employer | Evidence-based screening |
| /reviewer/queue | Assigned reviewer | Pending assessments |
| /reviewer/submissions/[id] | Assigned reviewer | Rubric and work comparison |
| /institution/insights | Coordinator | Cohort gaps and pipeline |
| /admin/organizations | Platform admin | Approvals and suspensions |
| /settings/privacy | Authenticated | Sharing and correction controls |

UI routes are distinct from /api/v1 resource endpoints. A user with several memberships receives a workspace switcher populated only by server-authorized memberships.

## 3. Student home

Start with “Your next step” rather than a grid of decorative totals. Show one recommended challenge linked to a selected target opportunity, the student's latest review and active applications. An empty account sees “Add your first evidence” and a beginner-friendly challenge. Recommendations must explain why they appear. A student may dismiss the recommendation or change their target.

The evidence passport groups reviewed skills, self-declared skills and evidence awaiting review. Each row shows skill, level, evidence count and date. Selecting a skill opens an evidence drawer with rubric result, reviewer and contribution statement. A review badge reads “Reviewed by [name] on [date]”; avoid a generic green check suggesting identity or official accreditation.

## 4. Opportunity detail

Desktop uses a main content area and a narrow action sidebar. Show title, employer approval status, compensation disclosure, work mode, deadline, requirements and application status. The coverage panel shows reviewed coverage, unknown/undemonstrated skills and per-skill contributions. “How this is calculated” expands the formula and version.

The primary action is Apply while open; after application it becomes View application. A secondary action opens a challenge related to an unmet skill. The application confirmation lists selected evidence and employer access before the student submits. Do not imply that a high coverage score guarantees eligibility or selection.

## 5. Challenge workspace

Present brief, time estimate, permitted tools/AI use, deliverables, rubric, review expectations and deadline before the editor. The P0 editor supports text and explicit HTTPS links. A contribution statement asks what the student did, what help they used and what they would improve. Draft save is explicit and displays the last confirmed save time. Local unsaved text warning appears before navigation.

Final submission opens a confirmation explaining that this revision is locked and human review is required. On timeout, check submission state before retrying. A changes-requested state opens a new revision while preserving earlier work. An unavailable reviewer state tells the student that the submission is waiting; it never fabricates feedback.

## 6. Reviewer workspace

The queue sorts by due date and waiting time. The detail screen places evidence and rubric side by side at desktop widths, stacked on mobile. Each criterion has a level selector with anchors and a rationale field. Missing criteria are clearly marked. Draft save does not publish. Publish review displays the assessment summary and requires deliberate confirmation because it changes evidence records.

Show declared conflicts and a Decline assignment action. A reviewer cannot review their own work. Two reviewers publishing the same assignment should produce one success and one conflict response; the second screen refreshes rather than silently overwriting.

## 7. Employer and college screens

Applicant rows show candidate display name, status, reviewed coverage, evidence count and application date. Use explicit column sorting and a stable tie-breaker. Selecting a candidate opens the submitted evidence snapshot alongside current warnings. Stage changes require a reason where appropriate and display a timeline.

The institution view shows cohort selector, selected opportunity sample, reporting window and student count. Skill gaps appear as a sortable table with counts and percentages, not a decorative radar chart. Selecting SQL shows required levels and the anonymized distribution. Small groups are suppressed outside demo mode. P1 adds “Propose intervention”; do not show a dead button in P0.

## 8. Component inventory

AppShell, WorkspaceSwitcher, PageHeader, EmptyState, ErrorState, PendingButton, SkillEvidenceRow, EvidenceDrawer, CoverageBreakdown, ChallengeBrief, RubricEditor, ReviewSummary, ApplicationTimeline, CandidateTable, CohortGapTable, ConsentDialog and AuditReasonDialog. Each component documents input types, keyboard behavior, loading state and permission assumptions.

## 9. State and request behavior

Use query keys that include active organization and object ID. Clear sensitive cached data on logout and workspace change. Invalidate passport and match queries after review publication; invalidate application lists after submission or stage changes. Do not optimistically increase reviewed coverage or mark an offer accepted before server confirmation.

Validation uses shared schemas for immediate feedback, but server validation remains authoritative. Dates are stored as UTC and rendered in the user's configured zone with the zone visible near deadlines. Monetary values are integer minor units with ISO currency; compensation can also be explicitly unspecified. Avoid floating-point price inputs in stored payloads.

## 10. Responsive and accessibility behavior

At 360 px, use stacked cards and a compact navigation menu; tables offer a readable card equivalent or controlled scroll with sticky identification. At 768 px, collapse secondary navigation. At 1280 px, show the full workspace and side panels. Avoid hover-only actions. Restore focus after dialogs, announce save/error status and associate every input with a label. Respect reduced-motion preferences. Design toward WCAG 2.2 AA and verify relevant criteria rather than claiming certification. [S8]

## 11. Frontend completion checks

Every route has loading, empty, permission-denied, error and success behavior. Refresh preserves finalized work. Back/forward navigation does not resubmit forms. Long names, long feedback and narrow screens remain readable. Role switches do not leak prior cached data. The real API drives the final demo. Mock fixtures are confined to development or labeled demo seed data.

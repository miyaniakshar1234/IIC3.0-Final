# Risks, decisions, assumptions and source register

## 1. Decision log

ADR-01: Choose a modular monolith to reduce team coordination and deployment overhead. Revisit only after measured scaling or ownership needs.

ADR-02: Use deterministic role coverage, not AI ranking. Reason: explainability, repeatability and a reliable demo. Revisit with measured evaluation and a human decision boundary.

ADR-03: Human review creates attainments. Self-declared claims and AI outputs remain separate. Reason: meaningful provenance and avoidance of fabricated verification.

ADR-04: P0 evidence is text plus human-opened HTTPS links. Reason: reduce upload/parser/security scope while preserving the central workflow.

ADR-05: Private evidence with application-specific sharing. Reason: students should control what an employer receives. Public portfolios are P1.

ADR-06: Compute live matches on read; freeze application snapshots. Reason: simple correctness plus historical explainability. Cache only after profiling.

ADR-07: One active institution per student and one active reviewer assignment per revision in P0. Reason: bounded permission and workflow complexity. Multi-institution enrollment and panel review are later extensions.

ADR-08: Faculty intervention creation is P1, while a scoped gap report is P0. Reason: demonstrate academia participation without hiding an unbuilt workflow behind a button.

## 2. Risk register

| Risk | Severity | Mitigation / owner |
|---|---|---|
| Overbuilding before demo | High | Freeze P0; integration lead |
| Cross-organization exposure | Critical | RLS + API denial tests; backend owner |
| Review bottleneck | High | Bounded challenge intake; pilot coordinator |
| Inconsistent reviewer levels | High | Anchored rubric/calibration; review lead |
| Unpaid production work | High | Moderation and effort cap; employer coordinator |
| AI fabricated requirements | Medium | Human approval/manual fallback; product owner |
| Weak or absent partnerships | High | Pilot discovery; team lead |
| Demo internet failure | Medium | Recorded actual run; demo owner |
| Misleading score interpretation | High | Labels/formula/usability checks; design owner |
| Agent-generated security shortcut | Critical | Manual review and direct API tests; lead |

## 3. Assumptions to confirm

The team reports final-round selection and the supplied statement. The exact competition deadline, required artifacts, rubric and demo duration are unknown. Four-person planning reflects the team's recent context and should be adjusted if composition changed. Employer participation, student consent and institutional approval are not established. The working name has not undergone trademark/domain checks. The stack is proposed and dependency versions remain to be pinned. The 48-hour plan is an illustrative allocation, not a delivery promise.

## 4. Source use and limits

Sources were consulted on 8 September 2026 for public product context and official engineering guidance. These documents are a product design proposal, not a comprehensive market review or a Deep Research report. Source descriptions establish context only; proposed features, formula, architecture, targets and business hypotheses are original design recommendations for this project. No market size, placement uplift or model accuracy is inferred from them.

S1 — Handshake student offering. Supports the statement that an existing platform offers career opportunities and employer connections. It does not establish that Handshake lacks evidence workflows. https://joinhandshake.com/students/

S2 — Forage. Supports the existence of work-like job simulations and the need to distinguish simulation from employment. It does not establish novelty of challenge-based learning. https://www.theforage.com/

S3 — AICTE National Internship Portal. Supports the presence of an internship portal in the Indian context. No integration, endorsement or partnership is implied. https://internship.aicte-india.org/

S4 — Next.js route handlers. Official implementation reference for the selected HTTP boundary. https://nextjs.org/docs/app/getting-started/route-handlers

S5 — Supabase server-side client guidance. Official session/client integration reference; follow the current framework-specific instructions during implementation. https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs

S6 — Supabase Row Level Security. Official reference for grants, policies and scoped database access. https://supabase.com/docs/guides/database/postgres/row-level-security

S7 — OWASP API Security Project. Reference checklist for reviewing API threats. This is not a claim of completed security certification. https://owasp.org/www-project-api-security/

S8 — W3C WCAG 2.2. Accessibility target reference. Conformance requires implementation evaluation. https://www.w3.org/TR/WCAG22/

## 5. Glossary

Attainment: a skill level attributed to reviewed evidence. Coverage: weighted comparison of active reviewed attainments against a role. Evidence Passport: the student's organized evidence and review history. Grant: permission for an employer to read a specific shared revision. Rubric: anchored criteria for assessing submitted work. Snapshot: frozen requirements, evidence selection and score at application time. Tenant: an organization boundary. P0: core hackathon scope. P1: pilot extension. P2: longer-term exploration.

## 6. Consistency rules for future edits

If the scoring formula changes, update the worked example, seed fixtures, API response and tests together. If sharing changes, update PRD, database grants, backend transactions and privacy copy. If a feature moves into P0, add endpoints, tables and acceptance criteria before implementation. Keep claims about implementation separate from design intent. Date and attribute all research, pilot results and genuine partner confirmations.

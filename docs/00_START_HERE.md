# ProofBridge — Documentation index

Version 1.0 • 8 September 2026 • Proposed product and implementation specification

Prepared for Akshar Miyani and team for the IIC 3.0 MUJ final, using the problem statement supplied by the team: “Portal for Academia-industry collaboration for skill mapping, internships and placement.” Competition classification, final deadline, presentation duration and permitted integrations should be confirmed from the team's official instructions. This pack does not claim organizer endorsement.

## The project in one paragraph

ProofBridge connects industry requirements to evidence of student ability. Employers publish opportunities and short, clearly scoped challenges; students see what they can already demonstrate and what evidence is missing; assigned reviewers assess submissions against visible rubrics; recruiters inspect the evidence before deciding whom to interview. Colleges see aggregated gaps and can propose training in response. Internships and placements are the destination; a traceable learning-to-opportunity workflow is the product's distinguishing idea.

## Read in this order

1. 01_BRAINSTORMING.md — problem discovery, alternatives, differentiation and experiments.
2. 02_PROJECT_INFO.md — nontechnical project explanation and pitch.
3. 03_PRD.md — scope, requirements, acceptance criteria and product rules.
4. 04_ARCHITECTURE.md — boundaries, data flows, deployment and decisions.
5. 05_TECH_STACK.md — selected technologies, alternatives and setup needs.
6. 06_FRONTEND_DOC.md — routes, screens, components, state and interactions.
7. 07_BACKEND_DOC.md — services, authorization, transactions and background work.
8. 08_DATABASE_DOC.md — entities, constraints, indexes and access policy design.
9. 09_API_DOC.md — endpoint contracts, payloads, errors and concurrency.
10. 10_DESIGN_DOC.md — visual direction, tokens, responsive and accessible behavior.
11. 11_SKILL_MAPPING_AND_AI.md — scoring rules, worked example and AI boundaries.
12. 12_SECURITY_PRIVACY.md — threat model, consent and operational safeguards.
13. 13_TESTING_AND_ACCEPTANCE.md — release gates and test scenarios.
14. 14_ROADMAP_TEAM_AND_AGENT_GUIDE.md — phases, four-person split and AI development prompts.
15. 15_DEMO_AND_PITCH.md — demo script, fixtures and judge questions.
16. 16_VALIDATION_BUSINESS_AND_METRICS.md — interviews, pilot, adoption and economics.
17. 17_RISKS_DECISIONS_AND_SOURCES.md — assumptions, decisions, risks and sources.
18. 18_HACKATHON_EXECUTION_PLAN_AND_TEAM_GUIDE.md — official IIC 3.0 timetable, team allocation (Akshar, Faizan, Lakshita, Lubhanshi), Git workflow and Antigravity prompts.

The master Word document combines all chapters for reading and sharing. The Markdown documents are the editable source of truth for development with Antigravity or another coding assistant. These are design specifications, not a finished application, tested implementation, signed partner agreement or verified market study.

## Scope language

P0 = required hackathon vertical slice. P1 = pilot feature after the core works. P2 = longer-term exploration. A seeded demo record is explicitly synthetic. A target is a proposed measure, never an achieved result. “Reviewed” means a named human assessed specified evidence; it does not mean universal certification, identity verification or guaranteed employability.

## Stable product decisions

One Next.js application, TypeScript and Supabase Postgres/Auth/Storage. No separate Python or NestJS backend for P0. REST route handlers own business mutations; PostgreSQL functions enforce atomic sensitive transitions. Matching is deterministic and explainable. AI drafting is optional and never grants a skill or rejects an applicant. All evidence is private by default. Public portfolio sharing, automatic resume parsing, chat, payments and external job-feed integrations are outside P0.

## Build completion definition

Complete one real loop: publish a challenge and linked internship, submit student evidence, review it, update role-specific skill coverage, apply, shortlist and record a simulated outcome. Refreshes must preserve data. Two different organizations must not see one another's private candidates. AI failure must not interrupt the loop. Save measured results and honest limitations for the presentation.

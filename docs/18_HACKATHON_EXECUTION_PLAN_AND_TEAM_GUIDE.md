# ProofBridge — IIC 3.0 Hackathon Execution Plan & Team Guide

**Document Version:** 1.0  
**Event:** IIC 3.0 MUJ (Manipal University Jaipur) — International Innovation Challenge  
**Department:** Department of IoT and Intelligent Systems (Co-powered by Unstop)  
**Timeline Anchor:** September 08, 2026, 16:09 / 16:25 hrs (Day 1 Afternoon) $\longrightarrow$ September 09, 2026, 18:00 hrs (Day 2 Valedictory)  
**Team Roster:**
1. **Akshar Miyani** — Team Leader, System Architecture, Backend, Database & Integration Lead
2. **Faizan** — Student Experience & Challenge Submission Lead
3. **Lakshita** — Reviewer Workspace & Recruiter Screening Lead
4. **Lubhanshi** — Institution Insights, Synthetic Fixtures, QA & Pitch Lead

---

## 1. Official IIC 3.0 Schedule & Milestones

The schedule is mapped directly from the official IIC 3.0 event agenda (released Day 1, Sep 08, 2026):

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 DAY 1: SEPTEMBER 08, 2026                                              │
├───────────────────┬───────────────────────────────┬────────────────────────────────────────────────────┤
│ Time              │ Official Milestone            │ Team Sprint & Milestone Objective                  │
├───────────────────┼───────────────────────────────┼────────────────────────────────────────────────────┤
│ 09:00 - 10:30     │ Reporting Time (AB-1 Lobby)   │ Completed                                          │
│ 10:30 - 12:00     │ Inaugural Ceremony (AB-3)     │ Completed                                          │
│ 12:00             │ Problem Statement Release     │ Completed (Academia-Industry Portal Selected)      │
│ 12:00 - 13:00     │ Lunch (LHC 1st Floor)         │ Completed                                          │
│ 13:00             │ Room Allotment                │ Completed                                          │
│ 16:10 - 19:00     │ Prime Implementation Block    │ SPRINT 1: Repo Setup, Schema, Auth, Base UI Shell  │
│                   │ (CURRENT PHASE)               │ Target: Working frontend shell + Supabase tables   │
│ 19:00 - 20:00     │ MENTORING ROUND 1 (Rooms)     │ SHOW: Problem Reframe, DB Schema, Working Shell    │
│ 20:00 - 22:00     │ Dinner (LHC 1st Floor)        │ SPRINT 2A: Evidence Submission & Reviewer Flow     │
│ 22:00 - 23:00     │ Late Evening Push             │ SPRINT 2B: Atomic Review Publish & Live Score Math │
│ 23:00 - 01:00     │ MENTORING ROUND 2 (Rooms)     │ SHOW: 61% -> 96% Match Leap + Working Reviewer UI  │
├───────────────────┴───────────────────────────────┴────────────────────────────────────────────────────┤
│                                 DAY 2: SEPTEMBER 09, 2026                                              │
├───────────────────┬───────────────────────────────┬────────────────────────────────────────────────────┤
│ 01:00 - 03:00     │ Midnight Sprint & Polish      │ SPRINT 3: Application Snapshot, Shortlist, Cohort  │
│ 03:00 - 05:00     │ JUDGING - ROUND 2             │ CRITICAL ELIMINATION: Full Live Golden Loop Demo   │
│ 07:00             │ Results Out - Round 2         │ Milestone gate (Shortlist announcement)            │
│ 08:00 - 09:00     │ Breakfast (LHC 1st Floor)     │ Morning sync & remaining feedback debrief          │
│ 09:00 - 12:00     │ Implementation - Round 3      │ SPRINT 4: Polish, Responsiveness, Video Backup     │
│ 11:00 - 12:00     │ Panel Discussion (AB-2)       │ Team rotation (Leader/Pitcher remains on polish)   │
│ 12:00 - 13:00     │ Lunch (LHC 1st Floor)         │ Final rest & slide deck review                     │
│ 13:00 - 15:00     │ JUDGING - ROUND 3 (FINAL)     │ GRAND FINALE: 5-Minute Pitch + Live Demo + Defense │
│ 16:00 - 18:00     │ Valedictory Ceremony (AB-2)   │ Awards & Closing Ceremony                          │
└───────────────────┴───────────────────────────────┴────────────────────────────────────────────────────┘
```

---

## 2. Multi-Developer Git Workflow (Single GitHub Repository)

All 4 members contribute to the same GitHub repository using clean Git branches and pull requests. To prevent merge conflicts, file lockouts, or broken builds during the high-speed 48-hour event, adhere strictly to these rules:

### 2.1 Repository Architecture & Ownership Boundaries

To eliminate conflicts, files are divided into strict ownership zones:

```
ProofBridge/
├── docs/                                  # Shared Reference (System Specifications)
├── supabase/
│   ├── migrations/                        # AKSHAR ONLY (Schema & RLS)
│   └── seed.sql                           # LUBHANSHI & AKSHAR (Synthetic Fixtures)
├── src/
│   ├── contracts/                         # AKSHAR ONLY (Zod schemas & shared types)
│   ├── lib/
│   │   ├── server/                        # AKSHAR ONLY (DB client & sensitive handlers)
│   │   └── utils.ts                       # SHARED (Pure helpers)
│   ├── components/
│   │   ├── ui/                            # SHARED (Buttons, Modals, Inputs, Chips)
│   │   ├── student/                       # FAIZAN ONLY
│   │   ├── reviewer/                      # LAKSHITA ONLY
│   │   ├── employer/                      # LAKSHITA ONLY
│   │   └── institution/                   # LUBHANSHI ONLY
│   └── app/
│       ├── api/v1/                        # AKSHAR ONLY (Route handlers)
│       ├── student/                       # FAIZAN ONLY
│       ├── challenges/                    # FAIZAN ONLY
│       ├── reviewer/                      # LAKSHITA ONLY
│       ├── employer/                      # LAKSHITA ONLY
│       └── institution/                   # LUBHANSHI ONLY
└── tests/                                 # LUBHANSHI & AKSHAR
```

### 2.2 Branching Strategy

* **`main`**: The sacred deployment branch. **Never commit directly to `main`**.
* **`develop`**: The integration branch. Merges happen here before tagging demo releases.
* **Feature Branches**:
  * Akshar: `feat/backend-core`, `feat/matching-engine`, `feat/rls-policies`
  * Faizan: `feat/student-passport`, `feat/challenge-submission`, `feat/student-applications`
  * Lakshita: `feat/reviewer-rubric`, `feat/recruiter-shortlist`, `feat/opp-management`
  * Lubhanshi: `feat/institution-insights`, `feat/seed-fixtures`, `feat/acceptance-tests`

### 2.3 Git Operations Playbook (Run in Terminal)

#### Starting a New Feature:
```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
```

#### Daily Sync & Pre-Merge Hygiene (Run before pushing):
```bash
# 1. Stash or commit your local changes
git add .
git commit -m "feat(scope): concise description of work"

# 2. Pull latest changes from develop with rebase
git checkout develop
git pull origin develop
git checkout feat/your-feature-name
git rebase develop

# 3. Verify that build and types still pass!
npm run typecheck
npm run build

# 4. Push to your feature branch
git push origin feat/your-feature-name
```

#### Merge Rules:
1. Only **Akshar** (Lead) approves and merges PRs into `develop` and `main`.
2. Never commit secrets (`.env.local`, `service_role_key`).
3. If a merge conflict occurs in `package-lock.json`, run `npm install` and commit the resolved lockfile.

---

## 3. Team Member Work Breakdown & Technical Specifications

Each team member has a dedicated, bounded mission. Below are their responsibilities, acceptance criteria, and technical specifications for every sprint.

---

### 3.1 Member 1: Akshar Miyani (Leader & Integration Architect)

* **Role:** Team Leader, Backend Engineer, Database Architect, DevOps.
* **Key Deliverables:**
  1. Initialize Next.js project and setup Supabase Auth + PostgreSQL schema.
  2. Implement all 24 database tables and RLS security policies ([08_DATABASE_DOC.md](file:///d:/IIC3.0/ProofBridge/docs/08_DATABASE_DOC.md)).
  3. Implement privileged PostgreSQL atomic functions:
     * `publish_opportunity()`
     * `finalize_submission()`
     * `publish_review()` (atomically writes review, scores, `skill_attainments`, and outbox event)
     * `submit_application()` (freezes snapshot, creates `evidence_grants`)
     * `transition_application()`
     * `void_review()`
  4. Implement `/api/v1` route handlers and Zod validation contracts ([09_API_DOC.md](file:///d:/IIC3.0/ProofBridge/docs/09_API_DOC.md)).
  5. Implement `coverage-v1` deterministic matching engine ([11_SKILL_MAPPING_AND_AI.md](file:///d:/IIC3.0/ProofBridge/docs/11_SKILL_MAPPING_AND_AI.md)).
  6. Manage Vercel / Supabase deployment and environment variables.

#### Technical Work Package 1 (Akshar - Sprint 1: Project Scaffold & Database Foundation):
- **Objective & Scope:**
  1. Scaffold Next.js 14/15 App Router project with TypeScript, Tailwind CSS, Lucide React, and `@supabase/supabase-js`.
  2. Implement PostgreSQL migration files in `supabase/migrations/001_initial_schema.sql` covering all 24 entities from `08_DATABASE_DOC.md` (profiles, organizations, memberships, skills, opportunities, challenges, rubric_criteria, submissions, submission_revisions, reviews, review_scores, skill_attainments, applications, evidence_grants, audit_events, outbox_events, idempotency_records).
  3. Enforce CHECK constraints, foreign keys, and indexes.
  4. Ensure `skill_attainments` cannot be directly inserted by the public client.
  5. Configure Supabase client in `src/lib/server/supabase.ts`.

#### Technical Work Package 2 (Akshar - Sprint 2: Atomic Functions & REST API):
- **Objective & Scope:**
  1. Write PostgreSQL functions with `SECURITY DEFINER` and fixed `search_path`:
     - `publish_opportunity(p_opportunity_id UUID, p_actor_id UUID)`  
     - `finalize_submission(p_submission_id UUID, p_actor_id UUID)`  
     - `publish_review(p_assignment_id UUID, p_actor_id UUID, p_scores JSONB)`  
     - `submit_application(p_opportunity_id UUID, p_student_id UUID, p_selected_revisions UUID[])`  
     - `transition_application(p_application_id UUID, p_actor_id UUID, p_to_status TEXT, p_reason TEXT)`  
  2. Implement Next.js App Router API route handlers under `src/app/api/v1/`:
     - `POST /api/v1/opportunities/[id]/publish`  
     - `POST /api/v1/submissions/[id]/finalize`  
     - `POST /api/v1/review-assignments/[id]/publish`  
     - `GET /api/v1/opportunities/[id]/match` (implementing exact `coverage-v1` formula from `11_SKILL_MAPPING_AND_AI.md`)  
     - `POST /api/v1/applications`  
  3. Enforce `expected_version` concurrency and standard JSON error envelopes.

---

### 3.2 Member 2: Faizan (Student Experience Lead)

* **Role:** Frontend Engineer — Student Persona.
* **Key Deliverables:**
  1. Student Action-First Dashboard (`/student`) — "Your Next Step", recommended challenges, active applications.
  2. Evidence Passport (`/student/passport`) — Grouped into Reviewed, Self-declared, and Awaiting Review; Evidence inspection drawer.
  3. Opportunity Detail & Match Gap View (`/opportunities/[id]`) — Interactive horizontal coverage bar, expandable calculation explanation, unmet skill recommendations.
  4. Challenge Workspace (`/challenges/[id]`) — Task brief, time estimate, rubric view, markdown/text submission box, contribution statement input, HTTPS reference links.
  5. Application Submission Dialog — Explicit confirmation modal displaying shared evidence revisions.
  6. Application Tracking Screen (`/student/applications`) — Real-time status timeline.

#### Technical Work Package 1 (Faizan - Sprint 1 & 2: Student Dashboard & Evidence Passport):
- **Objective & Scope:**
  1. Build Student Action-First Dashboard at `src/app/student/page.tsx`:  
     - Banner highlighting "Your Next Step" (e.g., Missing SQL for Analyst Internship).  
     - Recommended challenge card with time estimate and direct action trigger.  
     - Summary of recent feedback and active applications.  
  2. Build Evidence Passport at `src/app/student/passport/page.tsx`:  
     - Group skills into: 'Reviewed Skills' (green badge, reviewer name, date), 'Self-Declared' (neutral badge), and 'Awaiting Review' (amber badge).  
     - Clicking a reviewed skill opens `EvidenceDrawer` showing rubric criteria scores, reviewer rationale, and the student's contribution statement.  
     - Follow color tokens from `10_DESIGN_DOC.md` (`#185ADB` accent, `#166534` success, `#F7F8FA` canvas).

#### Technical Work Package 2 (Faizan - Sprint 2 & 3: Challenge Workspace & Match Detail):
- **Objective & Scope:**
  1. Build Challenge Workspace at `src/app/challenges/[id]/page.tsx`:  
     - Display challenge brief, permitted tools/AI policy, deliverables, and anchored rubric.  
     - Submission form: Title, Body text (code/queries/explanations), Contribution Statement, and up to 10 HTTPS reference links.  
     - Include 'Save Draft' and 'Finalize Submission' actions with confirmation modal.  
  2. Build Opportunity Detail & Coverage Panel at `src/app/opportunities/[id]/page.tsx`:  
     - Header: Role title, employer name, compensation, work mode, deadline.  
     - Coverage Panel: Visual percentage bar (e.g., 61% -> 96%), per-skill breakdown table.  
     - 'How this is calculated' disclosure showing formula.  
     - 'Apply Now' action opening evidence selection modal.

---

### 3.3 Member 3: Lakshita (Reviewer & Recruiter Experience Lead)

* **Role:** Frontend Engineer — Reviewer & Employer Personas.
* **Key Deliverables:**
  1. Reviewer Assignment Queue (`/reviewer/queue`) — List of pending student submissions sorted by urgency.
  2. Side-by-Side Reviewer Workspace (`/reviewer/submissions/[id]`):
     * Left pane: Student submission text, contribution statement, external links.
     * Right pane: Interactive Rubric editor with anchored levels (0 to 4) and rationale textarea per criterion.
     * Actions: "Save Draft Review", "Request Changes", "Publish Review" (with confirmation).
  3. Employer Opportunity Workspace (`/employer/opportunities`) — Draft and published job listings.
  4. Candidate Evidence Screening Table (`/employer/opportunities/[id]/applicants`):
     * Candidate name, status, reviewed coverage percentage, verified evidence count, application date.
     * Click candidate to inspect frozen evidence snapshot drawer.
     * Action menu: Move status (`shortlisted`, `interview`, `offered`, `rejected`).

#### Technical Work Package 1 (Lakshita - Sprint 2: Reviewer Queue & Split-Screen Rubric):
- **Objective & Scope:**
  1. Build Reviewer Queue at `src/app/reviewer/queue/page.tsx` displaying pending assigned submissions with student program, challenge title, submission date, and waiting duration.  
  2. Build Split-Screen Reviewer Workspace at `src/app/reviewer/submissions/[id]/page.tsx`:  
     - Left Pane: Student finalized submission body, contribution statement, and verified links.  
     - Right Pane: Rubric criteria cards. Each criterion has radio selectors for Levels 0 to 4 with descriptive anchors and rationale textarea.  
     - 'Publish Review' action triggering `POST /api/v1/review-assignments/[id]/publish` with client-side validation.  
     - 'Request Changes' workflow with mandatory reviewer explanation.

#### Technical Work Package 2 (Lakshita - Sprint 3: Employer Screening & Shortlist UI):
- **Objective & Scope:**
  1. Build Candidate Screening Table at `src/app/employer/opportunities/[id]/applicants/page.tsx`:  
     - Sortable columns: Candidate Name, Status, Reviewed Coverage (color-coded badge), Verified Evidence Count, Applied Date.  
     - Selecting candidate opens sliding drawer displaying frozen `snapshot_json` (demonstrated competencies, attainments, reviewer notes).  
     - Status transition dropdown: Transition between `submitted` -> `shortlisted` -> `interview` -> `offered`.  
     - Invoke `POST /api/v1/applications/[id]/transitions` with `expected_version`.

---

### 3.4 Member 4: Lubhanshi (Institution Insights, QA, Seed Fixtures & Pitch Lead)

* **Role:** Institution Coordinator Experience, QA Engineer, Data Fixtures & Pitch Presentation Lead.
* **Key Deliverables:**
  1. Institution Cohort Gap Table (`/institution/insights`):
     * Cohort selector (e.g., "MCA 2026", "B.Tech CS 2026").
     * Opportunity sample selector and reporting window.
     * Aggregated skill gap table: Skill name, students deficient, percentage of cohort, drill-down modal showing anonymous distribution.
     * Small-group suppression rule ($<5$ students shows privacy notice, or synthetic banner in demo mode).
  2. Complete Synthetic Seed Data Fixtures (`supabase/seed.sql`):
     * Institution A: Demo College of Computing; Institution B: Sample Institute of Technology.
     * Employer A: Sample Analytics Studio; Employer B: Example Web Lab.
     * Student Meera: Seeded with Spreadsheets (L3), Communication (L3), Analytical Reasoning (L3).
     * Challenge: "Explain monthly sales from a messy dataset" (with sample CSV/data and 3 queries).
     * Opportunity: "Junior Data Analyst Intern" (SQL L3 W35, Spreadsheets L3 W25, Comm L4 W16, Reasoning L3 W24).
  3. Acceptance Testing Script ([13_TESTING_AND_ACCEPTANCE.md](file:///d:/IIC3.0/ProofBridge/docs/13_TESTING_AND_ACCEPTANCE.md)): Scenarios T-01 through T-20.
  4. Slide Deck & 5-Minute Pitch Rehearsal ([15_DEMO_AND_PITCH.md](file:///d:/IIC3.0/ProofBridge/docs/15_DEMO_AND_PITCH.md)).
  5. Local Offline Screen Recording Backup (in case of venue Wi-Fi failure).

#### Technical Work Package 1 (Lubhanshi - Sprint 1 & 2: Seed Fixtures & Cohort Gaps):
- **Objective & Scope:**
  1. Implement complete SQL seed script in `supabase/seed.sql`:  
     - Seed 2 institutions and 2 employers to test multi-tenant isolation.  
     - Seed 6 synthetic students in Demo College of Computing.  
     - Seed Student Meera with active reviewed attainments: Spreadsheets L3, Communication L3, Analytical Reasoning L3.  
     - Seed Opportunity 'Junior Data Analyst Intern' with exact weights: SQL (35), Spreadsheets (25), Communication (16), Reasoning (24).  
     - Seed Challenge 'Explain monthly sales from a messy dataset' linked to SQL rubric criteria.  
  2. Build Institution Insights Screen at `src/app/institution/insights/page.tsx`:  
     - Filters for cohort and target opportunities.  
     - Cohort Gap Table displaying Skill, Students with Gap, Total Enrolled, Gap %.  
     - Level breakdown drill-down modal.

#### Technical Work Package 2 (Lubhanshi - Sprint 3 & 4: QA Tests & Pitch Artifacts):
- **Objective & Scope:**
  1. Implement automated test scripts in `tests/acceptance.test.ts` verifying:  
     - `T-01`: Student cannot call employer publish route.  
     - `T-02`: Employer B cannot view Employer A candidate.  
     - `T-09`: Exact mathematical verification: Meera coverage before review = 61%, after SQL review = 96%.  
     - `T-10`: Review draft does not change coverage score.  
     - `T-13`: Application withdrawal revokes evidence grants.  
  2. Create presentation notes and judge Q&A flashcards based on `15_DEMO_AND_PITCH.md`.

---

## 4. The 2-Day Hour-by-Hour Master Battle Plan

Here is the exact hour-by-hour roadmap connecting the event start to the final Valedictory Ceremony:

```
DAY 1 (SEP 08):
├── 16:25 - 17:30 [SPRINT 1A]
│   ├── Akshar: Execute Work Package 1 (Scaffold project, run Supabase migration, setup Auth).
│   ├── Lubhanshi: Create `supabase/seed.sql` with synthetic institutions, Meera, and roles.
│   ├── Faizan: Setup UI theme tokens, base AppShell, navbar, and workspace switcher.
│   └── Lakshita: Build basic cards, layout containers, and shared component primitives.
│
├── 17:30 - 19:00 [SPRINT 1B: Pre-Mentoring 1 Integration]
│   ├── Akshar: Deploy backend & DB locally/Supabase; seed data; test login for 4 accounts.
│   ├── Faizan & Lakshita: Connect basic read-only pages to seeded data.
│   └── Lubhanshi: Draft 1-page architecture summary for Mentoring Round 1.
│
├── 19:00 - 20:00 [MILESTONE: MENTORING ROUND 1]
│   ├── Location: Allotted Rooms.
│   ├── Action: Present problem statement, evidence-first approach, and working DB schema.
│   └── Objective: Validate rubric concept with mentors; note mentor suggestions.
│
├── 20:00 - 22:00 [DINNER & SPRINT 2A: The Submission Engine]
│   ├── Dinner at LHC 1st floor (rotate 30 mins each to keep development active).
│   ├── Akshar: Execute Work Package 2 (Postgres functions: `finalize_submission`, `publish_review`).
│   ├── Faizan: Build Challenge workspace (`/challenges/[id]`) with text & link inputs.
│   └── Lakshita: Build Reviewer Queue (`/reviewer/queue`).
│
├── 22:00 - 23:00 [SPRINT 2B: The Math & Rubric Engine]
│   ├── Akshar: Implement `/api/v1/opportunities/[id]/match` (Formula: 61% -> 96%).
│   ├── Lakshita: Build Split-Screen Reviewer Rubric Editor (`/reviewer/submissions/[id]`).
│   ├── Faizan: Connect Opportunity Coverage Panel (`/opportunities/[id]`).
│   └── Lubhanshi: Verify end-to-end review publication in database.
│
├── 23:00 - 01:00 [MILESTONE: MENTORING ROUND 2]
│   ├── Location: Allotted Rooms.
│   ├── Action: LIVE DEMO to Mentors: Student submits SQL task -> Reviewer publishes -> Score jumps 61% to 96%.
│   └── Objective: Prove technical depth and ask for feedback on shortlist criteria.
│
DAY 2 (SEP 09):
├── 01:00 - 03:00 [SPRINT 3: The Application & Recruiter Loop]
│   ├── Akshar: Implement `submit_application` (snapshot freeze) and `transition_application`.
│   ├── Lakshita: Build Recruiter Applicant Table & Shortlist drawer.
│   ├── Faizan: Build Student Application tracking screen.
│   ├── Lubhanshi: Build Institution Cohort Gap view (`/institution/insights`).
│   └── ALL: Run complete Golden Loop rehearsal!
│
├── 03:00 - 05:00 [CRITICAL MILESTONE: JUDGING - ROUND 2]
│   ├── Venue: To be announced.
│   ├── The Pitch: Akshar & Lubhanshi deliver pitch; Faizan & Lakshita drive live UI.
│   └── Demo: Full loop from missing SQL to shortlisted candidate and cohort gap update.
│
├── 05:00 - 07:00 [REST & BUFFER]
│   ├── Take turns napping / resting.
│   └── Fix any minor glitches noted during Round 2 judging.
│
├── 07:00 [RESULTS OUT - ROUND 2]
│   └── Check qualification for Final Round 3!
│
├── 08:00 - 09:00 [BREAKFAST - LHC 1st Floor]
│   └── Energize, freshen up, and align on Final Round presentation strategy.
│
├── 09:00 - 12:00 [SPRINT 4: FINAL POLISH & ROUND 3 IMPLEMENTATION]
│   ├── Lubhanshi: Finalize 8-slide presentation deck + record local offline backup video.
│   ├── Akshar: Run acceptance test suite (`T-01` to `T-20`); verify tenant isolation.
│   ├── Faizan & Lakshita: Polish UI responsiveness (mobile 360px check), error banners, loading states.
│   └── (11:00 - 12:00 Panel Discussion: 1-2 team members attend if required).
│
├── 12:00 - 13:00 [LUNCH - LHC 1st Floor]
│   └── Final rest and slide review.
│
├── 13:00 - 15:00 [GRAND FINALE: JUDGING - ROUND 3]
│   ├── Venue: To be announced.
│   ├── 5-Minute High-Impact Pitch + Live Software Demo + Tough Q&A Defense.
│   └── Confidently present evidence-first architecture, metrics, and institutional impact.
│
└── 16:00 - 18:00 [VALEDICTORY CEREMONY - Audi AB-2]
    └── Celebrate! Award announcements.
```

---

## 5. Live 5-Minute Pitch Script & Timing Choreography

During Round 2 (03:00 AM) and Round 3 (13:00 PM), stick to this exact 300-second sequence:

```
[0:00 - 0:35] THE PROBLEM (Speaker: Akshar)
- "Judges, academia-industry portals are broken. Students list buzzwords on resumes, recruiters spend hours screening unverified claims, and colleges have no idea why their students get rejected."
- "ProofBridge fixes this by replacing resume claims with an auditable evidence-to-opportunity loop."
- "Meet Meera, a final-year MCA student applying for a Data Analyst Internship at Sample Analytics Studio."

[0:35 - 1:15] THE EVIDENCE GAP (Driver: Faizan)
- Open Opportunity detail: "Meera opens the role. ProofBridge calculates her reviewed coverage at 61%."
- "The transparent math shows she has verified Spreadsheet, Communication, and Reasoning skills, but 0 points in SQL—a 35-weight requirement."
- "Notice: it doesn't say 'unskilled'—it says 'Not yet demonstrated'."
- "With one click, she opens the linked industry challenge: 'Explain monthly sales from messy data'."

[1:15 - 2:00] THE SUBMISSION (Driver: Faizan)
- Open Challenge workspace: "Here is the scoped 2-hour task with a visible 4-level rubric."
- "Meera writes her SQL queries, result explanation, and crucially—a Contribution Statement explaining her design decisions."
- Click 'Finalize Submission': "The revision is locked. No AI can arbitrarily grant her a badge—it requires human review."

[2:00 - 2:50] THE HUMAN REVIEW & SCORE LEAP (Driver: Lakshita)
- Switch browser profile to Assigned Reviewer: "Her reviewer opens the split-screen workspace."
- "On the left: Meera's queries. On the right: the anchored rubric. The reviewer selects Level 3 ('Validates results, handles nulls') and writes brief constructive rationale."
- Click 'Publish Review': "Atomically, the review publishes, creating a tamper-proof skill attainment."
- Switch back to Meera's screen: "Meera refreshes—her coverage instantly jumps from 61% to 96%!"

[2:50 - 3:40] THE SHORTLIST (Driver: Lakshita)
- Meera selects her SQL evidence and clicks 'Apply'.
- Switch to Recruiter: "The recruiter opens the applicant pipeline. Meera is at the top with 96% verified coverage."
- "The recruiter opens Meera's frozen snapshot, inspects the actual reviewed SQL queries, and clicks 'Shortlist'."
- "The decision is fast, evidence-backed, and human."

[3:40 - 4:25] THE INSTITUTION VALUE (Speaker: Lubhanshi)
- Open College Coordinator Dashboard: "Finally, the college. The placement coordinator opens the Cohort Gap report."
- "They see exactly how many students in MCA 2026 are deficient in SQL across active opportunities. As Meera's review published, the cohort SQL gap decremented."
- "Colleges no longer guess curriculum needs—they have real-time evidence to plan targeted workshops."

[4:25 - 5:00] THE CLOSE (Speaker: Akshar)
- "ProofBridge is built on Next.js, TypeScript, and Supabase Postgres with row-level security."
- "Every line you saw is working code running on real database transactions."
- "Thank you, judges. We are ready for your questions."
```

---

## 6. Judge Q&A Defense Sheet (Tough Questions)

| Judge Question | The Winning Answer |
|---|---|
| **"Why not just use an AI to grade student submissions?"** | "Automated AI grading hallucinates, is vulnerable to prompt injection, and destroys employer trust. In ProofBridge, AI only assists in drafting rubrics. Human reviewers—faculty or industry mentors—make the evaluation. That human provenance is what makes the evidence credible." |
| **"What prevents students from copying code with ChatGPT?"** | "We require a mandatory Contribution Statement where students explain *why* they chose their approach. Furthermore, reviewers can ask for a 2-minute oral explanation during interviews based on the submitted artifact." |
| **"How does your matching score work? Is it AI?"** | "No, it is 100% deterministic and explainable. The formula is $\text{weight} \times \min(\text{reviewed\_level} / \text{required\_level}, 1)$. If SQL has weight 35 and required level 3, achieving level 3 grants exactly 35 points. Students and recruiters can inspect the exact math." |
| **"How will you onboard companies to review challenges?"** | "We start with existing campus recruiting partners. Reviewers spend less than 10 minutes reviewing a standardized, rubric-anchored task, which saves them dozens of hours of resume screening." |
| **"What if venue Wi-Fi goes down right now?"** | *(Lubhanshi immediately responds)* "We have our entire platform running on local Docker Supabase, plus a pre-recorded HD video walkthrough of the exact live flow recorded 2 hours ago." |

---

## 7. Emergency & Contingency Protocols

1. **Venue Internet Failure:**
   * Run local development server: `npm run dev` pointing to local Supabase CLI (`npx supabase start`).
   * If localhost crashes, Lubhanshi immediately plays the local 1080p MP4 recording of the full 5-minute flow.
2. **Git Merge Conflict Emergency:**
   * Do not panic. Run `git merge --abort` or `git rebase --abort`.
   * Call Akshar to resolve conflicts manually in VS Code / Git diff viewer.
3. **Database Seed Corruption:**
   * Run the reset command: `npx supabase db reset` (re-runs migrations and `seed.sql` in under 15 seconds).
4. **Member Exhaustion / Fatigue:**
   * Take shifts during the 05:00 - 08:00 AM lull.
   * Keep hydration and light snacks ready.

---

*Let's build, verify, and win IIC 3.0!*

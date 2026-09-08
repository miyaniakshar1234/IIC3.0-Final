# ProofBridge — Akshar Miyani (Team Leader & Backend Architect)
## Master Antigravity AI Comprehensive Playbook (Evaluation 1 → 2 → 3)

**Role:** Team Leader, Backend Architect, Supabase DBA, Integration Gatekeeper  
**Git Branches:** `develop` (Integration Core), `main` (Production / Jury Presentation)  
**Assigned Ownership:**  
- Database: `supabase/migrations/**`, `supabase/seed.sql`, `scripts/**`
- Backend / APIs: `src/app/api/v1/**`, `src/lib/server/**`, `src/lib/matching.ts`
- Core UI Shell: `src/components/ui/AppShell.tsx`, `src/app/globals.css`, `src/app/page.tsx`

---

## 🧠 PRODUCT KNOWLEDGE BASE (EMBEDDED FOR THE AI)

### What We Are Building:
**ProofBridge** is an open-innovation EdTech & hiring infrastructure platform engineered for the **IIC 3.0 MUJ Final Hackathon**. It eliminates resume fraud, unverified claims, and black-box ATS keyword screening by connecting industry job requirements to **verifiable human-reviewed student proof**.

### The 6-Step Golden Loop:
1. **Industry Requirements:** Employers post opportunities with explicit required skills, required proficiency levels (1–4), and percentage weights totaling 100%.
2. **Gap Detection:** Students discover target roles and see an explainable coverage score (e.g., Meera Patel at 61%), highlighting exact missing requirements (SQL = 35 pts).
3. **Bounded Challenge:** Students solve 2-hour scoped tasks and submit authentic code/artifacts accompanied by a mandatory **Contribution Statement** and **AI Disclosure**.
4. **Human Faculty Rubric Review:** Assigned faculty reviewers evaluate submissions against anchored 4-level rubrics and publish qualitative feedback with their verified identity.
5. **Deterministic Score Leap:** Publishing a review atomically creates a skill attainment in PostgreSQL, immediately updating the student's reviewed coverage ($61\% \rightarrow 96\%$).
6. **Informed Hiring:** Recruiters inspect tamper-resistant frozen evidence snapshots (verified code + reviewer signatures) rather than unverified resumes, making high-conviction interview offers.

### Demo Personas & Entities:
- **Student:** Meera Patel (MCA 2026, Demo College of Computing). Baseline: Spreadsheets (L3), Written Communication (L3), Analytical Reasoning (L3). Needs: SQL (L3).
- **Faculty Reviewer:** Dr. Alok Sharma (Associate Professor of Computer Science).
- **Employer / Recruiter:** Sample Analytics Studio (Jaipur / Hybrid, ₹25,000/mo Junior Data Analyst Intern).
- **Academic Dean / Admin:** Prof. Gupta (Demo College of Computing), monitoring 120 MCA students with a 42% deficit in SQL.

---

## 🛑 CROSS-MEMBER DEPENDENCY & "STOP & WAIT" ENGINE

You are the central integration gatekeeper. Follow this strict pre-flight decision tree:

```text
┌─────────────────────────────────────────────────────────────┐
│                 AKSHAR PRE-FLIGHT GATEWAY                   │
│                                                             │
│ 1. Is a teammate's PR submitted?                            │
│    NO  ──> Do not merge. Work on core backend & APIs.       │
│    YES ──> Checkout a temporary branch: review/<member>.    │
│                                                             │
│ 2. Does their branch build cleanly?                         │
│    Run 'npm run build' on their review branch.              │
│    FAIL ──> STOP! Reject PR. Send exact errors to member.   │
│    PASS ──> Fast-forward merge into 'develop' & push.       │
│                                                             │
│ 3. Is 'main' kept in sync?                                  │
│    Only fast-forward 'main' from 'develop' after a verified │
│    milestone build (Evaluation 1, 2, and 3).                │
└─────────────────────────────────────────────────────────────┘
```

---

# 📅 EVALUATION 1: MENTORING ROUND 1 (DAY 1: 17:30 – 21:00)
**Evaluation Objective:** Prove live Supabase database connectivity, 24 relational tables, live matching REST API ($61\% \rightarrow 96\%$), merged Student Experience, and prepare Reviewer Queue integration.

---

### 🔹 Prompt 1.1: Verify Live Supabase Connection & Matching Endpoint
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge for IIC 3.0 MUJ. ProofBridge replaces resume buzzwords with verified work evidence.
TASK: Verify our Supabase PostgreSQL pooler connection and live matching calculation route.
INSTRUCTIONS:
1. Verify .env.local contains our live Supabase URL and credentials.
2. Inspect src/app/api/v1/health/route.ts. Run a curl/fetch to /api/v1/health to verify database connectivity.
3. Test GET /api/v1/opportunities/40000000-0000-0000-0000-000000000001/match?include_sql_review=false.
   - Verify it calculates Meera's baseline: Spreadsheets (25) + Comm (12) + Reasoning (24) = 61%.
4. Test GET /api/v1/opportunities/40000000-0000-0000-0000-000000000001/match?include_sql_review=true.
   - Verify it includes SQL Level 3 (35 pts) jumping the total to 96%.
5. Run 'npm run typecheck' to ensure zero type errors.
OUTPUT: Report exact HTTP status codes, JSON payload responses, and database latency.
```

---

### 🔹 Prompt 1.2: Check Remote Team Branches & Dependency Status
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Audit remote branches to verify whether Lakshita (Reviewer) and Lubhanshi (Institution) have pushed their Evaluation 1 code.
INSTRUCTIONS:
1. Run:
   git fetch origin
   git branch -r
2. Check commit history on 'origin/feat/evaluator-and-employer' and 'origin/feat/institution-insights'.
3. If either branch contains new commits:
   - Check which files were touched. Confirm they do NOT overwrite 'supabase/' or 'src/lib/matching.ts'.
4. If a branch is missing or behind 'develop':
   - Output a clear directive to Akshar with the exact message to send to that teammate.
OUTPUT: Summary table of teammate branch status, last commit hash, and readiness for review.
```

---

### 🔹 Prompt 1.3: Safe Review & Merge of Lakshita's Reviewer PR
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
PREREQUISITE: Lakshita has pushed 'origin/feat/evaluator-and-employer'.
TASK: Safely merge Lakshita's Reviewer Queue and Rubric Evaluation pages into develop.
INSTRUCTIONS:
1. Create and switch to an isolated review branch:
   git checkout -b review/lakshita origin/feat/evaluator-and-employer
2. Merge develop into this review branch:
   git merge develop
3. If conflicts occur in AppShell or package.json:
   - Keep both Lakshita's reviewer routes and Faizan's student routes.
   - Preserve our modern SaaS styling (border-slate-200/80, shadow-xs, glassmorphism).
4. Run:
   npm run typecheck
   npm run build
5. STOP AND VERIFY: If 'npm run build' exits with code 1, do NOT merge. Print the exact error log for Lakshita.
6. If build exits with code 0:
   git checkout develop
   git merge review/lakshita --no-ff -m "merge: integrate faculty review queue and rubric evaluation from Lakshita"
   git push origin develop
   git branch -D review/lakshita
OUTPUT: Confirmation of clean merge and successful push to origin/develop.
```

---

### 🔹 Prompt 1.4: Safe Review & Merge of Lubhanshi's College Insights PR
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
PREREQUISITE: Lubhanshi has pushed 'origin/feat/institution-insights'.
TASK: Safely merge Lubhanshi's College Insights Dashboard into develop.
INSTRUCTIONS:
1. Create and switch to an isolated review branch:
   git checkout -b review/lubhanshi origin/feat/institution-insights
2. Merge develop into review/lubhanshi:
   git merge develop
3. Resolve any layout conflicts in AppShell.tsx, ensuring 'College Insights' is properly highlighted.
4. Run 'npm run typecheck' and 'npm run build'.
5. If build succeeds with code 0:
   git checkout develop
   git merge review/lubhanshi --no-ff -m "merge: integrate college insights dashboard from Lubhanshi"
   git push origin develop
   git branch -D review/lubhanshi
   git checkout main && git merge develop --ff-only && git push origin main && git checkout develop
OUTPUT: Confirmation of clean merge and synchronization of both develop and main.
```

---

### 🔹 Prompt 1.5: Pre-Mentoring UI & Navigation Smoke Test
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Run a local smoke test across all routes before the mentors arrive for Evaluation 1.
INSTRUCTIONS:
1. Start dev server: 'npm run dev'.
2. Verify all primary workspace URLs return HTTP 200 without console errors:
   - http://localhost:3000/ (Landing Hub & 6-Step Golden Loop)
   - http://localhost:3000/student (Meera Patel Dashboard - 61%)
   - http://localhost:3000/student/passport (Evidence Passport & Drawer)
   - http://localhost:3000/opportunities/40000000-0000-0000-0000-000000000001 (Match calculation + demo toggle)
   - http://localhost:3000/reviewer/queue (Dr. Alok Sharma Review Queue)
   - http://localhost:3000/institution/insights (College Dean Cohort Insights)
3. Ensure no raw LaTeX math strings ('$\rightarrow$') appear and all buttons have visible hover states.
OUTPUT: Green checklist confirming all routes are functional and mentor-ready.
```

---

# 📅 EVALUATION 2: MIDNIGHT CHECKPOINT (DAY 1: 21:00 – DAY 2: 03:00)
**Evaluation Objective:** Wire the live atomic review publication API in PostgreSQL, verify cross-role state transitions, and build a demo state reset script.

---

### 🔹 Prompt 2.1: Wire Atomic Review Publication API (`/api/v1/reviews/publish`)
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Build the atomic review publication endpoint using our Supabase PostgreSQL functions.
INSTRUCTIONS:
1. Create or update 'src/app/api/v1/reviews/publish/route.ts'.
2. The POST endpoint must validate the request body with Zod:
   - submission_id: UUID
   - reviewer_id: UUID (Dr. Alok Sharma: '20000000-0000-0000-0000-000000000001')
   - overall_level: number (integer 1 to 4)
   - rubric_scores: array of { criterion_id: UUID, score: number, rationale: string }
   - qualitative_notes: string
3. Execute the atomic transaction via Supabase:
   - Insert into 'evaluation_reviews'
   - Insert into 'evaluation_review_scores'
   - Call atomic function 'publish_review()' or update 'skill_attainments' to issue the verified skill attainment
   - Write an event to 'outbox_events'
4. Re-calculate the student's updated match coverage using 'calculateCoverage()' and return it in the response.
5. Run 'npm run typecheck' and 'npm run build'.
OUTPUT: Test the route using curl and output the response payload showing the updated 96% score.
```

---

### 🔹 Prompt 2.2: Verify Golden Loop Cross-Role State Transition
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Verify that publishing a review for Meera's SQL challenge propagates live across all personas.
INSTRUCTIONS:
1. In Student Workspace: Confirm Meera's pending SQL challenge moves to 'Reviewed Level 3'.
2. In Matching Engine: Confirm coverage for Junior Data Analyst Intern leaps from 61% to 96%.
3. In Employer Workspace: Confirm the applicant record for Meera displays the verified Level 3 SQL attainment signed by Dr. Sharma.
4. In Institution Workspace: Confirm the cohort gap updates reflecting 1 newly certified SQL student.
5. If any persona fails to reflect the updated state, diagnose and resolve the state sharing.
OUTPUT: Proof of end-to-end data integrity across all 4 personas.
```

---

### 🔹 Prompt 2.3: Build Demo State Reset Script (`scripts/reset-demo-state.mjs`)
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Build an automated reset script that restores the database to the 61% baseline in < 2 seconds.
INSTRUCTIONS:
1. Create 'scripts/reset-demo-state.mjs' using the 'pg' library with our direct Supabase connection pooler.
2. The script must:
   - Remove any published evaluation reviews for Meera's SQL challenge submission.
   - Delete any created SQL skill attainment for Meera ('00000000-0000-0000-0000-000000000001').
   - Reset submission status to 'SUBMITTED' (pending review by Dr. Alok Sharma).
   - Reset application status to 'PENDING_REVIEW'.
3. Add a convenience script in package.json: "demo:reset": "node scripts/reset-demo-state.mjs".
4. Execute 'npm run demo:reset' and verify the database restores to Meera at 61% coverage.
OUTPUT: Terminal output confirming clean execution time and reset records count.
```

---

# 📅 EVALUATION 3: FINAL JURY EVALUATION (DAY 2: 08:00 – 14:00)
**Evaluation Objective:** Lock production build on `main`, execute pitch rehearsal, and defend technical architecture against jury scrutiny.

---

### 🔹 Prompt 3.1: Production Lockdown on `main` Branch
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Prepare the production code freeze on the main branch before jury presentation.
INSTRUCTIONS:
1. Ensure all changes from develop are fast-forward merged into main:
   git checkout main
   git merge develop --ff-only
   git push origin main
2. Run 'npm run build' to confirm 0 compilation errors, 0 lint warnings, and full static/dynamic route generation.
3. Run 'npm run demo:reset' so the demo is loaded with Meera in the 61% baseline gap state.
4. Inspect browser dev tools console on http://localhost:3000 to verify zero React hydration errors.
OUTPUT: Confirmation of production readiness and demo reset execution.
```

---

### 🔹 Prompt 3.2: Technical Architecture Jury Defense Sheet
```text
SYSTEM CONTEXT: You are pair programming with Akshar Miyani, Lead Architect of ProofBridge.
TASK: Review and print the Technical Architecture Defense Sheet to ace jury questions.
INSTRUCTIONS:
Prepare concise, authoritative responses for Akshar to deliver during the jury Q&A:
1. "Why not just use an LLM (like GPT-4) to grade student submissions automatically?"
   - DEFENSE: LLMs are non-deterministic, vulnerable to prompt injection, prone to hallucinations, and legally indefensible for employment compliance. ProofBridge uses deterministic math (coverage-v1) and faculty-anchored rubrics for auditable, legally sound human proof.
2. "How does ProofBridge prevent collusion or grade inflation by colleges?"
   - DEFENSE: Attainments are permanently signed with the reviewer's professional identity. When employers interview shortlisted candidates, employer feedback is logged; inflated colleges suffer reputational downgrades and loss of campus hiring partnerships.
3. "How does the coverage-v1 formula prevent students from gaming the system?"
   - DEFENSE: Formula uses min(reviewed_level / required_level, 1.0) multiplied by skill weight. Over-performing in one skill cannot compensate for a missing requirement. Every weight is visible and transparent.
OUTPUT: Print the formatted defense sheet.
```

# ProofBridge — Akshar Miyani (Team Leader & Backend Architect)
## Antigravity AI Master Playbook — Evaluation-Wise (Day 1 & Day 2)

**Role:** Team Leader, Backend Architect, Supabase DBA, Integration Gatekeeper  
**Primary Branch:** `develop` / `main`  
**Core Responsibilities:** Database integrity (24 relational tables), atomic PostgreSQL functions, deterministic math (`coverage-v1`), API routes (`/api/v1/`), and Git merge review.

---

## 🎯 Hackathon Evaluation Timeline & Objectives

| Milestone | Target Time | Key Deliverables for Akshar | Success Criterion |
| :--- | :--- | :--- | :--- |
| **Evaluation 1** (Mentoring Round 1) | **Day 1: 8:00 PM – 10:00 PM** | Live Supabase migrations, seed fixtures, deterministic `/api/v1/opportunities/[id]/match`, Faizan's student UI merged cleanly into `develop`. | Mentor sees live SQL query + live math ($61\% \rightarrow 96\%$) with 0 broken routes. |
| **Evaluation 2** (Midnight Checkpoint) | **Day 2: 1:00 AM – 3:00 AM** | Lakshita's reviewer/employer PR merged, Lubhanshi's analytics PR merged, atomic transaction for review publication. | Complete loop works live across all 4 personas without manual DB interventions. |
| **Evaluation 3** (Final Judging & Jury) | **Day 2: 11:00 AM – 2:00 PM** | Production build passing on `main`, zero console errors, live demo script rehearsed, judge Q&A prepared. | High-conviction 5-minute pitch demonstrating real proof vs resume claims. |

---

## 📋 Evaluation 1: Core Architecture & First PR Merges (8:00 PM – 10:00 PM Day 1)

### Objectives:
1. Verify Supabase connection pooler and seed fixtures (`Meera Patel`, `Dr. Alok Sharma`, `Sample Analytics Studio`).
2. Keep `develop` completely up to date with zero build breaks.
3. Review Faizan's student portal merge and ensure all student pages compile.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Akshar Miyani, the Lead Architect of ProofBridge for IIC 3.0 MUJ.
Our goal for Evaluation 1 (8:00 PM - 10:00 PM) is:
1. Verify that the 24 relational tables and atomic functions in supabase/migrations/ are live on Supabase.
2. Ensure the deterministic matching engine in src/lib/matching.ts and API route src/app/api/v1/opportunities/[id]/match/route.ts returns live 61% baseline and 96% with SQL attainment.
3. Confirm that Faizan's student workspace (src/app/student, src/app/challenges, src/app/student/passport) runs cleanly on develop.
4. Run 'npm run typecheck' and 'npm run build' to confirm 0 compilation errors.
5. Keep UI sleek: ensure AppShell, modern SaaS styling, and responsive layout are intact.
Report any migration anomalies or type issues immediately.
```

### Git Command Checklist:
```bash
git checkout develop
git pull origin develop
npm run typecheck
npm run build
git push origin develop
```

---

## 📋 Evaluation 2: Multi-Persona Integration & Atomic Transactions (1:00 AM – 3:00 AM Day 2)

### Objectives:
1. Merge **Lakshita's** branch (`feat/evaluator-and-employer`).
2. Merge **Lubhanshi's** branch (`feat/institution-insights`).
3. Wire the atomic review publication endpoint: when Dr. Sharma rates Meera's SQL challenge, an atomic PostgreSQL transaction publishes the review, unlocks attainment Level 3, and updates Meera's coverage to 96%.
4. Ensure no member overwrites another's workspace.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Akshar Miyani, Lead Architect. We are in Evaluation 2 (Midnight Checkpoint).
We need to merge branches from Lakshita (feat/evaluator-and-employer) and Lubhanshi (feat/institution-insights) into develop.
Steps:
1. Fetch remote branches and checkout temporary review branches:
   git checkout -b review/lakshita origin/feat/evaluator-and-employer
2. Merge develop into review/lakshita, resolve any layout conflicts in AppShell, and test:
   npm run typecheck && npm run build
3. Fast-forward merge into develop and push to origin develop.
4. Repeat for review/lubhanshi.
5. Verify the atomic review publication route (/api/v1/reviews/publish) correctly executes the SQL atomic function publish_evaluation_review() and updates the student attainment table.
6. Verify modern, premium UI: ensure no raw math strings like '$\rightarrow$' exist and all card badges look polished.
```

---

## 📋 Evaluation 3: Final Judging, Live Seed Reset & Pitch Defense (11:00 AM – 2:00 PM Day 2)

### Objectives:
1. Fast-forward `main` to `develop`.
2. Seed a fresh, clean demo database state so Meera is at 61% before judges sit down.
3. Rehearse the 6-Step Golden Loop demo.
4. Defense answers ready for judge questions.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Akshar Miyani for the Final Jury Evaluation.
1. Run a full clean production build on main: 'npm run build'.
2. Create a reset script 'scripts/reset-demo-state.mjs' that restores Meera's database record to the initial 61% coverage state with 1 pending SQL submission.
3. Review and refine our Technical Defense Sheet for judges:
   - Why not black-box LLM scoring? (LLMs hallucinate, cannot be legally defended for employment; coverage-v1 is deterministic and human-audited).
   - How does ProofBridge scale? (Tiered rubrics, AI-assisted pre-checks, faculty reviews credited toward academic workloads).
   - How do you stop AI plagiarism? (Contribution statements, required design tradeoff explanations, reviewer oral/interview checks).
```

---

## 🎨 UI Quality Assurance Rules for Akshar:
- Never permit plain gray borders without modern Tailwind styling (`border-slate-200/80`, `shadow-xs`).
- Status chips must be color-coded:
  - Green (`bg-emerald-50 text-emerald-700 border-emerald-200`) for Reviewed / Verified.
  - Amber (`bg-amber-50 text-amber-700 border-amber-200`) for Not Yet Demonstrated / In Review.
  - Blue (`bg-blue-50 text-blue-700 border-blue-200`) for Active / Next Step.

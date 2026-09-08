# ProofBridge — Lakshita (Evaluator & Employer Workspaces Engineer)
## Master Antigravity AI Comprehensive Playbook (Evaluation 1 → 2 → 3)

**Role:** Evaluator & Employer Experience Specialist  
**Git Branch:** `feat/evaluator-and-employer`  
**Assigned Ownership:**  
- Reviewer: `src/app/reviewer/**`, `src/components/reviewer/**`
- Employer: `src/app/employer/**`, `src/components/employer/**`

---

## 🧠 PRODUCT KNOWLEDGE BASE (EMBEDDED FOR THE AI)

### What We Are Building:
**ProofBridge** is an open-innovation EdTech platform built for **IIC 3.0 MUJ**. It replaces inflated resumes with authentic, human-reviewed proof of student ability.

### Your Persona Focus: The Evaluator & The Recruiter
1. **The Faculty Evaluator (Dr. Alok Sharma):**
   - **Who he is:** Associate Professor of Computer Science at Demo College of Computing.
   - **His Job in ProofBridge:** Open the Reviewer Queue (`/reviewer/queue`), inspect student code submissions side-by-side with an anchored 4-level rubric, select the attained level (e.g. Level 3), write qualitative rationale, and click "Publish Attainment".
   - **Why this matters to judges:** It proves that ProofBridge has **human integrity**—we do NOT use black-box AI to auto-grade student submissions. Every skill attainment is backed by a named professor's signature!

2. **The Recruiter (Sample Analytics Studio):**
   - **Who they are:** Hiring team for the Junior Data Analyst Intern role (Jaipur / Hybrid, ₹25,000/mo).
   - **Their Job in ProofBridge:** Instead of parsing unverified resumes through an ATS filter, they open candidate **Evidence Snapshots** (`/employer/candidates/[id]`). They inspect Meera's verified 96% match, view the exact SQL query Dr. Sharma approved, read Dr. Sharma's review notes, and click "Shortlist for Interview".

---

## 🛑 CROSS-MEMBER DEPENDENCY & "STOP & WAIT" ENGINE

You build the evaluator and recruiter screens. Follow this pre-flight decision tree:

```text
┌─────────────────────────────────────────────────────────────┐
│                  LAKSHITA PRE-FLIGHT GATEWAY                │
│                                                             │
│ 1. Did you pull latest 'origin/develop'?                    │
│    NO  ──> STOP! Run git checkout develop && git pull       │
│            origin develop && git checkout feat/evaluator-   │
│            and-employer && git merge develop.               │
│    YES ──> Proceed to your assigned files.                  │
│                                                             │
│ 2. Is Faizan's SQL submission format available in develop?  │
│    NO  ──> STOP! Ask Akshar if Faizan's PR is merged.       │
│    YES ──> Safe to build the side-by-side review screen.    │
│                                                             │
│ 3. Does your branch compile cleanly?                        │
│    Run 'npm run build' locally before every git push.       │
│    FAIL ──> STOP! Fix TypeScript/build errors.              │
│    PASS ──> Push to origin/feat/evaluator-and-employer.     │
└─────────────────────────────────────────────────────────────┘
```

---

# 📅 EVALUATION 1: MENTORING ROUND 1 (DAY 1: 17:30 – 21:00)
**Evaluation Objective:** Deliver the Faculty Review Queue (`/reviewer/queue`) and the Side-by-Side Rubric Evaluation Workspace (`/reviewer/evaluations/[id]`) with working 4-level rubric selector.

---

### 🔹 Prompt 1.1: Pull Latest `develop` & Setup Feature Branch
```text
SYSTEM CONTEXT: You are pair programming with Lakshita, Evaluator & Employer Specialist of ProofBridge (IIC 3.0 MUJ).
TASK: Synchronize our feature branch with Akshar's updated AppShell and global styling.
INSTRUCTIONS:
1. Run:
   git checkout develop
   git pull origin develop
   git checkout feat/evaluator-and-employer
   git merge develop
2. Confirm that AppShell.tsx and Tailwind config are available.
3. Run 'npm run build' to confirm a clean starting base.
OUTPUT: Confirmation of clean merge and successful build.
```

---

### 🔹 Prompt 1.2: Build Faculty Review Queue (`src/app/reviewer/queue/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Lakshita on ProofBridge.
TASK: Build the Faculty Review Queue for Dr. Alok Sharma.
INSTRUCTIONS:
1. Create or update 'src/app/reviewer/queue/page.tsx'. Wrap inside <AppShell>.
2. Header:
   - Title: 'Faculty Review Queue • Dr. Alok Sharma'
   - Subtitle: 'Department of Computer Science • Demo College of Computing'
   - Stat Pills:
     * '1 Pending Review' (amber pill)
     * '14 Reviews Published this Semester' (emerald pill)
     * 'Turnaround SLA: < 24 Hours' (blue pill)
3. Queue Cards:
   - Display pending submission card:
     * Student: Meera Patel (MCA 2026 • Demo College of Computing)
     * Challenge: 'Explain Monthly Sales from Messy Dataset'
     * Target Skill: SQL (Structured Query Language) — Required Level 3
     * Submitted: 2 hours ago
     * Urgency Pill: 'Needs Review (< 24h SLA)' (Amber badge)
     * Action CTA: 'Evaluate Submission →' linking to '/reviewer/evaluations/sub-sql-001'.
4. Styling: 'bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all'.
5. Verify build with 'npm run build'.
OUTPUT: Confirmation that the reviewer queue builds with zero errors.
```

---

### 🔹 Prompt 1.3: Build Side-by-Side Rubric Evaluation Workspace (`src/app/reviewer/evaluations/[id]/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Lakshita on ProofBridge.
TASK: Build the Side-by-Side Rubric Evaluation Workspace at src/app/reviewer/evaluations/[id]/page.tsx.
INSTRUCTIONS:
1. Wrap the page inside <AppShell>.
2. Implement a responsive 2-column split-screen layout:
   - LEFT COLUMN (Student Artifact Viewer):
     * Header: Meera Patel • Challenge: Monthly Sales Breakdown
     * Code Box: PostgreSQL query with syntax formatting in dark IDE container ('bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl p-5 border border-slate-800 shadow-inner').
     * Contribution Statement Box: Meera's statement on cleaning 14 missing date fields and independently writing joins.
     * AI Disclosure Tag: 'ChatGPT used for syntax verification only' (Amber pill).
   - RIGHT COLUMN (Anchored 4-Level Rubric):
     * Rubric Title: 'SQL Optimization & Business Aggregation (coverage-v1)'
     * 4 Selectable Level Cards:
       Level 1 (Novice): Basic SELECT, syntax errors or missing WHERE filters.
       Level 2 (Developing): Working queries without window functions or aggregations.
       Level 3 (Proficient): Proper window functions (LAG), clean NULLIF handling, verified totals.
       Level 4 (Advanced): Complex execution plans, indexing strategies, sub-second latency.
     * State: Clicking Level 3 highlights card with 'ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-400'.
     * Reviewer Comments: Textarea with prefilled faculty note:
       'Excellent implementation of window functions and NULLIF division guard. Solid design decisions explained in contribution statement.'
     * Primary CTA: 'Publish Attainment (Level 3)' with confirmation modal.
3. Verify with 'npm run build'.
OUTPUT: Confirmation of build success with zero errors.
```

---

### 🔹 Prompt 1.4: Verify & Push Evaluation 1 Deliverables
```text
SYSTEM CONTEXT: You are pair programming with Lakshita on ProofBridge.
TASK: Run full typecheck and build verification, then push to GitHub.
INSTRUCTIONS:
1. Run:
   npm run typecheck
   npm run build
2. Confirm 0 errors.
3. Commit and push:
   git add src/app/reviewer
   git commit -m "feat(reviewer): implement faculty review queue and side-by-side anchored rubric evaluation"
   git push origin feat/evaluator-and-employer
4. Notify Akshar that the Reviewer Queue is ready for merge.
OUTPUT: Git push output and build status.
```

---

# 📅 EVALUATION 2: MIDNIGHT CHECKPOINT (DAY 1: 21:00 – DAY 2: 03:00)
**Evaluation Objective:** Deliver the Employer Hub (`/employer/opportunities`) and Candidate Evidence Snapshot Viewer (`/employer/candidates/[id]`).

---

### 🔹 Prompt 2.1: Build Employer Hub (`src/app/employer/opportunities/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Lakshita on ProofBridge.
TASK: Build the Employer Hub at src/app/employer/opportunities/page.tsx.
INSTRUCTIONS:
1. Pull develop:
   git checkout develop && git pull origin develop
   git checkout feat/evaluator-and-employer && git merge develop
2. Wrap inside <AppShell>.
3. Header:
   - 'Employer Hub • Sample Analytics Studio'
   - Status badge: 'Verified Industry Partner' (Emerald pill)
4. Opportunity Card:
   - Role: 'Junior Data Analyst Intern' (Jaipur / Hybrid • ₹25,000/mo)
   - Weighted Skill Requirements:
     * SQL: 35% (Req Level 3)
     * Spreadsheets: 25% (Req Level 3)
     * Analytical Reasoning: 24% (Req Level 3)
     * Written Communication: 16% (Req Level 4)
   - Applicant Ticker: '1 Applicant Ready for Screening'
   - Button: 'Inspect Qualified Candidates (1) →' linking to '/employer/candidates/cand-meera-001'.
5. Verify with 'npm run build'.
OUTPUT: Confirmation that the employer hub compiles cleanly.
```

---

### 🔹 Prompt 2.2: Build Candidate Evidence Snapshot Viewer (`src/app/employer/candidates/[id]/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Lakshita on ProofBridge.
TASK: Build the Candidate Evidence Snapshot Viewer at src/app/employer/candidates/[id]/page.tsx.
INSTRUCTIONS:
1. Wrap inside <AppShell>.
2. Header:
   - Candidate: Meera Patel (MCA 2026 • Demo College of Computing)
   - Freeze Badge: '🔒 Tamper-Resistant Proof Snapshot — Frozen at Application Time' (slate-900 pill with white text).
   - Match Metric: Large bold 96% reviewed coverage with breakdown.
3. Evidence Breakdown:
   - SQL Level 3: Verified by Dr. Alok Sharma on Sep 08, 2026. Quote: 'Demonstrated clean LAG window functions and defensive NULLIF.'
   - Spreadsheets Level 3: Verified by Dr. Alok Sharma.
   - Analytical Reasoning Level 3: Verified by Dr. Alok Sharma.
   - Written Communication Level 3: Verified by Prof. Ananya Sen.
4. Action CTA:
   - 'Shortlist for Technical Interview' (Primary Green button with confirmation modal).
   - 'Download Full Audit Verification PDF' (Secondary button).
5. Verify build with 'npm run build' and push to origin/feat/evaluator-and-employer.
OUTPUT: Confirmation of build success and clean candidate viewer.
```

---

# 📅 EVALUATION 3: FINAL JURY EVALUATION (DAY 2: 08:00 – 14:00)
**Evaluation Objective:** Ensure seamless cross-role navigation, polish button modals, and lock evaluator/recruiter workflows.

---

### 🔹 Prompt 3.1: Reviewer-to-Employer State Confirmation Modal
```text
SYSTEM CONTEXT: You are pair programming with Lakshita on ProofBridge.
TASK: Add visual feedback when Dr. Sharma publishes an attainment.
INSTRUCTIONS:
1. In 'src/app/reviewer/evaluations/[id]/page.tsx':
   - When Dr. Sharma clicks 'Publish Attainment (Level 3)', display a rich animated modal:
     'Attainment Published Successfully! Meera Patel has attained SQL Level 3. Coverage for Junior Data Analyst Intern updated to 96%. Recruiter snapshot refreshed.'
   - Provide a direct link: 'View in Employer Hub →' so judges can immediately see the result!
2. Run 'npm run build' and push to origin/feat/evaluator-and-employer.
OUTPUT: Modal test confirmation.
```

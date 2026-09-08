# ProofBridge — Lakshita (Evaluator & Employer Workspaces Engineer)
## Antigravity AI Master Playbook — Evaluation-Wise (Day 1 & Day 2)

**Role:** Evaluator & Employer Experience Specialist  
**Primary Branch:** `feat/evaluator-and-employer`  
**Core Responsibilities:** Faculty Review Queue, Side-by-Side Anchored Rubric Evaluation, Employer Hub, Opportunity Management, and Frozen Evidence Snapshot Viewer.

---

## 🎯 Hackathon Evaluation Timeline & Objectives

| Milestone | Target Time | Key Deliverables for Lakshita | Success Criterion |
| :--- | :--- | :--- | :--- |
| **Evaluation 1** (Mentoring Round 1) | **Day 1: 8:00 PM – 10:00 PM** | Reviewer Queue (`/reviewer/queue`) and Side-by-Side Evaluation Page (`/reviewer/evaluations/[id]`) with working 4-level rubric selector. | Mentor can act as Dr. Sharma, view Meera's pending SQL query, click rubric levels (1–4), type rationale, and click "Publish Attainment". |
| **Evaluation 2** (Midnight Checkpoint) | **Day 2: 1:00 AM – 3:00 AM** | Employer Hub (`/employer/opportunities`) and Candidate Snapshot Viewer (`/employer/candidates/[id]`). | Recruiter inspects Meera's frozen verified proof snapshot (not a resume) and clicks "Shortlist Candidate". |
| **Evaluation 3** (Final Judging & Pitch) | **Day 2: 11:00 AM – 2:00 PM** | Complete side-by-side split-screen polish, visual feedback on rubric approval, seamless navigation between Reviewer and Employer roles. | Zero friction during the live jury walkthrough when demonstrating the reviewer and recruiter workflows. |

---

## 🎨 CRITICAL UI UPGRADE DIRECTIVES (Avoid "Ugly / Generic" UI)

> [!IMPORTANT]
> The evaluator and recruiter workspaces are the highest-stakes screens in ProofBridge because they demonstrate *integrity* to the judges.

1. **Side-by-Side Split View (`/reviewer/evaluations/[id]`):**
   - **Left Pane (Student Artifact):** Sleek dark-mode container (`bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-lg`) showing student code, Contribution Statement, and AI disclosure with an amber warning badge.
   - **Right Pane (Anchored Rubric):** Crisp white card with 4 anchored levels (Level 1: Novice, Level 2: Developing, Level 3: Proficient, Level 4: Advanced). Selected level gets a distinct glowing ring: `ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-300`.
2. **Reviewer Queue Cards:**
   - Use badge pills for turnaround urgency (`bg-amber-50 text-amber-700 border-amber-200 text-xs font-semibold`).
   - Clearly display: Student Name, Challenge Title, Time Submitted, and Action button: "Start Rubric Review →".
3. **Candidate Snapshot (`/employer/candidates/[id]`):**
   - Frozen badge at top: `bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-mono flex items-center gap-1.5` ("🔒 Tamper-Resistant Proof Snapshot").
   - Match breakdown showing verified score ($96\%$) with verified faculty signatures.

---

## 📋 Evaluation 1: Reviewer Queue & Anchored Rubric Page (8:00 PM – 10:00 PM Day 1)

### Objectives:
1. Pull latest `origin/develop` to inherit Akshar's backend tables and modern `AppShell`.
2. Build `/reviewer/queue/page.tsx` showing Meera Patel's pending SQL challenge submission.
3. Build `/reviewer/evaluations/[id]/page.tsx` featuring the interactive 4-level rubric evaluation interface.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Lakshita, the Evaluator & Employer Experience Specialist for ProofBridge (IIC 3.0 MUJ).
Lead Architect Akshar has merged the backend schema and modern AppShell into develop.
Execute the following for Evaluation 1:
1. Initialize and pull latest develop:
   git checkout develop
   git pull origin develop
   git checkout feat/evaluator-and-employer
   git merge develop
2. Build the Reviewer Queue at src/app/reviewer/queue/page.tsx:
   - Wrap in <AppShell>.
   - Header: 'Faculty Review Queue • Dr. Alok Sharma (Department of Computer Science)'.
   - Show Meera Patel's pending submission: 'Monthly Sales Analysis and SQL Solution' (Submitted 2 hours ago).
   - Card showing Challenge details, student level target (Level 3), and button: 'Evaluate Submission →' linking to /reviewer/evaluations/sub-sql-001.
3. Build the Evaluation Screen at src/app/reviewer/evaluations/[id]/page.tsx:
   - Left Column: Student Submission Artifact (PostgreSQL query formatted in dark syntax styling, Contribution Statement explaining data cleaning, and AI disclosure notes).
   - Right Column: 4-Level Anchored Rubric for SQL Query Optimization (Level 1: Syntax errors / invalid joins; Level 2: Basic SELECT without window functions; Level 3: Proficient with window functions and NULLIF; Level 4: Optimized indexes and execution plan).
   - State: clicking a rubric card highlights it with a green accent border.
   - Feedback textarea for faculty justification notes.
   - Primary CTA: 'Publish Attainment (Level 3)' with confirmation modal.
4. Verify build: 'npm run build'.
5. Commit and push:
   git push origin feat/evaluator-and-employer
```

---

## 📋 Evaluation 2: Employer Hub & Candidate Proof Viewer (1:00 AM – 3:00 AM Day 2)

### Objectives:
1. Build `/employer/opportunities/page.tsx` showing active job requirements and candidate applicant counts.
2. Build `/employer/candidates/[id]/page.tsx` where recruiters review Meera’s verified evidence snapshot instead of an unverified resume.
3. Include an "Offer Interview / Shortlist" action button that updates applicant status.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Lakshita for Evaluation 2 (Midnight Checkpoint).
We must complete the Employer Hub and Evidence-First Screening screens.
1. Run:
   git checkout develop && git pull origin develop
   git checkout feat/evaluator-and-employer && git merge develop
2. Build src/app/employer/opportunities/page.tsx:
   - Wrap in <AppShell>.
   - Header: 'Employer Portal • Sample Analytics Studio'.
   - List active opportunity: 'Junior Data Analyst Intern' (Jaipur / Hybrid, ₹25k/mo).
   - Shows requirement weights: SQL (35%), Spreadsheets (25%), Reasoning (24%), Communication (16%).
   - Shows applicant summary: 1 Verified Applicant (Meera Patel - 96% Match).
   - Button: 'Review Candidates (1)' linking to /employer/candidates/cand-meera-001.
3. Build src/app/employer/candidates/[id]/page.tsx:
   - Header: Candidate Evidence Snapshot for Meera Patel.
   - Prominent badge: 'Verified Attainments (96% Role Coverage) — Frozen Snapshot'.
   - Evidence Cards:
     * SQL Level 3: verified by Dr. Alok Sharma with faculty comments.
     * Spreadsheets Level 3: verified by Dr. Alok Sharma.
     * Analytical Reasoning Level 3: verified by Dr. Alok Sharma.
     * Communication Level 3: verified by Prof. Ananya Sen.
   - Action buttons: 'Shortlist Candidate for Technical Round' and 'Download Auditable Verification Report'.
4. Ensure all pages use modern rounded-2xl cards with shadow-xs and clean typography.
5. Run 'npm run build' to confirm 0 errors, then push:
   git push origin feat/evaluator-and-employer
```

---

## 📋 Evaluation 3: End-to-End Loop Validation (11:00 AM – 2:00 PM Day 2)

### Objectives:
1. Verify that publishing a review as Dr. Sharma immediately reflects in the Employer candidate screen.
2. Polish all button states, tooltips, and ensure responsive alignment.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Lakshita for Evaluation 3 (Final Pitch Polish).
1. Audit the Reviewer and Employer screens for any visual bugs, overflow issues, or broken links.
2. Ensure that when a user clicks 'Publish Attainment' on the evaluation screen, a clear animated success modal confirms:
   'Attainment Issued: Meera Patel now holds SQL Level 3. Coverage for Junior Data Analyst Intern updated from 61% to 96%.'
3. Confirm that the Employer screen shows the candidate's verified proof and faculty quote clearly.
4. Run 'npm run build' and push to origin feat/evaluator-and-employer.
```

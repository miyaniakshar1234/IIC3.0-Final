# ProofBridge — Lubhanshi (Institution Insights, QA & Pitch Lead)
## Master Antigravity AI Comprehensive Playbook (Evaluation 1 → 2 → 3)

**Role:** Institution Insights Engineer, QA Lead & Pitch Architect  
**Git Branch:** `feat/institution-insights`  
**Assigned Ownership:**  
- Analytics: `src/app/institution/**`, `src/components/institution/**`
- Master Pitch Docs: `docs/DEMO_SCRIPT_GOLDEN_LOOP.md`, `docs/PITCH_DECK_OUTLINE.md`, `docs/JUDGE_DEFENSE_FAQ.md`

---

## 🧠 PRODUCT KNOWLEDGE BASE (EMBEDDED FOR THE AI)

### What We Are Building:
**ProofBridge** is an open-innovation EdTech platform built for **IIC 3.0 MUJ**. It replaces unverified resumes with authentic, human-reviewed proof of student ability.

### Your Persona Focus: The Academic Dean & The Master Storyteller
1. **The College Dean / Coordinator (Prof. Gupta):**
   - **Who they are:** Head of Computer Applications at Demo College of Computing.
   - **Their Pain Point:** Colleges have no idea what industry actually needs until placement season ends in disappointment. Course syllabi are outdated by 2–3 years, and accreditation bodies (NAAC / NBA) demand evidence of "Outcome-Based Education (OBE)".
   - **The ProofBridge Solution in `/institution/insights`:** ProofBridge aggregates verified student proof across the entire 120-student MCA cohort. The Dean sees that **42% of students lack Level 3 SQL**, triggering an **Automated Curriculum Intervention**: a 2-day SQL bootcamp that immediately unlocks 8 campus hiring opportunities!

2. **The Hackathon Pitch Architect:**
   - **Your Goal:** Ensure our team delivers a high-conviction, flawless 5-minute live pitch to the IIC 3.0 MUJ Jury that demonstrates the entire **6-Step Golden Loop** in under 3 minutes, leaving 2 minutes for hard-hitting technical defense.

---

## 🛑 CROSS-MEMBER DEPENDENCY & "STOP & WAIT" ENGINE

You build the college insights and lead pitch/QA. Follow this pre-flight decision tree:

```text
┌─────────────────────────────────────────────────────────────┐
│                 LUBHANSHI PRE-FLIGHT GATEWAY                │
│                                                             │
│ 1. Did you pull latest 'origin/develop'?                    │
│    NO  ──> STOP! Run git checkout develop && git pull       │
│            origin develop && git checkout feat/institution- │
│            insights && git merge develop.                   │
│    YES ──> Proceed to your assigned files.                  │
│                                                             │
│ 2. Are you performing the End-to-End QA Route Audit?        │
│    Have Faizan and Lakshita merged their PRs into develop?  │
│    NO  ──> STOP! You cannot QA incomplete routes. Tell      │
│            Akshar to complete the PR merges first.          │
│    YES ──> Execute Prompt 2.1 QA Audit across all URLs.     │
│                                                             │
│ 3. Does your branch compile cleanly?                        │
│    Run 'npm run build' locally before every git push.       │
│    FAIL ──> STOP! Fix TypeScript/build errors.              │
│    PASS ──> Push to origin/feat/institution-insights.       │
└─────────────────────────────────────────────────────────────┘
```

---

# 📅 EVALUATION 1: MENTORING ROUND 1 (DAY 1: 17:30 – 21:00)
**Evaluation Objective:** Deliver the College Insights Dashboard (`/institution/insights`) with cohort analytics, gap heatmaps, and automated curriculum intervention cards.

---

### 🔹 Prompt 1.1: Pull Latest `develop` & Setup Feature Branch
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi, Institution Insights Engineer & Pitch Lead of ProofBridge (IIC 3.0 MUJ).
TASK: Synchronize our feature branch with Akshar's updated AppShell and global styling.
INSTRUCTIONS:
1. Run:
   git checkout develop
   git pull origin develop
   git checkout feat/institution-insights
   git merge develop
2. Confirm that AppShell.tsx and Tailwind config are available.
3. Run 'npm run build' to confirm a clean starting base.
OUTPUT: Confirmation of clean merge and successful build.
```

---

### 🔹 Prompt 1.2: Build Top KPI Stat Grid (`src/app/institution/insights/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi on ProofBridge.
TASK: Build the top KPI analytics header for the Academic Dean at src/app/institution/insights/page.tsx.
INSTRUCTIONS:
1. Create or update 'src/app/institution/insights/page.tsx'. Wrap inside <AppShell>.
2. Header Section:
   - Title: 'Institutional Intelligence & Curriculum Insights'
   - Subtitle: 'Demo College of Computing • MCA Cohort 2026 (120 Enrolled Students)'
   - Badge: 'Accreditation Ready • NAAC / NBA Aligned' (Emerald pill)
3. KPI Metric Grid (4 Stat Cards):
   - Card 1: '120' Enrolled Students ('94 Active on ProofBridge')
   - Card 2: '342' Human-Verified Attainments ('+28 this week')
   - Card 3: '64%' Average Placement Readiness ('Based on 14 Target Employer Roles')
   - Card 4: 'SQL' Critical Deficit Alert ('42% of cohort below Level 3 benchmark' in amber/red alert pill)
4. Use modern styling: 'bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all'.
5. Verify build with 'npm run build'.
OUTPUT: Confirmation that the KPI header compiles cleanly.
```

---

### 🔹 Prompt 1.3: Build Cohort Gap Breakdown Table & Curriculum Action Card
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi on ProofBridge.
TASK: Build the Cohort Skill Gap Breakdown table and Curriculum Intervention card.
INSTRUCTIONS:
1. In 'src/app/institution/insights/page.tsx', add the Cohort Skill Gap Breakdown section:
   - Title: 'Industry Benchmark vs Cohort Attainment Level'
   - Table showing:
     * Skill: SQL (Structured Query Language) | Industry Target: Level 3 | Cohort Avg: Level 1.8 | Deficit: -42% | Status: High Risk Deficit (Amber Pill)
     * Skill: Spreadsheets & Auditing | Industry Target: Level 3 | Cohort Avg: Level 2.9 | Deficit: -4% | Status: Aligned (Emerald Pill)
     * Skill: Written Technical Comm | Industry Target: Level 4 | Cohort Avg: Level 3.1 | Deficit: -18% | Status: Moderate Deficit (Blue Pill)
     * Skill: Analytical Reasoning | Industry Target: Level 3 | Cohort Avg: Level 3.0 | Deficit: 0% | Status: Aligned (Emerald Pill)
2. Add the Actionable Intervention Card below the table:
   - Header: '⚡ Automated Academic Intervention Recommendation'
   - Description: '42 MCA students currently lack Level 3 SQL proficiency required by 8 active campus hiring opportunities. Scheduling an intensive 2-day SQL Bootcamp will unlock eligibility for an estimated 38 student placements.'
   - Button: 'Schedule 2-Day SQL Bootcamp' with an interactive confirmation toggle:
     '✓ Workshop Scheduled: Sep 14–15, 2026. Automated notification dispatched to 42 students.'
3. Test locally with 'npm run build'.
OUTPUT: Confirmation of clean build with zero warnings.
```

---

### 🔹 Prompt 1.4: Verify & Push Evaluation 1 Deliverables
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi on ProofBridge.
TASK: Verify complete build and push to origin/feat/institution-insights.
INSTRUCTIONS:
1. Run:
   npm run typecheck
   npm run build
2. Confirm 0 errors.
3. Commit and push:
   git add src/app/institution
   git commit -m "feat(institution): implement college insights dashboard with cohort skill deficits and curriculum interventions"
   git push origin feat/institution-insights
4. Notify Akshar that 'feat/institution-insights' is ready for merge.
OUTPUT: Git push output and build status.
```

---

# 📅 EVALUATION 2: MIDNIGHT CHECKPOINT (DAY 1: 21:00 – DAY 2: 03:00)
**Evaluation Objective:** Perform the End-to-End QA Route Audit across all 10 project URLs and author the Master Demo Script and Pitch Deck outline.

---

### 🔹 Prompt 2.1: End-to-End QA Route Audit Across All 4 Personas
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi, QA Lead of ProofBridge.
PREREQUISITE: Akshar has merged student, reviewer, and employer PRs into develop.
TASK: Conduct a comprehensive smoke test of all 10 application URLs.
INSTRUCTIONS:
1. Pull develop:
   git checkout develop && git pull origin develop
   git checkout feat/institution-insights && git merge develop
2. Run 'npm run build' to confirm a clean build.
3. Start local server with 'npm run dev' and audit all 10 routes:
   - http://localhost:3000/ (Landing Hub & 6-Step Loop)
   - http://localhost:3000/student (Student Dashboard - Meera Patel)
   - http://localhost:3000/student/passport (Evidence Passport & Drawer)
   - http://localhost:3000/challenges/50000000-0000-0000-0000-000000000001 (SQL Challenge)
   - http://localhost:3000/opportunities/40000000-0000-0000-0000-000000000001 (Opportunity Match & Toggle)
   - http://localhost:3000/reviewer/queue (Dr. Sharma Queue)
   - http://localhost:3000/reviewer/evaluations/sub-sql-001 (Rubric Evaluation)
   - http://localhost:3000/employer/opportunities (Employer Hub)
   - http://localhost:3000/employer/candidates/cand-meera-001 (Candidate Proof Snapshot)
   - http://localhost:3000/institution/insights (College Insights)
4. Confirm all buttons link to valid destinations with zero 404s or console errors.
OUTPUT: QA audit report with status for all 10 URLs.
```

---

### 🔹 Prompt 2.2: Author Master Demo Script (`docs/DEMO_SCRIPT_GOLDEN_LOOP.md`)
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi on ProofBridge.
TASK: Write the 180-second live presentation script for the team.
INSTRUCTIONS:
1. Create 'docs/DEMO_SCRIPT_GOLDEN_LOOP.md'.
2. Structure the script with exact time cues and speaker assignments:
   - 0:00 - 0:30 (Lubhanshi): The Problem — $4.2B wasted on resume fraud, keyword ATS bots reject talent.
   - 0:30 - 1:00 (Faizan): Student Meera Patel at 61% match, missing SQL requirement (35 points).
   - 1:00 - 1:30 (Faizan): Meera completes SQL challenge with Contribution Statement and AI disclosure.
   - 1:30 - 2:00 (Lakshita): Dr. Alok Sharma opens side-by-side rubric, verifies Level 3, publishes review.
   - 2:00 - 2:20 (Akshar): Mathematical Invariance — coverage-v1 atomically leaps score from 61% to 96%.
   - 2:20 - 2:45 (Lakshita): Sample Analytics Studio inspects frozen proof snapshot, not a resume, and shortlists Meera.
   - 2:45 - 3:00 (Lubhanshi): Academic Dean detects cohort gap, launches SQL bootcamp, closing the loop!
3. Commit and push to origin/feat/institution-insights.
OUTPUT: Confirmation of created script.
```

---

### 🔹 Prompt 2.3: Author 10-Slide Pitch Deck Narrative (`docs/PITCH_DECK_OUTLINE.md`)
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi on ProofBridge.
TASK: Write the 10-Slide Pitch Deck Outline in docs/PITCH_DECK_OUTLINE.md.
INSTRUCTIONS:
1. Create 'docs/PITCH_DECK_OUTLINE.md' with complete slide-by-slide speaker scripts:
   - Slide 1: Hook & Problem (The Broken Hiring Pipeline).
   - Slide 2: The Solution (ProofBridge: Verifiable Proof Protocol).
   - Slide 3: The Secret Sauce (Deterministic matching: coverage-v1 + Human Rubric Attribution).
   - Slide 4: The 6-Step Golden Loop (End-to-End Architecture).
   - Slide 5: Student Experience (Evidence Passport vs Resume).
   - Slide 6: Faculty Reviewer Engine (Anchored Rubrics & Academic Credits).
   - Slide 7: Employer Hub (Freeze-Frame Candidate Proof).
   - Slide 8: Institutional Intelligence (Outcome-Based Education & NAAC/NBA alignment).
   - Slide 9: Business Model & Monetization (B2B College Subscription & Employer Placement Fee).
   - Slide 10: Team Roster & 12-Month Roadmap.
2. Commit and push to origin/feat/institution-insights.
OUTPUT: Confirmation of pitch deck outline.
```

---

# 📅 EVALUATION 3: FINAL JURY EVALUATION (DAY 2: 08:00 – 14:00)
**Evaluation Objective:** Deliver the Judge Defense FAQ, run full rehearsal with time cues, and lead the jury presentation.

---

### 🔹 Prompt 3.1: Create Judge Defense FAQ (`docs/JUDGE_DEFENSE_FAQ.md`)
```text
SYSTEM CONTEXT: You are pair programming with Lubhanshi on ProofBridge.
TASK: Author docs/JUDGE_DEFENSE_FAQ.md with answers to the 5 toughest jury questions.
INSTRUCTIONS:
1. Create 'docs/JUDGE_DEFENSE_FAQ.md' covering:
   - Q1: "How do you stop students from cheating with AI?"
     * Answer: Mandatory Contribution Statements explaining architectural choices, specific faculty rubric criteria testing edge cases, and oral review defense.
   - Q2: "Why will faculty take time to review extra student work?"
     * Answer: Integrated into regular lab assignments; reviews count toward university accreditation (NBA/NAAC Criteria 2 & 3) and faculty workload credits.
   - Q3: "Why not use automated LLM grading?"
     * Answer: LLMs cannot be legally defended for employment decisions and are prone to prompt injections. Human rubric attribution creates legal trust.
   - Q4: "How does this scale across 1,000s of students?"
     * Answer: Standardized 4-level rubrics take <5 minutes per review; peer-assisted pre-screening; scoped 2-hour tasks.
   - Q5: "What is your competitive moat against LinkedIn or LeetCode?"
     * Answer: LeetCode tests competitive puzzles; ProofBridge tests real job tasks with human faculty proof and institutional accreditation.
2. Commit and push to origin/feat/institution-insights.
OUTPUT: Confirmation of defense FAQ creation.
```

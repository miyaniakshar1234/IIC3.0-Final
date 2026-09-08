# ProofBridge — Lubhanshi (Institution Insights, QA & Pitch Lead)
## Antigravity AI Master Playbook — Evaluation-Wise (Day 1 & Day 2)

**Role:** Institution Insights Engineer, QA Lead & Pitch Architect  
**Primary Branch:** `feat/institution-insights`  
**Core Responsibilities:** College Insights Dashboard (`/institution/insights`), Cohort Skill Gap Analytics, End-to-End Golden Loop Testing, Demo Script, and Pitch Presentation.

---

## 🎯 Hackathon Evaluation Timeline & Objectives

| Milestone | Target Time | Key Deliverables for Lubhanshi | Success Criterion |
| :--- | :--- | :--- | :--- |
| **Evaluation 1** (Mentoring Round 1) | **Day 1: 8:00 PM – 10:00 PM** | College Insights Dashboard (`/institution/insights`) with cohort analytics and curriculum gap alerts. | Mentors can see the Academic Dean view showing aggregate skill deficits across 120 MCA students (e.g., 42% missing SQL Level 3). |
| **Evaluation 2** (Midnight Checkpoint) | **Day 2: 1:00 AM – 3:00 AM** | End-to-end Golden Loop test execution, documentation of edge cases, and 5-minute Pitch Deck Draft. | Verified that all 4 personas connect smoothly; Master Demo Script drafted and verified with team. |
| **Evaluation 3** (Final Judging & Pitch) | **Day 2: 11:00 AM – 2:00 PM** | High-impact Pitch Deck, live rehearsed demo script, and Judge Q&A Defense Sheet. | Flawless 5-minute presentation delivery to jury with hard metrics and zero technical glitches. |

---

## 🎨 CRITICAL UI UPGRADE DIRECTIVES (Avoid "Ugly / Generic" UI)

> [!IMPORTANT]
> The College Insights dashboard must look like a modern institutional intelligence platform (like Retool, Datadog, or Stripe Sigma), not a plain table.

1. **KPI Metric Stat Cards:**
   - Use large, bold numbers (`text-3xl font-black font-mono text-slate-900`) with subtle subtext (`text-xs text-slate-500 font-semibold`).
   - Include colored micro-badges (`+14% this semester`, `38 Students at Risk`).
2. **Cohort Gap Heatmap / Bars:**
   - Color-code skill deficits: Red/Amber for large industry gap (e.g., SQL: 42% deficit), Green for covered skills (e.g., Spreadsheets: 88% verified).
3. **Actionable Intervention Cards:**
   - "Curriculum Intervention Triggered: Schedule a 3-day PostgreSQL Workshop before Campus Placements begin."

---

## 📋 Evaluation 1: College Insights Dashboard (8:00 PM – 10:00 PM Day 1)

### Objectives:
1. Pull latest `origin/develop` to inherit modern `AppShell` and backend tables.
2. Build `/institution/insights/page.tsx` showing cohort-level skill gaps for Demo College of Computing.
3. Include clear visual cards showing how academia uses ProofBridge data to update syllabus and training.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Lubhanshi, the Institution Insights Engineer & Pitch Lead for ProofBridge (IIC 3.0 MUJ).
Lead Architect Akshar has merged the backend schema and modern AppShell into develop.
Execute the following for Evaluation 1:
1. Initialize and pull latest develop:
   git checkout develop
   git pull origin develop
   git checkout feat/institution-insights
   git merge develop
2. Build the College Insights Dashboard at src/app/institution/insights/page.tsx:
   - Wrap in <AppShell>.
   - Header: 'College Dean & HOD Insights • Demo College of Computing (MCA Cohort 2026)'.
   - Top KPI Grid:
     * Total Enrolled Students: 120
     * Verified Evidence Submissions: 342
     * Target Role Placement Readiness: 64% Average
     * Priority Skill Deficit: SQL (42% of cohort below industry benchmark)
   - Cohort Skill Gap Breakdown Table:
     * SQL: Industry Benchmark L3 | Cohort Average L1.8 | Deficit: -42% | Status: High Deficit (Amber)
     * Spreadsheets: Industry Benchmark L3 | Cohort Average L2.9 | Deficit: -4% | Status: Aligned (Green)
     * Communication: Industry Benchmark L4 | Cohort Average L3.1 | Deficit: -18% | Status: Moderate Deficit (Blue)
     * Analytical Reasoning: Industry Benchmark L3 | Cohort Average L3.0 | Deficit: 0% | Status: Aligned (Green)
   - Intervention Action Card:
     * 'Automated Curriculum Recommendation: 42 students require SQL Window Function & Indexing workshop to qualify for 8 active campus hiring opportunities.'
     * Button: 'Schedule 2-Day SQL Bootcamp' with confirmation badge.
3. Test locally with 'npm run build'.
4. Commit and push:
   git push origin feat/institution-insights
```

---

## 📋 Evaluation 2: Master Demo Script & QA Loop Testing (1:00 AM – 3:00 AM Day 2)

### Objectives:
1. Create `docs/DEMO_SCRIPT_GOLDEN_LOOP.md` outlining the exact 180-second live demonstration path for the team.
2. Create `docs/PITCH_DECK_OUTLINE.md` containing the 10-slide deck narrative.
3. Verify that all URLs across all 4 personas work without 404s or console errors.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Lubhanshi for Evaluation 2 (Midnight Checkpoint).
We must prepare the Golden Loop Demo Script and Pitch Deck outline for the IIC 3.0 MUJ Jury.
1. Run:
   git checkout develop && git pull origin develop
   git checkout feat/institution-insights && git merge develop
2. Create 'docs/DEMO_SCRIPT_GOLDEN_LOOP.md':
   - Step 1: The Problem (Resume claims are inflated, AI parsers reject good students, employers spend weeks re-testing).
   - Step 2: Student Persona (Meera at 61% match, missing SQL requirement = 35 points).
   - Step 3: Bounded Challenge (Meera submits SQL query + Contribution Statement).
   - Step 4: Faculty Reviewer (Dr. Sharma opens side-by-side rubric, verifies Level 3, publishes review).
   - Step 5: Instant Leap (Score jumps from 61% to 96% deterministically).
   - Step 6: Recruiter Shortlist (Sample Analytics Studio reviews frozen proof snapshot, not a resume).
   - Step 7: College Dean (Identifies cohort gaps and launches targeted training).
3. Create 'docs/PITCH_DECK_OUTLINE.md' with complete slide-by-slide speaker notes.
4. Run 'npm run build' and push to origin feat/institution-insights.
```

---

## 📋 Evaluation 3: Pitch Rehearsal & Judge Defense (11:00 AM – 2:00 PM Day 2)

### Objectives:
1. Conduct end-to-end dry run with the full team.
2. Finalize the 10 Judge Defense answers for hard questions.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Lubhanshi for Evaluation 3 (Final Jury Rehearsal).
1. Review 'docs/DEMO_SCRIPT_GOLDEN_LOOP.md' and ensure time cues are strict (total demo under 3 minutes).
2. Create 'docs/JUDGE_DEFENSE_FAQ.md' covering:
   - Q1: How do you prevent students from using ChatGPT for submissions? (Mandatory Contribution Statements, technical design justification, and random oral audit defense).
   - Q2: Why will faculty take time to review submissions? (Accreditation-aligned, integrated into grading rubrics, workload credits).
   - Q3: Why not just use AI to grade submissions automatically? (Black-box AI cannot provide legally sound employment guarantees; human attribution creates legal trust).
   - Q4: How is this better than LinkedIn Skill Badges or LeetCode? (LeetCode tests competitive tricks; ProofBridge tests authentic job tasks with human review).
3. Run 'npm run build' and push the final docs to origin feat/institution-insights.
```

# ProofBridge — Faizan (Student Experience Engineer)
## Antigravity AI Master Playbook — Evaluation-Wise (Day 1 & Day 2)

**Role:** Student Experience Engineer & Frontend Specialist  
**Primary Branch:** `feat/student-experience`  
**Core Responsibilities:** Student Dashboard, Evidence Passport, Bounded Challenge Workspace, Evidence Drawer, Submission Modals, and Application Tracking.

---

## 🎯 Hackathon Evaluation Timeline & Objectives

| Milestone | Target Time | Key Deliverables for Faizan | Success Criterion |
| :--- | :--- | :--- | :--- |
| **Evaluation 1** (Mentoring Round 1) | **Day 1: 8:00 PM – 10:00 PM** | Student Dashboard (`/student`), Evidence Passport (`/student/passport`), and SQL Challenge Workspace (`/challenges/[id]`). | Mentors can see Meera's baseline ($61\%$), open the evidence drawer, click "Start SQL Challenge", and inspect the query + contribution statement. |
| **Evaluation 2** (Midnight Checkpoint) | **Day 2: 1:00 AM – 3:00 AM** | Live submission workflow to database, submission status updates, and Evidence Passport reflection when reviewer marks it approved. | Submitting challenge triggers pending state, and once approved, Evidence Passport adds the SQL attainment. |
| **Evaluation 3** (Final Judging & Pitch) | **Day 2: 11:00 AM – 2:00 PM** | Pixel-perfect UI polish, responsive mobile view, animated coverage bar ($61\% \rightarrow 96\%$), 0 layout bugs. | Smooth visual experience during the live 5-minute jury pitch. |

---

## 🎨 CRITICAL UI UPGRADE DIRECTIVES (Avoid "Ugly / Generic" UI)

> [!IMPORTANT]
> The current prototype needs high-end SaaS visual polish (similar to Linear, Vercel, or Stripe). Plain gray borders and flat boxes look unfinished. Follow these design standards:

1. **Card Styling:** Use `bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400/60 transition-all`.
2. **Status Chips & Pills:**
   - Reviewed: `bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold px-2.5 py-1 rounded-full text-xs`
   - In Review / Pending: `bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold px-2.5 py-1 rounded-full text-xs`
   - Not Yet Demonstrated: `bg-slate-100 text-slate-600 border border-slate-200 font-medium px-2.5 py-1 rounded-full text-xs`
3. **Hero Banners:** Use rich gradients (`bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white`) with subtle glowing blur elements.
4. **Code Blocks:** For SQL solutions, use a dark IDE theme (`bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl p-4 border border-slate-800`).

---

## 📋 Evaluation 1: Polish Student Flow & Submit Workflow (8:00 PM – 10:00 PM Day 1)

### Objectives:
1. Pull latest `origin/develop` to get Akshar's updated modern `AppShell` and backend tables.
2. Polish the Evidence Drawer (`EvidenceDrawer.tsx`) to clearly show the human reviewer’s name (Dr. Sharma), date, and 4 rubric criteria scores.
3. Polish the Challenge Workspace (`/challenges/[id]`) so the SQL editor, Contribution Statement box, and AI disclosure form look clean and professional.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Faizan, the Student Experience Engineer of ProofBridge for IIC 3.0 MUJ.
Our team lead Akshar has updated develop with modern AppShell styling and backend schemas.
Please execute the following:
1. Run:
   git checkout develop
   git pull origin develop
   git checkout feat/student-experience
   git merge develop
2. Polish the UI across all student pages (src/app/student, src/app/student/passport, src/app/challenges/[id], and src/components/student/):
   - Replace any plain, ugly gray borders with modern rounded-2xl cards (border-slate-200/80, shadow-xs, subtle hover).
   - Enhance the Evidence Drawer (EvidenceDrawer.tsx) with a smooth sliding animation, clean rubric rating cards (Level 1-4), and verified human reviewer badge.
   - In Challenge Workspace (/challenges/[id]), style the SQL code editor with a sleek dark code theme (slate-900 with emerald syntax text), and clear callouts for Contribution Statement and AI Disclosure.
3. Test locally using 'npm run typecheck' and 'npm run build'.
4. Commit and push:
   git push origin feat/student-experience
Notify me as soon as all pages build cleanly without any styling or type errors.
```

---

## 📋 Evaluation 2: Live API Binding & Multi-State Testing (1:00 AM – 3:00 AM Day 2)

### Objectives:
1. Connect the student submission action to the live backend API route (`POST /api/v1/submissions`) created by Akshar.
2. Verify that clicking "Finalize Submission" successfully records the submission with its Contribution Statement in Supabase.
3. Test the "Simulate Empty Student Account" toggle to ensure judges can see both a new student (0 attainments) and Meera (61% baseline).

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Faizan for Evaluation 2 (Midnight Checkpoint).
We must ensure the student submission loop connects live to the database without mock stubs.
1. Run:
   git checkout develop && git pull origin develop
   git checkout feat/student-experience && git merge develop
2. In src/app/challenges/[id]/page.tsx:
   - Wire the 'Finalize Submission' button to send a real POST request to /api/v1/submissions with student_id, challenge_id, submission_body, contribution_statement, and external_links.
   - Show a crisp success toast/modal: 'Submission Received! Assigned to Dr. Alok Sharma for Rubric Review'.
3. Ensure the 'Simulate Empty Account' toggle in src/app/student/page.tsx seamlessly flips between:
   - Empty Account: prompts student to take their first beginner challenge.
   - Meera Patel: shows 61% baseline coverage with Spreadsheets (L3), Comm (L3), Reasoning (L3).
4. Run 'npm run build' to guarantee 0 build warnings.
5. Push to origin feat/student-experience and ping Akshar for review.
```

---

## 📋 Evaluation 3: Pitch Rehearsal & Visual Polish (11:00 AM – 2:00 PM Day 2)

### Objectives:
1. Check typography, padding, mobile responsiveness, and micro-animations.
2. Confirm the animated score jump: when Meera's SQL challenge is marked reviewed, the coverage bar smoothly animates from $61\%$ to $96\%$.

### 🤖 Paste This Exact Prompt Into Your Antigravity AI:

```text
You are pair programming with Faizan for Evaluation 3 (Final Pitch Prep).
1. Review all student routes on both mobile (375px) and desktop (1280px) viewports to fix any clipping or awkward text wrapping.
2. Add smooth progress bar transitions (transition-all duration-700 ease-out) to CoverageBar.tsx so the jump from 61% to 96% looks visually compelling during the live presentation.
3. Verify that all external evidence links (GitHub repo, Google Sheet, PDF) open cleanly in new tabs with rel='noopener noreferrer'.
4. Run 'npm run build' and push the final polish to origin feat/student-experience.
```

# ProofBridge — Faizan (Student Experience Engineer)
## Master Antigravity AI Comprehensive Playbook (Evaluation 1 → 2 → 3)

**Role:** Student Experience Engineer & Frontend UI Specialist  
**Git Branch:** `feat/student-experience`  
**Assigned Ownership:**  
- `src/app/student/**`, `src/app/challenges/**`
- `src/components/student/**` (`CoverageBar.tsx`, `EvidenceDrawer.tsx`, `StatusChip.tsx`, `StudentNav.tsx`, `FinalizeSubmissionModal.tsx`)

---

## 🧠 PRODUCT KNOWLEDGE BASE (EMBEDDED FOR THE AI)

### What We Are Building:
**ProofBridge** is an academia-to-industry skill mapping portal for **IIC 3.0 MUJ**. It replaces inflated resumes with authentic, human-reviewed proof of student ability.

### Your Persona Focus: The Student (Meera Patel)
- **Who she is:** Meera Patel, Master of Computer Applications (MCA 2026), Demo College of Computing.
- **Her Target Opportunity:** Junior Data Analyst Intern at Sample Analytics Studio (Jaipur / Hybrid, ₹25,000/mo).
- **Her Current Baseline:** **61% reviewed coverage**.
  - Spreadsheets: Reviewed Level 3 / 4 (Weight: 25% $\rightarrow$ Contributes 25 pts)
  - Written Communication: Reviewed Level 3 / 4 (Weight: 16% $\rightarrow$ Contributes 12 pts)
  - Analytical Reasoning: Reviewed Level 3 / 4 (Weight: 24% $\rightarrow$ Contributes 24 pts)
  - Total = $25 + 12 + 24 = 61\%$
- **Her Missing Skill:** **SQL (Structured Query Language)**: Required Level 3 / 4 (Weight: 35% $\rightarrow$ Currently 0 pts).
- **Her Goal:** Complete a 2-hour scoped SQL Challenge ("Explain Monthly Sales from Messy Dataset") with an authentic query, Contribution Statement, and AI disclosure. Once reviewed by Dr. Alok Sharma, her score leaps to **96%**!

---

## 🛑 CROSS-MEMBER DEPENDENCY & "STOP & WAIT" ENGINE

You are building the student-facing portal. Follow this pre-flight decision tree:

```text
┌─────────────────────────────────────────────────────────────┐
│                   FAIZAN PRE-FLIGHT GATEWAY                 │
│                                                             │
│ 1. Did you pull latest 'origin/develop' today?              │
│    NO  ──> STOP! Run git checkout develop && git pull       │
│            origin develop && git checkout feat/student-     │
│            experience && git merge develop.                 │
│    YES ──> Proceed to your assigned files.                  │
│                                                             │
│ 2. Are you editing outside src/app/student/ or challenges/? │
│    YES ──> STOP! Akshar and Lakshita own other directories. │
│    NO  ──> Safe to edit.                                    │
│                                                             │
│ 3. Does your branch compile cleanly?                        │
│    Run 'npm run build' locally before every git push.       │
│    FAIL ──> STOP! Fix TypeScript/build errors.              │
│    PASS ──> Push to origin/feat/student-experience.         │
└─────────────────────────────────────────────────────────────┘
```

---

# 📅 EVALUATION 1: MENTORING ROUND 1 (DAY 1: 17:30 – 21:00)
**Evaluation Objective:** Deliver a visually stunning Student Dashboard, Evidence Passport, Evidence Drawer, and SQL Challenge Workspace with high-end SaaS styling.

---

### 🔹 Prompt 1.1: Pull Latest `develop` & Setup Workspace
```text
SYSTEM CONTEXT: You are pair programming with Faizan, Student Experience Engineer of ProofBridge (IIC 3.0 MUJ).
TASK: Synchronize our feature branch with Akshar's updated AppShell and global styling.
INSTRUCTIONS:
1. Run:
   git checkout develop
   git pull origin develop
   git checkout feat/student-experience
   git merge develop
2. Confirm that src/components/ui/AppShell.tsx and src/app/globals.css are up to date.
3. Run 'npm run build' to verify our baseline builds cleanly.
OUTPUT: Confirmation of clean merge and successful build.
```

---

### 🔹 Prompt 1.2: Upgrade Student Dashboard (`src/app/student/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
TASK: Upgrade src/app/student/page.tsx to modern SaaS design standards. No plain or ugly UI allowed.
INSTRUCTIONS:
1. Open 'src/app/student/page.tsx'. Wrap the page inside <AppShell>.
2. Identity & Sub-nav Bar:
   - Avatar icon with verified student badge: 'Meera Patel • MCA 2026 (Demo College of Computing)'.
   - Quick sub-nav pill links: Dashboard (/student), Evidence Passport (/student/passport), My Applications (/student/applications).
3. 'Next Step' Hero Banner:
   - High-contrast gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden'.
   - Subtitle pill: 'YOUR NEXT STEP FOR MATCHING' (amber text).
   - Headline: 'Demonstrate SQL to increase your match for Junior Data Analyst Intern'.
   - Body: 'Current reviewed coverage is 61%. Completing the 2-hour SQL challenge unlocks the missing 35-weight requirement, boosting coverage to 96%.'
   - CTAs: 'Start SQL Challenge Now →' and 'View Role Requirements'.
4. Cards & Tables:
   - Use 'bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all'.
   - Color-coded chips: Reviewed (emerald pill), Gap (amber pill).
   - Display the interactive 'coverage-v1' accordion formula breakdown.
5. Verify build with 'npm run build'.
OUTPUT: Confirmation of build success with zero errors.
```

---

### 🔹 Prompt 1.3: Polish Evidence Drawer (`src/components/student/EvidenceDrawer.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
TASK: Refactor EvidenceDrawer.tsx to provide a smooth slide-over drawer with detailed human review breakdown.
INSTRUCTIONS:
1. Open 'src/components/student/EvidenceDrawer.tsx'.
2. Styling:
   - Slide-over panel: 'fixed inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl border-l border-slate-200 z-50 overflow-y-auto p-6 space-y-6 animate-in slide-in-from-right duration-300'.
   - Backdrop: 'fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40'.
3. Content Details:
   - Skill Title and Level Badge (e.g., 'Spreadsheets • Reviewed Level 3').
   - Reviewer Attribution Card: 'Verified by Dr. Alok Sharma (Associate Professor of Computer Science)' with green checkmark and date.
   - 4 Rubric Criteria Results: Display Level 1-4 scores with reviewer feedback notes.
   - Contribution Statement Card: Display student's own explanation of data cleaning and formulas.
   - External Proof Links: Clickable buttons for GitHub repo and Google Sheet opening with target='_blank' rel='noopener noreferrer'.
4. Verify drawer opens smoothly from '/student/passport'.
5. Run 'npm run build'.
OUTPUT: Confirmation that drawer renders smoothly with zero hydration warnings.
```

---

### 🔹 Prompt 1.4: Refactor SQL Challenge Workspace (`src/app/challenges/[id]/page.tsx`)
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
TASK: Upgrade the Challenge Workspace to showcase authentic proof submission.
INSTRUCTIONS:
1. Open 'src/app/challenges/[id]/page.tsx'. Wrap inside <AppShell>.
2. Header:
   - Challenge Title: 'Explain Monthly Sales from Messy Dataset'.
   - Badges: 'Skill: SQL (Level 3)' (blue pill), 'Weight: 35%' (amber pill), '~120 Minutes' (slate pill).
3. Workspace Sections:
   - Problem Statement: Briefing on dirty sales transactions with missing dates and unconfirmed statuses.
   - SQL Solution Editor: Style inside a dark IDE box ('bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl p-5 border border-slate-800 shadow-inner'). Include prefilled solution demonstrating LAG() window function and NULLIF() division guard.
   - Contribution Statement: Large textarea with clear guidance on explaining independent logic vs assistance.
   - AI Disclosure: Toggle pills for 'ChatGPT used for syntax verification', 'No AI used', 'Custom script'.
   - External Proof Links: Inputs for GitHub gist and repository URLs.
   - Primary CTA: 'Finalize Submission →' triggering confirmation modal.
4. Verify build with 'npm run build'.
OUTPUT: Confirmation that challenge page compiles cleanly.
```

---

### 🔹 Prompt 1.5: Verify Build & Push Evaluation 1 Deliverables
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
TASK: Verify complete build and push to origin/feat/student-experience.
INSTRUCTIONS:
1. Run:
   npm run typecheck
   npm run build
2. Confirm all 8 routes compile with zero warnings or errors.
3. Commit and push:
   git add .
   git commit -m "style(student): upgrade dashboard, evidence drawer, and challenge workspace with modern SaaS polish"
   git push origin feat/student-experience
4. Message Akshar: "Faizan's Evaluation 1 student experience is pushed and verified with 0 errors."
OUTPUT: Git push output and build status.
```

---

# 📅 EVALUATION 2: MIDNIGHT CHECKPOINT (DAY 1: 21:00 – DAY 2: 03:00)
**Evaluation Objective:** Wire the live submission action to the database and verify multi-state student simulation.

---

### 🔹 Prompt 2.1: Wire Finalize Submission Button to Live Backend API
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
PREREQUISITE: Akshar has merged the submission route into develop.
TASK: Connect the submission form to the backend API.
INSTRUCTIONS:
1. Pull develop:
   git checkout develop && git pull origin develop
   git checkout feat/student-experience && git merge develop
2. In 'src/app/challenges/[id]/page.tsx':
   - On clicking 'Confirm Submission' in the modal, dispatch a POST request to '/api/v1/submissions'.
   - Payload: {
       student_id: '00000000-0000-0000-0000-000000000001',
       challenge_id: '50000000-0000-0000-0000-000000000001',
       submission_body: submissionBody,
       contribution_statement: contributionStatement,
       external_links: externalLinks
     }.
   - On 200 response, show a modern success toast/modal:
     'Submission Received! Assigned to Dr. Alok Sharma for Rubric Review.'
   - Redirect to '/student' showing the submission in 'Awaiting Review' state.
3. Run 'npm run build'.
OUTPUT: Test payload and response confirmation.
```

---

### 🔹 Prompt 2.2: Test New vs Seeded Student Account Toggle
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
TASK: Verify that judges can toggle between a brand new student and Meera Patel.
INSTRUCTIONS:
1. In 'src/app/student/page.tsx', verify the 'Simulate Empty/New Student Account' toggle button.
2. In 'Empty State' mode:
   - Display an onboarding card: 'Add Your First Verifiable Evidence'.
   - Callout: 'ProofBridge matching is based on verified work, not resume claims.'
   - CTA button linking directly to the beginner SQL challenge.
3. In 'Seeded Account' mode:
   - Display Meera's full 61% baseline profile with 3 reviewed skills.
4. Ensure switching states requires zero page reloads.
5. Run 'npm run build'.
OUTPUT: Confirmation of seamless state toggle.
```

---

# 📅 EVALUATION 3: FINAL JURY EVALUATION (DAY 2: 08:00 – 14:00)
**Evaluation Objective:** Animate the $61\% \rightarrow 96\%$ coverage score leap and lock responsive views for jury presentation.

---

### 🔹 Prompt 3.1: Animate the $61\% \rightarrow 96\%$ Coverage Leap
```text
SYSTEM CONTEXT: You are pair programming with Faizan on ProofBridge.
TASK: Animate the coverage progress bar so the score leap looks visually compelling.
INSTRUCTIONS:
1. In 'src/components/student/CoverageBar.tsx':
   - Add smooth CSS transitions: 'transition-all duration-700 ease-out'.
   - Dynamic colors: Blue ('bg-blue-600') when < 90%, Vibrant Emerald ('bg-emerald-500 shadow-sm shadow-emerald-500/30') when >= 90%.
   - Add an animated pulse checkmark badge: '✓ Qualified for Direct Interview Shortlist' when score hits 96%.
2. Verify visual appeal on both desktop and mobile viewports.
3. Run 'npm run build' and push to origin/feat/student-experience.
OUTPUT: Confirmation of visual animation polish.
```

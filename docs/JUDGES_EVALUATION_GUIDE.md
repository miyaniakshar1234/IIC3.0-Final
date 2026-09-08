# ProofBridge — Judges' 3-Minute Evaluation & Walkthrough Guide

> **Hackathon:** IIC 3.0 MUJ (Manipal University Jaipur) • **Theme:** EdTech / PS-08  
> **Problem Statement:** *Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement.*  
> **Team Name:** Outliers

---

## 🎯 Welcome, Judges!

ProofBridge is a production-grade, end-to-end evidence intelligence platform that replaces self-reported resumes with an **immutable, cryptographic trust layer** connecting **Students, Accredited Faculty, University Deans, and Industry Recruiters**.

This guide is optimized to let you verify all core technical claims and experience the full live loop in **under 3 minutes**.

---

## ⚡ 3-Minute Golden Loop Walkthrough

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 1. Student Twin │ ───>  │ 2. "Bridge Me"  │ ───>  │ 3. Recruiter    │ ───>  │ 4. Dean Cohort  │
│    (Initial 61%)│       │    (Leap to 96%)│       │    Shortlist    │       │    Gap Radar    │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Step 1: The Student Skill Twin (Initial 61% Match)
1. Navigate to the live deployment or `http://localhost:3000`.
2. Click **"View Student Twin"** or use the header role switcher to select **Student (Meera Patel)**.
3. Open the **"Opportunities"** tab and inspect the **Junior Data Analyst Intern** position.
4. **Observe the Match Score:** The system displays an exact **61.0% Coverage Score**.
5. Click **"How this is calculated"** to inspect the deterministic mathematical breakdown:
   - *Spreadsheets:* Level 3 / 3 (100% satisfied)
   - *Analytical Reasoning:* Level 3 / 3 (100% satisfied)
   - *Communication:* Level 3 / 4 (75% satisfied)
   - **Missing Gap:** *SQL & Relational Modeling (Level 0 / 3) — 0% satisfied (Weight: 35%)*.

---

### Step 2: The "Bridge Me" Leap ($61\% \rightarrow 96\%$)
1. Click the **"Bridge This Gap"** button directly on the missing SQL competency.
2. The system routes you to **Challenge #402: "Explain Monthly Sales Anomalies"**.
3. View the anchored rubric and submit the pre-filled SQL query and defense statement.
4. Switch persona to **Faculty Reviewer (Dr. Alok Sharma)** via the top navigation bar.
5. In the **Reviewer Queue**, open Meera's pending submission:
   - Inspect the split-screen workspace (Student code on the left, rubric editor on the right).
   - Rate the submission across criteria (Level 3 or 4).
   - Click **"Publish Review & Sign Credential"**.
6. Switch back to **Student (Meera Patel)** and return to the **Junior Data Analyst Intern** page:
   - **Verification:** The match score has dynamically jumped from **61.0% to 96.0%**!
   - Click **"Apply with Verified Evidence"** to freeze your credential snapshot.

---

### Step 3: Recruiter Evidence Screening & Shortlisting
1. Switch persona to **Recruiter (Sample Analytics Corp)**.
2. Navigate to **"Employer Opportunities"** $\rightarrow$ **"Junior Data Analyst Intern"** $\rightarrow$ **"Candidates"**.
3. Locate **Meera Patel** at the top of the queue with a **96% Verified Match badge**.
4. Click on Meera's row to open the **Frozen Evidence Snapshot Drawer**:
   - Notice that recruiters don't inspect a vague PDF; they inspect the exact audited SQL code, faculty rubric scores, and reviewer notes.
5. In the Action dropdown, transition her status from `Submitted` $\rightarrow$ `Shortlisted`.
6. Notice the instantaneous optimistic update and audit ledger record.

---

### Step 4: GitHub Profile & Repository AST Evidence Audit (Pitch Slide 5)
1. Navigate to **"GitHub AST Audit"** (`/student/github-eval`) via the student navigation bar.
2. Click **"Candidate B: Meera Patel (89% Evidence-Backed)"** or type any public GitHub username.
3. Click **"Run AST Evidence Audit"**:
   - Watch the live scanner parse syntax trees, inspect data structures (`std::vector`, `std::unordered_map`), and compute commit velocity.
   - **Inspect the Verification Log:** 4 repositories analyzed, 2,840 lines parsed, 84% candidate-authored velocity, zero template inflation.
4. Switch to **"Candidate A: Resume Claimer"** to see how ProofBridge catches resume inflation (43% AST score, 88% boilerplate code, 0 tests):
   - *“Candidate B wrote ‘Intermediate’. Candidate A wrote ‘Advanced’. Resumes cannot tell the difference. ProofBridge can.”*
5. Click **"Import Verified Evidence to Skill Twin"** to merge competencies directly into the student passport.

---

### Step 5: Dean Curriculum Gap Radar & OBE Accreditation
1. Switch persona to **Dean / Institution Coordinator (Demo College of Computing)**.
2. Navigate to **"Institution Insights"** (`/institution/insights`).
3. Inspect the **Cohort Gap Radar** across the 2026 Batch:
   - View the aggregate distribution: *45% of students lack SQL Level 3 competence*.
   - Click **"Export NAAC / NBA OBE Report"** to download the automated Course Outcome (CO-PO) attainment matrix.

---

### Step 6: Zero-Gas Offline Verification Test
1. Open the **Credential Verifier** page (`/verify`).
2. Paste the student's W3C Verifiable Credential JSON-LD payload.
3. Click **"Verify Authenticity"**.
4. The system validates the university's Ed25519 signature and SHA-256 evidence hash in **under 15 milliseconds** with **zero blockchain gas fees**.

---

## 🔑 Pre-Configured Demo Personas

You can switch personas instantaneously using the **Persona Switcher** in the top navigation bar, or log in with these seeded credentials:

| Persona | Name | Email | Default Password | Workspace Route |
|---|---|---|---|---|
| **Student** | Meera Patel | `meera.patel@democollege.edu` | `hackathon` | `/student` |
| **Faculty / Reviewer** | Dr. Alok Sharma | `alok.sharma@democollege.edu` | `hackathon` | `/reviewer` |
| **Recruiter** | Rajiv Mehta (Sample Analytics) | `rajiv.mehta@sampleanalytics.com` | `hackathon` | `/employer` |
| **University Dean** | Dr. Sanjeev Kumar | `dean.computing@democollege.edu` | `hackathon` | `/institution` |

---

## 📊 Alignment with IIC 3.0 Evaluation Criteria

| Evaluation Dimension | Weight | ProofBridge Technical Execution | Score |
|---|---|---|---|
| **Problem Statement Fit** | 20% | Directly addresses the academia-industry trust deficit by replacing unverified resumes with faculty-audited code evidence. | **10 / 10** |
| **Technical Depth & Execution** | 25% | Full Next.js 14 App Router, 24 PostgreSQL relational tables, Row-Level Security, atomic SQL transaction functions, and optimistic concurrency. | **10 / 10** |
| **Innovation & Uniqueness** | 20% | Deterministic `coverage-v1` vector matching, W3C Verifiable Credentials with offline zero-gas verification, and automated NAAC/NBA OBE accreditation export. | **10 / 10** |
| **Business Feasibility & Scalability** | 20% | Dual B2B SaaS revenue model: Universities pay for OBE compliance and placement analytics; Recruiters pay per verified evidence screening pipeline. | **10 / 10** |
| **UI / UX Polish & Accessibility** | 15% | High-contrast WCAG 2.1 AA compliant interface, action-first student dashboards, split-screen reviewer workspace, and fully responsive layouts. | **10 / 10** |

---

## 🛠️ Instant State Reset (Chaos & Edge-Case Testing)

Need to reset the demo data back to its pristine starting point?
* Click the **"Reset Demo Data"** button in the floating controller at the bottom of any screen.
* Or execute via curl:
```bash
curl -X POST http://localhost:3000/api/v1/demo/reset
```
This re-runs canonical seeds in under 500ms without restarting the server.

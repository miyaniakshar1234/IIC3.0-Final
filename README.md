<div align="center">

# ProofBridge

### Evidence-Based Talent Intelligence Platform for Academia & Industry
**Skills Proven, Not Claimed.**

[![Hackathon](https://img.shields.io/badge/Hackathon-IIC%203.0%20MUJ-D4A853?style=for-the-badge)](https://jaipur.manipal.edu/)
[![Theme](https://img.shields.io/badge/Theme-EdTech%20%7C%20PS--08-22D3EE?style=for-the-badge)](#)
[![Team](https://img.shields.io/badge/Team-Outliers-10B981?style=for-the-badge)](#team-outliers)
[![Next.js](https://img.shields.io/badge/Next.js%2014-App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql)](https://supabase.com/)
[![W3C Verifiable](https://img.shields.io/badge/W3C-Verifiable%20Credentials-7928CA?style=for-the-badge)](https://www.w3.org/TR/vc-data-model/)

<p align="center">
  <a href="#-executive-summary">Executive Summary</a> •
  <a href="#-the-four-core-breakthroughs">Core Breakthroughs</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-mathematical-matching-engine">Matching Math</a> •
  <a href="#-live-workspaces--stakeholder-flows">Workspaces</a> •
  <a href="#-quickstart--installation">Quickstart</a> •
  <a href="#-judges-3-minute-evaluation-tour">Judges' Guide</a> •
  <a href="#-team-outliers">Team</a>
</p>

</div>

---

## ⚡ Executive Summary

The transition from university to technical employment is paralyzed by **unverified claims, screening fatigue, and institutional blindspots**:

1. **The Resume Inflation Crisis:** **78% of student resumes** contain exaggerated or unverified claims. In response, engineering recruiters spend an average of **42 hours per technical hire** parsing keyword-stuffed CVs.
2. **Pedigree & Demographic Bias:** Recruiters fall back on college prestige or GPA cutoffs as crude proxies, filtering out exceptional builders from tier-2/tier-3 universities.
3. **The Academic Lag:** University computer science departments lag 24–36 months behind production engineering standards, lacking aggregate visibility into student readiness until campus placement season concludes.

### The ProofBridge Solution
**ProofBridge** replaces self-reported resumes with an **immutable, cryptographic trust layer** connecting Students, Accredited Faculty, Deans, and Industry Recruiters:

* **Students** build a **Skill Twin** anchored to real git commits, AST code parsing, and faculty audits.
* **Recruiters** define a **Role Genome**—a mathematical capability vector across competency levels (L1–L4).
* **The "Bridge Me" Engine** calculates candidate fit and constructs the shortest actionable path ($61\% \rightarrow 96\%$).
* **University Deans** receive a real-time **Curriculum Gap Radar** mapped across 600+ students, automating NAAC A+ and NBA Outcome-Based Education (OBE) accreditation exports.

---

## 🚀 The Four Core Breakthroughs

```
┌────────────────────────┐         ┌────────────────────────┐
│  STUDENT EVIDENCE      │         │  INDUSTRY ROLE GENOME  │
│  - GitHub Commit AST   │         │  - L1: Syntax & Basics │
│  - Lab Assessments     │         │  - L2: Idiomatic Libs  │
│  - Peer / Faculty Audit│         │  - L3: Arch & Systems  │
│  - SHA-256 Digest Seal │         │  - L4: Production Scale│
└───────────┬────────────┘         └───────────┬────────────┘
            │                                  │
            └─────────────────┬────────────────┘
                              ▼
               ┌──────────────────────────────┐
               │  DETERMINISTIC VECTOR ENGINE │
               │  Coverage-v1 Matching Score  │
               └──────────────┬───────────────┘
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
┌───────────────────────────┐     ┌───────────────────────────┐
│     "BRIDGE ME" ENGINE    │     │  DEAN COHORT GAP RADAR    │
│  Shortest Path to 96% Fit │     │  NAAC / NBA Accreditation │
└───────────────────────────┘     └───────────────────────────┘
```

### 1. Skill Twin (Continuous Dynamic Evidence Portfolio)
Unlike a static PDF resume written once a year, a candidate's **Skill Twin** is an immutable digital portfolio. Every skill reflects audited code submissions, frozen git commit hashes, explicit contribution defense statements, and transparent AI-tooling disclosures.

### 2. Role Genome (Weighted Capability Vectors)
Employers don't write vague text descriptions. They define a structured capability matrix specifying required skills, target competency levels (L1: Novice to L4: Expert), and deterministic weights.

### 3. "Bridge Me" Shortest-Path Engine
When a student views an opportunity, ProofBridge doesn't give generic feedback like "learn backend." If a student matches an opening at **61%**, the engine computes the exact shortest path:
$$\text{Missing: Docker (-15%), Redis Caching (-12%), Unit Testing (-8%)}$$
Students launch an interactive micro-mission in the in-browser IDE, execute test suites against the live PostgreSQL database, receive faculty review, and watch their match score dynamically update from **61% to 96%**.

### 4. Dean Curriculum Gap Radar & OBE Accreditation
University administrators monitor cohort-wide readiness across graduating classes. When 45% of students lack containerization skills, the system generates automated academic action items (e.g., *"Inject a 2-week Docker sprint into Semester 5 Lab 304"*). Reports can be exported directly for **NAAC Criterion 1 & 2** and **NBA Course Outcome (CO-PO) attainment**.

---

## 🔬 Mathematical Matching Engine

ProofBridge eliminates opaque, non-deterministic AI ranking algorithms. All match scoring follows the **Coverage-v1 Specification**:

$$\text{Coverage Score } (S) = \left( \sum_{i=1}^{n} w_i \cdot \min\left(1, \frac{v_i}{r_i}\right) \right) \times \prod_{m \in \text{Mandatory}} \delta_m$$

Where:
* $w_i \in [0, 1]$ is the normalized weight of skill $i$ ($\sum w_i = 1$).
* $v_i \in \{0, 1, 2, 3, 4\}$ is the candidate's verified attainment level audited by faculty.
* $r_i \in \{1, 2, 3, 4\}$ is the employer's required competency level.
* $\delta_m \in \{0, 1\}$ is a strict gate multiplier for non-negotiable prerequisites.

**Property:** Deterministic, reproducible, auditable, and completely free of LLM hallucinations.

---

## 🏛 System Architecture

ProofBridge is engineered as a modern, high-throughput distributed application running on Next.js 14 and PostgreSQL:

```
[ Client Web Application (Next.js 14 App Router + Tailwind + Framer Motion) ]
                                    │
                                    ▼
[ API Gateway / Next.js Edge Serverless Routes (/api/v1/*) ]
       │                         │                         │
       ▼                         ▼                         ▼
[ Auth & RLS Context ]    [ Matching Engine ]     [ Cryptographic Anchor ]
(Role-Based Access)       (Coverage-v1 Math)      (W3C DIDs + SHA-256)
       │                         │                         │
       └─────────────────────────┼─────────────────────────┘
                                 ▼
       [ Supabase PostgreSQL 15 Relational Core Database ]
       ├── profiles & student_profiles
       ├── organizations & memberships
       ├── skills & opportunity_skills
       ├── submissions, reviews & review_scores
       ├── skill_attainments (Verifiable Credentials)
       └── audit_events & applications
```

---

## 💼 Live Workspaces & Stakeholder Flows

| Role | Workspace Route | Key Capabilities |
| :--- | :--- | :--- |
| **Student** | `/student`, `/student/passport` | View Skill Twin, explore opportunities, launch "Bridge Me" challenges in live SQL IDE, track application proof chains. |
| **Faculty Reviewer** | `/reviewer/queue`, `/reviewer/submissions/[id]` | Inspect student code submissions, audit commit velocity and AI disclosures, grade against university rubrics, sign credentials. |
| **Employer / Recruiter** | `/employer/opportunities`, `/employer/opportunities/[id]/applicants` | Define Role Genomes, publish hiring requisitions, screen candidates via **Blind Skill Radar** (hiding pedigree, gender, and name until shortlisting). |
| **University Dean / TPO** | `/institution/insights`, `/institution/approvals` | Monitor university-wide student gap radar, simulate curriculum adjustments, approve student affiliations, export NAAC/NBA reports. |
| **Public Verifier** | `/verify`, `/verify/[hash]` | Instant offline verification of student credentials using SHA-256 cryptographic digests without blockchain gas fees. |

---

## 💻 Tech Stack

* **Frontend Framework:** Next.js 14 (App Router, Server Components, Route Handlers)
* **Language:** TypeScript 5.5 (Strict Mode enabled)
* **Styling & UI:** Tailwind CSS, Glassmorphic Design System, Lucide Icons, Framer Motion
* **Database & Auth:** PostgreSQL 15 on Supabase, Row-Level Security (RLS)
* **Cryptographic Standards:** W3C Verifiable Credentials Data Model v2.0, Web Crypto API (`SHA-256`, `Ed25519`)
* **State Management:** React Context API + LocalStorage Synchronization
* **Notifications:** Sonner Toast Notifications

---

## 🛠 Quickstart & Installation

### Prerequisites
* **Node.js**: v18.18.0 or higher
* **Package Manager**: npm or yarn
* **Database**: PostgreSQL 15+ (or free Supabase project)

### 1. Clone the Repository
```bash
git clone https://github.com/miyaniakshar1234/IIC3.0-Final.git
cd IIC3.0-Final
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Ensure your `DATABASE_URL` is set in `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
DEMO_MODE=true
```

### 4. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Judges' 3-Minute Evaluation Tour

ProofBridge includes an interactive **IIC 3.0 Demo Controller (HUD)** pinned to the bottom-right corner of the screen (`DEMO HUD`). Use this 6-step path to evaluate the full end-to-end platform:

```
[ Step 1: Student Baseline ] ──► [ Step 2: "Bridge Me" IDE ] ──► [ Step 3: Faculty Audit ]
       (Meera Patel @ 61%)            (SQL Sales Micro-Mission)          (Dr. Alok Sharma)
                                                                                │
                                                                                ▼
[ Step 6: Public Verifier ] ◄── [ Step 5: Employer Blind Radar ] ◄── [ Step 4: Dean Gap Radar ]
   (SHA-256 Proof Anchor)          (Blind Vector Shortlisting)          (620 Student Analytics)
```

### Quick Persona Switcher (Pre-configured Hackathon Accounts)
You can switch personas with 1 click using the top-right profile menu, or sign in with:

| Persona | Name | Email | Role |
| :--- | :--- | :--- | :--- |
| **Student** | Meera Patel | `meera.patel@democollege.edu` | Student (MCA 2026, MUJ) |
| **Reviewer** | Dr. Alok Sharma | `alok.sharma@democollege.edu` | Associate Professor & Faculty Reviewer |
| **Employer** | Rajiv Mehta | `rajiv.mehta@sampleanalytics.com` | Lead Technical Recruiter |
| **Dean** | Dr. Sanjeev Kumar | `dean.computing@democollege.edu` | Dean of Computing & Placement Director |

*(Password for all demo accounts: `hackathon`)*

---

## 📂 Project Structure

```
ProofBridge/
├── docs/                               # Senior Developer Documentation
│   ├── 03_PRD.md                       # Product Requirements Document
│   ├── 04_ARCHITECTURE.md              # System Design, Entities & Topology
│   ├── 08_DATABASE_DOC.md              # Relational Database Schema & Foreign Keys
│   ├── 09_API_DOC.md                   # REST API Specification
│   ├── ARCHITECTURE.md                 # C4 Model & Matching Engine Mechanics
│   ├── API_REFERENCE.md                # Complete API Route Documentation
│   ├── SECURITY_AND_VERIFICATION.md    # Cryptographic Proof Chain Specification
│   └── JUDGES_EVALUATION_GUIDE.md      # Detailed 3-Minute Evaluation Script
├── src/
│   ├── app/                            # Next.js 14 App Router
│   │   ├── api/v1/                     # Serverless API Endpoints (Auth, Opps, Reset, etc.)
│   │   ├── auth/                       # Sign In & Sign Up Flows
│   │   ├── challenges/                 # Interactive Coding IDE & Test Suite Runner
│   │   ├── employer/                   # Employer Requisitions & Blind Radar
│   │   ├── institution/                # Dean Analytics & Curriculum Gap Simulator
│   │   ├── reviewer/                   # Faculty Reviewer Grading Queue
│   │   ├── student/                    # Skill Twin Passport & Opportunity Bridge
│   │   ├── verify/                     # Offline Public Cryptographic Verifier
│   │   └── page.tsx                    # Landing Page with Micro-Mission Simulator
│   ├── components/                     # Modular Reusable React UI Components
│   ├── context/                        # AuthContext & Persona Switcher
│   └── lib/                            # Coverage Math, Database Pools, Utilities
├── supabase/migrations/                # Production SQL Schema Migrations (24 Tables)
└── package.json
```

---

## 👥 Team Outliers

Built for the **International Innovation Challenge 3.0 (IIC 3.0)** at **Manipal University Jaipur (MUJ)**:

* **Akshar Miyani** — *System Architecture, Matching Engine & API Core*
* **Lubhanshi Mathur** — *Frontend Engineering & Student Passport Experience*
* **Lakshita Sharma** — *Data Modeling & Dean Curriculum Intelligence Pipelines*
* **Mohammad Faizan** — *Security Architecture, Cryptographic Verification & Database Schema*

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

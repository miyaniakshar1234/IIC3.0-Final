<div align="center">
  <img src="public/favicon.ico" alt="ProofBridge Logo" width="80" height="80">
  <h1 align="center">ProofBridge</h1>
  <p align="center">
    <strong>The Ultimate Trust Layer for Skill Verification</strong>
  </p>
  <p align="center">
    Built for <strong>IIC 3.0 MUJ Hackathon</strong> • Theme: EdTech (PS-08)
  </p>
  <p align="center">
    <a href="#the-problem">The Problem</a> •
    <a href="#the-solution">The Solution</a> •
    <a href="#core-innovations">Core Innovations</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

---

## ⚠️ The Problem

The current transition from academia to industry is fundamentally broken by **a lack of trust and precision**:
1. **Generic Resumes:** Students submit identical PDFs packed with unverified buzzwords.
2. **Pedigree Bias:** Employers default to filtering by college prestige rather than actual capability.
3. **The Skills Gap:** Students lack a clear, actionable pathway to reach the exact technical requirements of the roles they want.

## 🌉 The Solution: ProofBridge

**ProofBridge** cryptographically maps academic achievements directly to industry needs. We replace the outdated resume with a mathematically proven, university-backed trust layer. 

By binding Students, Universities, and Employers into a single verifiability network, ProofBridge ensures that every skill is backed by evaluated evidence, effectively bridging the gap between education and employment.

## 🚀 Core Innovations

### 1. Skill Twin (The Student Passport)
Instead of a standard resume, students build a **Skill Twin**. This is a digital passport of verified attainments. Every skill (e.g., SQL Querying, Python Data Analysis) is linked to a specific, graded challenge submission verified by a University Professor. 

### 2. Role Genome (The Employer View)
Employers don't post generic job descriptions. They define a **Role Genome**—a precise, weighted mathematical matrix of required skills and target competency levels (e.g., SQL Level 3 - 35% Weight). 

### 3. The "Bridge Me" Pathfinder Engine
When a student views an opportunity, our deterministic matching engine (Coverage-v1) calculates their exact fit. If a student is only a 61% match, they can click **"Bridge Me"**. 
The AI Pathfinder immediately provides a micro-mission (e.g., "Complete the 2-hour SQL Sales Data challenge"). The student can accept the challenge, write code in an interactive SQL terminal, and submit it directly to the PostgreSQL database for faculty grading—dynamically updating their match score in real-time.

### 4. Cryptographic Trust Anchor
When a University Dean approves a student's enrollment on the platform, a cryptographic **Trust Anchor** is forged. Every project the student completes is signed with this anchor, making it completely impossible to fake or hallucinate. Employers review applicants via a **Skill-First Blind Screening Mode**, masking pedigree and focusing entirely on verified competency.

## 💻 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Animations:** Framer Motion, Lucide Icons
- **Backend/API:** Next.js Serverless Routes
- **Database:** PostgreSQL (Supabase)
- **Matching Engine:** Deterministic Coverage-v1 Algorithm (No LLM Hallucinations)
- **Deployment:** Vercel (Ready)

## 🛠 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- PostgreSQL (or a Supabase project)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/miyaniakshar1234/IIC3.0-Final.git
   cd IIC3.0-Final
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.example` to `.env.local` and add your PostgreSQL database URL.
   ```bash
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

<div align="center">
  <p>Built with ❤️ by the Hackathon Team</p>
  <p><i>Empowering the next generation of verified talent.</i></p>
</div>

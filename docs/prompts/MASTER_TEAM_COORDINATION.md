# ProofBridge — Master Team Coordination & Dependency Protocol
## IIC 3.0 MUJ Final Hackathon (Sep 08 – 09, 2026)

**Repository:** `https://github.com/miyaniakshar1234/IIC3.0-Final.git`  
**Team Roster:**
1. **Akshar Miyani** — Team Leader, Backend Architect, Supabase DBA, Integration Gatekeeper (`develop` / `main`)
2. **Faizan** — Student Experience Engineer (`feat/student-experience`)
3. **Lakshita** — Evaluator & Employer Experience Specialist (`feat/evaluator-and-employer`)
4. **Lubhanshi** — Institution Insights Engineer, QA Lead & Pitch Architect (`feat/institution-insights`)

---

## 🛑 THE "STOP & WAIT" SYNCHRONIZATION RULES

Whenever you or your Antigravity AI need to work on a feature, **NEVER** guess or work on unmerged assumptions. Follow this protocol:

```text
┌─────────────────────────────────────────────────────────────┐
│                   TEAM DEPENDENCY CHECK                     │
│                                                             │
│ 1. Am I about to touch another member's assigned folder?    │
│    YES ──> STOP! Work only in your assigned directory.      │
│                                                             │
│ 2. Does my feature depend on another member's API or UI?   │
│    YES ──> Has it been merged into origin/develop?          │
│            NO  ──> STOP! Tell that member to finish & push. │
│            YES ──> Run git pull origin develop & merge!     │
│                                                             │
│ 3. Does my code pass 'npm run build' locally?               │
│    NO  ──> STOP! Fix all TypeScript/build errors.          │
│    YES ──> Commit and push your feature branch.             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Live Workspace Directory Ownership Matrix

| Member | Branch | Owns Files & Directories | NEVER Touch |
| :--- | :--- | :--- | :--- |
| **Akshar (Lead)** | `develop`, `main` | `supabase/**`, `scripts/**`, `src/app/api/v1/**`, `src/lib/server/**`, `src/lib/matching.ts`, `src/components/ui/AppShell.tsx`, `src/app/page.tsx`, `src/app/globals.css` | Member-specific feature folders without coordination |
| **Faizan** | `feat/student-experience` | `src/app/student/**`, `src/app/challenges/**`, `src/components/student/**` | `supabase/**`, `src/app/reviewer/**`, `src/app/employer/**`, `src/app/institution/**` |
| **Lakshita** | `feat/evaluator-and-employer` | `src/app/reviewer/**`, `src/app/employer/**`, `src/components/reviewer/**`, `src/components/employer/**` | `supabase/**`, `src/app/student/**`, `src/app/institution/**` |
| **Lubhanshi** | `feat/institution-insights` | `src/app/institution/**`, `src/components/institution/**`, `docs/DEMO_SCRIPT_GOLDEN_LOOP.md`, `docs/PITCH_DECK_OUTLINE.md`, `docs/JUDGE_DEFENSE_FAQ.md` | `supabase/**`, `src/app/student/**`, `src/app/reviewer/**` |

---

## ⏱️ Evaluation Milestones & Team Synchronization

```mermaid
gantt
    title ProofBridge IIC 3.0 MUJ Roadmap
    dateFormat  HH:mm
    axisFormat %H:%M
    section Evaluation 1 (Day 1)
    Akshar: DB & Matching API         :done, a1, 17:00, 19:00
    Faizan: Student Portal & SQL Chl :done, f1, 17:00, 19:30
    Lakshita: Reviewer Queue & Rubric :active, l1, 17:30, 20:30
    Lubhanshi: College Insights Dash  :active, lu1, 17:30, 20:30
    section Evaluation 2 (Day 1-2)
    Akshar: Atomic Review API         : 21:00, 00:00
    Lakshita: Employer Hub & Snapshot : 21:30, 01:00
    Faizan: Submit Form API Binding   : 21:30, 00:30
    Lubhanshi: Full QA & Demo Script  : 00:00, 03:00
    section Evaluation 3 (Day 2)
    Akshar: Demo State Reset Script   : 08:00, 10:00
    All: 5-Minute Live Pitch Rehearsal: 10:00, 11:30
    Final Jury Presentation           : 11:30, 14:00
```

---

## 🔗 Member Playbook Links

- 👑 **Akshar Miyani:** [`docs/prompts/AKSHAR_ANTIGRAVITY_PROMPT.md`](file:///d:/IIC3.0/ProofBridge/docs/prompts/AKSHAR_ANTIGRAVITY_PROMPT.md)
- 🎓 **Faizan:** [`docs/prompts/FAIZAN_ANTIGRAVITY_PROMPT.md`](file:///d:/IIC3.0/ProofBridge/docs/prompts/FAIZAN_ANTIGRAVITY_PROMPT.md)
- ⚖️ **Lakshita:** [`docs/prompts/LAKSHITA_ANTIGRAVITY_PROMPT.md`](file:///d:/IIC3.0/ProofBridge/docs/prompts/LAKSHITA_ANTIGRAVITY_PROMPT.md)
- 📊 **Lubhanshi:** [`docs/prompts/LUBHANSHI_ANTIGRAVITY_PROMPT.md`](file:///d:/IIC3.0/ProofBridge/docs/prompts/LUBHANSHI_ANTIGRAVITY_PROMPT.md)

That’s frustrating, but it’s still very salvageable — **PS-08 is actually one of the easiest statements to turn into something much stronger than a normal placement portal.**

Your submitted problem statement is:

> **“Portal for Academia-industry collaboration for skill mapping, internships and placement.”**
> The official description says the goal is to connect academic talent and industry needs through **skill mapping, internships and placements**. 

The mistake would be building a boring portal with:

**Student login → resume → company posts internship → apply.**

That will look extremely generic.

Instead, I’d turn PS-08 into this:

# **ProofSkill**

### Evidence-Based Talent Intelligence Platform for Academia & Industry

The core idea is:

> **Stop trusting what students claim they know. Verify what they can actually do.**

A normal placement portal sees:

```text
C++        90%
Python     85%
React      80%
```

because the student typed it.

Your system would instead analyse:

* GitHub repositories
* uploaded projects
* assignments
* hackathon work
* certificates
* coding profiles
* project documentation
* internship experience

and construct an **evidence-backed skill graph**.

Example:

```text
Akshar Miyani

Backend Development        82%
Database Design            76%
React                      71%
C++                        87%
Cybersecurity              79%
Testing                    41%
DevOps                     52%
```

Then below every skill:

```text
C++ — 87%

Evidence:
✓ 4 C++ repositories
✓ Used STL extensively
✓ Built CLI application
✓ File-system interaction
✓ Multi-module project
✓ 2,840 lines analysed

Weak areas:
✗ Limited unit testing
✗ No concurrency evidence
```

That immediately feels much more serious than a resume portal.

## Then add **Job DNA**

Instead of companies writing only:

> Looking for React developer.

The recruiter provides the role/job description.

AI converts it into a structured requirement graph:

```text
Frontend Intern

React               Required     80%
JavaScript          Required     75%
REST APIs           Required     65%
Git                 Required     60%
Docker              Preferred    40%
Testing             Preferred    50%
```

Now compare the student's **Skill DNA** with the company's **Job DNA**.

```text
             STUDENT        JOB

React           82%          80%     ✅
JavaScript      79%          75%     ✅
REST API        71%          65%     ✅
Git             88%          60%     ✅
Docker          21%          40%     ⚠
Testing         34%          50%     ⚠
```

### Match Score: **84%**

But don't stop there.

Explain **why**.

> Strong match because the candidate has demonstrated React, REST API and Git experience across multiple real projects.

> Main skill gaps: Docker and automated testing.

Now the recruiter doesn't just receive a CV.

They receive **evidence + reasoning**.

---

# The strongest feature: **Skill Gap → Learning Roadmap**

Suppose the student wants:

### Backend Developer at Company X

Current match:

**61%**

Your system calculates:

```text
Missing:
Docker              -32%
Redis               -27%
CI/CD               -21%
Automated testing   -18%
```

Then:

### Your shortest path to eligibility

```text
Week 1
Learn Docker fundamentals

Week 2
Containerize one existing project

Week 3
Add Redis caching

Week 4
Add GitHub Actions CI

Projected Job Match:
61% → 84%
```

Now PS-08 is no longer just:

> placement portal.

It's a **career intelligence system**.

---

# Another feature: **Project-to-Opportunity Matching**

Student doesn't even need to search internships manually.

If their project history shows:

```text
Python
FastAPI
PostgreSQL
Computer Vision
Docker
```

AI automatically finds:

### Best opportunities

```text
AI Backend Intern
Match: 91%

Computer Vision Intern
Match: 88%

Python Developer
Match: 84%

Data Engineering Intern
Match: 72%
```

That directly satisfies the **internship and placement** part of PS-08.

---

# Industry can also work backwards

This is where the **academia-industry collaboration** part gets interesting.

Suppose Infosys-like Company X needs:

```text
100 students
Java
Spring Boot
SQL
Cloud
```

The college dashboard shows:

```text
Final-year students: 620

Industry-ready now:
142

Near-ready:
213

Major skill gaps:
Spring Boot          49%
Cloud                44%
Testing              38%
System Design        34%
```

Now the university knows:

> “Companies are asking for Spring Boot, but only 31% of our students demonstrate it.”

Faculty can modify workshops/curriculum accordingly.

That directly connects:

# **Industry demand → Academic action**

which is exactly what the original challenge wants.

---

# Add **Curriculum Gap Intelligence**

This could be one of your most impressive dashboards.

Example:

### MCA/BCA Curriculum vs Current Industry Demand

| Skill   | Industry demand | Student readiness |    Gap |
| ------- | --------------: | ----------------: | -----: |
| React   |             81% |               72% |     9% |
| Docker  |             67% |               22% | 🔴 45% |
| Cloud   |             71% |               27% | 🔴 44% |
| SQL     |             78% |               74% |  🟢 4% |
| Git     |             86% |               58% | 🟠 28% |
| Testing |             64% |               31% | 🔴 33% |

Then:

> **AI Recommendation**
>
> Introduce a mandatory Docker + CI/CD practical module in Semester 4.

That makes the project much more relevant to **academia-industry collaboration**, rather than just student recruitment.

---

# Add **Opportunity Fairness**

Another strong idea:

Many internships depend too much on:

* college brand
* CGPA
* polished resume
* connections

Your system can offer:

### **Blind Skill Matching**

Recruiters initially see:

```text
Candidate #A8217

Backend Score: 88
Project Evidence: Strong
Testing: 74
Database: 91
Git: 83

Overall Match: 89%
```

No:

* name
* gender
* photo
* college prestige

until shortlisting.

That's a genuinely meaningful feature.

---

# Add an AI **Interview Readiness Simulator**

Student selects:

> Backend Developer Internship

Your system already knows their verified skills.

So AI doesn't give generic questions.

It asks based on their own projects.

For example:

> “You used SQLite WAL mode in your inventory system. Why did you choose WAL, and what concurrency problem does it solve?”

That's far better than:

> “What is DBMS?”

After the interview:

```text
Technical Knowledge       82
Project Understanding     91
Communication             73
Problem Solving           78

Weakness:
Database transactions

Recommended revision:
ACID + transaction isolation
```

---

# The full product becomes

```text
                    PROOFSKILL

                     ┌───────┐
                     │Student│
                     └───┬───┘
                         │
           Projects / GitHub / Resume
                         ↓
                  AI Skill Engine
                         ↓
                    Skill Graph
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
      Job Matching             Gap Analysis
             ↓                       ↓
       Internships              Learning Plan
             │
             └───────────┬───────────┘
                         ↓
                     Placement

------------------------------------------------

COMPANY
   ↓
Job Description
   ↓
AI Requirement Extraction
   ↓
Candidate Ranking
   ↓
Evidence-backed shortlist

------------------------------------------------

COLLEGE
   ↓
Aggregated Student Skills
   ↓
Industry Demand Analysis
   ↓
Curriculum Gap Detection
```

Now you genuinely satisfy **all three parts**:

### Skill mapping ✅

### Internships ✅

### Placement ✅

plus the forgotten fourth part:

### Academia-industry collaboration ✅

---

# Your project name options

I like:

### **ProofSkill**

**Skills proven, not claimed.**

Other good options:

**SkillBridge AI**
**SkillGraph**
**TalentMesh**
**SkillSync**
**ProofHire**
**CareerDNA**
**SkillForge**

My preference:

# **ProofSkill**

because your USP becomes obvious immediately.

---

# Your one-line pitch

Use this:

> **“ProofSkill transforms placement from resume-based guessing into evidence-based talent matching by understanding what students have actually built, what industries actually need, and exactly what skills bridge the gap between the two.”**

That is much stronger than:

> “We created an AI-powered placement portal.”

---

# Your opening demo can be excellent

Tell the judge:

> “I have written React on my resume. But how does a company know whether I really know React?”

Upload/connect a GitHub profile.

Your system processes it.

Then:

```text
React Skill

Claimed: Advanced

Verified Evidence Score: 43%

Reason:
• Only one React repository
• Mostly template-generated code
• No state management evidence
• No API integration
• No testing
```

😅

Then another student:

```text
React claimed: Intermediate

Verified Score: 89%

Evidence:
• 6 projects
• API integration
• Zustand
• Authentication
• Testing
• Production deployment
```

And then say:

> **“The second candidate wrote ‘Intermediate’. The first wrote ‘Advanced’. Resumes cannot tell the difference. ProofSkill can.”**

That's your killer demonstration.

---

## And there is actually one advantage to accidentally selecting PS-08

It's **much easier to produce a polished, complete prototype** than many of the medical, agricultural, aerospace, IoT or autonomous-driving statements.

You don't need sensors, medical datasets or custom hardware.

Your four-person team can focus entirely on:

**AI + UI + database + integrations + analytics.**

Given that you're building with Antigravity and your team has mixed experience levels, that is actually a very workable final-round problem.

So I wouldn't try to fight the submission anymore.

I would turn **PS-08 into one of the most technically ambitious EdTech solutions in the room**.

**Build ProofSkill, not a placement portal.**

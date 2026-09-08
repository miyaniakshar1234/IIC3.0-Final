# Brainstorming — from a portal to a useful collaboration system

## 1. Reframe the problem

The statement names three activities: skill mapping, internships and placement. A literal implementation would have student profiles, job posts, filters and an application button. Those functions are necessary, but they do not explain why a student should be trusted, how a student becomes ready, or what a college should change after observing hiring outcomes.

The deeper question is: how can a college, a student and an employer agree on what a student can do, using understandable evidence, and then turn that agreement into an opportunity? Our working hypothesis is that disconnected evidence and slow feedback matter as much as opportunity discovery. This hypothesis requires interviews; it is not established by the problem statement alone.

## 2. Stakeholder problems and incentives

Students may know course names but struggle to explain workplace ability. A first project may be valuable yet poorly presented. An application rejection often gives no useful next action. Students need small achievable steps, visible expectations and a chance to show improvement without paying for access.

Recruiters need to narrow a large pool without treating every keyword as equally credible. Smaller employers may not have assessment designers or campus relationships. They need reusable challenge templates, a manageable review queue and concise evidence summaries. The platform fails if reviewing takes longer than their current process.

Faculty need a practical connection between learning outcomes and industry requests. A department cannot redesign a course every time a company lists a fashionable tool. Faculty need aggregated, contextual signals, examples of weak performance and room to decide which gaps deserve intervention.

Placement teams need an accurate pipeline, clear eligibility rules and reliable outcome reporting. Their incentive is an organized process and better student support, not another dashboard that duplicates spreadsheets. Company and student approvals must be lightweight enough to maintain.

## 3. Jobs to be done

When I see an internship I want, show me what I can demonstrate, what is missing and the smallest useful action I can take. When I screen applicants, let me inspect comparable evidence and the reasoning behind a match. When I plan a workshop, show me whether a gap appears across a meaningful group rather than in one isolated rejection. When I collaborate with a college, help me describe a concrete task and receive usable student work without a lengthy partnership setup.

## 4. Root-cause hypotheses

H1: Skill labels are inconsistent. “Database,” “SQL” and “PostgreSQL” can mean different levels of ability. Test with five real role descriptions and two faculty members; record disagreements before designing the taxonomy.

H2: Self-reported skills do not give enough evidence for shortlisting. Ask recruiters to compare a normal profile and a profile with reviewed artifacts, measuring time and the reasons for their decision.

H3: Students act more often when a gap has one specific task attached. Compare “improve SQL” with a two-hour data task and a published rubric.

H4: Colleges will use aggregated gaps to plan training if the sample and underlying opportunities are visible. Test whether a placement officer can choose one intervention from a prototype report.

H5: A short challenge is acceptable only when it is bounded, relevant and not disguised unpaid production work. Ask students and employers separately about time, ownership and expected feedback.

## 5. Existing landscape and honest positioning

Handshake offers early-career opportunities and employer connections. Forage offers work-like job simulations. AICTE operates an internship portal in India. These public descriptions establish that opportunity discovery and simulation-based learning already exist; they do not prove any competitor lacks our proposed features. [S1–S3]

Our positioning hypothesis is a local academia–industry workflow connecting role requirements, reviewed work, explainable gaps and faculty action. We should demonstrate that connection and its usefulness instead of claiming a new category or “the first AI placement platform.” A later competitor study should inspect actual workflows and customer interviews, not only landing pages.

## 6. Concept alternatives

Scores below are team design judgments on a 1–5 scale, not research findings. Higher is better; build feasibility means easier to implement reliably.

| Concept | User value | Distinction | Build feasibility | Demo clarity |
|---|---|---|---|---|
| AI resume matcher | 3 | 2 | 4 | 3 |
| Student social network | 2 | 2 | 2 | 2 |
| Immersive virtual campus hiring fair | 2 | 3 | 1 | 4 |
| Industry challenge marketplace | 4 | 4 | 3 | 4 |
| Evidence-to-opportunity collaboration loop | 5 | 4 | 4 | 5 |
| University-wide curriculum intelligence | 4 | 4 | 2 | 3 |

Select the evidence-to-opportunity loop. Incorporate a narrow challenge marketplace and a basic cohort-gap view. Defer a general social network, immersive environment and university-wide forecasting.

## 7. Signature features

### Evidence Passport — P0

A student profile lists skills with supporting artifacts, reviewer identity, rubric, review date and evidence status. Self-declared skills remain visible with a different label. A recruiter can answer “what did the student actually do?” in one click. Avoid treating a uploaded certificate, GitHub link or AI-generated summary as verification by itself.

### Gap-to-Challenge — P0

An opportunity shows coverage by required skill. Each unmet skill links to an available challenge or an honest “no matching challenge yet” state. Finishing a challenge alone does not increase a score; a published human review does. This creates a meaningful reason to return.

### Review-to-Match — P0

After a reviewer publishes an assessment, the role match updates using a versioned rule. The UI identifies which skill changed and lets the student inspect the evidence. The score supports exploration; a recruiter retains the hiring decision.

### Faculty Gap Lens — P0 basic, P1 interventions

The college sees which role requirements are not yet supported by evidence across participating students. Show denominator, date window and employer sample. A later intervention record links a workshop or assignment to a gap and compares reviewed evidence before and after. A small demo cohort is labeled synthetic and cannot justify claims about a real university.

### Blind First Look — P1

An optional applicant view initially minimizes name, photograph and college branding while retaining task evidence. This can reduce certain cues, but it does not eliminate bias: writing, repositories and artifacts may reveal identity. Evaluate with recruiters before adopting it.

### Industry Problem Studio — P1

An employer describes a task in ordinary language; a template suggests deliverables, expected effort and a rubric. Faculty can propose a curriculum-aligned version. Publishing always requires a human check for feasibility, confidential data and unfair unpaid work.

### Opportunity Simulator — P1

Students can explore “if I demonstrate SQL at level 3, which gaps shrink?” Simulated scores are visibly hypothetical and never saved as actual attainment. Do not imply a predicted chance of selection.

### Team Skill Coverage — P2

Suggest teams with complementary skills for longer industry projects, respecting availability and student consent. It requires contribution attribution and dispute handling, so it is unsuitable for the initial build.

## 8. The memorable demo moment

A student has 61% reviewed coverage for a sample internship. The gap view explains that SQL is not yet demonstrated. The student submits a scoped SQL task; a reviewer awards level 3. Coverage rises to 96%, with the same formula shown before and after. The recruiter opens the actual review and shortlists the student. The college sees one fewer participant with an SQL gap in the selected cohort. This is a synthetic illustration, not proof that 96% coverage produces a job.

## 9. What would make it boring

A giant dashboard of invented numbers, a chatbot as the main experience, certificates issued without assessment, a mysterious “employability score,” dozens of empty menu items, and animations covering an incomplete workflow. Prevent this by spending effort on evidence inspection, credible state changes, useful feedback and consistent permissions.

## 10. Open innovation in practice

Let employers and faculty co-create challenge templates. Allow departments to contribute skill aliases and rubric improvements through a moderated process. Export a student's own evidence records in a portable format. Publish non-sensitive template examples after permission. Open collaboration does not require exposing student records or proprietary company data.

## 11. Boundary cases worth designing early

A beginner with no evidence should receive an achievable first challenge, not a low-worth label. A student who uses AI should disclose their contribution and explain decisions; permit AI where the challenge rules allow it. A failed assessment should include feedback and an appeal path. A company requesting a complete production feature for free should fail moderation. A student without GitHub should be able to provide a document or text explanation. A faculty member reviewing their own preferred students should declare conflicts and be subject to moderation.

## 12. Validation sequence

First, conduct five student, three employer and two faculty/placement interviews. Then test paper or clickable screens with one task per role. Next, run a manually coordinated challenge with a small consenting group. Only then evaluate whether automated matching and dashboards save effort. Suggested stop conditions: recruiters cannot agree on the rubric, review effort exceeds their willingness, or students see no improvement in actionable feedback. In those cases simplify the workflow before adding AI.

## 13. Naming and narrative

ProofBridge is a working name, not a checked trademark or registered domain. Tagline: “Show your skills. Find your next opportunity.” Technical pitch: “An evidence-based collaboration portal linking student work, industry requirements and college action.” The judge should remember the evidence loop, not a complicated acronym.

# Demo, pitch and judging preparation

## 1. Five-minute demo story

0:00–0:35 — State the problem: skills, evidence and hiring decisions are disconnected. Introduce the fictional student Meera and a sample analyst internship. Say that all displayed records are synthetic.

0:35–1:15 — Open the role. Show 61% reviewed coverage, explain the missing SQL evidence and point out that coverage is not a job probability. Open the associated challenge and visible rubric.

1:15–2:00 — Show the student's draft work and contribution statement. Finalize the submission. Use prepared synthetic work so the presentation does not spend two minutes typing. Explain that preparing the artifact in advance does not bypass final submission or review.

2:00–2:50 — Sign in as the assigned reviewer in a separate browser profile. Inspect the work, choose SQL level 3 and publish a rationale. Return to the student view and show 96% with the changed contribution.

2:50–3:40 — Apply with selected evidence. Open the recruiter view, inspect the frozen evidence snapshot and shortlist the student. Explain that the human makes the hiring decision.

3:40–4:25 — Open the college report. Show the sample size and SQL gap count before/after. Explain how a coordinator could use the report to plan a workshop; intervention creation is P1 if not implemented.

4:25–5:00 — Close with what works, what is simulated and the pilot you want to run. Do not rush through an unimplemented feature list. If time permits, show a seeded later-stage outcome labeled simulated rather than pretending the live shortlist produced an internship instantly.

## 2. Synthetic fixture specification

Institution A: Demo College of Computing; Institution B: Sample Institute of Technology. Employer A: Sample Analytics Studio; Employer B: Example Web Lab. These are fictional display names with no partnership implication. Avoid real logos or addresses.

Student Meera has reviewed spreadsheet level 3, communication level 3 and analytical reasoning level 3. The sample internship requires SQL level 3 weight 35, spreadsheets level 3 weight 25, communication level 4 weight 16 and reasoning level 3 weight 24. Seed these reviews through the same controlled domain process or a clearly isolated trusted fixture script; never make a production privilege shortcut.

Create at least six synthetic students in Institution A so the demo can show meaningful counts, while still labeling data as synthetic. Include one new student with no evidence, one changes-requested submission and one closed opportunity. Employer B exists to demonstrate isolation. A separate assignment belongs to an unassigned reviewer for a denial test.

## 3. Demo challenge

Title: “Explain monthly sales from a messy dataset.” Estimated effort: two hours outside the presentation. Provide a small synthetic orders/customers dataset with nulls and duplicate-like rows. Deliverables: three SQL queries, a short result explanation and a validation note. Published rubric assesses joins, aggregation, null handling and validation under one SQL skill criterion with anchored levels. AI use is allowed with disclosure, and the reviewer may ask for an explanation of a query decision.

This is a proposed fixture, not an attached completed dataset or student solution. The build team should create the dataset and expected results during implementation and verify them before demonstrating the rubric. Do not use confidential employer data.

## 4. Suggested slide structure

Slide 1: name, problem statement and one sentence of value. Slide 2: the disconnected current workflow, framed as a hypothesis supported by initial interviews if conducted. Slide 3: the connected evidence workflow. Slide 4: the student's before/after evidence example. Slide 5: live demo or concise screenshots. Slide 6: architecture and human/AI boundary. Slide 7: pilot plan and measurable outcomes. Slide 8: limitations, next steps and team contribution.

This document is a slide outline, not a generated presentation file. Follow the actual event's template and time limit once confirmed.

## 5. Likely judge questions

“How is this different from an internship portal?” — The proposed distinction is the connected workflow: explicit requirements, reviewed task evidence, explainable gaps and college feedback. Existing products overlap with individual features; we are testing whether this integration improves decisions for our pilot users.

“Why use AI?” — The core works without AI. Optional AI helps employers draft a task or rubric, but humans approve requirements and assess work. We chose that boundary to keep the system understandable and reliable.

“Can students submit AI-generated work?” — Challenge rules state what assistance is permitted. Contribution statements and reviewer follow-up assess understanding. We do not claim reliable AI-content detection.

“Who validates skills?” — A named assigned reviewer assesses specific evidence against a rubric. It is a contextual review, not a universal certification. Calibration and correction handling are pilot requirements.

“How does the score work?” — Show the weights and ratio formula. Missing SQL accounts for 35 points in our synthetic example. The score is role-specific reviewed coverage, not a prediction of placement.

“What is actually built?” — List only features working in the current commit. Explicitly distinguish synthetic data, prepared artifacts, optional modules and future roadmap items.

“How will you get employers?” — Start with a department's existing relationships and a few bounded challenge templates, then measure review effort and repeat participation. No partnership is claimed until confirmed.

“Why will colleges use this?” — The hypothesis is clearer gap visibility and reduced coordination work. Test with a small pilot and compare against the existing spreadsheet process rather than assuming adoption.

## 6. Contingency checklist

Have a short local recording of the actual working flow, local screenshots, demo account credentials stored safely and a documented reset script restricted to the synthetic environment. Open role sessions in separate browser profiles. Disable optional AI dependencies during the primary demonstration. If the network fails, say that you are showing a recorded run. Do not present a recording as a live transaction.

## 7. Claims checklist

Never claim real placements from simulated outcomes, real partners from fictional companies, unbiased hiring from a hidden-name view or verified authorship from a hash. No invented market-size, accuracy or success-rate number belongs on the slides. The most defensible claim is the observable one: the prototype links a published requirement, submitted work, human review and an explainable application decision.

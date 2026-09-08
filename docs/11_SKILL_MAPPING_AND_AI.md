# Skill mapping, evidence and AI rules

## 1. Separate four concepts

A declared skill is a student's claim. A reviewed attainment is a level attributed to specific submitted work. Role coverage compares reviewed attainments with explicit requirements. Eligibility checks disclosed constraints such as audience and deadline. None of these is a global measure of a person's potential, hiring probability or guaranteed performance.

## 2. Canonical skills

Start with a curated catalog of 20–30 skills relevant to the pilot: SQL, spreadsheets, data cleaning, analytical reasoning, written communication, Git, HTML/CSS, JavaScript, API integration, testing, documentation and a few domain-specific skills. Each has an ID, category, human-readable definition and aliases. Map aliases only when equivalent. Java and JavaScript are not interchangeable; “communication” and “English fluency” must not be conflated.

Role requirements are human-approved skill IDs with level and weight. AI may suggest mapping in P1 but uncertain mappings require confirmation. New skills enter a moderation queue rather than creating duplicates automatically.

## 3. Proficiency anchors

Level 0: the submitted work does not demonstrate the criterion. Level 1: completes a basic task with substantial guidance. Level 2: completes a routine task with some support and can explain the main steps. Level 3: completes a representative task independently and explains trade-offs. Level 4: handles edge cases, validates results and justifies alternatives. These are proposed project anchors, not an accredited proficiency standard.

Each challenge supplies skill-specific anchors. For SQL, level 1 might retrieve/filter one table; level 2 correctly joins and aggregates routine data; level 3 handles duplicates, nulls and validation; level 4 compares alternative queries and explains performance/data quality trade-offs. The reviewer assesses only what the task can support. A trivial task should not offer an unjustified level-4 path.

## 4. Evidence selection rule

For each required skill, select the highest level among active published, non-voided attainments in the allowed evidence set. If tied, choose the most recent reviewed_at, then lexicographically smallest attainment ID for deterministic ordering. Evidence is active when its review is published and not voided, and valid_until is null or in the future. P0 uses null valid_until; future expiry must be explicitly communicated.

Live student coverage may use all their evidence. Application coverage uses only selected shared revisions. An absence of attainment yields reviewed_level=null and contribution zero. A reviewed level 0 is stored as 0 and displays “Not demonstrated in this submission.” Do not average self-declarations into reviewed coverage.

## 5. Formula — coverage-v1

For skill i: contribution_i = weight_i × min(reviewed_level_i / required_level_i, 1). Treat missing evidence as zero for calculation only. Reviewed coverage is the sum of contributions; weights are positive integers totaling 100. Clamp no result silently: invalid inputs must fail validation. Calculate at full precision and round the final displayed percentage to the nearest whole number, with .5 rounded upward. API contributions may retain two decimal places, but the total uses unrounded values.

Evidence beyond the required level cannot compensate for an unrelated missing skill because each skill contribution is capped at its weight. Do not call this “AI matching”; it is a transparent weighted rule. It can be replaced only through a versioned decision and regression checks.

## 6. Worked demo example

| Skill | Required | Reviewed before | Weight | Before contribution | After contribution |
|---|---|---|---|---|---|
| SQL | 3 | None → 3 after review | 35 | 0 | 35 |
| Spreadsheets | 3 | 3 | 25 | 25 | 25 |
| Communication | 4 | 3 | 16 | 12 | 12 |
| Analytical reasoning | 3 | 3 | 24 | 24 | 24 |
| Total | — | — | 100 | 61 | 96 |

All figures are synthetic. The remaining four points reflect communication level 3 against required level 4. This makes the result understandable and avoids a staged jump to a perfect score. A new SQL submission changes nothing before a review is published.

## 7. Recommendations and cohort gaps

Sort suggested challenges by the weight of the unmet skill they cover, then shorter estimated effort, then stable ID. Only include published challenges within audience and deadline. If no challenge is available, show the missing skill and allow the student to continue applying. Do not silently require an unpaid task for every application.

For a college report, consider the selected role sample. For each skill, take the highest required level across those roles and count participating students below it. Divide by the cohort count, including missing evidence but report missing separately. This is an evidence-gap indicator for that sample, not a claim about labor-market demand or academic quality. Suppress small real cohorts.

## 8. AI features — optional P1

Useful AI tasks: turn an employer's rough brief into a proposed rubric; suggest canonical skill mappings; draft a plain-language explanation from an already computed score; suggest feedback wording from a reviewer's entered notes. Each output is editable, labeled a draft and subject to human confirmation.

Forbidden product responsibilities: granting reviewed skills, final grading without a human, auto-rejecting candidates, claiming plagiarism certainty, predicting personality or inferring protected traits. Do not use facial analysis, emotion detection or webcam monitoring as proof of competence. Do not invent courses, sources, partnerships or job opportunities.

## 9. AI interface contract

The adapter accepts task_type, redacted input, allowed_skill_ids, prompt_version and a bounded output schema. Requirement draft output contains suggested skills, rationale and unresolved_terms; it cannot publish. Reject unknown skill IDs, unsupported levels and malformed JSON. Keep temperature and model selection explicit but do not assume the provider supports a particular option until implemented against its current documentation.

Treat job descriptions and submitted work as untrusted content. They may contain instructions to ignore policy or disclose secrets; the model must not receive tools or credentials that would make those instructions effective. Limit text size and output tokens, apply timeouts and allow one bounded retry. Fall back to the original editable form.

## 10. Evaluation

Prepare 20 manually annotated role snippets for skill-mapping experiments and record agreement with two human reviewers. Measure incorrect additions and missed skills separately. For feedback drafts, ask reviewers whether the text accurately reflects their scores and whether editing takes less time. For matching, test determinism, evidence revocation, missing data and the worked example. No accuracy or fairness claim is justified before this evaluation.

## 11. Review integrity

Require contribution statements and permit brief follow-up explanations for uncertain work. P1 can record a short reviewer discussion outcome, with consent. A hash or similarity signal can flag duplicate artifacts for review but cannot prove authorship or misconduct. Students receive reasons and a correction path. Calibrate reviewers using shared samples and compare disagreement before scaling.

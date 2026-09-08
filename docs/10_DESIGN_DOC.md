# Product design system

## 1. Direction

Design a calm workspace centered on student work. Use strong typography, generous grouping and visible evidence references. The product should feel capable and inviting to beginners. Avoid a science-fiction dashboard, endless glowing cards, gamified employability rankings or company logos implying partnerships. The primary visual motif is the connection between a requirement, a piece of evidence and a next step.

## 2. Design tokens

| Token | Value | Use |
|---|---|---|
| canvas | #F7F8FA | Main background |
| surface | #FFFFFF | Cards/forms |
| text-primary | #17212F | Main text |
| text-secondary | #526071 | Supporting copy |
| accent | #185ADB | Primary action |
| accent-soft | #EDF3FF | Selected region |
| success | #166534 | Reviewed success text |
| warning | #854D0E | Pending/attention text |
| danger | #B91C1C | Error/destructive action |
| border | #D9DFE7 | Boundaries |
| radius | 8 / 12 / 16 px | Controls/cards/drawers |
| spacing | 4 / 8 / 12 / 16 / 24 / 32 / 48 px | Layout rhythm |

Font: locally available Inter or system sans-serif fallback; body 16 px with 24 px line height, supporting text 14/20, page heading 28/36, section heading 20/28, labels 14/20 medium. Use a mono font only for identifiers or code evidence. Verify contrast in implementation, including disabled, focus and selected states; tokens alone do not certify accessibility.

## 3. Layout rules

Desktop navigation width 232 px, main content maximum 1200 px, main gutters 24–32 px. Reading panels limit long prose to around 70–85 characters per line. Cards group meaningful units rather than every individual statistic. Forms use a clear label, help text where needed and field-specific errors. Primary actions appear once per task area.

The student dashboard prioritizes the next step, then active work and history. The employer dashboard prioritizes open opportunities and pending applicant decisions. The reviewer workspace prioritizes the task and rubric. The institution workspace prioritizes denominators, filters and actionable gaps.

## 4. Evidence visual language

Use textual status chips: Self-declared, Awaiting review, Reviewed, Changes requested, Under dispute and Voided. Pair color with a label and, where useful, an icon. A reviewed skill includes reviewer and date. A score includes “Reviewed coverage for this role” and never “Your value” or “Success probability.”

Show coverage as a horizontal bar plus a numeric value and per-skill table. Missing evidence uses neutral styling; it is an invitation to demonstrate ability, not a red failure state. Disputed evidence remains readable with context until a moderation decision. Voided evidence is excluded from current coverage and clearly marked in history.

## 5. Signature interaction

After review publication, the student sees a brief confirmation: “SQL evidence reviewed at level 3.” The related opportunity panel then shows “Reviewed coverage: 61% → 96%” for the synthetic example, with “View calculation.” Use a subtle 150–200 ms update animation and respect reduced motion. Do not run confetti or imply a job has been secured.

## 6. Copy standards

Use “Not yet demonstrated” when no active evidence exists. Use “This review assesses the submitted work” near review details. Use “Your application shares these evidence items with [employer]” at confirmation. Use “We could not confirm the save. Check status before trying again” after an ambiguous timeout. Use “Sample data” prominently throughout the synthetic demo.

Empty state: “You haven't submitted evidence yet. Start with a short challenge.” Closed role: “Applications closed on [date and zone]. You can still view the requirements.” AI fallback, P1: “Draft unavailable. Continue editing manually.” Avoid shaming language such as “unemployable” or “weak student.”

## 7. Accessibility and interaction contract

Target WCAG 2.2 AA. All actions work by keyboard; focus is visible; dialogs trap and restore focus correctly; errors are announced and linked to fields; tables have headers; status updates are announced without stealing focus. Use sufficiently large touch targets, preferably at least 44 px for primary controls. Support text enlargement, 200% zoom and reduced motion. No essential information is available only through hover, color or animation. [S8]

## 8. Screen review checklist

Test long names, multiple memberships, no opportunities, zero reviewed skills, a fully completed rubric, partial review, expired deadline, API failure and permission denial. Review 360, 768 and 1280 px layouts. Ensure evidence text cannot break containment and links wrap. Avoid fixed-height feedback boxes that clip content. Check that a coordinator report cannot visually imply an entire university sample when it contains a small pilot group.

## 9. Brand assets and future work

ProofBridge is a temporary name. Use a simple text wordmark for the prototype; no generated mascot or ornamental illustration is required. Public branding, trademark/domain checks and a marketing site are later work. The design specification describes the intended application; it does not claim that a Figma file or clickable site has been created.

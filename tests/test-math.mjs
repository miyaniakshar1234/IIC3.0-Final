import { calculateCoverage } from '../src/lib/matching.ts';
import assert from 'node:assert/strict';

const skills = [
  { skillId: 'sql', skillName: 'SQL', requiredLevel: 3, weight: 35 },
  { skillId: 'sheets', skillName: 'Spreadsheets', requiredLevel: 3, weight: 25 },
  { skillId: 'comm', skillName: 'Communication', requiredLevel: 4, weight: 16 },
  { skillId: 'reasoning', skillName: 'Analytical Reasoning', requiredLevel: 3, weight: 24 }
];

// Baseline Meera (No SQL)
const attainmentsBefore = [
  { skillId: 'sheets', level: 3, reviewedAt: '2026-09-01T10:00:00.000Z' },
  { skillId: 'comm', level: 3, reviewedAt: '2026-09-01T10:00:00.000Z' },
  { skillId: 'reasoning', level: 3, reviewedAt: '2026-09-01T10:00:00.000Z' }
];

const resultBefore = calculateCoverage('opp-1', 1, skills, attainmentsBefore);
console.log('BEFORE SQL REVIEW:');
console.log('Reviewed Coverage:', resultBefore.reviewedCoverage);
console.log('Unrounded Total:', resultBefore.unroundedCoverage);

// After Reviewer publishes SQL Level 3
const attainmentsAfter = [
  ...attainmentsBefore,
  { skillId: 'sql', level: 3, reviewedAt: '2026-09-08T10:00:00.000Z' }
];

const resultAfter = calculateCoverage('opp-1', 1, skills, attainmentsAfter);
console.log('\nAFTER SQL LEVEL 3 REVIEW:');
console.log('Reviewed Coverage:', resultAfter.reviewedCoverage);
console.log('Unrounded Total:', resultAfter.unroundedCoverage);

assert.equal(resultBefore.reviewedCoverage, 61);
assert.equal(resultAfter.reviewedCoverage, 96);
assert.equal(resultAfter.skills.find((skill) => skill.skillId === 'sql')?.contribution, 35);

const tieResult = calculateCoverage('opp-1', 1, skills, [
  ...attainmentsBefore,
  { skillId: 'sql', level: 3, reviewedAt: '2026-09-08T10:00:00.000Z', revisionId: 'revision-z' },
  { skillId: 'sql', level: 3, reviewedAt: '2026-09-08T11:00:00.000Z', revisionId: 'revision-b' },
  { skillId: 'sql', level: 3, reviewedAt: '2026-09-08T11:00:00.000Z', revisionId: 'revision-a' },
]);
assert.equal(tieResult.skills.find((skill) => skill.skillId === 'sql')?.revisionId, 'revision-a');

assert.throws(
  () => calculateCoverage('opp-1', 1, [...skills, skills[0]], attainmentsBefore),
  /duplicate required skill/
);
assert.throws(
  () => calculateCoverage('opp-1', 1, [{ ...skills[0], requiredLevel: 5, weight: 100 }], []),
  /required level/
);
assert.throws(
  () => calculateCoverage('opp-1', 1, [{ ...skills[0], weight: 100 }], [{ skillId: 'sql', level: 7, reviewedAt: '2026-09-08T10:00:00.000Z' }]),
  /Invalid attainment/
);

console.log('\n>>> SUCCESS: coverage-v1 golden example and input invariants passed. <<<');

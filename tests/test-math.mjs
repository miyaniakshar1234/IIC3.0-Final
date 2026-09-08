import { calculateCoverage } from '../src/lib/matching.ts';

const skills = [
  { skillId: 'sql', skillName: 'SQL', requiredLevel: 3, weight: 35 },
  { skillId: 'sheets', skillName: 'Spreadsheets', requiredLevel: 3, weight: 25 },
  { skillId: 'comm', skillName: 'Communication', requiredLevel: 4, weight: 16 },
  { skillId: 'reasoning', skillName: 'Analytical Reasoning', requiredLevel: 3, weight: 24 }
];

// Baseline Meera (No SQL)
const attainmentsBefore = [
  { skillId: 'sheets', level: 3, reviewedAt: new Date().toISOString() },
  { skillId: 'comm', level: 3, reviewedAt: new Date().toISOString() },
  { skillId: 'reasoning', level: 3, reviewedAt: new Date().toISOString() }
];

const resultBefore = calculateCoverage('opp-1', 1, skills, attainmentsBefore);
console.log('BEFORE SQL REVIEW:');
console.log('Reviewed Coverage:', resultBefore.reviewedCoverage);
console.log('Unrounded Total:', resultBefore.unroundedCoverage);

// After Reviewer publishes SQL Level 3
const attainmentsAfter = [
  ...attainmentsBefore,
  { skillId: 'sql', level: 3, reviewedAt: new Date().toISOString() }
];

const resultAfter = calculateCoverage('opp-1', 1, skills, attainmentsAfter);
console.log('\nAFTER SQL LEVEL 3 REVIEW:');
console.log('Reviewed Coverage:', resultAfter.reviewedCoverage);
console.log('Unrounded Total:', resultAfter.unroundedCoverage);

if (resultBefore.reviewedCoverage === 61 && resultAfter.reviewedCoverage === 96) {
  console.log('\n>>> SUCCESS: Mathematical Invariance 61% -> 96% Verified! <<<');
} else {
  console.error('\n>>> FAILED: Match calculation mismatch! <<<');
  process.exit(1);
}

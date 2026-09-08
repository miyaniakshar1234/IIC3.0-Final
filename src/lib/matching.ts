/**
 * ProofBridge — Deterministic Matching Engine
 * Formula Specification: coverage-v1 (docs/11_SKILL_MAPPING_AND_AI.md)
 * 
 * Invariants:
 * 1. Deterministic & Explainable: No LLM / probabilistic ranking.
 * 2. Capped Contribution: Skills exceeding requirement cannot compensate for unmet skills.
 * 3. Exact Rounding: Weights sum to 100; total rounds to nearest whole number (.5 upwards).
 */

export interface RequiredSkill {
  skillId: string;
  skillName: string;
  requiredLevel: number; // 1 to 4
  weight: number;        // 1 to 100
}

export interface StudentAttainment {
  attainmentId?: string;
  skillId: string;
  level: number;         // 0 to 4
  reviewedAt: string;
  revisionId?: string;
}

export interface SkillCoverageBreakdown {
  skillId: string;
  skillName: string;
  requiredLevel: number;
  reviewedLevel: number | null;
  weight: number;
  contribution: number;
  status: 'demonstrated' | 'partially_demonstrated' | 'not_yet_demonstrated';
  revisionId?: string;
}

export interface MatchResult {
  opportunityId: string;
  opportunityVersion: number;
  scoringVersion: 'coverage-v1';
  calculatedAt: string;
  reviewedCoverage: number; // Integer 0 - 100
  unroundedCoverage: number;
  skills: SkillCoverageBreakdown[];
  eligibility: {
    status: 'eligible' | 'ineligible';
    reasons: string[];
  };
}

/**
 * Calculates role-specific reviewed coverage using coverage-v1 formula.
 */
export function calculateCoverage(
  opportunityId: string,
  opportunityVersion: number,
  requiredSkills: RequiredSkill[],
  studentAttainments: StudentAttainment[]
): MatchResult {
  if (requiredSkills.length === 0) {
    throw new Error('Invalid opportunity: at least one required skill is required');
  }

  const seenSkillIds = new Set<string>();
  for (const skill of requiredSkills) {
    if (seenSkillIds.has(skill.skillId)) {
      throw new Error(`Invalid opportunity: duplicate required skill ${skill.skillId}`);
    }
    seenSkillIds.add(skill.skillId);

    if (!Number.isInteger(skill.requiredLevel) || skill.requiredLevel < 1 || skill.requiredLevel > 4) {
      throw new Error(`Invalid opportunity: required level for ${skill.skillId} must be an integer from 1 to 4`);
    }
    if (!Number.isInteger(skill.weight) || skill.weight <= 0 || skill.weight > 100) {
      throw new Error(`Invalid opportunity: weight for ${skill.skillId} must be an integer from 1 to 100`);
    }
  }

  for (const attainment of studentAttainments) {
    if (!Number.isInteger(attainment.level) || attainment.level < 0 || attainment.level > 4) {
      throw new Error(`Invalid attainment: level for ${attainment.skillId} must be an integer from 0 to 4`);
    }
    if (!Number.isFinite(Date.parse(attainment.reviewedAt))) {
      throw new Error(`Invalid attainment: reviewedAt for ${attainment.skillId} must be an ISO date`);
    }
  }

  // Validate weights
  const totalWeight = requiredSkills.reduce((sum, s) => sum + s.weight, 0);
  if (totalWeight !== 100) {
    throw new Error(`Invalid opportunity: skill weights must sum to 100, got ${totalWeight}`);
  }

  // Select the highest level, then newest review, then the smallest stable ID.
  const attainmentMap = new Map<string, StudentAttainment>();
  for (const att of studentAttainments) {
    const existing = attainmentMap.get(att.skillId);
    const attTime = Date.parse(att.reviewedAt);
    const existingTime = existing ? Date.parse(existing.reviewedAt) : Number.NEGATIVE_INFINITY;
    const attId = att.attainmentId ?? att.revisionId ?? '';
    const existingId = existing?.attainmentId ?? existing?.revisionId ?? '';
    const winsTie =
      existing &&
      att.level === existing.level &&
      (attTime > existingTime || (attTime === existingTime && attId.localeCompare(existingId) < 0));

    if (!existing || att.level > existing.level || winsTie) {
      attainmentMap.set(att.skillId, att);
    }
  }

  let unroundedTotal = 0;
  const breakdown: SkillCoverageBreakdown[] = [];

  for (const req of requiredSkills) {
    const att = attainmentMap.get(req.skillId);
    const reviewedLevel = att ? att.level : null;

    let contribution = 0;
    let status: SkillCoverageBreakdown['status'] = 'not_yet_demonstrated';

    if (reviewedLevel !== null && reviewedLevel > 0) {
      // contribution_i = weight_i * min(reviewed_level / required_level, 1)
      const ratio = Math.min(reviewedLevel / req.requiredLevel, 1.0);
      contribution = Number((req.weight * ratio).toFixed(2));
      unroundedTotal += req.weight * ratio;

      if (reviewedLevel >= req.requiredLevel) {
        status = 'demonstrated';
      } else {
        status = 'partially_demonstrated';
      }
    }

    breakdown.push({
      skillId: req.skillId,
      skillName: req.skillName,
      requiredLevel: req.requiredLevel,
      reviewedLevel,
      weight: req.weight,
      contribution,
      status,
      revisionId: att?.revisionId,
    });
  }

  // Rounding rule: round half up to nearest integer
  const roundedCoverage = Math.round(unroundedTotal);

  return {
    opportunityId,
    opportunityVersion,
    scoringVersion: 'coverage-v1',
    calculatedAt: new Date().toISOString(),
    reviewedCoverage: Math.min(Math.max(roundedCoverage, 0), 100),
    unroundedCoverage: Number(unroundedTotal.toFixed(2)),
    skills: breakdown,
    eligibility: {
      status: 'eligible',
      reasons: [],
    },
  };
}

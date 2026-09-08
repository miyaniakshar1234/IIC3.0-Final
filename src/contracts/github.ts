export interface AstSignal {
  category: string;
  finding: string;
  passed: boolean;
  codeSnippet?: string;
}

export interface DiscoveredSkill {
  skillId: string;
  skillName: string;
  attainedLevel: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  evidenceRef: string;
  linesAnalyzed: number;
}

export interface GithubEvaluationResult {
  username: string;
  astScore: number;
  status: 'VERIFIED' | 'DISCREPANCY_FLAGGED' | 'PENDING';
  archetype: 'EVIDENCE_BUILDER' | 'RESUME_INFLATOR' | 'CUSTOM_PROFILE';
  title: string;
  claimedLevel: string;
  repositoriesAnalyzed: number;
  totalLinesParsed: number;
  boilerplateRatio: number;
  authoredVelocityRatio: number;
  astSignals: AstSignal[];
  discoveredSkills: DiscoveredSkill[];
  auditDigest: string;
  analyzedAt: string;
  profileData?: {
    avatarUrl?: string;
    publicRepos?: number;
    bio?: string;
    name?: string;
  };
}

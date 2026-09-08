export interface AstSignal {
  category: string;
  finding: string;
  passed: boolean;
  codeSnippet?: string;
  metric?: string;
}

export interface DiscoveredSkill {
  skillId: string;
  skillName: string;
  attainedLevel: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  evidenceRef: string;
  linesAnalyzed: number;
  astPattern: string;
}

export interface AnalyzedRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  astTokensParsed: number;
  authenticLogicPercent: number;
  tags: string[];
}

export interface CommitVelocityPoint {
  period: string;
  commits: number;
  authenticityScore: number;
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
  repositories: AnalyzedRepo[];
  commitVelocity: CommitVelocityPoint[];
  forensics: {
    cyclomaticComplexity: string;
    idiomaticPatternsCount: number;
    testCoverageEstimated: string;
    antiPatternsDetected: string[];
  };
  auditDigest: string;
  analyzedAt: string;
  profileData: {
    avatarUrl: string;
    name: string;
    bio: string;
    publicRepos: number;
    followers: number;
    location: string;
    profileUrl: string;
  };
  verifiableCredential: {
    id: string;
    type: string[];
    issuer: string;
    issuanceDate: string;
    proofValue: string;
  };
}

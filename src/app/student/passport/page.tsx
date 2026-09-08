'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AppShell } from '@/components/ui/AppShell';
import { StatusChip } from '@/components/student/StatusChip';
import { EvidenceDrawer, EvidenceDetail } from '@/components/student/EvidenceDrawer';
import { ProofChainViewer } from '@/components/ui/ProofChainViewer';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Clock,
  FileText,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Building2,
  ExternalLink,
  Layers,
  Info,
  Zap,
} from 'lucide-react';

export default function EvidencePassportPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'reviewed' | 'gaps' | 'declared'>('all');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveState() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setHasVerifiedSql(Boolean(json.data.has_verified_sql));
          }
        }
      } catch (e) {
        console.warn('Could not load live state for passport:', e);
      }
    }
    loadLiveState();
    const interval = setInterval(loadLiveState, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Student Identity Context
  const student = {
    name: user?.name || 'Meera Patel',
    program: user?.program || 'MCA 2026',
    institution: user?.institutionName || 'Manipal University Jaipur (MUJ)',
    rollNumber: user?.rollNumber || 'MCA-2026-042',
    affiliationStatus: user?.affiliationStatus || 'approved',
    avatarInitial: user?.avatarInitials || 'MP',
  };

  const isMeera = user?.email.includes('meera.patel');

  // Audited Evidence Dataset for Meera Patel (Only show if logged in as Meera for pitch purposes)
  const reviewedAttainments: EvidenceDetail[] = isMeera ? [
    {
      skillName: 'Spreadsheets',
      reviewedLevel: 3,
      requiredLevel: 3,
      reviewerName: 'Dr. Alok Sharma',
      reviewerTitle: 'Associate Professor & Analytics Mentor',
      reviewedDate: 'Sep 06, 2026',
      challengeTitle: 'Clean and Audit Financial Ledger CSV',
      contributionStatement: `I loaded the raw dirty dataset, cleaned 140 null rows using automated logic in Python/Pandas, exported to Excel, and constructed pivot tables summarizing quarterly revenue. I verified total balances using checksum formulas.`,
      externalLinks: [
        'https://github.com/meerasharma/ledger-audit-submission',
        'https://docs.google.com/spreadsheets/d/1demo-ledger-sheet-meera/edit'
      ],
      criteriaResults: [
        {
          criterionTitle: 'Data Cleaning & Error Checking',
          scoreLevel: 3,
          levelDescription: 'Handles duplicates, null values, and validates integrity across columns',
          reviewerRationale: 'Excel formulas used SUMIFS and IFERROR properly. Verified zero unaccounted variance.'
        },
        {
          criterionTitle: 'Pivot Summaries & Visualization',
          scoreLevel: 3,
          levelDescription: 'Constructs multi-dimensional pivot tables with formatted clear outputs',
          reviewerRationale: 'Clean visual hierarchy and accurate breakdown by department.'
        }
      ]
    },
    {
      skillName: 'Written Communication',
      reviewedLevel: 3,
      requiredLevel: 4,
      reviewerName: 'Prof. Ananya Sen',
      reviewerTitle: 'Department Head, Technical Communication',
      reviewedDate: 'Sep 04, 2026',
      challengeTitle: 'Technical Briefing: Database Normalization Tradeoffs',
      contributionStatement: `Drafted a 4-page briefing paper analyzing 3NF vs BCNF normalization for transactional databases versus OLAP analytical warehouses. Included original ER diagrams and query performance trade-off tables.`,
      externalLinks: [
        'https://github.com/meerasharma/database-normalization-essay'
      ],
      criteriaResults: [
        {
          criterionTitle: 'Clarity & Structure',
          scoreLevel: 3,
          levelDescription: 'Presents complex technical ideas clearly with logical sections and trade-off explanations',
          reviewerRationale: 'Logical structure structure throughout. Minor formatting improvements suggested for diagram captions.'
        }
      ]
    },
    {
      skillName: 'Analytical Reasoning',
      reviewedLevel: 3,
      requiredLevel: 3,
      reviewerName: 'Dr. Alok Sharma',
      reviewerTitle: 'Associate Professor & Analytics Mentor',
      reviewedDate: 'Sep 02, 2026',
      challengeTitle: 'Case Study: User Churn Pattern Analysis',
      contributionStatement: `Analyzed churn rates across 5,000 synthetic SaaS user records. Formulated 3 core hypotheses regarding onboarding friction, verified statistical significance using chi-squared tests, and drafted actionable retention recommendations.`,
      externalLinks: [
        'https://github.com/meerasharma/churn-analysis-case'
      ],
      criteriaResults: [
        {
          criterionTitle: 'Hypothesis Formulation & Verification',
          scoreLevel: 3,
          levelDescription: 'Formulates clear testable hypotheses and evaluates empirical evidence independently',
          reviewerRationale: 'Solid logical framing. Hypotheses were backed directly by data distributions.'
        }
      ]
    }
  ] : [];

  const sqlAttainment: EvidenceDetail = {
    skillName: 'SQL (Structured Query Language)',
    reviewedLevel: 3,
    requiredLevel: 3,
    reviewerName: 'Dr. Alok Sharma',
    reviewerTitle: 'Associate Professor & CS Evaluator',
    reviewedDate: 'Sep 08, 2026',
    challengeTitle: 'Explain Monthly Sales from Messy Dataset',
    contributionStatement: `I designed the CTE to eliminate duplicate order records using ROW_NUMBER() over order_id ordered by latest update timestamp. I filtered out null buyer IDs and negative invoice amounts.`,
    externalLinks: [
      'https://github.com/meerasharma/sales-deduplication-query'
    ],
    criteriaResults: [
      {
        criterionTitle: 'SQL Query Correctness, Deduplication & Validation',
        scoreLevel: 3,
        levelDescription: 'Cleanly handles duplicate IDs, NULL values, and multi-table joins; validates intermediate results and explains trade-offs.',
        reviewerRationale: 'Clean deduplication using ROW_NUMBER() window function and proper handling of NULL keys.'
      }
    ]
  };

  const currentAttainments = hasVerifiedSql
    ? [...reviewedAttainments, sqlAttainment]
    : reviewedAttainments;

  // Requirement Gaps for Target Role
  const currentGaps = (hasVerifiedSql || !isMeera)
    ? []
    : [
        {
          skillName: 'SQL (Structured Query Language)',
          requiredLevel: 3,
          reviewedLevel: 0,
          weight: 35,
          status: 'not-demonstrated' as const,
          challengeId: '50000000-0000-0000-0000-000000000001',
          challengeTitle: 'Explain Monthly Sales from Messy Dataset',
          targetRole: 'Junior Data Analyst Intern at Sample Analytics Studio',
          impactNote: 'Addressing this requirement via successful human review could raise reviewed coverage from 61% to 96%.'
        }
      ];

  // Self-Declared Skills (Unverified claims)
  const selfDeclaredSkills = isMeera ? [
    { skillName: 'Python Data Analysis', declaredLevel: 2, declaredDate: 'Aug 28, 2026' },
    { skillName: 'Git & Version Control', declaredLevel: 3, declaredDate: 'Aug 25, 2026' },
    { skillName: 'HTML & CSS', declaredLevel: 2, declaredDate: 'Aug 20, 2026' },
  ] : [];

  const openEvidenceDetail = (evidence: EvidenceDetail) => {
    setSelectedEvidence(evidence);
    setIsDrawerOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
        
        {/* 1. STUDENT IDENTITY BAR & NAVIGATION */}
        <div className="pb-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-border-accent text-accent flex items-center justify-center font-black text-lg">
              {student.avatarInitial}
            </div>
            <div>
              <div className="section-label mb-0.5">Verified Profile</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-bold text-text-primary tracking-tight">{student.name}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info/10 text-info border border-info/30 font-mono">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {student.program}
                </span>
                {student.affiliationStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/30 font-mono" title="Officially verified by University Registrar">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified University Student
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning/10 text-warning border border-warning/30 font-mono" title="Awaiting Registrar confirmation">
                    <Clock className="w-3.5 h-3.5" />
                    Affiliation Pending Approval
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5 font-mono">
                <Building2 className="w-3.5 h-3.5 text-accent" />
                {student.institution} · Roll: {student.rollNumber}
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-surface-raised p-1 rounded-xl border border-border font-mono text-xs">
            <Link
              href="/student"
              className="px-3.5 py-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/student/passport"
              className="px-3.5 py-1.5 rounded-lg font-bold bg-canvas text-text-primary border border-border-bright shadow-sm transition"
            >
              Evidence Passport
            </Link>
            <Link
              href="/student/applications"
              className="px-3.5 py-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition font-medium"
            >
              My Applications
            </Link>
          </nav>
        </div>

        {/* Affiliation Pending Alert */}
        {student.affiliationStatus === 'pending_approval' && (
          <div className="p-4 rounded-2xl bg-warning/10 border border-warning/30 text-warning text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>
                <strong>University Affiliation Pending Verification:</strong> Your registration request has been submitted to the Registrar&apos;s Office at <strong>{student.institution}</strong> (Roll: {student.rollNumber}).
              </span>
            </div>
            <Link
              href="/institution/approvals"
              className="px-3 py-1 rounded-lg bg-warning/20 border border-warning/40 text-warning font-bold text-[11px] hover:bg-warning/30 transition shrink-0 self-start sm:self-center"
            >
              <span>Review in Dean&apos;s Queue →</span>
            </Link>
          </div>
        )}

        {/* 2. PASSPORT CRYPTOGRAPHIC HEADER & STATS BENTO */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-mono font-bold border border-success/30 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  CRYPTOGRAPHIC EVIDENCE PASSPORT
                </span>
                <span className="pb-badge text-[11px] font-mono">
                  ID: #PB-IND-2026-08812
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                {student.name}&apos;s Skill Passport
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                {student.program} • {student.institution}. Every verified badge is grounded in qualified faculty rubric evaluation, direct student code artifacts, and tamper-proof SHA-256 commit hashes.
              </p>
            </div>

            {/* Quick Metrics Cockpit */}
            <div className="flex items-center gap-2 bg-canvas p-3 rounded-2xl border border-border shrink-0 self-start lg:self-center shadow-inner">
              <div className="px-4 py-1 text-center border-r border-border">
                <span className="metric-value text-3xl text-success block leading-tight">{currentAttainments.length}</span>
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Reviewed</span>
              </div>
              <div className="px-4 py-1 text-center border-r border-border">
                <span className="metric-value text-3xl text-warning block leading-tight">{currentGaps.length}</span>
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Gap</span>
              </div>
              <div className="px-4 py-1 text-center">
                <span className="metric-value text-3xl text-info block leading-tight">3</span>
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Declared</span>
              </div>
            </div>
          </div>

          {/* Philosophy Notice */}
          <div className="p-4 bg-canvas rounded-2xl border border-border text-xs text-text-secondary leading-relaxed flex items-start gap-3 relative z-10 font-mono">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              <strong className="text-text-primary">Review Principle:</strong> &quot;Reviewed&quot; indicates that a named faculty evaluator assessed submitted code against anchored rubrics. Self-declared skills receive 0% weight until human verification completes.
            </span>
          </div>

          {/* Public Verification Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 relative z-10 border-t border-border font-mono">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <ShieldCheck className="w-4 h-4 text-success shrink-0" />
              <span>External Auditor Verification Gateway is active for this passport.</span>
            </div>
            <Link
              href="/verify/4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f"
              className="pb-btn-primary text-xs py-2 px-4 flex items-center justify-center gap-2 shrink-0"
            >
              <span>🔗 Open Public Verification Certificate →</span>
            </Link>
          </div>
        </div>

        {/* 2.5 LIVE PROOF CHAIN */}
        <ProofChainViewer
          isVerified={hasVerifiedSql}
          studentName={student.name}
          roleTitle="Junior Data Analyst Intern"
          reviewedLevel={hasVerifiedSql ? 3 : 0}
          weight={35}
          reviewDate={hasVerifiedSql ? 'Just now' : 'Pending'}
        />

        {/* 3. TAB FILTERS */}
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded-xl border border-border w-fit font-mono overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition shrink-0 ${
              activeTab === 'all'
                ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            All Skills ({currentAttainments.length + currentGaps.length + selfDeclaredSkills.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviewed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'reviewed'
                ? 'bg-success/15 text-success border border-success/30 shadow-sm'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Human Reviewed ({currentAttainments.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'gaps'
                ? 'bg-warning/15 text-warning border border-warning/30 shadow-sm'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Requirement Gaps ({currentGaps.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('declared')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'declared'
                ? 'bg-info/15 text-info border border-info/30 shadow-sm'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Self-Declared ({selfDeclaredSkills.length})
          </button>
        </div>

        {/* 4. HUMAN-REVIEWED SKILLS SECTION */}
        {(activeTab === 'all' || activeTab === 'reviewed') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Verified Human-Reviewed Attainments</span>
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Click any skill card to open the auditable evidence drawer and inspect reviewer rationale and rubric scores.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-success bg-success/10 px-3 py-1 rounded-full border border-success/30 hidden sm:inline">
                {currentAttainments.length} Active Records
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentAttainments.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openEvidenceDetail(item)}
                  className="pb-card p-6 hover:border-border-accent transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openEvidenceDetail(item);
                    }
                  }}
                  aria-label={`Inspect evidence for ${item.skillName}`}
                >
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition">
                        {item.skillName}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-success/10 text-success border border-success/30">
                        Reviewed Level {item.reviewedLevel} / 4
                      </span>
                      {item.requiredLevel !== undefined && (
                        <span className="text-xs font-mono text-text-muted">
                          (Role Target: Level {item.requiredLevel})
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-text-muted flex flex-wrap items-center gap-2 font-mono">
                      <span>Challenge: <strong className="text-text-secondary">{item.challengeTitle}</strong></span>
                      <span>•</span>
                      <span>{item.criteriaResults?.length || 0} Rubric Criteria Scored</span>
                      <span>•</span>
                      <span>{item.externalLinks?.length || 0} Proof Links</span>
                    </p>

                    <div className="pt-1">
                      <StatusChip
                        status="reviewed"
                        reviewerName={item.reviewerName}
                        reviewedDate={item.reviewedDate}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-mono font-semibold text-accent flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent-soft border border-border-accent group-hover:bg-accent group-hover:text-[var(--text-inverse)] transition-all">
                      Inspect Audit Trail
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. REQUIREMENT GAPS SECTION */}
        {(activeTab === 'all' || activeTab === 'gaps') && (
          <div className="space-y-4 pt-2">
            <div>
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span>Target Requirement Gaps (Not Yet Demonstrated)</span>
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Skills required by active target opportunities that have no verified human review on record.
              </p>
            </div>

            <div className="space-y-3">
              {currentGaps.length === 0 ? (
                <div className="bg-success/5 border border-success/30 rounded-2xl p-6 text-center text-xs font-mono text-success">
                  ✓ All target role skill requirements have been verified by faculty review! Zero critical gaps.
                </div>
              ) : (
                currentGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="bg-warning/5 border border-warning/30 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold text-text-primary">{gap.skillName}</h3>
                      <StatusChip status="not-demonstrated" />
                      <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-warning/10 text-warning border border-warning/30">
                        Weight: {gap.weight}%
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary">
                      Required for: <strong className="text-text-primary">{gap.targetRole}</strong> (Required: Level {gap.requiredLevel}/4)
                    </p>

                    <p className="text-xs text-text-muted italic">
                      {gap.impactNote}
                    </p>
                  </div>

                  <Link
                    href={`/challenges/${gap.challengeId}`}
                    className="pb-btn-primary text-xs shrink-0"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Open SQL Challenge Workspace →
                  </Link>
                </div>
              )))}
            </div>
          </div>
        )}

        {/* 6. SELF-DECLARED SKILLS SECTION */}
        {(activeTab === 'all' || activeTab === 'declared') && (
          <div className="space-y-4 pt-2">
            <div>
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-info" />
                <span>Self-Declared Skills (Unverified Claims)</span>
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Self-declared skills reflect student interest and self-reported experience. In accordance with ProofBridge integrity rules, they are <strong>never</strong> counted in employer reviewed coverage until verified by a qualified evaluator.
              </p>
            </div>

            <div className="pb-card divide-y divide-[var(--border)] overflow-hidden">
              {selfDeclaredSkills.map((item, idx) => (
                <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-hover transition">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{item.skillName}</h3>
                    <p className="text-xs text-text-muted mt-0.5 font-mono">Declared on {item.declaredDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted font-mono">Self-Claimed Level {item.declaredLevel}/4</span>
                    <StatusChip status="self-declared" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Slide-Over Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        evidence={selectedEvidence}
      />
    </AppShell>
  );
}

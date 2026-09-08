'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AppShell } from '@/components/ui/AppShell';
import { StatusChip } from '@/components/student/StatusChip';
import { ProofChainViewer } from '@/components/ui/ProofChainViewer';
import { BridgeMeSimulator } from '@/components/student/BridgeMeSimulator';
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Terminal,
  Fingerprint,
  TrendingUp,
  Target,
  Code2,
  Eye,
  Sparkles,
  Sliders,
  Building2,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [isEmptyAccount, setIsEmptyAccount] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);
  const [liveCoverage, setLiveCoverage] = useState(61);
  const [submissionStatus, setSubmissionStatus] = useState<'submitted' | 'reviewed'>('submitted');
  const [isBridgeMeOpen, setIsBridgeMeOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveState() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setHasVerifiedSql(Boolean(json.data.has_verified_sql));
            setLiveCoverage(json.data.match_coverage?.reviewed_coverage ?? 61);
            setSubmissionStatus(json.data.submission_status ?? 'submitted');
          }
        }
      } catch (e) {
        console.warn('Could not load live state for student:', e);
      }
    }
    loadLiveState();
    const interval = setInterval(loadLiveState, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const student = {
    name: user?.name || 'Meera Patel',
    avatarInitial: user?.avatarInitials || 'MP',
    program: user?.program || 'MCA 2026',
    institution: user?.institutionName || 'Manipal University Jaipur (MUJ)',
    rollNumber: user?.rollNumber || 'MCA-2026-042',
    affiliationStatus: user?.affiliationStatus || 'approved',
    headline: hasVerifiedSql
      ? 'Aspiring Data Analyst · 4 Verified Attainments (SQL Verified)'
      : 'Aspiring Data Analyst · 3 Verified Attainments',
  };

  const targetOpportunity = {
    id: '40000000-0000-0000-0000-000000000001',
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    reviewedCoverage: hasVerifiedSql ? 96 : 61,
    potentialCoverage: 96,
  };

  const recommendedChallenge = {
    id: '50000000-0000-0000-0000-000000000001',
    title: 'Explain Monthly Sales from Messy Dataset',
    estimatedTime: '2 hours',
    skillCovered: 'SQL (Structured Query Language)',
    requiredLevel: 'Level 3/4',
    weight: 35,
    difficulty: 'Intermediate',
  };

  const isMeera = user?.email?.includes('meera.patel');

  const skillBreakdown = isMeera ? [
    { skill: 'Spreadsheets', requiredLevel: 3, reviewedLevel: 3, weight: 25, contribution: 25, formulaNote: '25 × min(3/3, 1) = 25 pts', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Sep 06, 2026' },
    { skill: 'Written Communication', requiredLevel: 4, reviewedLevel: 3, weight: 16, contribution: 12, formulaNote: '16 × min(3/4, 1) = 12 pts', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Sep 06, 2026' },
    { skill: 'Analytical Reasoning', requiredLevel: 3, reviewedLevel: 3, weight: 24, contribution: 24, formulaNote: '24 × min(3/3, 1) = 24 pts', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Sep 06, 2026' },
    hasVerifiedSql
      ? { skill: 'SQL (Structured Query Language)', requiredLevel: 3, reviewedLevel: 3, weight: 35, contribution: 35, formulaNote: '35 × min(3/3, 1) = 35 pts (verified Level 3)', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Just now' }
      : { skill: 'SQL (Structured Query Language)', requiredLevel: 3, reviewedLevel: 0, weight: 35, contribution: 0, formulaNote: '35 × 0 = 0 pts (not yet reviewed)', status: 'awaiting-review' as const, reviewer: null, reviewedDate: null },
  ] : [
    { skill: 'Spreadsheets', requiredLevel: 3, reviewedLevel: 0, weight: 25, contribution: 0, formulaNote: '25 × 0 = 0 pts (not yet reviewed)', status: 'awaiting-review' as const, reviewer: null, reviewedDate: null },
    { skill: 'Written Communication', requiredLevel: 4, reviewedLevel: 0, weight: 16, contribution: 0, formulaNote: '16 × 0 = 0 pts (not yet reviewed)', status: 'awaiting-review' as const, reviewer: null, reviewedDate: null },
    { skill: 'Analytical Reasoning', requiredLevel: 3, reviewedLevel: 0, weight: 24, contribution: 0, formulaNote: '24 × 0 = 0 pts (not yet reviewed)', status: 'awaiting-review' as const, reviewer: null, reviewedDate: null },
    { skill: 'SQL (Structured Query Language)', requiredLevel: 3, reviewedLevel: 0, weight: 35, contribution: 0, formulaNote: '35 × 0 = 0 pts (not yet reviewed)', status: 'awaiting-review' as const, reviewer: null, reviewedDate: null },
  ];

  const recentSubmissions = isMeera ? [
    {
      id: 'sub-sql-001',
      title: 'Explain Monthly Sales from Messy Dataset',
      skill: 'SQL',
      status: hasVerifiedSql || submissionStatus === 'reviewed' ? ('reviewed' as const) : ('awaiting-review' as const),
      reviewedDate: hasVerifiedSql ? 'Just now' : null,
    },
    { id: 'sub-comm-001',  title: 'Stakeholder Communication Report', skill: 'Communication', status: 'reviewed' as const, reviewedDate: 'Sep 5' },
  ] : [];

  const coverageScore = isEmptyAccount ? 0 : (isMeera ? (hasVerifiedSql ? 96 : liveCoverage) : 0);

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">

        {/* ── IDENTITY BAR ── */}
        <div className="pb-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-border-accent flex items-center justify-center font-black text-accent text-lg">
              {student.avatarInitial}
            </div>
            <div>
              <div className="section-label mb-0.5">Student Workspace</div>
              <h1 className="text-xl font-black text-text-primary">{student.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 font-mono text-xs">
                <span className="text-text-muted">{student.program} · {student.institution}</span>
                {student.affiliationStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/10 text-success border border-success/30" title="Officially verified by University Registrar">
                    <ShieldCheck className="w-3 h-3" />
                    Verified University Student
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-warning/10 text-warning border border-warning/30" title="Awaiting Registrar confirmation">
                    <Clock className="w-3 h-3" />
                    Affiliation Pending Approval
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Bridge Me Trigger */}
            <button
              type="button"
              onClick={() => setIsBridgeMeOpen(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-accent text-white hover:bg-accent/90 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white/20" />
              <span>⚡ Bridge Me</span>
            </button>

            <button
              onClick={() => setIsEmptyAccount(!isEmptyAccount)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isEmptyAccount
                  ? 'bg-warning/10 text-warning border-warning/30'
                  : 'bg-surface-raised text-text-secondary border-border hover:border-border-bright'
              }`}
            >
              {isEmptyAccount ? '⚡ Show Populated State' : '🔲 Show Empty State'}
            </button>

            <Link href={`/opportunities/${targetOpportunity.id}`} className="pb-btn-primary py-1.5 px-3 text-xs">
              <Eye className="w-3.5 h-3.5" />
              Full Match View
            </Link>
          </div>
        </div>

        {/* ── AFFILIATION PENDING ALERT (IF UNVERIFIED) ── */}
        {student.affiliationStatus === 'pending_approval' && (
          <div className="p-4 rounded-2xl bg-warning/10 border border-warning/30 text-warning text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>
                <strong>University Affiliation Pending:</strong> Your enrollment under <strong>{student.institution}</strong> (Roll: {student.rollNumber}) has been submitted to the Registrar&apos;s Office.
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

        {/* ── STAT BENTO ROW ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Coverage Score', value: isEmptyAccount ? '0%' : `${coverageScore}%`, sub: 'vs Junior DA role', icon: Target, color: 'text-accent' },
            { label: 'Potential Score', value: isEmptyAccount ? '—' : '96%', sub: hasVerifiedSql ? '✓ Max Score Reached' : '+35% if SQL reviewed', icon: TrendingUp, color: 'text-success' },
            { label: 'Submissions', value: isEmptyAccount ? '0' : '3', sub: hasVerifiedSql ? 'All reviewed & verified' : '1 awaiting review', icon: Code2, color: 'text-info' },
            { label: 'Attainments', value: isEmptyAccount ? '0' : (hasVerifiedSql ? '4' : '3'), sub: hasVerifiedSql ? '4 Faculty proofs (SQL Level 3)' : 'Faculty-verified proofs', icon: Award, color: 'text-warning' },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="pb-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="section-label text-[10px]">{label}</span>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className={`metric-value text-2xl sm:text-3xl ${color}`}>{value}</div>
              <p className="text-[11px] text-text-muted font-mono">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── LIVE PROOF CHAIN (PROVENANCE GRAPH) ── */}
        <div className="pb-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="section-label text-xs">Proof Provenance Graph</span>
              <h2 className="text-base font-bold text-text-primary mt-0.5">
                Cryptographic Evidence Chain (Live State)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-text-muted">
              {hasVerifiedSql ? '✓ Level 3 Attainment Anchored' : '⏳ Awaiting Reviewer Signoff'}
            </span>
          </div>
          <ProofChainViewer
            isVerified={hasVerifiedSql}
            studentName={student.name}
            roleTitle={targetOpportunity.title}
            reviewedLevel={hasVerifiedSql ? 3 : 0}
            weight={35}
            reviewDate={hasVerifiedSql ? 'Just now' : 'Pending'}
          />
        </div>

        {/* ── TARGET ROLE & LIVE COVERAGE CARD ── */}
        <div className="pb-card-accent p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                <span className="section-label text-xs">Primary Target Opportunity</span>
              </div>
              <h2 className="text-xl font-black text-text-primary">{targetOpportunity.title}</h2>
              <p className="text-xs text-text-secondary font-mono">{targetOpportunity.employer} · Active Role</p>
            </div>
            <div className="text-right">
              <span className="section-label text-xs">Reviewed Coverage</span>
              <div className="text-3xl sm:text-4xl font-black text-accent mt-0.5">
                {coverageScore}%
              </div>
              <span className="text-[11px] text-text-muted font-mono">Formula: coverage-v1</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-text-secondary">
              <span>Qualification Progress</span>
              <span>{coverageScore}% of 70% threshold</span>
            </div>
            <div className="h-2.5 bg-canvas rounded-full overflow-hidden border border-border">
              <div
                className={`h-full transition-all duration-700 ${coverageScore >= 70 ? 'bg-success' : 'bg-warning'}`}
                style={{ width: `${coverageScore}%` }}
              />
            </div>
          </div>

          {/* Skill Breakdown Rows */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="section-label text-xs">Required Skill Breakdown (4 Skills)</span>
              <button
                onClick={() => setShowCalculation(!showCalculation)}
                className="text-xs font-mono text-accent hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{showCalculation ? 'Hide Formula' : 'Show Math Engine'}</span>
                {showCalculation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-canvas">
              {skillBreakdown.map((item) => (
                <div key={item.skill} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-text-primary">{item.skill}</div>
                    <div className="text-[10px] text-text-muted font-mono">
                      Weight: {item.weight}% · Required: Level {item.requiredLevel} · Attained: Level {item.reviewedLevel}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    {showCalculation && (
                      <span className="text-[11px] text-text-secondary bg-surface px-2 py-0.5 rounded border border-border">
                        {item.formulaNote}
                      </span>
                    )}
                    <span className="font-bold text-text-primary">+{item.contribution}%</span>
                    <StatusChip status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECOMMENDED CHALLENGE BANNER ── */}
        {!hasVerifiedSql && (
          <div className="pb-card p-6 border-2 border-accent/30 bg-accent-soft/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent font-mono">HIGHEST ROI INTERVENTION</span>
              </div>
              <h3 className="text-base font-bold text-text-primary">
                {recommendedChallenge.title}
              </h3>
              <p className="text-xs text-text-secondary">
                Completing this challenge and receiving faculty signoff at Level 3 will leap your match from <strong>61% to 96%</strong>.
              </p>
            </div>
            <Link
              href="/challenges/30000000-0000-0000-0000-000000000001"
              className="pb-btn-primary text-xs py-2.5 px-4 shrink-0 flex items-center gap-2"
            >
              <span>Launch In-Browser SQL Runner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* ── RECENT SUBMISSIONS TABLE ── */}
        <div className="pb-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-primary">Recent Code Submissions</h2>
            <Link href="/student/submissions" className="text-xs font-mono text-accent hover:underline">
              View All Submissions →
            </Link>
          </div>
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-canvas">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="p-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-text-primary">{sub.title}</div>
                  <div className="text-[10px] text-text-muted font-mono">{sub.skill} · ID: {sub.id}</div>
                </div>
                <div className="flex items-center gap-3">
                  {sub.reviewedDate && (
                    <span className="text-[10px] text-text-muted font-mono">{sub.reviewedDate}</span>
                  )}
                  <StatusChip status={sub.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BRIDGE ME SIMULATOR MODAL ── */}
        <BridgeMeSimulator
          isOpen={isBridgeMeOpen}
          onClose={() => setIsBridgeMeOpen(false)}
          currentCoverage={liveCoverage}
          hasVerifiedSql={hasVerifiedSql}
        />

      </div>
    </AppShell>
  );
}

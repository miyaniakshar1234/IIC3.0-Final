'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusChip } from '@/components/student/StatusChip';
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
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [isEmptyAccount, setIsEmptyAccount] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);
  const [liveCoverage, setLiveCoverage] = useState(61);
  const [submissionStatus, setSubmissionStatus] = useState<'submitted' | 'reviewed'>('submitted');

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
    name: 'Meera Patel',
    avatarInitial: 'MP',
    program: 'MCA 2026',
    institution: 'Demo College of Computing',
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

  const skillBreakdown = [
    { skill: 'Spreadsheets', requiredLevel: 3, reviewedLevel: 3, weight: 25, contribution: 25, formulaNote: '25 × min(3/3, 1) = 25 pts', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Sep 06, 2026' },
    { skill: 'Written Communication', requiredLevel: 4, reviewedLevel: 3, weight: 16, contribution: 12, formulaNote: '16 × min(3/4, 1) = 12 pts', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Sep 06, 2026' },
    { skill: 'Analytical Reasoning', requiredLevel: 3, reviewedLevel: 3, weight: 24, contribution: 24, formulaNote: '24 × min(3/3, 1) = 24 pts', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Sep 06, 2026' },
    hasVerifiedSql
      ? { skill: 'SQL (Structured Query Language)', requiredLevel: 3, reviewedLevel: 3, weight: 35, contribution: 35, formulaNote: '35 × min(3/3, 1) = 35 pts (verified Level 3)', status: 'reviewed' as const, reviewer: 'Dr. Alok Sharma', reviewedDate: 'Just now' }
      : { skill: 'SQL (Structured Query Language)', requiredLevel: 3, reviewedLevel: 0, weight: 35, contribution: 0, formulaNote: '35 × 0 = 0 pts (not yet reviewed)', status: 'awaiting-review' as const, reviewer: null, reviewedDate: null },
  ];

  const recentSubmissions = [
    { id: 'sub-sheet-001', title: 'Dynamic Budget Tracker', skill: 'Spreadsheets', status: 'reviewed' as const, reviewedDate: 'Sep 6' },
    {
      id: 'sub-sql-001',
      title: 'Explain Monthly Sales from Messy Dataset',
      skill: 'SQL',
      status: hasVerifiedSql || submissionStatus === 'reviewed' ? ('reviewed' as const) : ('awaiting-review' as const),
      reviewedDate: hasVerifiedSql ? 'Just now' : null,
    },
    { id: 'sub-comm-001',  title: 'Stakeholder Communication Report', skill: 'Communication', status: 'reviewed' as const, reviewedDate: 'Sep 5' },
  ];

  const coverageScore = isEmptyAccount ? 0 : (hasVerifiedSql ? 96 : liveCoverage);

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
              <p className="text-xs text-text-muted font-mono">{student.program} · {student.institution}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEmptyAccount(!isEmptyAccount)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
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
                <span className="section-label text-[9px]">{label}</span>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className={`metric-value text-3xl ${color}`}>{value}</div>
              <p className="text-[10px] text-text-muted">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Coverage breakdown — spans 2 */}
          <div className="lg:col-span-2 pb-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="section-label mb-0.5">Coverage Engine v1</div>
                <h2 className="text-base font-black text-text-primary">Skill Match Breakdown</h2>
                <p className="text-[11px] text-text-muted font-mono">{targetOpportunity.title} · {targetOpportunity.employer}</p>
              </div>
              <button
                onClick={() => setShowCalculation(!showCalculation)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-text-muted hover:text-accent transition-colors"
              >
                Formula {showCalculation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showCalculation && (
              <div className="bg-canvas rounded-xl p-3 border border-border font-mono text-[10px] space-y-0.5 text-text-secondary">
                <p className="text-text-muted">-- coverage-v1 formula</p>
                <p>coverage_score = SUM(weight × min(reviewed/required, 1)) / total_weight × 100</p>
                <p className="text-accent">= (25+12+24+0) / (25+16+24+35) × 100 = <span className="font-black">61%</span></p>
              </div>
            )}

            {/* Score bar */}
            {!isEmptyAccount && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-text-muted">Current: <span className="text-accent font-bold">61%</span></span>
                  <span className="text-text-muted">Potential: <span className="text-success font-bold">96%</span></span>
                </div>
                <div className="relative h-3 bg-surface-raised rounded-full overflow-hidden">
                  <div className="absolute h-full bg-success/20 rounded-full" style={{ width: '96%' }} />
                  <div className="absolute h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${coverageScore}%` }} />
                </div>
                <p className="text-[10px] text-text-muted font-mono">Gap: SQL Missing (35 pts) · Publish SQL review to reach 96%</p>
              </div>
            )}

            {/* Skill rows */}
            <div className="space-y-2">
              {(isEmptyAccount ? [] : skillBreakdown).map((s) => (
                <div key={s.skill} className="flex items-center gap-3 p-3 bg-canvas rounded-xl border border-border">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    s.status === 'reviewed' ? 'bg-success' : s.status === 'awaiting-review' ? 'bg-warning' : 'bg-border-bright'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-text-primary truncate">{s.skill}</span>
                      <span className="text-[10px] font-mono text-text-muted shrink-0">w={s.weight}</span>
                    </div>
                    {s.reviewer && (
                      <p className="text-[10px] text-text-muted">{s.reviewer} · {s.reviewedDate}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <StatusChip status={s.status} />
                    <p className="text-[10px] font-mono text-text-muted mt-0.5">
                      {s.contribution > 0 ? `+${s.contribution} pts` : '0 pts'}
                    </p>
                  </div>
                </div>
              ))}
              {isEmptyAccount && (
                <div className="text-center py-8 text-text-muted">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-semibold">No submissions yet</p>
                  <p className="text-xs">Submit a challenge to start building proof</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Recommended challenge */}
            <div className="pb-card-accent p-5 space-y-3">
              <div className="section-label">Recommended Next Step</div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-soft border border-border-accent flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary leading-snug">{recommendedChallenge.title}</h3>
                  <p className="text-[10px] font-mono text-text-muted mt-0.5">{recommendedChallenge.skillCovered}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <span className="pb-badge"><Clock className="w-3 h-3" />{recommendedChallenge.estimatedTime}</span>
                <span className="pb-badge"><Award className="w-3 h-3" />{recommendedChallenge.requiredLevel}</span>
                <span className="pb-badge pb-badge-accent col-span-2">+{recommendedChallenge.weight} pts potential</span>
              </div>
              <Link href={`/challenges/${recommendedChallenge.id}`} className="pb-btn-primary w-full justify-center text-xs py-2">
                <Terminal className="w-3.5 h-3.5" />
                Start Challenge
              </Link>
            </div>

            {/* Recent submissions */}
            <div className="pb-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="section-label">Recent Submissions</div>
                <Link href="/student/submissions" className="text-[10px] text-accent font-semibold hover:underline">View all</Link>
              </div>
              {(isEmptyAccount ? [] : recentSubmissions).map((sub) => (
                <div key={sub.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${sub.status === 'reviewed' ? 'bg-success' : 'bg-warning'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-text-primary truncate">{sub.title}</p>
                    <p className="text-[10px] text-text-muted">{sub.skill}</p>
                  </div>
                  <StatusChip status={sub.status} />
                </div>
              ))}
              {isEmptyAccount && (
                <p className="text-[11px] text-text-muted text-center py-4">No submissions yet</p>
              )}
            </div>

            {/* Passport quick link */}
            <Link href="/student/passport" className="pb-card p-4 flex items-center gap-3 hover:border-border-accent group transition-all">
              <div className="w-8 h-8 rounded-lg bg-info/10 border border-info/20 flex items-center justify-center">
                <Fingerprint className="w-4 h-4 text-info" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-text-primary">Skill Passport</p>
                <p className="text-[10px] text-text-muted">View your verified attainments</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
            </Link>
          </div>
        </div>

      </div>
    </AppShell>
  );
}

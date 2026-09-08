'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { CurriculumSimulatorModal } from '@/components/institution/CurriculumSimulatorModal';
import { CohortStudentRoster } from '@/components/institution/CohortStudentRoster';
import {
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Filter,
  ShieldAlert,
  Zap,
  Calendar,
  ChevronRight,
  Info,
  Layers,
  X,
  Sliders,
  Sparkles,
  Download,
  Target
} from 'lucide-react';

interface SkillGapItem {
  id: string;
  name: string;
  category: string;
  industryTarget: number;
  cohortAvg: number;
  deficitPct: number;
  status: 'high_risk' | 'moderate' | 'aligned';
  statusLabel: string;
  studentsDeficient: number;
  totalEvaluated: number;
}

export default function InstitutionInsightsPage() {
  const [selectedCohort, setSelectedCohort] = useState('MCA 2026');
  const [selectedOpportunity, setSelectedOpportunity] = useState('Junior Data Analyst Intern');
  const [bootcampScheduled, setBootcampScheduled] = useState(false);
  const [selectedSkillModal, setSelectedSkillModal] = useState<SkillGapItem | null>(null);
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

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
      } catch (err) {
        console.warn('Could not load live state for institution insights:', err);
      }
    }
    loadLiveState();
    const interval = setInterval(loadLiveState, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const isSmallCohort = selectedCohort === 'Small Cohort Demo';

  const skillGaps: SkillGapItem[] = [
    {
      id: 'sql',
      name: 'SQL (Structured Query Language)',
      category: 'Data & Analytics',
      industryTarget: 3,
      cohortAvg: hasVerifiedSql ? 1.83 : 1.8,
      deficitPct: hasVerifiedSql ? -41 : -42,
      status: 'high_risk',
      statusLabel: hasVerifiedSql ? 'Deficit Improving (−41%)' : 'High Risk Deficit',
      studentsDeficient: hasVerifiedSql ? 41 : 42,
      totalEvaluated: 100,
    },
    { id: 'spreadsheets', name: 'Spreadsheets & Auditing', category: 'Data & Analytics', industryTarget: 3, cohortAvg: 2.9, deficitPct: -4, status: 'aligned', statusLabel: 'Aligned', studentsDeficient: 4, totalEvaluated: 100 },
    { id: 'communication', name: 'Written Technical Comm', category: 'Professional Skills', industryTarget: 4, cohortAvg: 3.1, deficitPct: -18, status: 'moderate', statusLabel: 'Moderate Deficit', studentsDeficient: 18, totalEvaluated: 100 },
    { id: 'reasoning', name: 'Analytical Reasoning', category: 'Cognitive', industryTarget: 3, cohortAvg: 3.0, deficitPct: 0, status: 'aligned', statusLabel: 'Aligned', studentsDeficient: 0, totalEvaluated: 100 },
  ];

  const statusStyle = {
    high_risk: 'bg-warning/10 text-warning border-warning/30',
    moderate:  'bg-info/10 text-info border-info/30',
    aligned:   'bg-success/10 text-success border-success/30',
  };

  const statusIcon = {
    high_risk: AlertTriangle,
    moderate:  Info,
    aligned:   CheckCircle2,
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">

        {/* ── HEADER ── */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pb-badge pb-badge-accent"><Info className="w-3 h-3" />Synthetic cohort scenario</span>
                <span className="pb-badge">Institutional Intelligence · Curriculum Feedback Loop</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Curriculum Gap Radar &amp; Placement Intelligence
              </h1>
              <p className="text-xs text-text-muted font-mono flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-accent" />
                Manipal University Jaipur (MUJ) · <span className="font-bold text-text-secondary">{selectedCohort}</span>
                ({isSmallCohort ? '4 Enrolled Students' : '100 Evaluated Students'})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/institution/approvals"
                className="px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-warning/50 text-text-primary font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-warning" />
                <span>Student Affiliation Queue</span>
                <span className="px-1.5 py-0.2 rounded-full bg-warning/20 text-warning text-[10px] font-mono">4 Pending</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsSimulatorOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:bg-accent/90 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>⚡ Simulate Curriculum ROI</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── HERO BANNER: STUDENTS ONE SKILL AWAY ── */}
        <div className="pb-card p-5 border-2 border-accent/30 bg-accent-soft/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-black shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-text-primary flex items-center gap-2">
                <span>Actionable Placement Metric: Students &quot;One Skill Away&quot;</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-border-accent">
                  High ROI
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                <strong className="text-text-primary">{hasVerifiedSql ? 41 : 42} MCA students</strong> are exactly 1 skill (SQL Level 3) away from qualifying for <strong className="text-text-primary">14 active partner internship roles</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSimulatorOpen(true)}
            className="pb-btn-primary text-xs py-2 px-3.5 shrink-0 self-start sm:self-center cursor-pointer"
          >
            Model Intervention
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* ── STAT BENTO ROW ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[9px]">Evaluated Students</span>
              <Users className="w-4 h-4 text-accent" />
            </div>
            <div className="metric-value text-3xl text-text-primary">{isSmallCohort ? 4 : 100}</div>
            <p className="text-[10px] text-text-muted font-mono">{selectedCohort} · Active Pool</p>
          </div>

          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[9px]">Verified Attainments</span>
              <Award className="w-4 h-4 text-success" />
            </div>
            <div className="metric-value text-3xl text-success">{hasVerifiedSql ? 249 : 248}</div>
            <p className="text-[10px] text-text-muted font-mono">{hasVerifiedSql ? '+1 SQL attainment verified' : 'Faculty reviewed proofs'}</p>
          </div>

          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[9px]">Target Roles Active</span>
              <Building2 className="w-4 h-4 text-info" />
            </div>
            <div className="metric-value text-3xl text-info">14 Roles</div>
            <p className="text-[10px] text-text-muted font-mono">Sample Analytics Studio &amp; Labs</p>
          </div>

          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[9px]">Critical Skill Deficit</span>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </div>
            <div className="metric-value text-3xl text-warning">{hasVerifiedSql ? '-41%' : '-42%'}</div>
            <p className="text-[10px] text-text-muted font-mono">SQL Level 3 ({hasVerifiedSql ? 41 : 42} students)</p>
          </div>
        </div>

        {/* ── CURRICULUM GAP RADAR TABLE ── */}
        <div className="pb-card overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-text-primary tracking-tight">
                Curriculum vs. Industry Demand Alignment
              </h2>
              <p className="text-xs text-text-muted font-mono mt-0.5">
                Evaluates demonstrated student proficiency against active employer job requirements
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSimulatorOpen(true)}
                className="pb-btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-accent" />
                <span>Intervention Simulator</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="px-5 py-3.5">Skill Domain</th>
                  <th className="px-5 py-3.5">Industry Target</th>
                  <th className="px-5 py-3.5">Cohort Average</th>
                  <th className="px-5 py-3.5">Deficit Delta</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {skillGaps.map((item) => {
                  const StatusIcon = statusIcon[item.status];
                  return (
                    <tr key={item.id} className="hover:bg-surface-hover transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-text-primary text-sm">{item.name}</div>
                        <div className="text-[10px] text-text-muted font-mono">{item.category}</div>
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-text-primary">
                        Level {item.industryTarget} of 4
                      </td>
                      <td className="px-5 py-4 font-mono">
                        <span className="font-bold text-text-primary">{item.cohortAvg}</span> / 4.0
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div className="font-mono font-bold text-xs text-text-primary flex justify-between">
                            <span className={item.deficitPct < -20 ? 'text-warning' : 'text-success'}>
                              {item.deficitPct}%
                            </span>
                            <span className="text-[10px] text-text-muted">
                              {item.studentsDeficient} of {item.totalEvaluated} deficient
                            </span>
                          </div>
                          <div className="w-full bg-canvas rounded-full h-1.5 overflow-hidden border border-border">
                            <div
                              className={`h-full ${item.status === 'high_risk' ? 'bg-warning' : item.status === 'moderate' ? 'bg-info' : 'bg-success'}`}
                              style={{ width: `${Math.max(10, 100 + item.deficitPct)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border ${statusStyle[item.status]}`}>
                          <StatusIcon className="w-3 h-3" />
                          {item.statusLabel}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedSkillModal(item)}
                          className="inline-flex items-center gap-0.5 text-[11px] font-mono font-semibold text-accent hover:underline cursor-pointer"
                        >
                          Spread <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ACTIONABLE INTERVENTION CARD ── */}
        <div className="pb-card-accent p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-warning text-xs font-mono font-bold tracking-wider uppercase bg-warning/10 border border-warning/30 px-3.5 py-1.5 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                Prescriptive Curriculum Action
              </div>
              <span className="text-xs text-text-muted font-mono">Trigger: 14 Active Partner Opportunities</span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                Bridge the SQL Deficit for {hasVerifiedSql ? 41 : 42} MCA Students
              </h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {hasVerifiedSql ? 41 : 42} MCA students currently lack Level 3 SQL proficiency required by 14 active campus hiring opportunities. Scheduling an intensive hands-on SQL &amp; Window Functions lab will unlock eligibility for an estimated 38 additional student placements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {!bootcampScheduled ? (
                <button
                  type="button"
                  onClick={() => setIsSimulatorOpen(true)}
                  className="pb-btn-primary text-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Launch Intervention Simulator &amp; Plan Lab
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-success/5 border border-success/30 p-4 rounded-xl text-success">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Intervention Scheduled: 2-Week SQL Lab module proposed for Sep 14–28, 2026.
                  </div>
                  <button
                    onClick={() => setBootcampScheduled(false)}
                    className="text-xs text-text-muted hover:text-text-primary underline sm:ml-auto cursor-pointer"
                  >
                    Modify / Undo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── EXPANDABLE STUDENT COHORT ROSTER ── */}
        <CohortStudentRoster
          hasVerifiedSql={hasVerifiedSql}
          bootcampScheduled={bootcampScheduled}
          onScheduleBootcamp={() => setBootcampScheduled(true)}
        />

        {/* ── SKILL DRILLDOWN MODAL ── */}
        {selectedSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border-accent space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-primary">{selectedSkillModal.name}</h3>
                  <p className="text-xs font-mono text-text-muted mt-0.5">Anonymized Level Distribution · {selectedCohort}</p>
                </div>
                <button onClick={() => setSelectedSkillModal(null)} className="w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover flex items-center justify-center cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { label: 'Level 0: Not Demonstrated / Missing', count: '28 students', color: 'text-warning' },
                  { label: 'Level 1: Basic Single-Table Queries',  count: '13 students', color: 'text-warning' },
                  { label: 'Level 2: Routine Multi-Table Joins',   count: '22 students', color: 'text-info'    },
                  { label: 'Level 3: Edge Cases & Deduplication ✓', count: hasVerifiedSql ? '37 students' : '36 students', color: 'text-success', highlight: true },
                  { label: 'Level 4: Advanced Window Functions',   count: '20 students', color: 'text-text-primary' },
                ].map(({ label, count, color, highlight }) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      highlight ? 'bg-success/5 border-success/20' : 'bg-canvas border-border'
                    }`}
                  >
                    <span className={`${highlight ? 'text-success font-semibold' : 'text-text-secondary'}`}>{label}</span>
                    <span className={`font-bold ${color}`}>{count}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-border flex justify-end">
                <button onClick={() => setSelectedSkillModal(null)} className="pb-btn-ghost text-xs py-2 px-4 cursor-pointer">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* ── CURRICULUM SIMULATOR MODAL ── */}
        <CurriculumSimulatorModal
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          onScheduleBootcamp={() => setBootcampScheduled(true)}
          currentDeficit={hasVerifiedSql ? 41 : 42}
          totalStudents={100}
        />

      </div>
    </AppShell>
  );
}

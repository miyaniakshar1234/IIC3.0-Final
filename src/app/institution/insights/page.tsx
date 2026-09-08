'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/ui/AppShell';
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
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">

        {/* ── HEADER ── */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pb-badge pb-badge-accent"><CheckCircle2 className="w-3 h-3" />Accreditation Ready · NAAC/NBA</span>
                <span className="pb-badge"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live Cohort Feed</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Institutional Intelligence & Curriculum Insights
              </h1>
              <p className="text-xs text-text-muted font-mono flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-accent" />
                Demo College of Computing · <span className="font-bold text-text-secondary">{selectedCohort}</span>
                ({isSmallCohort ? '4 Enrolled Students' : '120 Enrolled Students'})
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-canvas px-3 py-2 rounded-xl border border-border text-xs text-text-secondary font-mono">
                <Filter className="w-3 h-3 text-accent" />
                <span>Cohort:</span>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="bg-transparent text-text-primary font-bold focus:outline-none cursor-pointer"
                >
                  <option value="MCA 2026">MCA Cohort 2026 (120)</option>
                  <option value="B.Tech CS 2026">B.Tech CS 2026 (85)</option>
                  <option value="Small Cohort Demo">B.Tech AI-DS 2026 (4)</option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-canvas px-3 py-2 rounded-xl border border-border text-xs text-text-secondary font-mono">
                <Layers className="w-3 h-3 text-accent" />
                <span>Role:</span>
                <select
                  value={selectedOpportunity}
                  onChange={(e) => setSelectedOpportunity(e.target.value)}
                  className="bg-transparent text-text-primary font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Junior Data Analyst Intern">Junior Data Analyst Intern</option>
                  <option value="Associate Full-Stack Intern">Associate Full-Stack Intern</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Small cohort privacy guard */}
        {isSmallCohort && (
          <div className="bg-warning/10 border border-warning/30 p-5 rounded-2xl flex items-start gap-3 text-warning">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm">Privacy Guard Triggered: Small-Group Cohort (&lt; 5 Students)</h3>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                Cohorts with fewer than 5 students are suppressed from public breakdown tables to prevent deanonymization of individual learners. Showing synthetic demo watermark.
              </p>
            </div>
          </div>
        )}

        {/* ── KPI BENTO ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Enrolled Students',     value: isSmallCohort ? '4' : '120',  sub: isSmallCohort ? '4 Active' : '94 Active', icon: Users,      color: 'text-info',    badge: 'text-success bg-success/10 border-success/20' },
            { label: 'Verified Attainments',  value: isSmallCohort ? '11' : (hasVerifiedSql ? '343' : '342'), sub: hasVerifiedSql ? '+29 this week' : '+28 this week', icon: Award, color: 'text-accent', badge: 'text-accent bg-accent-soft border-border-accent' },
            { label: 'Avg Placement Readiness',value: '64%',                        sub: 'Across 14 target roles',                 icon: TrendingUp, color: 'text-success', badge: 'text-success bg-success/10 border-success/20' },
            { label: 'Critical Deficit Alert', value: 'SQL',                        sub: hasVerifiedSql ? 'P0 · −41% below L3 benchmark' : 'P0 · −42% below L3 benchmark', icon: AlertTriangle, color: 'text-warning', badge: 'text-warning bg-warning/10 border-warning/20' },
          ].map(({ label, value, sub, icon: Icon, color, badge }) => (
            <div key={label} className="pb-card p-5 space-y-3 hover:border-border-bright transition-all group">
              <div className="flex items-center justify-between">
                <span className="section-label text-[9px]">{label}</span>
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${badge} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className={`metric-value text-3xl ${color}`}>{value}</div>
              <p className="text-[10px] text-text-muted font-mono">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── SKILL GAP TABLE ── */}
        <div className="pb-card overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-surface-raised">
            <div>
              <div className="section-label mb-1">Industry Benchmark vs Cohort Attainment</div>
              <h2 className="text-base font-black text-text-primary">Skill Gap Breakdown</h2>
              <p className="text-xs text-text-muted">Role: <span className="font-semibold text-text-secondary">{selectedOpportunity}</span> · Aggregated evidence from verified challenges</p>
            </div>
            <div className="pb-badge text-[10px]"><Info className="w-3 h-3 text-accent" />Levels 0–4 anchored against employer rubrics</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-muted font-mono text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Skill & Category</th>
                  <th className="px-5 py-3">Industry Target</th>
                  <th className="px-5 py-3">Cohort Avg</th>
                  <th className="px-5 py-3">Deficit</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Drilldown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {skillGaps.map((item) => {
                  const StatusIcon = statusIcon[item.status];
                  return (
                    <tr key={item.id} className="hover:bg-surface-hover transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-text-primary">{item.name}</div>
                        <div className="text-[10px] font-mono text-text-muted">{item.category}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="pb-badge font-mono font-bold">Level {item.industryTarget}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono font-bold text-text-primary">L{item.cohortAvg}</span>
                          <span className="text-[10px] text-text-muted">/ 4.0</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${
                            item.deficitPct < -20 ? 'text-warning' : item.deficitPct < 0 ? 'text-info' : 'text-success'
                          }`}>{item.deficitPct}%</span>
                          <div className="w-20 bg-surface-raised rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.deficitPct < -20 ? 'bg-warning' : item.deficitPct < 0 ? 'bg-info' : 'bg-success'
                              }`}
                              style={{ width: `${Math.max(100 + item.deficitPct, 10)}%` }}
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
                          className="inline-flex items-center gap-0.5 text-[11px] font-mono font-semibold text-accent hover:underline"
                        >
                          Cohort Spread <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── INTERVENTION CARD ── */}
        <div className="pb-card-accent p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-warning text-xs font-mono font-bold tracking-wider uppercase bg-warning/10 border border-warning/30 px-3.5 py-1.5 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                Automated Academic Intervention Recommendation
              </div>
              <span className="text-xs text-text-muted font-mono">Trigger: 8 Active Opportunities Locked</span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">Bridge the SQL Gap for 42 MCA Students</h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                42 MCA students currently lack Level 3 SQL proficiency required by 8 active campus hiring opportunities. Scheduling an intensive 2-day SQL Bootcamp will unlock eligibility for an estimated 38 student placements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {!bootcampScheduled ? (
                <button
                  onClick={() => setBootcampScheduled(true)}
                  className="pb-btn-primary text-xs"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule 2-Day SQL Bootcamp
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-success/5 border border-success/30 p-4 rounded-xl text-success">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    Workshop Scheduled: Sep 14–15, 2026. Notifications dispatched to 42 students.
                  </div>
                  <button
                    onClick={() => setBootcampScheduled(false)}
                    className="text-xs text-text-muted hover:text-text-primary underline sm:ml-auto"
                  >
                    Modify / Undo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SKILL DRILLDOWN MODAL ── */}
        {selectedSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-lg border border-border-accent space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-primary">{selectedSkillModal.name}</h3>
                  <p className="text-xs font-mono text-text-muted mt-0.5">Anonymized Level Distribution · {selectedCohort}</p>
                </div>
                <button onClick={() => setSelectedSkillModal(null)} className="w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { label: 'Level 0: Not Demonstrated / Missing', count: '28 students', color: 'text-warning' },
                  { label: 'Level 1: Basic Single-Table Queries',  count: '14 students', color: 'text-warning' },
                  { label: 'Level 2: Routine Multi-Table Joins',   count: '22 students', color: 'text-info'    },
                  { label: 'Level 3: Edge Cases & Deduplication ✓', count: '36 students', color: 'text-success', highlight: true },
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
                <button onClick={() => setSelectedSkillModal(null)} className="pb-btn-ghost text-xs py-2 px-4">Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

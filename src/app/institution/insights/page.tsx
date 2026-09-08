'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/ui/AppShell';
import {
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Filter,
  ShieldAlert,
  Zap,
  Calendar,
  Sparkles,
  ChevronRight,
  Info,
  Layers,
  ArrowRight
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

  const isSmallCohort = selectedCohort === 'Small Cohort Demo';

  const skillGaps: SkillGapItem[] = [
    {
      id: 'sql',
      name: 'SQL (Structured Query Language)',
      category: 'Data & Analytics',
      industryTarget: 3,
      cohortAvg: 1.8,
      deficitPct: -42,
      status: 'high_risk',
      statusLabel: 'High Risk Deficit',
      studentsDeficient: 42,
      totalEvaluated: 100,
    },
    {
      id: 'spreadsheets',
      name: 'Spreadsheets & Auditing',
      category: 'Data & Analytics',
      industryTarget: 3,
      cohortAvg: 2.9,
      deficitPct: -4,
      status: 'aligned',
      statusLabel: 'Aligned',
      studentsDeficient: 4,
      totalEvaluated: 100,
    },
    {
      id: 'communication',
      name: 'Written Technical Comm',
      category: 'Professional Skills',
      industryTarget: 4,
      cohortAvg: 3.1,
      deficitPct: -18,
      status: 'moderate',
      statusLabel: 'Moderate Deficit',
      studentsDeficient: 18,
      totalEvaluated: 100,
    },
    {
      id: 'reasoning',
      name: 'Analytical Reasoning',
      category: 'Cognitive',
      industryTarget: 3,
      cohortAvg: 3.0,
      deficitPct: 0,
      status: 'aligned',
      statusLabel: 'Aligned',
      studentsDeficient: 0,
      totalEvaluated: 100,
    },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Accreditation Ready • NAAC / NBA Aligned
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Live Cohort Feed
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-zinc-100 tracking-tight">
                Institutional Intelligence &amp; Curriculum Insights
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 flex items-center gap-2 font-mono">
                <Building2 className="w-4 h-4 text-accent" />
                Demo College of Computing • <span className="font-bold text-zinc-200">{selectedCohort}</span> ({isSmallCohort ? '4 Enrolled Students' : '120 Enrolled Students'})
              </p>
            </div>

            {/* Quick Actions / Filters Header */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center space-x-2 bg-zinc-950/80 px-3.5 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 font-mono">
                <Filter className="w-3.5 h-3.5 text-accent" />
                <span>Cohort:</span>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="bg-transparent text-zinc-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="MCA 2026" className="bg-zinc-900 text-zinc-200">MCA Cohort 2026 (120)</option>
                  <option value="B.Tech CS 2026" className="bg-zinc-900 text-zinc-200">B.Tech CS 2026 (85)</option>
                  <option value="Small Cohort Demo" className="bg-zinc-900 text-zinc-200">B.Tech AI-DS 2026 (4 - Small Group)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 bg-zinc-950/80 px-3.5 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 font-mono">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>Target Role:</span>
                <select
                  value={selectedOpportunity}
                  onChange={(e) => setSelectedOpportunity(e.target.value)}
                  className="bg-transparent text-zinc-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Junior Data Analyst Intern" className="bg-zinc-900 text-zinc-200">Junior Data Analyst Intern (Sample Analytics)</option>
                  <option value="Associate Full-Stack Intern" className="bg-zinc-900 text-zinc-200">Associate Full-Stack Intern (Example Web Lab)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Small Group Privacy Guard Banner (T-17 Verification) */}
        {isSmallCohort && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-start gap-3 text-amber-300 shadow-lg animate-in fade-in font-mono">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-amber-300">Privacy Guard Triggered: Small-Group Cohort (&lt; 5 Students)</h3>
              <p className="text-xs text-amber-400/80 mt-1 leading-relaxed">
                In production, cohorts with fewer than 5 students are suppressed from public breakdown tables to prevent deanonymization of individual learners. Showing synthetic demo watermark.
              </p>
            </div>
          </div>
        )}

        {/* 4 KPI Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Enrolled Students */}
          <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl hover:border-accent/40 transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Enrolled Students</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-accent border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-zinc-100 tracking-tight font-mono">
                {isSmallCohort ? '4' : '120'}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isSmallCohort ? '4 Active on ProofBridge' : '94 Active on ProofBridge'}
              </div>
            </div>
          </div>

          {/* Card 2: Human-Verified Attainments */}
          <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Verified Attainments</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-zinc-100 tracking-tight font-mono">
                {isSmallCohort ? '11' : '342'}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30 w-fit">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +28 this week
              </div>
            </div>
          </div>

          {/* Card 3: Placement Readiness */}
          <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Avg Placement Readiness</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-zinc-100 tracking-tight font-mono">64%</div>
              <div className="mt-2 text-xs font-mono text-zinc-400">
                Based on 14 Target Employer Roles
              </div>
            </div>
          </div>

          {/* Card 4: Critical Deficit Alert */}
          <div className="bg-gradient-to-br from-amber-950/40 to-zinc-900/80 rounded-2xl border border-amber-500/40 p-6 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">Critical Deficit Alert</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 relative z-10">
              <div className="text-3xl font-black text-amber-300 tracking-tight flex items-center gap-2 font-mono">
                SQL
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  P0 Deficit (-42%)
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30 w-fit">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                42% of cohort below Level 3 benchmark
              </div>
            </div>
          </div>

        </div>

        {/* Section 1: Cohort Skill Gap Breakdown Table */}
        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-950/40">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
                  Industry Benchmark vs Cohort Attainment Level
                </h2>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/30">
                  Role: {selectedOpportunity}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Aggregated evidence across verified student challenges mapped to employer requirements.
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-accent" />
              Levels 0–4 anchored against employer rubrics
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/80 border-b border-white/10 text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">Skill &amp; Category</th>
                  <th scope="col" className="px-6 py-4">Industry Target</th>
                  <th scope="col" className="px-6 py-4">Cohort Avg</th>
                  <th scope="col" className="px-6 py-4">Deficit Metric</th>
                  <th scope="col" className="px-6 py-4">Status &amp; Risk</th>
                  <th scope="col" className="px-6 py-4 text-right">Drilldown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {skillGaps.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-zinc-100">{item.name}</div>
                        <div className="text-xs font-mono text-zinc-400 mt-0.5">{item.category}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-zinc-800 text-zinc-200 border border-white/10">
                          Level {item.industryTarget}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-zinc-100 text-sm">
                            Level {item.cohortAvg}
                          </span>
                          <span className="text-xs font-mono text-zinc-500">/ 4.0</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold text-sm ${
                              item.deficitPct < -20
                                ? 'text-amber-400'
                                : item.deficitPct < 0
                                ? 'text-blue-400'
                                : 'text-emerald-400'
                            }`}
                          >
                            {item.deficitPct}%
                          </span>
                          <div className="w-24 bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.deficitPct < -20
                                  ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                  : item.deficitPct < 0
                                  ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                                  : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                              }`}
                              style={{ width: `${Math.max(100 + item.deficitPct, 15)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {item.status === 'high_risk' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            {item.statusLabel}
                          </span>
                        )}
                        {item.status === 'moderate' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            <Info className="w-3.5 h-3.5 text-blue-400" />
                            {item.statusLabel}
                          </span>
                        )}
                        {item.status === 'aligned' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            {item.statusLabel}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedSkillModal(item)}
                          className="inline-flex items-center text-xs font-mono font-semibold text-accent hover:text-accent-hover hover:underline"
                        >
                          View Cohort Spread
                          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Actionable Intervention Recommendation Card */}
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full w-fit shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                ⚡ Automated Academic Intervention Recommendation
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                Trigger: 8 Active Opportunities Locked
              </span>
            </div>

            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-100">
                Bridge the SQL Gap for 42 MCA Students
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed font-light">
                42 MCA students currently lack Level 3 SQL proficiency required by 8 active campus hiring opportunities. Scheduling an intensive 2-day SQL Bootcamp will unlock eligibility for an estimated 38 student placements.
              </p>
            </div>

            {/* Interactive Schedule Button & Status */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              {!bootcampScheduled ? (
                <button
                  onClick={() => setBootcampScheduled(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule 2-Day SQL Bootcamp
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-xl text-emerald-200">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>✓ Workshop Scheduled: Sep 14–15, 2026. Automated notification dispatched to 42 students.</span>
                  </div>
                  <button
                    onClick={() => setBootcampScheduled(false)}
                    className="text-xs text-zinc-400 hover:text-white underline sm:ml-auto"
                  >
                    Modify / Undo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal: Anonymous Skill Level Distribution */}
        {selectedSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-zinc-950 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/10 space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">
                    {selectedSkillModal.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Anonymized Level Distribution ({selectedCohort})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSkillModal(null)}
                  className="w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 py-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400 font-semibold mb-1">
                  <span>Proficiency Anchor</span>
                  <span>Students</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-zinc-300 font-medium">Level 0: Not Demonstrated / Missing</span>
                    <span className="font-bold text-amber-400">28 students</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-zinc-300 font-medium">Level 1: Basic Single-Table Queries</span>
                    <span className="font-bold text-amber-400">14 students</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-zinc-300 font-medium">Level 2: Routine Multi-Table Joins</span>
                    <span className="font-bold text-blue-400">22 students</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-emerald-300 font-semibold">Level 3: Edge Cases, Deduplication &amp; NULLs (Benchmark)</span>
                    <span className="font-bold text-emerald-400">36 students</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                    <span className="text-zinc-300 font-medium">Level 4: Advanced Performance &amp; Window Functions</span>
                    <span className="font-bold text-zinc-100">20 students</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedSkillModal(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

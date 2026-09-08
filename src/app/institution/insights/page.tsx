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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-surface p-6 rounded-2xl border border-border shadow-xs">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accreditation Ready • NAAC / NBA Aligned
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-accent border border-blue-100">
                Live Cohort Feed
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Institutional Intelligence & Curriculum Insights
            </h1>
            <p className="text-sm text-text-secondary mt-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-text-secondary" />
              Demo College of Computing • <span className="font-semibold text-text-primary">{selectedCohort}</span> ({isSmallCohort ? '4 Enrolled Students' : '120 Enrolled Students'})
            </p>
          </div>

          {/* Quick Actions / Filters Header */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 bg-canvas px-3 py-2 rounded-xl border border-border text-xs text-text-secondary font-medium">
              <Filter className="w-3.5 h-3.5" />
              <span>Cohort:</span>
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="bg-transparent text-text-primary font-semibold focus:outline-none cursor-pointer"
              >
                <option value="MCA 2026">MCA Cohort 2026 (120)</option>
                <option value="B.Tech CS 2026">B.Tech CS 2026 (85)</option>
                <option value="Small Cohort Demo">B.Tech AI-DS 2026 (4 - Small Group)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 bg-canvas px-3 py-2 rounded-xl border border-border text-xs text-text-secondary font-medium">
              <Layers className="w-3.5 h-3.5" />
              <span>Target Role:</span>
              <select
                value={selectedOpportunity}
                onChange={(e) => setSelectedOpportunity(e.target.value)}
                className="bg-transparent text-text-primary font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Junior Data Analyst Intern">Junior Data Analyst Intern (Sample Analytics)</option>
                <option value="Associate Full-Stack Intern">Associate Full-Stack Intern (Example Web Lab)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Small Group Privacy Guard Banner (T-17 Verification) */}
        {isSmallCohort && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-900 shadow-xs animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm">Privacy Guard Triggered: Small-Group Cohort (&lt; 5 Students)</h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                In production, cohorts with fewer than 5 students are suppressed from public breakdown tables to prevent deanonymization of individual learners. Showing synthetic demo watermark.
              </p>
            </div>
          </div>
        )}

        {/* 4 KPI Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Enrolled Students */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Enrolled Students</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {isSmallCohort ? '4' : '120'}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isSmallCohort ? '4 Active on ProofBridge' : '94 Active on ProofBridge'}
              </div>
            </div>
          </div>

          {/* Card 2: Human-Verified Attainments */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Verified Attainments</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {isSmallCohort ? '11' : '342'}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg w-fit">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +28 this week
              </div>
            </div>
          </div>

          {/* Card 3: Placement Readiness */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Placement Readiness</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">64%</div>
              <div className="mt-2 text-xs font-medium text-slate-500">
                Based on 14 Target Employer Roles
              </div>
            </div>
          </div>

          {/* Card 4: Critical Deficit Alert */}
          <div className="bg-white rounded-2xl border border-amber-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Critical Deficit Alert</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-amber-900 tracking-tight flex items-center gap-2">
                SQL
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  P0 Deficit
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 w-fit">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                42% of cohort below Level 3 benchmark
              </div>
            </div>
          </div>

        </div>

        {/* Section 1: Cohort Skill Gap Breakdown Table */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-text-primary tracking-tight">
                  Industry Benchmark vs Cohort Attainment Level
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Role: {selectedOpportunity}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Aggregated evidence across verified student challenges mapped to employer requirements.
              </p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <Info className="w-4 h-4 text-slate-400" />
              Levels 0–4 anchored against employer rubrics
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas border-b border-border text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">Skill &amp; Category</th>
                  <th scope="col" className="px-6 py-4">Industry Target</th>
                  <th scope="col" className="px-6 py-4">Cohort Avg</th>
                  <th scope="col" className="px-6 py-4">Deficit Metric</th>
                  <th scope="col" className="px-6 py-4">Status &amp; Risk</th>
                  <th scope="col" className="px-6 py-4 text-right">Drilldown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {skillGaps.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-text-primary">{item.name}</div>
                        <div className="text-xs text-text-secondary mt-0.5">{item.category}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          Level {item.industryTarget}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-text-primary text-sm">
                            Level {item.cohortAvg}
                          </span>
                          <span className="text-xs text-slate-400">/ 4.0</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold text-sm ${
                              item.deficitPct < -20
                                ? 'text-amber-600'
                                : item.deficitPct < 0
                                ? 'text-blue-600'
                                : 'text-emerald-600'
                            }`}
                          >
                            {item.deficitPct}%
                          </span>
                          <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.deficitPct < -20
                                  ? 'bg-amber-500'
                                  : item.deficitPct < 0
                                  ? 'bg-blue-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.max(100 + item.deficitPct, 15)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {item.status === 'high_risk' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            {item.statusLabel}
                          </span>
                        )}
                        {item.status === 'moderate' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            <Info className="w-3.5 h-3.5 text-blue-600" />
                            {item.statusLabel}
                          </span>
                        )}
                        {item.status === 'aligned' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            {item.statusLabel}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedSkillModal(item)}
                          className="inline-flex items-center text-xs font-semibold text-accent hover:text-accent-hover hover:underline"
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
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-700/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold tracking-wider uppercase bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full w-fit">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                ⚡ Automated Academic Intervention Recommendation
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Trigger: 8 Active Opportunities Locked
              </span>
            </div>

            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Bridge the SQL Gap for 42 MCA Students
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                42 MCA students currently lack Level 3 SQL proficiency required by 8 active campus hiring opportunities. Scheduling an intensive 2-day SQL Bootcamp will unlock eligibility for an estimated 38 student placements.
              </p>
            </div>

            {/* Interactive Schedule Button & Status */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              {!bootcampScheduled ? (
                <button
                  onClick={() => setBootcampScheduled(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
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
                    className="text-xs text-slate-400 hover:text-white underline sm:ml-auto"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-border space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-primary">
                    {selectedSkillModal.name}
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Anonymized Level Distribution ({selectedCohort})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSkillModal(null)}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 py-2 text-xs">
                <div className="flex justify-between text-slate-500 font-semibold mb-1">
                  <span>Proficiency Anchor</span>
                  <span>Students</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-700 font-medium">Level 0: Not Demonstrated / Missing</span>
                    <span className="font-bold text-amber-600">28 students</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-700 font-medium">Level 1: Basic Single-Table Queries</span>
                    <span className="font-bold text-amber-600">14 students</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-700 font-medium">Level 2: Routine Multi-Table Joins</span>
                    <span className="font-bold text-blue-600">22 students</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-900 font-semibold">Level 3: Edge Cases, Deduplication &amp; NULLs (Benchmark)</span>
                    <span className="font-bold text-emerald-700">36 students</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-700 font-medium">Level 4: Advanced Performance &amp; Window Functions</span>
                    <span className="font-bold text-slate-800">20 students</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end">
                <button
                  onClick={() => setSelectedSkillModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Users,
  Building,
  GraduationCap,
  LineChart,
  Sparkles,
  Award,
  Zap,
  Lock,
  ChevronRight,
  Sliders,
  Check,
  Code2
} from 'lucide-react';

export default function HomePage() {
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);

  // Dynamic calculation for the interactive hero widget
  const baselineScore = 61;
  const currentScore = hasVerifiedSql ? 96 : 61;

  return (
    <AppShell>
      <div className="space-y-20 py-4 max-w-6xl mx-auto">
        {/* ============================================================= */}
        {/* 1. HERO SECTION: Minimal, High-Impact & Typographic          */}
        {/* ============================================================= */}
        <section className="relative text-center max-w-3xl mx-auto space-y-6 pt-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/90 text-xs font-semibold text-zinc-700 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>IIC 3.0 MUJ • EVIDENCE-BASED TALENT INFRASTRUCTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-900 tracking-tight leading-[1.08]">
            Skills Proven,{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Not Claimed.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed font-normal">
            ProofBridge replaces resume buzzwords and black-box ATS keyword screening with an auditable proof loop:
            students submit authentic challenge code, accredited faculty evaluate with anchored rubrics, and employers hire with verified conviction.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="px-6 py-3 rounded-xl bg-zinc-900 text-white font-semibold text-xs sm:text-sm hover:bg-zinc-800 shadow-sm flex items-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <span>Explore Opportunity Match Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/student"
              className="px-6 py-3 rounded-xl bg-white text-zinc-700 border border-zinc-200 font-semibold text-xs sm:text-sm hover:bg-zinc-50 hover:border-zinc-300 shadow-xs transition-all"
            >
              Launch Student Workspace
            </Link>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 2. LIVE HERO INTERACTIVE SIMULATION (The "Aha!" Moment)      */}
        {/* ============================================================= */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Live Mathematical Engine (coverage-v1)
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-xs text-zinc-400 font-mono">Meera Patel vs Junior Data Analyst</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mt-1">
                Deterministic Score Leap Demonstration
              </h2>
            </div>

            {/* Interactive Toggle Pill */}
            <div className="flex items-center space-x-3 bg-zinc-100/90 p-1.5 rounded-xl border border-zinc-200/80">
              <span className="text-xs font-semibold text-zinc-600 pl-2">Simulate SQL Review:</span>
              <button
                type="button"
                onClick={() => setHasVerifiedSql(!hasVerifiedSql)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 ${
                  hasVerifiedSql
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-white text-zinc-800 border border-zinc-200'
                }`}
              >
                {hasVerifiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>SQL L3 Verified (+35 pts)</span>
                  </>
                ) : (
                  <span>Pending Review (0 pts)</span>
                )}
              </button>
            </div>
          </div>

          {/* Progress Visualizer */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-zinc-600">Candidate Reviewed Match:</span>
                <span className="text-2xl font-black font-mono text-zinc-900">{currentScore}%</span>
                {hasVerifiedSql && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    +35% Leap
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Formula: &Sigma; min(level / required, 1.0) &times; weight
              </span>
            </div>

            <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200/60">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  hasVerifiedSql
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${currentScore}%` }}
              />
            </div>
          </div>

          {/* 4-Skill Weighted Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-zinc-50/80 rounded-xl p-3 border border-zinc-200/60">
              <div className="flex justify-between text-[11px] font-semibold text-zinc-500">
                <span>Spreadsheets (L3)</span>
                <span className="text-emerald-600">25 pts</span>
              </div>
              <div className="text-xs font-bold text-zinc-800 mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Level 3</span>
              </div>
            </div>

            <div className="bg-zinc-50/80 rounded-xl p-3 border border-zinc-200/60">
              <div className="flex justify-between text-[11px] font-semibold text-zinc-500">
                <span>Communication (L4)</span>
                <span className="text-blue-600">12 pts</span>
              </div>
              <div className="text-xs font-bold text-zinc-800 mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Partial (3/4 &times; 16)</span>
              </div>
            </div>

            <div className="bg-zinc-50/80 rounded-xl p-3 border border-zinc-200/60">
              <div className="flex justify-between text-[11px] font-semibold text-zinc-500">
                <span>Analytical Reasoning (L3)</span>
                <span className="text-emerald-600">24 pts</span>
              </div>
              <div className="text-xs font-bold text-zinc-800 mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Level 3</span>
              </div>
            </div>

            <div
              className={`rounded-xl p-3 border transition-all ${
                hasVerifiedSql
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/60 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex justify-between text-[11px] font-semibold">
                <span>SQL (L3 • 35% Wt)</span>
                <span className="font-bold">{hasVerifiedSql ? '35 pts' : '0 pts'}</span>
              </div>
              <div className="text-xs font-bold mt-1 flex items-center space-x-1">
                {hasVerifiedSql ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dr. Sharma Verified</span>
                  </>
                ) : (
                  <span>Actionable Gap</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 3. FOUR PERSONA WORKSPACES                                   */}
        {/* ============================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              4 Dedicated Persona Workspaces
            </h2>
            <p className="text-xs text-zinc-500">Experience the platform from each authenticated stakeholder perspective</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Student Card */}
            <Link
              href="/student"
              className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-zinc-300"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Student / Candidate</div>
                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-blue-600 transition-colors mt-0.5">
                    Evidence Passport
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Inspect Meera's verified skills, view missing role requirements, and submit code with mandatory contribution statements.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform border-t border-zinc-100 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>

            {/* Reviewer Card */}
            <Link
              href="/reviewer/queue"
              className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-zinc-300"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Faculty Reviewer</div>
                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-emerald-600 transition-colors mt-0.5">
                    Review Queue
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Evaluate student work artifacts side-by-side with anchored 4-level rubrics and publish tamper-proof attainments.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform border-t border-zinc-100 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>

            {/* Recruiter Card */}
            <Link
              href="/employer/opportunities"
              className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-zinc-300"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-violet-600 group-hover:text-white transition-all">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Industry Recruiter</div>
                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-violet-600 transition-colors mt-0.5">
                    Employer Hub
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Define weighted skill requirements (Job DNA) and screen applicants through freeze-frame verified evidence snapshots.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform border-t border-zinc-100 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>

            {/* College Card */}
            <Link
              href="/institution/insights"
              className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-zinc-300"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Dean & Academic Admin</div>
                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-amber-600 transition-colors mt-0.5">
                    College Insights
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Detect aggregate cohort skill deficits (e.g. -42% in SQL) and launch 2-day practical bootcamps before placements begin.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform border-t border-zinc-100 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 4. THE 6-STEP GOLDEN LOOP ARCHITECTURE                       */}
        {/* ============================================================= */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              The 6-Step Closed Loop
            </h2>
            <p className="text-xs text-zinc-500">How ProofBridge connects industry requirements to verified hiring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-sm text-zinc-900">Industry Job DNA</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Recruiters specify required skills, required proficiency levels (1–4), and percentage weights summing to 100%.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-sm text-zinc-900">Explainable Gap Detection</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Candidate sees their exact baseline score (61%) and knows precisely which missing skill blocks eligibility.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-sm text-zinc-900">Bounded Scoped Task</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Student solves a 2-hour realistic challenge (e.g., messy sales query) and declares AI usage with authentic contribution notes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-mono font-bold text-xs flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-sm text-zinc-900">Faculty Rubric Evaluation</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Accredited professors review submitted code against anchored 4-level rubrics with qualitative justifications.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-mono font-bold text-xs flex items-center justify-center">
                05
              </div>
              <h3 className="font-bold text-sm text-zinc-900">Atomic Score Leap (96%)</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Publishing attainment updates PostgreSQL, atomically granting the missing 35 points and moving coverage to 96%.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-mono font-bold text-xs flex items-center justify-center">
                06
              </div>
              <h3 className="font-bold text-sm text-zinc-900">Verified Evidence Shortlist</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Recruiters review frozen tamper-proof snapshots with verified code instead of screening unverified resumes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

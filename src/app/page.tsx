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
  Check,
  Code2,
  Terminal,
  Cpu,
  Fingerprint,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';

export default function HomePage() {
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);

  // Dynamic calculation for the interactive hero cockpit
  const currentScore = hasVerifiedSql ? 96 : 61;

  return (
    <AppShell>
      <div className="space-y-24 py-4 max-w-6xl mx-auto">
        {/* ============================================================= */}
        {/* 1. HERO SECTION: Electric Typography & Ambient Glow           */}
        {/* ============================================================= */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-10">
          {/* Glowing Beacon Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 text-xs font-semibold text-zinc-300 shadow-lg glow-pill-blue">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="tracking-wide">IIC 3.0 MUJ • OPEN INNOVATION FINALIST</span>
            <span className="text-zinc-600">•</span>
            <span className="text-blue-400 font-mono">PS-08</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            Skills Proven,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent glow-text-blue">
              Not Claimed.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Eliminate resume guessing and black-box ATS keyword scanning. ProofBridge connects industry job requirements directly to authentic challenge code, faculty-anchored rubrics, and deterministic math.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Explore Opportunity Match Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/student"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/15 font-semibold text-xs sm:text-sm hover:bg-zinc-800 hover:text-white transition-all"
            >
              Enter Student Workspace
            </Link>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 2. THE HERO SHOWCASE: Interactive Cyber Cockpit (The "Aha!")   */}
        {/* ============================================================= */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto space-y-6 border border-white/15 relative overflow-hidden">
          {/* Top Bar with Status and Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                  Engine: coverage-v1
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 font-mono">Candidate: Meera Patel vs Junior Data Analyst</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-1.5 tracking-tight flex items-center space-x-2">
                <span>Deterministic Score Leap Interactive Simulation</span>
              </h2>
            </div>

            {/* Interactive Simulation Switch */}
            <div className="flex items-center space-x-3 bg-zinc-950 p-2 rounded-xl border border-white/10 shadow-inner">
              <span className="text-xs font-semibold text-zinc-400 pl-2">Faculty Review:</span>
              <button
                type="button"
                onClick={() => setHasVerifiedSql(!hasVerifiedSql)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 shadow-sm ${
                  hasVerifiedSql
                    ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {hasVerifiedSql ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>SQL L3 Verified (+35 pts)</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Click to Publish SQL Review</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dual-Pane Cockpit: Code Viewer Left, Score Gauges Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Code & Proof Card (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-950/90 rounded-xl p-4 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-zinc-400">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="text-zinc-200 font-semibold">meera_deduplication.sql</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Fingerprint className="w-3 h-3" />
                  <span>SHA-256 Hash Verified</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="text-zinc-300 space-y-1 overflow-x-auto text-[11px] leading-relaxed py-1">
                <p className="text-zinc-500">-- 2-Hour Bounded Challenge: Clean Revenue Deduplication</p>
                <p><span className="text-purple-400">WITH</span> clean_orders <span className="text-purple-400">AS</span> (</p>
                <p className="pl-4"><span className="text-blue-400">SELECT</span> order_id, buyer_id, amount,</p>
                <p className="pl-8 text-cyan-300">ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn</p>
                <p className="pl-4"><span className="text-blue-400">FROM</span> raw_orders <span className="text-purple-400">WHERE</span> order_id <span className="text-purple-400">IS NOT NULL</span></p>
                <p>)</p>
                <p><span className="text-blue-400">SELECT</span> DATE_TRUNC(&apos;month&apos;, order_date), <span className="text-cyan-300">SUM</span>(amount) <span className="text-blue-400">AS</span> net_revenue</p>
                <p><span className="text-blue-400">FROM</span> clean_orders <span className="text-purple-400">WHERE</span> rn = 1 <span className="text-purple-400">AND</span> amount &gt; 0;</p>
              </div>

              {/* Faculty Review Seal */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-2 text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dr. Alok Sharma (Associate Professor, CS)</span>
                </div>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Level 3 (Proficient)
                </span>
              </div>
            </div>

            {/* Right: Score Radar & Metric Gauge (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-950/90 rounded-xl p-5 border border-white/10 space-y-5 text-center sm:text-left">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Reviewed Match Score
                </span>
                <span className="text-xs font-mono text-zinc-500">Weight: 100% Total</span>
              </div>

              {/* Huge Jumping Score */}
              <div className="flex items-baseline space-x-3">
                <span
                  className={`text-6xl font-black font-mono tracking-tight transition-all duration-500 ${
                    hasVerifiedSql ? 'text-emerald-400 glow-text-emerald' : 'text-blue-400 glow-text-blue'
                  }`}
                >
                  {currentScore}%
                </span>
                <div className="text-xs text-left">
                  {hasVerifiedSql ? (
                    <span className="inline-block font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px]">
                      +35% Leap (SQL Level 3)
                    </span>
                  ) : (
                    <span className="inline-block font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded text-[11px]">
                      Gap: SQL Missing (35 pts)
                    </span>
                  )}
                  <span className="block text-zinc-500 text-[10px] mt-0.5 font-mono">coverage-v1 formula</span>
                </div>
              </div>

              {/* Glowing Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      hasVerifiedSql
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-lg shadow-emerald-500/30'
                        : 'bg-blue-500 shadow-lg shadow-blue-500/30'
                    }`}
                    style={{ width: `${currentScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>Baseline: 61%</span>
                  <span className="text-emerald-400">Target: 96%</span>
                </div>
              </div>

              {/* Status Callout */}
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed transition-colors ${
                  hasVerifiedSql
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                    : 'bg-zinc-900 border-white/10 text-zinc-300'
                }`}
              >
                {hasVerifiedSql ? (
                  <p className="flex items-center space-x-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Shortlist Ready:</strong> Candidate meets all 4 weighted requirements with signed proof.</span>
                  </p>
                ) : (
                  <p className="flex items-center space-x-1.5 font-medium text-zinc-400">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Gap Actionable:</strong> Completing SQL task unlocks the 35 points needed for eligibility.</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 4-Skill Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-zinc-900/80 rounded-xl p-3.5 border border-white/10 space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Spreadsheets (L3)</span>
                <span className="text-emerald-400 font-bold">+25 pts</span>
              </div>
              <div className="text-xs font-bold text-zinc-200 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified (25/25)</span>
              </div>
            </div>

            <div className="bg-zinc-900/80 rounded-xl p-3.5 border border-white/10 space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Communication (L4)</span>
                <span className="text-blue-400 font-bold">+12 pts</span>
              </div>
              <div className="text-xs font-bold text-zinc-200 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Partial (3/4 &times; 16)</span>
              </div>
            </div>

            <div className="bg-zinc-900/80 rounded-xl p-3.5 border border-white/10 space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Reasoning (L3)</span>
                <span className="text-emerald-400 font-bold">+24 pts</span>
              </div>
              <div className="text-xs font-bold text-zinc-200 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified (24/24)</span>
              </div>
            </div>

            <div
              className={`rounded-xl p-3.5 border space-y-1 transition-all ${
                hasVerifiedSql
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
              }`}
            >
              <div className="flex justify-between text-[11px] font-mono">
                <span>SQL (L3 • 35% Wt)</span>
                <span className="font-bold">{hasVerifiedSql ? '+35 pts' : '0 pts'}</span>
              </div>
              <div className="text-xs font-bold flex items-center space-x-1">
                {hasVerifiedSql ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Level 3</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Actionable Gap</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 3. FOUR PERSONA WORKSPACES: Obsidian Bento Grid              */}
        {/* ============================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              4 Specialized Role Workspaces
            </h2>
            <p className="text-xs text-zinc-400">Test-drive the full loop from every authenticated stakeholder perspective</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Student Card */}
            <Link
              href="/student"
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-blue-500/50"
            >
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20 group-hover:scale-105 transition-all">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Candidate</div>
                  <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors mt-0.5">
                    Evidence Passport
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Inspect verified skill badges, view missing job requirements, and submit code with mandatory contribution statements.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform border-t border-white/10 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>

            {/* Reviewer Card */}
            <Link
              href="/reviewer/queue"
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/50"
            >
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20 group-hover:scale-105 transition-all">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Faculty Reviewer</div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                    Review Queue
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Evaluate student code side-by-side with anchored 4-level rubrics and publish tamper-resistant attainments.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform border-t border-white/10 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>

            {/* Recruiter Card */}
            <Link
              href="/employer/opportunities"
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-violet-500/50"
            >
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold border border-violet-500/20 group-hover:scale-105 transition-all">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest">Industry Recruiter</div>
                  <h3 className="font-bold text-base text-white group-hover:text-violet-400 transition-colors mt-0.5">
                    Employer Hub
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Define weighted skill requirements (Job DNA) and screen applicants through freeze-frame verified evidence snapshots.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-violet-400 group-hover:translate-x-1 transition-transform border-t border-white/10 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>

            {/* College Card */}
            <Link
              href="/institution/insights"
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-amber-500/50"
            >
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20 group-hover:scale-105 transition-all">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">Dean & Academic Admin</div>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors mt-0.5">
                    College Insights
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Detect aggregate cohort skill deficits (e.g. -42% in SQL) and launch 2-day practical bootcamps before placements begin.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform border-t border-white/10 mt-4">
                <span>Enter Workspace</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 4. THE 6-STEP CLOSED LOOP ARCHITECTURE                        */}
        {/* ============================================================= */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-md mx-auto space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The 6-Step Closed Loop
            </h2>
            <p className="text-xs text-zinc-400">How ProofBridge bridges industry requirements to verified hiring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-sm text-white">Industry Job DNA</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Recruiters specify required skills, required proficiency levels (1–4), and percentage weights summing to 100%.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-sm text-white">Explainable Gap Detection</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Candidate sees their exact baseline score (61%) and knows precisely which missing skill blocks eligibility.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-sm text-white">Bounded Scoped Task</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Student solves a 2-hour realistic challenge (e.g., messy sales query) and declares AI usage with authentic contribution notes.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono font-bold text-xs flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-sm text-white">Faculty Rubric Evaluation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Accredited professors review submitted code against anchored 4-level rubrics with qualitative justifications.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-xs flex items-center justify-center">
                05
              </div>
              <h3 className="font-bold text-sm text-white">Atomic Score Leap (96%)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Publishing attainment updates PostgreSQL, atomically granting the missing 35 points and moving coverage to 96%.
              </p>
            </div>

            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold text-xs flex items-center justify-center">
                06
              </div>
              <h3 className="font-bold text-sm text-white">Verified Evidence Shortlist</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Recruiters review frozen tamper-proof snapshots with verified code instead of screening unverified resumes.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 5. ARCHITECTURAL COMPARISON: ProofBridge vs Traditional ATS   */}
        {/* ============================================================= */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why ProofBridge Outperforms Traditional Portals
            </h2>
            <p className="text-xs text-zinc-400">Deterministic proof vs Keyword ATS Guesswork</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-5 space-y-3">
              <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Traditional Placement Portal</span>
              </div>
              <ul className="text-xs text-zinc-400 space-y-2 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Unverified keyword-stuffed PDF resumes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Black-box ATS ranking that filters out non-keyword talent.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Recruiters spend &gt; ₹50,000 per hire doing 4 screening interviews.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">&times;</span>
                  <span>Colleges only find out about skill deficits after placements fail.</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3 shadow-lg glow-pill-emerald">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>ProofBridge Evidence Infrastructure</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&#10003;</span>
                  <span>Auditable, production-grade code artifacts backed by git proof.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&#10003;</span>
                  <span>Deterministic math (&Sigma; min(level/req, 1) &times; weight). Zero hallucinations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&#10003;</span>
                  <span>Recruiters inspect frozen evidence snapshots and hire with conviction.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&#10003;</span>
                  <span>College Dean detects cohort gaps (-42% SQL) months before placements.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

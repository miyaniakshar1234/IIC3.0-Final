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
  Award,
  Zap,
  Lock,
  Check,
  Terminal,
  Fingerprint,
  Cpu,
  Sparkles,
  Code2,
  Database,
  BarChart3,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);
  const currentScore = hasVerifiedSql ? 96 : 61;

  const pillars = [
    {
      num: '01',
      label: 'Evidence Engine',
      icon: FileCode,
      title: 'Verifiable Code Submissions',
      body: 'Students submit real code to time-boxed challenges. SHA-256 hashed, timestamped, immutable.',
      accent: 'text-info',
      border: 'border-info/20',
      bg: 'bg-info/5',
    },
    {
      num: '02',
      label: 'Human Rubric',
      icon: ShieldCheck,
      title: 'Faculty-Anchored Scoring',
      body: 'Named faculty reviewers bind scores to specific criteria. No opaque black-box ML scoring.',
      accent: 'text-success',
      border: 'border-success/20',
      bg: 'bg-success/5',
    },
    {
      num: '03',
      label: 'Match Engine',
      icon: Cpu,
      title: 'Deterministic Score Formula',
      body: 'Coverage score = Σ(weight × rubric_level) / Σ(weight × max_level). Pure math, auditable.',
      accent: 'text-accent',
      border: 'border-accent/20',
      bg: 'bg-accent/5',
    },
  ];

  const roles = [
    { href: '/student',              icon: GraduationCap, label: 'Student',         name: 'Meera Patel',     tag: 'MCA 2026',    desc: 'Build proof. Submit code. Track your verifiable score.',  color: 'text-info',    ring: 'ring-info/30' },
    { href: '/reviewer/queue',       icon: ShieldCheck,   label: 'Reviewer',        name: 'Dr. Alok Sharma', tag: 'CS Faculty',  desc: 'Evaluate evidence against rubric criteria.',              color: 'text-success', ring: 'ring-success/30' },
    { href: '/employer/opportunities',icon: Users,         label: 'Employer',        name: 'Neha Verma',      tag: 'Recruiter',   desc: 'Hire on verified proof, not polished resumes.',          color: 'text-accent',  ring: 'ring-accent/30' },
    { href: '/institution/insights', icon: Building,      label: 'College Dean',    name: 'Prof. Gupta',     tag: 'Dean · MUJ',  desc: 'Institutional analytics across placements and skills.',  color: 'text-warning', ring: 'ring-warning/30' },
  ];

  return (
    <AppShell>
      <div className="space-y-20 py-4 max-w-6xl mx-auto animate-fade-in">

        {/* ── 1. HERO ── */}
        <section className="relative text-center max-w-4xl mx-auto pt-8 space-y-7">
          {/* Section label */}
          <div className="flex justify-center">
            <div className="section-label animate-float">IIC 3.0 MUJ · Open Innovation · PS-08</div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-text-primary">
            Skills Proven,{' '}
            <span className="text-gradient-amber">Not Claimed.</span>
          </h1>

          <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Eliminate resume guessing and black-box ATS scanning. ProofBridge connects industry job requirements to authentic challenge code, faculty-anchored rubrics, and deterministic math.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="pb-btn-primary text-sm"
            >
              <Zap className="w-4 h-4" />
              Explore Match Engine
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/student" className="pb-btn-ghost text-sm">
              Enter Student Workspace
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-[11px]">
            {[
              { icon: Lock,       label: 'SHA-256 Proof Hashes' },
              { icon: ShieldCheck,label: 'Faculty-Attributed Scores' },
              { icon: Cpu,        label: 'Deterministic Formula' },
              { icon: Award,      label: 'No Resume Guesswork' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="pb-badge">
                <Icon className="w-3 h-3 text-accent" />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* ── 2. SCORE LEAP COCKPIT ── */}
        <section className="pb-card-accent soft-shimmer rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto overflow-hidden relative">
          {/* Ambient pulse */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5 mb-6">
            <div>
              <div className="section-label mb-1.5">Live Simulation · Coverage Engine v1</div>
              <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                Deterministic Score Leap Demo
              </h2>
              <p className="text-xs text-text-muted mt-0.5 font-mono">
                Meera Patel vs. Junior Data Analyst · Watch score update live
              </p>
            </div>

            {/* Toggle */}
            <button
              onClick={() => setHasVerifiedSql(!hasVerifiedSql)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md border ${
                hasVerifiedSql
                  ? 'bg-success/10 text-success border-success/30 shadow-success/10'
                  : 'bg-accent-soft text-accent border-border-accent shadow-accent/10 hover:bg-accent/20'
              }`}
            >
              {hasVerifiedSql
                ? <><Check className="w-4 h-4" /><span>SQL Level 3 Published ✓</span></>
                : <><Zap className="w-4 h-4" /><span>Click → Publish SQL Review</span></>
              }
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Code proof panel */}
            <div className="lg:col-span-7 bg-canvas rounded-xl p-4 border border-border font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  <span className="text-text-secondary font-semibold">meera_deduplication.sql</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                  <Fingerprint className="w-3 h-3" />
                  SHA-256 Verified
                </div>
              </div>

              <div className="text-text-secondary space-y-0.5 overflow-x-auto text-[11px] leading-relaxed">
                <p className="text-text-muted">-- 2-Hour Bounded Challenge: Clean Revenue Deduplication</p>
                <p><span className="text-info">WITH</span> clean_orders <span className="text-info">AS</span> (</p>
                <p className="pl-4"><span className="text-accent">SELECT</span> order_id, buyer_id, amount,</p>
                <p className="pl-8 text-success">ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn</p>
                <p className="pl-4"><span className="text-accent">FROM</span> raw_orders <span className="text-info">WHERE</span> order_id <span className="text-info">IS NOT NULL</span></p>
                <p>)</p>
                <p><span className="text-accent">SELECT</span> DATE_TRUNC(&apos;month&apos;, order_date), <span className="text-success">SUM</span>(amount) <span className="text-accent">AS</span> net_revenue</p>
                <p><span className="text-accent">FROM</span> clean_orders <span className="text-info">WHERE</span> rn = 1 <span className="text-info">AND</span> amount &gt; 0;</p>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  Dr. Alok Sharma (Assoc. Prof., CS)
                </div>
                <span className="font-bold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                  Level 3 · Proficient
                </span>
              </div>
            </div>

            {/* Score panel */}
            <div className="lg:col-span-5 bg-canvas rounded-xl p-5 border border-border space-y-5">
              <div className="flex justify-between items-center">
                <span className="section-label text-[10px]">Match Score</span>
                <span className="text-[10px] font-mono text-text-muted">coverage-v1</span>
              </div>

              {/* Big score */}
              <div className="flex items-baseline gap-3">
                <span className={`metric-value text-6xl transition-all duration-700 ${
                  hasVerifiedSql ? 'text-success' : 'text-accent'
                }`}>
                  {currentScore}%
                </span>
                <div className="text-xs">
                  {hasVerifiedSql
                    ? <span className="inline-block font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full text-[10px]">+35% SQL L3 Leap</span>
                    : <span className="inline-block font-bold text-warning bg-warning/10 border border-warning/20 px-2 py-0.5 rounded-full text-[10px]">Gap: SQL Missing</span>
                  }
                  <span className="block text-text-muted text-[10px] mt-0.5 font-mono">Σ(weight×level)/Σ(weight×max)</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-surface-raised rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${hasVerifiedSql ? 'bg-success' : 'bg-accent'}`}
                    style={{ width: `${currentScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-text-muted">
                  <span>0%</span><span>50%</span><span>100%</span>
                </div>
              </div>

              {/* Criteria breakdown */}
              <div className="space-y-2">
                {[
                  { label: 'Core SQL',     score: hasVerifiedSql ? 90 : 90, max: 100, active: true },
                  { label: 'SQL Adv. (L3)',score: hasVerifiedSql ? 100 : 0,  max: 100, active: hasVerifiedSql },
                  { label: 'Data Modelling',score: 80,                       max: 100, active: true },
                  { label: 'Explanation', score: hasVerifiedSql ? 85 : 85,  max: 100, active: true },
                ].map(({ label, score, active }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${active && score > 0 ? 'bg-success' : 'bg-border-bright'}`} />
                    <span className="text-[10px] font-mono text-text-secondary flex-1">{label}</span>
                    <span className={`text-[10px] font-mono font-bold ${score > 0 ? 'text-text-primary' : 'text-text-muted'}`}>
                      {score > 0 ? `${score}%` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. THREE PILLARS ── */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="section-label justify-center">The System</div>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              How ProofBridge Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map(({ num, label, icon: Icon, title, body, accent, border, bg }) => (
              <div key={num} className={`pb-card p-6 space-y-4 ${bg} ${border}`}>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${accent}`} />
                  </div>
                  <span className={`font-mono font-black text-3xl ${accent} opacity-30`}>{num}</span>
                </div>
                <div>
                  <div className={`section-label ${accent} mb-1`}>{label}</div>
                  <h3 className="text-base font-bold text-text-primary leading-tight">{title}</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. ROLE WORKSPACES ── */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="section-label justify-center">Four Workspaces</div>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Every Stakeholder, One Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map(({ href, icon: Icon, label, name, tag, desc, color, ring }) => (
              <Link
                key={href}
                href={href}
                className={`pb-card p-6 flex flex-col gap-4 group cursor-pointer ring-1 ring-transparent hover:${ring} transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-surface-raised border border-border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <div className="section-label mb-1">{label}</div>
                  <h3 className="text-sm font-bold text-text-primary">{name}</h3>
                  <span className="text-[10px] font-mono text-text-muted">{tag}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 5. FORMULA BENTO ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Formula card — spans 2 */}
          <div className="md:col-span-2 pb-card p-6 space-y-4">
            <div className="section-label">Score Formula</div>
            <h3 className="text-lg font-black text-text-primary">The Math Is The Trust</h3>
            <div className="bg-canvas rounded-xl p-4 font-mono text-sm space-y-1 border border-border">
              <p className="text-text-muted text-xs">-- coverage-v1 deterministic engine</p>
              <p className="text-accent">coverage_score</p>
              <p className="text-text-secondary pl-4">= <span className="text-success">SUM</span>(criterion_weight × reviewer_level)</p>
              <p className="text-text-secondary pl-4">/ <span className="text-success">SUM</span>(criterion_weight × max_level)</p>
              <p className="text-text-secondary pl-4">× 100</p>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              No ML, no LLM hallucination risk. Every point is traceable to a named faculty reviewer and a specific rubric criterion. The formula is deterministic: same inputs always produce the same score.
            </p>
          </div>

          {/* Stats card */}
          <div className="pb-card-accent p-6 space-y-5">
            <div className="section-label">System Stats</div>
            <div className="space-y-4">
              {[
                { label: 'SCORE LEAP',     value: '35%',  sub: '61% → 96% verified' },
                { label: 'RUBRIC LEVELS',  value: '4',    sub: 'Novice → Expert anchors' },
                { label: 'PROOF CHAIN',    value: 'SHA-256', sub: 'Immutable hash trail' },
                { label: 'TIME-BOXED',     value: '2 hrs', sub: 'Challenge duration' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="flex items-baseline justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <div className="text-[9px] font-mono font-bold tracking-widest text-text-muted uppercase">{label}</div>
                    <div className="text-[10px] text-text-secondary">{sub}</div>
                  </div>
                  <span className="metric-value text-xl text-accent">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FINAL CTA ── */}
        <section className="pb-card-accent rounded-2xl p-8 sm:p-12 text-center space-y-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-5">
            <div className="section-label justify-center">Start Here</div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
              Ready to see the leap?
            </h2>
            <p className="text-text-secondary text-sm max-w-xl mx-auto leading-relaxed">
              Watch the score jump from 61% to 96% in real time when faculty publishes a SQL Level 3 review. That&apos;s ProofBridge working exactly as designed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/opportunities/40000000-0000-0000-0000-000000000001" className="pb-btn-primary">
                <Zap className="w-4 h-4" />
                Watch 61% → 96% Live
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/student" className="pb-btn-ghost">
                <GraduationCap className="w-4 h-4" />
                Open Student Workspace
              </Link>
            </div>
          </div>
        </section>

      </div>
    </AppShell>
  );
}

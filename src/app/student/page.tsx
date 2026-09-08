'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusChip } from '@/components/student/StatusChip';
import {
  GraduationCap,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  Award,
  Zap,
  Terminal,
  Fingerprint
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [isEmptyAccount, setIsEmptyAccount] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Student Profile Data
  const student = {
    name: 'Meera Patel',
    avatarInitial: 'MP',
    program: 'MCA 2026',
    institution: 'Demo College of Computing',
    headline: 'Aspiring Data Analyst • 3 Verified Attainments',
  };

  // Primary Opportunity Target
  const targetOpportunity = {
    id: '40000000-0000-0000-0000-000000000001',
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    reviewedCoverage: 61,
    potentialCoverage: 96,
  };

  // Recommended Scoped Challenge
  const recommendedChallenge = {
    id: '50000000-0000-0000-0000-000000000001',
    title: 'Explain Monthly Sales from Messy Dataset',
    estimatedTime: '2 hours',
    skillCovered: 'SQL (Structured Query Language)',
    requiredLevel: 'Level 3/4',
    weight: 35,
    difficulty: 'Intermediate',
  };

  // Detailed Skill Breakdown for Coverage-v1 Formula
  const skillBreakdown = [
    {
      skill: 'Spreadsheets',
      requiredLevel: 3,
      reviewedLevel: 3,
      weight: 25,
      contribution: 25,
      formulaNote: '25 × min(3/3, 1) = 25 pts',
      status: 'reviewed' as const,
      reviewer: 'Dr. Alok Sharma',
      reviewedDate: 'Sep 06, 2026',
    },
    {
      skill: 'Written Communication',
      requiredLevel: 4,
      reviewedLevel: 3,
      weight: 16,
      contribution: 12,
      formulaNote: '16 × min(3/4, 1) = 12 pts',
      status: 'reviewed' as const,
      reviewer: 'Prof. Ananya Sen',
      reviewedDate: 'Sep 04, 2026',
    },
    {
      skill: 'Analytical Reasoning',
      requiredLevel: 3,
      reviewedLevel: 3,
      weight: 24,
      contribution: 24,
      formulaNote: '24 × min(3/3, 1) = 24 pts',
      status: 'reviewed' as const,
      reviewer: 'Dr. Alok Sharma',
      reviewedDate: 'Sep 02, 2026',
    },
    {
      skill: 'SQL',
      requiredLevel: 3,
      reviewedLevel: 0,
      weight: 35,
      contribution: 0,
      formulaNote: '35 × min(0/3, 1) = 0 pts',
      status: 'not-demonstrated' as const,
      isGap: true,
    },
  ];

  // Recent Human Review Feedback
  const recentFeedback = [
    {
      skill: 'Spreadsheets',
      level: 3,
      reviewer: 'Dr. Alok Sharma',
      date: 'Sep 06, 2026',
      challenge: 'Clean and Audit Financial Ledger CSV',
      notes: 'Demonstrates clean formulas, VLOOKUP, and pivot summaries with accurate error checking.',
    },
    {
      skill: 'Written Communication',
      level: 3,
      reviewer: 'Prof. Ananya Sen',
      date: 'Sep 04, 2026',
      challenge: 'Technical Briefing: Database Normalization Tradeoffs',
      notes: 'Clear structural organization and well-justified technical decisions.',
    },
  ];

  // Active Applications
  const activeApplications = [
    {
      id: 'app-001',
      role: 'Junior Data Analyst Intern',
      company: 'Sample Analytics Studio',
      statusLabel: 'Application Submitted',
      appliedDate: 'Sep 07, 2026',
      coverageAtApplication: '61%',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* 1. STUDENT IDENTITY & SUB-NAVIGATION BAR */}
        <div className="glass-card border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
              {student.avatarInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">{student.name}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {student.program}
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                {student.institution}
              </p>
            </div>
          </div>

          {/* Sub-Navigation Tabs: Linear Style */}
          <nav aria-label="Student Sub Navigation" className="flex items-center gap-1 self-start md:self-center bg-zinc-900/90 p-1 rounded-xl border border-white/10">
            <Link
              href="/student"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 text-white shadow-xs border border-white/15"
            >
              Dashboard
            </Link>
            <Link
              href="/student/passport"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition"
            >
              Evidence Passport
            </Link>
            <Link
              href="/student/applications"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition"
            >
              My Applications
            </Link>
          </nav>
        </div>

        {/* SIMULATION SWITCHER BANNER */}
        <div className="flex items-center justify-between bg-zinc-950/80 px-4 py-2.5 rounded-xl border border-white/10 text-xs text-zinc-400">
          <span className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-zinc-500">DEMO STATE:</span>
            <span className="text-white font-semibold">
              {isEmptyAccount ? 'Simulated New Student (0 Evidence)' : 'Meera Patel — 61% Baseline (Missing SQL)'}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setIsEmptyAccount(!isEmptyAccount)}
            className="text-blue-400 hover:text-blue-300 font-semibold text-xs transition"
          >
            {isEmptyAccount ? 'Switch back to Meera (61%)' : 'Simulate New/Empty Student'}
          </button>
        </div>

        {isEmptyAccount ? (
          /* EMPTY STATE (FOR UNVERIFIED / BRAND NEW STUDENT) */
          <div className="glass-card p-10 rounded-2xl border border-white/10 text-center max-w-2xl mx-auto space-y-4 my-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
              <Award className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white">Add Your First Evidence</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              ProofBridge replaces unverified resume claims with transparent, human-reviewed proof. Complete your first scoped challenge to start building your Evidence Passport.
            </p>
            <div className="pt-2">
              <Link
                href={`/challenges/${recommendedChallenge.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-500/20"
              >
                Start SQL Challenge (2 hours)
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 2. NEXT STEP HERO SECTION */}
            <section 
              aria-labelledby="hero-heading"
              className="glass-card text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-white/15 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/40"
            >
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>ACTIONABLE REQUIREMENT GAP</span>
                </div>

                <h2 id="hero-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                  Demonstrate <span className="text-blue-400">SQL</span> to increase your match for {targetOpportunity.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Current reviewed coverage is <span className="font-bold text-white font-mono">61%</span>. Completing the 2-hour SQL challenge addresses the missing 35-weight requirement and will bring reviewed coverage to <span className="font-bold text-emerald-400 font-mono">96%</span> upon faculty publication.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/challenges/${recommendedChallenge.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-blue-500/20"
                  >
                    Start SQL Challenge →
                  </Link>

                  <Link
                    href={`/opportunities/${targetOpportunity.id}`}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs sm:text-sm transition border border-white/10"
                  >
                    View Role Requirements
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. COVERAGE CARD & EXPLAINABLE BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT TWO COLUMNS: COVERAGE SUMMARY & EXPLAINABLE BREAKDOWN */}
              <div className="lg:col-span-2 space-y-6">
                {/* COVERAGE OVERVIEW CARD */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span>Role Match Baseline</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">
                        Reviewed Coverage for {targetOpportunity.title}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Opportunity at {targetOpportunity.employer}
                      </p>
                    </div>

                    {/* Coverage Number Block */}
                    <div className="flex items-baseline gap-2 bg-zinc-950 px-4 py-2.5 rounded-xl border border-white/10 self-start sm:self-center">
                      <span className="text-3xl font-black font-mono text-blue-400 glow-text-blue">61%</span>
                      <div className="text-[11px] text-zinc-400 font-medium leading-tight">
                        <span className="block font-bold text-white">Reviewed</span>
                        <span>Coverage</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-zinc-400">
                      <span>Current: 61% (3 Skills Reviewed)</span>
                      <span className="text-emerald-400 font-bold">Target with SQL: 96%</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-3.5 overflow-hidden border border-white/10 p-0.5">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg shadow-blue-500/30" 
                        style={{ width: '61%' }}
                      />
                    </div>
                  </div>

                  {/* Transparency Notice */}
                  <div className="p-3 bg-zinc-950/90 rounded-xl border border-white/10 text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-zinc-200">Explainability Notice:</strong> This coverage percentage is calculated deterministically from human-reviewed evidence mapped to employer skill weights. It is 100% auditable and free from generative hallucinations.
                    </span>
                  </div>
                </div>

                {/* 4. EXPLAINABLE COVERAGE BREAKDOWN */}
                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowCalculation(!showCalculation)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition border-b border-white/10"
                    aria-expanded={showCalculation}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          Explainable Coverage Breakdown (coverage-v1)
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Inspect how 61 points are derived across all 4 required role skills
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-blue-400">
                      <span>{showCalculation ? 'Hide Breakdown' : 'Show Calculation'}</span>
                      {showCalculation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {showCalculation && (
                    <div className="p-5 space-y-4 bg-zinc-950/60 animate-in fade-in duration-150">
                      <div className="text-xs text-zinc-400 leading-relaxed space-y-2 bg-zinc-950 p-3.5 rounded-xl border border-white/10">
                        <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-blue-400" />
                          <span>Deterministic Formula:</span>
                        </div>
                        <p className="font-mono text-cyan-300 text-[11px]">
                          contribution = weight × min(reviewed_level / required_level, 1)
                        </p>
                      </div>

                      {/* Skill Rows */}
                      <div className="divide-y divide-white/10 border border-white/10 rounded-xl bg-zinc-950/80 overflow-hidden">
                        {skillBreakdown.map((item, idx) => (
                          <div key={idx} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{item.skill}</span>
                                {item.isGap ? (
                                  <StatusChip status="not-demonstrated" />
                                ) : (
                                  <StatusChip 
                                    status="reviewed" 
                                    reviewerName={item.reviewer} 
                                    reviewedDate={item.reviewedDate} 
                                  />
                                )}
                              </div>
                              <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-3 font-mono text-[11px]">
                                <span>Required: <strong>Level {item.requiredLevel}/4</strong></span>
                                <span>•</span>
                                <span>Reviewed: <strong>{item.reviewedLevel > 0 ? `Level ${item.reviewedLevel}/4` : 'None'}</strong></span>
                                <span>•</span>
                                <span>Weight: <strong>{item.weight}%</strong></span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                              <span className="text-xs font-mono text-zinc-500 hidden md:inline">
                                {item.formulaNote}
                              </span>
                              <span className={`text-sm font-mono font-black px-2.5 py-1 rounded-lg ${
                                item.contribution > 0 
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              }`}>
                                {item.contribution} pts
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary Math Callout */}
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 text-xs text-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                        <span>
                          <strong>Total Score Calculation:</strong> 25 + 12 + 24 + 0 = <strong>61% reviewed coverage</strong>.
                        </span>
                        <span className="text-cyan-300 font-bold">
                          Adding SQL (35 pts) → 96%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. ACTIONABLE SQL GAP CARD */}
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold text-xs border border-amber-500/30">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>ACTIONABLE REQUIREMENT GAP</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-2">
                        SQL (Structured Query Language)
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Required for Junior Data Analyst Intern at Sample Analytics Studio
                      </p>
                    </div>

                    <div className="bg-zinc-950 px-3.5 py-2 rounded-xl border border-white/10 text-right self-start font-mono">
                      <span className="text-[10px] text-zinc-500 block uppercase">Weight</span>
                      <span className="text-lg font-black text-amber-400">35 Points</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="bg-zinc-950 p-3 rounded-xl border border-white/10">
                      <span className="text-zinc-500 block text-[10px]">REQUIRED LEVEL:</span>
                      <span className="font-bold text-white">Level 3 of 4</span>
                    </div>
                    <div className="bg-zinc-950 p-3 rounded-xl border border-white/10">
                      <span className="text-zinc-500 block text-[10px]">CURRENT STATUS:</span>
                      <span className="font-bold text-amber-400">Not demonstrated</span>
                    </div>
                    <div className="bg-zinc-950 p-3 rounded-xl border border-white/10">
                      <span className="text-zinc-500 block text-[10px]">EARNED CONTRIBUTION:</span>
                      <span className="font-bold text-zinc-500">0 Points</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-white">
                        {recommendedChallenge.title}
                      </h4>
                      <p className="text-xs text-zinc-400 flex items-center gap-2 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Est. Time: {recommendedChallenge.estimatedTime}</span>
                        <span>•</span>
                        <span>Difficulty: {recommendedChallenge.difficulty}</span>
                      </p>
                    </div>

                    <Link
                      href={`/challenges/${recommendedChallenge.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 shrink-0"
                    >
                      Start SQL Challenge →
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: ACTIVE APPLICATIONS & RECENT REVIEWS */}
              <div className="space-y-6">
                {/* ACTIVE APPLICATIONS CARD */}
                <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      <span>Active Applications</span>
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-500">1 Active</span>
                  </div>

                  <div className="space-y-3">
                    {activeApplications.map((app) => (
                      <div key={app.id} className="p-3.5 rounded-xl border border-white/10 bg-zinc-950/80 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-white">{app.role}</h4>
                            <p className="text-xs text-zinc-400">{app.company}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                            {app.statusLabel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-white/10 font-mono text-[11px]">
                          <span>Applied: {app.appliedDate}</span>
                          <span className="font-semibold text-white">Coverage: {app.coverageAtApplication}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/student/applications"
                    className="block text-center text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1 transition"
                  >
                    View Applications & Timeline →
                  </Link>
                </div>

                {/* RECENT HUMAN REVIEWS CARD */}
                <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Faculty Reviews</span>
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified
                    </span>
                  </div>

                  <div className="space-y-3">
                    {recentFeedback.map((fb, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-white/10 bg-zinc-950/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white">{fb.skill}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Level {fb.level} / 4
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 italic leading-relaxed">
                          &quot;{fb.notes}&quot;
                        </p>
                        <div className="pt-1">
                          <StatusChip status="reviewed" reviewerName={fb.reviewer} reviewedDate={fb.date} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/student/passport"
                    className="block text-center text-xs font-semibold text-blue-400 hover:text-blue-300 pt-1 transition"
                  >
                    Inspect Full Evidence Passport →
                  </Link>
                </div>

                {/* PROOFBRIDGE PHILOSOPHY CALLOUT */}
                <div className="p-4 rounded-2xl bg-zinc-950/90 border border-white/10 text-xs text-zinc-400 space-y-2">
                  <span className="font-bold text-zinc-200 block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    Human-Attributed Integrity
                  </span>
                  <p className="leading-relaxed text-[11px]">
                    Every score directly traces to a named faculty evaluator assessing a scoped challenge against anchored rubrics. Zero AI hallucinations.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

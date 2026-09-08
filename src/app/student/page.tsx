'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusChip } from '@/components/student/StatusChip';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  Award,
  BookOpen,
  GraduationCap,
  Building2,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileCheck2,
  Layers
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [showCalculation, setShowCalculation] = useState(true);
  const [isEmptyAccount, setIsEmptyAccount] = useState(false);

  // Student Demo Context
  const student = {
    name: 'Meera Patel',
    program: 'MCA 2026',
    institution: 'Demo College of Computing',
    avatarInitial: 'MP',
  };

  // Target Opportunity Data (Deterministic Demo Baseline)
  const targetOpportunity = {
    id: '40000000-0000-0000-0000-000000000001',
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    currentCoverage: 61,
    potentialCoverage: 96,
  };

  // Recommended SQL Challenge Data
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
      <div className="space-y-6">

        {/* 1. STUDENT IDENTITY & SUB-NAVIGATION BAR */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {student.avatarInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-text-primary tracking-tight">{student.name}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {student.program}
                </span>
              </div>
              <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {student.institution}
              </p>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <nav aria-label="Student Sub Navigation" className="flex items-center gap-1.5 self-start md:self-center bg-canvas p-1 rounded-xl border border-border">
            <Link
              href="/student"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-surface text-accent shadow-xs border border-border/50"
            >
              Dashboard
            </Link>
            <Link
              href="/student/passport"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface/60 transition"
            >
              Evidence Passport
            </Link>
            <Link
              href="/student/applications"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface/60 transition"
            >
              My Applications
            </Link>
          </nav>
        </div>

        {/* SIMULATION SWITCHER BANNER */}
        <div className="flex items-center justify-between bg-slate-100/90 px-4 py-2 rounded-xl border border-slate-200 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-text-primary">Demo State:</span>
            {isEmptyAccount ? 'Simulated New Student (0 Evidence)' : 'Meera Patel — 61% Baseline (Missing SQL)'}
          </span>
          <button
            type="button"
            onClick={() => setIsEmptyAccount(!isEmptyAccount)}
            className="text-accent hover:underline font-semibold text-xs"
          >
            {isEmptyAccount ? 'Switch back to Meera (61%)' : 'Simulate New/Empty Student'}
          </button>
        </div>

        {isEmptyAccount ? (
          /* EMPTY STATE (FOR UNVERIFIED / BRAND NEW STUDENT) */
          <div className="bg-surface p-10 rounded-2xl border border-border shadow-xs text-center max-w-2xl mx-auto space-y-4 my-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Add Your First Evidence</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              ProofBridge replaces unverified resume claims with transparent, human-reviewed proof. Complete your first scoped challenge to start building your Evidence Passport.
            </p>
            <div className="pt-2">
              <Link
                href={`/challenges/${recommendedChallenge.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent-hover transition shadow-sm"
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
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-slate-800"
            >
              <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold backdrop-blur-sm border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>ACTIONABLE NEXT STEP</span>
                </div>

                <h2 id="hero-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                  Demonstrate <span className="text-blue-400">SQL</span> to increase your match for {targetOpportunity.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Current reviewed coverage is <span className="font-bold text-white">61%</span>. Completing the 2-hour SQL challenge addresses the missing 35-weight requirement and could bring reviewed coverage to <span className="font-bold text-emerald-400">96%</span> after successful human review.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/challenges/${recommendedChallenge.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-sm transition shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Start SQL Challenge →
                  </Link>

                  <Link
                    href={`/opportunities/${targetOpportunity.id}`}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition border border-slate-700/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    View Role Requirements
                  </Link>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  * Note: Match score increases are not automated; they require rubric evaluation and publication by an assigned human reviewer.
                </p>
              </div>
            </section>

            {/* 3. COVERAGE CARD & EXPLAINABLE BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT TWO COLUMNS: COVERAGE SUMMARY & EXPLAINABLE BREAKDOWN */}
              <div className="lg:col-span-2 space-y-6">

                {/* COVERAGE OVERVIEW CARD */}
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <span>Role Match Baseline</span>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mt-1">
                        Reviewed Coverage for {targetOpportunity.title}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        Opportunity at {targetOpportunity.employer}
                      </p>
                    </div>

                    {/* Coverage Number Block */}
                    <div className="flex items-baseline gap-2 bg-canvas px-4 py-2.5 rounded-xl border border-border self-start sm:self-center">
                      <span className="text-3xl font-extrabold text-accent">61%</span>
                      <div className="text-[11px] text-text-secondary font-medium leading-tight">
                        <span className="block font-bold text-text-primary">Reviewed</span>
                        <span>Coverage</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-text-secondary">
                      <span>Current: 61% (3 Skills Reviewed)</span>
                      <span className="text-emerald-700 font-bold">Target with SQL: 96%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200 relative">
                      {/* Current 61% Bar */}
                      <div 
                        className="bg-accent h-full rounded-full transition-all duration-500 ease-out" 
                        style={{ width: '61%' }}
                      />
                    </div>
                  </div>

                  {/* Disclaimer & Transparency Note */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-text-secondary leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Explainability Notice:</strong> This coverage percentage is calculated deterministically from human-reviewed evidence mapped to employer skill weights. It does <em>not</em> represent probability of employment or a guaranteed interview.
                    </span>
                  </div>
                </div>

                {/* 4. EXPLAINABLE COVERAGE BREAKDOWN (ACCORDION / TABLE) */}
                <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowCalculation(!showCalculation)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-canvas/50 transition border-b border-border"
                    aria-expanded={showCalculation}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-5 h-5 text-accent" />
                      <div>
                        <h3 className="text-sm font-bold text-text-primary">
                          Explainable Coverage Breakdown (coverage-v1)
                        </h3>
                        <p className="text-xs text-text-secondary">
                          Inspect how 61 points are derived across all 4 required role skills
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-accent">
                      <span>{showCalculation ? 'Hide Breakdown' : 'Show Calculation'}</span>
                      {showCalculation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {showCalculation && (
                    <div className="p-5 space-y-4 bg-canvas/30 animate-in fade-in duration-150">
                      {/* Formula explanation in simple terms for judges */}
                      <div className="text-xs text-text-secondary leading-relaxed space-y-2 bg-surface p-3.5 rounded-xl border border-border">
                        <div className="font-semibold text-text-primary flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-accent" />
                          <span>Deterministic Formula:</span>
                        </div>
                        <p>
                          For each skill: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-800">contribution = weight × min(reviewed_level / required_level, 1)</code>
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Missing evidence yields 0 points. Skills reviewed at or above the required level earn full weight points.
                        </p>
                      </div>

                      {/* Skill Rows */}
                      <div className="divide-y divide-border border border-border rounded-xl bg-surface overflow-hidden">
                        {skillBreakdown.map((item, idx) => (
                          <div key={idx} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-text-primary">{item.skill}</span>
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
                              <div className="text-xs text-text-secondary flex flex-wrap items-center gap-3">
                                <span>Required: <strong>Level {item.requiredLevel}/4</strong></span>
                                <span>•</span>
                                <span>Reviewed: <strong>{item.reviewedLevel > 0 ? `Level ${item.reviewedLevel}/4` : 'None'}</strong></span>
                                <span>•</span>
                                <span>Weight: <strong>{item.weight}%</strong></span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                              <span className="text-xs font-mono text-slate-500 hidden md:inline">
                                {item.formulaNote}
                              </span>
                              <span className={`text-base font-extrabold px-2.5 py-1 rounded-lg ${
                                item.contribution > 0 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                {item.contribution} pts
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary Math Callout */}
                      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 text-xs text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span>
                          <strong>Total Score Calculation:</strong> 25 + 12 + 24 + 0 = <strong>61% reviewed coverage</strong>.
                        </span>
                        <span className="text-accent font-bold">
                          Adding SQL (35 pts) $\rightarrow$ 96%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. ACTIONABLE SQL GAP CARD */}
                <div className="bg-amber-50/50 border border-amber-300/80 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>ACTIONABLE REQUIREMENT GAP</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        SQL (Structured Query Language)
                      </h3>
                      <p className="text-xs text-slate-700 mt-1">
                        Required for Junior Data Analyst Intern at Sample Analytics Studio
                      </p>
                    </div>

                    <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-200 text-right self-start">
                      <span className="text-xs text-slate-500 font-medium block">Requirement Weight</span>
                      <span className="text-lg font-black text-amber-700">35 Points</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-amber-200/80">
                      <span className="text-slate-500 block">Required Level:</span>
                      <span className="font-bold text-slate-900">Level 3 of 4</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-200/80">
                      <span className="text-slate-500 block">Current Status:</span>
                      <span className="font-bold text-amber-800">Not yet demonstrated</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-200/80">
                      <span className="text-slate-500 block">Earned Contribution:</span>
                      <span className="font-bold text-slate-900">0 Points</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-slate-900">
                        {recommendedChallenge.title}
                      </h4>
                      <p className="text-xs text-slate-600 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Estimated Time: {recommendedChallenge.estimatedTime}</span>
                        <span>•</span>
                        <span>Difficulty: {recommendedChallenge.difficulty}</span>
                      </p>
                    </div>

                    <Link
                      href={`/challenges/${recommendedChallenge.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-blue-700 transition shadow-xs shrink-0"
                    >
                      Start SQL Challenge →
                    </Link>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: ACTIVE APPLICATIONS & RECENT HUMAN REVIEWS */}
              <div className="space-y-6">

                {/* ACTIVE APPLICATIONS CARD */}
                <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-accent" />
                      <span>Active Applications</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500">1 Active</span>
                  </div>

                  <div className="space-y-3">
                    {activeApplications.map((app) => (
                      <div key={app.id} className="p-3.5 rounded-xl border border-border bg-canvas space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-text-primary">{app.role}</h4>
                            <p className="text-xs text-text-secondary">{app.company}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 shrink-0">
                            {app.statusLabel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-slate-200">
                          <span>Applied: {app.appliedDate}</span>
                          <span className="font-semibold text-text-primary">Coverage: {app.coverageAtApplication}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/student/applications"
                    className="block text-center text-xs font-semibold text-accent hover:underline pt-1"
                  >
                    View All Applications & Timeline →
                  </Link>
                </div>

                {/* RECENT HUMAN REVIEWS CARD */}
                <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Recent Human Reviews</span>
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-700">Verified</span>
                  </div>

                  <div className="space-y-3">
                    {recentFeedback.map((fb, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-border bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-text-primary">{fb.skill}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                            Level {fb.level} / 4
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary italic leading-relaxed">
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
                    className="block text-center text-xs font-semibold text-accent hover:underline pt-1"
                  >
                    Inspect Full Evidence Passport →
                  </Link>
                </div>

                {/* PROOFBRIDGE PHILOSOPHY CALLOUT */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 text-xs text-text-secondary space-y-2">
                  <span className="font-bold text-text-primary block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    ProofBridge Principle
                  </span>
                  <p className="leading-relaxed">
                    ProofBridge does not certify general intelligence or employability. Every score directly traces to a named human evaluator assessing a scoped challenge against visible rubric anchors.
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

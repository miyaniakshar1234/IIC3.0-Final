'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  GraduationCap,
  ClipboardCheck,
  Briefcase,
  Building2,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Layers,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  HelpCircle,
  Code2,
  UserCheck,
  Play,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [judgeModalOpen, setJudgeModalOpen] = useState(false);
  const [judgeTab, setJudgeTab] = useState<'flow' | 'roles' | 'faq'>('flow');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setJudgeModalOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const workspaces = [
    { name: 'Student',          href: '/student',               icon: GraduationCap, persona: 'Meera Patel',    role: 'Candidate · MCA 2026', tag: 'Student' },
    { name: 'Reviewer',         href: '/reviewer/queue',        icon: ClipboardCheck, persona: 'Dr. Alok Sharma', role: 'Faculty Evaluator',   tag: 'Faculty' },
    { name: 'Employer',         href: '/employer/opportunities', icon: Briefcase,      persona: 'Neha Verma',     role: 'Lead Recruiter',      tag: 'Employer' },
    { name: 'College Insights', href: '/institution/insights',   icon: Building2,      persona: 'Prof. Gupta',    role: 'College Dean & Admin', tag: 'Dean' },
  ];

  let persona = { name: 'Meera Patel',     role: 'Student · MCA 2026',          initials: 'MP', ring: 'ring-info/40',    dot: 'bg-info',    roleKey: 'student' };
  if (pathname.startsWith('/reviewer'))    persona = { name: 'Dr. Alok Sharma', role: 'Faculty Reviewer · CS Dept',  initials: 'AS', ring: 'ring-success/40', dot: 'bg-success', roleKey: 'reviewer' };
  else if (pathname.startsWith('/employer'))  persona = { name: 'Neha Verma',       role: 'Sample Analytics Recruiter',  initials: 'NV', ring: 'ring-accent/40',  dot: 'bg-accent',  roleKey: 'employer' };
  else if (pathname.startsWith('/institution')) persona = { name: 'Prof. Gupta',   role: 'College Dean & Placement Dir', initials: 'PG', ring: 'ring-warning/40', dot: 'bg-warning', roleKey: 'institution' };

  const storySteps = [
    {
      num: '01',
      title: 'Student Gap Detection (61% Match)',
      role: 'Meera Patel (Student)',
      roleIcon: GraduationCap,
      roleColor: 'text-info',
      href: '/opportunities/40000000-0000-0000-0000-000000000001',
      summary: 'Meera targets Junior Data Analyst. Deterministic formula flags an exact 35% gap because SQL Level 3 is missing.',
      pitchTip: 'Traditional portals accept self-declared resume text. ProofBridge exposes unverified gaps until code is proven.',
    },
    {
      num: '02',
      title: 'Scoped 2-Hour Micro-Challenge',
      role: 'Meera Patel (Student)',
      roleIcon: Code2,
      roleColor: 'text-info',
      href: '/challenges/50000000-0000-0000-0000-000000000001',
      summary: 'Meera solves a time-boxed SQL deduplication challenge. Submission is hashed with SHA-256 for tamper resistance.',
      pitchTip: 'Not a 40-hour generic course. A 2-hour scoped challenge directly targeted to close the placement gap.',
    },
    {
      num: '03',
      title: 'Faculty Rubric Scoring & Publication',
      role: 'Dr. Alok Sharma (Faculty Evaluator)',
      roleIcon: ClipboardCheck,
      roleColor: 'text-success',
      href: '/reviewer/evaluations/60000000-0000-0000-0000-000000000001',
      summary: 'Dr. Sharma reviews authentic code against 4 transparent rubric criteria and publishes Level 3 Proficient.',
      pitchTip: 'Human faculty attribution eliminates ATS AI hallucinations. Scores are signed by named faculty.',
    },
    {
      num: '04',
      title: 'Deterministic Match Leap (61% → 96%)',
      role: 'Neha Verma (Employer Recruiter)',
      roleIcon: Briefcase,
      roleColor: 'text-accent',
      href: '/employer/opportunities/40000000-0000-0000-0000-000000000001/applicants',
      summary: 'Score recalculates atomically via coverage-v1. Meera leaps to 96% and recruiter Neha Verma shortlists her.',
      pitchTip: 'Recruiter hires on verifiable proof chains, shrinking candidate filtering time from weeks to minutes.',
    },
    {
      num: '05',
      title: 'Institutional Gap Remediation',
      role: 'Prof. Gupta (College Dean)',
      roleIcon: Building2,
      roleColor: 'text-warning',
      href: '/institution/insights',
      summary: 'Dean Gupta discovers 42 students share Meera’s SQL gap, triggering an automated 2-day bootcamp to unlock 38 placements.',
      pitchTip: 'Closes academia-industry loop: industry demand directly drives college curriculum remediation.',
    },
  ];

  const defenseQA = [
    {
      q: 'Without login, how are these details showing? Where is auth?',
      a: 'This demo runs in an active Sandbox Persona Switcher so the judging panel can evaluate all 4 user perspectives without 4 tedious login flows. In production, ProofBridge implements University SAML 2.0 / OAuth 2.0 SSO (Microsoft Entra ID / Google Workspace) with HttpOnly secure JWT cookies and strict RBAC route middleware.',
    },
    {
      q: 'What prevents students from generating code with ChatGPT?',
      a: 'Three robust defenses: (1) Challenges are strictly time-boxed to 2 hours with commit telemetry. (2) Human faculty conducts oral rubric viva or code review. (3) Rubric criteria test architectural trade-off justification, edge-case rationale, and data volume constraints, not just syntax.',
    },
    {
      q: 'Won’t faculty be overburdened by grading code submissions?',
      a: 'No, because ProofBridge does not assign sprawling semester projects. Challenges are micro-targeted only to missing requirement gaps. With 4 objective, discrete rubric anchors, faculty reviews take under 3 minutes per student submission.',
    },
    {
      q: 'How does this solve PS-08 better than LinkedIn or Unstop?',
      a: 'Existing platforms rely on unverified keyword resumes or easily cheated multiple-choice quizzes. ProofBridge builds an auditable skill graph linking immutable Git commit SHA-256 hashes → named human faculty rubric evaluations → deterministic employer matching formula (coverage-v1).',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary relative">
      {/* Dot grid ambient bg */}
      <div className="dot-grid" />
      <div className="ambient-bg pointer-events-none fixed inset-0 z-0" />

      {/* ── HEADER ── */}
      <header className="pb-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4 relative z-10">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-accent group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4 text-[var(--text-inverse)]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-[15px] text-text-primary tracking-tight group-hover:text-accent transition-colors">
                  ProofBridge
                </span>
                <span className="text-[10px] font-mono font-bold text-accent bg-accent-soft px-1.5 py-0.5 rounded border border-border-accent">
                  v1.0
                </span>
              </div>
            </Link>

            {/* Live beacon */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-medium text-text-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              <span className="text-text-primary font-semibold">IIC 3.0 MUJ</span>
              <span className="text-text-muted">·</span>
              <span className="font-mono text-accent">PS-08</span>
            </div>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-0.5 bg-surface p-1 rounded-xl border border-border shadow-sm">
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const active = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-accent' : 'text-text-muted'}`} />
                  <span>{ws.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">

            {/* ⚡ Mentor / Judge Tour CTA */}
            <button
              onClick={() => { setJudgeTab('flow'); setJudgeModalOpen(true); }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold text-accent bg-accent-soft hover:bg-accent/20 border border-border-accent transition-all shadow-sm group cursor-pointer"
              title="Open Mentor Review Walkthrough & Q&A Cockpit"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span className="hidden sm:inline">⚡ Judge Tour (60s)</span>
              <span className="sm:hidden">⚡ Tour</span>
            </button>

            {/* Match engine Leap CTA */}
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-text-secondary hover:text-accent bg-surface hover:bg-surface-raised border border-border transition-all shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-accent">61% → 96%</span>
            </Link>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:text-accent hover:border-border-accent transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />
              }
            </button>

            {/* Persona pill & switcher trigger */}
            <button
              onClick={() => { setJudgeTab('roles'); setJudgeModalOpen(true); }}
              className={`flex items-center gap-2 bg-surface hover:bg-surface-raised border border-border rounded-full py-1 pl-3 pr-1 ring-1 ${persona.ring} transition-all cursor-pointer group`}
              title="Click to switch persona or view sandbox auth details"
            >
              <div className="text-right hidden sm:block">
                <span className="text-[11px] font-semibold text-text-primary block leading-tight group-hover:text-accent transition-colors">
                  {persona.name}
                </span>
                <span className="text-[10px] text-text-muted block leading-tight">
                  {persona.role}
                </span>
              </div>
              <div className={`w-7 h-7 rounded-full ${persona.dot} bg-opacity-20 border border-[var(--border-bright)] flex items-center justify-center font-bold text-[10px] text-text-primary group-hover:scale-105 transition-transform`}>
                {persona.initials}
              </div>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-xl px-4 py-3 space-y-2">
            <div className="section-label px-3">Workspaces</div>
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const active = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active ? 'bg-surface-raised text-text-primary border border-border-bright' : 'text-text-secondary hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{ws.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted">{ws.persona}</span>
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileOpen(false); setJudgeTab('flow'); setJudgeModalOpen(true); }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-accent bg-accent-soft border border-border-accent"
              >
                <Sparkles className="w-4 h-4" />
                <span>⚡ Mentor 60s Demo Cockpit</span>
              </button>
              <div className="flex gap-2">
                <Link
                  href="/opportunities/40000000-0000-0000-0000-000000000001"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-text-secondary bg-surface border border-border"
                >
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <span>61% → 96% Match</span>
                </Link>
                <button
                  onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMobileOpen(false); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-text-secondary bg-surface border border-border"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Floating Mentor/Judge Quick Help Dock */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => { setJudgeTab('flow'); setJudgeModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-raised border border-border-accent text-accent font-bold text-xs shadow-2xl hover:scale-105 transition-all hover:bg-accent hover:text-[var(--text-inverse)] group backdrop-blur-md cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-accent group-hover:text-[var(--text-inverse)] animate-pulse" />
          <span>⚡ Mentor Review Guide & Q&A</span>
        </button>
      </div>

      {/* ── MENTOR & JUDGE MODAL COCKPIT ── */}
      {judgeModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setJudgeModalOpen(false)}
        >
          <div
            className="pb-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-border-accent animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-border bg-surface-raised flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="section-label">IIC 3.0 MUJ · PS-08</span>
                  <span className="text-[10px] font-mono font-bold text-accent bg-accent-soft px-2 py-0.5 rounded-full border border-border-accent">
                    Sandbox Mode Active
                  </span>
                </div>
                <h2 className="text-xl font-black text-text-primary tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Mentor Review Cockpit
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Your 60-second live walkthrough, 1-click persona switcher, and tough mentor defense cheat sheet.
                </p>
              </div>
              <button
                onClick={() => setJudgeModalOpen(false)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-5 pt-3 pb-2 border-b border-border bg-surface/50 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setJudgeTab('flow')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                  judgeTab === 'flow'
                    ? 'bg-accent-soft text-accent border-border-accent shadow-sm'
                    : 'text-text-secondary hover:text-text-primary border-transparent hover:bg-surface'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>60s Demo Flow (61% → 96%)</span>
              </button>
              <button
                onClick={() => setJudgeTab('roles')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                  judgeTab === 'roles'
                    ? 'bg-accent-soft text-accent border-border-accent shadow-sm'
                    : 'text-text-secondary hover:text-text-primary border-transparent hover:bg-surface'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Persona Switcher (4 Roles)</span>
              </button>
              <button
                onClick={() => setJudgeTab('faq')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                  judgeTab === 'faq'
                    ? 'bg-accent-soft text-accent border-border-accent shadow-sm'
                    : 'text-text-secondary hover:text-text-primary border-transparent hover:bg-surface'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Mentor Defense Q&A</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">

              {/* TAB 1: 60s Demo Flow */}
              {judgeTab === 'flow' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-accent-soft/40 border border-border-accent text-accent text-xs flex items-start gap-2.5">
                    <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">The Core 60-Second Demo Story:</span> Follow these 5 clicks in order. You prove how an unverified student skill gap is closed through authentic code proof and faculty evaluation, unlocking an instant placement shortlist!
                    </div>
                  </div>

                  <div className="space-y-3">
                    {storySteps.map((step) => {
                      const Icon = step.roleIcon;
                      return (
                        <div
                          key={step.num}
                          className="p-4 rounded-xl pb-card border border-border hover:border-border-bright transition-all space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono font-bold text-accent bg-accent-soft px-2 py-0.5 rounded text-[11px] border border-border-accent">
                                STEP {step.num}
                              </span>
                              <span className="font-bold text-text-primary text-sm">
                                {step.title}
                              </span>
                            </div>
                            <Link
                              href={step.href}
                              onClick={() => setJudgeModalOpen(false)}
                              className="pb-btn-primary text-[11px] py-1.5 px-3"
                            >
                              <span>Jump to Step</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-text-secondary">
                            <Icon className={`w-3.5 h-3.5 ${step.roleColor}`} />
                            <span className="font-medium text-text-primary">{step.role}</span>
                            <span className="text-text-muted">·</span>
                            <span>{step.summary}</span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-surface-raised border border-border text-[11px] text-text-secondary font-mono leading-relaxed">
                            <span className="text-accent font-semibold">🗣️ Say to Mentor: </span>
                            {step.pitchTip}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Persona Switcher */}
              {judgeTab === 'roles' && (
                <div className="space-y-4">
                  {/* Auth clarification banner */}
                  <div className="p-3.5 rounded-xl bg-surface-raised border border-border space-y-1.5">
                    <div className="flex items-center gap-2 text-accent font-bold text-xs">
                      <Lock className="w-4 h-4" />
                      <span>Role-Based Zero-Auth Sandbox Simulation</span>
                    </div>
                    <p className="text-text-secondary text-[11px] leading-relaxed">
                      To give hackathon mentors and judges zero friction, authentication is bypassed in this evaluation sandbox. In production, ProofBridge implements University SAML 2.0 / OAuth 2.0 SSO (Microsoft Entra ID / Google Workspace) with HttpOnly secure JWT cookies and RBAC route middleware.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {workspaces.map((ws) => {
                      const Icon = ws.icon;
                      const isCurrent = (ws.href === '/student' && persona.roleKey === 'student') ||
                                        (ws.href.startsWith('/reviewer') && persona.roleKey === 'reviewer') ||
                                        (ws.href.startsWith('/employer') && persona.roleKey === 'employer') ||
                                        (ws.href.startsWith('/institution') && persona.roleKey === 'institution');

                      return (
                        <div
                          key={ws.name}
                          className={`p-4 rounded-xl border transition-all space-y-3 flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-surface-raised border-border-accent shadow-sm'
                              : 'bg-surface border-border hover:border-border-bright'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="w-9 h-9 rounded-xl bg-surface-raised border border-border flex items-center justify-center">
                                <Icon className="w-4 h-4 text-accent" />
                              </div>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent-soft text-accent border border-border-accent">
                                {ws.tag}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-text-primary text-sm">{ws.persona}</h3>
                              <p className="text-[11px] text-text-muted">{ws.role}</p>
                            </div>
                            <p className="text-[11px] text-text-secondary leading-relaxed">
                              {ws.name === 'Student' && 'Views skill match breakdown, takes scoped challenges, verifies code SHA-256.'}
                              {ws.name === 'Reviewer' && 'Inspects student code, scores against 4-level rubrics, publishes verifiable marks.'}
                              {ws.name === 'Employer' && 'Reviews applicants with verified code proof, shortlists top deterministic matches.'}
                              {ws.name === 'College Insights' && 'Analyzes cohort placement gaps, triggers automated 2-day faculty bootcamps.'}
                            </p>
                          </div>

                          <Link
                            href={ws.href}
                            onClick={() => setJudgeModalOpen(false)}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                              isCurrent
                                ? 'bg-success/15 text-success border border-success/30'
                                : 'pb-btn-primary'
                            }`}
                          >
                            {isCurrent ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active Persona</span>
                              </>
                            ) : (
                              <>
                                <span>Switch to {ws.persona.split(' ')[0]}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Mentor Defense Q&A */}
              {judgeTab === 'faq' && (
                <div className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-surface-raised border border-border text-text-secondary text-xs">
                    <span className="font-bold text-text-primary">💡 Mentor Review Advice:</span> Mentors love probing edge cases. Use these exact talking points if they ask about auth, AI cheating, faculty workload, or competitors.
                  </div>

                  <div className="space-y-3">
                    {defenseQA.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl pb-card border border-border space-y-2">
                        <div className="flex items-start gap-2 text-text-primary font-bold text-xs">
                          <HelpCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{item.q}</span>
                        </div>
                        <p className="text-text-secondary text-[11px] pl-6 leading-relaxed bg-surface-raised p-3 rounded-lg border border-border font-sans">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-surface-raised flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-text-muted text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>Deterministic Engine v1 · SHA-256 Proofs · Human Rubrics</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setJudgeModalOpen(false)}
                  className="pb-btn-ghost text-xs py-1.5 px-3 cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/opportunities/40000000-0000-0000-0000-000000000001"
                  onClick={() => setJudgeModalOpen(false)}
                  className="pb-btn-primary text-xs py-1.5 px-3"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Start 60s Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-canvas/80 backdrop-blur-xl py-5 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-text-muted gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-text-secondary">ProofBridge</span>
            <span className="text-text-muted">·</span>
            <span>IIC 3.0 MUJ Final Submission</span>
          </div>
          <div className="flex items-center gap-4 font-medium text-text-secondary">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Deterministic Engine (coverage-v1)</span>
            </span>
            <span className="text-text-muted">·</span>
            <span>Human-Attributed Rubrics</span>
            <span className="text-text-muted">·</span>
            <span>Tamper-Resistant Proof</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

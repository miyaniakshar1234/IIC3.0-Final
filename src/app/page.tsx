'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { 
  ShieldCheck, Target, Database, Zap, ArrowRight, 
  GraduationCap, Building2, Briefcase, FileCode, 
  CheckCircle2, Network, Lock, Globe, Award, Sparkles,
  TrendingUp, Code2, Terminal, Sliders, Check, BookOpen,
  Cpu, Layers, AlertCircle, ChevronRight, FileCheck
} from 'lucide-react';

const FADE_DOWN: any = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const FADE_UP: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const STAGGER: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'students' | 'employers' | 'institutions'>('students');

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-accent/30 flex flex-col font-sans overflow-x-hidden relative">
      
      {/* ── ARCHITECTURAL GRID & MATRIX DOTS ── */}
      <div className="bg-grid-pattern" />
      <div className="matrix-dots" />

      {/* ── AMBIENT GLOWING MESH ORBS ── */}
      <div className="ambient-glow-orbs">
        <div className="ambient-glow-orb-1" />
        <div className="ambient-glow-orb-2" />
        <div className="ambient-glow-orb-3" />
      </div>

      {/* ── CUSTOM LANDING NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-canvas/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-text-primary text-lg tracking-tight leading-none">ProofBridge</span>
              <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase mt-0.5">Trust Layer</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link 
              href="/verify" 
              className="hidden md:flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-surface border border-transparent hover:border-border"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Public Verifier</span>
            </Link>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            <Link 
              href="/auth/login" 
              className="text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </Link>

            <Link 
              href="/auth/signup" 
              className="pb-btn-primary py-2 px-4 sm:px-5 text-xs sm:text-sm group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16 relative z-10">
        
        {/* ── 🚀 HERO SECTION ── */}
        <section className="relative pt-20 pb-28 text-center flex flex-col items-center px-4 overflow-hidden">
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="space-y-8 flex flex-col items-center max-w-5xl mx-auto"
          >
            {/* Hackathon Badge */}
            <motion.div 
              variants={FADE_DOWN} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-accent bg-accent-soft text-accent text-xs font-mono shadow-[0_0_25px_rgba(var(--accent-rgb),0.2)]"
            >
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>IIC 3.0 MUJ EXCLUSIVE PROTOTYPE · THEME: EDTECH (PS-08)</span>
            </motion.div>
            
            <motion.h1 
              variants={FADE_DOWN} 
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-[1.08] max-w-4xl"
            >
              The Cryptographic <span className="text-gradient-amber">Trust Layer</span> for Skill Verification.
            </motion.h1>
            
            <motion.p 
              variants={FADE_DOWN} 
              className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed font-normal"
            >
              Replace self-reported resumes with mathematical proof. ProofBridge anchors real student engineering artifacts, maps them to employer capability genomes, and calculates the shortest path to employment.
            </motion.p>
            
            <motion.div 
              variants={FADE_DOWN} 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
            >
              <Link 
                href="/auth/signup" 
                className="w-full sm:w-auto pb-btn-primary px-8 py-3.5 text-sm font-bold shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link 
                href="/verify" 
                className="w-full sm:w-auto pb-btn-ghost px-7 py-3.5 text-xs sm:text-sm font-mono text-text-secondary border-border hover:border-border-accent hover:text-text-primary transition-all rounded-xl flex justify-center items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>Verify Live W3C Credential</span>
              </Link>
            </motion.div>

            {/* Quick stats banner */}
            <motion.div 
              variants={FADE_DOWN}
              className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl"
            >
              {[
                { label: 'AI Hallucination', value: '0%', sub: 'Deterministic scoring' },
                { label: 'Evaluation SLA', value: '< 24h', sub: 'Accredited faculty' },
                { label: 'Proof Standard', value: 'W3C', sub: 'JSON-LD + SHA-256' },
                { label: 'Match Precision', value: '100%', sub: 'coverage-v1 engine' },
              ].map((stat, i) => (
                <div key={i} className="pb-card p-3.5 text-center space-y-0.5 border-border">
                  <div className="metric-value text-xl sm:text-2xl text-accent">{stat.value}</div>
                  <div className="text-[11px] font-bold text-text-primary font-mono">{stat.label}</div>
                  <div className="text-[10px] text-text-muted">{stat.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── 🏢 INSTITUTIONAL TRUST TICKER ── */}
        <section className="border-y border-border bg-surface/50 py-6 overflow-hidden relative backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center space-y-3 max-w-7xl mx-auto px-6">
            <p className="text-[11px] font-mono font-bold text-text-muted tracking-widest uppercase text-center">
              Designed for Academic Institutions · Accreditation Bodies · Enterprise Hiring
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-14 text-text-muted font-mono text-xs font-semibold">
              <span className="flex items-center gap-2 text-text-secondary">
                <GraduationCap className="w-4 h-4 text-accent" /> Manipal University Jaipur (MUJ)
              </span>
              <span className="flex items-center gap-2 text-text-secondary">
                <Building2 className="w-4 h-4 text-info" /> NAAC A+ Accredited Framework
              </span>
              <span className="flex items-center gap-2 text-text-secondary">
                <Briefcase className="w-4 h-4 text-success" /> Sample Analytics Studio
              </span>
              <span className="flex items-center gap-2 text-text-secondary">
                <Lock className="w-4 h-4 text-warning" /> SHA-256 Digest Standard
              </span>
            </div>
          </div>
        </section>

        {/* ── ⚠️ THE PROBLEM STATEMENT (WHY PROOFBRIDGE MATTERS) ── */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <span className="section-label">The Broken Paradigm</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Why Traditional Resumes Are Dead
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
              In an era of generative AI, resumes can be fabricated in seconds. Employers spend hundreds of hours filtering noise, while qualified students remain invisible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Resume Inflation & Ghost Skills',
                desc: 'Over 78% of software engineering resumes contain exaggerated competencies. Keywords on paper do not translate to production competence.',
                badge: 'The Candidate Problem',
                badgeColor: 'text-danger bg-danger-soft border-danger/20',
                stat: '78%',
                statLabel: 'Contain Unverified Claims'
              },
              {
                title: 'Degree Detachment from Industry',
                desc: 'Transcripts show letter grades across broad theoretical courses, completely failing to signal modular, tool-specific mastery like SQL or Docker.',
                badge: 'The University Problem',
                badgeColor: 'text-warning bg-warning-soft border-warning/20',
                stat: '64%',
                statLabel: 'Curriculum Skills Gap'
              },
              {
                title: 'Screening Overload & Noise',
                desc: 'Recruiters drown in thousands of AI-tuned applications for single openings. Keyword filtering causes massive false positives and rejected top talent.',
                badge: 'The Employer Problem',
                badgeColor: 'text-info bg-info-soft border-info/20',
                stat: '42 hrs',
                statLabel: 'Wasted Screening per Hire'
              }
            ].map((item, idx) => (
              <div key={idx} className="pb-card p-6 sm:p-8 space-y-4 border-border flex flex-col justify-between">
                <div className="space-y-3">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-border flex items-baseline justify-between">
                  <span className="metric-value text-2xl text-text-primary">{item.stat}</span>
                  <span className="text-[11px] font-mono text-text-muted">{item.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 🧬 THE 4 PILLARS OF PROOFBRIDGE ── */}
        <section className="py-24 px-6 bg-surface/30 border-y border-border relative">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="section-label">Algorithmic Innovation</span>
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                The 4 Architectural Breakthroughs
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                ProofBridge is not another job board. It is an end-to-end cryptographic infrastructure connecting education directly to employment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: '01',
                  title: 'Skill Twin (Evidence-Backed Competence)',
                  summary: 'A continuously-updated digital twin of candidate competence. Unlike static resumes, every point in a Skill Twin points directly to an immutable code repository revision and human evaluation score.',
                  tech: 'SHA-256 Digest + PostgreSQL Immutable Audit Log',
                  icon: Cpu,
                  color: 'text-accent',
                  border: 'border-border-accent',
                  highlights: ['Frozen code revision snapshots', 'Explicit student contribution statements', 'Tooling & AI transparency disclosures']
                },
                {
                  id: '02',
                  title: 'Role Genome (Standardized Job DNA)',
                  summary: 'Employers specify opportunities as mathematical skill requirements with explicit target levels (L1-L4) and percentage weights, eliminating ambiguous job descriptions.',
                  tech: 'Multi-Factor Capability Vectors',
                  icon: Target,
                  color: 'text-info',
                  border: 'border-info/30',
                  highlights: ['Weighted rubric requirements', 'Role-specific threshold baselines', 'Zero keyword bias']
                },
                {
                  id: '03',
                  title: 'Bridge Me (Shortest Path Engine)',
                  summary: 'An algorithmic pathfinder calculating the highest-ROI challenges to close eligibility gaps. Tells candidates exactly: "Complete this 2-hour SQL challenge to leap from 61% to 96% match."',
                  tech: 'High-ROI Pathfinder + What-If Sandbox',
                  icon: TrendingUp,
                  color: 'text-success',
                  border: 'border-success/30',
                  highlights: ['Calculates highest-weight deficit', 'Direct sandbox scenario modeling', 'Instant role unlock projections']
                },
                {
                  id: '04',
                  title: 'Deterministic Rubric & Trust Anchors',
                  summary: 'AI never issues credentials autonomously. Multi-tiered rubrics are scored by qualified human faculty evaluators, forging a cryptographic Trust Anchor endorsed by university leadership.',
                  tech: 'W3C Standard JSON-LD Verifiable Credentials',
                  icon: ShieldCheck,
                  color: 'text-warning',
                  border: 'border-warning/30',
                  highlights: ['4-tier faculty rubric grading (L1-L4)', 'NAAC/NBA accreditation alignment', 'Public offline-verifiable proof hash']
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.id} className="pb-card p-6 sm:p-8 space-y-6 border-border hover:border-border-bright transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${pillar.color}`} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-text-muted">BREAKTHROUGH {pillar.id}</span>
                          <h3 className="text-base sm:text-lg font-bold text-text-primary leading-tight">{pillar.title}</h3>
                        </div>
                      </div>
                      <span className="metric-value text-xl text-text-muted">{pillar.id}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {pillar.summary}
                    </p>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">Core Capabilities:</span>
                      <ul className="space-y-1.5">
                        {pillar.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-text-secondary flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
                      <span>Tech: {pillar.tech}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 🧬 INTERACTIVE TRUST GRAPH ── */}
        <section className="relative w-full max-w-7xl mx-auto py-24 px-6">
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <span className="section-label">Cryptographic Provenance</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Forging the Unforgeable Proof Chain
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Every step from institutional endorsement to code submission and faculty grading is cryptographically linked and mathematically verifiable.
            </p>
          </div>

          <div className="relative pb-card p-6 sm:p-12 border-border overflow-hidden">
            <div className="relative h-64 sm:h-80 w-full flex items-center justify-center max-w-4xl mx-auto">
              {/* SVG Animated Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <motion.path
                  d="M 150,200 C 300,200 400,200 500,200"
                  stroke="rgba(212, 168, 83, 0.4)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
                <motion.path
                  d="M 500,200 C 600,200 700,200 850,200"
                  stroke="rgba(74, 222, 128, 0.4)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
              </svg>

              <div className="relative z-10 w-full flex justify-between items-center px-2 sm:px-8">
                {/* University Node */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-raised border border-border-accent flex flex-col items-center justify-center shadow-md text-center p-2">
                  <Building2 className="w-7 h-7 text-accent mb-1" />
                  <span className="text-[10px] font-mono font-bold text-accent">UNIVERSITY</span>
                  <span className="text-[9px] text-text-muted mt-0.5">Anchors Student</span>
                </div>

                {/* Student Node */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-surface-raised border-2 border-text-primary flex flex-col items-center justify-center shadow-xl text-center p-3 relative">
                  <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping opacity-25" />
                  <GraduationCap className="w-9 h-9 text-text-primary mb-1" />
                  <span className="text-xs font-mono font-bold text-text-primary">STUDENT TWIN</span>
                  <span className="text-[9px] text-accent mt-0.5 font-mono">SHA-256 Digest</span>
                </div>

                {/* Employer Node */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-raised border border-success/30 flex flex-col items-center justify-center shadow-md text-center p-2">
                  <Briefcase className="w-7 h-7 text-success mb-1" />
                  <span className="text-[10px] font-mono font-bold text-success">EMPLOYER</span>
                  <span className="text-[9px] text-text-muted mt-0.5">Direct Vector Match</span>
                </div>
              </div>
            </div>

            {/* Step breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border mt-8 text-xs font-mono">
              <div className="p-3 bg-canvas rounded-xl border border-border space-y-1">
                <span className="text-accent font-bold">Phase 1: Affiliation</span>
                <p className="text-text-muted leading-relaxed font-sans text-[11px]">
                  University Dean verifies enrollment, generating an accredited Trust Anchor linked to NAAC/NBA metrics.
                </p>
              </div>
              <div className="p-3 bg-canvas rounded-xl border border-border space-y-1">
                <span className="text-info font-bold">Phase 2: Code Submission</span>
                <p className="text-text-muted leading-relaxed font-sans text-[11px]">
                  Student solves real challenges in SQL/Code sandbox. Revision hash frozen atomically in PostgreSQL.
                </p>
              </div>
              <div className="p-3 bg-canvas rounded-xl border border-border space-y-1">
                <span className="text-success font-bold">Phase 3: Faculty Endorsement</span>
                <p className="text-text-muted leading-relaxed font-sans text-[11px]">
                  Accredited faculty scores against pre-published rubric (L1-L4). W3C verifiable credential minted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 👥 WHO PROOFBRIDGE IS FOR (TABBED EXPLORER) ── */}
        <section className="py-24 px-6 bg-surface/30 border-y border-border">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="section-label">Ecosystem Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Designed for the Entire Education-to-Work Ecosystem
              </h2>
            </div>

            {/* Tab buttons */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-surface rounded-xl border border-border gap-1">
                {[
                  { id: 'students', label: 'For Students', icon: GraduationCap },
                  { id: 'employers', label: 'For Employers', icon: Briefcase },
                  { id: 'institutions', label: 'For Universities', icon: Building2 },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeTab === t.id
                          ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab content cards */}
            <div className="pb-card p-6 sm:p-10 border-border">
              {activeTab === 'students' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Ditch Resumes. Prove Your Skills.</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Build an immutable digital twin of your engineering competence. Take structured industry challenges, get evaluated by qualified faculty, and qualify automatically for top internships.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Verifiable Skill Passport shareable via simple HTTPS link',
                      'Shortest Path "Bridge Me" algorithm points to highest-ROI challenges',
                      'Transparent Rubrics: know exactly what Proficient Level 3 means',
                      'Direct hiring radar visibility to partner employers without applications'
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/auth/signup" className="pb-btn-primary text-xs inline-flex items-center gap-2">
                    <span>Create Student Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {activeTab === 'employers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Zero-Resume Talent Acquisition.</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Stop reading self-reported claims. Define your role genome as exact skill weights, and query candidate vectors mathematically.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Define exact role genomes (e.g., SQL Level 3 @ 35% weight)',
                      'Instant mathematical matching via coverage-v1 algorithm',
                      'Inspect frozen code submissions and faculty evaluation notes',
                      'Cryptographic audit trail eliminates credential fraud entirely'
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/auth/signup" className="pb-btn-primary text-xs inline-flex items-center gap-2">
                    <span>Post Role Requisition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {activeTab === 'institutions' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Accreditation Metrics &amp; Curriculum Intelligence.</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Give university leadership real-time visibility into student skill attainment, curriculum gaps against market demand, and NAAC/NBA accreditation evidence.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Live cohort competency radar across departments and degrees',
                      'Automated institutional trust anchor issuance for enrolled students',
                      'Accreditation-ready audit trails for NAAC/NBA compliance',
                      'Real-time employer demand insights showing which skills to teach'
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/auth/signup" className="pb-btn-primary text-xs inline-flex items-center gap-2">
                    <span>Register Institution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 🔮 FINAL CALL TO ACTION ── */}
        <section className="py-28 px-6">
          <div className="max-w-4xl mx-auto relative pb-card p-10 sm:p-16 text-center space-y-8 border-border overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-soft border border-border-accent flex items-center justify-center">
              <Zap className="w-8 h-8 text-accent animate-pulse" />
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
                Ready to Bridge the Skills Gap?
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Experience the deterministic trust layer for education and hiring. Try the live interactive prototype now.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link 
                href="/auth/signup" 
                className="w-full sm:w-auto pb-btn-primary px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all rounded-xl"
              >
                Access Platform Now
              </Link>
              <Link 
                href="/auth/login" 
                className="w-full sm:w-auto pb-btn-ghost px-8 py-3.5 text-xs sm:text-sm font-mono text-text-secondary hover:text-text-primary transition-all rounded-xl"
              >
                Fast Persona Sandbox Switcher →
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── 📝 FOOTER ── */}
      <footer className="border-t border-border bg-surface/50 py-12 px-6 text-center relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2.5 text-text-primary font-bold text-base">
            <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center text-white text-xs">P</div>
            <span>ProofBridge Network</span>
          </div>
          <p className="text-xs text-text-muted max-w-md font-mono">
            Cryptographic skill verification platform built for IIC 3.0 MUJ Hackathon · Theme: EdTech (PS-08).
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-text-muted mt-2 font-mono">
            <Link href="/verify" className="hover:text-accent transition-colors">Public Verifier</Link>
            <Link href="/auth/login" className="hover:text-accent transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-accent transition-colors">Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { 
  ShieldCheck, Target, Database, Zap, ArrowRight, 
  GraduationCap, Building2, Briefcase, FileCode, 
  CheckCircle2, Network, Lock, Globe, Award, Sparkles,
  TrendingUp, Code2, Terminal, Sliders, Check, BookOpen,
  Cpu, Layers, AlertCircle, ChevronRight, Copy, CheckCheck,
  RefreshCw, Play, Search, Eye, Compass, ShieldAlert,
  ArrowUpRight, BarChart3, CheckSquare, XCircle, ClipboardCheck
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
  // Interactive Hero & Simulator State
  const [hasSqlVerified, setHasSqlVerified] = useState(false);
  const [hasWritingVerified, setHasWritingVerified] = useState(false);
  const [jsonViewActive, setJsonViewActive] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [terminalRunning, setTerminalRunning] = useState(false);
  const [terminalStep, setTerminalStep] = useState(3);
  const [activePersonaTab, setActivePersonaTab] = useState<'student' | 'employer' | 'faculty' | 'institution'>('student');

  // Dynamic calculations for the simulator
  const baseScore = 61;
  const currentScore = baseScore + (hasSqlVerified ? 35 : 0) + (hasWritingVerified ? 4 : 0);
  const targetUnlocked = currentScore >= 90 ? 4 : currentScore >= 75 ? 2 : 1;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleRunTerminalSimulation = () => {
    setTerminalRunning(true);
    setTerminalStep(0);
    setTimeout(() => setTerminalStep(1), 600);
    setTimeout(() => setTerminalStep(2), 1300);
    setTimeout(() => setTerminalStep(3), 2000);
    setTimeout(() => setTerminalRunning(false), 2200);
  };

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

      {/* ── FLOATING TOP NOTIFICATION BANNER ── */}
      <div className="relative z-50 border-b border-border bg-accent/5 backdrop-blur-md py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] font-mono text-accent">
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-bold">IIC 3.0 MUJ Hackathon Prototype:</span>
          <span className="hidden sm:inline text-text-secondary">PS-08 EdTech · Continuous Competency Verification Engine</span>
          <Link href="/auth/login" className="underline hover:text-accent-hover ml-1 font-bold">Try Live Sandbox &rarr;</Link>
        </div>
      </div>

      {/* ── HIGH-END LANDING NAVIGATION ── */}
      <nav className="sticky top-0 inset-x-0 z-50 border-b border-border bg-canvas/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_25px_rgba(var(--accent-rgb),0.4)] group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-text-primary text-xl tracking-tight leading-none flex items-center gap-1.5">
                ProofBridge
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-border-accent">v2.4</span>
              </span>
              <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase mt-0.5">Cryptographic Trust Layer</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-text-secondary">
            <a href="#simulator" className="hover:text-accent transition-colors">Pathfinder Demo</a>
            <a href="#breakthroughs" className="hover:text-accent transition-colors">Core Architecture</a>
            <a href="#verifier" className="hover:text-accent transition-colors">Verification Terminal</a>
            <a href="#ecosystem" className="hover:text-accent transition-colors">Ecosystem</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/verify" 
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface border border-border"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Public Verifier</span>
            </Link>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            <Link 
              href="/auth/login" 
              className="text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors px-2 py-1.5"
            >
              Sign In
            </Link>

            <Link 
              href="/auth/signup" 
              className="pb-btn-primary py-2 px-3.5 sm:px-4 text-xs sm:text-sm group"
            >
              <span>Launch</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        
        {/* ── 🚀 ULTRA-ATTRACTIVE HERO SECTION ── */}
        <section className="relative pt-16 pb-24 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Top Text Content */}
            <motion.div
              variants={STAGGER}
              initial="hidden"
              animate="show"
              className="space-y-6 text-center max-w-4xl mx-auto"
            >
              <motion.div 
                variants={FADE_DOWN} 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-accent bg-accent-soft text-accent text-xs font-mono shadow-[0_0_25px_rgba(var(--accent-rgb),0.25)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span className="font-bold">Next-Gen Skill Verification Platform</span>
                <span className="text-text-muted">·</span>
                <span className="text-text-secondary hidden sm:inline">Zero Self-Reported Resumes</span>
              </motion.div>
              
              <motion.h1 
                variants={FADE_DOWN} 
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-[1.08]"
              >
                Don't Trust Resumes. <br className="hidden sm:block" />
                <span className="text-gradient-amber">Verify Engineering Evidence.</span>
              </motion.h1>
              
              <motion.p 
                variants={FADE_DOWN} 
                className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-normal"
              >
                ProofBridge anchors student code artifacts with SHA-256 digests, certifies them through accredited university faculty, and mathematically bridges candidates into verified industry jobs.
              </motion.p>
              
              <motion.div 
                variants={FADE_DOWN} 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
              >
                <Link 
                  href="/auth/signup" 
                  className="w-full sm:w-auto pb-btn-primary px-8 py-4 text-sm font-bold shadow-lg hover:shadow-xl transition-all rounded-xl flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Explore Live Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a 
                  href="#simulator" 
                  className="w-full sm:w-auto pb-btn-ghost px-7 py-4 text-xs sm:text-sm font-mono text-text-secondary border-border hover:border-border-accent hover:text-text-primary transition-all rounded-xl flex justify-center items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-accent" />
                  <span>Try Algorithmic Simulator</span>
                </a>
              </motion.div>
            </motion.div>

            {/* ── HERO INTERACTIVE APPLICATION PREVIEW WINDOW ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto pb-card-accent border-2 border-border-accent p-1 sm:p-2 shadow-[0_20px_70px_rgba(0,0,0,0.6)] rounded-2xl sm:rounded-3xl relative overflow-hidden"
            >
              {/* Window Header */}
              <div className="bg-surface-raised px-4 py-3 border-b border-border rounded-t-xl sm:rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                  <span className="text-[11px] font-mono text-text-muted ml-2 hidden sm:inline">
                    proofbridge.network/student/meera-patel/skill-twin
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Live Cryptographic Sync
                  </span>
                </div>
              </div>

              {/* Inside Hero Dashboard Mock */}
              <div className="p-4 sm:p-8 bg-canvas space-y-6">
                {/* Candidate Overview Banner */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent-soft border border-border-accent flex items-center justify-center text-accent text-xl font-black">
                      MP
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-text-primary">Meera Patel</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-info/10 text-info border border-info/30">
                          MCA 2026
                        </span>
                      </div>
                      <p className="text-xs text-text-muted font-mono mt-0.5">
                        Manipal University Jaipur (MUJ) · NAAC A+ Verified
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-border w-full md:w-auto justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] font-mono text-text-muted uppercase">Target Opportunity</div>
                      <div className="text-xs font-bold text-text-primary">Junior Data Analyst Intern</div>
                      <div className="text-[10px] text-accent font-mono">Sample Analytics Studio (₹25k/mo)</div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-accent-soft border border-border-accent text-center">
                      <div className="text-[10px] font-mono text-accent uppercase font-bold">Match Score</div>
                      <div className="text-2xl font-black text-accent">{currentScore}%</div>
                    </div>
                  </div>
                </div>

                {/* Live Competency Vectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { skill: 'SQL & Data Integrity', level: hasSqlVerified ? 'Level 3 (Proficient)' : 'Level 0 (Unverified)', weight: '35%', status: hasSqlVerified ? 'Verified by Faculty' : 'Pending Challenge', color: hasSqlVerified ? 'text-success' : 'text-warning' },
                    { skill: 'Spreadsheets & Modeling', level: 'Level 3 (Proficient)', weight: '25%', status: 'Verified by Faculty', color: 'text-success' },
                    { skill: 'Analytical Reasoning', level: 'Level 2 (Developing)', weight: '24%', status: 'Verified by Faculty', color: 'text-success' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 rounded-xl bg-surface border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-primary">{s.skill}</span>
                        <span className="text-[10px] font-mono text-text-muted">{s.weight} Wt</span>
                      </div>
                      <div className="text-sm font-black text-text-primary">{s.level}</div>
                      <div className={`text-[10px] font-mono flex items-center gap-1 ${s.color}`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{s.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Proof Hash Bar */}
                <div className="p-3.5 rounded-xl bg-surface-raised border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 w-full sm:w-auto truncate">
                    <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-text-muted shrink-0">W3C Credential Digest:</span>
                    <span className="text-accent truncate font-bold">
                      sha256:7f9a2b8e3c1d4a5f6e8b0a9c7d8e2f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d
                    </span>
                  </div>
                  <button 
                    onClick={() => handleCopy('sha256:7f9a2b8e3c1d4a5f6e8b0a9c7d8e2f1a3b5c7d9e0f2a4b6c8d0e1f3a5b7c9d')}
                    className="shrink-0 flex items-center gap-1 text-[11px] text-text-secondary hover:text-accent transition-colors cursor-pointer"
                  >
                    {copiedHash ? <CheckCheck className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── ⚡ LIVE INTERACTIVE "BRIDGE ME" PATHFINDER DEMO ── */}
        <section id="simulator" className="py-24 px-4 bg-surface/40 border-y border-border relative">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="section-label">Interactive Sandbox</span>
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
                Experience the "Bridge Me" Engine Live
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Test the algorithmic shortest-path engine directly below. Toggle simulated evidence attainments and watch the mathematical match score calculate instantly.
              </p>
            </div>

            {/* Interactive Control & Scoreboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left: Interactive Controls */}
              <div className="lg:col-span-6 pb-card p-6 sm:p-8 space-y-5 border-border">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-accent" />
                    <h3 className="text-base font-bold text-text-primary">Micro-Mission Simulator</h3>
                  </div>
                  <button 
                    onClick={() => { setHasSqlVerified(false); setHasWritingVerified(false); }}
                    className="text-xs font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Option 1: SQL Challenge */}
                  <label className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    hasSqlVerified 
                      ? 'bg-accent-soft/40 border-border-accent shadow-sm' 
                      : 'bg-canvas border-border hover:bg-surface'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={hasSqlVerified}
                      onChange={(e) => setHasSqlVerified(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-text-primary">Complete SQL Challenge (Level 3)</span>
                        <span className="text-xs font-mono font-bold text-success">+35% Gain</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        Solves dirty sales datasets using LAG window functions and COALESCE date guards.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Technical Writing */}
                  <label className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    hasWritingVerified 
                      ? 'bg-info/10 border-info/30 shadow-sm' 
                      : 'bg-canvas border-border hover:bg-surface'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={hasWritingVerified}
                      onChange={(e) => setHasWritingVerified(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-info focus:ring-info"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-text-primary">Upgrade Technical Writing (Level 4)</span>
                        <span className="text-xs font-mono font-bold text-info">+4% Gain</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        Defends trade-offs and performance architecture in an executive technical memo.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="p-3.5 rounded-xl bg-canvas border border-border text-xs text-text-muted font-mono leading-relaxed flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent shrink-0" />
                  <span>Formula: <code>Coverage = &Sigma; (Weight &times; min(1, Level / Target))</code></span>
                </div>
              </div>

              {/* Right: Real-time Mathematical Output */}
              <div className="lg:col-span-6 pb-card-accent p-6 sm:p-8 space-y-6 border-2 border-border-accent">
                <div className="flex items-center justify-between">
                  <span className="section-label text-xs">Simulated Output</span>
                  <span className="text-xs font-mono text-accent font-bold">coverage-v1 engine</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-canvas border border-border text-center space-y-1">
                    <div className="text-[10px] font-mono text-text-muted uppercase">Computed Match</div>
                    <div className="metric-value text-4xl sm:text-5xl text-gradient-amber">
                      {currentScore}%
                    </div>
                    <div className="text-[10px] text-text-secondary">
                      {currentScore >= 96 ? 'Perfect Role Alignment' : `${100 - currentScore}% Gap Remaining`}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-canvas border border-border text-center space-y-1">
                    <div className="text-[10px] font-mono text-text-muted uppercase">Unlocked Roles</div>
                    <div className="metric-value text-4xl sm:text-5xl text-success">
                      {targetUnlocked} <span className="text-lg text-text-muted">/ 4</span>
                    </div>
                    <div className="text-[10px] text-text-secondary">
                      {targetUnlocked >= 4 ? 'All Opportunities Ready' : 'Threshold: 85%+'}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-muted">Eligibility Threshold (85%)</span>
                    <span className="text-accent font-bold">{currentScore}% Reached</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-canvas border border-border overflow-hidden p-0.5">
                    <motion.div 
                      className="h-full rounded-full bg-gradient-to-r from-accent via-accent-hover to-success"
                      animate={{ width: `${Math.min(100, currentScore)}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/challenges/50000000-0000-0000-0000-000000000001" 
                    className="pb-btn-primary flex-1 text-xs py-2.5 justify-center"
                  >
                    <span>Launch SQL Challenge IDE</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <Link 
                    href="/auth/login?redirect=/student" 
                    className="pb-btn-ghost text-xs py-2.5 justify-center"
                  >
                    <span>View Student Twin</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── 🧱 BENTO GRID ARCHITECTURAL SHOWCASE ── */}
        <section id="breakthroughs" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="section-label">Engineering Foundation</span>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
              The 4 Architectural Breakthroughs
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              ProofBridge solves the deep structural failure between university accreditation, student portfolios, and enterprise recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Skill Twin (8 Cols) */}
            <div className="md:col-span-8 pb-card p-6 sm:p-10 space-y-6 border-border flex flex-col justify-between group hover:border-border-accent transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-border-accent flex items-center justify-center text-accent">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-border bg-surface text-text-muted">
                    FEATURE 01
                  </span>
                </div>
                <h3 className="text-2xl font-black text-text-primary">
                  The Skill Twin: Continuous Dynamic Portfolio
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
                  Unlike a static PDF resume written once a year, a candidate's Skill Twin is an immutable digital twin. Every point reflects real audited submissions, frozen git commit hashes, explicit student contribution statements, and transparent AI-tooling disclosures.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border font-mono text-xs">
                <div className="p-3 bg-canvas rounded-xl border border-border">
                  <div className="text-accent font-bold">Revision Snapshots</div>
                  <div className="text-[11px] text-text-muted mt-0.5">SHA-256 code freeze</div>
                </div>
                <div className="p-3 bg-canvas rounded-xl border border-border">
                  <div className="text-info font-bold">Contribution Defense</div>
                  <div className="text-[11px] text-text-muted mt-0.5">Written author proof</div>
                </div>
                <div className="p-3 bg-canvas rounded-xl border border-border">
                  <div className="text-success font-bold">AI Disclosure</div>
                  <div className="text-[11px] text-text-muted mt-0.5">Honest tool tagging</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Role Genome (4 Cols) */}
            <div className="md:col-span-4 pb-card p-6 sm:p-10 space-y-6 border-border flex flex-col justify-between group hover:border-border-accent transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-info/10 border border-info/30 flex items-center justify-center text-info">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-border bg-surface text-text-muted">
                    FEATURE 02
                  </span>
                </div>
                <h3 className="text-2xl font-black text-text-primary">
                  Role Genome
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Employers specify roles as multi-factor capability vectors with exact weights and required rubric levels, bypassing keyword guessing entirely.
                </p>
              </div>

              <div className="p-3.5 bg-canvas rounded-xl border border-border text-xs font-mono space-y-1.5">
                <div className="text-text-muted">Example Genome Vector:</div>
                <div className="text-accent font-bold">SQL (Level 3) &middot; Weight 35%</div>
                <div className="text-info font-bold">Python (Level 2) &middot; Weight 25%</div>
              </div>
            </div>

            {/* Bento Card 3: Deterministic Rubric Scoring (4 Cols) */}
            <div className="md:col-span-4 pb-card p-6 sm:p-10 space-y-6 border-border flex flex-col justify-between group hover:border-border-accent transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-warning/10 border border-warning/30 flex items-center justify-center text-warning">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-border bg-surface text-text-muted">
                    FEATURE 03
                  </span>
                </div>
                <h3 className="text-2xl font-black text-text-primary">
                  0% AI Hallucination
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  No automated LLM unilaterally awards credentials. Only accredited university faculty score submissions against standardized, pre-published 4-tier rubrics.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-warning bg-warning/10 border border-warning/25 p-3 rounded-xl">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Human Faculty In The Loop Guarantee</span>
              </div>
            </div>

            {/* Bento Card 4: W3C Verifiable Credentials (8 Cols) */}
            <div className="md:col-span-8 pb-card p-6 sm:p-10 space-y-6 border-border flex flex-col justify-between group hover:border-border-accent transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center text-success">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setJsonViewActive(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${!jsonViewActive ? 'bg-surface-raised text-text-primary border border-border' : 'text-text-muted'}`}
                    >
                      Visual Card
                    </button>
                    <button 
                      onClick={() => setJsonViewActive(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${jsonViewActive ? 'bg-surface-raised text-text-primary border border-border' : 'text-text-muted'}`}
                    >
                      JSON-LD Standard
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-text-primary">
                  W3C Verifiable Credential Standard
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
                  Every attainment compiles to an internationally portable W3C Verifiable Credential. Anyone can verify the cryptographic proof offline without vendor lock-in.
                </p>
              </div>

              {/* Toggleable Preview */}
              <div className="bg-canvas p-4 rounded-xl border border-border font-mono text-xs">
                {jsonViewActive ? (
                  <pre className="text-text-secondary overflow-x-auto text-[11px] leading-relaxed">
{`{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "ProofBridgeSkillAttainment"],
  "issuer": "did:pb:muj:dean-computing",
  "issuanceDate": "2026-09-08T18:20:00Z",
  "credentialSubject": {
    "id": "did:pb:student:meera-patel",
    "targetSkill": "SQL (Structured Query Language)",
    "achievedLevel": 3,
    "proofDigest": "sha256:7f9a2b8e3c1d4a5f..."
  }
}`}
                  </pre>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-success font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> NAAC A+ Verified Attainment
                      </div>
                      <div className="text-text-muted text-[11px] mt-0.5">
                        Issuer: Manipal University Jaipur &middot; Candidate: Meera Patel
                      </div>
                    </div>
                    <Link href="/verify" className="text-accent text-[11px] font-bold hover:underline flex items-center gap-1">
                      Verify &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ── 🛡️ INTERACTIVE PUBLIC VERIFICATION TERMINAL ── */}
        <section id="verifier" className="py-24 px-4 bg-surface/30 border-y border-border">
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="section-label">Public Trust Gateway</span>
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
                Simulate Instant Verification
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Watch how third-party employers verify ProofBridge credentials without contacting the university or checking phone references.
              </p>
            </div>

            {/* Terminal Window */}
            <div className="pb-card border-border rounded-2xl overflow-hidden shadow-2xl bg-canvas">
              {/* Terminal Titlebar */}
              <div className="bg-surface-raised px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span className="text-xs font-mono font-bold text-text-primary">proofbridge-cli verify --hash sha256:7f9a...</span>
                </div>
                <button 
                  onClick={handleRunTerminalSimulation}
                  disabled={terminalRunning}
                  className="pb-btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>{terminalRunning ? 'Verifying...' : 'Re-run Check'}</span>
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs space-y-3 min-h-[220px]">
                <div className="text-text-muted">$ proofbridge verify --record sub-sql-001 --network muj-mainnet</div>
                
                {terminalStep >= 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-text-secondary flex items-center gap-2">
                    <span className="text-accent">&gt;</span>
                    <span>Querying cryptographic Trust Anchor for Manipal University Jaipur (MUJ)...</span>
                    <span className="text-success font-bold">[FOUND]</span>
                  </motion.div>
                )}

                {terminalStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-text-secondary flex items-center gap-2">
                    <span className="text-accent">&gt;</span>
                    <span>Validating frozen code revision SHA-256 digest in PostgreSQL...</span>
                    <span className="text-success font-bold">[MATCHED 100%]</span>
                  </motion.div>
                )}

                {terminalStep >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-text-secondary flex items-center gap-2">
                    <span className="text-accent">&gt;</span>
                    <span>Checking accredited faculty signature (Dr. Alok Sharma, Assoc Prof)...</span>
                    <span className="text-success font-bold">[VALID & AUTHENTIC]</span>
                  </motion.div>
                )}

                {terminalStep >= 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3.5 rounded-xl bg-success/10 border border-success/30 text-success space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-success" />
                      <span>CRYPTOGRAPHIC VERIFICATION SUCCESSFUL: 100% PROVABLE INTEGRITY</span>
                    </div>
                    <div className="text-[11px] text-text-secondary">
                      Attainment: SQL Level 3 &middot; Issued: Sep 08, 2026 &middot; Format: W3C Verifiable Credential v1.0
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ── 📊 COMPARISON TABLE: RESUMES VS PROOFBRIDGE ── */}
        <section className="py-24 px-6 max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="section-label">Direct Comparison</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Why ProofBridge Outperforms Legacy Hiring
            </h2>
          </div>

          <div className="pb-card border-border overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-border bg-surface-raised">
                    <th className="p-4 text-text-muted uppercase">Evaluation Vector</th>
                    <th className="p-4 text-text-muted uppercase">Legacy PDF Resumes / Portals</th>
                    <th className="p-4 text-accent uppercase font-bold">ProofBridge Cryptographic Layer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { vector: 'Evidence Format', legacy: 'Self-reported bullet points on PDF', pb: 'Frozen git revisions with SHA-256 digests' },
                    { vector: 'Skill Verification', legacy: 'Keyword matching (ATS parsing)', pb: 'Faculty-audited standardized rubrics (L1-L4)' },
                    { vector: 'AI Fraud Vulnerability', legacy: 'High (ChatGPT generates entire CVs)', pb: 'Zero (Requires code execution & human defense)' },
                    { vector: 'Curriculum Alignment', legacy: 'Disconnected semester GPA', pb: 'Direct reverse-engineered employer genomes' },
                    { vector: 'Candidate Discovery', legacy: 'Weeks of manual candidate filtering', pb: 'Instant mathematical vector matching' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-text-primary">{row.vector}</td>
                      <td className="p-4 text-text-muted flex items-center gap-2">
                        <XCircle className="w-3.5 h-3.5 text-danger shrink-0" />
                        <span>{row.legacy}</span>
                      </td>
                      <td className="p-4 text-accent font-semibold">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                          <span>{row.pb}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 👥 MULTI-STAKEHOLDER ECOSYSTEM EXPLORER ── */}
        <section id="ecosystem" className="py-24 px-6 bg-surface/30 border-y border-border">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="section-label">All-in-One Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
                Empowering Every Stakeholder in Higher Ed
              </h2>
            </div>

            {/* Persona Switcher Tabs */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-surface rounded-xl border border-border gap-1">
                {[
                  { id: 'student', label: 'For Students', icon: GraduationCap },
                  { id: 'employer', label: 'For Employers', icon: Briefcase },
                  { id: 'faculty', label: 'For Faculty', icon: ClipboardCheck },
                  { id: 'institution', label: 'For Deans & Leadership', icon: Building2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActivePersonaTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        activePersonaTab === tab.id
                          ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                          : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Persona Content Box */}
            <div className="pb-card p-6 sm:p-10 border-border">
              {activePersonaTab === 'student' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Ditch Resumes. Prove Your Engineering.</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Build an immutable digital twin of your engineering competence. Complete targeted micro-missions, get verified by accredited faculty, and qualify automatically for top internships.
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

              {activePersonaTab === 'employer' && (
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

              {activePersonaTab === 'faculty' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Structured Rubric Evaluation Queue.</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Evaluate student submissions in minutes using clean, standardized rubrics. Maintain academic integrity while preparing students for genuine industry requirements.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Organized pending queue with SLA urgency indicators (< 24h)',
                      'Inspect code, tests, contribution statements, and tool disclosures',
                      'One-click rubric scoring with faculty identity cryptographic signing',
                      'Direct contribution to university accreditation and placement metrics'
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-info shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/auth/signup" className="pb-btn-primary text-xs inline-flex items-center gap-2">
                    <span>Access Reviewer Queue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {activePersonaTab === 'institution' && (
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
        <section className="py-28 px-4">
          <div className="max-w-4xl mx-auto relative pb-card-accent p-8 sm:p-16 text-center space-y-8 border-2 border-border-accent overflow-hidden rounded-3xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-soft border border-border-accent flex items-center justify-center">
              <Zap className="w-8 h-8 text-accent animate-pulse" />
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
                Ready to Experience the Future of Skill Verification?
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Step into the live interactive prototype built for the IIC 3.0 MUJ Hackathon. No setup required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link 
                href="/auth/signup" 
                className="w-full sm:w-auto pb-btn-primary px-8 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all rounded-xl"
              >
                Launch Platform Now
              </Link>
              <Link 
                href="/auth/login" 
                className="w-full sm:w-auto pb-btn-ghost px-8 py-4 text-xs sm:text-sm font-mono text-text-secondary hover:text-text-primary transition-all rounded-xl"
              >
                Fast Persona Sandbox Switcher &rarr;
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── 📝 COMPREHENSIVE FOOTER ── */}
      <footer className="border-t border-border bg-surface/50 py-14 px-6 text-center relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-2.5 text-text-primary font-black text-lg">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white text-xs font-black">P</div>
            <span>ProofBridge Network</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30">
              Operational
            </span>
          </div>

          <p className="text-xs text-text-muted max-w-lg font-mono leading-relaxed">
            Cryptographic skill verification platform built for IIC 3.0 MUJ Hackathon &middot; Theme: EdTech (PS-08) &middot; Aligned with NAAC A+ and NBA Outcome-Based Education (OBE) Standards.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted font-mono">
            <Link href="/verify" className="hover:text-accent transition-colors">Public Verifier</Link>
            <Link href="/auth/login" className="hover:text-accent transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="hover:text-accent transition-colors">Create Account</Link>
            <Link href="/auth/login?redirect=/student" className="hover:text-accent transition-colors">Student Twin</Link>
            <Link href="/reviewer/queue" className="hover:text-accent transition-colors">Reviewer Queue</Link>
          </div>

          <div className="text-[11px] font-mono text-text-muted border-t border-border pt-6 w-full max-w-2xl">
            &copy; {new Date().getFullYear()} ProofBridge Consortium. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Target, Database, Zap, ArrowRight, 
  GraduationCap, Building2, Briefcase, FileCode, 
  CheckCircle2, Network, Lock, Globe
} from 'lucide-react';

const FADE_DOWN = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 flex flex-col font-sans overflow-x-hidden">
      
      {/* ── CUSTOM LANDING NAV (Replaces AppShell) ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)]">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-text-primary text-xl tracking-tight">ProofBridge</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/verify" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
              <ShieldCheck className="w-4 h-4" />
              Verify Credential
            </Link>
            <Link href="/auth/login" className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup" className="pb-btn-primary py-2 px-5 text-sm group">
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        
        {/* ── 🚀 HERO SECTION ── */}
        <section className="relative pt-24 pb-32 text-center flex flex-col items-center px-4 overflow-hidden">
          {/* Glowing background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="relative z-10 space-y-8 flex flex-col items-center max-w-5xl mx-auto"
          >
            <motion.div variants={FADE_DOWN} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-2 shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              IIC 3.0 MUJ EXCLUSIVE PROTOTYPE
            </motion.div>
            
            <motion.h1 variants={FADE_DOWN} className="text-5xl sm:text-7xl lg:text-8xl font-black text-text-primary tracking-tighter leading-[1.05]">
              The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-purple-500">Trust Layer</span> for Skill Verification.
            </motion.h1>
            
            <motion.p variants={FADE_DOWN} className="text-lg sm:text-xl text-text-secondary max-w-3xl leading-relaxed">
              ProofBridge cryptographically maps academic achievements to industry needs. No more generic resumes. Just mathematically proven skills validated by real institutions.
            </motion.p>
            
            <motion.div variants={FADE_DOWN} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full sm:w-auto">
              <Link href="/auth/signup" className="w-full sm:w-auto pb-btn-primary group relative overflow-hidden px-10 py-4 text-base font-bold shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.5)] transition-all rounded-2xl">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Launch Platform
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/verify" className="w-full sm:w-auto pb-btn-ghost px-10 py-4 text-base font-mono font-medium text-text-secondary border-border hover:border-text-primary hover:text-text-primary transition-all rounded-2xl flex justify-center items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Test Verification
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── 🏢 LOGO TICKER ── */}
        <section className="border-y border-border bg-surface py-8 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center space-y-4 max-w-7xl mx-auto px-6">
            <p className="text-xs font-bold text-text-muted tracking-widest uppercase text-center">
              Designed for the Next Generation of Ecosystems
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><GraduationCap className="w-8 h-8"/> MUJ</div>
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Building2 className="w-7 h-7"/> TechCorp</div>
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Briefcase className="w-7 h-7"/> Analytics Studio</div>
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Globe className="w-7 h-7"/> GlobalEd</div>
            </div>
          </div>
        </section>

        {/* ── 🧬 INTERACTIVE TRUST GRAPH ── */}
        <section className="relative w-full max-w-7xl mx-auto py-32 px-6">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}
            className="text-center space-y-6 mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary text-xs font-bold uppercase tracking-widest shadow-sm">
              <ShieldCheck className="w-4 h-4 text-accent" />
              The Cryptographic Core
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
              Forging the Trust Anchor
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              When a University Dean approves a student, a cryptographic "Trust Anchor" is created. Every project the student completes is signed with this anchor, making it completely impossible to fake.
            </p>
          </motion.div>

          <div className="relative bg-canvas rounded-[3rem] border border-border shadow-2xl overflow-hidden p-8 sm:p-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.05),transparent)] pointer-events-none" />
            
            <div className="relative h-64 sm:h-96 w-full flex items-center justify-center max-w-4xl mx-auto">
              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 1000 400" preserveAspectRatio="none">
                <motion.path
                  d="M 150,200 C 300,200 400,200 500,200"
                  stroke="rgba(var(--accent-rgb), 0.5)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
                <motion.path
                  d="M 500,200 C 600,200 700,200 850,200"
                  stroke="rgba(var(--success-rgb), 0.5)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
              </svg>

              <div className="relative z-10 w-full flex justify-between items-center px-4 sm:px-12">
                {/* University */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }} viewport={{ once: true }}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-surface border-2 border-accent flex flex-col items-center justify-center shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)] relative group"
                >
                  <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-widest">DEAN</span>
                </motion.div>

                {/* Student */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring' }} viewport={{ once: true }}
                  className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-surface border-4 border-text-primary flex flex-col items-center justify-center shadow-2xl relative group"
                >
                  <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-30" />
                  <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] sm:text-sm font-mono font-bold text-text-primary tracking-widest">STUDENT</span>
                </motion.div>

                {/* Employer */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: 'spring' }} viewport={{ once: true }}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-surface border-2 border-success flex flex-col items-center justify-center shadow-[0_0_40px_rgba(var(--success-rgb),0.3)] relative group"
                >
                  <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-success mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-success tracking-widest">HIRING</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 🧱 THREE PILLARS ── */}
        <section className="bg-surface border-y border-border py-32 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex justify-center text-xs font-bold tracking-widest text-text-muted uppercase">System Architecture</div>
              <h2 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
                Built for Absolute Reality
              </h2>
            </div>

            <motion.div 
              variants={STAGGER} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Database,
                  title: 'Deterministic Engine',
                  body: 'Coverage-v1 mathematically scores skills against rigorous rubrics. Zero AI hallucination, 100% precision.',
                  color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30', glow: 'group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]'
                },
                {
                  icon: Lock,
                  title: 'W3C Verifiable Proofs',
                  body: 'Every credential exports as a W3C Standard JSON-LD format with SHA-256 cryptographic anchors attached to code artifacts.',
                  color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', glow: 'group-hover:shadow-[0_0_30px_rgba(var(--success-rgb),0.2)]'
                },
                {
                  icon: Target,
                  title: 'Zero-Friction Hiring',
                  body: 'Employers query precise skill vectors, bypassing resumes entirely to find immediate exact matches instantly.',
                  color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                }
              ].map((pillar, idx) => (
                <motion.div key={idx} variants={FADE_UP} className={`pb-card p-10 space-y-6 bg-background transition-all duration-300 ${pillar.glow} hover:-translate-y-2 cursor-default`}>
                  <div className={`w-16 h-16 rounded-2xl ${pillar.bg} border ${pillar.border} flex items-center justify-center`}>
                    <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-primary leading-tight mb-4">{pillar.title}</h3>
                    <p className="text-base text-text-secondary leading-relaxed">{pillar.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 🔮 FINAL CTA ── */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[3rem] border border-border bg-surface shadow-2xl p-12 sm:p-24 text-center space-y-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-canvas to-purple-500/20 opacity-60" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative z-10 space-y-8"
            >
              <div className="w-24 h-24 mx-auto bg-accent/20 rounded-3xl flex items-center justify-center border border-accent/40 shadow-[0_0_40px_rgba(var(--accent-rgb),0.5)]">
                <Zap className="w-12 h-12 text-accent animate-pulse" />
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-text-primary tracking-tight max-w-4xl mx-auto leading-[1.1]">
                Ready to Bridge the Skills Gap?
              </h2>
              <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Stop relying on unverified resumes. Deploy ProofBridge to build deterministic Skill Twins and hire with absolute, mathematical confidence.
              </p>
              <div className="flex justify-center pt-8">
                <Link href="/auth/signup" className="pb-btn-primary px-12 py-5 text-lg font-bold shadow-[0_0_50px_rgba(var(--accent-rgb),0.5)] hover:scale-105 transition-transform duration-300 rounded-2xl flex items-center gap-3">
                  Access Platform <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── 📝 SIMPLE FOOTER ── */}
      <footer className="border-t border-border bg-surface py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-text-primary font-black text-xl">
            <Network className="w-5 h-5 text-accent" />
            ProofBridge
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} ProofBridge Consortium. IIC 3.0 MUJ Finalist. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-text-muted mt-4">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-accent transition-colors">Documentation</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

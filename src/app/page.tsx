'use client';

import { AppShell } from '@/components/ui/AppShell';
import { ShieldCheck, Target, Link as LinkIcon, Database, CheckCircle, Zap, ArrowRight, GraduationCap, Building2, Briefcase, FileCode, SearchCode } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FADE_DOWN: any = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const STAGGER: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-24 py-10 overflow-hidden px-4">
        
        {/* 🚀 HERO SECTION */}
        <section className="relative pt-12 pb-20 text-center flex flex-col items-center">
          {/* Glowing background blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="show"
            className="relative z-10 space-y-6 flex flex-col items-center"
          >
            <motion.div variants={FADE_DOWN} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-4 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              IIC 3.0 MUJ EXCLUSIVE BUILD
            </motion.div>
            
            <motion.h1 variants={FADE_DOWN} className="text-5xl sm:text-7xl font-black text-text-primary tracking-tight max-w-4xl leading-[1.1]">
              The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Trust Layer</span> for Skill Verification.
            </motion.h1>
            
            <motion.p variants={FADE_DOWN} className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              ProofBridge cryptographically maps academic achievements to industry needs. No more generic resumes. Just mathematically proven skills validated by real institutions.
            </motion.p>
            
            <motion.div variants={FADE_DOWN} className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/auth/login" className="pb-btn-primary group relative overflow-hidden px-8 py-3 text-sm font-bold shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.5)] transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  Enter Platform
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/verify" className="pb-btn-ghost px-8 py-3 text-sm font-mono text-text-secondary border-border hover:border-text-primary hover:text-text-primary transition-all">
                <ShieldCheck className="w-4 h-4" />
                Verify a Credential
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* 🧬 INTERACTIVE TRUST GRAPH (Animated SVG) */}
        <section className="relative w-full max-w-5xl mx-auto py-10">
          <div className="absolute inset-0 bg-canvas rounded-[2rem] border border-border shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.05),transparent)] pointer-events-none" />
          </div>
          <div className="relative p-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-border bg-surface text-text-secondary text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-accent" />
                The Proof Network
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-text-primary leading-tight">
                How the Cryptographic Anchor Works
              </h3>
              <p className="text-text-secondary text-base leading-relaxed">
                When a University Dean approves a student, a cryptographic "Trust Anchor" is forged. Every project the student completes is signed with this anchor, making it completely impossible to fake.
              </p>
            </div>

            <div className="flex-1 relative h-72 w-full flex items-center justify-center">
              {/* Nodes and SVG connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} viewBox="0 0 400 200">
                {/* Connection 1 (Uni to Student) */}
                <motion.path
                  d="M 60,100 C 120,100 150,100 200,100"
                  stroke="rgba(var(--accent-rgb), 0.5)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
                {/* Connection 2 (Student to Employer) */}
                <motion.path
                  d="M 230,100 C 280,100 300,100 340,100"
                  stroke="rgba(var(--success-rgb), 0.5)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
              </svg>

              <div className="relative z-10 w-full flex justify-between items-center px-2">
                
                {/* University Node */}
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 rounded-2xl bg-surface-raised border-2 border-accent flex flex-col items-center justify-center shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] relative"
                >
                  <Building2 className="w-8 h-8 text-accent mb-1" />
                  <span className="text-[10px] font-mono font-bold text-accent">DEAN</span>
                </motion.div>

                {/* Student Node */}
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}
                  className="w-24 h-24 rounded-full bg-surface-raised border-2 border-text-primary flex flex-col items-center justify-center shadow-2xl relative"
                >
                  <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-50" />
                  <GraduationCap className="w-10 h-10 text-text-primary mb-1" />
                  <span className="text-[11px] font-mono font-bold text-text-primary">STUDENT</span>
                </motion.div>

                {/* Employer Node */}
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}
                  className="w-20 h-20 rounded-2xl bg-surface-raised border-2 border-success flex flex-col items-center justify-center shadow-[0_0_30px_rgba(var(--success-rgb),0.3)]"
                >
                  <Briefcase className="w-8 h-8 text-success mb-1" />
                  <span className="text-[10px] font-mono font-bold text-success">HIRING</span>
                </motion.div>

              </div>
            </div>

          </div>
        </section>

        {/* 🧱 THREE PILLARS (Staggered Animation) */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex justify-center text-xs font-bold tracking-widest text-text-muted uppercase">The Architecture</div>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
              A System Built for Reality
            </h2>
          </div>

          <motion.div 
            variants={STAGGER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Database,
                title: 'Deterministic Engine',
                body: 'Coverage-v1 mathematically scores skills against rubrics. Zero AI hallucination, 100% precision.',
                color: 'text-accent',
                bg: 'bg-accent/10',
                border: 'border-accent/30',
                glow: 'group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]'
              },
              {
                icon: ShieldCheck,
                title: 'W3C Verifiable Proofs',
                body: 'Every credential exports as a W3C Standard JSON-LD format with SHA-256 cryptographic anchors.',
                color: 'text-success',
                bg: 'bg-success/10',
                border: 'border-success/30',
                glow: 'group-hover:shadow-[0_0_30px_rgba(var(--success-rgb),0.2)]'
              },
              {
                icon: Target,
                title: 'Zero-Friction Hiring',
                body: 'Employers query precise skill vectors, finding immediate exact matches instantly through the noise.',
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/30',
                glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]'
              }
            ].map((pillar, idx) => (
              <motion.div key={idx} variants={FADE_DOWN} className={`pb-card p-10 space-y-5 border bg-surface transition-all duration-300 ${pillar.glow} group cursor-default`}>
                <div className={`w-14 h-14 rounded-2xl ${pillar.bg} border ${pillar.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className={`w-7 h-7 ${pillar.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-text-primary leading-tight mb-3">{pillar.title}</h3>
                  <p className="text-base text-text-secondary leading-relaxed">{pillar.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 🔮 FINAL CTA WITH GLASSMORPHISM */}
        <section className="relative overflow-hidden rounded-[3rem] border border-border bg-surface shadow-2xl p-12 sm:p-20 text-center space-y-8 mt-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-canvas to-purple-500/20 opacity-50" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 25, delay: 0.2 }}
            className="relative z-10 space-y-8"
          >
            <div className="w-20 h-20 mx-auto bg-accent/20 rounded-3xl flex items-center justify-center border border-accent/40 shadow-[0_0_30px_rgba(var(--accent-rgb),0.4)]">
              <Zap className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-text-primary tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to Bridge the Skills Gap?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Stop relying on unverified resumes. Deploy ProofBridge to build deterministic Skill Twins and hire with absolute confidence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
              <Link href="/auth/login" className="pb-btn-primary px-12 py-5 text-lg font-bold shadow-[0_0_50px_rgba(var(--accent-rgb),0.5)] hover:scale-105 transition-transform duration-300 rounded-2xl">
                Access Platform
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </AppShell>
  );
}

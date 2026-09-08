'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Zap,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Building2,
  Lock,
  Code2,
  Users,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface TourStep {
  step: number;
  title: string;
  role: string;
  url: string;
  tag: string;
  pitchCue: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: 'Student Baseline & Bridge Me',
    role: 'Student (Meera Patel)',
    url: '/student',
    tag: '61% Baseline',
    pitchCue: 'Show 61% baseline match for Junior Data Analyst and open Bridge Me Pathfinder (+35% shortest path in 2h).',
    icon: GraduationCap,
  },
  {
    step: 2,
    title: 'Challenge Solving & Live Test Suite',
    role: 'Student (Mission Solver)',
    url: '/challenges/50000000-0000-0000-0000-000000000001',
    tag: 'PostgreSQL 16',
    pitchCue: 'Execute SQL test runner, inspect the AI disclosure, and finalize frozen SHA-256 revision into PostgreSQL.',
    icon: Code2,
  },
  {
    step: 3,
    title: 'Faculty Evaluation & Rubric Signoff',
    role: 'Faculty Reviewer (Dr. Alok Sharma)',
    url: '/reviewer/evaluations/sub-sql-001',
    tag: 'Level 3 Rubric',
    pitchCue: 'Dr. Sharma reviews code side-by-side with student rationale, awards Level 3, and publishes the atomic proof chain.',
    icon: ShieldCheck,
  },
  {
    step: 4,
    title: 'Skill-First Blind Talent Radar',
    role: 'Lead Recruiter (Neha Verma)',
    url: '/employer/opportunities/10000000-0000-0000-0000-000000000001/applicants',
    tag: 'Blind Mode',
    pitchCue: 'Recruiter toggles Blind Screening Mode to mask college tier/gender, inspecting verified SHA-256 snapshots.',
    icon: Briefcase,
  },
  {
    step: 5,
    title: 'Public Verification & Tamper Sandbox',
    role: 'External Auditor (Zero-Login)',
    url: '/verify',
    tag: 'FIPS SHA-256',
    pitchCue: 'Demonstrate public verifier and click "Simulate Code Tampering" to prove tamper-evidence to judges.',
    icon: Lock,
  },
  {
    step: 6,
    title: 'Dean Curriculum Gap & ROI Simulator',
    role: 'College Dean (Prof. Gupta)',
    url: '/institution/insights',
    tag: 'Intervention ROI',
    pitchCue: 'Dean identifies 14 students "One Skill Away" and models a 2-week lab dropping deficit from -41% to -8%.',
    icon: Building2,
  },
];

export function MentorTourHUD() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadState() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setHasVerifiedSql(Boolean(json.data.has_verified_sql));
          }
        }
      } catch (err) {}
    }
    loadState();
    const interval = setInterval(loadState, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleResetDemo = async () => {
    setIsResetting(true);
    setResetFeedback(null);
    try {
      const res = await fetch('/api/v1/demo/reset', { method: 'POST' });
      if (res.ok) {
        setHasVerifiedSql(false);
        setResetFeedback('Reset baseline: 61% (Spreadsheets 25 + Comm 12 + Reasoning 24)');
        setTimeout(() => setResetFeedback(null), 4000);
        router.refresh();
      } else {
        throw new Error('Reset failed');
      }
    } catch (e: any) {
      setResetFeedback('Error resetting state: ' + (e?.message || e));
    } finally {
      setIsResetting(false);
    }
  };

  const currentStep = TOUR_STEPS.find((s) => pathname.startsWith(s.url)) || null;

  return (
    <aside aria-label="Mentor demo controls" className="fixed bottom-4 right-4 z-50 font-mono">
      {/* HUD Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-surface border border-border-accent text-accent shadow-xl hover:bg-accent hover:text-[var(--text-inverse)] hover:scale-105 transition-all group backdrop-blur-xl"
          title="Open Hackathon Demo Controller"
        >
          <div className="relative">
            <Zap className="w-4 h-4 text-accent group-hover:text-[var(--text-inverse)]" />
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${hasVerifiedSql ? 'bg-success' : 'bg-warning animate-ping'}`} />
          </div>
          <span className="text-xs font-black tracking-tight">DEMO HUD</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
            hasVerifiedSql
              ? 'bg-success/15 text-success border-success/30'
              : 'bg-warning/15 text-warning border-warning/30'
          }`}>
            {hasVerifiedSql ? '96% Verified' : '61% Baseline'}
          </span>
        </button>
      )}

      {/* Expanded HUD Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] rounded-3xl bg-surface/95 backdrop-blur-2xl border-2 border-border-accent shadow-2xl p-5 space-y-4 animate-scale-in text-xs max-h-[85vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-accent text-[var(--text-inverse)] flex items-center justify-center font-black">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-text-primary">IIC 3.0 Demo Controller</h3>
                <span className="text-[10px] text-text-muted">Presenter Live Navigation & Cue HUD</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-text-primary p-1 rounded-lg hover:bg-surface-hover"
              aria-label="Close HUD"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Live State Banner & Reset Action */}
          <div className="p-3.5 rounded-2xl bg-canvas border border-border space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="section-label text-[10px]">Active State</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                hasVerifiedSql
                  ? 'bg-success/10 text-success border-success/30'
                  : 'bg-warning/10 text-warning border-warning/30'
              }`}>
                {hasVerifiedSql ? 'SQL Attainment Published (96%)' : 'SQL Gap Present (61%)'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={handleResetDemo}
                disabled={isResetting}
                className="pb-btn-ghost text-[11px] py-1.5 px-3 flex items-center gap-1.5 flex-1 justify-center text-text-secondary hover:text-danger hover:border-danger/30"
              >
                <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
                <span>{isResetting ? 'Resetting DB...' : 'Reset Demo State (61%)'}</span>
              </button>

              <Link
                href="/verify"
                className="pb-btn-ghost text-[11px] py-1.5 px-3 flex items-center gap-1 text-success border-success/30 hover:bg-success/10"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Verify</span>
              </Link>
            </div>

            {resetFeedback && (
              <p className="text-[10px] text-accent font-medium leading-relaxed pt-1">
                {resetFeedback}
              </p>
            )}
          </div>

          {/* 6-Step Tour Navigator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[10px]">3-Minute Live Demo Path</span>
              <span className="text-[10px] text-text-muted">6 Strategic Stops</span>
            </div>

            <div className="space-y-1.5">
              {TOUR_STEPS.map((step) => {
                const Icon = step.icon;
                const isCurrent = pathname === step.url || (step.url !== '/' && pathname.startsWith(step.url));

                return (
                  <Link
                    key={step.step}
                    href={step.url}
                    onClick={() => {
                      if (window.innerWidth < 640) setIsOpen(false);
                    }}
                    className={`block p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'border-border-accent bg-accent-soft text-text-primary shadow-sm ring-1 ring-border-accent'
                        : 'border-border bg-canvas text-text-secondary hover:border-border-bright hover:bg-surface-hover'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isCurrent ? 'bg-accent text-white' : 'bg-surface border border-border text-text-muted'
                        }`}>
                          {step.step}
                        </span>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-accent' : 'text-text-muted'}`} />
                        <span className="font-bold text-xs truncate text-text-primary">{step.title}</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-surface border border-border text-text-muted shrink-0">
                        {step.tag}
                      </span>
                    </div>

                    {isCurrent && (
                      <div className="mt-2 pt-2 border-t border-border-accent/40 text-[10px] text-text-secondary leading-relaxed bg-surface/50 p-2 rounded-lg">
                        <strong className="text-accent block mb-0.5">Pitch Cue ({step.role}):</strong>
                        {step.pitchCue}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Persona Legend */}
          <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-text-muted">
            <span>Student: Meera</span>
            <span>·</span>
            <span>Faculty: Dr. Sharma</span>
            <span>·</span>
            <span>Recruiter: Neha</span>
            <span>·</span>
            <span>Dean: Gupta</span>
          </div>

        </div>
      )}
    </aside>
  );
}

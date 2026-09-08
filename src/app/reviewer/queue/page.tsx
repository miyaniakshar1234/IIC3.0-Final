'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  ClipboardCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  GraduationCap,
  Award,
  Filter,
  Check,
  Zap,
  BarChart3,
} from 'lucide-react';

interface SubmissionItem {
  id: string;
  student_name: string;
  student_program: string;
  student_institution: string;
  challenge_title: string;
  target_skill: string;
  required_level: number;
  weight: number;
  submitted_time_ago: string;
  urgency_label: string;
  urgency_variant: 'amber' | 'blue' | 'emerald';
  status: 'pending' | 'completed';
  evaluated_level?: number;
  evaluated_date?: string;
  evaluation_url: string;
}

const DEFAULT_SUBMISSIONS: SubmissionItem[] = [
  {
    id: 'sub-sql-001', student_name: 'Meera Patel', student_program: 'MCA 2026',
    student_institution: 'Manipal University Jaipur (MUJ)', challenge_title: 'Explain Monthly Sales from Messy Dataset',
    target_skill: 'SQL (Structured Query Language)', required_level: 3, weight: 35,
    submitted_time_ago: '2 hours ago', urgency_label: 'Needs Review (< 24h SLA)', urgency_variant: 'amber',
    status: 'pending', evaluation_url: '/reviewer/evaluations/sub-sql-001',
  },
  {
    id: 'sub-html-002', student_name: 'Aarav Sharma', student_program: 'B.Tech CS 2026',
    student_institution: 'Manipal University Jaipur (MUJ)', challenge_title: 'Build Accessible Keyboard Navigation Flow',
    target_skill: 'HTML/CSS & Accessibility (WCAG 2.2)', required_level: 3, weight: 25,
    submitted_time_ago: '1 day ago', urgency_label: 'Completed & Published', urgency_variant: 'emerald',
    status: 'completed', evaluated_level: 3, evaluated_date: 'Sep 07, 2026',
    evaluation_url: '/reviewer/evaluations/sub-html-002',
  },
  {
    id: 'sub-api-003', student_name: 'Rohan Gupta', student_program: 'MCA 2026',
    student_institution: 'Manipal University Jaipur (MUJ)', challenge_title: 'Robust REST Client with Exponential Backoff',
    target_skill: 'API Integration & Resilience', required_level: 2, weight: 20,
    submitted_time_ago: '3 hours ago', urgency_label: 'In Progress', urgency_variant: 'blue',
    status: 'pending', evaluation_url: '/reviewer/evaluations/sub-api-003',
  },
];

import { useAuth } from '@/context/AuthContext';

export default function ReviewerQueuePage() {
  const { user } = useAuth();
  const isDemoReviewer = user?.email?.includes('alok.sharma') ?? false;

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveState() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setHasVerifiedSql(Boolean(json.data.has_verified_sql));
          }
        }
      } catch (e) {
        console.warn('Could not load live state for reviewer queue:', e);
      }
    }
    loadLiveState();
    const interval = setInterval(loadLiveState, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const baseSubmissions = isDemoReviewer ? DEFAULT_SUBMISSIONS : [];

  const submissions = baseSubmissions.map((s) => {
    if (s.id === 'sub-sql-001' && hasVerifiedSql) {
      return {
        ...s,
        status: 'completed' as const,
        urgency_label: 'Completed & Published (Level 3)',
        urgency_variant: 'emerald' as const,
        evaluated_level: 3,
        evaluated_date: 'Just now',
      };
    }
    return s;
  });

  const visible = submissions.filter((s) => (filter === 'all' ? true : s.status === filter));
  const pending = submissions.filter((s) => s.status === 'pending').length;
  const completed = submissions.filter((s) => s.status === 'completed').length;

  const urgencyStyle: Record<string, string> = {
    amber:   'bg-warning/10 text-warning border-warning/25',
    blue:    'bg-info/10 text-info border-info/25',
    emerald: 'bg-success/10 text-success border-success/25',
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">

        {/* ── HEADER ── */}
        <div className="pb-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="section-label mb-1">Reviewer Workspace</div>
            <h1 className="text-2xl font-black text-text-primary">Evaluation Queue</h1>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              {user?.name || 'Faculty Evaluator'} · Faculty Evaluator · {user?.institutionName || 'Institution'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {pending > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/30 text-warning text-xs font-bold">
                <AlertCircle className="w-3.5 h-3.5" />
                {pending} Pending
              </div>
            )}
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Queue',  value: submissions.length, icon: ClipboardCheck, color: 'text-accent'  },
            { label: 'Pending',      value: pending,            icon: Clock,          color: 'text-warning' },
            { label: 'Completed',    value: completed,          icon: CheckCircle2,   color: 'text-success' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="pb-card p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="section-label text-[9px]">{label}</span>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className={`metric-value text-3xl ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-border w-fit">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {f} {f === 'pending' ? `(${pending})` : f === 'completed' ? `(${completed})` : `(${submissions.length})`}
            </button>
          ))}
        </div>

        {/* ── SUBMISSION CARDS ── */}
        <div className="space-y-3">
          {visible.map((sub) => (
            <div key={sub.id} className="pb-card p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:border-border-bright transition-all group">
              {/* Status dot */}
              <div className="shrink-0 pt-0.5">
                <div className={`w-2.5 h-2.5 rounded-full ${sub.status === 'pending' ? 'bg-warning animate-pulse-slow' : 'bg-success'}`} />
              </div>

              {/* Main info */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${urgencyStyle[sub.urgency_variant]}`}>
                    {sub.urgency_label}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono">{sub.submitted_time_ago}</span>
                </div>

                <h3 className="text-sm font-bold text-text-primary leading-snug">{sub.challenge_title}</h3>

                <div className="flex flex-wrap gap-3 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {sub.student_name} · {sub.student_program}</span>
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {sub.student_institution}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="pb-badge"><Award className="w-3 h-3 text-accent" />{sub.target_skill}</span>
                  <span className="pb-badge">Required L{sub.required_level} · Weight {sub.weight}%</span>
                  {sub.evaluated_level && (
                    <span className="pb-badge pb-badge-accent"><Check className="w-3 h-3" />L{sub.evaluated_level} · {sub.evaluated_date}</span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <Link
                  href={sub.evaluation_url}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    sub.status === 'pending'
                      ? 'pb-btn-primary py-2 px-4 text-xs'
                      : 'pb-btn-ghost py-2 px-4 text-xs'
                  }`}
                >
                  {sub.status === 'pending' ? (
                    <><Zap className="w-3.5 h-3.5" /> Evaluate Now <ArrowRight className="w-3.5 h-3.5" /></>
                  ) : (
                    <><FileText className="w-3.5 h-3.5" /> View Review</>
                  )}
                </Link>
              </div>
            </div>
          ))}

          {visible.length === 0 && (
            <div className="pb-card p-12 text-center">
              <BarChart3 className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-40" />
              <p className="text-text-secondary font-semibold">Queue is clear</p>
              <p className="text-text-muted text-xs mt-1">All submissions in this filter have been evaluated.</p>
            </div>
          )}
        </div>

        {/* How rubric scoring works */}
        <div className="pb-card p-5 space-y-3">
          <div className="section-label">Rubric Scoring Reference</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { level: 1, name: 'Novice',     desc: 'Needs scaffolding, basic concepts attempted' },
              { level: 2, name: 'Developing', desc: 'Core concept understood, gaps remain' },
              { level: 3, name: 'Proficient', desc: 'Solid execution, meets job standard' },
              { level: 4, name: 'Expert',     desc: 'Beyond expectations, can mentor others' },
            ].map(({ level, name, desc }) => (
              <div key={level} className="bg-canvas rounded-xl p-3 border border-border space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="metric-value text-lg text-accent">L{level}</span>
                  <span className="text-xs font-bold text-text-primary">{name}</span>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}

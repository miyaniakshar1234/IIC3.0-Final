'use client';

import React, { useState } from 'react';
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
  Calendar,
  Sparkles,
  Award,
  Filter,
  Check
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

const SUBMISSIONS: SubmissionItem[] = [
  {
    id: 'sub-sql-001',
    student_name: 'Meera Patel',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    challenge_title: 'Explain Monthly Sales from Messy Dataset',
    target_skill: 'SQL (Structured Query Language)',
    required_level: 3,
    weight: 35,
    submitted_time_ago: '2 hours ago',
    urgency_label: 'Needs Review (< 24h SLA)',
    urgency_variant: 'amber',
    status: 'pending',
    evaluation_url: '/reviewer/evaluations/sub-sql-001',
  },
  {
    id: 'sub-html-002',
    student_name: 'Aarav Sharma',
    student_program: 'B.Tech CS 2026',
    student_institution: 'Demo College of Computing',
    challenge_title: 'Build Accessible Keyboard Navigation Flow',
    target_skill: 'HTML/CSS & Accessibility (WCAG 2.2)',
    required_level: 3,
    weight: 25,
    submitted_time_ago: '1 day ago',
    urgency_label: 'Completed & Published',
    urgency_variant: 'emerald',
    status: 'completed',
    evaluated_level: 3,
    evaluated_date: 'Sep 07, 2026',
    evaluation_url: '/reviewer/evaluations/sub-html-002',
  },
  {
    id: 'sub-api-003',
    student_name: 'Rohan Gupta',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    challenge_title: 'Robust REST Client with Exponential Backoff',
    target_skill: 'API Integration & Resilience',
    required_level: 2,
    weight: 20,
    submitted_time_ago: '2 days ago',
    urgency_label: 'Completed & Published',
    urgency_variant: 'emerald',
    status: 'completed',
    evaluated_level: 2,
    evaluated_date: 'Sep 06, 2026',
    evaluation_url: '/reviewer/evaluations/sub-api-003',
  },
];

export default function ReviewerQueuePage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredSubmissions = SUBMISSIONS.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-white/10 p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <ClipboardCheck className="w-4 h-4 text-accent" />
                <span>Verified Faculty Assessment Workspace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 tracking-tight">
                Faculty Review Queue • Dr. Alok Sharma
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Department of Computer Science • Demo College of Computing
              </p>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center space-x-2 self-start md:self-center px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active Evaluator Session</span>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10 relative z-10">
            {/* Amber Pill: Pending */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold shadow-[0_0_12px_rgba(245,158,11,0.12)]">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>1 Pending Review</span>
            </div>

            {/* Emerald Pill: Semester Published */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>14 Reviews Published this Semester</span>
            </div>

            {/* Blue Pill: Turnaround SLA */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/30 text-xs font-mono font-semibold shadow-[0_0_12px_rgba(59,130,246,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnaround SLA: &lt; 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Informational Banner */}
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 flex items-start space-x-4 text-xs text-zinc-300 shadow-lg">
          <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5 border border-accent/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            <Award className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-zinc-100 text-sm block">
              Human-in-the-Loop Integrity Principle
            </span>
            <p className="text-zinc-400 leading-relaxed font-light">
              Every skill badge in ProofBridge is grounded in anchored rubric evaluation by a certified faculty member.
              When you publish an evaluation, your qualitative rationale and level assessment atomically update the student&apos;s tamper-proof passport.
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Submissions', count: SUBMISSIONS.length },
              { id: 'pending', label: 'Needs Review', count: 1 },
              { id: 'completed', label: 'Completed', count: 2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-accent text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    filter === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
            Sorted by Urgency (Oldest submitted first)
          </span>
        </div>

        {/* Queue Cards */}
        <div className="space-y-4">
          {filteredSubmissions.map((item) => {
            const isPending = item.status === 'pending';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-6 shadow-xl transition-all space-y-4 ${
                  isPending
                    ? 'bg-gradient-to-br from-zinc-900/90 to-zinc-950 border-accent/40 shadow-[0_0_30px_rgba(59,130,246,0.08)]'
                    : 'bg-zinc-900/60 backdrop-blur-xl border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Info */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Urgency Pill */}
                      <span
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                          item.urgency_variant === 'amber'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                            : item.urgency_variant === 'emerald'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{item.urgency_label}</span>
                      </span>

                      {/* Target Skill */}
                      <span className="text-xs font-mono font-bold text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
                        {item.target_skill}
                      </span>

                      {/* Required Level */}
                      <span className="text-xs font-mono text-zinc-400">
                        Required: Level {item.required_level}
                      </span>
                    </div>

                    {/* Challenge Title */}
                    <h2 className="text-xl font-bold text-zinc-100">
                      {item.challenge_title}
                    </h2>

                    {/* Student Metadata */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 pt-1 font-mono">
                      <span className="flex items-center space-x-1.5 font-bold text-zinc-200">
                        <User className="w-4 h-4 text-accent" />
                        <span>{item.student_name}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{item.student_program} • {item.student_institution}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Submitted {item.submitted_time_ago}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    {isPending ? (
                      <Link
                        href={item.evaluation_url}
                        className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent-hover shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] transition-all"
                      >
                        <span>Evaluate Submission</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Awarded Level {item.evaluated_level}</span>
                        </span>
                        <Link
                          href={item.evaluation_url}
                          className="px-3.5 py-2 rounded-xl border border-white/10 text-xs font-mono font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                        >
                          Review Again
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

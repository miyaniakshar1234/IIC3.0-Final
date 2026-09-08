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
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider">
                <ClipboardCheck className="w-4 h-4" />
                <span>Verified Faculty Assessment Workspace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Faculty Review Queue • Dr. Alok Sharma
              </h1>
              <p className="text-sm text-text-secondary">
                Department of Computer Science • Demo College of Computing
              </p>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center space-x-2 self-start md:self-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-success">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Evaluator Session</span>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-100">
            {/* Amber Pill: Pending */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-warning border border-amber-200 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>1 Pending Review</span>
            </div>

            {/* Emerald Pill: Semester Published */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-success border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>14 Reviews Published this Semester</span>
            </div>

            {/* Blue Pill: Turnaround SLA */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-accent border border-blue-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnaround SLA: &lt; 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Informational Banner */}
        <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-5 flex items-start space-x-3.5 text-xs text-text-primary">
          <div className="w-8 h-8 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
            <Award className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-text-primary text-sm block">
              Human-in-the-Loop Integrity Principle
            </span>
            <p className="text-text-secondary leading-relaxed">
              Every skill badge in ProofBridge is grounded in anchored rubric evaluation by a certified faculty member.
              When you publish an evaluation, your qualitative rationale and level assessment atomically update the student's tamper-proof passport.
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Submissions', count: SUBMISSIONS.length },
              { id: 'pending', label: 'Needs Review', count: 1 },
              { id: 'completed', label: 'Completed', count: 2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === tab.id
                    ? 'bg-accent-soft text-accent border border-blue-200'
                    : 'text-text-secondary hover:text-text-primary hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    filter === tab.id
                      ? 'bg-accent text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs text-text-secondary hidden sm:inline-block">
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
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Info */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Urgency Pill */}
                      <span
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          item.urgency_variant === 'amber'
                            ? 'bg-amber-50 text-warning border-amber-200'
                            : item.urgency_variant === 'emerald'
                            ? 'bg-emerald-50 text-success border-emerald-200'
                            : 'bg-blue-50 text-accent border-blue-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{item.urgency_label}</span>
                      </span>

                      {/* Target Skill */}
                      <span className="text-xs font-bold text-accent bg-accent-soft border border-blue-200 px-3 py-1 rounded-full">
                        {item.target_skill}
                      </span>

                      {/* Required Level */}
                      <span className="text-xs text-text-secondary font-medium">
                        Required: Level {item.required_level}
                      </span>
                    </div>

                    {/* Challenge Title */}
                    <h2 className="text-xl font-bold text-text-primary">
                      {item.challenge_title}
                    </h2>

                    {/* Student Metadata */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary pt-1">
                      <span className="flex items-center space-x-1.5 font-bold text-text-primary">
                        <User className="w-4 h-4 text-accent" />
                        <span>{item.student_name}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.student_program} • {item.student_institution}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Submitted {item.submitted_time_ago}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {isPending ? (
                      <Link
                        href={item.evaluation_url}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover shadow-sm hover:shadow transition-all"
                      >
                        <span>Evaluate Submission</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-semibold text-success bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Awarded Level {item.evaluated_level}</span>
                        </span>
                        <Link
                          href={item.evaluation_url}
                          className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-slate-50 transition-colors"
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

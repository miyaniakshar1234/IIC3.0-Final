'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge } from '@/components/employer/StatusBadge';
import {
  ClipboardCheck,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  GraduationCap,
  Calendar,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface ReviewQueueItem {
  id: string; // Assignment ID
  submission_id: string;
  revision_id: string;
  challenge_id: string;
  challenge_title: string;
  student_name: string;
  student_program: string;
  student_institution: string;
  primary_skill: string;
  target_level: number;
  weight: number;
  submitted_at: string;
  due_date: string;
  status: 'awaiting_review' | 'changes_requested' | 'reviewed';
  revision_number: number;
  criteria_count: number;
}

const DEMO_QUEUE: ReviewQueueItem[] = [
  {
    id: '60000000-0000-0000-0000-000000000001',
    submission_id: '50000000-0000-0000-0000-000000000001',
    revision_id: '50000000-0000-0000-0000-000000000002',
    challenge_id: '40000000-0000-0000-0000-000000000001',
    challenge_title: 'Explain monthly sales from a messy dataset',
    student_name: 'Meera Patel',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    primary_skill: 'SQL Querying & Data Cleaning',
    target_level: 3,
    weight: 35,
    submitted_at: '2026-09-08T14:30:00Z',
    due_date: '2026-09-10T14:30:00Z',
    status: 'awaiting_review',
    revision_number: 1,
    criteria_count: 2,
  },
  {
    id: '60000000-0000-0000-0000-000000000002',
    submission_id: '50000000-0000-0000-0000-000000000003',
    revision_id: '50000000-0000-0000-0000-000000000004',
    challenge_id: '40000000-0000-0000-0000-000000000002',
    challenge_title: 'Build a Responsive Accessible Form Component',
    student_name: 'Aarav Sharma',
    student_program: 'B.Tech CS 2026',
    student_institution: 'Demo College of Computing',
    primary_skill: 'HTML/CSS & Accessibility',
    target_level: 3,
    weight: 25,
    submitted_at: '2026-09-07T11:15:00Z',
    due_date: '2026-09-09T11:15:00Z',
    status: 'changes_requested',
    revision_number: 2,
    criteria_count: 3,
  },
  {
    id: '60000000-0000-0000-0000-000000000003',
    submission_id: '50000000-0000-0000-0000-000000000005',
    revision_id: '50000000-0000-0000-0000-000000000006',
    challenge_id: '40000000-0000-0000-0000-000000000003',
    challenge_title: 'API Integration and Retry Backoff Simulation',
    student_name: 'Rohan Gupta',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    primary_skill: 'API Integration',
    target_level: 2,
    weight: 20,
    submitted_at: '2026-09-06T16:00:00Z',
    due_date: '2026-09-08T16:00:00Z',
    status: 'reviewed',
    revision_number: 1,
    criteria_count: 2,
  },
];

export default function ReviewerQueuePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'awaiting_review' | 'changes_requested' | 'reviewed'>('all');
  const [queue, setQueue] = useState<ReviewQueueItem[]>(DEMO_QUEUE);
  const [declinedId, setDeclinedId] = useState<string | null>(null);

  const handleDecline = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to decline this review assignment? It will return to the unassigned queue.')) {
      setQueue((prev) => prev.filter((item) => item.id !== id));
      setDeclinedId(id);
    }
  };

  const filteredQueue = queue.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const pendingCount = queue.filter((item) => item.status === 'awaiting_review').length;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-accent">
              <ClipboardCheck className="w-4 h-4" />
              <span>Reviewer Workspace • Dr. Sharma</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mt-1">
              Assessment Assignment Queue
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Evaluate student challenge submissions against anchored rubrics to award tamper-proof skill attainments.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-canvas border border-border px-4 py-2 rounded-lg text-left">
              <span className="text-[11px] text-text-secondary font-medium block">
                Pending Evaluation
              </span>
              <span className="text-lg font-bold text-accent">
                {pendingCount} {pendingCount === 1 ? 'Submission' : 'Submissions'}
              </span>
            </div>
          </div>
        </div>

        {/* Informational Guidance Alert */}
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 sm:p-5 flex items-start space-x-3 text-xs text-text-primary">
          <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-accent block">
              Evaluator Protocol & Atomic Verification
            </span>
            <p className="text-text-secondary leading-relaxed">
              Every criterion must be evaluated with an anchored score (Levels 0 to 4) and a concrete rationale.
              Publishing a review atomically updates the student's Evidence Passport and recalculates role coverage for linked employers.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-border pb-1">
          <div className="flex space-x-1 sm:space-x-2">
            {[
              { id: 'all', label: 'All Submissions', count: queue.length },
              { id: 'awaiting_review', label: 'Awaiting Review', count: pendingCount },
              {
                id: 'changes_requested',
                label: 'Changes Requested',
                count: queue.filter((i) => i.status === 'changes_requested').length,
              },
              {
                id: 'reviewed',
                label: 'Completed',
                count: queue.filter((i) => i.status === 'reviewed').length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent-soft text-accent border border-blue-200'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Queue List */}
        <div className="space-y-4">
          {filteredQueue.length === 0 ? (
            <div className="bg-surface rounded-xl border border-border p-12 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto" />
              <h3 className="text-base font-semibold text-text-primary">
                Queue is all caught up!
              </h3>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                There are currently no submissions matching this filter. New submissions will appear here once finalized by students.
              </p>
            </div>
          ) : (
            filteredQueue.map((item) => (
              <div
                key={item.id}
                className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:border-gray-300 transition-all space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Submission Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={item.status} size="sm" />
                      <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-soft px-2.5 py-0.5 rounded-full border border-blue-200">
                        {item.primary_skill}
                      </span>
                      <span className="text-xs text-text-secondary">
                        Rev {item.revision_number} • {item.criteria_count} Rubric Criteria
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-text-primary hover:text-accent transition-colors">
                      <Link href={`/reviewer/submissions/${item.submission_id}`}>
                        {item.challenge_title}
                      </Link>
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                      <span className="flex items-center space-x-1.5 font-medium text-text-primary">
                        <User className="w-3.5 h-3.5 text-accent" />
                        <span>{item.student_name}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.student_program} ({item.student_institution})</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Submitted {new Date(item.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0 self-start lg:self-center">
                    <button
                      onClick={(e) => handleDecline(item.id, e)}
                      className="px-3 py-2 text-xs font-medium text-text-secondary hover:text-danger hover:bg-red-50 rounded-md border border-transparent hover:border-red-200 transition-colors"
                      title="Decline assignment if conflict of interest"
                    >
                      Decline
                    </button>

                    <Link
                      href={`/reviewer/submissions/${item.submission_id}`}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover shadow-sm transition-all"
                    >
                      <span>{item.status === 'reviewed' ? 'View Evaluation' : 'Evaluate Work'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}

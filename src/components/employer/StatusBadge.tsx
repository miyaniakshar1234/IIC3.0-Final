import React from 'react';
import {
  Clock,
  CheckCircle2,
  Calendar,
  Award,
  XCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export type ApplicationStatus =
  | 'submitted'
  | 'shortlisted'
  | 'interview'
  | 'offered'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'
  | 'declined';

export type ReviewStatus =
  | 'awaiting_review'
  | 'changes_requested'
  | 'reviewed'
  | 'draft'
  | 'voided';

interface StatusBadgeProps {
  status: ApplicationStatus | ReviewStatus | string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export function StatusBadge({ status, size = 'sm', showIcon = true }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const config: Record<
    string,
    { label: string; bg: string; text: string; border: string; icon: React.ElementType }
  > = {
    // Application Lifecycle
    submitted: {
      label: 'Submitted',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.12)]',
      icon: Clock,
    },
    shortlisted: {
      label: 'Shortlisted',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
      icon: CheckCircle2,
    },
    interview: {
      label: 'Interviewing',
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.15)]',
      icon: Calendar,
    },
    offered: {
      label: 'Offer Extended',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]',
      icon: Award,
    },
    accepted: {
      label: 'Offer Accepted',
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-300',
      border: 'border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]',
      icon: CheckCircle2,
    },
    rejected: {
      label: 'Not Selected',
      bg: 'bg-zinc-900/80',
      text: 'text-zinc-500',
      border: 'border-zinc-800',
      icon: XCircle,
    },
    withdrawn: {
      label: 'Withdrawn',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      icon: AlertCircle,
    },
    declined: {
      label: 'Offer Declined',
      bg: 'bg-zinc-900/80',
      text: 'text-zinc-500',
      border: 'border-zinc-800',
      icon: XCircle,
    },

    // Review Lifecycle
    awaiting_review: {
      label: 'Awaiting Review',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.12)]',
      icon: Clock,
    },
    under_review: {
      label: 'Under Review',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.12)]',
      icon: Clock,
    },
    changes_requested: {
      label: 'Changes Requested',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      icon: AlertCircle,
    },
    reviewed: {
      label: 'Reviewed',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
      icon: CheckCircle2,
    },
    draft: {
      label: 'Draft',
      bg: 'bg-zinc-900/80',
      text: 'text-zinc-400',
      border: 'border-zinc-700/50',
      icon: Clock,
    },
    voided: {
      label: 'Voided',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/30',
      icon: AlertCircle,
    },
  };

  const current = config[normalized] || {
    label: status.replace(/_/g, ' '),
    bg: 'bg-zinc-900/80',
    text: 'text-zinc-400',
    border: 'border-zinc-700/50',
    icon: HelpCircle,
  };

  const Icon = current.icon;
  const sizeClasses =
    size === 'sm' ? 'px-2.5 py-0.5 text-[11px] gap-1.5' : 'px-3 py-1 text-xs gap-2';

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span className="capitalize">{current.label}</span>
    </span>
  );
}

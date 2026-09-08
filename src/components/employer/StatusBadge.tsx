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
      bg: 'bg-accent-soft',
      text: 'text-accent',
      border: 'border-blue-200',
      icon: Clock,
    },
    shortlisted: {
      label: 'Shortlisted',
      bg: 'bg-emerald-50',
      text: 'text-success',
      border: 'border-emerald-200',
      icon: CheckCircle2,
    },
    interview: {
      label: 'Interviewing',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: Calendar,
    },
    offered: {
      label: 'Offer Extended',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: Award,
    },
    accepted: {
      label: 'Offer Accepted',
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-300',
      icon: CheckCircle2,
    },
    rejected: {
      label: 'Not Selected',
      bg: 'bg-gray-100',
      text: 'text-text-secondary',
      border: 'border-gray-200',
      icon: XCircle,
    },
    withdrawn: {
      label: 'Withdrawn',
      bg: 'bg-amber-50',
      text: 'text-warning',
      border: 'border-amber-200',
      icon: AlertCircle,
    },
    declined: {
      label: 'Offer Declined',
      bg: 'bg-gray-100',
      text: 'text-text-secondary',
      border: 'border-gray-200',
      icon: XCircle,
    },

    // Review Lifecycle
    awaiting_review: {
      label: 'Awaiting Review',
      bg: 'bg-amber-50',
      text: 'text-warning',
      border: 'border-amber-200',
      icon: Clock,
    },
    under_review: {
      label: 'Under Review',
      bg: 'bg-blue-50',
      text: 'text-accent',
      border: 'border-blue-200',
      icon: Clock,
    },
    changes_requested: {
      label: 'Changes Requested',
      bg: 'bg-amber-50',
      text: 'text-warning',
      border: 'border-amber-200',
      icon: AlertCircle,
    },
    reviewed: {
      label: 'Reviewed',
      bg: 'bg-emerald-50',
      text: 'text-success',
      border: 'border-emerald-200',
      icon: CheckCircle2,
    },
    draft: {
      label: 'Draft',
      bg: 'bg-gray-100',
      text: 'text-text-secondary',
      border: 'border-gray-200',
      icon: Clock,
    },
    voided: {
      label: 'Voided',
      bg: 'bg-red-50',
      text: 'text-danger',
      border: 'border-red-200',
      icon: AlertCircle,
    },
  };

  const current = config[normalized] || {
    label: status.replace(/_/g, ' '),
    bg: 'bg-gray-50',
    text: 'text-text-secondary',
    border: 'border-gray-200',
    icon: HelpCircle,
  };

  const Icon = current.icon;
  const sizeClasses =
    size === 'sm' ? 'px-2.5 py-0.5 text-[11px] gap-1.5' : 'px-3 py-1 text-xs gap-2';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span className="capitalize">{current.label}</span>
    </span>
  );
}

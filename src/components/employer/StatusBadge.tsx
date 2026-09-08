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
      bg: 'bg-info/10',
      text: 'text-info',
      border: 'border-info/30',
      icon: Clock,
    },
    shortlisted: {
      label: 'Shortlisted',
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30 shadow-sm',
      icon: CheckCircle2,
    },
    interview: {
      label: 'Interviewing',
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-border-accent',
      icon: Calendar,
    },
    offered: {
      label: 'Offer Extended',
      bg: 'bg-accent/15',
      text: 'text-accent',
      border: 'border-border-accent shadow-sm',
      icon: Award,
    },
    accepted: {
      label: 'Offer Accepted',
      bg: 'bg-success/15',
      text: 'text-success',
      border: 'border-success/40 shadow-sm',
      icon: CheckCircle2,
    },
    rejected: {
      label: 'Not Selected',
      bg: 'bg-surface-raised',
      text: 'text-text-muted',
      border: 'border-border',
      icon: XCircle,
    },
    withdrawn: {
      label: 'Withdrawn',
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      icon: AlertCircle,
    },
    declined: {
      label: 'Offer Declined',
      bg: 'bg-surface-raised',
      text: 'text-text-muted',
      border: 'border-border',
      icon: XCircle,
    },

    // Review Lifecycle
    awaiting_review: {
      label: 'Awaiting Review',
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30 shadow-sm',
      icon: Clock,
    },
    under_review: {
      label: 'Under Review',
      bg: 'bg-info/10',
      text: 'text-info',
      border: 'border-info/30',
      icon: Clock,
    },
    changes_requested: {
      label: 'Changes Requested',
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      icon: AlertCircle,
    },
    reviewed: {
      label: 'Reviewed',
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30 shadow-sm',
      icon: CheckCircle2,
    },
    published: {
      label: 'Published',
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/30',
      icon: CheckCircle2,
    },
    draft: {
      label: 'Draft',
      bg: 'bg-surface-raised',
      text: 'text-text-muted',
      border: 'border-border',
      icon: Clock,
    },
    closed: {
      label: 'Closed',
      bg: 'bg-surface-raised',
      text: 'text-text-muted',
      border: 'border-border',
      icon: XCircle,
    },
    voided: {
      label: 'Voided',
      bg: 'bg-danger/10',
      text: 'text-danger',
      border: 'border-danger/30',
      icon: AlertCircle,
    },
  };

  const current = config[normalized] || {
    label: status.replace(/_/g, ' '),
    bg: 'bg-surface-raised',
    text: 'text-text-muted',
    border: 'border-border',
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

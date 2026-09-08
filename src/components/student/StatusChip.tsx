import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, HelpCircle, AlertCircle, FileEdit, XCircle } from 'lucide-react';

export type StatusType = 
  | 'reviewed'
  | 'self-declared'
  | 'awaiting-review'
  | 'not-demonstrated'
  | 'changes-requested'
  | 'voided';

interface StatusChipProps {
  status: StatusType;
  reviewerName?: string;
  reviewedDate?: string;
  className?: string;
}

export function StatusChip({ status, reviewerName, reviewedDate, className }: StatusChipProps) {
  switch (status) {
    case 'reviewed':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono bg-success/10 text-success border border-success/30 shadow-sm', className)}>
          <CheckCircle2 className="w-3 h-3 text-success" />
          <span>
            {reviewerName && reviewedDate 
              ? `Reviewed by ${reviewerName} • ${reviewedDate}`
              : 'Reviewed by Faculty'}
          </span>
        </span>
      );
    case 'self-declared':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono bg-info/10 text-info border border-info/30 shadow-sm', className)}>
          <HelpCircle className="w-3 h-3 text-info" />
          <span>Self-declared (Unverified)</span>
        </span>
      );
    case 'awaiting-review':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono bg-warning/10 text-warning border border-warning/30 shadow-sm', className)}>
          <Clock className="w-3 h-3 text-warning animate-pulse" />
          <span>Awaiting Review (&lt;24h SLA)</span>
        </span>
      );
    case 'changes-requested':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono bg-warning/10 text-warning border border-warning/30 shadow-sm', className)}>
          <FileEdit className="w-3 h-3 text-warning" />
          <span>Changes Requested</span>
        </span>
      );
    case 'voided':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono bg-surface-raised text-text-muted border border-border line-through', className)}>
          <XCircle className="w-3 h-3 text-text-muted" />
          <span>Voided</span>
        </span>
      );
    case 'not-demonstrated':
    default:
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-mono bg-surface text-text-muted border border-border', className)}>
          <AlertCircle className="w-3 h-3 text-text-muted" />
          <span>Not Yet Demonstrated</span>
        </span>
      );
  }
}

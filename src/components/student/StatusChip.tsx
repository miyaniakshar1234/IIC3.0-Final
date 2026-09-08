import React from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle2, Clock, HelpCircle, AlertCircle, FileEdit, XCircle } from 'lucide-react'

export type StatusType = 
  | 'reviewed'
  | 'self-declared'
  | 'awaiting-review'
  | 'not-demonstrated'
  | 'changes-requested'
  | 'voided'

interface StatusChipProps {
  status: StatusType
  reviewerName?: string
  reviewedDate?: string
  className?: string
}

export function StatusChip({ status, reviewerName, reviewedDate, className }: StatusChipProps) {
  switch (status) {
    case 'reviewed':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]', className)}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {reviewerName && reviewedDate 
              ? `Reviewed by ${reviewerName} • ${reviewedDate}`
              : 'Reviewed by Faculty'}
          </span>
        </span>
      )
    case 'self-declared':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.12)]', className)}>
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Self-declared (Unverified)</span>
        </span>
      )
    case 'awaiting-review':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.12)]', className)}>
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Awaiting Review (&lt;24h SLA)</span>
        </span>
      )
    case 'changes-requested':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.12)]', className)}>
          <FileEdit className="w-3.5 h-3.5 text-purple-400" />
          <span>Changes Requested</span>
        </span>
      )
    case 'voided':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-zinc-800/80 text-zinc-500 border border-zinc-700/60 line-through', className)}>
          <XCircle className="w-3.5 h-3.5 text-zinc-500" />
          <span>Voided</span>
        </span>
      )
    case 'not-demonstrated':
    default:
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-700/50', className)}>
          <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
          <span>Not Yet Demonstrated</span>
        </span>
      )
  }
}

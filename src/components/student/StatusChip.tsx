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
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200', className)}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {reviewerName && reviewedDate 
              ? `Reviewed by ${reviewerName} on ${reviewedDate}`
              : 'Reviewed'}
          </span>
        </span>
      )
    case 'self-declared':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200', className)}>
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Self-declared</span>
        </span>
      )
    case 'awaiting-review':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200', className)}>
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Awaiting review</span>
        </span>
      )
    case 'changes-requested':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300', className)}>
          <FileEdit className="w-3.5 h-3.5 text-amber-600" />
          <span>Changes requested</span>
        </span>
      )
    case 'voided':
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300 line-through', className)}>
          <XCircle className="w-3.5 h-3.5 text-gray-500" />
          <span>Voided</span>
        </span>
      )
    case 'not-demonstrated':
    default:
      return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200', className)}>
          <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
          <span>Not yet demonstrated</span>
        </span>
      )
  }
}

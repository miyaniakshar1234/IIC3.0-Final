import React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, Info } from 'lucide-react'

interface CoverageBarProps {
  currentCoverage: number
  previousCoverage?: number
  targetRoleTitle?: string
  showCalculationToggle?: boolean
  onToggleCalculation?: () => void
  className?: string
}

export function CoverageBar({
  currentCoverage,
  previousCoverage,
  targetRoleTitle,
  showCalculationToggle = true,
  onToggleCalculation,
  className,
}: CoverageBarProps) {
  const percentage = Math.min(Math.max(currentCoverage, 0), 100)
  const isLeap = previousCoverage !== undefined && currentCoverage > previousCoverage

  return (
    <div className={cn('bg-surface p-5 rounded-xl border border-border shadow-sm', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary">
            {targetRoleTitle ? `Reviewed Coverage for ${targetRoleTitle}` : 'Reviewed Role Coverage'}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            {isLeap ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-400 line-through">{previousCoverage}%</span>
                <span className="text-3xl font-extrabold text-accent flex items-center gap-1">
                  {percentage}%
                  <TrendingUp className="w-6 h-6 text-emerald-600 animate-bounce" />
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  +{currentCoverage - previousCoverage}% After Review
                </span>
              </div>
            ) : (
              <span className="text-3xl font-extrabold text-text-primary">{percentage}%</span>
            )}
          </div>
        </div>

        {showCalculationToggle && onToggleCalculation && (
          <button
            onClick={onToggleCalculation}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline self-start sm:self-center"
          >
            <Info className="w-4 h-4" />
            How this is calculated
          </button>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden border border-gray-200">
        <div
          className="bg-accent h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-text-secondary mt-2.5">
        Calculated deterministically using active reviewed attainments vs role skill weights. Missing skills contribute 0 points.
      </p>
    </div>
  )
}

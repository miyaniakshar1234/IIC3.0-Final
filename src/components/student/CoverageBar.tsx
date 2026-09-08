'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Info, Zap } from 'lucide-react';

interface CoverageBarProps {
  currentCoverage: number;
  previousCoverage?: number;
  targetRoleTitle?: string;
  showCalculationToggle?: boolean;
  onToggleCalculation?: () => void;
  className?: string;
}

export function CoverageBar({
  currentCoverage,
  previousCoverage,
  targetRoleTitle,
  showCalculationToggle = true,
  onToggleCalculation,
  className,
}: CoverageBarProps) {
  const percentage = Math.min(Math.max(currentCoverage, 0), 100);
  const isLeap = previousCoverage !== undefined && currentCoverage > previousCoverage;

  return (
    <div className={cn('pb-card p-6 space-y-4', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="section-label mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>{targetRoleTitle ? `Reviewed Match for ${targetRoleTitle}` : 'Reviewed Role Match Coverage'}</span>
          </div>
          <div className="flex items-baseline gap-3">
            {isLeap ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="metric-value text-2xl text-text-muted line-through">{previousCoverage}%</span>
                <span className="metric-value text-4xl text-accent flex items-center gap-1.5">
                  {percentage}%
                  <TrendingUp className="w-6 h-6 text-success animate-pulse" />
                </span>
                <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-success/10 text-success border border-success/30">
                  +{currentCoverage - previousCoverage}% Post-Faculty Attainment
                </span>
              </div>
            ) : (
              <span className="metric-value text-4xl text-accent">{percentage}%</span>
            )}
          </div>
        </div>

        {showCalculationToggle && onToggleCalculation && (
          <button
            onClick={onToggleCalculation}
            className="pb-btn-ghost text-xs self-start sm:self-center flex items-center gap-1.5 py-1.5 px-3"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Formula Breakdown</span>
          </button>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full bg-canvas rounded-full h-3 overflow-hidden border border-border p-0.5">
        <div
          className="bg-accent h-full rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-text-muted font-mono leading-relaxed">
        Calculated deterministically using active reviewed attainments vs role skill weights (<code className="text-accent">coverage-v1</code>). Unverified skills contribute 0 points.
      </p>
    </div>
  );
}

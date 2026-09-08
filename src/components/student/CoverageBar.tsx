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
    <div className={cn('glass-card p-6 rounded-2xl border border-white/10 shadow-xl space-y-4', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>{targetRoleTitle ? `Reviewed Match for ${targetRoleTitle}` : 'Reviewed Role Match Coverage'}</span>
          </div>
          <div className="flex items-baseline gap-3">
            {isLeap ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-zinc-500 line-through font-mono">{previousCoverage}%</span>
                <span className="text-4xl font-black text-white font-mono flex items-center gap-1.5">
                  {percentage}%
                  <TrendingUp className="w-6 h-6 text-emerald-400 animate-pulse" />
                </span>
                <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  +{currentCoverage - previousCoverage}% Post-Faculty Attainment
                </span>
              </div>
            ) : (
              <span className="text-4xl font-black text-white font-mono">{percentage}%</span>
            )}
          </div>
        </div>

        {showCalculationToggle && onToggleCalculation && (
          <button
            onClick={onToggleCalculation}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition font-mono self-start sm:self-center bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl hover:bg-blue-500/20"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Formula Breakdown</span>
          </button>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full bg-zinc-950 rounded-full h-3 overflow-hidden border border-white/10 p-0.5">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out shadow-sm shadow-blue-500/50"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-zinc-400 font-mono leading-relaxed">
        Calculated deterministically using active reviewed attainments vs role skill weights (<code className="text-blue-300">coverage-v1</code>). Unverified skills contribute 0 points.
      </p>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  X,
  Compass,
  Sliders
} from 'lucide-react';

interface BridgeMeSimulatorProps {
  currentCoverage?: number;
  hasVerifiedSql?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  targetRoleTitle?: string;
  targetEmployer?: string;
}

export function BridgeMeSimulator({
  currentCoverage = 61,
  hasVerifiedSql = false,
  isOpen = false,
  onClose,
  targetRoleTitle = 'Junior Data Analyst Intern',
  targetEmployer = 'Sample Analytics Studio',
}: BridgeMeSimulatorProps) {
  // Interactive What-if state
  const [simulatedSql, setSimulatedSql] = useState(hasVerifiedSql || false);
  const [simulatedComm, setSimulatedComm] = useState(false);
  const [simulatedDocker, setSimulatedDocker] = useState(false);

  // Sync with prop when opened
  React.useEffect(() => {
    setSimulatedSql(hasVerifiedSql);
  }, [hasVerifiedSql]);

  if (!isOpen) return null;

  // Base score from props
  let simulatedScore = currentCoverage;
  
  // Only add SQL score if we are toggling it ON and it isn't ALREADY included in currentCoverage (hasVerifiedSql)
  if (simulatedSql && !hasVerifiedSql) {
    simulatedScore += 35;
  }
  
  // Comm upgrade adds +4
  if (simulatedComm) {
    simulatedScore += 4;
  }

  const unlockedCount = simulatedScore >= 90 ? 4 : simulatedScore >= 75 ? 2 : simulatedScore >= 70 ? 1 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface border border-border-bright rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative animate-scale-up">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-72 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-soft border border-border-accent flex items-center justify-center text-accent">
              <Zap className="w-5 h-5 fill-accent/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-text-primary tracking-tight">
                  Bridge Me — Shortest Path Engine
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-accent/10 text-accent border border-border-accent">
                  Algorithmic Pathfinder
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Calculates the highest-ROI evidence to bridge the gap for <strong className="text-text-primary">{targetRoleTitle}</strong>
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-raised transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dual Metric Scoreboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
          <div className="bg-surface-raised p-4 rounded-xl border border-border">
            <div className="text-[11px] text-text-muted font-mono uppercase tracking-wider">Current Score</div>
            <div className="text-2xl sm:text-3xl font-black text-text-primary mt-1">
              {currentCoverage}%
            </div>
            <div className="text-[11px] text-text-secondary mt-0.5">
              {hasVerifiedSql ? 'SQL verified' : 'SQL unverified (0/35)'}
            </div>
          </div>

          <div className="bg-accent-soft/30 p-4 rounded-xl border border-border-accent">
            <div className="text-[11px] text-accent font-mono uppercase tracking-wider font-semibold">Simulated Score</div>
            <div className="text-2xl sm:text-3xl font-black text-gradient-amber mt-1">
              {simulatedScore}%
            </div>
            <div className="text-[11px] text-accent font-mono mt-0.5">
              +{simulatedScore - currentCoverage}% Potential Gain
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-surface-raised p-4 rounded-xl border border-border">
            <div className="text-[11px] text-text-muted font-mono uppercase tracking-wider">Unlocked Roles</div>
            <div className="text-2xl sm:text-3xl font-black text-success mt-1">
              {unlockedCount} / 4
            </div>
            <div className="text-[11px] text-text-secondary mt-0.5">
              {simulatedScore >= 90 ? 'Top tier qualified' : simulatedScore >= 70 ? 'Threshold met (70%+)' : 'Needs 70%+ threshold'}
            </div>
          </div>
        </div>

        {/* Recommended Hero Mission */}
        <div className="bg-surface-raised p-5 rounded-xl border-2 border-accent/40 relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent text-white uppercase tracking-wider">
                Recommended Next Step #1
              </span>
              <span className="text-xs font-mono text-text-muted">Shortest Path</span>
            </div>
            <span className="text-xs font-black text-success flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +35% Leap
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-text-primary">
              Explain Monthly Sales from Messy Dataset
            </h4>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              Solves your highest unearned requirement: <strong className="text-text-primary">SQL Level 3 (Weight: 35)</strong>. Clean dirty timestamps, group by sales month, and compute MoM growth using LAG window functions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-1 border-t border-border">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent" /> Est. Time: ~2 Hours
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-warning" /> Target: Level 3 Proficient
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-success" /> Rubric: Pre-published
            </span>
          </div>

          <div className="pt-2">
            <Link
              href="/challenges/50000000-0000-0000-0000-000000000001"
              className="pb-btn-primary w-full text-center justify-center text-xs py-2.5"
            >
              Start Mission Now
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </div>

        {/* Interactive What-If Simulator Sandbox */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
              <Sliders className="w-3.5 h-3.5 text-accent" />
              <span>Interactive What-If Scenario Sandbox</span>
            </div>
            <button
              onClick={() => {
                setSimulatedSql(hasVerifiedSql);
                setSimulatedComm(false);
                setSimulatedDocker(false);
              }}
              className="text-[11px] text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset Simulator
            </button>
          </div>

          <div className="space-y-2 bg-surface-raised p-4 rounded-xl border border-border">
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={simulatedSql}
                  onChange={(e) => setSimulatedSql(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <div className="text-xs font-bold text-text-primary">Verify SQL (Level 3)</div>
                  <div className="text-[11px] text-text-muted">Messy Sales Challenge · Weight 35%</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-success">+35 pts</span>
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={simulatedComm}
                  onChange={(e) => setSimulatedComm(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <div className="text-xs font-bold text-text-primary">Upgrade Technical Writing (Level 4)</div>
                  <div className="text-[11px] text-text-muted">Executive Memo Challenge · Weight 16%</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-info">+4 pts</span>
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer opacity-75">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={simulatedDocker}
                  onChange={(e) => setSimulatedDocker(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <div>
                  <div className="text-xs font-bold text-text-primary">Verify Docker & Containerization</div>
                  <div className="text-[11px] text-text-muted">Unlocks DevOps & Cloud Roles</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-accent">+2 Roles</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-text-muted">
          <span>Formula: coverage-v1 (Deterministic & Transparent)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-raised hover:bg-surface border border-border text-text-primary font-semibold transition-colors"
          >
            Close Pathfinder
          </button>
        </div>
      </div>
    </div>
  );
}

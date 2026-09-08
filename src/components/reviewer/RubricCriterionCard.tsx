'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export interface RubricLevelAnchor {
  level: number;
  label: string;
  description: string;
}

export interface RubricCriterion {
  id: string;
  skill_id: string;
  skill_name: string;
  required_level?: number;
  weight?: number;
  title: string;
  description: string;
  anchors?: Record<number, string>;
}

interface RubricCriterionCardProps {
  criterion: RubricCriterion;
  selectedLevel: number | null;
  rationale: string;
  onLevelChange: (level: number) => void;
  onRationaleChange: (rationale: string) => void;
  showValidationErrors?: boolean;
}

const DEFAULT_ANCHORS: Record<number, { label: string; description: string }> = {
  0: {
    label: 'Level 0 — Not Demonstrated',
    description: 'The submitted work does not demonstrate this criterion or is missing required elements.',
  },
  1: {
    label: 'Level 1 — Basic with Guidance',
    description: 'Completes a basic task with substantial guidance or simple syntax reproduction.',
  },
  2: {
    label: 'Level 2 — Routine with Support',
    description: 'Completes a routine task with some support; explains the primary steps and structure.',
  },
  3: {
    label: 'Level 3 — Independent & Trade-offs',
    description: 'Completes a representative task independently; handles duplicates/nulls and explains design trade-offs.',
  },
  4: {
    label: 'Level 4 — Advanced & Edge Cases',
    description: 'Handles edge cases robustly, validates data integrity, and rigorously justifies performance alternatives.',
  },
};

export function RubricCriterionCard({
  criterion,
  selectedLevel,
  rationale,
  onLevelChange,
  onRationaleChange,
  showValidationErrors = false,
}: RubricCriterionCardProps) {
  const isLevelValid = selectedLevel !== null;
  const isRationaleValid = rationale.trim().length > 0;
  const isComplete = isLevelValid && isRationaleValid;
  const hasError = showValidationErrors && (!isLevelValid || !isRationaleValid);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 shadow-xl overflow-hidden ${
        hasError
          ? 'border-red-500/60 bg-zinc-950/90 ring-1 ring-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
          : isComplete
          ? 'border-emerald-500/40 bg-zinc-950/90 shadow-[0_0_25px_rgba(16,185,129,0.1)]'
          : 'border-white/10 bg-zinc-950/80 hover:border-white/20'
      }`}
    >
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/70">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30 font-mono">
              {criterion.skill_name}
            </span>
            {criterion.required_level && (
              <span className="text-xs text-zinc-400 font-mono">
                Target: Level {criterion.required_level}
              </span>
            )}
            {criterion.weight && (
              <span className="text-xs text-zinc-500 font-mono">
                • Weight: {criterion.weight}%
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {criterion.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
            {criterion.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center space-x-1.5 self-start sm:self-center">
          {isComplete ? (
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full font-mono shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assessed (L{selectedLevel})</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full font-mono shadow-sm">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Assessment Required</span>
            </span>
          )}
        </div>
      </div>

      {/* Body: Anchored Level Selection */}
      <div className="p-5 sm:p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono mb-3">
            Select Demonstrated Proficiency Level (Anchored 0–4) <span className="text-red-400">*</span>
          </label>

          <div className="space-y-2.5">
            {[0, 1, 2, 3, 4].map((level) => {
              const defaultInfo = DEFAULT_ANCHORS[level];
              const customDescription = criterion.anchors?.[level] || defaultInfo.description;
              const isSelected = selectedLevel === level;

              return (
                <label
                  key={level}
                  className={`relative flex items-start p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500/60 bg-blue-500/15 text-white shadow-md shadow-blue-500/15 ring-1 ring-blue-500/40'
                      : 'border-white/10 bg-zinc-900/40 hover:bg-zinc-900 hover:border-white/20 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      name={`criterion-${criterion.id}`}
                      value={level}
                      checked={isSelected}
                      onChange={() => onLevelChange(level)}
                      className="w-4 h-4 text-blue-500 bg-zinc-950 border-zinc-700 focus:ring-blue-500 focus:ring-offset-0"
                    />
                  </div>
                  <div className="ml-3.5 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold font-mono ${isSelected ? 'text-blue-300' : 'text-white'}`}>
                        {defaultInfo.label}
                      </span>
                      {level === 3 && (
                        <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 px-2 py-0.5 rounded font-mono">
                          Standard Industry Bar
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 mt-1 leading-relaxed font-mono text-[11px]">
                      {customDescription}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>

          {showValidationErrors && !isLevelValid && (
            <p className="text-xs text-red-400 font-mono mt-2 flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Please select an anchored proficiency level for this criterion.</span>
            </p>
          )}
        </div>

        {/* Rationale Text Area */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor={`rationale-${criterion.id}`}
              className="block text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono"
            >
              Evaluator Rationale & Evidence Notes <span className="text-red-400">*</span>
            </label>
            <span className="text-[11px] text-zinc-500 font-mono">
              {rationale.length}/2000
            </span>
          </div>

          <textarea
            id={`rationale-${criterion.id}`}
            rows={3}
            maxLength={2000}
            value={rationale}
            onChange={(e) => onRationaleChange(e.target.value)}
            placeholder="Cite specific lines of code, query logic, trade-offs explained, or missing requirements to justify this score..."
            className={`w-full text-xs text-white rounded-xl border p-4 bg-zinc-900/90 focus:outline-none transition-colors font-mono placeholder:text-zinc-600 ${
              showValidationErrors && !isRationaleValid
                ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            }`}
          />

          {showValidationErrors && !isRationaleValid && (
            <p className="text-xs text-red-400 font-mono mt-2 flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>A brief rationale citing specific code evidence is required before publishing.</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

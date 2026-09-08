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
      className={`rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
        hasError
          ? 'border-danger/60 bg-surface ring-1 ring-danger/30'
          : isComplete
          ? 'border-success/40 bg-surface shadow-sm'
          : 'border-border bg-surface hover:border-border-bright'
      }`}
    >
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-raised">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pb-badge pb-badge-accent font-mono font-bold">
              {criterion.skill_name}
            </span>
            {criterion.required_level && (
              <span className="text-xs text-text-muted font-mono">
                Target: Level {criterion.required_level}
              </span>
            )}
            {criterion.weight && (
              <span className="text-xs text-text-muted font-mono">
                • Weight: {criterion.weight}%
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-text-primary tracking-tight">
            {criterion.title}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed font-mono">
            {criterion.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {isComplete ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-success/10 text-success border border-success/30 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              Scored (Level {selectedLevel})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-warning/10 text-warning border border-warning/30">
              <AlertCircle className="w-3.5 h-3.5 text-warning" />
              Score Required
            </span>
          )}
        </div>
      </div>

      {/* Levels Selection List */}
      <div className="p-5 sm:p-6 space-y-4">
        <label className="section-label">
          Anchored Evaluation Rubric (Select One)
        </label>

        <div className="space-y-2.5">
          {[0, 1, 2, 3, 4].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            const anchor = DEFAULT_ANCHORS[lvl];
            const customDescription = criterion.anchors?.[lvl] || anchor.description;

            return (
              <div
                key={lvl}
                onClick={() => onLevelChange(lvl)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-border-accent bg-accent-soft text-text-primary ring-1 ring-border-accent'
                    : 'border-border bg-canvas hover:border-border-bright hover:bg-surface-hover text-text-secondary'
                }`}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onLevelChange(lvl);
                  }
                }}
              >
                <input
                  type="radio"
                  name={`criterion-${criterion.id}`}
                  checked={isSelected}
                  onChange={() => onLevelChange(lvl)}
                  className="mt-1 text-accent focus:ring-accent"
                  aria-label={`Select level ${lvl}`}
                />

                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-accent' : 'text-text-primary'}`}>
                      {anchor.label}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider">
                        Active Selection
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-mono">
                    {customDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {hasError && !isLevelValid && (
          <p className="text-xs text-danger font-medium flex items-center gap-1.5 font-mono">
            <AlertCircle className="w-4 h-4" /> Please select an anchored rubric level for this criterion.
          </p>
        )}

        {/* Qualitative Rationale Textarea */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`rationale-${criterion.id}`}
              className="section-label"
            >
              Evaluator Rationale &amp; Audit Trace
            </label>
            <span className="text-[11px] font-mono text-text-muted">
              Permanent Candidate Record
            </span>
          </div>

          <textarea
            id={`rationale-${criterion.id}`}
            rows={3}
            value={rationale}
            onChange={(e) => onRationaleChange(e.target.value)}
            placeholder="Explain why the student earned this level. Reference specific lines, edge cases, or handling..."
            className={`w-full p-3.5 rounded-xl border text-xs text-text-primary bg-canvas font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent transition ${
              hasError && !isRationaleValid
                ? 'border-danger/60 focus:ring-danger'
                : 'border-border'
            }`}
          />

          {hasError && !isRationaleValid && (
            <p className="text-xs text-danger font-medium flex items-center gap-1.5 font-mono">
              <AlertCircle className="w-4 h-4" /> A qualitative justification note is required for verification.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

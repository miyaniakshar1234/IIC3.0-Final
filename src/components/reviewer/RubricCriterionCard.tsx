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
      className={`bg-surface rounded-xl border transition-all shadow-sm ${
        hasError
          ? 'border-danger/60 ring-1 ring-danger/30'
          : isComplete
          ? 'border-emerald-300 ring-1 ring-emerald-100'
          : 'border-border hover:border-gray-300'
      }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50/50 rounded-t-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-soft px-2.5 py-0.5 rounded-full border border-blue-200">
              {criterion.skill_name}
            </span>
            {criterion.required_level && (
              <span className="text-[11px] text-text-secondary">
                Target: Level {criterion.required_level}
              </span>
            )}
            {criterion.weight && (
              <span className="text-[11px] text-text-secondary font-medium">
                • Weight: {criterion.weight}%
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-text-primary">
            {criterion.title}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            {criterion.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center space-x-1.5 self-start sm:self-center">
          {isComplete ? (
            <span className="inline-flex items-center space-x-1 text-xs font-semibold text-success bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Assessed (L{selectedLevel})</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 text-xs font-medium text-warning bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Assessment Required</span>
            </span>
          )}
        </div>
      </div>

      {/* Body: Anchored Level Selection */}
      <div className="p-4 sm:p-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
            Select Demonstrated Proficiency Level (Anchored 0–4) <span className="text-danger">*</span>
          </label>

          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((level) => {
              const defaultInfo = DEFAULT_ANCHORS[level];
              const customDescription = criterion.anchors?.[level] || defaultInfo.description;
              const isSelected = selectedLevel === level;

              return (
                <label
                  key={level}
                  className={`relative flex items-start p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent-soft/40 ring-1 ring-accent'
                      : 'border-border/80 hover:bg-gray-50/70 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      name={`criterion-${criterion.id}`}
                      value={level}
                      checked={isSelected}
                      onChange={() => onLevelChange(level)}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                    />
                  </div>
                  <div className="ml-3 text-xs flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${isSelected ? 'text-accent' : 'text-text-primary'}`}>
                        {defaultInfo.label}
                      </span>
                      {level === 3 && (
                        <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                          Standard Bar
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary mt-0.5 leading-normal">
                      {customDescription}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>

          {showValidationErrors && !isLevelValid && (
            <p className="text-xs text-danger font-medium mt-1.5 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Please select a proficiency level for this criterion.</span>
            </p>
          )}
        </div>

        {/* Rationale Text Area */}
        <div className="pt-2 border-t border-border/70">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={`rationale-${criterion.id}`}
              className="block text-xs font-semibold text-text-primary uppercase tracking-wider"
            >
              Evaluator Rationale & Evidence Notes <span className="text-danger">*</span>
            </label>
            <span className="text-[11px] text-text-secondary font-mono">
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
            className={`w-full text-xs text-text-primary rounded-md border p-3 focus:outline-none focus:ring-1 transition-colors ${
              showValidationErrors && !isRationaleValid
                ? 'border-danger focus:border-danger focus:ring-danger'
                : 'border-border focus:border-accent focus:ring-accent'
            }`}
          />

          {showValidationErrors && !isRationaleValid && (
            <p className="text-xs text-danger font-medium mt-1 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>A brief rationale citing specific evidence is required before publishing.</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

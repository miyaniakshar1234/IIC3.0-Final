'use client';

import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CurriculumSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleBootcamp: () => void;
  currentDeficit?: number;
  totalStudents?: number;
}

export function CurriculumSimulatorModal({
  isOpen,
  onClose,
  onScheduleBootcamp,
  currentDeficit = 41,
  totalStudents = 100,
}: CurriculumSimulatorModalProps) {
  const [selectedIntervention, setSelectedIntervention] = useState('lab');
  const [targetBatchSize, setTargetBatchSize] = useState(35);
  const [isCopied, setIsCopied] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  if (!isOpen) return null;

  const projectedDeficit = Math.max(0, currentDeficit - Math.round(targetBatchSize * 0.85));
  const projectedDeficitPct = Math.round((projectedDeficit / totalStudents) * 100);
  const projectedPlacementsUnlocked = Math.round(targetBatchSize * 1.1);

  const handleApply = () => {
    setIsApplied(true);
    onScheduleBootcamp();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleCopyBrief = () => {
    const brief = `# Curriculum Intervention Brief — Department of Computer Applications
Date: September 08, 2026
Cohort: MCA 2026 (N = 100)
Target Skill: SQL (Structured Query Language)

1. Executive Summary:
Current campus audit indicates 41% deficit in Level 3 SQL attainments against active employer requirements (Sample Analytics Studio, Example Web Lab).

2. Proposed Action:
Execute 2-Week Hands-on Practical Lab on "Window Functions, CTEs, and Defensive Null Handling in PostgreSQL 16".
Lead Faculty: Dr. Alok Sharma
Target Student Cohort: 35 students

3. Projected ROI:
- Cohort Deficit Reduction: -41% -> -${projectedDeficitPct}%
- Projected Qualified Candidate Leap: +${projectedPlacementsUnlocked} placement matches unlocked

Approved by Board of Studies Academic Council.`;

    navigator.clipboard.writeText(brief);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface border border-border-bright rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative animate-scale-up">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-40 bg-warning/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-center text-warning">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-text-primary tracking-tight">
                  Curriculum Intervention Simulator
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-warning/10 text-warning border border-warning/30">
                  Dean / Board of Studies
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Model syllabus interventions against real industry deficits (MCA 2026 Cohort)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-raised transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Deficit Diagnosis */}
        <div className="bg-surface-raised p-4 rounded-xl border border-warning/30 space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-warning flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Detected Industry Bottleneck: SQL L3
            </span>
            <span className="text-xs font-mono font-bold text-text-primary">
              {currentDeficit} of {totalStudents} Deficient (-{currentDeficit}%)
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            14 active employer roles require SQL Level 3 (Window Functions, CTEs, NULLIF). Only {totalStudents - currentDeficit} of {totalStudents} students currently hold verified attainments.
          </p>
        </div>

        {/* Simulation Settings */}
        <div className="space-y-4 relative z-10">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider font-mono">
            1. Select Intervention Format
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'lab', title: '2-Week Lab Module', desc: 'Integrated into weekly practicals', gain: 'High (+85%)' },
              { id: 'bootcamp', title: 'Weekend Bootcamp', desc: '48hr intensive code sprint', gain: 'Med (+60%)' },
              { id: 'peer', title: 'Peer Mentorship', desc: 'Senior student study circles', gain: 'Low (+40%)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIntervention(item.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedIntervention === item.id
                    ? 'bg-accent-soft/40 border-accent ring-1 ring-accent'
                    : 'bg-surface-raised hover:bg-surface border-border'
                }`}
              >
                <div className="text-xs font-bold text-text-primary">{item.title}</div>
                <div className="text-[11px] text-text-muted mt-0.5">{item.desc}</div>
                <div className="text-[10px] font-mono text-accent font-bold mt-2">{item.gain}</div>
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-text-primary">Target Enrollment Batch Size:</span>
              <span className="font-mono font-bold text-accent">{targetBatchSize} Students</span>
            </div>
            <input
              type="range"
              min={10}
              max={currentDeficit}
              value={targetBatchSize}
              onChange={(e) => setTargetBatchSize(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>
        </div>

        {/* Projected Outcome Scoreboard */}
        <div className="bg-surface-raised p-5 rounded-xl border-2 border-success/30 space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-success flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Projected Curriculum ROI
            </span>
            <span className="text-xs font-mono font-bold text-text-muted">Simulated Prediction</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-surface p-3 rounded-lg border border-border">
              <div className="text-[10px] text-text-muted font-mono uppercase">Campus Deficit Reduction</div>
              <div className="text-xl sm:text-2xl font-black text-text-primary mt-0.5">
                -{currentDeficit}% → <span className="text-success">-{projectedDeficitPct}%</span>
              </div>
              <div className="text-[10px] text-text-secondary mt-0.5">
                {currentDeficit - projectedDeficit} students converted to job-ready
              </div>
            </div>

            <div className="bg-surface p-3 rounded-lg border border-border">
              <div className="text-[10px] text-text-muted font-mono uppercase">Placement Matches Unlocked</div>
              <div className="text-xl sm:text-2xl font-black text-gradient-amber mt-0.5">
                +{projectedPlacementsUnlocked} Matches
              </div>
              <div className="text-[10px] text-text-secondary mt-0.5">
                Across 14 active partner opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border relative z-10">
          <button
            type="button"
            onClick={handleCopyBrief}
            className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-surface-raised hover:bg-surface border border-border text-xs font-semibold text-text-primary flex items-center justify-center gap-1.5 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            {isCopied ? 'Brief Copied to Clipboard!' : 'Export Academic Brief'}
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={isApplied}
            className="w-full sm:w-auto pb-btn-primary text-xs py-2 px-4 justify-center"
          >
            {isApplied ? (
              <>
                <Check className="w-4 h-4 text-success" />
                Intervention Scheduled!
              </>
            ) : (
              <>
                Schedule Campus Intervention
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

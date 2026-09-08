'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  User,
  Building,
  FileCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { StatusBadge, ApplicationStatus } from './StatusBadge';

export interface SkillAttainmentSnapshot {
  skill_id: string;
  skill_name: string;
  required_level: number;
  reviewed_level: number;
  weight: number;
  contribution: number;
  reviewer_name: string;
  reviewed_at: string;
  evidence_title: string;
  criterion_title: string;
  rationale: string;
}

export interface CandidateSnapshotData {
  application_id: string;
  version: number;
  student_name: string;
  student_program: string;
  student_institution: string;
  opportunity_title: string;
  status: ApplicationStatus;
  applied_at: string;
  scoring_version: string;
  reviewed_coverage: number;
  skills: SkillAttainmentSnapshot[];
  contribution_statement?: string;
}

interface SnapshotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateSnapshotData | null;
  onTransitionStatus: (
    applicationId: string,
    toStatus: ApplicationStatus,
    reason: string,
    expectedVersion: number
  ) => Promise<void>;
}

export function SnapshotDrawer({
  isOpen,
  onClose,
  candidate,
  onTransitionStatus,
}: SnapshotDrawerProps) {
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('shortlisted');
  const [transitionReason, setTransitionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (!isOpen || !candidate) return null;

  const handleTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transitionReason.trim()) {
      setActionError('A brief justification note is required for all stage transitions.');
      return;
    }

    setIsSubmitting(true);
    setActionError(null);

    try {
      await onTransitionStatus(
        candidate.application_id,
        targetStatus,
        transitionReason.trim(),
        candidate.version
      );
      setTransitionReason('');
      onClose();
    } catch (err: any) {
      setActionError(err?.message || 'Failed to transition application stage.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allowedTransitions: { status: ApplicationStatus; label: string }[] = [
    { status: 'shortlisted', label: 'Move to Shortlisted' },
    { status: 'interview', label: 'Invite to Interview' },
    { status: 'offered', label: 'Extend Internship Offer' },
    { status: 'rejected', label: 'Mark Not Selected' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-zinc-950 border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col relative z-20">
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 bg-zinc-900/80 backdrop-blur-md flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Frozen Evidence Snapshot</span>
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  v{candidate.version} • {candidate.scoring_version}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {candidate.student_name}
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                {candidate.student_program} • {candidate.student_institution}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-white/10"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary Bar */}
            <div className="bg-zinc-900/70 p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">
                  Current Stage
                </span>
                <div className="mt-1.5">
                  <StatusBadge status={candidate.status} size="md" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">
                  Reviewed Match
                </span>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-2xl font-black text-white font-mono">
                    {candidate.reviewed_coverage}%
                  </span>
                  <div className="w-28 bg-zinc-800 rounded-full h-2.5 overflow-hidden border border-white/10 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        candidate.reviewed_coverage >= 80
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : candidate.reviewed_coverage >= 50
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${candidate.reviewed_coverage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">
                  Applied Date
                </span>
                <span className="text-xs font-semibold text-zinc-300 font-mono mt-1.5 block">
                  {new Date(candidate.applied_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Frozen Verified Skill Attainments */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Skill Attainments ({candidate.skills.length})</span>
                </h3>
                <span className="text-[11px] text-zinc-400 font-mono">
                  Weighted deterministic coverage
                </span>
              </div>

              <div className="space-y-3">
                {candidate.skills.map((skill) => (
                  <div
                    key={skill.skill_id}
                    className="p-5 rounded-2xl border border-white/10 bg-zinc-900/50 hover:border-white/20 transition-all space-y-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {skill.skill_name}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                            Level {skill.reviewed_level} of {skill.required_level}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400 block mt-1 font-mono">
                          Artifact: {skill.evidence_title}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-blue-400 font-mono">
                          +{skill.contribution}%
                        </span>
                        <span className="text-[10px] text-zinc-500 block font-mono">
                          Weight: {skill.weight}%
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Note */}
                    <div className="bg-zinc-950/80 rounded-xl p-3.5 border border-white/10 text-xs space-y-1 font-mono">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="font-semibold text-zinc-300 flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-blue-400" />
                          <span>Dr. Evaluator: {skill.reviewer_name}</span>
                        </span>
                        <span>
                          {new Date(skill.reviewed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-zinc-300 italic text-[11px] leading-relaxed pt-1">
                        "{skill.rationale}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Contribution Statement */}
            {candidate.contribution_statement && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono flex items-center space-x-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Student Contribution Statement</span>
                </h3>
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono">
                  {candidate.contribution_statement}
                </div>
              </div>
            )}

            {/* Recruiter State Transition Action Form */}
            <form onSubmit={handleTransition} className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Update Candidate Stage
                </h3>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Moving a candidate's stage records an immutable audit log entry. All decisions require a brief internal justification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allowedTransitions.map((t) => (
                  <button
                    key={t.status}
                    type="button"
                    onClick={() => setTargetStatus(t.status)}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold font-mono transition-all ${
                      targetStatus === t.status
                        ? 'border-blue-500/60 bg-blue-500/20 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500/50'
                        : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
                  Stage Change Justification Note <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={2}
                  value={transitionReason}
                  onChange={(e) => setTransitionReason(e.target.value)}
                  placeholder="e.g., Reviewed SQL queries demonstrate strong edge-case handling and independent reasoning."
                  className="w-full text-xs text-white rounded-xl border border-white/10 bg-zinc-900/80 p-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-600 font-mono"
                />
              </div>

              {actionError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{actionError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !transitionReason.trim()}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs text-center hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 font-mono uppercase tracking-wider"
              >
                {isSubmitting ? 'Recording Transition in Audit Log...' : `Confirm Transition to "${targetStatus}"`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

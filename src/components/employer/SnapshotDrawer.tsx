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
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-surface border-l border-border shadow-lg flex flex-col relative z-20 text-text-primary">
          {/* Drawer Header */}
          <div className="p-6 border-b border-border bg-surface-raised flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-success bg-success/10 border border-success/30 px-2.5 py-0.5 rounded-full font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  <span>Frozen Evidence Snapshot</span>
                </span>
                <span className="text-xs text-text-muted font-mono">
                  v{candidate.version} • {candidate.scoring_version}
                </span>
              </div>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                {candidate.student_name}
              </h2>
              <p className="text-xs text-text-muted font-mono">
                {candidate.student_program} • {candidate.student_institution}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface transition-colors border border-transparent hover:border-border"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary Bar */}
            <div className="bg-canvas p-5 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
              <div>
                <span className="section-label text-[10px] block mb-1">
                  Current Stage
                </span>
                <div>
                  <StatusBadge status={candidate.status} size="md" />
                </div>
              </div>

              <div>
                <span className="section-label text-[10px] block mb-1">
                  Reviewed Match
                </span>
                <div className="flex items-center space-x-3">
                  <span className="metric-value text-2xl text-accent">
                    {candidate.reviewed_coverage}%
                  </span>
                  <div className="w-28 bg-surface-raised rounded-full h-2.5 overflow-hidden border border-border p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        candidate.reviewed_coverage >= 80
                          ? 'bg-success'
                          : candidate.reviewed_coverage >= 50
                          ? 'bg-warning'
                          : 'bg-danger'
                      }`}
                      style={{ width: `${candidate.reviewed_coverage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <span className="section-label text-[10px] block mb-1">
                  Applied Date
                </span>
                <span className="text-xs font-semibold text-text-secondary font-mono block">
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
                <h3 className="section-label flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Verified Skill Attainments ({candidate.skills.length})</span>
                </h3>
                <span className="text-[11px] text-text-muted font-mono">
                  Weighted deterministic coverage
                </span>
              </div>

              <div className="space-y-3">
                {candidate.skills.map((skill) => (
                  <div
                    key={skill.skill_id}
                    className="p-5 rounded-2xl border border-border bg-surface-raised hover:border-border-bright transition-all space-y-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-text-primary text-sm">
                            {skill.skill_name}
                          </span>
                          <span className="text-[10px] font-bold text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded-full font-mono">
                            Level {skill.reviewed_level} of {skill.required_level}
                          </span>
                        </div>
                        <span className="text-xs text-text-muted block mt-1 font-mono">
                          Artifact: {skill.evidence_title}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-accent font-mono">
                          +{skill.contribution}%
                        </span>
                        <span className="text-[10px] text-text-muted block font-mono">
                          Weight: {skill.weight}%
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Note */}
                    <div className="bg-canvas rounded-xl p-3.5 border border-border text-xs space-y-1 font-mono">
                      <div className="flex items-center justify-between text-[11px] text-text-muted">
                        <span className="font-semibold text-text-secondary flex items-center space-x-1.5">
                          <User className="w-3.5 h-3.5 text-accent" />
                          <span>Dr. Evaluator: {skill.reviewer_name}</span>
                        </span>
                        <span>
                          {new Date(skill.reviewed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-text-secondary italic text-[11px] leading-relaxed pt-1">
                        &quot;{skill.rationale}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Contribution Statement */}
            {candidate.contribution_statement && (
              <div className="space-y-2">
                <h3 className="section-label flex items-center space-x-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Student Contribution Statement</span>
                </h3>
                <div className="bg-canvas border border-border rounded-2xl p-5 text-xs text-text-secondary leading-relaxed whitespace-pre-wrap font-mono">
                  {candidate.contribution_statement}
                </div>
              </div>
            )}

            {/* Recruiter State Transition Action Form */}
            <form onSubmit={handleTransition} className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-accent" />
                <h3 className="section-label">
                  Update Candidate Stage
                </h3>
              </div>
              <p className="text-xs text-text-muted font-mono">
                Moving a candidate&apos;s stage records an immutable audit log entry. All decisions require a brief internal justification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allowedTransitions.map((t) => (
                  <button
                    key={t.status}
                    type="button"
                    onClick={() => setTargetStatus(t.status)}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold font-mono transition-all ${
                      targetStatus === t.status
                        ? 'border-border-accent bg-accent-soft text-accent ring-1 ring-border-accent shadow-sm'
                        : 'border-border bg-canvas text-text-muted hover:text-text-primary hover:border-border-bright'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5 font-mono">
                  Stage Change Justification Note <span className="text-danger">*</span>
                </label>
                <textarea
                  rows={2}
                  value={transitionReason}
                  onChange={(e) => setTransitionReason(e.target.value)}
                  placeholder="e.g., Reviewed SQL queries demonstrate strong edge-case handling and independent reasoning."
                  className="w-full text-xs text-text-primary rounded-xl border border-border bg-canvas p-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-text-muted font-mono"
                />
              </div>

              {actionError && (
                <div className="p-3 bg-danger/10 border border-danger/30 rounded-xl text-xs text-danger flex items-center space-x-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !transitionReason.trim()}
                className="pb-btn-primary w-full text-xs py-3 justify-center"
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

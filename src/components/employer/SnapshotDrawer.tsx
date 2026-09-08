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
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-surface border-l border-border shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-border bg-gray-50/70 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Frozen Application Snapshot</span>
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  v{candidate.version} • {candidate.scoring_version}
                </span>
              </div>
              <h2 className="text-xl font-bold text-text-primary">
                {candidate.student_name}
              </h2>
              <p className="text-xs text-text-secondary">
                {candidate.student_program} • {candidate.student_institution}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-200/60 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary Bar */}
            <div className="bg-canvas p-4 rounded-xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider block">
                  Current Status
                </span>
                <div className="mt-1">
                  <StatusBadge status={candidate.status} size="md" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider block">
                  Reviewed Coverage
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl font-bold text-text-primary">
                    {candidate.reviewed_coverage}%
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${
                        candidate.reviewed_coverage >= 80
                          ? 'bg-success'
                          : candidate.reviewed_coverage >= 50
                          ? 'bg-amber-500'
                          : 'bg-danger'
                      }`}
                      style={{ width: `${candidate.reviewed_coverage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider block">
                  Applied Date
                </span>
                <span className="text-xs font-medium text-text-primary mt-1 block">
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
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Verified Skill Attainments ({candidate.skills.length})
                </h3>
                <span className="text-[11px] text-text-secondary">
                  Weighted deterministic coverage
                </span>
              </div>

              <div className="space-y-3">
                {candidate.skills.map((skill) => (
                  <div
                    key={skill.skill_id}
                    className="p-4 rounded-xl border border-border bg-surface hover:border-gray-300 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-text-primary text-sm">
                            {skill.skill_name}
                          </span>
                          <span className="text-[11px] font-bold text-success bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Level {skill.reviewed_level} of {skill.required_level}
                          </span>
                        </div>
                        <span className="text-[11px] text-text-secondary block mt-0.5">
                          Evidence: {skill.evidence_title}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-accent">
                          +{skill.contribution}%
                        </span>
                        <span className="text-[10px] text-text-secondary block">
                          Weight: {skill.weight}%
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Note */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-border/60 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-text-secondary">
                        <span className="font-medium text-text-primary flex items-center space-x-1">
                          <User className="w-3 h-3 text-text-secondary" />
                          <span>Reviewed by {skill.reviewer_name}</span>
                        </span>
                        <span>
                          {new Date(skill.reviewed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-text-secondary italic">
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
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Shared Contribution Statement
                </h3>
                <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 text-xs text-text-primary leading-relaxed whitespace-pre-wrap font-sans">
                  {candidate.contribution_statement}
                </div>
              </div>
            )}

            {/* Recruiter State Transition Action Form */}
            <form onSubmit={handleTransition} className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Update Candidate Stage
                </h3>
              </div>
              <p className="text-xs text-text-secondary">
                Moving a candidate's stage records an immutable audit log entry. All decisions require a brief internal justification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allowedTransitions.map((t) => (
                  <button
                    key={t.status}
                    type="button"
                    onClick={() => setTargetStatus(t.status)}
                    className={`p-3 text-left rounded-lg border text-xs font-semibold transition-all ${
                      targetStatus === t.status
                        ? 'border-accent bg-accent-soft text-accent ring-1 ring-accent'
                        : 'border-border bg-surface text-text-secondary hover:text-text-primary hover:border-gray-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Stage Change Justification Note <span className="text-danger">*</span>
                </label>
                <textarea
                  rows={2}
                  value={transitionReason}
                  onChange={(e) => setTransitionReason(e.target.value)}
                  placeholder="e.g., Reviewed SQL queries demonstrate strong edge-case handling and independent reasoning."
                  className="w-full text-xs text-text-primary rounded-md border border-border p-3 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                />
              </div>

              {actionError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-danger flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{actionError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !transitionReason.trim()}
                className="w-full py-2.5 px-4 rounded-md bg-accent text-white font-semibold text-xs text-center hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                {isSubmitting ? 'Recording Transition...' : `Confirm Transition to "${targetStatus}"`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

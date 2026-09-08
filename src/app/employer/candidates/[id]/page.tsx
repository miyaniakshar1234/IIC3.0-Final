'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge, ApplicationStatus } from '@/components/employer/StatusBadge';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  AlertCircle,
  ExternalLink,
  User,
  Building,
  FileCheck,
  Clock,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';

export default function CandidateEvidenceSnapshotPage({ params }: { params: { id: string } }) {
  const [candidate, setCandidate] = useState({
    application_id: '70000000-0000-0000-0000-000000000001',
    version: 1,
    student_name: 'Meera Patel',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    opportunity_title: 'Junior Data Analyst Intern',
    status: 'submitted' as ApplicationStatus,
    applied_at: '2026-09-08T15:10:00Z',
    scoring_version: 'coverage-v1',
    reviewed_coverage: 96,
    skills: [
      {
        skill_id: '10000000-0000-0000-0000-000000000001',
        skill_name: 'SQL Querying & Data Cleaning',
        required_level: 3,
        reviewed_level: 3,
        weight: 35,
        contribution: 35,
        reviewer_name: 'Dr. Sharma',
        reviewed_at: '2026-09-08T16:00:00Z',
        evidence_title: 'Cleaned Monthly Sales Pipeline & Cohort Aggregates',
        criterion_title: 'Query Logic, Filtering & Multi-Table Aggregation',
        rationale:
          'Excellent use of CTEs and window LAG for month-over-month growth. Handled null division with NULLIF and validated sentinel values properly.',
      },
      {
        skill_id: '10000000-0000-0000-0000-000000000002',
        skill_name: 'Spreadsheets & Pivot Modeling',
        required_level: 3,
        reviewed_level: 3,
        weight: 25,
        contribution: 25,
        reviewer_name: 'Prof. Anita Desai',
        reviewed_at: '2026-09-05T10:30:00Z',
        evidence_title: 'E-Commerce Funnel & Sensitivity Analysis',
        criterion_title: 'Dynamic Formulas, VLOOKUP/XLOOKUP & Pivot Tables',
        rationale:
          'Built parameterized scenario models with clean input separation and documented assumptions.',
      },
      {
        skill_id: '10000000-0000-0000-0000-000000000003',
        skill_name: 'Written Technical Communication',
        required_level: 4,
        reviewed_level: 3,
        weight: 16,
        contribution: 12,
        reviewer_name: 'Prof. Anita Desai',
        reviewed_at: '2026-09-05T11:00:00Z',
        evidence_title: 'Technical Executive Memo on Churn Reduction',
        criterion_title: 'Clarity, Structure & Audience Adaptation',
        rationale:
          'Clear executive structure with bullet points and risk disclosures.',
      },
      {
        skill_id: '10000000-0000-0000-0000-000000000004',
        skill_name: 'Analytical Reasoning & Trade-offs',
        required_level: 3,
        reviewed_level: 3,
        weight: 24,
        contribution: 24,
        reviewer_name: 'Dr. Sharma',
        reviewed_at: '2026-09-08T16:00:00Z',
        evidence_title: 'Cleaned Monthly Sales Pipeline & Cohort Aggregates',
        criterion_title: 'Data Integrity & Edge-Case Justification',
        rationale:
          'Thorough contribution statement explaining regex extraction for customer IDs.',
      },
    ],
    contribution_statement:
      'I wrote all the SQL queries independently using PostgreSQL 16 syntax. I used Claude 3.5 Sonnet to help construct the initial regex pattern to extract cleaned digits from inconsistent phone and ID fields, which I then manually tested and adapted. If I had more time, I would add partition pruning and composite indexes on (transaction_date, customer_id) for datasets exceeding 10M rows.',
  });

  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('shortlisted');
  const [transitionReason, setTransitionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transitionReason.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    setCandidate((prev) => ({
      ...prev,
      status: targetStatus,
      version: prev.version + 1,
    }));

    setIsSubmitting(false);
    setTransitionReason('');
    setToastMessage(`Candidate stage moved to "${targetStatus}". Audit record saved.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Link
                href="/employer/opportunities"
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
                aria-label="Back to opportunities"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex items-center space-x-2 text-xs font-semibold text-accent">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Candidate Evidence Snapshot</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-text-primary pl-7">
              {candidate.student_name}
            </h1>
            <p className="text-xs text-text-secondary pl-7">
              {candidate.student_program} • {candidate.student_institution} — Applied for <span className="font-semibold text-text-primary">{candidate.opportunity_title}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 pl-7 sm:pl-0">
            <StatusBadge status={candidate.status} size="md" />
          </div>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-success rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-xs text-success font-medium">
              Dismiss
            </button>
          </div>
        )}

        {/* Coverage Overview */}
        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-1">
              Deterministic Reviewed Coverage
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-extrabold text-text-primary">
                {candidate.reviewed_coverage}%
              </span>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-success bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full block">
                  Match Verified (coverage-v1)
                </span>
                <span className="text-[11px] text-text-secondary block">
                  All 4 skills evaluated against anchored rubrics
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-canvas p-4 rounded-xl border border-border space-y-2">
            <div className="flex justify-between text-xs font-semibold text-text-primary">
              <span>Overall Match Score</span>
              <span>{candidate.reviewed_coverage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-3 rounded-full bg-success" style={{ width: `${candidate.reviewed_coverage}%` }} />
            </div>
          </div>
        </div>

        {/* Verified Attainments */}
        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-text-primary uppercase tracking-wider">
            Verified Skill Attainments ({candidate.skills.length})
          </h2>

          <div className="space-y-3">
            {candidate.skills.map((skill) => (
              <div key={skill.skill_id} className="p-4 rounded-xl border border-border bg-canvas space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-text-primary text-sm">
                      {skill.skill_name}
                    </span>
                    <span className="text-xs font-bold text-success bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Level {skill.reviewed_level} of {skill.required_level}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-accent">
                    +{skill.contribution}% (Weight: {skill.weight}%)
                  </span>
                </div>

                <div className="bg-surface p-3 rounded-lg border border-border/70 text-xs space-y-1">
                  <div className="flex items-center justify-between text-text-secondary text-[11px]">
                    <span className="font-semibold text-text-primary">
                      Reviewed by {skill.reviewer_name} ({new Date(skill.reviewed_at).toLocaleDateString()})
                    </span>
                    <span>Evidence: {skill.evidence_title}</span>
                  </div>
                  <p className="text-text-secondary italic">"{skill.rationale}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Statement */}
        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-text-primary uppercase tracking-wider">
            Student Contribution Statement
          </h2>
          <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 text-xs text-text-primary leading-relaxed">
            {candidate.contribution_statement}
          </div>
        </div>

        {/* Transition Form */}
        <form onSubmit={handleTransition} className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-text-primary uppercase tracking-wider">
            Recruiter Decision & Stage Transition
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { status: 'shortlisted', label: 'Shortlist for Interview' },
              { status: 'interview', label: 'Invite to Interview' },
              { status: 'offered', label: 'Extend Offer' },
              { status: 'rejected', label: 'Not Selected' },
            ].map((item) => (
              <button
                key={item.status}
                type="button"
                onClick={() => setTargetStatus(item.status as ApplicationStatus)}
                className={`p-3 text-left rounded-lg border text-xs font-semibold transition-all ${
                  targetStatus === item.status
                    ? 'border-accent bg-accent-soft text-accent ring-1 ring-accent'
                    : 'border-border bg-surface text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Internal Justification Note <span className="text-danger">*</span>
            </label>
            <textarea
              rows={2}
              value={transitionReason}
              onChange={(e) => setTransitionReason(e.target.value)}
              placeholder="e.g., Reviewed SQL queries demonstrate strong edge-case handling and independent reasoning."
              className="w-full text-xs text-text-primary rounded-md border border-border p-3 focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !transitionReason.trim()}
            className="w-full py-2.5 px-4 rounded-md bg-accent text-white font-semibold text-xs hover:bg-accent-hover disabled:opacity-50 transition-all shadow-sm"
          >
            {isSubmitting ? 'Recording Transition...' : `Confirm Stage Change to "${targetStatus}"`}
          </button>
        </form>
      </div>
    </AppShell>
  );
}

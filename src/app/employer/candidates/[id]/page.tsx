'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { ProofChainViewer } from '@/components/ui/ProofChainViewer';
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
  const [hasVerifiedSql, setHasVerifiedSql] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLive() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setHasVerifiedSql(Boolean(json.data.has_verified_sql));
          }
        }
      } catch (err) {}
    }
    loadLive();
    const interval = setInterval(loadLive, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const candidate = {
    application_id: '70000000-0000-0000-0000-000000000001',
    version: 1,
    student_name: 'Meera Patel',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    opportunity_title: 'Junior Data Analyst Intern',
    status: 'submitted' as ApplicationStatus,
    applied_at: '2026-09-08T15:10:00Z',
    scoring_version: 'coverage-v1',
    reviewed_coverage: hasVerifiedSql ? 96 : 61,
    skills: [
      {
        skill_id: '10000000-0000-0000-0000-000000000001',
        skill_name: 'SQL Querying & Data Cleaning',
        required_level: 3,
        reviewed_level: hasVerifiedSql ? 3 : 0,
        weight: 35,
        contribution: hasVerifiedSql ? 35 : 0,
        reviewer_name: hasVerifiedSql ? 'Dr. Sharma' : 'Pending Evaluation',
        reviewed_at: hasVerifiedSql ? '2026-09-08T16:00:00Z' : 'Pending',
        evidence_title: 'Cleaned Monthly Sales Pipeline & Cohort Aggregates',
        criterion_title: 'Query Logic, Filtering & Multi-Table Aggregation',
        rationale: hasVerifiedSql
          ? 'Excellent use of CTEs and window LAG for month-over-month growth. Handled null division with NULLIF and validated sentinel values properly.'
          : 'Submission locked and in faculty evaluation queue. Awaiting rubric scoring.',
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
  };

  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>('submitted');
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('shortlisted');
  const [transitionReason, setTransitionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayCandidate = {
    ...candidate,
    status: currentStatus,
  };

  const handleTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transitionReason.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    setCurrentStatus(targetStatus);

    setIsSubmitting(false);
    setTransitionReason('');
    setToastMessage(`Synthetic preview only: stage shown as "${targetStatus}"; no database audit event was written.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-16">
        {/* Header */}
        <div className="pb-card-accent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center space-x-3">
              <Link
                href="/employer/opportunities"
                className="p-2 rounded-xl border border-border text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                aria-label="Back to opportunities"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="section-label text-xs">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>Verified Candidate Evidence Snapshot</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-text-primary pl-9 tracking-tight">
              {candidate.student_name}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary pl-9 font-mono">
              {candidate.student_program} • {candidate.student_institution} — Applied for <span className="font-semibold text-text-primary">{candidate.opportunity_title}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 pl-9 sm:pl-0 relative z-10 shrink-0">
            <StatusBadge status={candidate.status} size="md" />
          </div>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="bg-success/10 border border-success/30 text-success rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5 text-xs font-semibold font-mono">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-xs text-success hover:underline font-mono">
              Dismiss
            </button>
          </div>
        )}

        {/* Coverage Overview */}
        <div className="pb-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="section-label text-[11px] block">
              Deterministic Reviewed Coverage
            </span>
            <div className="flex items-center space-x-4">
              <span className="metric-value text-5xl text-accent">
                {candidate.reviewed_coverage}%
              </span>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-success bg-success/10 border border-success/30 px-3 py-0.5 rounded-full inline-flex items-center space-x-1.5 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  <span>Match Verified (coverage-v1)</span>
                </span>
                <span className="text-xs text-text-muted block font-mono">
                  All 4 skills evaluated against anchored faculty rubrics
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-72 bg-canvas p-5 rounded-2xl border border-border space-y-3 shadow-inner">
            <div className="flex justify-between text-xs font-semibold text-text-secondary font-mono">
              <span>Overall Match Index</span>
              <span className="text-success font-bold">{candidate.reviewed_coverage}%</span>
            </div>
            <div className="w-full bg-surface-raised rounded-full h-3 overflow-hidden p-0.5 border border-border">
              <div className="h-full rounded-full bg-success shadow-sm" style={{ width: `${candidate.reviewed_coverage}%` }} />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-text-muted">
              <span>Required: 70%</span>
              <span className="text-success">Audit Passed</span>
            </div>
          </div>
        </div>

        {/* Full Proof Chain Provenance */}
        <div className="pb-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="section-label text-xs">Proof Provenance Graph</span>
              <h3 className="text-sm font-bold text-text-primary mt-0.5">Candidate Evidence Lineage</h3>
            </div>
            <Link
              href="/verify/4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f"
              className="text-[11px] font-mono text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-accent hover:text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify in Public Gateway</span>
            </Link>
          </div>
          <ProofChainViewer
            isVerified={hasVerifiedSql}
            studentName={candidate.student_name}
            roleTitle={candidate.opportunity_title}
            reviewedLevel={hasVerifiedSql ? 3 : 0}
            weight={35}
            reviewDate={hasVerifiedSql ? 'Just now' : 'Pending'}
          />
        </div>

        {/* Verified Attainments */}
        <div className="pb-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="section-label flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Verified Skill Attainments ({candidate.skills.length})</span>
            </h2>
            <span className="text-xs font-mono text-text-muted">
              Weighted Deterministic Contributions
            </span>
          </div>

          <div className="space-y-4">
            {candidate.skills.map((skill) => (
              <div key={skill.skill_id} className="p-5 rounded-2xl border border-border bg-surface-raised hover:border-border-bright transition-all space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-text-primary text-base">
                      {skill.skill_name}
                    </span>
                    <span className="text-xs font-bold text-success bg-success/10 border border-success/30 px-2.5 py-0.5 rounded-full font-mono">
                      Level {skill.reviewed_level} of {skill.required_level}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-base font-bold text-accent font-mono">
                      +{skill.contribution}%
                    </span>
                    <span className="text-xs text-text-muted font-mono ml-2">
                      (Weight: {skill.weight}%)
                    </span>
                  </div>
                </div>

                <div className="bg-canvas p-4 rounded-xl border border-border text-xs space-y-1.5 font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-text-muted text-[11px] gap-1">
                    <span className="font-semibold text-text-secondary">
                      Evaluator: {skill.reviewer_name} ({skill.reviewed_at !== 'Pending' ? new Date(skill.reviewed_at).toLocaleDateString() : 'Pending'})
                    </span>
                    <span className="text-accent">Artifact: {skill.evidence_title}</span>
                  </div>
                  <p className="text-text-secondary italic text-[11px] leading-relaxed">
                    &quot;{skill.rationale}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Statement */}
        <div className="pb-card p-6 sm:p-8 space-y-3">
          <div className="section-label flex items-center space-x-2 text-accent">
            <User className="w-4 h-4 text-accent" />
            <span>Student Contribution Statement</span>
          </div>
          <div className="bg-canvas border border-border rounded-xl p-5 text-xs text-text-secondary leading-relaxed font-mono whitespace-pre-wrap">
            {candidate.contribution_statement}
          </div>
          <p className="text-[11px] text-text-muted italic font-mono">
            * Authenticated statement submitted under academic integrity guidelines with permitted AI disclosure.
          </p>
        </div>

        {/* Transition Form */}
        <form onSubmit={handleTransition} className="pb-card p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="section-label text-warning">
              Recruiter Decision & Stage Transition
            </h2>
            <p className="text-xs text-text-muted mt-1 font-mono">
              Synthetic interaction preview only. This standalone screen does not persist a stage change or audit record.
            </p>
          </div>

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
                className={`p-3.5 text-left rounded-xl border text-xs font-bold transition-all font-mono ${
                  targetStatus === item.status
                    ? 'border-border-accent bg-accent-soft text-accent ring-1 ring-border-accent shadow-sm'
                    : 'border-border bg-canvas text-text-muted hover:text-text-primary hover:border-border-bright'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1.5 font-mono">
              Internal Justification Note <span className="text-danger">*</span>
            </label>
            <textarea
              rows={3}
              value={transitionReason}
              onChange={(e) => setTransitionReason(e.target.value)}
              placeholder="e.g., Reviewed SQL queries demonstrate strong edge-case handling, independent window logic, and honest AI disclosure."
              className="w-full text-xs text-text-primary rounded-xl border border-border bg-canvas p-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-text-muted font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !transitionReason.trim()}
            className="pb-btn-primary w-full text-xs py-3 justify-center"
          >
            {isSubmitting ? 'Recording Transition in Audit Log...' : `Confirm Stage Change to "${targetStatus}"`}
          </button>
        </form>
      </div>
    </AppShell>
  );
}

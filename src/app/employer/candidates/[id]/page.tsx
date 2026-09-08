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
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center space-x-3">
              <Link
                href="/employer/opportunities"
                className="p-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Back to opportunities"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-blue-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="uppercase tracking-wide">Verified Candidate Evidence Snapshot</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white pl-9 tracking-tight">
              {candidate.student_name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 pl-9 font-mono">
              {candidate.student_program} • {candidate.student_institution} — Applied for <span className="font-semibold text-white">{candidate.opportunity_title}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 pl-9 sm:pl-0 relative z-10 shrink-0">
            <StatusBadge status={candidate.status} size="md" />
          </div>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl p-4 flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-2.5 text-xs font-semibold font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-xs text-emerald-400 hover:underline font-mono">
              Dismiss
            </button>
          </div>
        )}

        {/* Coverage Overview */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
              Deterministic Reviewed Coverage
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-5xl font-black text-white font-mono tracking-tight">
                {candidate.reviewed_coverage}%
              </span>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-full inline-flex items-center space-x-1.5 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Match Verified (coverage-v1)</span>
                </span>
                <span className="text-xs text-zinc-400 block font-mono">
                  All 4 skills evaluated against anchored faculty rubrics
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-72 bg-zinc-950/80 p-5 rounded-2xl border border-white/10 space-y-3 shadow-inner">
            <div className="flex justify-between text-xs font-semibold text-zinc-300 font-mono">
              <span>Overall Match Index</span>
              <span className="text-emerald-400 font-bold">{candidate.reviewed_coverage}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50" style={{ width: `${candidate.reviewed_coverage}%` }} />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>Required: 70%</span>
              <span>Audit Passed</span>
            </div>
          </div>
        </div>

        {/* Verified Attainments */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Skill Attainments ({candidate.skills.length})</span>
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              Weighted Deterministic Contributions
            </span>
          </div>

          <div className="space-y-4">
            {candidate.skills.map((skill) => (
              <div key={skill.skill_id} className="p-5 rounded-2xl border border-white/10 bg-zinc-950/70 hover:border-white/20 transition-all space-y-3 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-bold text-white text-base">
                      {skill.skill_name}
                    </span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                      Level {skill.reviewed_level} of {skill.required_level}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-base font-bold text-blue-400 font-mono">
                      +{skill.contribution}%
                    </span>
                    <span className="text-xs text-zinc-500 font-mono ml-2">
                      (Weight: {skill.weight}%)
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-900/80 p-4 rounded-xl border border-white/10 text-xs space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-400 text-[11px] font-mono gap-1">
                    <span className="font-semibold text-zinc-300">
                      Evaluator: {skill.reviewer_name} ({new Date(skill.reviewed_at).toLocaleDateString()})
                    </span>
                    <span className="text-blue-400/80">Artifact: {skill.evidence_title}</span>
                  </div>
                  <p className="text-zinc-300 italic font-mono text-[11px] leading-relaxed">
                    "{skill.rationale}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Statement */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
            <User className="w-4 h-4 text-blue-400" />
            <span>Student Contribution Statement</span>
          </div>
          <div className="bg-zinc-950/80 border border-white/10 rounded-xl p-5 text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap">
            {candidate.contribution_statement}
          </div>
          <p className="text-[11px] text-zinc-500 italic font-mono">
            * Authenticated statement submitted under academic integrity guidelines with permitted AI disclosure.
          </p>
        </div>

        {/* Transition Form */}
        <form onSubmit={handleTransition} className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-5">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recruiter Decision & Stage Transition
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Every stage update writes an immutable audit record tagged with version #{candidate.version}.
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
                    ? 'border-blue-500/60 bg-blue-500/20 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-500/50'
                    : 'border-white/10 bg-zinc-950/80 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
              Internal Justification Note <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={transitionReason}
              onChange={(e) => setTransitionReason(e.target.value)}
              placeholder="e.g., Reviewed SQL queries demonstrate strong edge-case handling, independent window logic, and honest AI disclosure."
              className="w-full text-xs text-white rounded-xl border border-white/10 bg-zinc-950/90 p-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-600 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !transitionReason.trim()}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 font-mono uppercase tracking-wider"
          >
            {isSubmitting ? 'Recording Transition in Audit Log...' : `Confirm Stage Change to "${targetStatus}"`}
          </button>
        </form>
      </div>
    </AppShell>
  );
}

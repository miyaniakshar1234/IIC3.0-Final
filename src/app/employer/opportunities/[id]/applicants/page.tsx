'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge, ApplicationStatus } from '@/components/employer/StatusBadge';
import {
  SnapshotDrawer,
  CandidateSnapshotData,
} from '@/components/employer/SnapshotDrawer';
import {
  Users,
  ArrowLeft,
  Search,
  Filter,
  ArrowUpDown,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Building,
  GraduationCap
} from 'lucide-react';

const DEMO_CANDIDATES: CandidateSnapshotData[] = [
  {
    application_id: '70000000-0000-0000-0000-000000000001',
    version: 1,
    student_name: 'Meera Patel',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    opportunity_title: 'Junior Data Analyst Intern',
    status: 'submitted',
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
          'Clear executive structure with bullet points and risk disclosures. Level 4 requires broader competitor benchmarking.',
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
          'Thorough contribution statement explaining regex extraction for customer IDs and transparently detailing indexing trade-offs.',
      },
    ],
    contribution_statement:
      'I wrote all the SQL queries independently using PostgreSQL 16 syntax. I used Claude 3.5 Sonnet to help construct the initial regex pattern to extract cleaned digits from inconsistent phone and ID fields, which I then manually tested and adapted. If I had more time, I would add partition pruning and composite indexes on (transaction_date, customer_id) for datasets exceeding 10M rows.',
  },
  {
    application_id: '70000000-0000-0000-0000-000000000002',
    version: 1,
    student_name: 'Aarav Sharma',
    student_program: 'B.Tech CS 2026',
    student_institution: 'Demo College of Computing',
    opportunity_title: 'Junior Data Analyst Intern',
    status: 'shortlisted',
    applied_at: '2026-09-07T14:20:00Z',
    scoring_version: 'coverage-v1',
    reviewed_coverage: 75,
    skills: [
      {
        skill_id: '10000000-0000-0000-0000-000000000001',
        skill_name: 'SQL Querying & Data Cleaning',
        required_level: 3,
        reviewed_level: 2,
        weight: 35,
        contribution: 23,
        reviewer_name: 'Dr. Sharma',
        reviewed_at: '2026-09-06T15:00:00Z',
        evidence_title: 'Basic Hospital Patient Records Aggregation',
        criterion_title: 'Aggregation and Filtering',
        rationale: 'Correct standard queries but missed null revenue handling.',
      },
      {
        skill_id: '10000000-0000-0000-0000-000000000002',
        skill_name: 'Spreadsheets & Pivot Modeling',
        required_level: 3,
        reviewed_level: 3,
        weight: 25,
        contribution: 25,
        reviewer_name: 'Prof. Anita Desai',
        reviewed_at: '2026-09-04T12:00:00Z',
        evidence_title: 'Budget Forecast Sheet',
        criterion_title: 'Formulas & Pivots',
        rationale: 'Clean workbook with automated formulas.',
      },
      {
        skill_id: '10000000-0000-0000-0000-000000000004',
        skill_name: 'Analytical Reasoning & Trade-offs',
        required_level: 3,
        reviewed_level: 3,
        weight: 24,
        contribution: 24,
        reviewer_name: 'Dr. Sharma',
        reviewed_at: '2026-09-06T15:30:00Z',
        evidence_title: 'Basic Hospital Patient Records Aggregation',
        criterion_title: 'Analytical Justification',
        rationale: 'Thoughtful explanation of patient record triage rules.',
      },
    ],
    contribution_statement: 'Worked on Google Sheets and MySQL workbench directly.',
  },
  {
    application_id: '70000000-0000-0000-0000-000000000003',
    version: 1,
    student_name: 'Kavita Iyer',
    student_program: 'MCA 2026',
    student_institution: 'Demo College of Computing',
    opportunity_title: 'Junior Data Analyst Intern',
    status: 'submitted',
    applied_at: '2026-09-08T09:45:00Z',
    scoring_version: 'coverage-v1',
    reviewed_coverage: 52,
    skills: [
      {
        skill_id: '10000000-0000-0000-0000-000000000002',
        skill_name: 'Spreadsheets & Pivot Modeling',
        required_level: 3,
        reviewed_level: 3,
        weight: 25,
        contribution: 25,
        reviewer_name: 'Prof. Anita Desai',
        reviewed_at: '2026-09-03T16:00:00Z',
        evidence_title: 'Sales Dashboard',
        criterion_title: 'Pivot Charts',
        rationale: 'Solid visualization and formulas.',
      },
      {
        skill_id: '10000000-0000-0000-0000-000000000004',
        skill_name: 'Analytical Reasoning & Trade-offs',
        required_level: 3,
        reviewed_level: 3,
        weight: 24,
        contribution: 24,
        reviewer_name: 'Dr. Sharma',
        reviewed_at: '2026-09-03T17:00:00Z',
        evidence_title: 'Business Memo',
        criterion_title: 'Problem Framing',
        rationale: 'Clear rationale and structure.',
      },
    ],
    contribution_statement: 'Spreadsheet models created for classroom project.',
  },
];

export default function CandidateScreeningPage({ params }: { params: { id: string } }) {
  const [candidates, setCandidates] = useState<CandidateSnapshotData[]>(DEMO_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateSnapshotData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenDrawer = (candidate: CandidateSnapshotData) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const handleTransitionStatus = async (
    applicationId: string,
    toStatus: ApplicationStatus,
    reason: string,
    expectedVersion: number
  ) => {
    // In full API integration, this calls:
    // POST /api/v1/applications/[id]/transitions
    // with { to_status: toStatus, reason, expected_version: expectedVersion }
    await new Promise((resolve) => setTimeout(resolve, 600));

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.application_id === applicationId) {
          return {
            ...c,
            status: toStatus,
            version: c.version + 1,
          };
        }
        return c;
      })
    );

    setToastMessage(`Candidate stage moved to "${toStatus}" with audit note recorded.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filteredCandidates = candidates.filter((c) => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (
      searchQuery &&
      !c.student_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.student_program.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border rounded-xl p-6 shadow-sm">
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
                <Building className="w-4 h-4" />
                <span>Sample Analytics Studio • Candidate Screening</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-text-primary pl-7">
              Junior Data Analyst Intern — Applicants
            </h1>
            <p className="text-xs text-text-secondary pl-7">
              Screen candidates based on verified evidence snapshots and deterministic skill coverage.
            </p>
          </div>

          <div className="flex items-center space-x-3 pl-7 sm:pl-0">
            <div className="bg-canvas border border-border px-4 py-2 rounded-lg text-left">
              <span className="text-[11px] text-text-secondary font-medium block">
                Total Applicants
              </span>
              <span className="text-lg font-bold text-text-primary">
                {candidates.length} Candidates
              </span>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-success rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-success hover:underline font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'all', label: 'All Candidates', count: candidates.length },
              {
                id: 'submitted',
                label: 'New Submitted',
                count: candidates.filter((c) => c.status === 'submitted').length,
              },
              {
                id: 'shortlisted',
                label: 'Shortlisted',
                count: candidates.filter((c) => c.status === 'shortlisted').length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === tab.id
                    ? 'bg-accent-soft text-accent border border-blue-200'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name or program..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border bg-surface focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        {/* Candidate Table */}
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-5">Candidate Name</th>
                  <th className="py-3.5 px-4">Stage Status</th>
                  <th className="py-3.5 px-4">Reviewed Skill Coverage</th>
                  <th className="py-3.5 px-4">Verified Evidence</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.application_id}
                    onClick={() => handleOpenDrawer(candidate)}
                    className="hover:bg-gray-50/70 transition-colors cursor-pointer group"
                  >
                    {/* Candidate Name & Info */}
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <span className="font-bold text-sm text-text-primary group-hover:text-accent transition-colors flex items-center space-x-1.5">
                          <span>{candidate.student_name}</span>
                          {candidate.reviewed_coverage >= 90 && (
                            <span className="text-[10px] uppercase font-bold text-success bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                              Top Match
                            </span>
                          )}
                        </span>
                        <span className="text-text-secondary text-[11px] block">
                          {candidate.student_program} • {candidate.student_institution}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <StatusBadge status={candidate.status} size="sm" />
                    </td>

                    {/* Reviewed Coverage */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5 max-w-[140px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-text-primary font-mono text-xs">
                            {candidate.reviewed_coverage}%
                          </span>
                          <span className="text-[10px] text-text-secondary">
                            (coverage-v1)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
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
                    </td>

                    {/* Verified Evidence */}
                    <td className="py-4 px-4 text-text-secondary font-medium">
                      <span className="inline-flex items-center space-x-1 text-xs text-text-primary">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{candidate.skills.length} Attainments</span>
                      </span>
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-4 text-text-secondary text-xs">
                      {new Date(candidate.applied_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrawer(candidate);
                        }}
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-accent bg-accent-soft px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        <span>Inspect Evidence</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sliding Evidence Snapshot Drawer */}
        <SnapshotDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          candidate={selectedCandidate}
          onTransitionStatus={handleTransitionStatus}
        />
      </div>
    </AppShell>
  );
}

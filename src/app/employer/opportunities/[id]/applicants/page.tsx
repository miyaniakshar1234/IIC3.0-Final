'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let isMounted = true;
    async function loadLiveState() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            const hasSql = Boolean(json.data.has_verified_sql);
            setCandidates((prev) =>
              prev.map((c) => {
                if (c.student_name === 'Meera Patel') {
                  return {
                    ...c,
                    reviewed_coverage: hasSql ? 96 : 61,
                    skills: c.skills.map((s) => {
                      if (s.skill_name.includes('SQL')) {
                        return {
                          ...s,
                          reviewed_level: hasSql ? 3 : 0,
                          contribution: hasSql ? 35 : 0,
                          reviewer_name: hasSql ? 'Dr. Sharma' : 'Pending Review',
                          reviewed_at: hasSql ? (json.data.sql_reviewed_at || '2026-09-08T16:00:00Z') : 'Pending',
                        };
                      }
                      return s;
                    }),
                  };
                }
                return c;
              })
            );
          }
        }
      } catch (err) {
        console.warn('Could not load live state for applicants:', err);
      }
    }
    loadLiveState();
    const interval = setInterval(loadLiveState, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

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
    try {
      const res = await fetch(`/api/v1/applications/${applicationId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_status: toStatus,
          reason,
          expected_version: expectedVersion,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || 'Failed to update application status');
      }

      const json = await res.json();
      const updatedVersion = json.data?.version ?? expectedVersion + 1;

      setCandidates((prev) =>
        prev.map((c) => {
          if (c.application_id === applicationId) {
            return {
              ...c,
              status: toStatus,
              version: updatedVersion,
            };
          }
          return c;
        })
      );

      setToastMessage(`Candidate stage moved to "${toStatus}" in PostgreSQL with audit log.`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err: any) {
      console.error('Error transitioning application stage:', err);
      // Fallback local state update if network glitch
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
      setToastMessage(`Stage updated: "${toStatus}".`);
      setTimeout(() => setToastMessage(null), 5000);
    }
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
      <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
        {/* Navigation & Header */}
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
              <div className="section-label text-[11px]">
                <Building className="w-4 h-4 text-accent" />
                <span>Sample Analytics Studio • Candidate Screening</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-text-primary pl-9 tracking-tight">
              Junior Data Analyst Intern — Applicants
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary pl-9 font-mono max-w-2xl">
              Screen candidates based on verified evidence snapshots, anchored rubrics, and deterministic skill coverage math.
            </p>
          </div>

          <div className="flex items-center space-x-3 pl-9 sm:pl-0 relative z-10 shrink-0">
            <div className="bg-canvas border border-border px-5 py-3 rounded-2xl text-left shadow-inner">
              <span className="section-label text-[9px] block">
                Total Applicants
              </span>
              <span className="metric-value text-2xl text-accent">
                {candidates.length} Candidates
              </span>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="bg-success/10 border border-success/30 text-success rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5 text-xs font-semibold font-mono">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-success hover:underline font-mono"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
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
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                  filterStatus === tab.id
                    ? 'bg-accent-soft text-accent border border-border-accent shadow-sm'
                    : 'bg-surface text-text-muted border border-border hover:text-text-primary hover:border-border-bright'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  filterStatus === tab.id ? 'bg-accent text-[var(--text-inverse)]' : 'bg-canvas text-text-muted border border-border'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name or program..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono"
            />
          </div>
        </div>

        {/* Candidate Table */}
        <div className="pb-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="py-4 px-6">Candidate Profile</th>
                  <th className="py-4 px-4">Stage Status</th>
                  <th className="py-4 px-4">Reviewed Skill Coverage</th>
                  <th className="py-4 px-4">Verified Evidence</th>
                  <th className="py-4 px-4">Applied Date</th>
                  <th className="py-4 px-6 text-right">Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.application_id}
                    onClick={() => handleOpenDrawer(candidate)}
                    className="hover:bg-surface-hover transition-colors cursor-pointer group"
                  >
                    {/* Candidate Name & Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-text-primary group-hover:text-accent transition-colors flex items-center space-x-2">
                          <span>{candidate.student_name}</span>
                          {candidate.reviewed_coverage >= 90 && (
                            <span className="text-[10px] uppercase font-bold text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded-full font-mono">
                              Top Match
                            </span>
                          )}
                        </span>
                        <span className="text-text-muted text-xs block font-mono">
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
                      <div className="space-y-1.5 max-w-[150px]">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-text-primary text-xs">
                            {candidate.reviewed_coverage}%
                          </span>
                          <span className="text-[10px] text-text-muted">
                            coverage-v1
                          </span>
                        </div>
                        <div className="w-full bg-canvas rounded-full h-2 overflow-hidden border border-border p-0.5">
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
                    </td>

                    {/* Verified Evidence */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center space-x-1.5 text-xs text-text-secondary font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-success" />
                        <span>{candidate.skills.length} Attainments</span>
                      </span>
                    </td>

                    {/* Applied Date */}
                    <td className="py-4 px-4 text-text-muted text-xs font-mono">
                      {new Date(candidate.applied_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrawer(candidate);
                        }}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-accent bg-accent-soft hover:bg-accent/20 px-3.5 py-1.5 rounded-xl transition-all border border-border-accent font-mono shadow-sm"
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

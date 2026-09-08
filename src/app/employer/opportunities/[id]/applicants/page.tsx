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
  GraduationCap,
  Eye,
  SlidersHorizontal
} from 'lucide-react';



export default function CandidateScreeningPage({ params }: { params: { id: string } }) {
  const [candidates, setCandidates] = useState<CandidateSnapshotData[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateSnapshotData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBlindMode, setIsBlindMode] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadApplicants() {
      try {
        const res = await fetch(`/api/v1/opportunities/${params.id}/applicants`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setCandidates(json.data);
          }
        }
      } catch (err) {
        console.warn('Could not load live applicants:', err);
      }
    }
    loadApplicants();
    const interval = setInterval(loadApplicants, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [params.id]);

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

      setToastMessage(`Candidate moved to "${toStatus}" in PostgreSQL with audit log.`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err: any) {
      console.error('Error transitioning application stage:', err);
      throw err;
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

  const displayCandidates = [...filteredCandidates].sort((a, b) => {
    if (isBlindMode) {
      return b.reviewed_coverage - a.reviewed_coverage;
    }
    return 0;
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

        {/* Blind Screening Feature Banner */}
        {isBlindMode && (
          <div className="bg-accent/10 border border-border-accent rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center font-black shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-text-primary block text-xs">
                  Skill-First Blind Screening Active
                </span>
                <span className="text-text-secondary text-[11px] leading-relaxed">
                  Student names, photos, and institutional branding are masked to prevent pedigree bias. Candidates are evaluated and ranked strictly on verified evidence and deterministic math.
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-accent uppercase font-bold self-start sm:self-center px-2.5 py-1 rounded-lg bg-surface border border-border-accent shrink-0">
              Competency-First
            </span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
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

            {/* Blind Mode Toggle Button */}
            <button
              type="button"
              onClick={() => setIsBlindMode(!isBlindMode)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                isBlindMode
                  ? 'bg-accent/15 text-accent border-border-accent shadow-sm ring-1 ring-accent'
                  : 'bg-surface text-text-muted border border-border hover:text-text-primary'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>{isBlindMode ? '⚡ Blind Mode: ON' : 'Blind Mode: OFF'}</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate or program..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono"
            />
          </div>
        </div>

        {/* Candidate Table */}
        <div className="pb-card overflow-hidden">
          {/* Mobile Candidate Card View */}
          <div className="sm:hidden divide-y divide-[var(--border)]">
            {displayCandidates.map((candidate) => {
              const displayName = isBlindMode
                ? `Candidate #${candidate.application_id.slice(-4)}`
                : candidate.student_name;
              const displaySub = isBlindMode
                ? 'MCA Cohort • Pedigree Masked'
                : `${candidate.student_program} • ${candidate.student_institution}`;

              return (
                <button
                  key={candidate.application_id}
                  type="button"
                  onClick={() => handleOpenDrawer(candidate)}
                  className="w-full p-4 text-left space-y-3 hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-text-primary truncate">{displayName}</p>
                      <p className="text-[10px] text-text-muted font-mono truncate">{displaySub}</p>
                    </div>
                    <StatusBadge status={candidate.status} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-text-muted">Reviewed coverage</span>
                    <strong className="text-accent">{candidate.reviewed_coverage}%</strong>
                  </div>
                  <div className="w-full bg-canvas rounded-full h-2 overflow-hidden border border-border p-0.5">
                    <div
                      className={`h-full rounded-full ${candidate.reviewed_coverage >= 80 ? 'bg-success' : candidate.reviewed_coverage >= 50 ? 'bg-warning' : 'bg-danger'}`}
                      style={{ width: `${candidate.reviewed_coverage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-text-muted font-mono">
                    <span>{candidate.skills.length} attainment records</span>
                    <span className="text-accent font-bold flex items-center gap-1">Inspect proof <ChevronRight className="w-3 h-3" /></span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="py-4 px-6">Candidate</th>
                  <th className="py-4 px-4">Stage</th>
                  <th className="py-4 px-4">Reviewed Match</th>
                  <th className="py-4 px-4">Verifiable Evidence</th>
                  <th className="py-4 px-4">Applied</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {displayCandidates.map((candidate) => {
                  const displayName = isBlindMode
                    ? `Candidate #${candidate.application_id.slice(-4)}`
                    : candidate.student_name;
                  const displaySub = isBlindMode
                    ? 'MCA Cohort • Pedigree Masked'
                    : `${candidate.student_program} • ${candidate.student_institution}`;

                  return (
                    <tr
                      key={candidate.application_id}
                      onClick={() => handleOpenDrawer(candidate)}
                      className="hover:bg-surface-hover transition-colors cursor-pointer group"
                    >
                      {/* Candidate Name & Info */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className="font-bold text-sm text-text-primary group-hover:text-accent transition-colors flex items-center space-x-2">
                            <span>{displayName}</span>
                            {candidate.reviewed_coverage >= 90 && (
                              <span className="text-[10px] uppercase font-bold text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded-full font-mono">
                                Top Match
                              </span>
                            )}
                          </span>
                          <span className="text-text-muted text-xs block font-mono">
                            {displaySub}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sliding Evidence Snapshot Drawer */}
        <SnapshotDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          candidate={selectedCandidate}
          isBlindMode={isBlindMode}
          onTransitionStatus={handleTransitionStatus}
        />
      </div>
    </AppShell>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

export default function StudentApplicationsPage() {
  const [hasVerifiedSql, setHasVerifiedSql] = React.useState(false);

  React.useEffect(() => {
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

  const applications = [
    {
      id: 'app-001',
      roleTitle: 'Junior Data Analyst Intern',
      companyName: 'Sample Analytics Studio',
      appliedDate: 'Sep 07, 2026',
      status: 'submitted',
      statusLabel: hasVerifiedSql ? 'Top Match (96% Coverage)' : 'Submitted & Evidence Shared',
      sharedCoverage: hasVerifiedSql ? '96%' : '61%',
      verifiedEvidenceCount: hasVerifiedSql ? 4 : 3,
      timeline: [
        { label: 'Application Submitted', date: 'Sep 07, 2026', completed: true },
        { label: 'Recruiter Screening', date: hasVerifiedSql ? 'Priority Shortlist' : 'In Progress', completed: hasVerifiedSql, current: !hasVerifiedSql },
        { label: 'Technical Review', date: hasVerifiedSql ? 'Passed (SQL L3 Signed)' : 'Pending Evaluation', completed: hasVerifiedSql, current: hasVerifiedSql },
        { label: 'Final Offer Decision', date: 'Pending', completed: false }
      ],
      sharedSkills: [
        'Spreadsheets (Level 3 - Verified)',
        'Written Technical Communication (Level 3 - Verified)',
        'Analytical Reasoning (Level 3 - Verified)',
        ...(hasVerifiedSql ? ['SQL Querying & Data Cleaning (Level 3 - Verified Dr. Sharma)'] : [])
      ]
    }
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="pb-card-accent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="section-label mb-1">Application Pipeline</div>
            <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
              My Active Applications
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary font-mono max-w-2xl leading-relaxed">
              Synthetic preview of recruitment stages and the evidence snapshot intended for an employer application.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="pb-btn-primary text-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Match Engine (61% → 96%)</span>
            </Link>
          </div>
        </div>

        {/* Application Cards List */}
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="pb-card p-6 sm:p-8 space-y-6 hover:border-border-accent transition-all">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary">{app.roleTitle}</h2>
                  <p className="text-xs font-semibold text-accent flex items-center gap-1.5 font-mono">
                    <Building2 className="w-4 h-4" />
                    <span>{app.companyName}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="pb-badge pb-badge-accent font-mono">
                    {app.statusLabel}
                  </span>
                  <Link
                    href={`/opportunities/40000000-0000-0000-0000-000000000001`}
                    className="text-xs font-bold text-accent hover:underline flex items-center gap-1 font-mono transition-colors"
                  >
                    <span>View Role</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h3 className="section-label mb-3">
                  Recruitment Stage Timeline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {app.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all duration-300 relative font-mono ${
                        step.completed
                          ? 'bg-success/10 border-success/30 text-success shadow-sm'
                          : step.current
                          ? 'bg-accent-soft border-border-accent text-accent font-bold shadow-accent ring-1 ring-border-accent'
                          : 'bg-canvas border-border text-text-muted opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold">Step {idx + 1}</span>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : step.current ? (
                          <Clock className="w-4 h-4 text-accent animate-pulse" />
                        ) : null}
                      </div>

                      <div className="text-xs sm:text-sm font-bold">{step.label}</div>
                      <div className="text-[11px] mt-1 text-text-muted font-medium">{step.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frozen Snapshot Summary */}
              <div className="bg-canvas p-5 rounded-xl border border-border space-y-3 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <span className="font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    <span>Frozen Evidence Grants Shared on Application ({app.appliedDate})</span>
                  </span>
                  <span className="font-bold text-accent">Shared Match Coverage: {app.sharedCoverage}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  {app.sharedSkills.map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-surface border border-border font-medium text-text-secondary hover:border-border-accent transition-colors">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

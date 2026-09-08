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
  const applications = [
    {
      id: 'app-001',
      roleTitle: 'Junior Data Analyst Intern',
      companyName: 'Sample Analytics Studio',
      appliedDate: 'Sep 07, 2026',
      status: 'submitted',
      statusLabel: 'Submitted & Evidence Shared',
      sharedCoverage: '61%',
      verifiedEvidenceCount: 3,
      timeline: [
        { label: 'Application Submitted', date: 'Sep 07, 2026', completed: true },
        { label: 'Recruiter Screening', date: 'In Progress', completed: false, current: true },
        { label: 'Technical Interview', date: 'Pending', completed: false },
        { label: 'Final Offer Decision', date: 'Pending', completed: false }
      ],
      sharedSkills: [
        'Spreadsheets (Level 3)',
        'Written Technical Communication (Level 3)',
        'Analytical Reasoning (Level 3)'
      ]
    }
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>APPLICATION TRACKING PIPELINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Active Applications
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-2xl leading-relaxed">
              Track candidate recruitment stages, review immutable evidence grants shared with employers, and monitor status updates.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] font-mono"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Match Engine (61% → 96%)</span>
            </Link>
          </div>
        </div>

        {/* Application Cards List */}
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6 hover:border-white/20 transition-all">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{app.roleTitle}</h2>
                  <p className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 font-mono">
                    <Building2 className="w-4 h-4" />
                    <span>{app.companyName}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 font-mono">
                    {app.statusLabel}
                  </span>
                  <Link
                    href={`/opportunities/40000000-0000-0000-0000-000000000001`}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono transition-colors"
                  >
                    <span>View Role</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono mb-4">
                  Recruitment Stage Timeline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {app.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all duration-300 relative font-mono ${
                        step.completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-sm'
                          : step.current
                          ? 'bg-blue-500/15 border-blue-500/50 text-white font-bold shadow-md shadow-blue-500/15 ring-1 ring-blue-500/40'
                          : 'bg-zinc-950/70 border-white/5 text-zinc-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold">Step {idx + 1}</span>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : step.current ? (
                          <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
                        ) : null}
                      </div>

                      <div className="text-xs sm:text-sm font-bold">{step.label}</div>
                      <div className="text-[11px] mt-1 text-zinc-400 font-medium">{step.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frozen Snapshot Summary */}
              <div className="bg-zinc-950/80 p-5 rounded-xl border border-white/10 space-y-3 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Frozen Evidence Grants Shared on Application ({app.appliedDate})</span>
                  </span>
                  <span className="font-bold text-blue-400">Shared Match Coverage: {app.sharedCoverage}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  {app.sharedSkills.map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 font-medium text-zinc-300 hover:border-white/20 transition-colors">
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

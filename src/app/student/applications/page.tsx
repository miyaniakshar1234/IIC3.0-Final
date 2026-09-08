'use client'

import React from 'react'
import Link from 'next/link'
import { StudentNav } from '@/components/student/StudentNav'
import { 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ShieldCheck,
  FileText,
  UserCheck
} from 'lucide-react'

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
  ]

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <StudentNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-border pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
            <FileText className="w-4 h-4 text-accent" />
            APPLICATION TRACKING PIPELINE
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary">My Applications</h1>
          <p className="text-sm text-text-secondary mt-1">
            Track real-time candidate stage transitions and frozen evidence snapshots.
          </p>
        </div>

        {/* Application Cards List */}
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{app.roleTitle}</h2>
                  <p className="text-sm font-semibold text-accent flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-4 h-4" />
                    {app.companyName}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                    {app.statusLabel}
                  </span>
                  <Link
                    href={`/opportunities/opp-data-analyst-001`}
                    className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                  >
                    View Role Requirements
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">
                  Recruitment Stage Timeline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {app.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition relative ${
                        step.completed
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : step.current
                          ? 'bg-blue-50 border-accent text-accent font-semibold shadow-xs'
                          : 'bg-canvas border-border text-text-secondary opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider">Step {idx + 1}</span>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : step.current ? (
                          <Clock className="w-4 h-4 text-accent animate-pulse" />
                        ) : null}
                      </div>

                      <div className="text-sm font-bold">{step.label}</div>
                      <div className="text-xs mt-1 text-gray-500 font-medium">{step.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frozen Snapshot Summary */}
              <div className="bg-canvas p-5 rounded-xl border border-border space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Frozen Evidence Grants Shared on Application ({app.appliedDate})
                  </span>
                  <span className="font-semibold text-accent">Shared Coverage: {app.sharedCoverage}</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {app.sharedSkills.map((sk, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-surface border border-border font-medium text-text-primary">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { StudentNav } from '@/components/student/StudentNav'
import { CoverageBar } from '@/components/student/CoverageBar'
import { StatusChip } from '@/components/student/StatusChip'
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck,
  Send,
  X
} from 'lucide-react'

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const [showFormula, setShowFormula] = useState(false)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  // Synthetic Opportunity Data: Junior Data Analyst Intern
  const opportunity = {
    id: params.id || 'opp-data-analyst-001',
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    location: 'Jaipur, Rajasthan (Hybrid)',
    compensation: '₹25,000 / month',
    deadline: 'Sep 25, 2026',
    description: `We are looking for a motivated Junior Data Analyst Intern to assist with query optimization, financial ledger auditing, and executive KPI reporting. You will work directly with our senior analytics team.`,
    currentCoverage: 61,
    skills: [
      {
        id: 'sk-sql',
        name: 'SQL (Structured Query Language)',
        requiredLevel: 3,
        weight: 35,
        studentLevel: null,
        contribution: 0,
        status: 'not-demonstrated' as const,
        challengeId: 'chl-sql-001',
        challengeTitle: 'Explain Monthly Sales from Messy Dataset'
      },
      {
        id: 'sk-sheets',
        name: 'Spreadsheets & Financial Auditing',
        requiredLevel: 3,
        weight: 25,
        studentLevel: 3,
        contribution: 25,
        status: 'reviewed' as const,
        reviewerName: 'Dr. Sharma',
        reviewedDate: 'Sep 06, 2026'
      },
      {
        id: 'sk-comm',
        name: 'Written Technical Communication',
        requiredLevel: 4,
        weight: 16,
        studentLevel: 3,
        contribution: 12,
        status: 'reviewed' as const,
        reviewerName: 'Prof. Ananya',
        reviewedDate: 'Sep 04, 2026'
      },
      {
        id: 'sk-reasoning',
        name: 'Analytical Reasoning',
        requiredLevel: 3,
        weight: 24,
        studentLevel: 3,
        contribution: 24,
        status: 'reviewed' as const,
        reviewerName: 'Dr. Sharma',
        reviewedDate: 'Sep 02, 2026'
      }
    ]
  }

  const handleConfirmApply = () => {
    setIsApplied(true)
    setIsApplyModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <StudentNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Main Grid: Main Content + Action Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Verified Employer Partner
                  </span>
                  <span className="text-xs text-text-secondary font-medium">Ref: OPP-2026-001</span>
                </div>
                <h1 className="text-3xl font-extrabold text-text-primary">{opportunity.title}</h1>
                <p className="text-base font-semibold text-accent mt-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {opportunity.employer}
                </p>
              </div>

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary pt-2 border-t border-border">
                <span className="flex items-center gap-1.5 bg-canvas px-3 py-1.5 rounded-lg border border-border">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {opportunity.location}
                </span>
                <span className="flex items-center gap-1.5 bg-canvas px-3 py-1.5 rounded-lg border border-border">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  {opportunity.compensation}
                </span>
                <span className="flex items-center gap-1.5 bg-canvas px-3 py-1.5 rounded-lg border border-border">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Deadline: {opportunity.deadline}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2">
                  Role Overview
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            </div>

            {/* Coverage Visualizer Panel */}
            <CoverageBar
              currentCoverage={opportunity.currentCoverage}
              targetRoleTitle={opportunity.title}
              showCalculationToggle={true}
              onToggleCalculation={() => setShowFormula(!showFormula)}
            />

            {/* Calculation Formula Accordion */}
            {showFormula && (
              <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent" />
                    How ProofBridge Calculates Role Match (coverage-v1)
                  </h4>
                </div>

                <div className="text-xs text-text-secondary space-y-2 leading-relaxed">
                  <p>
                    Matching is calculated deterministically by comparing your active human-reviewed attainments against the employer&apos;s published skill weights:
                  </p>
                  <div className="p-3 bg-canvas rounded-lg font-mono text-text-primary border border-gray-200 text-xs">
                    contribution_i = weight_i × min(reviewed_level_i / required_level_i, 1)
                  </div>
                  <p className="italic">
                    Missing evidence contributes 0 points. Attainments beyond the required level do not grant extra points beyond the skill weight.
                  </p>
                </div>
              </div>
            )}

            {/* Detailed Per-Skill Match Table */}
            <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-text-primary uppercase tracking-wider">
                  Required Skills & Your Evidence
                </h3>
                <span className="text-xs text-text-secondary font-medium">4 Required Skills</span>
              </div>

              <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                {opportunity.skills.map((skill) => (
                  <div key={skill.id} className="p-4 sm:p-5 bg-white space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-text-primary">{skill.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-text-secondary mt-0.5">
                          <span>Required: <strong>Level {skill.requiredLevel}/4</strong></span>
                          <span>•</span>
                          <span>Skill Weight: <strong>{skill.weight}%</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusChip 
                          status={skill.status}
                          reviewerName={skill.reviewerName}
                          reviewedDate={skill.reviewedDate}
                        />
                        <span className="text-sm font-extrabold text-text-primary min-w-[50px] text-right">
                          +{skill.contribution} pts
                        </span>
                      </div>
                    </div>

                    {/* Unmet Skill Recommendation Banner */}
                    {skill.status === 'not-demonstrated' && skill.challengeId && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-amber-900 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                          Unmet Skill: Demonstrating SQL level 3 will unlock <strong className="text-amber-950">+35% coverage</strong>.
                        </span>
                        <Link
                          href={`/challenges/${skill.challengeId}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-white font-bold hover:bg-blue-700 transition shrink-0"
                        >
                          Start Challenge
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Sidebar (1 col) */}
          <div className="space-y-6">
            
            <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm space-y-6 sticky top-24">
              <div>
                <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-1">
                  Application Status
                </h3>
                {isApplied ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Application Submitted (61% Shared)
                  </div>
                ) : (
                  <div className="text-2xl font-extrabold text-text-primary">
                    Open for Applications
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              {isApplied ? (
                <Link
                  href="/student/applications"
                  className="w-full py-3 px-4 rounded-xl bg-canvas border border-border text-center font-bold text-sm text-text-primary hover:bg-gray-200 transition block"
                >
                  View Submitted Application →
                </Link>
              ) : (
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-accent hover:bg-blue-700 text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Apply with Evidence Passport
                </button>
              )}

              {/* Secondary Action: Missing Challenge */}
              <div className="pt-4 border-t border-border space-y-3">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                  Recommended Before Applying
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  You can apply now at 61% coverage, or complete the 2-hour SQL challenge to boost your candidate rank to 96%.
                </p>
                <Link
                  href="/challenges/chl-sql-001"
                  className="w-full py-2.5 px-3 rounded-xl bg-accent-soft text-accent hover:bg-blue-100 font-semibold text-xs transition flex items-center justify-center gap-1.5 border border-blue-200"
                >
                  Complete SQL Challenge (+35%)
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-text-secondary space-y-1">
                <span className="font-semibold text-gray-700 block">Privacy Guarantee:</span>
                ProofBridge only shares your selected evidence revisions with {opportunity.employer}. Your full profile remains private by default.
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Evidence Selection & Confirmation Dialog */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-border p-6 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-text-primary">Confirm Application Evidence</h3>
                <p className="text-xs text-text-secondary">Applying to {opportunity.employer}</p>
              </div>
              <button onClick={() => setIsApplyModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <span className="font-bold text-text-primary uppercase tracking-wider block">
                Evidence Items Granted to Recruiter:
              </span>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                <div className="p-3 rounded-lg bg-canvas border border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-text-primary">Spreadsheets & Financial Auditing</span>
                    <p className="text-gray-500">Reviewed Level 3 • Clean and Audit Financial Ledger CSV</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="p-3 rounded-lg bg-canvas border border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-text-primary">Written Technical Communication</span>
                    <p className="text-gray-500">Reviewed Level 3 • Database Normalization Briefing</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="p-3 rounded-lg bg-canvas border border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-text-primary">Analytical Reasoning</span>
                    <p className="text-gray-500">Reviewed Level 3 • User Churn Pattern Analysis</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
              <span>Reviewed Match Coverage Shared:</span>
              <strong className="text-accent text-sm">61%</strong>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-canvas rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApply}
                className="px-5 py-2.5 text-xs font-bold text-white bg-accent hover:bg-blue-700 rounded-xl transition shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Evidence Application
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

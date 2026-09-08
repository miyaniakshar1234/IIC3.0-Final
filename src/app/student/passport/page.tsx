'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/ui/AppShell'
import { StatusChip } from '@/components/student/StatusChip'
import { EvidenceDrawer, EvidenceDetail } from '@/components/student/EvidenceDrawer'
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Clock,
  FileText,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Building2,
  ExternalLink,
  Layers,
  Info
} from 'lucide-react'

export default function EvidencePassportPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'reviewed' | 'gaps' | 'declared'>('all')
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceDetail | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Student Identity Context
  const student = {
    name: 'Meera Patel',
    program: 'MCA 2026',
    institution: 'Demo College of Computing',
    avatarInitial: 'MP',
  }

  // Audited Evidence Dataset for Meera Patel
  const reviewedAttainments: EvidenceDetail[] = [
    {
      skillName: 'Spreadsheets',
      reviewedLevel: 3,
      requiredLevel: 3,
      reviewerName: 'Dr. Alok Sharma',
      reviewerTitle: 'Associate Professor & Analytics Mentor',
      reviewedDate: 'Sep 06, 2026',
      challengeTitle: 'Clean and Audit Financial Ledger CSV',
      contributionStatement: `I loaded the raw dirty dataset, cleaned 140 null rows using automated logic in Python/Pandas, exported to Excel, and constructed pivot tables summarizing quarterly revenue. I verified total balances using checksum formulas.`,
      externalLinks: [
        'https://github.com/meerasharma/ledger-audit-submission',
        'https://docs.google.com/spreadsheets/d/1demo-ledger-sheet-meera/edit'
      ],
      criteriaResults: [
        {
          criterionTitle: 'Data Cleaning & Error Checking',
          scoreLevel: 3,
          levelDescription: 'Handles duplicates, null values, and validates integrity across columns',
          reviewerRationale: 'Excel formulas used SUMIFS and IFERROR properly. Verified zero unaccounted variance.'
        },
        {
          criterionTitle: 'Pivot Summaries & Visualization',
          scoreLevel: 3,
          levelDescription: 'Constructs multi-dimensional pivot tables with formatted clear outputs',
          reviewerRationale: 'Clean visual hierarchy and accurate breakdown by department.'
        }
      ]
    },
    {
      skillName: 'Written Communication',
      reviewedLevel: 3,
      requiredLevel: 4,
      reviewerName: 'Prof. Ananya Sen',
      reviewerTitle: 'Department Head, Technical Communication',
      reviewedDate: 'Sep 04, 2026',
      challengeTitle: 'Technical Briefing: Database Normalization Tradeoffs',
      contributionStatement: `Drafted a 4-page briefing paper analyzing 3NF vs BCNF normalization for transactional databases versus OLAP analytical warehouses. Included original ER diagrams and query performance trade-off tables.`,
      externalLinks: [
        'https://github.com/meerasharma/database-normalization-essay'
      ],
      criteriaResults: [
        {
          criterionTitle: 'Clarity & Structure',
          scoreLevel: 3,
          levelDescription: 'Presents complex technical ideas clearly with logical sections and trade-off explanations',
          reviewerRationale: 'Logical structure throughout. Minor formatting improvements suggested for diagram captions.'
        }
      ]
    },
    {
      skillName: 'Analytical Reasoning',
      reviewedLevel: 3,
      requiredLevel: 3,
      reviewerName: 'Dr. Alok Sharma',
      reviewerTitle: 'Associate Professor & Analytics Mentor',
      reviewedDate: 'Sep 02, 2026',
      challengeTitle: 'Case Study: User Churn Pattern Analysis',
      contributionStatement: `Analyzed churn rates across 5,000 synthetic SaaS user records. Formulated 3 core hypotheses regarding onboarding friction, verified statistical significance using chi-squared tests, and drafted actionable retention recommendations.`,
      externalLinks: [
        'https://github.com/meerasharma/churn-analysis-case'
      ],
      criteriaResults: [
        {
          criterionTitle: 'Hypothesis Formulation & Verification',
          scoreLevel: 3,
          levelDescription: 'Formulates clear testable hypotheses and evaluates empirical evidence independently',
          reviewerRationale: 'Solid logical framing. Hypotheses were backed directly by data distributions.'
        }
      ]
    }
  ]

  // Requirement Gaps for Target Role (Junior Data Analyst Intern)
  const requirementGaps = [
    {
      skillName: 'SQL (Structured Query Language)',
      requiredLevel: 3,
      reviewedLevel: 0,
      weight: 35,
      status: 'not-demonstrated' as const,
      challengeId: '50000000-0000-0000-0000-000000000001',
      challengeTitle: 'Explain Monthly Sales from Messy Dataset',
      targetRole: 'Junior Data Analyst Intern at Sample Analytics Studio',
      impactNote: 'Addressing this requirement via successful human review could raise reviewed coverage from 61% to 96%.'
    }
  ]

  // Self-Declared Skills (Unverified claims)
  const selfDeclaredSkills = [
    { skillName: 'Python Data Analysis', declaredLevel: 2, declaredDate: 'Aug 28, 2026' },
    { skillName: 'Git & Version Control', declaredLevel: 3, declaredDate: 'Aug 25, 2026' },
    { skillName: 'HTML & CSS', declaredLevel: 2, declaredDate: 'Aug 20, 2026' },
  ]

  const openEvidenceDetail = (evidence: EvidenceDetail) => {
    setSelectedEvidence(evidence)
    setIsDrawerOpen(true)
  }

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* 1. STUDENT IDENTITY & SUB-NAVIGATION BAR */}
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {student.avatarInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-text-primary tracking-tight">{student.name}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {student.program}
                </span>
              </div>
              <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {student.institution}
              </p>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <nav aria-label="Student Sub Navigation" className="flex items-center gap-1.5 self-start md:self-center bg-canvas p-1 rounded-xl border border-border">
            <Link
              href="/student"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface/60 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/student/passport"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-surface text-accent shadow-xs border border-border/50"
            >
              Evidence Passport
            </Link>
            <Link
              href="/student/applications"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface/60 transition"
            >
              My Applications
            </Link>
          </nav>
        </div>

        {/* 2. PASSPORT HEADER & SUMMARY STATS */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                AUDITABLE EVIDENCE PASSPORT
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                Evidence Passport
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
                A structured view of verified evidence and human-reviewed skill attainments. Every reviewed attainment is anchored to a qualified human evaluator and rubric-scored student artifact.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 bg-canvas p-2.5 rounded-xl border border-border shrink-0 self-start md:self-center">
              <div className="px-3 py-1 text-center border-r border-border">
                <span className="text-xl font-extrabold text-emerald-700 block leading-tight">3</span>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Reviewed</span>
              </div>
              <div className="px-3 py-1 text-center border-r border-border">
                <span className="text-xl font-extrabold text-amber-700 block leading-tight">1</span>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Target Gap</span>
              </div>
              <div className="px-3 py-1 text-center">
                <span className="text-xl font-extrabold text-blue-700 block leading-tight">3</span>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Declared</span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Notice */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-text-secondary leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>Review Principle:</strong> &quot;Reviewed&quot; indicates that a named human evaluator assessed specified evidence against an anchored rubric. It does <em>not</em> represent universal certification, an accredited degree, or guaranteed employment.
            </span>
          </div>
        </div>

        {/* 3. TAB FILTERS */}
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeTab === 'all'
                ? 'bg-accent text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
          >
            All Skills ({reviewedAttainments.length + requirementGaps.length + selfDeclaredSkills.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviewed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'reviewed'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Human Reviewed ({reviewedAttainments.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'gaps'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Requirement Gaps ({requirementGaps.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('declared')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'declared'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Self-Declared ({selfDeclaredSkills.length})
          </button>
        </div>

        {/* 4. HUMAN-REVIEWED SKILLS SECTION */}
        {(activeTab === 'all' || activeTab === 'reviewed') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Verified Human-Reviewed Attainments</span>
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Click any skill card to open the auditable evidence drawer and inspect reviewer rationale and rubric scores.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 hidden sm:inline">
                {reviewedAttainments.length} Active Records
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reviewedAttainments.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openEvidenceDetail(item)}
                  className="bg-surface rounded-2xl border border-border p-5 hover:border-accent/40 hover:shadow-sm transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openEvidenceDetail(item)
                    }
                  }}
                  aria-label={`Inspect evidence for ${item.skillName}`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition">
                        {item.skillName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Reviewed Level {item.reviewedLevel} / 4
                      </span>
                      {item.requiredLevel !== undefined && (
                        <span className="text-xs text-text-secondary font-medium">
                          (Role Target: Level {item.requiredLevel})
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-text-secondary flex flex-wrap items-center gap-2">
                      <span>Challenge: <strong className="text-text-primary">{item.challengeTitle}</strong></span>
                      <span>•</span>
                      <span>{item.criteriaResults?.length || 0} Rubric Criteria Scored</span>
                      <span>•</span>
                      <span>{item.externalLinks?.length || 0} Proof Links</span>
                    </p>

                    <div className="pt-1">
                      <StatusChip
                        status="reviewed"
                        reviewerName={item.reviewerName}
                        reviewedDate={item.reviewedDate}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-xs font-semibold text-accent group-hover:underline flex items-center gap-1">
                      Inspect Audit Trail
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. REQUIREMENT GAPS SECTION (NOT YET DEMONSTRATED) */}
        {(activeTab === 'all' || activeTab === 'gaps') && (
          <div className="space-y-4 pt-2">
            <div>
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Target Requirement Gaps (Not Yet Demonstrated)</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Skills required by active target opportunities that have no verified human review on record.
              </p>
            </div>

            <div className="space-y-3">
              {requirementGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/40 border border-amber-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{gap.skillName}</h3>
                      <StatusChip status="not-demonstrated" />
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                        Weight: {gap.weight}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-700">
                      Required for: <strong className="text-slate-900">{gap.targetRole}</strong> (Required: Level {gap.requiredLevel}/4)
                    </p>

                    <p className="text-xs text-slate-600 italic">
                      {gap.impactNote}
                    </p>
                  </div>

                  <Link
                    href={`/challenges/${gap.challengeId}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:bg-blue-700 transition shadow-xs shrink-0 focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Open SQL Challenge Workspace →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SELF-DECLARED SKILLS SECTION (UNVERIFIED) */}
        {(activeTab === 'all' || activeTab === 'declared') && (
          <div className="space-y-4 pt-2">
            <div>
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Self-Declared Skills (Unverified Claims)</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Self-declared skills reflect student interest and self-reported experience. In accordance with ProofBridge integrity rules, they are <strong>never</strong> counted in employer reviewed coverage until verified by a qualified evaluator.
              </p>
            </div>

            <div className="bg-surface rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-xs">
              {selfDeclaredSkills.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{item.skillName}</h3>
                    <p className="text-xs text-text-secondary mt-0.5">Declared on {item.declaredDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium">Self-Claimed Level {item.declaredLevel}/4</span>
                    <StatusChip status="self-declared" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Slide-Over Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        evidence={selectedEvidence}
      />
    </AppShell>
  )
}

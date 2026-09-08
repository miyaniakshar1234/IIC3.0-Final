'use client'

import React, { useState } from 'react'
import { StudentNav } from '@/components/student/StudentNav'
import { StatusChip } from '@/components/student/StatusChip'
import { EvidenceDrawer, EvidenceDetail } from '@/components/student/EvidenceDrawer'
import { Award, CheckCircle2, HelpCircle, Clock, FileText, ChevronRight, ShieldCheck } from 'lucide-react'

export default function EvidencePassportPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'reviewed' | 'declared' | 'awaiting'>('all')
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceDetail | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Synthetic Evidence Dataset for Meera
  const reviewedAttainments: EvidenceDetail[] = [
    {
      skillName: 'Spreadsheets',
      reviewedLevel: 3,
      requiredLevel: 3,
      reviewerName: 'Dr. Sharma',
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
      reviewerName: 'Prof. Ananya',
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
      reviewerName: 'Dr. Sharma',
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

  const selfDeclaredSkills = [
    { skillName: 'Python Data Analysis', declaredLevel: 2, declaredDate: 'Aug 28, 2026' },
    { skillName: 'Git & Version Control', declaredLevel: 3, declaredDate: 'Aug 25, 2026' },
    { skillName: 'HTML & CSS', declaredLevel: 2, declaredDate: 'Aug 20, 2026' },
  ]

  const awaitingReviewSubmissions = [
    { 
      skillName: 'SQL (Structured Query Language)', 
      challengeTitle: 'Explain Monthly Sales from Messy Dataset', 
      submittedDate: 'Sep 08, 2026',
      status: 'awaiting-review' as const
    }
  ]

  const openEvidenceDetail = (evidence: EvidenceDetail) => {
    setSelectedEvidence(evidence)
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-canvas pb-16">
      <StudentNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              AUDITABLE SKILL PASSPORT
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary">Evidence Passport</h1>
            <p className="text-sm text-text-secondary mt-1">
              Your verified skill portfolio. Every reviewed attainment links directly to human reviewer notes and submitted work.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-surface p-3 rounded-xl border border-border">
            <div className="text-center px-3 border-r border-border">
              <div className="text-xl font-bold text-emerald-700">3</div>
              <div className="text-xs text-text-secondary font-medium">Reviewed Skills</div>
            </div>
            <div className="text-center px-3 border-r border-border">
              <div className="text-xl font-bold text-amber-600">1</div>
              <div className="text-xs text-text-secondary font-medium">Awaiting Review</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-bold text-blue-700">3</div>
              <div className="text-xs text-text-secondary font-medium">Self-Declared</div>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'all' ? 'bg-accent text-white' : 'text-text-secondary hover:bg-surface'
            }`}
          >
            All Skills ({reviewedAttainments.length + selfDeclaredSkills.length + awaitingReviewSubmissions.length})
          </button>

          <button
            onClick={() => setActiveTab('reviewed')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'reviewed' ? 'bg-emerald-700 text-white' : 'text-text-secondary hover:bg-surface'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Human Reviewed ({reviewedAttainments.length})
          </button>

          <button
            onClick={() => setActiveTab('awaiting')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'awaiting' ? 'bg-amber-600 text-white' : 'text-text-secondary hover:bg-surface'
            }`}
          >
            <Clock className="w-4 h-4" />
            Awaiting Review ({awaitingReviewSubmissions.length})
          </button>

          <button
            onClick={() => setActiveTab('declared')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'declared' ? 'bg-blue-700 text-white' : 'text-text-secondary hover:bg-surface'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Self-Declared ({selfDeclaredSkills.length})
          </button>
        </div>

        {/* Section 1: Human-Reviewed Skills (Green Badges & Clickable Drawers) */}
        {(activeTab === 'all' || activeTab === 'reviewed') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Verified & Reviewed Attainments
              </h2>
              <span className="text-xs text-text-secondary">Click any row to open the complete evidence audit drawer</span>
            </div>

            <div className="bg-surface rounded-xl border border-border divide-y divide-border overflow-hidden shadow-xs">
              {reviewedAttainments.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openEvidenceDetail(item)}
                  className="p-5 hover:bg-canvas transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition">
                        {item.skillName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Level {item.reviewedLevel} / 4
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary flex items-center gap-2">
                      <span>Demonstrated in: <strong>{item.challengeTitle}</strong></span>
                    </p>

                    <div className="pt-1">
                      <StatusChip
                        status="reviewed"
                        reviewerName={item.reviewerName}
                        reviewedDate={item.reviewedDate}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
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

        {/* Section 2: Evidence Awaiting Review (Amber Chips) */}
        {(activeTab === 'all' || activeTab === 'awaiting') && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              Submissions Awaiting Review
            </h2>

            <div className="bg-surface rounded-xl border border-border divide-y divide-border overflow-hidden shadow-xs">
              {awaitingReviewSubmissions.map((item, idx) => (
                <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/30">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-text-primary">{item.skillName}</h3>
                      <StatusChip status="awaiting-review" />
                    </div>
                    <p className="text-xs text-text-secondary">
                      Submitted: <strong>{item.submittedDate}</strong> for &quot;{item.challengeTitle}&quot;
                    </p>
                  </div>
                  <span className="text-xs text-amber-800 font-medium bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200">
                    Assigned to Human Reviewer Queue
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Self-Declared Skills (Neutral Chips) */}
        {(activeTab === 'all' || activeTab === 'declared') && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Self-Declared Claims (Unverified)
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Self-declared skills are tracked for interest but are NEVER averaged into employer role matching scores until verified.
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-border divide-y divide-border overflow-hidden shadow-xs">
              {selfDeclaredSkills.map((item, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{item.skillName}</h3>
                    <p className="text-xs text-text-secondary">Declared on {item.declaredDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Claimed Level {item.declaredLevel}/4</span>
                    <StatusChip status="self-declared" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Slide-over Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        evidence={selectedEvidence}
      />
    </div>
  )
}

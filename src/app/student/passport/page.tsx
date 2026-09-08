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
        <div className="glass-card border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
              {student.avatarInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white tracking-tight">{student.name}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 font-mono">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {student.program}
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5 font-mono">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                {student.institution}
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 p-1 bg-zinc-900/80 rounded-xl border border-white/10 font-mono">
            <Link
              href="/student"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/student/passport"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 text-white border border-white/15 shadow-sm transition"
            >
              Evidence Passport
            </Link>
            <Link
              href="/student/applications"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition"
            >
              My Applications
            </Link>
          </nav>
        </div>

        {/* 2. PASSPORT CRYPTOGRAPHIC HEADER & SUMMARY STATS */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950 border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  CRYPTOGRAPHIC EVIDENCE PASSPORT
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  ID: #PB-IND-2026-08812
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-zinc-100 tracking-tight">
                {student.name}&apos;s Skill Passport
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                {student.program} • {student.institution}. Every verified badge is grounded in qualified faculty rubric evaluation, direct student code artifacts, and tamper-proof SHA-256 commit hashes.
              </p>
            </div>

            {/* Quick Metrics Cockpit */}
            <div className="flex items-center gap-3 bg-zinc-950/80 p-3 rounded-2xl border border-white/10 shrink-0 self-start lg:self-center shadow-inner">
              <div className="px-4 py-1.5 text-center border-r border-white/10">
                <span className="text-2xl font-black text-emerald-400 block leading-tight font-mono">3</span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Reviewed</span>
              </div>
              <div className="px-4 py-1.5 text-center border-r border-white/10">
                <span className="text-2xl font-black text-amber-400 block leading-tight font-mono">1</span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Target Gap</span>
              </div>
              <div className="px-4 py-1.5 text-center">
                <span className="text-2xl font-black text-blue-400 block leading-tight font-mono">3</span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Declared</span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Notice */}
          <div className="p-4 bg-zinc-950/60 rounded-2xl border border-white/5 text-xs text-zinc-400 leading-relaxed flex items-start gap-3 relative z-10 font-mono">
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-200">Review Principle:</strong> &quot;Reviewed&quot; indicates that a named faculty evaluator assessed submitted code against anchored rubrics. Self-declared skills receive 0% weight until human verification completes.
            </span>
          </div>
        </div>

        {/* 3. TAB FILTERS */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition shrink-0 ${
              activeTab === 'all'
                ? 'bg-accent text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
            }`}
          >
            All Skills ({reviewedAttainments.length + requirementGaps.length + selfDeclaredSkills.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviewed')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'reviewed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Human Reviewed ({reviewedAttainments.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'gaps'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Requirement Gaps ({requirementGaps.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('declared')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'declared'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
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
                <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Verified Human-Reviewed Attainments</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Click any skill card to open the auditable evidence drawer and inspect reviewer rationale and rubric scores.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 hidden sm:inline">
                {reviewedAttainments.length} Active Records
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reviewedAttainments.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openEvidenceDetail(item)}
                  className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-accent/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
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
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-accent transition">
                        {item.skillName}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Reviewed Level {item.reviewedLevel} / 4
                      </span>
                      {item.requiredLevel !== undefined && (
                        <span className="text-xs font-mono text-zinc-400">
                          (Role Target: Level {item.requiredLevel})
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 flex flex-wrap items-center gap-2 font-mono">
                      <span>Challenge: <strong className="text-zinc-200">{item.challengeTitle}</strong></span>
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
                    <span className="text-xs font-mono font-semibold text-accent group-hover:underline flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent/10 border border-accent/30 group-hover:bg-accent group-hover:text-white transition-all">
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
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>Target Requirement Gaps (Not Yet Demonstrated)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Skills required by active target opportunities that have no verified human review on record.
              </p>
            </div>

            <div className="space-y-3">
              {requirementGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold text-zinc-100">{gap.skillName}</h3>
                      <StatusChip status="not-demonstrated" />
                      <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        Weight: {gap.weight}%
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300">
                      Required for: <strong className="text-zinc-100">{gap.targetRole}</strong> (Required: Level {gap.requiredLevel}/4)
                    </p>

                    <p className="text-xs text-zinc-400 italic">
                      {gap.impactNote}
                    </p>
                  </div>

                  <Link
                    href={`/challenges/${gap.challengeId}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0 focus-visible:ring-2 focus-visible:ring-accent"
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
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <span>Self-Declared Skills (Unverified Claims)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Self-declared skills reflect student interest and self-reported experience. In accordance with ProofBridge integrity rules, they are <strong>never</strong> counted in employer reviewed coverage until verified by a qualified evaluator.
              </p>
            </div>

            <div className="bg-zinc-900/60 rounded-2xl border border-white/10 divide-y divide-white/5 overflow-hidden shadow-lg">
              {selfDeclaredSkills.map((item, idx) => (
                <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">{item.skillName}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-mono">Declared on {item.declaredDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400 font-mono">Self-Claimed Level {item.declaredLevel}/4</span>
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

'use client'

import React, { useEffect, useRef } from 'react'
import {
  X,
  CheckCircle2,
  Calendar,
  ExternalLink,
  FileText,
  Award,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  HelpCircle
} from 'lucide-react'
import { StatusChip } from './StatusChip'

export interface RubricCriterionResult {
  criterionTitle: string
  scoreLevel: number // 0 - 4
  levelDescription?: string
  reviewerRationale?: string
}

export interface EvidenceDetail {
  skillName: string
  reviewedLevel: number // 0 - 4
  requiredLevel?: number
  reviewerName?: string
  reviewerTitle?: string
  reviewedDate?: string
  challengeTitle?: string
  contributionStatement?: string
  externalLinks?: string[]
  criteriaResults?: RubricCriterionResult[]
}

interface EvidenceDrawerProps {
  isOpen: boolean
  onClose: () => void
  evidence: EvidenceDetail | null
}

export function EvidenceDrawer({ isOpen, onClose, evidence }: EvidenceDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Keyboard accessibility (ESC to close) and body scroll locking
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on open for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen || !evidence) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity duration-200"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className="w-full max-w-xl md:max-w-2xl bg-surface h-full shadow-2xl border-l border-border flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-drawer-title"
        aria-describedby="evidence-drawer-description"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-start justify-between bg-canvas shrink-0">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                Auditable Evidence Record
              </span>
              <StatusChip status="reviewed" />
            </div>

            <h2
              id="evidence-drawer-title"
              className="text-2xl font-extrabold text-text-primary tracking-tight"
            >
              {evidence.skillName}
            </h2>

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-600" />
                Reviewed Level {evidence.reviewedLevel} / 4
              </span>
              {evidence.requiredLevel !== undefined && (
                <span className="text-xs text-text-secondary font-medium">
                  Role Target: Level {evidence.requiredLevel} / 4
                </span>
              )}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent hover:border-border transition focus:outline-none focus:ring-2 focus:ring-accent shrink-0"
            aria-label="Close evidence drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="p-5 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          <p id="evidence-drawer-description" className="sr-only">
            Inspect the evidence, rubric evaluation, and reviewer assessment for {evidence.skillName}.
          </p>

          {/* Audit Verification Pipeline Flow */}
          <div className="bg-canvas p-4 rounded-xl border border-border">
            <div className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-2.5 flex items-center justify-between">
              <span>Evidence Verification Flow</span>
              <span className="text-[10px] text-accent font-medium">Standardized Loop</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-surface border border-border">
                <FileText className="w-4 h-4 text-accent mx-auto mb-1" />
                <div className="font-bold text-text-primary text-[11px] leading-tight">
                  Student Evidence
                </div>
                <div className="text-[10px] text-text-secondary mt-0.5">Submitted Artifact</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface border border-border">
                <UserCheck className="w-4 h-4 text-accent mx-auto mb-1" />
                <div className="font-bold text-text-primary text-[11px] leading-tight">
                  Human Reviewer
                </div>
                <div className="text-[10px] text-text-secondary mt-0.5">Named Evaluator</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface border border-border">
                <Award className="w-4 h-4 text-accent mx-auto mb-1" />
                <div className="font-bold text-text-primary text-[11px] leading-tight">
                  Rubric Criteria
                </div>
                <div className="text-[10px] text-text-secondary mt-0.5">Anchored Levels</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="font-bold text-emerald-800 text-[11px] leading-tight">
                  Skill Level {evidence.reviewedLevel}/4
                </div>
                <div className="text-[10px] text-emerald-700 mt-0.5">Verified Attainment</div>
              </div>
            </div>
          </div>

          {/* Human Review Attribution */}
          <div className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-0.5">
                    Human Review Attribution
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-primary">
                    {evidence.reviewerName ? `Verified by ${evidence.reviewerName}` : 'Assigned Human Reviewer'}
                  </h3>
                  {evidence.reviewerTitle ? (
                    <p className="text-xs text-text-secondary mt-0.5">{evidence.reviewerTitle}</p>
                  ) : null}
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Reviewed
              </span>
            </div>

            <div className="pt-3 border-t border-border/70 flex flex-wrap items-center justify-between gap-2 text-xs text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Review Completed:{' '}
                <strong className="font-semibold text-text-primary">
                  {evidence.reviewedDate || 'Recorded on submission'}
                </strong>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-medium">
                Rubric-Assessed
              </span>
            </div>
          </div>

          {/* Demonstrated In Challenge */}
          {evidence.challengeTitle ? (
            <div className="p-4 rounded-xl border border-border bg-canvas">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase text-text-secondary tracking-wider">
                  Demonstrated In Challenge
                </span>
                <span className="text-[11px] text-text-secondary font-medium">Artifact Source</span>
              </div>
              <p className="text-sm font-semibold text-text-primary">{evidence.challengeTitle}</p>
            </div>
          ) : null}

          {/* Rubric Criteria Evaluation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-accent" />
                Rubric Criteria &amp; Reviewer Assessment
              </h3>
              <span className="text-xs text-text-secondary font-medium">
                {evidence.criteriaResults && evidence.criteriaResults.length > 0
                  ? `${evidence.criteriaResults.length} ${
                      evidence.criteriaResults.length === 1 ? 'criterion' : 'criteria'
                    } evaluated`
                  : '0 criteria'}
              </span>
            </div>

            {evidence.criteriaResults && evidence.criteriaResults.length > 0 ? (
              <div className="space-y-3">
                {evidence.criteriaResults.map((criterion, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-accent-soft text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-text-primary">
                          {criterion.criterionTitle}
                        </h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                        Level {criterion.scoreLevel} / 4
                      </span>
                    </div>

                    {criterion.levelDescription ? (
                      <div className="text-xs text-text-secondary bg-canvas p-2.5 rounded-lg border border-border/60">
                        <span className="font-semibold text-text-primary">Rubric Anchor: </span>
                        <span className="italic">&quot;{criterion.levelDescription}&quot;</span>
                      </div>
                    ) : null}

                    <div className="bg-canvas/80 p-3 rounded-lg border border-border text-xs">
                      <span className="font-semibold text-text-primary">Reviewer Rationale: </span>
                      {criterion.reviewerRationale ? (
                        <span className="text-text-secondary leading-relaxed">
                          {criterion.reviewerRationale}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">
                          No specific rationale recorded for this criterion.
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-border bg-canvas text-center text-xs text-text-secondary">
                No individual rubric criteria recorded for this review.
              </div>
            )}
          </div>

          {/* Student Contribution Statement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-accent" />
                Student&apos;s Contribution Statement
              </h3>
              <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                Self-Reported Scope
              </span>
            </div>
            <p className="text-xs text-text-secondary mb-2">
              The student&apos;s direct statement detailing independent contributions, tools utilized, and problem-solving methodology.
            </p>
            {evidence.contributionStatement ? (
              <div className="p-4 rounded-xl border border-border bg-blue-50/30 text-sm text-text-primary leading-relaxed whitespace-pre-line border-l-4 border-l-accent shadow-xs">
                {evidence.contributionStatement}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-border bg-canvas text-center text-xs text-text-secondary">
                No contribution statement provided.
              </div>
            )}
          </div>

          {/* External Evidence & Proof Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-accent" />
                External Evidence &amp; Artifacts
              </h3>
              <span className="text-xs text-text-secondary font-medium">
                {evidence.externalLinks && evidence.externalLinks.length > 0
                  ? `${evidence.externalLinks.length} verified ${
                      evidence.externalLinks.length === 1 ? 'link' : 'links'
                    }`
                  : '0 links'}
              </span>
            </div>

            {evidence.externalLinks && evidence.externalLinks.length > 0 ? (
              <div className="space-y-2">
                {evidence.externalLinks.map((link, idx) => {
                  const isGithub = link.includes('github.com')
                  const isGoogleDocs =
                    link.includes('docs.google.com') || link.includes('sheets.google.com')

                  return (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface hover:bg-canvas hover:border-accent/40 text-xs font-medium text-text-primary transition group shadow-xs focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-lg bg-accent-soft text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-accent font-semibold group-hover:underline truncate block">
                            {link}
                          </span>
                          <span className="text-[11px] text-text-secondary">
                            {isGithub
                              ? 'Source Repository (GitHub)'
                              : isGoogleDocs
                              ? 'Spreadsheet / Analytical Artifact'
                              : 'External Proof Reference'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-text-secondary bg-gray-100 px-2.5 py-1 rounded-md group-hover:bg-accent group-hover:text-white transition shrink-0">
                        Open ↗
                      </span>
                    </a>
                  )
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-border bg-canvas text-center text-xs text-text-secondary">
                No external proof links provided.
              </div>
            )}
          </div>

          {/* Audit Assurance Notice */}
          <div className="p-4 rounded-xl bg-canvas border border-border text-xs text-text-secondary space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-text-primary">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Human Review Assurance &amp; Scope</span>
            </div>
            <p className="leading-relaxed">
              ProofBridge records human reviewer evaluations against standardized rubric anchors.
              &quot;Reviewed&quot; confirms that a named, qualified evaluator assessed the submitted
              artifact against rubric criteria. It does not represent universal certification, an
              accredited credential, identity verification, or guaranteed employability.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border bg-canvas flex items-center justify-between shrink-0">
          <div className="text-xs text-text-secondary">
            Auditable Evidence Record • ProofBridge
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-text-primary bg-surface border border-border hover:bg-canvas rounded-lg shadow-xs transition focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { X, CheckCircle2, User, Calendar, ExternalLink, FileText, Award } from 'lucide-react'
import { StatusChip } from './StatusChip'

export interface RubricCriterionResult {
  criterionTitle: string
  scoreLevel: number // 0 - 4
  levelDescription: string
  reviewerRationale: string
}

export interface EvidenceDetail {
  skillName: string
  reviewedLevel: number // 0 - 4
  requiredLevel?: number
  reviewerName: string
  reviewerTitle: string
  reviewedDate: string
  challengeTitle: string
  contributionStatement: string
  externalLinks: string[]
  criteriaResults: RubricCriterionResult[]
}

interface EvidenceDrawerProps {
  isOpen: boolean
  onClose: () => void
  evidence: EvidenceDetail | null
}

export function EvidenceDrawer({ isOpen, onClose, evidence }: EvidenceDrawerProps) {
  if (!isOpen || !evidence) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div 
        className="w-full max-w-xl bg-surface h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-drawer-title"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-start justify-between bg-canvas">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Verified Skill Attainment
              </span>
              <StatusChip 
                status="reviewed" 
                reviewerName={evidence.reviewerName}
                reviewedDate={evidence.reviewedDate}
              />
            </div>
            <h2 id="evidence-drawer-title" className="text-2xl font-bold text-text-primary">
              {evidence.skillName} (Level {evidence.reviewedLevel}/4)
            </h2>
            <p className="text-xs text-text-secondary mt-1 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {evidence.reviewerName} ({evidence.reviewerTitle})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {evidence.reviewedDate}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Challenge Origin */}
          <div className="bg-accent-soft p-4 rounded-xl border border-blue-100">
            <h4 className="text-xs font-semibold uppercase text-accent tracking-wider mb-1">
              Demonstrated In Challenge
            </h4>
            <p className="text-base font-medium text-text-primary">{evidence.challengeTitle}</p>
          </div>

          {/* Rubric Criteria Evaluation */}
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" />
              Rubric Criteria & Reviewer Assessment
            </h3>
            <div className="space-y-3">
              {evidence.criteriaResults.map((criterion, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-text-primary">{criterion.criterionTitle}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                      Level {criterion.scoreLevel} / 4
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2 italic">
                    Anchor: &quot;{criterion.levelDescription}&quot;
                  </p>
                  <div className="bg-gray-50 p-2.5 rounded border border-gray-200 text-xs text-text-primary">
                    <span className="font-semibold text-gray-700">Reviewer Rationale: </span>
                    {criterion.reviewerRationale}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Contribution Statement */}
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent" />
              Student Contribution Statement
            </h3>
            <div className="p-4 rounded-lg border border-border bg-gray-50 text-sm text-text-primary leading-relaxed whitespace-pre-line">
              {evidence.contributionStatement}
            </div>
          </div>

          {/* External Reference Links */}
          {evidence.externalLinks.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-accent" />
                Verified Submissions & Links
              </h3>
              <div className="space-y-1.5">
                {evidence.externalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-white hover:bg-canvas text-xs font-medium text-accent truncate transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{link}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Notice Banner */}
          <div className="p-3 rounded-lg bg-gray-100 text-xs text-text-secondary border border-gray-200">
            <span className="font-semibold">Review Assurance:</span> This review assesses the submitted work artifact. ProofBridge maintains an immutable audit trace of human reviewer scores.
          </div>
        </div>
      </div>
    </div>
  )
}

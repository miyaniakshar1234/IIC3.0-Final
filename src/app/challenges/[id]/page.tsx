'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { StudentNav } from '@/components/student/StudentNav'
import { FinalizeSubmissionModal } from '@/components/student/FinalizeSubmissionModal'
import { 
  Clock, 
  Sparkles, 
  FileText, 
  Award, 
  Link as LinkIcon, 
  Save, 
  Lock, 
  CheckCircle2, 
  ArrowLeft,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react'

export default function ChallengeWorkspacePage({ params }: { params: { id: string } }) {
  const [submissionTitle, setSubmissionTitle] = useState('Monthly Sales Analysis and SQL Solution')
  const [submissionBody, setSubmissionBody] = useState(`-- SQL Solution for Monthly Sales Breakdown
WITH monthly_revenue AS (
    SELECT 
        DATE_TRUNC('month', transaction_date) AS sales_month,
        product_category,
        SUM(amount) AS total_sales,
        COUNT(DISTINCT customer_id) as unique_buyers
    FROM raw_sales_transactions
    WHERE transaction_status = 'COMPLETED'
      AND transaction_date IS NOT NULL
    GROUP BY 1, 2
)
SELECT 
    sales_month,
    product_category,
    total_sales,
    unique_buyers,
    LAG(total_sales) OVER (PARTITION BY product_category ORDER BY sales_month) as prev_month_sales,
    ROUND(((total_sales - LAG(total_sales) OVER (PARTITION BY product_category ORDER BY sales_month)) / 
           NULLIF(LAG(total_sales) OVER (PARTITION BY product_category ORDER BY sales_month), 0)) * 100, 2) as mom_growth_pct
FROM monthly_revenue
ORDER BY sales_month DESC, total_sales DESC;

-- Analysis Rationale:
-- 1. Handled dirty data by filtering NULL dates and unconfirmed statuses.
-- 2. Used window functions (LAG) to compute Month-over-Month growth accurately without self-joins.
-- 3. Utilized NULLIF to prevent divide-by-zero runtime exceptions.`)

  const [contributionStatement, setContributionStatement] = useState(
    'I wrote the SQL query using PostgreSQL syntax on my local machine. I cleaned 14 missing date fields by inspecting raw timestamps. I used ChatGPT to verify the window function syntax for LAG, but constructed all joins, aggregations, and NULLIF logic independently.'
  )

  const [externalLinks, setExternalLinks] = useState<string[]>([
    'https://github.com/meerasharma/sales-sql-challenge-solution',
    'https://gist.github.com/meerasharma/sales-query-proof'
  ])
  const [newLinkInput, setNewLinkInput] = useState('')

  const [lastSaved, setLastSaved] = useState<string | null>('Sep 08, 2026, 16:45')
  const [isSaving, setIsSaving] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFinalized, setIsFinalized] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Challenge Specification Data
  const challengeDetails = {
    id: params.id || 'chl-sql-001',
    title: 'Explain Monthly Sales from Messy Dataset',
    estimatedTime: '2 hours',
    targetSkill: 'SQL (Structured Query Language)',
    aiPolicy: 'Permitted for syntax checks & documentation reference. Must disclose exact usage in Contribution Statement.',
    deliverables: 'PostgreSQL queries + Month-over-Month calculation + brief explanation of data cleaning trade-offs.',
    deadline: 'Sep 15, 2026 (Open Challenge)',
    rubricCriteria: [
      {
        title: 'Aggregation & Filtering (Level 1-2)',
        description: 'Correctly filters completed orders, handles group by dimensions, and aggregates totals.',
      },
      {
        title: 'Edge Case Handling & Null Safety (Level 3)',
        description: 'Handles null dates, handles divide-by-zero cases using NULLIF/COALESCE, and validates integrity.',
      },
      {
        title: 'Window Functions & Trade-off Defense (Level 4)',
        description: 'Implements window functions for trend analysis and defends performance choices.',
      }
    ]
  }

  const handleSaveDraft = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      const now = new Date()
      setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 600)
  }

  const handleAddLink = () => {
    if (!newLinkInput.trim()) return
    if (!newLinkInput.startsWith('https://')) {
      alert('Link must start with https://')
      return
    }
    if (externalLinks.length >= 10) {
      alert('Maximum of 10 external HTTPS links allowed')
      return
    }
    setExternalLinks([...externalLinks, newLinkInput.trim()])
    setNewLinkInput('')
  }

  const handleRemoveLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, idx) => idx !== index))
  }

  const handleConfirmFinalize = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsModalOpen(false)
      setIsFinalized(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <StudentNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Back Link */}
        <Link href="/student" className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Finalized Banner */}
        {isFinalized && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-emerald-900 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              Submission Finalized & Locked!
            </div>
            <p className="text-sm text-emerald-800 leading-relaxed">
              Your submission has been locked and assigned to the human reviewer queue. Your reviewed coverage score for <strong>Junior Data Analyst Intern</strong> will update automatically as soon as the reviewer publishes their assessment.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link href="/student" className="px-4 py-2 bg-emerald-700 text-white rounded-lg font-semibold text-xs hover:bg-emerald-800 transition">
                Return to Dashboard
              </Link>
              <Link href="/student/passport" className="text-xs font-semibold text-emerald-800 hover:underline">
                Check Evidence Passport Status →
              </Link>
            </div>
          </div>
        )}

        {/* Header & Challenge Brief */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-soft px-3 py-1 rounded-md">
                Industry Challenge Task
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-2">
                {challengeDetails.title}
              </h1>
              <p className="text-xs text-text-secondary mt-1">
                Target Skill: <strong className="text-text-primary">{challengeDetails.targetSkill}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas text-xs font-semibold text-text-primary border border-border">
                <Clock className="w-4 h-4 text-accent" />
                Est. {challengeDetails.estimatedTime}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-canvas rounded-xl border border-border space-y-1.5">
              <span className="font-bold text-text-primary uppercase tracking-wider block">Deliverables Required:</span>
              <p className="text-text-secondary leading-relaxed">{challengeDetails.deliverables}</p>
            </div>
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1.5">
              <span className="font-bold text-accent uppercase tracking-wider block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Usage Policy:
              </span>
              <p className="text-text-primary leading-relaxed">{challengeDetails.aiPolicy}</p>
            </div>
          </div>

          {/* Anchored Rubric Accordion */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              Anchored Review Rubric (Human Evaluated)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {challengeDetails.rubricCriteria.map((crit, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-white border border-border space-y-1">
                  <div className="text-xs font-bold text-text-primary">{crit.title}</div>
                  <p className="text-xs text-text-secondary leading-relaxed">{crit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Form Section */}
        <fieldset disabled={isFinalized} className="space-y-6 group-disabled:opacity-60">
          
          {/* Editor Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Submission Workspace</h2>
              <p className="text-xs text-text-secondary">P0 submissions require text body, contribution statement, and optional external links.</p>
            </div>

            <div className="flex items-center gap-3">
              {lastSaved && (
                <span className="text-xs text-text-secondary">
                  Last saved: {lastSaved}
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving || isFinalized}
                className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-semibold text-text-primary hover:bg-canvas transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-text-secondary" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={isFinalized}
                className="px-5 py-2 rounded-xl bg-accent text-white font-bold text-xs hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                Finalize Submission
              </button>
            </div>
          </div>

          {/* Submission Title Input */}
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-text-primary">
              Submission Title *
            </label>
            <input
              type="text"
              value={submissionTitle}
              onChange={(e) => setSubmissionTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-canvas text-sm font-medium focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="Give your submission a clear title"
            />
          </div>

          {/* Solution Text / Markdown Code Editor */}
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                Solution Code, Queries & Technical Explanation *
              </label>
              <span className="text-xs text-text-secondary">Supports Markdown & Code Snippets</span>
            </div>

            <textarea
              rows={12}
              value={submissionBody}
              onChange={(e) => setSubmissionBody(e.target.value)}
              className="w-full p-4 rounded-lg border border-border bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="Paste your queries, code, or written breakdown here..."
            />
          </div>

          {/* Contribution Statement (Mandatory) */}
          <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Contribution Statement * (Mandatory)
              </label>
              <span className="text-xs text-text-secondary">What did you do? What help or AI did you use?</span>
            </div>

            <textarea
              rows={4}
              value={contributionStatement}
              onChange={(e) => setContributionStatement(e.target.value)}
              className="w-full p-3.5 rounded-lg border border-border bg-canvas text-xs text-text-primary leading-relaxed focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="Describe your exact work, tools used, and any external help..."
            />
            <p className="text-xs text-text-secondary">
              Reviewers use this statement to evaluate authentic understanding during human scoring.
            </p>
          </div>

          {/* External Verified Links (HTTPS Only) */}
          <div className="bg-surface p-5 rounded-xl border border-border space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-accent" />
                Verified External HTTPS Reference Links (Max 10)
              </label>
              <p className="text-xs text-text-secondary mt-0.5">
                Add GitHub repository links, live demos, or documentation URLs verifying your work.
              </p>
            </div>

            {/* Link List */}
            <div className="space-y-2">
              {externalLinks.map((link, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-border text-xs">
                  <a href={link} target="_blank" rel="noreferrer" className="text-accent hover:underline font-mono truncate max-w-xl">
                    {link}
                  </a>
                  {!isFinalized && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(idx)}
                      className="p-1 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Link Input */}
            {!isFinalized && externalLinks.length < 10 && (
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="url"
                  value={newLinkInput}
                  onChange={(e) => setNewLinkInput(e.target.value)}
                  placeholder="https://github.com/your-username/repo-name"
                  className="flex-1 px-3 py-2 rounded-lg border border-border text-xs focus:ring-2 focus:ring-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="px-3 py-2 rounded-lg bg-canvas hover:bg-gray-200 text-xs font-semibold text-text-primary border border-border flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Link
                </button>
              </div>
            )}
          </div>

        </fieldset>

      </main>

      {/* Confirmation Modal */}
      <FinalizeSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmFinalize}
        isSubmitting={isSubmitting}
        challengeTitle={challengeDetails.title}
      />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/ui/AppShell'
import { 
  Clock, 
  Sparkles, 
  FileText, 
  Award, 
  Link as LinkIcon, 
  Save, 
  ArrowLeft,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Info,
  Terminal,
  X
} from 'lucide-react'

export default function ChallengeWorkspacePage({ params }: { params: { id: string } }) {
  // Candidate Context (Meera Patel)
  const student = {
    name: 'Meera Patel',
    program: 'MCA 2026',
    institution: 'Demo College of Computing',
    currentCoverage: 61,
    potentialCoverage: 96,
  }

  // Target Opportunity Context
  const targetOpportunity = {
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    location: 'Jaipur / Hybrid',
    compensation: '₹25,000/month',
  }

  // Challenge Specification Data
  const challengeDetails = {
    id: params.id || '50000000-0000-0000-0000-000000000001',
    title: 'Explain Monthly Sales from Messy Dataset',
    skill: 'SQL (Structured Query Language)',
    requiredLevel: 'Level 3 of 4',
    weight: 35,
    estimatedTime: '~120 minutes (2 hours)',
    difficulty: 'Intermediate',
    status: 'Draft / In Progress',
    problemStatement: {
      overview: 'You are provided with a raw, uncurated sales transactions table (raw_sales_transactions) containing messy enterprise data. Your task is to write clean, maintainable SQL queries that filter invalid records, aggregate monthly revenue by product category, and compute month-over-month (MoM) growth metrics.',
      dataIssues: [
        'Missing / NULL transaction dates requiring explicit filtration or timestamp reconstruction.',
        'Uncertain transaction statuses (e.g., PENDING, FAILED, COMPLETED) where only COMPLETED transactions must be counted in recognized revenue.',
        'Inconsistent casing, duplicate records, and potential divide-by-zero risks when calculating growth percentages for zero-revenue baseline periods.',
      ],
      deliverables: [
        'Clean PostgreSQL query aggregating monthly revenue and unique customer counts.',
        'Window function (LAG) implementation calculating month-over-month growth with divide-by-zero protection (NULLIF).',
        'Written justification of data cleaning trade-offs and performance considerations.',
      ],
    },
    rubricCriteria: [
      {
        title: 'Data Cleaning & Null Handling (Level 2)',
        description: 'Excludes unconfirmed statuses, filters NULL timestamps, and avoids data corruption.',
      },
      {
        title: 'Aggregation & Integrity (Level 3)',
        description: 'Accurately groups by month and category with correct arithmetic and divide-by-zero prevention.',
      },
      {
        title: 'Analytical Depth & MoM Trade-offs (Level 4)',
        description: 'Uses window functions efficiently and defends performance and architectural decisions.',
      },
    ],
  }

  // Workspace Form State (Local Draft)
  const [submissionTitle, setSubmissionTitle] = useState('Monthly Sales Analysis and SQL Solution')

  // Starter SQL clearly labeled as Starter Example (NOT completed work)
  const [sqlCode, setSqlCode] = useState(
`-- ============================================================================
-- STARTER EXAMPLE ONLY — NOT SUBMITTED
-- Instructions: Write your PostgreSQL solution below.
-- Handle NULL dates, filter for COMPLETED transactions, and calculate MoM growth.
-- ============================================================================

WITH monthly_summary AS (
    SELECT 
        DATE_TRUNC('month', transaction_date) AS sales_month,
        product_category,
        SUM(amount) AS total_revenue,
        COUNT(DISTINCT customer_id) AS active_buyers
    FROM raw_sales_transactions
    WHERE transaction_status = 'COMPLETED'
      AND transaction_date IS NOT NULL
    GROUP BY 1, 2
)
SELECT 
    sales_month,
    product_category,
    total_revenue,
    active_buyers
    -- TODO: Add LAG window function for Month-over-Month growth
FROM monthly_summary
ORDER BY sales_month DESC;`
  )

  const [contributionStatement, setContributionStatement] = useState(
    'I developed the query structure using PostgreSQL syntax. I identified missing transaction dates and implemented explicit filters for completed orders. I referenced documentation for date truncation syntax, but developed all aggregations and window logic independently.'
  )

  // AI & Tooling Disclosure Options
  type AiDisclosure = 'no-ai' | 'ai-syntax' | 'custom-tool'
  const [aiDisclosure, setAiDisclosure] = useState<AiDisclosure>('ai-syntax')

  // External HTTPS Proof Links
  const [externalLinks, setExternalLinks] = useState<string[]>([
    'https://github.com/meerasharma/sales-analysis-sql'
  ])
  const [newLinkInput, setNewLinkInput] = useState('')
  const [linkError, setLinkError] = useState<string | null>(null)

  // Draft Save & API Notice Modal State
  const [lastSaved, setLastSaved] = useState<string | null>('Sep 08, 2026, 18:20 (Local Draft)')
  const [isSaving, setIsSaving] = useState(false)
  const [showApiNoticeModal, setShowApiNoticeModal] = useState(false)

  const handleSaveDraft = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      const now = new Date()
      setLastSaved(`Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Local Draft)`)
    }, 400)
  }

  const handleAddLink = () => {
    setLinkError(null)
    const trimmed = newLinkInput.trim()
    if (!trimmed) return

    if (!trimmed.startsWith('https://')) {
      setLinkError('External links must use secure HTTPS (https://...) protocol.')
      return
    }

    if (externalLinks.includes(trimmed)) {
      setLinkError('This link has already been added.')
      return
    }

    if (externalLinks.length >= 10) {
      setLinkError('Maximum of 10 external proof links allowed.')
      return
    }

    setExternalLinks([...externalLinks, trimmed])
    setNewLinkInput('')
  }

  const handleRemoveLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, idx) => idx !== index))
  }

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Top Breadcrumb / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/student"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Student Dashboard
          </Link>

          <span className="text-xs font-medium text-text-secondary">
            Candidate: <strong className="text-text-primary">{student.name}</strong> ({student.program})
          </span>
        </div>

        {/* 1. CHALLENGE HEADER CARD */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-soft text-accent border border-blue-200">
                  Target Skill: {challengeDetails.skill}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {challengeDetails.status}
                </span>
                <span className="text-xs text-text-secondary">
                  Target Level: <strong>{challengeDetails.requiredLevel}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                {challengeDetails.title}
              </h1>

              <p className="text-xs text-text-secondary">
                Linked Role: <strong className="text-text-primary">{targetOpportunity.title}</strong> at {targetOpportunity.employer} ({targetOpportunity.location})
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="bg-canvas px-3.5 py-2 rounded-xl border border-border text-left">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Requirement Weight</span>
                <span className="text-base font-extrabold text-accent">35 Points (35%)</span>
              </div>
              <div className="bg-canvas px-3.5 py-2 rounded-xl border border-border text-left">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Estimated Effort</span>
                <span className="text-base font-extrabold text-text-primary flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {challengeDetails.estimatedTime}
                </span>
              </div>
            </div>
          </div>

          {/* Contextual Coverage Leap Explanation (Evidence-Based Rule) */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">
                  Deterministic Skill Mapping &amp; Coverage Context:
                </span>
                <p className="leading-relaxed">
                  Your current reviewed coverage is <strong>61%</strong>. If an assigned human evaluator assesses this SQL submission at <strong>Level 3</strong> or above against the anchored rubric, your reviewed coverage will rise to <strong>96%</strong>.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-blue-800 bg-white px-2.5 py-1 rounded-md border border-blue-200 shrink-0 self-start sm:self-center">
              Requires Human Review
            </span>
          </div>
        </div>

        {/* 2. PROBLEM & REQUIREMENTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              Problem Brief &amp; Analytical Objectives
            </h2>

            <p className="text-sm text-text-secondary leading-relaxed">
              {challengeDetails.problemStatement.overview}
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Identified Data Quality Challenges:
              </h3>
              <ul className="space-y-2 text-xs text-text-secondary list-disc list-inside">
                {challengeDetails.problemStatement.dataIssues.map((issue, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-text-primary">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Expected Deliverables:
              </h3>
              <ul className="space-y-2 text-xs text-text-secondary list-disc list-inside">
                {challengeDetails.problemStatement.deliverables.map((deliv, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-text-primary">{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Anchored Rubric Criteria */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Evaluation Rubric
            </h2>
            <p className="text-xs text-text-secondary">
              Reviewers evaluate your submission against these standardized anchors:
            </p>

            <div className="space-y-3 pt-1">
              {challengeDetails.rubricCriteria.map((crit, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-canvas border border-border space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-primary">{crit.title}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{crit.description}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-text-secondary leading-relaxed">
              <strong>Provenance Guarantee:</strong> No AI can automatically grant skill levels. A verified human faculty or industry mentor scores each criterion.
            </div>
          </div>
        </div>

        {/* 3. SQL WORKSPACE / SOLUTION EDITOR */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold text-text-primary">SQL Solution Workspace</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  Starter Example
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Draft your PostgreSQL query. Starter queries below are provided as examples and do not constitute a completed solution.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center text-xs">
              <span className="text-text-secondary hidden md:inline">
                {lastSaved}
              </span>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-3.5 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-text-primary font-semibold transition flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Save className="w-3.5 h-3.5 text-text-secondary" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
            </div>
          </div>

          {/* Submission Title Input */}
          <div className="space-y-1.5">
            <label htmlFor="submission-title" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
              Submission Title
            </label>
            <input
              id="submission-title"
              type="text"
              value={submissionTitle}
              onChange={(e) => setSubmissionTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g. Monthly Sales Analysis and SQL Solution"
            />
          </div>

          {/* SQL Code Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="sql-code-editor" className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                PostgreSQL Query &amp; Data Logic
              </label>
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Example Only — Edit to Implement Full Solution
              </span>
            </div>

            <textarea
              id="sql-code-editor"
              rows={14}
              value={sqlCode}
              onChange={(e) => setSqlCode(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent shadow-inner selection:bg-blue-600 selection:text-white"
              spellCheck={false}
            />
          </div>
        </div>

        {/* 4. CONTRIBUTION STATEMENT */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="contribution-statement" className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent" />
              <span>Student&apos;s Contribution Statement</span>
            </label>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Mandatory Evidence Item
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            Explain what you completed independently, what assistance or tools you used, and how you validated the accuracy of your results. Human reviewers inspect this statement alongside your code.
          </p>

          <textarea
            id="contribution-statement"
            rows={4}
            value={contributionStatement}
            onChange={(e) => setContributionStatement(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-canvas text-xs text-text-primary leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Describe your independent problem-solving methodology and any tools consulted..."
          />
        </div>

        {/* 5. AI & TOOLING DISCLOSURE */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI &amp; Tooling Disclosure</span>
            </h2>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              Transparent Evidence Policy
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            ProofBridge embraces transparent tool usage. Disclose how AI or external tools were utilized during this challenge. Reviewers respect honest disclosure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              aiDisclosure === 'no-ai'
                ? 'bg-blue-50/70 border-accent text-accent font-semibold shadow-xs'
                : 'bg-canvas border-border text-text-secondary hover:bg-slate-50'
            }`}>
              <input
                type="radio"
                name="ai-disclosure"
                value="no-ai"
                checked={aiDisclosure === 'no-ai'}
                onChange={() => setAiDisclosure('no-ai')}
                className="mt-0.5 text-accent focus:ring-accent"
              />
              <div className="text-xs">
                <span className="font-bold text-text-primary block">No AI Used</span>
                <span className="text-[11px] text-text-secondary">Completed entirely without AI code generation.</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              aiDisclosure === 'ai-syntax'
                ? 'bg-blue-50/70 border-accent text-accent font-semibold shadow-xs'
                : 'bg-canvas border-border text-text-secondary hover:bg-slate-50'
            }`}>
              <input
                type="radio"
                name="ai-disclosure"
                value="ai-syntax"
                checked={aiDisclosure === 'ai-syntax'}
                onChange={() => setAiDisclosure('ai-syntax')}
                className="mt-0.5 text-accent focus:ring-accent"
              />
              <div className="text-xs">
                <span className="font-bold text-text-primary block">AI for Syntax Verification</span>
                <span className="text-[11px] text-text-secondary">Used for query debugging, syntax checks, or documentation.</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              aiDisclosure === 'custom-tool'
                ? 'bg-blue-50/70 border-accent text-accent font-semibold shadow-xs'
                : 'bg-canvas border-border text-text-secondary hover:bg-slate-50'
            }`}>
              <input
                type="radio"
                name="ai-disclosure"
                value="custom-tool"
                checked={aiDisclosure === 'custom-tool'}
                onChange={() => setAiDisclosure('custom-tool')}
                className="mt-0.5 text-accent focus:ring-accent"
              />
              <div className="text-xs">
                <span className="font-bold text-text-primary block">Custom Script / Tool Assistance</span>
                <span className="text-[11px] text-text-secondary">Utilized local python scripts, linters, or db management tools.</span>
              </div>
            </label>
          </div>
        </div>

        {/* 6. EXTERNAL PROOF LINKS */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-accent" />
              <span>External Proof &amp; Artifact Links (HTTPS Only)</span>
            </h2>
            <span className="text-xs text-text-secondary font-medium">
              {externalLinks.length} of 10 links added
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            Provide verifiable external links supporting your submission (e.g. GitHub repository, SQL fiddle, or execution logs). All links must use secure HTTPS protocol.
          </p>

          {/* Link List */}
          <div className="space-y-2">
            {externalLinks.length > 0 ? (
              externalLinks.map((link, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-canvas border border-border text-xs gap-3">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-mono truncate max-w-xl flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{link}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 transition shrink-0 rounded focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={`Remove link ${link}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-border bg-canvas text-center text-xs text-text-secondary">
                No external proof links provided.
              </div>
            )}
          </div>

          {/* Add Link Form */}
          {externalLinks.length < 10 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={newLinkInput}
                  onChange={(e) => {
                    setNewLinkInput(e.target.value)
                    setLinkError(null)
                  }}
                  placeholder="https://github.com/username/repository"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-canvas text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Add external HTTPS link"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="px-4 py-2 rounded-xl bg-surface hover:bg-slate-100 text-xs font-semibold text-text-primary border border-border flex items-center gap-1.5 transition shadow-xs focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Link
                </button>
              </div>
              {linkError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {linkError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 7. FINALIZATION CTA & BACKEND LIMITATION EXPLANATION */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-text-primary">
                Finalize &amp; Submit Challenge
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Lock your revision and submit for rubric evaluation by an assigned evaluator.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowApiNoticeModal(true)}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 self-start sm:self-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              Finalize Submission →
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-text-secondary leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>Draft State Notice:</strong> Your current work is maintained as a local client-side draft. In accordance with ProofBridge architecture, finalizing will trigger an immutable revision lock and submit the artifact to the backend review queue once API endpoints are active.
            </span>
          </div>
        </div>

      </div>

      {/* HONEST BACKEND INTEGRATION STATUS MODAL */}
      {showApiNoticeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-border p-6 animate-in zoom-in-95 duration-150 space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="api-modal-title"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Layers className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setShowApiNoticeModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h4 id="api-modal-title" className="text-base font-bold text-text-primary">
                Backend Submission API Integration Pending
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                The challenge submission endpoint (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px]">POST /api/v1/submissions/[id]/finalize</code>) is currently being implemented by the Backend Lead.
              </p>
            </div>

            <div className="bg-canvas p-3.5 rounded-xl border border-border text-xs text-text-secondary space-y-1.5">
              <span className="font-semibold text-text-primary block">Architectural Status:</span>
              <ul className="space-y-1 list-disc list-inside text-[11px]">
                <li>Local workspace inputs remain intact in this browser session.</li>
                <li>No fake submission records or mock reviewer scores have been created.</li>
                <li>Full end-to-end locking will be enabled once backend endpoints are connected.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowApiNoticeModal(false)}
                className="px-4 py-2 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-blue-700 transition"
              >
                Return to Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}

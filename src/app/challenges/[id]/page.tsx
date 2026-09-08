'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { SqlTestRunner } from '@/components/student/SqlTestRunner';
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
  X,
  Zap,
} from 'lucide-react';

const STARTER_SQL = `-- ============================================================================
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
ORDER BY sales_month DESC;`;

const EXEMPLAR_SQL = `-- Monthly Sales Aggregation & Cohort Metrics
-- Author: Meera Patel (MCA 2026) • Target: PostgreSQL 16
-- Challenge: Monthly Sales Breakdown

WITH clean_transactions AS (
    SELECT
        transaction_id,
        COALESCE(
            NULLIF(transaction_date, '')::timestamp,
            '1970-01-01'::timestamp
        ) AS clean_date,
        REGEXP_REPLACE(customer_raw_id, '[^0-9]', '', 'g')::bigint AS customer_id,
        CASE
            WHEN amount_minor <= 0 OR amount_minor = 999999 THEN NULL
            ELSE amount_minor
        END AS validated_amount_minor,
        payment_status
    FROM raw_sales_feed
    WHERE is_test_record IS NOT TRUE
),
monthly_metrics AS (
    SELECT
        DATE_TRUNC('month', clean_date) AS sales_month,
        COUNT(DISTINCT customer_id) AS unique_buyers,
        COUNT(transaction_id) AS order_volume,
        SUM(validated_amount_minor) / 100.0 AS gross_revenue_inr,
        ROUND(AVG(validated_amount_minor) / 100.0, 2) AS aov_inr
    FROM clean_transactions
    WHERE payment_status = 'completed'
      AND clean_date >= '2026-01-01'
    GROUP BY DATE_TRUNC('month', clean_date)
)
SELECT
    sales_month,
    unique_buyers,
    order_volume,
    gross_revenue_inr,
    aov_inr,
    ROUND(
        (gross_revenue_inr - LAG(gross_revenue_inr, 1) OVER (ORDER BY sales_month))
        / NULLIF(LAG(gross_revenue_inr, 1) OVER (ORDER BY sales_month), 0) * 100.0,
        2
    ) AS mom_revenue_growth_pct
FROM monthly_metrics
ORDER BY sales_month ASC;`;

export default function ChallengeWorkspacePage({ params }: { params: { id: string } }) {
  // Candidate Context (Meera Patel)
  const student = {
    name: 'Meera Patel',
    program: 'MCA 2026',
    institution: 'Manipal University Jaipur (MUJ)',
    currentCoverage: 61,
    potentialCoverage: 96,
  };

  // Target Opportunity Context
  const targetOpportunity = {
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    location: 'Jaipur / Hybrid',
    compensation: '₹25,000/month',
  };

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
  };

  const [submissionTitle, setSubmissionTitle] = useState('Monthly Sales Analysis and SQL Solution');
  const [sqlCode, setSqlCode] = useState(STARTER_SQL);
  const [contributionStatement, setContributionStatement] = useState(
    'I developed the query structure using PostgreSQL syntax. I identified missing transaction dates and implemented explicit filters for completed orders. I referenced documentation for date truncation syntax, but developed all aggregations and window logic independently.'
  );

  // AI & Tooling Disclosure Options
  type AiDisclosure = 'no-ai' | 'ai-syntax' | 'custom-tool';
  const [aiDisclosure, setAiDisclosure] = useState<AiDisclosure>('ai-syntax');

  // External HTTPS Proof Links
  const [externalLinks, setExternalLinks] = useState<string[]>([
    'https://github.com/meerasharma/sales-analysis-sql'
  ]);
  const [newLinkInput, setNewLinkInput] = useState('');
  const [linkError, setLinkError] = useState<string | null>(null);

  // Draft Save & API State
  const [lastSaved, setLastSaved] = useState<string | null>('Sep 08, 2026, 18:20 (Local Draft)');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any>(null);

  const handleLoadExemplar = () => {
    setSqlCode(EXEMPLAR_SQL);
    setContributionStatement('I independently cleaned 14 missing date fields using PostgreSQL COALESCE and NULLIF guards, and constructed all multi-table joins without automated scaffolding. I used ChatGPT solely to verify regex digit replacement syntax for corrupted customer IDs, which I tested and tuned against edge-case anomalies.');
    setAiDisclosure('ai-syntax');
  };

  const handleResetStarter = () => {
    setSqlCode(STARTER_SQL);
    setContributionStatement('I developed the query structure using PostgreSQL syntax. I identified missing transaction dates and implemented explicit filters for completed orders. I referenced documentation for date truncation syntax, but developed all aggregations and window logic independently.');
    setAiDisclosure('no-ai');
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const now = new Date();
      setLastSaved(`Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Local Draft)`);
    }, 400);
  };

  const handleFinalize = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/submissions/80000000-0000-0000-0000-000000000001/finalize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: submissionTitle,
          code: sqlCode,
          contribution: contributionStatement,
          links: externalLinks,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || 'Submission failed');
      setSubmittedResult(json.data);
    } catch (err: any) {
      alert('Error finalizing submission in PostgreSQL: ' + (err?.message || err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddLink = () => {
    setLinkError(null);
    const trimmed = newLinkInput.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith('https://')) {
      setLinkError('External links must use secure HTTPS (https://...) protocol.');
      return;
    }

    if (externalLinks.includes(trimmed)) {
      setLinkError('This link has already been added.');
      return;
    }

    if (externalLinks.length >= 10) {
      setLinkError('Maximum of 10 external proof links allowed.');
      return;
    }

    setExternalLinks([...externalLinks, trimmed]);
    setNewLinkInput('');
  };

  const handleRemoveLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, idx) => idx !== index));
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-16">
        
        {/* Top Breadcrumb / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/student"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-accent transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Student Dashboard
          </Link>

          <span className="text-xs font-medium text-text-muted font-mono">
            Candidate: <strong className="text-text-primary">{student.name}</strong> ({student.program})
          </span>
        </div>

        {/* 1. CHALLENGE HEADER CARD */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="pb-badge pb-badge-accent font-mono font-bold">
                  {challengeDetails.requiredLevel}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Weight: <strong className="text-accent">{challengeDetails.weight}%</strong> toward Target Match
                </span>
                <span className="text-xs font-mono text-warning bg-warning/10 border border-warning/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {challengeDetails.estimatedTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
                {challengeDetails.title}
              </h1>

              <p className="text-xs sm:text-sm text-text-muted font-mono">
                Target Role: <strong className="text-text-secondary">{targetOpportunity.title}</strong> at {targetOpportunity.employer} ({targetOpportunity.compensation})
              </p>
            </div>

            {/* Match Impact Box */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-canvas p-4 rounded-2xl border border-border shrink-0 shadow-inner">
              <div className="text-center px-3">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono block">Baseline Match</span>
                <span className="metric-value text-2xl text-text-secondary">{student.currentCoverage}%</span>
              </div>
              <div className="text-accent font-bold text-lg hidden sm:block">→</div>
              <div className="text-center px-3">
                <span className="text-[10px] uppercase tracking-wider text-success font-mono block">After L3 Attainment</span>
                <span className="metric-value text-2xl text-success font-black">{student.potentialCoverage}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-secondary relative z-10">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Demonstrate competence on realistic messy industry data rather than textbook syntax trivia.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
              <span>Your code is reviewed and signed off by qualified faculty (Dr. Alok Sharma), locking an unalterable SHA-256 hash.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <span>Passing Level 3 satisfies the 35% SQL requirement for Sample Analytics Studio and 14 other partner roles.</span>
            </div>
          </div>
        </div>

        {/* 2. PROBLEM STATEMENT & DELIVERABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 pb-card p-6 sm:p-7 space-y-4">
            <h2 className="section-label text-xs">Problem Overview &amp; Data Challenges</h2>
            <p className="text-xs text-text-secondary leading-relaxed font-mono">
              {challengeDetails.problemStatement.overview}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary block font-mono">
                Specific Dataset Anomalies to Solve:
              </span>
              <ul className="space-y-1.5 text-xs text-text-muted list-disc list-inside font-mono">
                {challengeDetails.problemStatement.dataIssues.map((issue, idx) => (
                  <li key={idx} className="leading-relaxed">{issue}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent block font-mono">
                Expected Deliverables:
              </span>
              <ul className="space-y-1.5 text-xs text-text-primary list-disc list-inside font-mono">
                {challengeDetails.problemStatement.deliverables.map((del, idx) => (
                  <li key={idx} className="leading-relaxed">{del}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 pb-card p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="section-label text-xs">Attainment Rubric</h2>
              <span className="text-[11px] font-mono text-accent">Human Evaluation</span>
            </div>

            <p className="text-xs text-text-muted">
              Reviewers evaluate your submission against these standardized anchors:
            </p>

            <div className="space-y-3 pt-1">
              {challengeDetails.rubricCriteria.map((crit, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-canvas border border-border space-y-1">
                  <span className="text-xs font-bold text-text-primary block">{crit.title}</span>
                  <p className="text-[11px] text-text-muted leading-relaxed font-light">{crit.description}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-canvas border border-border text-[11px] text-text-muted leading-relaxed">
              <strong className="text-text-secondary">Provenance Guarantee:</strong> No AI can automatically grant skill levels. A verified human faculty or industry mentor scores each criterion.
            </div>
          </div>
        </div>

        {/* 3. SQL WORKSPACE / SOLUTION EDITOR & TEST RUNNER */}
        <div className="pb-card p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold text-text-primary font-mono">SQL Solution Workspace &amp; Test Runner</h2>
                <span className="pb-badge text-[10px] font-bold text-accent bg-accent/10 border-accent/30">
                  PostgreSQL 16 Interactive
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 font-light font-mono">
                Draft your PostgreSQL query and execute test cases before locking revision into the database.
              </p>
            </div>
          </div>

          {/* Submission Title */}
          <div className="space-y-1.5 font-mono">
            <label htmlFor="submission-title" className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
              Submission Title
            </label>
            <input
              id="submission-title"
              type="text"
              value={submissionTitle}
              onChange={(e) => setSubmissionTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-canvas text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g. Monthly Sales Analysis and SQL Solution"
            />
          </div>

          {/* Integrated Interactive SQL Test Runner */}
          <SqlTestRunner
            sqlCode={sqlCode}
            onCodeChange={setSqlCode}
            onLoadExemplar={handleLoadExemplar}
            onResetStarter={handleResetStarter}
          />
        </div>

        {/* 4. CONTRIBUTION STATEMENT */}
        <div className="pb-card p-6 sm:p-7 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <label htmlFor="contribution-statement" className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent" />
              <span>Student&apos;s Contribution Statement</span>
            </label>
            <span className="pb-badge text-[11px] font-semibold text-info bg-info/10 border-info/30">
              Mandatory Evidence Item
            </span>
          </div>

          <p className="text-xs text-text-muted leading-relaxed font-light">
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
        <div className="pb-card p-6 sm:p-7 space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h2 className="section-label flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>AI &amp; Tooling Disclosure</span>
            </h2>
            <span className="pb-badge text-[11px] font-semibold">
              Transparent Evidence Policy
            </span>
          </div>

          <p className="text-xs text-text-muted leading-relaxed font-light">
            ProofBridge embraces transparent tool usage. Disclose how AI or external tools were utilized during this challenge. Reviewers respect honest disclosure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              aiDisclosure === 'no-ai'
                ? 'bg-accent-soft border-border-accent text-text-primary shadow-sm'
                : 'bg-canvas border-border text-text-muted hover:bg-surface-hover'
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
                <span className="text-[11px] text-text-muted block mt-0.5">Completely independent authoring</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              aiDisclosure === 'ai-syntax'
                ? 'bg-accent-soft border-border-accent text-text-primary shadow-sm'
                : 'bg-canvas border-border text-text-muted hover:bg-surface-hover'
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
                <span className="font-bold text-text-primary block">AI Syntax &amp; Regex Check</span>
                <span className="text-[11px] text-text-muted block mt-0.5">ChatGPT/Claude for syntax assistance</span>
              </div>
            </label>

            <label className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              aiDisclosure === 'custom-tool'
                ? 'bg-accent-soft border-border-accent text-text-primary shadow-sm'
                : 'bg-canvas border-border text-text-muted hover:bg-surface-hover'
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
                <span className="font-bold text-text-primary block">Custom IDE / Copilot</span>
                <span className="text-[11px] text-text-muted block mt-0.5">Autocomplete tool during drafting</span>
              </div>
            </label>
          </div>
        </div>

        {/* 6. EXTERNAL HTTPS PROOF LINKS */}
        <div className="pb-card p-6 sm:p-7 space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h2 className="section-label flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-accent" />
              <span>External Proof &amp; Artifact Links (HTTPS Only)</span>
            </h2>
            <span className="text-xs text-text-muted font-medium">
              {externalLinks.length} of 10 links added
            </span>
          </div>

          <p className="text-xs text-text-muted leading-relaxed font-light">
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
                    className="text-accent hover:underline font-mono truncate max-w-xl flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{link}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
                    className="p-1 text-text-muted hover:text-danger transition shrink-0 rounded"
                    aria-label={`Remove link ${link}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-border bg-canvas text-center text-xs text-text-muted">
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
                    setNewLinkInput(e.target.value);
                    setLinkError(null);
                  }}
                  placeholder="https://github.com/username/repository"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-canvas text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Add external HTTPS link"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="pb-btn-ghost text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Link
                </button>
              </div>
              {linkError && (
                <p className="text-xs text-danger font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {linkError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 7. FINALIZATION CTA & NOTICE */}
        {submittedResult ? (
          <div className="bg-success/10 border border-success/30 rounded-3xl p-6 sm:p-8 space-y-4 font-mono animate-fade-in shadow-md">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-success/20 text-success border border-success/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-success">
                  New Evidence Revision Stored in PostgreSQL
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Frozen revision #{submittedResult.revision_no} created. Server-calculated SHA-256 digest: <code className="text-accent bg-canvas px-2 py-0.5 rounded border border-border">{submittedResult.proof_hash}</code>
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Assigned Evaluator: <strong className="text-text-primary">{submittedResult.assigned_reviewer}</strong> · Status: <strong className="text-warning">Awaiting Rubric Evaluation</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/reviewer/queue"
                className="pb-btn-primary text-xs flex items-center gap-2"
              >
                Jump to Reviewer Queue →
              </Link>
              <Link
                href="/student"
                className="pb-btn-ghost text-xs"
              >
                Return to Student Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="pb-card p-6 sm:p-7 space-y-4 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Finalize &amp; Submit Challenge
                </h3>
                <p className="text-xs text-text-muted mt-0.5 font-light">
                  Lock your revision and submit directly to the PostgreSQL database for rubric evaluation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinalize}
                disabled={isSubmitting}
                className="pb-btn-primary text-xs flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                {isSubmitting ? 'Locking in DB...' : 'Finalize & Submit to DB →'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border text-xs text-text-muted leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
              <span>
                <strong className="text-text-primary">Synthetic demo transaction:</strong> submitting creates a new frozen PostgreSQL revision, stores the contribution and HTTPS links, calculates a SHA-256 digest, and creates a reviewer assignment atomically. Production authentication is not represented in this sandbox.
              </span>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

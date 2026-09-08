'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge } from '@/components/employer/StatusBadge';
import {
  RubricCriterionCard,
  RubricCriterion,
} from '@/components/reviewer/RubricCriterionCard';
import {
  EvidenceViewer,
  SubmissionEvidence,
} from '@/components/reviewer/EvidenceViewer';
import {
  ClipboardCheck,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  Send,
  X,
  Clock,
  Sparkles
} from 'lucide-react';

const DEMO_EVIDENCE: SubmissionEvidence = {
  id: '50000000-0000-0000-0000-000000000001',
  revision_number: 1,
  submitted_at: '2026-09-08T14:30:00Z',
  student_display_name: 'Meera Patel',
  student_program: 'MCA 2026 • Demo College of Computing',
  challenge_title: 'Explain monthly sales from a messy dataset',
  challenge_brief:
    'Write reproducible SQL queries to ingest raw sales transactions, clean inconsistent timestamp formats and corrupted customer IDs, handle null revenue values, and produce a monthly sales aggregate report with month-over-month growth.',
  ai_policy:
    'Generative AI assistance is permitted for syntax reference and regex drafting, provided all tool usage is explicitly disclosed in the student contribution statement. Logic, queries, and conclusions must be your own original work.',
  title: 'Cleaned Monthly Sales Pipeline & Cohort Aggregates',
  contribution:
    'I wrote all the SQL queries independently using PostgreSQL 16 syntax. I used Claude 3.5 Sonnet to help construct the initial regex pattern to extract cleaned digits from inconsistent phone and ID fields, which I then manually tested and adapted. If I had more time, I would add partition pruning and composite indexes on (transaction_date, customer_id) for datasets exceeding 10M rows.',
  body: `-- Monthly Sales Aggregation with Data Cleaning & Quality Checks
-- Author: Meera Patel (MCA 2026)
-- Target Database: PostgreSQL 16

WITH raw_cleaned AS (
    SELECT
        transaction_id,
        -- Normalize timestamps across multiple legacy formats
        COALESCE(
            NULLIF(transaction_date, '')::timestamp,
            '1970-01-01'::timestamp
        ) AS clean_date,
        -- Extract clean numeric customer ID, handling corrupted strings
        REGEXP_REPLACE(customer_raw_id, '[^0-9]', '', 'g')::bigint AS customer_id,
        -- Treat negative or sentinel values (-999) as NULL
        CASE
            WHEN amount_minor <= 0 OR amount_minor = 999999 THEN NULL
            ELSE amount_minor
        END AS validated_amount_minor,
        payment_status
    FROM raw_transactions
    WHERE is_test_record IS NOT TRUE
),
monthly_metrics AS (
    SELECT
        DATE_TRUNC('month', clean_date) AS sales_month,
        COUNT(DISTINCT customer_id) AS active_customers,
        COUNT(transaction_id) AS total_orders,
        SUM(validated_amount_minor) / 100.0 AS total_revenue_inr,
        -- Handle null division safely
        ROUND(
            AVG(validated_amount_minor) / 100.0,
            2
        ) AS avg_order_value_inr
    FROM raw_cleaned
    WHERE payment_status = 'completed'
      AND clean_date >= '2026-01-01'
    GROUP BY DATE_TRUNC('month', clean_date)
)
SELECT
    sales_month,
    active_customers,
    total_orders,
    total_revenue_inr,
    avg_order_value_inr,
    -- Compute Month-over-Month Revenue Growth Percentage
    ROUND(
        (total_revenue_inr - LAG(total_revenue_inr, 1) OVER (ORDER BY sales_month))
        / NULLIF(LAG(total_revenue_inr, 1) OVER (ORDER BY sales_month), 0) * 100.0,
        2
    ) AS mom_growth_pct
FROM monthly_metrics
ORDER BY sales_month ASC;`,
  links: [
    {
      label: 'GitHub Repository: SQL Analysis & Reproducibility Script',
      url: 'https://github.com/demo-college/meera-sales-analysis',
    },
    {
      label: 'DbDiagram ERD Schema Documentation',
      url: 'https://dbdiagram.io/d/demo-sales-pipeline',
    },
  ],
};

const DEMO_CRITERIA: RubricCriterion[] = [
  {
    id: 'crit-001',
    skill_id: '10000000-0000-0000-0000-000000000001',
    skill_name: 'SQL Querying & Data Cleaning',
    required_level: 3,
    weight: 35,
    title: 'Query Logic, Filtering & Multi-Table Aggregation',
    description:
      'Evaluates ability to correctly join tables, filter out test transactions, handle NULL and sentinel values, and compute window-based growth metrics.',
    anchors: {
      0: 'Query fails to parse or produces mathematically invalid aggregates.',
      1: 'Retrieves raw table rows with basic SELECT/WHERE; lacks window functions.',
      2: 'Aggregates monthly data accurately but fails on sentinel values or zero division.',
      3: 'Correctly implements CTEs, window functions (LAG), COALESCE, and explains trade-offs.',
      4: 'Demonstrates optimal query plan awareness, indexing strategy, and partition handling.',
    },
  },
  {
    id: 'crit-002',
    skill_id: '10000000-0000-0000-0000-000000000004',
    skill_name: 'Analytical Reasoning & Trade-offs',
    required_level: 3,
    weight: 24,
    title: 'Data Integrity & Edge-Case Justification',
    description:
      'Evaluates whether the student identified data corruption causes and explicitly justified data-cleaning decisions in their contribution statement.',
    anchors: {
      0: 'No explanation provided for data assumptions or null handling.',
      1: 'Describes queries literally without addressing corrupted records.',
      2: 'Identifies corrupted customer IDs but applies naive drop/ignore logic.',
      3: 'Identifies data quality boundary cases and validates results against assumptions.',
      4: 'Provides rigorous sensitivity analysis comparing imputation vs deletion.',
    },
  },
];

export default function ReviewerWorkspacePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Review State
  const [evidence] = useState<SubmissionEvidence>(DEMO_EVIDENCE);
  const [criteria] = useState<RubricCriterion[]>(DEMO_CRITERIA);
  const [scores, setScores] = useState<Record<string, { level: number | null; rationale: string }>>({
    'crit-001': {
      level: 3,
      rationale:
        'Excellent use of CTEs and window LAG for month-over-month growth. Handled null division with NULLIF and validated sentinel values properly.',
    },
    'crit-002': {
      level: 3,
      rationale:
        'Thorough contribution statement explaining regex extraction for customer IDs and transparently detailing the indexing trade-offs for scaling.',
    },
  });

  const [activeTab, setActiveTab] = useState<'both' | 'evidence' | 'rubric'>('both');
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>('17:15:00');
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [changesReason, setChangesReason] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Concurrency tracking version
  const [expectedVersion] = useState(1);

  const handleScoreChange = (criterionId: string, level: number) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: {
        ...prev[criterionId],
        level,
      },
    }));
  };

  const handleRationaleChange = (criterionId: string, rationale: string) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: {
        ...prev[criterionId],
        rationale,
      },
    }));
  };

  const isFormComplete = criteria.every((crit) => {
    const s = scores[crit.id];
    return s && s.level !== null && s.rationale.trim().length > 0;
  });

  const completedCount = criteria.filter((crit) => {
    const s = scores[crit.id];
    return s && s.level !== null && s.rationale.trim().length > 0;
  }).length;

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    // Simulate draft save call: PUT /api/v1/review-assignments/[id]/draft
    setTimeout(() => {
      setIsSavingDraft(false);
      const timeStr = new Date().toLocaleTimeString();
      setLastSaved(timeStr);
    }, 600);
  };

  const handlePublishClick = () => {
    if (!isFormComplete) {
      setShowValidationErrors(true);
      return;
    }
    setShowPublishModal(true);
  };

  const confirmPublishReview = async () => {
    setIsPublishing(true);
    try {
      // In full API integration, this calls POST /api/v1/review-assignments/[id]/publish
      // with payload: { scores: [...], expected_version: expectedVersion }
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsPublishing(false);
      setShowPublishModal(false);
      setPublishSuccess(true);
    } catch (err) {
      setIsPublishing(false);
      alert('Error publishing review. Please try again.');
    }
  };

  const handleRequestChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changesReason.trim()) return;

    // Simulate POST /api/v1/review-assignments/[id]/request-changes
    alert(`Revision changes requested: "${changesReason.trim()}". Submission status updated.`);
    setShowChangesModal(false);
    router.push('/reviewer/queue');
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-24">
        {/* Top Workspace Header */}
        <div className="bg-surface rounded-xl border border-border p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/reviewer/queue"
              className="p-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
              aria-label="Back to queue"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Reviewer Workspace
                </span>
                <span className="text-xs text-text-secondary">•</span>
                <StatusBadge status="awaiting_review" size="sm" />
              </div>
              <h1 className="text-xl font-bold text-text-primary mt-0.5">
                Evaluation: {evidence.student_display_name} ({evidence.student_program})
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle for Tablet/Mobile */}
            <div className="lg:hidden flex bg-canvas rounded-lg p-1 border border-border text-xs">
              <button
                onClick={() => setActiveTab('evidence')}
                className={`px-3 py-1 rounded font-medium ${
                  activeTab === 'evidence' ? 'bg-surface shadow text-accent' : 'text-text-secondary'
                }`}
              >
                Evidence
              </button>
              <button
                onClick={() => setActiveTab('rubric')}
                className={`px-3 py-1 rounded font-medium ${
                  activeTab === 'rubric' ? 'bg-surface shadow text-accent' : 'text-text-secondary'
                }`}
              >
                Rubric ({completedCount}/{criteria.length})
              </button>
            </div>

            {lastSaved && (
              <span className="text-[11px] text-text-secondary hidden sm:inline-block font-mono">
                Draft saved {lastSaved}
              </span>
            )}
          </div>
        </div>

        {/* Success Modal / Banner */}
        {publishSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-success">
                  Review Successfully Published!
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>Atomic Transaction Complete:</strong> SQL evidence has been formally attributed to student <strong>Meera Patel</strong> at <strong>Level 3</strong>.
                  Tamper-proof skill attainments have been written to the ledger, instantly updating her opportunity match coverage from <strong>61% to 96%</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Link
                href="/reviewer/queue"
                className="px-4 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors"
              >
                Return to Reviewer Queue
              </Link>
              <Link
                href="/employer/opportunities"
                className="px-4 py-2 rounded-md bg-surface border border-border text-text-primary text-xs font-semibold hover:bg-gray-50 transition-colors"
              >
                View as Recruiter (Candidate Screening)
              </Link>
            </div>
          </div>
        )}

        {/* Split-Screen Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Pane: Student Evidence */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === 'rubric' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Student Submitted Artifact & Statement
              </h2>
              <span className="text-[11px] text-text-secondary">
                Revision 1 (Frozen)
              </span>
            </div>

            <EvidenceViewer evidence={evidence} />
          </div>

          {/* Right Pane: Rubric Evaluation */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              activeTab === 'evidence' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Criteria Evaluation Progress */}
            <div className="bg-surface rounded-xl border border-border p-4 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-text-primary block">
                  Evaluation Progress
                </span>
                <span className="text-xs text-text-secondary">
                  {completedCount} of {criteria.length} criteria scored & justified
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-28 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-accent transition-all duration-300"
                    style={{
                      width: `${(completedCount / criteria.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-text-primary font-mono">
                  {Math.round((completedCount / criteria.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Criteria Cards */}
            <div className="space-y-4">
              {criteria.map((criterion) => {
                const currentScore = scores[criterion.id] || { level: null, rationale: '' };
                return (
                  <RubricCriterionCard
                    key={criterion.id}
                    criterion={criterion}
                    selectedLevel={currentScore.level}
                    rationale={currentScore.rationale}
                    onLevelChange={(level) => handleScoreChange(criterion.id, level)}
                    onRationaleChange={(rat) => handleRationaleChange(criterion.id, rat)}
                    showValidationErrors={showValidationErrors}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 bg-surface border-t border-border p-4 shadow-lg z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Academic Integrity:</strong> Publishing creates permanent verifiable attainments under your name.
              </span>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-center">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="px-3.5 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-md border border-border transition-colors flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingDraft ? 'Saving...' : 'Save Draft'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowChangesModal(true)}
                className="px-3.5 py-2 text-xs font-semibold text-warning hover:bg-amber-50 rounded-md border border-amber-200 transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Changes</span>
              </button>

              <button
                type="button"
                onClick={handlePublishClick}
                disabled={publishSuccess}
                className="px-5 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-md shadow-sm transition-all flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Evaluation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Publish Confirmation */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowPublishModal(false)} />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-surface rounded-xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-border pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <h3 className="text-base font-bold text-text-primary">
                      Confirm Atomic Review Publication
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
                  <p>
                    You are about to publish your formal assessment for <strong>{evidence.student_display_name}</strong> on <strong>{evidence.challenge_title}</strong>:
                  </p>

                  <div className="bg-canvas border border-border rounded-lg p-3 space-y-2">
                    {criteria.map((crit) => (
                      <div key={crit.id} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-text-primary">{crit.skill_name}:</span>
                        <span className="font-bold text-success bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Level {scores[crit.id]?.level} of 4
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-text-primary">
                    <strong className="text-accent block mb-0.5">What happens next?</strong>
                    This action is permanent and creates immutable <code className="font-mono text-accent">skill_attainments</code>. Linked employers will immediately see updated skill coverage scores.
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-md border border-border"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPublishReview}
                    disabled={isPublishing}
                    className="px-5 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-hover rounded-md shadow-sm transition-all"
                  >
                    {isPublishing ? 'Publishing & Attributing...' : 'Confirm & Publish Review'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Request Changes */}
        {showChangesModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowChangesModal(false)} />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-surface rounded-xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-4">
                <div className="flex items-start justify-between border-b border-border pb-3">
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-warning" />
                    <h3 className="text-base font-bold text-text-primary">
                      Request Submission Changes
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowChangesModal(false)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleRequestChanges} className="space-y-4">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Requesting changes moves this submission to <code className="text-warning font-semibold">changes_requested</code>.
                    No skill attainments will be granted. The student will be prompted to submit a new revision.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">
                      Guidance for Revision <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={changesReason}
                      onChange={(e) => setChangesReason(e.target.value)}
                      placeholder="Explain specifically what needs improvement (e.g., 'Please add month-over-month growth calculation and address negative values in amount_minor')..."
                      className="w-full text-xs text-text-primary rounded-md border border-border p-3 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowChangesModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-md border border-border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!changesReason.trim()}
                      className="px-5 py-2 text-xs font-semibold text-white bg-warning hover:bg-amber-800 rounded-md shadow-sm transition-all"
                    >
                      Send Revision Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

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
      <div className="space-y-6 pb-28 max-w-7xl mx-auto">
        {/* Top Workspace Header */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <Link
              href="/reviewer/queue"
              className="p-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Back to queue"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Reviewer Workspace
                </span>
                <span className="text-xs text-zinc-600 font-mono">•</span>
                <StatusBadge status="awaiting_review" size="sm" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Evaluation: {evidence.student_display_name} <span className="text-zinc-400 font-normal text-sm font-mono">({evidence.student_program})</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle for Tablet/Mobile */}
            <div className="lg:hidden flex bg-zinc-950 rounded-xl p-1 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('evidence')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'evidence' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400'
                }`}
              >
                Evidence
              </button>
              <button
                onClick={() => setActiveTab('rubric')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'rubric' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400'
                }`}
              >
                Rubric ({completedCount}/{criteria.length})
              </button>
            </div>

            {lastSaved && (
              <span className="text-[11px] text-zinc-400 hidden sm:inline-block font-mono bg-zinc-950 px-3 py-1 rounded-full border border-white/10">
                Draft saved {lastSaved}
              </span>
            )}
          </div>
        </div>

        {/* Success Modal / Banner */}
        {publishSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-start space-x-3.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-300">
                  Review Successfully Published & Attributed!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                  <strong className="text-white">Atomic Transaction Complete:</strong> SQL evidence has been formally attributed to student <strong className="text-white">Meera Patel</strong> at <strong className="text-emerald-400">Level 3</strong>.
                  Tamper-proof skill attainments have been written to the ledger, instantly updating her opportunity match coverage from <strong className="text-amber-400">61% to 96%</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/reviewer/queue"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all font-mono uppercase tracking-wider"
              >
                Return to Reviewer Queue
              </Link>
              <Link
                href="/employer/opportunities/40000000-0000-0000-0000-000000000001/applicants"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs font-bold hover:bg-zinc-800 transition-all font-mono"
              >
                View in Recruiter Screening Table
              </Link>
            </div>
          </div>
        )}

        {/* Split-Screen Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Pane: Student Evidence */}
          <div
            className={`lg:col-span-6 space-y-4 ${
              activeTab === 'rubric' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Student Submitted Artifact & Statement
              </h2>
              <span className="text-[11px] text-blue-400 font-mono bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                Revision 1 (Frozen)
              </span>
            </div>

            <EvidenceViewer evidence={evidence} />
          </div>

          {/* Right Pane: Rubric Evaluation */}
          <div
            className={`lg:col-span-6 space-y-4 ${
              activeTab === 'evidence' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Criteria Evaluation Progress */}
            <div className="glass-card rounded-2xl border border-white/10 p-5 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block uppercase tracking-wider font-mono">
                  Evaluation Progress
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {completedCount} of {criteria.length} criteria scored & justified
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-28 bg-zinc-800 rounded-full h-2.5 overflow-hidden border border-white/10 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-300"
                    style={{
                      width: `${(completedCount / criteria.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-blue-400 font-mono">
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
        <div className="fixed bottom-0 inset-x-0 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 p-4 shadow-2xl z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4">
            <div className="flex items-center space-x-2 text-xs text-zinc-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">Academic Integrity:</strong> Publishing creates immutable verified attainments signed by Dr. Alok Sharma.
              </span>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-center font-mono">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl border border-white/10 transition-colors flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingDraft ? 'Saving...' : 'Save Draft'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowChangesModal(true)}
                className="px-4 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl border border-amber-500/30 transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Changes</span>
              </button>

              <button
                type="button"
                onClick={handlePublishClick}
                disabled={publishSuccess}
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 flex items-center space-x-2 uppercase tracking-wider"
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
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPublishModal(false)} />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5">
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">
                      Confirm Atomic Review Publication
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-mono">
                  <p>
                    You are about to publish your formal assessment for <strong className="text-white">{evidence.student_display_name}</strong> on <strong className="text-white">{evidence.challenge_title}</strong>:
                  </p>

                  <div className="bg-zinc-900/90 border border-white/10 rounded-xl p-4 space-y-2.5">
                    {criteria.map((crit) => (
                      <div key={crit.id} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-zinc-300">{crit.skill_name}:</span>
                        <span className="font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          Level {scores[crit.id]?.level} of 4
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-zinc-200">
                    <strong className="text-blue-400 block mb-1 font-bold">What happens next?</strong>
                    This action is permanent and creates immutable <code className="text-blue-300 font-mono">skill_attainments</code>. Linked employers will immediately see updated skill coverage scores leaping from 61% to 96%.
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10 font-mono">
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPublishReview}
                    disabled={isPublishing}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
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
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowChangesModal(false)} />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">
                      Request Submission Changes
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowChangesModal(false)}
                    className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleRequestChanges} className="space-y-4">
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    Requesting changes moves this submission to <code className="text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">changes_requested</code>.
                    No skill attainments will be granted. The student will be prompted to submit a new revision.
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                      Guidance for Revision <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={changesReason}
                      onChange={(e) => setChangesReason(e.target.value)}
                      placeholder="Explain specifically what needs improvement (e.g., 'Please add month-over-month growth calculation and address negative values in amount_minor')..."
                      className="w-full text-xs text-white rounded-xl border border-white/10 bg-zinc-900/90 p-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-600 font-mono"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10 font-mono">
                    <button
                      type="button"
                      onClick={() => setShowChangesModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl border border-white/10"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!changesReason.trim()}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl shadow-lg shadow-amber-500/25 transition-all uppercase tracking-wider"
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/ui/AppShell';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  Bot,
  User,
  FileCode2,
  Send,
  X,
  Building,
  GraduationCap,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';

interface RubricLevel {
  level: number;
  badge: string;
  title: string;
  description: string;
}

const RUBRIC_LEVELS: RubricLevel[] = [
  {
    level: 1,
    badge: 'Level 1 (Novice)',
    title: 'Basic SELECT & Simple Filters',
    description: 'Basic SELECT queries, contains potential syntax flaws or missing WHERE boundary filters.',
  },
  {
    level: 2,
    badge: 'Level 2 (Developing)',
    title: 'Working Joins & Routine Aggregates',
    description: 'Working multi-table queries without window functions, partition logic, or advanced aggregations.',
  },
  {
    level: 3,
    badge: 'Level 3 (Proficient)',
    title: 'Window Functions & Defensive Null Handling',
    description: 'Proper window functions (LAG), clean NULLIF division guards, verified totals, and explained trade-offs.',
  },
  {
    level: 4,
    badge: 'Level 4 (Advanced)',
    title: 'Query Plan Optimization & Indexing Strategy',
    description: 'Complex execution plans, partition strategies, sub-second latency, and rigorous scale justification.',
  },
];

const SAMPLE_POSTGRES_SQL = `-- Monthly Sales Aggregation & Cohort Metrics
-- Author: Meera Patel (MCA 2026) • Target: PostgreSQL 16
-- Challenge: Monthly Sales Breakdown

WITH clean_transactions AS (
    SELECT
        transaction_id,
        -- Standardize corrupted timestamp formats & coalesce missing dates
        COALESCE(
            NULLIF(transaction_date, '')::timestamp,
            '1970-01-01'::timestamp
        ) AS clean_date,
        -- Sanitize numeric customer IDs from raw strings
        REGEXP_REPLACE(customer_raw_id, '[^0-9]', '', 'g')::bigint AS customer_id,
        -- Sentinel value exclusion (-999 or negative refund anomalies)
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
    -- Defensive Window Calculation for Month-over-Month Growth
    ROUND(
        (gross_revenue_inr - LAG(gross_revenue_inr, 1) OVER (ORDER BY sales_month))
        / NULLIF(LAG(gross_revenue_inr, 1) OVER (ORDER BY sales_month), 0) * 100.0,
        2
    ) AS mom_revenue_growth_pct
FROM monthly_metrics
ORDER BY sales_month ASC;`;

export default function SideBySideEvaluationPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Selected Rubric Level (default to Level 3)
  const [selectedLevel, setSelectedLevel] = useState<number>(3);

  // Faculty Reviewer qualitative note
  const [comments, setComments] = useState<string>(
    'Excellent implementation of window functions and NULLIF division guard. Solid design decisions explained in contribution statement.'
  );

  // State Management
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePublishAttainment = async () => {
    setIsPublishing(true);
    try {
      await fetch('/api/v1/reviews/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: '80000000-0000-0000-0000-000000000001',
          assignment_id: '82000000-0000-0000-0000-000000000001',
          reviewer_id: '00000000-0000-0000-0000-000000000010',
          overall_level: selectedLevel,
          rubric_scores: [
            {
              criterion_id: '60000000-0000-0000-0000-000000000001',
              score: selectedLevel,
              rationale: comments,
            },
          ],
          qualitative_notes: comments,
        }),
      });
    } catch (err) {
      console.error('Failed to publish review to live API:', err);
    } finally {
      setIsPublishing(false);
      setIsPublishModalOpen(false);
      setIsSuccess(true);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-16">
        {/* Top Header Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <Link
              href="/reviewer/queue"
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              aria-label="Back to queue"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Faculty Evaluation Workspace
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Dr. Alok Sharma Reviewing</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary mt-0.5">
                Evaluation: Meera Patel • Challenge: Monthly Sales Breakdown
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>SLA: Due in 22h</span>
            </span>
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-emerald-900">
                  Skill Attainment Level {selectedLevel} Published!
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong>Atomic Transaction Complete:</strong> SQL Proficiency <strong>Level {selectedLevel}</strong> has been officially attributed to <strong>Meera Patel</strong> under Dr. Alok Sharma's faculty signature.
                  Her candidate match score for <strong>Junior Data Analyst Intern</strong> has leaped from <strong>61% to 96%</strong>!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/reviewer/queue"
                className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-xs"
              >
                ← Return to Reviewer Queue
              </Link>
              <Link
                href="/employer/candidates/70000000-0000-0000-0000-000000000001"
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-text-primary text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Inspect Recruiter Candidate Snapshot (96% Match) →
              </Link>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============================================================= */}
          {/* LEFT COLUMN: Student Artifact Viewer                         */}
          {/* ============================================================= */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-accent" />
                <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Student Submitted Artifact
                </h2>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Revision 1 (Frozen Snapshot)
              </span>
            </div>

            {/* Submission Info Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-text-primary">
                    Meera Patel • Challenge: Monthly Sales Breakdown
                  </h3>
                  <p className="text-xs text-text-secondary">
                    MCA 2026 • Demo College of Computing
                  </p>
                </div>

                {/* AI Disclosure Tag */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-warning border border-amber-200 text-xs font-semibold">
                  <Bot className="w-3.5 h-3.5 text-amber-600" />
                  <span>ChatGPT used for syntax verification only</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center space-x-4 text-xs text-slate-500">
                <span>Task: <strong>PostgreSQL 16 Cleaning & Window Aggregation</strong></span>
                <span>•</span>
                <span>Submitted: <strong>2 hours ago</strong></span>
              </div>
            </div>

            {/* Contribution Statement Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Student Contribution Statement</span>
              </div>
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs text-text-primary leading-relaxed">
                "I independently cleaned 14 missing date fields using PostgreSQL COALESCE and NULLIF guards, and constructed all multi-table joins without automated scaffolding. I used ChatGPT solely to verify regex digit replacement syntax for corrupted customer IDs, which I tested and tuned against edge-case anomalies."
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Confirmed under Demo College of Computing academic integrity pledge.
              </p>
            </div>

            {/* Code Box: Dark IDE Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  PostgreSQL Query Solution
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  sales_aggregate.sql
                </span>
              </div>

              <div className="bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl p-5 border border-slate-800 shadow-inner overflow-x-auto leading-relaxed">
                <pre className="whitespace-pre-wrap">{SAMPLE_POSTGRES_SQL}</pre>
              </div>
            </div>
          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: Anchored 4-Level Rubric & Evaluator Action      */}
          {/* ============================================================= */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Evaluation & Attainment Rubric
                </h2>
              </div>
              <span className="text-xs font-semibold text-accent bg-accent-soft px-2.5 py-0.5 rounded-full border border-blue-200">
                Weight: 35%
              </span>
            </div>

            {/* Rubric Container Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  SQL Optimization & Business Aggregation (coverage-v1)
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Select the proficiency level demonstrated in the code artifact. ProofBridge requires explicit qualitative justification for every published attainment.
                </p>
              </div>

              {/* 4 Selectable Level Cards */}
              <div className="space-y-3">
                {RUBRIC_LEVELS.map((rubric) => {
                  const isSelected = selectedLevel === rubric.level;

                  return (
                    <div
                      key={rubric.level}
                      onClick={() => setSelectedLevel(rubric.level)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-400 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {rubric.badge}
                            </span>
                            <span className="font-bold text-xs text-text-primary">
                              {rubric.title}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed pt-0.5">
                            {rubric.description}
                          </p>
                        </div>

                        <div className="shrink-0 pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reviewer Comments */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label
                  htmlFor="faculty-comments"
                  className="block text-xs font-bold text-text-primary uppercase tracking-wider"
                >
                  Faculty Evaluation Rationale (Signed by Dr. Alok Sharma)
                </label>
                <textarea
                  id="faculty-comments"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Provide qualitative feedback justifying the awarded proficiency level..."
                  className="w-full text-xs text-text-primary rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 leading-relaxed font-sans"
                />
                <p className="text-[11px] text-slate-400">
                  * This rationale will be permanently embedded in Meera's verified Evidence Snapshot for recruiters.
                </p>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => alert('Draft evaluation comments saved.')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  disabled={isSuccess}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-sm hover:shadow flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Attainment (Level {selectedLevel})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setIsPublishModalOpen(false)}
            />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-text-primary">
                      Confirm Attainment Publication
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsPublishModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                  <p>
                    You are signing off on an official skill attainment for <strong>Meera Patel</strong>:
                  </p>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-500">Skill Criterion:</span>
                      <span className="font-bold text-slate-800">SQL Optimization & Business Aggregation</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-500">Attained Level:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Level {selectedLevel} (Proficient)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-500">Evaluator:</span>
                      <span className="font-semibold text-slate-800">Dr. Alok Sharma</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900">
                    <strong className="block mb-0.5 font-bold">What happens upon confirmation?</strong>
                    A tamper-proof credential record is created. Meera's match score for the <strong>Junior Data Analyst Intern</strong> role will atomically jump from <strong>61% to 96%</strong>.
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishAttainment}
                    disabled={isPublishing}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
                  >
                    {isPublishing ? 'Signing Attainment...' : 'Confirm & Publish Attainment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

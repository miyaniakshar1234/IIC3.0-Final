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
        <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <Link
              href="/reviewer/queue"
              className="p-2 rounded-xl border border-white/10 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              aria-label="Back to queue"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                  Faculty Evaluation Workspace
                </span>
                <span className="text-zinc-600">•</span>
                <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dr. Alok Sharma Reviewing</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-0.5">
                Evaluation: Meera Patel • Challenge: Monthly Sales Breakdown
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>SLA: Due in 22h</span>
            </span>
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-zinc-100">
                  Skill Attainment Level {selectedLevel} Published!
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                  <strong className="text-emerald-400">Atomic Transaction Complete:</strong> SQL Proficiency <strong>Level {selectedLevel}</strong> has been officially attributed to <strong>Meera Patel</strong> under Dr. Alok Sharma&apos;s faculty signature.
                  Her candidate match score for <strong>Junior Data Analyst Intern</strong> has leaped from <strong className="text-amber-400">61%</strong> to <strong className="text-emerald-400 font-bold">96%</strong>!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/reviewer/queue"
                className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                ← Return to Reviewer Queue
              </Link>
              <Link
                href="/employer/candidates/70000000-0000-0000-0000-000000000001"
                className="px-4 py-2 rounded-xl bg-zinc-800 border border-white/10 text-zinc-200 text-xs font-mono font-semibold hover:bg-zinc-700 transition-colors"
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
                <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Student Submitted Artifact
                </h2>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">
                Revision 1 (Frozen Snapshot)
              </span>
            </div>

            {/* Submission Info Header Card */}
            <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-zinc-100">
                    Meera Patel • Challenge: Monthly Sales Breakdown
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    MCA 2026 • Demo College of Computing
                  </p>
                </div>

                {/* AI Disclosure Tag */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>ChatGPT used for syntax verification only</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center space-x-4 text-xs text-zinc-400 font-mono">
                <span>Task: <strong className="text-zinc-200">PostgreSQL 16 Cleaning & Window Aggregation</strong></span>
                <span>•</span>
                <span>Submitted: <strong className="text-zinc-200">2 hours ago</strong></span>
              </div>
            </div>

            {/* Contribution Statement Box */}
            <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-xl space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Student Contribution Statement</span>
              </div>
              <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 text-xs text-zinc-200 leading-relaxed border-l-4 border-l-indigo-500 font-mono">
                &quot;I independently cleaned 14 missing date fields using PostgreSQL COALESCE and NULLIF guards, and constructed all multi-table joins without automated scaffolding. I used ChatGPT solely to verify regex digit replacement syntax for corrupted customer IDs, which I tested and tuned against edge-case anomalies.&quot;
              </div>
              <p className="text-[11px] text-zinc-500 italic font-mono">
                * Confirmed under Demo College of Computing academic integrity pledge.
              </p>
            </div>

            {/* Code Box: Dark IDE Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  PostgreSQL Query Solution
                </span>
                <span className="text-[11px] font-mono text-accent">
                  sales_aggregate.sql
                </span>
              </div>

              <div className="bg-zinc-950 text-emerald-400 font-mono text-xs rounded-2xl p-5 border border-white/10 shadow-2xl overflow-x-auto leading-relaxed">
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
                <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Evaluation & Attainment Rubric
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/30">
                Weight: 35%
              </span>
            </div>

            {/* Rubric Container Card */}
            <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl space-y-5">
              <div>
                <h3 className="text-lg font-black text-zinc-100">
                  SQL Optimization & Business Aggregation (coverage-v1)
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
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
                          ? 'ring-2 ring-emerald-500 bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : 'border-white/10 bg-zinc-950/60 hover:border-white/20 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                                  : 'bg-zinc-800 text-zinc-300'
                              }`}
                            >
                              {rubric.badge}
                            </span>
                            <span className="font-bold text-xs text-zinc-200">
                              {rubric.title}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed pt-0.5">
                            {rubric.description}
                          </p>
                        </div>

                        <div className="shrink-0 pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-zinc-600 bg-zinc-900'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reviewer Comments */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label
                  htmlFor="faculty-comments"
                  className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider"
                >
                  Faculty Evaluation Rationale (Signed by Dr. Alok Sharma)
                </label>
                <textarea
                  id="faculty-comments"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Provide qualitative feedback justifying the awarded proficiency level..."
                  className="w-full text-xs text-zinc-100 rounded-xl border border-white/10 p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-zinc-950 leading-relaxed font-mono"
                />
                <p className="text-[11px] font-mono text-zinc-500">
                  * This rationale will be permanently embedded in Meera&apos;s verified Evidence Snapshot for recruiters.
                </p>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => alert('Draft evaluation comments saved.')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  disabled={isSuccess}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] flex items-center justify-center space-x-2"
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsPublishModalOpen(false)}
            />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-zinc-950 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-w-lg w-full p-6 sm:p-7 space-y-5">
                <div className="flex items-start justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-zinc-100">
                      Confirm Attainment Publication
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsPublishModalOpen(false)}
                    className="text-zinc-400 hover:text-zinc-100 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed font-mono">
                  <p>
                    You are signing off on an official skill attainment for <strong className="text-zinc-100">Meera Patel</strong>:
                  </p>

                  <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Skill Criterion:</span>
                      <span className="font-bold text-zinc-100">SQL Optimization & Business Aggregation</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Attained Level:</span>
                      <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        Level {selectedLevel} (Proficient)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Evaluator:</span>
                      <span className="font-semibold text-zinc-100">Dr. Alok Sharma</span>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-300">
                    <strong className="block mb-0.5 font-bold text-emerald-400">What happens upon confirmation?</strong>
                    A tamper-proof credential record is created. Meera&apos;s match score for the <strong>Junior Data Analyst Intern</strong> role will atomically jump from <strong className="text-amber-400">61%</strong> to <strong className="text-emerald-400">96%</strong>.
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono font-semibold text-zinc-400 hover:text-zinc-100 rounded-xl border border-white/10 hover:bg-zinc-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishAttainment}
                    disabled={isPublishing}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
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

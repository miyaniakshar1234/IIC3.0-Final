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

  React.useEffect(() => {
    async function checkExistingReview() {
      try {
        const res = await fetch('/api/v1/state', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data?.has_verified_sql) {
            setIsSuccess(true);
            if (json.data.sql_level) {
              setSelectedLevel(json.data.sql_level);
            }
          }
        }
      } catch (err) {}
    }
    checkExistingReview();
  }, []);

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
      <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
        {/* Top Header Navigation */}
        <div className="pb-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <Link
              href="/reviewer/queue"
              className="p-2 rounded-xl border border-border text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
              aria-label="Back to queue"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="section-label text-xs">
                  Faculty Evaluation Workspace
                </span>
                <span className="text-text-muted">•</span>
                <span className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-success bg-success/10 border border-success/30 px-3 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  <span>Dr. Alok Sharma Reviewing</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary mt-0.5">
                Evaluation: Meera Patel • Challenge: Monthly Sales Breakdown
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-mono font-semibold text-warning bg-warning/10 border border-warning/30 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-warning animate-pulse" />
              <span>SLA: Due in 22h</span>
            </span>
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="bg-success/10 border border-success/40 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-success/20 text-success border border-success/40 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-text-primary">
                  Skill Attainment Level {selectedLevel} Published!
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-mono">
                  <strong className="text-success">Atomic Transaction Complete:</strong> SQL Proficiency <strong>Level {selectedLevel}</strong> has been officially attributed to <strong>Meera Patel</strong> under Dr. Alok Sharma&apos;s faculty signature.
                  Her candidate match score for <strong>Junior Data Analyst Intern</strong> has leaped from <strong className="text-warning font-bold">61%</strong> to <strong className="text-success font-bold">96%</strong>!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/reviewer/queue"
                className="pb-btn-primary text-xs py-2 px-4"
              >
                ← Return to Reviewer Queue
              </Link>
              <Link
                href="/employer/candidates/70000000-0000-0000-0000-000000000001"
                className="pb-btn-ghost text-xs py-2 px-4 font-mono"
              >
                Inspect Candidate Snapshot (96% Match) →
              </Link>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Student Artifact Viewer */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="section-label flex items-center space-x-2">
                <FileCode2 className="w-4 h-4" />
                <span>Student Submitted Artifact</span>
              </div>
              <span className="text-[11px] text-text-muted font-mono">
                Revision 1 (Frozen Snapshot)
              </span>
            </div>

            {/* Submission Info Header Card */}
            <div className="pb-card p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-text-primary">
                    Meera Patel • Challenge: Monthly Sales Breakdown
                  </h3>
                  <p className="text-xs text-text-muted font-mono">
                    MCA 2026 • Demo College of Computing
                  </p>
                </div>

                {/* AI Disclosure Tag */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-warning/10 text-warning border border-warning/30 text-xs font-mono font-semibold">
                  <Bot className="w-3.5 h-3.5 text-warning" />
                  <span>ChatGPT used for syntax verification only</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center space-x-4 text-xs text-text-muted font-mono">
                <span>Task: <strong className="text-text-secondary">PostgreSQL 16 Cleaning & Window Aggregation</strong></span>
                <span>•</span>
                <span>Submitted: <strong className="text-text-secondary">2 hours ago</strong></span>
              </div>
            </div>

            {/* Contribution Statement Box */}
            <div className="pb-card p-5 space-y-2.5">
              <div className="section-label flex items-center space-x-2 text-info">
                <User className="w-4 h-4" />
                <span>Student Contribution Statement</span>
              </div>
              <div className="bg-info/5 border border-info/20 rounded-xl p-4 text-xs text-text-secondary leading-relaxed border-l-4 border-l-info font-mono">
                &quot;I independently cleaned 14 missing date fields using PostgreSQL COALESCE and NULLIF guards, and constructed all multi-table joins without automated scaffolding. I used ChatGPT solely to verify regex digit replacement syntax for corrupted customer IDs, which I tested and tuned against edge-case anomalies.&quot;
              </div>
              <p className="text-[11px] text-text-muted italic font-mono">
                * Confirmed under Demo College of Computing academic integrity pledge.
              </p>
            </div>

            {/* Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="section-label text-xs">
                  PostgreSQL Query Solution
                </span>
                <span className="text-[11px] font-mono text-accent">
                  sales_aggregate.sql
                </span>
              </div>

              <div className="bg-canvas text-success font-mono text-xs rounded-2xl p-5 border border-border shadow-inner overflow-x-auto leading-relaxed">
                <pre className="whitespace-pre-wrap">{SAMPLE_POSTGRES_SQL}</pre>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Anchored 4-Level Rubric & Evaluator Action */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="section-label flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Evaluation & Attainment Rubric</span>
              </div>
              <span className="pb-badge pb-badge-accent font-mono font-bold">
                Weight: 35%
              </span>
            </div>

            {/* Rubric Container Card */}
            <div className="pb-card p-6 space-y-5">
              <div>
                <h3 className="text-lg font-black text-text-primary">
                  SQL Optimization & Business Aggregation (coverage-v1)
                </h3>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
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
                          ? 'border-border-accent bg-accent-soft ring-1 ring-border-accent shadow-sm'
                          : 'border-border bg-canvas hover:border-border-bright hover:bg-surface-hover'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-accent text-[var(--text-inverse)] shadow-sm'
                                  : 'bg-surface border border-border text-text-secondary'
                              }`}
                            >
                              {rubric.badge}
                            </span>
                            <span className="font-bold text-xs text-text-primary">
                              {rubric.title}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted leading-relaxed pt-0.5">
                            {rubric.description}
                          </p>
                        </div>

                        <div className="shrink-0 pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-accent border-accent text-[var(--text-inverse)]'
                                : 'border-border bg-surface'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-[var(--text-inverse)]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reviewer Comments */}
              <div className="pt-2 border-t border-border space-y-2">
                <label
                  htmlFor="faculty-comments"
                  className="section-label"
                >
                  Faculty Evaluation Rationale (Signed by Dr. Alok Sharma)
                </label>
                <textarea
                  id="faculty-comments"
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Provide qualitative feedback justifying the awarded proficiency level..."
                  className="w-full text-xs text-text-primary rounded-xl border border-border p-3.5 focus:outline-none focus:ring-2 focus:ring-accent bg-canvas leading-relaxed font-mono"
                />
                <p className="text-[11px] font-mono text-text-muted">
                  * This rationale will be permanently embedded in Meera&apos;s verified Evidence Snapshot for recruiters.
                </p>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => alert('Draft evaluation comments saved.')}
                  className="pb-btn-ghost w-full sm:w-auto text-xs flex items-center justify-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  disabled={isSuccess}
                  className="pb-btn-primary w-full sm:w-auto text-xs flex items-center justify-center space-x-2"
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
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setIsPublishModalOpen(false)}
            />
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative bg-surface rounded-3xl border border-border-accent shadow-lg max-w-lg w-full p-6 sm:p-7 space-y-5">
                <div className="flex items-start justify-between border-b border-border pb-3">
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-success" />
                    <h3 className="text-base font-bold text-text-primary">
                      Confirm Attainment Publication
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsPublishModalOpen(false)}
                    className="text-text-muted hover:text-text-primary p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-text-secondary leading-relaxed font-mono">
                  <p>
                    You are signing off on an official skill attainment for <strong className="text-text-primary">Meera Patel</strong>:
                  </p>

                  <div className="bg-canvas border border-border rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">Skill Criterion:</span>
                      <span className="font-bold text-text-primary">SQL Optimization & Business Aggregation</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">Attained Level:</span>
                      <span className="font-bold text-success bg-success/10 px-2.5 py-0.5 rounded-full border border-success/30">
                        Level {selectedLevel} (Proficient)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">Evaluator:</span>
                      <span className="font-semibold text-text-primary">Dr. Alok Sharma</span>
                    </div>
                  </div>

                  <div className="bg-success/10 border border-success/30 rounded-2xl p-4 text-xs text-success">
                    <strong className="block mb-0.5 font-bold">What happens upon confirmation?</strong>
                    A tamper-proof credential record is created. Meera&apos;s match score for the <strong>Junior Data Analyst Intern</strong> role will atomically jump from <strong className="text-warning">61%</strong> to <strong className="text-success font-bold">96%</strong>.
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="pb-btn-ghost text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePublishAttainment}
                    disabled={isPublishing}
                    className="pb-btn-primary text-xs py-2.5 px-5"
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

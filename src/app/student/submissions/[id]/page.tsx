'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusChip } from '@/components/student/StatusChip';
import { ArrowLeft, Clock, FileText, CheckCircle2, Lock, ExternalLink, Code2, ShieldCheck, Terminal } from 'lucide-react';

export default function SubmissionHistoryPage({ params }: { params: { id: string } }) {
  const submission = {
    id: params.id || 'sub-sql-001',
    challengeTitle: 'Explain Monthly Sales from Messy Dataset',
    submittedAt: 'Sep 08, 2026, 16:45',
    status: 'awaiting-review' as const,
    revisionNumber: 1,
    title: 'Monthly Sales Analysis and SQL Solution',
    bodyText: `-- SQL Solution for Monthly Sales Breakdown
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
    LAG(total_sales) OVER (PARTITION BY product_category ORDER BY sales_month) as prev_month_sales
FROM monthly_revenue;`,
    contributionStatement: 'Wrote SQL query using PostgreSQL syntax. Filtered missing dates and used window functions independently.',
    externalLinks: [
      'https://github.com/meerasharma/sales-sql-challenge-solution'
    ]
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        <Link
          href="/student/passport"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Skill Passport</span>
        </Link>

        <div className="pb-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-canvas px-3 py-1 rounded-full text-text-muted border border-border">
                  Revision #{submission.revisionNumber} (Locked)
                </span>
                <StatusChip status={submission.status} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">{submission.title}</h1>
              <p className="text-xs text-text-muted font-mono">Challenge: <span className="text-text-secondary font-semibold">{submission.challengeTitle}</span></p>
            </div>

            <div className="flex items-center gap-2 text-xs text-text-muted font-mono bg-canvas px-4 py-2 rounded-xl border border-border">
              <Clock className="w-4 h-4 text-accent" />
              <span>Finalized {submission.submittedAt}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="section-label flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" />
                <span>Submitted Artifact Text</span>
              </h3>
              <span className="text-[11px] text-text-muted font-mono">PostgreSQL 16</span>
            </div>
            <pre className="p-5 rounded-2xl bg-canvas text-success font-mono text-xs overflow-x-auto leading-relaxed border border-border shadow-inner">
              {submission.bodyText}
            </pre>
          </div>

          <div className="space-y-3 pt-3 border-t border-border">
            <h3 className="section-label flex items-center gap-2 text-accent">
              <FileText className="w-4 h-4" />
              <span>Student Contribution Statement</span>
            </h3>
            <p className="p-5 rounded-2xl bg-canvas text-xs text-text-secondary leading-relaxed border border-border font-mono">
              {submission.contributionStatement}
            </p>
          </div>

          {submission.externalLinks.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-border">
              <h3 className="section-label flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>External Verified Links</span>
              </h3>
              <div className="space-y-2">
                {submission.externalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-canvas border border-border text-xs text-text-primary hover:text-accent hover:border-border-accent transition-all font-mono group"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent" />
                      <span>{link}</span>
                    </span>
                    <span className="text-[11px] bg-surface border border-border px-2.5 py-0.5 rounded-lg group-hover:bg-accent group-hover:text-[var(--text-inverse)]">
                      Open
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

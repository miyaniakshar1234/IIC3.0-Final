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
      <div className="max-w-5xl mx-auto space-y-6">
        <Link
          href="/student/passport"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Skill Passport</span>
        </Link>

        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-zinc-950/80 px-3 py-1 rounded-full text-zinc-400 border border-white/10">
                  Revision #{submission.revisionNumber} (Locked)
                </span>
                <StatusChip status={submission.status} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{submission.title}</h1>
              <p className="text-xs text-zinc-400 font-mono">Challenge: <span className="text-zinc-300 font-semibold">{submission.challengeTitle}</span></p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono bg-zinc-950/80 px-4 py-2 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Finalized {submission.submittedAt}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Submitted Artifact Text</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-mono">PostgreSQL 16</span>
            </div>
            <pre className="p-5 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-xs overflow-x-auto leading-relaxed border border-white/10 shadow-inner">
              {submission.bodyText}
            </pre>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Student Contribution Statement</span>
            </h3>
            <p className="p-5 rounded-2xl bg-zinc-950/80 text-xs text-zinc-300 leading-relaxed border border-white/10 font-mono">
              {submission.contributionStatement}
            </p>
          </div>

          {submission.externalLinks.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>External Verified Links</span>
              </h3>
              <div className="space-y-2">
                {submission.externalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-blue-400 hover:text-blue-300 hover:border-blue-500/30 transition-all font-mono group"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-blue-400" />
                      <span>{link}</span>
                    </span>
                    <span className="text-[11px] bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-lg">
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

'use client'

import React from 'react'
import Link from 'next/link'
import { StudentNav } from '@/components/student/StudentNav'
import { StatusChip } from '@/components/student/StatusChip'
import { ArrowLeft, Clock, FileText, CheckCircle2, Lock, ExternalLink } from 'lucide-react'

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
  }

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <StudentNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <Link href="/student/passport" className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition">
          <ArrowLeft className="w-4 h-4" /> Back to Passport
        </Link>

        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono bg-canvas px-2.5 py-0.5 rounded text-gray-600 border border-border">
                  Revision #{submission.revisionNumber} (Locked)
                </span>
                <StatusChip status={submission.status} />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mt-1">{submission.title}</h1>
              <p className="text-xs text-text-secondary mt-0.5">Challenge: {submission.challengeTitle}</p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Clock className="w-4 h-4 text-accent" />
              Finalized on {submission.submittedAt}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Submitted Artifact Text
            </h3>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-border">
              {submission.bodyText}
            </pre>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent" />
              Contribution Statement
            </h3>
            <p className="p-4 rounded-xl bg-canvas text-xs text-text-primary leading-relaxed border border-border">
              {submission.contributionStatement}
            </p>
          </div>

          {submission.externalLinks.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                External Verified Links
              </h3>
              <div className="space-y-2">
                {submission.externalLinks.map((link, idx) => (
                  <a key={idx} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-canvas border border-border text-xs text-accent hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  )
}

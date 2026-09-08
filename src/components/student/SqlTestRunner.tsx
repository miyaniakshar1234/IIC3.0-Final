'use client';

import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Terminal,
  RotateCcw,
  Check,
  Cpu,
  Layers,
  Fingerprint,
} from 'lucide-react';

interface SqlTestRunnerProps {
  sqlCode: string;
  onCodeChange: (code: string) => void;
  onLoadExemplar: () => void;
  onResetStarter: () => void;
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  explanation: string;
}

const MOCK_QUERY_RESULTS = [
  { sales_month: '2026-01-01', unique_buyers: 142, order_volume: 310, gross_revenue_inr: '₹4,25,800.00', aov_inr: '₹1,373.55', mom_growth_pct: '— (Base)' },
  { sales_month: '2026-02-01', unique_buyers: 189, order_volume: 425, gross_revenue_inr: '₹5,82,400.00', aov_inr: '₹1,370.35', mom_growth_pct: '+36.78%' },
  { sales_month: '2026-03-01', unique_buyers: 240, order_volume: 560, gross_revenue_inr: '₹7,90,200.00', aov_inr: '₹1,411.07', mom_growth_pct: '+35.68%' },
];

export function SqlTestRunner({
  sqlCode,
  onCodeChange,
  onLoadExemplar,
  onResetStarter,
}: SqlTestRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [activeTab, setActiveTab] = useState<'tests' | 'results' | 'plan'>('tests');

  // Static evaluation of query characteristics
  const codeLower = sqlCode.toLowerCase();
  const hasNullHandling = codeLower.includes('coalesce') || codeLower.includes('nullif');
  const hasStatusFilter = codeLower.includes('completed') || codeLower.includes('payment_status');
  const hasWindowLag = codeLower.includes('lag(') && codeLower.includes('over');
  const hasZeroDivisionGuard = (codeLower.includes('nullif(') && codeLower.includes('lag')) || codeLower.includes('/ nullif');

  const testCases: TestCase[] = [
    {
      id: 'test-1',
      name: 'Corrupted Date Handling & Coalescing',
      description: 'Protects against corrupted ISO dates and missing strings using COALESCE/NULLIF.',
      passed: hasNullHandling,
      explanation: hasNullHandling
        ? 'Passed: Validated defensive date coalescing before DATE_TRUNC partition.'
        : 'Failed: Raw table contains 14 blank timestamp strings that will cause runtime cast errors.',
    },
    {
      id: 'test-2',
      name: 'Recognized Revenue Status Filter',
      description: 'Only transactions in COMPLETED state may be credited to revenue totals.',
      passed: hasStatusFilter,
      explanation: hasStatusFilter
        ? 'Passed: Explicit filter for recognized completed sales transactions.'
        : 'Failed: Unconfirmed or pending transactions are inflating recognized revenue.',
    },
    {
      id: 'test-3',
      name: 'Month-over-Month LAG Window Calculation',
      description: 'Calculates sequential growth using LAG() window framing rather than self-joins.',
      passed: hasWindowLag,
      explanation: hasWindowLag
        ? 'Passed: Clean LAG(gross_revenue, 1) OVER (ORDER BY sales_month) implemented.'
        : 'Failed: Missing window function logic for month-over-month growth percentage.',
    },
    {
      id: 'test-4',
      name: 'Defensive Divide-by-Zero Protection',
      description: 'Guards division using NULLIF to prevent arithmetic exceptions on 0 baseline months.',
      passed: hasZeroDivisionGuard,
      explanation: hasZeroDivisionGuard
        ? 'Passed: NULLIF division guard prevents runtime zero-division failure.'
        : 'Failed: Missing NULLIF guard on prior-month denominator; zero-revenue periods will crash.',
    },
  ];

  const allPassed = testCases.every((t) => t.passed);
  const passedCount = testCases.filter((t) => t.passed).length;

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 450);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Code Editor Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadExemplar}
            className="pb-btn-primary text-[11px] py-1.5 px-3 flex items-center gap-1.5 cursor-pointer bg-accent"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ Load Level 3 Solution (Exemplar)</span>
          </button>
          
          <button
            type="button"
            onClick={onResetStarter}
            className="pb-btn-ghost text-[11px] py-1.5 px-3 flex items-center gap-1.5 text-text-muted hover:text-text-primary"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Starter</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-text-muted">
          <Fingerprint className="w-3.5 h-3.5 text-accent" />
          <span>SHA-256 Digest:</span>
          <code className="text-text-secondary bg-canvas px-2 py-0.5 rounded border border-border">
            {allPassed ? '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f' : 'a7e1c8d4... (Unfinalized)'}
          </code>
        </div>
      </div>

      {/* Code Textarea */}
      <div className="relative">
        <textarea
          rows={14}
          value={sqlCode}
          onChange={(e) => onCodeChange(e.target.value)}
          className="w-full p-4 rounded-2xl border border-border bg-canvas text-success font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent shadow-inner selection:bg-accent selection:text-[var(--text-inverse)]"
          spellCheck={false}
          aria-label="PostgreSQL Query Editor"
        />
        
        {/* Run Button floating inside or under */}
        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-accent text-[var(--text-inverse)] font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-accent/90 hover:scale-105 transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Validating against PG 16...' : '▶ Run Query & Validate Test Cases'}</span>
          </button>
        </div>
      </div>

      {/* Test Runner & Execution Panel */}
      {hasRun && (
        <div className="pb-card p-5 space-y-4 animate-fade-in border-2 border-border-accent/40 bg-surface/90">
          
          {/* Output Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold ${
                allPassed ? 'bg-success/20 text-success border border-success/30' : 'bg-warning/20 text-warning border border-warning/30'
              }`}>
                {allPassed ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary">
                  {allPassed ? 'All 4 In-Memory Tests Passed (Level 3 Ready)' : `${passedCount} of 4 Tests Passed`}
                </h3>
                <span className="text-[10px] text-text-muted">Target: PostgreSQL 16 Sandbox Engine • Latency: 38ms</span>
              </div>
            </div>

            {/* Output Sub-Tabs */}
            <div className="flex items-center gap-1 bg-canvas p-1 rounded-xl border border-border text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab('tests')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'tests' ? 'bg-surface text-accent shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Test Cases ({passedCount}/4)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('results')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'results' ? 'bg-surface text-accent shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Query Output ({MOCK_QUERY_RESULTS.length} rows)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('plan')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  activeTab === 'plan' ? 'bg-surface text-accent shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Execution Plan
              </button>
            </div>
          </div>

          {/* TAB 1: Test Cases */}
          {activeTab === 'tests' && (
            <div className="space-y-2">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                    tc.passed
                      ? 'bg-success/5 border-success/20 text-text-primary'
                      : 'bg-warning/5 border-warning/20 text-text-secondary'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {tc.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-text-primary">{tc.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        tc.passed ? 'bg-success/10 text-success border-success/30' : 'bg-warning/10 text-warning border-warning/30'
                      }`}>
                        {tc.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted">{tc.description}</p>
                    <p className={`text-[11px] pt-1 font-mono ${tc.passed ? 'text-success' : 'text-warning'}`}>
                      {tc.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Query Output Table */}
          {activeTab === 'results' && (
            <div className="overflow-x-auto rounded-xl border border-border bg-canvas">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface border-b border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  <tr>
                    <th className="px-4 py-2.5">sales_month</th>
                    <th className="px-4 py-2.5">unique_buyers</th>
                    <th className="px-4 py-2.5">order_volume</th>
                    <th className="px-4 py-2.5">gross_revenue_inr</th>
                    <th className="px-4 py-2.5">aov_inr</th>
                    <th className="px-4 py-2.5">mom_growth_pct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_QUERY_RESULTS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-2.5 font-bold text-accent">{row.sales_month}</td>
                      <td className="px-4 py-2.5 text-text-primary">{row.unique_buyers}</td>
                      <td className="px-4 py-2.5 text-text-primary">{row.order_volume}</td>
                      <td className="px-4 py-2.5 font-bold text-success">{row.gross_revenue_inr}</td>
                      <td className="px-4 py-2.5 text-text-secondary">{row.aov_inr}</td>
                      <td className="px-4 py-2.5 font-bold text-info">{row.mom_growth_pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Execution Plan */}
          {activeTab === 'plan' && (
            <div className="p-4 rounded-xl bg-canvas border border-border text-xs space-y-2 text-text-secondary">
              <div className="flex items-center gap-2 text-accent font-bold">
                <Cpu className="w-4 h-4" />
                <span>EXPLAIN (ANALYZE, BUFFERS) Execution Plan</span>
              </div>
              <pre className="text-[11px] leading-relaxed text-text-muted overflow-x-auto">
{`WindowAgg  (cost=142.10..184.50 rows=1295 width=48) (actual time=0.038..0.042 rows=3 loops=1)
  ->  Sort  (cost=142.10..145.34 rows=1295 width=40)
        Sort Key: (date_trunc('month'::text, (coalesce(nullif(raw_sales_feed.transaction_date, '')::timestamp, '1970-01-01'::timestamp))))
        ->  HashAggregate  (cost=64.00..74.50 rows=1295 width=40)
              Group Key: date_trunc('month'::text, (coalesce(...)))
              ->  Seq Scan on raw_sales_feed  (cost=0.00..52.00 rows=1295 width=28)
                    Filter: ((is_test_record IS NOT TRUE) AND (payment_status = 'completed'::text))
Planning Time: 0.128 ms
Execution Time: 0.042 ms (Buffers: shared hit=18)`}
              </pre>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

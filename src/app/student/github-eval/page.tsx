'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  Github,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Code2,
  Terminal,
  FileCode2,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Search,
  Check,
  RefreshCw,
  GitCommit,
  Cpu,
  Fingerprint,
  FileCheck,
  Award,
} from 'lucide-react';
import type { GithubEvaluationResult } from '@/contracts/github';

export default function GithubEvaluationPage() {
  const [handle, setHandle] = useState('meerasharma');
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<GithubEvaluationResult | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Scan step messages for realistic AST evaluation simulation
  const scanSteps = [
    'Resolving public repositories & git tree commit graphs...',
    'Cloning AST syntax trees and extracting symbol tables...',
    'Detecting template boilerplate vs unique candidate logic...',
    'Auditing commit velocity, author provenance & SHA-256 seal...',
  ];

  const handleRunAudit = async (targetHandle?: string) => {
    const userToAudit = targetHandle || handle || 'meerasharma';
    setIsLoading(true);
    setScanStep(0);
    setImportSuccess(false);

    // Multi-phase scanner animation
    const interval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 450);

    try {
      const res = await fetch('/api/v1/github/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userToAudit }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setTimeout(() => {
          clearInterval(interval);
          setResult(json.data);
          setIsLoading(false);
        }, 1600);
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Audit failed:', err);
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial evaluation on mount with Meera Patel benchmark
    handleRunAudit('meerasharma');
  }, []);

  const handleImportToPassport = () => {
    setImportSuccess(true);
    setTimeout(() => setImportSuccess(false), 5000);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Header Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-3">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>PROOFBRIDGE AST CODE INTELLIGENCE ENGINE</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
              <Github className="w-9 h-9 text-foreground" />
              <span>GitHub AST Profile & Evidence Auditor</span>
            </h1>
            <p className="mt-2 text-base text-muted-foreground max-w-3xl">
              Eliminate resume exaggeration. ProofBridge parses candidate git trees, AST data structures, commit velocity, and boilerplate ratios to generate cryptographically verifiable skill evidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/passport"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted/50 transition-colors shadow-sm"
            >
              <Award className="w-4 h-4 text-emerald-500" />
              <span>View Skill Passport</span>
            </Link>
          </div>
        </div>

        {/* Interactive Search & Preset Switcher */}
        <div className="mt-8 bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Evaluate GitHub Profile or Repository URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <Github className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. meerasharma, miyaniakshar1234, or resumewriter"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-mono text-foreground placeholder:text-muted-foreground"
                  onKeyDown={(e) => e.key === 'Enter' && handleRunAudit()}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => handleRunAudit()}
                disabled={isLoading}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing AST...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Run AST Evidence Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground mr-1">Pitch Deck Archetypes:</span>
            <button
              onClick={() => {
                setHandle('meerasharma');
                handleRunAudit('meerasharma');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                handle === 'meerasharma'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Candidate B: Meera Patel (89% Evidence-Backed)</span>
            </button>

            <button
              onClick={() => {
                setHandle('resumewriter');
                handleRunAudit('resumewriter');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                handle === 'resumewriter'
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Candidate A: Resume Claimer (43% Inflated)</span>
            </button>
          </div>
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="mt-8 bg-card border border-primary/30 rounded-2xl p-8 text-center shadow-lg animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-primary">
              <Cpu className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Deep Code AST Inspection in Progress...</h3>
            <p className="text-sm text-primary font-mono mt-2">{scanSteps[scanStep]}</p>

            <div className="max-w-md mx-auto mt-6 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 rounded-full"
                style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Results Container */}
        {!isLoading && result && (
          <div className="mt-8 space-y-8">
            {/* Top Score Banner */}
            <div
              className={`rounded-2xl border p-6 md:p-8 shadow-md relative overflow-hidden ${
                result.astScore >= 70
                  ? 'bg-gradient-to-br from-emerald-950/20 via-card to-card border-emerald-500/30'
                  : 'bg-gradient-to-br from-rose-950/20 via-card to-card border-rose-500/30'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  {result.profileData?.avatarUrl ? (
                    <img
                      src={result.profileData.avatarUrl}
                      alt={result.username}
                      className="w-16 h-16 rounded-2xl border-2 border-border object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-foreground font-bold text-xl">
                      <Github className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        GITHUB ID: @{result.username}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          result.astScore >= 70
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                        }`}
                      >
                        {result.astScore >= 70 ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>EVIDENCE VERIFIED</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>RESUME INFLATION DETECTED</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-foreground mt-1">{result.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Self-Reported Claim: <span className="font-semibold text-foreground">“{result.claimedLevel}”</span>
                    </p>
                  </div>
                </div>

                {/* Score Gauge */}
                <div className="flex items-center gap-6 bg-background/60 backdrop-blur-sm border border-border/60 rounded-2xl p-5 shadow-inner">
                  <div className="text-right">
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      PROOFBRIDGE AST SCORE
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {result.astScore >= 70 ? 'Capability Exceeds Claim' : 'Boilerplate Exceeds Logic'}
                    </div>
                  </div>
                  <div
                    className={`text-5xl font-black tracking-tight ${
                      result.astScore >= 70 ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {result.astScore}%
                  </div>
                </div>
              </div>

              {/* SHA-256 Digest Tag */}
              <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <Fingerprint className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">Cryptographic Audit Digest: {result.auditDigest}</span>
                </div>
                <div>Audited: {new Date(result.analyzedAt).toLocaleTimeString()}</div>
              </div>
            </div>

            {/* Pitch Deck Slide 5 Comparison Hero Callout */}
            <div className="bg-gradient-to-r from-amber-500/10 via-card to-card border border-amber-500/30 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    The ProofBridge Core Differentiator: AST Syntax Over Claimed Keywords
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    “Candidate B wrote <span className="text-emerald-400 font-semibold">‘Intermediate’</span>. Candidate A wrote <span className="text-rose-400 font-semibold">‘Advanced’</span>. Resumes cannot tell the difference. <span className="text-amber-400 font-bold">ProofBridge can.</span>”
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-side Inspection Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Repositories Analyzed
                </div>
                <div className="text-2xl font-black text-foreground mt-2 flex items-baseline gap-2">
                  <span>{result.repositoriesAnalyzed}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">repos</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Full git commit tree scanned</div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Lines Parsed
                </div>
                <div className="text-2xl font-black text-foreground mt-2 flex items-baseline gap-2">
                  <span>{result.totalLinesParsed.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">lines</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Filtered from vendor/deps</div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Boilerplate Ratio
                </div>
                <div
                  className={`text-2xl font-black mt-2 flex items-baseline gap-2 ${
                    result.boilerplateRatio > 0.5 ? 'text-rose-500' : 'text-emerald-500'
                  }`}
                >
                  <span>{Math.round(result.boilerplateRatio * 100)}%</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">template code</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {result.boilerplateRatio > 0.5 ? 'High copy-paste frequency' : 'Authentic domain logic'}
                </div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Authored Velocity
                </div>
                <div
                  className={`text-2xl font-black mt-2 flex items-baseline gap-2 ${
                    result.authoredVelocityRatio > 0.7 ? 'text-emerald-500' : 'text-amber-500'
                  }`}
                >
                  <span>{Math.round(result.authoredVelocityRatio * 100)}%</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">candidate authored</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Verified authorship cadence</div>
              </div>
            </div>

            {/* AST Inspection Log & Discovered Competencies Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 cols: Inspection Log */}
              <div className="lg:col-span-7 bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground">AST Code Inspection Log</h3>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {result.astSignals.filter((s) => s.passed).length} / {result.astSignals.length} VERIFIED
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {result.astSignals.map((signal, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        signal.passed
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-rose-500/5 border-rose-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">
                          {signal.passed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                              {signal.category}
                            </span>
                            <span
                              className={`text-xs font-semibold ${
                                signal.passed ? 'text-emerald-500' : 'text-rose-500'
                              }`}
                            >
                              {signal.passed ? 'PASSED' : 'FLAGGED'}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground mt-1">{signal.finding}</p>

                          {signal.codeSnippet && (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-background/80 border border-border/50 text-xs font-mono text-muted-foreground overflow-x-auto">
                              <code>{signal.codeSnippet}</code>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 cols: Discovered Competency Signals */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground">Extracted Competency Signals</h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-500 font-semibold">PROVEN</span>
                  </div>

                  <div className="mt-5 space-y-3.5">
                    {result.discoveredSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-foreground">{skill.skillName}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                            LEVEL {skill.attainedLevel}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                          <span className="truncate max-w-[200px]">{skill.evidenceRef}</span>
                          <span>{skill.linesAnalyzed} lines</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Import to Skill Twin Action */}
                  <div className="mt-6 pt-5 border-t border-border/40">
                    {importSuccess ? (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Competencies Imported to Skill Twin Passport!</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleImportToPassport}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Import Verified Evidence to Skill Twin</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Challenge Bridge Callout */}
                <div className="bg-muted/30 border border-border/60 rounded-2xl p-6 text-center">
                  <Code2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-foreground">Want to elevate your score further?</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Solve live micro-missions in our in-browser IDE to reach verified Level 4 mastery.
                  </p>
                  <Link
                    href="/challenges/30000000-0000-0000-0000-000000000001"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Launch SQL Sales Challenge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

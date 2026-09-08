'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  Github,
  GitBranch,
  GitCommit,
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
  Cpu,
  Fingerprint,
  FileCheck,
  Award,
  Copy,
  Download,
  BarChart3,
  TrendingUp,
  Info,
  ShieldAlert,
  CheckCheck,
  Zap,
} from 'lucide-react';
import type { GithubEvaluationResult } from '@/contracts/github';

export default function GithubEvaluationPage() {
  const [handle, setHandle] = useState('meerasharma');
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<GithubEvaluationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'ast-code' | 'forensics' | 'pitch-benchmark' | 'w3c-credential'>('ast-code');
  const [signalFilter, setSignalFilter] = useState<'all' | 'passed' | 'flagged'>('all');
  const [copiedDigest, setCopiedDigest] = useState(false);
  const [copiedCredential, setCopiedCredential] = useState(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

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
    setImageError(false);

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
        }, 1500);
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

  const handleCopyDigest = () => {
    if (result?.auditDigest) {
      navigator.clipboard.writeText(result.auditDigest);
      setCopiedDigest(true);
      setTimeout(() => setCopiedDigest(false), 2000);
    }
  };

  const handleCopyCredential = () => {
    if (result) {
      const jsonStr = JSON.stringify(
        {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://schema.proofbridge.org/v1/github-ast',
          ],
          id: result.verifiableCredential.id,
          type: result.verifiableCredential.type,
          issuer: result.verifiableCredential.issuer,
          issuanceDate: result.verifiableCredential.issuanceDate,
          credentialSubject: {
            id: `did:github:${result.username}`,
            astScore: result.astScore,
            status: result.status,
            repositoriesAnalyzed: result.repositoriesAnalyzed,
            totalLinesParsed: result.totalLinesParsed,
            boilerplateRatio: result.boilerplateRatio,
            authoredVelocityRatio: result.authoredVelocityRatio,
            auditDigest: result.auditDigest,
          },
          proof: {
            type: 'Ed25519Signature2020',
            created: result.verifiableCredential.issuanceDate,
            proofValue: result.verifiableCredential.proofValue,
          },
        },
        null,
        2
      );
      navigator.clipboard.writeText(jsonStr);
      setCopiedCredential(true);
      setTimeout(() => setCopiedCredential(false), 2000);
    }
  };

  const handleDownloadCredential = () => {
    if (result) {
      const payload = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://schema.proofbridge.org/v1/github-ast',
        ],
        id: result.verifiableCredential.id,
        type: result.verifiableCredential.type,
        issuer: result.verifiableCredential.issuer,
        issuanceDate: result.verifiableCredential.issuanceDate,
        credentialSubject: {
          id: `did:github:${result.username}`,
          astScore: result.astScore,
          repositoriesAnalyzed: result.repositoriesAnalyzed,
          auditDigest: result.auditDigest,
        },
        proof: {
          type: 'Ed25519Signature2020',
          created: result.verifiableCredential.issuanceDate,
          proofValue: result.verifiableCredential.proofValue,
        },
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proofbridge-github-audit-${result.username}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopySnippet = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleImportToPassport = () => {
    setImportSuccess(true);
    setTimeout(() => setImportSuccess(false), 5000);
  };

  const filteredSignals = result
    ? result.astSignals.filter((signal) => {
        if (signalFilter === 'passed') return signal.passed;
        if (signalFilter === 'flagged') return !signal.passed;
        return true;
      })
    : [];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-3">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>PROOFBRIDGE AST CODE INTELLIGENCE ENGINE</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
              <Github className="w-9 h-9 text-foreground" />
              <span>GitHub AST Profile &amp; Evidence Auditor</span>
            </h1>
            <p className="mt-2 text-base text-muted-foreground max-w-3xl">
              Eliminate resume exaggeration. ProofBridge inspects candidate git trees, AST data structures, commit velocity, and boilerplate ratios to generate cryptographically verifiable skill evidence.
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
        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Evaluate Any Public GitHub Profile or Handle
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
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 cursor-pointer"
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
          <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground mr-1">Pitch Deck Archetypes:</span>
            <button
              onClick={() => {
                setHandle('meerasharma');
                handleRunAudit('meerasharma');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                handle === 'meerasharma'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-bold'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Candidate B: Meera Patel (89% Evidence-Backed)</span>
            </button>

            <button
              onClick={() => {
                setHandle('miyaniakshar1234');
                handleRunAudit('miyaniakshar1234');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                handle === 'miyaniakshar1234'
                  ? 'bg-primary/10 text-primary border-primary/30 font-bold'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>Akshar Miyani: Systems Lead (94% Verified)</span>
            </button>

            <button
              onClick={() => {
                setHandle('resumewriter');
                handleRunAudit('resumewriter');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                handle === 'resumewriter'
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 font-bold'
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
          <div className="bg-card border border-primary/30 rounded-2xl p-8 text-center shadow-lg animate-pulse">
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
          <div className="space-y-8">
            {/* Top Score & Authentic Profile Header Banner */}
            <div
              className={`rounded-2xl border p-6 md:p-8 shadow-md relative overflow-hidden transition-all ${
                result.astScore >= 70
                  ? 'bg-gradient-to-br from-emerald-950/20 via-card to-card border-emerald-500/30'
                  : 'bg-gradient-to-br from-rose-950/20 via-card to-card border-rose-500/30'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  {/* Real GitHub Avatar — Never Stock Photos */}
                  <div className="relative shrink-0">
                    {!imageError && result.profileData?.avatarUrl ? (
                      <img
                        src={result.profileData.avatarUrl}
                        alt={result.profileData.name || result.username}
                        onError={() => setImageError(true)}
                        crossOrigin="anonymous"
                        className="w-20 h-20 rounded-2xl border-2 border-border object-cover shadow-md bg-muted"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-2xl shadow-md">
                        {result.profileData?.name
                          ? result.profileData.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()
                          : result.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <a
                      href={result.profileData?.profileUrl || `https://github.com/${result.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-card border border-border text-foreground hover:text-primary transition-colors shadow-sm"
                      title="Open authentic GitHub Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        @{result.username}
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
                      {result.archetype === 'EVIDENCE_BUILDER' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Pitch Deck Candidate B
                        </span>
                      )}
                      {result.archetype === 'RESUME_INFLATOR' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Pitch Deck Candidate A
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-black text-foreground">{result.title}</h2>
                    <p className="text-xs text-muted-foreground max-w-xl">
                      {result.profileData?.bio || 'Candidate verified via live GitHub AST inspection pipeline.'}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1 flex-wrap">
                      <span>Claimed: <strong className="text-foreground">“{result.claimedLevel}”</strong></span>
                      {result.profileData?.location && (
                        <span>• Location: <strong className="text-foreground">{result.profileData.location}</strong></span>
                      )}
                      <span>• Public Repos: <strong className="text-foreground">{result.profileData?.publicRepos ?? result.repositoriesAnalyzed}</strong></span>
                      <span>• Followers: <strong className="text-foreground">{result.profileData?.followers ?? 0}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Score Gauge */}
                <div className="flex items-center gap-6 bg-background/60 backdrop-blur-sm border border-border/60 rounded-2xl p-5 shadow-inner shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      PROOFBRIDGE AST SCORE
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {result.astScore >= 70 ? 'Capability Exceeds Claim' : 'Boilerplate Exceeds Logic'}
                    </div>
                    <div className="text-[11px] font-mono text-primary font-bold mt-1">
                      {result.astScore >= 70 ? 'Level 3/4 Verified' : 'Level 1 Primitive'}
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

              {/* SHA-256 Digest Tag & Action Row */}
              <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-2 truncate">
                  <Fingerprint className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">Cryptographic Audit Digest: {result.auditDigest}</span>
                  <button
                    onClick={handleCopyDigest}
                    className="p-1 rounded hover:bg-muted/50 text-foreground transition-colors cursor-pointer"
                    title="Copy SHA-256 Digest"
                  >
                    {copiedDigest ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>Audited: {new Date(result.analyzedAt).toLocaleTimeString()}</div>
              </div>
            </div>

            {/* Quick Metrics Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Repositories Analyzed
                </div>
                <div className="text-2xl font-black text-foreground mt-2 flex items-baseline gap-2">
                  <span>{result.repositoriesAnalyzed}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">repos</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Full git tree commit graph parsed</div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Lines Parsed
                </div>
                <div className="text-2xl font-black text-foreground mt-2 flex items-baseline gap-2">
                  <span>{result.totalLinesParsed.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">lines</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Filtered from node_modules/vendor</div>
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
                  {result.boilerplateRatio > 0.5 ? 'High copy-paste frequency' : 'Authentic candidate logic'}
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

            {/* Interactive Tabs Navigation */}
            <div className="flex items-center gap-2 p-1.5 bg-card border border-border/60 rounded-2xl overflow-x-auto">
              <button
                onClick={() => setActiveTab('ast-code')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'ast-code'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>AST Code &amp; Repositories ({result.repositories?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('forensics')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'forensics'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Commit Velocity &amp; Forensics</span>
              </button>

              <button
                onClick={() => setActiveTab('pitch-benchmark')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'pitch-benchmark'
                    ? 'bg-amber-500 text-black shadow-sm font-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Pitch Slide 5 Benchmark (&ldquo;Resume vs ProofBridge&rdquo;)</span>
              </button>

              <button
                onClick={() => setActiveTab('w3c-credential')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'w3c-credential'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>W3C Cryptographic Credential</span>
              </button>
            </div>

            {/* TAB 1: AST CODE & REPOSITORIES */}
            {activeTab === 'ast-code' && (
              <div className="space-y-8">
                {/* Analyzed Repositories Cards */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        <span>Public Codebases &amp; AST Logic Breakdown</span>
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Each repository is inspected for token depth, original logic ratio, and architecture patterns.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.repositories?.map((repo, idx) => (
                      <div
                        key={idx}
                        className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <FileCode2 className="w-4 h-4 text-primary" />
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-sm text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                              >
                                <span>{repo.name}</span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                              </a>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-muted text-foreground border border-border/50">
                              {repo.language}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {repo.description}
                          </p>

                          {/* Authentic Logic Gauge */}
                          <div className="mt-4 space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-muted-foreground">Authentic Logic:</span>
                              <span className={`font-bold ${repo.authenticLogicPercent >= 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {repo.authenticLogicPercent}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  repo.authenticLogicPercent >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${repo.authenticLogicPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-mono">
                          <div className="flex items-center gap-3">
                            <span>⭐ {repo.stars}</span>
                            <span>🍴 {repo.forks}</span>
                            <span>{repo.astTokensParsed.toLocaleString()} AST tokens</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {repo.tags?.slice(0, 2).map((tag, tIdx) => (
                              <span key={tIdx} className="px-1.5 py-0.5 rounded bg-muted/50 text-[10px] text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AST Code Inspection Log & Discovered Skills Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left 7 cols: Inspection Log */}
                  <div className="lg:col-span-7 bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-foreground">AST Code Inspection Log</h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSignalFilter('all')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            signalFilter === 'all'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          All ({result.astSignals.length})
                        </button>
                        <button
                          onClick={() => setSignalFilter('passed')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            signalFilter === 'passed'
                              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                              : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          Passed ({result.astSignals.filter((s) => s.passed).length})
                        </button>
                        <button
                          onClick={() => setSignalFilter('flagged')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            signalFilter === 'flagged'
                              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                              : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          Flagged ({result.astSignals.filter((s) => !s.passed).length})
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {filteredSignals.map((signal, idx) => (
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
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                  {signal.category}
                                </span>
                                <div className="flex items-center gap-2">
                                  {signal.metric && (
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted/60 text-foreground font-semibold">
                                      {signal.metric}
                                    </span>
                                  )}
                                  <span
                                    className={`text-xs font-semibold ${
                                      signal.passed ? 'text-emerald-500' : 'text-rose-500'
                                    }`}
                                  >
                                    {signal.passed ? 'PASSED' : 'FLAGGED'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm font-medium text-foreground mt-1">{signal.finding}</p>

                              {signal.codeSnippet && (
                                <div className="mt-2.5 p-3 rounded-lg bg-background/90 border border-border/60 text-xs font-mono text-foreground relative group">
                                  <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                    <code>{signal.codeSnippet}</code>
                                  </pre>
                                  <button
                                    onClick={() => handleCopySnippet(signal.codeSnippet!, idx)}
                                    className="absolute top-2 right-2 p-1.5 rounded bg-muted/80 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    title="Copy code snippet"
                                  >
                                    {copiedSnippetIndex === idx ? (
                                      <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
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
                          <h3 className="font-bold text-foreground">Extracted Competencies</h3>
                        </div>
                        <span className="text-xs font-mono text-emerald-500 font-semibold">EVIDENCE-BACKED</span>
                      </div>

                      <div className="mt-5 space-y-3.5">
                        {result.discoveredSkills?.map((skill, idx) => (
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
                            <p className="text-xs text-muted-foreground font-mono mt-1">
                              Pattern: {skill.astPattern}
                            </p>
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                              <span className="truncate max-w-[180px]">{skill.evidenceRef}</span>
                              <span>{skill.linesAnalyzed.toLocaleString()} lines parsed</span>
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
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Import Verified Evidence to Skill Twin</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Challenge Micro-Mission Callout */}
                    <div className="bg-muted/30 border border-border/60 rounded-2xl p-6 text-center">
                      <Code2 className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-bold text-sm text-foreground">Want to elevate your level further?</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Solve interactive micro-missions in our in-browser IDE to qualify for Level 4 mastery.
                      </p>
                      <Link
                        href="/challenges/30000000-0000-0000-0000-000000000001"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                      >
                        <span>Launch In-Browser SQL Micro-Mission</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COMMIT VELOCITY & FORENSICS */}
            {activeTab === 'forensics' && (
              <div className="space-y-8">
                {/* Commit Velocity Timeline */}
                <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <span>Commit Cadence &amp; Velocity Forensics</span>
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Detects bulk dump uploads vs consistent, multi-week authentic engineering sprints.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                      <GitCommit className="w-3.5 h-3.5" />
                      <span>{Math.round(result.authoredVelocityRatio * 100)}% Candidate Authored</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {result.commitVelocity?.map((point, idx) => (
                        <div
                          key={idx}
                          className="bg-background/80 border border-border/60 rounded-xl p-4 text-center space-y-2"
                        >
                          <div className="text-xs font-mono text-muted-foreground">{point.period}</div>
                          <div className="text-2xl font-black text-foreground">{point.commits}</div>
                          <div className="text-[11px] font-mono text-muted-foreground">commits</div>
                          <div className="pt-2 border-t border-border/40">
                            <span
                              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                                point.authenticityScore >= 70
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : 'bg-rose-500/10 text-rose-500'
                              }`}
                            >
                              {point.authenticityScore}% Auth
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Forensics Inspection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Cyclomatic Complexity */}
                  <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Cyclomatic Complexity
                      </h4>
                      <Cpu className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-black text-foreground">
                      {result.forensics?.cyclomaticComplexity || '3.2 (Clean Syntax)'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Lower cyclomatic score indicates clean modular functions, minimal spaghetti branching, and high readability.
                    </p>
                  </div>

                  {/* Idiomatic Patterns */}
                  <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Idiomatic Patterns
                      </h4>
                      <Code2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-black text-foreground">
                      {result.forensics?.idiomaticPatternsCount ?? 18} Verified Idioms
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Detects modern language best practices (e.g., STL algorithms, RAII, custom iterators, and async paradigms).
                    </p>
                  </div>

                  {/* Test Coverage */}
                  <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Test Coverage Estimation
                      </h4>
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-xl font-black text-foreground">
                      {result.forensics?.testCoverageEstimated || '78% path coverage'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Validates unit test assertion density, mocking frameworks, and continuous integration workflows.
                    </p>
                  </div>
                </div>

                {/* Anti-Patterns & Risk Detection */}
                <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-primary" />
                      <span>Anti-Patterns &amp; Engineering Risk Detection</span>
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">Deterministic Static Analysis</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {result.forensics?.antiPatternsDetected?.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-medium ${
                          item.toLowerCase().includes('clean') || item.toLowerCase().includes('zero') || item.toLowerCase().includes('no')
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                        }`}
                      >
                        {item.toLowerCase().includes('clean') || item.toLowerCase().includes('zero') || item.toLowerCase().includes('no') ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PITCH SLIDE 5 BENCHMARK ("RESUME VS PROOFBRIDGE") */}
            {activeTab === 'pitch-benchmark' && (
              <div className="space-y-8">
                {/* Hero Slide 5 Callout Banner */}
                <div className="bg-gradient-to-br from-amber-950/30 via-card to-card border-2 border-amber-500/40 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shrink-0">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-black text-amber-500 uppercase tracking-widest">
                        PITCH DECK SLIDE 5 • CORE MARKET DIFFERENTIATOR
                      </div>
                      <h3 className="text-2xl font-black text-foreground mt-1">
                        &ldquo;Candidate B wrote &lsquo;Intermediate&rsquo;. Candidate A wrote &lsquo;Advanced&rsquo;.
                      </h3>
                      <p className="text-xl font-bold text-amber-400 mt-0.5">
                        Resumes cannot tell the difference. ProofBridge can.&rdquo;
                      </p>
                      <p className="text-sm text-muted-foreground mt-3 max-w-3xl leading-relaxed">
                        Traditional hiring relies on keyword searches and self-reported claims. Anyone can copy-paste a tutorial and write &ldquo;Advanced C++&rdquo; on their resume. ProofBridge parses the Abstract Syntax Tree (AST), inspects memory structures, measures commit velocity, and detects boilerplate vs original logic.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Switcher Buttons directly on benchmark */}
                  <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground font-mono">Test Either Candidate:</span>
                    <button
                      onClick={() => {
                        setHandle('meerasharma');
                        handleRunAudit('meerasharma');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Audit Candidate B: Meera Patel (89% Evidence)</span>
                    </button>
                    <button
                      onClick={() => {
                        setHandle('resumewriter');
                        handleRunAudit('resumewriter');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Audit Candidate A: Resume Claimer (43% Inflated)</span>
                    </button>
                  </div>
                </div>

                {/* Side-by-Side Slide 5 Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Candidate A (Resume Claimer) */}
                  <div className="bg-card border-2 border-rose-500/30 rounded-3xl p-6 shadow-md space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border/40">
                      <div>
                        <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
                          RESUME CLAIMER (CANDIDATE A)
                        </span>
                        <h4 className="text-xl font-black text-foreground mt-1">
                          Claims: &ldquo;Advanced C++ &amp; Distributed Systems&rdquo;
                        </h4>
                      </div>
                      <div className="text-3xl font-black text-rose-500">43%</div>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                        <div className="font-bold text-rose-400">1. AST Syntax &amp; Memory Safety</div>
                        <div className="text-muted-foreground">
                          0 STL containers used. Flat hello-world primitives without memory management or RAII.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                        <div className="font-bold text-rose-400">2. Boilerplate Detection</div>
                        <div className="text-muted-foreground">
                          88% template starter code copied directly from an open repository fork.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                        <div className="font-bold text-rose-400">3. Commit Velocity &amp; Authorship</div>
                        <div className="text-muted-foreground">
                          1 single bulk dump commit on day of application. Zero branch discipline or pull requests.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                        <div className="font-bold text-rose-400">4. Test Coverage</div>
                        <div className="text-muted-foreground">
                          0 automated tests discovered. Zero build scripts (no CMake/Makefile).
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/40 text-center">
                      <span className="text-xs font-bold text-rose-400">
                        Result: Keyword ATS passes them, but ProofBridge detects inflation.
                      </span>
                    </div>
                  </div>

                  {/* Right: Candidate B (Evidence-Backed Builder) */}
                  <div className="bg-card border-2 border-emerald-500/30 rounded-3xl p-6 shadow-md space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border/40">
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
                          EVIDENCE-BACKED BUILDER (CANDIDATE B)
                        </span>
                        <h4 className="text-xl font-black text-foreground mt-1">
                          Claims: &ldquo;Intermediate C++ &amp; Systems&rdquo;
                        </h4>
                      </div>
                      <div className="text-3xl font-black text-emerald-500">89%</div>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                        <div className="font-bold text-emerald-400">1. AST Syntax &amp; Memory Safety</div>
                        <div className="text-muted-foreground">
                          Extensive STL: std::vector, std::unordered_map, custom iterators, RAII memory pools.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                        <div className="font-bold text-emerald-400">2. Boilerplate Detection</div>
                        <div className="text-muted-foreground">
                          Only 16% boilerplate. 2,840 lines of authentic, verified business logic.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                        <div className="font-bold text-emerald-400">3. Commit Velocity &amp; Authorship</div>
                        <div className="text-muted-foreground">
                          84% authored velocity verified over 6 months of steady commit cadence and 12 PRs.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                        <div className="font-bold text-emerald-400">4. Test Coverage &amp; Infrastructure</div>
                        <div className="text-muted-foreground">
                          14 unit test assertions, CMake 3.20 multi-module builds, and Docker workflows.
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/40 text-center">
                      <span className="text-xs font-bold text-emerald-400">
                        Result: Under-claimed on resume, but ProofBridge proves verified competency!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: W3C CRYPTOGRAPHIC CREDENTIAL */}
            {activeTab === 'w3c-credential' && (
              <div className="space-y-8">
                <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/40 gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>W3C VERIFIABLE CREDENTIAL DATA MODEL 1.1</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        Cryptographic Proof &amp; Asymmetric Signature Envelope
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tamper-proof JSON-LD credential verifying AST audit results. Verifiable completely offline with Ed25519 public keys.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyCredential}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-border bg-background hover:bg-muted transition-colors cursor-pointer"
                      >
                        {copiedCredential ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCredential ? 'Copied JSON' : 'Copy JSON'}</span>
                      </button>

                      <button
                        onClick={handleDownloadCredential}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .json</span>
                      </button>

                      <Link
                        href="/verify"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify Offline</span>
                      </Link>
                    </div>
                  </div>

                  {/* Envelope Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-xs font-mono space-y-1">
                      <div className="text-muted-foreground">CREDENTIAL ID</div>
                      <div className="font-bold text-foreground truncate">{result.verifiableCredential.id}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-xs font-mono space-y-1">
                      <div className="text-muted-foreground">ISSUER DID</div>
                      <div className="font-bold text-primary truncate">{result.verifiableCredential.issuer}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-xs font-mono space-y-1">
                      <div className="text-muted-foreground">ISSUANCE TIMESTAMP</div>
                      <div className="font-bold text-foreground truncate">{result.verifiableCredential.issuanceDate}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-xs font-mono space-y-1">
                      <div className="text-muted-foreground">SIGNATURE ALGORITHM</div>
                      <div className="font-bold text-emerald-500">Ed25519 + SHA-256</div>
                    </div>
                  </div>

                  {/* JSON-LD Code Block */}
                  <div className="rounded-2xl bg-background border border-border/60 p-5 font-mono text-xs text-foreground overflow-x-auto">
                    <pre className="text-emerald-400">
                      {JSON.stringify(
                        {
                          '@context': [
                            'https://www.w3.org/2018/credentials/v1',
                            'https://schema.proofbridge.org/v1/github-ast',
                          ],
                          id: result.verifiableCredential.id,
                          type: result.verifiableCredential.type,
                          issuer: result.verifiableCredential.issuer,
                          issuanceDate: result.verifiableCredential.issuanceDate,
                          credentialSubject: {
                            id: `did:github:${result.username}`,
                            candidateName: result.profileData?.name || result.username,
                            astScore: result.astScore,
                            auditStatus: result.status,
                            repositoriesAnalyzed: result.repositoriesAnalyzed,
                            totalLinesParsed: result.totalLinesParsed,
                            boilerplateRatio: result.boilerplateRatio,
                            authoredVelocityRatio: result.authoredVelocityRatio,
                            discoveredSkills: result.discoveredSkills?.map((s) => ({
                              skill: s.skillName,
                              level: s.attainedLevel,
                              evidenceRef: s.evidenceRef,
                            })),
                            auditDigest: result.auditDigest,
                          },
                          proof: {
                            type: 'Ed25519Signature2020',
                            created: result.verifiableCredential.issuanceDate,
                            verificationMethod: `${result.verifiableCredential.issuer}#key-1`,
                            proofPurpose: 'assertionMethod',
                            proofValue: result.verifiableCredential.proofValue,
                          },
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}

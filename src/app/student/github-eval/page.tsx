'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Star,
  GitFork,
  Eye,
  Calendar,
  Filter,
  ArrowUpDown,
  BookOpen,
  Boxes,
  X,
  MapPin,
  Twitter,
  Users,
  HardDrive,
  Shield,
  Lock,
  Briefcase,
  Flame,
  Share2,
  Compass,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import type { GithubEvaluationResult, AnalyzedRepo, LanguageStat } from '@/contracts/github';

export default function GithubEvaluationPage() {
  const [handle, setHandle] = useState('miyaniakshar1234');
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<GithubEvaluationResult | null>(null);
  const [activeTab, setActiveTab] = useState<
    'repos-explorer' | 'visualizations' | 'forensics' | 'recruiter-synthesis' | 'pitch-benchmark' | 'w3c-credential'
  >('repos-explorer');
  const [signalFilter, setSignalFilter] = useState<'all' | 'passed' | 'flagged'>('all');
  const [copiedDigest, setCopiedDigest] = useState(false);
  const [copiedCredential, setCopiedCredential] = useState(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<LanguageStat | null>(null);

  // Repository Explorer State
  const [repoSearch, setRepoSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'pushed' | 'stars' | 'size' | 'name'>('pushed');
  const [selectedRepo, setSelectedRepo] = useState<AnalyzedRepo | null>(null);

  // Scan step messages for realistic AST evaluation simulation
  const scanSteps = [
    'Connecting to GitHub API & resolving public repositories...',
    'Fetching commit trees, tags, branches, and code density...',
    'Cloning AST syntax trees and detecting template boilerplate...',
    'Calculating polyglot language volume & generating W3C cryptographic seal...',
  ];

  const handleRunAudit = async (targetHandle?: string) => {
    const userToAudit = targetHandle || handle || 'miyaniakshar1234';
    setIsLoading(true);
    setScanStep(0);
    setImportSuccess(false);
    setSelectedRepo(null);

    const interval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 400);

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
        }, 1200);
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
    // Initial evaluation on mount with Akshar Miyani
    handleRunAudit('miyaniakshar1234');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedRepo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyClone = (url: string) => {
    navigator.clipboard.writeText(`git clone ${url}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

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

  const handleCopyBadge = () => {
    if (!result) return;
    const badgeMd = `[![ProofBridge Verified](https://img.shields.io/badge/ProofBridge-Verified%20Level%203%20%E2%80%A2%20${result.astScore}%25%20AST-10b981?style=for-the-badge&logo=github)](https://proofbridge.io/verify/${result.auditDigest.slice(0, 16)})`;
    navigator.clipboard.writeText(badgeMd);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  const handleCopyDossier = () => {
    if (!result || !result.recruiterSynthesis) return;
    const text = `PROOFBRIDGE TECHNICAL DOSSIER: @${result.username}
Candidate: ${result.profileData?.name || result.username} (${result.claimedLevel})
AST Authenticity Score: ${result.astScore}% (${result.status})
Core Superpower: ${result.recruiterSynthesis.superpower}
Authenticity Finding: ${result.recruiterSynthesis.authenticityVerdict}
Recommended Roles: ${result.recruiterSynthesis.recommendedRoles.join(', ')}

Suggested Technical Interview Questions:
${result.recruiterSynthesis.tailoredQuestions.map((q, i) => `${i + 1}. ${q.question}\n   [Context: ${q.context}]`).join('\n\n')}

Verified by ProofBridge Cryptographic Engine (Digest: ${result.auditDigest})
Verification URL: https://proofbridge.io/verify/${result.auditDigest.slice(0, 16)}`;
    navigator.clipboard.writeText(text);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  // Mathematical SVG Donut Arc Segments
  const donutSegments = useMemo(() => {
    if (!result?.languageStats || result.languageStats.length === 0) return [];
    const cx = 100;
    const cy = 100;
    const rOuter = 82;
    const rInner = 52;
    let currentAngle = -90;

    return result.languageStats.map((stat) => {
      const angle = (stat.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + Math.max(angle, 1.2);
      currentAngle += angle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = cx + rOuter * Math.cos(startRad);
      const y1 = cy + rOuter * Math.sin(startRad);
      const x2 = cx + rOuter * Math.cos(endRad);
      const y2 = cy + rOuter * Math.sin(endRad);

      const x3 = cx + rInner * Math.cos(endRad);
      const y3 = cy + rInner * Math.sin(endRad);
      const x4 = cx + rInner * Math.cos(startRad);
      const y4 = cy + rInner * Math.sin(startRad);

      const largeArc = angle > 180 ? 1 : 0;
      const pathData = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;

      return {
        ...stat,
        pathData,
        startAngle,
        endAngle,
      };
    });
  }, [result?.languageStats]);

  // 6-Axis Developer DNA Radar Chart Math
  const radarData = useMemo(() => {
    if (!result?.developerDna) return null;
    const dna = result.developerDna;
    const axes = [
      { label: 'Systems & Low-Level', val: dna.systemsLowLevel, short: 'Systems' },
      { label: 'Full-Stack Web', val: dna.fullstackWeb, short: 'Web & UI' },
      { label: 'AST Authenticity', val: dna.astAuthenticity, short: 'AST Depth' },
      { label: 'Code Modularity', val: dna.codeModularity, short: 'Modularity' },
      { label: 'Commit Cadence', val: dna.commitCadence, short: 'Cadence' },
      { label: 'Open Source Impact', val: dna.openSourceImpact, short: 'OSS Impact' },
    ];
    const cx = 130;
    const cy = 130;
    const maxR = 85;

    const gridLevels = [0.25, 0.5, 0.75, 1.0].map((lvl) => {
      const points = axes.map((_, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        return `${cx + maxR * lvl * Math.cos(angle)},${cy + maxR * lvl * Math.sin(angle)}`;
      });
      return points.join(' ');
    });

    const dataPoints = axes.map((axis, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      const r = maxR * (axis.val / 100);
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        labelX: cx + (maxR + 26) * Math.cos(angle),
        labelY: cy + (maxR + 14) * Math.sin(angle),
        ...axis,
      };
    });

    const polygonPath = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

    return { cx, cy, maxR, gridLevels, dataPoints, polygonPath };
  }, [result?.developerDna]);

  // Polyglot Diversity Index
  const polyglotScore = useMemo(() => {
    if (!result?.languageStats) return 5.0;
    const count = result.languageStats.length;
    const hasSystems = result.languageStats.some((l) => ['Zig', 'Rust', 'C', 'C++'].includes(l.language));
    const hasWeb = result.languageStats.some((l) => ['TypeScript', 'JavaScript'].includes(l.language));
    let score = count * 1.5;
    if (hasSystems) score += 2.5;
    if (hasWeb) score += 1.5;
    return Math.min(Math.round(score * 10) / 10, 9.8);
  }, [result?.languageStats]);

  // Filtered and Sorted Repositories
  const filteredAndSortedRepos = useMemo(() => {
    if (!result?.repositories) return [];

    return result.repositories
      .filter((repo) => {
        const matchesSearch =
          repo.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
          repo.description.toLowerCase().includes(repoSearch.toLowerCase()) ||
          repo.tags.some((t) => t.toLowerCase().includes(repoSearch.toLowerCase()));

        const matchesLang =
          selectedLanguage === 'all' || repo.language.toLowerCase() === selectedLanguage.toLowerCase();

        return matchesSearch && matchesLang;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stars - a.stars;
        if (sortBy === 'size') return (b.sizeKB || 0) - (a.sizeKB || 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // Default: pushed / updated
        return new Date(b.pushedAt || b.updatedAt || 0).getTime() - new Date(a.pushedAt || a.updatedAt || 0).getTime();
      });
  }, [result?.repositories, repoSearch, selectedLanguage, sortBy]);

  // Available unique languages in current profile
  const availableLanguages = useMemo(() => {
    if (!result?.repositories) return [];
    const langs = new Set<string>();
    result.repositories.forEach((r) => {
      if (r.language && r.language !== 'Polyglot') langs.add(r.language);
    });
    return Array.from(langs);
  }, [result?.repositories]);

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
              <span>LIVE GITHUB AST FORENSICS &amp; REPOSITORY INTELLIGENCE</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
              <Github className="w-9 h-9 text-foreground" />
              <span>GitHub AST Profile &amp; Repository Auditor</span>
            </h1>
            <p className="mt-2 text-base text-muted-foreground max-w-3xl">
              Inspect candidate git trees, polyglot code volume, commit velocity, and repository architecture with verified Abstract Syntax Tree metrics.
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

        {/* Interactive Search & Live Handle Switcher */}
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
                  placeholder="e.g. miyaniakshar1234, meerasharma, torvalds, or resumewriter"
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
                    <span>Auditing Live GitHub...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Run Live GitHub Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground mr-1">Quick Audits:</span>
            <button
              onClick={() => {
                setHandle('miyaniakshar1234');
                handleRunAudit('miyaniakshar1234');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                handle === 'miyaniakshar1234'
                  ? 'bg-primary/15 text-primary border-primary/40 font-bold shadow-sm'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span>Akshar Miyani (@miyaniakshar1234 • 15 Repos)</span>
            </button>

            <button
              onClick={() => {
                setHandle('meerasharma');
                handleRunAudit('meerasharma');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                handle === 'meerasharma'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 font-bold shadow-sm'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Candidate B: Meera Patel (89% Evidence-Backed)</span>
            </button>

            <button
              onClick={() => {
                setHandle('resumewriter');
                handleRunAudit('resumewriter');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                handle === 'resumewriter'
                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/40 font-bold shadow-sm'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted border-border/40'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
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
                <div className="flex items-start gap-5">
                  {/* Real GitHub Avatar — Reliable cross-origin loading without CORS blocking */}
                  <div className="relative shrink-0">
                    <img
                      src={result.profileData?.avatarUrl || `https://avatars.githubusercontent.com/${result.username}`}
                      alt={result.profileData?.name || result.username}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-2xl border-2 border-border object-cover shadow-xl bg-muted"
                    />
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

                  <div className="space-y-1.5">
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

                    <h2 className="text-2xl font-black text-foreground">{result.profileData?.name || result.title}</h2>
                    <p className="text-xs text-muted-foreground max-w-xl line-clamp-2">
                      {result.profileData?.bio || 'Candidate verified via live GitHub AST inspection pipeline.'}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1 flex-wrap">
                      {result.profileData?.location && (
                        <span className="flex items-center gap-1 text-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>{result.profileData.location}</span>
                        </span>
                      )}
                      {result.profileData?.twitter && (
                        <a
                          href={`https://x.com/${result.profileData.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                          <span>@{result.profileData.twitter}</span>
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Boxes className="w-3.5 h-3.5 text-muted-foreground" />
                        <span><strong>{result.repositoriesAnalyzed}</strong> Public Repos</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <span><strong>{result.profileData?.followers ?? 0}</strong> Followers</span>
                      </span>
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
                  Total Repositories
                </div>
                <div className="text-2xl font-black text-foreground mt-2 flex items-baseline gap-2">
                  <span>{result.repositoriesAnalyzed}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">codebases</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">100% public repositories fetched</div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Codebase Disk Volume
                </div>
                <div className="text-2xl font-black text-foreground mt-2 flex items-baseline gap-2">
                  <span>{((result.totalSizeKB || 0) / 1024).toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">MB source code</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{result.totalLinesParsed.toLocaleString()} estimated lines parsed</div>
              </div>

              <div className="bg-card border border-border/60 rounded-xl p-5 shadow-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Active Languages
                </div>
                <div className="text-2xl font-black text-primary mt-2 flex items-baseline gap-2">
                  <span>{result.languageStats?.length || 1}</span>
                  <span className="text-xs text-muted-foreground font-normal font-mono">polyglot tech</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Multi-paradigm language distribution</div>
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
                  <span className="text-xs text-muted-foreground font-normal font-mono">authentic code</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Verified authorship cadence</div>
              </div>
            </div>

            {/* Interactive Tabs Navigation */}
            <div className="flex items-center gap-2 p-1.5 bg-card border border-border/60 rounded-2xl overflow-x-auto">
              <button
                onClick={() => setActiveTab('repos-explorer')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'repos-explorer'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span>All Repositories ({result.repositories?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('visualizations')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'visualizations'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Language &amp; Tech Visualizations</span>
              </button>

              <button
                onClick={() => setActiveTab('forensics')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'forensics'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Commit Velocity &amp; Forensics</span>
              </button>

              <button
                onClick={() => setActiveTab('recruiter-synthesis')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'recruiter-synthesis'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Recruiter &amp; Security Dossier</span>
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
                <span>Pitch Slide 5 Benchmark</span>
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
                <span>W3C Verifiable Credential</span>
              </button>
            </div>

            {/* TAB 1: ALL REPOSITORIES EXPLORER */}
            {activeTab === 'repos-explorer' && (
              <div className="space-y-6">
                {/* Search & Filter Controls Bar */}
                <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1 w-full md:w-auto relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
                    <input
                      type="text"
                      value={repoSearch}
                      onChange={(e) => setRepoSearch(e.target.value)}
                      placeholder="Search repositories by name, topic, or description..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-xs font-mono text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                    {/* Language Filter */}
                    <div className="flex items-center gap-1 text-xs">
                      <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-mono text-foreground focus:outline-none"
                      >
                        <option value="all">All Languages ({result.repositories?.length})</option>
                        {availableLanguages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-mono text-foreground focus:outline-none"
                      >
                        <option value="pushed">Recently Pushed</option>
                        <option value="stars">Most Stars</option>
                        <option value="size">Largest Codebase (KB)</option>
                        <option value="name">Alphabetical (A-Z)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Repositories Grid: Shows EVERY repository */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAndSortedRepos.map((repo, idx) => (
                    <div
                      key={idx}
                      className="bg-card border border-border/60 hover:border-primary/40 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between group cursor-pointer"
                      onClick={() => setSelectedRepo(repo)}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            <BookOpen className="w-4 h-4 text-primary shrink-0" />
                            <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                              {repo.name}
                            </h4>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-muted text-foreground border border-border/50 shrink-0">
                            {repo.language}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 min-h-[32px]">
                          {repo.description}
                        </p>

                        {/* Topics & Tags */}
                        {repo.tags && repo.tags.length > 0 && (
                          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                            {repo.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-mono"
                              >
                                #{tag}
                              </span>
                            ))}
                            {repo.tags.length > 3 && (
                              <span className="text-[10px] text-muted-foreground font-mono">
                                +{repo.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Authentic Logic Bar */}
                        <div className="mt-4 space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-mono">
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
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            <span>{repo.stars}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5" />
                            <span>{repo.forks}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-3.5 h-3.5" />
                            <span>{(repo.sizeKB || 0) > 1024 ? `${((repo.sizeKB || 0) / 1024).toFixed(1)}MB` : `${repo.sizeKB || 0}KB`}</span>
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRepo(repo);
                          }}
                          className="text-[11px] text-primary hover:underline font-bold"
                        >
                          Inspect AST →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredAndSortedRepos.length === 0 && (
                  <div className="p-12 text-center bg-card border border-border/60 rounded-2xl">
                    <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-bold text-foreground text-sm">No repositories found</h3>
                    <p className="text-xs text-muted-foreground mt-1">Try broadening your search or language filter.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: LANGUAGE & TECH VISUALIZATIONS */}
            {activeTab === 'visualizations' && (
              <div className="space-y-8">
                {/* Visual 1: Interactive Polyglot Donut Chart & Architecture Diversity Suite */}
                <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 mb-2">
                        <Compass className="w-3.5 h-3.5" />
                        <span>INTERACTIVE POLYGLOT AST CODE INTELLIGENCE</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <span>Polyglot Language Volume &amp; Density Engine</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Interactive radial telemetry across {result.repositoriesAnalyzed} repositories. Hover or click any arc to inspect and filter codebases.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-mono text-muted-foreground">Total Codebase Size</div>
                        <div className="text-base font-mono font-bold text-foreground">
                          {((result.totalSizeKB || 0) / 1024).toFixed(1)} MB ({result.totalLinesParsed.toLocaleString()} est. lines)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Bento: Donut Graph on Left, Polyglot Diversity Index on Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Interactive Radial SVG Donut */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-background/60 border border-border/60 rounded-2xl relative">
                      <div className="relative w-64 h-64 flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                          {donutSegments.map((seg, idx) => {
                            const isHovered = hoveredLang?.language === seg.language;
                            return (
                              <path
                                key={idx}
                                d={seg.pathData}
                                fill={seg.color}
                                className="transition-all duration-300 cursor-pointer opacity-90 hover:opacity-100 hover:scale-105"
                                style={{
                                  transformOrigin: '100px 100px',
                                  filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' : 'none',
                                }}
                                onMouseEnter={() => setHoveredLang(seg)}
                                onMouseLeave={() => setHoveredLang(null)}
                                onClick={() => {
                                  setSelectedLanguage(seg.language);
                                  setActiveTab('repos-explorer');
                                }}
                              />
                            );
                          })}
                        </svg>

                        {/* Donut Center Telemetry HUD */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
                          {hoveredLang ? (
                            <div className="space-y-0.5 animate-fade-in">
                              <span
                                className="w-3 h-3 rounded-full inline-block mx-auto mb-1"
                                style={{ backgroundColor: hoveredLang.color }}
                              />
                              <div className="text-sm font-black text-foreground">{hoveredLang.language}</div>
                              <div className="text-xl font-black font-mono text-primary">{hoveredLang.percentage}%</div>
                              <div className="text-[10px] font-mono text-muted-foreground">
                                {((hoveredLang.sizeKB || 0) / 1024).toFixed(1)} MB • {hoveredLang.repoCount} repo{hoveredLang.repoCount > 1 ? 's' : ''}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <div className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">Primary</div>
                              <div className="text-sm font-black text-foreground">
                                {result.languageStats?.[0]?.language || 'Polyglot'}
                              </div>
                              <div className="text-lg font-black font-mono text-emerald-400">
                                {result.languageStats?.[0]?.percentage || 0}%
                              </div>
                              <div className="text-[10px] font-mono text-muted-foreground">
                                {result.languageStats?.length || 0} distinct stacks
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 text-[11px] font-mono text-muted-foreground text-center">
                        <span className="text-primary font-bold">Hint:</span> Click any segment to filter repositories directly
                      </div>
                    </div>

                    {/* Right: Polyglot Diversity Index & Architecture Breakdown */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                              ProofBridge Polyglot Diversity Index
                            </span>
                            <h4 className="text-lg font-black text-foreground mt-0.5">
                              {polyglotScore >= 8.5
                                ? 'Elite Polyglot Systems Architect'
                                : polyglotScore >= 6.5
                                ? 'Multi-Paradigm Full-Stack Engineer'
                                : 'Specialized Single-Stack Developer'}
                            </h4>
                          </div>
                          <div className="text-2xl font-black font-mono text-primary bg-background/80 px-3 py-1.5 rounded-xl border border-primary/30">
                            {polyglotScore} <span className="text-xs text-muted-foreground font-normal">/ 10</span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Evaluates true algorithmic versatility across memory-managed systems engines (Zig/Rust/C), application platforms (TypeScript/Next.js), scientific scripts (Python), and data infrastructure (SQL).
                        </p>

                        <div className="flex items-center gap-2 flex-wrap pt-1">
                          {result.languageStats?.some((l) => ['Zig', 'Rust', 'C', 'C++'].includes(l.language)) && (
                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                              <Cpu className="w-3 h-3" />
                              <span>Systems Hacker (Low-Level)</span>
                            </span>
                          )}
                          {result.languageStats?.some((l) => ['TypeScript', 'JavaScript'].includes(l.language)) && (
                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1">
                              <Code2 className="w-3 h-3" />
                              <span>Full-Stack Web Artisan</span>
                            </span>
                          )}
                          {result.languageStats?.some((l) => ['Python'].includes(l.language)) && (
                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>AI &amp; Compute Pipeline</span>
                            </span>
                          )}
                          {result.languageStats?.some((l) => ['SQL'].includes(l.language)) && (
                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                              <Layers className="w-3 h-3" />
                              <span>Relational Analytics</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Language Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {result.languageStats?.map((lang, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelectedLanguage(lang.language);
                              setActiveTab('repos-explorer');
                            }}
                            className="p-3 rounded-xl bg-background/80 hover:bg-muted/50 border border-border/50 hover:border-primary/50 text-left transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                                style={{ backgroundColor: lang.color }}
                              />
                              <div className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                {lang.language}
                              </div>
                            </div>
                            <div className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center justify-between">
                              <span>{lang.percentage}%</span>
                              <span>{((lang.sizeKB || 0) / 1024).toFixed(1)} MB</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Multi-segment proportional visualizer bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>Proportional Byte-Volume Bar</span>
                      <span>100% of Verified Code Volume</span>
                    </div>
                    <div className="w-full h-4 rounded-full overflow-hidden flex bg-muted shadow-inner">
                      {result.languageStats?.map((lang, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: `${Math.max(lang.percentage, 2)}%`,
                            backgroundColor: lang.color,
                          }}
                          className="h-full transition-all duration-500 hover:opacity-80 cursor-pointer"
                          title={`${lang.language}: ${lang.percentage}% (${((lang.sizeKB || 0) / 1024).toFixed(1)} MB)`}
                          onClick={() => {
                            setSelectedLanguage(lang.language);
                            setActiveTab('repos-explorer');
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Deep LOC & Byte Density Matrix Table */}
                  <div className="pt-4 border-t border-border/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                        <FileCode2 className="w-4 h-4 text-primary" />
                        <span>Detailed Code Volume &amp; Lines of Code (LOC) Density</span>
                      </h4>
                      <span className="text-xs font-mono text-muted-foreground">
                        {result.languageStats?.length} Languages Analyzed
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-border/60">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground font-semibold">
                          <tr>
                            <th className="p-3">Language</th>
                            <th className="p-3">Engineering Paradigm</th>
                            <th className="p-3">Volume Share</th>
                            <th className="p-3">Total Size</th>
                            <th className="p-3">Est. LOC</th>
                            <th className="p-3">Repos</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {result.languageStats?.map((lang, idx) => (
                            <tr key={idx} className="hover:bg-muted/20 transition-colors">
                              <td className="p-3 flex items-center gap-2 font-bold text-foreground">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                                <span>{lang.language}</span>
                              </td>
                              <td className="p-3 text-muted-foreground">
                                <span className="px-2 py-0.5 rounded bg-muted text-[10px]">
                                  {lang.paradigm || 'General Purpose'}
                                </span>
                              </td>
                              <td className="p-3 font-bold text-primary">{lang.percentage}%</td>
                              <td className="p-3 text-muted-foreground">
                                {(lang.sizeKB || 0) > 1024 ? `${((lang.sizeKB || 0) / 1024).toFixed(1)} MB` : `${lang.sizeKB || 0} KB`}
                              </td>
                              <td className="p-3 text-emerald-400 font-bold">
                                {(lang.estimatedLOC || Math.round((lang.sizeKB || 10) * 28)).toLocaleString()}
                              </td>
                              <td className="p-3 text-foreground font-bold">{lang.repoCount}</td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedLanguage(lang.language);
                                    setActiveTab('repos-explorer');
                                  }}
                                  className="text-[11px] text-primary hover:underline font-bold cursor-pointer"
                                >
                                  Filter Repos →
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Visual 2: Detected Frameworks & Architecture Stack */}
                <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span>Verified Technologies &amp; Architecture Patterns</span>
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 font-bold">DETECTED FROM CODE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {result.detectedFrameworks?.map((fw, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-bold text-sm text-foreground">{fw.name}</div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                            {fw.category}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5 text-primary" />
                          <span>Discovered in: <strong>{fw.evidenceRepo}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual 3: Extracted Competencies & Skill Twin Integration */}
                <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-500" />
                      <h3 className="font-bold text-base text-foreground">Extracted Competency Signals</h3>
                    </div>
                    <button
                      onClick={handleImportToPassport}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{importSuccess ? 'Imported to Skill Twin!' : 'Import to Skill Twin'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.discoveredSkills?.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border/60 bg-muted/10 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-foreground">{skill.skillName}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                            LEVEL {skill.attainedLevel}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">
                          Pattern: {skill.astPattern}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono pt-1">
                          <span>{skill.linesAnalyzed.toLocaleString()} lines analyzed</span>
                          <span className="text-emerald-500 font-bold">CONFIDENCE: {skill.confidence}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COMMIT VELOCITY & FORENSICS */}
            {activeTab === 'forensics' && (
              <div className="space-y-8">
                {/* Visual Component 1: 16-Week GitHub-Style Contribution Rhythm & Heatmap */}
                <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>AUTHENTIC COMMIT RHYTHM &amp; STREAK CADENCE</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-500" />
                        <span>GitHub Contribution Heatmap &amp; Cadence Matrix</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        16-week daily contribution matrix distinguishing organic, iterative engineering from single-day copy-paste dump events.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                          result.astScore >= 70
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {result.astScore >= 70 ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>ORGANIC ITERATION VERIFIED</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            <span>BULK DUMP ANOMALY</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* 16-Week Heatmap Matrix Grid */}
                  <div className="p-4 rounded-2xl bg-background/60 border border-border/60 overflow-x-auto">
                    <div className="min-w-[680px]">
                      <div className="flex items-center gap-1.5 justify-between mb-2 text-[10px] font-mono text-muted-foreground px-1">
                        <span>16 Weeks Ago</span>
                        <span>12 Weeks Ago</span>
                        <span>8 Weeks Ago</span>
                        <span>4 Weeks Ago</span>
                        <span>Present Week</span>
                      </div>

                      <div className="flex items-start gap-1.5">
                        {/* Day labels Mon, Wed, Fri */}
                        <div className="flex flex-col justify-between h-[100px] text-[9px] font-mono text-muted-foreground pr-2 pt-0.5">
                          <span>Mon</span>
                          <span>Wed</span>
                          <span>Fri</span>
                          <span>Sun</span>
                        </div>

                        {/* 16 Weeks Columns */}
                        <div className="flex items-center gap-1.5 flex-1">
                          {result.contributionRhythm?.weeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                              {week.days.map((day, dIdx) => {
                                let bgClass = 'bg-muted/40';
                                if (day.level === 1) bgClass = 'bg-emerald-950 border border-emerald-800/40 text-emerald-400';
                                else if (day.level === 2) bgClass = 'bg-emerald-800';
                                else if (day.level === 3) bgClass = 'bg-emerald-600';
                                else if (day.level === 4) bgClass = 'bg-emerald-400';

                                return (
                                  <div
                                    key={dIdx}
                                    title={`${day.date}: ${day.count} commit${day.count === 1 ? '' : 's'}`}
                                    className={`w-full aspect-square rounded-sm transition-all hover:ring-2 hover:ring-primary cursor-pointer ${bgClass}`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Heatmap Legend */}
                      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span>Less</span>
                          <span className="w-2.5 h-2.5 rounded-sm bg-muted/40" />
                          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950" />
                          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800" />
                          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                          <span>More</span>
                        </div>
                        <span className="text-foreground font-bold">
                          {result.contributionRhythm?.totalContributions || 124} commits in last 112 days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rhythm Telemetry Bento */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-background/80 border border-border/60">
                      <div className="text-[10px] uppercase font-mono text-muted-foreground flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Current Streak</span>
                      </div>
                      <div className="text-2xl font-black text-foreground mt-1">
                        {result.contributionRhythm?.currentStreak || 0} <span className="text-xs text-muted-foreground font-normal">days</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Consecutive active days</div>
                    </div>

                    <div className="p-4 rounded-xl bg-background/80 border border-border/60">
                      <div className="text-[10px] uppercase font-mono text-muted-foreground flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Longest Streak</span>
                      </div>
                      <div className="text-2xl font-black text-emerald-400 mt-1">
                        {result.contributionRhythm?.longestStreak || 0} <span className="text-xs text-muted-foreground font-normal">days</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Sustained sprint record</div>
                    </div>

                    <div className="p-4 rounded-xl bg-background/80 border border-border/60">
                      <div className="text-[10px] uppercase font-mono text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>Weekend Ratio</span>
                      </div>
                      <div className="text-2xl font-black text-foreground mt-1">
                        {result.contributionRhythm?.weekendRatio || 0}%
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Passion &amp; hackathon cadence</div>
                    </div>

                    <div className="p-4 rounded-xl bg-background/80 border border-border/60">
                      <div className="text-[10px] uppercase font-mono text-muted-foreground flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-sky-400" />
                        <span>Peak Focus Hours</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-foreground mt-2 line-clamp-1">
                        {result.contributionRhythm?.peakHours || '22:00 - 02:00 UTC'}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Optimal engineering state</div>
                    </div>
                  </div>
                </div>

                {/* Visual Component 2: 6-Axis Developer DNA / Engineering Radar Chart */}
                {radarData && (
                  <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 mb-2">
                          <Compass className="w-3.5 h-3.5" />
                          <span>6-AXIS ENGINEERING RADAR</span>
                        </div>
                        <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                          <Compass className="w-5 h-5 text-primary" />
                          <span>Developer DNA &amp; Capability Radar</span>
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Multi-dimensional skill topology mapping candidate depth across memory safety, web engineering, AST authenticity, modularity, and open source impact.
                        </p>
                      </div>

                      <div className="px-3.5 py-1.5 rounded-xl bg-primary/15 border border-primary/30 text-xs font-mono font-bold text-primary">
                        {result.developerDna?.overallArchetype || 'Systems Architect'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      {/* Radar Chart SVG */}
                      <div className="md:col-span-6 flex items-center justify-center p-4 bg-background/60 border border-border/60 rounded-2xl relative">
                        <svg viewBox="0 0 260 260" className="w-full max-w-[280px] h-auto">
                          {/* Concentric grid webs */}
                          {radarData.gridLevels.map((pts, i) => (
                            <polygon
                              key={i}
                              points={pts}
                              fill="none"
                              stroke="currentColor"
                              strokeDasharray="2,2"
                              className="text-border/60"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Axis rays */}
                          {radarData.dataPoints.map((dp, i) => (
                            <line
                              key={i}
                              x1={radarData.cx}
                              y1={radarData.cy}
                              x2={dp.x}
                              y2={dp.y}
                              stroke="currentColor"
                              className="text-border/40"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Data Polygon */}
                          <polygon
                            points={radarData.polygonPath}
                            fill="rgba(16, 185, 129, 0.25)"
                            stroke="#10b981"
                            strokeWidth="2.5"
                          />

                          {/* Vertex Dots */}
                          {radarData.dataPoints.map((dp, i) => (
                            <circle
                              key={i}
                              cx={dp.x}
                              cy={dp.y}
                              r="4"
                              className="fill-emerald-400 stroke-background stroke-2"
                            />
                          ))}

                          {/* Labels */}
                          {radarData.dataPoints.map((dp, i) => (
                            <text
                              key={i}
                              x={dp.labelX}
                              y={dp.labelY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-[9px] font-mono fill-muted-foreground font-semibold"
                            >
                              {dp.short} ({dp.val}%)
                            </text>
                          ))}
                        </svg>
                      </div>

                      {/* Radar Breakdown Bars */}
                      <div className="md:col-span-6 space-y-3.5">
                        {radarData.dataPoints.map((dp, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="font-bold text-foreground">{dp.label}</span>
                              <span className="text-emerald-400 font-bold">{dp.val}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                style={{ width: `${dp.val}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Commit Cadence Bar Chart */}
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

                {/* Forensics Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Cyclomatic Complexity
                      </h4>
                      <Cpu className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-black text-foreground">
                      {result.forensics?.cyclomaticComplexity || '2.8 (Clean Modular Syntax)'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Lower cyclomatic score indicates clean modular functions, minimal spaghetti branching, and high readability.
                    </p>
                  </div>

                  <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Idiomatic Patterns
                      </h4>
                      <Code2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-black text-foreground">
                      {result.forensics?.idiomaticPatternsCount ?? 28} Verified Idioms
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Detects modern language best practices (e.g., STL algorithms, RAII, custom iterators, and async paradigms).
                    </p>
                  </div>

                  <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Test Coverage Estimation
                      </h4>
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-xl font-black text-foreground">
                      {result.forensics?.testCoverageEstimated || '82% path coverage'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Validates unit test assertion density, mocking frameworks, and continuous integration workflows.
                    </p>
                  </div>
                </div>

                {/* AST Code Inspection Log */}
                <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-4">
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

                  <div className="space-y-4">
                    {filteredSignals.map((signal, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all ${
                          signal.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
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
              </div>
            )}

            {/* TAB 4: RECRUITER & SECURITY DOSSIER */}
            {activeTab === 'recruiter-synthesis' && (
              <div className="space-y-8">
                {/* 1. Recruiter Executive Summary Card */}
                <div className="bg-card border-2 border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-lg space-y-6 relative overflow-hidden bg-gradient-to-br from-emerald-950/20 via-card to-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/40 gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>PROOFBRIDGE AI TECHNICAL BRIEFING • FOR HIRING TEAMS</span>
                      </div>
                      <h3 className="text-2xl font-black text-foreground">
                        Candidate Technical Executive Dossier
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Synthesized from {result.repositoriesAnalyzed} repositories, AST tokens, and cryptographic commit history.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCopyDossier}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md cursor-pointer"
                      >
                        {copiedDossier ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedDossier ? 'Copied Dossier!' : 'Copy Recruiter Briefing'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Core Superpower */}
                    <div className="p-5 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                        <Zap className="w-4 h-4" />
                        <span>Core Engineering Superpower</span>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {result.recruiterSynthesis?.superpower || 'Polyglot systems and full-stack engineering proficiency.'}
                      </p>
                    </div>

                    {/* Authenticity Verdict */}
                    <div className="p-5 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Authenticity &amp; Integrity Finding</span>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {result.recruiterSynthesis?.authenticityVerdict || `${result.astScore}% AST Authenticity Score with verified ownership.`}
                      </p>
                    </div>

                    {/* Recommended Roles */}
                    <div className="p-5 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary font-mono">
                        <Award className="w-4 h-4" />
                        <span>Recommended Role Matches</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.recruiterSynthesis?.recommendedRoles?.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Code-Grounded Technical Interview Questions */}
                <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>TAILORED RECRUITER QUESTIONS</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        <span>AST Code-Grounded Interview Questions</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        These questions are dynamically generated from AST anomalies, memory patterns, and frameworks discovered in candidate repositories.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {result.recruiterSynthesis?.tailoredQuestions?.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-muted/20 border border-border/60 hover:border-primary/40 transition-colors space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-mono font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-foreground leading-relaxed">
                              {q.question}
                            </h4>
                          </div>

                          {q.repoRef && (
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 shrink-0">
                              Ref: {q.repoRef}
                            </span>
                          )}
                        </div>

                        <div className="pl-9 text-xs font-mono text-muted-foreground flex items-center gap-2">
                          <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span><strong>Why ask this:</strong> {q.context}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Security, License & Supply Chain Auditor */}
                <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                        <Shield className="w-3.5 h-3.5" />
                        <span>CODE HYGIENE &amp; SUPPLY CHAIN AUDITOR</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                        <Lock className="w-5 h-5 text-emerald-500" />
                        <span>Security, Credentials &amp; Open Source Compliance</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Automated static scans verifying zero hardcoded credentials, commercial license rights, and supply chain exposure.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div className="px-3 py-1.5 rounded-xl bg-background/80 border border-border/60 text-right">
                        <div className="text-[10px] uppercase text-muted-foreground">License Compliance</div>
                        <div className="text-emerald-400 font-bold">{result.securityAudit?.licenseComplianceRate || 94}% Permissive</div>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-background/80 border border-border/60 text-right">
                        <div className="text-[10px] uppercase text-muted-foreground">Clean Repos</div>
                        <div className="text-foreground font-bold">{result.securityAudit?.cleanRepositoryPercent || 96}% Verified</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.securityAudit?.checks?.map((check, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all ${
                          check.status === 'PASSED'
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : 'bg-rose-500/5 border-rose-500/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {check.status === 'PASSED' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            <span className="font-bold text-sm text-foreground">{check.name}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              check.status === 'PASSED'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {check.status}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {check.finding}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Verified Developer README Badge Generator */}
                <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/40 gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 mb-2">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>PUBLIC VERIFICATION BADGE</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-foreground flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-500" />
                        <span>ProofBridge Verified README Shield Badge</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Embed this dynamic cryptographic verification shield on your GitHub profile README or portfolio website.
                      </p>
                    </div>

                    <button
                      onClick={handleCopyBadge}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md cursor-pointer"
                    >
                      {copiedBadge ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBadge ? 'Copied Markdown!' : 'Copy Markdown Badge'}</span>
                    </button>
                  </div>

                  {/* Live Badge Preview */}
                  <div className="p-6 rounded-2xl bg-background/80 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono font-bold text-muted-foreground mb-2">
                        Live Preview:
                      </div>
                      <div className="inline-flex items-center rounded-md overflow-hidden shadow-md font-mono text-xs font-bold border border-emerald-500/40">
                        <div className="bg-zinc-900 text-zinc-200 px-3 py-1.5 flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5" />
                          <span>ProofBridge</span>
                        </div>
                        <div className="bg-emerald-600 text-white px-3 py-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Level 3 • {result.astScore}% AST</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-muted-foreground text-center sm:text-right">
                      Links directly to tamper-proof verification on ProofBridge Gateway
                    </div>
                  </div>

                  {/* Markdown Snippet */}
                  <div className="p-4 rounded-xl bg-background border border-border/60 font-mono text-xs text-muted-foreground relative group">
                    <pre className="overflow-x-auto text-emerald-400">
                      <code>
                        {`[![ProofBridge Verified](https://img.shields.io/badge/ProofBridge-Verified%20Level%203%20%E2%80%A2%20${result.astScore}%25%20AST-10b981?style=for-the-badge&logo=github)](https://proofbridge.io/verify/${result.auditDigest.slice(0, 16)})`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PITCH SLIDE 5 BENCHMARK */}
            {activeTab === 'pitch-benchmark' && (
              <div className="space-y-8">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Candidate A */}
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
                  </div>

                  {/* Right: Candidate B */}
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
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: W3C CRYPTOGRAPHIC CREDENTIAL */}
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

        {/* DEEP REPOSITORY FORENSIC INSPECTION MODAL */}
        {selectedRepo && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedRepo(null);
            }}
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-zinc-950 border-2 border-zinc-800 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden text-zinc-100 z-10">
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-primary to-amber-500" />

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center gap-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{selectedRepo.language}</span>
                      </span>

                      {selectedRepo.isFork ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          Forked Repository
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Original Codebase
                        </span>
                      )}

                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {selectedRepo.license || 'MIT License'}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 pt-1">
                      <Github className="w-7 h-7 text-primary shrink-0" />
                      <span className="truncate">{selectedRepo.name}</span>
                    </h3>

                    <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                      {selectedRepo.description || 'Public GitHub repository analyzed with ProofBridge Abstract Syntax Tree scanner.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRepo(null)}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 shadow-sm"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Git Clone Quick Command Bar */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 shadow-inner">
                  <div className="flex items-center gap-2.5 truncate">
                    <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-600 select-none">$</span>
                    <span className="truncate select-all text-zinc-200">git clone {selectedRepo.url}.git</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyClone(selectedRepo.url)}
                    className="ml-3 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm border border-zinc-700"
                  >
                    {copiedClone ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Repository Metrics Bento Grid (Solid Zinc-900) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center justify-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span>Stars</span>
                    </div>
                    <div className="text-xl font-black text-amber-400 mt-1 font-mono">
                      {selectedRepo.stars}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center justify-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-primary" />
                      <span>Forks</span>
                    </div>
                    <div className="text-xl font-black text-white mt-1 font-mono">
                      {selectedRepo.forks}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center justify-center gap-1">
                      <HardDrive className="w-3.5 h-3.5 text-sky-400" />
                      <span>Code Size</span>
                    </div>
                    <div className="text-xl font-black text-white mt-1 font-mono">
                      {(selectedRepo.sizeKB || 0) > 1024
                        ? `${((selectedRepo.sizeKB || 0) / 1024).toFixed(1)} MB`
                        : `${selectedRepo.sizeKB || 0} KB`}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono text-zinc-400 flex items-center justify-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Watchers</span>
                    </div>
                    <div className="text-xl font-black text-white mt-1 font-mono">
                      {selectedRepo.watchers || selectedRepo.stars || 0}
                    </div>
                  </div>
                </div>

                {/* AST Logic & Code Density (Solid Zinc-900) */}
                <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-zinc-200">AST Authentic Logic Depth:</span>
                    <span className="text-emerald-400 font-black text-sm">
                      {selectedRepo.authenticLogicPercent}% Human Logic
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 shadow-sm"
                      style={{ width: `${selectedRepo.authenticLogicPercent}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
                    <div>
                      <span>AST Tokens:</span>
                      <strong className="text-zinc-200 ml-1 font-bold">{selectedRepo.astTokensParsed.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>Complexity:</span>
                      <strong className="text-emerald-400 ml-1 font-bold">{selectedRepo.complexityScore || 3.5}/5.0</strong>
                    </div>
                    <div>
                      <span>Branch:</span>
                      <strong className="text-zinc-200 ml-1 font-bold">{selectedRepo.defaultBranch || 'main'}</strong>
                    </div>
                    <div>
                      <span>Issues:</span>
                      <strong className="text-zinc-200 ml-1 font-bold">{selectedRepo.openIssues || 0} open</strong>
                    </div>
                  </div>
                </div>

                {/* Topics & Detected Frameworks */}
                {selectedRepo.tags && selectedRepo.tags.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-zinc-400 uppercase font-mono">
                      Detected Topics &amp; Frameworks:
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedRepo.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono font-semibold shadow-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline & Metadata */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-2 text-zinc-400 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span>Default Primary Branch:</span>
                    <strong className="text-zinc-200">{selectedRepo.defaultBranch || 'main'}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Pushed Activity:</span>
                    <strong className="text-emerald-400">
                      {new Date(selectedRepo.pushedAt || selectedRepo.updatedAt || '').toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Created Date:</span>
                    <strong className="text-zinc-200">
                      {new Date(selectedRepo.createdAt || '').toLocaleDateString()}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Solid Zinc-900, non-transparent) */}
              <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRepo(null)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-200 text-xs font-bold hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer shadow-sm"
                >
                  Close Inspection
                </button>

                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Open Repository on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

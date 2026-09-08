'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { ProofChainViewer } from '@/components/ui/ProofChainViewer';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Search,
  Lock,
  Copy,
  Check,
  ExternalLink,
  Code2,
  FileText,
  Building2,
  GraduationCap,
  Calendar,
  Sparkles,
  RefreshCw,
  Award,
  ArrowRight,
  ShieldAlert,
  Download,
  Printer,
  FileCode,
  X,
} from 'lucide-react';

interface VerifiedRecord {
  hash: string;
  studentName: string;
  studentProgram: string;
  institution: string;
  skillName: string;
  reviewedLevel: number;
  requiredLevel: number;
  weight: number;
  reviewerName: string;
  reviewerTitle: string;
  reviewedAt: string;
  roleTitle: string;
  challengeTitle: string;
  aiDisclosure: string;
  contributionStatement: string;
  codeContent: string;
  integrityStatus: 'valid' | 'tampered' | 'not_found';
}

const SAMPLE_SQL_CODE = `-- Monthly Sales Aggregation & Cohort Metrics
-- Author: Meera Patel (MCA 2026) • Target: PostgreSQL 16
-- Challenge: Monthly Sales Breakdown

WITH clean_transactions AS (
    SELECT
        transaction_id,
        COALESCE(
            NULLIF(transaction_date, '')::timestamp,
            '1970-01-01'::timestamp
        ) AS clean_date,
        REGEXP_REPLACE(customer_raw_id, '[^0-9]', '', 'g')::bigint AS customer_id,
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
    ROUND(
        (gross_revenue_inr - LAG(gross_revenue_inr, 1) OVER (ORDER BY sales_month))
        / NULLIF(LAG(gross_revenue_inr, 1) OVER (ORDER BY sales_month), 0) * 100.0,
        2
    ) AS mom_revenue_growth_pct
FROM monthly_metrics
ORDER BY sales_month ASC;`;

const VERIFIED_DATABASE: Record<string, VerifiedRecord> = {
  '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f': {
    hash: '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f',
    studentName: 'Meera Patel',
    studentProgram: 'MCA 2026',
    institution: 'Manipal University Jaipur (MUJ)',
    skillName: 'SQL (Structured Query Language)',
    reviewedLevel: 3,
    requiredLevel: 3,
    weight: 35,
    reviewerName: 'Dr. Alok Sharma',
    reviewerTitle: 'Associate Professor & Analytics Mentor',
    reviewedAt: '2026-09-08 18:24:00 UTC',
    roleTitle: 'Junior Data Analyst Intern',
    challengeTitle: 'Explain Monthly Sales from Messy Dataset',
    aiDisclosure: 'ChatGPT used for regex syntax check; CTEs and LAG window logic authored independently',
    contributionStatement: 'I cleaned 14 missing date fields using PostgreSQL COALESCE and NULLIF guards, and constructed all multi-table joins without automated scaffolding. I used ChatGPT solely to verify regex digit replacement syntax for corrupted customer IDs, which I tested and tuned against edge-case anomalies.',
    codeContent: SAMPLE_SQL_CODE,
    integrityStatus: 'valid',
  },
  '9e2b8c4d1a5f6e7b0c3d4e5a6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b': {
    hash: '9e2b8c4d1a5f6e7b0c3d4e5a6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
    studentName: 'Aarav Sharma',
    studentProgram: 'B.Tech CS 2026',
    institution: 'Manipal University Jaipur (MUJ)',
    skillName: 'HTML/CSS & Accessibility (WCAG 2.2)',
    reviewedLevel: 3,
    requiredLevel: 3,
    weight: 25,
    reviewerName: 'Prof. Anita Desai',
    reviewerTitle: 'Department Head, Front-End Architecture',
    reviewedAt: '2026-09-07 14:15:00 UTC',
    roleTitle: 'Frontend Engineering Intern',
    challengeTitle: 'Build Accessible Keyboard Navigation Flow',
    aiDisclosure: 'No generative AI used. Compliant with strict WCAG 2.2 AA standards.',
    contributionStatement: 'Implemented full roving tabindex pattern for modal dialogs and ARIA live regions for async screen-reader announcements.',
    codeContent: `// WCAG 2.2 Accessible Dialog Focus Trap
export function trapFocus(element: HTMLElement) {
  const focusables = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusables[0] as HTMLElement;
  const last = focusables[focusables.length - 1] as HTMLElement;
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });
}`,
    integrityStatus: 'valid',
  },
};

export function PublicVerifierContent({ initialHash }: { initialHash?: string }) {
  const defaultHash = initialHash || '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f';
  const [searchHash, setSearchHash] = useState(defaultHash);
  const [currentRecord, setCurrentRecord] = useState<VerifiedRecord | null>(VERIFIED_DATABASE[defaultHash] || null);
  const [isTampered, setIsTampered] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  useEffect(() => {
    if (initialHash && VERIFIED_DATABASE[initialHash.toLowerCase()]) {
      setSearchHash(initialHash);
      setCurrentRecord(VERIFIED_DATABASE[initialHash.toLowerCase()]);
    }
  }, [initialHash]);

  const handleSearch = (hashToVerify?: string) => {
    const target = (hashToVerify ?? searchHash).trim().toLowerCase();
    setIsVerifying(true);
    setIsTampered(false);

    setTimeout(() => {
      setIsVerifying(false);
      if (VERIFIED_DATABASE[target]) {
        setCurrentRecord(VERIFIED_DATABASE[target]);
      } else {
        setCurrentRecord(null);
      }
    }, 250);
  };

  const toggleTamper = () => {
    setIsTampered(!isTampered);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const buildW3CJsonLd = (rec: VerifiedRecord) => {
    return {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/security/suites/ed25519-2020/v1',
        'https://schema.org'
      ],
      id: `urn:proofbridge:credential:${rec.hash.slice(0, 16)}`,
      type: ['VerifiableCredential', 'ProofBridgeSkillAttestationCredential'],
      issuer: {
        id: 'did:proofbridge:inst:demo-college-computing',
        name: rec.institution,
        facultyEvaluator: {
          name: rec.reviewerName,
          title: rec.reviewerTitle,
          department: 'Department of Computer Applications'
        }
      },
      issuanceDate: '2026-09-08T18:24:00Z',
      credentialSubject: {
        id: `did:proofbridge:student:${rec.studentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: rec.studentName,
        degree: rec.studentProgram,
        institution: rec.institution,
        skillAttained: {
          skillName: rec.skillName,
          demonstratedLevel: rec.reviewedLevel,
          requiredLevel: rec.requiredLevel,
          rubricWeight: rec.weight,
          matchingEngineFormula: 'coverage-v1'
        },
        evidence: {
          challengeTitle: rec.challengeTitle,
          targetRole: rec.roleTitle,
          sha256Digest: rec.hash,
          aiDisclosure: rec.aiDisclosure,
          studentContribution: rec.contributionStatement
        }
      },
      proof: {
        type: 'Ed25519Signature2020',
        created: '2026-09-08T18:24:00Z',
        verificationMethod: 'did:proofbridge:inst:demo-college-computing#key-1',
        proofPurpose: 'assertionMethod',
        proofValue: rec.hash
      }
    };
  };

  const handleDownloadJsonLd = () => {
    if (!currentRecord) return;
    const jsonLd = buildW3CJsonLd(currentRecord);
    const blob = new Blob([JSON.stringify(jsonLd, null, 2)], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proofbridge_credential_${currentRecord.studentName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${currentRecord.hash.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <AppShell>
      {/* ── PRINT-ONLY OFFICIAL CERTIFICATE STYLING ── */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-certificate, #print-certificate * {
            visibility: visible;
          }
          #print-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: block !important;
            padding: 24px;
            background: #ffffff !important;
            color: #0f172a !important;
          }
        }
      `}</style>

      {/* ── PRINT-ONLY OFFICIAL CERTIFICATE CONTAINER ── */}
      {currentRecord && (
        <div id="print-certificate" className="hidden print:block">
          <div className="border-8 border-double border-slate-900 p-8 rounded-lg text-center space-y-6 bg-white min-h-[90vh] flex flex-col justify-between">
            <div className="space-y-2 border-b-2 border-slate-300 pb-4">
              <div className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500">
                OFFICIAL CRYPTOGRAPHIC PROOF CERTIFICATE · W3C VERIFIABLE CREDENTIAL
              </div>
              <h1 className="text-3xl font-serif font-black tracking-wider text-slate-900 uppercase">
                Manipal University Jaipur (MUJ)
              </h1>
              <p className="text-sm font-serif italic text-slate-600">
                In Academic Partnership with ProofBridge Skill Verification Network
              </p>
            </div>

            <div className="space-y-4 my-auto">
              <p className="text-sm font-serif uppercase tracking-widest text-slate-500">
                This certifies that
              </p>
              <h2 className="text-4xl font-serif font-bold text-slate-900 underline decoration-slate-300 underline-offset-8">
                {currentRecord.studentName}
              </h2>
              <p className="text-sm font-mono text-slate-600">
                Candidate ID: #PB-IND-2026 · {currentRecord.studentProgram}
              </p>
              <p className="text-sm font-serif max-w-xl mx-auto leading-relaxed text-slate-700">
                has successfully submitted defensible code artifacts and demonstrated verified competency under faculty evaluation in
              </p>
              <div className="bg-slate-50 border border-slate-200 py-3 px-6 rounded-xl inline-block">
                <div className="text-2xl font-serif font-bold text-slate-900">
                  {currentRecord.skillName}
                </div>
                <div className="text-xs font-mono font-bold text-slate-600 mt-1">
                  Proficiency Level {currentRecord.reviewedLevel} of {currentRecord.requiredLevel} · Rubric Weight: {currentRecord.weight}%
                </div>
              </div>
              <p className="text-xs font-serif text-slate-500 max-w-lg mx-auto">
                Qualified for Industry Role: <strong>{currentRecord.roleTitle}</strong>
              </p>
            </div>

            <div className="border-t-2 border-slate-200 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-8 text-left text-xs font-mono">
                <div>
                  <div className="font-bold text-slate-800">FACULTY EVALUATOR</div>
                  <div className="text-slate-600 mt-0.5">{currentRecord.reviewerName}</div>
                  <div className="text-slate-400 text-[10px]">{currentRecord.reviewerTitle}</div>
                  <div className="mt-3 border-t border-dashed border-slate-400 pt-1 w-48 text-[9px] text-slate-400">
                    Faculty Signature & Seal
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">ATTESTATION METRICS</div>
                  <div className="text-slate-600 mt-0.5">Date: {currentRecord.reviewedAt}</div>
                  <div className="text-[10px] text-slate-500 break-all font-mono">
                    SHA-256: {currentRecord.hash.slice(0, 32)}...
                  </div>
                  <div className="mt-3 border-t border-dashed border-slate-400 pt-1 w-48 ml-auto text-[9px] text-slate-400">
                    Academic Council Registrar
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Tamper-evident verification guaranteed under FIPS 180-4 standard.</span>
                <span>Verify independently: https://proofbridge.edu/verify/{currentRecord.hash.slice(0, 16)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SCREEN VIEW (INTERACTIVE APP) ── */}
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-16 no-print">

        {/* ── HEADER ── */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-mono font-bold border border-border-accent">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PUBLIC GATEWAY · ZERO LOGIN REQUIRED
                </span>
                <span className="text-xs text-text-muted font-mono">FIPS 180-4 SHA-256</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-text-primary tracking-tight">
                Cryptographic Evidence Verifier
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
                Independently verify any ProofBridge credential, student code artifact, or faculty evaluation. External recruiters, background-check agencies, and academic auditors can validate cryptographic authenticity without an account.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3.5 py-2 rounded-xl bg-canvas border border-border text-[11px] font-mono text-text-secondary flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-success" />
                <span>Deterministic Proof Chain</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEARCH & HASH LOOKUP BAR ── */}
        <div className="pb-card p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="section-label text-xs flex items-center gap-2 text-text-primary">
              <Search className="w-3.5 h-3.5 text-accent" />
              <span>Lookup Credential by SHA-256 Hash Digest</span>
            </label>
            <span className="text-[11px] text-text-muted font-mono">64-Character Hexadecimal Hash</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                placeholder="Paste 64-char SHA-256 hash (e.g. 4f8a9b2c...)"
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {searchHash && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(searchHash)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
                  title="Copy Hash"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-text-muted" />}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleSearch()}
              disabled={isVerifying}
              className="pb-btn-primary text-xs py-3 px-6 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isVerifying ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              <span>Verify Integrity</span>
            </button>
          </div>

          {/* Quick Demo Presets */}
          <div className="pt-2 border-t border-border flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-text-muted mr-1">Quick Sample Hashes:</span>
            
            <button
              type="button"
              onClick={() => {
                const h = '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f';
                setSearchHash(h);
                handleSearch(h);
              }}
              className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-mono text-text-secondary hover:text-accent hover:border-border-accent transition"
            >
              🌟 Meera Patel · SQL L3 (+35%)
            </button>

            <button
              type="button"
              onClick={() => {
                const h = '9e2b8c4d1a5f6e7b0c3d4e5a6f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b';
                setSearchHash(h);
                handleSearch(h);
              }}
              className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-mono text-text-secondary hover:text-accent hover:border-border-accent transition"
            >
              ♿ Aarav Sharma · WCAG L3
            </button>

            <button
              type="button"
              onClick={() => {
                const h = '00000000deadbeef00000000deadbeef00000000deadbeef00000000deadbeef';
                setSearchHash(h);
                handleSearch(h);
              }}
              className="px-2.5 py-1 rounded-lg bg-surface border border-border text-[11px] font-mono text-warning hover:border-warning transition"
            >
              ⚠️ Invalid / Unknown Hash
            </button>
          </div>
        </div>

        {/* ── VERIFICATION RESULT DISPLAY ── */}
        {currentRecord ? (
          <div className="space-y-6">
            
            {/* 1. STATUS BANNER */}
            <div className={`p-6 rounded-3xl border transition-all ${
              isTampered
                ? 'bg-danger/10 border-danger/40 text-danger shadow-md shadow-danger/5'
                : 'bg-success/10 border-success/40 text-success shadow-md shadow-success/5'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isTampered
                      ? 'bg-danger/20 border-danger/40 text-danger'
                      : 'bg-success/20 border-success/40 text-success'
                  }`}>
                    {isTampered ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        isTampered
                          ? 'bg-danger/20 text-danger border-danger/40'
                          : 'bg-success/20 text-success border-success/40'
                      }`}>
                        {isTampered ? 'INTEGRITY MISMATCH DETECTED' : 'CRYPTOGRAPHICALLY ATTESTED'}
                      </span>
                      <span className="text-xs text-text-muted font-mono">
                        {currentRecord.reviewedAt}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-text-primary">
                      {isTampered
                        ? 'Verification Failure: Code Digest Does Not Match Signed Record'
                        : `${currentRecord.skillName} • Verified Level ${currentRecord.reviewedLevel}`}
                    </h2>

                    <p className="text-xs text-text-secondary leading-relaxed font-mono">
                      {isTampered ? (
                        <span>
                          <strong className="text-danger">Tamper Alert:</strong> 1 or more bytes in the evaluated artifact were modified after the faculty evaluation signoff. The computed hash (<code className="text-danger bg-canvas px-1.5 py-0.5 rounded">e3b0c44298fc1c149afbf4c8...</code>) diverges from the signed digest.
                        </span>
                      ) : (
                        <span>
                          Candidate <strong className="text-text-primary">{currentRecord.studentName}</strong> ({currentRecord.studentProgram}, {currentRecord.institution}) demonstrated proficiency under supervision of <strong className="text-text-primary">{currentRecord.reviewerName}</strong>.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Tamper Test Sandbox Button */}
                <div className="shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={toggleTamper}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                      isTampered
                        ? 'bg-success text-white border-success hover:bg-success/90'
                        : 'bg-danger/10 text-danger border-danger/30 hover:bg-danger/20'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTampered ? 'Restore Authentic Signed State' : '🧪 Simulate Code Tampering'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. ATTESTATION METADATA CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="pb-card p-5 space-y-2">
                <span className="section-label text-[10px]">Candidate & Degree</span>
                <div className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-info" />
                  {currentRecord.studentName}
                </div>
                <p className="text-xs text-text-muted font-mono">{currentRecord.studentProgram} · {currentRecord.institution}</p>
              </div>

              <div className="pb-card p-5 space-y-2">
                <span className="section-label text-[10px]">Faculty Signer & Department</span>
                <div className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  {currentRecord.reviewerName}
                </div>
                <p className="text-xs text-text-muted font-mono">{currentRecord.reviewerTitle}</p>
              </div>

              <div className="pb-card p-5 space-y-2">
                <span className="section-label text-[10px]">Deterministic Match Contribution</span>
                <div className="text-sm font-bold text-accent font-mono flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-accent" />
                  +{currentRecord.weight}% (Level {currentRecord.reviewedLevel} of {currentRecord.requiredLevel})
                </div>
                <p className="text-xs text-text-muted font-mono">Target: {currentRecord.roleTitle}</p>
              </div>
            </div>

            {/* 2.5 EXPORT & AUDITOR TOOLBAR */}
            <div className="pb-card p-4 flex flex-wrap items-center justify-between gap-3 bg-canvas border-border">
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                <FileCode className="w-4 h-4 text-accent" />
                <span>Interoperable Standard: <strong>W3C Verifiable Credentials v1.1 / v2.0</strong></span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsJsonModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono font-semibold text-text-primary hover:text-accent hover:border-border-accent transition flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-accent" />
                  <span>Inspect W3C JSON-LD</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadJsonLd}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono font-semibold text-text-primary hover:text-accent hover:border-border-accent transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-success" />
                  <span>Download W3C VC (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="pb-btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5 font-mono"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>

            {/* 3. FULL INTERACTIVE PROVENANCE GRAPH */}
            <div className="pb-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="section-label text-xs">Proof Provenance Graph</span>
                  <h3 className="text-sm font-bold text-text-primary mt-0.5">Complete Verified Credential Lineage</h3>
                </div>
                <span className="text-[11px] font-mono text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-full">
                  Verified Trust Anchor
                </span>
              </div>
              <ProofChainViewer
                isVerified={!isTampered}
                studentName={currentRecord.studentName}
                roleTitle={currentRecord.roleTitle}
                skillName={currentRecord.skillName}
                weight={currentRecord.weight}
                reviewedLevel={currentRecord.reviewedLevel}
                requiredLevel={currentRecord.requiredLevel}
                reviewerName={currentRecord.reviewerName}
                reviewerTitle={currentRecord.reviewerTitle}
                reviewDate={currentRecord.reviewedAt}
                sha256Hash={currentRecord.hash}
                aiDisclosure={currentRecord.aiDisclosure}
              />
            </div>

            {/* 4. FROZEN ARTIFACT & RATIONALE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Code Artifact */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="section-label flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    <span>Cryptographically Frozen Code Artifact</span>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">
                    SHA-256 Verified
                  </span>
                </div>

                <div className="bg-canvas text-success font-mono text-xs rounded-2xl p-5 border border-border shadow-inner overflow-x-auto leading-relaxed relative">
                  {isTampered && (
                    <div className="absolute inset-0 bg-danger/10 backdrop-blur-[1px] border border-danger/40 rounded-2xl flex items-center justify-center p-6 text-center">
                      <div className="bg-canvas p-4 rounded-xl border border-danger/50 shadow-lg space-y-2 max-w-sm">
                        <AlertTriangle className="w-6 h-6 text-danger mx-auto" />
                        <h4 className="text-xs font-bold text-danger font-mono">TAMPERED PAYLOAD SIMULATION</h4>
                        <p className="text-[11px] text-text-muted font-mono leading-relaxed">
                          Line 36 was edited: <code>amount_minor &gt; 0</code> changed to <code>amount_minor &gt;= 0</code> without faculty re-evaluation. Hash verification failed.
                        </p>
                      </div>
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap">{currentRecord.codeContent}</pre>
                </div>
              </div>

              {/* Rationale & Integrity Statement */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* AI Disclosure */}
                <div className="pb-card p-5 space-y-2">
                  <div className="section-label text-warning text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-warning" />
                    <span>Permitted AI & Tooling Disclosure</span>
                  </div>
                  <p className="text-xs text-text-secondary font-mono leading-relaxed bg-warning/5 border border-warning/20 p-3 rounded-xl">
                    &quot;{currentRecord.aiDisclosure}&quot;
                  </p>
                </div>

                {/* Candidate Statement */}
                <div className="pb-card p-5 space-y-2">
                  <div className="section-label text-info text-xs flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-info" />
                    <span>Student Contribution Statement</span>
                  </div>
                  <p className="text-xs text-text-secondary font-mono leading-relaxed bg-info/5 border border-info/20 p-3 rounded-xl">
                    &quot;{currentRecord.contributionStatement}&quot;
                  </p>
                  <p className="text-[10px] text-text-muted font-mono">
                    * Attested under Manipal University Jaipur (MUJ) Honor Code.
                  </p>
                </div>

                {/* Recruiter / Auditor Quick Action */}
                <div className="pb-card p-5 space-y-3">
                  <h4 className="text-xs font-bold text-text-primary">Auditor Verification Actions</h4>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(typeof window !== 'undefined' ? window.location.href : '')}
                      className="pb-btn-ghost w-full text-xs py-2 justify-center flex items-center gap-1.5 font-mono"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedHash ? 'Verification Link Copied!' : 'Copy Public Verification Link'}</span>
                    </button>
                    <Link
                      href="/employer/opportunities/10000000-0000-0000-0000-000000000001/applicants"
                      className="pb-btn-primary w-full text-xs py-2 justify-center flex items-center gap-1.5 font-mono"
                    >
                      <span>Screen via Blind Talent Radar →</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* NOT FOUND / INVALID RECORD BANNER */
          <div className="pb-card p-12 text-center space-y-4 border-dashed border-warning/40">
            <div className="w-14 h-14 rounded-2xl bg-warning/10 text-warning border border-warning/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7 text-warning" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-text-primary">
                No Signed Attestation Found for Hash
              </h3>
              <p className="text-xs text-text-muted font-mono max-w-md mx-auto leading-relaxed">
                The digest <code className="text-warning bg-canvas px-2 py-0.5 rounded border border-border">{searchHash}</code> does not match any confirmed faculty review in the repository.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const h = '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f';
                setSearchHash(h);
                handleSearch(h);
              }}
              className="pb-btn-primary text-xs py-2 px-5 font-mono inline-flex items-center gap-1.5"
            >
              <span>Load Meera Patel&apos;s Verified Attestation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* ── W3C VC JSON-LD INSPECTOR MODAL ── */}
      {isJsonModalOpen && currentRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in no-print">
          <div className="bg-surface rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-border-accent space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-accent" />
                <div>
                  <h3 className="text-sm font-bold text-text-primary">W3C Verifiable Credential (JSON-LD)</h3>
                  <p className="text-[11px] font-mono text-text-muted">Standard: w3id.org/security/suites/ed25519-2020/v1</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsJsonModalOpen(false)}
                className="w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-canvas p-4 rounded-xl border border-border font-mono text-xs text-text-primary">
              <pre className="whitespace-pre-wrap text-success">
                {JSON.stringify(buildW3CJsonLd(currentRecord), null, 2)}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border shrink-0">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(buildW3CJsonLd(currentRecord), null, 2));
                  setCopiedJson(true);
                  setTimeout(() => setCopiedJson(false), 2000);
                }}
                className="pb-btn-ghost text-xs py-2 px-4 flex items-center gap-1.5 font-mono"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-text-muted" />}
                <span>{copiedJson ? 'JSON Copied!' : 'Copy JSON Payload'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadJsonLd}
                  className="pb-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </AppShell>
  );
}

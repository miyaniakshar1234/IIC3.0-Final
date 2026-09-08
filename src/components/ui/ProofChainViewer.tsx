'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Code2,
  FileCheck2,
  ShieldCheck,
  Calculator,
  Building2,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Fingerprint,
  Info,
  Copy,
  Check,
  Sparkles,
  Lock
} from 'lucide-react';

export interface ProofChainProps {
  isVerified?: boolean;
  studentName?: string;
  roleTitle?: string;
  skillName?: string;
  weight?: number;
  reviewedLevel?: number;
  requiredLevel?: number;
  reviewerName?: string;
  reviewerTitle?: string;
  reviewDate?: string;
  rationale?: string;
  sha256Hash?: string;
  aiDisclosure?: string;
  className?: string;
  compact?: boolean;
}

export function ProofChainViewer({
  isVerified = false,
  studentName = 'Meera Patel',
  roleTitle = 'Junior Data Analyst Intern',
  skillName = 'SQL (Structured Query Language)',
  weight = 35,
  reviewedLevel = 3,
  requiredLevel = 3,
  reviewerName = 'Dr. Alok Sharma',
  reviewerTitle = 'Associate Professor & Analytics Lead',
  reviewDate = 'Just now',
  rationale = 'Clean LAG/NULLIF window functions, handles null dates gracefully, and trade-offs are well defended in the contribution statement.',
  sha256Hash = '4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f',
  aiDisclosure = 'Assisted by AI for syntax check; core CTE and window logic developed independently',
  className = '',
  compact = false,
}: ProofChainProps) {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const nodes = [
    {
      id: 1,
      step: '01',
      title: 'Role Genome',
      badge: `${weight}% Weight`,
      status: 'complete',
      icon: Briefcase,
      summary: `${skillName} (Req L${requiredLevel})`,
      detailTitle: 'Employer Capability Specification',
      detailContent: (
        <div className="space-y-2 text-xs">
          <p className="text-text-secondary">
            Defined in Role Genome for <strong className="text-text-primary">{roleTitle}</strong> by Sample Analytics Studio.
          </p>
          <div className="bg-surface-raised p-2.5 rounded-lg border border-border font-mono text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-text-muted">Skill ID:</span>
              <span className="text-accent">30000000-0000-0000-0000-000000000001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Required Level:</span>
              <span className="text-text-primary font-bold">Level {requiredLevel} of 4 (Proficient)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Formula Weight:</span>
              <span className="text-accent font-bold">{weight}% of 100% total</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      step: '02',
      title: 'Industry Mission',
      badge: '2 Hours',
      status: 'complete',
      icon: Code2,
      summary: 'Explain Monthly Sales from Messy Dataset',
      detailTitle: 'Bounded Real-World Challenge',
      detailContent: (
        <div className="space-y-2 text-xs">
          <p className="text-text-secondary">
            Time-boxed practical mission attached specifically to the unmet SQL role requirement.
          </p>
          <div className="bg-surface-raised p-2.5 rounded-lg border border-border text-[11px] space-y-1">
            <div><strong className="text-text-primary">Deliverables:</strong> PostgreSQL query with CTE, LAG window aggregation, and divide-by-zero protection.</div>
            <div><strong className="text-text-primary">Evaluation Rubric:</strong> Criterion 60000000-0000-0000-0000-000000000001 (Multi-table aggregation & integrity).</div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      step: '03',
      title: 'Code Evidence',
      badge: 'SHA-256',
      status: 'complete',
      icon: Fingerprint,
      summary: `Hash: ${sha256Hash.slice(0, 10)}...`,
      detailTitle: 'Content-Addressed Frozen Revision',
      detailContent: (
        <div className="space-y-2 text-xs">
          <p className="text-text-secondary">
            Student work submitted by <strong className="text-text-primary">{studentName}</strong> and locked into an immutable revision.
          </p>
          <div className="bg-surface-raised p-2.5 rounded-lg border border-border space-y-2">
            <div>
              <span className="text-text-muted text-[10px] uppercase tracking-wider block">Cryptographic Digest</span>
              <div className="flex items-center justify-between font-mono text-[11px] text-accent mt-0.5 break-all">
                <span>{sha256Hash}</span>
                <button
                  onClick={handleCopyHash}
                  className="ml-2 p-1 hover:bg-surface rounded text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
                  title="Copy SHA-256 Hash"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="border-t border-border/60 pt-1.5">
              <span className="text-text-muted text-[10px] uppercase tracking-wider block">Tool & AI Disclosure</span>
              <span className="text-text-secondary text-[11px] italic">{aiDisclosure}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      step: '04',
      title: 'Human Rubric Review',
      badge: isVerified ? `Level ${reviewedLevel}` : 'Awaiting Review',
      status: isVerified ? 'complete' : 'pending',
      icon: ShieldCheck,
      summary: isVerified ? `${reviewerName} (L${reviewedLevel})` : 'Assigned: Dr. Alok Sharma',
      detailTitle: isVerified ? 'Faculty-Anchored Attainment' : 'Review in Progress',
      detailContent: (
        <div className="space-y-2 text-xs">
          {isVerified ? (
            <>
              <p className="text-text-secondary">
                Evaluated by <strong className="text-text-primary">{reviewerName}</strong> ({reviewerTitle}) on {reviewDate}.
              </p>
              <div className="bg-success/5 border border-success/20 p-2.5 rounded-lg space-y-1 text-[11px]">
                <div className="font-bold text-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Level {reviewedLevel} of 4 Awarded (Proficient)
                </div>
                <p className="text-text-secondary italic">"{rationale}"</p>
              </div>
            </>
          ) : (
            <div className="bg-warning/5 border border-warning/20 p-2.5 rounded-lg space-y-1 text-[11px] text-warning">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Assigned to Dr. Alok Sharma
              </div>
              <p className="text-text-secondary">Awaiting publication against the 4-level anchored rubric.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 5,
      step: '05',
      title: 'Deterministic Math',
      badge: isVerified ? '+35% Leap' : '61% Base',
      status: isVerified ? 'complete' : 'pending',
      icon: Calculator,
      summary: isVerified ? 'Coverage: 61% → 96%' : 'Coverage: 61% (SQL: 0 pts)',
      detailTitle: 'Explainable Matching (coverage-v1)',
      detailContent: (
        <div className="space-y-2 text-xs">
          <p className="text-text-secondary">
            Formula: <code className="bg-surface-raised px-1 py-0.5 rounded font-mono text-accent">contribution = weight × min(reviewed_level / required_level, 1)</code>
          </p>
          <div className="bg-surface-raised p-2.5 rounded-lg border border-border font-mono text-[11px] space-y-1">
            <div className="flex justify-between">
              <span>Spreadsheets (L3/3, W25):</span>
              <span className="text-text-primary font-bold">25 pts</span>
            </div>
            <div className="flex justify-between">
              <span>Analytical Reasoning (L3/3, W24):</span>
              <span className="text-text-primary font-bold">24 pts</span>
            </div>
            <div className="flex justify-between">
              <span>Written Communication (L3/4, W16):</span>
              <span className="text-text-primary font-bold">12 pts</span>
            </div>
            <div className="flex justify-between border-t border-border pt-1">
              <span className="text-accent font-bold">SQL Contribution (W35):</span>
              <span className={isVerified ? 'text-success font-black' : 'text-warning font-bold'}>
                {isVerified ? '35 pts (Level 3 verified)' : '0 pts (Not yet verified)'}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-1 text-xs">
              <span>Total Role Coverage:</span>
              <span className="text-gradient-amber font-black text-sm">
                {isVerified ? '96%' : '61%'}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      step: '06',
      title: 'Institutional Loop',
      badge: isVerified ? 'Deficit −1' : 'Tracking',
      status: isVerified ? 'complete' : 'pending',
      icon: Building2,
      summary: isVerified ? 'Cohort Deficit Closed: 42 → 41' : 'Cohort Deficit: 42 students',
      detailTitle: 'Curriculum & Placement Intelligence',
      detailContent: (
        <div className="space-y-2 text-xs">
          <p className="text-text-secondary">
            Anonymized verified outcome automatically recorded for the <strong className="text-text-primary">MCA 2026</strong> cohort at Manipal University Jaipur (MUJ).
          </p>
          <div className="bg-surface-raised p-2.5 rounded-lg border border-border text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-text-muted">Campus Deficit:</span>
              <span className="text-text-primary font-bold">{isVerified ? '41 of 100 students' : '42 of 100 students'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Curriculum Action:</span>
              <span className="text-accent font-semibold">Informs Next Practical Lab Module</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={`pb-card p-5 space-y-4 border border-border-accent/30 relative overflow-hidden ${className}`}>
      {/* Visual Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent/10 border border-border-accent flex items-center justify-center text-accent">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-text-primary tracking-tight">
                Live Evidence Provenance Chain
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                isVerified
                  ? 'bg-success/10 text-success border-success/30'
                  : 'bg-warning/10 text-warning border-warning/30'
              }`}>
                {isVerified ? '● Cryptographically Anchored' : '○ Review Pending'}
              </span>
            </div>
            <p className="text-[11px] text-text-muted">
              Unbroken audit trail: Employer Requirement → Student Code Hash → Faculty Rubric → Math
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-text-muted flex items-center gap-1.5 self-start sm:self-center">
          <Lock className="w-3 h-3 text-accent" />
          <span>coverage-v1</span>
        </div>
      </div>

      {/* Horizontal Interactive Pipeline */}
      <div className="relative z-10 overflow-x-auto pb-2 pt-1 scrollbar-none">
        <div className="flex items-stretch gap-2 min-w-[720px]">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;
            const isComplete = node.status === 'complete';

            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  onClick={() => setActiveNode(isSelected ? null : node.id)}
                  className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all relative group ${
                    isSelected
                      ? 'bg-accent-soft/30 border-accent shadow-sm ring-1 ring-accent'
                      : isComplete
                      ? 'bg-surface-raised/80 hover:bg-surface-raised border-border hover:border-border-accent/60'
                      : 'bg-surface-raised/40 hover:bg-surface-raised/60 border-border/70 border-dashed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-text-muted">
                      {node.step}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                        isComplete
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-warning/10 text-warning border-warning/20'
                      }`}
                    >
                      {node.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isComplete ? 'text-accent' : 'text-text-muted'
                      }`}
                    />
                    <div className="text-xs font-bold text-text-primary truncate">
                      {node.title}
                    </div>
                  </div>

                  <div className="text-[11px] text-text-secondary truncate">
                    {node.summary}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-text-muted font-mono">
                    <span className="group-hover:text-accent transition-colors">
                      {isSelected ? 'Close ▲' : 'Inspect ▼'}
                    </span>
                    {isComplete ? (
                      <CheckCircle2 className="w-3 h-3 text-success" />
                    ) : (
                      <Clock className="w-3 h-3 text-warning" />
                    )}
                  </div>
                </button>

                {idx < nodes.length - 1 && (
                  <div className="flex items-center justify-center text-text-muted px-0.5">
                    <ChevronRight className="w-3.5 h-3.5 text-border-bright" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Expanded Node Detail Inspector Drawer */}
      {activeNode !== null && (
        <div className="relative z-10 bg-surface-raised p-4 rounded-xl border border-accent/40 animate-fade-in space-y-2.5">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">
                {nodes.find((n) => n.id === activeNode)?.step}
              </span>
              <h4 className="text-xs font-bold text-text-primary">
                {nodes.find((n) => n.id === activeNode)?.detailTitle}
              </h4>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-xs text-text-muted hover:text-text-primary px-2 py-0.5 rounded hover:bg-surface transition-colors"
            >
              ✕ Close
            </button>
          </div>
          <div>{nodes.find((n) => n.id === activeNode)?.detailContent}</div>
        </div>
      )}
    </div>
  );
}

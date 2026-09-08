'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  ArrowLeft,
  Building,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  ShieldCheck,
  Zap,
  Check,
  Fingerprint,
  Target,
} from 'lucide-react';

interface SkillRow {
  skillId: string;
  skillName: string;
  requiredLevel: number;
  reviewedLevel: number | null;
  weight: number;
  contribution: number;
  status: 'demonstrated' | 'partially_demonstrated' | 'not_yet_demonstrated';
}

interface MatchData {
  opportunityId: string;
  opportunityTitle: string;
  employerName: string;
  reviewedCoverage: number;
  skills: SkillRow[];
}

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const [hasSqlReview, setHasSqlReview] = useState(false);
  const [isOperating, setIsOperating] = useState(false);
  const [data, setData] = useState<MatchData | null>(null);
  const [showFormula, setShowFormula] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const loadMatchData = async () => {
    try {
      const res = await fetch(`/api/v1/opportunities/${params.id}/match?student_id=00000000-0000-0000-0000-000000000001`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData({
            opportunityId: json.data.opportunityId,
            opportunityTitle: json.data.opportunity_title,
            employerName: json.data.employer_name,
            reviewedCoverage: json.data.reviewedCoverage,
            skills: json.data.skills,
          });
          setHasSqlReview(Boolean(json.data.has_verified_sql));
        }
      }
    } catch (err) {
      console.error('Failed to load match:', err);
    }
  };

  useEffect(() => {
    loadMatchData();
    const interval = setInterval(loadMatchData, 3000);
    return () => clearInterval(interval);
  }, [params.id]);

  const handleToggleDb = async () => {
    setIsOperating(true);
    try {
      if (hasSqlReview) {
        await fetch('/api/v1/demo/reset', { method: 'POST' });
      } else {
        await fetch('/api/v1/reviews/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submission_id: '80000000-0000-0000-0000-000000000001',
            reviewer_id: '20000000-0000-0000-0000-000000000001',
            overall_level: 3,
            rubric_scores: [
              {
                criterion_id: '60000000-0000-0000-0000-000000000001',
                score: 3,
                rationale: 'Clean deduplication using ROW_NUMBER() window function and proper handling of NULL keys.',
              },
            ],
            qualitative_notes: 'Meera demonstrated solid production-grade data cleansing practices.',
          }),
        });
      }
      await loadMatchData();
    } catch (err) {
      console.error('Error toggling DB in opportunity page:', err);
    } finally {
      setIsOperating(false);
    }
  };

  const coverage = data?.reviewedCoverage ?? (hasSqlReview ? 96 : 61);
  const isHighMatch = coverage >= 90;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">

        {/* Back */}
        <Link href="/student" className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Student Dashboard
        </Link>

        {/* ── OPPORTUNITY HEADER ── */}
        <div className="pb-card p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="pb-badge">
                  <Building className="w-3 h-3 text-accent" />
                  Sample Analytics Studio
                </div>
                <span className="pb-badge pb-badge-accent">
                  <ShieldCheck className="w-3 h-3" />
                  Approved Partner
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-text-primary tracking-tight">
                Junior Data Analyst Intern
              </h1>
            </div>

            {/* Simulation toggle */}
            <div className="bg-canvas p-3 rounded-xl flex flex-col items-start sm:items-end shrink-0 border border-border space-y-1.5">
              <span className="section-label text-[9px]">Live PostgreSQL Ledger</span>
              <button
                onClick={handleToggleDb}
                disabled={isOperating}
                className={`flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-md cursor-pointer ${
                  hasSqlReview
                    ? 'bg-success/10 text-success border border-success/30 shadow-success/10 hover:bg-warning/10 hover:text-warning hover:border-warning/30'
                    : 'pb-btn-primary py-2 px-4 text-xs'
                }`}
                title={hasSqlReview ? 'Click to reset database back to 61% baseline' : 'Click to publish Level 3 review directly to PostgreSQL'}
              >
                {isOperating ? (
                  <span>Syncing DB...</span>
                ) : hasSqlReview ? (
                  <><Check className="w-3.5 h-3.5" /> SQL in DB: 96% Match (Click to Reset)</>
                ) : (
                  <><Zap className="w-3.5 h-3.5" /> Publish Review to PostgreSQL (+35%)</>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-text-muted font-mono pt-2 border-t border-border">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />Jaipur / Hybrid</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />3 Months Term</span>
            <span className="flex items-center gap-1.5 text-success font-bold"><span>₹25,000 / month</span></span>
            <span className="flex items-center gap-1.5 text-warning"><Calendar className="w-3 h-3" />Closes in 30 days</span>
          </div>
        </div>

        {/* ── COVERAGE PANEL ── */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <div className="section-label mb-1.5">Deterministic Engine · coverage-v1</div>
              <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
                Reviewed Role Coverage Score
              </h2>
              <p className="text-xs text-text-muted mt-0.5">Mathematically compiled from accredited faculty rubrics. Zero AI hallucinations.</p>
            </div>
            <div className="flex items-baseline gap-3">
              <span className={`metric-value text-5xl transition-all duration-500 ${isHighMatch ? 'text-success' : 'text-accent'}`}>
                {coverage}%
              </span>
              <span className="text-xs font-semibold text-text-muted font-mono">
                {isHighMatch ? '(Shortlist Ready)' : '(Actionable Gap)'}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-3 bg-canvas rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${isHighMatch ? 'bg-success' : 'bg-accent'}`}
                style={{ width: `${coverage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-text-muted">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>

          {/* Formula toggle */}
          <div className="border-t border-border pt-3">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-accent" />
              How this score is calculated (coverage-v1)
              {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showFormula && (
              <div className="mt-3 p-4 bg-canvas border border-border rounded-xl text-xs space-y-2">
                <div className="font-mono text-[11px] bg-surface p-2.5 border border-border rounded-xl text-accent font-bold">
                  contribution_i = weight_i × min(reviewed_level_i / required_level_i, 1.0)
                </div>
                <p className="text-text-muted leading-relaxed text-[11px]">
                  Every skill contributes strictly up to its weighted ceiling. A student cannot compensate for a missing core requirement by over-performing in others. 100% auditable, transparent, and fair.
                </p>
              </div>
            )}
          </div>

          {/* Per-skill table */}
          <div className="overflow-hidden border border-border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface text-text-muted border-b border-border uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Required Skill</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Verified</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">+Pts</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-text-secondary">
                {data?.skills.map((skill) => (
                  <tr key={skill.skillId} className="hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-4 font-bold text-text-primary">{skill.skillName}</td>
                    <td className="py-3 px-4 font-mono text-text-muted">L{skill.requiredLevel}</td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      {skill.reviewedLevel
                        ? <span className="text-success">L{skill.reviewedLevel}</span>
                        : <span className="text-text-muted">—</span>
                      }
                    </td>
                    <td className="py-3 px-4 font-mono text-text-muted">{skill.weight}%</td>
                    <td className="py-3 px-4 font-bold font-mono text-text-primary">+{skill.contribution}</td>
                    <td className="py-3 px-4">
                      {skill.status === 'demonstrated' && (
                        <span className="inline-flex items-center gap-1 text-success bg-success/10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-success/20">
                          <CheckCircle2 className="w-3 h-3" /> Demonstrated
                        </span>
                      )}
                      {skill.status === 'partially_demonstrated' && (
                        <span className="inline-flex items-center gap-1 text-info bg-info/10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-info/20">
                          <CheckCircle2 className="w-3 h-3" /> Partial
                        </span>
                      )}
                      {skill.status === 'not_yet_demonstrated' && (
                        <span className="inline-flex items-center gap-1 text-warning bg-warning/10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-warning/20">
                          <AlertCircle className="w-3 h-3" /> Gap (35 pts)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
            <p className={`text-xs font-semibold flex items-center gap-1.5 ${isHighMatch ? 'text-success' : 'text-warning'}`}>
              {isHighMatch
                ? <><CheckCircle2 className="w-4 h-4 shrink-0" /> Verified Match Threshold Met (≥ 90%). Eligible for fast-track review.</>
                : <><AlertCircle className="w-4 h-4 shrink-0" /> 35% Gap in SQL. Complete the 2-hour challenge to reach 96%.</>
              }
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {!isHighMatch && (
                <Link href="/challenges/50000000-0000-0000-0000-000000000001" className="pb-btn-ghost text-xs py-2 px-3">
                  Solve SQL Challenge <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              <button
                onClick={() => setIsApplyModalOpen(true)}
                disabled={isApplied}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm ${
                  isApplied ? 'bg-surface text-text-muted border border-border cursor-not-allowed' : 'pb-btn-primary'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                {isApplied ? 'Application Submitted' : 'Submit Evidence Application'}
              </button>
            </div>
          </div>
        </div>

        {/* ── APPLY MODAL ── */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-surface rounded-2xl max-w-md w-full p-6 space-y-4 shadow-lg border border-border-accent">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="text-base font-bold text-text-primary">Confirm Application</h3>
                <button onClick={() => setIsApplyModalOpen(false)} className="p-1 rounded-lg text-text-muted hover:text-text-primary">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-text-secondary space-y-3">
                <p>You are applying to <strong className="text-text-primary">Junior Data Analyst Intern</strong> at <strong className="text-text-primary">Sample Analytics Studio</strong>.</p>
                <div className="bg-canvas p-3.5 rounded-xl border border-border space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Verified Coverage:</span>
                    <span className="font-bold text-text-primary">{coverage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Evidence Snapshot:</span>
                    <span className="text-success font-bold">Tamper-Proof Grant</span>
                  </div>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  The employer will receive your frozen evidence snapshot including verified code and human faculty signatures.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
                <button onClick={() => setIsApplyModalOpen(false)} className="pb-btn-ghost text-xs py-2 px-4">Cancel</button>
                <button onClick={() => { setIsApplied(true); setIsApplyModalOpen(false); }} className="pb-btn-primary text-xs py-2 px-5">
                  Confirm & Send Proof
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

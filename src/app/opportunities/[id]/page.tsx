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
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  ShieldCheck,
  Zap,
  Check
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
  const [data, setData] = useState<MatchData | null>(null);
  const [showFormula, setShowFormula] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Fetch live match coverage from API
    fetch(`/api/v1/opportunities/${params.id}/match?include_sql_review=${hasSqlReview}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setData({
            opportunityId: json.data.opportunityId,
            opportunityTitle: json.data.opportunity_title,
            employerName: json.data.employer_name,
            reviewedCoverage: json.data.reviewedCoverage,
            skills: json.data.skills,
          });
        }
      })
      .catch((err) => console.error('Failed to load match:', err));
  }, [params.id, hasSqlReview]);

  const handleConfirmApply = () => {
    setIsApplied(true);
    setIsApplyModalOpen(false);
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/student"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Student Dashboard</span>
        </Link>

        {/* Opportunity Header Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-800 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                  <Building className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Sample Analytics Studio</span>
                </div>
                <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Approved Partner</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                Junior Data Analyst Intern
              </h1>
            </div>

            {/* Quick Interactive Demo Simulation Toggle */}
            <div className="bg-zinc-50 border border-zinc-200/80 p-3 rounded-xl flex flex-col items-end shrink-0 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Interactive Demo State
              </span>
              <button
                type="button"
                onClick={() => setHasSqlReview(!hasSqlReview)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-xs flex items-center space-x-1.5 ${
                  hasSqlReview
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                {hasSqlReview ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>SQL Reviewed: 96% Match</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Simulate SQL Review (+35%)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-600 border-t border-zinc-100 pt-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>Jaipur / Remote</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span>3 Months Duration</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-zinc-400" />
              <span className="font-semibold text-zinc-900">₹25,000 / month</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>Closes in 30 days</span>
            </div>
          </div>
        </div>

        {/* Coverage Panel & Match Engine */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                Deterministic Fit Engine (coverage-v1)
              </span>
              <h2 className="text-xl font-bold text-zinc-900 mt-0.5">
                Reviewed Coverage Score
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Calculated strictly from human faculty verified rubrics. Zero AI hallucinations.
              </p>
            </div>

            <div className="flex items-baseline space-x-2.5">
              <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight transition-all duration-300 ${
                (data?.reviewedCoverage || 0) >= 90 ? 'text-emerald-600' : 'text-blue-600'
              }`}>
                {data ? `${data.reviewedCoverage}%` : '61%'}
              </span>
              <span className="text-xs font-semibold text-zinc-500">
                {hasSqlReview ? '(Meera: Ready to Apply)' : '(Meera: Actionable Gap)'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-100 rounded-full h-3.5 p-0.5 overflow-hidden border border-zinc-200/60">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                (data?.reviewedCoverage || 0) >= 90
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${data?.reviewedCoverage || 61}%` }}
            />
          </div>

          {/* Formula explanation disclosure */}
          <div className="border-t border-zinc-100 pt-3">
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="text-xs font-semibold text-zinc-600 flex items-center space-x-1.5 hover:text-zinc-900"
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>How this deterministic score is calculated</span>
              {showFormula ? <ChevronUp className="w-3.5 h-3.5 ml-1 text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 ml-1 text-zinc-400" />}
            </button>

            {showFormula && (
              <div className="mt-3 p-4 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs text-zinc-600 space-y-2">
                <div className="font-mono text-[11px] bg-white p-2.5 border border-zinc-200 rounded-lg text-zinc-900 font-bold">
                  contribution_i = weight_i &times; min(reviewed_level_i / required_level_i, 1.0)
                </div>
                <p className="leading-relaxed">
                  Every skill contributes strictly up to its weighted ceiling. A student cannot compensate for a missing core requirement (e.g. SQL = 35%) by over-performing in Spreadsheets. 100% auditable and fair.
                </p>
              </div>
            )}
          </div>

          {/* Per-Skill Table */}
          <div className="overflow-hidden border border-zinc-200/80 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200/80 uppercase tracking-wider font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Required Skill</th>
                  <th className="py-3 px-4">Target Level</th>
                  <th className="py-3 px-4">Verified Proof</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">Contribution</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white font-medium text-zinc-700">
                {data?.skills.map((skill) => (
                  <tr key={skill.skillId} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-zinc-900">
                      {skill.skillName}
                    </td>
                    <td className="py-3.5 px-4">Level {skill.requiredLevel}</td>
                    <td className="py-3.5 px-4 font-semibold">
                      {skill.reviewedLevel ? `Level ${skill.reviewedLevel}` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-500">{skill.weight}%</td>
                    <td className="py-3.5 px-4 font-bold text-zinc-900 font-mono">
                      +{skill.contribution} pts
                    </td>
                    <td className="py-3.5 px-4">
                      {skill.status === 'demonstrated' && (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Demonstrated</span>
                        </span>
                      )}
                      {skill.status === 'partially_demonstrated' && (
                        <span className="inline-flex items-center space-x-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-blue-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Partial</span>
                        </span>
                      )}
                      {skill.status === 'not_yet_demonstrated' && (
                        <span className="inline-flex items-center space-x-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-amber-200">
                          <AlertCircle className="w-3 h-3" />
                          <span>Missing (35 pts)</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action CTA Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
            <div>
              {(data?.reviewedCoverage || 0) >= 90 ? (
                <p className="text-xs text-emerald-700 font-semibold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Match Threshold Met (&ge; 90%). You are eligible for fast-track interview consideration.</span>
                </p>
              ) : (
                <p className="text-xs text-amber-700 font-semibold flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>35% Gap in SQL. Complete the 2-hour scoped challenge to reach 96% eligibility.</span>
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              {!(data?.reviewedCoverage || 0 >= 90) && (
                <Link
                  href="/challenges/50000000-0000-0000-0000-000000000001"
                  className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-semibold text-xs hover:bg-zinc-50 transition"
                >
                  Solve SQL Challenge →
                </Link>
              )}

              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                disabled={isApplied}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-xs flex items-center space-x-1.5 ${
                  isApplied
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isApplied ? 'Application Submitted' : 'Submit Evidence Application'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Application Confirmation */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-zinc-200">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-900">
                  Confirm Application Submission
                </h3>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-zinc-600 space-y-2.5">
                <p>
                  You are applying to <strong>Junior Data Analyst Intern</strong> at <strong>Sample Analytics Studio</strong>.
                </p>
                <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span>Submitted Match Coverage:</span>
                    <span className="font-bold text-zinc-900">{data?.reviewedCoverage || 61}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Evidence Snapshot:</span>
                    <span className="text-emerald-700 font-bold">Tamper-Proof Grant</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400">
                  The employer will receive your frozen evidence snapshot including verified code and human faculty signatures.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmApply}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm"
                >
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

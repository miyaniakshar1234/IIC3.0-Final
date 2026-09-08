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
  ChevronUp
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

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Opportunities</span>
        </Link>

        {/* Opportunity Header */}
        <div className="bg-surface border border-border rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-accent bg-accent-soft px-2.5 py-1 rounded">
                <Building className="w-3.5 h-3.5" />
                <span>Sample Analytics Studio</span>
                <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px]">Approved Employer</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-2">
                Junior Data Analyst Intern
              </h1>
            </div>

            {/* Quick Demo Toggle */}
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex flex-col items-end">
              <span className="text-[11px] font-semibold text-blue-900 mb-1">Interactive Demo State</span>
              <button
                onClick={() => setHasSqlReview(!hasSqlReview)}
                className={`text-xs px-3 py-1.5 rounded font-semibold transition-all ${
                  hasSqlReview
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-accent text-white hover:bg-accent-hover'
                }`}
              >
                {hasSqlReview ? '✓ Simulated: SQL Reviewed (96%)' : 'Simulate Review: Publish SQL Level 3'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-secondary border-t border-border pt-4">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Hybrid • Jaipur / Remote</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>3 Months Duration</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span>₹25,000 / month</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Applications close in 30 days</span>
            </div>
          </div>
        </div>

        {/* Coverage Panel & Match Engine */}
        <div className="bg-surface border border-border rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Your Reviewed Coverage for This Role
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Calculated purely from active, verified human reviews attached to your Evidence Passport.
              </p>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className={`text-4xl font-extrabold tracking-tight transition-all duration-300 ${
                (data?.reviewedCoverage || 0) >= 90 ? 'text-success' : 'text-accent'
              }`}>
                {data ? `${data.reviewedCoverage}%` : '...'}
              </span>
              <span className="text-xs font-semibold text-text-secondary">
                {hasSqlReview ? '(Meera: Ready to Apply)' : '(Meera: Gap Detected)'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                (data?.reviewedCoverage || 0) >= 90 ? 'bg-success' : 'bg-accent'
              }`}
              style={{ width: `${data?.reviewedCoverage || 0}%` }}
            />
          </div>

          {/* Formula explanation disclosure */}
          <div>
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="text-xs font-semibold text-accent flex items-center space-x-1 hover:underline"
            >
              <Info className="w-3.5 h-3.5" />
              <span>How this score is calculated (coverage-v1)</span>
              {showFormula ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
            </button>

            {showFormula && (
              <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md text-xs text-text-secondary space-y-2">
                <div className="font-mono text-[11px] bg-white p-2 border border-gray-200 rounded text-text-primary">
                  contribution_i = weight_i × min(reviewed_level_i / required_level_i, 1.0)
                </div>
                <p>
                  Each skill contributes strictly up to its assigned weight. Skills exceeding the required level cannot compensate for an unrelated missing skill. No black-box AI; 100% transparent and explainable.
                </p>
              </div>
            )}
          </div>

          {/* Per-Skill Table */}
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-text-secondary border-b border-border uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Required Skill</th>
                  <th className="py-3 px-4">Required Level</th>
                  <th className="py-3 px-4">Your Verified Level</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">Contribution</th>
                  <th className="py-3 px-4 text-right">Action / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data?.skills.map((skill) => (
                  <tr key={skill.skillId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-text-primary">
                      {skill.skillName}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      Level {skill.requiredLevel} / 4
                    </td>
                    <td className="py-3 px-4">
                      {skill.reviewedLevel !== null ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Level {skill.reviewedLevel} (Reviewed)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-medium">
                          <AlertCircle className="w-3 h-3" />
                          <span>Not Yet Demonstrated</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-text-secondary">
                      {skill.weight}%
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-text-primary">
                      {skill.contribution}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      {skill.reviewedLevel === null ? (
                        <Link
                          href="/challenges/50000000-0000-0000-0000-000000000001"
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-accent hover:underline"
                        >
                          <span>Take SQL Challenge</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-xs text-text-secondary">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="text-xs text-text-secondary">
              Applying shares selected verified evidence snapshots with <strong>Sample Analytics Studio</strong>.
            </div>

            <button
              className={`w-full sm:w-auto px-6 py-2.5 rounded-md font-semibold text-sm transition-all shadow-sm ${
                (data?.reviewedCoverage || 0) >= 90
                  ? 'bg-success text-white hover:bg-emerald-700'
                  : 'bg-accent text-white hover:bg-accent-hover'
              }`}
            >
              Apply With Evidence Snapshot
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

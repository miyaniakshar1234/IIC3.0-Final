'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge } from '@/components/employer/StatusBadge';
import {
  Briefcase,
  Users,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  IndianRupee,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface OpportunitySummary {
  id: string;
  title: string;
  org_name: string;
  status: 'draft' | 'published' | 'closed';
  work_mode: 'remote' | 'hybrid' | 'onsite';
  location_text: string;
  duration_text: string;
  deadline: string;
  compensation_text: string;
  total_applicants: number;
  reviewed_applicants: number;
  shortlisted_count: number;
  key_skills: string[];
}

const DEMO_OPPORTUNITIES: OpportunitySummary[] = [
  {
    id: '40000000-0000-0000-0000-000000000001',
    title: 'Junior Data Analyst Intern',
    org_name: 'Sample Analytics Studio',
    status: 'published',
    work_mode: 'hybrid',
    location_text: 'Jaipur, Rajasthan',
    duration_text: '3 Months (Oct – Dec 2026)',
    deadline: '2026-09-30T23:59:59Z',
    compensation_text: '₹25,000 / month',
    total_applicants: 6,
    reviewed_applicants: 4,
    shortlisted_count: 1,
    key_skills: ['SQL (L3)', 'Spreadsheets (L3)', 'Communication (L4)', 'Analytical Reasoning (L3)'],
  },
  {
    id: '40000000-0000-0000-0000-000000000002',
    title: 'Frontend Engineering Intern',
    org_name: 'Example Web Lab',
    status: 'published',
    work_mode: 'remote',
    location_text: 'Remote',
    duration_text: '6 Months',
    deadline: '2026-10-15T23:59:59Z',
    compensation_text: '₹30,000 / month',
    total_applicants: 3,
    reviewed_applicants: 2,
    shortlisted_count: 0,
    key_skills: ['HTML/CSS (L3)', 'JavaScript (L3)', 'API Integration (L2)'],
  },
  {
    id: '40000000-0000-0000-0000-000000000003',
    title: 'Associate Business Intelligence Analyst',
    org_name: 'Sample Analytics Studio',
    status: 'draft',
    work_mode: 'onsite',
    location_text: 'Gurugram',
    duration_text: 'Full-Time Placement',
    deadline: '2026-11-01T23:59:59Z',
    compensation_text: '₹8.5 LPA',
    total_applicants: 0,
    reviewed_applicants: 0,
    shortlisted_count: 0,
    key_skills: ['SQL (L4)', 'Tableau/BI (L3)', 'Statistics (L3)'],
  },
];

export default function EmployerOpportunitiesPage() {
  const [opportunities] = useState<OpportunitySummary[]>(DEMO_OPPORTUNITIES);

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="glass-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400">
              <Building className="w-4 h-4 text-blue-400" />
              <span className="font-mono tracking-wide uppercase text-[11px]">Recruiter Workspace • Neha Verma (Sample Analytics Studio)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Active Opportunities & Talent Pipelines
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Screen candidates based on authentic challenge evidence, deterministic rubric scores, and immutable audit trails.
            </p>
          </div>

          <div className="flex items-center space-x-3 relative z-10 shrink-0">
            <button
              onClick={() => alert('Opening Create Opportunity Dialog...')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Role</span>
            </button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Company Opportunities
              </span>
              <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                {opportunities.length} Active
              </span>
            </div>
            <span className="text-xs text-zinc-400 flex items-center space-x-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deterministic matching active (coverage-v1)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="glass-card rounded-2xl border border-white/10 p-6 sm:p-7 shadow-xl hover:border-white/20 transition-all duration-300 space-y-5 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Role Info */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border font-mono ${
                          opp.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-zinc-800/80 text-zinc-400 border-white/10'
                        }`}
                      >
                        {opp.status === 'published' ? '● Published & Accepting' : '○ Draft'}
                      </span>

                      <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider bg-zinc-900 px-3 py-1 rounded-full border border-white/10">
                        {opp.work_mode}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {opp.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>{opp.location_text}</span>
                      </span>
                      <span className="text-zinc-700">•</span>
                      <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold font-sans">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{opp.compensation_text}</span>
                      </span>
                      <span className="text-zinc-700">•</span>
                      <span className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{opp.duration_text}</span>
                      </span>
                      <span className="text-zinc-700">•</span>
                      <span className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Deadline: {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {opp.key_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-zinc-900/90 text-zinc-300 border border-white/10 px-2.5 py-1 rounded-lg font-mono font-medium hover:border-blue-500/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Metrics & CTA */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10">
                    <div className="flex items-center space-x-3 bg-zinc-950/80 border border-white/10 rounded-xl p-3 px-5 text-center shadow-inner">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Applicants</span>
                        <span className="text-lg font-bold text-white font-mono">
                          {opp.total_applicants}
                        </span>
                      </div>
                      <div className="h-7 w-px bg-white/10" />
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Reviewed</span>
                        <span className="text-lg font-bold text-emerald-400 font-mono">
                          {opp.reviewed_applicants}
                        </span>
                      </div>
                      <div className="h-7 w-px bg-white/10" />
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Shortlisted</span>
                        <span className="text-lg font-bold text-blue-400 font-mono">
                          {opp.shortlisted_count}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/employer/opportunities/${opp.id}/applicants`}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] w-full sm:w-auto justify-center"
                    >
                      <Users className="w-4 h-4" />
                      <span>Screen Candidates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

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
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-accent">
              <Building className="w-4 h-4" />
              <span>Recruiter Workspace • Neha Verma (Sample Analytics Studio)</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mt-1">
              Active Opportunities & Talent Pipelines
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Review published roles, track applicants, and screen verified evidence snapshots.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert('Opening Create Opportunity Dialog...')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Role</span>
            </button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Your Company Roles ({opportunities.length})
            </h2>
            <span className="text-xs text-text-secondary">
              Evidence-based applicant matching active
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-surface rounded-xl border border-border p-6 shadow-sm hover:border-gray-300 transition-all space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Role Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                          opp.status === 'published'
                            ? 'bg-emerald-50 text-success border-emerald-200'
                            : 'bg-gray-100 text-text-secondary border-gray-200'
                        }`}
                      >
                        {opp.status === 'published' ? 'Published & Accepting Applications' : 'Draft'}
                      </span>

                      <span className="text-xs text-text-secondary font-medium uppercase tracking-wider bg-gray-100 px-2.5 py-0.5 rounded">
                        {opp.work_mode}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary">
                      {opp.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{opp.location_text}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 font-semibold text-text-primary">
                        <IndianRupee className="w-3.5 h-3.5 text-accent" />
                        <span>{opp.compensation_text}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{opp.duration_text}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Deadline: {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {opp.key_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-accent-soft text-accent border border-blue-200 px-2 py-0.5 rounded font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Metrics & CTA */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-border">
                    <div className="flex items-center space-x-3 bg-canvas border border-border rounded-lg p-2.5 px-4 text-center">
                      <div>
                        <span className="text-[11px] text-text-secondary block">Applicants</span>
                        <span className="text-base font-bold text-text-primary">
                          {opp.total_applicants}
                        </span>
                      </div>
                      <div className="h-6 w-px bg-border" />
                      <div>
                        <span className="text-[11px] text-text-secondary block">Reviewed</span>
                        <span className="text-base font-bold text-success">
                          {opp.reviewed_applicants}
                        </span>
                      </div>
                      <div className="h-6 w-px bg-border" />
                      <div>
                        <span className="text-[11px] text-text-secondary block">Shortlisted</span>
                        <span className="text-base font-bold text-accent">
                          {opp.shortlisted_count}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/employer/opportunities/${opp.id}/applicants`}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md bg-accent text-white text-xs font-semibold hover:bg-accent-hover shadow-sm transition-all"
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

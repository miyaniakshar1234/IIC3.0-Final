'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge } from '@/components/employer/StatusBadge';
import {
  Briefcase,
  Users,
  ArrowRight,
  Clock,
  MapPin,
  IndianRupee,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  BarChart3,
  Target,
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
    id: '40000000-0000-0000-0000-000000000001', title: 'Junior Data Analyst Intern',
    org_name: 'Sample Analytics Studio', status: 'published', work_mode: 'hybrid',
    location_text: 'Jaipur, Rajasthan', duration_text: '3 Months (Oct – Dec 2026)',
    deadline: '2026-09-30T23:59:59Z', compensation_text: '₹25,000 / month',
    total_applicants: 6, reviewed_applicants: 4, shortlisted_count: 1,
    key_skills: ['SQL (L3)', 'Spreadsheets (L3)', 'Communication (L4)', 'Analytical Reasoning (L3)'],
  },
  {
    id: '40000000-0000-0000-0000-000000000002', title: 'Frontend Engineering Intern',
    org_name: 'Example Web Lab', status: 'published', work_mode: 'remote',
    location_text: 'Remote', duration_text: '6 Months',
    deadline: '2026-10-15T23:59:59Z', compensation_text: '₹30,000 / month',
    total_applicants: 3, reviewed_applicants: 2, shortlisted_count: 0,
    key_skills: ['HTML/CSS (L3)', 'JavaScript (L3)', 'API Integration (L2)'],
  },
  {
    id: '40000000-0000-0000-0000-000000000003', title: 'Associate Business Intelligence Analyst',
    org_name: 'Sample Analytics Studio', status: 'draft', work_mode: 'onsite',
    location_text: 'Gurugram', duration_text: 'Full-Time Placement',
    deadline: '2026-11-01T23:59:59Z', compensation_text: '₹8.5 LPA',
    total_applicants: 0, reviewed_applicants: 0, shortlisted_count: 0,
    key_skills: ['SQL (L4)', 'BI Tools (L3)', 'Statistical Analysis (L3)'],
  },
];

const modeStyle: Record<string, string> = {
  remote:  'bg-info/10 text-info border-info/25',
  hybrid:  'bg-accent/10 text-accent border-border-accent',
  onsite:  'bg-warning/10 text-warning border-warning/25',
};

export default function EmployerOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunitySummary[]>(DEMO_OPPORTUNITIES);

  React.useEffect(() => {
    async function loadOpportunities() {
      try {
        const res = await fetch('/api/v1/opportunities', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setOpportunities(json.data);
          }
        }
      } catch (err) {
        console.warn('Could not load live opportunities:', err);
      }
    }
    loadOpportunities();
  }, []);

  const published = opportunities.filter(o => o.status === 'published').length;
  const drafts    = opportunities.filter(o => o.status === 'draft').length;
  const totalApplicants = opportunities.reduce((a, o) => a + o.total_applicants, 0);
  const totalShortlisted = opportunities.reduce((a, o) => a + o.shortlisted_count, 0);

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">

        {/* ── HEADER ── */}
        <div className="pb-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="section-label mb-1">Employer Workspace</div>
            <h1 className="text-2xl font-black text-text-primary">Open Opportunities</h1>
            <p className="text-xs text-text-muted font-mono mt-0.5">Neha Verma · Recruiter · Sample Analytics Studio</p>
          </div>
          <button className="pb-btn-primary text-xs self-start sm:self-center">
            <Plus className="w-3.5 h-3.5" />
            Post New Role
          </button>
        </div>

        {/* ── STAT BENTO ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Active Posts',    value: published,      icon: Briefcase,   color: 'text-success' },
            { label: 'Drafts',          value: drafts,         icon: AlertCircle, color: 'text-warning' },
            { label: 'Total Applicants',value: totalApplicants,icon: Users,       color: 'text-accent'  },
            { label: 'Shortlisted',     value: totalShortlisted,icon: Target,     color: 'text-info'    },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="pb-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="section-label text-[9px]">{label}</span>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className={`metric-value text-3xl ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* ── OPPORTUNITY CARDS ── */}
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="pb-card p-6 space-y-4 hover:border-border-accent transition-all group">
              {/* Row 1: Title + status */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={opp.status} />
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border capitalize ${modeStyle[opp.work_mode]}`}>
                      {opp.work_mode}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-text-primary leading-snug">{opp.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Building className="w-3 h-3" />
                    <span>{opp.org_name}</span>
                  </div>
                </div>
                <Link
                  href={`/employer/opportunities/${opp.id}/applicants`}
                  className="pb-btn-primary shrink-0 text-xs py-2 px-3 group-hover:scale-105"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Applicants</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Row 2: Meta */}
              <div className="flex flex-wrap gap-3 text-[11px] text-text-muted">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location_text}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.duration_text}</span>
                <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{opp.compensation_text}</span>
                <span className="flex items-center gap-1 text-warning"><Calendar className="w-3 h-3" />
                  Closes {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>

              {/* Row 3: Applicant stats + skills */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-border">
                {/* Stats */}
                <div className="flex gap-4 text-xs">
                  <div className="text-center">
                    <div className="metric-value text-xl text-text-primary">{opp.total_applicants}</div>
                    <div className="text-[10px] text-text-muted">Applied</div>
                  </div>
                  <div className="text-center">
                    <div className="metric-value text-xl text-success">{opp.reviewed_applicants}</div>
                    <div className="text-[10px] text-text-muted">Reviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="metric-value text-xl text-accent">{opp.shortlisted_count}</div>
                    <div className="text-[10px] text-text-muted">Shortlisted</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 sm:ml-auto">
                  {opp.key_skills.map((s) => (
                    <span key={s} className="pb-badge text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ProofBridge CTA */}
        <div className="pb-card-accent p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="section-label mb-1">Why ProofBridge?</div>
            <p className="text-xs text-text-secondary max-w-lg">Every applicant score is deterministic — Σ(weight × rubric_level) / total_weight × 100. No ML black box, no keyword games. Pure verified evidence.</p>
          </div>
          <Link href="/opportunities/40000000-0000-0000-0000-000000000001" className="pb-btn-primary shrink-0 text-xs">
            <BarChart3 className="w-3.5 h-3.5" />
            See Score Demo
          </Link>
        </div>

      </div>
    </AppShell>
  );
}

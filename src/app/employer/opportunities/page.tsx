'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import { StatusBadge } from '@/components/employer/StatusBadge';
import { toast } from 'sonner';
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
  Zap,
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

import { useAuth } from '@/context/AuthContext';
import { X, Loader2, Sparkles } from 'lucide-react';

export default function EmployerOpportunitiesPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<OpportunitySummary[]>(DEMO_OPPORTUNITIES);
  const [isLoadingOpps, setIsLoadingOpps] = useState(false);

  // Post modal state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postOrg, setPostOrg] = useState('');
  const [postWorkMode, setPostWorkMode] = useState<'remote' | 'hybrid' | 'onsite'>('hybrid');
  const [postLocation, setPostLocation] = useState('Jaipur, Rajasthan');
  const [postDuration, setPostDuration] = useState('3 Months (Oct – Dec 2026)');
  const [postCompensation, setPostCompensation] = useState('₹25,000 / month');
  const [postDeadline, setPostDeadline] = useState('2026-10-31');
  const [postSkills, setPostSkills] = useState('SQL (L3), Spreadsheets (L3), Analytical Reasoning (L3)');
  const [postStatus, setPostStatus] = useState<'published' | 'draft'>('published');

  React.useEffect(() => {
    async function loadOpportunities() {
      setIsLoadingOpps(true);
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
      } finally {
        setIsLoadingOpps(false);
      }
    }
    loadOpportunities();
  }, []);

  const openPostModal = () => {
    setPostOrg(user?.companyName || 'Sample Analytics Studio');
    setIsPostModalOpen(true);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      toast.error('Role Title is required');
      return;
    }

    setIsPosting(true);
    try {
      const skillsArray = postSkills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        title: postTitle.trim(),
        org_name: postOrg.trim() || user?.companyName || 'Sample Analytics Studio',
        work_mode: postWorkMode,
        location_text: postLocation.trim() || (postWorkMode === 'remote' ? 'Remote' : 'Jaipur, Rajasthan'),
        duration_text: postDuration.trim(),
        compensation_text: postCompensation.trim(),
        deadline: new Date(postDeadline).toISOString(),
        status: postStatus,
        key_skills: skillsArray.length > 0 ? skillsArray : ['SQL (L3)', 'Analytical Reasoning (L3)'],
      };

      const res = await fetch('/api/v1/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setOpportunities(prev => [json.data, ...prev]);
        toast.success('Opportunity Published Successfully!', {
          description: `"${json.data.title}" is now live with deterministic vector matching enabled.`,
        });
        setIsPostModalOpen(false);
        setPostTitle('');
      } else {
        toast.error('Failed to publish opportunity', {
          description: json.error?.message || 'Database transaction error.',
        });
      }
    } catch (err: any) {
      toast.error('Error creating opportunity', { description: err.message });
    } finally {
      setIsPosting(false);
    }
  };

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
            <p className="text-xs text-text-muted font-mono mt-0.5">
              {user?.name || 'Employer'} • Recruiter • {user?.companyName || user?.institutionName || 'Organization'}
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            <button 
              onClick={() => toast.success('Smart Match Engine Running', { description: 'Scanning 4,200 verifiable student profiles based on deterministic vectors...' })}
              className="pb-btn-ghost text-xs border border-accent/30 text-accent hover:bg-accent/10"
            >
              <Zap className="w-3.5 h-3.5" />
              Run Auto-Match
            </button>
            <button 
              onClick={openPostModal}
              className="pb-btn-primary text-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Post New Role
            </button>
          </div>
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
          {opportunities.length === 0 ? (
            <div className="pb-card p-12 text-center flex flex-col items-center justify-center border-dashed">
              <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-border-accent flex items-center justify-center text-accent mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">No Active Opportunities</h3>
              <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
                You haven't posted any roles yet. Use our cryptographic requirement publisher to attract fully-verified talent.
              </p>
              <button 
                onClick={openPostModal}
                className="pb-btn-primary cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Role
              </button>
            </div>
          ) : (
            opportunities.map((opp) => (
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
            ))
          )}
        </div>

        {/* ProofBridge CTA */}
        <div className="pb-card-accent p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="section-label mb-1">Why ProofBridge?</div>
            <p className="text-xs text-text-secondary max-w-lg">Role coverage is deterministic - ∑(weight x min(reviewed level / required level, 1)). No ML ranking and no keyword games.</p>
          </div>
          <Link href="/opportunities/40000000-0000-0000-0000-000000000001" className="pb-btn-primary shrink-0 text-xs">
            <BarChart3 className="w-3.5 h-3.5" />
            See Score Demo
          </Link>
        </div>

        {/* ── POST NEW ROLE MODAL ── */}
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="pb-card max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-border-accent shadow-2xl animate-fade-in my-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-border-accent text-accent text-[11px] font-mono font-bold">
                    <Sparkles className="w-3 h-3" />
                    CRYPTOGRAPHIC REQUIREMENT PUBLISHER
                  </div>
                  <h2 className="text-xl font-black text-text-primary">Publish New Opportunity</h2>
                </div>
                <button 
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Opportunity / Role Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      required
                      placeholder="e.g. Backend Engineering Intern or AI Research Fellow"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Hiring Company / Entity <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={postOrg}
                      onChange={(e) => setPostOrg(e.target.value)}
                      required
                      placeholder="e.g. Sample Analytics Studio"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Work Arrangement
                    </label>
                    <select
                      value={postWorkMode}
                      onChange={(e) => setPostWorkMode(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">On-Site</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Location
                    </label>
                    <input
                      type="text"
                      value={postLocation}
                      onChange={(e) => setPostLocation(e.target.value)}
                      placeholder="e.g. Jaipur, Rajasthan or Remote"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Duration / Engagement
                    </label>
                    <input
                      type="text"
                      value={postDuration}
                      onChange={(e) => setPostDuration(e.target.value)}
                      placeholder="e.g. 3 Months (Oct – Dec 2026)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Compensation / Stipend
                    </label>
                    <input
                      type="text"
                      value={postCompensation}
                      onChange={(e) => setPostCompensation(e.target.value)}
                      placeholder="e.g. ₹25,000 / month or ₹8.5 LPA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={postDeadline}
                      onChange={(e) => setPostDeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Role Genome Capabilities (comma-separated with target level L1-L4)
                    </label>
                    <input
                      type="text"
                      value={postSkills}
                      onChange={(e) => setPostSkills(e.target.value)}
                      placeholder="e.g. SQL (L3), React (L3), Docker (L2), REST APIs (L3)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <p className="text-[11px] text-text-muted mt-1">
                      Our deterministic coverage formula evaluates student portfolios strictly against these verified vector thresholds.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Publish Status
                    </label>
                    <select
                      value={postStatus}
                      onChange={(e) => setPostStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="published">Active / Published</option>
                      <option value="draft">Draft Requisition</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="pb-btn-ghost text-xs px-4 py-2.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPosting}
                    className="pb-btn-primary text-xs px-5 py-2.5 cursor-pointer"
                  >
                    {isPosting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        <span>Publishing to ProofBridge...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        <span>Publish Role Genome</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}

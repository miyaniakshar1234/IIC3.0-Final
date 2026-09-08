'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Download,
  ExternalLink,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface CohortStudent {
  id: string;
  rollNo: string;
  name: string;
  program: string;
  targetRole: string;
  baselineMatch: number;
  potentialMatch: number;
  bottleneckSkill: string;
  currentLevel: number;
  targetLevel: number;
  verifiedCompetencies: string[];
  isExemplar?: boolean;
}

const MCA_2026_ROSTER: CohortStudent[] = [
  {
    id: 's-meera',
    rollNo: 'MCA-2026-042',
    name: 'Meera Patel',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 61,
    potentialMatch: 96,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['Spreadsheets L3', 'Written Comm L3', 'Analytical Reasoning L3'],
    isExemplar: true,
  },
  {
    id: 's-rohan',
    rollNo: 'MCA-2026-018',
    name: 'Rohan Varma',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 61,
    potentialMatch: 96,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['Python L3', 'Spreadsheets L2', 'Comm L4'],
  },
  {
    id: 's-priya',
    rollNo: 'MCA-2026-027',
    name: 'Priya Nair',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 58,
    potentialMatch: 93,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 0,
    targetLevel: 3,
    verifiedCompetencies: ['Spreadsheets L3', 'Comm L3', 'Business Acumen L3'],
  },
  {
    id: 's-ananya',
    rollNo: 'MCA-2026-031',
    name: 'Ananya Iyer',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 65,
    potentialMatch: 100,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['Analytical Reasoning L3', 'Statistics L3', 'Comm L4'],
  },
  {
    id: 's-vikram',
    rollNo: 'MCA-2026-009',
    name: 'Vikram Malhotra',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 61,
    potentialMatch: 96,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['DB Architecture L2', 'Spreadsheets L3', 'Comm L3'],
  },
  {
    id: 's-kavita',
    rollNo: 'MCA-2026-055',
    name: 'Kavita Joshi',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 55,
    potentialMatch: 90,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 0,
    targetLevel: 3,
    verifiedCompetencies: ['Python L2', 'Problem Solving L3', 'Comm L3'],
  },
  {
    id: 's-siddharth',
    rollNo: 'MCA-2026-014',
    name: 'Siddharth Rao',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 63,
    potentialMatch: 98,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['Data Cleaning L3', 'Comm L3', 'Analytical Reasoning L3'],
  },
  {
    id: 's-tanvi',
    rollNo: 'MCA-2026-068',
    name: 'Tanvi Deshmukh',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 59,
    potentialMatch: 94,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['Spreadsheets L3', 'Comm L3', 'Tableau L2'],
  },
  {
    id: 's-harsh',
    rollNo: 'MCA-2026-083',
    name: 'Harshvardhan Jain',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 52,
    potentialMatch: 87,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 0,
    targetLevel: 3,
    verifiedCompetencies: ['Python L3', 'Comm L3', 'Logical Reasoning L2'],
  },
  {
    id: 's-neha',
    rollNo: 'MCA-2026-072',
    name: 'Neha Kulkarni',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 64,
    potentialMatch: 99,
    bottleneckSkill: 'SQL (Structured Query Language)',
    currentLevel: 1,
    targetLevel: 3,
    verifiedCompetencies: ['Statistics L3', 'Comm L4', 'Spreadsheets L3'],
  },
  {
    id: 's-aditya',
    rollNo: 'MCA-2026-011',
    name: 'Aditya Roy',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 88,
    potentialMatch: 88,
    bottleneckSkill: 'None (Aligned)',
    currentLevel: 3,
    targetLevel: 3,
    verifiedCompetencies: ['SQL L3', 'Python L3', 'Comm L3'],
  },
  {
    id: 's-sneha',
    rollNo: 'MCA-2026-005',
    name: 'Sneha Sen',
    program: 'MCA 2026',
    targetRole: 'Junior Data Analyst Intern',
    baselineMatch: 92,
    potentialMatch: 92,
    bottleneckSkill: 'None (Aligned)',
    currentLevel: 3,
    targetLevel: 3,
    verifiedCompetencies: ['SQL L3', 'Spreadsheets L3', 'Comm L4'],
  },
];

interface CohortStudentRosterProps {
  hasVerifiedSql: boolean;
  bootcampScheduled: boolean;
  onScheduleBootcamp: () => void;
}

export function CohortStudentRoster({
  hasVerifiedSql,
  bootcampScheduled,
  onScheduleBootcamp,
}: CohortStudentRosterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'one_skill' | 'ready' | 'enrolled' | 'all'>('one_skill');
  const [isBatchEnrolling, setIsBatchEnrolling] = useState(false);
  const [batchNoticeVisible, setBatchNoticeVisible] = useState(false);

  const handleBatchEnroll = () => {
    setIsBatchEnrolling(true);
    setTimeout(() => {
      setIsBatchEnrolling(false);
      onScheduleBootcamp();
      setBatchNoticeVisible(true);
      toast.success('Batch Enrollment Triggered', {
        description: 'Successfully provisioned 8 virtual SQL lab environments.'
      });
    }, 600);
  };

  const handleExportCsv = () => {
    toast.info('Exporting Deterministic Audit Log', {
      description: 'Generating SHA-256 anchored CSV file...'
    });
    const headers = [
      'Roll Number',
      'Student Name',
      'Program',
      'Target Opportunity',
      'Current Match %',
      'Potential Match %',
      'Deficit Delta',
      'Bottleneck Skill',
      'Current Level',
      'Target Level',
      'Verified Baseline Competencies',
      'Placement Readiness Status',
    ];

    const rows = MCA_2026_ROSTER.map((s) => {
      const isMeeraVerified = s.isExemplar && hasVerifiedSql;
      const currentScore = isMeeraVerified ? s.potentialMatch : s.baselineMatch;
      const status = isMeeraVerified
        ? 'Placement Ready (96% Match Attested)'
        : bootcampScheduled
        ? 'Enrolled in Lab #SQL-B1 (In Progress)'
        : s.currentLevel >= s.targetLevel
        ? 'Placement Ready (Meets Target)'
        : 'One Skill Away (Needs SQL Lab)';

      return [
        s.rollNo,
        `"${s.name}"`,
        `"${s.program}"`,
        `"${s.targetRole}"`,
        currentScore,
        s.potentialMatch,
        `+${s.potentialMatch - currentScore}%`,
        `"${s.bottleneckSkill}"`,
        s.currentLevel,
        s.targetLevel,
        `"${s.verifiedCompetencies.join(', ')}"`,
        `"${status}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `proofbridge_mca2026_placement_readiness_audit.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = MCA_2026_ROSTER.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.bottleneckSkill.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === 'one_skill') {
      return student.potentialMatch - student.baselineMatch > 0;
    }
    if (filterMode === 'ready') {
      const score = (student.isExemplar && hasVerifiedSql) ? student.potentialMatch : student.baselineMatch;
      return score >= 80;
    }
    if (filterMode === 'enrolled') {
      return bootcampScheduled && (student.potentialMatch - student.baselineMatch > 0);
    }
    return true;
  });

  return (
    <div className="pb-card space-y-5 p-6 sm:p-8">
      {/* ── HEADER & BATCH ACTION BAR ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-text-primary tracking-tight">
              Actionable Student Cohort Roster
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-border-accent">
              42 Students One Skill Away
            </span>
          </div>
          <p className="text-xs text-text-muted font-mono mt-0.5">
            Identify specific students who leap from ineligible (61%) to job-ready (&ge;96%) with a single targeted lab.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCsv}
            className="pb-btn-ghost text-xs py-2 px-3.5 flex items-center gap-1.5 font-mono"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span>Export Audit CSV</span>
          </button>

          {!bootcampScheduled ? (
            <button
              type="button"
              onClick={handleBatchEnroll}
              disabled={isBatchEnrolling}
              className="pb-btn-primary text-xs py-2 px-4 flex items-center gap-2 font-mono"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isBatchEnrolling ? 'Enrolling Batch...' : '⚡ Batch Enroll 42 Students in SQL Lab'}</span>
            </button>
          ) : (
            <span className="px-3.5 py-2 rounded-xl bg-success/10 border border-success/30 text-success text-xs font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cohort Enrolled: Batch #SQL-2026-B1</span>
            </span>
          )}
        </div>
      </div>

      {/* ── BATCH ENROLLMENT CONFIRMATION BANNER ── */}
      {batchNoticeVisible && (
        <div className="p-4 rounded-xl bg-success/10 border border-success/30 text-success text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in font-mono">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>
              <strong>Success!</strong> Enrolled 42 MCA students into <em>&quot;PostgreSQL 16 CTEs &amp; Window Functions Lab&quot;</em>. Invitations dispatched with Dr. Alok Sharma as lead reviewer.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setBatchNoticeVisible(false)}
            className="text-[11px] underline text-text-muted hover:text-text-primary self-end sm:self-center"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── SEARCH & FILTER TABS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, roll (e.g. Meera, MCA-2026-042)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-1 bg-canvas p-1 rounded-xl border border-border font-mono text-xs overflow-x-auto">
          {[
            { key: 'one_skill', label: 'One Skill Away (42)' },
            { key: 'ready', label: 'Ready >= 80% (18)' },
            { key: 'enrolled', label: 'Enrolled in Lab (42)' },
            { key: 'all', label: 'All Cohort (100)' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterMode(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterMode === tab.key
                  ? 'bg-surface text-accent font-bold shadow-sm border border-border-accent'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE VIEW ── */}
      <div className="overflow-x-auto border border-border rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] font-mono">
            <tr>
              <th className="px-5 py-3.5">Student &amp; Roll</th>
              <th className="px-5 py-3.5">Target Opportunity</th>
              <th className="px-5 py-3.5">Current Match</th>
              <th className="px-5 py-3.5">Potential Leap</th>
              <th className="px-5 py-3.5">Bottleneck Skill Deficit</th>
              <th className="px-5 py-3.5">Intervention Status</th>
              <th className="px-5 py-3.5 text-right">Evidence Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredStudents.map((student) => {
              const isMeeraVerified = student.isExemplar && hasVerifiedSql;
              const currentMatchScore = isMeeraVerified ? student.potentialMatch : student.baselineMatch;
              const delta = student.potentialMatch - currentMatchScore;

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-surface-hover transition-colors ${
                    student.isExemplar ? 'bg-accent/5' : ''
                  }`}
                >
                  {/* Student & Roll */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center font-bold text-accent text-xs shrink-0">
                        {student.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                          <span>{student.name}</span>
                          {student.isExemplar && (
                            <span className="px-1.5 py-0.2 rounded bg-accent/20 text-accent font-mono text-[9px] font-bold">
                              DEMO HERO
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-text-muted font-mono">
                          {student.rollNo} · {student.program}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Target Opportunity */}
                  <td className="px-5 py-4">
                    <div className="font-semibold text-text-secondary text-xs">
                      {student.targetRole}
                    </div>
                    <div className="text-[10px] text-text-muted font-mono">
                      Sample Analytics Studio
                    </div>
                  </td>

                  {/* Current Match */}
                  <td className="px-5 py-4 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-base font-bold ${
                        currentMatchScore >= 80 ? 'text-success' : 'text-text-primary'
                      }`}>
                        {currentMatchScore}%
                      </span>
                    </div>
                    <div className="text-[10px] text-text-muted">
                      Formula: coverage-v1
                    </div>
                  </td>

                  {/* Potential Leap */}
                  <td className="px-5 py-4 font-mono">
                    {delta > 0 ? (
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-success flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          +{delta}% (to {student.potentialMatch}%)
                        </span>
                        <div className="text-[10px] text-text-muted">
                          1 skill unlocks eligibility
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-text-muted font-mono">
                        Target Met ({currentMatchScore}%)
                      </span>
                    )}
                  </td>

                  {/* Bottleneck Skill Deficit */}
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-text-primary text-xs">
                        {student.bottleneckSkill}
                      </div>
                      <div className="text-[10px] font-mono text-text-muted flex items-center gap-2">
                        <span>Current: <strong>L{isMeeraVerified ? 3 : student.currentLevel}</strong></span>
                        <span>→</span>
                        <span className="text-accent font-bold">Req: L{student.targetLevel}</span>
                      </div>
                    </div>
                  </td>

                  {/* Intervention Status */}
                  <td className="px-5 py-4">
                    {isMeeraVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-success/10 text-success border border-success/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Attainment Verified (96%)
                      </span>
                    ) : bootcampScheduled ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-info/10 text-info border border-info/30">
                        <Sparkles className="w-3 h-3 text-info" />
                        Enrolled in Lab #SQL-B1
                      </span>
                    ) : student.currentLevel >= student.targetLevel ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-success/10 text-success border border-success/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Qualified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-warning/10 text-warning border border-warning/30">
                        <AlertTriangle className="w-3 h-3" />
                        Needs SQL Lab
                      </span>
                    )}
                  </td>

                  {/* Evidence Link */}
                  <td className="px-5 py-4 text-right">
                    {student.isExemplar ? (
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/student/passport"
                          className="text-[11px] font-mono font-semibold text-accent hover:underline flex items-center gap-0.5"
                          title="View Meera's Passport"
                        >
                          <span>Passport</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <Link
                          href="/verify/4f8a9b2c7e1d5a6f8b0c2e4a6d8f0b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f"
                          className="text-[11px] font-mono font-semibold text-success hover:underline flex items-center gap-0.5"
                          title="Public Verification"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    ) : (
                      <span className="text-[10px] text-text-muted font-mono">
                        Profile #PB-MCA-{student.rollNo.slice(-3)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER NOTE ON DETERMINISTIC DATA PIPELINE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-border text-[11px] font-mono text-text-muted">
        <span>Displaying {filteredStudents.length} of 100 students enrolled in MCA 2026</span>
        <span>Deterministic Matching Engine: coverage-v1 · Anchor Rubric Sync</span>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Target
} from 'lucide-react';

export default function StudentDashboard() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border rounded-xl p-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-accent">
              <GraduationCap className="w-4 h-4" />
              <span>Student Workspace • Meera Patel</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mt-1">
              Welcome back, Meera
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Demo College of Computing • Master of Computer Applications (2026)
            </p>
          </div>

          <Link
            href="/student/passport"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-accent-soft text-accent text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <span>Open Evidence Passport</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Priority Action: Your Next Step */}
        <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200/80 rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Your Recommended Next Step</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-xl font-bold text-text-primary">
                Demonstrate SQL for Junior Data Analyst Intern
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                You currently have <strong>61% reviewed coverage</strong> for this role at Sample Analytics Studio.
                Completing this 2-hour scoped SQL challenge will provide the missing evidence required to boost your coverage to <strong>96%</strong>.
              </p>
              <div className="flex items-center space-x-4 text-xs text-text-secondary pt-1">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>~120 Minutes</span>
                </span>
                <span>•</span>
                <span>Rubric: 4 Anchored Criteria</span>
                <span>•</span>
                <span>AI disclosure allowed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <Link
                href="/challenges/50000000-0000-0000-0000-000000000001"
                className="px-5 py-2.5 rounded-md bg-accent text-white font-semibold text-xs text-center hover:bg-accent-hover shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Start Challenge Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/opportunities/40000000-0000-0000-0000-000000000001"
                className="px-4 py-2 rounded-md bg-white border border-border text-text-secondary text-xs text-center font-medium hover:text-text-primary hover:bg-gray-50 transition-all"
              >
                View Role Breakdown
              </Link>
            </div>
          </div>
        </div>

        {/* Evidence Passport Quick Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reviewed Skills Card */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Reviewed Skills</span>
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                3
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                <span className="font-medium text-text-primary">Spreadsheets</span>
                <span className="text-emerald-700 font-semibold">Level 3</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                <span className="font-medium text-text-primary">Written Communication</span>
                <span className="text-emerald-700 font-semibold">Level 3</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="font-medium text-text-primary">Analytical Reasoning</span>
                <span className="text-emerald-700 font-semibold">Level 3</span>
              </div>
            </div>
          </div>

          {/* Pending Submissions */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Awaiting Review</span>
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-xs py-1">
                <div className="font-medium text-text-primary truncate">Monthly Sales Query Task</div>
                <div className="text-[11px] text-text-secondary flex items-center space-x-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Assigned to Dr. Alok Sharma</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Applications */}
          <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Target Opportunities</span>
              <span className="w-6 h-6 rounded-full bg-blue-100 text-accent text-xs font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-xs py-1">
                <div className="font-medium text-text-primary">Junior Data Analyst Intern</div>
                <div className="text-[11px] text-text-secondary">Sample Analytics Studio • 61% Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

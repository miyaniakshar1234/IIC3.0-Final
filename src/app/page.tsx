import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCode,
  Users,
  Building,
  GraduationCap,
  LineChart,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-semibold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IIC 3.0 MUJ — Open Innovation EdTech</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            Connect Industry Requirements to <span className="text-accent">Verifiable Student Proof</span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            ProofBridge replaces resume buzzwords and opaque AI rankings with a transparent, closed-loop workflow:
            employers publish rubric-backed challenges, students demonstrate ability, reviewers verify work, and colleges track cohort gaps.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="px-6 py-3 rounded-md bg-accent text-white font-semibold text-sm hover:bg-accent-hover shadow-sm flex items-center space-x-2 transition-all"
            >
              <span>Explore Demo Opportunity</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/student"
              className="px-6 py-3 rounded-md bg-surface text-text-primary border border-border font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              Enter Student Workspace
            </Link>
          </div>
        </section>

        {/* 4 Role Hubs Grid */}
        <section className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-primary">Explore Workspaces by Persona</h2>
            <p className="text-sm text-text-secondary mt-1">Jump directly into any authorized role perspective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Student Card */}
            <Link
              href="/student"
              className="bg-surface p-6 rounded-lg border border-border hover:border-accent hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-blue-50 text-accent flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-text-primary group-hover:text-accent transition-colors">
                  Student Workspace
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  View your Evidence Passport, identify skill gaps for target roles, and submit bounded tasks with contribution statements.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                <span>View Meera's Profile</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>

            {/* Reviewer Card */}
            <Link
              href="/reviewer/queue"
              className="bg-surface p-6 rounded-lg border border-border hover:border-accent hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-emerald-50 text-success flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-text-primary group-hover:text-accent transition-colors">
                  Reviewer Queue
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Evaluate submitted student work side-by-side with anchored 4-level rubrics. Publish immutable attainments.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                <span>Open Review Queue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>

            {/* Recruiter Card */}
            <Link
              href="/employer/opportunities"
              className="bg-surface p-6 rounded-lg border border-border hover:border-accent hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-text-primary group-hover:text-accent transition-colors">
                  Employer Hub
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Publish opportunities with explicit weighted requirements. Screen candidates by inspecting verified evidence snapshots.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                <span>Manage Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>

            {/* College Card */}
            <Link
              href="/institution/insights"
              className="bg-surface p-6 rounded-lg border border-border hover:border-accent hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-md bg-amber-50 text-warning flex items-center justify-center font-bold">
                  <LineChart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-text-primary group-hover:text-accent transition-colors">
                  College Insights
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Inspect aggregate skill deficits across participating cohorts to design targeted interventions and workshops.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
                <span>View Cohort Gaps</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* The Golden Loop Diagram / Walkthrough Card */}
        <section className="bg-surface border border-border rounded-xl p-8 space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-text-primary">The 6-Step Evidence Loop</h2>
            <p className="text-sm text-text-secondary mt-1">
              Every transition in ProofBridge is auditable, deterministic, and backed by a human reviewer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-xs font-bold text-accent uppercase tracking-wider">Step 1 • Requirements</div>
              <div className="font-semibold text-sm text-text-primary">Weighted Job Profiles</div>
              <p className="text-xs text-text-secondary">
                Employers specify required skills (1–4) and weights totaling 100%. No hidden filter criteria.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-accent uppercase tracking-wider">Step 2 • Gap Identification</div>
              <div className="font-semibold text-sm text-text-primary">61% Baseline Coverage</div>
              <p className="text-xs text-text-secondary">
                Students see what they can already prove and what is missing (e.g. Meera missing SQL = 35 points).
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-accent uppercase tracking-wider">Step 3 • Bounded Challenge</div>
              <div className="font-semibold text-sm text-text-primary">2-Hour Scoped Tasks</div>
              <p className="text-xs text-text-secondary">
                Students submit actual queries or artifacts with a Contribution Statement explaining design decisions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-accent uppercase tracking-wider">Step 4 • Rubric Review</div>
              <div className="font-semibold text-sm text-text-primary">Named Human Assessment</div>
              <p className="text-xs text-text-secondary">
                Assigned reviewers rate work against 4 anchored levels and write rationale. No automated AI grading.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-accent uppercase tracking-wider">Step 5 • Instant Score Leap</div>
              <div className="font-semibold text-sm text-text-primary">Coverage: 61% → 96%</div>
              <p className="text-xs text-text-secondary">
                Review publication atomically creates an attainment, unlocking higher verified role coverage.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-accent uppercase tracking-wider">Step 6 • Informed Shortlist</div>
              <div className="font-semibold text-sm text-text-primary">Evidence-First Hiring</div>
              <p className="text-xs text-text-secondary">
                Recruiter opens the frozen snapshot, inspects the verified SQL proof, and makes an informed shortlist.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

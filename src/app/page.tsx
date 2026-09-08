import Link from 'next/link';
import { AppShell } from '@/components/ui/AppShell';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Users,
  Building,
  GraduationCap,
  LineChart,
  Sparkles,
  Award,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-14 py-4">
        {/* Modern Hero Section */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>IIC 3.0 MUJ • REPLACING RESUME CLAIMS WITH VERIFIABLE WORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Connect Industry Requirements to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Verifiable Student Proof
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            ProofBridge replaces unverified resume claims and black-box AI rankings with an auditable closed-loop workflow:
            employers publish rubric-backed challenges, students demonstrate proof, faculty reviewers rate artifacts, and recruiters hire with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <span>Explore Opportunity Match (61% → 96%)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/student"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-800 border border-slate-200 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              Enter Student Workspace
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-2xl font-black text-slate-900 font-mono">100%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Deterministic Math</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-2xl font-black text-emerald-600 font-mono">0%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">AI Hallucinations</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-2xl font-black text-blue-600 font-mono">4-Level</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Anchored Rubrics</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
              <div className="text-2xl font-black text-indigo-600 font-mono">24</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Relational Tables</div>
            </div>
          </div>
        </section>

        {/* 4 Role Workspaces Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Explore the 4 Persona Workspaces</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Jump directly into any authorized role perspective to test the complete loop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Student Card */}
            <Link
              href="/student"
              className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Candidate Persona</div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                    Student Workspace
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Inspect Evidence Passport, identify target role gaps, and submit bounded tasks with contribution statements.
                </p>
              </div>
              <div className="pt-5 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform border-t border-slate-100 mt-4">
                <span>View Meera's Profile (61%)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Reviewer Card */}
            <Link
              href="/reviewer/queue"
              className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Faculty Persona</div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors mt-0.5">
                    Reviewer Queue
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Evaluate student work artifacts side-by-side with 4-level anchored rubrics and publish immutable attainments.
                </p>
              </div>
              <div className="pt-5 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform border-t border-slate-100 mt-4">
                <span>Evaluate Pending Submissions</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Recruiter Card */}
            <Link
              href="/employer/opportunities"
              className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-violet-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-violet-600 group-hover:text-white transition-all">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">Industry Persona</div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-violet-600 transition-colors mt-0.5">
                    Employer Hub
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Configure weighted requirement profiles and screen candidates with freeze-frame verified evidence snapshots.
                </p>
              </div>
              <div className="pt-5 flex items-center text-xs font-bold text-violet-600 group-hover:translate-x-1 transition-transform border-t border-slate-100 mt-4">
                <span>Manage Opportunities</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* College Card */}
            <Link
              href="/institution/insights"
              className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-amber-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-xs group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <LineChart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Dean / Admin Persona</div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5">
                    College Insights
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Inspect aggregate cohort skill deficits to design targeted academic bootcamps and interventions.
                </p>
              </div>
              <div className="pt-5 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform border-t border-slate-100 mt-4">
                <span>Inspect Cohort Skill Gaps</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* The 6-Step Evidence Loop Card */}
        <section className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60">
              <Zap className="w-3.5 h-3.5" />
              <span>THE GOLDEN LOOP ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              How ProofBridge Eliminates Resume Fraud
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every transition in ProofBridge is auditable, deterministic, and backed by a human reviewer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                1
              </div>
              <div className="font-bold text-sm text-slate-900">Weighted Job Profiles</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Employers specify explicit required proficiency levels (1–4) and weights totaling 100%. No hidden algorithmic black-box filters.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                2
              </div>
              <div className="font-bold text-sm text-slate-900">Deterministic Gap Detection</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Students see exactly what they can already prove (e.g. Meera at 61%) and the missing skill points (SQL = 35 pts).
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                3
              </div>
              <div className="font-bold text-sm text-slate-900">Bounded Challenge Task</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Students submit actual queries or artifacts accompanied by a mandatory Contribution Statement explaining tradeoffs.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                4
              </div>
              <div className="font-bold text-sm text-slate-900">Human Faculty Rubric Review</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Assigned faculty evaluate work against 4 anchored criteria and record justification. Zero unverified automated grading.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                5
              </div>
              <div className="font-bold text-sm text-slate-900">Instant Score Leap (61% → 96%)</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Review publication atomically issues a skill attainment into the student's Evidence Passport, boosting verified coverage.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                6
              </div>
              <div className="font-bold text-sm text-slate-900">Informed Evidence Shortlist</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recruiter opens the frozen applicant snapshot, inspects the verified SQL proof, and makes high-conviction interview offers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

import Link from 'next/link'
import { ShieldCheck, Award, Briefcase, ArrowRight, UserCheck } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      {/* Top Bar */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-extrabold text-text-primary tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-lg">P</span>
            ProofBridge
          </div>
          <Link
            href="/student"
            className="px-4 py-2 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-blue-700 transition"
          >
            Enter Student Workspace →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-bold border border-blue-200">
          <ShieldCheck className="w-4 h-4" />
          IIC 3.0 MUJ — ACADEMIA-INDUSTRY SKILL MAPPING PORTAL
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-text-primary tracking-tight leading-tight">
          Connecting Industry Requirements to <span className="text-accent">Authentic Evidence</span> of Student Ability.
        </h1>

        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          ProofBridge replaces resume claims with transparent human-reviewed work evidence. Deterministic matching math shows students what they can demonstrate and what evidence is missing.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/student"
            className="px-8 py-4 rounded-2xl bg-accent text-white font-bold text-sm hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
          >
            Open Student Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/student/passport"
            className="px-6 py-4 rounded-2xl bg-surface text-text-primary font-bold text-sm hover:bg-canvas border border-border transition flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-accent" />
            Inspect Evidence Passport
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-text-primary text-base">Deterministic Matching</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Matching uses the coverage-v1 formula. Zero AI hallucinations—100% explainable skill weights.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-text-primary text-base">Human Review Integrity</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every skill attainment is attributed to a named human reviewer evaluating an anchored rubric.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">3</div>
            <h3 className="font-bold text-text-primary text-base">Actionable Gap Insights</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Missing evidence is labeled &quot;Not yet demonstrated&quot;, guiding students directly to scoped challenges.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-6 text-center text-xs text-text-secondary">
        ProofBridge • Built for IIC 3.0 MUJ Hackathon • Student Experience Module
      </footer>
    </div>
  )
}

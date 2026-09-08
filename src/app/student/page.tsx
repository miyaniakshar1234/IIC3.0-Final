'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { StudentNav } from '@/components/student/StudentNav'
import { CoverageBar } from '@/components/student/CoverageBar'
import { StatusChip } from '@/components/student/StatusChip'
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  Award,
  BookOpen
} from 'lucide-react'

export default function StudentDashboardPage() {
  const [showCalculation, setShowCalculation] = useState(false)
  const [isEmptyAccount, setIsEmptyAccount] = useState(false)

  // Synthetic Data for Meera (Demo Student)
  const targetOpportunity = {
    id: 'opp-data-analyst-001',
    title: 'Junior Data Analyst Intern',
    employer: 'Sample Analytics Studio',
    currentCoverage: 61,
    unmetSkill: 'SQL',
    unmetSkillWeight: 35,
    requiredLevel: 3,
  }

  const recommendedChallenge = {
    id: 'chl-sql-001',
    title: 'Explain Monthly Sales from Messy Dataset',
    estimatedTime: '2 hours',
    skillCovered: 'SQL (Structured Query Language)',
    weight: 35,
    difficulty: 'Intermediate',
    whyRecommended: 'Covering this 35-weight requirement will raise your reviewed coverage for Junior Data Analyst Intern from 61% to 96%.',
  }

  const recentFeedback = [
    {
      skill: 'Spreadsheets',
      level: 3,
      reviewer: 'Dr. Sharma',
      date: 'Sep 06, 2026',
      challenge: 'Clean and Audit Financial Ledger CSV',
      notes: 'Demonstrates clean formulas, VLOOKUP, and pivot summaries with accurate error checking.',
    },
    {
      skill: 'Written Communication',
      level: 3,
      reviewer: 'Prof. Ananya',
      date: 'Sep 04, 2026',
      challenge: 'Technical Briefing: Database Normalization Tradeoffs',
      notes: 'Clear structural organization and well-justified technical decisions.',
    }
  ]

  const activeApplications = [
    {
      id: 'app-001',
      role: 'Junior Data Analyst Intern',
      company: 'Sample Analytics Studio',
      status: 'submitted',
      statusLabel: 'Application Submitted',
      appliedDate: 'Sep 07, 2026',
      coverageAtApplication: '61%',
    }
  ]

  return (
    <div className="min-h-screen bg-canvas pb-16">
      <StudentNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toggle Empty Account View for testing */}
        <div className="flex items-center justify-between bg-surface px-4 py-2 rounded-lg border border-border text-xs text-text-secondary">
          <span>Demo Account Context: <strong>Meera (MCA 2026)</strong></span>
          <button
            onClick={() => setIsEmptyAccount(!isEmptyAccount)}
            className="text-accent hover:underline font-medium"
          >
            {isEmptyAccount ? 'Switch to Seeded Account (Meera)' : 'Simulate New/Empty Student Account'}
          </button>
        </div>

        {isEmptyAccount ? (
          /* Empty State Banner */
          <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm text-center max-w-2xl mx-auto space-y-4 my-12">
            <div className="w-16 h-16 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">Add Your First Evidence</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              ProofBridge matching is based on verified work, not resume claims. Complete a beginner-friendly challenge to build your Evidence Passport.
            </p>
            <div className="pt-2">
              <Link
                href="/challenges/chl-sql-001"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
              >
                Start Beginner Challenge: Explain Monthly Sales
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Top Section: Your Next Step Hero Banner */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold backdrop-blur-sm border border-blue-400/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  YOUR NEXT STEP FOR MATCHING
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Demonstrate <span className="text-blue-400">SQL</span> to increase your match for {targetOpportunity.title}
                </h1>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Your current reviewed coverage is <span className="font-bold text-white">61%</span>. You hold reviewed attainments in Spreadsheets, Communication, and Reasoning. Completing the SQL challenge will unlock the missing <span className="font-bold text-amber-300">35-weight requirement</span>.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/challenges/${recommendedChallenge.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-sm transition shadow-md"
                  >
                    Start SQL Challenge Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/opportunities/${targetOpportunity.id}`}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition border border-slate-700"
                  >
                    View Role Requirements
                  </Link>
                </div>
              </div>
            </section>

            {/* Middle Grid: Coverage Bar + Recommended Challenge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Column 1 & 2: Coverage Visualizer & Calculation Disclosure */}
              <div className="lg:col-span-2 space-y-6">
                <CoverageBar
                  currentCoverage={targetOpportunity.currentCoverage}
                  targetRoleTitle={targetOpportunity.title}
                  showCalculationToggle={true}
                  onToggleCalculation={() => setShowCalculation(!showCalculation)}
                />

                {/* Calculation Accordion */}
                {showCalculation && (
                  <div className="bg-surface p-5 rounded-xl border border-border shadow-xs space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent" />
                        Formula Breakdown: coverage-v1
                      </h4>
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                        Version 1.0 (Deterministic)
                      </span>
                    </div>

                    <div className="text-xs text-text-secondary space-y-2 leading-relaxed">
                      <p>
                        Role matching evaluates reviewed proficiency levels against target role weights:
                      </p>
                      <div className="p-3 bg-canvas rounded-lg font-mono text-text-primary border border-gray-200 text-xs">
                        contribution_i = weight_i × min(reviewed_level_i / required_level_i, 1)
                      </div>
                    </div>

                    <table className="w-full text-xs text-left">
                      <thead className="bg-canvas text-text-secondary uppercase font-semibold">
                        <tr>
                          <th className="p-2.5">Skill</th>
                          <th className="p-2.5">Req. Level</th>
                          <th className="p-2.5">Reviewed Level</th>
                          <th className="p-2.5">Weight</th>
                          <th className="p-2.5">Contribution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="p-2.5 font-bold text-text-primary">SQL</td>
                          <td className="p-2.5">3</td>
                          <td className="p-2.5 font-semibold text-amber-700">Not demonstrated (0)</td>
                          <td className="p-2.5">35</td>
                          <td className="p-2.5 font-bold text-gray-400">0 pts</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-medium text-text-primary">Spreadsheets</td>
                          <td className="p-2.5">3</td>
                          <td className="p-2.5 text-emerald-700 font-semibold">Level 3</td>
                          <td className="p-2.5">25</td>
                          <td className="p-2.5 font-bold text-emerald-700">25 pts</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-medium text-text-primary">Communication</td>
                          <td className="p-2.5">4</td>
                          <td className="p-2.5 text-emerald-700 font-semibold">Level 3</td>
                          <td className="p-2.5">16</td>
                          <td className="p-2.5 font-bold text-emerald-700">12 pts</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-medium text-text-primary">Analytical Reasoning</td>
                          <td className="p-2.5">3</td>
                          <td className="p-2.5 text-emerald-700 font-semibold">Level 3</td>
                          <td className="p-2.5">24</td>
                          <td className="p-2.5 font-bold text-emerald-700">24 pts</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                      <span>Total Current Reviewed Coverage: <strong>61%</strong></span>
                      <span>After SQL Level 3 Review: <strong className="text-accent text-sm">96%</strong></span>
                    </div>
                  </div>
                )}

                {/* Recommended Challenge Card */}
                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-soft px-2.5 py-1 rounded-md">
                        Recommended Challenge
                      </span>
                      <h3 className="text-xl font-bold text-text-primary mt-2">
                        {recommendedChallenge.title}
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-text-secondary bg-canvas px-3 py-1 rounded-full border border-border">
                      <Clock className="w-3.5 h-3.5" />
                      {recommendedChallenge.estimatedTime}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {recommendedChallenge.whyRecommended}
                  </p>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border gap-4 text-xs">
                    <div className="space-x-4">
                      <span>Skill: <strong className="text-text-primary">{recommendedChallenge.skillCovered}</strong></span>
                      <span>Difficulty: <strong className="text-text-primary">{recommendedChallenge.difficulty}</strong></span>
                    </div>
                    <Link
                      href={`/challenges/${recommendedChallenge.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-blue-700 transition"
                    >
                      Start Challenge Workspace
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Column 3: Recent Feedback & Active Applications */}
              <div className="space-y-6">
                
                {/* Active Applications */}
                <div className="bg-surface p-5 rounded-xl border border-border shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" />
                    Active Applications
                  </h3>

                  <div className="space-y-3">
                    {activeApplications.map((app) => (
                      <div key={app.id} className="p-3.5 rounded-lg border border-border bg-canvas space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-text-primary">{app.role}</h4>
                            <p className="text-xs text-text-secondary">{app.company}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                            {app.statusLabel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-secondary pt-1 border-t border-gray-200">
                          <span>Applied: {app.appliedDate}</span>
                          <span>Coverage Shared: {app.coverageAtApplication}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/student/applications"
                    className="block text-center text-xs font-semibold text-accent hover:underline pt-1"
                  >
                    View All Applications & Timeline →
                  </Link>
                </div>

                {/* Recent Reviewed Feedback */}
                <div className="bg-surface p-5 rounded-xl border border-border shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Recent Human Reviews
                  </h3>

                  <div className="space-y-3">
                    {recentFeedback.map((fb, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg border border-border bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-text-primary">{fb.skill}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                            Level {fb.level} / 4
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary italic">
                          &quot;{fb.notes}&quot;
                        </p>
                        <div className="pt-1">
                          <StatusChip status="reviewed" reviewerName={fb.reviewer} reviewedDate={fb.date} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/student/passport"
                    className="block text-center text-xs font-semibold text-accent hover:underline pt-1"
                  >
                    Open Evidence Passport →
                  </Link>
                </div>

              </div>

            </div>
          </>
        )}

      </main>
    </div>
  )
}

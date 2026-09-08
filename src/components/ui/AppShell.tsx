'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  ClipboardCheck,
  Briefcase,
  Building2,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const workspaces = [
    { name: 'Student', href: '/student', icon: GraduationCap, persona: 'Meera (Candidate)' },
    { name: 'Reviewer Queue', href: '/reviewer/queue', icon: ClipboardCheck, persona: 'Dr. Sharma (Evaluator)' },
    { name: 'Employer Hub', href: '/employer/opportunities', icon: Briefcase, persona: 'Sample Analytics (Recruiter)' },
    { name: 'College Insights', href: '/institution/insights', icon: Building2, persona: 'MUJ Admin (Coordinator)' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner for Hackathon Demo Mode */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2.5 max-w-7xl mx-auto w-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200 tracking-wide">
            IIC 3.0 MUJ FINAL • Open Innovation Track
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            ProofBridge — Authentic Evidence & Deterministic Skill Matching
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <header className="glass-panel border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
                P
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">ProofBridge</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">v1.0</span>
                </div>
                <p className="hidden md:block text-[11px] text-slate-500 font-medium leading-none">
                  Evidence → Attainment → Opportunity
                </p>
              </div>
            </Link>

            {/* Desktop Workspace Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 pl-4 border-l border-slate-200">
              {workspaces.map((ws) => {
                const Icon = ws.icon;
                const isActive = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
                return (
                  <Link
                    key={ws.name}
                    href={ws.href}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{ws.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            {/* Active Persona Pill */}
            <div className="hidden sm:flex items-center space-x-3 bg-slate-50 border border-slate-200/80 rounded-full py-1 px-3">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block leading-tight">Meera Patel</span>
                <span className="text-[10px] text-slate-500 font-medium block leading-tight">MCA 2026 • Demo Student</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-200/60 shadow-xs">
                MP
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 tracking-wider">
              Workspaces & Roles
            </div>
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const isActive = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{ws.name}</span>
                  </div>
                  <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {ws.persona}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content with subtle gradient backdrop */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Modern High-End Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">ProofBridge</span>
            <span>•</span>
            <span>IIC 3.0 MUJ Hackathon Submission</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-medium text-slate-600">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Deterministic Coverage (coverage-v1)</span>
            </span>
            <span>•</span>
            <span>Human-Attributed Attainments</span>
            <span>•</span>
            <span>Tamper-Resistant Proof</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

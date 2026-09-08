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
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const workspaces = [
    { name: 'Student', href: '/student', icon: GraduationCap, persona: 'Meera Patel', role: 'Candidate (MCA)' },
    { name: 'Reviewer Queue', href: '/reviewer/queue', icon: ClipboardCheck, persona: 'Dr. Alok Sharma', role: 'Faculty Evaluator' },
    { name: 'Employer Hub', href: '/employer/opportunities', icon: Briefcase, persona: 'Neha Verma', role: 'Recruiter' },
    { name: 'College Insights', href: '/institution/insights', icon: Building2, persona: 'Prof. Gupta', role: 'College Dean' },
  ];

  // Derive active persona based on current route
  let activePersona = { name: 'Meera Patel', role: 'Student • MCA 2026', initials: 'MP', color: 'from-blue-600 to-indigo-600' };
  if (pathname.startsWith('/reviewer')) {
    activePersona = { name: 'Dr. Alok Sharma', role: 'Faculty Reviewer', initials: 'AS', color: 'from-emerald-600 to-teal-600' };
  } else if (pathname.startsWith('/employer')) {
    activePersona = { name: 'Neha Verma', role: 'Sample Analytics Recruiter', initials: 'NV', color: 'from-violet-600 to-purple-600' };
  } else if (pathname.startsWith('/institution')) {
    activePersona = { name: 'Prof. Gupta', role: 'College Dean & Admin', initials: 'PG', color: 'from-amber-600 to-orange-600' };
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-zinc-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Sleek Floating Glassmorphic Header */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & IIC Badge */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-600 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-bold text-base text-zinc-900 tracking-tight">ProofBridge</span>
                <span className="text-[10px] font-mono font-medium text-zinc-400">v1.0</span>
              </div>
            </Link>

            {/* Micro Hackathon Badge */}
            <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100/80 border border-zinc-200/80 text-[11px] font-medium text-zinc-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-zinc-700">IIC 3.0 MUJ</span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-500">PS-08</span>
            </div>
          </div>

          {/* Center: Linear-style Segmented Workspace Switcher */}
          <nav className="hidden md:flex items-center bg-zinc-100/90 p-1 rounded-xl border border-zinc-200/70 shadow-inner">
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const isActive = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/60'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-zinc-400'}`} />
                  <span>{ws.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Dynamic Persona & Quick Demo Button */}
          <div className="flex items-center space-x-3">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Match Engine (61% → 96%)</span>
            </Link>

            {/* Active Persona Pill */}
            <div className="flex items-center space-x-2.5 bg-white border border-zinc-200/80 rounded-full py-1 pl-3 pr-1 shadow-xs">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-semibold text-zinc-900 block leading-tight">{activePersona.name}</span>
                <span className="text-[10px] font-medium text-zinc-400 block leading-tight">{activePersona.role}</span>
              </div>
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-tr ${activePersona.color} text-white font-bold text-[11px] flex items-center justify-center shadow-xs`}
              >
                {activePersona.initials}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1">
            <div className="text-[10px] font-bold text-zinc-400 uppercase px-3 py-1 tracking-wider">
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
                    isActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{ws.name}</span>
                  </div>
                  <span className={`text-[10px] ${isActive ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {ws.persona}
                  </span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/opportunities/40000000-0000-0000-0000-000000000001"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test Live Match Leap (61% → 96%)</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Modern Minimal Footer */}
      <footer className="border-t border-zinc-200/80 bg-white/80 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zinc-900">ProofBridge</span>
            <span className="text-zinc-300">•</span>
            <span>IIC 3.0 MUJ Final Submission</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-medium text-zinc-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Deterministic Engine (coverage-v1)</span>
            </span>
            <span className="text-zinc-300">•</span>
            <span>Human-Attributed Rubrics</span>
            <span className="text-zinc-300">•</span>
            <span>Tamper-Resistant Proof</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

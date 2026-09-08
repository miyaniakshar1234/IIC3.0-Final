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
  Layers,
  Terminal
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
  let activePersona = { name: 'Meera Patel', role: 'Student • MCA 2026', initials: 'MP', color: 'from-blue-500 to-indigo-500', glow: 'shadow-blue-500/30' };
  if (pathname.startsWith('/reviewer')) {
    activePersona = { name: 'Dr. Alok Sharma', role: 'Faculty Reviewer', initials: 'AS', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/30' };
  } else if (pathname.startsWith('/employer')) {
    activePersona = { name: 'Neha Verma', role: 'Sample Analytics Recruiter', initials: 'NV', color: 'from-violet-500 to-purple-500', glow: 'shadow-violet-500/30' };
  } else if (pathname.startsWith('/institution')) {
    activePersona = { name: 'Prof. Gupta', role: 'College Dean & Admin', initials: 'PG', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/30' };
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-zinc-100 selection:bg-blue-600 selection:text-white relative">
      {/* Background Cyber-Grid & Ambient Lighting */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
      <div className="fixed inset-0 ambient-spotlight pointer-events-none z-0" />

      {/* Sleek Obsidian Floating Glass Header */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 relative z-10">
          {/* Brand Logo & Micro Badge */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-bold text-base text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  ProofBridge
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-400/80 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                  v1.0
                </span>
              </div>
            </Link>

            {/* Hackathon Beacon Pill */}
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-[11px] font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-white">IIC 3.0 MUJ</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">PS-08</span>
            </div>
          </div>

          {/* Center: Linear-style Segmented Workspace Switcher */}
          <nav className="hidden md:flex items-center bg-zinc-900/90 p-1 rounded-xl border border-white/10 shadow-inner">
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const isActive = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm border border-white/15'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                  <span>{ws.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Active Persona Pill & Quick Engine Button */}
          <div className="flex items-center space-x-3">
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Match Engine (61% → 96%)</span>
            </Link>

            {/* Active Persona Pill */}
            <div className="flex items-center space-x-2.5 bg-zinc-900/90 border border-white/10 rounded-full py-1 pl-3 pr-1.5 shadow-xs">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-semibold text-zinc-200 block leading-tight">{activePersona.name}</span>
                <span className="text-[10px] font-medium text-zinc-400 block leading-tight">{activePersona.role}</span>
              </div>
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-tr ${activePersona.color} text-white font-bold text-[11px] flex items-center justify-center shadow-md ${activePersona.glow}`}
              >
                {activePersona.initials}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-zinc-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
            <div className="text-[10px] font-bold text-zinc-500 uppercase px-3 py-1 tracking-wider">
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
                    isActive ? 'bg-zinc-800 text-white border border-white/15' : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span>{ws.name}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {ws.persona}
                  </span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/opportunities/40000000-0000-0000-0000-000000000001"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Test Live Match Leap (61% → 96%)</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Modern High-End Footer */}
      <footer className="border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl py-6 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zinc-300">ProofBridge</span>
            <span className="text-zinc-700">•</span>
            <span>IIC 3.0 MUJ Final Submission</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-medium text-zinc-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-300">Deterministic Engine (coverage-v1)</span>
            </span>
            <span className="text-zinc-700">•</span>
            <span>Human-Attributed Rubrics</span>
            <span className="text-zinc-700">•</span>
            <span>Tamper-Resistant Proof</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

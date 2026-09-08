'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  GraduationCap,
  ClipboardCheck,
  Briefcase,
  Building2,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Layers,
  Sun,
  Moon,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme || theme) === 'dark' : true;
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const workspaces = [
    { name: 'Student',          href: '/student',               icon: GraduationCap, persona: 'Meera Patel',    role: 'Candidate · MCA 2026' },
    { name: 'Reviewer',         href: '/reviewer/queue',        icon: ClipboardCheck, persona: 'Dr. Alok Sharma', role: 'Faculty Evaluator' },
    { name: 'Employer',         href: '/employer/opportunities', icon: Briefcase,      persona: 'Neha Verma',     role: 'Lead Recruiter' },
    { name: 'College Insights', href: '/institution/insights',   icon: Building2,      persona: 'Prof. Gupta',    role: 'College Dean & Admin' },
  ];

  let persona = { name: 'Meera Patel',     role: 'Student · MCA 2026',          initials: 'MP', ring: 'ring-info/40',    dot: 'bg-info' };
  if (pathname.startsWith('/reviewer'))    persona = { name: 'Dr. Alok Sharma', role: 'Faculty Reviewer · CS Dept',  initials: 'AS', ring: 'ring-success/40', dot: 'bg-success' };
  else if (pathname.startsWith('/employer'))  persona = { name: 'Neha Verma',       role: 'Sample Analytics Recruiter',  initials: 'NV', ring: 'ring-accent/40',  dot: 'bg-accent' };
  else if (pathname.startsWith('/institution')) persona = { name: 'Prof. Gupta',   role: 'College Dean & Placement Dir', initials: 'PG', ring: 'ring-warning/40', dot: 'bg-warning' };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary relative">
      {/* Architectural Grid, Matrix Dots & Soft Ambient Glow Orbs */}
      <div className="bg-grid-pattern" />
      <div className="matrix-dots" />
      <div className="ambient-glow-orbs">
        <div className="ambient-glow-orb-1" />
        <div className="ambient-glow-orb-2" />
        <div className="ambient-glow-orb-3" />
      </div>

      {/* ── HEADER ── */}
      <header className="pb-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4 relative z-10">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-accent group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4 text-[var(--text-inverse)]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-[15px] text-text-primary tracking-tight group-hover:text-accent transition-colors">
                  ProofBridge
                </span>
                <span className="text-[10px] font-mono font-bold text-accent bg-accent-soft px-1.5 py-0.5 rounded border border-border-accent">
                  v1.0
                </span>
              </div>
            </Link>

            {/* Live beacon */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-medium text-text-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              <span className="text-text-primary font-semibold">IIC 3.0 MUJ</span>
              <span className="text-text-muted">·</span>
              <span className="font-mono text-accent">PS-08</span>
            </div>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-0.5 bg-surface p-1 rounded-xl border border-border shadow-sm">
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const active = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-accent' : 'text-text-muted'}`} />
                  <span>{ws.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Match engine CTA */}
            <Link
              href="/opportunities/40000000-0000-0000-0000-000000000001"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-accent bg-accent-soft hover:bg-accent/20 border border-border-accent transition-all shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="font-mono">61% → 96%</span>
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:text-accent hover:border-border-accent transition-all cursor-pointer"
              aria-label="Toggle theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark
                ? <Sun className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />
              }
            </button>

            {/* Persona pill */}
            <div className={`flex items-center gap-2 bg-surface border border-border rounded-full py-1 pl-3 pr-1 ring-1 ${persona.ring}`}>
              <div className="text-right hidden sm:block">
                <span className="text-[11px] font-semibold text-text-primary block leading-tight">{persona.name}</span>
                <span className="text-[10px] text-text-muted block leading-tight">{persona.role}</span>
              </div>
              <div className={`w-7 h-7 rounded-full ${persona.dot} bg-opacity-20 border border-[var(--border-bright)] flex items-center justify-center font-bold text-[10px] text-text-primary`}>
                {persona.initials}
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-xl px-4 py-3 space-y-1">
            <div className="section-label mb-2 px-3">Workspaces</div>
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const active = pathname === ws.href || (ws.href !== '/' && pathname.startsWith(ws.href));
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active ? 'bg-surface-raised text-text-primary border border-border-bright' : 'text-text-secondary hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{ws.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted">{ws.persona}</span>
                </Link>
              );
            })}
            <div className="pt-2 flex gap-2">
              <Link
                href="/opportunities/40000000-0000-0000-0000-000000000001"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-accent bg-accent-soft border border-border-accent"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Match Leap Demo</span>
              </Link>
              <button
                onClick={() => { toggleTheme(); setMobileOpen(false); }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-text-secondary bg-surface border border-border cursor-pointer flex items-center justify-center gap-1.5"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-canvas/80 backdrop-blur-xl py-5 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-text-muted gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-text-secondary">ProofBridge</span>
            <span className="text-text-muted">·</span>
            <span>IIC 3.0 MUJ Final Submission</span>
          </div>
          <div className="flex items-center gap-4 font-medium text-text-secondary">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Deterministic Engine (coverage-v1)</span>
            </span>
            <span className="text-text-muted">·</span>
            <span>Human-Attributed Rubrics</span>
            <span className="text-text-muted">·</span>
            <span>Tamper-Resistant Proof</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const workspaces = [
    { name: 'Student Workspace', href: '/student', icon: GraduationCap, role: 'Student (Meera)' },
    { name: 'Reviewer Queue', href: '/reviewer/queue', icon: ClipboardCheck, role: 'Faculty Reviewer (Dr. Sharma)' },
    { name: 'Employer Hub', href: '/employer/opportunities', icon: Briefcase, role: 'Recruiter (Neha Verma)' },
    { name: 'College Insights', href: '/institution/insights', icon: Building2, role: 'Coordinator (Prof. Gupta)' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* Top Banner for Hackathon Demo Mode */}
      <div className="bg-text-primary text-white text-xs py-1.5 px-4 flex justify-between items-center tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-gray-200">IIC 3.0 MUJ FINAL — ProofBridge Prototype</span>
          <span className="hidden sm:inline text-gray-400">| Synthetic Demonstration Dataset</span>
        </div>
        <div className="text-gray-300 text-[11px] font-mono">
          Sep 08, 2026 • Live Loop
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-md bg-accent flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-accent-hover transition-colors">
                PB
              </div>
              <div>
                <span className="font-bold text-lg text-text-primary tracking-tight">ProofBridge</span>
                <span className="hidden md:inline text-xs text-text-secondary ml-2 font-medium">Evidence $\rightarrow$ Opportunity</span>
              </div>
            </Link>

            {/* Desktop Workspace Links */}
            <nav className="hidden lg:flex items-center space-x-1 pl-4 border-l border-border">
              {workspaces.map((ws) => {
                const Icon = ws.icon;
                const isActive = pathname.startsWith(ws.href);
                return (
                  <Link
                    key={ws.name}
                    href={ws.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent-soft text-accent'
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{ws.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            {/* Active Persona Pill */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-text-primary">Meera Patel</span>
              <span className="text-[11px] text-text-secondary">Demo College • MCA 2026</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent-soft text-accent font-bold text-xs flex items-center justify-center border border-blue-200">
              MP
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-text-secondary hover:text-text-primary hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-surface px-4 py-3 space-y-1">
            <div className="text-xs font-semibold text-text-secondary uppercase px-3 py-1 tracking-wider">
              Switch Workspace
            </div>
            {workspaces.map((ws) => {
              const Icon = ws.icon;
              const isActive = pathname.startsWith(ws.href);
              return (
                <Link
                  key={ws.name}
                  href={ws.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium ${
                    isActive ? 'bg-accent-soft text-accent' : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{ws.name}</span>
                  </div>
                  <span className="text-xs text-text-secondary">{ws.role.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-border bg-surface py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-text-secondary gap-2">
          <div>
            ProofBridge • Proposed P0 Prototype for <strong>IIC 3.0 MUJ</strong>
          </div>
          <div className="flex items-center space-x-4">
            <span>Deterministic Matching</span>
            <span>•</span>
            <span>Human Rubric Verification</span>
            <span>•</span>
            <span>Privacy By Default</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

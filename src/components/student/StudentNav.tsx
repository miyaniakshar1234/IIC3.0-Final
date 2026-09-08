'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Award, Briefcase, FileCheck2, Layers } from 'lucide-react';

export function StudentNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { label: 'Evidence Passport', href: '/student/passport', icon: Award },
    { label: 'Target Opportunity', href: '/opportunities/40000000-0000-0000-0000-000000000001', icon: Briefcase },
    { label: 'My Applications', href: '/student/applications', icon: FileCheck2 },
  ];

  return (
    <header className="glass-header sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/student" className="flex items-center gap-2.5 text-lg font-black text-white tracking-tight group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
              <Layers className="w-4 h-4" />
            </div>
            <span>ProofBridge</span>
          </Link>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/student' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 font-mono',
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm border border-white/15'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-blue-400' : 'text-zinc-500')} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Identity / Role Indicator */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Student • Meera Patel
          </span>
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/30">
              MP
            </div>
            <div className="hidden lg:block text-xs font-mono">
              <div className="font-semibold text-zinc-200 leading-tight">Meera Patel</div>
              <div className="text-zinc-400 text-[10px] leading-tight">MCA 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <nav className="md:hidden border-t border-white/10 flex items-center justify-around py-2 bg-zinc-950/95 text-xs font-mono">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/student' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-md transition',
                isActive ? 'text-blue-400 font-bold' : 'text-zinc-400'
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

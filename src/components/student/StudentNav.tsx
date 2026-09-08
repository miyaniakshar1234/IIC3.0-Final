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
    <header className="pb-header sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/student" className="flex items-center gap-2.5 text-lg font-black text-text-primary tracking-tight group">
            <div className="w-8 h-8 rounded-lg bg-accent-soft border border-border-accent flex items-center justify-center text-accent font-bold text-sm shadow-sm group-hover:scale-105 transition-all">
              <Layers className="w-4 h-4" />
            </div>
            <span>ProofBridge</span>
          </Link>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-raised p-1 rounded-xl border border-border">
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
                      ? 'bg-canvas text-text-primary shadow-sm border border-border-bright'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-accent' : 'text-text-muted')} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Identity / Role Indicator */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-accent-soft text-accent border border-border-accent">
            Student • Meera Patel
          </span>
          <div className="flex items-center gap-2.5 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-accent-soft text-accent border border-border-accent flex items-center justify-center font-bold text-xs shadow-sm">
              MP
            </div>
            <div className="hidden lg:block text-xs font-mono">
              <div className="font-semibold text-text-primary leading-tight">Meera Patel</div>
              <div className="text-text-muted text-[10px] leading-tight">MCA 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <nav className="md:hidden border-t border-border flex items-center justify-around py-2 bg-surface text-xs font-mono">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/student' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-md transition',
                isActive ? 'text-accent font-bold' : 'text-text-muted'
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

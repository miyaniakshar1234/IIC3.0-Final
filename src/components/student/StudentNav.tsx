'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Award, Briefcase, FileCheck2, User } from 'lucide-react'

export function StudentNav() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { label: 'Evidence Passport', href: '/student/passport', icon: Award },
    { label: 'Target Opportunity', href: '/opportunities/opp-data-analyst-001', icon: Briefcase },
    { label: 'My Applications', href: '/student/applications', icon: FileCheck2 },
  ]

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/student" className="flex items-center gap-2 text-xl font-extrabold text-text-primary tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-lg">P</span>
            ProofBridge
          </Link>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/student' && pathname?.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition',
                    isActive
                      ? 'bg-accent-soft text-accent font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-canvas'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User Identity / Role Indicator */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            Student View • Demo Mode
          </span>
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center font-bold text-sm">
              M
            </div>
            <div className="hidden lg:block text-xs">
              <div className="font-semibold text-text-primary">Meera Sharma</div>
              <div className="text-text-secondary">MCA 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <nav className="md:hidden border-t border-border flex items-center justify-around py-2 bg-surface text-xs">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/student' && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-md transition',
                isActive ? 'text-accent font-semibold' : 'text-text-secondary'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

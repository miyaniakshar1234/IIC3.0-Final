'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuth, UserRole, PRESET_USERS } from '@/context/AuthContext';
import { MentorTourHUD } from '@/components/ui/MentorTourHUD';
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
  Search,
  CheckCircle2,
  LogOut,
  User,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Code2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, switchPersona } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDark = mounted ? (resolvedTheme || theme) === 'dark' : true;
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  // Strict Role-Isolated Workspaces Navigation
  const getNavLinks = () => {
    if (!user) {
      return [
        { name: 'Public Verifier', href: '/verify', icon: ShieldCheck },
        { name: 'Sign In', href: '/auth/login', icon: User },
        { name: 'Register', href: '/auth/signup', icon: Sparkles },
      ];
    }

    switch (user.role) {
      case 'student':
        return [
          { name: 'My Dashboard', href: '/student', icon: GraduationCap },
          { name: 'Skill Passport', href: '/student/passport', icon: ShieldCheck },
          { name: 'Mission Workspace', href: '/challenges/30000000-0000-0000-0000-000000000001', icon: Code2 },
          { name: 'Applications', href: '/student/applications', icon: Briefcase },
        ];
      case 'reviewer':
        return [
          { name: 'Faculty Queue', href: '/reviewer/queue', icon: ClipboardCheck },
          { name: 'Evaluation Workspace', href: '/reviewer/evaluations/50000000-0000-0000-0000-000000000001', icon: ShieldCheck },
        ];
      case 'employer':
        return [
          { name: 'Job Requisitions', href: '/employer/opportunities', icon: Briefcase },
          { name: 'Blind Talent Radar', href: '/employer/opportunities/10000000-0000-0000-0000-000000000001/applicants', icon: Zap },
        ];
      case 'institution':
        return [
          { name: 'Curriculum Gap Radar', href: '/institution/insights', icon: Building2 },
          { name: 'Student Affiliations', href: '/institution/approvals', icon: GraduationCap },
        ];
      default:
        return [
          { name: 'Home', href: '/', icon: Layers },
          { name: 'Verify Proof', href: '/verify', icon: ShieldCheck },
        ];
    }
  };

  const navLinks = getNavLinks();

  const getRoleBadgeStyle = (role?: UserRole) => {
    switch (role) {
      case 'student':
        return { color: 'text-info', bg: 'bg-info/10 border-info/30', ring: 'ring-info/40', dot: 'bg-info', label: 'Student Candidate' };
      case 'reviewer':
        return { color: 'text-success', bg: 'bg-success/10 border-success/30', ring: 'ring-success/40', dot: 'bg-success', label: 'Faculty Evaluator' };
      case 'employer':
        return { color: 'text-accent', bg: 'bg-accent/10 border-border-accent', ring: 'ring-accent/40', dot: 'bg-accent', label: 'Employer Partner' };
      case 'institution':
        return { color: 'text-warning', bg: 'bg-warning/10 border-warning/30', ring: 'ring-warning/40', dot: 'bg-warning', label: 'University Dean' };
      default:
        return { color: 'text-text-muted', bg: 'bg-canvas border-border', ring: 'ring-border', dot: 'bg-slate-400', label: 'Public Visitor' };
    }
  };

  const currentRoleStyle = getRoleBadgeStyle(user?.role);

  const handleSwitchPersona = (role: UserRole) => {
    switchPersona(role);
    setProfileDropdownOpen(false);
    if (role === 'student') router.push('/student');
    else if (role === 'reviewer') router.push('/reviewer/queue');
    else if (role === 'employer') router.push('/employer/opportunities');
    else if (role === 'institution') router.push('/institution/insights');
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary relative">
      {/* Architectural Grid & Ambient Glow */}
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

          {/* Brand & Role Tag */}
          <div className="flex items-center gap-4">
            <Link href={user ? (user.role === 'student' ? '/student' : user.role === 'reviewer' ? '/reviewer/queue' : user.role === 'employer' ? '/employer/opportunities' : '/institution/insights') : '/'} className="flex items-center gap-2.5 group">
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

            {/* Active Workspace Persona Chip */}
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-medium">
                <span className={`w-2 h-2 rounded-full ${currentRoleStyle.dot}`} />
                <span className="text-text-primary font-bold">{currentRoleStyle.label}</span>
                <span className="text-text-muted">·</span>
                <span className="font-mono text-text-muted text-[10px] truncate max-w-[140px]">
                  {user.institutionName || user.companyName}
                </span>
              </div>
            )}
          </div>

          {/* Center Navigation (Strictly Role-Isolated) */}
          <nav className="hidden md:flex items-center gap-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-surface-raised text-text-primary border border-border-bright shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-accent' : 'text-text-muted'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Public Verifier, Theme, User Dropdown */}
          <div className="flex items-center gap-2.5">
            {/* Always accessible Public Verifier */}
            <Link
              href="/verify"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-border hover:border-border-accent text-xs font-mono text-text-secondary hover:text-accent transition-all cursor-pointer"
              title="Verify any cryptographic proof without login"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Public Verifier</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-text-secondary hover:text-accent hover:border-border-accent transition-all cursor-pointer"
              aria-label="Toggle theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* User Profile / Fast Persona Switcher Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-2 bg-surface border border-border rounded-full py-1 pl-3 pr-1.5 ring-1 ${currentRoleStyle.ring} hover:bg-surface-raised transition cursor-pointer`}
                >
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-semibold text-text-primary block leading-tight truncate max-w-[110px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-text-muted block leading-tight font-mono">
                      {user.role}
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-full ${currentRoleStyle.dot} bg-opacity-20 border border-border-bright flex items-center justify-center font-bold text-[10px] text-text-primary`}>
                    {user.avatarInitials}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-surface border border-border-accent rounded-2xl shadow-2xl p-3 space-y-3 z-50 animate-scale-up">
                    {/* Active User Summary */}
                    <div className="p-3 rounded-xl bg-canvas border border-border space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-primary">{user.name}</span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${currentRoleStyle.bg} ${currentRoleStyle.color}`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-text-muted font-mono truncate">{user.email}</div>
                      
                      {user.role === 'student' && (
                        <div className="pt-1.5 flex items-center gap-1.5 text-[10px] font-mono">
                          {user.affiliationStatus === 'approved' ? (
                            <span className="text-success flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified Student · {user.institutionName}</span>
                            </span>
                          ) : (
                            <span className="text-warning flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Affiliation Pending Approval</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Switch Persona Shortcuts (Pitch Demo Feature) */}
                    <div className="space-y-1.5">
                      <div className="section-label text-[10px] px-1 flex items-center gap-1 text-accent">
                        <Zap className="w-3 h-3 text-accent" />
                        <span>Switch Persona (Demo Shortcut)</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { role: 'student' as UserRole, label: '🎓 Student', name: 'Meera' },
                          { role: 'reviewer' as UserRole, label: '👨‍🏫 Faculty', name: 'Dr. Sharma' },
                          { role: 'employer' as UserRole, label: '💼 Employer', name: 'Rajiv' },
                          { role: 'institution' as UserRole, label: '🏛️ Dean', name: 'Dr. Kumar' },
                        ].map((p) => (
                          <button
                            key={p.role}
                            type="button"
                            onClick={() => handleSwitchPersona(p.role)}
                            className={`p-2 rounded-lg text-left border text-xs font-mono transition cursor-pointer ${
                              user.role === p.role
                                ? 'bg-accent/10 border-border-accent text-accent font-bold'
                                : 'bg-canvas border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                            }`}
                          >
                            <div className="font-bold text-[11px]">{p.label}</div>
                            <div className="text-[10px] text-text-muted truncate">{p.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="pt-2 border-t border-border">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-3 py-2 rounded-xl text-xs font-mono font-semibold text-danger hover:bg-danger/10 transition flex items-center justify-between cursor-pointer"
                      >
                        <span>Sign Out of Session</span>
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-text-secondary hover:text-text-primary transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="pb-btn-primary text-xs py-1.5 px-3 font-mono"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-xl px-4 py-3 space-y-2">
            <div className="section-label mb-1 px-3">
              {user ? `${currentRoleStyle.label} Workspace` : 'Navigation'}
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active ? 'bg-surface-raised text-text-primary border border-border-bright' : 'text-text-secondary hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {user ? (
              <div className="pt-2 border-t border-border space-y-2">
                <div className="text-[11px] font-mono text-text-muted px-3">
                  Signed in as: <strong className="text-text-primary">{user.name}</strong> ({user.role})
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-danger/10 text-danger text-xs font-mono font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-border flex gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-mono font-bold bg-surface border border-border rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-mono font-bold pb-btn-primary rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-canvas/80 backdrop-blur-xl py-5 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-text-muted gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-text-secondary">ProofBridge</span>
            <span className="text-text-muted">·</span>
            <span>IIC 3.0 MUJ · PS-08 Academia-Industry Bridge</span>
          </div>
          <div className="flex items-center gap-4 font-medium text-text-secondary">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Deterministic Match Engine (coverage-v1)</span>
            </span>
            <span className="text-text-muted">·</span>
            <span>W3C Verifiable Credentials</span>
            <span className="text-text-muted">·</span>
            <span>Content-Addressed Artifacts</span>
          </div>
        </div>
      </footer>

      {/* Presenter & Mentor Demo HUD */}
      <MentorTourHUD />
    </div>
  );
}

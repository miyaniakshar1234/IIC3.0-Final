'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole, PRESET_USERS } from '@/context/AuthContext';
import { AppShell } from '@/components/ui/AppShell';
import { toast } from 'sonner';
import {
  GraduationCap,
  ClipboardCheck,
  Briefcase,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchPersona } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState(PRESET_USERS.student.email);
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(PRESET_USERS[role].email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast.success(`Authenticated successfully`);
        if (selectedRole === 'student') router.push('/student');
        else if (selectedRole === 'reviewer') router.push('/reviewer/queue');
        else if (selectedRole === 'employer') router.push('/employer/opportunities');
        else if (selectedRole === 'institution') router.push('/institution/insights');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (e) {
      toast.error('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    switchPersona(role);
    toast.success(`Switched Persona to ${role}`, { description: 'Sandbox fast-switch active.' });
    if (role === 'student') router.push('/student');
    else if (role === 'reviewer') router.push('/reviewer/queue');
    else if (role === 'employer') router.push('/employer/opportunities');
    else if (role === 'institution') router.push('/institution/insights');
  };

  const roleConfigs = [
    {
      role: 'student' as UserRole,
      title: 'Student Candidate',
      icon: GraduationCap,
      color: 'text-info',
      bg: 'bg-info/10 border-info/30',
      activeBorder: 'border-info ring-1 ring-info',
      sampleName: 'Meera Patel (MCA 2026)',
      dest: '/student',
    },
    {
      role: 'reviewer' as UserRole,
      title: 'Faculty Evaluator',
      icon: ClipboardCheck,
      color: 'text-success',
      bg: 'bg-success/10 border-success/30',
      activeBorder: 'border-success ring-1 ring-success',
      sampleName: 'Dr. Alok Sharma (Associate Prof)',
      dest: '/reviewer/queue',
    },
    {
      role: 'employer' as UserRole,
      title: 'Industry Employer',
      icon: Briefcase,
      color: 'text-accent',
      bg: 'bg-accent/10 border-border-accent',
      activeBorder: 'border-accent ring-1 ring-accent',
      sampleName: 'Rajiv Mehta (Sample Analytics)',
      dest: '/employer/opportunities',
    },
    {
      role: 'institution' as UserRole,
      title: 'University Dean',
      icon: Building2,
      color: 'text-warning',
      bg: 'bg-warning/10 border-warning/30',
      activeBorder: 'border-warning ring-1 ring-warning',
      sampleName: 'Dr. Sanjeev Kumar (Dean)',
      dest: '/institution/insights',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary relative">
      <div className="bg-grid-pattern" />
      <div className="matrix-dots" />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl w-full mx-auto animate-fade-in space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-accent group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-text-primary tracking-tight group-hover:text-accent transition-colors">
                ProofBridge
              </span>
            </Link>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent border border-border-accent text-xs font-mono font-bold">
              <Lock className="w-3.5 h-3.5" />
              AUTHENTICATED ROLE-ISOLATED ACCESS
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
              Sign In to ProofBridge
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Select your role to access your dedicated workspace with full permission boundaries.
            </p>
          </div>

          {/* ── FAST DEMO PRESENTER BAR ── */}
          <div className="pb-card-accent p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="section-label text-xs flex items-center gap-1.5 text-accent">
                <Zap className="w-4 h-4 text-accent" />
                <span>Workspace Quick Access</span>
              </span>
              <span className="text-[10px] font-mono text-text-muted">Sandbox Shortcuts</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {roleConfigs.map((cfg) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={cfg.role}
                    type="button"
                    onClick={() => handleQuickLogin(cfg.role)}
                    className={`p-3 rounded-xl border text-left bg-surface hover:bg-surface-raised transition-all flex flex-col justify-between group cursor-pointer border-border hover:${cfg.color}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                      <ArrowRight className="w-3 h-3 text-text-muted group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-bold text-text-primary">{cfg.title}</div>
                      <div className="text-[10px] font-mono text-text-muted truncate mt-0.5">{cfg.sampleName}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── STANDARD CREDENTIALS CARD ── */}
          <div className="pb-card p-6 sm:p-8 space-y-6 max-w-xl mx-auto border-border">
            {/* Role selector tabs */}
            <div className="space-y-2">
              <label className="section-label text-xs">Select Persona / Workspace</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {roleConfigs.map((cfg) => {
                  const Icon = cfg.icon;
                  const isSelected = selectedRole === cfg.role;
                  return (
                    <button
                      key={cfg.role}
                      type="button"
                      onClick={() => handleRoleSelect(cfg.role)}
                      className={`p-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? `${cfg.bg} ${cfg.activeBorder} ${cfg.color} shadow-sm`
                          : 'bg-canvas text-text-muted border-border hover:text-text-primary'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] truncate w-full">{cfg.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@university.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-text-secondary font-mono">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="pb-btn-primary w-full py-3 text-xs justify-center font-mono cursor-pointer"
              >
                {loading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Sign In as {roleConfigs.find((r) => r.role === selectedRole)?.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </form>

            {/* Footer links */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2 font-mono">
              <div>
                New to ProofBridge?{' '}
                <Link href="/auth/signup" className="text-accent font-bold hover:underline">
                  Create an Account
                </Link>
              </div>
              <Link href="/verify" className="text-text-secondary hover:text-text-primary flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>Public Verifier Gateway →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

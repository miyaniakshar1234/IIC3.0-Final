'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';
import { AppShell } from '@/components/ui/AppShell';
import {
  GraduationCap,
  ClipboardCheck,
  Briefcase,
  Building2,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

const REGISTERED_UNIVERSITIES = [
  { id: 'inst-muj', name: 'Manipal University Jaipur (MUJ)', code: 'U-0683', accreditation: 'NAAC A+ · NBA' },
  { id: 'inst-demo-college', name: 'Manipal University Jaipur (MUJ)', code: 'U-0142', accreditation: 'NAAC A++ · Autonomous' },
  { id: 'inst-iit-bombay', name: 'IIT Bombay', code: 'CFTI-001', accreditation: 'Institute of Eminence' },
  { id: 'inst-bits-pilani', name: 'BITS Pilani', code: 'U-0391', accreditation: 'NAAC A++ · Deemed' },
];

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUni, setSelectedUni] = useState('inst-muj');
  const [program, setProgram] = useState('Master of Computer Applications (MCA 2026)');
  const [rollNumber, setRollNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('Department of Computer Applications');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredNotice, setRegisteredNotice] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const institutionObj = REGISTERED_UNIVERSITIES.find((u) => u.id === selectedUni) || REGISTERED_UNIVERSITIES[0];

    setTimeout(() => {
      signup({
        role: selectedRole,
        name: name.trim() || 'New User',
        email: email.trim() || 'student@proofbridge.edu',
        institutionId: selectedRole === 'employer' ? undefined : institutionObj.id,
        institutionName: selectedRole === 'employer' ? undefined : institutionObj.name,
        program: selectedRole === 'student' ? program : undefined,
        rollNumber: selectedRole === 'student' ? rollNumber || `PRN-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
        companyName: selectedRole === 'employer' ? (companyName || 'Partner Tech Labs') : undefined,
        department: (selectedRole === 'reviewer' || selectedRole === 'institution') ? department : undefined,
        title: title || (selectedRole === 'reviewer' ? 'Assistant Professor' : selectedRole === 'employer' ? 'Senior Recruiter' : undefined),
      });

      setLoading(false);
      setRegisteredNotice(true);

      setTimeout(() => {
        if (selectedRole === 'student') router.push('/student');
        else if (selectedRole === 'reviewer') router.push('/reviewer/queue');
        else if (selectedRole === 'employer') router.push('/employer/opportunities');
        else if (selectedRole === 'institution') router.push('/institution/insights');
      }, 900);
    }, 400);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent border border-border-accent text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            ONBOARDING &amp; INSTITUTIONAL VERIFICATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight">
            Create Your ProofBridge Account
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            Join the decentralized skill evidence network connecting student talent, faculty accreditation, and employers.
          </p>
        </div>

        {/* ── ROLE SELECTION TABS ── */}
        <div className="pb-card p-6 space-y-4">
          <label className="section-label text-xs">Step 1: Choose Your Account Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                role: 'student' as UserRole,
                title: 'Student',
                desc: 'Build proof & qualify for roles',
                icon: GraduationCap,
                color: 'text-info',
                border: 'border-info/30 bg-info/5',
                selectedBorder: 'border-info ring-2 ring-info/50 bg-info/10',
              },
              {
                role: 'institution' as UserRole,
                title: 'University',
                desc: 'Verify students & track gap radar',
                icon: Building2,
                color: 'text-warning',
                border: 'border-warning/30 bg-warning/5',
                selectedBorder: 'border-warning ring-2 ring-warning/50 bg-warning/10',
              },
              {
                role: 'employer' as UserRole,
                title: 'Employer',
                desc: 'Screen candidates via blind radar',
                icon: Briefcase,
                color: 'text-accent',
                border: 'border-border-accent bg-accent/5',
                selectedBorder: 'border-accent ring-2 ring-accent/50 bg-accent/10',
              },
              {
                role: 'reviewer' as UserRole,
                title: 'Faculty Reviewer',
                desc: 'Grade code against rubrics',
                icon: ClipboardCheck,
                color: 'text-success',
                border: 'border-success/30 bg-success/5',
                selectedBorder: 'border-success ring-2 ring-success/50 bg-success/10',
              },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleSelect(item.role)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected ? item.selectedBorder : `${item.border} hover:bg-surface-hover`
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <div className="text-xs font-bold text-text-primary mt-2">{item.title}</div>
                  <div className="text-[10px] text-text-muted mt-0.5 leading-tight">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── REGISTRATION FORM ── */}
        <div className="pb-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-bold text-text-primary">
              Step 2: Profile &amp; Affiliation Information
            </h2>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              {selectedRole === 'student' && 'Enter your degree and select your university to request institutional affiliation verification.'}
              {selectedRole === 'institution' && 'Register your university academic council, accreditation, and department parameters.'}
              {selectedRole === 'employer' && 'Provide your corporate entity details to post requisitions and screen blind candidate proof.'}
              {selectedRole === 'reviewer' && 'Register your academic department to evaluate student code submissions against rubrics.'}
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Common: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                  Full Legal Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={selectedRole === 'student' ? 'e.g. Meera Patel' : selectedRole === 'institution' ? 'e.g. Dr. Sanjeev Kumar' : 'e.g. Dr. Alok Sharma'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                  Email Address <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={selectedRole === 'student' ? 'student@university.edu' : 'official@organization.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            {/* Student Specific: University Selection & Roll */}
            {selectedRole === 'student' && (
              <div className="space-y-4 pt-2 border-t border-border">
                <div className="bg-info/5 border border-info/20 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-text-secondary">
                  <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong>Institutional Verification Policy:</strong> When you select your University, your profile will be sent to the Registrar&apos;s queue. You will hold a <code className="text-info bg-canvas px-1 rounded">pending_approval</code> status until the University confirms your enrollment.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                    Select Your University / College <span className="text-danger">*</span>
                  </label>
                  <select
                    value={selectedUni}
                    onChange={(e) => setSelectedUni(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {REGISTERED_UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.accreditation})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Degree Program &amp; Batch
                    </label>
                    <input
                      type="text"
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      placeholder="e.g. Master of Computer Applications (MCA 2026)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Student Roll / PRN Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      required
                      placeholder="e.g. 26MCA0042 or 22BCE10482"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* University Specific: AISHE & Details */}
            {selectedRole === 'institution' && (
              <div className="space-y-4 pt-2 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Manipal University Jaipur (MUJ)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                      AISHE / Ministry Code
                    </label>
                    <input
                      type="text"
                      defaultValue="U-0683 (NAAC A+ Accredited)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                    Registrar / Dean Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Dean of Academic Computing & Placement Director"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            )}

            {/* Employer Specific */}
            {selectedRole === 'employer' && (
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                    Company / Organization Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="e.g. Sample Analytics Studio or Fintech Core Labs"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                    Recruiter / Talent Role
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Lead Technical Recruiter"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            )}

            {/* Faculty Specific */}
            {selectedRole === 'reviewer' && (
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                    Academic Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Department of Computer Applications"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                    Academic Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Associate Professor & Analytics Mentor"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1 font-mono">
                Create Password <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="pb-btn-primary w-full py-3 text-xs justify-center font-mono cursor-pointer"
            >
              {loading ? (
                <span>Registering on ProofBridge Network...</span>
              ) : (
                <>
                  <span>Create Account &amp; Enter Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </form>

          {registeredNotice && (
            <div className="p-4 rounded-xl bg-success/10 border border-success/30 text-success text-xs font-mono flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Account successfully provisioned! Redirecting to your authenticated workspace...</span>
            </div>
          )}

          {/* Footer Link */}
          <div className="pt-4 border-t border-border text-center text-xs text-text-muted font-mono">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

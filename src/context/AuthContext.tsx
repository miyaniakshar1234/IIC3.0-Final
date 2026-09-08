'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'reviewer' | 'employer' | 'institution';
export type AffiliationStatus = 'pending_approval' | 'approved' | 'rejected' | 'none';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
  institutionId?: string;
  institutionName?: string;
  program?: string;
  rollNumber?: string;
  affiliationStatus?: AffiliationStatus;
  title?: string;
  companyName?: string;
  department?: string;
}

export interface StudentAffiliationRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  institutionId: string;
  institutionName: string;
  program: string;
  rollNumber: string;
  requestedAt: string;
  status: AffiliationStatus;
}

export const PRESET_USERS: Record<UserRole, AuthUser> = {
  student: {
    id: 'usr-student-meera',
    name: 'Meera Patel',
    email: 'meera.patel@democollege.edu',
    role: 'student',
    avatarInitials: 'MP',
    institutionId: 'inst-demo-college',
    institutionName: 'Manipal University Jaipur (MUJ)',
    program: 'MCA 2026',
    rollNumber: 'MCA-2026-042',
    affiliationStatus: 'approved',
  },
  reviewer: {
    id: 'usr-reviewer-sharma',
    name: 'Dr. Alok Sharma',
    email: 'alok.sharma@democollege.edu',
    role: 'reviewer',
    avatarInitials: 'AS',
    title: 'Associate Professor & Analytics Mentor',
    department: 'Department of Computer Applications',
    institutionName: 'Manipal University Jaipur (MUJ)',
    institutionId: 'inst-demo-college',
  },
  employer: {
    id: 'usr-employer-rajiv',
    name: 'Rajiv Mehta',
    email: 'rajiv.mehta@sampleanalytics.com',
    role: 'employer',
    avatarInitials: 'RM',
    title: 'Lead Talent Partner & Technical Recruiter',
    companyName: 'Sample Analytics Studio',
  },
  institution: {
    id: 'usr-dean-kumar',
    name: 'Dr. Sanjeev Kumar',
    email: 'dean.computing@democollege.edu',
    role: 'institution',
    avatarInitials: 'SK',
    title: 'Dean of Computing & Placement Director',
    institutionName: 'Manipal University Jaipur (MUJ)',
    institutionId: 'inst-demo-college',
  },
};

const INITIAL_AFFILIATION_REQUESTS: StudentAffiliationRequest[] = [
  {
    id: 'req-001',
    studentName: 'Aarav Gupta',
    studentEmail: 'aarav.gupta@student.democollege.edu',
    institutionId: 'inst-demo-college',
    institutionName: 'Manipal University Jaipur (MUJ)',
    program: 'MCA 2026',
    rollNumber: 'MCA-2026-051',
    requestedAt: '2026-09-08 14:30:00 UTC',
    status: 'pending_approval',
  },
  {
    id: 'req-002',
    studentName: 'Ishita Sharma',
    studentEmail: 'ishita.sharma@student.democollege.edu',
    institutionId: 'inst-demo-college',
    institutionName: 'Manipal University Jaipur (MUJ)',
    program: 'B.Tech CS 2026',
    rollNumber: 'BCE-2026-104',
    requestedAt: '2026-09-08 15:10:00 UTC',
    status: 'pending_approval',
  },
  {
    id: 'req-003',
    studentName: 'Tanmay Saxena',
    studentEmail: 'tanmay.saxena@student.democollege.edu',
    institutionId: 'inst-demo-college',
    institutionName: 'Manipal University Jaipur (MUJ)',
    program: 'MCA 2026',
    rollNumber: 'MCA-2026-088',
    requestedAt: '2026-09-08 16:45:00 UTC',
    status: 'pending_approval',
  },
  {
    id: 'req-004',
    studentName: 'Divya Patel',
    studentEmail: 'divya.patel@student.democollege.edu',
    institutionId: 'inst-demo-college',
    institutionName: 'Manipal University Jaipur (MUJ)',
    program: 'B.Tech AI & Data 2026',
    rollNumber: 'BCE-2026-039',
    requestedAt: '2026-09-08 17:00:00 UTC',
    status: 'pending_approval',
  },
];

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<boolean>;
  signup: (userData: Partial<AuthUser> & { role: UserRole, password?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchPersona: (role: UserRole) => void;
  affiliationRequests: StudentAffiliationRequest[];
  approveAffiliation: (requestId: string) => void;
  rejectAffiliation: (requestId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(PRESET_USERS.student);
  const [affiliationRequests, setAffiliationRequests] = useState<StudentAffiliationRequest[]>(INITIAL_AFFILIATION_REQUESTS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('proofbridge_active_user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to Meera Patel (Student) for immediate pitch readiness
        setUser(PRESET_USERS.student);
      }

      const storedReqs = localStorage.getItem('proofbridge_affiliation_requests');
      if (storedReqs) {
        setAffiliationRequests(JSON.parse(storedReqs));
      }
    } catch (e) {
      console.warn('Could not read auth storage:', e);
    }
    setIsInitialized(true);
  }, []);

  const saveUser = (newUser: AuthUser | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem('proofbridge_active_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('proofbridge_active_user');
      }
    } catch (e) {
      console.warn('Could not save user to storage:', e);
    }
  };

  const saveRequests = (reqs: StudentAffiliationRequest[]) => {
    setAffiliationRequests(reqs);
    try {
      localStorage.setItem('proofbridge_affiliation_requests', JSON.stringify(reqs));
    } catch (e) {
      console.warn('Could not save requests to storage:', e);
    }
  };

  const login = async (email: string, password?: string, role?: UserRole): Promise<boolean> => {
    try {
      // Fallback for demo users that don't have real passwords
      const isPreset = (Object.keys(PRESET_USERS) as UserRole[]).find(
        (r) => PRESET_USERS[r].email.toLowerCase() === email.toLowerCase()
      );
      if (isPreset) {
        saveUser(PRESET_USERS[isPreset]);
        return true;
      }

      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || 'hackathon' })
      });
      const data = await res.json();
      if (data.success && data.user) {
        saveUser(data.user);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const signup = async (userData: any & { role: UserRole, password?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password || 'hackathon',
          role: userData.role,
          name: userData.name,
          institutionName: userData.institutionName,
          program: userData.program,
          rollNumber: userData.rollNumber
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        saveUser(data.user);

        // If new student, queue into university affiliation requests locally for the prototype UI
        if (userData.role === 'student') {
          const newReq: StudentAffiliationRequest = {
            id: `req-${Date.now()}`,
            studentName: data.user.name,
            studentEmail: data.user.email,
            institutionId: data.user.institutionId || 'inst-muj',
            institutionName: data.user.institutionName || 'Manipal University Jaipur (MUJ)',
            program: data.user.program || 'Degree Program',
            rollNumber: data.user.rollNumber || 'PENDING',
            requestedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
            status: 'pending_approval',
          };
          saveRequests([newReq, ...affiliationRequests]);
        }
        return { success: true };
      }
      return { success: false, error: data.error || 'Registration failed. Please try again.' };
    } catch (e: any) {
      console.error(e);
      return { success: false, error: e.message || 'Network error during registration' };
    }
  };

  const logout = () => {
    saveUser(null);
  };

  const switchPersona = (role: UserRole) => {
    saveUser(PRESET_USERS[role]);
  };

  const approveAffiliation = (requestId: string) => {
    const updated = affiliationRequests.map((r) => {
      if (r.id === requestId) {
        return { ...r, status: 'approved' as AffiliationStatus };
      }
      return r;
    });
    saveRequests(updated);

    // If active user is this student, update their live profile
    const target = affiliationRequests.find((r) => r.id === requestId);
    if (user && target && user.email === target.studentEmail) {
      saveUser({ ...user, affiliationStatus: 'approved' });
    }
  };

  const rejectAffiliation = (requestId: string) => {
    const updated = affiliationRequests.map((r) => {
      if (r.id === requestId) {
        return { ...r, status: 'rejected' as AffiliationStatus };
      }
      return r;
    });
    saveRequests(updated);

    const target = affiliationRequests.find((r) => r.id === requestId);
    if (user && target && user.email === target.studentEmail) {
      saveUser({ ...user, affiliationStatus: 'rejected' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        signup,
        logout,
        switchPersona,
        affiliationRequests,
        approveAffiliation,
        rejectAffiliation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

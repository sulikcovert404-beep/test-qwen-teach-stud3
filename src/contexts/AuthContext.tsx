import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole, ROLE_DASHBOARD_PATHS } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  dashboardPath: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, User> = {
  STUDENT: {
    id: 'stu-001',
    name: 'علی محمدی',
    role: 'STUDENT',
    plan: 'STUDENT_FREE',
    tenantId: 'tenant-001',
    tenantName: 'دبیرستان شهید بهشتی',
  },
  TEACHER: {
    id: 'tch-001',
    name: 'مریم احمدی',
    role: 'TEACHER',
    plan: 'TEACHER_FREE',
    tenantId: 'tenant-001',
    tenantName: 'دبیرستان شهید بهشتی',
  },
  SCHOOL_ADMIN: {
    id: 'adm-001',
    name: 'رضا کریمی',
    role: 'SCHOOL_ADMIN',
    plan: 'SCHOOL_FREE',
    tenantId: 'tenant-001',
    tenantName: 'دبیرستان شهید بهشتی',
  },
  SUPER_ADMIN: {
    id: 'super-001',
    name: 'مدیر سیستم',
    role: 'SUPER_ADMIN',
    plan: 'ENTERPRISE',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(DEMO_USERS[role]);
      setIsLoading(false);
    }, 600);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const dashboardPath = user ? ROLE_DASHBOARD_PATHS[user.role] : null;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      dashboardPath,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

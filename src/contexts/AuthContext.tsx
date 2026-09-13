import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, UserRole, ROLE_DASHBOARD_PATHS } from '../types';
import { authApi } from '../backend/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  dashboardPath: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const session = JSON.parse(stored);
          const dbUser = await authApi.getMe();
          if (dbUser) {
            setUser({
              id: dbUser.id,
              name: dbUser.name,
              role: dbUser.role as UserRole,
              plan: dbUser.plan as any,
              tenantId: dbUser.tenantId,
              tenantName: dbUser.tenantId ? 'دبیرستان شهید بهشتی' : undefined,
            });
          }
        }
      } catch (error) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async (role: UserRole) => {
    setIsLoading(true);
    try {
      const { user: dbUser } = await authApi.login(role);
      
      const mappedUser: User = {
        id: dbUser.id,
        name: dbUser.name,
        role: dbUser.role as UserRole,
        plan: dbUser.plan as any,
        tenantId: dbUser.tenantId,
        tenantName: dbUser.tenantId ? 'دبیرستان شهید بهشتی' : undefined,
      };
      
      setUser(mappedUser);
      
      // Persist session
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        userId: dbUser.id,
        role: dbUser.role,
      }));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
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

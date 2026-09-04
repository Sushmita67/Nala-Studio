import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

interface AdminAuthContextValue {
  isAdmin: boolean;
  session: ReturnType<typeof useAuthStore.getState>['session'];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = useAuthStore((s) => s.session);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loginStore = useAuthStore((s) => s.login);
  const logoutStore = useAuthStore((s) => s.logout);
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const value = useMemo(
    () => ({
      isAdmin: isAuthenticated,
      session,
      login: async (email: string, password: string) => {
        const result = await loginStore(email, password);
        return result.ok;
      },
      logout: () => logoutStore(),
    }),
    [isAuthenticated, session, loginStore, logoutStore]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

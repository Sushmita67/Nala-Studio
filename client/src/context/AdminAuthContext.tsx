import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ADMIN_SESSION_KEY } from '../config';
import { useStudio } from './StudioContext';

interface AdminAuthContextValue {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useStudio();
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(ADMIN_SESSION_KEY) === '1');

  useEffect(() => {
    if (isAdmin) localStorage.setItem(ADMIN_SESSION_KEY, '1');
    else localStorage.removeItem(ADMIN_SESSION_KEY);
  }, [isAdmin]);

  const value = useMemo(
    () => ({
      isAdmin,
      login: (password: string) => {
        if (password === settings.adminPassword) {
          setIsAdmin(true);
          return true;
        }
        return false;
      },
      logout: () => setIsAdmin(false),
    }),
    [isAdmin, settings.adminPassword]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

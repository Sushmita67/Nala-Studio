import React, { createContext, useContext, useEffect } from 'react';
import { useStudioCompat, useStudioStore } from '../stores/useStudioStore';

type StudioContextValue = ReturnType<typeof useStudioCompat>;

const StudioContext = createContext<StudioContextValue | null>(null);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hydrate = useStudioStore((s) => s.hydrate);
  const value = useStudioCompat();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
};

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used within StudioProvider');
  return ctx;
}

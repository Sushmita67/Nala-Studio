import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ADMIN_SESSION_KEY, ADMIN_SESSION_TTL_MS } from '../config';
import { authService } from '../services';

interface AuthSession {
  email: string;
  name: string;
  role: 'owner';
  expiresAt: number;
}

interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  hydrate: () => void;
}

function readLegacyFlag(): boolean {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const result = await authService.login(email, password);
        if (!result.ok) return { ok: false, error: result.error };
        const session: AuthSession = {
          email: email.trim().toLowerCase(),
          name: 'NALA Owner',
          role: 'owner',
          expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
        };
        localStorage.setItem(ADMIN_SESSION_KEY, '1');
        set({ session, isAuthenticated: true });
        return { ok: true };
      },
      logout: () => {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        set({ session: null, isAuthenticated: false });
      },
      hydrate: () => {
        const { session } = get();
        if (session && session.expiresAt > Date.now()) {
          set({ isAuthenticated: true });
          return;
        }
        if (session && session.expiresAt <= Date.now()) {
          get().logout();
          return;
        }
        // Migrate old flag-only sessions once
        if (readLegacyFlag() && !session) {
          set({
            session: {
              email: 'owner@nalastudio.com.np',
              name: 'NALA Owner',
              role: 'owner',
              expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
            },
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: 'nala-auth-store',
      partialize: (s) => ({ session: s.session }),
      onRehydrateStorage: () => (state) => {
        state?.hydrate();
      },
    }
  )
);

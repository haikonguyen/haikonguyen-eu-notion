'use client';

import {
  AUTH_PREFERENCES_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
} from '@lib/auth/constants';
import { createSessionUser } from '@lib/auth/create-session-user';
import {
  type AuthPreferences,
  AuthProvider,
  type AuthUser,
  DEFAULT_AUTH_PREFERENCES,
} from '@lib/auth/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { clearAuthSession, persistAuthSession } from '@/actions/auth-session';

interface AuthState {
  user: AuthUser | null;
  preferences: AuthPreferences;
  signIn: (
    email: string,
    name?: string,
    provider?: AuthProvider,
  ) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<AuthUser>) => Promise<void>;
  updatePreferences: (patch: Partial<AuthPreferences>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      preferences: DEFAULT_AUTH_PREFERENCES,
      signIn: async (email, name, provider = AuthProvider.Email) => {
        const user = await persistAuthSession({ email, name, provider });
        set({ user });
        return user;
      },
      signOut: async () => {
        await clearAuthSession();
        set({ user: null });
      },
      updateProfile: async (patch) => {
        const current = get().user;
        if (!current) return;
        const next = createSessionUser({
          email: current.email,
          name: patch.name ?? current.name,
          phone: patch.phone ?? current.phone,
          company: patch.company ?? current.company,
          provider: current.provider,
        });
        await persistAuthSession(next);
        set({ user: { ...next, role: current.role } });
      },
      updatePreferences: (patch) => {
        set({ preferences: { ...get().preferences, ...patch } });
      },
    }),
    {
      name: AUTH_USER_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
      }),
    },
  ),
);

export const AUTH_PREFERENCES_KEY = AUTH_PREFERENCES_STORAGE_KEY;

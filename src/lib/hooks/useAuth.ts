'use client';

import { AuthRole } from '@lib/auth/types';
import { useAuthStore } from '@lib/store/useAuthStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const preferences = useAuthStore((state) => state.preferences);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const updatePreferences = useAuthStore((state) => state.updatePreferences);

  return {
    user,
    preferences,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === AuthRole.Admin,
    signIn,
    signOut,
    updateProfile,
    updatePreferences,
  };
}

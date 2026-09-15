'use client';

import { useAuthStore } from '@lib/store/useAuthStore';

export function useUser() {
  return useAuthStore((state) => state.user);
}

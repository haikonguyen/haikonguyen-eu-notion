'use server';

import { AUTH_SESSION_COOKIE } from '@lib/auth/constants';
import { createSessionUser } from '@lib/auth/create-session-user';
import { getServerSession } from '@lib/auth/get-server-session';
import {
  encodeSessionUser,
  sessionCookieOptions,
} from '@lib/auth/session-cookie';
import { AuthProvider, type AuthUser } from '@lib/auth/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export interface PersistSessionInput {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  provider?: AuthProvider;
}

export async function persistAuthSession(
  input: PersistSessionInput,
): Promise<AuthUser> {
  const user = createSessionUser(input);
  const cookieStore = await cookies();
  const options = sessionCookieOptions();
  cookieStore.set(options.name, encodeSessionUser(user), options);
  revalidatePath('/', 'layout');
  return user;
}

export async function clearAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_SESSION_COOKIE);
  revalidatePath('/', 'layout');
}

export async function readAuthSession(): Promise<AuthUser | null> {
  return getServerSession();
}

export async function updateAuthSession(
  patch: Partial<Pick<AuthUser, 'name' | 'phone' | 'company'>>,
): Promise<AuthUser | null> {
  const current = await getServerSession();
  if (!current) return null;

  const next = { ...current, ...patch };
  const cookieStore = await cookies();
  const options = sessionCookieOptions();
  cookieStore.set(options.name, encodeSessionUser(next), options);
  revalidatePath('/', 'layout');
  return next;
}

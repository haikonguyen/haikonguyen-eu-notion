import { cookies } from 'next/headers';
import { AUTH_SESSION_COOKIE } from './constants';
import { decodeSessionUser } from './session-cookie';
import type { AuthUser } from './types';

export async function getServerSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  return decodeSessionUser(cookieStore.get(AUTH_SESSION_COOKIE)?.value);
}

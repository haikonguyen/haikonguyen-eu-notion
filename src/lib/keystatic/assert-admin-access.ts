import { getServerSession } from '@lib/auth/get-server-session';
import { parseAdminEmails } from '@lib/auth/parse-admin-emails';
import { AuthRole } from '@lib/auth/types';
import {
  isKeystaticAdminUiEnabled,
  isKeystaticAuthRequired,
} from './is-admin-ui-enabled';

export async function canAccessKeystaticAdmin(): Promise<boolean> {
  if (!isKeystaticAdminUiEnabled()) {
    return false;
  }

  const allowlist = parseAdminEmails();
  const mustCheckAuth = isKeystaticAuthRequired() || allowlist.length > 0;
  if (!mustCheckAuth) {
    return true;
  }

  const session = await getServerSession();
  if (!session) return false;
  if (allowlist.length > 0) {
    return allowlist.includes(session.email.toLowerCase());
  }
  return session.role === AuthRole.Admin;
}

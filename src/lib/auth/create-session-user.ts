import { isAdminEmail } from './parse-admin-emails';
import { AuthProvider, AuthRole, type AuthUser } from './types';

export interface CreateSessionUserInput {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  provider?: AuthProvider;
}

export function createSessionUser(input: CreateSessionUserInput): AuthUser {
  const email = input.email.trim().toLowerCase();
  const localPart = email.split('@')[0] ?? email;

  return {
    email,
    name: input.name?.trim() || localPart,
    phone: input.phone?.trim() ?? '',
    company: input.company?.trim() ?? '',
    role: isAdminEmail(email) ? AuthRole.Admin : AuthRole.Client,
    provider: input.provider ?? AuthProvider.Email,
  };
}

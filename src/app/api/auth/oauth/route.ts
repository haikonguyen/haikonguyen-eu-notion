import { isSupabaseConfigured } from '@lib/auth/is-supabase-configured';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ProviderSchema = z.enum(['github', 'google']);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = ProviderSchema.safeParse(url.searchParams.get('provider'));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase OAuth is not configured' },
      { status: 501 },
    );
  }

  return NextResponse.redirect(new URL('/account', url.origin));
}

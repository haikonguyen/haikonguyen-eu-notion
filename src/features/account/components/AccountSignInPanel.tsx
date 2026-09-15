'use client';

import { FormSubmitButton, FormTextField } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthProvider } from '@lib/auth/types';
import { useAuth } from '@lib/hooks/useAuth';
import { LogIn, Shield } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  type AccountSignInValues,
  createAccountSignInSchema,
} from '../create-account-sign-in-schema';
import { AccountOAuthButtons } from './AccountOAuthButtons';

export function AccountSignInPanel() {
  const t = useTranslations('Account');
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AccountSignInValues>({
    resolver: zodResolver(createAccountSignInSchema(t)),
  });

  const submitEmail = handleSubmit(async (values) => {
    await signIn(values.email, values.name, AuthProvider.Email);
  });

  return (
    <div className="rounded-3xl border border-glass-border bg-glass-surface p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Shield size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('portalTitle')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('portalSubtitle')}
        </p>
      </div>
      <form onSubmit={submitEmail} className="space-y-4">
        <FormTextField
          name="name"
          label={t('nameLabel')}
          register={register}
          error={errors.name}
          autoComplete="name"
        />
        <FormTextField
          name="email"
          label={t('emailLabel')}
          register={register}
          error={errors.email}
          type="email"
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
        />
        <FormSubmitButton className="rounded-2xl bg-primary text-xs font-bold uppercase tracking-wider text-black">
          <LogIn size={15} />
          <span>{t('continueWithEmail')}</span>
        </FormSubmitButton>
        <button
          type="button"
          onClick={async () => {
            const values = getValues();
            if (!values.email) return;
            await signIn(values.email, values.name, AuthProvider.MagicLink);
          }}
          className="w-full text-center text-xs font-semibold text-primary"
        >
          {t('magicLink')}
        </button>
      </form>
      <div className="my-6 border-t border-glass-border pt-6">
        <AccountOAuthButtons
          onDemoProvider={async (provider) => {
            const values = getValues();
            if (!values.email) return;
            await signIn(values.email, values.name, provider);
          }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {t('needContact')}{' '}
        <Link
          href="/contact"
          className="font-semibold text-primary hover:underline"
        >
          {t('contactDirectly')}
        </Link>
      </p>
    </div>
  );
}

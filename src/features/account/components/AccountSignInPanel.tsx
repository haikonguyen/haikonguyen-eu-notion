'use client';

import { FormSubmitButton, FormTextField } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, Shield } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  type AccountSignInValues,
  createAccountSignInSchema,
} from '../create-account-sign-in-schema';

export interface AccountSignInPanelProps {
  onSignIn: (email: string) => void;
}

export function AccountSignInPanel({ onSignIn }: AccountSignInPanelProps) {
  const t = useTranslations('Account');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSignInValues>({
    resolver: zodResolver(createAccountSignInSchema(t)),
  });

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Shield size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t('portalTitle')}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">{t('portalSubtitle')}</p>
      </div>
      <form
        onSubmit={handleSubmit((values) => onSignIn(values.email))}
        className="space-y-4"
      >
        <FormTextField
          name="email"
          label={t('emailLabel')}
          register={register}
          error={errors.email}
          type="email"
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
        />
        <FormSubmitButton className="rounded-2xl bg-primary text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <LogIn size={15} />
          <span>{t('continueWithEmail')}</span>
        </FormSubmitButton>
      </form>
      <div className="mt-8 border-t border-white/10 pt-6 text-center">
        <p className="text-xs text-zinc-400">
          {t('needContact')}{' '}
          <Link
            href="/contact"
            className="font-semibold text-primary hover:underline"
          >
            {t('contactDirectly')}
          </Link>
        </p>
      </div>
    </div>
  );
}

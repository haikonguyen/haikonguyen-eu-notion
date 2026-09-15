'use client';

import { LanguageSwitcher } from '@components/layout/LanguageSwitcher';
import { ThemeToggle } from '@components/layout/ThemeToggle';
import { FormSubmitButton, FormTextField } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@lib/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  type AccountSettingsValues,
  createAccountSettingsSchema,
} from '../create-account-settings-schema';

export function AccountSettingsPanel() {
  const t = useTranslations('Account');
  const { user, preferences, updateProfile, updatePreferences } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSettingsValues>({
    resolver: zodResolver(createAccountSettingsSchema(t)),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      company: user?.company ?? '',
    },
  });

  return (
    <section className="space-y-6 rounded-3xl border border-glass-border bg-glass-surface p-6 backdrop-blur-xl">
      <h3 className="text-lg font-bold text-foreground">
        {t('settingsTitle')}
      </h3>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (values) => {
          await updateProfile(values);
        })}
      >
        <FormTextField
          name="name"
          label={t('nameLabel')}
          register={register}
          error={errors.name}
        />
        <FormTextField
          name="email"
          label={t('emailLabel')}
          register={register}
          error={errors.email}
          type="email"
          disabled
        />
        <FormTextField
          name="phone"
          label={t('phoneLabel')}
          register={register}
          error={errors.phone}
        />
        <FormTextField
          name="company"
          label={t('companyLabel')}
          register={register}
          error={errors.company}
        />
        <FormSubmitButton className="rounded-2xl bg-primary text-xs font-bold uppercase tracking-wider text-black">
          {t('saveProfile')}
        </FormSubmitButton>
      </form>
      <div className="space-y-3 border-t border-glass-border pt-4">
        <label className="flex items-center justify-between text-sm text-foreground">
          <span>{t('emailNotifications')}</span>
          <input
            type="checkbox"
            checked={preferences.emailNotifications}
            onChange={(event) =>
              updatePreferences({ emailNotifications: event.target.checked })
            }
          />
        </label>
        <label className="flex items-center justify-between text-sm text-foreground">
          <span>{t('bookingReminders')}</span>
          <input
            type="checkbox"
            checked={preferences.bookingReminders}
            onChange={(event) =>
              updatePreferences({ bookingReminders: event.target.checked })
            }
          />
        </label>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-foreground">
            {t('themePreference')}
          </span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-foreground">
            {t('languagePreference')}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </section>
  );
}

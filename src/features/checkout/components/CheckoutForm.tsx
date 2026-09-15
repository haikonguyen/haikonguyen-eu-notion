'use client';

import {
  FormSubmitButton,
  FormTextareaField,
  FormTextField,
} from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  type CheckoutFormValues,
  createCheckoutSchema,
} from '../create-checkout-schema';

export interface CheckoutFormProps {
  defaultName?: string;
  defaultEmail?: string;
  isSubmitting: boolean;
  onSubmit: (values: CheckoutFormValues) => Promise<void>;
}

export function CheckoutForm({
  defaultName,
  defaultEmail,
  isSubmitting,
  onSubmit,
}: CheckoutFormProps) {
  const t = useTranslations('Checkout');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(createCheckoutSchema(t)),
    defaultValues: {
      name: defaultName ?? '',
      email: defaultEmail ?? '',
      phone: '',
      company: '',
      notes: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        autoComplete="email"
      />
      <FormTextField
        name="phone"
        label={t('phoneLabel')}
        register={register}
        error={errors.phone}
        type="tel"
        autoComplete="tel"
      />
      <FormTextField
        name="company"
        label={t('companyLabel')}
        register={register}
        error={errors.company}
        autoComplete="organization"
      />
      <FormTextareaField
        name="notes"
        label={t('notesLabel')}
        register={register}
        error={errors.notes}
      />
      <FormSubmitButton
        isSubmitting={isSubmitting}
        className="rounded-2xl bg-primary text-xs font-bold uppercase tracking-wider text-black"
      >
        {t('submit')}
      </FormSubmitButton>
    </form>
  );
}

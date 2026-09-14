'use client';

import {
  FormSubmitButton,
  FormTextareaField,
  FormTextField,
} from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CartItem } from '@lib/store/useCartStore';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaBuilding,
  FaCommentAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
} from 'react-icons/fa';
import {
  type CheckoutFormValues,
  createCheckoutSchema,
} from './create-checkout-schema';

interface CheckoutFormProps {
  items: CartItem[];
  onSuccess: (emailSent: boolean) => void;
}

interface CheckoutResponse {
  ok?: boolean;
  emailSent?: boolean;
}

function toCheckoutResponse(value: unknown): CheckoutResponse {
  if (typeof value !== 'object' || value === null) {
    return {};
  }
  return {
    ok: 'ok' in value && value.ok === true,
    emailSent: 'emailSent' in value && value.emailSent === true,
  };
}

export function CheckoutForm({ items, onSuccess }: CheckoutFormProps) {
  const t = useTranslations('Checkout');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(createCheckoutSchema(t)),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          phone: data.phone?.trim() || undefined,
          company: data.company?.trim() || undefined,
          items,
        }),
      });
      const payload = toCheckoutResponse(await response.json());
      if (!response.ok || !payload.ok) {
        setSubmitError(t('submitFailed'));
        return;
      }
      onSuccess(Boolean(payload.emailSent));
    } catch {
      setSubmitError(t('submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-card p-6 md:p-8">
      <h2 className="mb-6 text-xl font-bold text-white">
        {t('contactDetails')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormTextField
          name="name"
          label={t('name')}
          register={register}
          error={errors.name}
          icon={<FaUser />}
          placeholder={t('namePlaceholder')}
          autoComplete="name"
        />
        <FormTextField
          name="email"
          label={t('email')}
          register={register}
          error={errors.email}
          icon={<FaEnvelope />}
          type="email"
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
        />
        <FormTextField
          name="phone"
          label={t('phone')}
          register={register}
          error={errors.phone}
          icon={<FaPhone />}
          type="tel"
          placeholder={t('phonePlaceholder')}
          autoComplete="tel"
        />
        <FormTextField
          name="company"
          label={t('company')}
          register={register}
          error={errors.company}
          icon={<FaBuilding />}
          placeholder={t('companyPlaceholder')}
          autoComplete="organization"
        />
        <FormTextareaField
          name="message"
          label={t('message')}
          register={register}
          error={errors.message}
          rows={5}
          placeholder={t('messagePlaceholder')}
        />
        {submitError && <p className="text-sm text-red-400">{submitError}</p>}
        <FormSubmitButton
          isSubmitting={isSubmitting}
          className="bg-primary text-black hover:bg-cyan-300"
        >
          {isSubmitting ? t('submitting') : t('submit')}
          <FaCommentAlt className="text-sm opacity-50" />
        </FormSubmitButton>
      </form>
    </div>
  );
}

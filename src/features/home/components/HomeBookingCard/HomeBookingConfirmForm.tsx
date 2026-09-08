'use client';

import { Button, ButtonSize, ButtonVariant } from '@components/ui/Button';
import { FormTextInput } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt } from 'react-icons/fa';
import { HOME_BOOKING_INPUT_CLASS } from '../../constants';
import {
  createHomeBookingSchema,
  type HomeBookingFormValues,
} from '../../create-home-booking-schema';
import type { HomeBookingConfirmFormProps } from './types';

export function HomeBookingConfirmForm({
  isSubmitting,
  statusMessage,
  onConfirm,
}: HomeBookingConfirmFormProps) {
  const t = useTranslations('Home');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HomeBookingFormValues>({
    resolver: zodResolver(createHomeBookingSchema(t)),
    defaultValues: { name: '', email: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    const didConfirm = await onConfirm(values);
    if (didConfirm) {
      reset({ name: '', email: '' });
    }
  });

  return (
    <form onSubmit={onSubmit} className="mt-auto flex flex-col gap-2">
      <FormTextInput
        type="text"
        autoComplete="name"
        aria-label={t('bookingNameLabel')}
        placeholder={t('bookingNamePlaceholder')}
        hasError={Boolean(errors.name)}
        className={HOME_BOOKING_INPUT_CLASS}
        {...register('name')}
      />
      {errors.name ? (
        <p className="text-[10px] text-red-400">{errors.name.message}</p>
      ) : null}
      <FormTextInput
        type="email"
        autoComplete="email"
        aria-label={t('bookingEmailLabel')}
        placeholder={t('bookingEmailPlaceholder')}
        hasError={Boolean(errors.email)}
        className={HOME_BOOKING_INPUT_CLASS}
        {...register('email')}
      />
      {errors.email ? (
        <p className="text-[10px] text-red-400">{errors.email.message}</p>
      ) : null}
      {statusMessage ? (
        <p className="text-[10px] text-primary/90">{statusMessage}</p>
      ) : null}
      <Button
        type="submit"
        variant={ButtonVariant.Primary}
        size={ButtonSize.Lg}
        disabled={isSubmitting}
        className="w-full"
      >
        <span>
          {isSubmitting ? t('bookingSubmitting') : t('confirmBooking')}
        </span>
        <FaCalendarAlt className="text-xs opacity-70" />
      </Button>
    </form>
  );
}

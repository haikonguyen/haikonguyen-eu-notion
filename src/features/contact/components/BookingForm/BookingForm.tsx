'use client';

import { FormSubmitButton, FormTextField } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaClock, FaEnvelope, FaUser } from 'react-icons/fa';
import { BookingFormSuccess } from './BookingFormSuccess';
import {
  type BookingFormValues,
  createBookingSchema,
} from './create-booking-schema';

const BOOKING_SUBMIT_DELAY_MS = 1500;

export function BookingForm() {
  const t = useTranslations('Contact.booking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(createBookingSchema(t)),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, BOOKING_SUBMIT_DELAY_MS),
      );
      setIsSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <BookingFormSuccess title={t('successTitle')} body={t('successBody')} />
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-card p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <FaCalendarAlt className="text-xl text-primary" />
        <h3 className="text-xl font-bold">{t('title')}</h3>
      </div>
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
        <div className="grid grid-cols-2 gap-4">
          <FormTextField
            name="date"
            label={t('date')}
            register={register}
            error={errors.date}
            type="date"
          />
          <FormTextField
            name="time"
            label={t('time')}
            register={register}
            error={errors.time}
            type="time"
          />
        </div>
        <FormSubmitButton
          isSubmitting={isSubmitting}
          className="bg-primary text-primary-foreground hover:opacity-90"
        >
          {t('confirm')}
          <FaClock className="text-sm opacity-50" />
        </FormSubmitButton>
      </form>
    </div>
  );
}

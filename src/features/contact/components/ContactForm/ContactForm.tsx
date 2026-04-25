'use client';

import {
  FormSubmitButton,
  FormTextareaField,
  FormTextField,
} from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCommentAlt, FaEnvelope, FaPaperPlane, FaUser } from 'react-icons/fa';
import { ContactFormSuccess } from './ContactFormSuccess';
import {
  type ContactFormValues,
  createContactSchema,
} from './create-contact-schema';

const MESSAGE_TEXTAREA_ROWS = 5;

export function ContactForm() {
  const t = useTranslations('Contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(t)),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sendgrid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mailMessage: data.message,
        }),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error('Message failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <ContactFormSuccess
        title={t('successTitle')}
        body={t('successBody')}
        actionLabel={t('sendAnother')}
        onReset={() => setIsSuccess(false)}
      />
    );
  }

  return (
    <div className="h-full rounded-3xl border border-white/10 bg-card p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <FaCommentAlt className="text-xl text-primary" />
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
        <FormTextareaField
          name="message"
          label={t('message')}
          register={register}
          error={errors.message}
          rows={MESSAGE_TEXTAREA_ROWS}
          placeholder={t('messagePlaceholder')}
        />
        <FormSubmitButton
          isSubmitting={isSubmitting}
          className="bg-white text-black hover:bg-neutral-200"
        >
          {t('send')}
          <FaPaperPlane className="text-sm opacity-50" />
        </FormSubmitButton>
      </form>
    </div>
  );
}

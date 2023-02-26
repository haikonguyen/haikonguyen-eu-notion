import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { EmailBodyProps } from 'global-types';
import { zodResolver } from '@hookform/resolvers/zod';
import mailValidationSchema from './validation';
import Box from '@mui/material/Box';
import useStore from '@state/store';
import { ToastType } from '../../constants';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { setToastSettings } = useStore();
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<EmailBodyProps>({
    resolver: zodResolver(mailValidationSchema),
  });
  const onSubmit: SubmitHandler<EmailBodyProps> = async (emailContent) => {
    setLoading(true);

    try {
      const response = await fetch('/api/sendgrid', {
        method: 'POST',
        body: JSON.stringify(emailContent),
      });

      const data = await response.json();
      data.status = 200 && setLoading(false);
      setToastSettings(
        true,
        ToastType.SUCCESS,
        'Thank you, your email was sent successfully 🎉.'
      );
      reset();
    } catch (e) {
      setToastSettings(
        true,
        ToastType.ERROR,
        'Ouch, there was a service error, please try again later 😔.'
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full mb-4"
            label={errors.name ? 'Required *' : 'Your name:'}
            variant="standard"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
        name="name"
        control={control}
        defaultValue=""
      />
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full mb-8"
            label={errors.email ? 'Required *' : 'Your email:'}
            variant="standard"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
        name="email"
        control={control}
        defaultValue=""
      />
      <Box
        sx={{ color: errors.mailMessage ? 'error.main' : 'text.secondary' }}
        className="w-full"
      >
        {errors.mailMessage ? 'Required *' : 'Your message:'}
      </Box>
      <textarea
        className="w-full mb-4 rounded-sm h-56 border border-b-gray-500 bg-transparent"
        {...register('mailMessage')}
      />
      {errors.mailMessage?.message && (
        <Box sx={{ color: 'error.main' }} className="w-full">
          {errors.mailMessage?.message}
        </Box>
      )}

      <div className="flex w-full justify-end">
        <LoadingButton
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          className="mt-3"
          type="submit"
        >
          Send
        </LoadingButton>
      </div>
    </form>
  );
};

export default ContactForm;

'use client';

import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { EmailBodyProps } from 'global-types';
import { zodResolver } from '@hookform/resolvers/zod';
import mailValidationSchema from './validation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useStore } from '@lib/store';
import { ToastType } from '@config';

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { setToastSettings } = useStore();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmailBodyProps>({
    resolver: zodResolver(mailValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      mailMessage: '',
    },
  });

  const onSubmit: SubmitHandler<EmailBodyProps> = async (emailContent) => {
    setLoading(true);

    try {
      const response = await fetch('/api/sendgrid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent),
      });

      const data = await response.json();
      if (data.status === 200) {
        setLoading(false);
      }
      setToastSettings(
        true,
        ToastType.SUCCESS,
        'Thank you, your email was sent successfully 🎉.',
      );
      reset();
    } catch {
      setToastSettings(
        true,
        ToastType.ERROR,
        'Ouch, there was a service error, please try again later 😔.',
      );
      setLoading(false);
    }
  };

  return (
    <Box className="w-full max-w-2xl mx-auto my-12">
      <Paper
        elevation={0}
        className="p-8 md:p-12 rounded-3xl border border-gray-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      >
        <Typography
          variant="h5"
          component="h2"
          className="mb-8 font-semibold text-gray-800 dark:text-gray-100"
        >
          Send me a message
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Your Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={inputStyles}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Your Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={inputStyles}
              />
            )}
          />

          <Controller
            name="mailMessage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                minRows={5}
                error={!!errors.mailMessage}
                helperText={errors.mailMessage?.message}
                sx={inputStyles}
              />
            )}
          />

          <Box className="flex w-full justify-end pt-4">
            <LoadingButton
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              type="submit"
              disableElevation
              sx={{
                borderRadius: '12px',
                padding: '12px 32px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Send Message
            </LoadingButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactForm;

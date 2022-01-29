import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@material-ui/icons/Send';
import { EmailBodyProps } from 'global-types';
import { zodResolver } from '@hookform/resolvers/zod';
import mailValidationSchema from './validation';
import Box from '@mui/material/Box';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<EmailBodyProps>({
    resolver: zodResolver(mailValidationSchema),
  });
  const onSubmit: SubmitHandler<EmailBodyProps> = async (emailBody) => {
    if (isValid) {
      setLoading(true);
      const response = await fetch('/api/sendgrid', {
        method: 'POST',
        body: JSON.stringify(emailBody),
      });

      console.log('isValid form');

      const data = await response.json();
      data.status = 'OK' && setLoading(false);
      reset();
    }
  };

  return (
    <form method="post" className="flex flex-wrap">
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            className="w-full mb-4"
            label={errors.name ? 'Required' : 'Your name:'}
            variant="standard"
            required
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
            label={errors.email ? 'Required' : 'Your email:'}
            variant="standard"
            required
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
          onClick={handleSubmit(onSubmit)}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          className="mt-3"
        >
          Send
        </LoadingButton>
      </div>
    </form>
  );
};

export default ContactForm;

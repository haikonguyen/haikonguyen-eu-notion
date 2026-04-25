import type { FieldValues } from 'react-hook-form';
import { FormField } from './FormField';
import { FormTextarea } from './FormTextarea';
import type { FormTextareaFieldProps } from './types';

export function FormTextareaField<T extends FieldValues>({
  name,
  label,
  register,
  error,
  ...textareaProps
}: FormTextareaFieldProps<T>) {
  return (
    <FormField label={label} htmlFor={String(name)} error={error?.message}>
      <FormTextarea
        hasError={Boolean(error)}
        {...register(name)}
        {...textareaProps}
        id={String(name)}
      />
    </FormField>
  );
}

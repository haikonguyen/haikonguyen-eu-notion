import type { FieldValues } from 'react-hook-form';
import { FormField } from './FormField';
import { FormTextInput } from './FormTextInput';
import type { FormTextFieldProps } from './types';

export function FormTextField<T extends FieldValues>({
  name,
  label,
  register,
  error,
  icon,
  ...inputProps
}: FormTextFieldProps<T>) {
  return (
    <FormField label={label} htmlFor={String(name)} error={error?.message}>
      <FormTextInput
        hasError={Boolean(error)}
        icon={icon}
        {...register(name)}
        {...inputProps}
        id={String(name)}
      />
    </FormField>
  );
}

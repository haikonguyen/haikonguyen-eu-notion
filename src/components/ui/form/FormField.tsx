import { cn } from '@lib/utils';
import { FORM_ERROR_CLASS, FORM_LABEL_CLASS } from './constants';
import type { FormFieldProps } from './types';

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={htmlFor} className={FORM_LABEL_CLASS}>
        {label}
      </label>
      {children}
      {error ? <p className={FORM_ERROR_CLASS}>{error}</p> : null}
    </div>
  );
}

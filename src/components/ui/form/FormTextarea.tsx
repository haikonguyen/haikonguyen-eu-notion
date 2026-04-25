import { cn } from '@lib/utils';
import { FORM_CONTROL_CLASS, FORM_CONTROL_ERROR_CLASS } from './constants';
import type { FormTextareaProps } from './types';

export function FormTextarea({
  hasError = false,
  className,
  ...textareaProps
}: FormTextareaProps) {
  return (
    <textarea
      {...textareaProps}
      className={cn(
        FORM_CONTROL_CLASS,
        'resize-none px-4',
        hasError && FORM_CONTROL_ERROR_CLASS,
        className,
      )}
    />
  );
}

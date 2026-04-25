import { cn } from '@lib/utils';
import { FORM_SUBMIT_CLASS } from './constants';
import type { FormSubmitButtonProps } from './types';

export function FormSubmitButton({
  isSubmitting = false,
  children,
  className,
  disabled,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className={cn(FORM_SUBMIT_CLASS, className)}
    >
      {isSubmitting ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}

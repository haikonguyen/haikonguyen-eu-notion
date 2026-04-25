import { cn } from '@lib/utils';
import {
  FORM_CONTROL_CLASS,
  FORM_CONTROL_ERROR_CLASS,
  FORM_ICON_CLASS,
} from './constants';
import type { FormTextInputProps } from './types';

export function FormTextInput({
  hasError = false,
  icon,
  className,
  ...inputProps
}: FormTextInputProps) {
  const input = (
    <input
      {...inputProps}
      className={cn(
        FORM_CONTROL_CLASS,
        icon ? 'pr-4 pl-11' : 'px-4',
        hasError && FORM_CONTROL_ERROR_CLASS,
        className,
      )}
    />
  );

  if (!icon) {
    return input;
  }

  return (
    <div className="relative">
      <span className={FORM_ICON_CLASS}>{icon}</span>
      {input}
    </div>
  );
}

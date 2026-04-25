import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export interface FormTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon?: ReactNode;
}

export interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export interface FormSubmitButtonProps {
  isSubmitting?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface FormTextFieldProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  icon?: ReactNode;
}

export interface FormTextareaFieldProps<T extends FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

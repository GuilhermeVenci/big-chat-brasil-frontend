import { cn } from '@/utils/cn';
import React, { FC, InputHTMLAttributes } from 'react';

interface TextInputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
}

const TextInput: FC<TextInputTypes> = ({
  label,
  id,
  name,
  type = 'text',
  autoComplete = 'off',
  required = false,
  inputClassName,
  labelClassName,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn(
          'block text-sm font-medium text-neutral-800',
          labelClassName
        )}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={cn(
          'mt-1 block w-full px-3 py-2 min-h-12',
          'border border-neutral-300 rounded-md',
          'placeholder-neutral-400 sm:text-sm text-neutral-950',
          'focus:outline-none focus:ring-blue-500 focus:border-blue-500',
          inputClassName
        )}
        {...props}
      />
    </div>
  );
};

export default TextInput;

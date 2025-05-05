'use client';
import { cn } from '@/utils/cn';
import React, { FC, InputHTMLAttributes, useState, ChangeEvent } from 'react';
import TextInput from '../../ui/text-input';

interface EmailInputTypes
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  name: string;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
}

const EmailInput: FC<EmailInputTypes> = ({
  label,
  id,
  name,
  inputClassName,
  labelClassName,
  className,
  ...props
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(isValidEmail);
  };

  return (
    <div className={cn('relative pb-[18px]', className)}>
      <TextInput
        label={label}
        id={id}
        name={name}
        type="email"
        autoComplete="email"
        className={cn(inputClassName, !isValid ? 'border-red-600' : '')}
        onChange={handleInputChange}
        {...props}
      />
      {!isValid && (
        <span className="absolute bottom-0 left-0 ml-3 text-red-600 text-xs">
          E-mail inválido
        </span>
      )}
    </div>
  );
};

export default EmailInput;

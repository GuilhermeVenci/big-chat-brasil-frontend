'use client';
import React, { FC, InputHTMLAttributes, useState, ChangeEvent } from 'react';
import TextInput from '../../ui/text-input';
import { cn } from '@/utils/cn';

interface PhoneInputTypes
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
  name: string;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 3) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  }
  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
    2,
    7
  )}-${phoneNumber.slice(7, 11)}`;
};

const PhoneInput: FC<PhoneInputTypes> = ({
  label,
  id,
  name,
  inputClassName,
  className,
  onChange,
  value,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatPhoneNumber(rawValue);
    setInternalValue(formattedValue);

    const isValidPhone = /^\(\d{2}\) \d{5}-\d{4}$/.test(formattedValue);
    setIsValid(isValidPhone);

    if (onChange) {
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          name,
          value: rawValue.replace(/[^\d]/g, ''),
        },
      };
      onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={cn('relative pb-[18px]', className)}>
      <TextInput
        label={label}
        id={id}
        name={name}
        type="tel"
        value={internalValue}
        autoComplete="tel"
        className={cn(inputClassName, !isValid ? 'border-red-600' : '')}
        onChange={handleInputChange}
        {...props}
      />
      {!isValid && (
        <span className="absolute bottom-0 left-0 ml-3 text-red-600 text-xs">
          Número de telefone inválido
        </span>
      )}
    </div>
  );
};

export default PhoneInput;

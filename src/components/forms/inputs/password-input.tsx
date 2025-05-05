'use client';
import { cn } from '@/utils/cn';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { FC, InputHTMLAttributes, useState } from 'react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  show?: boolean;
  handleShow?: () => void;
}

const PasswordInput: FC<PasswordInputProps> = ({
  id,
  name,
  label,
  show,
  handleShow,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  function toggleVisible() {
    setVisible((prev) => !prev);
  }
  return (
    <div className="text-black">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-800"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={
            !!show
              ? show
                ? 'text'
                : 'password'
              : visible
              ? 'text'
              : 'password'
          }
          autoComplete="current-password"
          required
          {...props}
          className={cn(
            'mt-1 block w-full px-3 py-2 pr-20 min-h-12',
            'border border-neutral-300 rounded-md',
            'placeholder-neutral-400 sm:text-sm text-neutral-950',
            'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          )}
        ></input>
        <button
          type="button"
          onClick={handleShow || toggleVisible}
          className={cn(
            'absolute inset-y-0 right-0 py-2 px-4 rounded-r-md',
            'flex items-center justify-center cursor-pointer',
            'text-blue-500'
          )}
        >
          {visible ? (
            <EyeSlashIcon className="size-6 text-inherit" />
          ) : (
            <EyeIcon className="size-6 text-inherit" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;

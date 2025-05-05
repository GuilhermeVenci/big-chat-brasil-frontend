'use client';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/utils/cn';
import { useFormStatus } from 'react-dom';
import { ThreeDotsWave } from '../custom/tree-dots-wave';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={cn(
        'h-12 w-fit max-w-sm max-sm:w-full py-2 px-6 rounded-md cursor-pointer',
        'bg-blue-500 hover:bg-blue-600 mt-2',
        'text-white text-base font-medium',
        pending ? 'bg-blue-600' : '',
        className
      )}
      {...props}
    >
      {pending ? <ThreeDotsWave color="bg-white" /> : children}
    </button>
  );
};

export default Button;

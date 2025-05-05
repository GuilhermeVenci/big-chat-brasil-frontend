'use client';
import { Listbox } from '@headlessui/react';
import { FC } from 'react';
import { cn } from '@/utils/cn';
import { CheckIcon } from '@heroicons/react/24/solid';

interface SelectInputTypes {
  label: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
}

const SelectInput: FC<SelectInputTypes> = ({
  label,
  id,
  name,
  options,
  value,
  onChange,
  inputClassName,
  labelClassName,
  className,
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
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button
              id={id}
              className={cn(
                'relative w-full cursor-default rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
                inputClassName
              )}
            >
              <span className="block truncate">
                {options.find((option) => option.value === value)?.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="h-5 w-5 text-neutral-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Listbox.Options
              className={cn(
                'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              )}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      active ? 'bg-neutral-200' : '',
                      'cursor-default select-none relative py-2 pl-10 pr-4 text-gray-900'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5 text-inherit" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default SelectInput;

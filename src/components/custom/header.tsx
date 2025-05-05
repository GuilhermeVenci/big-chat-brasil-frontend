'use client';
import { logout } from '@/app/(auth)/actions/server';
import logoutClient from '@/app/(auth)/client-actions';
import { useClient } from '@/context/client-context';
import { useConversations } from '@/context/conversations-context';
import { useUser } from '@/context/user-context';
import { cn } from '@/utils/cn';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [{ name: 'Mensagens', href: '/messages' }];

export default function Header() {
  const pathname = usePathname();
  const [currentItem, setCurrentItem] = useState('');
  const { resetUser } = useUser();
  const { resetClient } = useClient();
  const { resetConversations } = useConversations();

  const logoutAndClearContexts = () => {
    logoutClient();
    resetUser();
    resetClient();
    resetConversations();
  };

  useEffect(() => {
    const currentNavItem = navigation.find((item) => item.href === pathname);
    if (currentNavItem) {
      setCurrentItem(currentNavItem.name);
    }
  }, [pathname]);

  return (
    <header className="bg-white py-2">
      <Popover as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-3 sm:pr-6 lg:px-4 lg:pr-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <PopoverButton className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </PopoverButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      width={32}
                      height={32}
                      src="/brand-icon.svg"
                      alt="Icon Company"
                      className="h-28 w-auto"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Abri o menu</span>
                        <Image
                          width={32}
                          height={32}
                          src="/images/avatar-placehoder.png"
                          alt="Avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none border border-neutral-200">
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={cn(
                                focus ? 'bg-neutral-100' : '',
                                'block px-4 py-2 text-sm text-neutral-700'
                              )}
                              onClick={logoutAndClearContexts}
                            >
                              Sair
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <PopoverPanel className="sm:hidden absolute z-10 bg-white w-full">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <PopoverButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={cn(
                      currentItem === item.name
                        ? 'bg-neutral-300 text-neutral-900'
                        : 'text-neutral-900 hover:bg-neutral-300 hover:text-neutral-800',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={
                      currentItem === item.name ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </PopoverButton>
                ))}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </header>
  );
}

import Header from '@/components/custom/header';
import { ClientProvider } from '@/context/client-context';
import { ConversationsProvider } from '@/context/conversations-context';
import { UserProvider } from '@/context/user-context';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const LayoutWorkspace = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <UserProvider>
      <ClientProvider>
        <ConversationsProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
          <Header />
          {children}
        </ConversationsProvider>
      </ClientProvider>
    </UserProvider>
  );
};

export default LayoutWorkspace;

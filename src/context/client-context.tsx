'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import apiRequest from '@/utils/api';
import { useUser } from '@/context/user-context';
import { ClientType } from '@/types/clients/client';

type ClientContextType = {
  client: ClientType | null;
  getClientData: (forceUpdate?: boolean) => Promise<void>;
  resetClient: () => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [client, setClient] = useState<ClientType | null>(null);

  const getClientData = useCallback(
    async (forceUpdate = false) => {
      if (user) {
        try {
          const url = `/clients/user/${user.id}${
            forceUpdate ? `?t=${Date.now()}` : ''
          }`;
          const response = await apiRequest(url);
          if (response) {
            setClient(response);
          }
        } catch (error) {
          console.log('CLIENTE NÃO CADASTRADO.', error);
        }
      }
    },
    [user]
  );

  const resetClient = useCallback(() => setClient(null), []);

  useEffect(() => {
    getClientData();
  }, [user, getClientData]);

  return (
    <ClientContext.Provider value={{ client, getClientData, resetClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

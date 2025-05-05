'use client';
import ClientForm from '@/components/forms/client-form';
import { useUser } from '@/context/user-context';
import { useEffect, useState } from 'react';
import MessagesPage from './page';
import apiRequest from '@/utils/api';
import LoadingMessages from './loading';
import { ClientType } from '@/types/clients/client';

const MessagesLayout = () => {
  const { user } = useUser();
  const [client, setClient] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyClient = async () => {
      if (user) {
        try {
          const clientResponse: ClientType = await apiRequest(
            '/clients/user/' + user?.id
          );
          if (clientResponse && clientResponse.id) {
            setClient(clientResponse);
          } else {
            setClient(null);
          }
        } catch {
          setClient(null);
        } finally {
          setLoading(false);
        }
      }
    };
    verifyClient();
  }, [user]);

  const handleClientCreated = (newClient: ClientType) => {
    setClient(newClient);
  };

  return (
    <div className="px-6 pb-6 sm:px-12 sm:pb-12 h-[calc(100dvh-80px)] max-md:h-auto min-h-96">
      {loading ? (
        <LoadingMessages />
      ) : client ? (
        <MessagesPage />
      ) : (
        <ClientForm onClientCreated={handleClientCreated} />
      )}
    </div>
  );
};

export default MessagesLayout;

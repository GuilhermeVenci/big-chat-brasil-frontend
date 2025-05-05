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
import { Conversation } from '@/types/conversations';
import { Message } from '@/types/messages';
import toast from 'react-hot-toast';
import { useClient } from './client-context';

type ConversationsContextType = {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  selectConversation: (conversation: Conversation) => void;
  getConversations: () => void;
  createConversation: (payload: Partial<Conversation>) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  resetConversations: () => void;
  messages: Message[];
  getMessagesByConversation: (
    convId: string,
    options?: {
      limit?: number;
      lastTimestamp?: number;
      order?: 'ASC' | 'DESC';
    }
  ) => Promise<Message[] | undefined>;
  sendMessage: (
    payload: Omit<Message, 'id' | 'timestamp' | 'status'>
  ) => Promise<void>;
};

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

export const ConversationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useUser();
  const { client, getClientData } = useClient();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const getConversations = useCallback(async () => {
    if (user) {
      try {
        const response = await apiRequest(`/conversations`);
        setConversations(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  const createConversation = useCallback(
    async (payload: Partial<Conversation>) => {
      if (user) {
        try {
          const response = await apiRequest(`/conversations`, 'POST', payload);
          setConversations((prev) => [...prev, response]);
          setSelectedConversation(response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [user]
  );

  const getMessagesByConversation = useCallback(
    async (
      convId: string,
      options?: {
        limit?: number;
        lastTimestamp?: number;
        order?: 'ASC' | 'DESC';
        appendToTop?: boolean;
      }
    ) => {
      if (!user) return;

      try {
        const queryParams = new URLSearchParams({
          limit: (options?.limit || 20).toString(),
          order: options?.order || 'DESC',
          lastTimestamp: (options?.lastTimestamp || Date.now()).toString(),
        });

        const response: Message[] = await apiRequest(
          `/conversations/${convId}/messages?${queryParams}`
        );

        const sortedMessages = [...response].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        setMessages((prev) =>
          options?.appendToTop ? [...sortedMessages, ...prev] : sortedMessages
        );

        return sortedMessages;
      } catch (error) {
        console.error(error);
      }
    },
    [user]
  );

  const sendMessage = useCallback(
    async (values: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
      if (!user || !client || !selectedConversation) return;
      const convId = selectedConversation.id;

      const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`;
      const optimisticMessage: Message = {
        id: tempId,
        ...values,
        timestamp: new Date().toISOString(),
        status: 'sending',
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      try {
        const newMessage: Message = await apiRequest(
          '/messages',
          'POST',
          values
        );

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...newMessage, status: 'sent' } : msg
          )
        );

        await getClientData(true);

        const updatedMessages = await getMessagesByConversation(convId, {
          limit: 20,
          order: 'DESC',
        });

        if (
          updatedMessages &&
          !updatedMessages.some((msg) => msg.id === newMessage.id)
        ) {
          setMessages((prev) => [...prev, newMessage]);
        }
      } catch (error: any) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, status: 'failed' } : msg
          )
        );

        toast.error(
          error?.response?.data?.message || 'Erro ao enviar mensagem'
        );
      }
    },
    [
      user,
      client,
      selectedConversation,
      getMessagesByConversation,
      getClientData,
    ]
  );

  const selectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
    getMessagesByConversation(conversation.id, {
      limit: 20,
      order: 'DESC',
      lastTimestamp: Date.now(),
      appendToTop: false,
    });
  };

  const deleteConversation = useCallback(
    async (id: string) => {
      if (!user) return;
      try {
        await apiRequest(`/conversations/${id}`, 'DELETE');
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (selectedConversation?.id === id) {
          setSelectedConversation(null);
          setMessages([]);
        }
      } catch (error) {
        console.error('Erro ao deletar conversa:', error);
      }
    },
    [user, selectedConversation]
  );

  const resetConversations = useCallback(() => {
    setConversations([]);
    setMessages([]);
    setSelectedConversation(null);
  }, []);

  useEffect(() => {
    if (user) getConversations();
  }, [user?.id]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        selectedConversation,
        selectConversation,
        getConversations,
        createConversation,
        deleteConversation,
        resetConversations,
        messages,
        getMessagesByConversation,
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      'useConversations must be used within a ConversationsProvider'
    );
  }
  return context;
};

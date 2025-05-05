'use client';
import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useConversations } from '@/context/conversations-context';

const MessageList = ({ className }: { className?: string }) => {
  const {
    selectedConversation,
    messages,
    getMessagesByConversation,
    sendMessage,
  } = useConversations();

  const listRef = useRef<HTMLUListElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    if (selectedConversation) {
      setHasMore(true);
      getMessagesByConversation(selectedConversation.id, {
        limit: 20,
        order: 'DESC',
        appendToTop: false,
      }).then((initialMessages) => {
        if (!initialMessages || initialMessages.length < 20) {
          setHasMore(false);
        }
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'auto' });
        }, 100);
      });
    }
  }, [selectedConversation]);

  const handleScroll = useCallback(async () => {
    const container = listRef.current;
    if (!container || isFetchingMore || !hasMore || messages.length === 0)
      return;

    if (container.scrollTop < 100) {
      setIsFetchingMore(true);
      const oldestMessage = messages[0];
      const oldestTimestamp = new Date(oldestMessage.timestamp).getTime();

      const olderMessages = await getMessagesByConversation(
        selectedConversation!.id,
        {
          limit: 20,
          lastTimestamp: oldestTimestamp,
          order: 'ASC',
          appendToTop: true,
        }
      );

      if (!olderMessages || olderMessages.length < 20) {
        setHasMore(false);
      }

      setIsFetchingMore(false);
    }
  }, [messages, selectedConversation, isFetchingMore, hasMore]);
  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleRetry = async (message: any) => {
    const { id, timestamp, status, ...data } = message;
    await sendMessage(data);
  };

  return (
    <div
      className={cn('h-full flex flex-col w-full max-md:h-[50dvh]', className)}
    >
      <ul
        ref={listRef}
        role="list"
        className="w-full h-full overflow-auto space-y-4 px-4 py-2"
      >
        {messages && messages.length > 0 ? (
          messages.map((message) => {
            const isFailed =
              (message?.status || message?.statusCode) === 'failed';
            const isSending =
              (message?.status || message?.statusCode) === 'sending';

            return (
              <li
                key={message.id}
                className={cn(
                  'w-fit max-w-4/5 flex flex-col justify-between p-4 mb-4 rounded-xl shadow-sm gap-y-2 ml-auto',
                  isFailed
                    ? 'bg-red-100 border border-red-300'
                    : isSending
                    ? 'bg-yellow-100'
                    : 'bg-emerald-100'
                )}
              >
                <div className="w-fit rounded-lg flex flex-row gap-x-2 items-center">
                  <span
                    className={cn(
                      'w-fit h-fit px-2 py-1 text-xs font-bold rounded text-white',
                      message.priority === 'urgent'
                        ? 'bg-red-600'
                        : 'bg-cyan-600'
                    )}
                  >
                    {message.priority}
                  </span>
                  <span className="text-xs italic ml-2 text-neutral-600">
                    {isSending
                      ? 'Enviando...'
                      : isFailed
                      ? 'Erro ao enviar'
                      : `Enviado ${message.timestamp}`}
                  </span>
                </div>

                <div className="flex-1 max-h-44 overflow-y-auto bg-neutral-100 rounded-md p-4 text-sm scrollbar-hide">
                  <p className="break-words">{message.content}</p>
                </div>

                {isFailed && (
                  <button
                    onClick={() => handleRetry(message)}
                    className="text-xs text-red-600 underline w-fit"
                  >
                    Tentar novamente
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <p className="text-neutral-400 text-balance">
              {!selectedConversation
                ? 'Selecione uma conversa para enviar uma mensagem'
                : 'Nenhuma mensagem ainda'}
            </p>
          </div>
        )}

        {isFetchingMore && (
          <li className="text-center text-sm text-neutral-400">
            Carregando...
          </li>
        )}

        <div ref={bottomRef} />
      </ul>
    </div>
  );
};

export default MessageList;

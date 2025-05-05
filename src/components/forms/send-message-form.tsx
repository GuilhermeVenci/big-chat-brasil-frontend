'use client';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/button';
import { useConversations } from '@/context/conversations-context';
import { useUser } from '@/context/user-context';
import { useClient } from '@/context/client-context';

const SendMessageForm = ({ className }: { className?: string }) => {
  const [isPriority, setIsPriority] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const { selectedConversation, sendMessage } = useConversations();
  const { user } = useUser();
  const { client } = useClient();

  const handleSendMessage = async () => {
    setError(false);

    if (
      !selectedConversation?.id ||
      !selectedConversation?.recipientChannel ||
      !user?.id ||
      !client?.id ||
      !text.trim()
    ) {
      setError(true);
      return;
    }

    const values = {
      senderId: client.id,
      conversationId: selectedConversation.id,
      recipientChannel: selectedConversation.recipientChannel,
      priority: (isPriority ? 'urgent' : 'normal') as 'urgent' | 'normal',
      content: text,
    };

    await sendMessage(values);
    setText('');
  };

  return (
    <div className={cn('container flex-0', className)}>
      <div
        className={cn(
          'block w-full p-3 bg-gray-100 shadow-inner border border-neutral-200',
          'shadow-inner rounded-2xl',
          'placeholder-neutral-400 sm:text-sm text-neutral-950',
          'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        )}
      >
        <textarea
          id="message"
          placeholder="Texto da Mensagem"
          rows={3}
          disabled={!selectedConversation}
          className={cn(
            'mt-1 block w-full px-3 py-2',
            'rounded-md resize-none',
            'placeholder-neutral-400 text-base text-neutral-950',
            'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          )}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex w-full items-end justify-between">
          <label className="flex items-center font-semibold text-base mb-3 mt-auto ml-2 max-md:w-1/2!">
            <input
              type="checkbox"
              name="contactMethod"
              value="whatsapp"
              checked={isPriority}
              onChange={() => setIsPriority((prev) => !prev)}
              className="size-6 rounded-md mr-3 "
              disabled={!selectedConversation}
            />
            Urgente
          </label>
          <Button
            onClick={handleSendMessage}
            className="mt-3 ml-auto rounded-xl max-md:w-1/2!"
            disabled={!selectedConversation}
          >
            Enviar
          </Button>
        </div>
      </div>
      {error ? (
        <span className="text-xs text-red-600">
          Preencha todos os campos para enviar a mensagem
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SendMessageForm;

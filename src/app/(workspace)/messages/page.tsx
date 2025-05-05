'use client';
import ConversationList from '@/components/custom/conversation-list';
import MessageList from '@/components/custom/message-list';
import SendMessageForm from '@/components/forms/send-message-form';

const MessagesPage = () => {
  return (
    <div className="flex max-md:flex-col justify-between w-full gap-4 p-4 bg-neutral-200 h-full rounded-4xl shadow-inner">
      <div className="h-full min-w-xs w-full md:max-w-sm gap-4">
        <ConversationList />
      </div>

      <div className="flex flex-col h-full w-full max-lg:gap-6 overflow-hidden gap-6 bg-white p-4 rounded-3xl shadow">
        <div className="flex-1 min-h-0 w-full overflow-y-auto rounded-2xl bg-gray-100 border border-neutral-200 px-3 shadow-inner">
          <MessageList />
        </div>
        <div className="flex-shrink-0 w-full flex justify-between">
          <div className="flex flex-1 items-center gap-6">
            <div className="w-full">
              <SendMessageForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

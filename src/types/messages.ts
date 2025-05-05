type BackendMessageStatus =
  | 'queued'
  | 'processing'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed';

export type Message = {
  id: string;
  senderId?: string;
  conversationId: string;
  recipientChannel: string;
  content: string;
  timestamp: string;
  priority: 'normal' | 'urgent';
  status: BackendMessageStatus | 'sending';
};

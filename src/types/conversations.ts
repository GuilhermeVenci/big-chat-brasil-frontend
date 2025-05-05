import { Message } from './messages';

export type Conversation = {
  id: string;
  recipientId?: string;
  recipientName: string;
  recipientChannel: string;
  messages?: Message[];
};

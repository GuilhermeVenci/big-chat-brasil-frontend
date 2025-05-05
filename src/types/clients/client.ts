export type ClientType = {
  id: string;
  userId?: string;
  planType: string;
  channel: string;
  name: string;
  balance?: number;
  limit?: number;
};

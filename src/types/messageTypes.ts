// src/types/messageTypes.ts

export interface Message {
  id: string;
  name: string;
  description: string;
  date: string;
  lastMessage?: string;
  unread?: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  time: string;
  isSender: boolean;
  timestamp: Date;
}

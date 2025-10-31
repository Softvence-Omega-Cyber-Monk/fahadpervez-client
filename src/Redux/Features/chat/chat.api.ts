// chat.api.ts
// Chat API using your existing baseApi

import { baseApi } from "@/Redux/BaseApi"; // Adjust path to your baseApi

// Types matching your backend interfaces
export interface IMessage {
  senderId: string;
  senderType: 'CUSTOMER' | 'VENDOR';
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface IConversation {
  _id: string;
  customerId: string;
  vendorId: string;
  productId?: string;
  messages: IMessage[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: {
    customer: number;
    vendor: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IStartConversationRequest {
  customerId: string;
  vendorId: string;
  productId?: string;
  initialMessage?: string;
}

export interface IGetConversationsRequest {
  userId: string;
  userType: 'CUSTOMER' | 'VENDOR';
  page?: number;
  limit?: number;
}

export interface IMarkAsReadRequest {
  conversationId: string;
  userType: 'CUSTOMER' | 'VENDOR';
}

export interface IUnreadCountRequest {
  userId: string;
  userType: 'CUSTOMER' | 'VENDOR';
}

// Inject endpoints into existing baseApi
export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Start a new conversation
    startConversation: builder.mutation<
      { success: boolean; message: string; data: IConversation },
      IStartConversationRequest
    >({
      query: (body) => ({
        url: '/chat/conversations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Conversations'],
    }),

    // Get all conversations for a user
    getConversations: builder.query<
      {
        success: boolean;
        message: string;
        data: IConversation[];
        pagination: { page: number; limit: number; total: number };
      },
      IGetConversationsRequest
    >({
      query: ({ userId, userType, page = 1, limit = 20 }) => ({
        url: '/chat/conversations',
        params: { userId, userType, page, limit },
      }),
      providesTags: ['Conversations'],
    }),

    // Get a single conversation by ID
    getConversationById: builder.query<
      { success: boolean; message: string; data: IConversation },
      { conversationId: string; userId: string }
    >({
      query: ({ conversationId, userId }) => ({
        url: `/chat/conversations/${conversationId}`,
        params: { userId },
      }),
      providesTags: (_result, _error, { conversationId }) => [
        { type: 'Conversation' as const, id: conversationId },
      ],
    }),

    // Mark messages as read
    markAsRead: builder.mutation<
      { success: boolean; message: string; data: IConversation },
      IMarkAsReadRequest
    >({
      query: ({ conversationId, userType }) => ({
        url: `/chat/conversations/${conversationId}/read`,
        method: 'PUT',
        body: { userType },
      }),
      invalidatesTags: (_result, _error, { conversationId }) => [
        { type: 'Conversation' as const, id: conversationId },
        'Conversations',
        'UnreadCount',
      ],
    }),

    // Get unread message count
    getUnreadCount: builder.query<
      { success: boolean; message: string; data: { unreadCount: number } },
      IUnreadCountRequest
    >({
      query: ({ userId, userType }) => ({
        url: '/chat/unread',
        params: { userId, userType },
      }),
      providesTags: ['UnreadCount'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useStartConversationMutation,
  useGetConversationsQuery,
  useGetConversationByIdQuery,
  useMarkAsReadMutation,
  useGetUnreadCountQuery,
} = chatApi;
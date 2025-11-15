import { baseApi } from "@/Redux/BaseApi";

export enum MessageStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved'
}

// Types
export interface ISupportMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  adminReply: string | null;
  repliedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSupportMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IReplyToMessage {
  reply: string;
}

export interface IMessageStats {
  total: number;
  pending: number;
  resolved: number;
  todayCount: number;
}

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new support message
    createSupportMessage: builder.mutation({
      query: (data: ICreateSupportMessage) => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SupportMessages', 'SupportStats'],
    }),

    // Get all support messages with optional status filter
    getAllSupportMessages: builder.query({
      query: (params?: { status?: MessageStatus }) => ({
        url: '/support/admin/messages',
        params,
      }),
      providesTags: (result: ApiResponse<ISupportMessage[]> | undefined) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'SupportMessages' as const,
                id: _id,
              })),
              { type: 'SupportMessages' as const, id: 'LIST' },
            ]
          : [{ type: 'SupportMessages' as const, id: 'LIST' }],
    }),

    // Get a single support message by ID
    getSupportMessageById: builder.query({
      query: (id: string) => `/support/messages/${id}`,
      providesTags: (_result: any, _error: any, id: string) => [
        { type: 'SupportMessages' as const, id }
      ],
    }),

    // Reply to a support message
    replyToSupportMessage: builder.mutation({
      query: ({ id, reply }: { id: string; reply: string }) => ({
        url: `/support/admin/messages/${id}/reply`,
        method: 'PUT',
        body: { reply },
      }),
      invalidatesTags: (_result: any, _error: any, { id }: { id: string }) => [
        { type: 'SupportMessages' as const, id },
        { type: 'SupportMessages' as const, id: 'LIST' },
        'SupportStats',
      ],
    }),

    // Delete a support message
    deleteSupportMessage: builder.mutation({
      query: (id: string) => ({
        url: `/support/admin/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result: any, _error: any, id: string) => [
        { type: 'SupportMessages' as const, id },
        { type: 'SupportMessages' as const, id: 'LIST' },
        'SupportStats',
      ],
    }),

    // Get support message statistics
    getSupportStats: builder.query({
      query: () => '/support/admin/messages/stats',
      providesTags: ['SupportStats'],
    }),
  }),
});

export const {
  useCreateSupportMessageMutation,
  useGetAllSupportMessagesQuery,
  useGetSupportMessageByIdQuery,
  useReplyToSupportMessageMutation,
  useDeleteSupportMessageMutation,
  useGetSupportStatsQuery,
} = supportApi;


import { baseApi } from "@/Redux/BaseApi";

export interface Newsletter {
  _id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterStats {
  total: number;
  active: number;
  unsubscribed: number;
}

export interface SubscribeRequest {
  email: string;
}

export interface UnsubscribeRequest {
  email: string;
}

export interface BulkSubscribeRequest {
  emails: string[];
}

export interface BulkSubscribeResponse {
  success: number;
  failed: number;
  errors: string[];
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder : any) => ({
    // Public endpoints
    subscribeNewsletter: builder.mutation<
      { success: boolean; message: string; data: { email: string; status: string } },
      SubscribeRequest
    >({
      query: (body) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Newsletter'],
    }),

    unsubscribeNewsletter: builder.mutation<
      { success: boolean; message: string; data: { email: string; status: string } },
      UnsubscribeRequest
    >({
      query: (body) => ({
        url: '/newsletter/unsubscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Admin endpoints
    getAllSubscribers: builder.query<
      { success: boolean; count: number; data: Newsletter[] },
      { status?: 'active' | 'unsubscribed' } | void
    >({
      query: (params) => ({
        url: '/newsletter/admin/subscribers',
        params,
      }),
      providesTags: ['Newsletter'],
    }),

    getSubscriberByEmail: builder.query<
      { success: boolean; data: Newsletter },
      string
    >({
      query: (email) => `/newsletter/admin/subscribers/${encodeURIComponent(email)}`,
      providesTags: ['Newsletter'],
    }),

    deleteSubscriber: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (email) => ({
        url: `/newsletter/admin/subscribers/${encodeURIComponent(email)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Newsletter'],
    }),

    getNewsletterStats: builder.query<
      { success: boolean; data: NewsletterStats },
      void
    >({
      query: () => '/newsletter/admin/subscribers/stats',
      providesTags: ['Newsletter'],
    }),

    bulkSubscribe: builder.mutation<
      { success: boolean; message: string; data: BulkSubscribeResponse },
      BulkSubscribeRequest
    >({
      query: (body) => ({
        url: '/newsletter/admin/bulk-subscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Newsletter'],
    }),
  }),
});

export const {
  useSubscribeNewsletterMutation,
  useUnsubscribeNewsletterMutation,
  useGetAllSubscribersQuery,
  useGetSubscriberByEmailQuery,
  useDeleteSubscriberMutation,
  useGetNewsletterStatsQuery,
  useBulkSubscribeMutation,
} = newsletterApi;
// src/store/api/paymentApiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CreateSessionResponse {
  success: boolean;
  data: {
    session: {
      id: string;
      authenticationLimit: number;
      aes256Key: string;
      version: string;
      updateStatus: string;
    };
  };
}

interface UpdateSessionRequest {
  sessionId: string;
  amount: number;
  currency: string;
}

interface ProcessPaymentRequest {
  userId: string;
  sessionId: string;
  amount: number;
  currency: string;
  description?: string;
  orderId?: string;
}

interface ProcessPaymentResponse {
  success: boolean;
  data?: {
    transactionId: string;
    orderId: string;
    amount: number;
    currency: string;
    status: string;
    gatewayCode: string;
    message: string;
  };
  error?: string;
  message?: string;
}

interface PaymentHistory {
  _id: string;
  userId: string;
  transactionId: string;
  orderId: string;
  sessionId: string;
  amount: number;
  currency: string;
  status: 'SUCCESS' | 'FAILURE' | 'PENDING';
  gatewayCode?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/payment',
    prepareHeaders: (headers, { getState }) => {
      // Add authentication token if needed
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['PaymentHistory', 'Session'],
  endpoints: (builder) => ({
    createSession: builder.mutation<CreateSessionResponse, { authenticationLimit?: number }>({
      query: (body) => ({
        url: '/session',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Session'],
    }),

    updateSession: builder.mutation<{ success: boolean }, UpdateSessionRequest>({
      query: ({ sessionId, ...body }) => ({
        url: `/session/${sessionId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Session'],
    }),

    processPayment: builder.mutation<ProcessPaymentResponse, ProcessPaymentRequest>({
      query: (body) => ({
        url: '/process',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PaymentHistory'],
    }),

    getPaymentHistory: builder.query<
      { success: boolean; data: PaymentHistory[] },
      { userId: string; limit?: number; offset?: number }
    >({
      query: ({ userId, limit = 10, offset = 0 }) => ({
        url: `/history/${userId}`,
        params: { limit, offset },
      }),
      providesTags: ['PaymentHistory'],
    }),

    getPaymentDetails: builder.query<
      { success: boolean; data: PaymentHistory },
      string
    >({
      query: (transactionId) => `/transaction/${transactionId}`,
      providesTags: ['PaymentHistory'],
    }),

    retrieveSession: builder.query<any, string>({
      query: (sessionId) => `/session/${sessionId}`,
      providesTags: ['Session'],
    }),
  }),
});

export const {
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useProcessPaymentMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentDetailsQuery,
  useRetrieveSessionQuery,
} = paymentApi;
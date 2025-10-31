// src/store/api/paymentEndpoints.ts

import { baseApi } from "@/Redux/BaseApi";

// Payment Types
export interface CreateSessionResponse {
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

export interface UpdateSessionRequest {
    sessionId: string;
    amount: number;
    currency: string;
}

export interface ProcessPaymentRequest {
    userId: string;
    sessionId: string;
    amount: number;
    currency: string;
    description?: string;
    orderId?: string;
}

export interface ProcessPaymentResponse {
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

export interface PaymentHistory {
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

export interface PaymentHistoryResponse {
    success: boolean;
    data: PaymentHistory[];
    pagination?: {
        limit: number;
        offset: number;
        total: number;
    };
}

// Inject Payment Endpoints into Base API
export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create payment session
        createPaymentSession: builder.mutation<CreateSessionResponse, { authenticationLimit?: number }>({
            query: (body) => ({
                url: '/payment/session',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        // Update session with order details
        updatePaymentSession: builder.mutation<{ success: boolean; message: string }, UpdateSessionRequest>({
            query: ({ sessionId, ...body }) => ({
                url: `/payment/session/${sessionId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),

        // Retrieve session details
        retrievePaymentSession: builder.query<{ success: boolean; data: any }, string>({
            query: (sessionId) => `/payment/session/${sessionId}`,
            providesTags: ['Payment'],
        }),

        // Process payment
        processPayment: builder.mutation<ProcessPaymentResponse, ProcessPaymentRequest>({
            query: (body) => ({
                url: '/payment/process',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment', 'MY_ORDER', 'ORDER'],
        }),

        // Get payment history for user
        getPaymentHistory: builder.query<
            PaymentHistoryResponse,
            { userId: string; limit?: number; offset?: number }
        >({
            query: ({ userId, limit = 10, offset = 0 }) => ({
                url: `/payment/history/${userId}`,
                params: { limit, offset },
            }),
            providesTags: ['Payment'],
        }),

        // Get single payment details
        getPaymentDetails: builder.query<
            { success: boolean; data: PaymentHistory },
            string
        >({
            query: (transactionId) => `/payment/transaction/${transactionId}`,
            providesTags: ['Payment'],
        }),
        complete3DSPayment: builder.mutation<ProcessPaymentResponse, {
            orderId: string;
            sessionId: string;
            userId: string;
            description?: string;
        }>({
            query: (body) => ({
                url: '/payment/complete-3ds',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment', 'MY_ORDER', 'ORDER'],
        }),
    }),
});

// Export hooks for use in components
export const {
    useCreatePaymentSessionMutation,
    useUpdatePaymentSessionMutation,
    useRetrievePaymentSessionQuery,
    useProcessPaymentMutation,
    useGetPaymentHistoryQuery,
    useGetPaymentDetailsQuery,
    useComplete3DSPaymentMutation
} = paymentApi;
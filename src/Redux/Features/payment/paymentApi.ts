import { baseApi } from "@/Redux/BaseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create payment session
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payment/create',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['Payment'],
    }),

    // Get payment by ID
    getPayment: builder.query({
      query: (id) => `/payment/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Payment', id }],
    }),

    // Get payment by order ID
    getPaymentByOrderId: builder.query({
      query: (orderId) => `/payment/order/${orderId}`,
      providesTags: (_result, _error, orderId) => [{ type: 'Payment', orderId }],
    }),

    // Get all payments
    getAllPayments: builder.query({
      query: ({ status, customerEmail, fromDate, toDate, page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (customerEmail) params.append('customerEmail', customerEmail);
        if (fromDate) params.append('fromDate', fromDate);
        if (toDate) params.append('toDate', toDate);
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        return `/payment?${params.toString()}`;
      },
      providesTags: ['Payment'],
    }),

    // Get customer payments
    getCustomerPayments: builder.query({
      query: ({ email, page = 1, limit = 10 }) => 
        `/payment/customer/${email}?page=${page}&limit=${limit}`,
      providesTags: ['Payment'],
    }),

    // Capture payment
    capturePayment: builder.mutation({
      query: ({ orderId, amount }) => ({
        url: `/payment/${orderId}/capture`,
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Payment', orderId },
        'Payment',
      ],
    }),

    // Refund payment
    refundPayment: builder.mutation({
      query: ({ orderId, amount, reason }) => ({
        url: `/payment/${orderId}/refund`,
        method: 'POST',
        body: { amount, reason },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Payment', orderId },
        'Payment',
      ],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentQuery,
  useGetPaymentByOrderIdQuery,
  useGetAllPaymentsQuery,
  useGetCustomerPaymentsQuery,
  useCapturePaymentMutation,
  useRefundPaymentMutation,
} = paymentApi;
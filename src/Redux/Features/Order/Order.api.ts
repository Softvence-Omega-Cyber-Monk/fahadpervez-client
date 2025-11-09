import { baseApi } from "@/Redux/BaseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ORDER", "MY_ORDER"],
    }),

    getMyOrders: builder.query({
      query: ({ status }) => ({
        url: `/orders/my-orders?status=${status.toUpperCase()}`,
        method: "GET",
      }),
      providesTags: ["MY_ORDER"],
    }),

    getMyOrderStats: builder.query({
      query: () => ({
        url: `/orders/my-stats`,
        method: "GET",
      }),
      providesTags: ["MY_ORDER"],
    }),

    trackByOrderNumber: builder.query({
      query: ({ id }) => ({
        url: `/orders/track/${id}`,
        method: "GET",
      }),
      providesTags: ["ORDER"],
    }),

    cancelOrderById: builder.mutation({
      query: ({ orderId, reason }) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PUT",
        body: { reason },
      }),
      invalidatesTags: ["MY_ORDER", "ORDER"],
    }),

    getAllOrdersByAdminAndVendor: builder.query({
      query: ({ status }) => ({
        url: `/orders/admin?status=${status}`,
        method: "GET",
      }),
      providesTags: ["ORDER_ADMIN"],
    }),

    getOrderStatsAdmin: builder.query({
      query: () => ({
        url: `/orders/admin/stats`,
        method: "GET",
      }),
      providesTags: ["ORDER_ADMIN"],
    }),

    getRecentOrdersAdminAndVendor: builder.query({
      query: () => ({
        url: `/orders/admin/recent`,
        method: "GET",
      }),
      providesTags: ["ORDER_ADMIN"],
    }),

    getOrderByIdAdmin: builder.query({
      query: ({ id }) => ({
        url: `/orders/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["ORDER_ADMIN"],
    }),

    deleteOrderByIdAdmin: builder.mutation({
      query: (id) => ({
        url: `/orders/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORDER_ADMIN"],
    }),

    updateOrderStatusAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/admin/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ORDER_ADMIN"],
    }),

    updateOrderPaymentStatusAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/admin/${id}/payment-status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ORDER_ADMIN"],
    }),

    updatePaymentWithHistory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/admin/${id}/payment-history`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ORDER_ADMIN", "MY_ORDER"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrderStatsQuery,
  useTrackByOrderNumberQuery,
  useCancelOrderByIdMutation,
  useGetAllOrdersByAdminAndVendorQuery,
  useGetOrderStatsAdminQuery,
  useGetRecentOrdersAdminAndVendorQuery,
  useGetOrderByIdAdminQuery,
  useDeleteOrderByIdAdminMutation,
  useUpdateOrderStatusAdminMutation,
  useUpdateOrderPaymentStatusAdminMutation,
  useUpdatePaymentWithHistoryMutation,
} = orderApi;

export default orderApi;

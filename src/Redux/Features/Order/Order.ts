import { baseApi } from "@/Redux/BaseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: ["MY_ORDER"],
    }),
    getMyOrderStats: builder.query({
      query: () => ({
        url: "/orders/my-stats",
        method: "GET",
      }),
    }),
    trackByOrderNumber: builder.query({
      query: (orderNumber) => ({
        url: `/orders/track/${orderNumber}`,
        method: "GET",
      }),
    }),
    cancelOrderById: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: "DELETE",
      }),
      invalidatesTags: ["MY_ORDER"],
    }),
    getAllOrdersByAdmin: builder.query({
      query: () => ({
        url: `/orders/admin`,
        method: "GET",
      }),
      providesTags: ["ORDER_ADMIN"],
    }),
    getOrderStatsAdmin: builder.query({
      query: () => ({
        url: `/orders/admin/stats`,
        method: "GET",
      }),
    }),
    getRecentOrdersAdmin: builder.query({
      query: () => ({
        url: `/orders/admin/recent`,
        method: "GET",
      }),
    }),
    getOrderByIdAdmin: builder.query({
      query: (id) => ({
        url: `/orders/admin/${id}`,
        method: "GET",
      }),
    }),
     deleteOrderByIdAdmin: builder.mutation({
      query: (id) => ({
        url: `/orders/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORDER"],
    }),
    updateOrderStatusAdmin: builder.mutation({
      query: ({ id}) => ({
        url: `/orders/admin/${id}/status`,
        method: "PUT",
      }),
      invalidatesTags: ["ORDER_ADMIN"],
    }),
    updateOrderPaymentStatusAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/orders/admin/${id}/payment-status`,
        method: "PUT",
      }),
      invalidatesTags: ["ORDER_ADMIN"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetMyOrderStatsQuery,
  useTrackByOrderNumberQuery,
  useCancelOrderByIdMutation,
  useGetAllOrdersByAdminQuery,
  useGetOrderStatsAdminQuery,
  useGetRecentOrdersAdminQuery,
  useGetOrderByIdAdminQuery,
  useDeleteOrderByIdAdminMutation,
  useUpdateOrderStatusAdminMutation,
  useUpdateOrderPaymentStatusAdminMutation,
} = orderApi;

export default orderApi;

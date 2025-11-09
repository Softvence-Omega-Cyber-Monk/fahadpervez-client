import { baseApi } from "@/Redux/BaseApi";
import { UserFormData } from "@/types/SellerDashboardTypes/SettingsTypes";

export interface ApiResponse {
  success: boolean;
  data: UserFormData[];
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuyers: builder.query<ApiResponse, null>({
      query: () => ({
        url: "/users/customers",
      }),
      // transformResponse: (data) => data
    }),
    getAllSellers: builder.query<ApiResponse, null>({
      query: () => ({
        url: "/users/vendors",
      }),
      // transformResponse: (data) => data
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["USER_ME"],
    }),
    deActivateAccount: builder.mutation({
      query: ({ reason, userId }) => ({
        url: `/users/deactivate/${userId}`,
        method: "PATCH",
        body: { reason },
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    userLogout: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllBuyersQuery,
  useGetAllSellersQuery,
  useUpdateProfileMutation,
  useDeActivateAccountMutation,
  useChangePasswordMutation,
  useUserLogoutMutation,
} = userApi;

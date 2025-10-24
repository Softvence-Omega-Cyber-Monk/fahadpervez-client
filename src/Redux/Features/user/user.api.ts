import { baseApi } from "@/Redux/BaseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBuyers: builder.query({
            query: () => ({
                url: "/users/customers"
            }),
            transformResponse: (data) => data
        }),
        getAllSellers: builder.query({
            query: () => ({
                url: "/users/vendors"
            }),
            transformResponse: (data) => data
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["USER_ME"]
        }),
        diActivateAccount: builder.mutation({
            query: ({reason , userId}) => ({
                url: `/users/deactivate/${userId}`,
                method: "PUT",
                body: {reason}
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/users/change-password",
                method : "PUT",
                body : data
            })
        })
    })
});


export const { useGetAllBuyersQuery, useGetAllSellersQuery, useUpdateProfileMutation , useDiActivateAccountMutation , useChangePasswordMutation } = userApi;
import { baseApi } from "@/Redux/BaseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBuyers: builder.query({
            query: () => ({
                url: "/users/customers"
            }),
            transformResponse: (data) => data.data
        }),
        getAllSellers: builder.query({
            query: () => ({
                url: "/users/vendors"
            }),
            transformResponse: (data) => data.data
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PATCH",
                body: data
            })
        }),
        diActivateAccount: builder.mutation({
            query: ({ data }) => ({
                url: `/users/deactivate/${data.id}`,
                method: "PUT",
                body: {
                    reason: data.reason
                }
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
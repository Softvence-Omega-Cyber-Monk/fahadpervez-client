import { baseApi } from "@/Redux/BaseApi";


const promoCodeApi = baseApi.injectEndpoints({  
    endpoints: (builder : any) => ({
        getAllCouponCode: builder.query({
            query: () => ({
                url: `/coupons/active`,
            }),
        }),
        validateCoupon: builder.mutation({
            query: (data : any) => ({
                url: `/coupons/validate`,
                method: "POST",
                body: data,
            }),
        }),
        getCouponByCode: builder.query({
            query: (code : any) => ({
                url: `/coupons/code/${code}`,
            }),
        }),
        createNewCoupon: builder.mutation({
            query: (data : any) => ({
                url: `/coupons/admin`,
                method: "POST",
                body: data,
            }),
        }),
        getAllCouponsAdmin: builder.query({
            query: () => ({
                url: `/coupons/admin`,
            }), 
        }),
        getCouponStatsAdmin: builder.query({
            query: () => ({
                url: `/coupons/admin/stats`,
            }),
        }),
        getCouponById: builder.query({
            query: (id : any) => ({
                url: `/coupons/admin/${id}`,
            }),
        }),
        updateCouponAdmin: builder.mutation({
            query: (data : any) => ({
                url: `/coupons/admin/${data.id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteCouponAdmin: builder.mutation({
            query: (id : any) => ({
                url: `/coupons/admin/${id}`,
                method: "DELETE",
            }),
        }),
        useCouponAdmin: builder.mutation({
            query: () => ({
                url: `/coupons/admin/apply`,
                method: "POST",
            }),
        }),

    }),
});

export const { useGetAllCouponCodeQuery, useValidateCouponMutation, useGetCouponByCodeQuery, useCreateNewCouponMutation, useGetAllCouponsAdminQuery, useGetCouponStatsAdminQuery, useGetCouponByIdQuery, useUpdateCouponAdminMutation, useDeleteCouponAdminMutation, useUseCouponAdminMutation } = promoCodeApi;
export default promoCodeApi;

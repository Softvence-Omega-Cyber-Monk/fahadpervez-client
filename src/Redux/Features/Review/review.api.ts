import { baseApi } from "@/Redux/BaseApi";

const review = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReview: builder.query({
            query: () => ({
                url: '/reviews',
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({ 
                url: '/reviews',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetReviewQuery } = review;
export default review;
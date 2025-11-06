// reviews.api.ts
import { baseApi } from "@/Redux/BaseApi";

// Types
export interface IReview {
  _id: string;
  product: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  feedback: string;
  upVotes: number;
  downVotes: number;
  replies: IReply[];
  createdAt: string;
  updatedAt: string;
}

export interface IReply {
  user: {
    _id: string;
    name: string;
  };
  text: string;
  createdAt: string;
}

export interface ICreateReviewPayload {
  product: string;
  rating: number;
  feedback: string;
}

export interface IUpdateReviewPayload {
  rating?: number;
  feedback?: string;
}

export interface IReviewQuery {
  product?: string;
  user?: string;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview;
}

export interface IReviewsResponse {
  success: boolean;
  message: string;
  data: IReview[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface IAddReplyPayload {
  text: string;
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new review
    createReview: builder.mutation<IReviewResponse, ICreateReviewPayload>({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS", "REVIEWS"],
    }),

    // Get all reviews with filtering and pagination
    getReviews: builder.query<IReviewsResponse, IReviewQuery | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        return {
          url: `/reviews${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["REVIEWS"],
    }),

    // Get a specific review by ID
    getReviewById: builder.query<IReviewResponse, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["REVIEWS"],
    }),

    // Update a review
    updateReview: builder.mutation<
      IReviewResponse,
      { id: string; data: IUpdateReviewPayload }
    >({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS", "REVIEWS"],
    }),

    // Delete a review
    deleteReview: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS", "REVIEWS"],
    }),

    // Upvote a review
    upvoteReview: builder.mutation<IReviewResponse, string>({
      query: (id) => ({
        url: `/reviews/${id}/upvote`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          reviewApi.util.updateQueryData("getReviewById", id, (draft) => {
            if (draft.data) {
              draft.data.upVotes += 1;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["REVIEWS"],
    }),

    // Downvote a review
    downvoteReview: builder.mutation<IReviewResponse, string>({
      query: (id) => ({
        url: `/reviews/${id}/downvote`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          reviewApi.util.updateQueryData("getReviewById", id, (draft) => {
            if (draft.data) {
              draft.data.downVotes += 1;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["REVIEWS"],
    }),

    // Add a reply to a review
    addReply: builder.mutation<
      IReviewResponse,
      { id: string; data: IAddReplyPayload }
    >({
      query: ({ id, data }) => ({
        url: `/reviews/${id}/reply`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS", "REVIEWS"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useLazyGetReviewsQuery,
  useGetReviewByIdQuery,
  useLazyGetReviewByIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useUpvoteReviewMutation,
  useDownvoteReviewMutation,
  useAddReplyMutation,
} = reviewApi;
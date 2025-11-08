/* eslint-disable @typescript-eslint/no-explicit-any */
// Review.tsx
import { useState } from "react";
import { Star, Grid3x3, X } from "lucide-react";
import {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useUpvoteReviewMutation,
  useDownvoteReviewMutation
} from "@/Redux/Features/Review/review.api";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import { toast } from "sonner";

interface ReviewProps {
  productId: string;
}

const Review = ({ productId }: ReviewProps) => {
  const { data: userData } = useGetMeQuery({});
  const userId = userData?.data?._id;
  console.log(userId)
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: reviewsData, isLoading, refetch } = useGetReviewsQuery({
    product: productId,
    page,
    limit,
    sortBy,
    sortOrder,
  });
  console.log(reviewsData)
  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [upvoteReview] = useUpvoteReviewMutation();
  const [downvoteReview] = useDownvoteReviewMutation();

  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newFeedback, setNewFeedback] = useState("");
  const [editingReview, setEditingReview] = useState<string | null>(null);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
              }`}
          />
        ))}
      </div>
    );
  };

  const InteractiveStarRating = ({ rating, onChange }: { rating: number; onChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
          >
            <Star
              className={`w-7 h-7 cursor-pointer transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300 hover:fill-yellow-200"
                }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleAddReview = async () => {
    if (!userId) {
      toast.error("Please login to write a review");
      return;
    }

    if (newRating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    if (newFeedback.trim().length < 10) {
      toast.error("Review must be at least 10 characters long!");
      return;
    }

    try {
      if (editingReview) {
        await updateReview({
          id: editingReview,
          data: { rating: newRating, feedback: newFeedback },
        }).unwrap();
        toast.success("Review updated successfully!");
        setEditingReview(null);
      } else {
        await createReview({
          product: productId,
          rating: newRating,
          feedback: newFeedback,
        }).unwrap();
        toast.success("Review submitted successfully!");
      }
      
      // Reset form
      setNewRating(0);
      setNewFeedback("");
      setShowModal(false);
      
      // Refetch reviews
      await refetch();
    } catch (error: any) {
      console.error("Failed to submit review:", error);
      
      // Handle duplicate review error
      if (error?.status === "PARSING_ERROR" || error?.originalStatus === 500) {
        toast.error("You have already reviewed this product. Please edit your existing review instead.");
      } else {
        toast.error(error?.data?.message || "Failed to submit review");
      }
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(reviewId).unwrap();
        toast.success("Review deleted successfully!");
        await refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete review");
      }
    }
  };

  const handleEditReview = (review: any) => {
    setEditingReview(review._id);
    setNewRating(review.rating);
    setNewFeedback(review.feedback);
    setShowModal(true);
  };

  const handleUpvote = async (reviewId: string) => {
    if (!userId) {
      toast.error("Please login to vote");
      return;
    }
    
    try {
      const res = await upvoteReview(reviewId).unwrap();
      console.log(res)
      toast.success("Review upvoted!");
      await refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upvote review");
    }
  };

  const handleDownvote = async (reviewId: string) => {
    if (!userId) {
      toast.error("Please login to vote");
      return;
    }
    
    try {
      await downvoteReview(reviewId).unwrap();
      toast.success("Review downvoted!");
      await refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to downvote review");
    }
  };

  const handleSortChange = (value: string) => {
    if (value === "latest") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (value === "oldest") {
      setSortBy("createdAt");
      setSortOrder("asc");
    } else if (value === "highest") {
      setSortBy("rating");
      setSortOrder("desc");
    } else if (value === "lowest") {
      setSortBy("rating");
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const reviews = reviewsData?.data || [];
  const pagination = reviewsData?.pagination;
  const totalReviews = pagination?.totalItems || 0;

  // Check if current user has already reviewed this product
  const userReview = reviews.find((review: any) => review.user?._id === userId);
  const hasUserReviewed = !!userReview;

  const handleWriteReviewClick = () => {
    if (!userId) {
      toast.error("Please login to write a review");
      return;
    }

    if (hasUserReviewed) {
      toast.info("You've already reviewed this product. You can edit your review.");
      handleEditReview(userReview);
      return;
    }

    setEditingReview(null);
    setNewRating(0);
    setNewFeedback("");
    setShowModal(true);
  };

  return (
    <div className="w-full sm:px-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Reviews <span className="font-normal text-gray-500">({totalReviews})</span>
        </h2>

        {/* Filters & Write Review Button */}
        <div className="flex items-center gap-3">
          {/* Grid view toggle button */}
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
            <Grid3x3 className="w-5 h-5 text-gray-700" />
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Open review modal button */}
          <button
            onClick={handleWriteReviewClick}
            className={`${
              hasUserReviewed 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap cursor-pointer`}
          >
            {hasUserReviewed ? "Edit Your Review" : "Write a Review"}
          </button>
        </div>
      </div>

      {/* Reviews grid */}
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review: any) => {
            const isUserReview = userId === review.user?._id;
            
            return (
              <div 
                key={review._id} 
                className={`bg-white rounded-xl p-6 shadow-sm border ${
                  isUserReview 
                    ? "border-blue-400 ring-2 ring-blue-100" 
                    : "border-gray-100"
                }`}
              >
                {isUserReview && (
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                      Your Review
                    </span>
                  </div>
                )}
                
                <StarRating rating={review.rating} />

              {/* Reviewer info */}
              <div className="flex items-center justify-between mt-4 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{review.user?.name || "Anonymous"}</h3>
                  <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Edit/Delete buttons for own reviews */}
                {userId === review.user?._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-700 text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.feedback}"</p>

              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {/* Upvote/Downvote */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpvote(review._id)}
                    className="cursor-pointer flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="text-sm font-medium">{review.upVotes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleDownvote(review._id)}
                    className="cursor-pointer flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="text-sm font-medium">{review.downVotes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.totalPages}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for adding/editing review */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingReview ? "Edit Review" : "Write a Review"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingReview(null);
                  setNewRating(0);
                  setNewFeedback("");
                }}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Star selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <InteractiveStarRating rating={newRating} onChange={setNewRating} />
            </div>

            {/* Review input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="Share your thoughts about this product... (minimum 10 characters)"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                rows={5}
              />
            </div>

            {/* Modal buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingReview(null);
                  setNewRating(0);
                  setNewFeedback("");
                }}
                className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
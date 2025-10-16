import { useState } from "react";

const Review = () => {
  // Initial reviews state
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      text: "These earbuds are fantastic! The sound quality is crystal clear, and the fit is snugly in my ears. I love how they block out background noise, making my music experience immersive. Plus, the battery life is impressive!",
      date: "August 14, 2023",
    },
    {
      id: 2,
      name: "Samantha D.",
      verified: true,
      rating: 2,
      text: "I recently got these earbuds and I'm blown away! The audio is rich and detailed, and they stay in place even during workouts. The charging case is super convenient too!",
      date: "August 14, 2023",
    },
    {
      id: 3,
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      text: "These earbuds are a game changer! The sound is amazing, and they're so lightweight that I forget I'm wearing them. Perfect for long listening sessions!",
      date: "August 14, 2023",
    },
  ]);

  // Modal visibility state
  const [showModal, setShowModal] = useState(false);
  // State to store new review rating
  const [newRating, setNewRating] = useState(0);
  // State to store new review text
  const [newText, setNewText] = useState("");

  // Component to render star ratings (full, half, empty)
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(
          <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half star
        stars.push(
          <svg key={i} className="w-5 h-5" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg key={i} className="w-5 h-5 fill-gray-300" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  // Handler to add a new review
  const handleAddReview = () => {
    if (newRating === 0 || newText.trim() === "") return alert("Please give rating and review!");
    
    // Format current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Create new review object
    const newReview = {
      id: reviews.length + 1,
      name: "Anonymous User",
      verified: true,
      rating: newRating,
      text: newText,
      date: formattedDate,
    };

    // Add new review to the top of the list
    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewText("");
    setShowModal(false);
  };

  return (
    <div className="w-full sm:px-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Reviews <span className="font-normal text-gray-500">(234)</span>
        </h2>

        {/* Filters & Write Review Button */}
        <div className="flex items-center gap-3">
          {/* Grid view toggle button */}
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
            </svg>
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>Latest</option>
              <option>Oldest</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
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
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <StarRating rating={review.rating} />

            {/* Reviewer info */}
            <div className="flex items-center gap-2 mt-4 mb-3">
              <h3 className="font-semibold text-gray-900">{review.name}</h3>
              {review.verified && (
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Review text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
            <p className="text-gray-500 text-sm">Posted on {review.date}</p>
          </div>
        ))}
      </div>

      {/* See all reviews button */}
      <div className="text-center mt-[30px]">
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1">
          See All (10) Reviews
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Modal for adding new review */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

            {/* Star selection */}
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`w-6 h-6 cursor-pointer ${star <= newRating ? "fill-yellow-400" : "fill-gray-300"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Review input */}
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={4}
            />

            {/* Modal buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      text: "These earbuds are fantastic! The sound quality is crystal clear, and the fit is snugly in my ears. I love how they block out background noise, making my music experience immersive. Plus, the battery life is impressive!",
      date: "August 14, 2023"
    },
    {
      id: 2,
      name: "Samantha D.",
      verified: true,
      rating: 2,
      text: "I recently got these earbuds and I'm blown away! The audio is rich and detailed, and they stay in place even during workouts. The charging case is super convenient too!",
      date: "August 14, 2023"
    },
    {
      id: 3,
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      text: "These earbuds are a game changer! The sound is amazing, and they're so lightweight that I forget I'm wearing them. Perfect for long listening sessions!",
      date: "August 14, 2023"
    }
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <svg key={i} className="w-5 h-5" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${i})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 fill-gray-300" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="w-full sm:px-6">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            All Reviews <span className="font-normal text-gray-500">(234)</span>
          </h2>

          <div className="flex items-center gap-3">
            {/* Grid/List Toggle */}
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
              </svg>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option>Latest</option>
                <option>Oldest</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Write Review Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap">
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {/* Star Rating */}
              <StarRating rating={review.rating} />

              {/* Reviewer Info */}
              <div className="flex items-center gap-2 mt-4 mb-3">
                <h3 className="font-semibold text-gray-900">{review.name}</h3>
                {review.verified && (
                  <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Date */}
              <p className="text-gray-500 text-sm">
                Posted on {review.date}
              </p>
            </div>
          ))}
        </div>
        {/* See All Questions Link */}
        <div className="text-center mt-[30px]">
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1">
            See All (10) Reviews
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
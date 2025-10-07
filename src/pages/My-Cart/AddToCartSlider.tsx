import React, { useState, useRef } from 'react';

interface Product {
  id: number;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
}

interface ProductSliderProps {
  title?: string;
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ 
  title = "FREQUENTLY PURCHASED TOGETHER", 
  products 
}) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full py-8 md:px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <h2 className="text-[32px] text-[#1C2A33] not-italic font-[600] py-[30px] uppercase">
          {title}
        </h2>

        {/* Slider Container */}
        <div className="relative">
          {/* Products Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px]"
              >
                {/* Product Card */}
                <div className="bg-[#E8EBED] rounded-[12px] p-6 relative group hover:shadow-lg transition-shadow duration-300">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-[40px] h-[40px] bg-[#6B7278] hover:bg-[#1C2A33] rounded-full flex items-center justify-center transition-colors duration-200 z-10"
                    aria-label="Add to wishlist"
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill={favorites.has(product.id) ? "#ffffff" : "none"}
                      stroke="#ffffff" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div className="flex items-center justify-center h-[240px] md:h-[260px] mb-4">
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-4">
                  <h3 className="text-[18px] md:text-[20px] font-[600] text-[#1C2A33] mb-2 leading-tight">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[20px] md:text-[22px] font-[700] text-[#1C2A33]">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-[16px] md:text-[18px] font-[500] text-[#9CA3A8] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Button - Right */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-[120px] transform translate-x-1/2 w-[56px] h-[56px] bg-white rounded-full shadow-lg items-center justify-center hover:bg-[#F1F5F8] transition-colors duration-200 z-10"
            aria-label="Scroll right"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1C2A33" 
              strokeWidth="2.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Navigation Button - Left */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-[120px] transform -translate-x-1/2 w-[56px] h-[56px] bg-white rounded-full shadow-lg items-center justify-center hover:bg-[#F1F5F8] transition-colors duration-200 z-10"
            aria-label="Scroll left"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#1C2A33" 
              strokeWidth="2.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommonWrapper from '@/common/CommonWrapper';
import { useGetAllProductsQuery } from '@/Redux/Features/products/products.api';
import { Spinner } from '../ui/spinner';
import { Product } from '@/types/Product';


const BestSeller: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const {data,isLoading} = useGetAllProductsQuery({})
  if(isLoading) return <div className='min-h-screen grid place-content-center'><Spinner /></div>
  const products = data?.data.slice(0,6);
  console.log(products)
  // Mobile: 1 item, Tablet: 2, Desktop: 3
  const getItemsPerPage = () => {
    if (window.innerWidth < 640) return 1;   // mobile
    if (window.innerWidth < 768) return 2;   // tablet
    return 3;                                // desktop
  };

  const itemsPerPage = getItemsPerPage();
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // const toggleFavorite = (id: number) => {
  //   setFavorites((prev) => {
  //     const newFavorites = new Set(prev);
  //     if (newFavorites.has(id)) newFavorites.delete(id);
  //     else newFavorites.add(id);
  //     return newFavorites;
  //   });
  // };

  // --- Touch swipe support ---
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;
    const swipeThreshold = 50; // minimum distance in px to trigger slide

    if (swipeDistance > swipeThreshold) {
      nextSlide(); // swipe left → next
    } else if (swipeDistance < -swipeThreshold) {
      prevSlide(); // swipe right → prev
    }
  };

  return (
   <CommonWrapper>
     <div className="w-full px-4 md:px-0  bg-[#F1F5F8]">
      <h2 className="text-2xl font-semibold font-montserrat mb-8 text-website-color-blue py-10">BEST SELLERS</h2>
      
      <div className="relative">
        {/* Previous Button - hidden on mobile */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="hidden sm:flex absolute top-1/3 translate-y-1/3 -translate-x-1/2 left-0 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Previous products"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Products Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4 sm:gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {products?.map((product:Product) => (
              <Link
                to={`/product-details/${product._id}`}
                key={product._id}
                className={`flex-none w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]`}
              >
                <div className="rounded-lg overflow-hidden group">
                  <div className="relative flex flex-col items-center justify-start">
                    {/* Favorite Button */}
                    {/* <button
                      onClick={() => toggleFavorite(product._id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-xl cursor-pointer bg-gray-500 flex items-center justify-center"
                      aria-label="Add to favorites"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.has(product._id )
                            ? 'fill-red-500 text-red-500'
                            : 'text-white'
                        }`}
                      />
                    </button> */}

                    {/* Product Image */}
                    <img
                      src={product.mainImageUrl}
                      alt={product.productName}
                      className="w-full sm:h-56 md:h-77 object-contain"
                    />

                    {/* Product Info */}
                    <div className="w-full text-center sm:text-left">
                      <h3 className="text-md font-montserrat font-medium text-website-color-blue mb-2 mt-3">
                        {product.productName}
                      </h3>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        {product?.specialPrice && (
                            <span className="text-lg font-montserrat font-medium text-website-color-blue">
                          {product.specialPrice}
                        </span>
                        )}
                        <span className="text-sm text-gray-400 line-through">
                          {product.pricePerUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next Button - hidden on mobile */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === maxIndex}
          className="hidden sm:flex absolute top-1/3 translate-y-1/3 translate-x-1/2 right-0 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Next products"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-gray-800 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
   </CommonWrapper>
  );
};

export default BestSeller;

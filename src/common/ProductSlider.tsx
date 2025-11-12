/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Product } from "@/types/Product";
import { Spinner } from "@/components/ui/spinner";

interface ProductSliderProps {
  products: Product[];
  wishlistProducts?: any;
  handleWishlist: (id: string) => void;
  isLoading?: boolean;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  wishlistProducts,
  handleWishlist,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const getItemsPerPage = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      if (window.innerWidth < 1280) return 4;
      return 6;
    };
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, (products?.length || 0) - itemsPerPage);

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (swipeDistance > swipeThreshold) nextSlide();
    else if (swipeDistance < -swipeThreshold) prevSlide();
  };

  if (isLoading)
    return (
      <div className="min-h-[200px] grid place-content-center">
    <Spinner />
      </div>
    );

  return (
    <div className="relative">
      {/* Prev Button */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="hidden sm:flex absolute top-1/3 translate-y-1/3 -translate-x-1/2 left-0 border border-gray-200 z-10 size-12 rounded-full bg-white shadow-2xl items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Previous products"
      >
        <ChevronLeft className="size-7 text-blue-600" />
      </button>

      {/* Slider Content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-4 sm:gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products?.map((product) => {
            const wishlist = wishlistProducts?.data?.find(
              (item: any) => item.productId?._id === product?._id
            );
            return (
              <div
                key={product._id}
                className={`flex-none ${
                  itemsPerPage === 1
                    ? "w-full"
                    : itemsPerPage === 2
                    ? "w-1/2"
                    : itemsPerPage === 3
                    ? "w-1/3"
                    : itemsPerPage === 4
                    ? "w-1/4"
                    : "w-1/6"
                }`}
              >
                <div className="rounded-lg overflow-hidden relative">
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() => handleWishlist(product._id as string)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:bg-opacity-90 transition ${
                        wishlist ? "bg-red-500" : "bg-gray-500"
                      }`}
                    >
                      <FaHeart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <Link to={`/product-details/${product._id}`}>
                    <div className="flex items-center justify-center bg-white py-8">
                      <img
                        src={product.mainImageUrl || "./bestsell.png"}
                        alt={product.productName}
                        className="w-full h-40 object-contain"
                      />
                    </div>
                    <div className="pb-4">
                      <h4 className="font-montserrat font-medium text-gray-800 my-2 mt-3 line-clamp-2">
                        {product.productName}
                      </h4>
                      <div className="flex items-center gap-2">
                        {product.specialPrice && (
                          <span className="text-lg font-montserrat font-medium text-website-color-blue">
                            ${product.specialPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-sm text-gray-400 line-through">
                          ${product.pricePerUnit?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
        className="hidden sm:flex absolute top-1/3 translate-y-1/3 translate-x-1/2 right-0 z-10 size-12 rounded-full bg-white shadow-2xl border border-gray-200 items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Next products"
      >
        <ChevronRight className="size-7 text-blue-600" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-gray-800 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import { useGetAllProductsQuery } from "@/Redux/Features/products/products.api";
import { Spinner } from "../ui/spinner";
import { Product } from "@/types/Product";
import {
  useAddWishlistMutation,
  useGetAllWishListQuery,
  useRemoveWishListMutation,
} from "@/Redux/Features/wishlist/wishlist.api";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";

const BestSeller: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [favorites, setFavorites] = useState<Set<string>>(new Set());
   const { data: wishlistProducts } = useGetAllWishListQuery({});
    const [addWishlist, { isError, error }] = useAddWishlistMutation();
    const [removeWishList]= useRemoveWishListMutation();
  const { data, isLoading } = useGetAllProductsQuery({});
  if (isLoading)
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
  const products = data?.data.slice(0, 10);

  const getItemsPerPage = () => {
    if (window.innerWidth < 640) return 1; 
    if (window.innerWidth < 768) return 2; 
    if (window.innerWidth < 1024) return 3; 
    if (window.innerWidth < 1280) return 4; 
    return 6; 
  };

  const itemsPerPage = getItemsPerPage();
  const maxIndex = Math.max(0, products?.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // const toggleFavorite = (id: string) => {
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
   const handleWishlist = async (id: string) => {
    let toastId
      try {
        toastId = toast.loading("Loading...");
        const wishlist = wishlistProducts.data.find((item :any) => item.productId?._id === id);
        if (!wishlist) {
          const res = await addWishlist(id).unwrap();
          if(isError) console.log(error)
          if (res.success) {
            toast.success("Product added to wishlist" , { id: toastId });
          } else {
            toast.error("Something went wrong!" , { id: toastId });
          }
        } else {
          const res = await removeWishList(id).unwrap();
          if(res.success) toast.success(res.message , { id: toastId });
        }
      } catch (error){
        console.log(error)
        toast.error("Something went wrong" , { id: toastId });
      }
    };

  return (
    <CommonWrapper>
      <div className="w-full px-4 sm:px-8 xl:px-0   bg-[#F1F5F8] ">
        <h2 className="text-2xl font-semibold font-montserrat mb-8 text-website-color-blue py-10">
          BEST SELLERS
        </h2>

        <div className="relative">
          {/* Previous Button - hidden on mobile */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="hidden sm:flex absolute top-1/3 translate-y-1/3 -translate-x-1/2 left-0 border border-gray-200 z-10 size-12 rounded-full bg-white shadow-2xl items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Previous products"
          >
            <ChevronLeft className="size-7 text-blue-600" />
          </button>

          {/* Products Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {products?.map((product: Product) => {
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
                                      className={`w-8 h-8  rounded-xl flex items-center justify-center hover:bg-opacity-90 transition ${
                                        wishlist ? "bg-red-500" : "bg-gray-500"
                                      }`}
                                    >
                                      <FaHeart className="w-4 h-4 text-white" />
                                    </button>
                                  </div>
                                  <Link to={`/product-details/${product._id}`} key={product._id}>
                                    {/* Product Image */}
                                    <div className="flex items-center justify-center bg-white py-8">
                                      <img
                                        src={product.mainImageUrl || "./bestsell.png"}
                                        alt={product.productName}
                                        className="w-full h-80 object-cover"
                                      />
                                    </div>
                  
                                    {/* Product Info */}
                                    <div className="pb-4">
                                      <h3 className="text-md font-montserrat font-medium text-gray-800 my-2 mt-3">
                                        {product.productName}
                                      </h3>
                                      <div className="flex items-center gap-2">
                                        {product.specialPrice && (
                                          <span className="text-lg font-montserrat font-medium text-website-color-blue">
                                            ${product?.specialPrice?.toFixed(2)}
                                          </span>
                                        )}
                                        <span className="text-sm text-gray-400 line-through">
                                          ${product?.pricePerUnit?.toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                </div>
              )
              })}
            </div>
          </div>

          {/* Next Button - hidden on mobile */}
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="hidden sm:flex absolute top-1/3 translate-y-1/3 translate-x-1/2  right-0 z-10 size-12 rounded-full bg-white shadow-2xl border border-gray-200 items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Next products"
          >
            <ChevronRight className="size-7 text-blue-600" />
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
                  ? "bg-gray-800 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
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

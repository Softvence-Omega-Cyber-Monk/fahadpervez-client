/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Product } from "@/types/Product";
import { Spinner } from "@/components/ui/spinner";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


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
  if (isLoading)
    return (
      <div className="min-h-[200px] grid place-content-center">
        <Spinner />
      </div>
    );

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    cssEase: "ease-out", // marquee effect
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {products?.map((product) => {
          const wishlist = wishlistProducts?.data?.find(
            (item: any) => item.productId?._id === product?._id
          );

          return (
            <div key={product._id} className="px-2">
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
                      src={product.mainImageUrl || "/bestsell.png"}
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
      </Slider>
    </div>
  );
};

// Custom Arrows
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden sm:flex absolute top-1/3 -right-5 z-10 size-12 rounded-full bg-white shadow-2xl border border-gray-200 items-center justify-center hover:bg-gray-50 transition-all"
    >
      <ChevronRight className="size-7 text-blue-600" />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="hidden sm:flex absolute top-1/3 -left-4 z-10 size-12 rounded-full bg-white shadow-2xl border border-gray-200 items-center justify-center hover:bg-gray-50 transition-all"
    >
      <ChevronLeft className="size-7 text-blue-600" />
    </button>
  );
};

export default ProductSlider;

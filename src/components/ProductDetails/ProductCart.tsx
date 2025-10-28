// ProductCart.tsx
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAddWishListMutation, useGetAllWishListQuery } from "@/Redux/Features/wishlist/wishlist.api";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import { toast } from "sonner";

interface ProductData {
  _id: string;
  productName: string;
  productSKU: string;
  pricePerUnit: number;
  specialPrice?: number;
  companyName: string;
  stock: number;
  mainImageUrl: string;
}

export default function ProductCard({ product }: { product: ProductData }) {
  const navigate = useNavigate();
  const {data} = useGetMeQuery({})
  console.log(data)
  const userId = data?.data?._id;
  const [addWishlist, { isSuccess, isError }] = useAddWishListMutation({});
  const { data: wishlistData } = useGetAllWishListQuery(
    { userID: userId },
    { skip: !userId }
  );
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistData) {
      const inWishlist = wishlistData.data.some(
        (wish: { productId: string }) => wish.productId === product._id
      );
      setIsInWishlist(inWishlist);
    }
  }, [wishlistData, product._id]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added to wishlist");
    }
    if (isError) {
      toast.error("Product is already in wishlist");
    }
  }, [isSuccess, isError]);

  const handleAddWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      await addWishlist(product._id).unwrap();
      setIsInWishlist(true)
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/product-details/${product._id}`);
  };

  const displayPrice = product.specialPrice || product.pricePerUnit;
  const hasDiscount = product.specialPrice && product.specialPrice < product.pricePerUnit;

  return (
    <div 
      className="w-full rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      {/* Product Image Container */}
      <div className="relative bg-[#e8e8e8] p-4 aspect-square flex items-center justify-center">
        {/* Favorite Button */}
        <button
          onClick={handleAddWishlist}
          className={`cursor-pointer absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-md ${
            isInWishlist ? "bg-red-100" : "bg-white/80 hover:bg-white"
          }`}
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {Math.round(((product.pricePerUnit - product.specialPrice!) / product.pricePerUnit) * 100)}% OFF
          </div>
        )}

        {/* Product Image */}
        <img
          src={product.mainImageUrl || "/placeholder.svg"}
          alt={product.productName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="py-[14px]">
        <h3 className="text-[18px] text-gray-900 mb-2 leading-tight line-clamp-2">
          {product.productName}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-base font-semibold text-gray-900">
            ${displayPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ${product.pricePerUnit.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock > 0 && product.stock < 20 && (
          <span className="text-xs text-orange-600 font-medium">
            Only {product.stock} left in stock
          </span>
        )}
      </div>
    </div>
  );
}
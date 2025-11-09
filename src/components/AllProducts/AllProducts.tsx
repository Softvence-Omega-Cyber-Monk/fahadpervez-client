/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MoveUpRight } from "lucide-react";
import Button from "../Button/Button";
import { Link, NavLink } from "react-router-dom";
import { useGetAllProductsQuery } from "@/Redux/Features/products/products.api";
import { Spinner } from "../ui/spinner";
import { Product } from "@/types/Product";
import CommonWrapper from "@/common/CommonWrapper";
import {
  useAddWishlistMutation,
  useGetAllWishListQuery,
  useRemoveWishListMutation,
} from "@/Redux/Features/wishlist/wishlist.api";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";


const AllProducts: React.FC = () => {
  const { data: products, isLoading } = useGetAllProductsQuery({});
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const [addWishlist, { isError, error }] = useAddWishlistMutation();
  const [removeWishList]= useRemoveWishListMutation();
  if (isLoading)
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
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
    <div className="py-20 px-4 sm:px-10 ">
      <CommonWrapper>
        <h1 className="text-2xl font-montserrat font-semibold mb-6 text-website-color-blue py-10">
          ALL PRODUCTS
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-8">
          {products?.data?.map((product: Product) => {
            const wishlist = wishlistProducts?.data?.find(
              (item: any) => item.productId?._id === product?._id
            );
            return (
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
                    <h4 className="line-clamp-2 font-montserrat font-medium text-gray-800 my-2 mt-3">
                      {product.productName}
                    </h4>
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
            );
          })}
        </div>

        {/* Browse All Button */}
        <div className="flex justify-center">
          <NavLink to="/shop">
            <Button className="font-montserrat text-lg text-gray-100 flex items-center gap-2">
              Browse All
              <MoveUpRight className="w-5 h-5" />
            </Button>
          </NavLink>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default AllProducts;

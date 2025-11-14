/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/common/PrimaryButton";
import { useGetAllProductsQuery } from "@/Redux/Features/products/products.api";
import {
  useAddWishlistMutation,
  useGetAllWishListQuery,
  useRemoveWishListMutation,
} from "@/Redux/Features/wishlist/wishlist.api";
import { toast } from "sonner";
import ProductSlider from "@/common/ProductSlider";
import { Spinner } from "../ui/spinner";

const MedItemsLive: React.FC = () => {
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const [addWishlist, { isError, error }] = useAddWishlistMutation();
  const [removeWishList] = useRemoveWishListMutation();
  const { data, isLoading } = useGetAllProductsQuery({});

  const products = data?.data.slice(0, 10) || [];

  const handleWishlist = async (id: string) => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      const wishlist = wishlistProducts?.data?.find(
        (item: any) => item.productId?._id === id
      );
      if (!wishlist) {
        const res = await addWishlist(id).unwrap();
        if (isError) console.log(error);
        if (res.success)
          toast.success("Product added to wishlist", { id: toastId });
        else toast.error("Something went wrong!", { id: toastId });
      } else {
        const res = await removeWishList(id).unwrap();
        if (res.success) toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error((error as any).data.message, { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <CommonWrapper>
        <div className="bg-linear-to-b from-orange-100 to-light-background to-90% w-full max-w-[1500px] mx-auto p-4 sm:p-6 rounded-2xl">
        <div className="w-full px-2 sm:px-4 md:px-6 xl:px-0">

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">

            <h3 className="font-montserrat text-website-color-blue font-semibold">
              MDItems Live
            </h3>

            <Link to="/shop">
              <PrimaryButton
                type="Secondary"
                title="Shop All"
                className="bg-transparent text-sm border-none shadow-none text-primary-blue underline"
              />
            </Link>

          </div>

          {/* Product Slider */}
          <div className="w-full">
            <ProductSlider
              products={products}
              wishlistProducts={wishlistProducts}
              handleWishlist={handleWishlist}
              isLoading={isLoading}
            />
          </div>
        </div>
    </div>
      </CommonWrapper>
  );
};

export default MedItemsLive;

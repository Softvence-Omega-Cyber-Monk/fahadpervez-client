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
      <div className="bg-linear-to-b from-orange-100 to-light-background to-90% w-fit p-6 mx-auto  rounded-2xl">
    <CommonWrapper>
      <div className="w-full px-4 sm:px-8 xl:px-0 ">
        <div className="flex items-center gap-5">
          <h3 className="font-montserrat mb-4 text-website-color-blue font-semibold!">
            MDItems Live
          </h3>
          <Link to="/shop" className="mb-4 inline-block">
            <PrimaryButton type="Secondary" title="Shop All" className="bg-transparent text-sm! border-none shadow-none text-primary-blue capitalize underline"/>
          </Link>
        </div>

        <ProductSlider
          products={products}
          wishlistProducts={wishlistProducts}
          handleWishlist={handleWishlist}
          isLoading={isLoading}
        />
      </div>
    </CommonWrapper>
      </div>
  );
};

export default MedItemsLive;

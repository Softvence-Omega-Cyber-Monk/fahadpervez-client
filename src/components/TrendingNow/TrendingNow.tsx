/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/common/PrimaryButton";
import { useGetAllProductsQuery } from "@/Redux/Features/products/products.api";
// import { useGetAllCategoriesQuery } from "@/Redux/Features/categories/categories.api";
import {
  useAddWishlistMutation,
  useGetAllWishListQuery,
  useRemoveWishListMutation,
} from "@/Redux/Features/wishlist/wishlist.api";
import { toast } from "sonner";
import ProductSlider from "@/common/ProductSlider";
import { Spinner } from "../ui/spinner";


const TrendingNow: React.FC = () => {
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const [addWishlist, { isError, error }] = useAddWishlistMutation();
  const [removeWishList] = useRemoveWishListMutation();
  const { data, isLoading } = useGetAllProductsQuery({});
  // const { data: categoryData, isLoading: categoryLoading } =
  //   useGetAllCategoriesQuery({});

  const products = data?.data.slice(0, 10) || [];
  // const categories = categoryData?.data || [];

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

  if (isLoading ) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <CommonWrapper>
      <div className="w-full pt-10 px-4 sm:px-8 xl:px-0 bg-[#F1F5F8]">
        <div className="flex items-center gap-5">
          <h3 className="font-semibold capitalize mb-4 text-website-color-blue py-10">
            Trending Now
          </h3>
          <Link to="/shop" className="mb-4 inline-block">
            <PrimaryButton type="Secondary" title="Shop All" className="bg-transparent text-sm! border-none shadow-none text-primary-blue capitalize underline"/>
          </Link>
        </div>

        {/* <div className="flex items-center gap-5 flex-wrap mb-10">
          {categories.map((category: any) => (
            <PrimaryButton
              key={category._id}
              type="Badge"
              title={category.categoryName}
              className="bg-white p-6! text-sm! font-medium hover:bg-gray-200"
            />
          ))}
        </div> */}

        <ProductSlider
          products={products}
          wishlistProducts={wishlistProducts}
          handleWishlist={handleWishlist}
          isLoading={isLoading}
        />
      </div>
    </CommonWrapper>
  );
};

export default TrendingNow;

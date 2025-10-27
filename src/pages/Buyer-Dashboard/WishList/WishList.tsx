import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/hooks/useRedux";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import {
  useGetAllWishListQuery,
  useRemoveWishListMutation,
} from "@/Redux/Features/wishlist/wishlist.api";
import { addToCart } from "@/store/Slices/CartSlice/cartSlice";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
}
interface WishlistProduct {
  productId: {
    _id: string;
    productName: string;
    pricePerUnit: number;
    specialPrice: number;
    mainImageUrl: string;
  };
}

const WishlistGrid = () => {
  const { data, isLoading } = useGetMeQuery(null);
  const userId = data?.data?._id;
  const { data: wishlist, isLoading: wishLoading } =
    useGetAllWishListQuery(userId);
  const [removeWishlist] = useRemoveWishListMutation();
  const dispatch = useAppDispatch();
  if (isLoading || wishLoading) return <Spinner />;

  const products =
    wishlist?.data.map((item: WishlistProduct) => ({
      id: item.productId._id,
      name: item.productId.productName,
      price: `$${item.productId.specialPrice || item.productId.pricePerUnit}`,
      oldPrice: `$${item.productId.pricePerUnit}`,
      image: item.productId.mainImageUrl,
    })) || [];

  const handleRemove = async (id: string) => {
    let toastId;
    let result;
    try {
      toastId = toast.loading("Removing from wishlist...");
      result = await removeWishlist(id).unwrap();
      if (result?.success === true) {
        toast.success("Wishlist removed successfully!", { id: toastId });
      } else {
        toast.error("Update failed. Please try again.", { id: toastId });
      }
    } catch {
      toast.error("Failed to add product to wishlist", { id: toastId });
    }
  };
  console.log(products);
  const handleAddToCart = async (id:string) => {
    const addProducts = wishlist?.data.find((item: WishlistProduct) => item.productId._id === id).productId;
    const items = {
      id: addProducts._id!,
      image: addProducts.mainImageUrl!,
      title: addProducts.productName,
      pricePerUnit: addProducts?.specialPrice || addProducts.pricePerUnit,
      quantity: 1,
      totalPrice: (addProducts?.specialPrice || addProducts.pricePerUnit) * 1,
      productSKU: addProducts.productSKU,
    };
    
    dispatch(addToCart(items));
    toast.success("Product added to cart successfully!");
    await removeWishlist(id).unwrap();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">WISHLIST</h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
     gap-6"
      >
        {products.map((product: ProductItem) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            {/* Image */}
            <div className="relative h-64 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-xl"
              />
              <button
                onClick={() => handleRemove(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition bg-red-500`}
              >
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-sm font-bold text-gray-900">
                  {product.price}
                </span>
                {product.price !== product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-white rounded-md text-sm sm:text-base transition"
                onClick={()=>handleAddToCart(product.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistGrid;

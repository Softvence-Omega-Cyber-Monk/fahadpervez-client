
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import { useGetAllWishListQuery } from "@/Redux/Features/wishlist/wishlist.api";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww", // replace with actual product image
  },
  {
    id: 2,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    name: "Harmony biotic digestive tablets",
    price: "$7.99",
    oldPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8fDB8fHww",
  },
];

const WishlistGrid = () => {
  const [wishProduct, setWishProduct] = useState([]);
  const { data, isLoading } = useGetMeQuery(null);
  const userId = data?.data?._id;

  const { data: wishlist, isLoading: wishLoading } = useGetAllWishListQuery(userId);

  useEffect(() => {
    if (!isLoading && data?.data) {
      setWishProduct(wishlist?.data);
    };
  }, [wishlist , wishLoading]);



  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">WISHLIST</h2>
        <button className="bg-[#0064E0] py-2 px-4 text-white rounded-md text-sm sm:text-base">
          Move all to cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {
          wishProduct
        }
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-lg"
          >
            {/* Image + icons */}
            <div className="relative">¸
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover rounded-lg"
              />
              {/* Checkbox top-left */}
              <input
                type="checkbox"
                className="absolute top-2 left-2 w-4 h-4 accent-gray-900"
              />
              {/* Heart icon top-right */}
              <button className="absolute top-2 right-2 bg-gray-400 p-1 rounded-lg shadow-sm">
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-800">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-gray-800">
                  {product.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistGrid;

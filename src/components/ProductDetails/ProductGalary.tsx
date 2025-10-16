import { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  MessageSquare,
  Minus,
  Plus,
} from "lucide-react";
import { Product } from "@/types/Product";

const ProductGallery = ({ product }: { product: Product }) => {
  // --- State ---
  console.log(product)
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // --- Update images when product changes ---
  useEffect(() => {
    setImages([
      product.mainImageUrl!,
      product.sideImageUrl!,
      product.sideImage2Url!,
      product.lastImageUrl!,
      product.videoUrl!,
    ]);
  }, [product]);

  // --- Helper: Render Main Preview ---
  const renderMainPreview = () => {
    const selected = images[selectedImage];
    return selected === product.videoUrl ? (
      <video
        src={product.videoUrl}
        controls
        className="w-full h-auto object-cover rounded-lg"
      />
    ) : (
      <img
        src={selected || "/placeholder.svg"}
        alt="Main product preview"
        className="w-full h-full object-cover rounded-lg"
      />
    );
  };

  // --- Helper: Render Thumbnails ---
  const renderThumbnails = () =>
    images
      .map((img, index) => ({ img, index }))
      .filter(({ img }) => !!img)
      .map(({ img, index }) => (
        <button
          key={index}
          onClick={() => setSelectedImage(index)}
          className={`relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-lg overflow-hidden border-2 transition-all ${
            selectedImage === index ? "border-blue-500" : "border-transparent"
          }`}
        >
          <img
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {index === 4 && product.videoUrl && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center border rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-10 border-t-transparent border-l-14 border-l-gray-800 border-b-10 border-b-transparent ml-1"></div>
              </div>
            </div>
          )}
        </button>
      ));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* ------------------ Left Section: Images ------------------ */}
      <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4">
        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
          {renderThumbnails()}
        </div>
        <div className="flex-1 bg-gray-100   relative rounded-lg">
          {/* Wishlist & Share */}
          <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 z-10">
            <Heart className="h-6 w-6 text-gray-600" />
          </button>
          <button className="absolute top-20 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 z-10">
            <Share2 className="h-6 w-6 text-gray-600" />
          </button>
          <div className="rounded-lg p-1 w-full h-full grid place-content-center">{renderMainPreview()}</div>
        </div>
      </div>

      {/* ------------------ Middle Section: Product Info ------------------ */}
      <div className="lg:col-span-4">
        <h1 className="text-3xl font-semibold text-[#1C2A33] mb-4">
          {product.productName}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-base">By:</span>
            <a
              href="#"
              className="text-blue-600 font-medium text-base hover:underline"
            >
              {/* {product.seller} */}
            </a>
          </div>
          <div className="text-[#70797E] text-[16px] font-[400]">
            Sold: <span className="font-medium">335</span>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 fill-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half)"
                d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span className="font-medium text-gray-900">4.5/5</span>
            <span className="text-gray-500">(7457)</span>
          </div>
        </div>

        {/* Stock Info */}
        <div className="inline-block mb-6">
          <span className="px-3 py-1 bg-[#E6F3FF] border-2 border-blue-400 text-blue-600 rounded-md text-base font-medium">
            In Stock - {product.stock} left
          </span>
        </div>

        {/* Product Description */}
        <div className="text-gray-700 text-base">{product.productDescription}</div>
      </div>

      {/* ------------------ Right Section: Price & Actions ------------------ */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
          <div className="mb-6">
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-[#1C2A33]">
                ${product.pricePerUnit}
              </span>
              <span className="text-base text-gray-400 line-through">
                ${(product.pricePerUnit + 5).toFixed(2)}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex justify-around items-center mb-20 border border-white shadow p-2 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="w-12 h-12 rounded-full bg-[#E6F3FF] flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-6 w-6 text-gray-600" />
              </button>
              <span className="w-12 h-12 rounded-full bg-[#EAEAEA] border-2 border-[#BDBDBD] flex items-center justify-center text-lg font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-full bg-[#E6F3FF] flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors mb-3">
              <ShoppingCart className="h-5 w-5" />
              Add To Cart
            </button>

            {/* Send Inquiry Button */}
            <button className="w-full bg-[#E6F3FF] hover:bg-[#E6F3F0] text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-300 flex items-center justify-center gap-2 transition-colors mt-4">
              <MessageSquare className="h-5 w-5" />
              Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;

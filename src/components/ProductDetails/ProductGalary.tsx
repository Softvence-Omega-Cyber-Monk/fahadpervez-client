/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  MessageSquare,
  Minus,
  Plus,
  Star,
  Share2,
  X,
} from "lucide-react";
import { Product } from "@/types/Product";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useRedux";
import { addToCart } from "@/store/Slices/CartSlice/cartSlice";
import { useGetReviewsQuery } from "@/Redux/Features/Review/review.api";
import ChatModal from "../ChatModal/ChatModal";
import { useGetMeQuery } from "@/Redux/Features/auth/auth.api";
import {
  useAddWishlistMutation,
  useGetAllWishListQuery,
  useRemoveWishListMutation,
} from "@/Redux/Features/wishlist/wishlist.api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaHeart } from "react-icons/fa";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";

const ProductGallery = ({ product }: { product: Product }) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data: reviewsData } = useGetReviewsQuery({ product: product._id });
  const { data: wishlistProducts } = useGetAllWishListQuery({});
  const [addWishlist, { isError, error }] = useAddWishlistMutation();
  const [removeWishList] = useRemoveWishListMutation();
  const { data } = useGetMeQuery({});
  const [open, setOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const shareUrl = window.location.href;
  const currentUserId = data?.data?._id;

  const averageRating = reviewsData?.data?.length
    ? reviewsData.data.reduce(
        (acc: number, review: any) => acc + review.rating,
        0
      ) / reviewsData.data.length
    : 0;
  const totalReviews = reviewsData?.data?.length || 0;

  useEffect(() => {
    const productImages = [
      product.mainImageUrl,
      product.sideImageUrl,
      product.sideImage2Url,
      product.lastImageUrl,
      product.videoUrl,
    ].filter(Boolean) as string[];

    setImages(productImages);
  }, [product]);

  const renderMainPreview = () => {
    const selected = images[selectedImage];
    const isVideo = selected === product.videoUrl;

    return isVideo ? (
      <video
        src={product.videoUrl}
        controls
        className="w-full h-full object-cover rounded-lg"
      />
    ) : (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          <InnerImageZoom
            src={selected}
            zoomSrc={selected}
            zoomType="hover"
            className="rounded-lg"
          />
        </button>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={selectedImage}
          slides={images.map((url) => ({ src: url }))}
          render={{
            slide: ({ slide }) =>
              slide.src === product.videoUrl ? (
                <video
                  src={slide.src}
                  controls
                  autoPlay
                  className="max-h-[80vh] mx-auto rounded-lg"
                />
              ) : (
                <img
                  src={slide.src}
                  alt="Product preview"
                  className="max-h-[80vh] mx-auto rounded-lg object-contain"
                />
              ),
          }}
          on={{
            view: ({ index }) => setSelectedImage(index),
          }}
        />
      </>
    );
  };

  const renderThumbnails = () =>
    images.map((img, index) => (
      <button
        key={index}
        onClick={() => setSelectedImage(index)}
        className={`relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-lg overflow-hidden border-2 transition-all ${
          selectedImage === index ? "border-blue-500" : "border-transparent"
        }`}
      >
        {img === product.videoUrl ? (
          <video
            src={img}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <img
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        )}
      </button>
    ));

  const handleAddToCart = () => {
    const items = {
      id: product._id!,
      image: product.mainImageUrl!,
      title: product.productName,
      pricePerUnit: product?.specialPrice || product.pricePerUnit,
      quantity,
      totalPrice: (product?.specialPrice || product.pricePerUnit) * quantity,
      productSKU: product.productSKU,
    };
    dispatch(addToCart(items));
    toast.success("Product added to cart");
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;

        return (
          <Star
            key={i}
            className={`w-5 h-5 ${
              filled
                ? "fill-yellow-400 text-yellow-400"
                : halfFilled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );

  const handleWishlist = async (id: string) => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      const wishlist = wishlistProducts.data.find(
        (item: any) => item.productId?._id === id
      );
      if (!wishlist) {
        const res = await addWishlist(id).unwrap();
        if (isError) console.log(error);
        if (res.success) {
          toast.success("Product added to wishlist", { id: toastId });
        } else {
          toast.error("Something went wrong!", { id: toastId });
        }
      } else {
        const res = await removeWishList(id).unwrap();
        if (res.success) toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const wishlist = wishlistProducts?.data?.find(
    (item: any) => item.productId?._id === product?._id
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Section */}
        <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
            {renderThumbnails()}
          </div>
          <div className="flex-1 bg-white h-full relative rounded-lg">
            <div className="rounded-lg w-full h-full grid place-content-center overflow-hidden">
              {renderMainPreview()}
              <div className="absolute top-3 right-3 z-10 space-y-2">
                <button
                  onClick={() => handleWishlist(product._id as string)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center hover:bg-opacity-90 transition ${
                    wishlist ? "bg-red-500" : "bg-gray-500"
                  }`}
                >
                  <FaHeart className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setShareModalOpen(true)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center hover:bg-opacity-90 transition bg-blue-500`}
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="lg:col-span-4">
          <h1 className="text-3xl font-semibold text-[#1C2A33] mb-4">
            {product.productName}
          </h1>
          <div className="flex items-center gap-4 mb-3">
            <div className="text-[#70797E]">
              By: <span className="font-medium">{product.userId.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="text-[#70797E]">
              SKU: <span className="font-medium">{product.productSKU}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={averageRating} />
            <div className="text-gray-500">
              {averageRating.toFixed(1)}/5.0 ({totalReviews} Reviews)
            </div>
          </div>
          {product.stock && (
            <div className="inline-block mb-6 mt-4">
              <span className="px-3 py-1 bg-[#E6F3FF] border-2 border-blue-400 text-blue-600 rounded-md text-base font-medium">
                In Stock - {product.stock} left
              </span>
            </div>
          )}
          <div className="text-gray-700 text-base leading-relaxed flex flex-col gap-3">
            <div>Weight: {product.weight} KG</div>
            <div>Size: {product.availableSize}</div>
            <div>Gender: {product.gender}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                {product.specialPrice ? (
                  <>
                    <span className="text-2xl font-bold text-[#1C2A33]">
                      ${product.specialPrice?.toFixed(2)}
                    </span>
                    <span className="text-base text-gray-400 line-through">
                      ${product.pricePerUnit?.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#1C2A33]">
                    ${product.pricePerUnit?.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex justify-around items-center mb-20 border border-white shadow p-2 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-[#E6F3FF] flex items-center justify-center"
                >
                  <Minus className="h-6 w-6 text-gray-600" />
                </button>
                <span className="w-12 h-12 rounded-full bg-[#EAEAEA] border-2 border-[#BDBDBD] flex items-center justify-center text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-[#E6F3FF] flex items-center justify-center"
                >
                  <Plus className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors mb-3"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                Add To Cart
              </button>

              <button
                onClick={handleOpenChat}
                className="w-full bg-[#E6F3FF] hover:bg-[#E6F3F0] text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-300 flex items-center justify-center gap-2 transition-colors mt-4"
              >
                <MessageSquare className="h-5 w-5" />
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        vendorId={product.userId._id}
        vendorName={product.userId.name}
        productId={product._id}
        productName={product.productName}
        customerId={currentUserId}
      />

      {/* Share Modal */}
      {shareModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 w-full m-4 md:w-1/3 relative shadow-xl border border-gray-200">
      <button
        onClick={() => setShareModalOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
      >
        <X className="w-6 h-6" />
      </button>

      <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
        Share this Product
      </h3>

      <div className="flex justify-between items-center gap-4">
        <FacebookShareButton url={shareUrl} className="flex-1">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md group-hover:scale-105 transition">
              <span className="text-lg font-bold">f</span>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-blue-600 transition">
              Facebook
            </span>
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} className="flex-1">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 flex items-center justify-center rounded-full bg-sky-500 text-white shadow-md group-hover:scale-105 transition">
              <span className="text-lg font-bold">X</span>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-sky-500 transition">
              Twitter
            </span>
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} className="flex-1">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 flex items-center justify-center rounded-full bg-blue-700 text-white shadow-md group-hover:scale-105 transition">
              <span className="text-lg font-bold">in</span>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-blue-700 transition">
              LinkedIn
            </span>
          </div>
        </LinkedinShareButton>

        <WhatsappShareButton url={shareUrl} className="flex-1">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md group-hover:scale-105 transition">
              <span className="text-sm font-bold">WA</span>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-green-500 transition">
              WhatsApp
            </span>
          </div>
        </WhatsappShareButton>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default ProductGallery;

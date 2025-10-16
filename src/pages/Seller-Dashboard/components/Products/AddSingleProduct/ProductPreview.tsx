import { MediaData } from "@/types/SellerDashboardTypes/MediaUpload";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";

interface ProductPreviewProps {
  file?: File;
  defaultMedia?: MediaData;
  mediaData?: MediaData | null;
  previewDetails?: Partial<Product> | null;
}

export default function ProductPreview({
  file,
  defaultMedia,
  mediaData,
  previewDetails,
}: ProductPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [availableSize, setAvailableSize] = useState<string | null>(null);
  const sizes = ["5mg", "10mg", "20mg", "50mg"];

  // Use previewDetails if available, otherwise fallback to defaults
  const productName =
    previewDetails?.productName ||
    "Gastroesophageal Reflux Disease (GERD): Acid from the stomach flows back into the esophagus.";
  const productSKU = previewDetails?.productSKU || "GRD-00253A";
  const pricePerUnit = previewDetails?.pricePerUnit || 100;

  useEffect(() => {
    if (previewDetails) setAvailableSize(previewDetails?.availableSize || null);
  }, [previewDetails]);

  // Determine which image to show with priority: new upload > mediaData > defaultMedia
  useEffect(() => {
    // Clean up previous blob URL if it exists
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    // Priority 1: New file upload
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl);
      return;
    }

    // Priority 2: Media data from parent (new uploads that are already processed)
    if (mediaData?.images?.mainImage) {
      if (mediaData.images.mainImage instanceof File) {
        // If it's a File object, create blob URL
        const blobUrl = URL.createObjectURL(mediaData.images.mainImage);
        setPreview(blobUrl);
      } else {
        // If it's already a URL string, use it directly
        setPreview(mediaData.images.mainImage as string);
      }
      return;
    }

    // Priority 3: Default media from backend
    if (defaultMedia?.images?.mainImageUrl) {
      setPreview(defaultMedia.images.mainImageUrl);
      return;
    }

    // Fallback: No image available
    setPreview(null);
  }, [file, mediaData, defaultMedia]);

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const imageSrc = preview || "/medicine.png";

  return (
    <div className="bg-light-background rounded-lg p-6">
      {/* Product Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={imageSrc}
          alt="Product preview"
          width={300}
          height={200}
          className="w-full h-auto object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = "/medicine.png";
          }}
        />

        {/* Image source indicator */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
          {file || mediaData?.images?.mainImage instanceof File
            ? "New Upload"
            : "Current Image"}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h2 className="">{productName}</h2>

        <p className="text-sm">SKU: {productSKU}</p>

        <div>
          <p className="text-light-gray text-xs font-normal mb-1">
            Price per unit
          </p>
          <p className="text-dark-blue text-2xl font-bold">${pricePerUnit}</p>
        </div>

        {/* Size Selection */}
        <div>
          <p className="text-dark-blue text-sm font-medium mb-3">
            Select Available Size
          </p>
          <div className="flex items-center gap-2">
            {sizes.map((size) => {
              return (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    size === availableSize
                      ? "bg-dark-blue text-white"
                      : "bg-gray-100 text-dark-blue hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { DefaultPreviewData } from "./AddProduct";

export default function ProductPreview({
  file,
  defaultPreview,
}: {
  file?: File;
  defaultPreview: DefaultPreviewData | undefined;
}) {
  const [selectedSize, setSelectedSize] = useState(
    defaultPreview?.availableSize || "20 mg"
  );
  const [preview, setPreview] = useState<string | null>(null);
  const sizes = ["5mg", "10mg", "20mg", "50mg"];
  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file]);
  return (
    <div className="bg-light-background rounded-lg p-6">
      {/* Product Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={preview || defaultPreview?.mainImage || "/medicine.png"}
          alt="Oxecone-8 medication"
          width={300}
          height={200}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h3 className="text-dark-blue font-semibold text-base leading-tight">
          {defaultPreview?.name}
        </h3>

        <p className="text-light-gray text-xs font-normal">
          {defaultPreview?.productSKU}
        </p>

        <div>
          <p className="text-light-gray text-xs font-normal mb-1">
            Price per unit
          </p>
          <p className="text-dark-blue text-2xl font-bold">
            {defaultPreview?.pricePerUnit}
          </p>
        </div>

        {/* Size Selection */}
        <div>
          <p className="text-dark-blue text-sm font-medium mb-3">
            Select Available Size
          </p>
          <div className="flex items-center gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? "bg-dark-blue text-white"
                    : "bg-gray-100 text-dark-blue hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react"

export default function ProductCard() {
  const [selectedSize, setSelectedSize] = useState("20 mg")

  const sizes = ["5mg", "10 mg", "20 mg", "50 mg"]

  return (
    <div className="bg-light-background rounded-lg p-6">
      {/* Product Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src="/public/medicine.png"
          alt="Oxecone-8 medication"
          width={300}
          height={200}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h3 className="text-dark-blue font-semibold text-base leading-tight">
          Gastroesophageal Reflux Disease (GERD): Acid from the stomach flows back into the esophagus.
        </h3>

        <p className="text-light-gray text-xs font-normal">SKU: GRD-00253A</p>

        <div>
          <p className="text-light-gray text-xs font-normal mb-1">Price per unit</p>
          <p className="text-dark-blue text-2xl font-bold">$100</p>
        </div>

        {/* Size Selection */}
        <div>
          <p className="text-dark-blue text-sm font-medium mb-3">Select Available Size</p>
          <div className="flex items-center gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSize === size ? "bg-dark-blue text-white" : "bg-gray-100 text-dark-blue hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

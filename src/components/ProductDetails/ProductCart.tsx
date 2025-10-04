import ProductCartImg from "../../assets/ProductDetailsCartimg.png"

export default function ProductCard() {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      {/* Product Image Container */}
      <div className="relative bg-[#e8e8e8] p-4 aspect-square flex items-center justify-center">
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          aria-label="Add to favorites"
        >
          <svg 
            className="w-4 h-4 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Product Image */}
        <img 
          src={ProductCartImg} 
          alt="Harmony biotic digestive tablets"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="py-[14px]">
        <h3 className="text-[20px] text-gray-900 mb-2 leading-tight">
          Harmony biotic digestive tablets
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">
            $7.99
          </span>
          <span className="text-sm text-gray-400 line-through">
            $12.99
          </span>
        </div>
      </div>
    </div>
  );
}
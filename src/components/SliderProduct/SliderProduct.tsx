import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

const SliderProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  
  // Generate products data
  const totalProducts = 234; // Example total
  const allProducts: Product[] = Array.from({ length: totalProducts }, (_, i) => ({
    id: i + 1,
    name: 'Harmony biotic digestive tablets',
    price: 7.99,
    originalPrice: 10.99,
    image: '/bestsell.png'
  }));

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className=" rounded-lg p-6 relative"
            >
              {/* Favorite Button */}
              <button className="absolute top-[-20px] right-10 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                <svg
                  className="w-4 h-4 text-white"
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

              {/* Product Images */}
              <div className="flex justify-center items-center mb-4 h-40">
                <img 
                  src="/bestsell.png" 
                  alt={product.name}
                  className="w-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="mt-18 mb-5">
                <h3 className="text-sm font-medium text-website-color-blue mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center  gap-2">
                  <span className="text-lg font-semibold text-website-color-blue">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors
                ${
                  page === currentPage
                    ? 'bg-[#E6F3FF] text-website-color-blue border-blue-600'
                    : page === '...'
                    ? 'border-transparent cursor-default'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderProduct;
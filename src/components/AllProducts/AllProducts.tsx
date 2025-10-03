import React from 'react';
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

const AllProducts: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 12.99, image: '' },
    { id: 2, name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 13.99, image: '' },
    { id: 3, name: 'Organic herbal tea blend', price: 8.99, originalPrice: 11.99, image: '' },
    { id: 4, name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 12.99, image: '' },
    { id: 5, name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 14.20, image: '' },
    { id: 6, name: 'Organic herbal tea blend', price: 9.99, originalPrice: 14.99, image: '' },
    { id: 7, name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 10.99, image: '' },
    { id: 8, name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 13.99, image: '' },
    { id: 9, name: 'Organic herbal tea blend', price: 8.99, originalPrice: 11.99, image: '' },
    { id: 10, name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 11.49, image: '' },
    { id: 11, name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 13.99, image: '' },
    { id: 12, name: 'Organic herbal tea blend', price: 10.99, originalPrice: 13.99, image: '' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-montserrat font-semibold mb-6 text-website-color-blue">ALL PRODUCTS</h1>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg overflow-hidden relative">
              <div className="absolute top-3 right-3 z-10">
                <button className="w-8 h-8 bg-gray-400 bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-90 transition">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex items-center justify-center">
                <img 
                  src="./bestsell.png" 
                  alt={product.name}
                  className="object-contain"
                />
              </div>
              
              <div className="">
                <h3 className="text-sm text-gray-800 my-2 mt-3">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-md flex items-center gap-2 transition">
            Browse All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
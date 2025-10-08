import React from 'react';
import { Heart, MoveUpRight } from 'lucide-react';
import Button from '../Button/Button';
import { Link, NavLink } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

const AllProducts: React.FC = () => {
  const products: Product[] = [
    { id: "1", name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 12.99, image: '' },
    { id: "2", name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 13.99, image: '' },
    { id: "3", name: 'Organic herbal tea blend', price: 8.99, originalPrice: 11.99, image: '' },
    { id: "4", name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 12.99, image: '' },
    { id: "5", name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 14.20, image: '' },
    { id: "6", name: 'Organic herbal tea blend', price: 9.99, originalPrice: 14.99, image: '' },
    { id: "7", name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 10.99, image: '' },
    { id: "8", name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 13.99, image: '' },
    { id: "9", name: 'Organic herbal tea blend', price: 8.99, originalPrice: 11.99, image: '' },
    { id: "10", name: 'Harmony biotic digestive tablets', price: 7.99, originalPrice: 11.49, image: '' },
    { id: "11", name: 'Eco-friendly reusable water bottle', price: 10.49, originalPrice: 13.99, image: '' },
    { id: "12", name: 'Organic herbal tea blend', price: 10.99, originalPrice: 13.99, image: '' },
  ];

  return (
    <div className="pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-montserrat font-semibold mb-6 text-website-color-blue">ALL PRODUCTS</h1>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <Link to={`/product-details/${product.id}`} key={product.id} className="rounded-lg overflow-hidden relative">
              <div className="absolute top-3 right-3 z-10">
                <button className="w-8 h-8 bg-gray-500 rounded-xl flex items-center justify-center hover:bg-opacity-90 transition">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>
              
              {/* Product Image */}
              <div className="flex items-center justify-center">
                <img 
                  src="./bestsell.png" 
                  alt={product.name}
                  className="object-contain w-full"
                />
              </div>
              
              {/* Product Info */}
              <div className="pb-4">
                <h3 className="text-md font-montserrat font-medium text-gray-800 my-2 mt-3">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-montserrat font-medium text-website-color-blue">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Browse All Button */}
        <div className="flex justify-center">
          <NavLink to="/categories/:categoryName">
            <Button className="font-montserrat text-lg text-gray-100 flex items-center gap-2">
              Browse All
              <MoveUpRight className='w-5 h-5'/>
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

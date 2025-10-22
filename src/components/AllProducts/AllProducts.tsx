import React from 'react';
import { Heart, MoveUpRight } from 'lucide-react';
import Button from '../Button/Button';
import { Link, NavLink } from 'react-router-dom';
import { useGetAllProductsQuery } from '@/Redux/Features/products/products.api';
import { Spinner } from '../ui/spinner';
import { Product } from '@/types/Product';
import CommonWrapper from '@/common/CommonWrapper';

const AllProducts: React.FC = () => {
  const {data:products,isLoading} = useGetAllProductsQuery({})

  if(isLoading) return <div className='min-h-screen grid place-content-center'><Spinner /></div>

  return (
    <div className="py-20">
      <CommonWrapper>
        <h1 className="text-2xl font-montserrat font-semibold mb-6 text-website-color-blue py-10">ALL PRODUCTS</h1>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-8">
          {products?.data?.map((product : Product) => (
            <Link to={`/product-details/${product._id}`} key={product._id} className="rounded-lg overflow-hidden relative">
              <div className="absolute top-3 right-3 z-10">
                <button className="w-8 h-8 bg-gray-500 rounded-xl flex items-center justify-center hover:bg-opacity-90 transition">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>
              
              {/* Product Image */}
              <div className="flex items-center justify-center">
                <img 
                  src={product.mainImageUrl || "./bestsell.png"} 
                  alt={product.productName}
                  className=" w-full h-96"
                />
              </div>
              
              {/* Product Info */}
              <div className="pb-4">
                <h3 className="text-md font-montserrat font-medium text-gray-800 my-2 mt-3">{product.productName}</h3>
                <div className="flex items-center gap-2">
                  {
                    product.specialPrice &&
                    <span className="text-lg font-montserrat font-medium text-website-color-blue">
                    ${product?.specialPrice?.toFixed(2)}
                  </span>
                  }
                  <span className="text-sm text-gray-400 line-through">
                    ${product?.pricePerUnit?.toFixed(2)}
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
      </CommonWrapper>
    </div>
  );
};

export default AllProducts;

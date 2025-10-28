import React from 'react';
import { useGetProductByIdQuery } from '@/Redux/Features/products/products.api';
import { Spinner } from '@/components/ui/spinner';

interface DetailsOverviewProps {
  productId: string;
}

const DetailsOverview: React.FC<DetailsOverviewProps> = ({ productId }) => {
  const { data, isLoading } = useGetProductByIdQuery({ id: productId });
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  const product = data?.data;

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Product details not available</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-8">
        {/* Description Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Description
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {product.productDescription || 'No description available for this product.'}
          </p>
        </div>

        {/* Product Details Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Product Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">SKU:</span>
              <span className="font-medium text-gray-900">{product.productSKU}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium text-gray-900">{product.companyName}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium text-gray-900">{product.weight} kg</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Available Size:</span>
              <span className="font-medium text-gray-900">{product.availableSize || 'Standard'}</span>
            </div>
            {product.gender && (
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium text-gray-900">{product.gender}</span>
              </div>
            )}
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium text-gray-900">{product.stock} units</span>
            </div>
          </div>
        </div>

        {/* Suggested Use Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Suggested Use
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4">
            <p>
              Take as recommended by a nutritionally-informed physician. Individual needs may vary.
            </p>
            <p>
              For best results, use as part of a balanced diet and healthy lifestyle. Store in a cool, 
              dry place away from direct sunlight. Keep out of reach of children.
            </p>
          </div>
        </div>

        {/* Pricing Information */}
        {product.specialPrice && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Special Offer
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.specialPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.pricePerUnit.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Save {Math.round(((product.pricePerUnit - product.specialPrice) / product.pricePerUnit) * 100)}%
                </span>
              </div>
              {product.specialPriceStartingDate && product.specialPriceEndingDate && (
                <p className="text-sm text-gray-600">
                  Valid from {new Date(product.specialPriceStartingDate).toLocaleDateString()} to{' '}
                  {new Date(product.specialPriceEndingDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Warnings Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Warnings
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            If pregnant or nursing, consult your healthcare practitioner before using this product. Keep out 
            of reach of children. Do not exceed recommended dose unless directed by a healthcare professional.
          </p>
        </div>

        {/* Disclaimer Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Disclaimer
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            These statements have not been evaluated by the Food and Drug Administration. This product is not 
            intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. If you have 
            a medical condition or are taking medications, please consult your healthcare provider before use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsOverview;
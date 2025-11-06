// ProductDetailsTab.tsx
import React, { useState } from 'react';
import DetailsOverview from './DetailsOverview';
import DetailsReatingReview from './DetailsReatingReview';

interface ProductDetailsTabProps {
  productId: string;
}

const ProductDetailsTab: React.FC<ProductDetailsTabProps> = ({ productId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  return (
    <div className="w-full mt-20">
      {/* Tab Navigation */}
      <div className="flex border-b items-center justify-between border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`cursor-pointer px-6 py-3 w-full text-lg font-medium transition-colors ${
            activeTab === 'overview'
              ? 'text-gray-900 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Product overview
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`cursor-pointer px-6 py-3 w-full text-lg font-medium transition-colors ${
            activeTab === 'reviews'
              ? 'text-gray-900 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Rating & Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'overview' ? (
          <DetailsOverview productId={productId}/>
        ) : (
          <DetailsReatingReview productId={productId} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTab;
import { useState } from "react";
// import StoreProduct from "./StoreProduct";
import StoreReviewRating from "./StoreReviewRating";


const StoreProfileTab = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
    return (
        <div className="w-full px-[15px]">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-3 text-lg font-medium transition-colors ${activeTab === 'overview'
                        ? 'text-gray-900 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Product
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-3 text-lg font-medium transition-colors ${activeTab === 'reviews'
                        ? 'text-gray-900 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Ratting & Reviews
                </button>
            </div>

            {/* Tab Content */}
            <div className="py-8">
                {activeTab === 'overview' ? (
                    // <StoreProduct />
                    <></>
                ) : (
                    <StoreReviewRating />
                )}
            </div>
        </div>
    )
}

export default StoreProfileTab
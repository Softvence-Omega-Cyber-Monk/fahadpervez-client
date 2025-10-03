import { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function OrderSearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [orderDate] = useState('Order date');
  const [orderStatus] = useState('Order Status');

  return (
    <div className="w-full bg-white mt-8">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            placeholder="Search by order id"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-10 pl-4 pr-11 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors">
            <Search className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Filter Button and Dropdowns Container */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Filter Icon Button */}
          <button className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>

          {/* Order Date Dropdown */}
          <button className="h-10 px-4 flex items-center justify-between gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px]">
            <span className="text-sm text-gray-700 whitespace-nowrap">{orderDate}</span>
            <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" strokeWidth={2} />
          </button>

          {/* Order Status Dropdown */}
          <button className="h-10 px-4 flex items-center justify-between gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px]">
            <span className="text-sm text-gray-700 whitespace-nowrap">{orderStatus}</span>
            <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
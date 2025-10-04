import { ChevronDown } from 'lucide-react';

interface Props {
  dateRange: string;
  orderStatus: string;
  category: string;
  setDateRange: (val: string) => void;
  setOrderStatus: (val: string) => void;
  setCategory: (val: string) => void;
  onApply: () => void;
}

const Filters: React.FC<Props> = ({
  dateRange, orderStatus, category,
  setDateRange, setOrderStatus, setCategory,
  onApply
}) => (
  <div className="bg-white rounded-xl px-6 py-6 md:px-8">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Filters & Export</h2>
    
    <div className="flex flex-col md:flex-row md:items-end gap-4">
      {/* Date Range */}
      <div className="flex-1">
        <label className="block font-medium text-sm text-gray-600 mb-2">Date Range</label>
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option className='hover:cursor-pointer'>Last 7 Days</option>
            <option className='hover:cursor-pointer'>Last 30 Days</option>
            <option className='hover:cursor-pointer'>Last 90 Days</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" />
        </div>
      </div>

      {/* Order Status */}
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-2 font-medium">Order Status</label>
        <div className="relative">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option className='hover:cursor-pointer'>All Statuses</option>
            <option className='hover:cursor-pointer'>Pending</option>
            <option className='hover:cursor-pointer'>Delivered</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" />
        </div>
      </div>

      {/* Category */}
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-2 font-medium">Category</label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full   appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
          >
           <option className='hover:cursor-pointer'>All Category</option>
            <option className='hover:cursor-pointer'>Electronics</option>
            <option className='hover:cursor-pointer'>Clothing</option> 
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="w-full md:w-auto px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-50 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  </div>
);

export default Filters;

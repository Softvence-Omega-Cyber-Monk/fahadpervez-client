import { X } from 'lucide-react';

export default function RecentOrderStatus() {
  return (
    <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border-1 rounded-md">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl sm:text-2xl font-medium text-gray-900">
              Recent order status
            </h2>
            <span className="inline-block px-4 pt-1.5 bg-orange-50 text-orange-300 text-sm rounded-md">
              Preparing for Shipment
            </span>
          </div>
          
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Last order id: #ORD-2025-347
          </h3>
        </div>

        {/* Cancel Button */}
        <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors self-start sm:self-auto border-1 border-[#F00] p-1 rounded-md">
          <span className="text-sm sm:text-base font-sm">Cancel order</span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 flex items-center justify-center">
            <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" strokeWidth={3} />
          </div>
        </button>
      </div>

      {/* Dates Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 text-md text-gray-700">
        <div>Placed on 17 june, 2025  3:50 pm</div>
        <div className="sm:text-right">Estimate delivery time: 21 june, 2025</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Amount Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total amount</div>
          <div className="text-3xl font-bold text-gray-900">$30</div>
        </div>

        {/* Total Product Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-lg text-gray-600 mb-2">Total product</div>
          <div className="text-3xl font-bold text-gray-900">3</div>
        </div>

        {/* Shipping Method Card */}
        <div className="border border-gray-200 rounded-lg p-8 text-center sm:col-span-2 lg:col-span-1">
          <div className="text-lg text-gray-600 mb-2">Shipping method</div>
          <div className="text-xl sm:text-2xl text-[#FFA600]">Priority shipping</div>
        </div>
      </div>
    </div>
  );
}
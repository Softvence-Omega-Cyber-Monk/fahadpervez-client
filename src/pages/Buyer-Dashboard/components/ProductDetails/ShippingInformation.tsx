import { Edit2 } from 'lucide-react';

export default function ShippingInformation() {
  return (
    <div className="w-full bg-white p-6 sm:p-8 mt-6 border-gray-100 border-1 rounded-md">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-gray-900">Shipping information</h2>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors">
          <Edit2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
        </button>
      </div>

      {/* Delivery Address Section */}
      <div className="mb-8">
        <h3 className="text-lg text-gray-600 mb-3">Delivery Address</h3>
        <div className="text-gray-500 mb-2">Marvin McKinney</div>
        <div className="text-gray-600 text-sm">
          1234 Business Ave, Suite 567, New York, NY 10001, United States
        </div>
      </div>

      {/* Shipping Details Section */}
      <div>
        <h3 className="text-lg text-gray-600 mb-4">Shipping Details</h3>
        
        {/* Carrier */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-4">
          <div className="text-gray-600">Carrier</div>
          <div className="text-gray-600 font-medium sm:text-right">DHL Express</div>
        </div>

        {/* Tracking Number */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          <div className="text-gray-600">Tracking number</div>
          <div className="text-gray-900 font-medium sm:text-right">#98593656</div>
        </div>
      </div>
    </div>
  );
}
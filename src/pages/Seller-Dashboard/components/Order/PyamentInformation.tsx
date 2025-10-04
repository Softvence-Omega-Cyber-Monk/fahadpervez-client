import { Edit2 } from 'lucide-react';

export default function PaymentInformation() {
  return (
    <div className="w-full bg-white p-6 sm:p-8 border-gray-100 border-1 rounded-2xl mt-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="">Payment Information</h2>
        <button className="w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-blue-50 transition-colors">
          <Edit2 className="w-5 h-5 text-blue-600" strokeWidth={2} />
        </button>
      </div>

      {/* Card Information with Paid Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div className="flex items-center gap-2">
          {/* Visa Logo */}
          <div className="bg-blue-600 text-white font-bold text-xs px-1.5 py-0.5 rounded">
            VISA
          </div>
          {/* Masked Card Number */}
          <div className="flex items-center gap-1 text-gray-900">
            <span className="text-lg leading-none">••••</span>
            <span className="text-lg leading-none">••••</span>
            <span className="text-lg leading-none">••••</span>
            <span className="font-medium">1234</span>
          </div>
        </div>
        
        {/* Paid Badge */}
        <div className="text-green-600 font-bold text-lg self-start sm:self-auto">
          Paid
        </div>
      </div>

      {/* Payment Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-4">
        <div className="text-gray-600">Payment Date</div>
        <div className="text-gray-900 font-medium sm:text-right">17 june, 2025</div>
      </div>

      {/* Transaction ID */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
        <div className="text-gray-600">Transaction ID</div>
        <div className="text-gray-900 font-medium sm:text-right">#98593656</div>
      </div>
    </div>
  );
}
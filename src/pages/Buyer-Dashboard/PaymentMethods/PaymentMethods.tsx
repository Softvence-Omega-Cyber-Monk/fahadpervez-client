import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function PaymentMethods() {
  const [defaultPayment, setDefaultPayment] = useState('visa');
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'visa', type: 'Visa', last4: '2241', expiry: '07/2027', icon: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png' },
    { id: 'mastercard', type: 'Mastercard', last4: '1234', expiry: '05/2026', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { id: 'paypal', type: 'PayPal', last4: '', expiry: '05/2026', icon: 'https://www.shutterstock.com/image-vector/paypal-multinational-financial-technology-payment-260nw-2276341185.jpg' }
  ]);

  const handleSetDefault = (id:string) => {
    setDefaultPayment(id);
  };

  const handleDelete = (id:string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white p-6 lg:p-8 rounded-lg shadow-sm">
        
        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-normal text-gray-900 mb-6 sm:mb-7 lg:mb-8">
          Payment method
        </h2>

        {/* Payment Methods Grid - Optimized for Laptop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border-2 rounded-xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between transition-all relative min-h-[160px] lg:min-h-[170px] ${
                defaultPayment === method.id 
                ? 'border-orange-500 shadow-md' 
                : 'border-dashed border-gray-300 hover:border-gray-400'
              }`}
            >
              
              {/* Main Content Area */}
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 mb-4">
                
                {/* Icon */}
                <div className="row-span-2 w-12 h-8 flex items-center justify-center flex-shrink-0">
                  <img
                    src={method.icon}
                    alt={method.type}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                {/* Card Title/Number */}
                <h3 className="text-base sm:text-lg font-medium text-gray-900 pr-16 lg:pr-20 break-words leading-tight">
                  {method.type} {method.last4 && `•• ${method.last4}`}
                </h3>
                
                {/* Card Expiry */}
                <p className="text-xs sm:text-sm text-gray-600">
                  Expires {method.expiry}
                </p>
                
              </div>
              
              {/* Action Icons */}
              <div 
                className="flex gap-3 flex-shrink-0 absolute top-4 sm:top-5 lg:top-6 right-4 sm:right-5 lg:right-6"
              >
                <button 
                  title="Edit" 
                  className="text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(method.id)}
                  className="text-red-600 hover:text-red-700 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              {/* Default Button */}
              <div className="flex justify-end pt-3 border-t border-dashed border-gray-100 mt-3">
                {defaultPayment === method.id ? (
                  <button
                    disabled
                    className="px-4 py-2 border-2 border-orange-400 text-orange-400 rounded-lg text-xs sm:text-sm font-medium cursor-default whitespace-nowrap"
                  >
                    Default
                  </button>
                ) : (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap hover:shadow-sm"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add New Payment Method Card */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 lg:p-6 flex flex-col items-center justify-center min-h-[160px] lg:min-h-[170px] text-center hover:bg-gray-50 transition cursor-pointer group">
            <button className="flex flex-col items-center gap-3 text-gray-700 hover:text-gray-900 w-full h-full justify-center">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
              <p className="text-sm sm:text-base leading-snug">
                Add new payment method<br />
                <span className="text-sm text-gray-600">
                  (Credit card, Bank account or Paypal)
                </span>
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center xl:justify-end mt-8">
        <button className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors hover:shadow-md">
          Save changes
        </button>
      </div>
    </div>
  );
}
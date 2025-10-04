import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function PaymentMethods() {
  const [defaultPayment, setDefaultPayment] = useState('visa');
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'visa',
      type: 'Visa',
      last4: '2241',
      expiry: '07/2027',
      icon: 'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png'
    },
    {
      id: 'mastercard',
      type: 'Mastercard',
      last4: '1234',
      expiry: '05/2026',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
    },
    {
      id: 'paypal',
      type: 'PayPal',
      last4: '',
      expiry: '05/2026',
      icon: 'https://www.shutterstock.com/image-vector/paypal-multinational-financial-technology-payment-260nw-2276341185.jpg'
    }
  ]);

  const handleSetDefault = (id:string) => {
    setDefaultPayment(id);
  };

  const handleDelete = (id:string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <div>
      <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-lg">
        {/* Heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-normal text-gray-900 mb-6">
          Payment method
        </h2>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4">
                {/* Card Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 flex items-center justify-center">
                    <img
                      src={method.icon}
                      alt={method.type}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      {method.type} {method.last4 && `in ${method.last4}`}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Expires {method.expiry}
                    </p>
                  </div>
                </div>

                {/* Action Icons + Buttons */}
                <div className="flex flex-col items-start sm:items-end">
                  <div className="flex gap-3 mb-3 sm:mb-0">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {defaultPayment === method.id ? (
                    <button
                      disabled
                      className="px-3 py-1 border-2 border-orange-400 text-orange-400 rounded-lg text-sm font-medium cursor-default mt-3 sm:mt-5"
                    >
                      Default
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors mt-3 sm:mt-5"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add New Payment Method Card */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
            <button className="flex flex-col items-center gap-3 text-gray-700 hover:text-gray-900">
              <Plus className="w-8 h-8" />
              <p className="text-sm sm:text-base">
                Add new payment method (Credit card, Bank account or Paypal)
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center sm:justify-end mt-5">
        <button className="w-full sm:w-auto px-6 sm:px-16 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base md:text-lg font-medium rounded-lg transition-colors">
          Save changes
        </button>
      </div>
    </div>
  );
}

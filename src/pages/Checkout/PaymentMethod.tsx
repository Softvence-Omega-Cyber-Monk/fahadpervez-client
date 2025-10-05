export default function PaymentMethod() {
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
        {/* Header with Payment Method title and card icons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Payment Method
          </h1>
          
          {/* Card Icons */}
          <div className="flex items-center gap-3">
            {/* Visa - Selected */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-blue-500 rounded-lg flex items-center justify-center bg-white shadow-sm">
              <span className="text-blue-600 font-bold text-sm">VISA</span>
            </div>
            
            {/* Other Card */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 rounded-lg flex items-center justify-center bg-white">
              <div className="w-8 h-5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded"></div>
            </div>
            
            {/* Mastercard */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 rounded-lg flex items-center justify-center bg-white">
              <div className="flex items-center gap-[-4px]">
                <div className="w-5 h-5 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-5 h-5 bg-orange-400 rounded-full opacity-80 -ml-3"></div>
              </div>
            </div>
            
            {/* American Express */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 rounded-lg flex items-center justify-center bg-white">
              <span className="text-blue-500 font-bold text-xs">AMEX</span>
            </div>
          </div>
        </div>

        {/* Card Number Field */}
        <div className="mb-6">
          <label htmlFor="cardNumber" className="block text-base font-medium text-gray-900 mb-2">
            Card Number
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Expiry Date and Security Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-base font-medium text-gray-900 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Security Code */}
          <div>
            <label htmlFor="securityCode" className="block text-base font-medium text-gray-900 mb-2">
              Security Code*
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 mb-8">
          {/* Save card for future purchases */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-gray-900 rounded cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
            <span className="text-base text-gray-900 select-none">
              Save card for future purchases
            </span>
          </label>

          {/* Set as my default payment method */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-gray-900 rounded cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
            <span className="text-base text-gray-900 select-none">
              Set as my default payment method
            </span>
          </label>

          {/* Billing address is same as shipping address */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-gray-900 rounded cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
            <span className="text-base text-gray-900 select-none">
              Billing address is same as shipping address
            </span>
          </label>
        </div>

        {/* Save and Continue Button */}
        <button className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Save and continue
        </button>
      </div>
    </div>
  );
}
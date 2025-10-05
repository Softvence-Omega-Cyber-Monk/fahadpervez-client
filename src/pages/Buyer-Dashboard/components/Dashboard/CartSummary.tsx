export default function CartSummary() {
  return (
    <div className="w-full max-w-3xl mt-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Cart summary
          </h2>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
          >
            View Cart
          </a>
        </div>

        {/* Total Items */}
        <div className="mb-3">
          <p className="text-gray-900 text-base sm:text-lg">
            Total item: <span className="font-normal">8</span>
          </p>
        </div>

        {/* Total Value */}
        <div className="mb-6">
          <p className="text-gray-900 text-base sm:text-lg">
            Total value:{' '}
            <span className="text-red-600 font-bold text-xl sm:text-2xl">
              $120
            </span>
          </p>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-base sm:text-lg py-4 rounded-lg transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
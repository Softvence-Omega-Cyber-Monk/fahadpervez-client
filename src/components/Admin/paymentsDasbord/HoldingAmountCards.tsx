export const HoldingAmountCards: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-6">
    {/* Total Holding Amount */}
    <div className="bg-orange-100 rounded-lg p-6 border border-orange-100">
      <p className="text-sm text-gray-600 mb-2">Total Holding Amount</p>
      <p className="text-4xl font-bold text-orange-500">$45,726</p>
    </div>

    {/* Ready For Release */}
    <div className="bg-green-100 rounded-lg p-6 border border-green-100">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-4xl font-bold text-green-600 mb-2">$45,726</p>
          <p className="text-sm text-gray-600">Ready For Release (Order Delivered)</p>
        </div>
        <button className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
          Release
        </button>
      </div>
    </div>
  </div>
);

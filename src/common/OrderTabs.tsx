const OrderTabs = () => {
  return (
    <div className="bg-white rounded-md py-4 px-6 shadow-sm overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <button className="bg-blue-600 text-white font-sm px-6 py-2 rounded-full text-md whitespace-nowrap">
          All Order <span className="font-normal">(16)</span>
        </button>


        <button className="text-gray-800 text-md font-sm whitespace-nowrap">
          Pending order <span className="text-yellow-500">(3)</span>
        </button>

        <button className="text-gray-800 text-md font-sm whitespace-nowrap">
          Complete Order <span className="text-green-500">(11)</span>
        </button>

        <button className="text-gray-800 text-md font-sm whitespace-nowrap">
          Cancel Order <span className="text-red-500">(2)</span>
        </button>
      </div>
    </div>
  );
};

export default OrderTabs;

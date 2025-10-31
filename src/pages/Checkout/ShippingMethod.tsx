






import { useGetAllShipmentsQuery } from "@/Redux/Features/Shipment/shipment.api";

export default function ShippingMethod() {
    const { data: shipments } = useGetAllShipmentsQuery({});
  console.log(shipments)
  return (
    <div className="bg-gray-100">
      <div className="bg-white w-full rounded-lg shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
          shipping Method
        </h1>
{/* fghfgh */}
        <div className="space-y-4 mb-6">
          {/* DHL Express - Selected */}
          <div className="border-2 border-blue-500 rounded-lg p-4 sm:p-5 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 rounded flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs sm:text-sm">DHL</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    DHL Express
                  </h3>
                  <p className="text-blue-600 font-medium text-base sm:text-lg mb-1">
                    $1.99
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    *Full tracking max 150bs (168kg) No PO Box
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 sm:text-right whitespace-nowrap">
                EST. Delivery date 3 Sep, 2025
              </div>
            </div>
          </div>

          {/* Aramex Delivery */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white hover:border-gray-300 transition-colors cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xs">aramex</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    Aramex Delivery
                  </h3>
                  <p className="text-blue-600 font-medium text-base sm:text-lg mb-1">
                    $2.99
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    *Full tracking max 120bs (115kg) No PO Box
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 sm:text-right whitespace-nowrap">
                EST. Delivery date 3 Sep, 2025
              </div>
            </div>
          </div>

          {/* Elite Shipping */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white hover:border-gray-300 transition-colors cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 rounded flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-400 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    Elite Shipping
                  </h3>
                  <p className="text-blue-600 font-medium text-base sm:text-lg mb-1">
                    $1.26
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    *Full tracking max 150bs (68kg)
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 sm:text-right whitespace-nowrap">
                EST. Delivery date 3 Sep, 2025
              </div>
            </div>
          </div>

          {/* Orrem shipment */}
          <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-white hover:border-gray-300 transition-colors cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl sm:text-2xl">O</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    Orrem shipment
                  </h3>
                  <p className="text-blue-600 font-medium text-base sm:text-lg mb-1">
                    $1.33
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    *Full tracking max 102bs (108kg) No PO Box
                  </p>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 sm:text-right whitespace-nowrap">
                EST. Delivery date 3 Sep, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Save and continue button */}
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium text-base sm:text-lg px-8 py-3 rounded-lg transition-colors">
          Save and continue
        </button>
      </div>
    </div>
  );
}
import OrderSearchBar from "../components/MyOrders/OrderSearchBar"
import OrderTable from "../components/MyOrders/OrderTable"
import OrderTabs from "../components/MyOrders/OrderTabs"
import Pagination from "../components/MyOrders/Pagination"

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 xs:py-5 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
          <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-sm xs:text-base text-gray-600">
            Manage and track your orders
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-xs xs:shadow-sm sm:shadow-md border border-gray-200 overflow-hidden">
          {/* Tabs Section */}
          <div className="border-b border-gray-200">
            <OrderTabs />
          </div>

          {/* Search and Filters Section */}
          <div className="p-3 xs:p-4 sm:p-5 lg:p-6 border-b border-gray-200 bg-gray-50/50">
            <OrderSearchBar />
          </div>

          {/* Table Section */}
          <div className="overflow-hidden">
            <OrderTable />
          </div>

          {/* Pagination Section */}
          <div className="border-t border-gray-200 bg-white p-3 xs:p-4 sm:p-5 lg:p-6">
            <Pagination />
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="lg:hidden fixed bottom-4 left-0 right-0 px-3 xs:px-4 z-10">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors active:scale-95">
              Filter Orders
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors active:scale-95">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyOrders
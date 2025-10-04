import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalOrders = 24;
  const ordersPerPage = 10;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const startOrder = (currentPage - 1) * ordersPerPage + 1;
  const endOrder = Math.min(currentPage * ordersPerPage, totalOrders);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full px-4 py-3 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-md text-gray-900 order-2 sm:order-1">
          Showing {startOrder} to {endOrder} of {totalOrders} orders
        </div>

        {/* Right side - Pagination controls */}
        <div className="flex items-center gap-0 border border-gray-600 rounded-md overflow-hidden order-1 sm:order-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`h-9 w-9 flex items-center justify-center border-r border-gray-300 transition-colors ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed bg-white'
                : 'text-gray-600 hover:bg-gray-50 bg-white'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-[#0082FA]" strokeWidth={2} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`h-9 min-w-[36px] px-3 flex items-center justify-center border-r border-gray-600 text-md transition-colors ${
                currentPage === page
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`h-9 w-9 flex items-center justify-center transition-colors ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed bg-white'
                : 'text-gray-600 hover:bg-gray-50 bg-white'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-[#0082FA]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
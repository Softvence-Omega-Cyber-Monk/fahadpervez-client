import { Product } from '@/types/Product';
import { useState } from 'react';
import { validateProduct } from './CSV.utils';


const BulkProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const itemsPerPage = 10;

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const toggleRowSelection = (sku: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(sku)) newSelected.delete(sku);
    else newSelected.add(sku);
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === paginatedProducts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedProducts.map(p => p.productSKU)));
    }
  };

  const renderIssues = (product: Product) => {
    const issues = validateProduct({ product, allProducts: products });
    console.log(issues)
    if (issues.length === 0) return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
        Valid
      </span>
    );

    return issues.map((issue, idx) => {
      const colors =
        issue.type === 'error'
          ? 'bg-red-50 text-red-700'
          : issue.type === 'warning'
            ? 'bg-yellow-50 text-yellow-700'
          : 'bg-yellow-50 text-yellow-700';
      return (
        <span
          key={idx}
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium mr-1 ${colors}`}
        >
          {issue.message}
        </span>
      );
    });
  };
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedProducts.length && paginatedProducts.length > 0}
                  onChange={toggleAllRows}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sku
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedProducts.map((product, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(product.productSKU)}
                    onChange={() => toggleRowSelection(product.productSKU)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.mainImageUrl && product.mainImageUrl.trim() !== '' ? (
                        <img
                          src={product.mainImageUrl}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No img</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {product.productName}
                      </div>
                      <div className="text-xs text-gray-500">
                        SKU: {product.productSKU}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">${product.pricePerUnit}</td>
                <td className="px-4 py-3">{product.productSKU}</td>
                <td className="px-4 py-3">{product.productCategory}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{renderIssues(product)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} products
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 text-sm border rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkProductTable;

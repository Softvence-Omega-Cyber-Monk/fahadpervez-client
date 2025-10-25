import { useGetAllProductsAdminQuery } from "@/Redux/Features/products/products.api";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Trash2, Edit, Search } from "lucide-react";
import { Product as ProductType } from "@/types/Product";

export interface ProductData {
  id: string;
  name: string;
  sku: string;
  price: number;
  sale: number; 
  seller: string;
  revenue: number;
  stock: number;
  maxStock: number;
  image: string;
}

export const mockProducts: ProductData[] = [
  { id: '1', name: 'Alphaderm 100mg', sku: 'SP-X2023-BLK', price: 89.99, sale: 89, seller: 'Bessie Cooper', revenue: 1500000, stock: 80, maxStock: 100, image: '🧴' },
  { id: '2', name: 'Aldactone 500mg', sku: 'SP-X2023-BLK', price: 79.99, sale: 79, seller: 'Cameron', revenue: 750000, stock: 80, maxStock: 100, image: '💊' },
  { id: '3', name: 'Aldactone 500mg', sku: 'SP-X2023-BLK', price: 59.99, sale: 59, seller: 'Arlene McCoy', revenue: 2300000, stock: 40, maxStock: 100, image: '💊' },
  { id: '4', name: 'Alphacaine 100mg', sku: 'SP-X2023-BLK', price: 69.99, sale: 69, seller: 'Theresa Webb', revenue: 1200000, stock: 0, maxStock: 100, image: '💉' },
  { id: '5', name: 'Alpha Chymar 250ml', sku: 'SP-X2023-BLK', price: 49.99, sale: 49, seller: 'Guy Hawkins', revenue: 900000, stock: 80, maxStock: 100, image: '🧪' },
  { id: '6', name: 'Acetyl methodol', sku: 'SP-X2023-BLK', price: 99.99, sale: 99, seller: 'Eleanor Pena', revenue: 900000, stock: 80, maxStock: 100, image: '🧪' },
  { id: '7', name: 'Alphaderm 100mg', sku: 'SP-X2023-BLK', price: 89.99, sale: 89, seller: 'Devon Lane', revenue: 900000, stock: 80, maxStock: 100, image: '🧴' },
  { id: '8', name: 'Alpertine 500mg', sku: 'SP-X2023-BLK', price: 79.99, sale: 79, seller: 'Jacob Jones', revenue: 900000, stock: 80, maxStock: 100, image: '💊' },
  { id: '9', name: 'Alphadrol', sku: 'SP-X2023-BLK', price: 69.99, sale: 69, seller: 'Savannah Nguyen', revenue: 900000, stock: 80, maxStock: 100, image: '💊' },
  { id: '10', name: 'Alphafilcon', sku: 'SP-X2023-BLK', price: 89.99, sale: 89, seller: 'Annette Black', revenue: 900000, stock: 80, maxStock: 100, image: '🧪' },
];


const ProductList: React.FC = () => {
  const { data, isLoading } = useGetAllProductsAdminQuery(null);
  const navigate = useNavigate();
  
  // State management
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let products : ProductType[] = [];
  
  if(data){
   products = data?.data ;
  }
  console.log(products)
  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    
    return products.filter((product: ProductType) =>
      product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productSKU?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedProducts.size === currentProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(currentProducts.map((p: ProductType) => p._id as string)));
    }
  };

  const toggleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const isAllSelected = currentProducts.length > 0 && selectedProducts.size === currentProducts.length;
  const isSomeSelected = selectedProducts.size > 0 && selectedProducts.size < currentProducts.length;

  // Action handlers
  const handleEditSelected = () => {
    if (selectedProducts.size === 0) {
      alert("Please select at least one product to edit");
      return;
    }
    
    if (selectedProducts.size === 1) {
      const productId = Array.from(selectedProducts)[0];
      navigate(`/admin-dashboard/products/edit/${productId}`);
    } else {
      alert("Bulk edit feature coming soon!");
      // TODO: Implement bulk edit
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.size === 0) {
      alert("Please select at least one product to delete");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedProducts.size} product(s)? This action cannot be undone.`
    );

    if (confirmDelete) {
      console.log("Deleting products:", Array.from(selectedProducts));
      setSelectedProducts(new Set());
      alert(`${selectedProducts.size} product(s) deleted successfully`);
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedProducts(new Set()); // Clear selection on page change
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
        {selectedProducts.size > 0 && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {selectedProducts.size} selected
          </span>
        )}
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-inner placeholder:text-gray-500"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleEditSelected}
              disabled={selectedProducts.size === 0}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-white rounded-lg transition-colors ${
                selectedProducts.size === 0
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Edit size={18} />
              Edit Selected
            </button>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedProducts.size === 0}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-white rounded-lg transition-colors ${
                selectedProducts.size === 0
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <Trash2 size={18} />
              Delete Selected
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="pl-6 pr-2 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={toggleSelectAll}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
              </th>
              {["Product", "Price", "Sale", "Seller", "Revenue", "Stock", "Action"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500">Loading products...</p>
                  </div>
                </td>
              </tr>
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📦</span>
                    <p className="text-gray-500 font-medium">No products found</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              currentProducts.map((product: ProductType) => {
                const {
                  _id,
                  productName,
                  productSKU,
                  pricePerUnit,
                  specialPrice,
                  seller,
                  stock,
                  mainImageUrl,
                } = product;

                const sale =
                  specialPrice && pricePerUnit
                    ? Math.round(100 - (specialPrice / pricePerUnit) * 100)
                    : 0;

                const displayPrice = specialPrice || pricePerUnit;
                const stockPercent = Math.min(stock, 100);
                const isSelected = selectedProducts.has(_id as string);

                return (
                  <tr
                    key={_id}
                    className={`hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="pl-6 pr-2 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectProduct(_id as string)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {mainImageUrl ? (
                          <img
                            src={mainImageUrl}
                            alt={productName}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                        ) : (
                          <span className="text-2xl mr-3">📦</span>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {productName}
                          </p>
                          <p className="text-xs text-gray-500">
                            SKU: {productSKU}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-700 font-medium">
                      ${displayPrice?.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      {sale > 0 ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {sale}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-blue-600 font-medium">
                      {seller?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-4 text-gray-700">$—</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-medium ${
                            stock === 0 ? "text-red-500" : "text-gray-900"
                          }`}
                        >
                          {stock}
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all ${
                              stock === 0 ? "bg-gray-400" : "bg-green-500"
                            }`}
                            style={{ width: `${stockPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => navigate(`/product-details/${_id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <p className="text-sm text-gray-600">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalItems)} of {totalItems} products
          </p>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {"<"}
            </button>
            
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Product: React.FC = () => {
  return (
    <div className="font-sans antialiased">
      <ProductList />
    </div>
  );
};

export default Product;
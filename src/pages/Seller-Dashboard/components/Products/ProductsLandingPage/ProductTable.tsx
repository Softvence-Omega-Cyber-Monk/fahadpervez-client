import { useState, useMemo, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Product as ProductType } from "@/types/Product";
import { useNavigate } from "react-router-dom";


// --- Helper Functions (moved outside component) ---

const getStockColor = (stock: number) => {
  if (stock >= 80) return "bg-green-500";
  if (stock >= 40) return "bg-orange-500";
  return "bg-gray-300";
};

// const calculateRevenue = (product: Product) => {
//   const price = product.specialPrice || product.pricePerUnit;
//   return price * product.stock;
// };


const formatCurrency = (amount: number | null | undefined, currency: string) => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    BDT: "৳",
  };
  const value = amount ?? 0; // fallback to 0 if null/undefined
  return `${symbols[currency] || currency} ${value.toFixed(2)}`;
};

// --- Memoized Table Row Component ---
interface ProductTableRowProps {
  product: ProductType;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const ProductTableRow = memo(({ product, isSelected, onToggleSelect }: ProductTableRowProps) => {
  const navigate = useNavigate();
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(product._id as string)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <img
            src={product.mainImageUrl}
            alt={product.productName}
            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 line-clamp-1">
              {product.productName}
            </span>
            <span className="text-xs text-gray-500">
              SKU: {product.productSKU}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(product.pricePerUnit, product.currency)}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-center">
          {/* <span className="text-sm font-medium text-gray-900 w-8">
            {product.stock}
          </span> */}
          <div className="flex-1 max-w-[100px]">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getStockColor(product.stock)} transition-all`}
                style={{ width: `${Math.min(product.stock, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        {/* <span className="text-sm font-medium text-gray-900">
          {formatCurrency(calculateRevenue(product), product.currency)}
        </span> */}
      </td>
      <td className="px-4 py-4">
        
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors" onClick={() => navigate(`/product-details/${product._id}`)}>
          <Eye className="w-4 h-4" />
          View
        </button>
      </td>
    </tr>
  );
});

// --- Main Product Table Component ---

interface ProductTableProps {
  products: ProductType[];
  totalProduct: number;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string[]>>
  selectedProduct: string[]
}


export default function ProductTable({products,totalProduct,setSelectedProduct,selectedProduct}:ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage]);

  const totalPages = useMemo(() => Math.ceil(products.length / itemsPerPage), [products.length]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedProduct((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  
  }, [setSelectedProduct]);

  const toggleSelectAll = useCallback(() => {
  // Ensure all IDs are strings
  const currentIds = currentProducts
    .map((p) => p._id)
    .filter((id): id is string => typeof id === "string"); // <-- type guard

  const allSelectedOnPage = currentIds.every((id) => selectedProduct.includes(id));

  setSelectedProduct((prev) =>
    allSelectedOnPage
      ? prev.filter((id) => !currentIds.includes(id))
      : [...new Set([...prev, ...currentIds])]
  );
}, [currentProducts, selectedProduct, setSelectedProduct]);


  // if (isLoading) {
  //   return (
  //     <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
  //       <p className="text-gray-500">Loading products...</p>
  //     </div>
  //   );
  // }

  if (totalProduct === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={currentProducts.length > 0 && currentProducts.every((p) => selectedProduct.includes(p._id as string))}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Revenue</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentProducts?.map((product:ProductType) => (
              <ProductTableRow
                key={product._id}
                product={product}
                isSelected={selectedProduct.includes(product._id as string)}
                onToggleSelect={toggleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, products.length)} of{" "}
          {products.length} products
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
import { useGetAllProductsAdminQuery } from "@/Redux/Features/products/products.api";

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

  const products = data?.data || [];

  return (
    <div className="p-4 sm:p-8 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Products</h1>

      {/* Search and Action Bar (Disabled UI) */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by order id"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-inner placeholder:text-gray-500"
              disabled
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
              disabled
            >
              🔍
            </button>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-3 font-medium text-white rounded-lg bg-blue-300 cursor-not-allowed">
              Edit select ✏️
            </button>
            <button className="flex items-center px-4 py-3 font-medium text-white rounded-lg bg-red-300 cursor-not-allowed">
              Delete select 🗑️
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
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  disabled
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
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product: any) => {
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
                    ? Math.round(
                        100 - (specialPrice / pricePerUnit) * 100
                      )
                    : 0;

                const displayPrice = specialPrice || pricePerUnit;
                const stockPercent = Math.min(stock, 100);

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className="pl-6 pr-2 py-4">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-4 flex items-center">
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
                    </td>
                    <td className="px-4 py-4 text-gray-700 font-medium">
                      ${displayPrice?.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{sale}%</td>
                    <td className="px-4 py-4 text-blue-600 font-bold">
                      {seller?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-4 text-gray-700">$--</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm font-medium ${
                            stock === 0
                              ? "text-red-500"
                              : "text-gray-900"
                          }`}
                        >
                          {stock}
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${
                              stock === 0
                                ? "bg-gray-400"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${stockPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Static for now) */}
      <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
        <p className="text-sm text-gray-600">
          Showing 1 to {products.length} of {products.length} Products
        </p>
        <button className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition">
          All Products →
        </button>
        <div className="flex items-center space-x-1">
          <button className="p-2 border border-gray-300 rounded-lg text-gray-500" disabled>
            {"<"}
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600">
            3
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-500" disabled>
            {">"}
          </button>
        </div>
      </div>
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




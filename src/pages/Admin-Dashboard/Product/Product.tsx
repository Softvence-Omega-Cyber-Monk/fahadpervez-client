import { Link } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import { Search, Edit3, Trash2, ChevronRight } from 'lucide-react';

// --- TYPE DEFINITIONS & MOCK DATA ---

export interface ProductData {
  id: string;
  name: string;
  sku: string;
  price: number;
  sale: number; // percentage
  seller: string;
  revenue: number;
  stock: number;
  maxStock: number; 
  image: string; // Placeholder for product icon/image
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


// --- UTILITY COMPONENTS ---

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const formatRevenue = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toFixed(0)}`;
};

interface StockIndicatorProps {
    stock: number;
    max: number;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock, max }) => {
    const percentage = stock === 0 ? 0 : (stock / max) * 100;
    let color = 'bg-green-500';

    if (percentage <= 40 && percentage > 0) {
        color = 'bg-orange-500';
    } else if (percentage === 0) {
        color = 'bg-gray-400';
    }

    return (
        <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${stock === 0 ? 'text-red-500' : 'text-gray-900'}`}>{stock < 10 && stock !== 0 ? `0${stock}` : stock === 0 ? '00' : stock}</span>
            <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                    className={`h-full rounded-full ${color} transition-all duration-500`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

// --- MAIN PRODUCT LIST COMPONENT ---

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  const allProductsSelected = selectedProducts.length === filteredProducts.length && filteredProducts.length > 0;
  
  const handleSelectAll = useCallback(() => {
    if (allProductsSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  }, [allProductsSelected, filteredProducts]);

  const handleSelectProduct = useCallback((productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  }, []);

  const handleEdit = () => {
    if (selectedProducts.length === 0) {
        console.log("No products selected for editing.");
        return;
    }
    // Mock action: In a real app, this would open an edit form/modal
    alert(`Editing selected products: ${selectedProducts.join(', ')}`);
    setSelectedProducts([]);
  }

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
        console.log("No products selected for deletion.");
        return;
    }
    // Mock action: In a real app, this would show a confirmation modal
    alert(`Deleting selected products: ${selectedProducts.join(', ')}`);
    setSelectedProducts([]);
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Products</h1>
      
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order id"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-inner placeholder:text-gray-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800">
                <Search size={20} />
            </button>
          </div>
          <div className="flex space-x-3">
            <button 
                onClick={handleEdit}
                disabled={selectedProducts.length === 0}
                className={`flex items-center px-4 py-3 font-medium text-white rounded-lg shadow-lg transition ${
                    selectedProducts.length > 0 
                        ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50'
                        : 'bg-blue-300 cursor-not-allowed'
                }`}
            >
                Edit select <Edit3 size={16} className="ml-2" />
            </button>
            <button 
                onClick={handleDelete}
                disabled={selectedProducts.length === 0}
                className={`flex items-center px-4 py-3 font-medium text-white rounded-lg shadow-lg transition ${
                    selectedProducts.length > 0 
                        ? 'bg-red-500 hover:bg-red-600 shadow-red-500/50'
                        : 'bg-red-300 cursor-not-allowed'
                }`}
            >
                Delete select <Trash2 size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="pl-6 pr-2 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={allProductsSelected}
                  onChange={handleSelectAll}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              {['Product', 'Price', 'Sale', 'Seller', 'Revenue', 'Stock', 'Action'].map(header => (
                <th key={header} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredProducts.map(product => {
                const isSelected = selectedProducts.includes(product.id);
                return (
                    <tr 
                        key={product.id} 
                        className={`transition duration-150 ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                        <td className="pl-6 pr-2 py-4 text-left w-10">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectProduct(product.id)}
                              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap flex items-center">
                            <span className="text-2xl mr-3">{product.image}</span>
                            <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                            </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700 font-medium">{formatCurrency(product.price)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">{product.sale}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-blue-600 font-bold cursor-pointer">{product.seller}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">{formatRevenue(product.revenue)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                            <StockIndicator stock={product.stock} max={product.maxStock} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Link to={`/product-details/${product.id}`}>
                            <button 
                              className="text-blue-600 hover:text-blue-800 font-medium transition"
                            >
                              View
                            </button>
                          </Link>
                        </td>
                    </tr>
                );
            })}
            {filteredProducts.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-gray-500">No products found matching the search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredProducts.map(product => {
          const isSelected = selectedProducts.includes(product.id);
          return (
            <div key={product.id} className={`bg-white rounded-xl shadow-md border p-4 space-y-4 transition-colors duration-150 ${isSelected ? 'bg-blue-50 border-blue-200' : 'border-gray-100'}`}>
              {/* Top section: Checkbox, Image, Name, SKU, Price */}
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectProduct(product.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer mt-1"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{product.image}</span>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatCurrency(product.price)}</p>
                  <p className="text-xs text-gray-500">{product.sale}% off</p>
                </div>
              </div>

              {/* Middle section: Seller, Revenue, Stock */}
              <div className="grid grid-cols-3 gap-4 text-center border-t border-b border-gray-100 py-3">
                <div><p className="text-xs text-gray-500">Seller</p><p className="text-sm font-medium text-blue-600 mt-1">{product.seller}</p></div>
                <div><p className="text-xs text-gray-500">Revenue</p><p className="text-sm font-medium text-gray-800 mt-1">{formatRevenue(product.revenue)}</p></div>
                <div><p className="text-xs text-gray-500">Stock</p><div className="mt-1 flex justify-center"><StockIndicator stock={product.stock} max={product.maxStock} /></div></div>
              </div>

              {/* Bottom section: Action */}
              <div className="flex justify-end">
                <Link to={`/product-details/${product.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition text-sm">View Details</Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
        <p className="text-sm text-gray-600">Showing 1 to 10 of 11,570 Products</p>
        <button className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition">
            All Products <ChevronRight size={16} className="ml-1" />
        </button>
        <div className="flex items-center space-x-1">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-500 shadow-sm transition">{'<'}</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md shadow-blue-500/50">1</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600 shadow-sm transition">2</button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600 shadow-sm transition">3</button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-500 shadow-sm transition">{'>'}</button>
        </div>
      </div>
    </div>
  );
};

// The main App component now just renders the ProductList
const App: React.FC = () => {
  return (
    <div className="font-sans antialiased">
      <ProductList />
    </div>
  );
};

export default App;
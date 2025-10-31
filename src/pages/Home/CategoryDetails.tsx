import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, X, Mic, Camera, Filter } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '@/Redux/Features/categories/categories.api';
import { useGetAllProductsQuery } from '@/Redux/Features/products/products.api';
import { useAddWishlistMutation } from '@/Redux/Features/wishlist/wishlist.api';

interface Product {
  _id: string;
  productName: string;
  pricePerUnit: number;
  specialPrice?: number;
  productCategory: string;
  companyName: string;
  gender: string;
  availableSize: string;
  mainImageUrl: string;
  weight: number;
  stock: number;
}

interface FilterSection {
  title: string;
  items: { label: string; count: number; checked: boolean }[];
  expanded: boolean;
}

const CategoryDetails = () => {
  const { id } = useParams();
  const { data: allCategoriesResponse } = useGetAllCategoriesQuery({});
  const { data: allProductsResponse } = useGetAllProductsQuery({});
  const [addWishlist] = useAddWishlistMutation()
  
  const [mainCategories, setMainCategories] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMainCategory, setActiveMainCategory] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 18;

  // Process categories data
  useEffect(() => {
    if (allCategoriesResponse?.data && Array.isArray(allCategoriesResponse.data)) {
      const names = allCategoriesResponse.data.map((cat: { categoryName: any; }) => cat.categoryName);
      setMainCategories(names);
      
      // Set active category based on URL id or first category
      if (id && allCategoriesResponse.data.length > 0) {
        const category = allCategoriesResponse.data.find((cat: { _id: string; }) => cat._id === id);
        if (category) {
          setActiveMainCategory(category.categoryName);
        }
      } else if (names.length > 0) {
        setActiveMainCategory(names[0]);
      }
    }
  }, [allCategoriesResponse, id]);

  // Process products data
  useEffect(() => {
    if (allProductsResponse?.data && Array.isArray(allProductsResponse.data)) {
      setAllProducts(allProductsResponse.data);
    }
  }, [allProductsResponse]);
  const [filters, setFilters] = useState<{ [key: string]: FilterSection }>({
    brands: { title: 'Brands', expanded: true, items: [] },
    gender: { title: 'Gender', expanded: true, items: [] },
    size: { title: 'Size', expanded: true, items: [] },
    weight: { title: 'Weight', expanded: true, items: [] },
    price: { title: 'Price', expanded: true, items: [] },
  });

  // Get current category ID
  const currentCategoryId = useMemo(() => {
    if (!allCategoriesResponse?.data || !Array.isArray(allCategoriesResponse.data)) return null;
    const category = allCategoriesResponse.data.find((cat: { categoryName: string; }) => cat.categoryName === activeMainCategory);
    return category?._id || id;
  }, [allCategoriesResponse, activeMainCategory, id]);

  // Filter products by category and build filter options
  const categoryProducts = useMemo(() => {
    if (!allProducts.length || !currentCategoryId) return [];
    return allProducts.filter(p => p.productCategory === currentCategoryId);
  }, [allProducts, currentCategoryId]);

  // Build filter options based on available products
  useEffect(() => {
    if (categoryProducts.length === 0) return;

    const brandCounts: { [key: string]: number } = {};
    const genderCounts: { [key: string]: number } = {};
    const sizeCounts: { [key: string]: number } = {};
    const weightCounts: { [key: string]: number } = {};
    const priceCounts = { 'All': categoryProducts.length, '$0 - $10': 0, '$10 - $20': 0, '$20 - $30': 0, 'Over $30': 0 };

    categoryProducts.forEach(product => {
      // Brands
      brandCounts[product.companyName] = (brandCounts[product.companyName] || 0) + 1;
      
      // Gender
      if (product.gender) {
        genderCounts[product.gender] = (genderCounts[product.gender] || 0) + 1;
      }
      
      // Size
      if (product.availableSize) {
        sizeCounts[product.availableSize] = (sizeCounts[product.availableSize] || 0) + 1;
      }
      
      // Weight
      if (product.weight) {
        const weightLabel = `${product.weight} kg`;
        weightCounts[weightLabel] = (weightCounts[weightLabel] || 0) + 1;
      }
      
      // Price
      const price = product.specialPrice || product.pricePerUnit;
      if (price <= 10) priceCounts['$0 - $10']++;
      else if (price <= 20) priceCounts['$10 - $20']++;
      else if (price <= 30) priceCounts['$20 - $30']++;
      else priceCounts['Over $30']++;
    });

    setFilters(prev => ({
      brands: { ...prev.brands, items: Object.entries(brandCounts).map(([label, count]) => ({ label, count, checked: false })) },
      gender: { ...prev.gender, items: Object.entries(genderCounts).map(([label, count]) => ({ label, count, checked: false })) },
      size: { ...prev.size, items: Object.entries(sizeCounts).map(([label, count]) => ({ label, count, checked: false })) },
      weight: { ...prev.weight, items: Object.entries(weightCounts).map(([label, count]) => ({ label, count, checked: false })) },
      price: { ...prev.price, items: Object.entries(priceCounts).map(([label, count]) => ({ label, count, checked: false })) },
    }));
  }, [categoryProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Brand filter
    const selectedBrands = filters.brands.items.filter(i => i.checked).map(i => i.label);
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.companyName));
    }

    // Gender filter
    const selectedGenders = filters.gender.items.filter(i => i.checked).map(i => i.label);
    if (selectedGenders.length > 0) {
      filtered = filtered.filter(p => selectedGenders.includes(p.gender));
    }

    // Size filter
    const selectedSizes = filters.size.items.filter(i => i.checked).map(i => i.label);
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => selectedSizes.includes(p.availableSize));
    }

    // Weight filter
    const selectedWeights = filters.weight.items.filter(i => i.checked).map(i => i.label);
    if (selectedWeights.length > 0) {
      filtered = filtered.filter(p => selectedWeights.includes(`${p.weight} kg`));
    }

    // Price filter
    const selectedPrices = filters.price.items.filter(i => i.checked).map(i => i.label);
    if (selectedPrices.length > 0 && !selectedPrices.includes('All')) {
      filtered = filtered.filter(p => {
        const price = p.specialPrice || p.pricePerUnit;
        if (selectedPrices.includes('$0 - $10') && price <= 10) return true;
        if (selectedPrices.includes('$10 - $20') && price > 10 && price <= 20) return true;
        if (selectedPrices.includes('$20 - $30') && price > 20 && price <= 30) return true;
        if (selectedPrices.includes('Over $30') && price > 30) return true;
        return false;
      });
    }

    return filtered;
  }, [categoryProducts, searchTerm, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const toggleFilterSection = (key: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: { ...prev[key], expanded: !prev[key].expanded }
    }));
  };

  const toggleFilterItem = (sectionKey: string, itemIndex: number) => {
    setFilters(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        items: prev[sectionKey].items.map((item, idx) =>
          idx === itemIndex ? { ...item, checked: !item.checked } : item
        )
      }
    }));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pt-40 bg-[#F1F5F8]">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl font-semibold text-website-color-blue mb-10 text-center uppercase">
            {activeMainCategory || 'Products'}
          </h1>

          {/* Main Category Pills */}
          <div className="flex items-center justify-center gap-3 mb-8 overflow-x-auto pb-2">
            {mainCategories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveMainCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 text-sm font-medium rounded-lg whitespace-nowrap duration-150 flex items-center gap-2 cursor-pointer ${
                  activeMainCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
                {activeMainCategory === category && (
                  <X className="w-4 h-4 bg-white rounded-full text-blue-500" />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 pr-28 border border-gray-300 bg-white shadow-md rounded-lg focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Search className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Mic className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Camera className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(prev => !prev)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Filter className="w-5 h-5" />
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Filter Content */}
            <div className={`bg-white border border-gray-200 shadow-md rounded-lg p-4 ${showMobileFilters ? 'block lg:block' : 'hidden lg:block'}`}>
              <div className="space-y-1">
                {Object.entries(filters).map(([key, section]) => (
                  <div key={key} className="border-b border-gray-200 last:border-b-0">
                    <button
                      onClick={() => toggleFilterSection(key)}
                      className="flex items-center justify-between w-full text-left py-3 hover:bg-gray-50 px-2 rounded"
                    >
                      <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
                      {section.expanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {section.expanded && section.items.length > 0 && (
                      <div className="pb-3 px-2 space-y-2">
                        {section.items.map((item, idx) => (
                          <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleFilterItem(key, idx)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{item.label}</span>
                            <span className="text-xs text-gray-500">({item.count})</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {currentProducts.map(product => (
                    <Link to={`/product-details/${product._id}`} key={product._id} className="rounded-lg relative">
                      {/* Favorite Button */}
                      <button onClick={() => addWishlist(product._id)} className="absolute top-3 right-3 w-6 h-6 bg-gray-500 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors z-10">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>

                      {/* Product Images */}
                      <div className="flex justify-center items-center mb-4">
                        <img
                          src={product.mainImageUrl || '/bestsell.png'}
                          alt={product.productName}
                          className="w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/bestsell.png';
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div>
                        <h3 className="text-sm font-medium text-website-color-blue mb-2">
                          {product.productName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-md font-semibold text-website-color-blue">
                            ${(product.specialPrice || product.pricePerUnit).toFixed(2)}
                          </span>
                          {product.specialPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.pricePerUnit.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={page === '...'}
                        className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors
                          ${page === currentPage ? 'bg-[#E6F3FF] text-website-color-blue border-blue-600' : page === '...' ? 'border-transparent cursor-default' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
import React, { useState, useEffect, useMemo } from 'react';
import { Heart, SlidersHorizontal, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllProductsQuery } from '@/Redux/Features/products/products.api';
import { useGetAllCategoriesQuery } from '@/Redux/Features/categories/categories.api';
import { useAddWishlistMutation, useGetAllWishListQuery } from '@/Redux/Features/wishlist/wishlist.api';
import { Spinner } from '@/components/ui/spinner';
import { Product } from '@/types/Product';
import CommonWrapper from '@/common/CommonWrapper';
import { toast } from 'sonner';
import { useAppSelector } from '@/hooks/useRedux';

interface Category {
  _id: string;
  categoryName: string;
  categoryImage?: string;
}

const Shop: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery({});
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery({});
  const { data: wishlistData } = useGetAllWishListQuery({ userID: userId });
  const [addWishlist] = useAddWishlistMutation({});

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mobile filter
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const products: Product[] = productsData?.data || [];
  const categories: Category[] = categoriesData?.data || [];

  // Get unique genders - use useMemo to prevent recalculation
  const genders = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.gender).filter(Boolean))
    );
  }, [products]);

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    if (!wishlistData?.data) return false;
    return wishlistData.data.some((item: any) => item.productId === productId);
  };

  // Handle add to wishlist
  const handleAddToWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error('Please login to add to wishlist');
      return;
    }

    try {
      await addWishlist(productId).unwrap();
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  // Filter and sort products - use useMemo to optimize performance
  const { filteredProducts, sortedProducts } = useMemo(() => {
    // Filter products
    const filtered = products.filter((product) => {
      // Search filter
      if (searchQuery && !product.productName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.productCategory !== selectedCategory) {
        return false;
      }

      // Price filter
      const price = product.specialPrice || product.pricePerUnit;
      if (price < priceRange[0] || price > priceRange[1]) {
        return false;
      }

      // Gender filter
      if (selectedGender && product.gender !== selectedGender) {
        return false;
      }

      // Stock filter
      if (inStockOnly && product.stock === 0) {
        return false;
      }

      return true;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      const priceA = a.specialPrice || a.pricePerUnit;
      const priceB = b.specialPrice || b.pricePerUnit;

      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'name':
          return a.productName.localeCompare(b.productName);
        default:
          return 0;
      }
    });

    return { filteredProducts: filtered, sortedProducts: sorted };
  }, [products, searchQuery, selectedCategory, priceRange, selectedGender, inStockOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, selectedGender, inStockOnly, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSelectedGender('');
    setInStockOnly(false);
    setSortBy('default');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedGender || inStockOnly || sortBy !== 'default';

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category?.categoryName || `Category ${categoryId}`;
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Spinner />
      </div>
    );
  }

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ''}
              onChange={() => setSelectedCategory('')}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-gray-700">All Categories</span>
            <span className="ml-auto text-sm text-gray-500">({products.length})</span>
          </label>
          {categories.map((category) => {
            const count = products.filter((p) => p.productCategory === category._id).length;
            return (
              <label
                key={category._id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category._id}
                  onChange={() => setSelectedCategory(category._id)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">{category.categoryName}</span>
                <span className="ml-auto text-sm text-gray-500">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-blue-600"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">${priceRange[0]}</span>
            <span className="font-medium text-gray-700">${priceRange[1]}</span>
          </div>
          <div className="text-center text-xs text-gray-500">
            {filteredProducts.length} products in range
          </div>
        </div>
      </div>

      {/* Gender Filter */}
      {genders.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Gender</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="gender"
                checked={selectedGender === ''}
                onChange={() => setSelectedGender('')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">All</span>
            </label>
            {genders.map((gender) => {
              const count = products.filter((p) => p.gender === gender).length;
              return (
                <label
                  key={gender}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === gender}
                    onChange={() => setSelectedGender(gender)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{gender}</span>
                  <span className="ml-auto text-sm text-gray-500">({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className="text-gray-700 font-medium">In Stock Only</span>
        </label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <CommonWrapper>
        {/* Header */}
        <div className="mb-8 mt-16">
          <h1 className="text-3xl font-montserrat font-bold text-website-color-blue mb-2">
            Shop
          </h1>
          <p className="text-gray-600">
            Showing {currentProducts.length} of {sortedProducts.length} products
            {selectedCategory && (
              <span className="ml-2 text-blue-600 font-medium">
                in {getCategoryName(selectedCategory)}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              </div>
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>

          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileFilters(false)}>
              <div
                className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSection />
              </div>
            </div>
          )}

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer outline-none"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{sortedProducts.length} Products Found</span>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg">
                <div className="mb-4">
                  <svg
                    className="w-20 h-20 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <Link
                      to={`/product-details/${product._id}`}
                      key={product._id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group"
                    >
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleAddToWishlist(e, product._id!)}
                        className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isInWishlist(product._id!)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>

                      {/* Sale Badge */}
                      {product.specialPrice && (
                        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          {Math.round(((product.pricePerUnit - product.specialPrice) / product.pricePerUnit) * 100)}% OFF
                        </div>
                      )}

                      {/* Stock Badge */}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                          <span className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg">
                            OUT OF STOCK
                          </span>
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.mainImageUrl || './bestsell.png'}
                          alt={product.productName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-md font-montserrat font-medium text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                          {product.productName}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-2">
                          {product.specialPrice ? (
                            <>
                              <span className="text-xl font-montserrat font-bold text-blue-600">
                                ${product.specialPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ${product.pricePerUnit.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-montserrat font-bold text-gray-900">
                              ${product.pricePerUnit.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Stock Info */}
                        <div className="flex items-center justify-between text-xs">
                          {product.stock > 0 ? (
                            <span className="text-green-600 font-medium">
                              ✓ {product.stock} in stock
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">Out of stock</span>
                          )}
                          
                          {product.productCategory && (
                            <span className="text-gray-500 truncate max-w-[120px]">
                              {getCategoryName(product.productCategory)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-semibold">{startIndex + 1}</span>-
                      <span className="font-semibold">{Math.min(endIndex, sortedProducts.length)}</span> of{' '}
                      <span className="font-semibold">{sortedProducts.length}</span> products
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                  currentPage === pageNumber
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                          ) {
                            return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Shop;
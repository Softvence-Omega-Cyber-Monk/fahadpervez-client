import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, X, Mic, Camera, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  healthCondition: string;
  certification: string[];
  productForm: string;
  ageRange: string;
  gender: string;
  rating: number;
}

interface FilterSection {
  title: string;
  items: { label: string; count: number; checked: boolean }[];
  expanded: boolean;
}

const SingleProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMainCategory, setActiveMainCategory] = useState('Supplements');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 18;

  const mainCategories = [
    'Supplements',
    'All',
    'Over-the-Counter (OTC)',
    'Vitamins & Supplements',
    'Personal Care & Hygiene',
    'Health & Wellness Equipment',
  ];

  const quickFilters = [
    'Vitamins',
    'Minerals',
    'Antioxidants',
    'Sleep',
    'Gut Health',
    'Brain & Cognitive',
    'Bone Joint & Cartilage',
    'Omega-3 Fish Oils (EPA DHA)',
  ];

  const allProductsData: Product[] = [
    ...Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      name: 'Harmony biotic digestive tablets',
      price: 7.99,
      originalPrice: 10.99,
      category: 'Digestive Health',
      brand: ['Garden of Life', 'Nature Made', 'NOW Foods', 'Solgar', 'Nordic Naturals'][i % 5],
      healthCondition: ['Heart Disease & Arteries', 'Diabetes', 'High Cholesterol', 'Prenatal Care'][i % 4],
      certification: i % 2 === 0 ? ['Organic', 'Non-GMO'] : ['Gluten Free', 'Vegan'],
      productForm: ['Tablets', 'Capsules', 'Softgel', 'Gummies'][i % 4],
      ageRange: ['Baby (0 weeks)', '2-3 years', 'Teens', '50+ years'][i % 4],
      gender: 'Unisex',
      rating: 3 + (i % 3)
    })),
    ...Array.from({ length: 35 }, (_, i) => ({
      id: i + 41,
      name: 'Omega-3 Heart Support Capsules',
      price: 12.99,
      originalPrice: 16.99,
      category: 'Heart Health',
      brand: ['Nordic Naturals', 'Solgar', 'NOW Foods'][i % 3],
      healthCondition: ['Heart Disease & Arteries', 'High Cholesterol'][i % 2],
      certification: i % 3 === 0 ? ['Non-GMO'] : ['Gluten Free', 'Kosher'],
      productForm: ['Softgel', 'Capsules'][i % 2],
      ageRange: ['50+ years', 'Teens'][i % 2],
      gender: 'Unisex',
      rating: 4 + (i % 2)
    })),
    ...Array.from({ length: 45 }, (_, i) => ({
      id: i + 76,
      name: 'Vitamin C Immune Boost',
      price: 9.99,
      originalPrice: 13.99,
      category: 'Immune Support',
      brand: ['Garden of Life', 'Solgar', 'Nature Made'][i % 3],
      healthCondition: ['Flu', 'Diabetes', 'Prenatal Care'][i % 3],
      certification: i % 2 === 0 ? ['Organic', 'Vegan'] : ['Non-GMO'],
      productForm: ['Tablets', 'Gummies', 'Chewable'][i % 3],
      ageRange: ['2-3 years', 'Teens'][i % 2],
      gender: 'Unisex',
      rating: 3 + (i % 3)
    })),
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 121,
      name: 'Glucosamine Joint Formula',
      price: 15.99,
      originalPrice: 19.99,
      category: 'Joint Health',
      brand: ['NOW Foods', 'Solgar'][i % 2],
      healthCondition: 'Heart Disease & Arteries',
      certification: ['Gluten Free', 'Non-GMO'],
      productForm: ['Capsules', 'Tablets'][i % 2],
      ageRange: '50+ years',
      gender: 'Unisex',
      rating: 4 + (i % 2)
    })),
    ...Array.from({ length: 28 }, (_, i) => ({
      id: i + 151,
      name: 'Brain Focus & Memory Support',
      price: 18.99,
      originalPrice: 24.99,
      category: 'Brain Health',
      brand: ['Nordic Naturals', 'Garden of Life'][i % 2],
      healthCondition: 'Diabetes',
      certification: ['Non-GMO', 'Vegan'],
      productForm: ['Capsules', 'Softgel'][i % 2],
      ageRange: 'Teens',
      gender: 'Unisex',
      rating: 5
    })),
  ];

  const [filters, setFilters] = useState<{ [key: string]: FilterSection }>({
    brands: { title: 'Brands', expanded: true, items: [] },
    healthTopics: { title: 'Health topics', expanded: true, items: [] },
    certification: { title: 'Certification and diet', expanded: true, items: [] },
    ageRanges: { title: 'Age ranges', expanded: true, items: [] },
    productForm: { title: 'Product form', expanded: true, items: [] },
    rating: { title: 'Rating', expanded: true, items: [] },
    price: { title: 'Price', expanded: true, items: [] },
    gender: { title: 'Gender', expanded: false, items: [] },
    weight: { title: 'Weight', expanded: false, items: [] },
    packageQuantity: { title: 'Package quantity', expanded: false, items: [] },
    flavour: { title: 'Flavour', expanded: false, items: [] },
  });

  useMemo(() => {
    const brandCounts: { [key: string]: number } = {};
    const healthConditionCounts: { [key: string]: number } = {};
    const certificationCounts: { [key: string]: number } = {};
    const productFormCounts: { [key: string]: number } = {};
    const ageRangeCounts: { [key: string]: number } = {};
    const genderCounts: { [key: string]: number } = {};
    const ratingCounts = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
    const priceCounts = { 'All': allProductsData.length, '$0 - $10': 0, '$10 - $20': 0, '$20 - $30': 0, 'Over $30': 0 };

    allProductsData.forEach(product => {
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
      healthConditionCounts[product.healthCondition] = (healthConditionCounts[product.healthCondition] || 0) + 1;
      product.certification.forEach(cert => {
        certificationCounts[cert] = (certificationCounts[cert] || 0) + 1;
      });
      productFormCounts[product.productForm] = (productFormCounts[product.productForm] || 0) + 1;
      ageRangeCounts[product.ageRange] = (ageRangeCounts[product.ageRange] || 0) + 1;
      genderCounts[product.gender] = (genderCounts[product.gender] || 0) + 1;
      ratingCounts[product.rating.toString() as keyof typeof ratingCounts]++;
      
      if (product.price <= 10) priceCounts['$0 - $10']++;
      else if (product.price <= 20) priceCounts['$10 - $20']++;
      else if (product.price <= 30) priceCounts['$20 - $30']++;
      else priceCounts['Over $30']++;
    });

    setFilters(prev => ({
      brands: { ...prev.brands, items: Object.entries(brandCounts).map(([label, count]) => ({ label, count, checked: false })) },
      healthTopics: { ...prev.healthTopics, items: Object.entries(healthConditionCounts).map(([label, count]) => ({ label, count, checked: false })) },
      certification: { ...prev.certification, items: Object.entries(certificationCounts).map(([label, count]) => ({ label, count, checked: false })) },
      productForm: { ...prev.productForm, items: Object.entries(productFormCounts).map(([label, count]) => ({ label, count, checked: false })) },
      ageRanges: { ...prev.ageRanges, items: Object.entries(ageRangeCounts).map(([label, count]) => ({ label, count, checked: false })) },
      rating: { ...prev.rating, items: Object.entries(ratingCounts).reverse().map(([label, count]) => ({ label, count, checked: false })) },
      price: { ...prev.price, items: Object.entries(priceCounts).map(([label, count]) => ({ label, count, checked: false })) },
      gender: { ...prev.gender, items: Object.entries(genderCounts).map(([label, count]) => ({ label, count, checked: false })) },
      weight: { ...prev.weight, items: [] },
      packageQuantity: { ...prev.packageQuantity, items: [] },
      flavour: { ...prev.flavour, items: [] },
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...allProductsData];

    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const selectedBrands = filters.brands.items.filter(i => i.checked).map(i => i.label);
    if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand));

    const selectedHealthTopics = filters.healthTopics.items.filter(i => i.checked).map(i => i.label);
    if (selectedHealthTopics.length > 0) filtered = filtered.filter(p => selectedHealthTopics.includes(p.healthCondition));

    const selectedCertifications = filters.certification.items.filter(i => i.checked).map(i => i.label);
    if (selectedCertifications.length > 0) filtered = filtered.filter(p => selectedCertifications.some(cert => p.certification.includes(cert)));

    const selectedProductForms = filters.productForm.items.filter(i => i.checked).map(i => i.label);
    if (selectedProductForms.length > 0) filtered = filtered.filter(p => selectedProductForms.includes(p.productForm));

    const selectedAgeRanges = filters.ageRanges.items.filter(i => i.checked).map(i => i.label);
    if (selectedAgeRanges.length > 0) filtered = filtered.filter(p => selectedAgeRanges.includes(p.ageRange));

    const selectedRatings = filters.rating.items.filter(i => i.checked).map(i => parseInt(i.label));
    if (selectedRatings.length > 0) filtered = filtered.filter(p => selectedRatings.includes(p.rating));

    const selectedPrices = filters.price.items.filter(i => i.checked).map(i => i.label);
    if (selectedPrices.length > 0 && !selectedPrices.includes('All')) {
      filtered = filtered.filter(p => {
        if (selectedPrices.includes('$0 - $10') && p.price <= 10) return true;
        if (selectedPrices.includes('$10 - $20') && p.price > 10 && p.price <= 20) return true;
        if (selectedPrices.includes('$20 - $30') && p.price > 20 && p.price <= 30) return true;
        if (selectedPrices.includes('Over $30') && p.price > 30) return true;
        return false;
      });
    }

    return filtered;
  }, [allProductsData, searchTerm, filters]);

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

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );

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
      <header className=" px-6 py-4">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl font-semibold text-website-color-blue mb-10 text-center">SUPPLEMENTS</h1>
          
          {/* Main Category Pills */}
          <div className="flex items-center justify-center gap-3 mb-8 overflow-x-auto pb-2">
            {mainCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveMainCategory(category)}
                className={`px-5 py-2 text-sm font-medium rounded-lg whitespace-nowrap duration-150 flex items-center gap-2 ${
                  activeMainCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 border border-gray-300 text-gray-700 hover:bg-gray-50'
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

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {quickFilters.map(filter => (
              <button
                key={filter}
                className="px-4 py-1.5 border border-gray-400 text-gray-700 text-sm rounded-full hover:bg-gray-50"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className='bg-white border border-gray-100 shadow-md rounded-lg mb-3 flex justify-between items-center py-3 px-4'>
              <p className='text-gray-500'>Available Items Only</p>
              <input type="checkbox"  className='w-5 h-5'/>
            </div>
            <div className='bg-white border border-gray-100 shadow-md rounded-lg mb-7 flex justify-between items-center py-3 px-4'>
              <p className='text-gray-500'>Only at This Platform</p>
              <input type="checkbox"  className='w-5 h-5'/>
            </div>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(prev => !prev)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Filter className="w-5 h-5" />
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Mobile Filter Drawer */}
            {showMobileFilters && (
              <div className="bg-white border border-gray-200 shadow-md rounded-lg mb-4 p-4 lg:hidden">
                {/* Paste your existing filter JSX here */}
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
                              {key === 'rating' ? (
                                <div className="flex items-center gap-2 flex-1">
                                  {renderStars(parseInt(item.label))}
                                  <span className="text-xs text-gray-500">({item.count})</span>
                                </div>
                              ) : (
                                <>
                                  <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{item.label}</span>
                                  <span className="text-xs text-gray-500">({item.count})</span>
                                </>
                              )}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop Filters */}
            <div className="sticky top-6 bg-white rounded-lg border border-gray-200 p-4 hidden lg:block">
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
                            {key === 'rating' ? (
                              <div className="flex items-center gap-2 flex-1">
                                {renderStars(parseInt(item.label))}
                                <span className="text-xs text-gray-500">({item.count})</span>
                              </div>
                            ) : (
                              <>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">{item.label}</span>
                                <span className="text-xs text-gray-500">({item.count})</span>
                              </>
                            )}
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
                    <Link to={`/product-details/${product.id}`} key={product.id} className="rounded-lg  relative">
                      {/* Favorite Button */}
                      <button className="absolute top-3 right-3 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
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
                          src="/bestsell.png" 
                          alt={product.name}
                          className="w-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div>
                        <h3 className="text-sm font-medium text-website-color-blue mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-md font-semibold text-website-color-blue">${product.price.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
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

export default SingleProduct;

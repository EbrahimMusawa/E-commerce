import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc, X, Search, Sliders, ChevronDown, Star } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/api';
import { toast } from 'react-hot-toast';

interface FilterState {
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
}

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    rating: null,
    inStock: false,
  });

  const category = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== searchQuery) {
        const newParams = new URLSearchParams(searchParams);
        if (searchValue) {
          newParams.set('search', searchValue);
        } else {
          newParams.delete('search');
        }
        setSearchParams(newParams);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, searchParams, searchQuery, setSearchParams]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      rating: null,
      inStock: false,
    });
    toast.success('Filters cleared');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? (
              <span className="capitalize">{category}</span>
            ) : (
              'All Products'
            )}
          </h1>
          <p className="text-gray-500">
            Showing {category ? 'products in ' + category : 'all products'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters and Sort Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                if (category === cat) {
                  newParams.delete('category');
                } else {
                  newParams.set('category', cat);
                }
                setSearchParams(newParams);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                category === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Sliders className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.rating || filters.inStock || filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-gray-500">Active filters:</span>
          {filters.rating && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {filters.rating}+ Stars
              <button
                onClick={() => handleFilterChange('rating', null)}
                className="ml-2 hover:text-indigo-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          {filters.inStock && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              In Stock
              <button
                onClick={() => handleFilterChange('inStock', false)}
                className="ml-2 hover:text-green-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button
                onClick={() => handleFilterChange('priceRange', [0, 1000])}
                className="ml-2 hover:text-blue-900"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          showFilters ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [
                    parseInt(e.target.value),
                    filters.priceRange[1],
                  ])
                }
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [
                    filters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">${filters.priceRange[0]}</span>
                <span className="text-sm text-gray-500">${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-200 ${
                    filters.rating === rating
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                    <span className="ml-2">& Up</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Availability</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">In Stock</span>
            </label>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={() => setShowFilters(false)}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Product Grid */}
      <ProductGrid
        category={category}
        searchQuery={searchQuery}
        sortBy={sortBy}
        filters={filters}
      />
    </div>
  );
};

export default ProductList;
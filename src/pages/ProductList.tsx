import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('');
  const category = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {category ? (
            <span className="capitalize">{category}</span>
          ) : (
            'All Products'
          )}
        </h1>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
            <SortAsc className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <ProductGrid
        category={category}
        searchQuery={searchQuery}
        sortBy={sortBy}
      />
    </div>
  );
};

export default ProductList;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/api';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

interface FilterState {
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
}

interface ProductGridProps {
  category: string;
  searchQuery: string;
  sortBy: string;
  filters: FilterState;
}

const ProductGrid = ({ category, searchQuery, sortBy, filters }: ProductGridProps) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts(category),
  });

  const filteredAndSortedProducts = React.useMemo(() => {
    let result = [...products];

    // Apply filters
    result = result.filter((product) => {
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      
      const matchesRating = filters.rating
        ? Math.floor(product.rating.rate) >= filters.rating
        : true;
      
      const matchesStock = filters.inStock ? product.stock > 0 : true;

      const matchesSearch = searchQuery
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesPrice && matchesRating && matchesStock && matchesSearch;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [products, sortBy, filters, searchQuery]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAndSortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
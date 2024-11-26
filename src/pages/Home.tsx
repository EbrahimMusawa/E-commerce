import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';

const Home = () => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80"
            alt="Shopping"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Welcome to ShopHub
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Discover amazing products at great prices. Shop with confidence and enjoy
            our fast delivery and excellent customer service.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md text-base font-medium hover:bg-indigo-50 transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      {categories && (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={`https://source.unsplash.com/featured/?${category}`}
                    alt={category}
                    className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
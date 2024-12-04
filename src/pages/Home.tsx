import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';
import { ArrowRight, TrendingUp, Truck, Shield, Clock } from 'lucide-react';

const Home = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Trending Products',
      description: 'Discover the latest and most popular items'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Shopping',
      description: '100% secure payment processing'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80"
            alt="Shopping"
            className="w-full h-full object-cover opacity-20 transform scale-105 hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className={`relative max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Welcome to <span className="text-indigo-400">ShopHub</span>
          </h1>
          <p className="mt-6 text-xl max-w-3xl leading-relaxed">
            Discover amazing products at great prices. Shop with confidence and enjoy
            our fast delivery and excellent customer service.
          </p>
          <div className="mt-10 space-x-4">
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-md text-base font-medium hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      {categories && (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/categories"
              className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={`https://source.unsplash.com/featured/?${category}`}
                    alt={category}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 capitalize group-hover:text-indigo-600 transition-colors duration-300">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <ProductGrid />
      </div>

      {/* Newsletter Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-indigo-200 mb-8">Subscribe to our newsletter for exclusive offers and updates</p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
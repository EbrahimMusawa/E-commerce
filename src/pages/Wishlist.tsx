import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingCart, Trash2, ArrowRight, Heart, Search, 
  Filter, SortAsc, SortDesc, Grid, List, Share2, AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { RootState } from '../store/store';
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
    toast.success('Added to cart successfully!');
  };

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist');
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      dispatch(clearWishlist());
      toast.success('Wishlist cleared successfully');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Wishlist',
        text: 'Check out my wishlist!',
        url: window.location.href,
      });
      toast.success('Wishlist shared successfully!');
    } catch (error) {
      toast.error('Unable to share wishlist');
    }
  };

  const filteredItems = items
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
            <Heart className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Save items you love for later by clicking the heart icon on any product.
            Start exploring our collection to find something you'll love!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Discover Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="mt-1 text-sm text-gray-500">{items.length} items saved</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </button>
          <button
            onClick={handleClearWishlist}
            className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors duration-200"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Clear All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-grow max-w-lg">
            <input
              type="text"
              placeholder="Search in wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-md ${
                  view === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-md ${
                  view === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'name' | 'date')}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="date">Date Added</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>

            <button
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`grid ${
        view === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'grid-cols-1 gap-6'
      }`}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white shadow-sm rounded-lg p-6 ${
              view === 'list' ? 'flex items-center' : ''
            } hover:shadow-md transition-shadow duration-200`}
          >
            <Link 
              to={`/products/${item.id}`} 
              className={`block ${view === 'list' ? 'flex-shrink-0' : ''}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`${
                  view === 'grid' 
                    ? 'w-full h-48' 
                    : 'w-32 h-32'
                } object-contain rounded-md`}
              />
            </Link>

            <div className={`${view === 'list' ? 'ml-6' : 'mt-4'} flex-grow`}>
              <Link
                to={`/products/${item.id}`}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200"
              >
                {item.title}
              </Link>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`${
                          index < Math.floor(item.rating.rate)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-600">
                    ({item.rating.count})
                  </span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-600 capitalize">{item.category}</span>
              </div>

              <p className="mt-2 text-gray-600 line-clamp-2">{item.description}</p>

              <div className={`mt-4 ${view === 'list' ? 'flex items-center justify-between' : ''}`}>
                <div className="text-2xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>

                <div className={`${view === 'list' ? '' : 'mt-4'} flex items-center space-x-4`}>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
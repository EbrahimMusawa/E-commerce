import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { RootState } from '../store/store';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love for later by clicking the heart icon on any product.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Discover Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-sm rounded-lg p-6 flex items-center"
          >
            <Link to={`/products/${item.id}`} className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-contain rounded-md"
              />
            </Link>

            <div className="ml-6 flex-grow">
              <Link
                to={`/products/${item.id}`}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600"
              >
                {item.title}
              </Link>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {item.rating.rate} ({item.rating.count} reviews)
                  </span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-600 capitalize">{item.category}</span>
              </div>

              <p className="mt-2 text-gray-600 line-clamp-2">{item.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
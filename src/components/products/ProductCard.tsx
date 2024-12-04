import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star, StarHalf } from 'lucide-react';
import { Product } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { RootState } from '../../store/store';

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-current text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-current text-yellow-500" />);
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/products/${product.id}`}>
        <div className="relative pb-[100%] bg-gray-50">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          )}
          <img
            src={product.image}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full">
              {product.category}
            </span>
          </div>
          {product.price < 50 && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                Sale
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200 line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.price < 50 && (
              <span className="text-sm text-gray-500 line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-1">
              {renderRatingStars(product.rating.rate)}
            </div>
            <span className="text-sm text-gray-600">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:bg-indigo-800 transform active:scale-95 transition-all duration-200"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>

          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transform active:scale-95 transition-all duration-200 ${
              isInWishlist
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <Heart 
              className="h-6 w-6" 
              fill={isInWishlist ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
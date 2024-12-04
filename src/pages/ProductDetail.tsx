import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star, ArrowLeft, Share2, Package, RefreshCw, Shield, Truck } from 'lucide-react';
import { getProduct } from '../services/api';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import ProductSkeleton from '../components/products/ProductSkeleton';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === Number(id));

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id)),
    enabled: !!id,
  });

  const features = [
    { icon: <Truck className="h-5 w-5" />, title: 'Free Shipping', description: 'On orders over $50' },
    { icon: <RefreshCw className="h-5 w-5" />, title: '30 Days Return', description: 'Money back guarantee' },
    { icon: <Shield className="h-5 w-5" />, title: 'Secure Payment', description: '100% secure checkout' },
    { icon: <Package className="h-5 w-5" />, title: 'Quality Product', description: 'Certified products' },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductSkeleton />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`, {
      duration: 2000,
      position: 'top-center',
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist', {
        duration: 2000,
        position: 'top-center',
      });
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      duration: 2000,
      position: 'top-center',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div 
            className="bg-white rounded-xl shadow-sm overflow-hidden cursor-zoom-in relative"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <div className={`relative pb-[100%] transition-transform duration-500 ${isZoomed ? 'scale-110' : 'scale-100'}`}>
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain p-8"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
                {product.category}
              </span>
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.floor(product.rating.rate)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              {product.price > 50 && (
                <p className="text-sm text-green-600">
                  Free shipping eligible
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-lg border ${
                isInWishlist
                  ? 'text-red-500 border-red-200 hover:bg-red-50'
                  : 'text-gray-400 border-gray-200 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              <Heart
                className="h-6 w-6"
                fill={isInWishlist ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-shrink-0 text-indigo-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
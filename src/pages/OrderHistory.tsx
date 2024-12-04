import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Truck, CheckCircle, ArrowRight, Search, Filter, Calendar } from 'lucide-react';
import { Order } from '../types';

const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    products: [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 },
        quantity: 1
      }
    ],
    total: 109.95,
    status: 'delivered',
    createdAt: '2024-02-15T10:00:00Z'
  }
];

const statusIcons = {
  pending: ShoppingBag,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending: 'text-yellow-600 bg-yellow-100 border-yellow-200',
  processing: 'text-blue-600 bg-blue-100 border-blue-200',
  shipped: 'text-purple-600 bg-purple-100 border-purple-200',
  delivered: 'text-green-600 bg-green-100 border-green-200',
};

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredOrders = mockOrders
    .filter(order => 
      (statusFilter === 'all' || order.status === statusFilter) &&
      (searchQuery === '' || 
        order.products.some(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  if (mockOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">No orders yet</h2>
          <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-colors duration-200"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-colors duration-200"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const statusColor = statusColors[order.status];

          return (
            <div 
              key={order.id} 
              className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              {/* Order Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order.id}
                    </p>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full border ${statusColor}`}>
                    <StatusIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/products/${product.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200 line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {product.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="text-sm text-gray-500">
                    Total Items: {order.products.reduce((acc, p) => acc + p.quantity, 0)}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Total: ${order.total.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
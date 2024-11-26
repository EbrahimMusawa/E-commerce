import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Truck, CheckCircle, ArrowRight } from 'lucide-react';
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
  pending: 'text-yellow-600 bg-yellow-100',
  processing: 'text-blue-600 bg-blue-100',
  shipped: 'text-purple-600 bg-purple-100',
  delivered: 'text-green-600 bg-green-100',
};

const OrderHistory = () => {
  if (mockOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-3xl font-bold text-gray-900">No orders yet</h2>
          <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

      <div className="space-y-8">
        {mockOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const statusColor = statusColors[order.status];

          return (
            <div key={order.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order placed{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order.id}
                    </p>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full ${statusColor}`}>
                    <StatusIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center py-4 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-20 w-20 object-contain rounded-md"
                    />
                    <div className="ml-6 flex-1">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {product.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Total ({order.products.reduce((acc, p) => acc + p.quantity, 0)}{' '}
                    items)
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </div>
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
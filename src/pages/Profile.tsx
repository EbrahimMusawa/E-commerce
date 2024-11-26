import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, ShoppingBag, Heart, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Successfully logged out');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  const stats = [
    {
      label: 'Cart Items',
      value: cartItems.length,
      icon: ShoppingBag,
      onClick: () => navigate('/cart'),
    },
    {
      label: 'Wishlist',
      value: wishlistItems.length,
      icon: Heart,
      onClick: () => navigate('/wishlist'),
    },
    {
      label: 'Orders',
      value: 0,
      icon: ShoppingBag,
      onClick: () => navigate('/orders'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold leading-6 text-gray-900">Profile</h3>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>

        {/* User Info */}
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-indigo-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 rounded-full bg-white shadow-sm border border-gray-300">
                    <Settings className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {user.name.firstname} {user.name.lastname}
                </h3>
                <div className="mt-1 flex items-center text-gray-500">
                  <Mail className="h-5 w-5 mr-2" />
                  {user.email}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map((stat) => (
                <button
                  key={stat.label}
                  onClick={stat.onClick}
                  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.label}
                        </dt>
                        <dd className="text-lg font-bold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Account Settings */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Account Settings
              </h4>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="ml-3 text-sm text-gray-900">
                        Email Notifications
                      </span>
                    </div>
                    <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600">
                      <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-gray-400" />
                      <span className="ml-3 text-sm text-gray-900">
                        Order Updates
                      </span>
                    </div>
                    <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600">
                      <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
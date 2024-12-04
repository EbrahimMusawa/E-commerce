import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, LogOut, ShoppingBag, Heart, Settings, 
  Bell, Shield, CreditCard, MapPin, Phone, Camera,
  ChevronRight, Edit2, Lock, Calendar
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

interface TabProps {
  label: string;
  content: React.ReactNode;
  icon: React.ElementType;
}

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    orders: true,
    promotions: false,
    security: true
  });

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Successfully logged out');
    navigate('/login');
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast.success(`${key} notifications ${newState[key] ? 'enabled' : 'disabled'}`);
      return newState;
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    toast.success('Profile editing enabled');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile changes saved successfully');
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
      color: 'bg-blue-50 text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Wishlist',
      value: wishlistItems.length,
      icon: Heart,
      onClick: () => navigate('/wishlist'),
      color: 'bg-pink-50 text-pink-700',
      iconColor: 'text-pink-600'
    },
    {
      label: 'Orders',
      value: 0,
      icon: ShoppingBag,
      onClick: () => navigate('/orders'),
      color: 'bg-purple-50 text-purple-700',
      iconColor: 'text-purple-600'
    },
  ];

  const tabs: TabProps[] = [
    {
      label: 'Profile',
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <button
                onClick={isEditing ? handleSaveProfile : handleEditProfile}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
                <Edit2 className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.name.firstname}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.name.lastname}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  defaultValue={user.email}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  defaultValue="+1 (555) 000-0000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-6">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue="123 Main St"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue="San Francisco"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue="CA"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue="94105"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Settings',
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { key: 'email', icon: Mail, label: 'Email Notifications' },
                { key: 'orders', icon: ShoppingBag, label: 'Order Updates' },
                { key: 'promotions', icon: Bell, label: 'Promotional Alerts' },
                { key: 'security', icon: Shield, label: 'Security Alerts' },
              ].map(({ key, icon: Icon, label }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-900">{label}</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      notifications[key as keyof typeof notifications] ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`${
                        notifications[key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                      } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-6">Account Security</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">Change Password</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">Two-Factor Authentication</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <Camera className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.name.firstname} {user.name.lastname}
            </h2>
            <div className="mt-1 flex items-center text-gray-500">
              <Mail className="h-5 w-5 mr-2" />
              {user.email}
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                <Calendar className="h-4 w-4 mr-1" />
                Member since 2024
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Shield className="h-4 w-4 mr-1" />
                Verified Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className={`p-6 rounded-lg overflow-hidden ${stat.color} hover:opacity-90 transition-all duration-200 transform hover:-translate-y-1`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate">{stat.label}</dt>
                  <dd className="text-2xl font-bold">{stat.value}</dd>
                </dl>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label.toLowerCase())}
                className={`
                  py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.label.toLowerCase()
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {tabs.find(tab => tab.label.toLowerCase() === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default Profile;
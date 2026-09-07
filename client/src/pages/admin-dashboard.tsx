import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { bookings, services, staff } from '../data/dummyData';

interface AdminDashboardProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'bookings', name: 'Bookings', icon: '📅' },
    { id: 'staff', name: 'Staff', icon: '👥' },
    { id: 'services', name: 'Services', icon: '💅' },
    { id: 'inventory', name: 'Inventory', icon: '📦' }
  ];

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'completed':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getBookingStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const todayBookings = bookings.filter(booking => 
    booking.date === selectedDate
  );

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const completedBookings = bookings.filter(booking => booking.status === 'completed').length;
  const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;

  return (
    <div className="min-h-screen">
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-green-400 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage salon operations and staff
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Booking
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
                    : 'text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Dashboard Overview
              </h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
                        Total Bookings
                      </p>
                      <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                        {bookings.length}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        ${totalRevenue}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {completedBookings}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        Pending
                      </p>
                      <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                        {pendingBookings}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Today's Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Today's Bookings ({new Date(selectedDate).toLocaleDateString()})
                </h3>
                <div className="space-y-4">
                  {todayBookings.length > 0 ? (
                    todayBookings.map((booking) => {
                      const service = services.find(s => s.id === booking.serviceId);
                      const technician = staff.find(s => s.id === booking.staffId);
                      
                      return (
                        <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {service?.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {technician?.name} • {booking.time}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getBookingStatusColor(booking.status)}`}>
                                {getBookingStatusIcon(booking.status)}
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                ${booking.totalPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No bookings for today
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                All Bookings
              </h2>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option>All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => {
                  const service = services.find(s => s.id === booking.serviceId);
                  const technician = staff.find(s => s.id === booking.staffId);
                  
                  return (
                    <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {service?.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getBookingStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                              <p><strong>Client:</strong> User {booking.userId}</p>
                              <p><strong>Technician:</strong> {technician?.name}</p>
                            </div>
                            <div>
                              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                              <p><strong>Time:</strong> {booking.time}</p>
                            </div>
                            <div>
                              <p><strong>Duration:</strong> {service?.duration} min</p>
                              <p><strong>Total:</strong> ${booking.totalPrice}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Staff Management
              </h2>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search staff..."
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option>All Roles</option>
                    <option>Nail Tech</option>
                    <option>Lash Tech</option>
                    <option>Esthetician</option>
                  </select>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                  <div key={member.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.role.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {member.rating} rating
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {member.experience} experience
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Services Management
              </h2>
              
              <div className="flex justify-between items-center mb-6">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.name}
                      </h3>
                      <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        ${service.price}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{service.duration} min</span>
                      </div>
                      {service.popular && (
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400 rounded-full text-sm font-medium">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Inventory Management
              </h2>
              
              <div className="flex justify-between items-center mb-6">
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample inventory items */}
                {[
                  { name: 'Nail Polish - Pink', category: 'Polish', quantity: 15, lowStock: false },
                  { name: 'Lash Glue', category: 'Lashes', quantity: 8, lowStock: true },
                  { name: 'Nail Files', category: 'Tools', quantity: 25, lowStock: false },
                  { name: 'Gel Polish - Red', category: 'Polish', quantity: 12, lowStock: false },
                  { name: 'Lash Extensions', category: 'Lashes', quantity: 3, lowStock: true },
                  { name: 'Nail Art Brushes', category: 'Tools', quantity: 18, lowStock: false }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      {item.lowStock && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Category:</strong> {item.category}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 text-green-600 border border-green-600 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Restock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard; 
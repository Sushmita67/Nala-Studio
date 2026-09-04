import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Calendar,
  // Star,
  Clock,
  // MapPin,
  // Phone,
  // Mail,
  Edit,
  Heart,
  Gift,
  CreditCard,
  // Settings,
  // LogOut,
  Plus,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  ChevronRight,
  // Eye,
  Download,
  BarChart3,
  // Crown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { bookings, services, staff, membershipPlans } from '../data/dummyData';

interface DashboardProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ showToast }) => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to access your dashboard
          </h2>
          {/*<Link*/}
          {/*  to="/login"*/}
          {/*  className="inline-flex items-center px-6 py-3 bg-nala-primary text-white rounded-lg hover:bg-nala-primary/90 transition-colors"*/}
          {/*>*/}
          {/*  Sign In*/}
          {/*</Link>*/}
        </div>
      </div>
    );
  }

  const userBookings = bookings.filter(booking => booking.userId === currentUser.id);
  const userMembership = membershipPlans.find(plan => plan.id === currentUser.membership);

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
        return <ClockIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'bookings', name: 'My Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'profile', name: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'loyalty', name: 'Loyalty & Rewards', icon: <Gift className="w-4 h-4" /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-nala-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                    Welcome back, {currentUser.name.split(' ')[0]}!
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 truncate">
                    {userMembership?.name} Member • {currentUser.loyaltyPoints} points
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-nala-primary text-white rounded-lg hover:bg-nala-primary/90 transition-colors shadow-sm text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Book Appointment</span>
                  <span className="sm:hidden">Book</span>
                </Link>
                {/* <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button> */}
              </div>
            </div>
          </div>

          {/* Navigation Tabs - Meraki UI Style */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center h-12 px-3 py-2 -mb-px text-center sm:px-4 lg:px-6 whitespace-nowrap focus:outline-none transition-colors duration-200 flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'text-nala-primary bg-transparent border-b-2 border-nala-primary dark:border-nala-primary'
                      : 'text-gray-700 bg-transparent border-b-2 border-transparent dark:text-white whitespace-nowrap cursor-pointer hover:border-gray-400'
                  }`}
                  title={tab.name}
                >
                  <span className="mr-1 sm:mr-2">{tab.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Dashboard Overview
                </h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Total Bookings
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {userBookings.length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-nala-primary/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-nala-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Loyalty Points
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentUser.loyaltyPoints}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-nala-secondary/20 rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-nala-secondary" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Membership
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {userMembership?.name}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-nala-accent/20 rounded-lg flex items-center justify-center">
                        <Gift className="w-6 h-6 text-nala-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Favorite Techs
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentUser.favoriteTechs.length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-nala-light/20 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-nala-light" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Bookings
                    </h3>
                    <Link
                      to="#"
                      className="text-sm text-nala-primary hover:text-nala-primary/80 dark:text-nala-primary dark:hover:text-nala-primary/80"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {userBookings.slice(0, 3).map((booking) => {
                      const service = services.find(s => s.id === booking.serviceId);
                      const technician = staff.find(s => s.id === booking.staffId);

                      return (
                        <div key={booking.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-nala-primary/20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-nala-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {service?.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {technician?.name} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Rs. {booking.totalPrice}
                              </span>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    My Bookings
                  </h2>
                  <Link
                    to="/booking"
                    className="inline-flex items-center px-4 py-2 bg-nala-primary text-white rounded-lg hover:bg-nala-primary/90 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Booking
                  </Link>
                </div>
                <div className="space-y-4">
                  {userBookings.map((booking) => {
                    const service = services.find(s => s.id === booking.serviceId);
                    const technician = staff.find(s => s.id === booking.staffId);

                    return (
                      <div key={booking.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-12 h-12 bg-nala-primary/20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-nala-primary" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {service?.name}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4 text-gray-400" />
                                  <span><strong>Technician:</strong> {technician?.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span><strong>Time:</strong> {booking.time}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span><strong>Duration:</strong> {service?.duration} min</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CreditCard className="w-4 h-4 text-gray-400" />
                                  <span><strong>Total:</strong> Rs. {booking.totalPrice}</span>
                                </div>
                                {booking.notes && (
                                  <div className="flex items-start space-x-2">
                                    <Edit className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <span><strong>Notes:</strong> {booking.notes}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {booking.addons.length > 0 && (
                              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Add-ons:
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {booking.addons.map(addonId => {
                                    const addon = service?.addons.find(a => a.id === addonId);
                                    return addon?.name;
                                  }).join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            {booking.status === 'confirmed' && (
                              <button className="px-4 py-2 text-sm bg-nala-secondary/20 text-nala-secondary rounded-lg hover:bg-nala-secondary/30 transition-colors">
                                Reschedule
                              </button>
                            )}
                            {booking.status === 'confirmed' && (
                              <button className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Profile Information
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={currentUser.name}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={currentUser.email}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={currentUser.phone}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Membership
                      </label>
                      <input
                        type="text"
                        value={userMembership?.name}
                        disabled
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-nala-primary text-white rounded-lg hover:bg-nala-primary/90 transition-colors shadow-sm">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Loyalty & Rewards
                </h2>
                <div className="space-y-6">
                  {/* Current Points */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-nala-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-nala-secondary" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {currentUser.loyaltyPoints} Points
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Keep earning points with every visit!
                      </p>
                    </div>
                  </div>

                  {/* Membership Benefits */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {userMembership?.name} Membership Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userMembership?.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                          <div className="w-8 h-8 bg-nala-accent/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-nala-accent" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Rewards */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Available Rewards
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 bg-nala-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Gift className="w-6 h-6 text-nala-primary" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Free Manicure</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">500 points</p>
                        <button className="w-full px-4 py-2 bg-nala-primary text-white rounded-lg hover:bg-nala-primary/90 transition-colors text-sm shadow-sm">
                          Redeem
                        </button>
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 bg-nala-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Gift className="w-6 h-6 text-nala-secondary" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">20% Off</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">300 points</p>
                        <button className="w-full px-4 py-2 bg-nala-secondary text-white rounded-lg hover:bg-nala-secondary/90 transition-colors text-sm shadow-sm">
                          Redeem
                        </button>
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                        <div className="w-12 h-12 bg-nala-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Gift className="w-6 h-6 text-nala-accent" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Free Add-on</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">200 points</p>
                        <button className="w-full px-4 py-2 bg-nala-accent text-white rounded-lg hover:bg-nala-accent/90 transition-colors text-sm shadow-sm">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Payment History
                  </h2>
                  <button className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
                <div className="space-y-4">
                  {userBookings.map((booking) => {
                    const service = services.find(s => s.id === booking.serviceId);

                    return (
                      <div key={booking.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-nala-accent/20 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-nala-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {service?.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(booking.date).toLocaleDateString()} • {booking.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Rs. {booking.totalPrice}
                            </p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
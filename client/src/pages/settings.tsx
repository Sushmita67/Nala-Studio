import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  BellOff, 
  Shield, 
  Eye, 
  EyeOff,
  Save,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface SettingsProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const Settings: React.FC<SettingsProps> = ({ showToast }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveSettings = () => {
    showToast('Settings saved successfully!', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (formData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    showToast('Password updated successfully!', 'success');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen">
      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-green-400 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account preferences and notifications
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Settings Menu
              </h2>
              <nav className="space-y-2">
                <a href="#appearance" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors">
                  Appearance
                </a>
                <a href="#notifications" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors">
                  Notifications
                </a>
                <a href="#security" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors">
                  Security
                </a>
                <a href="#privacy" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors">
                  Privacy
                </a>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appearance Settings */}
            <div id="appearance" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Appearance
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Dark Mode
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    style={{
                      backgroundColor: isDarkMode ? '#ec4899' : '#d1d5db'
                    }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                    {isDarkMode ? (
                      <Moon className="absolute right-1 w-3 h-3 text-white" />
                    ) : (
                      <Sun className="absolute left-1 w-3 h-3 text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Auto Theme
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Follow system theme preference
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div id="notifications" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Notifications
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {notifications ? (
                      <Bell className="w-5 h-5 text-pink-600" />
                    ) : (
                      <BellOff className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications about appointments and offers
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-pink-600" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive booking confirmations and updates via email
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-pink-600" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        SMS Notifications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive appointment reminders via SMS
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div id="security" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Security
              </h2>
              
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter current password"
                    />
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>

            {/* Privacy Settings */}
            <div id="privacy" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Privacy
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Profile Visibility
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Allow other users to see your profile
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Data Collection
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Allow us to collect usage data for improvements
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Marketing Communications
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive promotional emails and offers
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Settings; 
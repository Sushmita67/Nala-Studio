import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor, Palette, Sparkles } from 'lucide-react';

const ThemeDemo: React.FC = () => {
  const { isDarkMode, themeMode } = useTheme();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Toggle Demo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Experience the beautiful transition between light and dark themes
          </p>
        </div>

        {/* Current Theme Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Current Theme
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mode: <span className="font-medium text-nala-primary">{themeMode}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Active: <span className="font-medium text-nala-primary">{isDarkMode ? 'Dark' : 'Light'}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {themeMode === 'light' && <Sun className="w-8 h-8 text-amber-500" />}
              {themeMode === 'dark' && <Moon className="w-8 h-8 text-blue-400" />}
              {themeMode === 'system' && <Monitor className="w-8 h-8 text-purple-400" />}
            </div>
          </div>
        </div>

        {/* UI Elements Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cards Demo */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Cards & Components
            </h3>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-nala-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Premium Service</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Luxury nail art</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Experience our premium nail art services with the finest materials and expert craftsmanship.
              </p>
            </div>

            <div className="bg-gradient-to-r from-nala-primary to-nala-accent rounded-lg p-6 text-white">
              <h4 className="font-semibold mb-2">Gradient Card</h4>
              <p className="text-sm opacity-90">
                This card uses our brand colors and looks great in both themes.
              </p>
            </div>
          </div>

          {/* Form Elements Demo */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Form Elements
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-nala-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-nala-primary focus:border-transparent"
                  placeholder="Type your message here..."
                />
              </div>

              <button className="w-full bg-nala-primary hover:bg-nala-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Submit Form
              </button>
            </div>
          </div>
        </div>

        {/* Color Palette Demo */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Brand Color Palette
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-nala-primary rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Primary</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">#F8BBD9</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-nala-secondary rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Secondary</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">#f7f7e8</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-nala-accent rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Accent</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">#fd8a8a</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-nala-cream rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Cream</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">#fff9e9</p>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Accessibility Features
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Keyboard navigation support (Tab, Enter, Space, Escape)
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Screen reader announcements for theme changes
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              High contrast ratios for better visibility
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Smooth transitions for reduced motion preferences
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo; 
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, setThemeMode } = useTheme();

  const handleToggle = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-nala-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-blue-400" />
      )}
      
      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeToggle; 
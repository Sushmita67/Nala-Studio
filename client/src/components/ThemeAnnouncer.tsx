import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeAnnouncer: React.FC = () => {
  const { isDarkMode, themeMode } = useTheme();

  useEffect(() => {
    // Announce theme change to screen readers
    const announcement = `Switched to ${isDarkMode ? 'dark' : 'light'} mode`;
    
    // Create a temporary element to announce the change
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    
    document.body.appendChild(announcer);
    
    // Remove the announcer after a short delay
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, [isDarkMode, themeMode]);

  return null; // This component doesn't render anything visible
};

export default ThemeAnnouncer; 
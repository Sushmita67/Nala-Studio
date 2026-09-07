import React from 'react';
import nalaLogoLight from '../assets/web-logo-l.svg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'navbar';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-9',
    lg: 'h-14',
    xl: 'h-20',
    navbar: 'h-9 lg:h-10',
  };

  return (
    <img
      src={nalaLogoLight}
      alt="NALA Studio"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );
};

export default Logo;

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <div className={`flex items-center py-4 overflow-x-auto whitespace-nowrap ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <a 
              href={item.href || '#'} 
              className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              {item.icon || <Home className="w-5 h-5" />}
            </a>
          ) : (
            <a 
              href={item.href || '#'} 
              className={`hover:underline transition-colors ${
                index === items.length - 1 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-200'
              }`}
            >
              {item.label}
            </a>
          )}
          
          {index < items.length - 1 && (
            <ChevronRight className="mx-2 text-gray-500 dark:text-gray-300 w-4 h-4 flex-shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;


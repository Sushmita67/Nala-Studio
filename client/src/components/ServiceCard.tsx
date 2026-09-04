import React, { useState } from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { Service, Addon } from '../data/dummyData';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  onAddonToggle: (serviceId: string, addonId: string) => void;
  selectedAddons: string[];
  quantity: number;
  onQuantityChange: (serviceId: string, quantity: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onToggle,
  onAddonToggle,
  selectedAddons,
  quantity,
  onQuantityChange
}) => {
  const [showAddons, setShowAddons] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      {/* Service Image */}
      <div 
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
        style={{ 
          backgroundImage: `url(${service.image || 'https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80'})`
        }}
        onClick={() => onToggle(service.id)}
      />

      {/* Service Details Card */}
      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          {service.name}
        </h3>

        {/* Service Info */}
        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {service.description}
          </p>
          <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>⭐ {service.duration} min</span>
            <span>💅 {service.category}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            ${service.price}
          </span>
          <button 
            className={`px-2 py-1 text-xs font-semibold uppercase transition-colors duration-300 transform rounded ${
              isSelected 
                ? 'bg-nala-primary text-white hover:bg-nala-primary/80' 
                : 'bg-gray-800 text-white hover:bg-gray-700 dark:hover:bg-gray-600'
            } focus:outline-none`}
            onClick={() => onToggle(service.id)}
          >
            {isSelected ? 'Selected' : 'Add to cart'}
          </button>
        </div>

        {/* Quantity Selector (if selected) */}
        {isSelected && (
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onQuantityChange(service.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-500 flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => onQuantityChange(service.id, quantity + 1)}
                  className="w-6 h-6 rounded-full bg-nala-primary text-white flex items-center justify-center hover:bg-nala-primary/80"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add-ons Section */}
        {isSelected && service.addons.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowAddons(!showAddons)}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Add-ons ({service.addons.length})
              <span className={`ml-2 transform transition-transform ${showAddons ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {showAddons && (
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 space-y-2">
                {service.addons.map((addon) => (
                  <label key={addon.id} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => onAddonToggle(service.id, addon.id)}
                      className="w-3 h-3 text-nala-primary border-gray-300 rounded focus:ring-nala-primary"
                    />
                    <div className="ml-2 flex-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {addon.name}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {addon.description}
                        </span>
                        <span className="text-xs font-medium text-nala-primary">
                          +${addon.price}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;


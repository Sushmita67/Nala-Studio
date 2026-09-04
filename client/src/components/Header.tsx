import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  // User,
  // Calendar,
  // Settings,
  // LogOut,
  // ShoppingBag,
  Heart
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Book Now', href: '/booking' },
    { name: 'Services', href: '/blog' },
    { name: 'Gallery', href: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="relative">
      <div className="container px-6 py-6 mx-auto lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center -mx-1">
            <div className="w-8 h-8 mx-1 sm:h-10 sm:w-10 bg-gradient-to-br from-nala-primary to-nala-accent rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="mx-1 text-gray-700">
              <h3 className="uppercase tracking-[0.15em] font-medium">Nala Studio</h3>
              <p className="text-xs italic">Beauty & Wellness</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="text-gray-600 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div 
          className={`${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 -translate-x-full'
          } absolute lg:static transition-all duration-300 w-full py-12 lg:py-0 left-1/2 lg:opacity-100 lg:translate-x-0 lg:bg-transparent lg:w-auto -translate-x-1/2 top-20 sm:top-24 bg-nala-primary`}
        >
          <nav className="flex flex-col items-center space-y-8 lg:flex-row lg:space-y-0 lg:-mx-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium text-white lg:text-nala-primary lg:hover:text-gray-400 lg:mx-4 ${
                  isActive(item.href) ? 'lg:text-nala-accent' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/*/!* Theme toggle *!/*/}
            {/*<button*/}
            {/*  onClick={toggleTheme}*/}
            {/*  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:mx-4"*/}
            {/*>*/}
            {/*  {isDarkMode ? (*/}
            {/*    <Sun className="w-5 h-5 text-yellow-300" />*/}
            {/*  ) : (*/}
            {/*    <Moon className="w-5 h-5 text-white" />*/}
            {/*  )}*/}
            {/*</button>*/}

            {/*/!* User menu *!/*/}
            {/*{currentUser ? (*/}
            {/*  <div className="relative lg:mx-4">*/}
            {/*    <button className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">*/}
            {/*      <User className="w-5 h-5 text-white" />*/}
            {/*      <span className="text-sm font-medium text-white">*/}
            {/*        {currentUser.name.split(' ')[0]}*/}
            {/*      </span>*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*) :*/}
            {/*//       (    */}
            {/*//   <Link*/}
            {/*//     to="/login"*/}
            {/*//     className="px-8 py-2.5 text-white lg:text-nala-primary lg:hover:bg-nala-primary lg:hover:text-white duration-300 transition-colors font-medium lg:mx-4 border-2 lg:border-nala-primary border-white"*/}
            {/*//   >*/}
            {/*//     Login*/}
            {/*//   </Link>*/}
            {/*// )*/}
            {/*} */}
          </nav>
        </div>
      </div>
      x
    </header>
  );
};

export default Header; 
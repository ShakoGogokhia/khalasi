import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Menu, 
  X, 
  User, 
  LogIn 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            KHALASI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/category/clothing" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Clothing
            </Link>
            <Link to="/category/belts" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Belts
            </Link>
            <Link to="/category/accessories" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Accessories
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
            </button>
            
            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-gray-900 transition-colors">
              <Heart size={20} />
            </Link>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Account */}
            <Link to="/account" className="text-gray-700 hover:text-gray-900 transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 hover:text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar - Appears when search is clicked */}
        {searchOpen && (
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium text-gray-700 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/category/clothing" 
                className="font-medium text-gray-700 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                to="/category/belts" 
                className="font-medium text-gray-700 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Belts
              </Link>
              <Link 
                to="/category/accessories" 
                className="font-medium text-gray-700 hover:text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Accessories
              </Link>
              
              <div className="flex space-x-6 py-4">
                <Link 
                  to="/wishlist" 
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart size={20} />
                </Link>
                <Link 
                  to="/cart" 
                  className="text-gray-700 hover:text-gray-900 relative"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/account" 
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
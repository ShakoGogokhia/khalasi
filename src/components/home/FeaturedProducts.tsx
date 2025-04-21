import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { getFeaturedProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link 
            to="/all-products" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All 
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="group bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link to={`/product/${product.id}`} className="block relative">
                <div className="relative overflow-hidden pb-[125%]">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Quick action buttons */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleAddToCart(e, product.id)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <ShoppingBag size={18} />
                  </button>
                  <button
                    onClick={(e) => handleWishlistToggle(e, product.id)}
                    className={`p-2 rounded-full shadow-md transition-colors ${
                      isInWishlist(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
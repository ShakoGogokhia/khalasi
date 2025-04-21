import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { Heart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();
  
  // Get product details for wishlist items
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">My Wishlist</h1>
      
      {wishlistProducts.length > 0 ? (
        <>
          <p className="text-gray-600 mb-8">
            You have {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} in your wishlist.
          </p>
          
          <ProductGrid products={wishlistProducts} />
        </>
      ) : (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Heart size={64} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items to keep track of what you love.</p>
          <Link 
            to="/all-products"
            className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
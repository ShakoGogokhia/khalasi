import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  Truck, 
  RefreshCw,
  Star,
  Minus,
  Plus
} from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const product = id ? getProductById(id) : null;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/all-products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-8 text-sm">
        <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <a href={`/category/${product.category}`} className="text-gray-500 hover:text-gray-700 capitalize">
          {product.category}
        </a>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-md overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Price & Rating */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Size Guide</a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-y border-gray-300 py-2 focus:outline-none"
              />
              <button
                onClick={increaseQuantity}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Add to Cart & Wishlist Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              <ShoppingBag size={18} className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-md border font-medium flex items-center justify-center transition-colors ${
                isInWishlist(product.id)
                  ? 'bg-red-50 text-red-600 border-red-600 hover:bg-red-100'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
            </button>
          </div>
          
          {/* Shipping & Returns Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start">
              <Truck size={20} className="text-gray-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-600">Free standard shipping on orders over $50</p>
              </div>
            </div>
            <div className="flex items-start">
              <RefreshCw size={20} className="text-gray-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                <p className="text-sm text-gray-600">Return or exchange within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, cartTotal } = useCart();
  
  // Calculate summary values
  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.07; // 7% tax
  const total = cartTotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Cart Items ({cart.length})</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <CartItem key={`${item.product.id}-${item.size}-${item.color}`} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <CartSummary 
              subtotal={cartTotal} 
              shipping={shipping} 
              tax={tax} 
              total={total} 
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/all-products"
            className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
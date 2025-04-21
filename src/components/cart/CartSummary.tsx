import React from 'react';
import { Link } from 'react-router-dom';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-base text-gray-600">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base text-gray-600">
          <p>Shipping</p>
          <p>${shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base text-gray-600">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-lg font-medium text-gray-900 pt-3 border-t border-gray-200">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      
      <Link 
        to="/checkout"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-blue-700 transition-colors block"
      >
        Proceed to Checkout
      </Link>
      
      <div className="mt-4">
        <Link 
          to="/all-products"
          className="w-full text-blue-600 py-2 px-4 rounded-md font-medium text-center hover:text-blue-800 transition-colors block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
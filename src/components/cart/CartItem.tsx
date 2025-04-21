import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size, color } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 last:border-0">
      <div className="sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex-1 sm:ml-6 flex flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              {color && <span className="mr-2">Color: {color}</span>}
              {size && <span>Size: {size}</span>}
            </p>
          </div>
          <p className="text-base font-medium text-gray-900">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecreaseQuantity}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 text-gray-900">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-sm text-red-600 hover:text-red-800 flex items-center transition-colors"
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
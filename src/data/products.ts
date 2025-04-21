import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Oxford Shirt',
    price: 49.99,
    category: 'clothing',
    description: 'A timeless Oxford shirt crafted from premium cotton for comfort and durability. Perfect for casual and semi-formal occasions.',
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Black'],
    featured: true,
    inStock: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Premium Leather Belt',
    price: 39.99,
    category: 'belts',
    description: 'Handcrafted premium leather belt with a classic buckle. Versatile and durable for everyday wear.',
    images: [
      'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['Brown', 'Black'],
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Slim Fit Jeans',
    price: 59.99,
    category: 'clothing',
    description: 'Modern slim fit jeans with stretch comfort. Perfect for casual outings and everyday wear.',
    images: [
      'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    featured: false,
    inStock: true,
    rating: 4.3
  },
  {
    id: '4',
    name: 'Leather Wallet',
    price: 29.99,
    category: 'accessories',
    description: 'Compact leather wallet with multiple card slots and a bill compartment. Sleek and functional design.',
    images: [
      'https://images.pexels.com/photos/2079628/pexels-photo-2079628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2079628/pexels-photo-2079628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['Brown', 'Black'],
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Casual T-Shirt',
    price: 24.99,
    category: 'clothing',
    description: 'Soft cotton t-shirt with a comfortable fit. Essential for your casual wardrobe.',
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    featured: true,
    inStock: true,
    rating: 4.2
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    price: 129.99,
    category: 'accessories',
    description: 'Premium sunglasses with UV protection and a stylish frame. Perfect for sunny days and fashion-forward looks.',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['Black', 'Tortoise'],
    featured: false,
    inStock: true,
    rating: 4.9
  },
  {
    id: '7',
    name: 'Formal Dress Shirt',
    price: 69.99,
    category: 'clothing',
    description: 'Elegant dress shirt made from high-quality cotton. Perfect for formal occasions and business meetings.',
    images: [
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink'],
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: '8',
    name: 'Woven Belt',
    price: 34.99,
    category: 'belts',
    description: 'Flexible woven belt with leather trim. Comfortable and stylish for casual outfits.',
    images: [
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['Brown/Navy', 'Black/Gray'],
    featured: false,
    inStock: true,
    rating: 4.4
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Helper function to get a product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Helper function to search products
export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};
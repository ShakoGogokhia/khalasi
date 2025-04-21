// Type definitions for the application

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  inStock: boolean;
  rating: number;
}

export type Category = 'clothing' | 'belts' | 'accessories';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
}
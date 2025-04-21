import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { getProductsByCategory, products as allProducts } from '../data/products';
import { Product } from '../types';

const categories = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'belts', label: 'Belts' },
  { value: 'accessories', label: 'Accessories' },
];

const priceRanges = [
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: 'From $25 to $50' },
  { value: '50-100', label: 'From $50 to $100' },
  { value: '100+', label: 'Over $100' },
];

const sizes = [
  { value: 'S', label: 'Small' },
  { value: 'M', label: 'Medium' },
  { value: 'L', label: 'Large' },
  { value: 'XL', label: 'X-Large' },
];

const colors = [
  { value: 'Black', label: 'Black' },
  { value: 'White', label: 'White' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Gray', label: 'Gray' },
];

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: [],
    price: [],
    size: [],
    color: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  // Initial load of products based on category from URL
  useEffect(() => {
    let initialProducts;
    
    if (category) {
      initialProducts = getProductsByCategory(category);
      setActiveFilters(prev => ({
        ...prev,
        category: [category]
      }));
    } else {
      initialProducts = [...allProducts];
    }
    
    setDisplayProducts(initialProducts);
  }, [category]);

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (activeFilters.category.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        activeFilters.category.includes(product.category)
      );
    }
    
    // Apply price filter
    if (activeFilters.price.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return activeFilters.price.some(range => {
          if (range === '0-25') return product.price < 25;
          if (range === '25-50') return product.price >= 25 && product.price < 50;
          if (range === '50-100') return product.price >= 50 && product.price < 100;
          if (range === '100+') return product.price >= 100;
          return false;
        });
      });
    }
    
    // Apply size filter
    if (activeFilters.size.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.sizes && product.sizes.some(size => activeFilters.size.includes(size))
      );
    }
    
    // Apply color filter
    if (activeFilters.color.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors && product.colors.some(color => activeFilters.color.includes(color))
      );
    }
    
    // Apply sorting
    if (sortOption === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    
    setDisplayProducts(filteredProducts);
  }, [activeFilters, sortOption]);

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (isChecked) {
        updatedFilters[filterType] = [...(prev[filterType] || []), value];
      } else {
        updatedFilters[filterType] = (prev[filterType] || []).filter(item => item !== value);
      }
      
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      category: category ? [category] : [],
      price: [],
      size: [],
      color: [],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 capitalize">
        {category ? `${category} Collection` : 'All Products'}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters - desktop sidebar or mobile dropdown */}
        <div className={`w-full lg:w-64 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters
            categories={categories}
            priceRanges={priceRanges}
            sizes={sizes}
            colors={colors}
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Product listing */}
        <div className="flex-1">
          {/* Sort & view options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-500">
                Showing {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <SlidersHorizontal size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
              
              <div className="flex">
                <button className="p-2 bg-blue-600 text-white rounded-l-md">
                  <Grid size={16} />
                </button>
                <button className="p-2 bg-gray-200 text-gray-700 rounded-r-md">
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          {displayProducts.length > 0 ? (
            <ProductGrid products={displayProducts} />
          ) : (
            <div className="bg-gray-50 p-12 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
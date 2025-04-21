import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryBanner from '../components/home/CategoryBanner';
import PromoSection from '../components/home/PromoSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoryBanner />
      <PromoSection />
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Premium Fashion Essentials',
    subtitle: 'Elevate your wardrobe with our latest collection',
    cta: 'Shop New Arrivals',
    link: '/category/clothing',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Handcrafted Leather Belts',
    subtitle: 'Quality accessories for every occasion',
    cta: 'Explore Collection',
    link: '/category/belts',
    image: 'https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: 'Accessories That Define You',
    subtitle: 'Complete your look with our curated accessories',
    cta: 'Discover More',
    link: '/category/accessories',
    image: 'https://images.pexels.com/photos/9428748/pexels-photo-9428748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-white">
              <h1 
                className="text-4xl md:text-6xl font-bold mb-4 opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
              >
                {slide.title}
              </h1>
              <p 
                className="text-lg md:text-xl mb-8 opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              >
                {slide.cta}
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
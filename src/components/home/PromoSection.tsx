import React from 'react';
import { Truck, RefreshCw, Shield, Clock } from 'lucide-react';

const PromoSection: React.FC = () => {
  const benefits = [
    {
      icon: <Truck size={32} />,
      title: 'Free Shipping',
      description: 'On all orders over $50'
    },
    {
      icon: <RefreshCw size={32} />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Payments',
      description: '100% secure checkout'
    },
    {
      icon: <Clock size={32} />,
      title: 'Customer Support',
      description: '24/7 dedicated support'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
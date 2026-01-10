import React from 'react';
import { Link } from 'react-router-dom';

// Import category images
import vitaminsImg from '../../../assets/vitamins.png';
import supplementsImg from '../../../assets/supplements.png';
import aromatherapyImg from '../../../assets/aromatherapy.png';

const categories = [
  {
    id: 'vitamins',
    name: 'Vitamins',
    image: vitaminsImg,
    link: '/products?category=Vitamins'
  },
  {
    id: 'supplements',
    name: 'Supplements',
    image: supplementsImg,
    link: '/products?category=Supplements'
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy',
    image: aromatherapyImg,
    link: '/products?category=Aromatherapy'
  }
];

export default function ShopByCategory() {
  return (
    <section className="py-16 px-4 bg-sage-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-sage-800 text-center mb-12">
          Shop By Category
        </h2>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Label */}
                <div className="py-4 px-6 bg-white">
                  <h3 className="text-lg font-semibold text-sage-800 text-center group-hover:text-sage-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

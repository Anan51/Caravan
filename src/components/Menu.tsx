// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useState, useMemo } from 'react';
import { menuItems, categories, type MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SectionDivider } from './About';

/* ------------------------------------------------------------------ */
/*  Menu Card                                                          */
/* ------------------------------------------------------------------ */

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className="
        group relative bg-white rounded-2xl overflow-hidden
        border border-[#1a3a5c]/5
        shadow-md shadow-[#1a3a5c]/5
        transition-all duration-500 ease-out
        hover:shadow-xl hover:shadow-[#d4a843]/10
        hover:-translate-y-1.5
        hover:border-[#d4a843]/20
      "
    >
      {/* Popular badge */}
      {item.popular && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#d4a843] text-[#1a1a2e] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#d4a843]/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Popular
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name + Uzbek name */}
        <div className="mb-2">
          <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#1a1a2e] group-hover:text-[#1a3a5c] transition-colors duration-300">
            {item.name}
          </h3>
          {item.nameUzbek && (
            <p className="text-[#d4a843] text-xs italic tracking-wide mt-0.5">
              {item.nameUzbek}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-[#1a1a2e]/60 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="font-['Playfair_Display',serif] text-xl font-bold text-[#1a3a5c]">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={added}
            className={`
              px-4 py-2 rounded-xl text-sm font-semibold tracking-wide
              transition-all duration-300 ease-out
              ${
                added
                  ? 'bg-emerald-500 text-white scale-95'
                  : 'bg-[#1a3a5c] text-white hover:bg-[#d4a843] hover:text-[#1a1a2e] hover:shadow-lg hover:shadow-[#d4a843]/20 active:scale-95'
              }
            `}
          >
            {added ? (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Menu Section                                                       */
/* ------------------------------------------------------------------ */

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation({ threshold: 0.2 });

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="relative py-20 sm:py-28 bg-white">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headingVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-[#1a1a2e]">
            Our Menu
          </h2>
          <SectionDivider />
          <p className="text-[#1a3a5c]/60 text-sm uppercase tracking-[0.25em] font-medium">
            Flavors of the Silk Road
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="mb-10 overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex items-center gap-2 min-w-max justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide
                  transition-all duration-300
                  whitespace-nowrap
                  ${
                    activeCategory === cat.id
                      ? 'bg-[#1a3a5c] text-white shadow-lg shadow-[#1a3a5c]/20'
                      : 'bg-[#faf6f0] text-[#1a1a2e]/70 hover:bg-[#d4a843]/10 hover:text-[#1a3a5c]'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="animate-[fadeInUp_0.5s_ease-out_both]"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <MenuCard item={item} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#1a1a2e]/40 text-lg">
              No items in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

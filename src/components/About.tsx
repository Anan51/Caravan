// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SAMARKAND_IMAGE =
  'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80';

/** Reusable decorative section divider inspired by Uzbek tilework */
export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span className="block w-16 h-px bg-gradient-to-r from-transparent to-[#d4a843]/60" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="text-[#d4a843]"
      >
        <polygon
          points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <span className="block w-16 h-px bg-gradient-to-l from-transparent to-[#d4a843]/60" />
    </div>
  );
}

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-[#faf6f0] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #1a3a5c 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={sectionRef}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-[#1a1a2e]">
            Our Story
          </h2>
          <SectionDivider />
          <p className="text-[#1a3a5c]/60 text-sm uppercase tracking-[0.25em] font-medium">
            A Journey Along the Silk Road
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-[#1a1a2e]/80 text-lg leading-relaxed mb-6">
              At <span className="text-[#d4a843] font-semibold">Caravan</span>,
              we bring the rich culinary traditions of Uzbekistan and Central
              Asia to the heart of Seattle. Every dish is crafted with recipes
              passed down through generations, using the freshest ingredients
              and time-honored techniques.
            </p>
            <p className="text-[#1a1a2e]/80 text-lg leading-relaxed mb-6">
              From the fragrant saffron plov simmered in a traditional kazan to
              the hand-pulled lagman noodles and flaky samsa pastries, our menu
              is a journey along the ancient Silk Road — where flavors from
              Samarkand, Bukhara, and Tashkent come alive in every bite.
            </p>
            <p className="text-[#1a1a2e]/80 text-lg leading-relaxed mb-8">
              We are proudly{' '}
              <span className="text-[#1a3a5c] font-semibold">
                100% Halal Certified
              </span>
              . Every ingredient, every preparation method, and every meal meets
              the highest halal standards — so you can dine with complete
              confidence and peace of mind.
            </p>

            {/* Halal badge */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a3a5c]/5 border border-[#1a3a5c]/10 mb-8">
              <div className="w-14 h-14 rounded-xl bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#d4a843]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1a3a5c] text-base">
                  Halal Certified
                </p>
                <p className="text-[#1a1a2e]/60 text-sm">
                  All meats sourced from certified halal suppliers
                </p>
              </div>
            </div>

            {/* Hours & Address */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#d4a843]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#d4a843]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm uppercase tracking-wider">
                    Hours
                  </p>
                  <p className="text-[#1a1a2e]/70 text-base mt-1">
                    10:00 AM – 8:00 PM
                  </p>
                  <p className="text-[#1a1a2e]/50 text-sm">7 days a week</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#d4a843]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#d4a843]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm uppercase tracking-wider">
                    Address
                  </p>
                  <p className="text-[#1a1a2e]/70 text-base mt-1">
                    405 NE 45th St
                  </p>
                  <p className="text-[#1a1a2e]/50 text-sm">
                    Seattle, WA 98105
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-700 delay-400 ${
              imageVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Decorative frame */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border-2 border-[#d4a843]/20 pointer-events-none" />
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4a843] rounded-tl-xl" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4a843] rounded-br-xl" />

            <img
              src={SAMARKAND_IMAGE}
              alt="Samarkand tilework — the architectural artistry of the Silk Road"
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl shadow-2xl shadow-[#1a3a5c]/10"
              loading="lazy"
            />

            {/* Overlaid quote */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl p-4 border border-[#d4a843]/20">
              <p className="text-white/90 text-sm italic font-['Playfair_Display',serif] leading-relaxed">
                "Where the aromas of the ancient bazaar meet the warmth of home."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

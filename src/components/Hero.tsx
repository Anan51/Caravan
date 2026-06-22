// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useEffect, useState } from 'react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1547424850-637327fc4bbe?w=1920&q=80';

/**
 * Inline SVG Uzbek-inspired geometric tilework pattern.
 * Uses an 8-pointed star motif common in Central Asian architecture.
 */
function UzbekPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="uzbek-tile"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Central 8-pointed star */}
          <polygon
            points="40,10 47,25 62,18 55,33 70,40 55,47 62,62 47,55 40,70 33,55 18,62 25,47 10,40 25,33 18,18 33,25"
            fill="none"
            stroke="rgba(212,168,67,0.12)"
            strokeWidth="0.8"
          />
          {/* Inner diamond */}
          <polygon
            points="40,22 52,40 40,58 28,40"
            fill="none"
            stroke="rgba(212,168,67,0.08)"
            strokeWidth="0.5"
          />
          {/* Corner connectors */}
          <line x1="0" y1="0" x2="18" y2="18" stroke="rgba(212,168,67,0.06)" strokeWidth="0.5" />
          <line x1="80" y1="0" x2="62" y2="18" stroke="rgba(212,168,67,0.06)" strokeWidth="0.5" />
          <line x1="0" y1="80" x2="18" y2="62" stroke="rgba(212,168,67,0.06)" strokeWidth="0.5" />
          <line x1="80" y1="80" x2="62" y2="62" stroke="rgba(212,168,67,0.06)" strokeWidth="0.5" />
          {/* Outer circle */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="rgba(212,168,67,0.06)"
            strokeWidth="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#uzbek-tile)" />
    </svg>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* Parallax on pattern */
  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.3);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Uzbek feast spread"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/80 via-[#1a1a2e]/60 to-[#1a1a2e]/90" />
      </div>

      {/* Uzbek tile pattern overlay with parallax */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-100"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <UzbekPattern />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4a843]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Top decorative line */}
        <div
          className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="block w-12 h-px bg-[#d4a843]/60" />
          <span className="text-[#d4a843] text-xs tracking-[0.3em] uppercase font-medium">
            Est. 2018 · Seattle
          </span>
          <span className="block w-12 h-px bg-[#d4a843]/60" />
        </div>

        {/* Restaurant name */}
        <h1
          className={`font-['Playfair_Display',serif] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="bg-gradient-to-r from-white via-[#d4a843] to-white bg-clip-text text-transparent">
            CARAVAN
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`mt-4 font-['Playfair_Display',serif] text-xl sm:text-2xl md:text-3xl text-white/90 font-light italic tracking-wide transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          Authentic Uzbek & Central Asian Cuisine
        </p>

        {/* Subtitle */}
        <p
          className={`mt-3 text-sm sm:text-base text-[#d4a843] tracking-[0.2em] uppercase font-medium transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          Halal Certified &nbsp;•&nbsp; Seattle, WA
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            onClick={() => scrollTo('menu')}
            className="
              group relative px-8 py-3.5 rounded-xl overflow-hidden
              bg-[#d4a843] text-[#1a1a2e] font-semibold text-sm tracking-wider uppercase
              shadow-lg shadow-[#d4a843]/20
              transition-all duration-300
              hover:shadow-xl hover:shadow-[#d4a843]/30 hover:scale-105
              active:scale-95
            "
          >
            <span className="relative z-10">View Our Menu</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            onClick={() => scrollTo('menu')}
            className="
              group px-8 py-3.5 rounded-xl
              border-2 border-white/30 text-white font-semibold text-sm tracking-wider uppercase
              transition-all duration-300
              hover:border-[#d4a843] hover:text-[#d4a843] hover:scale-105
              active:scale-95
            "
          >
            Order Pickup
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 transition-all duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1400ms' }}
        >
          <button
            onClick={() => scrollTo('about')}
            className="animate-bounce text-white/40 hover:text-[#d4a843] transition-colors duration-300"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

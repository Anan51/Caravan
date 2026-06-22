// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useCallback, useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const LOGO_URL =
  'https://d2gqo3h0psesgi.cloudfront.net/auto/caravan-restaurant-seattle-tg7385vd-logo.png';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* ---- scroll listener: opaque bg + active section ---- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = ['contact', 'testimonials', 'menu', 'about', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- smooth scroll ---- */
  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  /* ---- lock body scroll when mobile menu open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-500 ease-out
          ${
            scrolled
              ? 'bg-[#1a1a2e]/90 backdrop-blur-xl shadow-lg shadow-black/10'
              : 'bg-[#1a1a2e]/30 backdrop-blur-md'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNav(e, '#home')}
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <img
                src={LOGO_URL}
                alt="Caravan logo"
                className="h-10 sm:h-12 w-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <span className="hidden sm:block font-['Playfair_Display',serif] text-xl text-[#d4a843] tracking-wider font-semibold">
                CARAVAN
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className={`
                      relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg
                      transition-colors duration-300
                      ${
                        isActive
                          ? 'text-[#d4a843]'
                          : 'text-white/80 hover:text-white'
                      }
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#d4a843] rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right side: cart + hamburger */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative p-2 text-white/80 hover:text-[#d4a843] transition-colors duration-300"
                aria-label={`Cart with ${itemCount} items`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#a83232] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-[popIn_0.3s_ease-out]">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden p-2 text-white/80 hover:text-[#d4a843] transition-colors duration-300"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                      mobileOpen ? 'rotate-45 translate-y-[9px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                      mobileOpen ? 'opacity-0 scale-x-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                      mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-500
          ${mobileOpen ? 'visible' : 'invisible'}
        `}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-72
            bg-[#1a1a2e]/95 backdrop-blur-xl
            border-l border-[#d4a843]/20
            transition-transform duration-500 ease-out
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="pt-24 px-6 flex flex-col gap-2">
            {NAV_LINKS.map((link, idx) => {
              const isActive =
                activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`
                    block py-3 px-4 text-lg font-medium tracking-wide rounded-xl
                    transition-all duration-300
                    ${
                      isActive
                        ? 'text-[#d4a843] bg-[#d4a843]/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                  style={{
                    transitionDelay: mobileOpen ? `${idx * 60}ms` : '0ms',
                    transform: mobileOpen
                      ? 'translateX(0)'
                      : 'translateX(40px)',
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pop-in keyframe */}
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}

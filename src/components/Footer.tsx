// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React from 'react';

const LOGO_URL = '/logo.png';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Yelp',
    href: '#',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308c.564-.835 1.86-.477 1.86.516v3.989zm-8.174 5.3l1.433-4.995c.275-.96-.8-1.74-1.63-1.176l-4.308 2.905c-.835.564-.477 1.86.516 1.86h3.989zm-1.12-11.16l4.308 2.905c.83.564.354 1.905-.516 1.86l-5.422-.245c-.96-.044-1.353-1.308-.516-1.86l2.146-2.66zm2.48-4.16c0-.993 1.296-1.35 1.86-.516l2.905 4.308c.564.83-.216 1.905-1.176 1.63l-4.995-1.433c-.96-.276-1.116-1.5-.276-1.86l1.682-.13zM4.18 10.5c-.564-.835.216-1.905 1.176-1.63l4.995 1.433c.96.276 1.116 1.5.276 1.86l-4.588 1.143c-.87.218-1.423-.97-.86-1.806l-1-.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openCookieSettings = () => {
    // Dispatch custom event that CookieConsent listens for
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  return (
    <footer className="bg-[#1a1a2e] text-white/80 relative overflow-hidden">
      {/* Top gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4a843] to-transparent" />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #d4a843 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: Logo & brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={LOGO_URL}
                alt="Caravan logo"
                className="h-12 w-auto rounded-lg"
              />
              <div>
                <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#d4a843] tracking-wider">
                  CARAVAN
                </h3>
                <p className="text-white/40 text-xs tracking-wide">
                  Uzbek & Central Asian Cuisine
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Authentic flavors from the heart of the Silk Road, brought to
              Seattle with love. Every meal is 100% Halal certified.
            </p>

            {/* Halal badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a843]/10 border border-[#d4a843]/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#d4a843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#d4a843] text-xs font-semibold tracking-wider uppercase">
                Halal Certified
              </span>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 text-sm hover:text-[#d4a843] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843]/30 group-hover:bg-[#d4a843] transition-colors duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-white/50">
              <p>405 NE 45th St</p>
              <p>Seattle, WA 98105</p>
              <a
                href="tel:+12064660566"
                className="block hover:text-[#d4a843] transition-colors"
              >
                (206) 466-0566
              </a>
              <p>10:00 AM – 8:00 PM daily</p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#d4a843]/10 hover:text-[#d4a843] transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                  {/* Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[#d4a843] text-[#1a1a2e] text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    Coming Soon
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2026 Caravan Restaurant. All rights reserved.
          </p>
          <button
            onClick={openCookieSettings}
            className="text-white/30 text-xs hover:text-[#d4a843] transition-colors duration-300 underline underline-offset-2"
          >
            Manage Cookie Preferences
          </button>
        </div>
      </div>
    </footer>
  );
}

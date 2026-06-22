// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SectionDivider } from './About';

/* ------------------------------------------------------------------ */
/*  Review data                                                        */
/* ------------------------------------------------------------------ */

interface Review {
  id: number;
  quote: string;
  name: string;
  rating: number;
  source: string;
}

const reviews: Review[] = [
  {
    id: 1,
    quote:
      'The Uzbek Plov here is the real deal — fragrant, rich, and perfectly cooked. Reminds me of my grandmother\'s kitchen in Tashkent.',
    name: 'Azamat K.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 2,
    quote:
      'Best halal restaurant in Seattle, hands down. The Kazan Kebab is incredible, and everything is so fresh and authentic.',
    name: 'Fatima S.',
    rating: 5,
    source: 'Yelp',
  },
  {
    id: 3,
    quote:
      'We drove 45 minutes just for the Lagman. The hand-pulled noodles are unlike anything else in the city. Worth every mile!',
    name: 'Michael T.',
    rating: 5,
    source: 'Google',
  },
  {
    id: 4,
    quote:
      'As someone who is very particular about halal standards, I truly appreciate Caravan\'s commitment. And the Samsa pastries? Absolute perfection.',
    name: 'Aisha R.',
    rating: 5,
    source: 'Yelp',
  },
  {
    id: 5,
    quote:
      'The Shurpa soup healed my soul on a rainy Seattle day. Generous portions, fair prices, and the warmest hospitality.',
    name: 'James L.',
    rating: 4,
    source: 'Google',
  },
  {
    id: 6,
    quote:
      'My family discovered Central Asian cuisine here, and now we\'re regulars. The Manti dumplings and fresh Non bread are our favorites!',
    name: 'Sarah W.',
    rating: 5,
    source: 'TripAdvisor',
  },
];

/* ------------------------------------------------------------------ */
/*  Review Card                                                        */
/* ------------------------------------------------------------------ */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[380px] p-6 rounded-2xl bg-[#faf6f0] border border-[#d4a843]/10 shadow-md shadow-[#1a3a5c]/5 hover:shadow-lg hover:shadow-[#d4a843]/10 transition-shadow duration-300 relative">
      {/* Decorative quote mark */}
      <span className="absolute top-4 right-5 font-['Playfair_Display',serif] text-6xl text-[#d4a843]/10 leading-none select-none pointer-events-none">
        "
      </span>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < review.rating ? 'text-[#d4a843]' : 'text-[#1a1a2e]/15'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#1a1a2e]/80 text-sm leading-relaxed mb-5 italic">
        "{review.quote}"
      </p>

      {/* Reviewer */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-[#1a1a2e] text-sm">
            {review.name}
          </p>
          <p className="text-[#1a3a5c]/50 text-xs">{review.source}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center text-[#1a3a5c] text-xs font-bold">
          {review.name.charAt(0)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials Section                                               */
/* ------------------------------------------------------------------ */

export default function Testimonials() {
  const { ref: headingRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  /* Auto-scroll logic */
  const scrollSpeed = 0.5; // px per frame

  const animate = useCallback(() => {
    if (isPaused || !scrollContainerRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = scrollContainerRef.current;
    scrollPositionRef.current += scrollSpeed;

    // Reset when we reach mid-point (we duplicate the items for seamless loop)
    const halfScroll = container.scrollWidth / 2;
    if (scrollPositionRef.current >= halfScroll) {
      scrollPositionRef.current = 0;
    }

    container.scrollLeft = scrollPositionRef.current;

    // Update active dot
    const cardWidth = 380 + 24; // card width + gap
    const idx = Math.floor(scrollPositionRef.current / cardWidth) % reviews.length;
    setActiveIndex(idx);

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  /* Dot click → scroll to review */
  const scrollToReview = (index: number) => {
    const cardWidth = 380 + 24;
    scrollPositionRef.current = index * cardWidth;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPositionRef.current;
    }
    setActiveIndex(index);
  };

  // Duplicate reviews for seamless looping
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-[#1a1a2e]">
            What Our Guests Say
          </h2>
          <SectionDivider />
          <p className="text-[#1a3a5c]/60 text-sm uppercase tracking-[0.25em] font-medium">
            Reviews from Our Community
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex gap-6 px-8 overflow-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedReviews.map((review, idx) => (
            <ReviewCard key={`${review.id}-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToReview(idx)}
            className={`
              rounded-full transition-all duration-300
              ${
                activeIndex === idx
                  ? 'w-8 h-2 bg-[#d4a843]'
                  : 'w-2 h-2 bg-[#1a3a5c]/20 hover:bg-[#d4a843]/50'
              }
            `}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  /** IntersectionObserver threshold (0-1). Default 0.15 */
  threshold?: number;
  /** IntersectionObserver rootMargin. Default '0px 0px -60px 0px' */
  rootMargin?: string;
  /** Whether to trigger only once. Default true */
  triggerOnce?: boolean;
}

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * scrolls into view. Returns a ref to attach and a boolean indicating
 * visibility.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export default useScrollAnimation;

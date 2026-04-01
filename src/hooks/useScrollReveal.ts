import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('visible');
          element.style.willChange = 'opacity, transform';
          
          element.addEventListener('transitionend', () => {
            element.style.willChange = 'auto';
          }, { once: true });

          // Stop observing once visible
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Initial scan for elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [location]); // Re-run on route change
};

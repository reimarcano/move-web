import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const initObserver = () => {
      const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add('visible');
            element.style.willChange = 'opacity, transform';

            element.addEventListener('transitionend', () => {
              element.style.willChange = 'auto';
            }, { once: true });

            observer.unobserve(element);
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));

      return observer;
    };

    // rAF doble: espera a que el navegador haya pintado el DOM completo
    let observer: IntersectionObserver;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        observer = initObserver();
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);
};
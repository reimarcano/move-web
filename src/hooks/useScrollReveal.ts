import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Esperamos a que React termine de pintar el DOM completo
    const timer = setTimeout(() => {
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

            observer.unobserve(element);
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
    }, 100); // 100ms da tiempo a React para montar todos los componentes

    return () => clearTimeout(timer);
  }, [location]);
};

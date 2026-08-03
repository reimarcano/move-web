import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.add('visible');
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -10px 0px',
      },
    );

    const revealAll = () => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal');

      elements.forEach((element) => {
        if (prefersReducedMotion) {
          element.classList.add('visible');
        } else {
          observer.observe(element);
        }
      });
    };

    const timeout = window.setTimeout(revealAll, 100);

    const mutationObserver = new MutationObserver(() => {
      revealAll();
    });

    const root = document.getElementById('root');

    if (root) {
      mutationObserver.observe(root, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);
};
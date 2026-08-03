import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const observedElements = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

          element.classList.add('visible');
          element.style.willChange = 'opacity, transform';

          element.addEventListener(
            'transitionend',
            () => {
              element.style.willChange = 'auto';
            },
            { once: true },
          );

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    const registerRevealElements = (root: ParentNode = document) => {
      const elements = root.querySelectorAll('.reveal');

      elements.forEach((element) => {
        if (observedElements.has(element)) return;

        observedElements.add(element);

        if (prefersReducedMotion) {
          element.classList.add('visible');
          return;
        }

        observer.observe(element);
      });
    };

    registerRevealElements();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.classList.contains('reveal')) {
            if (prefersReducedMotion) {
              node.classList.add('visible');
            } else if (!observedElements.has(node)) {
              observedElements.add(node);
              observer.observe(node);
            }
          }

          registerRevealElements(node);
        });
      });
    });

    mutationObserver.observe(document.getElementById('root') ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);
};

import { useSyncExternalStore } from "react";

/* Media query que sirve igual en el HTML precompilado que en el navegador: al hidratar
   empieza en `false` (lo mismo que se compiló) y justo después toma el valor real,
   así React no ve diferencias entre el HTML y el primer render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/* Sustituye a useReducedMotion de motion, que en el navegador lee la preferencia ya en el primer render */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

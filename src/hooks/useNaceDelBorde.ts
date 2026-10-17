import { useEffect, type RefObject } from "react";

/* Imagen que nace desde el borde de la pantalla al entrar con el scroll, como el carro
   del reformer al deslizarse (el mismo gesto que la foto de "Primera vez" en la home).
   `lado` es el borde del que arranca: la imagen se descubre hacia el centro. */
export function useNaceDelBorde(ref: RefObject<HTMLElement | null>, lado: "izquierda" | "derecha" = "izquierda") {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = element.getBoundingClientRect();
      const r = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.8)));
      const hidden = ((1 - (1 - Math.pow(1 - r, 3))) * 100).toFixed(2);
      element.style.clipPath = lado === "izquierda" ? `inset(0 ${hidden}% 0 0)` : `inset(0 0 0 ${hidden}%)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, lado]);
}

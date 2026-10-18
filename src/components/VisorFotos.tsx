import { useCallback, useEffect, useRef } from "react";
import type { Foto } from "../data/eventos";

/* Visor de fotos a pantalla completa: flechas del teclado, Escape, deslizar con el dedo
   o el ratón y segmentos de línea fina para saltar a cualquier foto. El foco queda dentro
   mientras está abierto y vuelve al punto de partida al cerrar. */
export default function VisorFotos({
  fotos,
  index,
  onChange,
  onClose,
}: {
  fotos: Foto[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const total = fotos.length;

  const go = useCallback((i: number) => onChange((i + total) % total), [onChange, total]);

  /* Al abrir: bloquea el scroll y lleva el foco dentro; al cerrar, lo devuelve */
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, onClose]);

  const foto = fotos[index];

  return (
    <div
      ref={dialogRef}
      className="visor"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="visor__close" onClick={onClose} aria-label="Cerrar visor">
        <span aria-hidden="true" />
      </button>

      <figure
        className="visor__frame"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const start = drag.current;
          drag.current = null;
          if (!start) return;
          const dx = e.clientX - start.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - start.y)) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <img key={foto.src} src={foto.src} alt={foto.alt} draggable={false} />
        <figcaption>{foto.alt}</figcaption>
      </figure>

      <div className="visor__nav" role="group" aria-label="Elegir foto">
        {fotos.map((f, i) => (
          <button
            key={f.src}
            type="button"
            className={i === index ? "is-active" : undefined}
            onClick={() => go(i)}
            aria-label={`Foto ${i + 1} de ${total}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Foto {index + 1} de {total}
      </span>
    </div>
  );
}

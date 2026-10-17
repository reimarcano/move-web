import { useEffect, useRef, useState, type CSSProperties } from "react";
import { VALORACION_PRECIO } from "../data/valoracion";

/* Ficha de la clase de valoración: precio, duración y grupo como un raíl.
   Una línea fina se dibuja de izquierda a derecha y, al pasar por cada nodo,
   la cifra se cuenta: la misma gramática de línea + nodos que los pasos.
   Se usa en la página de Precios; en el Home cada dato va dentro de su paso. */

/* El grupo reducido primero, el precio al final: no es lo primero que debe leerse */
const specs = [
  { label: "Grupo", from: 1, to: 4, before: "Máx. ", after: "", note: "personas por clase", key: true },
  { label: "Duración", from: 0, to: 50, before: "", after: " min" },
  { label: "Precio", from: 0, to: VALORACION_PRECIO, before: "", after: "" },
];

const RAIL_MS = 1400;
const COUNT_MS = 900;

export default function FichaValoracion({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDListElement>(null);
  /* Se pinta con las cifras finales (sin JS o sin movimiento se leen igual) */
  const [values, setValues] = useState(() => specs.map((spec) => spec.to));

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-on");
      return;
    }

    setValues(specs.map((spec) => spec.from));
    let raf = 0;

    const run = () => {
      element.classList.add("is-on");
      const startedAt = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startedAt;
        setValues(
          specs.map((spec, index) => {
            /* Cada cifra arranca cuando la línea llega a su nodo */
            const start = (index / specs.length) * RAIL_MS * 0.85 + 150;
            const t = Math.max(0, Math.min(1, (elapsed - start) / COUNT_MS));
            const eased = 1 - Math.pow(1 - t, 3);
            return Math.round(spec.from + (spec.to - spec.from) * eased);
          }),
        );
        if (elapsed < RAIL_MS + COUNT_MS) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        run();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(element);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <dl ref={ref} className={`pv-specs ${className}`}>
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={spec.key ? "pv-spec-key" : undefined}
          style={{ "--i": index } as CSSProperties}
        >
          <dt>{spec.label}</dt>
          <dd aria-label={`${spec.before}${spec.to}${spec.after}`}>
            <span aria-hidden="true">
              {spec.before}
              {values[index]}
              {spec.after}
            </span>
          </dd>
          {spec.note && <dd className="pv-spec-note">{spec.note}</dd>}
        </div>
      ))}
    </dl>
  );
}

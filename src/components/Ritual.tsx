import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNaceDelBorde } from "../hooks/useNaceDelBorde";

/* ────────────────────────────────────────────
   Ritual (Eventos)
   Cada experiencia se cuenta como una secuencia de momentos numerados.
   En escritorio una foto a sangre queda fija y cambia con cada momento mientras los
   momentos avanzan junto a una línea fina; en móvil cada momento lleva su foto.
   ──────────────────────────────────────────── */

/* `encuadre`: object-position para colocar lo importante de cada foto */
export type Momento = { titulo: string; texto: string; foto: string; alt: string; encuadre?: string };

export default function Ritual({ momentos, etiqueta }: { momentos: Momento[]; etiqueta: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [activo, setActivo] = useState(0);
  useNaceDelBorde(panelRef, "izquierda");

  /* El momento activo es el que cruza el centro de la pantalla */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivo(items.indexOf(entry.target as HTMLElement));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [momentos]);

  return (
    <div className="ritual" aria-label={etiqueta}>
      {/* Escritorio: la foto fija que cambia con cada momento */}
      <div className="ritual__panel" ref={panelRef} aria-hidden="true">
        {momentos.map((m, i) => (
          <img
            key={m.foto}
            src={m.foto}
            alt=""
            className={i === activo ? "is-active" : undefined}
            style={m.encuadre ? { objectPosition: m.encuadre } : undefined}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <ol
        className="ritual__list"
        ref={listRef}
        style={{ "--ritual-p": (activo + 1) / momentos.length } as CSSProperties}
      >
        {momentos.map((m, i) => (
          <li key={m.titulo} className={`ritual__momento${i === activo ? " is-active" : ""}`}>
            {/* Móvil: cada momento con su foto */}
            <img className="ritual__foto" src={m.foto} alt={m.alt} style={m.encuadre ? { objectPosition: m.encuadre } : undefined} loading="lazy" decoding="async" />
            <span className="ritual__n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="ritual__titulo">{m.titulo}</h3>
            <p className="ritual__texto">{m.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

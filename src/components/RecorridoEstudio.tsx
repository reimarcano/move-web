import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import type { Foto } from "../data/eventos";

/* ────────────────────────────────────────────
   Recorrido por el estudio (Nuestro estudio)
   Las fotos del espacio son las protagonistas: llenan la pantalla en hojas que se apilan.
   Cada hoja nueva sube en tres franjas, una detrás de otra, como las cortinas del ventanal
   al abrirse por la mañana; la hoja anterior se queda quieta y se apaga un poco debajo.
   En ordenador cada franja es una foto; en el móvil, las tres franjas recomponen una sola.
   La primera hoja se abre así al entrar y lleva el título de la página.
   La última se queda fija mientras el capítulo siguiente sube sobre ella (el telón).
   Con movimiento reducido son fotos a sangre, una debajo de otra.
   ──────────────────────────────────────────── */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/* Retraso de cada franja al subir (fracción de la altura de la hoja) */
const RETRASO = [0, 0.18, 0.36];

const grande = (src: string) => src.replace("-900.webp", ".webp");

export default function RecorridoEstudio({
  escritorio,
  movil,
  children,
}: {
  escritorio: Foto[][];
  movil: Foto[];
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const hojasRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isStatic = prefersReducedMotion === true;
  const esMovil = useMediaQuery("(max-width: 767px)");

  /* En el móvil una foto por hoja, partida en tres franjas */
  const hojas = esMovil ? movil.map((foto) => [foto, foto, foto]) : escritorio;
  const partida = esMovil;

  useEffect(() => {
    if (isStatic) return;
    let raf = 0;
    const place = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const alto = window.innerHeight;
      /* Hojas recorridas: la hoja i sube entre s = i − 1 y s = i; la última, el telón */
      const s = -section.getBoundingClientRect().top / alto;
      const subida = (i: number) => clamp01(s - (i - 1));

      hojasRef.current.forEach((hoja, i) => {
        if (!hoja) return;
        if (i > 0) {
          const t = subida(i);
          const orden = i % 2 === 0 ? [2, 1, 0] : [0, 1, 2]; // la ola cambia de lado en cada hoja
          hoja.querySelectorAll<HTMLElement>(".recorrido__panel").forEach((panel, j) => {
            const retraso = RETRASO[orden[j]];
            const k = ease(clamp01((t - retraso) / (1 - retraso)));
            panel.style.transform = `translate3d(0, ${((1 - k) * alto).toFixed(1)}px, 0)`;
          });
        }
        /* Se apaga y se aleja un poco mientras la siguiente la cubre */
        const cubierta = subida(i + 1);
        const sombra = hoja.querySelector<HTMLElement>(".recorrido__sombra");
        if (sombra) sombra.style.opacity = (cubierta * 0.45).toFixed(3);
        hoja.style.setProperty("--alejar", (1 + cubierta * 0.06).toFixed(4));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isStatic, esMovil]);

  return (
    <section
      ref={sectionRef}
      className={`recorrido${isStatic ? " recorrido--static" : ""}`}
      style={{ "--hojas": hojas.length } as CSSProperties}
      aria-label="El estudio MOVE en fotos"
    >
      <div className="recorrido__stage">
        {hojas.map((fotos, i) => (
          <div
            key={`${esMovil ? "m" : "e"}-${i}`}
            ref={(el) => {
              hojasRef.current[i] = el;
            }}
            className={`recorrido__hoja${i === 0 ? " recorrido__hoja--primera" : ""}${partida ? " recorrido__hoja--partida" : ""}`}
            style={{ zIndex: i + 1 }}
          >
            {fotos.map((foto, j) => (
              <div className="recorrido__panel" key={j} style={{ "--franja": j } as CSSProperties}>
                <img
                  src={foto.src}
                  srcSet={`${foto.src} 900w, ${grande(foto.src)} 1700w`}
                  sizes={partida ? "100vw" : "34vw"}
                  alt={partida && j > 0 ? "" : foto.alt}
                  aria-hidden={partida && j > 0 ? true : undefined}
                  className={partida ? "recorrido__img--partida" : undefined}
                  fetchPriority={i === 0 ? "high" : undefined}
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
            {i === 0 && (
              <>
                <span className="recorrido__velo" aria-hidden="true" />
                <div className="recorrido__texto">{children}</div>
              </>
            )}
            <span className="recorrido__sombra" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

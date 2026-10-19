import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import type { Foto } from "../data/eventos";

/* ────────────────────────────────────────────
   Galería horizontal (Eventos)
   Una fila de fotos grandes, a sangre. Al bajar con el scroll la escena queda fija y la
   fila avanza hacia la izquierda, en el sentido del scroll. Cada foto se desplaza un poco
   dentro de su marco, como una ventana (el mismo gesto que la tira de Instagram).
   Sin textos: las fotos hablan solas; su descripción aparece en el visor.
   En ordenador pide más recorrido de scroll que en el móvil, para disfrutar cada foto.
   Con movimiento reducido es una tira que se desliza a mano.
   ──────────────────────────────────────────── */

const RITMO = { escritorio: 1.5, movil: 1 }; // px de scroll por px de avance

export default function GaleriaHorizontal({
  fotos,
  etiqueta,
  onOpen,
}: {
  fotos: Foto[];
  etiqueta: string;
  onOpen: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const distancia = useRef(0);
  const [alto, setAlto] = useState<string | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isStatic = prefersReducedMotion === true;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.7 });

  const place = (value: number) => {
    const track = trackRef.current;
    if (!track) return;
    const x = -value * distancia.current;
    track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    /* La foto se mueve algo más despacio que su marco */
    const ancho = window.innerWidth;
    imgsRef.current.forEach((img) => {
      const marco = img?.parentElement;
      if (!img || !marco) return;
      const centro = marco.offsetLeft + x + marco.offsetWidth / 2;
      const p = centro / ancho - 0.5; // -0.5 izquierda · 0 centro · 0.5 derecha
      img.style.transform = `scale(1.16) translateX(${(p * -9).toFixed(2)}%)`;
    });
  };

  /* La sección mide lo que tarda la fila en recorrerse (más en ordenador) */
  useEffect(() => {
    if (isStatic) return;
    const medir = () => {
      const track = trackRef.current;
      if (!track) return;
      distancia.current = Math.max(0, track.scrollWidth - window.innerWidth);
      const ritmo = window.innerWidth >= 768 ? RITMO.escritorio : RITMO.movil;
      setAlto(`${Math.round(window.innerHeight + distancia.current * ritmo)}px`);
      place(progress.get());
    };
    medir();
    const imgs = imgsRef.current.filter(Boolean) as HTMLImageElement[];
    imgs.forEach((img) => img.addEventListener("load", medir));
    window.addEventListener("resize", medir);
    return () => {
      imgs.forEach((img) => img.removeEventListener("load", medir));
      window.removeEventListener("resize", medir);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatic, fotos.length]);

  useMotionValueEvent(progress, "change", (value) => {
    if (!isStatic) place(value);
  });

  return (
    <section
      ref={sectionRef}
      className={`horizontal${isStatic ? " horizontal--static" : ""}`}
      style={alto ? { height: alto } : undefined}
      aria-label={etiqueta}
    >
      <div className="horizontal__stage">
        <div className="horizontal__track" ref={trackRef}>
          {fotos.map((foto, i) => (
            <button
              key={foto.src}
              type="button"
              className="horizontal__item"
              onClick={() => onOpen(i)}
              aria-label={`Ampliar foto: ${foto.alt}`}
            >
              <img
                ref={(el) => {
                  imgsRef.current[i] = el;
                }}
                src={foto.src}
                alt=""
                decoding="async"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

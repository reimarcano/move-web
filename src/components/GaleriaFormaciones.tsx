import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import type { Foto } from "../data/eventos";

/* ────────────────────────────────────────────
   Galería en formaciones (Eventos)
   Las fotos cambian de formación con el scroll:
   1. Punto: nacen juntas de un punto, el gesto de la portada y del vídeo.
   2. Anillo: se abren en círculo, como una respiración, y en el centro aparece la M de
      MOVE, como si las fotos salieran de ella.
   3'. Al ordenarse en columna, la M se recoge y queda oculta bajo la foto grande.
   3. Columna: se ordenan como un índice y la foto activa crece grande en el centro;
      al seguir bajando la columna avanza y cada foto pasa a ser la protagonista.
   Las fotos se mueven siempre en el sentido del scroll: al bajar, las nuevas suben desde
   abajo y las ya vistas se van por arriba, como el resto de la página.
   Sin textos al lado: las fotos hablan solas (su descripción vive en el visor y en
   las etiquetas accesibles). Tocar la foto grande la amplía; tocar una miniatura la
   trae al centro.
   Con movimiento reducido es una tira plana que se desliza.
   ──────────────────────────────────────────── */

/* Scroll (en svh) del punto al anillo y del anillo a la columna, y por foto en la
   columna. En ordenador la rueda avanza mucho más que el dedo: allí pide más recorrido */
const RITMO = {
  escritorio: { intro: 130, porFoto: 90 },
  movil: { intro: 90, porFoto: 55 },
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Medidas = { alto: number; mini: number; gap: number; radio: number; mobile: boolean };

export default function GaleriaFormaciones({
  fotos,
  etiqueta,
  onOpen,
}: {
  fotos: Foto[];
  etiqueta: string;
  onOpen: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const logoRef = useRef<HTMLImageElement>(null);
  const medidas = useRef<Medidas>({ alto: 560, mini: 90, gap: 12, radio: 260, mobile: false });
  const [actual, setActual] = useState(0);
  const [fase, setFase] = useState<"punto" | "anillo" | "columna">("punto");
  const prefersReducedMotion = usePrefersReducedMotion();
  const isStatic = prefersReducedMotion === true;
  const total = fotos.length;
  const signo = 1; // en el sentido del scroll: las siguientes esperan abajo y suben al bajar
  const ritmo = useIsDesktop() ? RITMO.escritorio : RITMO.movil;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 45, damping: 20, mass: 0.8 });

  /* Fracciones del recorrido: punto→anillo, anillo→columna y la columna */
  const tramos = () => {
    const recorrido = ritmo.intro + (total - 1) * ritmo.porFoto;
    return { a: (ritmo.intro * 0.45) / recorrido, b: ritmo.intro / recorrido };
  };

  /* Posición en la columna para una foto a distancia d de la activa */
  const enColumna = (d: number) => {
    const { alto, mini, gap } = medidas.current;
    const ad = Math.abs(d);
    const near = Math.min(ad, 1);
    const far = Math.max(ad - 1, 0);
    const tam = lerp(alto, mini, near); // la activa grande, las demás miniaturas
    const y = Math.sign(d) * signo * (((alto + mini) / 2 + gap) * near + far * (mini + gap));
    return { x: 0, y, escala: tam / alto };
  };

  const place = (value: number) => {
    const { alto, mini, radio } = medidas.current;
    const { a, b } = tramos();
    const escalaMini = mini / alto;
    let activa = 0;

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const angulo = (i / total) * Math.PI * 2 - Math.PI / 2;
      const anillo = { x: Math.cos(angulo) * radio, y: Math.sin(angulo) * radio, escala: escalaMini };
      let x: number;
      let y: number;
      let escala: number;
      let opacity = 1;

      if (value < a) {
        /* 1. Del punto al anillo */
        const k = ease(clamp01(value / a));
        x = anillo.x * k;
        y = anillo.y * k;
        escala = lerp(0.02, escalaMini, k);
        opacity = lerp(0.6, 1, k);
      } else if (value < b) {
        /* 2. Del anillo a la columna (la primera foto crece) */
        const k = ease(clamp01((value - a) / (b - a)));
        const col = enColumna(i);
        x = lerp(anillo.x, col.x, k);
        y = lerp(anillo.y, col.y, k);
        escala = lerp(anillo.escala, col.escala, k);
      } else {
        /* 3. La columna avanza; cada foto se queda un instante como protagonista */
        const raw = ((value - b) / (1 - b)) * (total - 1);
        const base = Math.floor(raw);
        activa = Math.min(total - 1, base + (1 - Math.cos(Math.PI * (raw - base))) / 2);
        const col = enColumna(i - activa);
        x = col.x;
        y = col.y;
        escala = col.escala;
        /* En móvil solo las vecinas, para no cruzarse con la descripción */
        opacity = 1 - clamp01(Math.abs(i - activa) - (medidas.current.mobile ? 1.2 : 3.5));
      }

      item.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${escala.toFixed(4)})`;
      item.style.opacity = opacity.toFixed(3);
      item.style.zIndex = String(100 - Math.round(Math.abs(i - activa) * 10));
    });

    /* La M: aparece cuando las fotos ya han salido del centro y se recoge al ordenarse */
    const logo = logoRef.current;
    if (logo) {
      const entra = ease(clamp01((value / a - 0.35) / 0.65));
      const sale = ease(clamp01((value - a) / ((b - a) * 0.55)));
      const visible = entra * (1 - sale);
      logo.style.opacity = visible.toFixed(3);
      logo.style.transform = `translate(-50%, -50%) scale(${(0.7 + entra * 0.3 - sale * 0.2).toFixed(3)})`;
    }

    setFase(value < a ? "punto" : value < b ? "anillo" : "columna");
    setActual(Math.min(total - 1, Math.max(0, Math.round(activa))));
  };

  /* Medidas según el ancho: la foto activa ocupa casi toda la altura útil */
  useEffect(() => {
    if (isStatic) return;
    const setLayout = () => {
      const mobile = window.innerWidth < 768;
      const alto = mobile ? Math.min(window.innerHeight * 0.58, window.innerWidth * 1.15) : Math.min(window.innerHeight * 0.7, 680);
      medidas.current = {
        mobile,
        alto,
        mini: alto * (mobile ? 0.13 : 0.15),
        gap: mobile ? 8 : 12,
        radio: mobile ? Math.min(window.innerWidth * 0.36, 180) : Math.min(window.innerHeight * 0.3, 280),
      };
      sectionRef.current?.style.setProperty("--formacion-alto", `${alto}px`);
      place(progress.get());
    };
    setLayout();
    window.addEventListener("resize", setLayout);
    return () => window.removeEventListener("resize", setLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatic, total, signo]);

  useMotionValueEvent(progress, "change", (value) => {
    if (!isStatic) place(value);
  });

  /* Tocar una miniatura la trae al centro */
  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const { b } = tramos();
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (b + (i / Math.max(1, total - 1)) * (1 - b)) * range, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className={`formacion${isStatic ? " formacion--static" : ""}`}
      style={{ "--formacion-h": `calc(${ritmo.intro + (total - 1) * ritmo.porFoto}svh + 100svh)` } as CSSProperties}
      aria-label={etiqueta}
    >
      <div className="formacion__stage">
        <img ref={logoRef} className="formacion__logo" src="/assets/move-m-marron.webp" alt="" aria-hidden="true" />
        {fotos.map((foto, i) => (
          <button
            key={foto.src}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            type="button"
            className="formacion__item"
            onClick={() => (isStatic || (fase === "columna" && i === actual) ? onOpen(i) : goTo(i))}
            aria-label={i === actual || isStatic ? `Ampliar foto: ${foto.alt}` : `Ver foto: ${foto.alt}`}
          >
            {/* Carga normal: con `lazy` el navegador no ve como visibles las fotos transformadas */}
            <img src={foto.src} alt="" decoding="async" draggable={false} />
          </button>
        ))}

      </div>
    </section>
  );
}

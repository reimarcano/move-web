import { useEffect, useRef, useState } from "react";
import { m as motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

/* ────────────────────────────────────────────
   Apertura de página (Eventos, Nuestro estudio…)
   Primero se lee la promesa. Debajo nace la imagen o el vídeo, con un gesto de la
   familia de la home: desde un punto (Eventos) o desde una línea que se abre como unas
   cortinas por la mañana (Estudio). Al llenar la escena aparece la respuesta y, después,
   el telón: el capítulo siguiente sube sobre ella, como en la portada de la home.
   El texto nunca queda sobre la imagen: la promesa se retira antes de que llegue.
   ──────────────────────────────────────────── */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/* (alto 320 − 100 de telón − 100 de pantalla) / (alto − 100 de pantalla) */
const STORY_END = 120 / 220;

/* Altura del origen dentro de la escena (%), bajo la promesa */
const ORIGEN_Y = 62;

type Media =
  | { tipo: "video"; src: string; poster: string; descripcion: string }
  | { tipo: "imagen"; src: string; descripcion: string };

type Cta = { texto: string; href?: string; onClick?: () => void };

export default function Apertura({
  media,
  gesto = "punto",
  antetitulo,
  promesa,
  respuesta,
  pie,
  cta,
}: {
  media: Media;
  gesto?: "punto" | "linea";
  antetitulo: string;
  promesa: string;
  respuesta: string;
  pie: string;
  cta: Cta;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isStatic = prefersReducedMotion === true;
  const esVideo = media.tipo === "video";

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const progress = useTransform(smooth, (value) => clamp01(value / STORY_END));
  const sink = useTransform(smooth, (value) => clamp01((value - STORY_END) / (1 - STORY_END)));

  /* El gesto: un círculo desde un punto, o una franja que se abre desde una línea */
  const clipPath = useTransform(progress, (value) => {
    const eased = Math.pow(clamp01(value / 0.55), 2.2);
    if (gesto === "punto") return `circle(${(1.6 + eased * 118).toFixed(2)}% at 50% ${ORIGEN_Y}%)`;
    const top = ORIGEN_Y * (1 - eased) - 0.2;
    const bottom = (100 - ORIGEN_Y) * (1 - eased) - 0.2;
    const lados = 30 * (1 - Math.min(1, eased * 1.6));
    return `inset(${Math.max(0, top).toFixed(2)}% ${lados.toFixed(2)}% ${Math.max(0, bottom).toFixed(2)}% ${lados.toFixed(2)}%)`;
  });
  const mediaScale = useTransform(progress, [0, 0.6], [1.18, 1]);

  const promiseOpacity = useTransform(progress, [0.12, 0.3], [1, 0]);
  const promiseY = useTransform(progress, [0.12, 0.3], ["0svh", "-6svh"]);
  const answerOpacity = useTransform(progress, [0.5, 0.64], [0, 1]);
  const answerY = useTransform(progress, [0.5, 0.64], [24, 0]);
  const detailsOpacity = useTransform(progress, [0.66, 0.8], [0, 1]);
  const detailsPointer = useTransform(detailsOpacity, (value) => (value > 0.5 ? "auto" : "none"));
  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  /* Telón: la escena se hunde bajo el capítulo siguiente */
  const stageScale = useTransform(sink, [0, 1], [1, 0.92]);
  const stageRadius = useTransform(sink, [0, 1], [0, 28]);
  const shadeOpacity = useTransform(sink, [0, 1], [0, 0.4]);

  /* El vídeo solo se reproduce mientras se ve (y nunca solo con movimiento reducido) */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* El estado manda: si el atributo `muted` quedara fijo, React volvería a silenciarlo */
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    if (!next) {
      video.volume = 1;
      void video.play().catch(() => {});
    }
    setMuted(next);
  };

  const mediaStyle = isStatic ? undefined : { scale: mediaScale };

  return (
    <section ref={sectionRef} className={`cine${isStatic ? " cine--static" : ""}`} aria-labelledby="apertura-titulo">
      <motion.div className="cine__stage" style={isStatic ? undefined : { scale: stageScale, borderRadius: stageRadius }}>
        <h1 id="apertura-titulo" className="cine__title">
          <motion.span className="cine__promise" style={isStatic ? undefined : { opacity: promiseOpacity, y: promiseY }}>
            <span className="m-eyebrow cine__eyebrow">{antetitulo}</span>
            {promesa}
          </motion.span>
          <motion.em className="cine__answer" style={isStatic ? undefined : { opacity: answerOpacity, y: answerY }}>
            {respuesta}
          </motion.em>
        </h1>

        <div className="cine__space">
          <motion.div className="cine__frame" style={isStatic ? undefined : { clipPath }}>
            {media.tipo === "video" ? (
              <motion.video
                ref={videoRef}
                style={mediaStyle}
                src={media.src}
                poster={media.poster}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                aria-label={media.descripcion}
              />
            ) : (
              <motion.img style={mediaStyle} src={media.src} alt={media.descripcion} fetchPriority="high" decoding="async" />
            )}
            <motion.span className="cine__veil" style={isStatic ? undefined : { opacity: answerOpacity }} aria-hidden="true" />
          </motion.div>
        </div>

        {/* El punto de origen late hasta que empiezas a deslizar */}
        {!isStatic && gesto === "punto" && (
          <motion.div className="cine__seed" style={{ opacity: cueOpacity, top: `${ORIGEN_Y}%` }} aria-hidden="true">
            <span className="hero-move__seed-ring" />
          </motion.div>
        )}

        <motion.div className="cine__details" style={isStatic ? undefined : { opacity: detailsOpacity, pointerEvents: detailsPointer }}>
          <p className="cine__caption">{pie}</p>
          <div className="cine__actions">
            {esVideo && (
              <button type="button" className="cine__sound" onClick={toggleSound} aria-pressed={!muted}>
                {muted ? "Activar sonido" : "Silenciar"}
              </button>
            )}
            {cta.href ? (
              <a className="btn-inverted cine__cta" href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.texto}
              </a>
            ) : (
              <button type="button" className="btn-inverted cine__cta" onClick={cta.onClick}>
                {cta.texto}
              </button>
            )}
          </div>
        </motion.div>

        {!isStatic && (
          <motion.div className="cine__cue" style={{ opacity: cueOpacity }} aria-hidden="true">
            <span>Desliza</span>
            <span className="hero-move__cue-line" />
          </motion.div>
        )}

        {!isStatic && <motion.div className="hero-move__shade" style={{ opacity: shadeOpacity }} aria-hidden="true" />}
      </motion.div>
    </section>
  );
}

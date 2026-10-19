import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { VALORACION_WHATSAPP_URL } from "../data/valoracion";
import { onIntro, type IntroOrigin } from "../lib/intro";
import { useIsDesktop, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { MUELLE_SCROLL } from "../lib/movimiento";

/* ────────────────────────────────────────────
   Portada inmersiva
   1. Clic: el muelle del loader encaja y su punto se queda en pantalla.
   2. Respiración: el punto se abre como una lente, deja ver el cuerpo,
      se recoge y se desliza hasta el núcleo de la alumna.
   3. Scroll: desde ese núcleo la foto crece hasta llenar la escena.
   El texto nunca se apoya sobre el cuerpo: vive sobre crema al principio
   y sobre las cortinas (con velo) al final.
   ──────────────────────────────────────────── */

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/* Núcleo de la alumna (en % de la ventana) y radios de clip-path circle (en %):
   punto inicial, lente de la respiración, reposo y escena completa.
   En escritorio la ventana es el panel derecho (58vw): la foto vertical no se recorta. */
const SEED = {
  mobile: { x: 73, y: 57, dot: 0.7, breath: 14, rest: 1.6, end: 118 },
  desktop: { x: 54, y: 55, dot: 0.55, breath: 11, rest: 1.2, end: 112 },
};

const OPEN_END = 0.62;

/* El relato ocupa la primera parte del scroll de la sección; el resto es el telón:
   el capítulo siguiente sube sobre la portada mientras esta se hunde.
   (alto de la sección − 100 de telón − 100 de pantalla) / (alto − 100 de pantalla) */
const STORY_END = { mobile: 160 / 260, desktop: 180 / 280 };
const EASE_MOVE = [0.22, 1, 0.36, 1] as const;
const EASE_GLIDE = [0.65, 0, 0.35, 1] as const;

export default function HeroInmersivo() {
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const bornRef = useRef(false);
  const [isBorn, setIsBorn] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const seed = isDesktop ? SEED.desktop : SEED.mobile;
  const isStatic = prefersReducedMotion === true;
  const seedRef = useRef(seed);
  seedRef.current = seed;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Un muelle suave sobre el scroll: el movimiento llega con calma, sin tirones */
  const smooth = useSpring(scrollYProgress, MUELLE_SCROLL);
  const storyEndRef = useRef(STORY_END.mobile);
  storyEndRef.current = isDesktop ? STORY_END.desktop : STORY_END.mobile;
  const progress = useTransform(smooth, (value) => clamp01(value / storyEndRef.current));
  const sink = useTransform(smooth, (value) =>
    clamp01((value - storyEndRef.current) / (1 - storyEndRef.current)),
  );
  const stageScale = useTransform(sink, [0, 1], [1, 0.92]);
  const stageRadius = useTransform(sink, [0, 1], [0, 28]);
  const shadeOpacity = useTransform(sink, [0, 1], [0, 0.4]);

  /* Estado del punto: dónde está, cuánto mide y cuánto se ha desplazado la foto con él */
  const originX = useMotionValue(seed.x);
  const originY = useMotionValue(seed.y);
  const baseRadius = useMotionValue(0);
  const pictureX = useMotionValue(0);
  const pictureY = useMotionValue(0);

  const clipPath = useTransform(
    [progress, baseRadius, originX, originY],
    ([value, base, x, y]: number[]) => {
      /* Arranca despacio (el punto respira) y se abre con decisión al final */
      const eased = Math.pow(clamp01(value / OPEN_END), 2.2);
      return `circle(${lerp(base, seedRef.current.end, eased)}% at ${x}% ${y}%)`;
    },
  );
  const seedLeft = useTransform(originX, (x) => `${x}%`);
  const seedTop = useTransform(originY, (y) => `${y}%`);

  const imageScale = useTransform(progress, [0, 0.7], [1.15, 1]);
  const veilOpacity = useTransform(progress, [0.3, OPEN_END], [0, 1]);

  /* El titular llega a su sitio antes de que la foto lo alcance */
  const titleY = useTransform(progress, [0, 0.3], isDesktop ? ["22svh", "16svh"] : ["17svh", "0svh"]);
  const titleScale = useTransform(progress, [0, 0.3], isDesktop ? [0.62, 0.42] : [1, 0.56]);
  const pilatesX = useTransform(progress, [0, 0.15, 0.3], ["0%", "-6%", "0%"]);
  const reformerX = useTransform(progress, [0, 0.15, 0.3], ["0%", "6%", "0%"]);
  const eyebrowOpacity = useTransform(progress, [0.18, 0.32], [0, 1]);

  const cueOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const ctaOpacity = useTransform(progress, [0.55, 0.72], [0, 1]);
  const ctaY = useTransform(progress, [0.55, 0.72], [24, 0]);
  const ctaPointer = useTransform(ctaOpacity, (value) => (value > 0.5 ? "auto" : "none"));

  /* Nacimiento: espera al clic del muelle (o nace sola si no hay loader) */
  useEffect(() => {
    if (isStatic) return;

    const birth = (point: IntroOrigin) => {
      if (bornRef.current || !windowRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      bornRef.current = true;
      /* El formato real de la pantalla: al hidratar el HTML precompilado el primer
         render aún es el de móvil, y la portada puede nacer antes de corregirse */
      const seed = window.matchMedia("(min-width: 768px)").matches ? SEED.desktop : SEED.mobile;

      const rect = windowRef.current.getBoundingClientRect();
      const core = {
        x: rect.left + (seed.x / 100) * rect.width,
        y: rect.top + (seed.y / 100) * rect.height,
      };
      const from = point ?? core;
      const dx = from.x - core.x;
      const dy = from.y - core.y;

      /* El punto aparece donde encajó el muelle y la foto viaja con él,
         así lo que asoma por la lente es siempre el cuerpo, nunca el fondo */
      originX.set(seed.x + (dx / rect.width) * 100);
      originY.set(seed.y + (dy / rect.height) * 100);
      pictureX.set(dx);
      pictureY.set(dy);
      setIsBorn(true);

      animate(baseRadius, [0, seed.dot, seed.breath, seed.rest], {
        duration: 1.9,
        times: [0, 0.08, 0.5, 1],
        ease: ["easeOut", "easeInOut", "easeInOut"],
      });
      const glide = { duration: 1.3, delay: 0.25, ease: EASE_GLIDE };
      animate(originX, seed.x, glide);
      animate(originY, seed.y, glide);
      animate(pictureX, 0, glide);
      animate(pictureY, 0, glide);
    };

    const unsubscribe = onIntro(birth);
    /* Red de seguridad: si el loader no avisa, la portada nace igualmente */
    const fallback = window.setTimeout(() => birth(null), 4000);
    return () => {
      unsubscribe();
      window.clearTimeout(fallback);
    };
  }, [isStatic, originX, originY, baseRadius, pictureX, pictureY]);

  /* Si cambia el formato (móvil ↔ escritorio) después de nacer, el punto se recoloca */
  useEffect(() => {
    if (!bornRef.current) return;
    originX.set(seed.x);
    originY.set(seed.y);
    baseRadius.set(seed.rest);
  }, [seed, originX, originY, baseRadius]);

  const revealed = isStatic || isBorn;

  return (
    <section
      ref={sectionRef}
      className={`hero-move${isStatic ? " hero-move--static" : ""}`}
      aria-label="Portada"
    >
      <motion.div
        className="hero-move__stage"
        style={isStatic ? undefined : { scale: stageScale, borderRadius: stageRadius }}
      >
        <motion.div
          ref={windowRef}
          className="hero-move__window"
          style={isStatic ? undefined : { clipPath }}
        >
          <motion.picture
            className="hero-move__picture"
            style={
              isStatic
                ? undefined
                : {
                    x: pictureX,
                    y: pictureY,
                    scale: imageScale,
                    transformOrigin: `${seed.x}% ${seed.y}%`,
                  }
            }
          >
            <source
              type="image/webp"
              srcSet="/assets/move-portada-reformer-arco-900.webp 900w, /assets/move-portada-reformer-arco-1333.webp 1333w"
              sizes="(min-width: 768px) 58vw, 100vw"
            />
            <img
              src="/assets/move-portada-reformer-arco.jpg"
              alt="Alumna de MOVE en un estiramiento en arco sobre el Pilates Reformer, a contraluz en el estudio de Pozuelo"
              width={1333}
              height={2000}
              fetchPriority="high"
              decoding="async"
            />
          </motion.picture>
          {/* Velo claro bajo el titular: garantiza el contraste sobre la foto */}
          <motion.div
            className="hero-move__veil"
            style={isStatic ? undefined : { opacity: veilOpacity }}
            aria-hidden="true"
          />
        </motion.div>

        {!isStatic && isBorn && (
          <motion.div className="hero-move__seed" style={{ opacity: cueOpacity }} aria-hidden="true">
            <motion.span className="hero-move__seed-point" style={{ left: seedLeft, top: seedTop }}>
              <span className="hero-move__seed-impact" />
              <span className="hero-move__seed-ring" />
            </motion.span>
          </motion.div>
        )}

        <motion.h1
          className="hero-move__title"
          style={isStatic ? undefined : { y: titleY, scale: titleScale }}
        >
          <motion.span className="hero-move__eyebrow" style={isStatic ? undefined : { opacity: eyebrowOpacity }}>
            Tu centro de
          </motion.span>
          <motion.span className="hero-move__word" style={isStatic ? undefined : { x: pilatesX }}>
            <motion.span
              className="hero-move__word-inner"
              initial={isStatic ? false : { opacity: 0, x: "-12%" }}
              animate={revealed ? { opacity: 1, x: "0%" } : undefined}
              transition={{ duration: 1.6, delay: 0.7, ease: EASE_MOVE }}
            >
              Pilates
            </motion.span>
          </motion.span>
          <motion.span className="hero-move__word hero-move__word--italic" style={isStatic ? undefined : { x: reformerX }}>
            <motion.span
              className="hero-move__word-inner"
              initial={isStatic ? false : { opacity: 0, x: "12%" }}
              animate={revealed ? { opacity: 1, x: "0%" } : undefined}
              transition={{ duration: 1.6, delay: 0.85, ease: EASE_MOVE }}
            >
              Reformer
            </motion.span>
          </motion.span>
          <motion.span className="hero-move__place" style={isStatic ? undefined : { opacity: eyebrowOpacity }}>
            en Pozuelo de Alarcón
          </motion.span>
        </motion.h1>

        <motion.div
          className="hero-move__cta"
          style={isStatic ? undefined : { opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
        >
          <a
            href={VALORACION_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Reserva tu clase de prueba por WhatsApp"
            className="hero-move__button"
          >
            Reserva tu clase de prueba
          </a>
        </motion.div>

        {!isStatic && (
          <motion.div
            className="hero-move__cue-wrap"
            initial={{ opacity: 0 }}
            animate={isBorn ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.div className="hero-move__cue" style={{ opacity: cueOpacity }} aria-hidden="true">
              <span>Desliza</span>
              <span className="hero-move__cue-line" />
            </motion.div>
          </motion.div>
        )}
        {!isStatic && (
          <motion.div className="hero-move__shade" style={{ opacity: shadeOpacity }} aria-hidden="true" />
        )}
      </motion.div>
    </section>
  );
}

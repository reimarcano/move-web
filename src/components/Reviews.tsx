import React, { useEffect, useMemo, useRef, useState } from 'react';

/* Reseñas copiadas literalmente de la ficha de Google (revisadas el 19/10/2026):
   mismo texto, saltos de línea y erratas. La frase destacada es un fragmento literal;
   los puntos suspensivos marcan dónde se corta. No editar el texto: si cambia en Google,
   se vuelve a copiar. Orden: de lo que más se busca (grupos reducidos, Reformer, empezar,
   postparto…) a lo más general. */
const reviewsData = [
  {
    id: 'eriko',
    name: 'Eriko Pereira Villa',
    destacado: '…los grupos son reducidos de máximo 4 personas y siempre están pendientes de ti y de corregirte.',
    text: 'Llevo entrenando 1 mes en Move Pilates Boutique y estoy encantado, el espacio es acogedor, todo cuidado al detalle muy minimalista, aesthetic y en perfecto estado, además una de las cosas que más destaco es que los grupos son reducidos de máximo 4 personas y siempre están pendientes de ti y de corregirte.\n\nPor otro lado la coach, Génesis es una gran profesional, y está consiguiendo que verdaderamente me gusten y disfrute de las clases de pilates, haciendo que se me pase la hora volando.\n\nSin lugar a dudas recomiendo a cualquier persona que pruebe tanto pilates, como pilates en este centro porque le va a encantar!',
  },
  {
    id: 'elvira',
    name: 'Elvira Falco',
    destacado: 'El local es precioso y está impecable, lo que hace que entrenar sea un gusto.',
    text: '¡No puedo estar más feliz con este centro! El local es precioso y está impecable, lo que hace que entrenar sea un gusto. Las máquinas y el resto del equipamiento son de primerísima calidad.\nMención especial para Génesis; es una profesional increíble, atenta y técnica. Además, la gestión de cambios de clase es súper eficiente, algo que se agradece mucho. Desde que empecé con el Pilates Reformer aquí, mi salud ha dado un giro: ya no tengo dolores de espalda, mi postura ha mejorado notablemente y, como corredora, he notado un rendimiento mucho mayor en el running. ¡Recomendable al 100%!',
  },
  {
    id: 'zuly',
    name: 'Zuly Verastegui',
    destacado: '…te explica las posiciones acorde a tu nivel…',
    text: 'He ido a mi primera clase de pilates en este centro y que acierto, genesis es paciente y te explica las posiciones acorde a tu nivel, esta pendiente de que no te lesiones y ayudarte lo más posible a cumplir la posiciones, 100% recomendada',
  },
  {
    id: 'linette',
    name: 'Linette Dos Santos',
    destacado: 'Su profesionalidad y dedicación se nota en cada clase.',
    text: 'Genesis es excelente. Su profesionalidad y dedicación se nota en cada clase. El pilates fue clave en mi recuperación post parto. El centro es precioso y te hace sentir muy cómoda. Recomiendo al 100%',
  },
  {
    id: 'javier',
    name: 'Javier Montero Martínez',
    destacado: 'Adapta la sesión para cualquier tipo de público.',
    text: 'Génesis es una excelente profesional, guía la sesión de tal forma que se hace adictivo!! Adapta la sesión para cualquier tipo de público. Pienso que lo debería de probar todo el mundo!! Un abrazo,',
  },
  {
    id: 'adriana',
    name: 'Adriana Seijo',
    destacado: 'Génesis es una instructora excepcional: muy profesional, atenta y siempre pendiente de que hagas los ejercicios correctamente…',
    text: '¡Me encanta este centro de pilates! Desde el primer día, la experiencia ha sido increíble. Génesis es una instructora excepcional: muy profesional, atenta y siempre pendiente de que hagas los ejercicios correctamente, adaptándolos a tu nivel si es necesario. Transmite mucha confianza y motivación en cada clase.\n\nEl centro es precioso, muy cuidado y con un ambiente súper agradable que invita a desconectar y concentrarte en tu bienestar. Sin duda, es el lugar ideal para practicar pilates, mejorar tu condición física y sentirte mejor tanto por dentro como por fuera.\n\n¡Totalmente recomendable!',
  },
  {
    id: 'stephanie',
    name: 'Stephanie Lopez',
    destacado: 'La clase es deliciosa, dinámica, relajante y muy bien guiada.',
    text: 'Conocí este nuevo centro de pilates y me encantó. Es un lugar muy ameno, con una decoración y un ambiente que transmiten una paz increíble desde que entras. La clase es deliciosa, dinámica, relajante y muy bien guiada. Génesis, corrige con mucha atención y logra que disfrutes cada ejercicio. Tengo una lesión en la espalda y noto muchísimo cómo me está ayudando a mejorar. Sin duda, volveré.',
  },
  {
    id: 'luz-marina',
    name: 'Luz Marina Di Rubbo',
    destacado: 'Si pudiera dar más estrellas las daría!!',
    text: 'Si pudiera dar más estrellas las daría!! Quiero recomendar este estudio de pilates porque la experiencia ha sido excelente. Génesis es una instructora de pilates increíble, muy profesional, atenta y siempre pendiente de cada detalle durante la clase. Se nota que le gusta lo que hace y transmite mucha confianza.\nAdemás, el estudio es hermoso, muy cuidado y con un ambiente súper agradable y cómodo para entrenar. Sin duda, un lugar al que provoca volver 💛',
  },
  {
    id: 'alejandra',
    name: 'Alejandra Chavez',
    destacado: 'Con paciencia y calma, me ha guiado a mejorar en mis movimientos…',
    text: 'Las clases con Genesis son maravillosas. Con paciencia y calma, me ha guiado a mejorar en mis movimientos, conectando el cuerpo con la mente, y trabajando cada músculo de manera consciente. Estoy muy feliz con los avances, y agradecida por ser su alumna.',
  },
];

/* Ficha de Google por su identificador estable (sin parámetros de una búsqueda concreta) */
const GOOGLE_RESENAS_URL = 'https://www.google.com/maps?cid=7878401388043902058';

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label="Google">
    <title>Google</title>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const DWELL_MS = 8000;

/* Reseñas: una voz cada vez. Cada reseña se resume en una frase destacada (cita
   literal de la propia reseña) y el texto completo queda a un clic, en letra pequeña. Debajo, un raíl de segmentos finos
   (la misma gramática de filetes que el resto de la página) que avanza con calma y se pausa al pasar el
   ratón, al enfocar o al tocar. Se navega con los segmentos, deslizando o con ← →. Todas las reseñas comparten celda, así la altura
   es la de la más larga y nada salta al cambiar. */
export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = reviewsData.length;

  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* Avanza solo mientras se ve, sin pausa y sin preferencia de movimiento reducido */
  useEffect(() => {
    if (paused || expanded !== null || !inView || reduceMotion) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % total), DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, expanded, inView, reduceMotion, total]);

  const go = (index: number) => {
    setExpanded(null);
    setActive((index + total) % total);
  };

  /* Scroll lateral (trackpad o Mayús + rueda): un gesto = una reseña. Se acumula el
     desplazamiento horizontal y, al pasar de un umbral, se cambia y se bloquea un momento
     para que la inercia del trackpad no salte varias de golpe. El vertical no se toca. */
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let acumulado = 0;
    let bloqueadoHasta = 0;
    const onWheel = (event: WheelEvent) => {
      const dx = event.deltaX || (event.shiftKey ? event.deltaY : 0);
      if (Math.abs(dx) <= Math.abs(event.deltaY) && !event.shiftKey) return;
      event.preventDefault(); // evita el gesto de «atrás» del navegador
      const ahora = performance.now();
      if (ahora < bloqueadoHasta) return;
      acumulado += dx;
      if (Math.abs(acumulado) > 50) {
        const paso = acumulado > 0 ? 1 : -1;
        acumulado = 0;
        bloqueadoHasta = ahora + 700;
        setExpanded(null);
        setActive((current) => (current + paso + total) % total);
      }
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [total]);

  return (
    <section ref={sectionRef} className="m-section rv-section" aria-labelledby="resenas-titulo">
      <div className="m-head">
        <span className="m-eyebrow reveal">Reseñas en Google</span>
        <h2 id="resenas-titulo" className="m-title reveal reveal-delay-1">
          Lo que dicen <em>nuestros alumnos.</em>
        </h2>
        {/* Valoración de Google: logo y estrellas, sin nota numérica para que no se quede desactualizada */}
        <p className="rv-score reveal reveal-delay-2">
          <GoogleLogo />
          <span className="rv-stars" aria-label="Valoración de 5 estrellas en Google">
            {[0, 1, 2, 3, 4].map((star) => (
              <StarIcon key={star} size={12} />
            ))}
          </span>
        </p>
      </div>

      <div
        ref={stageRef}
        className="rv-stage reveal reveal-delay-2"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Reseñas de alumnos en Google"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') go(active + 1);
          if (event.key === 'ArrowLeft') go(active - 1);
        }}
        onTouchStart={(event) => {
          touchX.current = event.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(event) => {
          if (touchX.current !== null) {
            const dx = event.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
          }
          touchX.current = null;
        }}
      >
        <div className="rv-quotes">
          {reviewsData.map((review, index) => (
            <figure
              key={review.id}
              className={`rv-quote${index === active ? ' is-active' : ''}`}
              aria-hidden={index !== active}
              aria-roledescription="reseña"
              aria-label={`${index + 1} de ${total}`}
            >
              {/* Frase destacada: una cita literal de la propia reseña */}
              <blockquote cite={GOOGLE_RESENAS_URL}>
                <p className="rv-highlight">{review.destacado}</p>
              </blockquote>
              <figcaption>
                <span className="rv-name">{review.name}</span>
                <span className="rv-source">Reseña en Google</span>
              </figcaption>
              <details className="rv-full" open={expanded === index} onToggle={(event) => {
                const isOpen = (event.currentTarget as HTMLDetailsElement).open;
                setExpanded(isOpen ? index : (current) => (current === index ? null : current));
              }}>
                <summary>Leer reseña completa</summary>
                <p>{review.text}</p>
              </details>
            </figure>
          ))}
        </div>

        {/* Raíl: un segmento de línea por reseña; el de la que está sonando se oscurece */}
        <div className="rv-rail">
          <ol className="rv-nodes">
            {reviewsData.map((review, index) => (
              <li key={review.id}>
                <button
                  type="button"
                  className={`rv-node${index <= active ? ' is-on' : ''}${index === active ? ' is-active' : ''}`}
                  onClick={() => go(index)}
                  aria-label={`Ver la reseña de ${review.name}`}
                  aria-current={index === active ? 'true' : undefined}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="m-foot reveal">
        <a
          href={GOOGLE_RESENAS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex items-center justify-center gap-2 w-fit whitespace-nowrap px-5 text-micro tracking-[0.09em] sm:px-8 sm:text-label sm:tracking-[0.12em]"
        >
          <GoogleLogo />
          Ver todas las reseñas en Google
        </a>
      </div>
    </section>
  );
}

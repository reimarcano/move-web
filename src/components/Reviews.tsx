import React, { useEffect, useMemo, useRef, useState } from 'react';

const allReviews = [
  {
    id: 1,
    name: 'Irene Jiménez Pérez',
    destacado: 'Génesis es una gran instructora, muy pendiente de todos los alumnos.',
    initial: 'I',
    rating: 5,
    text: 'Encantada con Move! Génesis es una gran instructora, muy pendiente de todos los alumnos para darles una atención personalizada y las clases son variadas y dinámicas. Además el estudio es precioso!!',
  },
  {
    id: 2,
    name: 'Reinaldo Marcano',
    destacado: 'Gracias a Génesis, he notado mucha mejoría en mis dolores de rodillas y de espalda.',
    initial: 'R',
    rating: 5,
    text: 'Las clases en Move Pilates Boutique en Pozuelo, son en grupos muy reducidos, lo que permite un trato súper personalizado. Gracias a Génesis, he notado mucha mejoría en mis dolores de rodillas y de espalda. El estudio es muy acogedor y dispone de vestuarios con duchas. Si buscas un estudio de pilates de calidad en Madrid, este es el lugar. Lo recomiendo al 100%',
  },
  {
    id: 3,
    name: 'Melanie Previdi',
    destacado: 'Un espacio limpio, ordenado, máquinas en perfecto estado.',
    initial: 'M',
    rating: 5,
    text: 'Es un centro realmente profesional. Un espacio limpio, ordenado, máquinas en perfecto estado. Clases reducidas que permite que la instructora tenga con cada alumno mucha atención al detalle. Perfecto para aparcar.',
  },
  {
    id: 4,
    name: 'Eriko Pereira Villa',
    destacado: 'Los grupos son reducidos de máximo 4 personas y siempre están pendientes de ti y de corregirte.',
    initial: 'E',
    rating: 5,
    text: 'Llevo entrenando 1 mes en Move Pilates Boutique y estoy encantado. El espacio es acogedor, todo cuidado al detalle y en perfecto estado. Destaco que los grupos son reducidos de máximo 4 personas y siempre están pendientes de ti y de corregirte. Génesis es una gran profesional y ha conseguido que disfrute de las clases de pilates.',
  },
  {
    id: 5,
    name: 'Adriana Seijo',
    destacado: 'El centro es precioso, muy cuidado y con un ambiente agradable que invita a desconectar.',
    initial: 'A',
    rating: 5,
    text: '¡Me encanta este centro de pilates! Génesis es una instructora excepcional: muy profesional, atenta y siempre pendiente de que hagas los ejercicios correctamente, adaptándolos a tu nivel si es necesario. El centro es precioso, muy cuidado y con un ambiente agradable que invita a desconectar y concentrarte en tu bienestar.',
  },
  {
    id: 6,
    name: 'Luz Marina Di Rubbo',
    destacado: 'Génesis es una instructora increíble, muy profesional, atenta y siempre pendiente de cada detalle.',
    initial: 'L',
    rating: 5,
    text: 'Quiero recomendar este estudio de pilates porque la experiencia ha sido excelente. Génesis es una instructora increíble, muy profesional, atenta y siempre pendiente de cada detalle durante la clase. El estudio es hermoso, muy cuidado y con un ambiente súper agradable y cómodo para entrenar.',
  },
  {
    id: 7,
    name: 'Stephanie Lopez',
    destacado: 'La clase es deliciosa, dinámica, relajante y muy bien guiada.',
    initial: 'S',
    rating: 5,
    text: 'Conocí este nuevo centro de pilates y me encantó. La clase es deliciosa, dinámica, relajante y muy bien guiada. Génesis corrige con mucha atención y logra que disfrutes cada ejercicio. Tengo una lesión en la espalda y noto muchísimo cómo me está ayudando a mejorar.',
  },
  {
    id: 8,
    name: 'Dayana Perez',
    destacado: 'Sigue siendo mi lugar seguro: me siento cuidada, escuchada y guiada.',
    initial: 'D',
    rating: 5,
    text: 'Este centro de pilates ha sido un regalo en mi vida. Me acompañó durante el embarazo, ayudándome a mantenerme activa y conectar con mi cuerpo. Ahora, en el postparto, sigue siendo mi lugar seguro: me siento cuidada, escuchada y guiada. Es un espacio de bienestar físico y emocional.',
  },
  {
    id: 9,
    name: 'Miriam Moros',
    destacado: 'Sin duda el mejor sitio para hacer pilates en Madrid.',
    initial: 'M',
    rating: 5,
    text: 'Sin duda el mejor sitio para hacer pilates en Madrid. Las clases, Génesis y el espacio son increíbles: perfectos para desconectar y relajarse mientras haces deporte. Es mi sitio de confianza.',
  },
];

// Ordenado por cobertura de intención de búsqueda; Reinaldo queda al final por indicación de MOVE.
const reviewsData = [
  allReviews[3], // Move Pilates Boutique, grupos reducidos y clases de pilates
  allReviews[7], // Pilates en embarazo y postparto
  allReviews[6], // Pilates y trabajo de espalda
  allReviews[4], // Centro de pilates y adaptación al nivel
  allReviews[8], // Pilates en Madrid
  allReviews[5], // Estudio de pilates y atención al detalle
  allReviews[0], // Atención personalizada y clases dinámicas
  allReviews[2], // Centro profesional y clases reducidas
  allReviews[1], // Reinaldo Marcano, última posición solicitada
];

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

  return (
    <section ref={sectionRef} className="m-section rv-section" aria-labelledby="resenas-titulo">
      <div className="m-head">
        <span className="m-eyebrow reveal">Reseñas en Google</span>
        <h2 id="resenas-titulo" className="m-title reveal reveal-delay-1">
          Lo que dicen <em>nuestros alumnos.</em>
        </h2>
        <p className="m-dato rv-score reveal reveal-delay-2">
          <span className="m-dato-label">Google</span>
          <span className="m-dato-leader" aria-hidden="true" />
          <span className="m-dato-value">
            5,0
            <span className="rv-stars" aria-label="5 estrellas">
              {[0, 1, 2, 3, 4].map((star) => (
                <StarIcon key={star} size={11} />
              ))}
            </span>
          </span>
        </p>
      </div>

      <div
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
              <blockquote cite="https://www.google.com/maps">
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
          href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd4187ede06d0267:0x6d55b452244d1c6a?sa=X&ved=1t:8290&ictx=111"
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

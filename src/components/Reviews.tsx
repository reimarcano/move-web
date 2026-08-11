import React, { useEffect, useMemo, useRef, useState } from 'react';

const allReviews = [
  {
    id: 1,
    name: 'Irene Jiménez Pérez',
    initial: 'I',
    rating: 5,
    text: 'Encantada con Move! Génesis es una gran instructora, muy pendiente de todos los alumnos para darles una atención personalizada y las clases son variadas y dinámicas. Además el estudio es precioso!!',
  },
  {
    id: 2,
    name: 'Reinaldo Marcano',
    initial: 'R',
    rating: 5,
    text: 'Las clases en Move Pilates Boutique en Pozuelo, son en grupos muy reducidos, lo que permite un trato súper personalizado. Gracias a Génesis, he notado mucha mejoría en mis dolores de rodillas y de espalda. El estudio es muy acogedor y dispone de vestuarios con duchas. Si buscas un estudio de pilates de calidad en Madrid, este es el lugar. Lo recomiendo al 100%',
  },
  {
    id: 3,
    name: 'Melanie Previdi',
    initial: 'M',
    rating: 5,
    text: 'Es un centro realmente profesional. Un espacio limpio, ordenado, máquinas en perfecto estado. Clases reducidas que permite que la instructora tenga con cada alumno mucha atención al detalle. Perfecto para aparcar.',
  },
  {
    id: 4,
    name: 'Eriko Pereira Villa',
    initial: 'E',
    rating: 5,
    text: 'Llevo entrenando 1 mes en Move Pilates Boutique y estoy encantado. El espacio es acogedor, todo cuidado al detalle y en perfecto estado. Destaco que los grupos son reducidos de máximo 4 personas y siempre están pendientes de ti y de corregirte. Génesis es una gran profesional y ha conseguido que disfrute de las clases de pilates.',
  },
  {
    id: 5,
    name: 'Adriana Seijo',
    initial: 'A',
    rating: 5,
    text: '¡Me encanta este centro de pilates! Génesis es una instructora excepcional: muy profesional, atenta y siempre pendiente de que hagas los ejercicios correctamente, adaptándolos a tu nivel si es necesario. El centro es precioso, muy cuidado y con un ambiente agradable que invita a desconectar y concentrarte en tu bienestar.',
  },
  {
    id: 6,
    name: 'Luz Marina Di Rubbo',
    initial: 'L',
    rating: 5,
    text: 'Quiero recomendar este estudio de pilates porque la experiencia ha sido excelente. Génesis es una instructora increíble, muy profesional, atenta y siempre pendiente de cada detalle durante la clase. El estudio es hermoso, muy cuidado y con un ambiente súper agradable y cómodo para entrenar.',
  },
  {
    id: 7,
    name: 'Stephanie Lopez',
    initial: 'S',
    rating: 5,
    text: 'Conocí este nuevo centro de pilates y me encantó. La clase es deliciosa, dinámica, relajante y muy bien guiada. Génesis corrige con mucha atención y logra que disfrutes cada ejercicio. Tengo una lesión en la espalda y noto muchísimo cómo me está ayudando a mejorar.',
  },
  {
    id: 8,
    name: 'Dayana Perez',
    initial: 'D',
    rating: 5,
    text: 'Este centro de pilates ha sido un regalo en mi vida. Me acompañó durante el embarazo, ayudándome a mantenerme activa y conectar con mi cuerpo. Ahora, en el postparto, sigue siendo mi lugar seguro: me siento cuidada, escuchada y guiada. Es un espacio de bienestar físico y emocional.',
  },
  {
    id: 9,
    name: 'Miriam Moros',
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

type Review = (typeof reviewsData)[number];

const ReviewCard: React.FC<{
  review: Review;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
}> = ({ review, index, isExpanded, onExpand }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [review.text]);

  return (
    <article
      role="listitem"
      aria-label={`Reseña de ${review.name}`}
      className={`h-full bg-white border border-tostado rounded-[12px] card-padding shadow-[0_2px_16px_rgba(73,53,35,0.06)] transition-[min-height] duration-300 ${isExpanded ? 'min-h-[460px] md:min-h-[500px]' : 'min-h-[330px] md:min-h-[360px]'} reveal reveal-delay-${(index % 5) + 1}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-tostado flex items-center justify-center" aria-hidden="true">
            <span className="font-serif text-[16px] text-marron-move leading-none">{review.initial}</span>
          </div>
          <p className="font-sans text-[13px] text-marron-move font-normal leading-none mb-0">{review.name}</p>
        </div>
        <div className="opacity-60 w-4 h-4"><GoogleLogo /></div>
      </div>

      <div className="flex gap-[2px] mt-4" aria-label={`Calificación de ${review.rating} estrellas`}>
        {[...Array(review.rating)].map((_, starIndex) => (
          <StarIcon key={starIndex} size={12} className="text-marron-move" />
        ))}
      </div>

      <div className="mt-3">
        <p ref={textRef} className={`font-sans text-[14px] text-texto-move leading-[1.75] ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {review.text}
        </p>
        {isTruncated && !isExpanded && (
          <button
            type="button"
            onClick={onExpand}
            className="font-sans text-[12px] text-marron-move mt-1 hover:underline focus:outline-none"
            aria-expanded="false"
            aria-label={`Leer más sobre la reseña de ${review.name}`}
          >
            leer más
          </button>
        )}
      </div>
    </article>
  );
};

export default function Reviews() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [reviewsPerSlide, setReviewsPerSlide] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3));
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlides, setExpandedSlides] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const updateReviewsPerSlide = () => setReviewsPerSlide(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener('resize', updateReviewsPerSlide);
    return () => window.removeEventListener('resize', updateReviewsPerSlide);
  }, []);

  const slides = useMemo(() => Array.from(
    { length: Math.ceil(reviewsData.length / reviewsPerSlide) },
    (_, index) => reviewsData.slice(index * reviewsPerSlide, (index + 1) * reviewsPerSlide),
  ), [reviewsPerSlide]);

  useEffect(() => setActiveSlide(0), [reviewsPerSlide]);

  const goToSlide = (slideIndex: number) => {
    carouselRef.current?.scrollTo({ left: carouselRef.current.clientWidth * slideIndex, behavior: 'smooth' });
  };

  return (
    <section className="bg-crema-base section-padding-claro px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-section-md reveal">
          <h2 className="font-serif italic text-marron-move text-[24px] md:text-[32px] font-normal mb-0">Lo que dicen nuestros alumnos</h2>
        </div>

        <div className="w-[60px] h-[1px] bg-tostado mx-auto mb-section-md reveal" />

        <div
          ref={carouselRef}
          role="region"
          aria-label="Galería de reseñas de Google"
          className="flex overflow-x-auto scroll-smooth scroll-snap-x-mandatory no-scrollbar pb-2"
          onScroll={(event) => {
            const { scrollLeft, clientWidth } = event.currentTarget;
            if (clientWidth) setActiveSlide(Math.round(scrollLeft / clientWidth));
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} role="list" className="min-w-full px-3 scroll-snap-align-start grid auto-rows-fr grid-cols-1 md:grid-cols-3 gap-6">
              {slide.map((review, reviewIndex) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  index={slideIndex * reviewsPerSlide + reviewIndex}
                  isExpanded={expandedSlides.has(slideIndex)}
                  onExpand={() => setExpandedSlides((current) => new Set(current).add(slideIndex))}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6" aria-label="Navegación de reseñas">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              type="button"
              onClick={() => goToSlide(slideIndex)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-marron-move focus-visible:ring-offset-2 ${activeSlide === slideIndex ? 'w-5 bg-marron-move' : 'w-2 bg-tostado hover:bg-marron-move'}`}
              aria-label={`Ir a las reseñas ${slideIndex * reviewsPerSlide + 1} a ${Math.min((slideIndex + 1) * reviewsPerSlide, reviewsData.length)}`}
              aria-current={activeSlide === slideIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <div className="mt-section-md text-center reveal">
          <a
            href="https://www.google.com/maps/place//data=!4m2!3m1!1s0xd4187ede06d0267:0x6d55b452244d1c6a?sa=X&ved=1t:8290&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center justify-center gap-2 mx-auto w-fit"
          >
            <GoogleLogo />
            Ver todas las reseñas en Google
          </a>
        </div>
      </div>
    </section>
  );
}

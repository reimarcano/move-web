import React, { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: "Irene Jiménez Pérez",
    initial: "I",
    rating: 5,
    text: "Encantada con Move! Génesis es una gran instructora, muy pendiente de todos los alumnos para darles una atención personalizada y las clases son variadas y dinámicas. Además el estudio es precioso!!"
  },
  {
    id: 2,
    name: "Reinaldo Marcano",
    initial: "R",
    rating: 5,
    text: "Las clases en Move Pilates Boutique en Pozuelo, son en grupos muy reducidos, lo que permite un trato súper personalizado. Gracias a Génesis, he notado mucha mejoría en mis dolores de rodillas y de espalda. El estudio es muy acogedor y dispone de vestuarios con duchas. Si buscas un estudio de pilates de calidad en Madrid, este es el lugar. Lo recomiendo al 100%"
  },
  {
    id: 3,
    name: "Melanie Previdi",
    initial: "M",
    rating: 5,
    text: "Es un centro realmente profesional. Un espacio limpio, ordenado, máquinas en perfecto estado. Clases reducidas que permite que la instructora tenga con cada alumno mucha atención al detalle. Perfecto para aparcar."
  }
];

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label="Google">
    <title>Google</title>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface StarIconProps {
  size?: number;
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

interface ReviewCardProps {
  review: typeof reviewsData[0];
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsTruncated(scrollHeight > clientHeight);
    }
  }, [review.text]);

  return (
    <div 
      role="listitem"
      aria-label={`Reseña de ${review.name}`}
      className={`bg-white border border-tostado rounded-[12px] card-padding shadow-[0_2px_16px_rgba(73,53,35,0.06)] w-full reveal reveal-delay-${index + 1}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-tostado flex items-center justify-center" aria-hidden="true">
            <span className="font-serif text-[16px] text-marron-move leading-none">{review.initial}</span>
          </div>
          <div>
            <p className="font-sans text-[13px] text-marron-move font-normal leading-none">{review.name}</p>
          </div>
        </div>
        <div className="opacity-60 w-4 h-4">
          <GoogleLogo />
        </div>
      </div>

      <div className="flex gap-[2px] mt-4" aria-label={`Calificación de ${review.rating} estrellas`}>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={12} className="text-marron-move" />
        ))}
      </div>

      <div className="mt-3">
        <p 
          ref={textRef}
          className={`font-sans text-[14px] text-texto-move leading-[1.75] ${!isExpanded ? 'line-clamp-3' : ''}`}
        >
          {review.text}
        </p>
        {isTruncated && !isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="font-sans text-[12px] text-marron-move mt-1 hover:underline focus:outline-none"
            aria-expanded="false"
            aria-label={`Leer más sobre la reseña de ${review.name}`}
          >
            leer más
          </button>
        )}
      </div>
    </div>
  );
};

export default function Reviews() {
  const googleBusinessUrl = "https://www.google.com/maps/place//data=!4m2!3m1!1s0xd4187ede06d0267:0x6d55b452244d1c6a?sa=X&ved=1t:8290&ictx=111";

  useEffect(() => {
    // Schema Markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'reviews-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "MOVE Pilates Boutique",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "27",
        "bestRating": "5"
      }
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('reviews-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="bg-crema-base section-padding-claro px-6">
      <div className="max-w-[1000px] mx-auto">
        {/* Title Row */}
        <div className="text-center mb-section-md reveal">
          <h2 className="font-serif italic text-marron-move text-[24px] md:text-[32px] font-normal mb-0">
            Lo que dicen nuestros alumnos
          </h2>
        </div>

        {/* Separator */}
        <div className="w-[60px] h-[1px] bg-tostado mx-auto mb-section-md reveal"></div>

        {/* Reviews Cards */}
        <div 
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 md:pb-0"
        >
          {reviewsData.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
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

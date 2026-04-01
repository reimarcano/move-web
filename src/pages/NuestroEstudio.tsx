import React, { useState, useEffect, useCallback, useRef } from 'react';

// Gallery 1: Nuestro Espacio
const espacioImages = [
  '/assets/01-move-pilates-pozuelo.jpg',
  '/assets/02-move-pilates-pozuelo.jpg',
  '/assets/03-move-pilates-pozuelo.jpg',
  '/assets/04-move-pilates-pozuelo.jpg',
  '/assets/05-move-pilates-pozuelo.jpg',
  '/assets/06-move-pilates-pozuelo.jpg',
  '/assets/07-move-pilates-pozuelo.jpg',
  '/assets/08-move-pilates-pozuelo.jpg',
  '/assets/09-move-pilates-pozuelo.jpg',
];

// Gallery 2: Nuestras Clases
const clasesImages = [
  '/assets/move-pilates-madrid-01.jpg',
  '/assets/move-pilates-madrid-02.jpg',
  '/assets/move-pilates-madrid-03.jpg',
  '/assets/move-pilates-madrid-04.jpg',
  '/assets/move-pilates-madrid-05.jpg',
  '/assets/move-pilates-madrid-06.jpg',
  '/assets/move-pilates-madrid-07.jpg',
  '/assets/move-pilates-madrid-08.jpg',
  '/assets/move-pilates-madrid-09.jpg',
  '/assets/move-pilates-madrid-10.jpg',
  '/assets/move-pilates-madrid-11.jpg',
  '/assets/move-pilates-madrid-12.jpg',
  '/assets/move-pilates-madrid-13.jpg',
  '/assets/move-pilates-madrid-14.jpg',
  '/assets/move-pilates-madrid-15.jpg',
];

export default function NuestroEstudio() {
  const [isEspacioExpanded, setIsEspacioExpanded] = useState(false);
  const [isClasesExpanded, setIsClasesExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; index: number; alt: string }>({
    isOpen: false,
    images: [],
    index: 0,
    alt: '',
  });

  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openLightbox = (images: string[], index: number, alt: string) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setLightbox({ isOpen: true, images, index, alt });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, []);

  const nextImage = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  }, []);

  const prevImage = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
  }, []);

  useEffect(() => {
    if (lightbox.isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [lightbox.isOpen]);

  useEffect(() => {
    const images = document.querySelectorAll('.gallery-img');
    images.forEach((img: any) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => {
          img.style.background = '#D8D0BF';
          img.style.opacity = '1';
        });
      }
    });
  }, [isEspacioExpanded, isClasesExpanded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      
      // Focus trapping
      if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const lightboxElements = Array.from(focusableElements).filter(el => 
          document.getElementById('lightbox-container')?.contains(el)
        );
        
        if (lightboxElements.length > 0) {
          const firstElement = lightboxElements[0] as HTMLElement;
          const lastElement = lightboxElements[lightboxElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, nextImage, prevImage]);

  // Mobile Swipe Support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const espacioAlt = "Sala de Pilates Reformer · MOVE Pilates Boutique · Pozuelo de Alarcón";
  const clasesAlt = "Clase de Pilates Reformer · MOVE · Pozuelo de Alarcón · Madrid";

  return (
    <div className="bg-[#F6F3EC] min-h-screen font-sans selection:bg-[#493523] selection:text-[#F6F3EC]">
      {/* H1 — ENCABEZADO PRINCIPAL */}
      <section className="pt-[80px] pb-[60px] md:pt-[80px] md:pb-[60px] px-6 md:px-0 text-center reveal">
        <h1 className="font-serif text-[#493523] text-[32px] md:text-[48px] font-normal leading-tight">
          Un espacio para <span className="italic">conectarte.</span>
        </h1>
        <p className="font-sans text-[#7F7763] text-[14px] md:text-[15px] max-w-[560px] mx-auto leading-[1.85] mt-6 mb-0">
          Cada detalle de MOVE está pensado para que te sientas a gusto, en confianza y presente desde el momento en que entras.
        </p>
      </section>

      {/* SECCIÓN 1 — NUESTRO ESPACIO */}
      <section className="px-6 md:px-[8%] mb-[60px] md:mb-[100px]">
        <div className="reveal">
          <span className="font-sans text-[#7F7763] text-[10px] uppercase tracking-[0.18em] mb-4 block">
            NUESTRO ESPACIO
          </span>
          <h2 className="font-serif text-[#493523] text-[24px] md:text-[32px] font-normal leading-tight">
            Diseñado para que te sientas <span className="italic">bien.</span>
          </h2>
          <div className="w-10 h-[1px] bg-[#D8D0BF] mt-6 mb-8"></div>
        </div>

        {/* GRID — NUESTRO ESPACIO */}
        <div className="reveal">
          <div className="grid grid-cols-2 gap-2 md:gap-[10px] mb-2 md:mb-[10px]" role="list" aria-label="Galería de fotos de nuestro espacio">
            {espacioImages.slice(0, 4).map((src, idx) => (
              <button 
                key={idx} 
                role="listitem"
                className="relative overflow-hidden group rounded-[3px] aspect-[3/4] cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
                onClick={() => openLightbox(espacioImages, idx, espacioAlt)}
                aria-label={`Ver foto ${idx + 1} de nuestro espacio`}
              >
                <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover:opacity-15 transition-opacity duration-400 z-10"></div>
                <img
                  src={src}
                  alt={espacioAlt}
                  className="gallery-img w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
          
          {isEspacioExpanded && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-[10px] mt-2 md:mt-[10px] animate-fadeIn" role="list" aria-label="Más fotos de nuestro espacio">
              {espacioImages.slice(4).map((src, idx) => (
                <button 
                  key={idx + 4} 
                  role="listitem"
                  className="relative overflow-hidden group rounded-[3px] aspect-[3/4] cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
                  onClick={() => openLightbox(espacioImages, idx + 4, espacioAlt)}
                  aria-label={`Ver foto ${idx + 5} de nuestro espacio`}
                >
                  <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover:opacity-15 transition-opacity duration-400 z-10"></div>
                  <img
                    src={src}
                    alt={espacioAlt}
                    className="gallery-img w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsEspacioExpanded(!isEspacioExpanded)}
              aria-expanded={isEspacioExpanded}
              className="bg-transparent text-[#493523] border-[1.5px] border-[#493523] rounded-full px-7 py-3 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-[#493523] hover:text-[#F6F3EC] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
            >
              {isEspacioExpanded ? 'VER MENOS' : 'VER TODAS LAS FOTOS'}
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — NUESTRAS CLASES */}
      <section className="px-6 md:px-[8%] mt-[60px] md:mt-[100px] mb-[60px] md:mb-[100px]">
        <div className="reveal">
          <span className="font-sans text-[#7F7763] text-[10px] uppercase tracking-[0.18em] mb-4 block">
            NUESTRAS CLASES
          </span>
          <h2 className="font-serif text-[#493523] text-[24px] md:text-[32px] font-normal leading-tight">
            El movimiento en <span className="italic">cada sesión.</span>
          </h2>
          <div className="w-10 h-[1px] bg-[#D8D0BF] mt-6 mb-8"></div>
        </div>

        {/* GRID — NUESTRAS CLASES */}
        <div className="reveal">
          <div className="grid grid-cols-2 gap-2 md:gap-[10px] mb-2 md:mb-[10px]" role="list" aria-label="Galería de fotos de nuestras clases">
            {clasesImages.slice(0, 4).map((src, idx) => (
              <button 
                key={idx} 
                role="listitem"
                className="relative overflow-hidden group rounded-[3px] aspect-[3/4] cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
                onClick={() => openLightbox(clasesImages, idx, clasesAlt)}
                aria-label={`Ver foto ${idx + 1} de nuestras clases`}
              >
                <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover:opacity-15 transition-opacity duration-400 z-10"></div>
                <img
                  src={src}
                  alt={clasesAlt}
                  className="gallery-img w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {isClasesExpanded && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-[10px] mt-2 md:mt-[10px] animate-fadeIn" role="list" aria-label="Más fotos de nuestras clases">
              {clasesImages.slice(4).map((src, idx) => (
                <button 
                  key={idx + 4} 
                  role="listitem"
                  className="relative overflow-hidden group rounded-[3px] aspect-[3/4] cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
                  onClick={() => openLightbox(clasesImages, idx + 4, clasesAlt)}
                  aria-label={`Ver foto ${idx + 5} de nuestras clases`}
                >
                  <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover:opacity-15 transition-opacity duration-400 z-10"></div>
                  <img
                    src={src}
                    alt={clasesAlt}
                    className="gallery-img w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsClasesExpanded(!isClasesExpanded)}
              aria-expanded={isClasesExpanded}
              className="bg-transparent text-[#493523] border-[1.5px] border-[#493523] rounded-full px-7 py-3 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-[#493523] hover:text-[#F6F3EC] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
            >
              {isClasesExpanded ? 'VER MENOS' : 'VER TODAS LAS FOTOS'}
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — QUIÉN TE GUÍA */}
      <section className="mt-[60px] md:mt-[100px] reveal">
        <div className="flex flex-col md:flex-row w-full min-h-[560px]">
          {/* COLUMNA IZQUIERDA — FOTO GÉNESIS */}
          <div className="w-full md:w-1/2 h-[380px] md:h-auto overflow-hidden">
            <img
              src="/assets/GENESIS%20ROMERO.jpg"
              alt="Génesis Romero · Fundadora e instructora de MOVE Pilates Boutique · Pozuelo de Alarcón"
              className="gallery-img w-full h-full object-cover object-top"
              loading="lazy"
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* COLUMNA DERECHA */}
          <div className="w-full md:w-1/2 bg-[#D8D0BF] p-8 md:p-14 flex flex-col justify-center">
            <span className="font-sans text-[#7F7763] text-[10px] uppercase tracking-[0.15em] block">
              FUNDADORA E INSTRUCTORA
            </span>
            <div className="w-7 h-[1px] bg-[#7F7763] my-4"></div>
            <h3 className="font-serif text-[#493523] text-[26px] font-normal leading-tight mb-5">
              Génesis Romero
            </h3>
            <p className="font-sans text-[#493523] text-[14px] md:text-[15px] leading-[1.85] mb-0">
              Instructora y fundadora de Move Pilates boutique en Pozuelo de Alarcón. Cada clase que diseña parte de una convicción: que moverse bien cambia cómo te sientes, cómo te mueves y cómo te habitas a ti mismo.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-[60px] md:mt-[100px] py-[56px] md:py-[80px] px-6 md:px-[8%] text-center reveal">
        <h3 className="font-sans text-[#493523] text-[14px] mb-6 font-normal">
          ¿Quieres conocer el estudio en persona?
        </h3>
        <a
          href="https://wa.me/34654495508"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-[#493523] text-[#F6F3EC] border-[1.5px] border-[#493523] rounded-full px-8 py-3.5 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-transparent hover:text-[#493523] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC] focus-visible:ring-offset-2"
          aria-label="Escríbenos por WhatsApp para más información"
        >
          ESCRÍBENOS
        </a>
      </section>

      {/* LIGHTBOX COMPARTIDO */}
      {lightbox.isOpen && (
        <div 
          id="lightbox-container"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
          className="fixed inset-0 z-[9999] bg-[rgba(73,53,35,0.96)] flex items-center justify-center animate-fadeIn group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close Button */}
          <button 
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="fixed top-4 right-4 md:top-5 md:right-6 w-12 h-12 flex items-center justify-center z-[10001] bg-[rgba(246,243,236,0.10)] border border-[rgba(246,243,236,0.20)] rounded-full backdrop-blur-[4px] cursor-pointer transition-all duration-200 hover:bg-[rgba(246,243,236,0.20)] hover:border-[rgba(246,243,236,0.40)] hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC]"
            aria-label="Cerrar visor de imágenes"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Navigation Buttons (Desktop Only) */}
          <button 
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center z-[10000] bg-[rgba(246,243,236,0.10)] border border-[rgba(246,243,236,0.20)] rounded-full backdrop-blur-[4px] cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[rgba(246,243,236,0.20)] hover:border-[rgba(246,243,236,0.40)] hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC]"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Imagen anterior"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 14L6 9L11 4" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center z-[10000] bg-[rgba(246,243,236,0.10)] border border-[rgba(246,243,236,0.20)] rounded-full backdrop-blur-[4px] cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-[rgba(246,243,236,0.20)] hover:border-[rgba(246,243,236,0.40)] hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC]"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Imagen siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Image */}
          <div className="relative max-w-[92vw] md:max-w-[50vw] max-h-[85vh] md:max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.images[lightbox.index]}
              alt={`${lightbox.alt} - Imagen ${lightbox.index + 1} de ${lightbox.images.length}`}
              className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-[2px] animate-imageFade"
            />
          </div>

          {/* Counter */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] text-[#D8D0BF] tracking-[0.1em]" aria-live="polite">
            {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      )}

      <style>{`
        .gallery-img {
          background-color: #D8D0BF;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .gallery-img.loaded {
          opacity: 1;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes imageFade {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-imageFade {
          animation: imageFade 0.2s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn, .animate-imageFade, .reveal {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

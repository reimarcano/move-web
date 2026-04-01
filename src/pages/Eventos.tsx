import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

// --- Components ---

interface GalleryImage {
  url: string;
  alt: string;
  type: 'image' | 'video';
}


// --- Components ---

interface GalleryItem {
  url: string;
  type: 'image' | 'video';
}

const EditorialGallery = ({ 
  videoUrl, 
  images, 
  videoFallbackImage, 
  excludeVideoFromLightbox = false,
  customAlt,
  isRetiro = false,
  isBrunch = false
}: { 
  videoUrl?: string; 
  images: string[]; 
  videoFallbackImage?: string;
  excludeVideoFromLightbox?: boolean;
  customAlt?: string;
  isRetiro?: boolean;
  isBrunch?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; index: number }>({
    isOpen: false,
    index: 0,
  });

  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const imageItems = images.map(url => ({ url, type: 'image' as const }));
  
  const items: GalleryItem[] = [];
  if (videoUrl) {
    if (!excludeVideoFromLightbox) {
      items.push({ url: videoUrl, type: 'video' });
    }
  } else if (videoFallbackImage) {
    items.push({ url: videoFallbackImage, type: 'image' });
  }
  items.push(...imageItems);

  const openLightbox = (index: number) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setLightbox({ isOpen: true, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  };

  const nextItem = useCallback(() => {
    if (excludeVideoFromLightbox && lightbox.index === -1) return;
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % items.length }));
  }, [items.length, excludeVideoFromLightbox, lightbox.index]);

  const prevItem = useCallback(() => {
    if (excludeVideoFromLightbox && lightbox.index === -1) return;
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + items.length) % items.length }));
  }, [items.length, excludeVideoFromLightbox, lightbox.index]);

  // Focus management when lightbox opens
  useEffect(() => {
    if (lightbox.isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [lightbox.isOpen]);

  // Keyboard navigation and focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;

      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'ArrowLeft') prevItem();
      if (e.key === 'Escape') closeLightbox();

      if (e.key === 'Tab') {
        const focusableElements = document.getElementById('lightbox-container')?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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
  }, [lightbox.isOpen, nextItem, prevItem]);

  // Mobile Swipe Support
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const deltaX = Math.abs(e.targetTouches[0].clientX - touchStart.x);
    const deltaY = Math.abs(e.targetTouches[0].clientY - touchStart.y);
    
    if (deltaX > deltaY && deltaX > 10) {
      setIsDragging(true);
      // Prevent scrolling when swiping horizontally
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEndClientX = e.changedTouches[0].clientX;
    const touchEndClientY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndClientX - touchStart.x;
    const deltaY = touchEndClientY - touchStart.y;
    
    // Horizontal swipe for navigation
    if (isDragging) {
      if (deltaX < -50) nextItem();
      if (deltaX > 50) prevItem();
    } 
    // Vertical swipe down to close
    else if (deltaY > 80 && deltaY > Math.abs(deltaX) * 1.5) {
      closeLightbox();
    }

    setTouchStart(null);
    setIsDragging(false);
  };

  const visibleCount = 6;

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-[8%] mt-12">
      <div className="reveal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] items-stretch" role="list" aria-label="Galería de fotos de eventos">
          {/* COLUMNA IZQUIERDA — VÍDEO VERTICAL O IMAGEN DE PORTADA */}
          <button 
            className="relative w-full h-full min-h-[600px] md:min-h-[600px] aspect-[9/16] md:aspect-auto rounded-[3px] overflow-hidden cursor-zoom-in group/video transition-all duration-700 delay-0 outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
            onClick={() => {
              if (videoUrl && excludeVideoFromLightbox) {
                openLightbox(-1);
              } else {
                openLightbox(0);
              }
            }}
            role="listitem"
            aria-label={videoUrl ? "Ver video del evento" : "Ver imagen de portada del evento"}
          >
            {videoUrl ? (
              <video 
                src={videoUrl}
                poster={videoFallbackImage}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-[3px]"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '3px'
                }}
              />
            ) : (
              <img 
                src={videoFallbackImage} 
                alt={isBrunch ? "Pilates Brunch MOVE · Pozuelo de Alarcón · Madrid" : (isRetiro ? customAlt : "Portada del evento MOVE")} 
                className="w-full h-full object-cover rounded-[3px] transition-transform duration-400 ease-out group-hover/video:scale-[1.02]"
                loading={isBrunch ? "eager" : "lazy"}
                {...(isBrunch ? { fetchPriority: "high" as any } : {})}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.background = '#D8D0BF';
                  e.currentTarget.style.opacity = '1';
                  console.log('Error cargando:', e.currentTarget.src);
                }}
              />
            )}
            <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover/video:opacity-15 transition-opacity duration-400"></div>
          </button>

          {/* COLUMNA DERECHA — GRID DE FOTOS */}
          <div className="grid grid-cols-2 gap-[10px] align-content-start transition-all duration-700 delay-[150ms]">
            {images.slice(0, visibleCount).map((src, idx) => (
              <button 
                key={idx}
                className="relative aspect-[3/4] w-full rounded-[3px] overflow-hidden cursor-zoom-in group/img outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
                style={{ transitionDelay: `${150 + (Math.floor(idx / 2) * 100)}ms` }}
                onClick={() => openLightbox(excludeVideoFromLightbox ? idx : idx + 1)}
                role="listitem"
                aria-label={`Ver imagen ${idx + 1} del evento`}
              >
                <img 
                  src={src} 
                  alt={isBrunch ? "Pilates Brunch MOVE · Pozuelo de Alarcón · Madrid" : (isRetiro ? customAlt : `Evento MOVE - Imagen ${idx + 1}`)} 
                  className="w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover/img:scale-[1.02]"
                  loading={isBrunch ? "eager" : "lazy"}
                  {...(isBrunch ? { fetchPriority: "high" as any } : {})}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.background = '#D8D0BF';
                    e.currentTarget.style.opacity = '1';
                    console.log('Error cargando:', e.currentTarget.src);
                  }}
                />
                <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover/img:opacity-15 transition-opacity duration-400"></div>
              </button>
            ))}

            {isExpanded && (
              <>
                {images.slice(visibleCount).map((src, idx) => (
                  <button 
                    key={idx + visibleCount}
                    className="relative aspect-[3/4] w-full rounded-[3px] overflow-hidden cursor-zoom-in group/img animate-fadeIn outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
                    onClick={() => openLightbox(excludeVideoFromLightbox ? idx + visibleCount : idx + visibleCount + 1)}
                    role="listitem"
                    aria-label={`Ver imagen ${idx + visibleCount + 1} del evento`}
                  >
                    <img 
                      src={src} 
                      alt={isBrunch ? "Pilates Brunch MOVE · Pozuelo de Alarcón · Madrid" : (isRetiro ? customAlt : `Evento MOVE - Imagen ${idx + visibleCount + 1}`)} 
                      className="w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover/img:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.background = '#D8D0BF';
                        e.currentTarget.style.opacity = '1';
                        console.log('Error cargando:', e.currentTarget.src);
                      }}
                    />
                    <div className="absolute inset-0 bg-[#493523] opacity-0 group-hover/img:opacity-15 transition-opacity duration-400"></div>
                  </button>
                ))}
              </>
            )}

            <div className="col-span-2 flex justify-center mt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-transparent text-[#493523] border-[1.5px] border-[#493523] rounded-full px-7 py-3 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-[#493523] hover:text-[#F6F3EC] transition-all duration-300"
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'VER MENOS' : 'VER TODAS LAS FOTOS'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox.isOpen && (
        <div 
          id="lightbox-container"
          className="fixed inset-0 z-[10000] bg-[rgba(73,53,35,0.98)] flex flex-col items-center justify-center animate-fadeIn group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes de eventos"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close Button */}
          <button 
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="fixed top-4 right-4 md:top-5 md:right-6 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center z-[10001] bg-[rgba(246,243,236,0.10)] border border-[rgba(246,243,236,0.20)] rounded-full backdrop-blur-[4px] cursor-pointer transition-all duration-200 hover:bg-[rgba(246,243,236,0.20)] hover:border-[rgba(246,243,236,0.40)] outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC]"
            aria-label="Cerrar visor de imágenes"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Navigation Buttons (Desktop Only) */}
          {lightbox.index !== -1 && (
            <>
              <button 
                className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center z-[10000] bg-[rgba(246,243,236,0.10)] border border-[rgba(246,243,236,0.20)] rounded-full backdrop-blur-[4px] cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-[rgba(246,243,236,0.20)] hover:border-[rgba(246,243,236,0.40)] hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC]"
                onClick={(e) => {
                  e.stopPropagation();
                  prevItem();
                }}
                aria-label="Imagen anterior"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M11 14L6 9L11 4" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button 
                className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center z-[10000] bg-[rgba(246,243,236,0.10)] border border-[rgba(246,243,236,0.20)] rounded-full backdrop-blur-[4px] cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-[rgba(246,243,236,0.20)] hover:border-[rgba(246,243,236,0.40)] hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EC]"
                onClick={(e) => {
                  e.stopPropagation();
                  nextItem();
                }}
                aria-label="Siguiente imagen"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M7 4L12 9L7 14" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* Content */}
          <div className="relative max-w-[92vw] md:max-w-[50vw] max-h-[75vh] md:max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {lightbox.index === -1 ? (
              <video 
                src={videoUrl}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-[2px] animate-fadeIn"
                aria-label="Video del evento"
              />
            ) : items[lightbox.index].type === 'video' ? (
              <video 
                src={items[lightbox.index].url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-[2px] animate-fadeIn"
                aria-label="Video del evento"
              />
            ) : (
              <img
                src={items[lightbox.index].url}
                alt={isRetiro ? customAlt : `Imagen ${lightbox.index + 1} de ${items.length} del evento`}
                className="max-w-full max-h-full object-contain rounded-[2px] animate-fadeIn"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.background = '#D8D0BF';
                  e.currentTarget.style.opacity = '1';
                  console.log('Error cargando:', e.currentTarget.src);
                }}
              />
            )}
          </div>

          {/* Counter */}
          {lightbox.index !== -1 && (
            <div 
              className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] text-[#D8D0BF] tracking-[0.1em] z-[10001]"
              aria-live="polite"
            >
              {lightbox.index + 1} / {items.length}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

// --- Main Page ---

export default function Eventos() {
  useEffect(() => {
    document.title = "Eventos | MOVE Pilates Boutique Pozuelo de Alarcón";
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('lista-espera');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reveal Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const retirosImages = [
    '/assets/move-retiro-bienestar-sinergia-madrid-01.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-02.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-03.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-04.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-05.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-06.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-07.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-08.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-09.jpg',
    '/assets/move-retiro-bienestar-sinergia-madrid-10.jpg',
  ];

  const brunchImages = [
    '/assets/move-pilates-bruch-01.png',
    '/assets/move-pilates-bruch-02.jpg',
    '/assets/move-pilates-bruch-03.png',
    '/assets/move-pilates-bruch-04.png',
    '/assets/move-pilates-bruch-05.jpg',
    '/assets/move-pilates-bruch-06.jpg',
    '/assets/move-pilates-bruch-07.png',
    '/assets/move-pilates-bruch-08.jpg',
    '/assets/move-pilates-bruch-09.png',
    '/assets/move-pilates-bruch-10.jpg',
  ];

  return (
    <div className="bg-[#F6F3EC] min-h-screen selection:bg-[#493523] selection:text-[#F6F3EC]">
      {/* Hero Section */}
      <section className="relative bg-[#F6F3EC] md:h-[70vh] w-full flex items-center px-6 md:px-[8%] py-[60px] md:py-0">
        <div className="max-w-4xl reveal">
          <span className="font-sans text-[10px] text-[#7F7763] uppercase tracking-[0.18em] block mb-4">
            EXPERIENCIAS MOVE
          </span>
          <h1 className="font-serif text-[32px] md:text-[52px] text-[#493523] leading-[1.2] font-normal max-w-full md:max-w-[680px]">
            Algunos momentos no se explican. <span className="italic">Se viven.</span>
          </h1>
          <p className="font-sans text-[14px] md:text-[15px] text-[#7F7763] leading-[1.75] mt-6">
            Retiros y brunches diseñados con la misma intención que cada clase de MOVE — para que salgas diferente a como entraste.
          </p>
          <button 
            onClick={scrollToWaitlist}
            className="bg-[#493523] text-[#F6F3EC] border-[1.5px] border-[#493523] rounded-full px-8 py-3.5 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-transparent hover:text-[#493523] transition-all duration-300 mt-10 block w-fit"
            aria-label="Ir al formulario de lista de espera"
          >
            QUIERO ESTAR EN LA PRÓXIMA
          </button>
        </div>
      </section>

      {/* Separador Inferior */}
      <div className="w-full h-[1px] bg-[#D8D0BF]"></div>

      {/* Stats Section (Contador de prueba social) */}
      <section className="bg-[#493523] py-[60px] md:py-[80px] px-6">
        <div className="max-w-5xl mx-auto text-center reveal">
          <h2 className="font-serif text-[32px] md:text-[42px] text-[#F6F3EC] font-normal uppercase tracking-[0.05em]">
            experiencias <span className="italic">Move</span>
          </h2>
        </div>
      </section>

      {/* SECCIÓN 1 — RETIROS DE BIENESTAR */}
      <section className="bg-[#F6F3EC] pt-[100px] md:pt-[100px] pb-0">
        <div className="max-w-[1200px] mx-auto">
          {/* ENCABEZADO */}
          <div className="text-center reveal px-6">
            <span className="font-sans text-[10px] text-[#7F7763] uppercase tracking-[0.18em] block mb-4">
              Un espacio para desconectar, moverte y volver a ti
            </span>
            <h2 className="font-serif text-[26px] md:text-[36px] text-[#493523] font-normal">
              Retiros de bienestar
            </h2>
            <div className="w-10 h-[1px] bg-[#D8D0BF] mx-auto my-8"></div>
            <p className="font-sans text-[15px] text-[#7F7763] max-w-[640px] mx-auto leading-[1.85]">
              Los organizamos en lugares donde la naturaleza no es el decorado — es parte esencial de la experiencia. Entornos a las afueras de Madrid donde el aire, la luz y el silencio ya hacen su trabajo antes de que empiece nada. Cada retiro es diferente, pero todos comparten la misma estructura invisible: movimiento consciente en suelo, una mesa con comida real elaborada con cuidado, y talleres diseñados para conectar — arteterapia, sound healing, prácticas que le hablan al cuerpo de formas que las palabras no siempre alcanzan. No hay agenda apretada ni nada que demostrar. Solo tiempo de calidad contigo, en un entorno que lo hace posible.
            </p>
            <p className="mt-6 font-serif italic text-[18px] text-[#7F7763]">
              "Cada edición tiene su propio carácter. Lo que no cambia es la intención."
            </p>
          </div>

          {/* BLOQUE VISUAL — RETIROS */}
          <EditorialGallery 
            videoUrl="/assets/move-retiro-bienestar-sinergia-madrid-video-01.mp4" 
            images={retirosImages} 
            videoFallbackImage="/assets/move-retiro-bienestar-sinergia-madrid-01.jpg"
            excludeVideoFromLightbox={true}
            isRetiro={true}
            customAlt="Retiro de bienestar MOVE · Madrid"
          />

          {/* CTA SECCIÓN */}
          <div className="mt-16 text-center reveal px-6">
            <p className="font-sans text-[14px] text-[#7F7763] mb-6">
              ¿Quieres estar en el próximo retiro MOVE?
            </p>
            <button 
              onClick={scrollToWaitlist}
              className="bg-[#493523] text-[#F6F3EC] border-[1.5px] border-[#493523] rounded-full px-8 py-3.5 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-transparent hover:text-[#493523] transition-all duration-300"
            >
              APÚNTAME A LA LISTA DE ESPERA
            </button>
          </div>
        </div>
      </section>

      {/* SEPARADOR ENTRE SECCIONES */}
      <div className="my-[60px] md:my-[100px] w-20 h-[1px] bg-[#D8D0BF] mx-auto"></div>

      {/* SECCIÓN 2 — PILATES BRUNCH */}
      <section className="bg-[#F6F3EC]">
        <div className="max-w-[1200px] mx-auto">
          {/* ENCABEZADO */}
          <div className="text-center reveal px-6">
            <span className="font-sans text-[10px] text-[#7F7763] uppercase tracking-[0.18em] block mb-4">
              UNA EXPERIENCIA MOVE
            </span>
            <h2 className="font-serif text-[26px] md:text-[36px] text-[#493523] font-normal">
              Pilates Brunch
            </h2>
            <div className="w-10 h-[1px] bg-[#D8D0BF] mx-auto my-8"></div>
            <p className="font-sans text-[15px] text-[#7F7763] max-w-[640px] mx-auto leading-[1.85]">
              Una mañana con intención. Empezamos moviéndonos — con la misma atención y el mismo cuidado con el que trabajamos cada clase en MOVE. Después, la mesa. Buena comida, espacio para respirar y la conversación que surge sola cuando el cuerpo ya está en calma. Lo organizamos en el estudio o en espacios seleccionados con criterio — cafés de especialidad, lugares donde el detalle importa tanto como aquí. Cada edición tiene su propio escenario. Lo que no cambia es lo que se genera entre quienes vienen: presencia, conexión y la sensación de haber dedicado bien el tiempo.
            </p>
            <p className="mt-6 font-serif italic text-[18px] text-[#7F7763]">
              "Un formato corto. Una mañana que se queda."
            </p>
          </div>

          {/* BLOQUE VISUAL — PILATES BRUNCH */}
          <EditorialGallery 
            images={brunchImages} 
            videoFallbackImage="/assets/move-pilates-bruch-portada.jpg"
            isBrunch={true}
          />

          {/* CTA SECCIÓN */}
          <div className="mt-16 text-center reveal px-6">
            <p className="font-sans text-[14px] text-[#7F7763] mb-6">
              ¿Quieres estar en el próximo Pilates Brunch?
            </p>
            <button 
              onClick={scrollToWaitlist}
              className="bg-[#493523] text-[#F6F3EC] border-[1.5px] border-[#493523] rounded-full px-8 py-3.5 font-sans text-[12px] uppercase tracking-[0.12em] hover:bg-transparent hover:text-[#493523] transition-all duration-300"
            >
              APÚNTAME A LA LISTA DE ESPERA
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Section (Waitlist) */}
      <section id="lista-espera" className="bg-[#F6F3EC] py-[56px] px-[24px] md:py-[80px] md:px-[8%] mt-[100px] md:mt-[100px]">
        <div className="max-w-[560px] mx-auto text-center reveal">
          <h2 className="font-serif text-[26px] md:text-[36px] text-[#493523]">
            La próxima experiencia <span className="italic">MOVE.</span>
          </h2>
          <p className="font-sans text-[15px] text-[#7F7763] max-w-[480px] mx-auto leading-[1.8] mt-4">
            Si quieres estar en el siguiente evento, déjanos tu contacto.
          </p>

          <div className="mt-[32px] flex flex-col items-center">
            <a 
              href="https://wa.me/34654495508"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#493523] text-[#F6F3EC] border-[1.5px] border-[#493523] rounded-[100px] px-[32px] py-[14px] font-sans text-[12px] uppercase tracking-[0.12em] transition-all duration-300 ease-in-out hover:bg-[#7F7763] hover:border-[#7F7763] hover:-translate-y-[1px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-[8px]">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#F6F3EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              APUNTARME A LA LISTA DE ESPERA
            </a>
            <p className="font-sans text-[12px] text-[#7F7763] mt-[12px]">
              Te respondemos en horario de estudio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

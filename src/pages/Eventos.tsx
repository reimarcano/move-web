import React, { useState, useEffect, useRef, useCallback } from 'react';

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
  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const wheelLockedRef = useRef(false);

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

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (lightbox.index === -1 || (event.pointerType === 'mouse' && event.button !== 0)) return;
    if ((event.target as HTMLElement).closest('button, video')) return;

    dragStartRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;
    if (!dragStart || dragStart.pointerId !== event.pointerId) return;

    const distanceX = event.clientX - dragStart.x;
    const distanceY = event.clientY - dragStart.y;
    dragStartRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(distanceX) > 52 && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX < 0) nextItem();
      else prevItem();
    }
  };

  const handleHorizontalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (lightbox.index === -1 || Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20 || wheelLockedRef.current) return;

    event.preventDefault();
    wheelLockedRef.current = true;
    if (event.deltaX > 0) nextItem();
    else prevItem();
    window.setTimeout(() => { wheelLockedRef.current = false; }, 350);
  };

  const goToItem = (index: number) => setLightbox(current => ({ ...current, index }));

  const visibleCount = 6;

  return (
    <div className="ev-gallery">
      <div className="reveal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] items-stretch" role="list" aria-label="Galería de fotos de eventos">
          {/* COLUMNA IZQUIERDA — VÍDEO VERTICAL O IMAGEN DE PORTADA */}
          <button 
            className="relative w-full h-full min-h-[600px] md:min-h-[600px] aspect-[9/16] md:aspect-auto rounded-inner overflow-hidden cursor-zoom-in group/video transition-all duration-700 delay-0 outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2"
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
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={videoFallbackImage} 
                alt={isBrunch ? "Pilates Brunch MOVE · Pozuelo de Alarcón · Madrid" : (isRetiro ? customAlt : "Portada del evento MOVE")} 
                className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover/video:scale-[1.02]"
                loading={isBrunch ? "eager" : "lazy"}
                {...(isBrunch ? { fetchPriority: "high" as any } : {})}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.background = 'var(--color-soft)';
                  e.currentTarget.style.opacity = '1';
                  console.log('Error cargando:', e.currentTarget.src);
                }}
              />
            )}
            <div className="absolute inset-0 bg-dark opacity-0 group-hover/video:opacity-15 transition-opacity duration-400"></div>
          </button>

          {/* COLUMNA DERECHA — GRID DE FOTOS */}
          <div className="grid grid-cols-2 gap-[10px] align-content-start transition-all duration-700 delay-[150ms]">
            {images.slice(0, visibleCount).map((src, idx) => (
              <button 
                key={idx}
                className="relative aspect-[3/4] w-full rounded-inner overflow-hidden cursor-zoom-in group/img outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2"
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
                    e.currentTarget.style.background = 'var(--color-soft)';
                    e.currentTarget.style.opacity = '1';
                    console.log('Error cargando:', e.currentTarget.src);
                  }}
                />
                <div className="absolute inset-0 bg-dark opacity-0 group-hover/img:opacity-15 transition-opacity duration-400"></div>
              </button>
            ))}

            {isExpanded && (
              <>
                {images.slice(visibleCount).map((src, idx) => (
                  <button 
                    key={idx + visibleCount}
                    className="relative aspect-[3/4] w-full rounded-inner overflow-hidden cursor-zoom-in group/img animate-fadeIn outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2"
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
                        e.currentTarget.style.background = 'var(--color-soft)';
                        e.currentTarget.style.opacity = '1';
                        console.log('Error cargando:', e.currentTarget.src);
                      }}
                    />
                    <div className="absolute inset-0 bg-dark opacity-0 group-hover/img:opacity-15 transition-opacity duration-400"></div>
                  </button>
                ))}
              </>
            )}

            <div className="col-span-2 flex justify-center mt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn-outline"
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Ver menos' : 'Ver todas las fotos'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox.isOpen && (
        <div 
          id="lightbox-container"
          className="fixed inset-0 z-[10000] bg-dark/98 flex flex-col items-center justify-center animate-fadeIn group"
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
            className="fixed top-4 right-4 md:top-5 md:right-6 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center z-[10001] bg-base/10 border border-paper-line rounded-full backdrop-blur-[4px] cursor-pointer text-base transition-all duration-200 hover:bg-base/20 hover:border-base/40 outline-none focus-visible:ring-2 focus-visible:ring-base"
            aria-label="Cerrar visor de imágenes"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div
            className="flex w-full max-w-[92vw] md:max-w-[50vw] touch-pan-y select-none flex-col items-center gap-5 px-1 pt-16 pb-14"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onWheel={handleHorizontalWheel}
          >
            <div className={`relative flex items-center justify-center ${
              lightbox.index !== -1 && items[lightbox.index].type === 'image'
                ? 'lightbox-photo-frame overflow-hidden rounded-[2px] bg-base/8'
                : 'max-h-[calc(100dvh-170px)] w-full md:max-h-[calc(100dvh-150px)]'
            }`}>
              {lightbox.index === -1 ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="max-h-[calc(100dvh-170px)] max-w-full object-contain rounded-[2px] md:max-h-[calc(100dvh-150px)]"
                  aria-label="Video del evento"
                />
              ) : items[lightbox.index].type === 'video' ? (
                <video
                  src={items[lightbox.index].url}
                  controls
                  autoPlay
                  className="max-h-[calc(100dvh-170px)] max-w-full object-contain rounded-[2px] md:max-h-[calc(100dvh-150px)]"
                  aria-label="Video del evento"
                />
              ) : (
              <img
                key={lightbox.index}
                src={items[lightbox.index].url}
                alt={isRetiro ? customAlt : `Imagen ${lightbox.index + 1} de ${items.length} del evento`}
                  className="lightbox-photo-fade h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.background = 'var(--color-soft)';
                    e.currentTarget.style.opacity = '1';
                    console.log('Error cargando:', e.currentTarget.src);
                  }}
                />
              )}
            </div>

            {lightbox.index !== -1 && items.length > 1 && (
              <div className="flex max-w-full items-center justify-center gap-3" role="group" aria-label="Navegación de la galería">
                {items.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToItem(index)}
                    className={`h-2 w-2 shrink-0 rounded-full transition-[width,background-color,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base ${
                      lightbox.index === index ? 'w-8 bg-base' : 'bg-base/55 hover:bg-base/80'
                    }`}
                    aria-label={`Ir al elemento ${index + 1}`}
                    aria-current={lightbox.index === index ? 'true' : undefined}
                  />
                ))}
              </div>
            )}

            {lightbox.index !== -1 && (
              <span className="sr-only" aria-live="polite">
                Elemento {lightbox.index + 1} de {items.length}
              </span>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightboxPhotoFade {
          from { opacity: 0.55; transform: scale(1.025); }
          to { opacity: 1; transform: scale(1); }
        }
        .lightbox-photo-fade {
          animation: lightboxPhotoFade 280ms ease-out both;
        }
        .lightbox-photo-frame {
          width: min(82vw, calc((100dvh - 170px) * 0.75));
          aspect-ratio: 3 / 4;
        }
        @media (min-width: 768px) {
          .lightbox-photo-frame {
            width: min(48vw, calc((100dvh - 150px) * 0.75));
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn, .lightbox-photo-fade {
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

/* Cabecera de cada experiencia: antetítulo, título, texto largo y frase de cierre */
function CabeceraEvento({ titulo, cursiva, entradilla, texto, frase }: {
  titulo: string;
  cursiva: string;
  entradilla?: React.ReactNode;
  texto: string;
  frase: string;
}) {
  return (
    <div className="m-head">
      <span className="m-eyebrow reveal">Una experiencia MOVE</span>
      <h2 className="m-title reveal reveal-delay-1">
        {titulo} <em>{cursiva}</em>
      </h2>
      {entradilla && <p className="m-intro label-balanced reveal reveal-delay-2">{entradilla}</p>}
      <span className="m-rule reveal" aria-hidden="true" />
      <p className="m-text ev-text reveal">{texto}</p>
      <p className="m-closing ev-frase reveal">{frase}</p>
    </div>
  );
}

/* Cierre de cada experiencia: pregunta + botón a la lista de espera */
function CierreEvento({ pregunta, onClick }: { pregunta: string; onClick: () => void }) {
  return (
    <div className="m-foot reveal">
      <p className="m-text text-small">{pregunta}</p>
      <button onClick={onClick} className="btn-primary">
        Apúntame a la lista de espera
      </button>
    </div>
  );
}

export default function Eventos() {
  const scrollToWaitlist = () => {
    const element = document.getElementById('lista-espera');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className="w-full">
      {/* Cabecera */}
      <section className="m-section">
        <div className="m-head mb-0">
          <span className="m-eyebrow reveal">Experiencias MOVE</span>
          <h1 className="m-title text-display reveal reveal-delay-1">
            <span className="block">Algunos momentos no se explican.</span>
            <em className="block">Se viven.</em>
          </h1>
          <p className="m-intro reveal reveal-delay-2">
            Retiros y brunches diseñados con la misma intención que cada clase de MOVE, para que salgas diferente a como entraste.
          </p>
          <div className="mt-10 reveal reveal-delay-3">
            <button
              onClick={scrollToWaitlist}
              className="btn-primary"
              aria-label="Ir al formulario de lista de espera"
            >
              Quiero estar en la próxima
            </button>
          </div>
        </div>
      </section>

      {/* Cinta: las dos experiencias */}
      <section className="m-section m-band">
        <div className="m-head mb-0">
          <span className="m-eyebrow m-eyebrow-light reveal">Retiros · Pilates Brunch</span>
          <h2 className="m-title m-title-light reveal reveal-delay-1">
            Experiencias <em>MOVE.</em>
          </h2>
        </div>
      </section>

      {/* Retiros de bienestar */}
      <section className="m-section">
        <CabeceraEvento
          titulo="Retiros de"
          cursiva="bienestar."
          entradilla={<>Un espacio para desconectar, moverte y volver <span className="whitespace-nowrap">a ti.</span></>}
          texto="Los organizamos en lugares donde la naturaleza no es el decorado. Es parte esencial de la experiencia. Entornos a las afueras de Madrid donde el aire, la luz y el silencio ya hacen su trabajo antes de que empiece nada. Cada retiro es diferente, pero todos comparten la misma estructura invisible: movimiento consciente en suelo, una mesa con comida real elaborada con cuidado y talleres diseñados para conectar. Arteterapia, sound healing y prácticas que le hablan al cuerpo de formas que las palabras no siempre alcanzan. No hay agenda apretada ni nada que demostrar. Solo tiempo de calidad contigo, en un entorno que lo hace posible."
          frase="“Cada edición tiene su propio carácter. Lo que no cambia es la intención.”"
        />

        <EditorialGallery
          videoUrl="/assets/move-retiro-bienestar-sinergia-madrid-video-01.mp4"
          images={retirosImages}
          videoFallbackImage="/assets/move-retiro-bienestar-sinergia-madrid-01.jpg"
          excludeVideoFromLightbox={true}
          isRetiro={true}
          customAlt="Retiro de bienestar MOVE · Madrid"
        />

        <CierreEvento pregunta="¿Quieres estar en el próximo retiro MOVE?" onClick={scrollToWaitlist} />
      </section>

      {/* Pilates Brunch */}
      <section className="m-section pt-0">
        <span className="m-rule ev-separador" aria-hidden="true" />
        <CabeceraEvento
          titulo="Pilates"
          cursiva="Brunch."
          texto="Una mañana con intención. Empezamos moviéndonos con la misma atención y el mismo cuidado con el que trabajamos cada clase en MOVE. Después, la mesa. Buena comida, espacio para respirar y la conversación que surge sola cuando el cuerpo ya está en calma. Lo organizamos en el estudio o en espacios seleccionados con criterio. Cafés de especialidad y lugares donde el detalle importa tanto como aquí. Cada edición tiene su propio escenario. Lo que no cambia es lo que se genera entre quienes vienen: presencia, conexión y la sensación de haber dedicado bien el tiempo."
          frase="“Un formato corto. Una mañana que se queda.”"
        />

        <EditorialGallery
          images={brunchImages}
          videoFallbackImage="/assets/move-pilates-bruch-portada.jpg"
          isBrunch={true}
        />

        <CierreEvento pregunta="¿Quieres estar en el próximo Pilates Brunch?" onClick={scrollToWaitlist} />
      </section>

      {/* Lista de espera */}
      <section id="lista-espera" className="m-section bg-arena">
        <div className="m-head mb-0">
          <span className="m-eyebrow reveal">Lista de espera</span>
          <h2 className="m-title reveal reveal-delay-1">
            La próxima experiencia <em>MOVE.</em>
          </h2>
          <p className="m-intro reveal reveal-delay-2">
            Si quieres estar en el siguiente evento, déjanos tu contacto.
          </p>

          <div className="m-foot mt-8 gap-3 reveal reveal-delay-3">
            <a
              href="https://wa.me/34654495508"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Apúntame a la lista de espera
            </a>
            <p className="m-text text-label text-mid">Te respondemos en horario laboral.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

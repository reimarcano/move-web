import React, { useState, useEffect, useCallback, useRef } from 'react';
import movePilatesMadrid05 from '../assets/move-pilates-madrid-05.webp';
// Gallery 1: Nuestro Espacio
const espacioImages = [
  '/assets/01-move-pilates-pozuelo.webp',
  '/assets/02-move-pilates-pozuelo.webp',
  '/assets/03-move-pilates-pozuelo.webp',
  '/assets/04-move-pilates-pozuelo.webp',
  '/assets/05-move-pilates-pozuelo.webp',
  '/assets/06-move-pilates-pozuelo.webp',
  '/assets/07-move-pilates-pozuelo.webp',
  '/assets/08-move-pilates-pozuelo.webp',
  '/assets/09-move-pilates-pozuelo.webp',
];

// Gallery 2: Nuestras Clases
const clasesImages = [
  '/assets/move-pilates-madrid-01.webp',
  '/assets/move-pilates-madrid-02.webp',
  '/assets/move-pilates-madrid-03.webp',
  '/assets/move-pilates-madrid-04.webp',
  movePilatesMadrid05,
  '/assets/move-pilates-madrid-06.webp',
  '/assets/move-pilates-madrid-07.webp',
  '/assets/move-pilates-madrid-08.webp',
  '/assets/move-pilates-madrid-09.webp',
  '/assets/move-pilates-madrid-10.webp',
  '/assets/move-pilates-madrid-11.webp',
  '/assets/move-pilates-madrid-12.webp',
  '/assets/move-pilates-madrid-13.webp',
  '/assets/move-pilates-madrid-14.webp',
  '/assets/move-pilates-madrid-15.webp',
];

const tileClass = 'es-tile group relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-inner outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2';
const imgClass = 'gallery-img h-full w-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]';

interface MobileGalleryProps {
  images: string[];
  alt: string;
  ariaLabel: string;
  onOpen: (index: number) => void;
}

function MobileGallery({ images, alt, ariaLabel, onOpen }: MobileGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const gallery = scrollRef.current;
    if (!gallery) return;

    const slides = Array.from(gallery.children) as HTMLElement[];
    const galleryCenter = gallery.scrollLeft + gallery.clientWidth / 2;
    const closestIndex = slides.reduce((currentClosest, slide, index) => {
      const currentDistance = Math.abs(slides[currentClosest].offsetLeft + slides[currentClosest].offsetWidth / 2 - galleryCenter);
      const nextDistance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - galleryCenter);
      return nextDistance < currentDistance ? index : currentClosest;
    }, 0);

    setActiveIndex(closestIndex);
  };

  const scrollToImage = (index: number) => {
    const gallery = scrollRef.current;
    const slide = gallery?.children[index] as HTMLElement | undefined;
    if (!gallery || !slide) return;

    gallery.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        className="es-strip flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 no-scrollbar"
        onScroll={updateActiveIndex}
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className={`${tileClass} w-[82vw] max-w-[320px] shrink-0 snap-center`}
            onClick={() => onOpen(index)}
            aria-label={`Ver foto ${index + 1} de ${ariaLabel.toLowerCase()}`}
          >
            <img
              src={src}
              alt={alt}
              className={imgClass}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              sizes="82vw"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Navegación de la galería">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToImage(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 ${
              activeIndex === index ? 'w-5 bg-dark' : 'w-2 bg-soft hover:bg-dark'
            }`}
            aria-label={`Ir a la foto ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/* Galería de una sección: tira en móvil; en escritorio, cuatro fotos y el resto al desplegar */
function GaleriaEstudio({ antetitulo, titulo, cursiva, images, alt, ariaLabel, onOpen }: {
  antetitulo: string;
  titulo: string;
  cursiva: string;
  images: string[];
  alt: string;
  ariaLabel: string;
  onOpen: (index: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const etiqueta = ariaLabel.toLowerCase();

  useEffect(() => {
    markLoadedImages();
  }, [isExpanded]);

  return (
    <section className="m-section pt-0">
      <div className="m-head">
        <span className="m-eyebrow reveal">{antetitulo}</span>
        <h2 className="m-title reveal reveal-delay-1">
          {titulo} <em>{cursiva}</em>
        </h2>
      </div>

      <div className="es-gallery reveal">
        <MobileGallery images={images} alt={alt} ariaLabel={ariaLabel} onOpen={onOpen} />

        <div className="hidden md:grid md:grid-cols-2 gap-[10px]" role="list" aria-label={`Galería de fotos de ${etiqueta}`}>
          {images.slice(0, 4).map((src, idx) => (
            <button
              key={idx}
              role="listitem"
              className={tileClass}
              onClick={() => onOpen(idx)}
              aria-label={`Ver foto ${idx + 1} de ${etiqueta}`}
            >
              <img
                src={src}
                alt={alt}
                className={imgClass}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>

        {isExpanded && (
          <div className="hidden md:grid md:grid-cols-3 gap-[10px] mt-[10px] animate-fadeIn" role="list" aria-label={`Más fotos de ${etiqueta}`}>
            {images.slice(4).map((src, idx) => (
              <button
                key={idx + 4}
                role="listitem"
                className={tileClass}
                onClick={() => onOpen(idx + 4)}
                aria-label={`Ver foto ${idx + 5} de ${etiqueta}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className={imgClass}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        )}

        <div className="hidden md:flex justify-center mt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="btn-outline"
          >
            {isExpanded ? 'Ver menos' : 'Ver todas las fotos'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Las fotos aparecen con un fundido al cargar; si fallan, queda el fondo arena */
function markLoadedImages() {
  document.querySelectorAll<HTMLImageElement>('.gallery-img:not(.loaded)').forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
    }
  });
}

export default function NuestroEstudio() {
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; index: number; alt: string }>({
    isOpen: false,
    images: [],
    index: 0,
    alt: '',
  });

  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const wheelLockedRef = useRef(false);

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
    markLoadedImages();
  }, []);

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

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if ((event.target as HTMLElement).closest('button')) return;

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
      if (distanceX < 0) nextImage();
      else prevImage();
    }
  };

  const goToImage = (index: number) => {
    if (index === lightbox.index) return;
    setLightbox(current => ({ ...current, index }));
  };

  const handleHorizontalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20 || wheelLockedRef.current) return;

    event.preventDefault();
    wheelLockedRef.current = true;
    if (event.deltaX > 0) nextImage();
    else prevImage();
    window.setTimeout(() => { wheelLockedRef.current = false; }, 350);
  };

  const espacioAlt = "Sala de Pilates Reformer · MOVE Pilates Boutique · Pozuelo de Alarcón";
  const clasesAlt = "Clase de Pilates Reformer · MOVE · Pozuelo de Alarcón · Madrid";

  return (
    <div className="w-full">
      {/* Cabecera */}
      <section className="m-section">
        <div className="m-head mb-0">
          <span className="m-eyebrow reveal">Nuestro estudio</span>
          <h1 className="m-title text-display reveal reveal-delay-1">
            Un espacio para <em>conectarte.</em>
          </h1>
          <p className="m-intro reveal reveal-delay-2">
            Cada detalle de MOVE está pensado para que te sientas a gusto, en confianza y presente desde el momento en que entras.
          </p>
        </div>
      </section>

      <GaleriaEstudio
        antetitulo="Nuestro espacio"
        titulo="Diseñado para que te sientas"
        cursiva="bien."
        images={espacioImages}
        alt={espacioAlt}
        ariaLabel="Nuestro espacio"
        onOpen={(index) => openLightbox(espacioImages, index, espacioAlt)}
      />

      <GaleriaEstudio
        antetitulo="Nuestras clases"
        titulo="El movimiento en"
        cursiva="cada sesión."
        images={clasesImages}
        alt={clasesAlt}
        ariaLabel="Nuestras clases"
        onOpen={(index) => openLightbox(clasesImages, index, clasesAlt)}
      />

      {/* Quién te guía: cinta marrón con la foto a sangre */}
      <section className="m-band es-guide">
        <figure className="es-guide-photo">
          <img
            src="/assets/GENESIS%20ROMERO.jpg"
            alt="Génesis Romero · Fundadora e instructora de MOVE Pilates Boutique · Pozuelo de Alarcón"
            className="gallery-img"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </figure>

        <div className="es-guide-copy">
          <span className="m-eyebrow m-eyebrow-light reveal">Fundadora e instructora</span>
          <h2 className="m-title m-title-light reveal reveal-delay-1">
            Génesis <em>Romero.</em>
          </h2>
          <p className="m-text reveal reveal-delay-2">
            Instructora y fundadora de Move Pilates boutique en Pozuelo de Alarcón. Cada clase que diseña parte de una convicción: que moverse bien cambia cómo te sientes, cómo te mueves y cómo te habitas a ti mismo.
          </p>
        </div>
      </section>

      {/* Cierre */}
      <section className="m-section">
        <div className="m-foot mt-0 reveal">
          <p className="m-closing">¿Quieres conocer el estudio en persona?</p>
          <a
            href="https://wa.me/34654495508"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            aria-label="Escríbenos por WhatsApp para más información"
          >
            Escríbenos
          </a>
        </div>
      </section>

      {/* LIGHTBOX COMPARTIDO */}
      {lightbox.isOpen && (
        <div
          id="lightbox-container"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
          className="fixed inset-0 z-[9999] bg-dark/96 flex items-center justify-center animate-fadeIn group"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="fixed top-4 right-4 md:top-5 md:right-6 w-12 h-12 flex items-center justify-center z-[10001] bg-base/10 border border-paper-line rounded-full backdrop-blur-[4px] cursor-pointer text-base transition-all duration-200 hover:bg-base/20 hover:border-base/40 hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-base"
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
            <div className="lightbox-photo-frame relative overflow-hidden rounded-[2px] bg-base/8">
              <img
                key={lightbox.index}
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.alt} - Imagen ${lightbox.index + 1} de ${lightbox.images.length}`}
                className="lightbox-photo-fade h-full w-full object-cover"
              />
            </div>

            <div
              className="flex max-w-full items-center justify-center gap-3"
              role="group"
              aria-label="Navegación de la galería"
            >
              {lightbox.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToImage(index)}
                  className={`h-2 w-2 shrink-0 rounded-full transition-[width,background-color,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base ${
                    lightbox.index === index ? 'w-8 bg-base' : 'bg-base/55 hover:bg-base/80'
                  }`}
                  aria-label={`Ir a la foto ${index + 1}`}
                  aria-current={lightbox.index === index ? 'true' : undefined}
                />
              ))}
            </div>

            <span className="sr-only" aria-live="polite">
              Foto {lightbox.index + 1} de {lightbox.images.length}
            </span>
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
}

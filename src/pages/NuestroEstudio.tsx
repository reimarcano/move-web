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
        className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-1 no-scrollbar"
        onScroll={updateActiveIndex}
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className="group relative aspect-[3/4] w-[82vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-[3px] outline-none focus-visible:ring-2 focus-visible:ring-[#493523] focus-visible:ring-offset-2"
            onClick={() => onOpen(index)}
            aria-label={`Ver foto ${index + 1} de ${ariaLabel.toLowerCase()}`}
          >
            <div className="absolute inset-0 z-10 bg-[#493523] opacity-0 transition-opacity duration-400 group-hover:opacity-15"></div>
            <img
              src={src}
              alt={alt}
              className="gallery-img h-full w-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              sizes="82vw"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3" aria-label="Navegación de la galería">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToImage(index)}
            className={`h-2 w-2 rounded-full transition-[width,background-color,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#493523] ${
              activeIndex === index ? 'w-8 bg-[#493523]' : 'bg-[#7F7763]/70 hover:bg-[#7F7763]'
            }`}
            aria-label={`Ir a la foto ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

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
          <MobileGallery
            images={espacioImages}
            alt={espacioAlt}
            ariaLabel="Nuestro espacio"
            onOpen={(index) => openLightbox(espacioImages, index, espacioAlt)}
          />

          <div className="hidden md:grid md:grid-cols-2 gap-[10px] mb-[10px]" role="list" aria-label="Galería de fotos de nuestro espacio">
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

          <div className="hidden md:flex justify-center mt-6">
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
          <MobileGallery
            images={clasesImages}
            alt={clasesAlt}
            ariaLabel="Nuestras clases"
            onOpen={(index) => openLightbox(clasesImages, index, clasesAlt)}
          />

          <div className="hidden md:grid md:grid-cols-2 gap-[10px] mb-[10px]" role="list" aria-label="Galería de fotos de nuestras clases">
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

          <div className="hidden md:flex justify-center mt-6">
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

          <div
            className="flex w-full max-w-[92vw] md:max-w-[50vw] touch-pan-y select-none flex-col items-center gap-5 px-1 pt-16 pb-14"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onWheel={handleHorizontalWheel}
          >
            <div className="lightbox-photo-frame relative overflow-hidden rounded-[2px] bg-[rgba(246,243,236,0.08)]">
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
                  className={`h-2 w-2 shrink-0 rounded-full transition-[width,background-color,opacity] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F3EC] ${
                    lightbox.index === index ? 'w-8 bg-[#F6F3EC]' : 'bg-[#F6F3EC]/55 hover:bg-[#F6F3EC]/80'
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
          .animate-fadeIn, .lightbox-photo-fade, .reveal {
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

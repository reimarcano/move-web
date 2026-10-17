import { useState, useEffect, useRef, useCallback } from "react";
import { faqs } from "../data/faqs";

import HeroInmersivo from "../components/HeroInmersivo";
import Reviews from "../components/Reviews";
import PrimeraVez from "../components/PrimeraVez";
import TextoRespira from "../components/TextoRespira";
import PlanesGrupales from "../components/PlanesGrupales";

/* ────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────── */

const WHATSAPP_URL = "https://wa.me/34654495508";

/* ────────────────────────────────────────────
   Feature cards data
   ──────────────────────────────────────────── */

const features = [
  {
    icon: "/ELEMENTOS DE MARCA MOVE-clases grupales.png",
    iconAlt: "Elemento visual de MOVE para clases grupales",
    iconSize: 150,
    title: "Máximo 4 personas",
    description: "Grupos reducidos de máximo 4 personas para un acompañamiento cercano y consciente.",
  },
  {
    icon: "/ELEMENTOS DE MARCA MOVE-sesiones privadas.png",
    iconAlt: "Elemento visual de MOVE para sesiones privadas",
    iconSize: 86,
    title: "Sesiones privadas",
    description: "Atención personalizada, adaptada a tu ritmo, tus objetivos y tu momento vital.",
  },
  {
    icon: "/ELEMENTOS DE MARCA MOVE-atencion personalizada.png",
    iconAlt: "Elemento visual de MOVE para atención personalizada",
    iconSize: 130,
    title: "Atención personalizada",
    description: "Técnica, cuidado y sensibilidad en cada sesión de Pilates Reformer.",
  },
];

/* ────────────────────────────────────────────
   FAQ Item component (dynamic height)
   ──────────────────────────────────────────── */

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    /* El estado abierto va en un atributo: la clase la gestiona la animación de entrada */
    <div className="fq-item reveal" data-open={isOpen} style={{ "--i": index } as React.CSSProperties}>
      <button
        onClick={onToggle}
        className="fq-q"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="fq-n" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="fq-text">{faq.question}</span>
        {/* Más que gira hasta formar un menos */}
        <span className="fq-toggle" aria-hidden="true" />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        ref={contentRef}
        className="fq-a"
        style={{
          maxHeight: `${height}px`,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="m-text">{faq.answer}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Home page
   ──────────────────────────────────────────── */

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="w-full">
      {/* ── Portada inmersiva ── */}
      <HeroInmersivo />

      {/* ── ¿Primera vez en MOVE? (clase de valoración) ── */}
      <PrimeraVez />

      {/* ── Lo que nos hace diferentes ── */}
      <section className="m-section">
        <div className="m-head">
          <span className="m-eyebrow reveal">La experiencia MOVE</span>
          <h2 className="m-title reveal reveal-delay-1">
            Lo que nos hace <em>diferentes.</em>
          </h2>
        </div>

        <div className="ft-grid">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`ft-item reveal reveal-delay-${index + 1}`}
              style={{ "--i": index } as React.CSSProperties}
            >
              <div className="ft-icon">
                {/* El círculo se dibuja desde un punto, como el muelle de la portada */}
                <svg className="ft-ring" viewBox="0 0 92 92" aria-hidden="true">
                  <circle cx="46" cy="46" r="45.5" pathLength={1} />
                </svg>
                <img
                  src={feature.icon}
                  alt={feature.iconAlt}
                  width={feature.iconSize}
                  height={feature.iconSize}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="m-title-sm">{feature.title}</h3>
              <p className="m-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Nuestra filosofía ── */}
      <section className="m-section m-band ph-band">
        <span className="m-eyebrow m-eyebrow-light reveal">Nuestra filosofía</span>
        <TextoRespira
          as="h2"
          className="m-quote"
          text="“Move no es solo un estudio de Pilates Reformer, es un refugio en Pozuelo de Alarcón diseñado con intención, sensibilidad y propósito. Un espacio donde cada detalle está pensado para invitarte a reconectar contigo.”"
        />
        <div className="ph-sign reveal reveal-delay-2">
          <picture className="ph-photo">
            <source srcSet="/assets/foto-genesis.webp" type="image/webp" />
            <img
              src="/assets/foto-genesis.jpg"
              alt="Retrato de Génesis Romero, fundadora de MOVE Pilates Boutique"
              width={192}
              height={192}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </picture>
          <p className="ph-name">Génesis Romero</p>
          <span className="m-eyebrow m-eyebrow-light">Fundadora de MOVE</span>
        </div>
      </section>

      {/* ── Planes de clases grupales ── */}
      <PlanesGrupales />

      {/* ── Preguntas frecuentes ── */}
      <section className="m-section bg-arena">
        {/* Dos columnas editoriales: la cabecera queda fija mientras se lee la lista */}
        <div className="fq-layout">
          <div className="fq-aside">
            <span className="m-eyebrow reveal">Antes de empezar</span>
            <h2 className="m-title reveal reveal-delay-1">
              Preguntas <em>frecuentes.</em>
            </h2>
            <div className="fq-contact reveal reveal-delay-2">
              <p className="m-closing">¿Tienes más preguntas?</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                aria-label="Escríbenos por WhatsApp para más información"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>

          <div className="fq-list">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews (lazy loaded) ── */}
      <Reviews />
    </div>
  );
}

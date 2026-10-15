import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

import Reviews from "../components/Reviews";
import PrimeraVez from "../components/PrimeraVez";
import PlanesGrupales from "../components/PlanesGrupales";
import { VALORACION_WHATSAPP_URL } from "../data/valoracion";

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
    <div className={`fq-item${isOpen ? " is-open" : ""}`}>
      <button
        onClick={onToggle}
        className="fq-q"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span>{faq.question}</span>
        <ChevronDown className="fq-chevron" size={18} strokeWidth={1.5} aria-hidden="true" />
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
      {/* ── Hero Section ── */}
      <section className="relative h-screen flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture className="block w-full h-full">
            <source srcSet="/assets/move_portada_pilates-pozuelo.webp" type="image/webp" />
            <img
              src="/assets/move_portada_pilates-pozuelo.jpg"
              alt="Estudio de Pilates Reformer MOVE en Pozuelo de Alarcón"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              style={{ objectPosition: "center 20%" }}
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center w-full max-w-[900px] z-10 px-4 md:px-10 top-[5%]">
          <h1 className="mb-0 reveal font-serif text-negro-move font-normal text-[min(var(--fs-display),8.6vw)] leading-[1.15]">
            <span className="block md:whitespace-nowrap">Tu centro de <span className="block italic md:inline">Pilates Reformer</span></span>
            <span className="block whitespace-nowrap">en Pozuelo de Alarcón</span>
          </h1>

          <div className="reveal reveal-delay-1 mt-4">
            <a
              href={VALORACION_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Reserva tu clase de prueba por WhatsApp"
              className="btn-primary"
            >
              Reserva tu clase de prueba
            </a>
          </div>
        </div>
      </section>

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
            <div key={feature.title} className={`ft-item reveal reveal-delay-${index + 1}`}>
              <div className="ft-icon">
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
        <h2 className="m-quote reveal reveal-delay-1">
          &ldquo;Move no es solo un estudio de Pilates Reformer, es un refugio en Pozuelo de
          Alarcón diseñado con intención, sensibilidad y propósito. Un espacio donde cada
          detalle está pensado para invitarte a reconectar contigo.&rdquo;
        </h2>
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
        <div className="max-w-[760px] mx-auto">
          <div className="m-head">
            <span className="m-eyebrow reveal">Antes de empezar</span>
            <h2 className="m-title reveal reveal-delay-1">
              Preguntas <em>frecuentes.</em>
            </h2>
          </div>

          <div className="fq-list reveal reveal-delay-2">
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

          <div className="m-foot reveal">
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
      </section>

      {/* ── Reviews (lazy loaded) ── */}
      <Reviews />
    </div>
  );
}

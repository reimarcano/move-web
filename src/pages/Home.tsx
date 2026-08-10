import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

import Reviews from "../components/Reviews";

/* ────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────── */

const WHATSAPP_CTA_URL =
  "https://wa.me/34654495508?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20mi%20primera%20clase%20gratuita%20en%20MOVE%20Pilates%20Boutique.%20%C2%BFPod%C3%A9is%20indicarme%20disponibilidad%3F";

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
    description: "Clases reducidas para un acompañamiento más cercano y consciente.",
  },
  {
    icon: "/ELEMENTOS DE MARCA MOVE-sesiones privadas.png",
    iconAlt: "Elemento visual de MOVE para sesiones privadas",
    iconSize: 86,
    title: "Sesiones privadas",
    description: "Un espacio adaptado a tu ritmo, tus objetivos y tu momento vital.",
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
    <div className="border-t border-negro-move">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-[22px] text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="faq-question text-negro-move pr-4">{faq.question}</span>
        <span
          className={`text-negro-move flex-shrink-0 transition-transform duration-[350ms] ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-[400ms] ease-in-out"
        style={{
          maxHeight: `${height}px`,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pr-10 pb-[22px] faq-answer text-negro-move/75">{faq.answer}</div>
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

        <div className="absolute left-1/2 -translate-x-1/2 text-center w-full max-w-[900px] z-10 px-6 md:px-10 top-[5%]">
          <h1 className="mb-0 reveal font-serif text-negro-move font-normal">
            Tu centro de <span className="italic">Pilates Reformer</span>
            <br />
            en Pozuelo de Alarcón
          </h1>

          <div className="reveal reveal-delay-1 mt-4">
            <a
              href={WHATSAPP_CTA_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Reserva tu primera clase por WhatsApp"
              className="inline-block rounded-[100px] border-[1.5px] bg-[#493523] text-[#F6F3EC] border-[#493523] uppercase tracking-[0.12em] transition-all duration-300 ease-in-out hover:-translate-y-[1px] hover:bg-[#7F7763] hover:border-[#7F7763] hover:text-[#F6F3EC]"
              style={{
                padding: "14px 32px",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
              }}
            >
              Reserva tu primera clase de cortesía
            </a>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="w-full bg-[#F6F3EC]">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-20 md:py-24 reveal">
          <div className="mb-12 text-center">
            <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-[rgba(73,53,35,0.7)]">
              La experiencia MOVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 text-center">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col items-center reveal reveal-delay-${index + 1}`}
              >
                <div
                  className="mb-8 rounded-full flex items-center justify-center"
                  style={{
                    width: "92px",
                    height: "92px",
                    borderColor: "rgba(73, 53, 35, 0.55)",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    background: "#F6F3EC",
                  }}
                >
                  <img
                    src={feature.icon}
                    alt={feature.iconAlt}
                    width={feature.iconSize}
                    height={feature.iconSize}
                    loading="lazy"
                    decoding="async"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "24px",
                    lineHeight: "1.2",
                    color: "#493523",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="max-w-[250px] mx-auto"
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.75",
                    color: "rgba(73, 53, 35, 0.82)",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="section-padding-oscuro px-6 bg-marron-move text-crema-move text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-crema-move mb-0 font-serif italic reveal">
            &ldquo;Move no es solo un estudio de Pilates Reformer, es un refugio en Pozuelo de
            Alarcón diseñado con intención, sensibilidad y propósito. Un espacio donde cada
            detalle está pensado para invitarte a reconectar contigo.&rdquo;
          </h2>
          <div className="mt-section-lg flex flex-col items-center reveal reveal-delay-2">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-crema-move/20 shadow-2xl">
              <picture className="block w-full h-full">
                <source srcSet="/assets/foto-genesis.webp" type="image/webp" />
                <img
                  src="/assets/foto-genesis.jpg"
                  alt="Retrato de Génesis Romero, fundadora de MOVE Pilates Boutique"
                  className="w-full h-full object-cover"
                  width={192}
                  height={192}
                  loading="lazy"
                  decoding="async"
                  style={{
                    objectPosition: "center 42%",
                    transform: "scale(1.4)",
                  }}
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>
            <div className="mt-3 text-center">
              <p className="font-sans text-[13px] text-crema-move/55 text-center tracking-[0.05em] mb-0">
                Génesis Romero
              </p>
              <p className="font-sans text-[11px] text-crema-move/55 text-center uppercase tracking-[0.1em] mb-0">
                Fundadora de MOVE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-tostado section-padding-oscuro px-6">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-center text-negro-move mb-text-lg reveal">Preguntas frecuentes</h2>
          <div className="w-10 h-[1px] bg-negro-move mx-auto mb-section-md reveal reveal-delay-1" />

          <div className="border-b border-negro-move reveal reveal-delay-2">
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

          <div className="mt-section-md text-center reveal">
            <h3 className="font-serif text-negro-move text-[22px] mb-text-md italic">
              ¿Tienes más preguntas?
            </h3>
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

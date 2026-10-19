import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

/* Pregunta frecuente desplegable: número, pregunta y un más que gira hasta formar un menos.
   La misma pieza en toda la web (Home, Eventos…). `idPrefix` evita ids repetidos. */
export default function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
  idPrefix = "faq",
}: {
  faq: { question: string; answer: string; link?: { label: string; href: string } };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(isOpen && contentRef.current ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

  const questionId = `${idPrefix}-question-${index}`;
  const answerId = `${idPrefix}-answer-${index}`;

  return (
    /* El estado abierto va en un atributo: la clase la gestiona la animación de entrada */
    <div className="fq-item reveal" data-open={isOpen} style={{ "--i": index } as CSSProperties}>
      <button onClick={onToggle} className="fq-q" aria-expanded={isOpen} aria-controls={answerId} id={questionId}>
        <span className="fq-n" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="fq-text">{faq.question}</span>
        <span className="fq-toggle" aria-hidden="true" />
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        ref={contentRef}
        className="fq-a"
        style={{ maxHeight: `${height}px`, opacity: isOpen ? 1 : 0 }}
      >
        <p className="m-text">{faq.answer}</p>
        {faq.link &&
          (faq.link.href.startsWith("/") ? (
            <Link to={faq.link.href} className="fq-link" tabIndex={isOpen ? 0 : -1}>
              {faq.link.label}
            </Link>
          ) : (
            <a href={faq.link.href} target="_blank" rel="noreferrer" className="fq-link" tabIndex={isOpen ? 0 : -1}>
              {faq.link.label}
            </a>
          ))}
      </div>
    </div>
  );
}

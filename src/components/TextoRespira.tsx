import { useEffect, useRef, type ElementType } from "react";

/* Texto que se lee "respirando": cada palabra pasa de tenue a plena
   al ritmo del scroll, como una lectura en voz baja. */
export default function TextoRespira({
  as: Tag = "p",
  text,
  className,
}: {
  as?: ElementType;
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-read");
      return;
    }

    const spans = Array.from(element.querySelectorAll<HTMLElement>(".tr-word"));
    const total = spans.length;
    let raf = 0;

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = element.getBoundingClientRect();
      /* Empieza cuando el texto entra por abajo y termina con él a media pantalla */
      const progress = Math.max(0, Math.min(1, (vh * 0.9 - rect.top) / (rect.height + vh * 0.4)));
      const reading = progress * (total + 2);
      spans.forEach((span, index) => {
        const lit = Math.max(0, Math.min(1, reading - index));
        span.style.setProperty("--lit", lit.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={`tr-text${className ? ` ${className}` : ""}`} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} className="tr-word" aria-hidden="true">
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

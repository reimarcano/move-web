import { useEffect, useRef } from "react";
import { VALORACION_PRECIO, VALORACION_WHATSAPP_URL } from "../data/valoracion";
import FichaValoracion from "./FichaValoracion";

const pasos = [
  {
    titulo: "Te conocemos",
    texto: "Tu nivel, tu postura, tus objetivos y cualquier molestia o lesión.",
  },
  {
    titulo: "Descubres el método",
    texto: "Una sesión guiada y adaptada a tu ritmo para sentir cómo trabaja tu cuerpo.",
  },
  {
    titulo: "Te recomendamos tu plan",
    texto: `Y si te apuntas, descontamos los ${VALORACION_PRECIO} € de tu primer mes o bono.`,
  },
];

/* Bloque "¿Primera vez en MOVE?" del Home: clase de valoración en cinta marrón a sangre.
   Al hacer scroll la foto hace parallax y los pasos se rellenan. */
export default function PrimeraVez() {
  const bandRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const img = imgRef.current;
    const steps = stepsRef.current;
    const title = titleRef.current;
    if (!band || !img || !steps || !title) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(steps.children) as HTMLElement[];
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    let raf = 0;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(title);

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (!reduce) {
        const b = band.getBoundingClientRect();
        const k = clamp((vh - b.top) / (vh + b.height));
        img.style.transform = `translateY(${((k - 0.5) * -14).toFixed(2)}%)`;
      }
      const s = steps.getBoundingClientRect();
      const sp = clamp((vh * 0.7 - s.top) / s.height);
      steps.style.setProperty("--s", sp.toFixed(3));
      items.forEach((li, i) =>
        li.classList.toggle("is-on", sp > (i + 0.15) / items.length || (i === 0 && sp > 0)),
      );
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
      io.disconnect();
    };
  }, []);

  return (
    <section className="m-section primera-vez" id="primera-vez" aria-labelledby="primera-vez-titulo">
      <div className="m-head">
        <span className="m-eyebrow reveal">¿Primera vez en MOVE?</span>
        <p className="m-title-sm mt-3.5 reveal reveal-delay-1">
          Empieza con una clase <em>pensada para ti.</em>
        </p>
      </div>

      <div className="m-band pv-band" ref={bandRef}>
        <figure className="pv-photo">
          <img
            ref={imgRef}
            src="/assets/move-pilates-madrid-03.webp"
            alt="Clase de Pilates Reformer guiada en MOVE Pilates Boutique, Pozuelo de Alarcón"
            width={1707}
            height={2560}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="pv-copy">
          <span className="m-eyebrow m-eyebrow-light reveal">Empieza aquí</span>
          <h2 id="primera-vez-titulo" className="pv-title" ref={titleRef}>
            <span className="pv-mask"><span>Tu clase de</span></span>
            <span className="pv-mask"><span><em>Valoración.</em></span></span>
          </h2>
          <p className="pv-lead reveal reveal-delay-1">
            Tu primera sesión de Pilates Reformer, guiada de principio a fin, para conocerte y
            encontrar el plan que mejor encaja contigo.
          </p>

          <FichaValoracion className="reveal reveal-delay-2" />

          <ol className="pv-steps" ref={stepsRef}>
            {pasos.map((paso, i) => (
              <li key={paso.titulo} className={`reveal reveal-delay-${i + 1}`}>
                <span className="pv-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{paso.titulo}</h3>
                  <p>{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="pv-cta reveal reveal-delay-3">
            <a
              href={VALORACION_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Reservar clase de valoración por WhatsApp"
              className="btn-inverted"
            >
              Reservar mi clase
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

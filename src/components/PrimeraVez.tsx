import { useEffect, useRef } from "react";
import { VALORACION_PRECIO, VALORACION_WHATSAPP_URL } from "../data/valoracion";

/* Cada paso lleva su dato, siempre con la misma anatomía (etiqueta ··· valor).
   El grupo reducido primero (es lo que nos permite conocerte), la duración después
   y el precio al final, ya en contexto. */
const pasos = [
  {
    titulo: "Te conocemos",
    texto: "Tu nivel, tu postura, tus objetivos y cualquier molestia o lesión.",
    etiqueta: "Grupo",
    dato: "Máx. 4 personas",
  },
  {
    titulo: "Descubres el método",
    texto: "Una sesión guiada y adaptada a tu ritmo para sentir cómo trabaja tu cuerpo.",
    etiqueta: "Duración",
    dato: "50 min",
  },
  {
    titulo: "Te recomendamos tu plan",
    texto: "El que mejor encaja contigo. Si te apuntas, se descuenta de tu primer mes o bono.",
    etiqueta: "Precio",
    dato: String(VALORACION_PRECIO),
  },
];

/* Bloque "¿Primera vez en MOVE?" del Home: clase de valoración en cinta marrón a sangre.
   La foto va a sangre y nace desde el borde de la pantalla, como el carro del reformer
   al deslizarse; después hace parallax y la línea de los pasos avanza con el scroll. */
export default function PrimeraVez() {
  const bandRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const photo = photoRef.current;
    const img = imgRef.current;
    const steps = stepsRef.current;
    const title = titleRef.current;
    if (!band || !photo || !img || !steps || !title) return;

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
        const p = photo.getBoundingClientRect();
        const r = clamp((vh - p.top) / (vh * 0.8));
        const eased = 1 - Math.pow(1 - r, 3);
        photo.style.clipPath = `inset(0 ${((1 - eased) * 100).toFixed(2)}% 0 0)`;
      }
      const s = steps.getBoundingClientRect();
      /* La línea va del centro del 01 al centro del 03, ni un píxel más */
      const first = items[0].querySelector(".pv-n")?.getBoundingClientRect();
      const last = items[items.length - 1].querySelector(".pv-n")?.getBoundingClientRect();
      if (first && last) {
        steps.style.setProperty("--line-top", `${(first.top + first.height / 2 - s.top).toFixed(1)}px`);
        steps.style.setProperty("--line-bottom", `${(s.bottom - (last.top + last.height / 2)).toFixed(1)}px`);
      }
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
    <section className="m-section primera-vez chapter-sheet" id="primera-vez" aria-labelledby="primera-vez-titulo">
      <div className="m-head">
        <span className="m-eyebrow reveal">¿Primera vez en MOVE?</span>
        <p className="m-title-sm mt-3.5 reveal reveal-delay-1">
          Empieza con una clase <em>pensada para ti.</em>
        </p>
      </div>

      <div className="m-band pv-band" ref={bandRef}>
        <figure className="pv-photo" ref={photoRef}>
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

          <ol className="pv-steps" ref={stepsRef}>
            {pasos.map((paso, i) => (
              <li key={paso.titulo} className={`reveal reveal-delay-${i + 1}`}>
                <span className="pv-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{paso.titulo}</h3>
                  <p>{paso.texto}</p>
                  {/* Línea de dato: el punteado se traza cuando la línea llega a su nodo */}
                  <p className="m-dato">
                    <span className="m-dato-label">{paso.etiqueta}</span>
                    <span className="m-dato-leader" aria-hidden="true" />
                    <span className="m-dato-value">{paso.dato}</span>
                  </p>
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

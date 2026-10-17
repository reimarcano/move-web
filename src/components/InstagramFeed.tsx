import { useEffect, useRef } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, instagramPosts } from "../data/instagram";

const SPEED = 35; // px/s: avance calmado hacia la izquierda

/* Galería "Sigue el movimiento" antes del footer.
   Ventanas: los marcos avanzan solos hacia la izquierda en bucle (la pista va duplicada) y la foto,
   dentro de cada marco, se desplaza algo más despacio, como si cada marco fuera una ventana al estudio.
   Con el cursor encima la tira frena con suavidad hasta detenerse; cada foto abre Instagram.
   Formato vertical de Instagram (4:5) y sin iconos encima: al pasar, la foto respira y
   aparece el usuario sobre un filete fino. */
export default function InstagramFeed() {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const loop = [...instagramPosts, ...instagramPosts];

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = Array.from(track.querySelectorAll<HTMLElement>(".ig-tile"));
    const imgs = tiles.map((tile) => tile.querySelector("img") as HTMLImageElement);
    let half = 0;
    let lefts: number[] = [];
    let tileW = 0;
    const measure = () => {
      half = track.scrollWidth / 2 + parseFloat(getComputedStyle(track).columnGap || "0") / 2;
      lefts = tiles.map((tile) => (tile.parentElement as HTMLElement).offsetLeft);
      tileW = tiles[0]?.offsetWidth ?? 0;
    };

    let offset = 0;
    let vel = SPEED;
    let target = SPEED;
    let visible = true;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      vel += (target - vel) * Math.min(1, dt * 1.8); // frena y arranca con suavidad
      offset = (offset + vel * dt) % half;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      // Paralaje dentro del marco según su posición en pantalla
      const W = strip.clientWidth;
      for (let k = 0; k < tiles.length; k++) {
        const x = lefts[k] - offset;
        if (x < -tileW || x > W) continue;
        const p = (x + tileW / 2) / W - 0.5; // -0.5 izquierda · 0 centro · 0.5 derecha
        imgs[k].style.transform = `scale(1.2) translateX(${(p * -14).toFixed(2)}%)`;
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    // Solo se anima mientras la sección está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(strip);

    const pause = (e: Event) => {
      if ((e.target as HTMLElement).closest(".ig-tile")) target = 0;
    };
    const resume = () => {
      target = SPEED;
    };
    strip.addEventListener("mouseover", pause);
    strip.addEventListener("mouseleave", resume);
    strip.addEventListener("focusin", pause);
    strip.addEventListener("focusout", resume);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      strip.removeEventListener("mouseover", pause);
      strip.removeEventListener("mouseleave", resume);
      strip.removeEventListener("focusin", pause);
      strip.removeEventListener("focusout", resume);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="ig-feed" aria-labelledby="ig-feed-title">
      <div className="ig-head">
        <div>
          <span className="m-eyebrow">Instagram</span>
          <h2 id="ig-feed-title" className="m-title">
            Sigue el <em>movimiento.</em>
          </h2>
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="ig-follow">
          @{INSTAGRAM_HANDLE}
        </a>
      </div>

      <div className="ig-strip" ref={stripRef}>
        <ul className="ig-track" ref={trackRef}>
          {loop.map((post, i) => {
            const clone = i >= instagramPosts.length;
            return (
              <li key={i} aria-hidden={clone || undefined}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="ig-tile"
                  tabIndex={clone ? -1 : undefined}
                  aria-label={`${post.alt} — ver en Instagram`}
                >
                  <img src={post.src} alt="" decoding="async" draggable={false} />
                  <span className="ig-caption" aria-hidden="true">@{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, instagramPosts } from "../data/instagram";

const SPEED = 42; // px/s: avance calmado hacia la izquierda (+20% sobre los 35 iniciales)

/* Galería "Sigue el movimiento" antes del footer.
   Ventanas: los marcos avanzan solos hacia la izquierda en bucle (la pista va duplicada) y la foto,
   dentro de cada marco, se desplaza algo más despacio, como si cada marco fuera una ventana al estudio.
   Con el cursor encima la tira frena con suavidad hasta detenerse; cada foto abre Instagram.
   Formato vertical de Instagram (4:5) y sin iconos encima: al pasar, la foto respira y
   aparece el usuario sobre un filete fino.
   En móvil la tira se coge con el dedo: se detiene bajo él, se arrastra y, al soltar,
   sigue con la inercia del gesto hasta recuperar su ritmo.
   El scroll de la página también la empuja: al bajar avanza más rápido y al subir
   retrocede, para recorrer todas las fotos de un vistazo. */
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
      if (!dragging) offset += vel * dt + scrollPush;
      scrollPush = 0;
      offset = ((offset % half) + half) % half;
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

    // Empuje del scroll de la página (suavizado en cada fotograma)
    const SCROLL_PUSH = 0.9;
    let scrollPush = 0;
    let lastScrollY = window.scrollY;
    const onPageScroll = () => {
      const y = window.scrollY;
      if (visible) scrollPush += (y - lastScrollY) * SCROLL_PUSH;
      lastScrollY = y;
    };

    // Ratón y foco: la tira frena al pasar por encima (ignorando los eventos que emula el táctil)
    let lastTouch = 0;
    const pause = (e: Event) => {
      if (performance.now() - lastTouch < 800) return;
      if ((e.target as HTMLElement).closest(".ig-tile")) target = 0;
    };
    const resume = () => {
      if (performance.now() - lastTouch < 800) return;
      target = SPEED;
    };

    // Táctil: arrastre horizontal con inercia; el gesto vertical sigue desplazando la página
    let dragging = false;
    let axis: "x" | "y" | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastT = 0;
    let fingerVel = 0;
    let moved = false;

    const onTouchStart = (e: TouchEvent) => {
      lastTouch = performance.now();
      const t = e.touches[0];
      startX = lastX = t.clientX;
      startY = t.clientY;
      lastT = performance.now();
      axis = null;
      moved = false;
      fingerVel = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      lastTouch = performance.now();
      const t = e.touches[0];
      if (!axis) {
        const dx = Math.abs(t.clientX - startX);
        const dy = Math.abs(t.clientY - startY);
        if (dx < 6 && dy < 6) return;
        axis = dx > dy ? "x" : "y";
        if (axis === "x") {
          dragging = true;
          vel = 0;
          target = 0;
        }
      }
      if (axis !== "x") return;
      const now = performance.now();
      const dx = t.clientX - lastX;
      offset -= dx;
      moved = true;
      const dtMove = Math.max(1, now - lastT) / 1000;
      fingerVel = fingerVel * 0.6 + (dx / dtMove) * 0.4;
      lastX = t.clientX;
      lastT = now;
    };
    const onTouchEnd = () => {
      lastTouch = performance.now();
      if (dragging) {
        // Al soltar, la tira sigue con la inercia del dedo y vuelve poco a poco a su ritmo
        vel = Math.max(-2200, Math.min(2200, -fingerVel));
        dragging = false;
      }
      target = SPEED;
      axis = null;
    };
    // Un arrastre no debe abrir Instagram al soltar sobre una foto
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    strip.addEventListener("mouseover", pause);
    strip.addEventListener("mouseleave", resume);
    strip.addEventListener("focusin", pause);
    strip.addEventListener("focusout", resume);
    strip.addEventListener("touchstart", onTouchStart, { passive: true });
    strip.addEventListener("touchmove", onTouchMove, { passive: true });
    strip.addEventListener("touchend", onTouchEnd);
    strip.addEventListener("touchcancel", onTouchEnd);
    strip.addEventListener("click", onClickCapture, true);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onPageScroll, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      strip.removeEventListener("mouseover", pause);
      strip.removeEventListener("mouseleave", resume);
      strip.removeEventListener("focusin", pause);
      strip.removeEventListener("focusout", resume);
      strip.removeEventListener("touchstart", onTouchStart);
      strip.removeEventListener("touchmove", onTouchMove);
      strip.removeEventListener("touchend", onTouchEnd);
      strip.removeEventListener("touchcancel", onTouchEnd);
      strip.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onPageScroll);
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
                  <img src={post.src} alt="" loading="lazy" decoding="async" draggable={false} />
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

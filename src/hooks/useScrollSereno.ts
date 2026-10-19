import { useEffect } from "react";

/* Scroll sereno: con rueda o trackpad cada gesto avanza algo menos y llega con inercia
   suave, para recorrer la web sin prisa. No toca el táctil (el dedo manda), ni el
   teclado, ni la barra de desplazamiento; con movimiento reducido no hace nada. */

const STEP = 0.72; // fracción del desplazamiento de cada gesto de rueda
const EASE = 0.085; // cuánto se acerca al destino en cada fotograma de 60 Hz (más bajo = más calma)
const FRAME = 1000 / 60;
const MAX_AHEAD = 1.5; // el destino nunca se aleja más de 1,5 pantallas de donde estás

/* ¿La rueda actúa sobre algo con scroll propio (menú, panel, modal) que aún puede moverse? */
function insideScrollable(node: EventTarget | null, deltaY: number) {
  if (!(node instanceof Element)) return false;
  for (let el: Element | null = node; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      const canMove = deltaY > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight : el.scrollTop > 0;
      if (canMove) return true;
    }
  }
  return false;
}

export function useScrollSereno() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let target = 0;
    let current = 0;
    let last = 0; // última posición que fijamos nosotros
    let raf = 0;
    let prev = 0; // hora del fotograma anterior

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const frame = (now: number) => {
      // Si algo ajeno ha movido la página (teclado, barra, enlace), cedemos
      if (Math.abs(window.scrollY - last) > 2) {
        stop();
        return;
      }
      /* El acercamiento depende del tiempo, no de los fotogramas: la misma velocidad
         en una pantalla de 60 Hz que en una de 120 o 144 Hz */
      const dt = Math.min(now - (prev || now - FRAME), FRAME * 4);
      prev = now;
      current += (target - current) * (1 - Math.pow(1 - EASE, dt / FRAME));
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      last = window.scrollY;
      raf = current === target ? 0 : requestAnimationFrame(frame);
    };

    const onWheel = (event: WheelEvent) => {
      // Zoom, gestos horizontales o zonas con su propio scroll siguen siendo nativos
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      // Con un visor o un menú abierto (scroll bloqueado) la página no se mueve
      if (document.body.style.overflow === "hidden") return;
      if (insideScrollable(event.target, event.deltaY)) return;

      event.preventDefault();
      const y = window.scrollY;
      if (!raf) {
        target = current = last = y; // un gesto nuevo parte de donde estás
        prev = 0;
      }

      const unit = event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? window.innerHeight : 1;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const reach = window.innerHeight * MAX_AHEAD;
      const next = target + event.deltaY * unit * STEP;
      target = Math.min(Math.max(next, y - reach, 0), y + reach, max);

      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
    };
  }, []);
}

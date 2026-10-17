/* ────────────────────────────────────────────
   Relevo entre el loader del muelle y la portada.
   El loader avisa cuando el cabezal encaja y dice en qué punto de la
   pantalla ha sido el "clic"; la portada nace exactamente desde ahí.
   ──────────────────────────────────────────── */

export type IntroOrigin = { x: number; y: number } | null;

let status: "pending" | "released" = "pending";
let origin: IntroOrigin = null;
const listeners = new Set<() => void>();
let abandonTimer = 0;

/** El loader va a mostrarse: la portada espera. */
export function holdIntro() {
  window.clearTimeout(abandonTimer);
  status = "pending";
  origin = null;
}

/** El loader se desmonta sin terminar: libera la portada salvo que vuelva a montarse enseguida. */
export function abandonIntro() {
  window.clearTimeout(abandonTimer);
  abandonTimer = window.setTimeout(() => releaseIntro(null), 0);
}

/** El loader termina (o no se muestra): la portada puede nacer. */
export function releaseIntro(point: IntroOrigin) {
  status = "released";
  origin = point;
  listeners.forEach((listener) => listener());
}

/** Llama a `callback` en cuanto la portada pueda nacer. Devuelve la baja. */
export function onIntro(callback: (point: IntroOrigin) => void) {
  if (status === "released") {
    callback(origin);
    return () => {};
  }

  const listener = () => callback(origin);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

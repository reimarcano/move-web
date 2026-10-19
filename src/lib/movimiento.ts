/* ────────────────────────────────────────────
   Ritmo común del scroll en toda la web.
   Todas las escenas que siguen al scroll (portada, aperturas, galerías) usan el mismo
   muelle, así ninguna franja llega antes ni se arrastra más que la anterior.
   ──────────────────────────────────────────── */

/** Muelle sobre el progreso del scroll: llega con calma, sin rebote */
export const MUELLE_SCROLL = { stiffness: 90, damping: 26, mass: 0.5 };

/** Scroll (en svh) que pide cada foto de una galería. En ordenador la rueda avanza
    mucho más que el dedo: allí pide más recorrido */
export const POR_FOTO = { escritorio: 90, movil: 55 };

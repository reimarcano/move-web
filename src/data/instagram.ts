export const INSTAGRAM_HANDLE = "move.pilatesboutique";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/* Publicaciones de la galería "Sigue el movimiento" (antes del footer).
   Para enlazar una publicación concreta, añade su URL en `href`
   (p. ej. "https://www.instagram.com/p/XXXXXXXX/"); sin `href` lleva al perfil. */
export type InstagramPost = { src: string; alt: string; href?: string };

export const instagramPosts: InstagramPost[] = [
  { src: "/assets/01-move-pilates-pozuelo.webp", alt: "Clase en MOVE Pilates Boutique" },
  { src: "/assets/move-pilates-madrid-03.webp", alt: "Reformer en el estudio MOVE" },
  { src: "/assets/04-move-pilates-pozuelo.webp", alt: "Alumna en clase de Pilates" },
  { src: "/assets/move-pilates-madrid-08.webp", alt: "Detalle del estudio MOVE" },
  { src: "/assets/move-retiro-bienestar-sinergia-madrid-02.jpg", alt: "Retiro de bienestar MOVE" },
  { src: "/assets/06-move-pilates-pozuelo.webp", alt: "Ejercicio guiado en MOVE" },
  { src: "/assets/move-pilates-madrid-12.webp", alt: "Sesión de Pilates en Pozuelo" },
  { src: "/assets/08-move-pilates-pozuelo.webp", alt: "Grupo reducido en MOVE" },
];

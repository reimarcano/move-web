export const INSTAGRAM_HANDLE = "move.pilatesboutique";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

/* Galería "Sigue el movimiento" (antes del footer). Todas las fotos abren el perfil.
   Orden por carácter y color: una foto marrón de estudio editorial cada ~4 (siempre una a la vista),
   un detalle cada 3-4 entre personas, luz alternada (oscura · clara · media) y tomas parecidas
   separadas (sénior, correcciones, mancuernas). Si cambias fotos, mantén ese ritmo. */
export type InstagramPost = { src: string; alt: string };

export const instagramPosts: InstagramPost[] = [
  { src: "/assets/move-instagram-01.webp", alt: "Alumna en el reformer de espaldas, sobre fondo marrón" },
  { src: "/assets/move-instagram-05.webp", alt: "Estiramiento de sirena sobre el reformer a contraluz" },
  { src: "/assets/move-instagram-08.webp", alt: "Agarre de la correa del reformer durante la clase" },
  { src: "/assets/move-instagram-11.webp", alt: "Pareja de alumnos sénior trabajando con correas" },
  { src: "/assets/move-instagram-07.webp", alt: "Sudadera con el logo de MOVE" },
  { src: "/assets/move-instagram-03.webp", alt: "Detalle de los muelles del reformer" },
  { src: "/assets/move-instagram-04.webp", alt: "Instructora corrigiendo un ejercicio con mancuernas" },
  { src: "/assets/move-instagram-06.webp", alt: "Alumnos haciendo shoulder bridge con correas en el reformer" },
  { src: "/assets/move-instagram-13.webp", alt: "Ejercicio en cuadrupedia sobre fondo marrón" },
  { src: "/assets/move-instagram-15.webp", alt: "Aro de Pilates y correctores de pies en el estudio" },
  { src: "/assets/move-instagram-12.webp", alt: "Instructora ajustando la postura del hombro de una alumna" },
  { src: "/assets/move-instagram-16.webp", alt: "Cartel de MOVE Pilates Reformer en el metro" },
  { src: "/assets/move-instagram-10.webp", alt: "Mano sobre la barra del reformer" },
  { src: "/assets/move-instagram-14.webp", alt: "Alumna sénior trabajando piernas con correas en el reformer" },
  { src: "/assets/move-instagram-02.webp", alt: "Alumnas charlando sobre los reformers antes de clase" },
  { src: "/assets/move-instagram-09.webp", alt: "Corrección personalizada a un alumno en el reformer" },
];

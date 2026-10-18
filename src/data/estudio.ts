/* ────────────────────────────────────────────
   Nuestro estudio: el espacio, las clases y quién te guía.
   Todo el contenido de la página vive aquí (copy, fotos con su descripción y el mensaje
   de WhatsApp), así la página solo se ocupa de la puesta en escena.
   ──────────────────────────────────────────── */

import type { Foto, Momento } from "./eventos";

const espacio = (n: number) => `/assets/${String(n).padStart(2, "0")}-move-pilates-pozuelo-900.webp`;
const clase = (n: number) => `/assets/move-pilates-madrid-${String(n).padStart(2, "0")}-900.webp`;

export const APERTURA_ESTUDIO = {
  imagen: espacio(1),
  descripcion: "Sala de MOVE Pilates Boutique en Pozuelo de Alarcón con reformers de madera y luz natural del ventanal",
  antetitulo: "Nuestro estudio · Pozuelo de Alarcón",
  promesa: "Un espacio pensado con intención.",
  respuesta: "Para conectarte.",
  pie: "MOVE Pilates Boutique",
};

export const INTRO_ESTUDIO =
  "Cada detalle de MOVE está pensado para que te sientas a gusto, en confianza y presente desde el momento en que entras.";

/* El espacio en cuatro detalles */
export const momentosEspacio: Momento[] = [
  {
    titulo: "Entrar.",
    texto: "Luz natural filtrada por las cortinas, plantas y un silencio que invita a bajar el ritmo.",
    foto: espacio(3),
    alt: "Plantas y luz natural en la sala de MOVE Pilates Boutique",
  },
  {
    titulo: "Tu reformer.",
    texto: "Reformers de madera para grupos de máximo 4 personas: espacio para moverte y atención para cada alumno.",
    foto: espacio(2),
    alt: "Reformers de madera alineados en la sala de MOVE Pilates Boutique",
  },
  {
    titulo: "Los detalles.",
    texto: "Aros, pelotas y todo lo necesario a mano, para que la sesión fluya sin interrupciones.",
    foto: espacio(6),
    alt: "Aro de Pilates y accesorios junto al reformer en MOVE",
  },
  {
    titulo: "Quedarte un momento.",
    texto: "Un rincón para un té o un vaso de agua antes y después de clase.",
    foto: espacio(4),
    alt: "Rincón con aparador, plantas y hervidor bajo el logotipo de MOVE",
  },
];

export const galeriaClases: Foto[] = [
  { src: clase(1), alt: "Instructora acompañando un ejercicio avanzado en el reformer" },
  { src: clase(4), alt: "Alumna en un estiramiento en arco sobre el reformer a contraluz" },
  { src: clase(7), alt: "Instructora corrigiendo a una alumna en un ejercicio con correas" },
  { src: clase(8), alt: "Dos alumnas trabajando piernas con correas en el reformer" },
  { src: clase(10), alt: "Alumna con aro de Pilates de rodillas sobre el reformer" },
  { src: clase(11), alt: "Alumna trabajando con aro de Pilates en clase grupal" },
  { src: clase(13), alt: "Alumna en un ejercicio de equilibrio con correa sobre el reformer" },
  { src: clase(15), alt: "Clase grupal de Pilates Reformer en MOVE Pozuelo" },
];

export const GENESIS = {
  foto: "/assets/genesis-romero-1200.webp",
  alt: "Génesis Romero, fundadora e instructora de MOVE Pilates Boutique en Pozuelo de Alarcón",
  nombre: "Génesis",
  apellido: "Romero.",
  rol: "Fundadora e instructora",
  texto:
    "Instructora y fundadora de MOVE Pilates Boutique en Pozuelo de Alarcón. Cada clase que diseña parte de una convicción: que moverse bien cambia cómo te sientes, cómo te mueves y cómo te habitas.",
};

export const WHATSAPP_VISITA =
  "https://wa.me/34654495508?text=" +
  encodeURIComponent("Hola, me gustaría conocer el estudio MOVE y reservar mi clase de valoración.");

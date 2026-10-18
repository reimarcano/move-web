/* ────────────────────────────────────────────
   Eventos MOVE: retiros de bienestar y Pilates Brunch.
   Todo el contenido de la página vive aquí (copy, fotos con su descripción, mensajes
   de WhatsApp y preguntas), así la página solo se ocupa de la puesta en escena.
   ──────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/34654495508?text=";
const whatsapp = (mensaje: string) => WHATSAPP + encodeURIComponent(mensaje);

const retiro = (n: number) => `/assets/move-retiro-bienestar-sinergia-madrid-${String(n).padStart(2, "0")}-900.webp`;
const brunch = (n: number | "portada") =>
  `/assets/move-pilates-bruch-${typeof n === "number" ? String(n).padStart(2, "0") : n}-900.webp`;

export type Foto = { src: string; alt: string };
export type Momento = { titulo: string; texto: string; foto: string; alt: string; encuadre?: string };

export type Experiencia = {
  id: string;
  titulo: string;
  cursiva: string;
  entradilla: string;
  momentos: Momento[];
  frase: string;
  galeria: Foto[];
  cierre: { pregunta: string; boton: string; whatsapp: string };
};

export const VIDEO_RETIRO = {
  src: "/assets/move-retiro-bienestar-sinergia-madrid-video-01.mp4",
  poster: retiro(1),
  caption: "Retiro de bienestar MOVE",
};

export const INTRO_EVENTOS =
  "Retiros y brunches diseñados con la misma intención que cada clase de MOVE, para que salgas diferente a como entraste.";

export const experiencias: Experiencia[] = [
  {
    id: "retiros",
    titulo: "Retiros de",
    cursiva: "bienestar.",
    entradilla: "Un espacio para desconectar, moverte y volver a ti.",
    momentos: [
      {
        titulo: "Llegar.",
        texto: "Espacios elegidos con intención, dentro o fuera de Madrid, donde la luz y el silencio ya hacen su trabajo antes de que empiece nada.",
        foto: retiro(1),
        alt: "Sala del retiro MOVE con esterillas y ventanales abiertos a los árboles",
      },
      {
        titulo: "Moverte.",
        texto: "Movimiento consciente en suelo, guiado con el mismo cuidado que cada clase. Sin agenda apretada ni nada que demostrar.",
        foto: "/assets/move-retiro-moverte.webp",
        alt: "Instructora guiando con los brazos en alto a un grupo tumbado sobre esterillas junto al ventanal en el retiro MOVE",
      },
      {
        titulo: "Sentarte a la mesa.",
        texto: "Comida real, elaborada con cuidado y compartida al aire libre.",
        foto: retiro(6),
        alt: "Comida compartida en una mesa larga al aire libre en el retiro MOVE",
      },
      {
        titulo: "Conectar.",
        texto: "Arteterapia, sound healing y prácticas que le hablan al cuerpo de formas que las palabras no siempre alcanzan.",
        foto: retiro(7),
        alt: "Taller de arteterapia durante el retiro de bienestar MOVE",
      },
      {
        titulo: "Volver a ti.",
        texto: "Tiempo de calidad contigo, en un entorno que lo hace posible.",
        foto: retiro(8),
        alt: "Abrazo entre dos alumnas al cierre de una práctica en el retiro MOVE",
      },
    ],
    frase: "“Cada edición tiene su propio carácter. Lo que no cambia es la intención.”",
    galeria: [
      { src: retiro(2), alt: "Alumna en postura de meditación frente al ventanal del retiro MOVE" },
      { src: retiro(5), alt: "Grupo con los brazos en alto guiado por la instructora en el retiro MOVE" },
      { src: retiro(4), alt: "Alumnas compartiendo un momento en la cocina del retiro MOVE" },
      { src: retiro(9), alt: "Relajación final con mantas sobre las esterillas en el retiro MOVE" },
      { src: retiro(10), alt: "Foto de grupo al atardecer en la terraza del retiro de bienestar MOVE" },
    ],
    cierre: {
      pregunta: "¿Quieres estar en el próximo retiro?",
      boton: "Apúntame al próximo retiro",
      whatsapp: whatsapp("Hola, me gustaría apuntarme a la lista de espera del próximo retiro de bienestar MOVE."),
    },
  },
  {
    id: "pilates-brunch",
    titulo: "Pilates",
    cursiva: "Brunch.",
    entradilla: "Una mañana con intención.",
    momentos: [
      {
        titulo: "Moverte.",
        texto: "Empezamos con una clase de Pilates guiada con la misma atención y el mismo cuidado que en el estudio.",
        foto: brunch(6),
        alt: "Alumna en zancada con cinta elástica sobre la esterilla en la terraza del Pilates Brunch",
      },
      {
        titulo: "Saborear la calma.",
        texto: "Café de especialidad, buena comida y espacio para respirar, en lugares donde el detalle importa tanto como en el estudio.",
        foto: brunch(3),
        alt: "Café de especialidad y tostadas del Pilates Brunch MOVE",
      },
      {
        titulo: "Celebrarlo en compañía.",
        texto: "Lo que se genera entre quienes vienen: presencia, conexión y la sensación de haber dedicado bien la mañana.",
        foto: brunch(1),
        alt: "Grupo sonriente en el estudio MOVE decorado con globos durante el Pilates Brunch",
      },
    ],
    frase: "“Un formato corto. Una mañana que se queda.”",
    galeria: [
      { src: brunch(8), alt: "Alumnas estirando con los brazos en alto en la terraza del Pilates Brunch" },
      { src: brunch(2), alt: "Clase de Pilates con balón en la terraza durante el Pilates Brunch" },
      { src: brunch(4), alt: "Alumna trabajando en el Reformer durante el Pilates Brunch" },
      { src: brunch(9), alt: "Alumno en el Reformer con cinta durante el Pilates Brunch" },
      { src: brunch(10), alt: "Ejercicio de equilibrio sobre una pierna en la terraza del Pilates Brunch" },
      { src: brunch(7), alt: "Bolsa de tela MOVE sobre el Reformer en el Pilates Brunch" },
      { src: brunch(5), alt: "Foto de grupo en la terraza al terminar el Pilates Brunch" },
      { src: brunch("portada"), alt: "Grupo brindando al terminar el Pilates Brunch MOVE" },
    ],
    cierre: {
      pregunta: "¿Quieres estar en el próximo Pilates Brunch?",
      boton: "Apúntame al próximo brunch",
      whatsapp: whatsapp("Hola, me gustaría apuntarme a la lista de espera del próximo Pilates Brunch de MOVE."),
    },
  },
];

export const WHATSAPP_LISTA_ESPERA = whatsapp(
  "Hola, me gustaría apuntarme a la lista de espera de la próxima experiencia MOVE (retiro o Pilates Brunch).",
);

/* Preguntas que la gente hace (y que los buscadores y las IAs responden con esta página) */
export const faqsEventos = [
  {
    question: "¿Qué es un retiro de bienestar MOVE?",
    answer:
      "Una experiencia fuera del estudio, en espacios elegidos con intención, dentro o fuera de Madrid, que combina movimiento consciente en suelo, comida real elaborada con cuidado y talleres como arteterapia o sound healing. Cada edición tiene su propio carácter.",
  },
  {
    question: "¿Qué es el Pilates Brunch?",
    answer:
      "Una mañana que empieza con una clase de Pilates guiada y continúa con un brunch con café de especialidad. Lo organizamos en el estudio de MOVE en Pozuelo de Alarcón o en espacios seleccionados con criterio.",
  },
  {
    question: "¿Dónde se celebran las experiencias MOVE?",
    answer:
      "Cada experiencia tiene su escenario. El Pilates Brunch se vive en nuestro estudio de Pozuelo de Alarcón (Av. de Europa, 31, local 7) o en espacios seleccionados estratégicamente para que todos lo disfruten: cafés de especialidad y lugares donde el detalle importa tanto como en MOVE. Los retiros se celebran en espacios elegidos con intención, dentro o fuera de Madrid, donde la naturaleza, la luz y la calma forman parte de la experiencia.",
  },
  {
    question: "¿Cuándo es la próxima edición y cómo me apunto?",
    answer:
      "Anunciamos cada experiencia en nuestras redes sociales (Instagram @move.pilatesboutique). También puedes escribirnos directamente a nuestro WhatsApp, +34 654 49 55 08, y te contamos los detalles de la próxima edición.",
  },
];

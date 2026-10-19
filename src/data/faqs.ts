import { VALORACION_WHATSAPP_URL } from "./valoracion";

export interface FAQ {
  question: string;
  answer: string;
  /* Enlace opcional bajo la respuesta: rutas internas ("/precios") o URLs externas */
  link?: { label: string; href: string };
}

/* Respuestas cortas (≈40–70 palabras); el detalle vive en la página enlazada.
   Orden: del primer interés del visitante hasta la reserva y la ubicación. */
export const faqs: FAQ[] = [
  {
    question: "¿Puedo empezar si nunca he hecho Pilates Reformer?",
    answer:
      "Sí. No hace falta experiencia previa. Al trabajar con grupos de máximo 4 personas, podemos guiarte desde el primer día, adaptar cada ejercicio a tu nivel y asegurarnos de que progresas con seguridad y confianza.",
  },
  {
    question: "¿Tenéis clase de prueba?",
    answer:
      "Sí: una clase de valoración de 50 minutos por 18 €. Conocemos tu nivel, tu postura y tus objetivos, y te recomendamos el plan que mejor encaja contigo. Si te apuntas, los 18 € se descuentan de tu primer mes o bono.",
    link: { label: "Reservar por WhatsApp", href: VALORACION_WHATSAPP_URL },
  },
  {
    question: "¿Cuántas personas hay por clase?",
    answer:
      "En MOVE trabajamos con grupos de máximo 4 personas. Así podemos corregirte, ajustar cada ejercicio y ayudarte a progresar en cada sesión. Es la base de nuestra propuesta: atención real y personalizada.",
  },
  {
    question: "¿Cuáles son las tarifas de Move Pilates Reformer en Pozuelo?",
    answer:
      "Clases grupales (máximo 4 personas): 115 €/mes con 1 sesión semanal, 190 € con 2 y 220 € con 3. Sesiones privadas 1:1: bono de 4 por 210 € o de 8 por 400 €. Todas las clases duran 50 minutos. Puedes empezar con la clase de valoración de 18 €, que se descuenta de tu primer plan.",
    link: { label: "Ver todas las tarifas", href: "/precios" },
  },
  {
    question: "¿Qué beneficios tiene el Pilates Reformer?",
    answer:
      "Fortalece el core y la musculatura profunda, mejora la postura y la movilidad, y te da más control del cuerpo en el día a día y en otros deportes. Como la máquina permite ajustar la resistencia, se adapta a cada persona: si empiezas de cero, si eres deportista, si tienes molestias de espalda o si estás en embarazo o postparto.",
    link: { label: "Ver para quién es cada clase", href: "/clases" },
  },
  {
    question: "¿Qué diferencia hay entre Pilates Reformer y Pilates en suelo?",
    answer:
      "En suelo trabajas con tu propio peso sobre una esterilla. El Reformer es una máquina con muelles que añaden o quitan resistencia, así que cada ejercicio se ajusta a ti: te ayuda cuando empiezas y te exige más a medida que progresas. El resultado es un trabajo más preciso, variado y fácil de adaptar a cada cuerpo.",
  },
  {
    question: "¿Ayuda el Pilates Reformer con el dolor de espalda?",
    answer:
      "Puede ser un buen aliado. Trabajamos la fuerza profunda, la movilidad y el control postural de forma progresiva, adaptando cada ejercicio a cómo te encuentras. No sustituye a un tratamiento: si tienes una lesión activa o dolor agudo, consulta antes con tu médico o fisioterapeuta, y te orientamos sobre el formato más adecuado para ti.",
  },
  {
    question: "¿Ofrecéis Pilates para embarazo?",
    answer:
      "Sí. Ofrecemos un programa específico para embarazo: trabajamos respiración, movilidad y estabilidad con ejercicios adaptados a cada etapa, de forma segura y personalizada. Escríbenos y te contamos cómo podemos acompañarte.",
  },
  {
    question: "¿Ofrecéis Pilates para postparto?",
    answer:
      "Sí. Acompañamos la vuelta al movimiento paso a paso, cuidando especialmente el core profundo y el suelo pélvico. Siempre dentro de tus rangos y según cómo te sientas cada día. Consúltanos antes de empezar para orientarte bien según tu momento de recuperación.",
  },
  {
    question: "¿Dónde está MOVE Pilates Boutique?",
    answer:
      "Estamos en Av. de Europa, 31, local 7 (acceso desde Calle Berna), 28224 Pozuelo de Alarcón, Madrid.",
  },
];

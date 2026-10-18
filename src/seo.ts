import { faqs } from './data/faqs';
import { experiencias, faqsEventos } from './data/eventos';
import { GENESIS, INTRO_ESTUDIO, momentosEspacio } from './data/estudio';

export const SITE_URL = 'https://www.movepilatesboutique.com';
export const OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;
const ESTUDIO = { '@id': `${SITE_URL}/#estudio` };

/* Datos estructurados que coinciden con lo que se ve en la página */
const faqPage = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export type SeoEntry = {
  title: string;
  description: string;
  /* JSON-LD propio de la página (se escribe en el HTML al compilar) */
  jsonLd?: object[];
  /* Resumen en texto plano para quien lea la página sin JavaScript */
  resumen?: { titulo: string; parrafos: string[] };
};

const [retiros, brunch] = experiencias;

export const seoByPath: Record<string, SeoEntry> = {
  '/': {
    title: 'Move Pilates Boutique · Pilates Reformer en Pozuelo de Alarcón',
    description:
      'Estudio boutique de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos de máximo 4 personas y sesiones privadas con atención personalizada.',
    jsonLd: [faqPage(faqs)],
  },
  '/clases': {
    title: 'Clases de Pilates Reformer · Move · Pozuelo de Alarcón',
    description:
      'Clases de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos de máximo 4 personas y sesiones privadas con atención personalizada.',
  },
  '/precios': {
    title: 'Tarifas Pilates Reformer · Move · Pozuelo de Alarcón',
    description:
      'Tarifas de Pilates Reformer en Pozuelo de Alarcón: clase de valoración por 18 €, clases grupales de máximo 4 personas desde 115 €/mes y bonos de sesiones privadas.',
  },
  '/eventos': {
    title: 'Retiros de bienestar y Pilates Brunch en Madrid · Move',
    description:
      'Retiros de bienestar en Madrid y Pilates Brunch en Pozuelo de Alarcón. Movimiento consciente, comida real y talleres en espacios elegidos con intención.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Retiros de bienestar MOVE',
        serviceType: 'Retiro de bienestar',
        description:
          'Retiros en espacios elegidos con intención, dentro o fuera de Madrid, con movimiento consciente en suelo, comida real elaborada con cuidado y talleres de arteterapia y sound healing.',
        provider: ESTUDIO,
        areaServed: { '@type': 'City', name: 'Madrid' },
        url: `${SITE_URL}/eventos#retiros`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Pilates Brunch MOVE',
        serviceType: 'Clase de Pilates y brunch',
        description:
          'Una mañana que empieza con una clase de Pilates guiada y continúa con un brunch con café de especialidad, en el estudio MOVE de Pozuelo de Alarcón o en espacios seleccionados.',
        provider: ESTUDIO,
        areaServed: { '@type': 'City', name: 'Pozuelo de Alarcón' },
        url: `${SITE_URL}/eventos#pilates-brunch`,
      },
      faqPage(faqsEventos),
    ],
    resumen: {
      titulo: 'Retiros de bienestar y Pilates Brunch · Move Pilates Boutique',
      parrafos: [
        `${retiros.titulo} ${retiros.cursiva} ${retiros.entradilla} ${retiros.momentos.map((m) => `${m.titulo} ${m.texto}`).join(' ')}`,
        `${brunch.titulo} ${brunch.cursiva} ${brunch.entradilla} ${brunch.momentos.map((m) => `${m.titulo} ${m.texto}`).join(' ')}`,
        ...faqsEventos.map((f) => `${f.question} ${f.answer}`),
      ],
    },
  },
  '/estudio': {
    title: 'Nuestro estudio de Pilates Reformer en Pozuelo · Move',
    description:
      'Conoce el estudio boutique de Pilates Reformer de MOVE en Pozuelo de Alarcón: luz natural, reformers de madera, grupos de máximo 4 personas y Génesis Romero como instructora.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Génesis Romero',
        jobTitle: 'Fundadora e instructora de Pilates Reformer',
        worksFor: ESTUDIO,
        image: `${SITE_URL}${GENESIS.foto}`,
        description: GENESIS.texto,
      },
    ],
    resumen: {
      titulo: 'Nuestro estudio · MOVE Pilates Boutique, Pozuelo de Alarcón',
      parrafos: [
        INTRO_ESTUDIO,
        momentosEspacio.map((m) => `${m.titulo} ${m.texto}`).join(' '),
        `${GENESIS.nombre} ${GENESIS.apellido} ${GENESIS.rol}. ${GENESIS.texto}`,
        'Dirección: Av. de Europa, 31, local 7, 28224 Pozuelo de Alarcón, Madrid. Reservas por WhatsApp: +34 654 49 55 08.',
      ],
    },
  },
  '/contacto': {
    title: 'Contacto · Move · Pozuelo de Alarcón',
    description:
      'Contacta con Move Pilates Boutique en Av. de Europa, 31, Pozuelo de Alarcón. Reservas mediante WhatsApp y la app TIMP.',
  },
  '/aviso-legal': {
    title: 'Aviso legal · Move Pilates Boutique',
    description: 'Información legal de Move Pilates Boutique.',
  },
  '/privacidad': {
    title: 'Política de privacidad · Move Pilates Boutique',
    description: 'Información sobre el tratamiento de datos personales en Move Pilates Boutique.',
  },
  '/cookies': {
    title: 'Política de cookies · Move Pilates Boutique',
    description: 'Información y configuración de cookies de Move Pilates Boutique.',
  },
};

export function canonicalForPath(pathname: string) {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

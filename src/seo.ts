import { faqs } from './data/faqs';
import { faqsEventos } from './data/eventos';
import { GENESIS } from './data/estudio';

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

/* Rutas que no existen (dist/404.html): sin canonical y fuera del índice */
export const NOT_FOUND_SEO = {
  title: 'Página no encontrada · MOVE Pilates Boutique',
  description: 'Esta página no existe. Vuelve al inicio de MOVE Pilates Boutique, estudio de Pilates Reformer en Pozuelo de Alarcón.',
};

export type SeoEntry = {
  title: string;
  description: string;
  /* JSON-LD propio de la página (se escribe en el HTML al compilar) */
  jsonLd?: object[];
};

export const seoByPath: Record<string, SeoEntry> = {
  '/': {
    title: 'MOVE Pilates Boutique · Pilates Reformer en Pozuelo de Alarcón',
    description:
      'Estudio boutique de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos de máximo 4 personas y sesiones privadas con atención personalizada.',
    jsonLd: [faqPage(faqs)],
  },
  '/clases': {
    title: 'Clases de Pilates Reformer en Pozuelo · MOVE Pilates Boutique',
    description:
      'Clases de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos de máximo 4 personas y sesiones privadas con atención personalizada.',
  },
  '/precios': {
    title: 'Precios de Pilates Reformer en Pozuelo · MOVE Pilates Boutique',
    description:
      'Tarifas de Pilates Reformer en Pozuelo de Alarcón: clase de valoración por 18 €, clases grupales de máximo 4 personas desde 115 €/mes y bonos de sesiones privadas.',
  },
  '/eventos': {
    title: 'Retiros y Pilates Brunch en Madrid · MOVE Pilates Boutique',
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
  },
  '/estudio': {
    title: 'Estudio de Pilates Reformer en Pozuelo · MOVE Pilates Boutique',
    description:
      'Conoce el estudio boutique de Pilates Reformer de MOVE en Pozuelo de Alarcón: luz natural, reformers de madera, grupos de máximo 4 personas y Génesis Romero como instructora.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        // El mismo @id que `founder` en index.html: Google une a la fundadora con el estudio
        '@id': `${SITE_URL}/estudio#genesis-romero`,
        name: 'Génesis Romero',
        jobTitle: 'Fundadora e instructora de Pilates Reformer',
        worksFor: ESTUDIO,
        image: `${SITE_URL}${GENESIS.foto}`,
        description: GENESIS.texto,
      },
    ],
  },
  '/contacto': {
    title: 'Contacto y reservas en Pozuelo · MOVE Pilates Boutique',
    description:
      'Contacta con Move Pilates Boutique en Av. de Europa, 31, Pozuelo de Alarcón. Reservas mediante WhatsApp y la app TIMP.',
  },
  '/aviso-legal': {
    title: 'Aviso legal · MOVE Pilates Boutique',
    description: 'Información legal de Move Pilates Boutique.',
  },
  '/privacidad': {
    title: 'Política de privacidad · MOVE Pilates Boutique',
    description: 'Información sobre el tratamiento de datos personales en Move Pilates Boutique.',
  },
  '/cookies': {
    title: 'Política de cookies · MOVE Pilates Boutique',
    description: 'Información y configuración de cookies de Move Pilates Boutique.',
  },
};

export function canonicalForPath(pathname: string) {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

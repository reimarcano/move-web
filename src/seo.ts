export const SITE_URL = 'https://www.movepilatesboutique.com';
export const OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

export const seoByPath: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Move Pilates Boutique · Pilates Reformer en Pozuelo de Alarcón',
    description:
      'Estudio boutique de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos de máximo 4 personas y sesiones privadas con atención personalizada.',
  },
  '/clases': {
    title: 'Clases de Pilates Reformer · Move · Pozuelo de Alarcón',
    description:
      'Clases de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos de máximo 4 personas y sesiones privadas con atención personalizada.',
  },
  '/precios': {
    title: 'Tarifas Pilates Reformer · Move · Pozuelo de Alarcón',
    description:
      'Consulta las tarifas de Pilates Reformer de Move Pilates Boutique en Pozuelo de Alarcón: bonos, clases grupales y sesiones privadas.',
  },
  '/eventos': {
    title: 'Retiros y Experiencias · Move · Pozuelo de Alarcón',
    description:
      'Retiros, encuentros y experiencias de movimiento y bienestar organizadas por Move Pilates Boutique en Pozuelo de Alarcón.',
  },
  '/estudio': {
    title: 'Nuestro Estudio · Move · Pozuelo de Alarcón',
    description:
      'Conoce Move Pilates Boutique, un estudio de Pilates Reformer en Pozuelo de Alarcón pensado para moverte con calma y atención.',
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

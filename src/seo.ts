export const SITE_URL = 'https://www.movepilatesboutique.com';
export const OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

export const seoByPath: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'MOVE Pilates Boutique · Pozuelo de Alarcón',
    description:
      'Estudio boutique de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos y sesiones privadas con atención personalizada.',
  },
  '/clases': {
    title: 'Clases de Pilates Reformer · MOVE · Pozuelo de Alarcón',
    description:
      'Clases de Pilates Reformer en Pozuelo de Alarcón. Grupos de máximo 4 personas y sesiones privadas 1:1. Reserva tu clase',
  },
  '/precios': {
    title: 'Tarifas Pilates Reformer · MOVE · Pozuelo de Alarcón',
    description:
      'Consulta las tarifas de Pilates Reformer de MOVE Pilates Boutique en Pozuelo de Alarcón: bonos, clases grupales y sesiones privadas.',
  },
  '/eventos': {
    title: 'Retiros y Experiencias · MOVE · Pozuelo de Alarcón',
    description:
      'Retiros, encuentros y experiencias de movimiento y bienestar organizadas por MOVE Pilates Boutique en Pozuelo de Alarcón.',
  },
  '/estudio': {
    title: 'Nuestro Estudio · MOVE · Pozuelo de Alarcón',
    description:
      'Conoce MOVE Pilates Boutique, un estudio de Pilates Reformer en Pozuelo de Alarcón pensado para moverte con calma y atención.',
  },
  '/contacto': {
    title: 'Contacto · MOVE · Pozuelo de Alarcón',
    description:
      'Contacta con MOVE Pilates Boutique en Av. de Europa, 31, Pozuelo de Alarcón. Reservas mediante WhatsApp y la app TIMP.',
  },
};

export function canonicalForPath(pathname: string) {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

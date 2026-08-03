/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from './components/Layout';
import Home from './pages/Home';
import { useScrollReveal } from './hooks/useScrollReveal';

const Classes = lazy(() => import('./pages/Classes'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NuestroEstudio = lazy(() => import('./pages/NuestroEstudio'));
const Eventos = lazy(() => import('./pages/Eventos'));
const Contacto = lazy(() => import('./pages/Contacto'));

const SITE_URL = 'https://www.movepilatesboutique.com';
const OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

const seoByPath: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  '/': {
    title: 'MOVE Pilates Boutique · Pozuelo de Alarcón',
    description:
      'Estudio boutique de Pilates Reformer en Pozuelo de Alarcón. Grupos reducidos y sesiones privadas con atención personalizada.',
  },
  '/clases': {
    title:
      'Clases de Pilates Reformer · MOVE · Pozuelo de Alarcón',
    description:
      'Descubre las clases de Pilates Reformer de MOVE en Pozuelo de Alarcón: grupos reducidos y sesiones privadas adaptadas a ti.',
  },
  '/precios': {
    title:
      'Tarifas Pilates Reformer · MOVE · Pozuelo de Alarcón',
    description:
      'Consulta las tarifas de Pilates Reformer de MOVE Pilates Boutique en Pozuelo de Alarcón: bonos, clases grupales y sesiones privadas.',
  },
  '/eventos': {
    title:
      'Retiros y Experiencias · MOVE · Pozuelo de Alarcón',
    description:
      'Retiros, encuentros y experiencias de movimiento y bienestar organizadas por MOVE Pilates Boutique en Pozuelo de Alarcón.',
  },
  '/estudio': {
    title:
      'Nuestro Estudio · MOVE · Pozuelo de Alarcón',
    description:
      'Conoce MOVE Pilates Boutique, un estudio de Pilates Reformer en Pozuelo de Alarcón pensado para moverte con calma y atención.',
  },
  '/contacto': {
    title:
      'Contacto · MOVE · Pozuelo de Alarcón',
    description:
      'Contacta con MOVE Pilates Boutique en Av. de Europa, 31, Pozuelo de Alarcón. Reservas mediante WhatsApp y la app TIMP.',
  },
};

function SeoManager() {
  const location = useLocation();

  const normalizedPath =
    location.pathname !== '/'
      ? location.pathname.replace(/\/+$/, '')
      : '/';

  const seo = seoByPath[normalizedPath] ?? seoByPath['/'];
  const canonical =
    normalizedPath === '/'
      ? `${SITE_URL}/`
      : `${SITE_URL}${normalizedPath}`;

  return (
    <Helmet>
      <html lang="es" />

      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="MOVE Pilates Boutique" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={seo.title} />
<meta name="twitter:description" content={seo.description} />
<meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}

function AppContent() {
  useScrollReveal();

  return (
    <>
      <SeoManager />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="clases" element={<Classes />} />
            <Route path="precios" element={<Pricing />} />
            <Route path="estudio" element={<NuestroEstudio />} />
            <Route path="eventos" element={<Eventos />} />
            <Route path="contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

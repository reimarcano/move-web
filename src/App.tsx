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
import SpringLoader from './components/SpringLoader';
import Home from './pages/Home';
import { useScrollReveal } from './hooks/useScrollReveal';
import { canonicalForPath, OG_IMAGE, seoByPath } from './seo';

const Classes = lazy(() => import('./pages/Classes'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NuestroEstudio = lazy(() => import('./pages/NuestroEstudio'));
const Eventos = lazy(() => import('./pages/Eventos'));
const Contacto = lazy(() => import('./pages/Contacto'));

function SeoManager() {
  const location = useLocation();

  const normalizedPath =
    location.pathname !== '/'
      ? location.pathname.replace(/\/+$/, '')
      : '/';

  const seo = seoByPath[normalizedPath] ?? seoByPath['/'];
  const canonical = canonicalForPath(normalizedPath);

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
  const location = useLocation();
  const normalizedPath =
    location.pathname !== '/'
      ? location.pathname.replace(/\/+$/, '')
      : '/';

  return (
    <>
      <SpringLoader active={normalizedPath === '/'} />
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

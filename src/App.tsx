/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, type ComponentType } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'motion/react';

import Layout from './components/Layout';
import SpringLoader from './components/SpringLoader';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { canonicalForPath, NOT_FOUND_SEO, OG_IMAGE, seoByPath } from './seo';

type PageModule = { default: ComponentType };

/* Página en su propio fragmento de JS que además se puede cargar por adelantado: si ya
   está cargada cuando se pinta, React la usa en el acto, sin suspender. Así el HTML
   precompilado se hidrata entero de una vez, sin huecos ni parpadeos. */
function lazyPage(load: () => Promise<PageModule>) {
  let loaded: PageModule | undefined;
  const preload = () =>
    load().then((module) => {
      loaded = module;
      return module;
    });
  const Page = lazy(() =>
    loaded
      ? // Un "then" síncrono: React lee el módulo sin esperar a otra vuelta
        ({ then: (resolve: (module: PageModule) => void) => resolve(loaded!) } as unknown as Promise<PageModule>)
      : preload(),
  );
  return Object.assign(Page, { preload });
}

const Classes = lazyPage(() => import('./pages/Classes'));
const Pricing = lazyPage(() => import('./pages/Pricing'));
const NuestroEstudio = lazyPage(() => import('./pages/NuestroEstudio'));
const Eventos = lazyPage(() => import('./pages/Eventos'));
const Contacto = lazyPage(() => import('./pages/Contacto'));
const LegalNotice = lazyPage(() => import('./pages/Legal').then((module) => ({ default: module.LegalNotice })));
const PrivacyPolicy = lazyPage(() => import('./pages/Legal').then((module) => ({ default: module.PrivacyPolicy })));
const CookiePolicy = lazyPage(() => import('./pages/Legal').then((module) => ({ default: module.CookiePolicy })));

const pagesByPath: Record<string, { preload: () => Promise<unknown> }> = {
  '/clases': Classes,
  '/precios': Pricing,
  '/estudio': NuestroEstudio,
  '/eventos': Eventos,
  '/contacto': Contacto,
  '/aviso-legal': LegalNotice,
  '/privacidad': PrivacyPolicy,
  '/cookies': CookiePolicy,
};

export function normalizePath(pathname: string) {
  return pathname !== '/' ? pathname.replace(/\/+$/, '') || '/' : '/';
}

/* Carga la página de esa ruta antes de pintar (la portada ya va en el JS principal) */
export async function preloadPage(pathname: string) {
  await pagesByPath[normalizePath(pathname)]?.preload();
}

function SeoManager() {
  const location = useLocation();

  const normalizedPath =
    location.pathname !== '/'
      ? location.pathname.replace(/\/+$/, '')
      : '/';

  const existe = normalizedPath in seoByPath;
  const seo = existe ? seoByPath[normalizedPath] : NOT_FOUND_SEO;
  const canonical = canonicalForPath(existe ? normalizedPath : '/');

  return (
    <Helmet>
      <html lang="es" />

      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Una ruta inexistente no lleva canonical y queda fuera del índice */}
      {existe ? <link rel="canonical" href={canonical} /> : <meta name="robots" content="noindex" />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Move Pilates Boutique" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={seo.title} />
<meta name="twitter:description" content={seo.description} />
<meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}

export default function App() {
  const location = useLocation();
  const normalizedPath =
    location.pathname !== '/'
      ? location.pathname.replace(/\/+$/, '')
      : '/';

  return (
    <>
      <SpringLoader active={normalizedPath === '/'} />
      {/* Al compilar, las etiquetas del <head> las escribe scripts/prerender.ts */}
      {typeof window !== 'undefined' && <SeoManager />}

      {/* Solo las funciones de animación que usamos (sin drag ni layout): JS inicial más ligero */}
      <LazyMotion features={domAnimation}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="clases" element={<Classes />} />
              <Route path="precios" element={<Pricing />} />
              <Route path="estudio" element={<NuestroEstudio />} />
              <Route path="eventos" element={<Eventos />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="aviso-legal" element={<LegalNotice />} />
              <Route path="privacidad" element={<PrivacyPolicy />} />
              <Route path="cookies" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </LazyMotion>
    </>
  );
}

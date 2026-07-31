/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { useScrollReveal } from './hooks/useScrollReveal';

const Classes = lazy(() => import('./pages/Classes'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NuestroEstudio = lazy(() => import('./pages/NuestroEstudio'));
const Eventos = lazy(() => import('./pages/Eventos'));
const Contacto = lazy(() => import('./pages/Contacto'));

function AppContent() {
  useScrollReveal();
  return (
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

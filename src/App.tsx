/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Pricing from './pages/Pricing';
import NuestroEstudio from './pages/NuestroEstudio';
import Eventos from './pages/Eventos';
import Contacto from './pages/Contacto';
import { useScrollReveal } from './hooks/useScrollReveal';

function AppContent() {
  useScrollReveal();
  return (
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

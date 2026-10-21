import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App, { normalizePath, preloadPage } from './App.tsx';
import { CookieConsentProvider } from './components/CookieConsent.tsx';
import './index.css';

const app = (
  <StrictMode>
    <HelmetProvider>
      <CookieConsentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookieConsentProvider>
    </HelmetProvider>
  </StrictMode>
);

const container = document.getElementById('root')!;

/* Si el HTML trae ya esta misma página compilada (scripts/prerender.ts), React la hidrata:
   primero carga el JS de la página para hidratarla entera de una vez. El 404 ("*") vale
   para cualquier ruta que no exista. En desarrollo se pinta desde cero. */
const prerendered = container.dataset.prerendered;
if (prerendered === normalizePath(window.location.pathname) || prerendered === '*') {
  preloadPage(window.location.pathname)
    .catch(() => undefined)
    .then(() => hydrateRoot(container, app));
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}

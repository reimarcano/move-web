import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import App, { preloadPage } from './App.tsx';
import { CookieConsentProvider } from './components/CookieConsent.tsx';

/* HTML de una ruta, con el mismo árbol que monta src/main.tsx en el navegador */
export async function render(pathname: string) {
  await preloadPage(pathname);
  return renderToString(
    <StrictMode>
      <HelmetProvider context={{}}>
        <CookieConsentProvider>
          <StaticRouter location={pathname}>
            <App />
          </StaticRouter>
        </CookieConsentProvider>
      </HelmetProvider>
    </StrictMode>,
  );
}

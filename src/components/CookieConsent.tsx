import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type OptionalPreferences = { analytics: boolean; maps: boolean };
type StoredConsent = OptionalPreferences & { savedAt: number; version: 2 };
type CookieConsentContextValue = { analyticsAllowed: boolean; mapsAllowed: boolean; openPreferences: () => void };

const STORAGE_KEY = 'move-cookie-consent-v2';
const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 365;
const EMPTY_PREFERENCES: OptionalPreferences = { analytics: false, maps: false };
const ALL_PREFERENCES: OptionalPreferences = { analytics: true, maps: true };
const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredConsent(): StoredConsent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as StoredConsent;
    const valid = parsed.version === 2 && typeof parsed.analytics === 'boolean' && typeof parsed.maps === 'boolean' && typeof parsed.savedAt === 'number' && Date.now() - parsed.savedAt < CONSENT_MAX_AGE;
    return valid ? parsed : null;
  } catch {
    return null;
  }
}

function removeAnalyticsCookies() {
  const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  const domains = [window.location.hostname, `.${window.location.hostname}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.trim().split('=')[0];
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; ${expiry}`;
      domains.forEach((domain) => { document.cookie = `${name}=; ${expiry}; domain=${domain}`; });
    }
  });
}

function loadAnalytics() {
  if (document.getElementById('move-ga4')) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag('js', new Date());
  window.gtag('config', 'G-RWGZ9S0QMF');
  const script = document.createElement('script');
  script.id = 'move-ga4';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-RWGZ9S0QMF';
  document.head.append(script);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(() => readStoredConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<OptionalPreferences>(EMPTY_PREFERENCES);
  const [ready, setReady] = useState(false);
  const analyticsAllowed = consent?.analytics === true;
  const mapsAllowed = consent?.maps === true;

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (analyticsAllowed) { loadAnalytics(); return; }
    removeAnalyticsCookies();
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  }, [analyticsAllowed]);

  useEffect(() => {
    if (!analyticsAllowed) return;
    const trackLead = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const href = target.closest('a')?.getAttribute('href') ?? '';
      const method = href.includes('wa.me/34654495508') ? 'whatsapp' : href.startsWith('tel:+34654495508') ? 'phone' : null;
      if (method) window.gtag?.('event', 'generate_lead', { method, lead_source: window.location.pathname || '/' });
    };
    document.addEventListener('click', trackLead);
    return () => document.removeEventListener('click', trackLead);
  }, [analyticsAllowed]);

  const saveConsent = useCallback((preferences: OptionalPreferences) => {
    const nextConsent: StoredConsent = { ...preferences, savedAt: Date.now(), version: 2 };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConsent));
    setConsent(nextConsent);
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setDraft(consent ? { analytics: consent.analytics, maps: consent.maps } : EMPTY_PREFERENCES);
    setPreferencesOpen(true);
  }, [consent]);

  const value = useMemo(() => ({ analyticsAllowed, mapsAllowed, openPreferences }), [analyticsAllowed, mapsAllowed, openPreferences]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {ready && !consent && !preferencesOpen && (
        <aside aria-label="Preferencias de cookies" className="fixed bottom-2 left-2 right-2 z-[10001] mx-auto max-w-[1040px] rounded-[11px] border border-[#D8D0BF]/90 bg-[#F6F3EC]/95 px-3 py-2.5 shadow-[0_12px_30px_rgba(73,53,35,0.12)] backdrop-blur-md sm:bottom-4 sm:rounded-[14px] sm:px-5 sm:py-3.5">
          <div className="sm:flex sm:items-center sm:gap-6">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[9px] leading-[1.35] text-[#5E5146] sm:hidden">Usamos cookies necesarias para que la web funcione. Si lo autorizas, también usamos Google Analytics para entender cómo se utiliza el sitio y Google Maps para mostrar nuestra ubicación. Puedes aceptar, rechazar o personalizar tu elección. <a href="/cookies" className="text-[#7F7763] underline underline-offset-2">Política</a></p>
              <div className="hidden sm:block">
                <p className="mb-1 font-serif text-[18px] text-[#493523]">Configuración de cookies</p>
                <p className="mb-0 text-[12px] leading-[1.55] text-[#5E5146]">Utilizamos cookies necesarias para que la web funcione correctamente. Si lo autorizas, activamos Google Analytics para comprender de forma agregada el uso del sitio y Google Maps para mostrar nuestra ubicación. Puedes aceptar, rechazar o personalizar tu elección.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:mt-0 sm:flex sm:flex-nowrap sm:items-center sm:gap-x-2">
              <button type="button" onClick={() => saveConsent(EMPTY_PREFERENCES)} className="btn-outline w-full !px-1.5 !py-2 text-[9px] sm:w-auto sm:!px-3 sm:text-[10px]">RECHAZAR</button>
              <button type="button" onClick={openPreferences} className="btn-outline w-full border-transparent !px-1.5 !py-2 text-[9px] sm:w-auto sm:!px-2 sm:text-[10px]">PERSONALIZAR</button>
              <button type="button" onClick={() => saveConsent(ALL_PREFERENCES)} className="btn-primary w-full !px-1.5 !py-2 text-[9px] sm:w-auto sm:!px-3 sm:text-[10px]">ACEPTAR</button>
              <a href="/cookies" className="hidden whitespace-nowrap px-1 text-[10px] text-[#7F7763] underline underline-offset-4 sm:inline">Política de cookies</a>
            </div>
          </div>
        </aside>
      )}
      {preferencesOpen && (
        <div className="fixed inset-0 z-[10002] flex items-end bg-[#493523]/30 p-4 backdrop-blur-[2px] sm:items-center sm:justify-center" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" className="w-full max-w-[520px] rounded-[10px] bg-[#F6F3EC] p-6 shadow-[0_20px_60px_rgba(73,53,35,0.28)] md:p-8">
            <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[#7F7763]">Preferencias</p>
            <h2 id="cookie-settings-title" className="mb-4 text-[28px]">Elige cómo quieres navegar.</h2>
            <div className="space-y-4 border-y border-[#D8D0BF] py-5">
              <div><p className="mb-1 text-[15px] font-medium text-[#493523]">Necesarias</p><p className="mb-0 text-[13px] text-[#5E5146]">Guardan tu elección de privacidad. Siempre activas.</p></div>
              <label className="flex cursor-pointer items-start gap-3 rounded-[6px] p-2 transition-colors hover:bg-[#EAE2D3]">
                <input type="checkbox" checked={draft.analytics} onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))} className="mt-1 h-4 w-4 accent-[#493523]" />
                <span><span className="block text-[15px] font-medium text-[#493523]">Analítica</span><span className="block text-[13px] text-[#5E5146]">Google Analytics nos ayuda a conocer el uso agregado de la web.</span></span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-[6px] p-2 transition-colors hover:bg-[#EAE2D3]">
                <input type="checkbox" checked={draft.maps} onChange={(event) => setDraft((current) => ({ ...current, maps: event.target.checked }))} className="mt-1 h-4 w-4 accent-[#493523]" />
                <span><span className="block text-[15px] font-medium text-[#493523]">Mapa de Google</span><span className="block text-[13px] text-[#5E5146]">Permite mostrar la ubicación integrada en la página de Contacto.</span></span>
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => saveConsent(EMPTY_PREFERENCES)} className="btn-outline w-full text-[10px] sm:w-auto">SÓLO NECESARIAS</button>
              <button type="button" onClick={() => saveConsent(draft)} className="btn-primary w-full text-[10px] sm:ml-auto sm:w-auto">GUARDAR SELECCIÓN</button>
            </div>
          </section>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  return context;
}

export function CookieSettingsButton({ className = '' }: { className?: string }) {
  const { openPreferences } = useCookieConsent();
  return <button type="button" onClick={openPreferences} className={className}>Configurar cookies</button>;
}
